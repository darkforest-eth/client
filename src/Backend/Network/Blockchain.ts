// These are loaded as URL paths by a webpack loader
import coreContractAbiUrl from '@darkforest_eth/contracts/abis/DarkForestCore.json';
import gettersContractAbiUrl from '@darkforest_eth/contracts/abis/DarkForestGetters.json';
import gptCreditContractAbiUrl from '@darkforest_eth/contracts/abis/DarkForestGPTCredit.json';
import scoringContractAbiUrl from '@darkforest_eth/contracts/abis/DarkForestScoringRound3.json';
import whitelistContractAbiUrl from '@darkforest_eth/contracts/abis/Whitelist.json';
import type {
  DarkForestCore,
  DarkForestGetters,
  DarkForestGPTCredit,
  DarkForestScoringRound3,
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

/**
 * Loads ths GPT Credit contract, which players can pay to talk to artifacts.
 * @see https://github.com/darkforest-eth/eth/blob/master/contracts/DarkForestGPTCredit.sol
 */
export async function loadGptCreditContract(
  address: string,
  provider: providers.JsonRpcProvider,
  signer?: Wallet
): Promise<DarkForestGPTCredit> {
  const gptCreditContractAbi = await fetch(gptCreditContractAbiUrl).then((r) => r.json());

  return createContract<DarkForestGPTCredit>(address, gptCreditContractAbi, provider, signer);
}

/**
 * Loads the Round 3 Scoring contract which tracks claimed planets and player claim cooldowns.
 * @see https://github.com/darkforest-eth/eth/blob/master/contracts/DarkForestRound3Scoring.sol
 */
export async function loadScoringContract(
  address: string,
  provider: providers.JsonRpcProvider,
  signer?: Wallet
): Promise<DarkForestScoringRound3> {
  const scoringContractAbi = await fetch(scoringContractAbiUrl).then((r) => r.json());

  return createContract<DarkForestScoringRound3>(address, scoringContractAbi, provider, signer);
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

  return createEthConnection(url);
}
