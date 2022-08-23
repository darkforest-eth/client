import { address } from '@darkforest_eth/serde';
import { GraphArena, Leaderboard, LeaderboardEntry } from '@darkforest_eth/types';
import {
  roundEndTimestamp,
  roundStartTimestamp,
  competitiveConfig,
} from '../../../Frontend/Utils/constants';
import { getGraphQLData } from '../GraphApi';
import { getAllTwitters } from '../UtilityServerAPI';

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
      });
    } else if (entry.time && entry.time > arena.duration) {
      entry.time = arena.duration;
    }
  }

  return { entries, length: arenas.length };
}
