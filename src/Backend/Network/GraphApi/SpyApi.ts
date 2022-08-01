import { LiveMatch } from '@darkforest_eth/types';
import { apiUrl } from '../../../Frontend/Utils/constants';
import { getGraphQLData } from '../GraphApi';

export const loadLiveMatches = async (config?: string): Promise<LiveMatch> => {
  const startTime = Math.round((Date.now() - 1000 * 60 * 60 * 24 * 7) / 1000);

  const configHash = config ? `configHash: "${config}",` : '';
  const query = `
    query {
      arenas(first: 1000, orderBy: startTime, orderDirection: desc, where: {startTime_gt: ${startTime}, ${configHash} gameOver: false}) {
      firstMover {
        address
      },  
      players {address}
      creator,
      id
      startTime,
      configHash
planets{spawnPlanet}  

      }
    }`;

  const response = await getGraphQLData(query, apiUrl);

  if ('errors' in response) {
    throw new Error(`error when fetching data, ${JSON.stringify(response)}`);
  }

  const { arenas } = response.data;
  if (arenas === null) {
    throw new Error(`error when fetching data, ${JSON.stringify(response)}`);
  }

  return { entries: arenas };
};
