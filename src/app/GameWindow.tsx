import _ from 'lodash';
import React, { useEffect, useState, createContext } from 'react';
import { useStoredUIState, UIDataKey } from '../api/UIStateStorageManager';
import UIEmitter, { UIEmitterEvent } from '../utils/UIEmitter';
import { copyPlanetStats, PlanetStatsInfo } from '../utils/Utils';
import WindowManager, { WindowManagerEvent } from '../utils/WindowManager';
import { EthAddress, Planet } from '../_types/global/GlobalTypes';
import GameUIManager from './board/GameUIManager';
import { GameWindowLayout } from './GameWindowLayout';

export const enum GameWindowZIndex {
  Toggler = 3,
  MenuBar = 4,
  Modal = 1000,

  Tooltip = 16000000,
}

export const enum ContextMenuType {
  None,
  Planet,
  Fleet,
}

export const ContextMenuContext = createContext<ContextMenuType>(
  ContextMenuType.None
);
export const AccountContext = createContext<EthAddress | null>(null);

// we separate these two for a small speed optimization - we only need to refresh some planet stats on a loop
export const SelectedContext = createContext<Planet | null>(null);
export const SelectedStatContext = createContext<PlanetStatsInfo | null>(null);

export const HiPerfContext = createContext<boolean | null>(null);

export const CtrlContext = createContext<boolean>(false);

export default function GameWindow({
  uiManager,
}: {
  uiManager: GameUIManager;
}) {
  const [selected, setSelected] = useState<Planet | null>(null);

  // TODO rethink abstractions here
  const [contextMenu, setContextMenu] = useState<ContextMenuType>(
    ContextMenuType.None
  );

  useEffect(() => {
    if (!uiManager) return;

    const onKeypress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelected(null);
        uiManager?.setSelectedPlanet(null);
      }
    };

    document.addEventListener('keydown', onKeypress);
    return () => {
      document.removeEventListener('keydown', onKeypress);
    };
  }, [uiManager]);

  // setup get selected planet
  const [planetStats, setPlanetStats] = useState<PlanetStatsInfo | null>(null);
  useEffect(() => {
    const updateSelected = () => {
      if (!uiManager) return;
      const newSelected = uiManager.getSelectedPlanet();
      setSelected(newSelected);
      setPlanetStats(copyPlanetStats(newSelected));
    };

    const uiEmitter = UIEmitter.getInstance();
    uiEmitter.on(UIEmitterEvent.GamePlanetSelected, updateSelected);

    return () => {
      uiEmitter.removeListener(
        UIEmitterEvent.GamePlanetSelected,
        updateSelected
      );
    };
  }, [uiManager]);

  // refresh selected stats
  useEffect(() => {
    if (!uiManager) return;

    const updatePlanetStats = () => {
      setPlanetStats(copyPlanetStats(uiManager.getSelectedPlanet()));
    };

    const intervalId = setInterval(updatePlanetStats, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [selected, uiManager]);

  // set up lastupdated tick
  useEffect(() => {
    const lastUpdated = () => {
      localStorage.setItem('lastUpdated', Date.now().toString());
    };

    const intervalId = setInterval(lastUpdated, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const uiEmitter = UIEmitter.getInstance();
    if (selected !== null) {
      setContextMenu(ContextMenuType.Planet);
      uiEmitter.emit(UIEmitterEvent.ContextChange, ContextMenuType.Planet);
    } else {
      setContextMenu(ContextMenuType.None);
      uiEmitter.emit(UIEmitterEvent.ContextChange, ContextMenuType.None);
    }
  }, [selected]);

  // set up account
  const [account, setAccount] = useState<EthAddress | null>(null);

  useEffect(() => {
    if (!uiManager) return;
    setAccount(uiManager.getAccount());
  }, [uiManager]);

  // make this into a context (fix this later)
  const hiPerfHook = useStoredUIState<boolean>(UIDataKey.highPerf, uiManager);

  // for tooltips
  const [ctrl, setCtrl] = useState<boolean>(false);
  useEffect(() => {
    const windowManager = WindowManager.getInstance();

    const onKeyDown = () => setCtrl(true);
    const onKeyUp = () => setCtrl(false);

    windowManager.on(WindowManagerEvent.CtrlDown, onKeyDown);
    windowManager.on(WindowManagerEvent.CtrlUp, onKeyUp);

    return () => {
      windowManager.removeAllListeners(WindowManagerEvent.CtrlDown);
      windowManager.removeAllListeners(WindowManagerEvent.CtrlUp);
    };
  }, [setCtrl]);

  return (
    <SelectedContext.Provider value={selected}>
      <ContextMenuContext.Provider value={contextMenu}>
        <AccountContext.Provider value={account}>
          <SelectedStatContext.Provider value={planetStats}>
            <HiPerfContext.Provider value={hiPerfHook[0]}>
              <CtrlContext.Provider value={ctrl}>
                <GameWindowLayout
                  hiPerfHook={hiPerfHook}
                  gameUIManager={uiManager}
                />
              </CtrlContext.Provider>
            </HiPerfContext.Provider>
          </SelectedStatContext.Provider>
        </AccountContext.Provider>
      </ContextMenuContext.Provider>
    </SelectedContext.Provider>
  );
}
