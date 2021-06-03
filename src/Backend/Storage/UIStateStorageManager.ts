import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { EthAddress } from '@darkforest_eth/types';
import GameUIManager from '../GameLogic/GameUIManager';

export enum UIDataKey {
  terminalEnabled = 'terminalEnabled',
  sidebarEnabled = 'sidebarEnabled',
  tutorialCompleted = 'tutorialCompleted',

  welcomedPlayer = 'welcomedPlayer',
  foundSpace = 'foundSpace',
  foundDeepSpace = 'foundDeepSpace',
  foundDeadSpace = 'foundDeadSpace',
  foundPirates = 'foundPirates',
  foundSilver = 'foundSilver',
  foundComet = 'foundComet',
  foundArtifact = 'foundArtifact',
  foundSilverBank = 'foundSilverBank',
  foundTradingPost = 'foundTradingPost',

  notifMove = 'notifMove',
  newPlayer = 'newPlayer',
  highPerf = 'highPerf2',

  shouldFling = 'shouldFling',

  /**
   * Same as above, except for a plugin that shows off a brand new
   * plugin capability - drawing on top of the game
   */
  hasAddedCanvasPlugin = 'hasAddedCanvasPlugin',

  /**
   * Has this use acknowledged the fact that downloading and running
   * plugins from the internet is dangerous?
   */
  hasAcceptedPluginRisk = 'hasAcceptedPluginRisk',

  gasFeeGwei = 'gasFeeGwei',
}

export type UIData = {
  sidebarEnabled: boolean;
  terminalEnabled: boolean;
  tutorialCompleted: boolean;

  welcomedPlayer: boolean;
  foundSpace: boolean;
  foundDeepSpace: boolean;
  foundDeadSpace: boolean;
  foundPirates: boolean;
  foundSilver: boolean;
  foundComet: boolean;
  foundArtifact: boolean;
  foundSilverBank: boolean;
  foundTradingPost: boolean;

  notifMove: boolean;
  newPlayer: boolean;

  highPerf2: boolean;
  hasAddedReadme: boolean;
  hasAddedCanvasPlugin: boolean;
  hasAcceptedPluginRisk: boolean;
  shouldFling: boolean;
  gasFeeGwei: number;
};

export const defaultUserData: UIData = {
  terminalEnabled: true,
  sidebarEnabled: true,
  tutorialCompleted: false,

  welcomedPlayer: false,
  foundSpace: false,
  foundDeepSpace: false,
  foundDeadSpace: false,
  foundPirates: false,
  foundSilver: false,
  foundComet: false,
  foundArtifact: false,
  foundSilverBank: false,
  foundTradingPost: false,

  notifMove: true,
  newPlayer: true,

  highPerf2: false,
  hasAddedReadme: false,
  hasAddedCanvasPlugin: false,
  hasAcceptedPluginRisk: false,
  shouldFling: false,

  gasFeeGwei: 1,
};

export function useStoredUIState<T extends number | boolean>(
  key: UIDataKey,
  gameUIManager: GameUIManager | undefined
): [T, Dispatch<SetStateAction<T>>] {
  const hook = useState<T>(defaultUserData[key] as T);
  const [value, setValue] = hook;

  // sync value to storage
  useEffect(() => {
    if (!gameUIManager) return;
    const stored = gameUIManager.getUIDataItem(key);
    setValue(stored as T);
  }, [gameUIManager, key, setValue]);

  // now sync state updates to storage
  useEffect(() => {
    if (!gameUIManager) return;
    gameUIManager.setUIDataItem(key, value);
  }, [value, gameUIManager, key]);

  return hook;
}

// singleton who should never be initialized before gameUIManager
class UIStateStorageManager {
  private static instance: UIStateStorageManager;
  account: EthAddress | undefined;
  contractAddress: string;

  private constructor(account: EthAddress | undefined, contractAddress: string) {
    this.account = account;
    this.contractAddress = contractAddress;
  }

  public static create(
    account: EthAddress | undefined,
    contractAddress: string
  ): UIStateStorageManager {
    UIStateStorageManager.instance = new UIStateStorageManager(account, contractAddress);
    return UIStateStorageManager.instance;
  }

  private getKey(): string {
    if (!this.account) return 'user-data';
    return `${this.account}-${this.contractAddress}-data`;
  }

  // manage user data
  private save(data: UIData) {
    localStorage.setItem(this.getKey(), JSON.stringify(data));
  }

  private load(): UIData {
    const str = localStorage.getItem(this.getKey());

    if (str) return JSON.parse(str);
    else {
      // default values
      return defaultUserData;
    }
  }

  setUIDataItem<T>(key: UIDataKey, value: T): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj = this.load() as any;
    obj[key] = value;
    this.save(obj);
  }

  getUIDataItem<T>(key: UIDataKey): T {
    const val = this.load()[key];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return val as any as T;
  }
}

export default UIStateStorageManager;
