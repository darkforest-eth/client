import { EventEmitter } from 'events';
import NotificationManager from './NotificationManager';

export enum TutorialManagerEvent {
  StateChanged = 'StateChanged',
}

export enum TutorialState {
  None,

  HomePlanet,
  SendFleet,
  Deselect,
  ZoomOut,
  MinerMove,
  MinerPause,
  Sidebar,
  Terminal,

  AlmostCompleted,
  Completed,
}

// singleton whose purpose is just to manage the tutorial
// TODO put this guy under gameUIManager
class TutorialManager extends EventEmitter {
  static instance: TutorialManager;
  private tutorialState: TutorialState = TutorialState.None;

  private constructor() {
    super();
  }

  static getInstance() {
    if (!TutorialManager.instance) {
      TutorialManager.instance = new TutorialManager();
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
    this.setTutorialState(
      Math.min(this.tutorialState + 1, TutorialState.Completed)
    );
  }

  reset() {
    this.setTutorialState(TutorialState.None);
  }

  complete() {
    this.setTutorialState(TutorialState.Completed);
  }

  acceptInput(state: TutorialState) {
    if (state === this.tutorialState) this.advance();
  }
}

export default TutorialManager;
