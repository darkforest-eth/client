import { monomitter, Monomitter } from '@darkforest_eth/events';
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
}

export const enum CursorState {
  Normal,
  TargetingExplorer,
  TargetingForces,
}

export const enum TooltipName {
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
  TimeUntilActivationPossible,
  DepositArtifact,
  DeactivateArtifact,
  WithdrawArtifact,
  ActivateArtifact,

  DefenseMultiplier,
  EnergyCapMultiplier,
  EnergyGrowthMultiplier,
  RangeMultiplier,
  SpeedMultiplier,

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

  NetworkHealth,
}

class WindowManager extends EventEmitter {
  static instance: WindowManager;
  private lastZIndex: number;
  private cursorState: CursorState;

  public readonly activeWindowId$: Monomitter<string>;

  private constructor() {
    super();
    this.lastZIndex = 0;
    this.activeWindowId$ = monomitter(true);
  }

  static getInstance(): WindowManager {
    if (!WindowManager.instance) {
      WindowManager.instance = new WindowManager();
    }

    return WindowManager.instance;
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
