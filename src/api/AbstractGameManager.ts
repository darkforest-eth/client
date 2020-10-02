import {
  EthAddress,
  ExploredChunkData,
  Planet,
  Location,
  LocationId,
  QueuedArrival,
  PlanetLevel,
  Player,
  Upgrade,
  ChunkFootprint,
  SpaceType,
} from '../_types/global/GlobalTypes';
import { EventEmitter } from 'events';
import { WorldCoords } from '../utils/Coordinates';
import {
  UnconfirmedMove,
  UnconfirmedUpgrade,
} from '../_types/darkforest/api/ContractsAPITypes';
import { MiningPattern } from '../utils/MiningPatterns';

export default interface AbstractGameManager extends EventEmitter {
  destroy(): void;

  getAccount(): EthAddress | null;
  getContractAddress(): EthAddress;
  getTwitter(address: EthAddress | null): string | null;
  getEndTimeSeconds(): number;
  getUpgrade(branch: number, level: number): Upgrade;
  getEnergyCurveAtPercent(planet: Planet, percent: number): number;
  getSilverCurveAtPercent(planet: Planet, percent: number): number | null;

  getAllPlayers(): Player[];
  getExploredChunks(): Iterable<ExploredChunkData>;
  getWorldRadius(): number;
  getWorldSilver(): number;
  getUniverseTotalEnergy(): number;
  getSilverOfPlayer(player: EthAddress): number;
  getEnergyOfPlayer(player: EthAddress): number;
  getPlanetWithId(planetId: LocationId): Planet | null; // null if planet is neither in contract nor known chunks
  getPlanetWithCoords(coords: WorldCoords): Planet | null; // null if not a valid location or if no planet exists at location
  getPlanetLevel(planetId: LocationId): PlanetLevel | null; // null if planet is neither in contract nor known chunks. fast; doesn't update planet
  getPlanetDetailLevel(planetId: LocationId): number | null; // null if planet is neither in contract nor known chunks. fast; doesn't update planet
  getLocationOfPlanet(planetId: LocationId): Location | null; // null if we don't know the location of this planet
  getAllOwnedPlanets(): Planet[];
  getAllVoyages(): QueuedArrival[];
  getUnconfirmedMoves(): UnconfirmedMove[];
  getUnconfirmedUpgrades(): UnconfirmedUpgrade[];
  getHomeCoords(): WorldCoords | null;
  getHomeHash(): LocationId | null;
  hasJoinedGame(): boolean;
  getHashesPerSec(): number;
  getSignedTwitter(twitter: string): Promise<string>;
  getPrivateKey(): string;
  getMyBalance(): number;
  notifyIfBalanceEmpty(): Promise<void>;
  getPerlinThresholds(): [number, number]; // PERLIN_THRESHOLD_1, PERLIN_THRESHOLD_2
  hasMinedChunk(chunkLocation: ChunkFootprint): boolean;

  setMiningPattern(pattern: MiningPattern): void;
  getMiningPattern(): MiningPattern | null;
  getCurrentlyExploringChunk(): ChunkFootprint | null;
  startExplore(): void;
  stopExplore(): void;
  addNewChunk(chunk: ExploredChunkData): AbstractGameManager;

  verifyTwitter(twitter: string): Promise<boolean>;
  joinGame(): AbstractGameManager;
  addAccount(coords: WorldCoords): Promise<boolean>;
  move(
    from: LocationId,
    to: LocationId,
    forces: number,
    silver: number
  ): AbstractGameManager;
  upgrade(planetId: LocationId, branch: number): AbstractGameManager;
  buyHat(planetId: LocationId): AbstractGameManager;
  spaceTypeFromPerlin(perlin: number): SpaceType;
}
