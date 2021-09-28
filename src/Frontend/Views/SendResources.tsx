import { Artifact, artifactNameFromArtifact, Planet } from '@darkforest_eth/types';
import _ from 'lodash';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { formatNumber } from '../../Backend/Utils/Utils';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { Hook } from '../../_types/global/GlobalTypes';
import { ArtifactImage } from '../Components/ArtifactImage';
import { CenteredText, EmSpacer, FullWidth, ShortcutButton, Spacer } from '../Components/CoreUI';
import { EnergyIcon, SilverIcon } from '../Components/Icons';
import { LongDash, Sub, Subber } from '../Components/Text';
import WindowManager, { CursorState } from '../Game/WindowManager';
import dfstyles from '../Styles/dfstyles';
import { useOnSendCompleted, usePlanetInactiveArtifacts, useUIManager } from '../Utils/AppHooks';
import { useOnUp } from '../Utils/KeyEmitters';
import { EXIT_PANE, TOGGLE_SEND } from '../Utils/ShortcutConstants';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';

const DEFAULT_ENERGY_PERCENT = 50;
const DEFAULT_SILVER_PERCENT = 0;

const StyledSendResources = styled.div``;

const StyledRowIcon = styled.div`
  margin-right: 0.75em;
`;

const enum RowType {
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
          {getResource(value)}
          <EmSpacer width={1} />
          <Subber>{isSilver ? 'silver' : 'energy'}</Subber>
        </div>
        <ShowPercent value={value} setValue={setValue} />
      </div>
      <Spacer height={2} />
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

const RowWrapper = styled.div<{ artifacts: Artifact[] }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${({ artifacts }) => (artifacts.length > 0 ? 'flex-start' : 'space-around')};
  align-items: center;
  overflow-x: scroll;
`;

const thumbActive = css`
  border: 1px solid ${dfstyles.colors.border};
`;

const StyledArtifactThumb = styled.div<{ active: boolean }>`
  min-width: ${2.5}em;
  min-height: ${2.5}em;
  width: ${2.5}em;
  height: ${2.5}em;

  border: 1px solid ${dfstyles.colors.borderDark};
  border-radius: 1px;

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
  sendArtifact,
  setSendArtifact,
  inactiveArtifacts,
}: {
  sendArtifact: Artifact | undefined;
  setSendArtifact: Hook<Artifact | undefined>[1];
  inactiveArtifacts: Artifact[];
}) {
  return (
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
  );
}

const First = styled.span`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
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
  sending,
}: {
  doSend: () => void;
  artifact: Artifact | undefined;
  remove: () => void;
  sending: boolean;
}) {
  return (
    <>
      {(artifact && (
        <First>
          <Sub>{'sending ' + artifactNameFromArtifact(artifact)} </Sub>
          <Remove onClick={remove}>don't send</Remove>
        </First>
      )) || <></>}
      <FullWidth>
        <ShortcutButton
          wide
          onClick={doSend}
          forceActive={sending}
          style={{ width: '100%' }}
          shortcutKey={TOGGLE_SEND}
        >
          <CenteredText>Send</CenteredText>
        </ShortcutButton>
      </FullWidth>
    </>
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

  useOnUp(TOGGLE_SEND, doSend);
  useOnUp(EXIT_PANE, () => {
    if (!sending) uiManager.selectedPlanetId$.publish(undefined);
    else {
      UIEmitter.getInstance().emit(UIEmitterEvent.SendCancelled);
      setSending(false);
    }
  });

  // this variable is an array of 10 elements. each element is a key. whenever the user presses a
  // key, we set the amount of energy that we're sending to be proportional to how late in the array
  // that key is
  const energyShortcuts = '1234567890'.split('');

  // same as above, except for silver
  const silverShortcuts = '!@#$%^&*()'.split('');

  // for each of the above keys, we set up a listener that is triggered whenever that key is
  // pressed, and sets the corresponding resource sending amount
  for (let i = 0; i < energyShortcuts.length; i++) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useOnUp(energyShortcuts[i], () => setEnergyPercent((i + 1) * 10));
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useOnUp(silverShortcuts[i], () => setSilverPercent((i + 1) * 10));
  }

  useOnUp('-', () => setEnergyPercent((p) => _.clamp(p - 10, 0, 100)));
  useOnUp('=', () => setEnergyPercent((p) => _.clamp(p + 10, 0, 100)));
  useOnUp('_', () => setSilverPercent((p) => _.clamp(p - 10, 0, 100)));
  useOnUp('+', () => setSilverPercent((p) => _.clamp(p + 10, 0, 100)));

  useOnSendCompleted(() => {
    setSending(false);
    windowManager.setCursorState(CursorState.Normal);
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

  const removeArtifact = useCallback(() => setSendArtifact(undefined), [setSendArtifact]);
  const artifacts = usePlanetInactiveArtifacts(p, uiManager);

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
        <>
          <SelectArtifactRow inactiveArtifacts={artifacts} {...artifactProps} />
          <EmSpacer height={0.5} />
        </>
      )}

      <SendRow artifact={sendArtifact} remove={removeArtifact} doSend={doSend} sending={sending} />
    </StyledSendResources>
  );
}
