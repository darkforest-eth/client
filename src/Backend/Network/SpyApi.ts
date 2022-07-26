import { LiveMatch, LiveMatchEntry } from '@darkforest_eth/types';
import { apiUrl, competitiveConfig } from '../../Frontend/Utils/constants';
import { getGraphQLData } from './GraphApi';
import { getAllTwitters } from './UtilityServerAPI';

export const loadLiveMatches = async (
  config: string = competitiveConfig,
  multiplayer?: boolean
): Promise<LiveMatch> => {
  const multiplayerStats = multiplayer ? `players {address}` : '';

  const query = `
    query {
      arenas(first: 1000, orderBy: startTime, orderDirection: desc, where: {configHash: "${config}", gameOver: false}) {
      firstMover {
        address
      },  
      ${multiplayerStats}
      creator,
      id
      startTime
      }
    }`;

  const response = await getGraphQLData(
    query,
    apiUrl
  );

  if ('errors' in response) {
    throw new Error(`error when fetching data, ${JSON.stringify(response)}`);
  }

  const { arenas } = response.data;
  if (arenas === null) {
    throw new Error(`error when fetching data, ${JSON.stringify(response)}`);
  }

  return { entries: arenas };
};
