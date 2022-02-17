// These are loaded as URL paths by a webpack loader
import coreContractAbiUrl from '@darkforest_eth/contracts/abis/DarkForestCore.json';
import gettersContractAbiUrl from '@darkforest_eth/contracts/abis/DarkForestGetters.json';
import tokensContractAbiUrl from '@darkforest_eth/contracts/abis/DarkForestTokens.json';
import whitelistContractAbiUrl from '@darkforest_eth/contracts/abis/Whitelist.json';
import type {
  DarkForestCore,
  DarkForestGetters,
  DarkForestTokens,
  Whitelist,
} from '@darkforest_eth/contracts/typechain';
import { createContract, createEthConnection, EthConnection } from '@darkforest_eth/network';
import type { providers, Wallet } from 'ethers';

/**
 * Loads the Core game contract, which is responsible for updating the state of the game.
 * @see https://github.com/darkforest-eth/eth/blob/master/contracts/DarkForestCore.sol
 */
export async function loadCoreContract(
  address: string,
  provider: providers.JsonRpcProvider,
  signer?: Wallet
): Promise<DarkForestCore> {
  const coreContractAbi = await fetch(coreContractAbiUrl).then((r) => r.json());

  return createContract<DarkForestCore>(address, coreContractAbi, provider, signer);
}

/**
 * Loads the Getters contract, which contains utility view functions which get game objects
 * from the blockchain in bulk.
 * @see https://github.com/darkforest-eth/eth/blob/master/contracts/DarkForestGetters.sol
 */
export async function loadGettersContract(
  address: string,
  provider: providers.JsonRpcProvider,
  signer?: Wallet
): Promise<DarkForestGetters> {
  const gettersContractAbi = await fetch(gettersContractAbiUrl).then((r) => r.json());

  return createContract<DarkForestGetters>(address, gettersContractAbi, provider, signer);
}

/**
 * Loads the Tokens contract, which contains utility view functions which handles artifacts.
 * @see https://github.com/darkforest-eth/eth/blob/master/contracts/DarkForestTokens.sol
 */
export async function loadTokensContract(
  address: string,
  provider: providers.JsonRpcProvider,
  signer?: Wallet
): Promise<DarkForestTokens> {
  const tokensContractAbi = await fetch(tokensContractAbiUrl).then((r) => r.json());

  return createContract<DarkForestTokens>(address, tokensContractAbi, provider, signer);
}

/**
 * Loads the Whitelist contract, which keeps track of which players are allowed to play the game.
 * @see https://github.com/darkforest-eth/eth/blob/master/contracts/Whitelist.sol
 */
export async function loadWhitelistContract(
  address: string,
  provider: providers.JsonRpcProvider,
  signer?: Wallet
): Promise<Whitelist> {
  const whitelistContractAbi = await fetch(whitelistContractAbiUrl).then((r) => r.json());

  return createContract<Whitelist>(address, whitelistContractAbi, provider, signer);
}

export function getEthConnection(): Promise<EthConnection> {
  const isProd = process.env.NODE_ENV === 'production';
  const defaultUrl = process.env.DEFAULT_RPC as string;

  let url: string;

  if (isProd) {
    url = localStorage.getItem('XDAI_RPC_ENDPOINT_v5') || defaultUrl;
  } else {
    url = 'http://localhost:8545';
  }

  console.log(`GAME METADATA:`);
  console.log(`rpc url:${url}`);
  console.log(`is production: ${isProd}`);
  console.log(`webserver url: ${process.env.DF_WEBSERVER_URL}`);

  return createEthConnection(url);
}
