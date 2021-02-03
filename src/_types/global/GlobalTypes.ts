import { WorldCoords } from '../../utils/Coordinates';
import {
  UnconfirmedBuyHat,
  UnconfirmedDepositArtifact,
  UnconfirmedFindArtifact,
  UnconfirmedMove,
  UnconfirmedPlanetTransfer,
  UnconfirmedUpgrade,
  UnconfirmedWithdrawArtifact,
} from '../darkforest/api/ContractsAPITypes';
import TerminalEmitter from '../../utils/TerminalEmitter';
import { Dispatch, SetStateAction } from 'react';
import GameManager from '../../api/GameManager';
import GameUIManager from '../../app/board/GameUIManager';

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

export enum Biome {
  UNKNOWN,
  OCEAN,
  FOREST,
  GRASSLAND,
  TUNDRA,
  SWAMP,
  DESERT,
  ICE,
  WASTELAND,
  LAVA,
  MIN = Biome.OCEAN,
  MAX = Biome.LAVA,
}

export const BiomeNames = [
  'Unknown',
  'Ocean',
  'Forest',
  'Grassland',
  'Tundra',
  'Swamp',
  'Desert',
  'Ice',
  'Wasteland',
  'Lava',
];

declare global {
  interface Window {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    snarkjs: any;

    // TODO: these three should eventually live in some sort of `DFTerminal` namespace
    // instead of global
    df?: GameManager;
    ui?: GameUIManager;
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

export type VoyageId = string & {
  __value__: never;
};

export type ArtifactId = string & {
  __value__: never;
};

export type EthAddress = string & {
  __value__: never;
}; // this is expected to be 40 chars, lowercase hex. see src/utils/CheckedTypeUtils.ts for constructor

export interface Location {
  coords: WorldCoords;
  hash: LocationId;
  perlin: number;
  biomebase: number; // biome perlin value. combined with spaceType to get the actual biome
}

/**
 * [
 *     energyCapBonus,
 *     energyGroBonus,
 *     rangeBonus,
 *     speedBonus,
 *     defBonus,
 * ]
 */
export type Bonus = [boolean, boolean, boolean, boolean, boolean];

export enum StatIdx {
  EnergyCap = 0,
  EnergyGro = 1,
  Range = 2,
  Speed = 3,
  Defense = 4,
}

export type Upgrade = {
  energyCapMultiplier: number;
  energyGroMultiplier: number;
  rangeMultiplier: number;
  speedMultiplier: number;
  defMultiplier: number;
};

/**
 * [
 *     defU,
 *     rangeU,
 *     speedU,
 * ]
 */
export type UpgradeState = [number, number, number];
export const enum UpgradeBranchName {
  Defense = 0,
  Range = 1,
  Speed = 2,
}

export enum ArtifactType {
  Unknown = 0,
  Monolith = 1,
  Colossus = 2,
  Spaceship = 3,
  Pyramid = 4,
}

export const ArtifactNames = [
  'Unknown',
  'Monolith',
  'Colossus',
  'Spaceship',
  'Pyramid',
];

export enum ArtifactRarity {
  Common,
  Rare,
  Epic,
  Legendary,
  Mythic,
}

export const RarityNames = ['Common', 'Rare', 'Epic', 'Legendary', 'Mythic'];

export type Artifact = {
  id: ArtifactId;
  planetDiscoveredOn: LocationId;
  planetLevel: PlanetLevel;
  planetBiome: Biome;
  mintedAtTimestamp: number;
  discoverer: EthAddress;
  currentOwner: EthAddress; // owner of the NFT - can be the contract
  artifactType: ArtifactType;
  upgrade: Upgrade;
  onPlanetId?: LocationId;
  unconfirmedDepositArtifact?: UnconfirmedDepositArtifact;
  unconfirmedWithdrawArtifact?: UnconfirmedWithdrawArtifact;
};

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

  lastUpdated: number;
  upgradeState: UpgradeState;
  hasTriedFindingArtifact: boolean;
  heldArtifactId?: ArtifactId;
  artifactLockedTimestamp?: number;

  unconfirmedDepartures: UnconfirmedMove[];
  unconfirmedUpgrades: UnconfirmedUpgrade[];
  unconfirmedBuyHats: UnconfirmedBuyHat[];
  unconfirmedPlanetTransfers: UnconfirmedPlanetTransfer[];
  unconfirmedFindArtifact?: UnconfirmedFindArtifact;
  unconfirmedDepositArtifact?: UnconfirmedDepositArtifact;
  unconfirmedWithdrawArtifact?: UnconfirmedWithdrawArtifact;
  silverSpent: number;

  isInContract: boolean;
  syncedWithContract: boolean;

  bonus: Bonus;
};

export type LocatablePlanet = Planet & {
  location: Location;
  biome: Biome;
};

export function isLocatable(planet: Planet): planet is LocatablePlanet {
  return (planet as LocatablePlanet).location !== undefined;
}

export type QueuedArrival = {
  eventId: VoyageId;
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

export interface Player {
  address: EthAddress;
  twitter?: string;
}

export interface Rectangle {
  bottomLeft: WorldCoords;
  sideLength: number;
}

export class ExploredChunkData {
  chunkFootprint: Rectangle;
  planetLocations: Location[];
  perlin: number; // approximate avg perlin value. used for rendering
}

export interface MinerWorkerMessage {
  chunkFootprint: Rectangle;
  workerIndex: number;
  totalWorkers: number;
  planetRarity: number;
  jobId: number;
  useMockHash: boolean;
}
