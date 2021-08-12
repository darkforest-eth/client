import { EMPTY_ADDRESS, MAX_PLANET_LEVEL } from '@darkforest_eth/constants';
import { bonusFromHex } from '@darkforest_eth/hexgen';
import { Planet, PlanetType } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { ProcgenUtils } from '../../../Backend/Procedural/ProcgenUtils';
import { getPlanetRank } from '../../../Backend/Utils/Utils';
import { isLocatable, StatIdx } from '../../../_types/global/GlobalTypes';
import {
  ArtifactIcon,
  DefenseIcon,
  EnergyGrowthIcon,
  EnergyIcon,
  MaxLevelIcon,
  PiratesIcon,
  RangeIcon,
  RankIcon,
  SilverProdIcon,
  SpeedIcon,
} from '../../Components/Icons';
import { TooltipName } from '../../Game/WindowManager';
import { TooltipTrigger } from '../../Panes/Tooltip';
import dfstyles from '../../Styles/dfstyles';

const StyledPlanetIcons = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: center;

  & > span {
    font-size: 0.9em;
    width: 1.5em;
    height: 1.5em;
    background: ${dfstyles.colors.backgroundlighter};
    border-radius: 2px;
    margin: 0.1em;
    margin-right: 0.25em;
    cursor: help;

    &,
    & > span {
      display: inline-flex !important;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    }
  }
`;

const ClownIcon = styled.span`
  background: red;
  width: 8px;
  height: 8px;
  border-radius: 4px;
`;

export function PlanetIcons({ planet }: { planet: Planet | undefined }) {
  if (!planet) return <StyledPlanetIcons />;
  const bonuses = bonusFromHex(planet.locationId);
  const rank = getPlanetRank(planet);

  return (
    <StyledPlanetIcons>
      {planet.owner === EMPTY_ADDRESS && planet.energy > 0 && (
        <TooltipTrigger name={TooltipName.Pirates}>
          <PiratesIcon />
        </TooltipTrigger>
      )}
      {planet.planetLevel === MAX_PLANET_LEVEL && (
        <TooltipTrigger name={TooltipName.MaxLevel}>
          <MaxLevelIcon />
        </TooltipTrigger>
      )}
      {planet.planetType === PlanetType.SILVER_MINE && (
        <TooltipTrigger name={TooltipName.SilverProd}>
          <SilverProdIcon />
        </TooltipTrigger>
      )}
      {bonuses[StatIdx.EnergyCap] && (
        <TooltipTrigger name={TooltipName.BonusEnergyCap}>
          <EnergyIcon />
        </TooltipTrigger>
      )}
      {bonuses[StatIdx.EnergyGro] && (
        <TooltipTrigger name={TooltipName.BonusEnergyGro}>
          <EnergyGrowthIcon />
        </TooltipTrigger>
      )}
      {bonuses[StatIdx.Range] && (
        <TooltipTrigger name={TooltipName.BonusRange}>
          <RangeIcon />
        </TooltipTrigger>
      )}
      {bonuses[StatIdx.Speed] && (
        <TooltipTrigger name={TooltipName.BonusSpeed}>
          <SpeedIcon />
        </TooltipTrigger>
      )}
      {bonuses[StatIdx.Defense] && (
        <TooltipTrigger name={TooltipName.BonusDefense}>
          <DefenseIcon />
        </TooltipTrigger>
      )}
      {rank > 0 && (
        <TooltipTrigger name={TooltipName.PlanetRank}>
          <RankIcon planet={planet} />
        </TooltipTrigger>
      )}
      {ProcgenUtils.getPlanetName(planet) === 'Clown Town' && (
        <TooltipTrigger name={TooltipName.Clowntown}>
          <ClownIcon />
        </TooltipTrigger>
      )}
      {isLocatable(planet) &&
        planet.planetType === PlanetType.RUINS &&
        !planet.hasTriedFindingArtifact && (
          <TooltipTrigger name={TooltipName.FindArtifact}>
            <ArtifactIcon />
          </TooltipTrigger>
        )}
    </StyledPlanetIcons>
  );
}
