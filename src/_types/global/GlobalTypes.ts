import { Dispatch, SetStateAction } from 'react';
import {
  LocationId,
  Planet,
  LocatablePlanet,
  WorldCoords,
  WorldLocation,
} from '@darkforest_eth/types';
import GameManager from '../../Backend/GameLogic/GameManager';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';

export type Hook<T> = [T, Dispatch<SetStateAction<T>>];

export type Wormhole = {
  from: LocationId;
  to: LocationId;
};

declare global {
  interface Window {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    snarkjs: any;

    // TODO: these three should eventually live in some sort of `DFTerminal` namespace
    // instead of global
    df?: GameManager;
    ui?: GameUIManager;
  }
}

export type HashConfig = {
  planetHashKey: number;
  spaceTypeKey: number;
  biomebaseKey: number;
  perlinLengthScale: number; // power of two up to 8192
  perlinMirrorX: boolean;
  perlinMirrorY: boolean;
};

export enum StatIdx {
  EnergyCap = 0,
  EnergyGro = 1,
  Range = 2,
  Speed = 3,
  Defense = 4,
}

export function isLocatable(planet: Planet): planet is LocatablePlanet {
  return (planet as LocatablePlanet).location !== undefined;
}

export interface Rectangle {
  bottomLeft: WorldCoords;
  sideLength: number;
}

export class ExploredChunkData {
  chunkFootprint: Rectangle;
  planetLocations: WorldLocation[];
  perlin: number; // approximate avg perlin value. used for rendering
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
