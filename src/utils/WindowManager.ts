import { EventEmitter } from 'events';
import { GameWindowZIndex } from '../app/GameWindow';
import { WorldCoords } from './Coordinates';

/*
  technically these should be number | null since this thing will init before
  the first mousemove event, but the probability of this mattering is so low idc
*/

// these should be relative to window
export type MousePos = {
  x: number;
  y: number;
};

export enum WindowManagerEvent {
  StateChanged = 'StateChanged',
  MiningCoordsUpdate = 'MiningCoordsUpdate',
  TooltipUpdated = 'TooltipUpdated',

  CtrlDown = 'CtrlDown',
  CtrlUp = 'CtrlUp',
}

export enum CursorState {
  Normal,
  TargetingExplorer,
  TargetingForces,
}

export enum TooltipName {
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
  SelectedEnergy,
  Rank,
  Score,
  MiningPause,
  MiningTarget,
  HashesPerSec,
  CurrentMining,
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
  // is not referenced directly. for this reason the relative ordring matters.
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
  ModalDeposit,
}

// the purpose of this class is to manage all ui pane events
// TODO wire all the mouse events from the game into this guy
class WindowManager extends EventEmitter {
  static instance: WindowManager;
  private mousePos: MousePos;
  private mousedownPos: MousePos | null;

  private lastZIndex: number;
  private cursorState: CursorState;

  private altPressed: boolean;

  private currentTooltip: TooltipName;

  private constructor() {
    super();
    this.mousePos = { x: 0, y: 0 };
    this.mousedownPos = null;
    this.lastZIndex = 0;
    this.currentTooltip = TooltipName.None;
    this.altPressed = false;

    // is it bad that this doesn't get cleaned up?
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Control') {
        this.altPressed = true;
        this.emit(WindowManagerEvent.CtrlDown);
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Control') {
        this.altPressed = false;
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

  static initialize(): WindowManager {
    const terminalEmitter = new WindowManager();

    return terminalEmitter;
  }

  // tooltip stuff
  pushTooltip(tooltip: TooltipName): void {
    this.currentTooltip = tooltip;
    this.emit(WindowManagerEvent.TooltipUpdated, this.currentTooltip);
  }

  popTooltip(): void {
    this.currentTooltip = TooltipName.None;
    this.emit(WindowManagerEvent.TooltipUpdated, this.currentTooltip);
  }

  getTooltip(): TooltipName {
    return this.currentTooltip;
  }

  // getters
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

  // setters / mutators
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
