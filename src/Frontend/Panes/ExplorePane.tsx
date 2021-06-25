import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WorldCoords } from '@darkforest_eth/types';
import TutorialManager, { TutorialState } from '../../Backend/GameLogic/TutorialManager';
import { SpiralPattern } from '../../Backend/Miner/MiningPatterns';
import { IconButton } from '../Components/IconButton';
import { TargetIcon, PauseIcon, PlayIcon } from '../Components/Icons';
import { Coords, Sub } from '../Components/Text';
import WindowManager, { CursorState, WindowManagerEvent, TooltipName } from '../Game/WindowManager';
import { useUIManager } from '../Utils/AppHooks';
import { MIN_CHUNK_SIZE } from '../Utils/constants';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';
import { TooltipTrigger } from './Tooltip';
import dfstyles from '../Styles/dfstyles';
import { MultiSelectSetting, Setting } from '../Utils/SettingsHooks';

const StyledExplorePane = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  background: ${dfstyles.colors.background};

  min-width: 23em;
  width: fit-content;
  height: fit-content;
  padding: 0.5em;
  overflow-y: hidden;

  border-right: 1px solid ${dfstyles.colors.subtext};
  border-top: 1px solid ${dfstyles.colors.subtext};

  border-top-right-radius: ${dfstyles.borderRadius};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  p,
  div {
    margin-right: 0.5em;
    &:last-child {
      margin-right: 0;
    }
  }
`;

const First = styled.p<{ mining: boolean }>`
  min-width: 5em;
  width: fit-content;

  ${({ mining }) => mining && 'text-align: right;'}
`;

const ExploreIcons = styled.div`
  width: fit-content;

  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 0.25em;

  & > span {
    margin-right: 0.25em;

    &:last-child {
      margin-right: 0;
    }
  }

  // TODO there's def a better way to do this
  .fill-target {
    background: ${dfstyles.colors.text};
    & path {
      fill: ${dfstyles.colors.background};
    }
    color: ${dfstyles.colors.background};
  }
`;

function Cores() {
  const uiManager = useUIManager();

  const values = ['1', '2', '4', '8', '16', '32'];
  const labels = values.map((value) => value + ' core' + (value === '1' ? '' : 's'));

  return (
    <MultiSelectSetting
      style={{ width: '7em' }}
      uiManager={uiManager}
      setting={Setting.MiningCores}
      values={values}
      labels={labels}
    />
  );
}

function HashesPerSec() {
  const uiManager = useUIManager();

  const [hashRate, setHashRate] = useState<number>(0);

  useEffect(() => {
    if (!uiManager) return;
    const updateHashes = () => {
      setHashRate(uiManager.getHashesPerSec());
    };

    const intervalId = setInterval(updateHashes, 1000);
    updateHashes();

    return () => {
      clearInterval(intervalId);
    };
  }, [uiManager]);

  const getHashes = () => {
    return hashRate.toFixed(0);
  };

  return (
    <>
      {getHashes()}{' '}
      <TooltipTrigger name={TooltipName.HashesPerSec}>
        <Sub>#/s</Sub>
      </TooltipTrigger>
    </>
  );
}

export function ExplorePane() {
  const uiManager = useUIManager();
  const windowManager = WindowManager.getInstance();
  const uiEmitter = UIEmitter.getInstance();

  const [mining, setMining] = useState<boolean>(uiManager.isMining());
  useEffect(() => {
    if (mining) uiManager?.startExplore();
    else {
      uiManager?.stopExplore();
      const tutorialManager = TutorialManager.getInstance();
      tutorialManager.acceptInput(TutorialState.MinerPause);
    }
  }, [mining, uiManager]);

  const [pattern, setPattern] = useState<SpiralPattern | undefined>(undefined);
  useEffect(() => {
    if (!uiManager) return;
    setPattern(uiManager.getMiningPattern() as SpiralPattern | undefined);
  }, [uiManager]);

  useEffect(() => {
    const doMouseDown = (worldCoords: WorldCoords) => {
      if (windowManager.getCursorState() === CursorState.TargetingExplorer) {
        windowManager.acceptInputForTarget(worldCoords);
      }
    };

    const updatePattern = (worldCoords: WorldCoords) => {
      const newpattern = new SpiralPattern(worldCoords, MIN_CHUNK_SIZE);
      uiManager?.setMiningPattern(newpattern);
      setPattern(newpattern);

      const tutorialManager = TutorialManager.getInstance();
      tutorialManager.acceptInput(TutorialState.MinerMove);
    };

    uiEmitter.on(UIEmitterEvent.WorldMouseDown, doMouseDown);
    windowManager.on(WindowManagerEvent.MiningCoordsUpdate, updatePattern);
    return () => {
      uiEmitter.removeListener(UIEmitterEvent.WorldMouseDown, doMouseDown);
      windowManager.removeListener(WindowManagerEvent.MiningCoordsUpdate, updatePattern);
    };
  }, [uiEmitter, windowManager, uiManager]);

  const doTarget = (_e: React.MouseEvent) => {
    if (windowManager.getCursorState() === CursorState.TargetingExplorer)
      windowManager.setCursorState(CursorState.Normal);
    else windowManager.setCursorState(CursorState.TargetingExplorer);
  };

  const getCorner = (pattern: SpiralPattern): WorldCoords => ({
    x: pattern.fromChunk.bottomLeft.x,
    y: pattern.fromChunk.bottomLeft.y,
  });

  const getCoords = (): WorldCoords => {
    return pattern ? getCorner(pattern) : { x: 0, y: 0 };
  };

  const [targeting, setTargeting] = useState<boolean>(false);
  useEffect(() => {
    const onChange = () =>
      setTargeting(windowManager.getCursorState() === CursorState.TargetingExplorer);

    windowManager.on(WindowManagerEvent.StateChanged, onChange);
    return () => {
      windowManager.removeListener(WindowManagerEvent.StateChanged, onChange);
    };
  }, [windowManager, setTargeting]);

  return (
    <StyledExplorePane>
      <First mining={mining}>{mining ? <HashesPerSec /> : 'Explore'}</First>
      {mining && <p>@</p>}
      <p>
        <Sub>{mining ? <Coords coords={getCoords()} /> : 'paused'}</Sub>
      </p>

      {/* buttons */}
      <ExploreIcons>
        <TooltipTrigger
          needsCtrl
          name={TooltipName.MiningTarget}
          style={{
            height: '1.5em',
          }}
          className={targeting ? 'fill-target' : ''}
        >
          <span onClick={doTarget}>
            <IconButton width={'4em'}>
              Move <TargetIcon />
            </IconButton>
          </span>
        </TooltipTrigger>
        {mining && (
          <span>
            <Cores />
          </span>
        )}
        <TooltipTrigger needsCtrl name={TooltipName.MiningPause} style={{ height: '1.5em' }}>
          <span onClick={() => setMining((b) => !b)}>
            <IconButton>{mining ? <PauseIcon /> : <PlayIcon />}</IconButton>
          </span>
        </TooltipTrigger>
      </ExploreIcons>
    </StyledExplorePane>
  );
}
