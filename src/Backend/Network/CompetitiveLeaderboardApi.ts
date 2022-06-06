import { EMPTY_ADDRESS } from '@darkforest_eth/constants';
import { address } from '@darkforest_eth/serde';
import {
  ArenaLeaderboard,
  ArenaLeaderboardEntry,
  Leaderboard,
  LeaderboardEntry,
} from '@darkforest_eth/types';
import {
  roundEndTimestamp,
  roundStartTimestamp,
  competitiveConfig,
} from '../../Frontend/Utils/constants';
import { getAllTwitters } from './UtilityServerAPI';

const QUERY = `
query {
  arenas(first:1000, where: {configHash: "${competitiveConfig}"}) {
    id
    startTime
    winners(first :1) {
      address
   }
    gameOver
    endTime
    duration
  }
}
`;

const API_URL_GRAPH = 'https://graph-optimism.gnosischain.com/subgraphs/name/dfdao/arena-v1';

export async function loadCompetitiveLeaderboard(): Promise<Leaderboard> {
  const data = await fetchGQL(QUERY);
  return data;
}

interface winners {
  address: string;
}
interface graphArena {
  winners: winners[];
  creator: string;
  duration: number | null;
  endTime: number | null;
  gameOver: boolean;
  id: string;
  startTime: number;
}

async function fetchGQL(query: any, graphApiUrl = API_URL_GRAPH) {
  const response = await fetch(graphApiUrl, {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const rep = await response.json();

  if (rep.error) {
    throw new Error(rep.error);
  }

  const ret = await convertData(rep.data.arenas);

  return ret;
}

async function convertData(arenas: graphArena[]): Promise<Leaderboard> {
  let entries: LeaderboardEntry[] = [];
  const twitters = await getAllTwitters();

  const roundStart = new Date(roundStartTimestamp).getTime() / 1000;

  const roundEnd = new Date(roundEndTimestamp).getTime() / 1000;
  for (const arena of arenas) {
    if (
      !arena.gameOver ||
      !arena.endTime ||
      !arena.duration ||
      arena.startTime == 0 ||
      arena.winners.length == 0 ||
      !arena.winners[0].address ||
      roundEnd < arena.endTime ||
      roundStart > arena.startTime
    )
      continue;

    const winnerAddress = address(arena.winners[0].address);
    const entry = entries.find((p) => winnerAddress == p.ethAddress);

    if (!entry) {
      entries.push({
        ethAddress: winnerAddress,
        score: arena.duration,
        twitter: twitters[winnerAddress],
      });
    } else if (entry.score && entry.score > arena.duration) {
      entry.score = arena.duration;
    }
  }

  return { entries, length: arenas.length };
}
