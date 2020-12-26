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
import { address } from '../utils/CheckedTypeUtils';
import { EventEmitter } from 'events';
import { XDAI_CHAIN_ID } from '../utils/constants';
import { callWithRetry, sleep } from '../utils/Utils';

// rpc-df only has CORS enabled for zkga.me, not localhost
const XDAI_DEFAULT_URL = window.origin.includes('localhost')
  ? 'https://rpc.xdaichain.com/'
  : 'https://rpc-df.xdaichain.com/';

class EthereumAccountManager extends EventEmitter {
  static instance: EthereumAccountManager | null = null;

  private provider: JsonRpcProvider;
  private signer: Wallet | null;
  private rpcURL: string;
  private readonly knownAddresses: EthAddress[];

  private constructor() {
    super();

    let url: string;
    const isProd = process.env.NODE_ENV === 'production';
    if (isProd) {
      url = localStorage.getItem('XDAI_RPC_ENDPOINT_v5') || XDAI_DEFAULT_URL;
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
  }

  static getInstance(): EthereumAccountManager {
    if (!EthereumAccountManager.instance) {
      EthereumAccountManager.instance = new EthereumAccountManager();
    }
    return EthereumAccountManager.instance;
  }

  public getRpcEndpoint(): string {
    return this.rpcURL;
  }

  public async setRpcEndpoint(url: string): Promise<void> {
    try {
      this.rpcURL = url;
      const newProvider = new providers.JsonRpcProvider(this.rpcURL);
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
      this.setRpcEndpoint(XDAI_DEFAULT_URL);
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
      throw new Error('no signer found');
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

  public getAddress(): EthAddress {
    // throws if no account has been set yet
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
          this.provider.waitForTransaction(txHash).catch((e) => {
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
        // 1, 1, 2, 3, 4, 6, 9, 13, 19, 29, 43, 65 ...
        const sleepTime = 5000 * 1.5 ** tries;
        console.log(
          `[wait-tx] SLEEPING tx hash: ${txHash} tries ${tries} sleeping for: ${sleepTime} `
        );
        await sleep(sleepTime);
        tries += 1;
      }
    });
  }
}

export default EthereumAccountManager;
