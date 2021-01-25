import { WorldCoords } from '../../utils/Coordinates';
import {
  Planet,
  Location,
  LocationId,
  ExploredChunkData,
  QueuedArrival,
  PlanetLevel,
  Player,
  EthAddress,
  Upgrade,
  SpaceType,
  ChunkFootprint,
  Artifact,
  ArtifactId,
} from '../../_types/global/GlobalTypes';
import { UnconfirmedMove } from '../../_types/darkforest/api/ContractsAPITypes';
import { MiningPattern } from '../../utils/MiningPatterns';
import { UIDataKey, UIDataValue } from '../../api/UIStateStorageManager';
import { PluginManager } from '../../plugins/PluginManager';
import Viewport from './Viewport';

export default interface AbstractUIManager {
  destroy(): void;

  centerPlanet(planet: Planet): void;
  centerCoords(coords: WorldCoords): void;
  centerLocationId(planetId: LocationId): void;
  getPluginManager(): PluginManager | null;
  getAccount(): EthAddress | null;
  getContractAddress(): string;
  getTwitter(address: EthAddress | null): string | null; // TODO this null behavior is kinda bad
  getPrivateKey(): string;
  getMyBalance(): number;
  getEndTimeSeconds(): number;
  getUpgrade(branch: number, level: number): Upgrade;
  getEnergyCurveAtPercent(planet: Planet, percent: number): number;
  getSilverCurveAtPercent(planet: Planet, percent: number): number | null;
  getPerlinThresholds(): [number, number];

  setSelectedPlanet(planet: Planet | null): void;
  getSelectedPlanet(): Planet | null;
  getSelectedCoords(): WorldCoords | null;
  getMouseDownPlanet(): Planet | null;
  getMouseDownCoords(): WorldCoords | null;
  getHoveringOverPlanet(): Planet | null;
  getHoveringOverCoords(): WorldCoords | null;

  setExtraMinerLocation(index: number, coords: WorldCoords): void;
  removeExtraMinerLocation(index: number): void;
  setMiningPattern(pattern: MiningPattern): void;
  getMiningPattern(): MiningPattern | null;
  getForcesSending(planetId: LocationId): number;
  getSilverSending(planetId: LocationId): number;

  getDetailLevel(): number;
  setDetailLevel(level: number): void;

  getAllPlayers(): Player[];
  getRadiusOfPlanetLevel(planetLevel: PlanetLevel): number;
  getPlanetWithId(planetId: LocationId): Planet | null;
  getArtifactWithId(artifactId: ArtifactId): Artifact | null;
  getPlanetLevel(planetId: LocationId): PlanetLevel | null;
  getPlanetDetailLevel(planetId: LocationId): number | null;
  getAllOwnedPlanets(): Planet[];
  getAllVoyages(): QueuedArrival[];
  getUnconfirmedMoves(): UnconfirmedMove[];
  getLocationOfPlanet(planetId: LocationId): Location | null;
  getExploredChunks(): Iterable<ExploredChunkData>;
  getWorldRadius(): number;
  getWorldSilver(): number;
  getArtifactPlanet(artifact: Artifact): Planet | null;
  setSelectedId(id: LocationId): void;
  getUniverseTotalEnergy(): number;
  getSilverOfPlayer(player: EthAddress): number;
  getEnergyOfPlayer(player: EthAddress): number;
  isOverOwnPlanet(coords: WorldCoords): Planet | null; // if world coords are over your own planet, return it; else return null
  getHomeCoords(): WorldCoords;
  getHomeHash(): LocationId | null;
  getHomePlanet(): Planet | null;
  isOwnedByMe(planet: Planet): boolean;
  hasMinedChunk(chunkLocation: ChunkFootprint): boolean;
  getChunk(chunkFootprint: ChunkFootprint): ExploredChunkData | null;

  getHashesPerSec(): number;
  generateVerificationTweet(twitter: string): Promise<string>;

  joinGame(beforeRetry: (e: Error) => Promise<boolean>): AbstractUIManager;
  addAccount(coords: WorldCoords): Promise<boolean>;
  upgrade(planet: Planet, branch: number): void;
  buyHat(planet: Planet): void;
  verifyTwitter(twitter: string): Promise<boolean>;

  startExplore(): void;
  stopExplore(): void;
  addNewChunk(chunk: ExploredChunkData): void;
  bulkAddNewChunks(chunks: ExploredChunkData[]): Promise<void>;
  onMouseDown(coords: WorldCoords): void;
  onMouseMove(coords: WorldCoords): void;
  onMouseUp(coords: WorldCoords): void;
  onMouseOut(): void;
  setForcesSending(planetId: LocationId, percentage: number): void;
  setSilverSending(planetId: LocationId, percentage: number): void;

  setUIDataItem(key: UIDataKey, value: UIDataValue): void;
  getUIDataItem(key: UIDataKey): UIDataValue;

  spaceTypeFromPerlin(perlin: number): SpaceType;

  getViewport(): Viewport;
  getPlanetsInViewport(): Planet[];
}
