import {
  EmojiFlagBody,
  LocatablePlanet,
  LocationId,
  Planet,
  PlanetMessage,
  PlanetMessageType,
  WorldCoords,
  WorldLocation,
} from '@darkforest_eth/types';
import { Dispatch, SetStateAction } from 'react';
import GameManager from '../../Backend/GameLogic/GameManager';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';

export type Hook<T> = [T, Dispatch<SetStateAction<T>>];

export type Wormhole = {
  from: LocationId;
  to: LocationId;
};

declare global {
  interface Window {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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

export const enum StatIdx {
  EnergyCap = 0,
  EnergyGro = 1,
  Range = 2,
  Speed = 3,
  Defense = 4,
}

export function isLocatable(planet: Planet): planet is LocatablePlanet {
  return (planet as LocatablePlanet).location !== undefined;
}

export function isEmojiFlagMessage(
  planetMessage: PlanetMessage<unknown>
): planetMessage is PlanetMessage<EmojiFlagBody> {
  return planetMessage.body !== undefined && planetMessage.type === PlanetMessageType.EmojiFlag;
}

/**
 * Ok, this is gonna sound weird, but all rectangles are squares. Also, we only permit side lengths
 * that are powers of two, and ALSO!! The side lengths must be between {@link MIN_CHUNK_SIZE} and
 * {@link MAX_CHUNK_SIZE}.
 */
export interface Rectangle {
  bottomLeft: WorldCoords;
  sideLength: number;
}

/**
 * Represents a fully mined aligned square.
 */
export class Chunk {
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

export interface ClaimCountdownInfo {
  myLastClaimTimestamp?: number; // if undefined, never revealed before
  currentlyClaiming: boolean; // true iff player has an unconfirmedReveal currently being processed
  claimCooldownTime: number; // in seconds
}
