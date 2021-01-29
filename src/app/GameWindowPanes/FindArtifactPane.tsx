import * as React from 'react';
import GameUIManager from '../board/GameUIManager';
import { Btn } from '../GameWindowComponents/Btn';
import { ModalHook, ModalName, ModalPane } from './ModalPane';
import { useContext, useEffect } from 'react';
import GameUIManagerContext from '../board/GameUIManagerContext';
import {
  ContextMenuType,
  SelectedContext,
  SelectedStatContext,
} from '../GameWindow';
import {
  Artifact,
  ArtifactId,
  Hook,
  isLocatable,
  Planet,
} from '../../_types/global/GlobalTypes';
import UIEmitter, { UIEmitterEvent } from '../../utils/UIEmitter';
import styled from 'styled-components';
import {
  artifactName,
  hasUnconfirmedArtifactTx,
} from '../../utils/ArtifactUtils';
import { getTimeZone, PlanetStatsInfo } from '../../utils/Utils';
import dfstyles from '../../styles/dfstyles';
import { Red, Sub } from '../../components/Text';
import { useState } from 'react';
import { GameObjects } from '../../api/GameObjects';

const MINT_END = 1611584314 * 1000;

const StyledFindArtifactPane = styled.div`
  width: 30em;
  height: fit-content;

  display: flex;
  flex-direction: column;

  & > p,
  & > div {
    padding: 0.5em 0;
    &.borderTop {
      border-top: 1px solid ${dfstyles.colors.subtext};
    }
  }

  & div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    &.wrapper {
      flex-direction: column;
    }
  }
`;
const StyleArtifactLink = styled.div`
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

function ArtifactLink({
  id,
  hook,
  detailsHook,
}: {
  id: ArtifactId;
  hook: Hook<Artifact | null>;
  detailsHook: ModalHook;
}) {
  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);

  function getArtifact(): Artifact | null {
    return uiManager?.getArtifactWithId(id) || null;
  }

  const [_artifact, setArtifact] = hook;
  const [_visible, setVisible] = detailsHook;

  function click() {
    setArtifact(getArtifact());
    setVisible(true);
  }

  return (
    <StyleArtifactLink onClick={click}>
      {artifactName(getArtifact())}
    </StyleArtifactLink>
  );
}

export function FindArtifactPane({
  hook,
  selectedArtifactHook,
  artifactDetailsHook,
}: {
  hook: ModalHook;
  selectedArtifactHook: Hook<Artifact | null>;
  artifactDetailsHook: ModalHook;
}) {
  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);
  const selected = useContext<Planet | null>(SelectedContext);
  const selectedStats = useContext<PlanetStatsInfo | null>(SelectedStatContext);

  const hasUnconfirmed = () => hasUnconfirmedArtifactTx(selectedStats);

  const popPercent = (): number => {
    if (!selectedStats || !selected) return 0;
    return Math.max(0, 100 * (selectedStats.energy / selected.energyCap) - 2);
  };

  const canFind = (): boolean => {
    if (selected?.hasTriedFindingArtifact || hasUnconfirmed()) return false;
    if (popPercent() < 95) return false;
    return true;
  };

  function findArtifact() {
    if (!canFind()) return;
    if (uiManager && selected) {
      uiManager.findArtifact(selected.locationId);
    }
  }

  function hasArtifact(): boolean {
    return !!(
      selectedStats &&
      selectedStats.heldArtifactId &&
      selectedStats.artifactLockedTimestamp
    );
  }

  function canWithdraw(): boolean {
    if (hasUnconfirmed()) {
      return false;
    }
    if (
      selectedStats &&
      selectedStats.heldArtifactId &&
      selectedStats.artifactLockedTimestamp &&
      selectedStats.artifactLockedTimestamp < Date.now() / 1000 - 12 * 60 * 60
    )
      return true;

    return false;
  }

  function getWithdrawTime(): string {
    if (
      !selectedStats ||
      !selectedStats.heldArtifactId ||
      !selectedStats.artifactLockedTimestamp
    )
      return 'never';

    const date = new Date(
      1000 * (selectedStats.artifactLockedTimestamp + 12 * 60 * 60)
    );

    return (
      date.toLocaleDateString() +
      ' ' +
      date.toLocaleTimeString() +
      ' ' +
      getTimeZone()
    );
  }

  function getMinutes(): number {
    const timestamp =
      selectedStats && selectedStats.artifactLockedTimestamp
        ? selectedStats.artifactLockedTimestamp
        : 0;
    const seconds = timestamp + 12 * 60 * 60 - Date.now() / 1000;
    return Math.max(Math.floor(seconds / 60), 0);
  }

  function withdrawArtifact() {
    if (uiManager && selected && canWithdraw()) {
      uiManager.withdrawArtifact(selected.locationId);
    }
  }

  useEffect(() => {
    const [, setVisible] = hook;
    const doChange = (type: ContextMenuType) => {
      if (type === ContextMenuType.None) {
        setVisible(false);
      }
    };
    const uiEmitter = UIEmitter.getInstance();
    uiEmitter.on(UIEmitterEvent.ContextChange, doChange);

    const hide = () => setVisible(false);
    uiEmitter.on(UIEmitterEvent.GamePlanetSelected, hide);

    return () => {
      uiEmitter.removeListener(UIEmitterEvent.ContextChange, doChange);
      uiEmitter.removeListener(UIEmitterEvent.GamePlanetSelected, hide);
    };
  });

  function isMineable(): boolean {
    if (
      selected &&
      isLocatable(selected) &&
      GameObjects.isPlanetMineable(selected)
    )
      return true;
    return false;
  }

  const [canMint, setCanMint] = useState<boolean>(true);
  useEffect(() => {
    const interval = setInterval(() => setCanMint(Date.now() < MINT_END), 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ModalPane hook={hook} title='Artifact' name={ModalName.FindArtifact}>
      <StyledFindArtifactPane>
        <p>
          <Red>
            {canMint ? (
              'NOTE: You will no longer be able to mint new artifacts after Jan 25!'
            ) : (
              <span>
                NOTE: You can no longer mint new artifacts! Join us in v0.6 at @
                <a
                  href={'#'}
                  onClick={() =>
                    window.open('https://twitter.com/darkforest_eth')
                  }
                >
                  darkforest_eth
                </a>
              </span>
            )}
          </Red>
        </p>
        <p>
          Artifacts confer bonuses when placed on planets. They are obtained by
          exploring certain planets - look out for them! Placing an artifact on
          a planet locks it up for 12 hours.
        </p>
        {canMint && (
          <div>
            <Sub>Current Artifact</Sub>
            <span>
              {selectedStats?.heldArtifactId ? (
                <ArtifactLink
                  id={selectedStats?.heldArtifactId}
                  hook={selectedArtifactHook}
                  detailsHook={artifactDetailsHook}
                />
              ) : (
                <Sub>No Artifact</Sub>
              )}
            </span>
          </div>
        )}
        {selected && uiManager?.isOwnedByMe(selected) && hasArtifact() && (
          <div className='wrapper'>
            <div>
              <Sub>Unlocked at {getWithdrawTime()}</Sub>
              <span></span>
            </div>
            <div>
              <Sub>Minutes remaining: {getMinutes()}</Sub>
              {selectedStats?.unconfirmedWithdrawArtifact ? (
                <Sub>Withdrawing...</Sub>
              ) : (
                <Btn
                  onClick={withdrawArtifact}
                  className={!canWithdraw() ? 'btn-disabled' : ''}
                >
                  Withdraw Artifact
                </Btn>
              )}
            </div>
          </div>
        )}
        {isMineable() && selected && uiManager?.isOwnedByMe(selected) && (
          <>
            <p className='borderTop'>
              You can find an artifact on this planet! You need 95% energy in
              order to explore a planet.
            </p>
            <div>
              <span></span>
              {canFind() && (
                <Btn
                  onClick={findArtifact}
                  className={!canFind() ? 'btn-disabled' : ''}
                >
                  Find Artifact
                </Btn>
              )}
              {!canFind() && (
                <span>
                  {selectedStats?.hasTriedFindingArtifact ? (
                    <Sub>Artifact found!</Sub>
                  ) : selectedStats?.unconfirmedFindArtifact ? (
                    <>
                      <Sub>Finding artifact...</Sub>
                    </>
                  ) : (
                    <>
                      {Math.floor(popPercent())}% <Sub>/</Sub> 95%
                    </>
                  )}
                </span>
              )}
            </div>
          </>
        )}
      </StyledFindArtifactPane>
    </ModalPane>
  );
}
