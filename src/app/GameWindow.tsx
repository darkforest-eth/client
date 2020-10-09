import _ from 'lodash';
import React, { useContext, useEffect, useState, createContext } from 'react';
import { useStoredUIState, UIDataKey } from '../api/UIStateStorageManager';
import UIEmitter, { UIEmitterEvent } from '../utils/UIEmitter';
import { copyPlanetStats, PlanetStatsInfo } from '../utils/Utils';
import { EthAddress, Planet } from '../_types/global/GlobalTypes';
import GameUIManager from './board/GameUIManager';
import GameUIManagerContext from './board/GameUIManagerContext';
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

export default function GameWindow() {
  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);
  const [selected, setSelected] = useState<Planet | null>(null);

  // TODO rethink abstractions here
  const [contextMenu, setContextMenu] = useState<ContextMenuType>(
    ContextMenuType.None
  );

  useEffect(() => {
    if (!uiManager) return;

    const onKeypress = (e) => {
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
    const updatePlanetStats = () => {
      setPlanetStats(copyPlanetStats(selected));
    };

    const intervalId = setInterval(updatePlanetStats, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [selected]);

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

  return (
    <SelectedContext.Provider value={selected}>
      <ContextMenuContext.Provider value={contextMenu}>
        <AccountContext.Provider value={account}>
          <SelectedStatContext.Provider value={planetStats}>
            <HiPerfContext.Provider value={hiPerfHook[0]}>
              <GameWindowLayout hiPerfHook={hiPerfHook} />
            </HiPerfContext.Provider>
          </SelectedStatContext.Provider>
        </AccountContext.Provider>
      </ContextMenuContext.Provider>
    </SelectedContext.Provider>
  );
}
