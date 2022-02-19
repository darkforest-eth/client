import {
  CursorState,
  ModalManagerEvent,
  Setting,
  TooltipName,
  WorldCoords,
} from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TutorialManager, { TutorialState } from '../../Backend/GameLogic/TutorialManager';
import {
  MiningPatternType,
  SpiralPattern,
  SwissCheesePattern,
  TowardsCenterPattern,
  TowardsCenterPatternV2,
} from '../../Backend/Miner/MiningPatterns';
import { EmSpacer, SelectFrom } from '../Components/CoreUI';
import { Icon, IconType } from '../Components/Icons';
import { MaybeShortcutButton } from '../Components/MaybeShortcutButton';
import { Coords, Sub } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { MIN_CHUNK_SIZE } from '../Utils/constants';
import { MultiSelectSetting, useBooleanSetting } from '../Utils/SettingsHooks';
import { TOGGLE_EXPLORE, TOGGLE_TARGETTING } from '../Utils/ShortcutConstants';
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
      style={{ width: '7em' }}
      uiManager={uiManager}
      setting={Setting.MiningCores}
      values={values}
      labels={labels}
    />
  );
}

const Pattern = {
  [MiningPatternType.Spiral.toString()]: SpiralPattern,
  [MiningPatternType.SwissCheese.toString()]: SwissCheesePattern,
  [MiningPatternType.TowardsCenter.toString()]: TowardsCenterPattern,
  [MiningPatternType.TowardsCenterV2.toString()]: TowardsCenterPatternV2,
};

const miningSelectValues = [
  MiningPatternType.Spiral.toString(),
  MiningPatternType.SwissCheese.toString(),
  MiningPatternType.TowardsCenter.toString(),
  MiningPatternType.TowardsCenterV2.toString(),
];
const miningSelectLabels = ['Spiral', 'SwissCheese', 'TowardsCenter', 'TowardsCenterV2'];

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
    return Math.floor(hashRate).toLocaleString();
  };

  return (
    <>
      <TooltipTrigger name={TooltipName.HashesPerSec}>
        {getHashes()}
        <EmSpacer width={0.5} />
        <Sub>#/s</Sub>
      </TooltipTrigger>
    </>
  );
}

export function ExplorePane() {
  const uiManager = useUIManager();
  const modalManager = uiManager.getModalManager();
  const uiEmitter = UIEmitter.getInstance();
  const [pattern, setPattern] = useState<string>(MiningPatternType.Spiral.toString());
  const [mining] = useBooleanSetting(uiManager, Setting.IsMining);
  const [targetting, setTargetting] = useState(false);
  const [coords, setCoords] = useState<WorldCoords>(uiManager.getHomeCoords());

  useEffect(() => {
    const doMouseDown = (worldCoords: WorldCoords) => {
      if (modalManager.getCursorState() === CursorState.TargetingExplorer) {
        modalManager.acceptInputForTarget({
          x: Math.floor(worldCoords.x),
          y: Math.floor(worldCoords.y),
        });
      }
    };

    const updateCoords = (worldCoords: WorldCoords) => {
      const PatternCtor = Pattern[pattern];
      const newpattern = new PatternCtor(worldCoords, MIN_CHUNK_SIZE);
      uiManager?.setMiningPattern(newpattern);
      setCoords(worldCoords);

      const tutorialManager = TutorialManager.getInstance(uiManager);
      tutorialManager.acceptInput(TutorialState.MinerMove);
    };
    const cursorStateChanged = (state: CursorState) => {
      setTargetting(state === CursorState.TargetingExplorer);
    };

    uiEmitter.on(UIEmitterEvent.WorldMouseDown, doMouseDown);
    modalManager.on(ModalManagerEvent.MiningCoordsUpdate, updateCoords);
    uiEmitter.on(ModalManagerEvent.StateChanged, cursorStateChanged);
    return () => {
      uiEmitter.removeListener(UIEmitterEvent.WorldMouseDown, doMouseDown);
      modalManager.removeListener(ModalManagerEvent.MiningCoordsUpdate, updateCoords);
      uiEmitter.removeListener(ModalManagerEvent.StateChanged, cursorStateChanged);
    };
  }, [uiEmitter, modalManager, uiManager, pattern]);

  const updatePattern = (pattern: string) => {
    setPattern(pattern);
    const PatternCtor = Pattern[pattern];
    const newpattern = new PatternCtor(coords, MIN_CHUNK_SIZE);
    uiManager.setMiningPattern(newpattern);
  };

  const doTarget = () => {
    uiManager.toggleTargettingExplorer();
  };

  const doExplore = () => {
    uiManager.toggleExplore();
  };

  return (
    <StyledExplorePane>
      {/* button which allows player to preposition the center of their miner */}
      <TooltipTrigger style={{ display: 'inline-block' }} name={TooltipName.MiningTarget}>
        <MaybeShortcutButton
          onClick={doTarget}
          onShortcutPressed={doTarget}
          shortcutKey={TOGGLE_TARGETTING}
          shortcutText={TOGGLE_TARGETTING}
        >
          {targetting ? 'Moving...' : 'Move'}
          <EmSpacer width={1} />
          <Icon type={IconType.Target} />
        </MaybeShortcutButton>
      </TooltipTrigger>
      <EmSpacer width={0.5} />
      {/* button which toggles whether or not the game is mining. this persists between refreshes */}
      <TooltipTrigger style={{ display: 'inline-block' }} name={TooltipName.MiningPause}>
        <MaybeShortcutButton
          onClick={doExplore}
          onShortcutPressed={doExplore}
          shortcutKey={TOGGLE_EXPLORE}
          shortcutText={'space'}
        >
          {mining ? 'Pause' : 'Explore!'} <EmSpacer width={1} />{' '}
          {mining ? <Icon type={IconType.Pause} /> : <Icon type={IconType.Play} />}
        </MaybeShortcutButton>
      </TooltipTrigger>

      {mining && (
        <>
          <EmSpacer width={0.5} />
          <Cores />
          <EmSpacer width={0.5} />
          {/* TODO: Make this a Settings thing */}
          <SelectFrom
            style={{ width: '10em' }}
            values={miningSelectValues}
            labels={miningSelectLabels}
            value={pattern}
            setValue={updatePattern}
          />
          <EmSpacer width={1} />
          <Sub>
            <Coords coords={coords} />
          </Sub>
          <EmSpacer width={0.5} />
          <HashesPerSec />
        </>
      )}
    </StyledExplorePane>
  );
}
