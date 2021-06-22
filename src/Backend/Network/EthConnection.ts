import {
  GETTERS_CONTRACT_ADDRESS,
  CORE_CONTRACT_ADDRESS,
  WHITELIST_CONTRACT_ADDRESS,
  GPT_CREDIT_CONTRACT_ADDRESS,
} from '@darkforest_eth/contracts';
import { JsonRpcProvider, TransactionReceipt } from '@ethersproject/providers';
import {
  Wallet,
  providers,
  ContractInterface,
  Contract,
  utils,
  BigNumber,
  EventFilter,
  ethers,
} from 'ethers';
import EventEmitter from 'events';
import stringify from 'json-stable-stringify';
import { XDAI_CHAIN_ID } from '../../Frontend/Utils/constants';
import { Monomitter, monomitter } from '../../Frontend/Utils/Monomitter';
import { EthAddress } from '@darkforest_eth/types';
import { callWithRetry, sleep } from '../Utils/Utils';
import type {
  DarkForestCore,
  DarkForestGetters,
  DarkForestGPTCredit,
  Whitelist,
} from '@darkforest_eth/contracts/typechain';
import { address } from '@darkforest_eth/serde';
import coreContractAbiPath from '@darkforest_eth/contracts/abis/DarkForestCore.json';
import gettersContractAbiPath from '@darkforest_eth/contracts/abis/DarkForestGetters.json';
import whitelistContractAbiPath from '@darkforest_eth/contracts/abis/Whitelist.json';
import gptCreditContractAbiPath from '@darkforest_eth/contracts/abis/DarkForestGPTCredit.json';
import { ContractEvent } from '../../_types/darkforest/api/ContractsAPITypes';
import { BlockWaiter } from '../Utils/BlockWaiter';

/* eslint-disable @typescript-eslint/no-explicit-any */

function toJSON(x: Response) {
  return x.json();
}

/**
 * Responsible for
 * 1) loading the contract
 * 2) the in-memory wallet
 * 3) connecting to the correct network
 */
class EthConnection extends EventEmitter {
  private static readonly XDAI_DEFAULT_URL = process.env.DEFAULT_RPC as string;

  public readonly blockNumber$: Monomitter<number>;
  private blockNumber: number;

  private readonly knownAddresses: EthAddress[];
  private provider: JsonRpcProvider;
  private signer: Wallet | undefined;
  private rpcURL: string;

  public constructor() {
    super();

    let url: string;
    // TODO: Provide own env variable for this feature
    const isProd = process.env.NODE_ENV === 'production';

    if (isProd) {
      url = localStorage.getItem('XDAI_RPC_ENDPOINT_v5') || EthConnection.XDAI_DEFAULT_URL;
    } else {
      url = 'http://localhost:8545';
    }

    this.setRpcEndpoint(url);
    this.knownAddresses = [];
    const knownAddressesStr = localStorage.getItem('KNOWN_ADDRESSES');
    if (knownAddressesStr) {
      const addrStrs = JSON.parse(knownAddressesStr) as string[];
      for (const addrStr of addrStrs) {
        this.knownAddresses.push(address(addrStr));
      }
    }

    this.blockNumber$ = monomitter(true);
    this.adjustPollRateBasedOnVisibility();
  }

  private adjustPollRateBasedOnVisibility() {
    document.addEventListener('visibilitychange', () => {
      // If it is 0, then we are websocket
      if (this.provider.pollingInterval === 0) {
        return;
      }
      if (document.hidden) {
        this.provider.pollingInterval = 1000 * 60;
      } else {
        this.provider.pollingInterval = 1000 * 8;
      }
    });
  }

  public getRpcEndpoint(): string {
    return this.rpcURL;
  }

  public hasSigner(): boolean {
    return !!this.signer;
  }

  public subscribeToEvents(
    contract: DarkForestCore,
    // map from contract event to function. using type 'any' here to satisfy typescript - each of
    // the functions has a different type signature.
    handlers: Partial<Record<ContractEvent, any>>
  ) {
    const filter = {
      address: contract.address,
      topics: [
        [
          contract.filters.ArrivalQueued(null, null, null, null, null).topics,
          contract.filters.ArtifactActivated(null, null, null).topics,
          contract.filters.ArtifactDeactivated(null, null, null).topics,
          contract.filters.ArtifactDeposited(null, null, null).topics,
          contract.filters.ArtifactFound(null, null, null).topics,
          contract.filters.ArtifactWithdrawn(null, null, null).topics,
          contract.filters.LocationRevealed(null, null).topics,
          contract.filters.PlanetHatBought(null, null, null).topics,
          contract.filters.PlanetProspected(null, null).topics,
          contract.filters.PlanetSilverWithdrawn(null, null, null).topics,
          contract.filters.PlanetTransferred(null, null, null).topics,
          contract.filters.PlanetUpgraded(null, null, null, null).topics,
          contract.filters.PlayerInitialized(null, null).topics,
        ].map((topicsOrUndefined) => (topicsOrUndefined || [])[0]),
      ] as Array<string | Array<string>>,
    };

    const blockWaiter = new BlockWaiter(1000);

    this.provider.on('block', async (latestBlockNumber: number) => {
      if (this.blockNumber === undefined) {
        this.blockNumber = latestBlockNumber;
      }

      blockWaiter.schedule(() => {
        const previousBlockNumber = this.blockNumber;
        this.blockNumber = latestBlockNumber;
        this.blockNumber$.publish(latestBlockNumber);

        console.log(`processing events for ${latestBlockNumber - previousBlockNumber} blocks`);

        this.processEvents(
          Math.min(previousBlockNumber + 1, latestBlockNumber),
          latestBlockNumber,
          filter,
          contract,
          handlers
        );
      });
    });
  }

  private async processEvents(
    startBlock: number,
    endBlock: number,
    eventFilter: EventFilter,
    contract: DarkForestCore,
    handlers: Partial<Record<ContractEvent, any>>
  ) {
    const logs = await this.provider.getLogs({
      fromBlock: startBlock, // inclusive
      toBlock: endBlock, // inclusive
      ...eventFilter,
    });

    logs.forEach((log) => {
      const parsedData = contract.interface.parseLog(log);
      const handler = handlers[parsedData.name as ContractEvent];
      if (handler !== undefined) {
        handler(...parsedData.args);
      }
    });
  }

  public async setRpcEndpoint(url: string): Promise<void> {
    try {
      this.rpcURL = url;
      let newProvider: JsonRpcProvider | undefined;
      if (this.rpcURL.startsWith('wss://')) {
        newProvider = new providers.WebSocketProvider(this.rpcURL);
      } else {
        newProvider = new providers.StaticJsonRpcProvider(this.rpcURL);
        newProvider.pollingInterval = 8000;
      }
      /**
       * this.provider needs to get set to nonnull value immediately (synchronously)
       * otherwise other classes which call loadContract() immediately on app load might
       * load a contract without a provider.
       * if there ends up being an error with the RPC URL, we emit event and reload contract into ContractsAPI
       * This is hacky / bad practice and this whole getInstance() pattern should get refactored
       * but for now it is what it is ¯\_(ツ)_/¯
       */
      this.provider = newProvider;
      // TODO: Provide own env variable for this feature
      if (process.env.NODE_ENV === 'production') {
        if ((await newProvider.getNetwork()).chainId !== XDAI_CHAIN_ID) {
          throw new Error('not a valid xDAI RPC URL');
        }
      }
      if (this.signer) {
        this.signer = new Wallet(this.signer.privateKey, this.provider);
      } else {
        this.signer = undefined;
      }
      localStorage.setItem('XDAI_RPC_ENDPOINT_v5', this.rpcURL);
      this.emit('ChangedRPCEndpoint');
    } catch (e) {
      console.error(`error setting rpc endpoint: ${e}`);
      this.setRpcEndpoint(EthConnection.XDAI_DEFAULT_URL);
      this.emit('ChangedRPCEndpoint');
      return;
    }
  }

  public async loadContract<C extends Contract>(
    contractAddress: string,
    contractABI: ContractInterface
  ): Promise<C> {
    if (this.signer) {
      return new Contract(contractAddress, contractABI, this.signer) as C;
    } else {
      console.log('WARNING: loading contract from provider (no signer)');
      return new Contract(contractAddress, contractABI, this.provider) as C;
    }
  }

  public async loadGettersContract(): Promise<DarkForestGetters> {
    const abi = await fetch(gettersContractAbiPath).then(toJSON);

    return this.loadContract(GETTERS_CONTRACT_ADDRESS, abi);
  }

  public async loadCoreContract(): Promise<DarkForestCore> {
    const abi = await fetch(coreContractAbiPath).then(toJSON);

    return this.loadContract(CORE_CONTRACT_ADDRESS, abi);
  }

  public async loadWhitelistContract(): Promise<Whitelist> {
    const abi = await fetch(whitelistContractAbiPath).then(toJSON);

    return this.loadContract(WHITELIST_CONTRACT_ADDRESS, abi);
  }

  public async loadGPTCreditContract(): Promise<DarkForestGPTCredit> {
    const abi = await fetch(gptCreditContractAbiPath).then(toJSON);

    return this.loadContract(GPT_CREDIT_CONTRACT_ADDRESS, abi);
  }

  // TODO: This should be moved to ContractReader once we split ContractsAPI out
  // it's here because we need access to this function before GameManager
  // (and therefore ContractsAPI) is loaded in GameLandingPage.tsx
  public async isWhitelisted(address: EthAddress): Promise<boolean> {
    const whitelist = await this.loadWhitelistContract();
    return callWithRetry<boolean>(whitelist.isWhitelisted, [address], () => {}, 3);
  }

  public getAddress(): EthAddress {
    if (!this.signer) {
      throw new Error('account not selected yet');
    }
    return address(this.signer.address);
  }

  public getNonce(): Promise<number> {
    // throws if no account has been set yet
    if (!this.signer) {
      throw new Error('account not selected yet');
    }

    return callWithRetry<number>(this.provider.getTransactionCount.bind(this.provider), [
      this.signer.address,
    ]);
  }

  public setAccount(address: EthAddress): void {
    const skey = localStorage.getItem(`skey-${address}`);
    if (skey) {
      this.signer = new Wallet(skey, this.provider);
    } else {
      throw new Error('private key for address not found');
    }
  }

  public addAccount(skey: string): void {
    // throws if invalid secret key
    const addr = address(utils.computeAddress(skey));
    localStorage.setItem(`skey-${addr}`, skey);
    this.knownAddresses.push(addr);
    localStorage.setItem('KNOWN_ADDRESSES', stringify(this.knownAddresses));
  }

  public getKnownAccounts(): EthAddress[] {
    return this.knownAddresses;
  }

  public async signMessage(message: string): Promise<string> {
    if (!this.signer) {
      throw new Error('no signer yet');
    }

    return this.signer.signMessage(message);
  }

  public verifySignature(message: string, signature: string, address: EthAddress): boolean {
    return ethers.utils.verifyMessage(message, signature).toLowerCase() === address;
  }

  public async getBalance(address: EthAddress): Promise<number> {
    const balanceWeiBN = await callWithRetry<BigNumber>(
      this.provider.getBalance.bind(this.provider),
      [address]
    );

    return parseFloat(utils.formatEther(balanceWeiBN));
  }

  public getPrivateKey(): string {
    if (!this.signer) {
      throw new Error('no signer yet');
    }
    return this.signer.privateKey;
  }

  public async waitForTransaction(txHash: string): Promise<TransactionReceipt> {
    return new Promise(async (resolve) => {
      let receipt = undefined;
      let tries = 0;

      // waitForTransaction tends to hang on xDAI. but if we have a txHash
      // the tx WILL get confirmed (or reverted) eventually, so for sure
      // just keep retrying
      while (!receipt) {
        console.log(`[wait-tx] WAITING ON tx hash: ${txHash} tries ${tries}`);

        receipt = await Promise.race([
          sleep(30 * 1000, undefined),
          this.provider.getTransactionReceipt(txHash).catch((e) => {
            console.error(`[wait-tx] TIMED OUT tx hash: ${txHash} tries ${tries} error:`, e);
            return undefined;
          }),
        ]);

        if (receipt) {
          console.log(`[wait-tx] FINISHED tx hash: ${txHash} tries ${tries}`);
          resolve(receipt);
          return;
        }

        // exponential backoff, in seconds:
        // 5 * (1, 1, 2, 3, 4, 6, 9, 13, 19, 29, 43, 65 ...)
        // But never more than a minute
        const sleepTime = Math.min(5000 * 1.5 ** tries, 60000);
        console.log(
          `[wait-tx] SLEEPING tx hash: ${txHash} tries ${tries} sleeping for: ${sleepTime} `
        );
        await sleep(sleepTime);
        tries += 1;
      }
    });
  }
}

export default EthConnection;
