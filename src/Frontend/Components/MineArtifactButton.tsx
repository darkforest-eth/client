import { isUnconfirmedFindArtifactTx, isUnconfirmedProspectPlanetTx } from '@darkforest_eth/serde';
import { ArtifactType, Planet, PlanetType, TooltipName } from '@darkforest_eth/types';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { isFindable } from '../../Backend/GameLogic/ArrivalUtils';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { TooltipTrigger } from '../Panes/Tooltip';
import { useAccount, useUIManager } from '../Utils/AppHooks';
import { useEmitterValue } from '../Utils/EmitterHooks';
import { MINE_ARTIFACT } from '../Utils/ShortcutConstants';
import { ShortcutBtn } from './Btn';
import { MaybeShortcutButton } from './MaybeShortcutButton';
import { Row } from './Row';
import { Red } from './Text';

const StyledArtifactRow = styled(Row)`
  .button {
    margin-top: 4px;
    margin-bottom: 4px;

    flex-grow: 1;
  }
`;

export function MineArtifactButton({
  planetWrapper,
}: {
  planetWrapper: Wrapper<Planet | undefined>;
}) {
  const uiManager = useUIManager();
  const account = useAccount(uiManager);
  const gameManager = uiManager.getGameManager();
  const currentBlockNumber = useEmitterValue(uiManager.getEthConnection().blockNumber$, undefined);
  const owned = planetWrapper.value?.owner === account;

  const isRuins = useMemo(
    () => planetWrapper.value?.planetType === PlanetType.RUINS,
    [planetWrapper]
  );

  const isDestroyed = useMemo(() => planetWrapper.value?.destroyed, [planetWrapper]);

  const hasGear = useMemo(
    () =>
      planetWrapper.value?.heldArtifactIds
        .map((id) => uiManager.getArtifactWithId(id))
        .find((artifact) => artifact?.artifactType === ArtifactType.ShipGear),
    [planetWrapper, uiManager]
  );

  const prospectable = isRuins && hasGear;

  const prospecting = useMemo(
    () => planetWrapper.value?.transactions?.hasTransaction(isUnconfirmedProspectPlanetTx),
    [planetWrapper]
  );

  const findable = planetWrapper.value && isFindable(planetWrapper.value, currentBlockNumber);

  const find = useCallback(() => {
    if (!planetWrapper.value) return;
    gameManager.findArtifact(planetWrapper.value.locationId);
  }, [gameManager, planetWrapper]);

  const finding = useMemo(
    () => planetWrapper.value?.transactions?.hasTransaction(isUnconfirmedFindArtifactTx),
    [planetWrapper]
  );

  const mine = useCallback(async () => {
    if (!planetWrapper.value) return;

    const tx = await gameManager.prospectPlanet(planetWrapper.value.locationId);
    await tx.confirmedPromise;
    await gameManager.findArtifact(planetWrapper.value.locationId);
  }, [gameManager, planetWrapper]);

  const alreadyMined = planetWrapper.value?.hasTriedFindingArtifact;

  return (
    <StyledArtifactRow>
      {owned && !alreadyMined && !isDestroyed && (
        <>
          {isRuins && !findable && (
            <MaybeShortcutButton
              className='button'
              size='stretch'
              active={prospecting}
              disabled={!prospectable}
              onClick={mine}
              onShortcutPressed={mine}
              shortcutKey={MINE_ARTIFACT}
              shortcutText={MINE_ARTIFACT}
            >
              <TooltipTrigger
                name={hasGear ? TooltipName.FindArtifact : TooltipName.Empty}
                extraContent={
                  hasGear ? (
                    ''
                  ) : (
                    <Red>You must have a Gear ship on this planet to prospect artifacts.</Red>
                  )
                }
              >
                {!prospecting ? 'Prospect Artifact' : 'Prospecting...'}
              </TooltipTrigger>
            </MaybeShortcutButton>
          )}

          {isRuins && findable && (
            <ShortcutBtn
              className='button'
              size='stretch'
              active={finding}
              disabled={!findable || !hasGear}
              onClick={find}
              onShortcutPressed={find}
              shortcutKey={MINE_ARTIFACT}
              shortcutText={MINE_ARTIFACT}
            >
              <TooltipTrigger
                name={hasGear ? TooltipName.FindArtifact : TooltipName.Empty}
                extraContent={
                  hasGear ? (
                    ''
                  ) : (
                    <>
                      <Red>You must have a Gear ship on this planet to find artifacts.</Red>
                      <Red>You must find an artifact within 256 blocks of prospecting.</Red>
                    </>
                  )
                }
              >
                {!finding ? 'Find Artifact' : 'Finding Artifact...'}
              </TooltipTrigger>
            </ShortcutBtn>
          )}
        </>
      )}
    </StyledArtifactRow>
  );
}
