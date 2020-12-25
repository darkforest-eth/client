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
import { PlanetStatsInfo } from '../../utils/Utils';
import dfstyles from '../../styles/dfstyles';
import { Sub } from '../../components/Text';
import { GameEntityMemoryStore } from '../../api/GameEntityMemoryStore';

const StyledFindArtifactPane = styled.div`
  width: 30em;
  height: fit-content;

  display: flex;
  flex-direction: column;

  p,
  div {
    padding: 0.5em 0;
    &.borderTop {
      border-top: 1px solid ${dfstyles.colors.subtext};
    }
  }

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

  const hasUnconfirmed = () => hasUnconfirmedArtifactTx(selected);

  const popPercent = (): number => {
    if (!selectedStats || !selected) return 0;
    return 100 * (selectedStats.energy / selected.energyCap);
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

  function canWithdraw(): boolean {
    if (hasUnconfirmed()) {
      return false;
    }
    if (
      selected &&
      selected.heldArtifactId &&
      selected.artifactLockedTimestamp &&
      selected.artifactLockedTimestamp < Date.now() / 1000 - 12 * 60 * 60
    )
      return true;

    return false;
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
      GameEntityMemoryStore.isPlanetMineable(selected)
    )
      return true;
    return false;
  }

  return (
    <ModalPane hook={hook} title='Artifact' name={ModalName.FindArtifact}>
      <StyledFindArtifactPane>
        <p>
          Artifacts confer bonuses when placed on planets. They are obtained by
          exploring certain planets - look out for them! Placing an artifact on
          a planet locks it up for 12 hours.
        </p>
        <div>
          <span>
            <Sub>Current Artifact</Sub>
          </span>
          <span>
            {selectedStats?.heldArtifactId ? (
              <ArtifactLink
                id={selectedStats?.heldArtifactId}
                hook={selectedArtifactHook}
                detailsHook={artifactDetailsHook}
              />
            ) : (
              'none'
            )}
          </span>
        </div>
        <div>
          <span></span>
          <Btn
            onClick={withdrawArtifact}
            className={!canWithdraw() ? 'btn-disabled' : ''}
          >
            Withdraw Artifact
          </Btn>
        </div>
        {isMineable() && (
          <>
            <p className='borderTop'>
              You can find an artifact on this planet! You need 95% energy in
              order to explore a planet.
            </p>
            <div>
              <span>
                {Math.round(popPercent())}% <Sub>/</Sub> 95%
              </span>
              <Btn
                onClick={findArtifact}
                className={!canFind() ? 'btn-disabled' : ''}
              >
                Find Artifact
              </Btn>
            </div>
          </>
        )}
      </StyledFindArtifactPane>
    </ModalPane>
  );
}
