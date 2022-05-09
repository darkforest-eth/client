import {
  isUnconfirmedClaimVictoryTx
} from '@darkforest_eth/serde';
import { Planet, TooltipName } from '@darkforest_eth/types';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { TooltipTrigger } from '../Panes/Tooltip';
import { useAccount, useUIManager } from '../Utils/AppHooks';
import { INVADE } from '../Utils/ShortcutConstants';
import { LoadingSpinner } from './LoadingSpinner';
import { MaybeShortcutButton } from './MaybeShortcutButton';
import { Row } from './Row';
import { Green, White } from './Text';

const StyledRow = styled(Row)`
  .button {
    margin-bottom: 4px;
    flex-grow: 1;
  }
`;

export function TargetPlanetButton({
  planetWrapper,
}: {
  planetWrapper: Wrapper<Planet | undefined>;
}) {
  const uiManager = useUIManager();
  const account = useAccount(uiManager);
  const gameManager = uiManager.getGameManager();
  const planet = planetWrapper.value;
  const owned = planet?.owner === account;
  const isTargetPlanet = planet?.isTargetPlanet;
  const gameOver = gameManager.isRoundOver();

  const shouldShow = useMemo(
    () => owned && isTargetPlanet,
    [owned, planet]
  );

  const energyLeftToClaimVictory = useMemo(() => {
    if (!owned || !planet) {
      return undefined;
    }
    const energyRequired = gameManager.getContractConstants().CLAIM_VICTORY_ENERGY_PERCENT;
    const planetEnergyPercent = Math.floor((planet.energy * 100) / planet.energyCap);
    const percentNeeded = energyRequired - planetEnergyPercent;
    const energyNeeded = Math.ceil((percentNeeded + 2) / 100 * planet.energyCap);
    return { percentNeeded: percentNeeded, energyNeeded: energyNeeded };
  }, [planet?.energy]);

  const claimable = useMemo(
    () => energyLeftToClaimVictory && energyLeftToClaimVictory.percentNeeded <= 0 && !gameOver,
    [energyLeftToClaimVictory?.percentNeeded, gameOver]
  );

  const claimingVictory = useMemo(
    () => planet?.transactions?.hasTransaction(isUnconfirmedClaimVictoryTx),
    [planetWrapper]
  );

  const claimVictory = () => {
    if (!planet || gameOver) return;
    gameManager.claimVictory(planet.locationId);
  };

  return (
    <StyledRow>
      {shouldShow && (
        <>
          <MaybeShortcutButton
            className='button'
            size='stretch'
            active={claimingVictory}
            disabled={!claimable || claimingVictory}
            onClick={claimVictory}
            onShortcutPressed={claimVictory}
            shortcutKey={INVADE}
            shortcutText={INVADE}
          >
            <TooltipTrigger
              style={{ width: '100%', textAlign: 'center' }}
              name={TooltipName.Empty}
              extraContent={
                <>
                  <Green>
                    {gameOver && <>The game is over!</>}
                    {!gameOver && <>Capture this planet to win the game!</>}
                    {!!energyLeftToClaimVictory && energyLeftToClaimVictory.percentNeeded > 0 && (
                      <>
                        You need <White>{energyLeftToClaimVictory.energyNeeded}</White> (
                        {energyLeftToClaimVictory.percentNeeded}%) more energy to claim victory with
                        this planet.
                      </>
                    )}
                  </Green>
                </>
              }
            >
              {claimingVictory ? (
                <LoadingSpinner initialText={'Claiming Victory...'} />
              ) : (
                'Claim Victory!'
              )}
            </TooltipTrigger>
          </MaybeShortcutButton>
        </>
      )}
    </StyledRow>
  );
}
