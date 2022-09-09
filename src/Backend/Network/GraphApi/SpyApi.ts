import { CleanMatchEntry, ExtendedMatchEntry, GrandPrixMetadata, LiveMatch } from '@darkforest_eth/types';
import { getGraphQLData } from '../GraphApi';
import { validGrandPrixMatch } from './SeasonLeaderboardApi';

export const loadLiveMatches = async (
  seasonData: GrandPrixMetadata[],
  configHash?: string
): Promise<LiveMatch> => {
  // Get last week of data.
  const startTime = Math.round((Date.now() - 1000 * 60 * 60 * 24 * 7) / 1000);

  const hash = configHash ? `configHash: "${configHash}",` : '';
  const query = `
    query {
      arenas(first: 1000, orderBy: startTime, orderDirection: desc, where: {startTime_gt: ${startTime}, ${hash}}) {
      lobbyAddress
      firstMover {
        address
      },  
      players {
        address
        moves
      }
      creator,
      id
      startTime,
      endTime,
      configHash
      planets {
        spawnPlanet
      }
      gameOver
      duration  
      }
    }`;

  const response = await getGraphQLData(query, process.env.GRAPH_URL || 'localhost:8000');
  if ('errors' in response) {
    throw new Error(`error when fetching data, ${JSON.stringify(response)}`);
  }

  const { arenas } = response.data;
  if (arenas === null) {
    throw new Error(`error when fetching data, ${JSON.stringify(response)}`);
  }

  return { entries: cleanLiveMatches(arenas as ExtendedMatchEntry[], seasonData) };
};

function calcMoves(match: ExtendedMatchEntry) {
  const players = match.players;
  if (!players || players.length == 0) return 0;
  else {
    return players.map((lm) => lm.moves).reduce((a, b) => a + b);
  }
}
export function cleanLiveMatches(liveMatches: ExtendedMatchEntry[], seasonData: GrandPrixMetadata[]) {
  return liveMatches
  .filter(lm => validGrandPrixMatch(lm.configHash,lm.startTime,seasonData))
  .map((lm) => {
    const clean: CleanMatchEntry = {
      creator: lm.creator,
      lobbyAddress: lm.lobbyAddress,
      moves: calcMoves(lm),
      configHash: lm.configHash,
      numSpawn: lm.planets.length,
      gameOver: lm.gameOver,
      duration: lm.duration,
      startTime: lm.startTime,
      endTime: lm.endTime,
      players: lm.players ? lm.players.map((p) => p.address) : [],
    };
    return clean;
  });
}
