import { WorldCoords } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TutorialManager, { TutorialState } from '../../Backend/GameLogic/TutorialManager';
import { SpiralPattern } from '../../Backend/Miner/MiningPatterns';
import { Spacer } from '../Components/CoreUI';
import { IconButton } from '../Components/IconButton';
import { PauseIcon, PlayIcon, TargetIcon } from '../Components/Icons';
import { Coords, Sub } from '../Components/Text';
import WindowManager, { CursorState, TooltipName, WindowManagerEvent } from '../Game/WindowManager';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { MIN_CHUNK_SIZE } from '../Utils/constants';
import { MultiSelectSetting, Setting, useBooleanSetting } from '../Utils/SettingsHooks';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';
import { TooltipTrigger } from './Tooltip';

const StyledExplorePane = styled.div`
  background: ${dfstyles.colors.background};
  position: absolute;
  bottom: 0;
  left: 0;

  padding: 0.5em;
  margin: 0.5em;

  /* border: 1px solid ${dfstyles.colors.subtext}; */
  border-radius: ${dfstyles.borderRadius};
`;

function Cores() {
  const uiManager = useUIManager();

  const values = ['1', '2', '4', '8', '16', '32'];
  const labels = values.map((value) => value + ' core' + (value === '1' ? '' : 's'));

  return (
    <MultiSelectSetting
      style={{ width: '7em', height: '2em' }}
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
    return hashRate.toFixed(0).toLocaleString();
  };

  return (
    <>
      {getHashes()}
      <Spacer width={8} />
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

  const [mining] = useBooleanSetting(uiManager, Setting.IsMining);

  const minerButtonClicked = () => {
    if (mining) uiManager?.stopExplore();
    else {
      uiManager?.startExplore();
      const tutorialManager = TutorialManager.getInstance();
      tutorialManager.acceptInput(TutorialState.MinerPause);
    }
  };

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

  const minerMoveText =
    windowManager.getCursorState() === CursorState.TargetingExplorer
      ? 'Moving Explorer...'
      : 'Move Explorer';
  const playPauseText = mining ? 'Pause' : 'Explore!';
  return (
    <StyledExplorePane>
      {/* button which allows player to preposition the center of their miner */}
      <TooltipTrigger needsCtrl display={'inline-block'} name={TooltipName.MiningTarget}>
        <IconButton
          style={{
            height: '2em',
            padding: '4px 8px',
          }}
          onClick={doTarget}
        >
          {minerMoveText}
          <Spacer width={8} />
          <TargetIcon />
        </IconButton>
      </TooltipTrigger>
      <Spacer width={8} />
      {/* button which toggles whether or not the game is mining. this persists between refreshes */}
      <TooltipTrigger needsCtrl display={'inline-block'} name={TooltipName.MiningPause}>
        <IconButton
          style={{
            height: '2em',
            padding: '4px 8px',
          }}
          onClick={minerButtonClicked}
        >
          {playPauseText} <Spacer width={8} /> {mining ? <PauseIcon /> : <PlayIcon />}
        </IconButton>
      </TooltipTrigger>

      {mining && (
        <>
          <Spacer width={8} />
          <Cores />
          <Spacer width={8} />
          <Sub>
            <Coords coords={getCoords()} />
          </Sub>
          <Spacer width={8} />
          <HashesPerSec />
        </>
      )}
    </StyledExplorePane>
  );
}
