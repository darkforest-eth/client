import React from 'react';
import styled from 'styled-components';
import { isLocatable, StatIdx } from '../../../_types/global/GlobalTypes';
import dfstyles from '../../Styles/dfstyles';
import { PlanetLevel, PlanetType, Planet } from '@darkforest_eth/types';
import { ProcgenUtils } from '../../../Backend/Procedural/ProcgenUtils';
import { getPlanetRank } from '../../../Backend/Utils/Utils';
import {
  PiratesIcon,
  MaxLevelIcon,
  SilverProdIcon,
  EnergyIcon,
  EnergyGrowthIcon,
  RangeIcon,
  SpeedIcon,
  DefenseIcon,
  RankIcon,
  ArtifactIcon,
} from '../../Components/Icons';
import { TooltipName } from '../../Game/WindowManager';
import { TooltipTrigger } from '../../Panes/Tooltip';
import { EMPTY_ADDRESS } from '@darkforest_eth/constants';
import { bonusFromHex } from '@darkforest_eth/hexgen';

const StyledPlanetIcons = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap-reverse;
  padding: 0.1em;

  & > span {
    font-size: 8pt;
    width: 1.5em;
    height: 1.5em;
    border: 1px solid ${dfstyles.colors.text};
    background: ${dfstyles.colors.backgroundlighter};
    border-radius: 2px;
    margin: 0.1em;

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
      {planet.planetLevel === PlanetLevel.MAX && (
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
