import { EMPTY_ADDRESS } from '@darkforest_eth/constants';
import { formatNumber } from '@darkforest_eth/gamelogic';
import { getPlayerColor } from '@darkforest_eth/procedural';
import { Planet, PlanetType, PlanetTypeNames } from '@darkforest_eth/types';
import React from 'react';
import { getPlanetRank } from '../../../Backend/Utils/Utils';
import dfstyles from '../../Styles/dfstyles';
import { useAccount, usePlayer, useUIManager } from '../../Utils/AppHooks';
import { EmSpacer } from '../CoreUI';
import { Colored, Sub, Subber, White } from '../Text';
import { TextPreview } from '../TextPreview';
import { OptionalPlanetBiomeLabelAnim } from './BiomeLabels';
import { TwitterLink } from './Labels';
import { SpacetimeRipLabel } from './SpacetimeRipLabel';

/* note that we generally prefer `Planet | undefined` over `Planet` because it
   makes it easier to pass in selected / hovering planet from the emitters      */

/* stat stuff */

export function StatText({
  planet,
  getStat,
  style,
  buff,
}: {
  planet: Planet | undefined;
  getStat: (p: Planet) => number;
  style?: React.CSSProperties;
  buff?: number;
}) {
  const textStyle = {
    ...style,
    color: buff ? dfstyles.colors.dforange : undefined,
  };

  let content;
  if (planet) {
    let stat = getStat(planet);
    if (buff) {
      stat *= buff;
    }
    content = formatNumber(stat, 2);
  } else {
    content = 'n/a';
  }
  return <span style={textStyle}>{content}</span>;
}

export function GrowthText({
  planet,
  getStat,
  style,
}: {
  planet: Planet | undefined;
  getStat: (p: Planet) => number;
  style?: React.CSSProperties;
}) {
  const paused = planet && planet.pausers > 0;
  const statStyle = { ...style, textDecoration: paused ? 'line-through' : 'none' };

  return <StatText style={statStyle} planet={planet} getStat={getStat} />;
}

const getSilver = (p: Planet) => p.silver;
export const SilverText = ({ planet }: { planet: Planet | undefined }) => (
  <StatText planet={planet} getStat={getSilver} />
);

const getSilverCap = (p: Planet) => p.silverCap;
export const SilverCapText = ({ planet }: { planet: Planet | undefined }) => (
  <StatText planet={planet} getStat={getSilverCap} />
);

const getEnergy = (p: Planet) => p.energy;
export const EnergyText = ({ planet }: { planet: Planet | undefined }) => (
  <StatText planet={planet} getStat={getEnergy} />
);

const getEnergyCap = (p: Planet) => p.energyCap;
export const EnergyCapText = ({ planet }: { planet: Planet | undefined }) => (
  <StatText planet={planet} getStat={getEnergyCap} />
);

export function PlanetEnergyLabel({ planet }: { planet: Planet | undefined }) {
  return (
    <span>
      <EnergyText planet={planet} /> <Subber>/</Subber> <EnergyCapText planet={planet} />
    </span>
  );
}

export function PlanetSilverLabel({ planet }: { planet: Planet | undefined }) {
  return (
    <span>
      <SilverText planet={planet} /> <Subber>/</Subber> <SilverCapText planet={planet} />
    </span>
  );
}

const getDefense = (p: Planet) => p.defense;
export const DefenseText = ({ planet }: { planet: Planet | undefined }) => (
  <StatText planet={planet} getStat={getDefense} />
);

const getRange = (p: Planet) => p.range;
export const RangeText = ({ planet, buff }: { planet: Planet | undefined; buff?: number }) => (
  <StatText planet={planet} getStat={getRange} buff={buff} />
);

const getJunk = (p: Planet) => p.spaceJunk;
export const JunkText = ({ planet }: { planet: Planet | undefined }) => (
  <StatText planet={planet} getStat={getJunk} />
);

const getSpeed = (p: Planet) => p.speed;
export const SpeedText = ({ planet, buff }: { planet: Planet | undefined; buff?: number }) => (
  <StatText planet={planet} getStat={getSpeed} buff={buff} />
);

const getEnergyGrowth = (p: Planet) => p.energyGrowth;
export const EnergyGrowthText = ({ planet }: { planet: Planet | undefined }) => (
  <GrowthText planet={planet} getStat={getEnergyGrowth} />
);

const getSilverGrowth = (p: Planet) => p.silverGrowth;
export const SilverGrowthText = ({ planet }: { planet: Planet | undefined }) => (
  <GrowthText planet={planet} getStat={getSilverGrowth} />
);

// level and rank stuff
export const PlanetLevelText = ({ planet }: { planet: Planet | undefined }) =>
  planet ? <>Level {planet.planetLevel}</> : <></>;

export const PlanetRankText = ({ planet }: { planet: Planet | undefined }) =>
  planet ? <>Rank {getPlanetRank(planet)}</> : <></>;

export const LevelRankText = ({
  planet,
  delim,
}: {
  planet: Planet | undefined;
  delim?: string;
}) => (
  <>
    <PlanetLevelText planet={planet} />
    {delim || ', '}
    <PlanetRankText planet={planet} />
  </>
);

export const LevelRankTextEm = ({
  planet,
  delim,
}: {
  planet: Planet | undefined;
  delim?: string;
}) =>
  planet ? (
    <Sub>
      lvl <White>{planet.planetLevel}</White>
      {delim || ', '}
      rank <White>{getPlanetRank(planet)}</White>
    </Sub>
  ) : (
    <></>
  );

export const PlanetTypeLabelAnim = ({ planet }: { planet: Planet | undefined }) => (
  <>
    {planet &&
      (planet.planetType === PlanetType.TRADING_POST ? (
        <SpacetimeRipLabel />
      ) : (
        PlanetTypeNames[planet.planetType]
      ))}
  </>
);

export const PlanetBiomeTypeLabelAnim = ({ planet }: { planet: Planet | undefined }) => (
  <>
    {planet?.planetType !== PlanetType.TRADING_POST && (
      <>
        <OptionalPlanetBiomeLabelAnim planet={planet} />
        <EmSpacer width={0.5} />
      </>
    )}
    <PlanetTypeLabelAnim planet={planet} />
  </>
);

export const PlanetLevel = ({ planet }: { planet: Planet | undefined }) => {
  if (!planet) return <></>;
  return (
    <>
      <Sub>{'Level '}</Sub>
      {planet.planetLevel}
    </>
  );
};

export const PlanetRank = ({ planet }: { planet: Planet | undefined }) => {
  if (!planet) return <></>;
  return (
    <>
      <Sub>{'Rank '}</Sub>
      {getPlanetRank(planet)}
    </>
  );
};

/**
 * Either 'yours' in green text,
 */
export function PlanetOwnerLabel({
  planet,
  abbreviateOwnAddress,
  colorWithOwnerColor,
}: {
  planet: Planet | undefined;
  abbreviateOwnAddress?: boolean;
  colorWithOwnerColor?: boolean;
}) {
  const uiManager = useUIManager();
  const account = useAccount(uiManager);
  const owner = usePlayer(uiManager, planet?.owner);

  const defaultColor = dfstyles.colors.subtext;

  if (!planet) return <>/</>;

  if (planet.owner === EMPTY_ADDRESS) return <Sub>Unclaimed</Sub>;

  if (abbreviateOwnAddress && planet.owner === account) {
    return <Colored color={dfstyles.colors.dfgreen}>yours!</Colored>;
  }

  const color = colorWithOwnerColor ? defaultColor : getPlayerColor(planet.owner);
  if (planet.owner && owner.value?.twitter) {
    return <TwitterLink color={color} twitter={owner.value.twitter} />;
  }

  return (
    <Colored color={color}>
      <TextPreview text={planet.owner} />
    </Colored>
  );
}
