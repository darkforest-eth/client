import { WorldCoords } from '../../utils/Coordinates';
import {
  UnconfirmedBuyHat,
  UnconfirmedMove,
  UnconfirmedUpgrade,
} from '../darkforest/api/ContractsAPITypes';
import { EventEmitter } from 'events';
import TerminalEmitter from '../../utils/TerminalEmitter';
import AbstractGameManager from '../../api/AbstractGameManager';
import AbstractUIManager from '../../app/board/AbstractUIManager';
import { Dispatch, SetStateAction } from 'react';

interface WindowEthereumObject extends EventEmitter {
  enable: () => void;
}

export interface Web3Object {
  currentProvider: Record<string, unknown>;
}

export type SetFn<T> = Dispatch<SetStateAction<T>>;
export type Hook<T> = [T, Dispatch<SetStateAction<T>>];

export enum PlanetLevel {
  Asteroid,
  BrownDwarf,
  RedDwarf,
  WhiteDwarf,
  YellowStar,
  BlueStar,
  Giant,
  Supergiant,
  MAX = PlanetLevel.Supergiant,
  MIN = PlanetLevel.Asteroid,
}

export enum PlanetResource {
  NONE,
  SILVER,
}

export enum SpaceType {
  NEBULA,
  SPACE,
  DEEP_SPACE,
}

declare global {
  interface Window {
    // gameManager: any;
    // mimcHash: any;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    snarkjs: any;

    // TODO: these three should eventually live in some sort of `DFTerminal` namespace
    // instead of global
    df?: AbstractGameManager;
    uiManager?: AbstractUIManager;
    terminal?: TerminalEmitter;
  }
}

export interface SnarkJSProof {
  pi_a: [string, string, string];
  pi_b: [[string, string], [string, string], [string, string]];
  pi_c: [string, string, string];
}

export interface SnarkJSProofAndSignals {
  proof: SnarkJSProof;
  publicSignals: string[];
}

/**
 * this is expected to be 64-length, lowercase hex string. see src/utils/CheckedTypeUtils.ts for constructor
 */
export type LocationId = string & {
  __value__: never;
};

export type EthAddress = string & {
  __value__: never;
}; // this is expected to be 40 chars, lowercase hex. see src/utils/CheckedTypeUtils.ts for constructor

export interface Coordinates {
  // integers
  x: number;
  y: number;
}

export interface Location {
  coords: WorldCoords;
  hash: LocationId;
  perlin: number;
}

export type Bonus = [boolean, boolean, boolean, boolean, boolean];
export enum StatIdx {
  EnergyCap,
  EnergyGro,
  Range,
  Speed,
  Defense,
}

export type Upgrade = {
  energyCapMultiplier: number;
  energyGroMultiplier: number;
  rangeMultiplier: number;
  speedMultiplier: number;
  defMultiplier: number;
};
export type UpgradeState = [number, number, number];
export const enum UpgradeBranchName {
  Defense = 0,
  Range = 1,
  Speed = 2,
}

export type Planet = {
  locationId: LocationId;
  perlin: number;
  spaceType: SpaceType;
  owner: EthAddress; // should never be null; all unclaimed planets should have 0 address
  hatLevel: number;

  planetLevel: PlanetLevel;
  planetResource: PlanetResource;

  energyCap: number;
  energyGrowth: number;

  silverCap: number;
  silverGrowth: number;

  range: number;
  defense: number;
  speed: number;

  energy: number;
  silver: number;

  // metadata stuff
  lastUpdated: number;
  upgradeState: UpgradeState;

  unconfirmedDepartures: UnconfirmedMove[];
  unconfirmedUpgrades: UnconfirmedUpgrade[];
  unconfirmedBuyHats: UnconfirmedBuyHat[];
  silverSpent: number;

  isInContract: boolean;
  syncedWithContract: boolean;
};

export type LocatablePlanet = Planet & {
  location: Location;
};

export function isLocatable(planet: Planet): planet is LocatablePlanet {
  return (planet as LocatablePlanet).location !== undefined;
}

export type QueuedArrival = {
  eventId: string;
  player: EthAddress;
  fromPlanet: LocationId;
  toPlanet: LocationId;
  energyArriving: number;
  silverMoved: number;
  departureTime: number;
  arrivalTime: number;
};

export interface ArrivalWithTimer {
  arrivalData: QueuedArrival;
  timer: ReturnType<typeof setTimeout>;
}

export type PlanetMap = Map<LocationId, Planet>;

export type PlanetLocationMap = Map<LocationId, Location>;

// // ONLY USED FOR GAMEMANAGER/PLANETHELPER CONSTRUCTOR
// arrivalId: string, QueuedArrival
export type VoyageContractData = Map<string, QueuedArrival>;

// arrivalId: string, ArrivalWithTimer
export type VoyageMap = Map<string, ArrivalWithTimer>;

// planetId: string, arrivalIds: string[]
export type PlanetVoyageIdMap = Map<string, string[]>;

export interface Player {
  address: EthAddress;
  twitter?: string;
}

export type PlayerMap = Map<string, Player>;

export interface ChunkFootprint {
  bottomLeft: WorldCoords;
  sideLength: number;
}

export class ExploredChunkData {
  chunkFootprint: ChunkFootprint;
  planetLocations: Location[];
  perlin: number; // approximate avg perlin value. used for rendering
}

export interface MinerWorkerMessage {
  chunkFootprint: ChunkFootprint;
  workerIndex: number;
  totalWorkers: number;
  planetRarity: number;
  jobId: number;
  useMockHash: boolean;
}
