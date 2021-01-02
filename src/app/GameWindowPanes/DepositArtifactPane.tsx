import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Sub } from '../../components/Text';
import dfstyles from '../../styles/dfstyles';
import {
  artifactName,
  hasUnconfirmedArtifactTx,
} from '../../utils/ArtifactUtils';
import { ProcgenUtils } from '../../utils/ProcgenUtils';
import UIEmitter, { UIEmitterEvent } from '../../utils/UIEmitter';
import { PlanetStatsInfo } from '../../utils/Utils';
import { Artifact, Planet } from '../../_types/global/GlobalTypes';
import GameUIManager from '../board/GameUIManager';
import GameUIManagerContext from '../board/GameUIManagerContext';
import { ContextMenuType, SelectedStatContext } from '../GameWindow';
import { Btn } from '../GameWindowComponents/GameWindowComponents';
import { ModalHook, ModalName, ModalPane } from './ModalPane';
import { UpgradePreview } from './UpgradePreview';

const StyledDepositPane = styled.div`
  height: fit-content;
  width: 32em;

  display: flex;
  flex-direction: column;

  p,
  div {
    margin: 0.5em 0;
  }

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  a {
    color: ${dfstyles.colors.subtext};
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

export function DepositArtifactPane({ hook }: { hook: ModalHook }) {
  const selectedStats = useContext<PlanetStatsInfo | null>(SelectedStatContext);
  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);

  const uiEmitter = UIEmitter.getInstance();

  const [artifact, setArtifact] = useState<Artifact | null>(null);
  const [planet, setPlanet] = useState<Planet | null>(null);

  const hasUnconfirmed = () => hasUnconfirmedArtifactTx(selectedStats);

  function canDeposit(): boolean {
    if (
      artifact &&
      selectedStats &&
      !hasUnconfirmed() &&
      !selectedStats.heldArtifactId &&
      !artifact.onPlanetId
    )
      return true;
    return false;
  }

  function deposit() {
    if (artifact && planet && canDeposit() && uiManager) {
      uiManager.depositArtifact(planet.locationId, artifact.id);
    }
  }

  useEffect(() => {
    if (!uiManager) return;

    const onDepositArtifact = (a: Artifact | null) => {
      setArtifact(a);
    };
    const onDepositPlanet = (_p: Planet | null) => {
      setPlanet(uiManager.getSelectedPlanet());
    };
    uiEmitter.on(UIEmitterEvent.DepositArtifact, onDepositArtifact);
    uiEmitter.on(UIEmitterEvent.GamePlanetSelected, onDepositPlanet);
    return () => {
      uiEmitter.removeAllListeners(UIEmitterEvent.DepositArtifact);
      uiEmitter.removeAllListeners(UIEmitterEvent.GamePlanetSelected);
    };
  }, [uiEmitter, uiManager]);

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

  const selectArtifact = () => {
    uiEmitter.emit(UIEmitterEvent.SelectArtifact);
  };

  return (
    <ModalPane hook={hook} title={'Deposit Artifact'} name={ModalName.Deposit}>
      <StyledDepositPane>
        <p>
          Depositing artifacts onto planets will confer buffs and debuffs.
          Select an artifact and a planet, then click 'deposit'.
        </p>
        <div>
          <Sub>Selected Planet</Sub>
          <span>{planet ? ProcgenUtils.getPlanetName(planet) : 'none'}</span>
        </div>
        <div>
          <Sub>Selected Artifact</Sub>
          {artifact ? (
            <span>{artifactName(artifact)}</span>
          ) : (
            <a onClick={selectArtifact}>Select Artifact</a>
          )}
        </div>
        <div>
          <UpgradePreview
            planet={planet}
            upgrade={artifact ? artifact.upgrade : null}
          />
        </div>
        <div>
          <Btn
            style={{ textAlign: 'center', width: '100%' }}
            onClick={deposit}
            className={!canDeposit() ? 'btn-disabled' : ''}
          >
            {selectedStats?.unconfirmedDepositArtifact
              ? 'Depositing...'
              : 'Deposit'}
          </Btn>
        </div>
      </StyledDepositPane>
    </ModalPane>
  );
}
