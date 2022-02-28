import { EMPTY_ADDRESS } from '@darkforest_eth/constants';
import { isUnconfirmedCapturePlanetTx, isUnconfirmedInvadePlanetTx } from '@darkforest_eth/serde';
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

export function CapturePlanetButton({
  planetWrapper,
}: {
  planetWrapper: Wrapper<Planet | undefined>;
}) {
  const uiManager = useUIManager();
  const account = useAccount(uiManager);
  const gameManager = uiManager.getGameManager();
  const currentBlockNumber = useEmitterValue(uiManager.getEthConnection().blockNumber$, undefined);
  const owned = planetWrapper.value?.owner === account;
  const captureZoneGenerator = uiManager.getCaptureZoneGenerator();

  const canGiveScore = useMemo(() => {
    if (!planetWrapper.value) return;
    const planet = planetWrapper.value;
    return uiManager.potentialCaptureScore(planet.planetLevel) > 0;
  }, [planetWrapper, uiManager]);

  const shouldShow = useMemo(() => {
    if (!planetWrapper.value) return false;
    const planet = planetWrapper.value;
    return canGiveScore && owned && planet.capturer === EMPTY_ADDRESS;
  }, [owned, planetWrapper, canGiveScore]);

  const shouldShowInvade = useMemo(() => {
    if (!planetWrapper.value) return false;
    const planet = planetWrapper.value;
    const inZone = captureZoneGenerator?.isInZone(planet.locationId);

    return owned && inZone && planet.invader === EMPTY_ADDRESS && planet.capturer === EMPTY_ADDRESS;
  }, [owned, planetWrapper, captureZoneGenerator]);

  const planetHasEnoughEnergy = useMemo(() => {
    if (!planetWrapper.value) return false;
    const { energy, energyCap } = planetWrapper.value;

    return energy > energyCap * 0.8; // real percentage is 78. need time for contract to catch up.
  }, [planetWrapper]);

  const invadable = useMemo(() => {
    if (!planetWrapper.value) return false;
    const planet = planetWrapper.value;
    return planet.capturer === EMPTY_ADDRESS && planet.invader === EMPTY_ADDRESS;
  }, [planetWrapper]);

  const invading = useMemo(
    () => planetWrapper.value?.transactions?.hasTransaction(isUnconfirmedInvadePlanetTx),
    [planetWrapper]
  );

  const invade = useCallback(() => {
    if (!planetWrapper.value) return;
    gameManager.invadePlanet(planetWrapper.value.locationId);
  }, [gameManager, planetWrapper]);

  const shouldShowCapture = useMemo(() => {
    if (!planetWrapper.value) return;
    const planet = planetWrapper.value;

    return owned && planet.capturer === EMPTY_ADDRESS && planet.invader !== EMPTY_ADDRESS;
  }, [owned, planetWrapper]);

  const blocksLeft = useMemo(() => {
    if (!planetWrapper.value || !currentBlockNumber) {
      return undefined;
    }
    const planet = planetWrapper.value;

    if (!planet.invadeStartBlock) return undefined;
    const holdBlocksRequired = uiManager
      .getGameManager()
      .getContractConstants().CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED;

    // it is possible that we have an outdated currentBlockNumber in this calculation
    // this would result in an incorrect number of blocks required being shown
    // only show a max of holdBlocksRequired instead
    return Math.min(
      planet.invadeStartBlock + holdBlocksRequired - currentBlockNumber,
      holdBlocksRequired
    );
  }, [uiManager, planetWrapper, currentBlockNumber]);

  const capturable = useMemo(() => {
    return blocksLeft !== undefined && blocksLeft <= 0 && planetHasEnoughEnergy;
  }, [planetHasEnoughEnergy, blocksLeft]);

  const capturing = useMemo(
    () => planetWrapper.value?.transactions?.hasTransaction(isUnconfirmedCapturePlanetTx),
    [planetWrapper]
  );

  const capture = useCallback(() => {
    if (!planetWrapper.value) return;
    gameManager.capturePlanet(planetWrapper.value.locationId);
  }, [gameManager, planetWrapper]);

  return (
    <StyledRow>
      {shouldShow && (
        <>
          {shouldShowInvade && (
            <MaybeShortcutButton
              className='button'
              size='stretch'
              active={invading}
              disabled={!invadable || invading}
              onClick={invade}
              onShortcutPressed={invade}
              shortcutKey={INVADE}
              shortcutText={INVADE}
            >
              <TooltipTrigger
                style={{ width: '100%', textAlign: 'center' }}
                name={TooltipName.Empty}
                extraContent={<>Invade this planet. </>}
              >
                {invading ? <LoadingSpinner initialText={'Invading...'} /> : 'Invade'}
              </TooltipTrigger>
            </MaybeShortcutButton>
          )}

          {shouldShowCapture && (
            <ShortcutBtn
              className='button'
              size='stretch'
              active={capturing}
              disabled={!capturable || capturing}
              onClick={capture}
              onShortcutPressed={capture}
              shortcutKey={INVADE}
              shortcutText={INVADE}
            >
              <TooltipTrigger
                style={{ width: '100%', textAlign: 'center' }}
                name={TooltipName.Empty}
                extraContent={
                  <>
                    <Green>
                      Capture this planet for score!{' '}
                      {!!blocksLeft && blocksLeft >= 0 && (
                        <>
                          You must wait <White>{blocksLeft}</White> blocks until you can capture
                          this planet.
                        </>
                      )}
                      {!planetHasEnoughEnergy && (
                        <Red>The planet requires above 80% energy before you can capture it.</Red>
                      )}
                    </Green>
                  </>
                }
              >
                {capturing ? <LoadingSpinner initialText={'Capturing...'} /> : 'Capture!'}
              </TooltipTrigger>
            </ShortcutBtn>
          )}
        </>
      )}
    </StyledRow>
  );
}
