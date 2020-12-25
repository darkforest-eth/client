import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Sub } from '../../components/Text';
import {
  artifactName,
  hasUnconfirmedArtifactTx,
} from '../../utils/ArtifactUtils';
import { getPlanetName } from '../../utils/ProcgenUtils';
import UIEmitter, { UIEmitterEvent } from '../../utils/UIEmitter';
import { Artifact, Planet } from '../../_types/global/GlobalTypes';
import GameUIManager from '../board/GameUIManager';
import GameUIManagerContext from '../board/GameUIManagerContext';
import { ContextMenuType, SelectedContext } from '../GameWindow';
import { Btn } from '../GameWindowComponents/GameWindowComponents';
import { ModalHook, ModalName, ModalPane } from './ModalPane';

const StyledDepositPane = styled.div`
  height: fit-content;
  width: 24em;

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
`;

export function DepositArtifactPane({ hook }: { hook: ModalHook }) {
  const selected = useContext<Planet | null>(SelectedContext);
  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);

  const uiEmitter = UIEmitter.getInstance();

  const [artifact, setArtifact] = useState<Artifact | null>(null);
  const [planet, setPlanet] = useState<Planet | null>(null);

  const hasUnconfirmed = () => hasUnconfirmedArtifactTx(selected);

  function canDeposit(): boolean {
    if (
      artifact &&
      planet &&
      !hasUnconfirmed() &&
      !planet.heldArtifactId &&
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

  return (
    <ModalPane hook={hook} title={'Deposit Artifact'} name={ModalName.Deposit}>
      <StyledDepositPane>
        <p>
          Depositing artifacts onto planets will confer buffs and debuffs.
          Select an artifact and a planet, then click 'deposit'.
        </p>
        <div>
          <Sub>Selected Planet</Sub>
          <span>{planet ? getPlanetName(planet) : 'none'}</span>
        </div>
        <div>
          <Sub>Selected Artifact</Sub>
          <span>{artifact ? artifactName(artifact) : 'none'}</span>
        </div>
        <div>
          <Btn
            style={{ textAlign: 'center', width: '100%' }}
            onClick={deposit}
            className={!canDeposit() ? 'btn-disabled' : ''}
          >
            Deposit
          </Btn>
        </div>
      </StyledDepositPane>
    </ModalPane>
  );
}
