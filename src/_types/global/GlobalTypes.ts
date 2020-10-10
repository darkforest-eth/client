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

export type LocationId = string & {
  __value__: never;
}; // this is expected to be 64 chars, lowercase hex. see src/utils/CheckedTypeUtils.ts for constructor

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

export interface Planet {
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
  isInitialized?: boolean; // TODO consider making these non-optional
  createdAt?: number;
  lastUpdated: number;
  upgradeState: UpgradeState;

  unconfirmedDepartures: UnconfirmedMove[];
  unconfirmedUpgrades: UnconfirmedUpgrade[];
  unconfirmedBuyHats: UnconfirmedBuyHat[];
  silverSpent: number;

  pulledFromContract: boolean;
}
/*
export interface QueuedArrival {
  arrivalId: string;
  departureTime: number;
  arrivalTime: number;
  // TODO should this be Address?
  player: string;
  oldLoc: LocationId;
  newLoc: LocationId;
  maxDist: number;
  shipsMoved: number;
  silverMoved: number;
}
*/

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

export interface PlanetLocationMap {
  [planetId: string]: Location;
}

// ONLY USED FOR GAMEMANAGER/PLANETHELPER CONSTRUCTOR
export interface VoyageContractData {
  [arrivalId: string]: QueuedArrival;
}

export interface VoyageMap {
  [arrivalId: string]: ArrivalWithTimer;
}

export interface PlanetVoyageIdMap {
  [planetId: string]: string[]; // to arrivalIDs
}

export interface Player {
  address: EthAddress;
  twitter?: string;
}

export class PlayerMap {
  [playerId: string]: Player;
}

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
