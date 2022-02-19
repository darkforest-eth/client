import { Setting } from '@darkforest_eth/types';
import { EventEmitter } from 'events';
import NotificationManager from '../../Frontend/Game/NotificationManager';
import { setBooleanSetting } from '../../Frontend/Utils/SettingsHooks';
import GameUIManager from './GameUIManager';

export const enum TutorialManagerEvent {
  StateChanged = 'StateChanged',
}

export const enum TutorialState {
  None,

  HomePlanet,
  SendFleet,
  SpaceJunk,
  Spaceship,
  Deselect,
  ZoomOut,
  MinerMove,
  MinerPause,
  Terminal,
  HowToGetScore,
  ScoringDetails,
  Valhalla,

  AlmostCompleted,
  Completed,
}

class TutorialManager extends EventEmitter {
  static instance: TutorialManager;
  private tutorialState: TutorialState = TutorialState.None;

  private uiManager: GameUIManager;

  private constructor(uiManager: GameUIManager) {
    super();
    this.uiManager = uiManager;
  }

  static getInstance(uiManager: GameUIManager) {
    if (!TutorialManager.instance) {
      TutorialManager.instance = new TutorialManager(uiManager);
    }

    return TutorialManager.instance;
  }

  private setTutorialState(newState: TutorialState) {
    this.tutorialState = newState;
    this.emit(TutorialManagerEvent.StateChanged, newState);

    if (newState === TutorialState.Completed) {
      const notifManager = NotificationManager.getInstance();
      notifManager.welcomePlayer();
    }
  }

  private advance() {
    let newState = Math.min(this.tutorialState + 1, TutorialState.Completed);
    if (this.shouldSkipState(newState)) newState++;

    this.setTutorialState(newState);
  }

  private shouldSkipState(state: TutorialState) {
    return !this.uiManager.getSpaceJunkEnabled() && state === TutorialState.SpaceJunk;
  }

  reset() {
    const config = {
      contractAddress: this.uiManager.getContractAddress(),
      account: this.uiManager.getAccount(),
    };
    setBooleanSetting(config, Setting.TutorialOpen, true);
    this.setTutorialState(TutorialState.None);
  }

  complete() {
    this.setTutorialState(TutorialState.Completed);
    const config = {
      contractAddress: this.uiManager.getContractAddress(),
      account: this.uiManager.getAccount(),
    };
    setBooleanSetting(config, Setting.TutorialCompleted, true);
  }

  acceptInput(state: TutorialState) {
    if (state === this.tutorialState) this.advance();
  }
}

export default TutorialManager;
