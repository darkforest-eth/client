import React from 'react';
import styled from 'styled-components';
import {
  isLocatable,
  Planet,
  PlanetLevel,
  PlanetResource,
  StatIdx,
} from '../../_types/global/GlobalTypes';
import { ProcgenUtils } from '../../utils/ProcgenUtils';
import { bonusFromHex, getPlanetRank } from '../../utils/Utils';
import { TooltipTrigger } from '../GameWindowPanes/Tooltip';
import { TooltipName } from '../../utils/WindowManager';
import {
  EnergyIcon,
  PiratesIcon,
  RangeIcon,
  RankIcon,
  MaxLevelIcon,
  SilverProdIcon,
  DefenseIcon,
  SpeedIcon,
  EnergyGrowthIcon,
  ArtifactIcon,
} from '../Icons';
import { CheckedTypeUtils } from '../../utils/CheckedTypeUtils';
import dfstyles from '../../styles/dfstyles';
import { GameObjects } from '../../api/GameObjects';

const StyledPlanetIcons = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0.1em;

  & > span {
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
  width: 12px;
  height: 12px;
  border-radius: 6px;
`;

export function PlanetIcons({ planet }: { planet: Planet | null }) {
  if (!planet) return <StyledPlanetIcons />;
  const bonuses = bonusFromHex(planet.locationId);
  const rank = getPlanetRank(planet);

  return (
    <StyledPlanetIcons>
      {planet.owner === CheckedTypeUtils.EMPTY_ADDRESS && planet.energy > 0 && (
        <TooltipTrigger name={TooltipName.Pirates}>
          <PiratesIcon />
        </TooltipTrigger>
      )}
      {planet.planetLevel === PlanetLevel.MAX && (
        <TooltipTrigger name={TooltipName.MaxLevel}>
          <MaxLevelIcon />
        </TooltipTrigger>
      )}
      {planet.planetResource === PlanetResource.SILVER && (
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
        GameObjects.isPlanetMineable(planet) &&
        !planet.hasTriedFindingArtifact && (
          <TooltipTrigger name={TooltipName.FindArtifact}>
            <ArtifactIcon />
          </TooltipTrigger>
        )}
      {planet.heldArtifactId && (
        <TooltipTrigger name={TooltipName.ArtifactStored}>
          <ArtifactIcon />
        </TooltipTrigger>
      )}
    </StyledPlanetIcons>
  );
}
