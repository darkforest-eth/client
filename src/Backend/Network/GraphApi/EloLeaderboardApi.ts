import { EthAddress, GraphConfigPlayer } from '@darkforest_eth/types';
import { competitiveConfig } from '../../../Frontend/Utils/constants';
import { getGraphQLData } from '../GraphApi';

export async function loadPlayerElo(
  config: string,
  address: EthAddress
): Promise<GraphConfigPlayer> {
  const QUERY = `
  query {
    configPlayer(id: "${address}"}) {
        elo,
        wins,
        losses,
        configHash
    }
}
`;
  const rawData = await getGraphQLData(QUERY, process.env.GRAPH_URL || 'localhost:8000');
  return rawData;
}

export async function loadEloLeaderboard(
  config: string = competitiveConfig,
  isCompetitive: boolean = false
): Promise<GraphConfigPlayer[]> {
  const QUERY = `
    query {
        configPlayers(first:1000, where: {configHash: "${config}", gamesFinished_gte:1}) {
            address,
            elo,
            wins,
            losses

        }
    }
    `;

  const rawData = await getGraphQLData(QUERY, process.env.GRAPH_URL || 'localhost:8000');

  if (rawData.error) {
    throw new Error(rawData.error);
  }

  return rawData.data.configPlayers;
}
