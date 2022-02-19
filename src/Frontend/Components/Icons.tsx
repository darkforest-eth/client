// should be able to be treated as a text element
import { Planet, UpgradeBranchName } from '@darkforest_eth/types';
import { DarkForestIcon, IconType } from '@darkforest_eth/ui';
import { createComponent } from '@lit-labs/react';
import React from 'react';
import { getPlanetRank, isFullRank } from '../../Backend/Utils/Utils';
import { StatIdx } from '../../_types/global/GlobalTypes';

// TODO: Decide if this is the best place to register the custom elements
customElements.define(DarkForestIcon.tagName, DarkForestIcon);

// This wraps the customElement in a React wrapper to make it behave exactly like a React component
export const Icon = createComponent(React, DarkForestIcon.tagName, DarkForestIcon, {
  // If we had any, we would map DOM events to React handlers passed in as props. For example:
  // onClick: 'click'
});

// Re-export the IconType abstract type & the "enum" object for easier access
export { IconType } from '@darkforest_eth/ui';

// Utilities for calculating an Icon from some context.
// I think these should be made into utilities that return the `IconType`
// instead of an Icon JSXElement
export const RankIcon = ({ planet }: { planet: Planet | undefined }) => {
  const rank = getPlanetRank(planet);
  if (isFullRank(planet)) return <Icon type={IconType.RankMax} />;
  if (rank === 1) return <Icon type={IconType.RankOne} />;
  else if (rank === 2) return <Icon type={IconType.RankTwo} />;
  else if (rank === 3) return <Icon type={IconType.RankThree} />;
  return <Icon type={IconType.RankFour} />;
};

export const BranchIcon = ({ branch }: { branch: number }) => {
  if (branch === UpgradeBranchName.Range) return <Icon type={IconType.Energy} />;
  // TODO: Wat
  else if (branch === UpgradeBranchName.Defense) return <Icon type={IconType.Silver} />;
  else return <Icon type={IconType.Range} />;
};

export const StatIcon = ({ stat }: { stat: StatIdx }) => {
  if (stat === StatIdx.Defense) return <Icon type={IconType.Defense} />;
  else if (stat === StatIdx.EnergyGro) return <Icon type={IconType.EnergyGrowth} />;
  else if (stat === StatIdx.EnergyCap) return <Icon type={IconType.Energy} />;
  else if (stat === StatIdx.Range) return <Icon type={IconType.Range} />;
  else if (stat === StatIdx.Speed) return <Icon type={IconType.Speed} />;
  // TODO: lulz what
  else return <Icon type={IconType.Defense} />;
};

/**
 Allow for tweaking the size of an icon based on the context.
 Biome & Spacetype Notifications should fill the notification box
 Others should be 3/4's the size and centered
*/
interface AlertIcon {
  height?: string;
  width?: string;
}

export const Quasar = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/planettypes/quasar.svg' />;
};

export const FoundRuins = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/planettypes/ruins.svg' />;
};

export const FoundSpacetimeRip = ({ height, width }: AlertIcon) => {
  return (
    <img height={height} width={width} src='/public/icons/alerts/planettypes/tradingpost.svg' />
  );
};

export const FoundSilver = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/planettypes/asteroid.svg' />;
};

export const FoundTradingPost = ({ height, width }: AlertIcon) => {
  return (
    <img height={height} width={width} src='/public/icons/alerts/planettypes/tradingpost.svg' />
  );
};

export const FoundSpace = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/spacetypes/space.svg' />;
};

export const FoundDeepSpace = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/spacetypes/deepspace.svg' />;
};

export const FoundDeadSpace = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/spacetypes/deadspace.svg' />;
};

export const FoundPirates = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/combat/pirates.svg' />;
};

export const Generic = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/generic/generic.svg' />;
};

export const ArtifactFound = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/artifacts/find.svg' />;
};
export const ArtifactProspected = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/artifacts/prospect.svg' />;
};

export const FoundOcean = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/biomes/ocean.svg' />;
};

export const FoundForest = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/biomes/forest.svg' />;
};

export const FoundGrassland = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/biomes/grassland.svg' />;
};

export const FoundTundra = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/biomes/tundra.svg' />;
};

export const FoundSwamp = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/biomes/swamp.svg' />;
};

export const FoundDesert = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/biomes/desert.svg' />;
};

export const FoundIce = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/biomes/ice.svg' />;
};

export const FoundWasteland = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/biomes/wasteland.svg' />;
};

export const FoundLava = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/biomes/lava.svg' />;
};

export const FoundCorrupted = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/biomes/corrupted.svg' />;
};
export const PlanetAttacked = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/combat/planetattacked.svg' />;
};
export const PlanetLost = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/combat/planetlost.svg' />;
};
export const PlanetConquered = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/combat/planetwon.svg' />;
};
export const MetPlayer = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/combat/metplayer.svg' />;
};
export const TxAccepted = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/transactions/accepted.svg' />;
};
export const TxConfirmed = ({ height, width }: AlertIcon) => {
  return (
    <img height={height} width={width} src='/public/icons/alerts/transactions/confirmed.svg' />
  );
};
export const TxInitialized = ({ height, width }: AlertIcon) => {
  return (
    <img height={height} width={width} src='/public/icons/alerts/transactions/initialized.svg' />
  );
};
export const TxDeclined = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='/public/icons/alerts/transactions/declined.svg' />;
};
