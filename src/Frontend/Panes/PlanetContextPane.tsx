import _ from 'lodash';
import React, { useState, useEffect, useRef, useCallback, Dispatch, SetStateAction } from 'react';
import { useLayoutEffect } from 'react';
import styled from 'styled-components';
import { Artifact, EthAddress, Planet } from '@darkforest_eth/types';
import { getActivatedArtifact, getArtifactDebugName } from '../../Backend/GameLogic/ArtifactUtils';
import { ProcgenUtils } from '../../Backend/Procedural/ProcgenUtils';
import { formatNumber, getFormatProp, getUpgradeStat } from '../../Backend/Utils/Utils';
import { StatIdx } from '../../_types/global/GlobalTypes';
import { Btn } from '../Components/Btn';
import { ContextMenuType, ContextPane } from '../Components/ContextMenu';
import { Spacer } from '../Components/CoreUI';
import {
  ArtifactIcon,
  DefenseIcon,
  EnergyGrowthIcon,
  EnergyIcon,
  RangeIcon,
  SilverIcon,
  SpeedIcon,
} from '../Components/Icons';
import { Green, Red, Sub } from '../Components/Text';
import WindowManager, { CursorState, TooltipName } from '../Game/WindowManager';
import dfstyles from '../Styles/dfstyles';
import { useUIManager, useSelectedPlanet, useControlDown } from '../Utils/AppHooks';
import { useEmitterSubscribe, useEmitterValue } from '../Utils/EmitterHooks';
import { escapeDown$, keyUp$ } from '../Utils/KeyEmitters';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';
import {
  ModalPlanetDetailsIcon,
  ModalArtifactIcon,
  ModalHatIcon,
  ModalTwitterBroadcastIcon,
  ModalUpgradeDetailsIcon,
} from '../Views/ModalIcon';
import { ModalHook } from '../Views/ModalPane';
import { PlanetArtifactInventoryPane } from './PlanetContextPaneComponents/PlanetArtifactInventoryPane';
import { PlanetPreview } from './PlanetPreview';
import { TooltipTrigger } from './Tooltip';
import { EMPTY_ADDRESS } from '@darkforest_eth/constants';
import { bonusFromHex } from '@darkforest_eth/hexgen';

const StyledPlanetContextPane = styled.div`
  width: 20em;
`;

enum RowType {
  Energy,
  Silver,
  Artifact,
}

const StyledPlanetInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  // stats
  & > div:last-child {
    margin-left: 2em;
    flex-grow: 1;
    // stat row
    & > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      // icons
      & > span:first-child {
        display: flex;
        flex-direction: row;
        align-items: center;
      }

      & > span:last-child {
        flex-grow: 1;
        text-align: right;
      }
    }
  }
`;

const DEFAULT_ENERGY_PERCENT = 50;
const DEFAULT_SILVER_PERCENT = 0;

const StyledResourceMenu = styled.div`
  & > p:first-child {
    color: ${dfstyles.colors.subtext};
    text-decoration: underline;
  }

  /* each block */
  & > p,
  & > div {
    margin-bottom: 0.5em;
    /* just the last block */
    &:last-child {
      margin-bottom: 0;
      margin-top: 1em;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
`;

const StyledArtifactSelector = styled.div`
  display: flex;
  flex-direction: row;

  a {
    color: ${dfstyles.colors.subtext};
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

function ArtifactSelector({
  modalsContainer,
  selected,
  setArtifactDetailsOpen,
}: {
  modalsContainer: Element;
  selected: Planet | undefined;
  setArtifactDetailsOpen: (open: boolean) => void;
}) {
  const uiManager = useUIManager();

  const artifactInventoryHook = useState<boolean>(false);
  const [_inv, setInv] = artifactInventoryHook;
  const [sendArtifact, setSendArtifact] = useState<Artifact | undefined>(undefined);

  useLayoutEffect(() => {
    setSendArtifact(undefined);
  }, [selected?.locationId]);

  useLayoutEffect(() => {
    setInv(false);
  }, [sendArtifact, setInv]);

  useEffect(() => {
    if (!selected) return;
    uiManager.setArtifactSending(selected.locationId, sendArtifact);
  }, [selected, sendArtifact, uiManager]);

  return (
    <StyledArtifactSelector>
      <PlanetArtifactInventoryPane
        container={modalsContainer}
        hook={artifactInventoryHook}
        selected={selected}
        setSendArtifact={setSendArtifact}
        setArtifactDetailsOpen={setArtifactDetailsOpen}
      />
      <ResourceRowIcon rowType={RowType.Artifact} />
      <a onClick={() => setInv(true)}>
        {sendArtifact ? getArtifactDebugName(sendArtifact) : 'Select Artifact'}
      </a>
    </StyledArtifactSelector>
  );
}

function SendResourceMenu({
  selected,
  modalsContainer,
  setArtifactDetailsOpen,
  setWithdrawSilver,
}: {
  selected: Planet | undefined;
  modalsContainer: Element;
  setArtifactDetailsOpen: (open: boolean) => void;
  setWithdrawSilver: (open: boolean) => void;
}) {
  const uiManager = useUIManager();

  const energyHook = useState<number>(
    selected && uiManager ? uiManager.getForcesSending(selected.locationId) : DEFAULT_ENERGY_PERCENT
  );
  const [energyPercent, setEnergyPercent] = energyHook;

  const silverHook = useState<number>(
    selected && uiManager ? uiManager.getForcesSending(selected.locationId) : DEFAULT_SILVER_PERCENT
  );
  const [silverPercent, setSilverPercent] = silverHook;

  const [_sending, setSending] = useState<boolean>(false);

  const windowManager = WindowManager.getInstance();

  const ctrlDown = useControlDown();
  const keyUp = useEmitterValue(keyUp$, undefined);
  const lastKeyUp = useRef(keyUp);

  useEffect(() => {
    if (!selected || !uiManager) return;

    uiManager.setForcesSending(selected.locationId, energyPercent);
    uiManager.setSilverSending(selected.locationId, silverPercent);
  }, [energyPercent, silverPercent, selected, uiManager]);

  useEffect(() => {
    const uiEmitter = UIEmitter.getInstance();
    setSending(false);
    windowManager.setCursorState(CursorState.Normal);
    uiEmitter.emit(UIEmitterEvent.SendCancelled);
  }, [selected, windowManager]);

  useEffect(() => {
    setEnergyPercent(DEFAULT_ENERGY_PERCENT);
    setSilverPercent(DEFAULT_SILVER_PERCENT);
  }, [selected?.locationId, setEnergyPercent, setSilverPercent]);

  const doSend = useCallback(() => {
    if (!uiManager || !windowManager) return;

    const uiEmitter = UIEmitter.getInstance();

    console.log('do send!');
    if (windowManager.getCursorState() === CursorState.TargetingForces) {
      setSending(false);
      windowManager.setCursorState(CursorState.Normal);
      uiEmitter.emit(UIEmitterEvent.SendCancelled);
    } else {
      setSending(true);
      windowManager.setCursorState(CursorState.TargetingForces);
      uiEmitter.emit(UIEmitterEvent.SendInitiated, selected);
    }
  }, [selected, windowManager, uiManager]);

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

  return (
    <StyledResourceMenu>
      <p>Send Resources</p>
      <ResourceBar selected={selected} value={energyPercent} setValue={setEnergyPercent} />
      <ResourceBar selected={selected} value={silverPercent} setValue={setSilverPercent} isSilver />
      <ArtifactSelector
        modalsContainer={modalsContainer}
        selected={selected}
        setArtifactDetailsOpen={setArtifactDetailsOpen}
      />
      <div>
        <Btn onClick={() => setWithdrawSilver(true)}>Withdraw</Btn>
        <Btn onClick={doSend}>Send</Btn>
      </div>
    </StyledResourceMenu>
  );
}

const StyledRowIcon = styled.div`
  margin-right: 0.75em;
`;
function ResourceRowIcon({ rowType }: { rowType: RowType }) {
  return (
    <StyledRowIcon>
      {rowType === RowType.Energy && <EnergyIcon />}
      {rowType === RowType.Silver && <SilverIcon />}
      {rowType === RowType.Artifact && <ArtifactIcon />}
    </StyledRowIcon>
  );
}

const StyledResourceBar = styled.div`
  input[type='range'] {
    width: 100%;
    height: 3px;
  }

  div {
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
        <span onClick={() => setValue((x) => x - 1)}>-</span>
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

const ModalIconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  flex-wrap: wrap;
  width: 24px;
  margin-right: 4px;
  height: 128px;
`;

const ArtifactStat = ({
  stat,
  activatedArtifact,
}: {
  stat: StatIdx;
  activatedArtifact?: Artifact;
}) => {
  const buff = activatedArtifact ? getUpgradeStat(activatedArtifact.upgrade, stat) - 100 : 0;

  return (
    <>
      {buff > 0 && <Green>+{buff}%</Green>}
      {buff < 0 && <Red>{buff}%</Red>}
    </>
  );
};

const TimesTwo = () => (
  <TooltipTrigger name={TooltipName.Bonus} style={{ marginLeft: '0.5em' }}>
    <Green>x2</Green>
  </TooltipTrigger>
);

export function PlanetContextPane({
  hook,
  findArtifactHook,
  broadcastHook,
  hatHook,
  upgradeDetHook,
  modalsContainer,
  setArtifactDetailsOpen,
  setWithdrawSilver,
}: {
  hook: ModalHook;
  findArtifactHook: ModalHook;
  broadcastHook: ModalHook;
  hatHook: ModalHook;
  upgradeDetHook: ModalHook;
  modalsContainer: Element;
  setArtifactDetailsOpen: (open: boolean) => void;
  setWithdrawSilver: (open: boolean) => void;
}) {
  const [_account, setAccount] = useState<EthAddress | undefined>(undefined);
  const uiManager = useUIManager();
  const selectedWrapper = useSelectedPlanet(uiManager);
  const selected = selectedWrapper.value;
  const bonus = selected && bonusFromHex(selected.locationId);
  const onEscapeDown = useCallback(() => {
    uiManager.selectedPlanetId$.publish(undefined);
  }, [uiManager]);
  const activatedArtifact = getActivatedArtifact(
    uiManager.getArtifactsWithIds(selected?.heldArtifactIds || [])
  );

  useEmitterSubscribe(escapeDown$, onEscapeDown);

  useEffect(() => {
    if (!uiManager) return;
    setAccount(uiManager.getAccount());
  }, [uiManager]);

  const planetName = (): string => {
    if (!uiManager || !selected) return 'No planet selected.';

    const planetname = ProcgenUtils.getPlanetName(selected);
    return planetname;
  };

  const icons = (
    <>
      <ModalPlanetDetailsIcon hook={hook} />
      <Spacer width={4} />
      <ModalArtifactIcon hook={findArtifactHook} />
      <Spacer width={4} />
      <ModalHatIcon hook={hatHook} />
      <Spacer width={4} />
      <ModalTwitterBroadcastIcon hook={broadcastHook} />
      <Spacer width={4} />
      <ModalUpgradeDetailsIcon hook={upgradeDetHook} />
    </>
  );

  return (
    <ContextPane name={ContextMenuType.Planet} title={planetName()}>
      <StyledPlanetContextPane>
        <StyledPlanetInfo>
          <ModalIconsContainer>{icons}</ModalIconsContainer>
          <PlanetPreview selected={selected} size={128} />
          <div>
            <div>
              <span>
                <TooltipTrigger name={TooltipName.Energy}>
                  <EnergyIcon />
                </TooltipTrigger>
                {bonus && bonus[StatIdx.EnergyCap] && <TimesTwo />}
                <TooltipTrigger name={TooltipName.ArtifactBuff}>
                  <ArtifactStat stat={StatIdx.EnergyCap} />
                </TooltipTrigger>
              </span>
              <span>
                {selected?.owner === EMPTY_ADDRESS && selected.energy > 0 ? (
                  <TooltipTrigger name={TooltipName.Pirates} display='inline-flex'>
                    <span>{getFormatProp(selected, 'energy')}</span>
                  </TooltipTrigger>
                ) : (
                  <>{getFormatProp(selected, 'energy')}</>
                )}{' '}
                <Sub>/</Sub> {getFormatProp(selected, 'energyCap')}
              </span>
            </div>
            <div>
              <span>
                <TooltipTrigger name={TooltipName.Silver}>
                  <SilverIcon />
                </TooltipTrigger>
              </span>
              <span>
                {getFormatProp(selected, 'silver')} <Sub>/</Sub>{' '}
                {getFormatProp(selected, 'silverCap')}
              </span>
            </div>

            <div className='margin-top'>
              <span>
                <TooltipTrigger name={TooltipName.EnergyGrowth}>
                  <EnergyGrowthIcon />
                </TooltipTrigger>
                {bonus && bonus[StatIdx.EnergyGro] && <TimesTwo />}
                <TooltipTrigger name={TooltipName.ArtifactBuff}>
                  <ArtifactStat stat={StatIdx.EnergyGro} activatedArtifact={activatedArtifact} />
                </TooltipTrigger>
              </span>
              <span>{getFormatProp(selected, 'energyGrowth')}</span>
            </div>

            <div>
              <span>
                <TooltipTrigger name={TooltipName.Range}>
                  <RangeIcon />
                </TooltipTrigger>
                {bonus && bonus[StatIdx.Range] && <TimesTwo />}
                <TooltipTrigger name={TooltipName.ArtifactBuff}>
                  <ArtifactStat stat={StatIdx.Range} activatedArtifact={activatedArtifact} />
                </TooltipTrigger>
              </span>
              <span>{getFormatProp(selected, 'range')}</span>
            </div>
            <div>
              <span>
                <TooltipTrigger name={TooltipName.Speed}>
                  <SpeedIcon />
                </TooltipTrigger>
                {bonus && bonus[StatIdx.Speed] && <TimesTwo />}
                <TooltipTrigger name={TooltipName.ArtifactBuff}>
                  <ArtifactStat stat={StatIdx.Speed} activatedArtifact={activatedArtifact} />
                </TooltipTrigger>
              </span>
              <span>{getFormatProp(selected, 'speed')}</span>
            </div>
            <div>
              <span>
                <TooltipTrigger name={TooltipName.Defense}>
                  <DefenseIcon />
                </TooltipTrigger>
                {bonus && bonus[StatIdx.Defense] && <TimesTwo />}
                <TooltipTrigger name={TooltipName.ArtifactBuff}>
                  <ArtifactStat stat={StatIdx.Defense} activatedArtifact={activatedArtifact} />
                </TooltipTrigger>
              </span>
              <span>{getFormatProp(selected, 'defense')}</span>
            </div>
          </div>
        </StyledPlanetInfo>
        {selected?.owner !== EMPTY_ADDRESS && (
          <SendResourceMenu
            selected={selected}
            modalsContainer={modalsContainer}
            setArtifactDetailsOpen={setArtifactDetailsOpen}
            setWithdrawSilver={setWithdrawSilver}
          ></SendResourceMenu>
        )}
      </StyledPlanetContextPane>
    </ContextPane>
  );
}
