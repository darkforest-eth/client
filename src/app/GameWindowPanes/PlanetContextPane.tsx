import React, { useContext, useEffect, useState } from 'react';
import {
  ContextMenuType,
  SelectedContext,
  SelectedStatContext,
} from '../GameWindow';
import { ContextPane } from '../GameWindowComponents/ContextMenu';
import styled, { css } from 'styled-components';
import { EthAddress, Planet } from '../../_types/global/GlobalTypes';
import GameUIManager from '../board/GameUIManager';
import GameUIManagerContext from '../board/GameUIManagerContext';
import { getPlanetName } from '../../utils/ProcgenUtils';
import {
  formatNumber,
  getFormatProp,
  getPlanetShortHash,
  getPlayerShortHash,
  PlanetStatsInfo,
} from '../../utils/Utils';
import { emptyAddress } from '../../utils/CheckedTypeUtils';
import dfstyles from '../../styles/dfstyles';
import { EnergyIcon, SilverIcon } from '../Icons';
import { ModalHook, ModalPlanetDetailsIcon } from './ModalPane';
import _ from 'lodash';
import { Sub } from '../../components/Text';
import { PlanetPreview } from './PlanetPreview';
import WindowManager, {
  CursorState,
  TooltipName,
} from '../../utils/WindowManager';
import UIEmitter, { UIEmitterEvent } from '../../utils/UIEmitter';
import { TooltipTrigger } from './GameWindowPanes';

const StyledPlanetContextPane = styled.div`
  width: 20em;
`;

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

const StyledFleets = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  margin-top: 1.5em;
  & > p:first-child {
    color: ${dfstyles.colors.subtext};
    text-decoration: underline;
  }

  & > div.statselect {
    width: 100%;
    margin-top: 1em;

    & > div {
      width: 100%;
    }

    & > div:last-child {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      & > p:first-child {
        flex-grow: 1;
      }

      // spinner
      & > span:last-child {
        margin-left: 0.6em;
      }
    }
  }

  // fleet button
  & > div:last-child {
    margin-top: 1em;
    padding: 0.2em 0;
    text-align: center;

    border: 1px solid ${dfstyles.colors.text};
    border-radius: 2px;

    transition: color 0.2s, background 0.2s;

    &:hover,
    &.fill-send {
      color: ${dfstyles.colors.background};
      background: ${dfstyles.colors.text};
      cursor: pointer;
    }
  }
`;

const StyledIconSelector = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & span.select {
    path {
      fill: white;
    }
  }

  & span.noselect {
    path {
      fill: gray;
    }
  }

  & span:hover {
    cursor: pointer;

    & path {
      fill: ${dfstyles.colors.dfblue};
    }
  }
`;

type NumberHook = [number, (arg: number | ((n: number) => number)) => void];

export function IconSelector({
  icon,
  hook,
}: {
  icon: React.ReactNode;
  hook: NumberHook;
}) {
  const [percent, setPercent] = hook;
  return (
    <StyledIconSelector>
      {_.range(1, 11).map((i) => (
        <span
          key={i}
          onClick={() => setPercent(i * 10)}
          className={percent >= i * 10 ? 'select' : 'noselect'}
        >
          {icon}
        </span>
      ))}
    </StyledIconSelector>
  );
}

const defaultTransform = css`scale(2, 0.8)`;

const StyledSpinner = styled.span`
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  width: 1em;
  height: 1.5em;

  position: relative;
  right: -4px;

  ${dfstyles.prefabs.noselect};

  & > span {
    height: 0.7em;
    width: 0.5em;
    background: ${dfstyles.colors.text};
    border-radius: 2px;
    text-align: center;
    color: ${dfstyles.colors.background};
    display: inline-block;
    transform: ${defaultTransform};

    & span {
      position: relative;
      bottom: 3px;
    }

    &:last-child {
      transform: ${defaultTransform} rotate(180deg);
    }

    &:hover {
      cursor: pointer;
      background: ${dfstyles.colors.subtext};
    }
  }
`;

export function Spinner({ hook }: { hook: NumberHook }) {
  const [, setPercent] = hook;

  return (
    <StyledSpinner>
      <span onClick={() => setPercent((x) => Math.min(x + 1, 100))}>
        <span>^</span>
      </span>
      <span onClick={() => setPercent((x) => Math.max(x - 1, 0))}>
        <span>^</span>
      </span>
    </StyledSpinner>
  );
}

const DEFAULT_ENERGY_PERCENT = 50;
const DEFAULT_SILVER_PERCENT = 0;

export function PlanetContextPane({ hook }: { hook: ModalHook }) {
  const [account, setAccount] = useState<EthAddress | null>(null);
  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);
  const selected = useContext<Planet | null>(SelectedContext);

  const selectedStats = useContext<PlanetStatsInfo | null>(SelectedStatContext);

  const [visible] = hook;

  const windowManager = WindowManager.getInstance();

  useEffect(() => {
    if (!uiManager) return;
    setAccount(uiManager.getAccount());
  }, [uiManager]);

  const planetName = (): string => {
    if (!uiManager || !selected) return 'No planet selected.';

    const planetname = getPlanetName(selected);
    const shorthash = getPlanetShortHash(selected);
    const shortaddress = getPlayerShortHash(selected.owner);

    if (selected.owner === emptyAddress)
      return `Unclaimed ${shorthash} ${planetname}`;
    if (selected.owner === account) return `${shorthash} ${planetname}`;

    const twitter = uiManager.getTwitter(selected.owner);
    if (!twitter) return `${shortaddress}'s ${shorthash} ${planetname}`;
    else return `@${twitter}'s ${shorthash} ${planetname}`;
  };

  const energyHook = useState<number>(
    selected && uiManager
      ? uiManager.getForcesSending(selected.locationId)
      : DEFAULT_ENERGY_PERCENT
  );
  const [energyPercent, _setEnergyPercent] = energyHook;

  const silverHook = useState<number>(
    selected && uiManager
      ? uiManager.getForcesSending(selected.locationId)
      : DEFAULT_SILVER_PERCENT
  );
  const [silverPercent, _setSilverPercent] = silverHook;

  const getEnergy = () =>
    selectedStats
      ? formatNumber((energyPercent / 100) * selectedStats.energy)
      : '0';

  const getSilver = () =>
    selectedStats
      ? formatNumber((silverPercent / 100) * selectedStats.silver)
      : '0';

  /*
  useEffect(() => {
    console.log('updating percent values');
    console.log(selected);
    if (!uiManager) return;
    if (!selected) {
      setPopPercent(DEFAULT_POP_PERCENT);
      setSilverPercent(DEFAULT_SILVER_PERCENT);
    } else {
      setPopPercent(uiManager.getForcesSending(selected.locationId));
      setSilverPercent(uiManager.getSilverSending(selected.locationId));
    }
  }, [selected, uiManager, setPopPercent, setSilverPercent]);
  */

  useEffect(() => {
    if (!selected || !uiManager) return;

    uiManager.setForcesSending(selected.locationId, energyPercent);
    uiManager.setSilverSending(selected.locationId, silverPercent);
  }, [energyPercent, silverPercent, selected, uiManager]);

  const [sending, setSending] = useState<boolean>(false);
  const doSend = () => {
    if (!uiManager) return;

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
  };

  useEffect(() => {
    const uiEmitter = UIEmitter.getInstance();
    setSending(false);
    windowManager.setCursorState(CursorState.Normal);
    uiEmitter.emit(UIEmitterEvent.SendCancelled);
  }, [visible, windowManager]);

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
    <ContextPane
      name={ContextMenuType.Planet}
      title={planetName()}
      headerItems={<ModalPlanetDetailsIcon hook={hook} />}
    >
      <StyledPlanetContextPane>
        <StyledPlanetInfo>
          <PlanetPreview selected={selected} />
          <div>
            <div>
              <span>
                <EnergyIcon />
              </span>
              <span>
                <TooltipTrigger name={TooltipName.SelectedEnergy}>
                  {getFormatProp(selectedStats, 'energy')}
                </TooltipTrigger>{' '}
                <Sub>/</Sub> {getFormatProp(selected, 'energyCap')}
              </span>
            </div>

            <div>
              <span>
                <SilverIcon />
              </span>
              <span>
                {getFormatProp(selectedStats, 'silver')} <Sub>/</Sub>{' '}
                {getFormatProp(selected, 'silverCap')}
              </span>
            </div>

            {/* <div>
              <span>
                <RangeIcon />
              </span>
              <span>{getFormatProp(selected, 'range')}</span>
            </div>
            <div>
              <span>
                <SpeedIcon />
              </span>
              <span>{getFormatProp(selected, 'speed')}</span>
            </div> */}
          </div>
        </StyledPlanetInfo>
        <StyledFleets
          visible={selected !== null && selected.owner !== emptyAddress}
        >
          <p>Send Resources</p>
          <div className='statselect'>
            <IconSelector
              icon={<EnergyIcon />}
              hook={energyHook}
            ></IconSelector>
            <div>
              <p>
                <Sub>Sending {getEnergy()} energy</Sub>
              </p>
              <p>{energyPercent}%</p>
              <Spinner hook={energyHook} />
            </div>
          </div>
          {selected && selected.silver > 0 && (
            <div className='statselect'>
              <IconSelector
                icon={<SilverIcon />}
                hook={silverHook}
              ></IconSelector>
              <div>
                <p>
                  <Sub>Sending {getSilver()} silver</Sub>
                </p>
                <p>{silverPercent}%</p>
                <Spinner hook={silverHook} />
              </div>
            </div>
          )}
          <div onClick={doSend} className={sending ? 'fill-send' : ''}>
            Send Resources
          </div>
        </StyledFleets>
      </StyledPlanetContextPane>
    </ContextPane>
  );
}
