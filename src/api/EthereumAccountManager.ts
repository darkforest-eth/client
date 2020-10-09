import * as stringify from 'json-stable-stringify';
import { JsonRpcProvider, TransactionReceipt } from '@ethersproject/providers';
import { providers, Contract, Wallet, utils } from 'ethers';
import { EthAddress } from '../_types/global/GlobalTypes';
import { address } from '../utils/CheckedTypeUtils';

class EthereumAccountManager {
  static instance: EthereumAccountManager | null = null;

  private readonly provider: JsonRpcProvider;
  private signer: Wallet | null;
  private readonly knownAddresses: EthAddress[];

  private constructor() {
    const isProd = process.env.NODE_ENV === 'production';
    const url = isProd ? 'https://rpc.xdaichain.com/' : 'http://localhost:8545';
    this.provider = new providers.JsonRpcProvider(url);
    this.provider.pollingInterval = 8000;
    this.signer = null;
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

  public async loadContract(contractAddress, contractABI): Promise<Contract> {
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
    return this.provider.getTransactionCount(this.signer.address);
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
    const balanceWeiBN = await this.provider.getBalance(address);
    return parseFloat(utils.formatEther(balanceWeiBN));
  }

  public getPrivateKey(): string {
    if (!this.signer) {
      throw new Error('no signer yet');
    }
    return this.signer.privateKey;
  }

  public async waitForTransaction(txHash: string): Promise<TransactionReceipt> {
    return this.provider.waitForTransaction(txHash);
  }
}

export default EthereumAccountManager;
