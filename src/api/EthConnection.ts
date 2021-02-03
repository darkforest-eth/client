import * as stringify from 'json-stable-stringify';
import { JsonRpcProvider, TransactionReceipt } from '@ethersproject/providers';
import {
  providers,
  Contract,
  Wallet,
  utils,
  ContractInterface,
  BigNumber,
} from 'ethers';
import { EthAddress } from '../_types/global/GlobalTypes';
import { CheckedTypeUtils } from '../utils/CheckedTypeUtils';
import { EventEmitter } from 'events';
import { XDAI_CHAIN_ID } from '../utils/constants';
import { callWithRetry, sleep } from '../utils/Utils';

/**
 * Responsible for
 * 1) loading the contract
 * 2) the in-memory wallet
 * 3) connecting to the correct network
 */
class EthConnection extends EventEmitter {
  // rpc-df only has CORS enabled for zkga.me, not localhost
  private static readonly XDAI_DEFAULT_URL = window.origin.includes('localhost')
    ? 'https://rpc.xdaichain.com/'
    : 'https://rpc-df.xdaichain.com/';

  private readonly knownAddresses: EthAddress[];
  private provider: JsonRpcProvider;
  private signer: Wallet | null;
  private rpcURL: string;

  public constructor() {
    super();

    let url: string;
    const isProd = process.env.NODE_ENV === 'production';
    if (isProd) {
      url =
        localStorage.getItem('XDAI_RPC_ENDPOINT_v5') ||
        EthConnection.XDAI_DEFAULT_URL;
    } else {
      url = 'http://localhost:8545';
    }
    this.setRpcEndpoint(url);
    this.knownAddresses = [];
    const knownAddressesStr = localStorage.getItem('KNOWN_ADDRESSES');
    if (knownAddressesStr) {
      const addrStrs = JSON.parse(knownAddressesStr) as string[];
      for (const addrStr of addrStrs) {
        this.knownAddresses.push(CheckedTypeUtils.address(addrStr));
      }
    }
  }

  public getRpcEndpoint(): string {
    return this.rpcURL;
  }

  public hasSigner(): boolean {
    return !!this.signer;
  }

  public async setRpcEndpoint(url: string): Promise<void> {
    try {
      this.rpcURL = url;
      const newProvider = new providers.JsonRpcProvider(this.rpcURL);
      /**
       * this.provider needs to get set to nonnull value immediately (synchronously)
       * otherwise other classes which call loadContract() immediately on app load might
       * load a contract without a provider.
       * if there ends up being an error with the RPC URL, we emit event and reload contract into ContractsAPI
       * This is hacky / bad practice and this whole getInstance() pattern should get refactored
       * but for now it is what it is ¯\_(ツ)_/¯
       */
      this.provider = newProvider;
      if (process.env.NODE_ENV === 'production') {
        if ((await newProvider.getNetwork()).chainId !== XDAI_CHAIN_ID) {
          throw new Error('not a valid xDAI RPC URL');
        }
      }
      this.provider = newProvider;
      this.provider.pollingInterval = 8000;
      if (this.signer) {
        this.signer = new Wallet(this.signer.privateKey, this.provider);
      } else {
        this.signer = null;
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

  public async loadContract(
    contractAddress: string,
    contractABI: ContractInterface
  ): Promise<Contract> {
    if (this.signer) {
      return new Contract(contractAddress, contractABI, this.signer);
    } else {
      console.log('WARNING: loading contract from provider (no signer)');
      return new Contract(contractAddress, contractABI, this.provider);
    }
  }

  public async loadCoreContract(): Promise<Contract> {
    const contractABI = (
      await fetch('/public/contracts/DarkForestCore.json').then((x) => x.json())
    ).abi;

    const isProd = process.env.NODE_ENV === 'production';
    const contractAddress = isProd
      ? require('../utils/prod_contract_addr').contractAddress
      : require('../utils/local_contract_addr').contractAddress;

    return this.loadContract(contractAddress, contractABI);
  }

  public async loadWhitelistContract(): Promise<Contract> {
    const whitelistABI = (
      await fetch('/public/contracts/Whitelist.json').then((x) => x.json())
    ).abi;

    const isProd = process.env.NODE_ENV === 'production';
    const whitelistAddress = isProd
      ? require('../utils/prod_contract_addr').whitelistContract
      : require('../utils/local_contract_addr').whitelistContract;

    return this.loadContract(whitelistAddress, whitelistABI);
  }

  // TODO: This should be moved to ContractReader once we split ContractsAPI out
  // it's here because we need access to this function before GameManager
  // (and therefore ContractsAPI) is loaded in GameLandingPage.tsx
  public async isWhitelisted(address: EthAddress): Promise<boolean> {
    const whitelist = await this.loadWhitelistContract();
    return callWithRetry<boolean>(
      whitelist.isWhitelisted,
      [address],
      () => {},
      3
    );
  }

  public getAddress(): EthAddress {
    if (!this.signer) {
      throw new Error('account not selected yet');
    }
    return CheckedTypeUtils.address(this.signer.address);
  }

  public getNonce(): Promise<number> {
    // throws if no account has been set yet
    if (!this.signer) {
      throw new Error('account not selected yet');
    }

    return callWithRetry<number>(
      this.provider.getTransactionCount.bind(this.provider),
      [this.signer.address]
    );
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
    const addr = CheckedTypeUtils.address(utils.computeAddress(skey));
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
      let receipt = null;
      let tries = 0;

      // waitForTransaction tends to hang on xDAI. but if we have a txHash
      // the tx WILL get confirmed (or reverted) eventually, so for sure
      // just keep retrying
      while (!receipt) {
        console.log(`[wait-tx] WAITING ON tx hash: ${txHash} tries ${tries}`);

        receipt = await Promise.race([
          sleep(30 * 1000, null),
          this.provider.getTransactionReceipt(txHash).catch((e) => {
            console.error(
              `[wait-tx] TIMED OUT tx hash: ${txHash} tries ${tries} error:`,
              e
            );
            return null;
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
