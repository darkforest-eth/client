import { EMPTY_ADDRESS } from '@darkforest_eth/constants';
import { Planet, PlanetType, PlanetTypeNames } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { ProcgenUtils } from '../../../Backend/Procedural/ProcgenUtils';
import { formatNumber, getPlanetRank } from '../../../Backend/Utils/Utils';
import dfstyles from '../../Styles/dfstyles';
import { useAccount, usePlayer, useUIManager } from '../../Utils/AppHooks';
import { EmSpacer } from '../CoreUI';
import { Colored, Sub, White } from '../Text';
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
}: {
  planet: Planet | undefined;
  getStat: (p: Planet) => number;
}) {
  return <>{planet ? formatNumber(getStat(planet), 2) : 'n/a'}</>;
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
      <EnergyText planet={planet} /> <Sub>/</Sub> <EnergyCapText planet={planet} />
    </span>
  );
}

export function PlanetSilverLabel({ planet }: { planet: Planet | undefined }) {
  return (
    <span>
      <SilverText planet={planet} /> <Sub>/</Sub> <SilverCapText planet={planet} />
    </span>
  );
}

const getDefense = (p: Planet) => p.defense;
export const DefenseText = ({ planet }: { planet: Planet | undefined }) => (
  <StatText planet={planet} getStat={getDefense} />
);

const getRange = (p: Planet) => p.range;
export const RangeText = ({ planet }: { planet: Planet | undefined }) => (
  <StatText planet={planet} getStat={getRange} />
);

const getSpeed = (p: Planet) => p.speed;
export const SpeedText = ({ planet }: { planet: Planet | undefined }) => (
  <StatText planet={planet} getStat={getSpeed} />
);

const getEnergyGrowth = (p: Planet) => p.energyGrowth;
export const EnergyGrowthText = ({ planet }: { planet: Planet | undefined }) => (
  <StatText planet={planet} getStat={getEnergyGrowth} />
);

const getSilverGrowth = (p: Planet) => p.silverGrowth;
export const SilverGrowthText = ({ planet }: { planet: Planet | undefined }) => (
  <StatText planet={planet} getStat={getSilverGrowth} />
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

const LevelLabelContainer = styled.div`
  border-radius: 3px;
  background-color: ${dfstyles.colors.backgroundlight};
  padding: 2px 8px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export const PlanetLevel = ({ planet }: { planet: Planet | undefined }) => {
  if (!planet) return <></>;
  return (
    <LevelLabelContainer>
      <Sub>{'Level'}</Sub>
      <EmSpacer width={0.5} />
      {planet.planetLevel}
    </LevelLabelContainer>
  );
};

export const PlanetRank = ({ planet }: { planet: Planet | undefined }) => {
  if (!planet) return <></>;
  return (
    <LevelLabelContainer>
      <Sub>{'Rank'}</Sub>
      <EmSpacer width={0.5} />
      {getPlanetRank(planet)}
    </LevelLabelContainer>
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

  const color = colorWithOwnerColor ? defaultColor : ProcgenUtils.getPlayerColor(planet.owner);
  if (planet.owner && owner.value?.twitter) {
    return <TwitterLink color={color} twitter={owner.value.twitter} />;
  }

  return (
    <Colored color={color}>
      <TextPreview text={planet.owner} />
    </Colored>
  );
}
