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
} from '../../_types/global/GlobalTypes';
import { UnconfirmedMove } from '../../_types/darkforest/api/ContractsAPITypes';
import { MiningPattern } from '../../utils/MiningPatterns';
import { UIDataKey, UIDataValue } from '../../api/UIStateStorageManager';

export default interface AbstractUIManager {
  destroy(): void;

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

  setMiningPattern(pattern: MiningPattern): void;
  getMiningPattern(): MiningPattern | null;
  getForcesSending(planetId: LocationId): number;
  getSilverSending(planetId: LocationId): number;

  getDetailLevel(): number;
  setDetailLevel(level: number): void;

  getAllPlayers(): Player[];
  getRadiusOfPlanetLevel(planetLevel: PlanetLevel): number;
  getPlanetWithId(planetId: LocationId): Planet | null;
  getPlanetLevel(planetId: LocationId): PlanetLevel | null;
  getPlanetDetailLevel(planetId: LocationId): number | null;
  getAllOwnedPlanets(): Planet[];
  getAllVoyages(): QueuedArrival[];
  getUnconfirmedMoves(): UnconfirmedMove[];
  getLocationOfPlanet(planetId: LocationId): Location | null;
  getExploredChunks(): Iterable<ExploredChunkData>;
  getWorldRadius(): number;
  getWorldSilver(): number;
  getUniverseTotalEnergy(): number;
  getSilverOfPlayer(player: EthAddress): number;
  getEnergyOfPlayer(player: EthAddress): number;
  isOverOwnPlanet(coords: WorldCoords): Planet | null; // if world coords are over your own planet, return it; else return null
  getHomeCoords(): WorldCoords;
  getHomeHash(): LocationId | null;
  isOwnedByMe(planet: Planet): boolean;
  hasMinedChunk(chunkLocation: ChunkFootprint): boolean;

  getHashesPerSec(): number;
  generateVerificationTweet(twitter: string): Promise<string>;

  onJoinGameClicked(): AbstractUIManager;
  addAccount(coords: WorldCoords): Promise<boolean>;
  upgrade(planet: Planet, branch: number): void;
  buyHat(planet: Planet): void;
  verifyTwitter(twitter: string): Promise<boolean>;

  startExplore(): void;
  stopExplore(): void;
  addNewChunk(chunk: ExploredChunkData): void;
  onMouseDown(coords: WorldCoords): void;
  onMouseMove(coords: WorldCoords): void;
  onMouseUp(coords: WorldCoords): void;
  onMouseOut(): void;
  setForcesSending(planetId: LocationId, percentage: number): void;
  setSilverSending(planetId: LocationId, percentage: number): void;

  setUIDataItem(key: UIDataKey, value: UIDataValue): void;
  getUIDataItem(key: UIDataKey): UIDataValue;

  spaceTypeFromPerlin(perlin: number): SpaceType;
}
