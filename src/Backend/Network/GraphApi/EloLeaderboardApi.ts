import { EthAddress } from '@darkforest_eth/types';
import { competitiveConfig } from '../../../Frontend/Utils/constants';
import { getGraphQLData } from '../GraphApi';

const testData: { data: { configPlayers: GraphConfigPlayer[] }; error: undefined } = {
  data: {
    configPlayers: [
      {
        address: '0x9ceb592706faf42dc2299d9089fca49c8f35de60',
        elo: 1400,
        wins: 14,
        losses: 2,
      },
      {
        address: '0x74f511484aC94B24b4d73C0089B7B782202EEA53',
        elo: 400,
        wins: 2,
        losses: 14,
      },
    ],
  },
  error: undefined,
};

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

export interface GraphConfigPlayer {
  address: string;
  elo: number;
  wins: number;
  losses: number;
}
