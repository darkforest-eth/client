import { TooltipName } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { Btn } from '../Components/Btn';
import { AccountLabel } from '../Components/Labels/Labels';
import { Gold, Green, Red } from '../Components/Text';
import { TooltipTrigger } from '../Panes/Tooltip';
import { useGameover, useUIManager } from '../Utils/AppHooks';

export function TargetPlanetVictory() {
  const uiManager = useUIManager();
  const gameManager = uiManager.getGameManager();
  const canClaimVictory = uiManager.checkVictoryCondition();
  const gameover = useGameover();
  const requiredPlanets = gameManager.getContractConstants().TARGETS_REQUIRED_FOR_VICTORY;
  const requiredEnergy = gameManager.getContractConstants().CLAIM_VICTORY_ENERGY_PERCENT;

  if (gameover) {
    return <></>;
  }
  return (
    <>
      <GameoverContainer>
        <TooltipTrigger
          extraContent={
            <>
              In this game, you need to capture <Red>{requiredPlanets}</Red> target planet
              {requiredPlanets !== 1 && 's'} and fill each with{' '}
              <Green>{requiredEnergy}% energy</Green>. Then you can claim victory and win the game!
            </>
          }
          name={TooltipName.Empty}
          style={{ gap: '5px' }}
        >
          <span style={{ marginInline: '5px' }}>
            Targets: {gameManager.getTargetsHeld().length}/{requiredPlanets}
          </span>

          {canClaimVictory && (
            <ArenaPortalButton
              onClick={() => uiManager.getGameManager().claimVictory()}
            >
              Claim Victory!
            </ArenaPortalButton>
          )}
        </TooltipTrigger>
      </GameoverContainer>
      {/* <TimeContainer>Game length: {prettyTime(gameDuration)}</TimeContainer> */}
    </>
  );
}

const GameoverContainer = styled.div`
  // font-size: 2em;
  text-align: center;
`;
const TimeContainer = styled.div`
  font-size: 1em;
  text-align: center;
`;

export const ArenaPortalButton = styled.button<{ secondary?: boolean }>`
  padding: 8px 16px;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border: ${({ secondary }) => (!secondary ? '2px solid #2EE7BA' : '1px solid #5F5F5F')};
  color: ${({ secondary }) => (!secondary ? '#2EE7BA' : '#fff')};
  background: ${({ secondary }) => (!secondary ? '#09352B' : '#252525')};
  border-radius: 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 80ms ease 0s, border-color;
  &:hover {
    background: ${({ secondary }) => (!secondary ? '#0E5141' : '#3D3D3D')};
    border-color: ${({ secondary }) => (!secondary ? '#30FFCD' : '#797979')};
  }
`;
