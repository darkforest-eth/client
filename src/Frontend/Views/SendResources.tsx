import { Artifact, artifactNameFromArtifact, ArtifactNames, Planet } from '@darkforest_eth/types';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { formatNumber } from '../../Backend/Utils/Utils';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { Hook } from '../../_types/global/GlobalTypes';
import { ArtifactImage } from '../Components/ArtifactImage';
import { Btn } from '../Components/Btn';
import { EnergyIcon, SilverIcon } from '../Components/Icons';
import { LongDash, Sub } from '../Components/Text';
import WindowManager, { CursorState } from '../Game/WindowManager';
import dfstyles from '../Styles/dfstyles';
import { planetBackground } from '../Styles/Mixins';
import { useUIManager, useControlDown, usePlanetInactiveArtifacts } from '../Utils/AppHooks';
import { useEmitterSubscribe, useEmitterValue } from '../Utils/EmitterHooks';
import { escapeDown$, keyUp$ } from '../Utils/KeyEmitters';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';

const DEFAULT_ENERGY_PERCENT = 50;
const DEFAULT_SILVER_PERCENT = 0;

const StyledSendResources = styled.div``;

const StyledRowIcon = styled.div`
  margin-right: 0.75em;
`;

enum RowType {
  Energy,
  Silver,
  Artifact,
}
function ResourceRowIcon({ rowType }: { rowType: RowType }) {
  return (
    <StyledRowIcon>
      {rowType === RowType.Energy && <EnergyIcon />}
      {rowType === RowType.Silver && <SilverIcon />}
    </StyledRowIcon>
  );
}

const StyledResourceBar = styled.div`
  margin: 0.5em;

  input[type='range'] {
    width: 100%;
    height: 3px;
  }

  & div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledShowPercent = styled.div`
  display: inline-block;

  & > span:first-child {
    width: 3em;
    text-align: right;
    margin-right: 1em;
  }

  & > span:last-child {
    color: ${dfstyles.colors.subtext};
    & > span {
      ${dfstyles.prefabs.noselect};
      &:hover {
        color: ${dfstyles.colors.text};
        cursor: pointer;
      }
      &:first-child {
        margin-right: 0.5em;
      }
    }
  }
`;
function ShowPercent({
  value,
  setValue,
}: {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}) {
  return (
    <StyledShowPercent>
      <span>{value}%</span>
      <span>
        <span onClick={() => setValue((x) => x - 1)}>
          <LongDash />
        </span>
        <span onClick={() => setValue((x) => x + 1)}>+</span>
      </span>
    </StyledShowPercent>
  );
}

function ResourceBar({
  isSilver,
  selected,
  value,
  setValue,
}: {
  isSilver?: boolean;
  selected: Planet | undefined;
  value: number;
  setValue: (x: number) => void;
}) {
  const getResource = useCallback(
    (val: number) => {
      if (!selected) return '';
      const resource = isSilver ? selected.silver : selected.energy;
      return formatNumber((val / 100) * resource);
    },
    [selected, isSilver]
  );

  return (
    <StyledResourceBar>
      <div>
        <div>
          <ResourceRowIcon rowType={isSilver ? RowType.Silver : RowType.Energy} />
          <Sub>
            {getResource(value)} {isSilver ? 'silver' : 'energy'}
          </Sub>
        </div>
        <ShowPercent value={value} setValue={setValue} />
      </div>
      <input
        type='range'
        min={0}
        max={100}
        value={value}
        step={1}
        onChange={(e) => setValue(parseInt(e.target.value))}
      />
    </StyledResourceBar>
  );
}

const height = 3.5;
const margin = 0.5;
const thumb = height - 2 * margin;
const StyledSelectArtifactRow = styled.div<{ planet: Planet | undefined }>`
  width: 100%;

  border-top: 1px solid ${dfstyles.colors.subtext};
  border-bottom: 1px solid ${dfstyles.colors.subtext};
  height: ${height}em;
  padding: ${margin}em;

  ${planetBackground}
`;

const RowWrapper = styled.div<{ artifacts: Artifact[] }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${({ artifacts }) => (artifacts.length > 0 ? 'flex-start' : 'space-around')};
  align-items: center;

  overflow-x: scroll;
`;

const thumbActive = css`
  border: 1px solid ${dfstyles.colors.text};
  outline: 2px solid ${dfstyles.colors.text};
  outline-offset: -2px;
`;

const StyledArtifactThumb = styled.div<{ active: boolean }>`
  min-width: ${thumb}em;
  min-height: ${thumb}em;
  width: ${thumb}em;
  height: ${thumb}em;

  border: 1px solid ${dfstyles.colors.subtext};
  border-radius: 1px;

  margin-right: ${margin}em;
  &:last-child {
    margin-right: none;
  }

  display: inline-flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  background: ${dfstyles.colors.artifactBackground};

  &:hover {
    ${thumbActive}
    cursor: pointer;

    & > div {
      filter: brightness(0.4);
    }
  }

  ${({ active }) => active && thumbActive}
`;

function ArtifactThumb({
  artifact,
  sendArtifact,
  setSendArtifact,
}: {
  sendArtifact?: Artifact | undefined;
  setSendArtifact?: Hook<Artifact | undefined>[1];
  artifact: Artifact;
}) {
  const click = useCallback(() => {
    if (!setSendArtifact) return;

    if (artifact.id === sendArtifact?.id) setSendArtifact(undefined);
    else setSendArtifact(artifact);
  }, [setSendArtifact, artifact, sendArtifact]);

  return (
    <StyledArtifactThumb active={sendArtifact?.id === artifact.id} onClick={click}>
      <ArtifactImage artifact={artifact} thumb size={32} />
    </StyledArtifactThumb>
  );
}

function SelectArtifactRow({
  planet,
  sendArtifact,
  setSendArtifact,
  inactiveArtifacts,
}: {
  planet: Planet;
  sendArtifact: Artifact | undefined;
  setSendArtifact: Hook<Artifact | undefined>[1];
  inactiveArtifacts: Artifact[];
}) {
  return (
    <StyledSelectArtifactRow planet={planet}>
      <RowWrapper artifacts={inactiveArtifacts}>
        {inactiveArtifacts.length > 0 &&
          inactiveArtifacts.map((a) => (
            <ArtifactThumb
              artifact={a}
              key={a.id}
              sendArtifact={sendArtifact}
              setSendArtifact={setSendArtifact}
            />
          ))}
        {inactiveArtifacts.length === 0 && <Sub>No movable artifacts!</Sub>}
      </RowWrapper>
    </StyledSelectArtifactRow>
  );
}

const StyledSendRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.5em;
  & > span:first-child {
    margin-right: 0.5em;
  }
`;

const First = styled.span`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
`;

const Remove = styled.span`
  color: ${dfstyles.colors.subtext};
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

function SendRow({
  doSend,
  artifact,
  remove,
}: {
  doSend: () => void;
  artifact: Artifact | undefined;
  remove: () => void;
}) {
  return (
    <StyledSendRow>
      <First>
        {artifact && (
          <>
            <span>
              {artifactNameFromArtifact(artifact)}{' '}
              {artifact && <Sub>({ArtifactNames[artifact.artifactType]})</Sub>}
            </span>
            <Remove onClick={remove}>remove</Remove>
          </>
        )}
      </First>
      <Btn onClick={doSend}>Send</Btn>
    </StyledSendRow>
  );
}

export function SendResources({
  planetWrapper: p,
}: {
  planetWrapper: Wrapper<Planet | undefined>;
}) {
  const uiManager = useUIManager();

  const energyHook = useState<number>(
    p.value && uiManager.getForcesSending(p.value.locationId)
      ? uiManager.getForcesSending(p.value.locationId)
      : DEFAULT_ENERGY_PERCENT
  );
  const [energyPercent, setEnergyPercent] = energyHook;

  const silverHook = useState<number>(
    p.value && uiManager.getSilverSending(p.value.locationId)
      ? uiManager.getSilverSending(p.value.locationId)
      : DEFAULT_SILVER_PERCENT
  );
  const [silverPercent, setSilverPercent] = silverHook;

  const [sending, setSending] = useState<boolean>(false);

  const windowManager = WindowManager.getInstance();

  const ctrlDown = useControlDown();
  const keyUp = useEmitterValue(keyUp$, undefined);
  const lastKeyUp = useRef(keyUp);

  useEffect(() => {
    if (!p.value || !uiManager) return;

    uiManager.setForcesSending(p.value.locationId, energyPercent);
    uiManager.setSilverSending(p.value.locationId, silverPercent);
  }, [energyPercent, silverPercent, p, uiManager]);

  useEffect(() => {
    const uiEmitter = UIEmitter.getInstance();
    setSending(false);
    windowManager.setCursorState(CursorState.Normal);
    uiEmitter.emit(UIEmitterEvent.SendCancelled);
  }, [p.value?.locationId, windowManager]);

  useEffect(() => {
    setEnergyPercent(DEFAULT_ENERGY_PERCENT);
    setSilverPercent(DEFAULT_SILVER_PERCENT);
  }, [p.value?.locationId, setEnergyPercent, setSilverPercent]);

  const doSend = useCallback(() => {
    if (!uiManager || !windowManager) return;

    const uiEmitter = UIEmitter.getInstance();

    if (windowManager.getCursorState() === CursorState.TargetingForces) {
      setSending(false);
      windowManager.setCursorState(CursorState.Normal);
      uiEmitter.emit(UIEmitterEvent.SendCancelled);
    } else {
      setSending(true);
      windowManager.setCursorState(CursorState.TargetingForces);
      uiEmitter.emit(UIEmitterEvent.SendInitiated, p.value);
    }
  }, [p, windowManager, uiManager]);

  /**
   * If the user presses 0-9, set the energy percent we're sending to be
   * that value times 10. If they press '-' or '=', decrease or increase
   * the energy percent we're sending respectively.
   */
  useEffect(() => {
    if (!keyUp) return;
    if (lastKeyUp.current === keyUp) return;
    lastKeyUp.current = keyUp;

    let setPercent = setEnergyPercent;
    let currentPercent = energyPercent;
    if (ctrlDown) {
      setPercent = setSilverPercent;
      currentPercent = silverPercent;
    }

    if (keyUp.value === '-') {
      setPercent(Math.max(currentPercent - 1, 0));
      return;
    } else if (keyUp.value === '=') {
      setPercent(Math.min(currentPercent + 1, 100));
      return;
    } else if (keyUp.value === 's') {
      doSend();
      return;
    }

    const digitValue = parseInt(keyUp.value, 10);
    if (isNaN(digitValue)) return;

    setPercent(digitValue * 10 + (digitValue === 0 ? 100 : 0));
  }, [keyUp, energyPercent, setEnergyPercent, setSilverPercent, ctrlDown, doSend, silverPercent]);

  useEffect(() => {
    const uiEmitter = UIEmitter.getInstance();

    const onComplete = () => {
      setSending(false);
      windowManager.setCursorState(CursorState.Normal);
    };

    uiEmitter.on(UIEmitterEvent.SendCompleted, onComplete);

    return () => {
      uiEmitter.removeListener(UIEmitterEvent.SendCompleted, onComplete);
    };
  });

  /* sending artifacts stuff */
  const [sendArtifact, setSendArtifact] = useState<Artifact | undefined>(undefined);
  const artifactProps = { sendArtifact, setSendArtifact };

  useEffect(() => {
    if (!p.value || !sendArtifact) return;

    // kill the artifact once the move is made
    if (!p.value.heldArtifactIds.includes(sendArtifact.id)) {
      setSendArtifact(undefined);
    }

    // kill the artifact when the move is pending
    for (const v of p.value.unconfirmedDepartures) {
      if (v.artifact === sendArtifact.id) {
        setSendArtifact(undefined);
        return;
      }
    }
  }, [p, sendArtifact]);

  useEffect(() => {
    if (!p.value) return;
    uiManager.setArtifactSending(p.value.locationId, sendArtifact);
  }, [sendArtifact, uiManager, p]);

  const remove = useCallback(() => setSendArtifact(undefined), [setSendArtifact]);
  const artifacts = usePlanetInactiveArtifacts(p, uiManager);

  // attach escape key listener
  /* TODO rethink this. this is a trash way of doing this. this only works because
    `SendResources` is always open when `PlanetContextPane` is, but we shouldn't trust this.  */
  const onEscapeDown = useCallback(() => {
    if (!sending) uiManager.selectedPlanetId$.publish(undefined);
    else {
      UIEmitter.getInstance().emit(UIEmitterEvent.SendCancelled);
      setSending(false);
    }
  }, [uiManager, sending]);
  useEmitterSubscribe(escapeDown$, onEscapeDown);

  return (
    <StyledSendResources>
      <ResourceBar selected={p.value} value={energyPercent} setValue={setEnergyPercent} />
      {p.value && p.value.silver > 0 && (
        <ResourceBar
          selected={p.value}
          value={silverPercent}
          setValue={setSilverPercent}
          isSilver
        />
      )}
      {p.value && artifacts.length > 0 && (
        <SelectArtifactRow planet={p.value} inactiveArtifacts={artifacts} {...artifactProps} />
      )}

      <SendRow artifact={sendArtifact} remove={remove} doSend={doSend} />
    </StyledSendResources>
  );
}
