import { EMPTY_ADDRESS } from '@darkforest_eth/constants';
import {
  isUnconfirmedClaimVictoryTx,
  isUnconfirmedInvadeTargetPlanetTx,
} from '@darkforest_eth/serde';
import { Planet, TooltipName } from '@darkforest_eth/types';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { TooltipTrigger } from '../Panes/Tooltip';
import { useAccount, useUIManager } from '../Utils/AppHooks';
import { useEmitterValue } from '../Utils/EmitterHooks';
import { INVADE } from '../Utils/ShortcutConstants';
import { ShortcutBtn } from './Btn';
import { LoadingSpinner } from './LoadingSpinner';
import { MaybeShortcutButton } from './MaybeShortcutButton';
import { Row } from './Row';
import { Green, Red, White } from './Text';

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
  const currentBlockNumber = useEmitterValue(uiManager.getEthConnection().blockNumber$, undefined);
  const owned = planetWrapper.value?.owner === account;
  const isTargetPlanet = planetWrapper.value?.isTargetPlanet;

  const shouldShow = useMemo(
    () => owned && planetWrapper.value?.capturer === EMPTY_ADDRESS && isTargetPlanet,
    [owned, planetWrapper]
  );

  const shouldShowInvadeTarget = useMemo(
    () => planetWrapper.value?.invader === EMPTY_ADDRESS,
    [planetWrapper]
  );

  const invadable = useMemo(() => planetWrapper.value?.invader === EMPTY_ADDRESS, [planetWrapper]);

  const invading = useMemo(
    () => planetWrapper.value?.transactions?.hasTransaction(isUnconfirmedInvadeTargetPlanetTx),
    [planetWrapper]
  );

  const invadeTarget = useCallback(() => {
    if (!planetWrapper.value) return;
    gameManager.invadeTargetPlanet(planetWrapper.value.locationId);
  }, [gameManager, planetWrapper]);

  const shouldShowClaimVictory = useMemo(() => planetWrapper.value?.invader !== EMPTY_ADDRESS, [owned, planetWrapper]);

  const blocksLeftToClaimVictory = useMemo(() => {
    if (!planetWrapper.value || !currentBlockNumber) {
      return undefined;
    }
    const planet = planetWrapper.value;

    if (!planet.invadeStartBlock) return undefined;
    const holdBlocksRequired = uiManager
      .getGameManager()
      .getContractConstants().TARGET_PLANET_HOLD_BLOCKS_REQUIRED;


    return Math.min(
      planet.invadeStartBlock + holdBlocksRequired - currentBlockNumber,
      holdBlocksRequired
    );
  }, [uiManager, planetWrapper, currentBlockNumber]);

  const claimable = useMemo(() => blocksLeftToClaimVictory !== undefined && blocksLeftToClaimVictory <= 0, [blocksLeftToClaimVictory]);

  const claimingVictory = useMemo(
    () => planetWrapper.value?.transactions?.hasTransaction(isUnconfirmedClaimVictoryTx),
    [planetWrapper]
  );

  const claimVictory = useCallback(() => {
    if (!planetWrapper.value) return;
    gameManager.claimVictory(planetWrapper.value.locationId);
  }, [gameManager, planetWrapper]);

  return (
    <StyledRow>
      {shouldShow && (
        <>
          {shouldShowInvadeTarget && (
            <MaybeShortcutButton
              className='button'
              size='stretch'
              active={invading}
              disabled={!invadable || invading}
              onClick={invadeTarget}
              onShortcutPressed={invadeTarget}
              shortcutKey={INVADE}
              shortcutText={INVADE}
            >
              <TooltipTrigger
                style={{ width: '100%', textAlign: 'center' }}
                name={TooltipName.Empty}
                extraContent={<>Invade this target planet. </>}
              >
                {invading ? <LoadingSpinner initialText={'Invading target...'} /> : 'Invade Target'}
              </TooltipTrigger>
            </MaybeShortcutButton>
          )}

          {shouldShowClaimVictory && (
            <ShortcutBtn
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
                      Capture this planet to win the game!{' '}
                      {!!blocksLeftToClaimVictory && blocksLeftToClaimVictory >= 0 && (
                        <>
                          You must wait <White>{blocksLeftToClaimVictory}</White> blocks (~{blocksLeftToClaimVictory * 7} seconds) until you
                          can claim victory with this planet.
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
            </ShortcutBtn>
          )}
        </>
      )}
    </StyledRow>
  );
}
