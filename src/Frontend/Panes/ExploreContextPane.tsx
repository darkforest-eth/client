import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WorldCoords } from '@darkforest_eth/types';
import TutorialManager, { TutorialState } from '../../Backend/GameLogic/TutorialManager';
import { SpiralPattern } from '../../Backend/Miner/MiningPatterns';
import { ContextMenuType, ContextPane } from '../Components/ContextMenu';
import { IconButton } from '../Components/IconButton';
import { TargetIcon, PauseIcon, PlayIcon } from '../Components/Icons';
import { Sub, White } from '../Components/Text';
import WindowManager, { CursorState, WindowManagerEvent, TooltipName } from '../Game/WindowManager';
import { useUIManager } from '../Utils/AppHooks';
import { MIN_CHUNK_SIZE } from '../Utils/constants';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';
import { TooltipTrigger } from './Tooltip';

const StyledExploreContextPane = styled.div`
  width: 18.5em;
  height: 8em;

  & p:last-child {
    margin-top: 0.5em;
  }

  overflow: hidden;
`;

export function ExploreContextPane() {
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

  const getCorner = (pattern: SpiralPattern) => ({
    x: pattern.fromChunk.bottomLeft.x,
    y: pattern.fromChunk.bottomLeft.y,
  });

  const getCoords = () => {
    return pattern ? `(${getCorner(pattern).x}, ${getCorner(pattern).y})` : '(0, 0)';
  };

  const [hashRate, setHashRate] = useState<number>(0);
  useEffect(() => {
    if (!uiManager) return;
    const updateHashes = () => {
      setHashRate(uiManager.getHashesPerSec());
    };

    const intervalId = setInterval(updateHashes, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [uiManager]);

  const getHashes = () => {
    return mining ? hashRate.toFixed(0) : '0';
  };

  return (
    <ContextPane
      name={ContextMenuType.None}
      title='Explore'
      headerItems={
        <>
          <TooltipTrigger
            needsCtrl
            name={TooltipName.MiningTarget}
            style={{
              height: '1.5em',
            }}
            className={
              windowManager.getCursorState() === CursorState.TargetingExplorer ? 'fill-target' : ''
            }
          >
            <span onClick={doTarget}>
              <IconButton width={'4em'}>
                Move <TargetIcon />
              </IconButton>
            </span>
          </TooltipTrigger>
          <TooltipTrigger needsCtrl name={TooltipName.MiningPause} style={{ height: '1.5em' }}>
            <span onClick={() => setMining((b) => !b)}>
              <IconButton>{mining ? <PauseIcon /> : <PlayIcon />}</IconButton>
            </span>
          </TooltipTrigger>
        </>
      }
    >
      <StyledExploreContextPane>
        <Sub>
          <p>
            Move your explorer anywhere to explore that part of the universe.
            <br />
            It will continue to explore as long as you leave this tab open.
          </p>
          <p>
            <White>{getHashes()}</White> hashes/sec{' '}
            {mining && (
              <>
                around <White>{getCoords()}</White>
              </>
            )}
          </p>
        </Sub>
      </StyledExploreContextPane>
    </ContextPane>
  );
}
