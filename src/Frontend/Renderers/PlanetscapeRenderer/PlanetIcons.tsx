import { EMPTY_ADDRESS, MAX_PLANET_LEVEL } from '@darkforest_eth/constants';
import { isLocatable } from '@darkforest_eth/gamelogic';
import { bonusFromHex } from '@darkforest_eth/hexgen';
import { getPlanetName } from '@darkforest_eth/procedural';
import { Planet, PlanetType, TooltipName } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { getPlanetRank } from '../../../Backend/Utils/Utils';
import { StatIdx } from '../../../_types/global/GlobalTypes';
import { Icon, IconType, RankIcon } from '../../Components/Icons';
import { TooltipTrigger } from '../../Panes/Tooltip';
import dfstyles from '../../Styles/dfstyles';
import { useUIManager } from '../../Utils/AppHooks';

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
  const uiManager = useUIManager();

  if (!planet) return <StyledPlanetIcons />;
  const bonuses = bonusFromHex(planet.locationId);
  const rank = getPlanetRank(planet);

  let captureZoneIcons = null;
  if (uiManager.captureZonesEnabled) {
    const captureZoneGenerator = uiManager.getCaptureZoneGenerator();
    if (captureZoneGenerator) {
      captureZoneIcons = (
        <>
          {captureZoneGenerator.isInZone(planet.locationId) &&
            uiManager.potentialCaptureScore(planet.planetLevel) > 0 &&
            planet.invader === EMPTY_ADDRESS &&
            planet.capturer === EMPTY_ADDRESS && (
              <TooltipTrigger name={TooltipName.Invadable}>
                <Icon type={IconType.Invadable} />
              </TooltipTrigger>
            )}
          {planet.invader !== EMPTY_ADDRESS && planet.capturer === EMPTY_ADDRESS && (
            <TooltipTrigger name={TooltipName.Capturable}>
              <Icon type={IconType.Capturable} />
            </TooltipTrigger>
          )}
          {planet.capturer !== EMPTY_ADDRESS && (
            <TooltipTrigger
              name={TooltipName.Empty}
              extraContent={<>This planet has been captured by {planet.capturer}</>}
            >
              <Icon type={IconType.Capturable} />
            </TooltipTrigger>
          )}
        </>
      );
    }
  }

  return (
    <StyledPlanetIcons>
      {planet.owner === EMPTY_ADDRESS && planet.energy > 0 && (
        <TooltipTrigger name={TooltipName.Pirates}>
          <Icon type={IconType.Pirates} />
        </TooltipTrigger>
      )}
      {planet.planetLevel === MAX_PLANET_LEVEL && (
        <TooltipTrigger name={TooltipName.MaxLevel}>
          <Icon type={IconType.MaxLevel} />
        </TooltipTrigger>
      )}
      {planet.planetType === PlanetType.SILVER_MINE && (
        <TooltipTrigger name={TooltipName.SilverProd}>
          <Icon type={IconType.SilverProd} />
        </TooltipTrigger>
      )}
      {bonuses[StatIdx.EnergyCap] && (
        <TooltipTrigger name={TooltipName.BonusEnergyCap}>
          <Icon type={IconType.Energy} />
        </TooltipTrigger>
      )}
      {bonuses[StatIdx.EnergyGro] && (
        <TooltipTrigger name={TooltipName.BonusEnergyGro}>
          <Icon type={IconType.EnergyGrowth} />
        </TooltipTrigger>
      )}
      {bonuses[StatIdx.Range] && (
        <TooltipTrigger name={TooltipName.BonusRange}>
          <Icon type={IconType.Range} />
        </TooltipTrigger>
      )}
      {bonuses[StatIdx.Speed] && (
        <TooltipTrigger name={TooltipName.BonusSpeed}>
          <Icon type={IconType.Speed} />
        </TooltipTrigger>
      )}
      {bonuses[StatIdx.Defense] && (
        <TooltipTrigger name={TooltipName.BonusDefense}>
          <Icon type={IconType.Defense} />
        </TooltipTrigger>
      )}
      {bonuses[StatIdx.SpaceJunk] && (
        <TooltipTrigger name={TooltipName.BonusSpaceJunk}>
          <Icon type={IconType.Sparkles} />
        </TooltipTrigger>
      )}
      {rank > 0 && (
        <TooltipTrigger name={TooltipName.PlanetRank}>
          <RankIcon planet={planet} />
        </TooltipTrigger>
      )}
      {getPlanetName(planet) === 'Clown Town' && (
        <TooltipTrigger name={TooltipName.Clowntown}>
          <ClownIcon />
        </TooltipTrigger>
      )}
      {isLocatable(planet) &&
        planet.planetType === PlanetType.RUINS &&
        !planet.hasTriedFindingArtifact && (
          <TooltipTrigger name={TooltipName.FindArtifact}>
            <Icon type={IconType.Artifact} />
          </TooltipTrigger>
        )}
      {captureZoneIcons}
      {planet.destroyed && (
        <TooltipTrigger
          name={TooltipName.Empty}
          extraContent={
            <>
              This planet is destroyed. It does not generate energy or silver, all incoming voyages
              are void, and you cannot send or receive energy from it.
            </>
          }
        >
          <Icon type={IconType.Destroyed} />
        </TooltipTrigger>
      )}
    </StyledPlanetIcons>
  );
}
