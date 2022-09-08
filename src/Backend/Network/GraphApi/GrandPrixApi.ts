import { createContract, EthConnection } from '@darkforest_eth/network';
import { address } from '@darkforest_eth/serde';
import {
  EthAddress,
  GrandPrixMetadata,
  GraphArena,
  Leaderboard,
  LeaderboardEntry,
  RegistryResponse,
} from '@darkforest_eth/types';
import {
  roundEndTimestamp,
  roundStartTimestamp,
  competitiveConfig,
  DUMMY,
  SEASON_GRAND_PRIXS,
} from '../../../Frontend/Utils/constants';
import { getGraphQLData } from '../GraphApi';
import { getAllTwitters } from '../UtilityServerAPI';
import RegistryAbi from "@dfdao/dynasty/abi/Registry.json";
// Contract addresses
import deploymentUrl from "@dfdao/dynasty/deployment.json";
import { Contract, ethers, providers, Wallet } from 'ethers';
import { Registry } from '@dfdao/dynasty/types'

/**
 * Purpose:
 * Fetch necessary data for Grand Prixs
 */

export async function loadArenaLeaderboard(
  config: string = competitiveConfig,
  isCompetitive: boolean
): Promise<Leaderboard> {
  const QUERY = `
query {
  arenas(
    first:1000, 
    where: {configHash: "${config}", duration_not: null}
    orderBy: duration
    orderDirection: asc
  )
  {
    id
    startTime
    winners(first :1) {
      address
      moves
   }    
    gameOver
    endTime
    duration
  }
}
`;
  const rawData = await getGraphQLData(QUERY, process.env.GRAPH_URL || 'localhost:8000');
  if (rawData.error) {
    throw new Error(rawData.error);
  }
  const ret = await convertData(rawData.data.arenas, config == competitiveConfig);
  return ret;
}

async function convertData(arenas: GraphArena[], isCompetitive: boolean): Promise<Leaderboard> {
  let entries: LeaderboardEntry[] = [];
  const twitters = await getAllTwitters();

  const roundStart = new Date(roundStartTimestamp).getTime() / 1000;

  const roundEnd = new Date(roundEndTimestamp).getTime() / 1000;
  for (const arena of arenas) {
    if (
      !arena.gameOver ||
      !arena.endTime ||
      !arena.duration ||
      // arena.startTime == 0 ||
      // arena.winners.length == 0 ||
      // !arena.winners[0].address ||
      (isCompetitive && (roundEnd <= arena.endTime || roundStart >= arena.startTime))
    )
      continue;

    const winnerAddress = address(arena.winners[0].address);
    const entry = entries.find((p) => winnerAddress == p.ethAddress);

    if (!entry) {
      entries.push({
        ethAddress: winnerAddress,
        score: undefined,
        twitter: twitters[winnerAddress],
        moves: arena.winners[0].moves,
        startTime: arena.startTime,
        endTime: arena.endTime,
        time: arena.duration,
        gamesFinished: 0,
        gamesStarted: 0
      });
    } else if (entry.time && entry.time > arena.duration) {
      entry.time = arena.duration;
    }
  }

  return { entries, length: arenas.length };
}


export async function loadRegistryContract<T extends Contract>(
  address: string,
  provider: providers.JsonRpcProvider,
  signer?: Wallet
): Promise<T> {
  const abi = await fetch(RegistryAbi).then((r) => r.json());
  return createContract<T>(address, abi.abi, provider, signer);
}

export async function loadRegistry(
  ethConnection: EthConnection,
): Promise<GrandPrixMetadata[]> {
  if(DUMMY) {
    return SEASON_GRAND_PRIXS;
  }
  
  const deployment = await fetch(deploymentUrl).then((r) => r.json());

  const registry = await ethConnection.loadContract<Registry>(deployment.registry, loadRegistryContract);
  const allGrandPrix = await registry.getAllGrandPrix();
  const metadata: GrandPrixMetadata[] = [];
  allGrandPrix.map(gp => {
    if(gp.parentAddress != ethers.constants.AddressZero) {
      metadata.push({
        configHash: gp.configHash,
        seasonId: gp.seasonId.toNumber(),
        startTime: Math.floor(gp.startTime.toNumber() / 1000),
        endTime: Math.floor(gp.endTime.toNumber() / 1000),
        parentAddress: address(gp.parentAddress)
      })
    }
  })
  return metadata;
}
