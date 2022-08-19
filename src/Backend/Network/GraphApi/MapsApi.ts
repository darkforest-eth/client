import { EthAddress } from '@darkforest_eth/types';
import { getGraphQLData } from '../GraphApi';

export interface MapInfo {
  creator: EthAddress;
  configHash: string;
  lobbyAddress?: EthAddress;
  startTime?: number;
  winners?: EthAddress[];
}

export async function loadRecentMaps(
  nMaps?: number,
  configHash?: string,
  creator?: string
): Promise<MapInfo[] | undefined> {
  const where = configHash ? `configHash: "${configHash}"` : creator ? `creator: "${creator}"` : '';
  const query = `
	query {
		arenas(${
      nMaps ? `first:${nMaps}` : ``
    }, orderBy:creationTime, orderDirection:desc, where:{${where}} ) {
			configHash
			creator
			lobbyAddress
			startTime
		}
	}
	`;
  return (await getGraphQLData(query, process.env.GRAPH_URL || 'localhost:8000')).data?.arenas;
}
