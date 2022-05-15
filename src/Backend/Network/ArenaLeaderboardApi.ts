import { ArenaLeaderboard, ArenaLeaderboardEntry } from '@darkforest_eth/types';
import { getAllTwitters } from './UtilityServerAPI';

const QUERY = `
query {
  arenaPlayers(first: 1000) {
    address
    winner
  }
}
`;

const API_URL_GRAPH = 'https://graph-optimism.gnosischain.com/subgraphs/name/arena/test';

export async function loadArenaLeaderboard(): Promise<ArenaLeaderboard> {
  const data = await fetchGQL(QUERY);

  return data;
}

interface graphPlayer {
  address: string;
  winner: boolean;
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
  console.log(rep);

  if (rep.error) {
    throw new Error(rep.error);
  }

  const ret = await convertData(rep.data.arenaPlayers);

  return ret;
}

async function convertData(inputPlayers: graphPlayer[]): Promise<ArenaLeaderboard> {
  let players: ArenaLeaderboardEntry[] = [];
  const twitters = await getAllTwitters();

  
  console.log(JSON.stringify(twitters));
  for (const player of inputPlayers) {
    const entry = players.find((p) => player.address == p.address);
    if (!!entry) {
      entry.games++;
      if (player.winner) entry.wins++;
    } else {
      players.push({ address: player.address, games: 1, wins: player.winner ? 1 : 0, twitter: twitters[player.address]});
    }
  }

  return {entries: players} as ArenaLeaderboard;
}
 