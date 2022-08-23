import { address } from '@darkforest_eth/serde';
import { BadgeSet, BadgeType, ConfigBadges, GrandPrixBadge } from '@darkforest_eth/types';
import { SEASON_GRAND_PRIXS } from '../../../Frontend/Utils/constants';
import { getGraphQLData } from '../GraphApi';

// Given a player address, gets the all the badges they won in a given season.
// TODO: add Wallbreaker badges
// Filter this data for a specific configHash to get data for a specific GrandPrix
export async function loadSeasonBadges(player: string): Promise<BadgeType[]> {
  // Fetch players data. Parse badges.
  const stringHashes = SEASON_GRAND_PRIXS.map((season) => `"${season.configHash}"`);
  const QUERY = `
query
  {
    configPlayers(
      where: {
        configHash_in: [${stringHashes}],
        bestTime_:{gameOver: true},
        address: "${address(player)}"
      }
    ) {
      configHash
      badge {
        based
        ouch
        startYourEngine
        nice
      }
    }
  }
`;
  const rawData = await getGraphQLData(QUERY, process.env.GRAPH_URL || 'localhost:8000');
  if (rawData.error) {
    throw new Error(rawData.error);
  }  // return ret;
  const finalBadges = getBadges(rawData.data.configPlayers);
  return finalBadges
}

// Given a season, get all badges won by all Players
export function graphBadgeToGrandPrixBadge(graphBadge: BadgeSet): BadgeType[] {
  const badges: BadgeType[] = [];

  if(graphBadge.startYourEngine) badges.push(
      BadgeType.StartYourEngine
  )
  if(graphBadge.wallBreaker) badges.push(
    BadgeType.Wallbreaker
  )
  // TODO: Add all the badge types
  return badges;
}

export function getBadges(configBadges: BadgeSet[]): BadgeType[]  {
  return (configBadges.map(configBadge => graphBadgeToGrandPrixBadge(configBadge)).flat())
}
