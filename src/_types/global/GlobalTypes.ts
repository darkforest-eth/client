import { Rectangle } from '@darkforest_eth/types';
import { Dispatch, SetStateAction } from 'react';
import GameManager from '../../Backend/GameLogic/GameManager';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';

export type Hook<T> = [T, Dispatch<SetStateAction<T>>];

declare global {
  interface Window {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    snarkjs: any;

    // TODO: these three should eventually live in some sort of `DFTerminal` namespace
    // instead of global
    df?: GameManager;
    ui?: GameUIManager;

    // injected into global scope via netlify snippets - this is a permalink
    // to the deployment hosted on netlify.
    DEPLOY_URL?: string;
  }
}

export type HashConfig = {
  planetHashKey: number;
  spaceTypeKey: number;
  biomebaseKey: number;
  perlinLengthScale: number; // power of two up to 8192
  perlinMirrorX: boolean;
  perlinMirrorY: boolean;
  planetRarity: number; // only for fakeHash (DISABLE_ZK_CHECKS on)
};

export const enum StatIdx {
  EnergyCap = 0,
  EnergyGro = 1,
  Range = 2,
  Speed = 3,
  Defense = 4,
  SpaceJunk = 5,
}

export interface MinerWorkerMessage {
  chunkFootprint: Rectangle;
  workerIndex: number;
  totalWorkers: number;
  planetRarity: number;
  jobId: number;
  useMockHash: boolean;
  planetHashKey: number;
  spaceTypeKey: number;
  biomebaseKey: number;
  perlinLengthScale: number;
  perlinMirrorX: boolean;
  perlinMirrorY: boolean;
}

// info about when the player can next reveal coordinates
export interface RevealCountdownInfo {
  myLastRevealTimestamp?: number; // if undefined, never revealed before
  currentlyRevealing: boolean; // true iff player has an unconfirmedReveal currently being processed
  revealCooldownTime: number; // in seconds
}

export interface ClaimCountdownInfo {
  myLastClaimTimestamp?: number; // if undefined, never revealed before
  currentlyClaiming: boolean; // true iff player has an unconfirmedReveal currently being processed
  claimCooldownTime: number; // in seconds
}
