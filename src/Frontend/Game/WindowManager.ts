import { WorldCoords } from '@darkforest_eth/types';
import { EventEmitter } from 'events';
import { GameWindowZIndex } from '../Utils/constants';

// these should be relative to window
export type MousePos = {
  x: number;
  y: number;
};

export const enum WindowManagerEvent {
  StateChanged = 'StateChanged',
  MiningCoordsUpdate = 'MiningCoordsUpdate',
  TooltipUpdated = 'TooltipUpdated',
  CtrlDown = 'CtrlDown',
  CtrlUp = 'CtrlUp',
}

export const enum CursorState {
  Normal,
  TargetingExplorer,
  TargetingForces,
}

export const enum TooltipName {
  None,
  SilverGrowth,
  SilverCap,
  Silver,
  TwitterHandle,
  Bonus,
  MinEnergy,
  Time50,
  Time90,
  Pirates,
  Upgrades,
  PlanetRank,
  MaxLevel,
  FindArtifact,
  ArtifactStored,
  SelectedSilver,
  Rank,
  Score,
  MiningPause,
  MiningTarget,
  HashesPerSec,
  CurrentMining,
  HoverPlanet,
  SilverProd,

  // relative orders matter
  BonusEnergyCap,
  BonusEnergyGro,
  BonusRange,
  BonusSpeed,
  BonusDefense,

  // relative orders matter
  Energy,
  EnergyGrowth,
  Range,
  Speed,
  Defense,

  Clowntown,

  ArtifactBuff,

  // note that we actually add ModalName to ModalHelp, and that everything after
  // is not referenced directly. for this reason the relative ordering matters.
  ModalHelp,
  ModalPlanetDetails,
  ModalLeaderboard,
  ModalPlanetDex,
  ModalUpgradeDetails,
  ModalTwitterVerification,
  ModalTwitterBroadcast,
  ModalHats,
  ModalSettings,
  ModalYourArtifacts,
  ModalFindArtifact,
  ModalPlugins,
  ModalWithdrawSilver,
}

class WindowManager extends EventEmitter {
  static instance: WindowManager;
  private mousePos: MousePos;
  private mousedownPos: MousePos | null;
  private lastZIndex: number;
  private cursorState: CursorState;
  private currentTooltip: TooltipName;

  private constructor() {
    super();
    this.mousePos = { x: 0, y: 0 };
    this.mousedownPos = null;
    this.lastZIndex = 0;
    this.currentTooltip = TooltipName.None;

    // is it bad that this doesn't get cleaned up?
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Control') {
        this.emit(WindowManagerEvent.CtrlDown);
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Control') {
        this.emit(WindowManagerEvent.CtrlUp);
      }
    });
  }

  static getInstance(): WindowManager {
    if (!WindowManager.instance) {
      WindowManager.instance = new WindowManager();
    }

    return WindowManager.instance;
  }

  setTooltip(tooltip: TooltipName): void {
    this.currentTooltip = tooltip;
    this.emit(WindowManagerEvent.TooltipUpdated, this.currentTooltip);
  }

  getTooltip(): TooltipName {
    return this.currentTooltip;
  }

  getClickDelta(): MousePos {
    if (!this.mousedownPos) return { x: 0, y: 0 };
    else
      return {
        x: this.mousePos.x - this.mousedownPos.x,
        y: this.mousePos.y - this.mousedownPos.y,
      };
  }

  getIndex(): number {
    this.lastZIndex++;
    return this.lastZIndex + GameWindowZIndex.Modal;
  }

  getCursorState(): CursorState {
    return this.cursorState;
  }

  setCursorState(newstate: CursorState): void {
    this.cursorState = newstate;
    this.emit(WindowManagerEvent.StateChanged, newstate);
  }

  acceptInputForTarget(input: WorldCoords) {
    if (this.cursorState !== CursorState.TargetingExplorer) return;
    this.emit(WindowManagerEvent.MiningCoordsUpdate, input);
    this.setCursorState(CursorState.Normal);
  }
}

export default WindowManager;
