import {
  BadgeSet,
  BadgeType,
  ConfigBadge,
} from '@darkforest_eth/types';

// Given a season, get all badges won by all Players
export function graphBadgeToGrandPrixBadge(
  graphBadge: BadgeSet | undefined,
  configHash: string
): ConfigBadge[] {
  if(!graphBadge) return [];
  const badges: BadgeType[] = [];

  if (graphBadge.startYourEngine) badges.push(BadgeType.StartYourEngine);
  if (graphBadge.nice) badges.push(BadgeType.Nice);
  if (graphBadge.ouch) badges.push(BadgeType.Sleepy);
  if (graphBadge.based) badges.push(BadgeType.Tree);
  if (graphBadge.wallBreaker) badges.push(BadgeType.Wallbreaker);

  return badges.map((badge) => {
    return {
      type: badge,
      configHash,
    };
  });
}

export function getBadges(configHash: string, configBadges: BadgeSet[]): ConfigBadge[] {
  return configBadges.map((configBadge) => graphBadgeToGrandPrixBadge(configBadge,configHash)).flat();
}
