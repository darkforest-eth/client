// eslint-disable @typescript-eslint/no-unused-vars

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
  Artifact,
  ArtifactId,
  LocatablePlanet,
  Biome,
} from '../_types/global/GlobalTypes';
import { EventEmitter } from 'events';
import { WorldCoords } from '../utils/Coordinates';
import {
  UnconfirmedMove,
  UnconfirmedUpgrade,
} from '../_types/darkforest/api/ContractsAPITypes';
import { MiningPattern } from '../utils/MiningPatterns';
import { SerializedPlugin } from '../plugins/SerializedPlugin';
import { ProcgenUtils } from '../utils/ProcgenUtils';
import UIEmitter from '../utils/UIEmitter';
import { CheckedTypeUtils } from '../utils/CheckedTypeUtils';
import { Contract, ContractInterface } from 'ethers';
import NotificationManager from '../utils/NotificationManager';

export default interface AbstractGameManager extends EventEmitter {
  destroy(): void;

  /**
   * Gets the address of the player logged into this game manager.
   */
  getAccount(): EthAddress | null;

  /**
   * Gets the address of the `DarkForestCore` contract, which is essentially
   * the 'backend' of the game.
   */
  getContractAddress(): EthAddress;

  /**
   * Gets the twitter handle of the given ethereum account which is associated
   * with Dark Forest.
   */
  getTwitter(address: EthAddress | null): string | null;

  /**
   * The game ends at a particular time in the future - get this time measured
   * in seconds from the epoch.
   */
  getEndTimeSeconds(): number;

  /**
   * Returns the upgrade that would be applied to a planet given a particular
   * upgrade branch (defense, range, speed) and level of upgrade.
   */
  getUpgrade(branch: number, level: number): Upgrade;

  /**
   * returns timestamp (seconds) that planet will reach percent% of energycap
   * time may be in the past
   */
  getEnergyCurveAtPercent(planet: Planet, percent: number): number;

  /**
   * returns timestamp (seconds) that planet will reach percent% of silcap if
   * doesn't produce silver, returns nullif already over percent% of silcap,
   * returns null
   */
  getSilverCurveAtPercent(planet: Planet, percent: number): number | null;

  /**
   * Gets a list of all the players in the game (not just the ones you've
   * encounterd)
   */
  getAllPlayers(): Player[];

  /**
   * Gets all the map chunks that this client is aware of. Chunks may have come from
   * mining, or from importing map data.
   */
  getExploredChunks(): Iterable<ExploredChunkData>;

  /**
   * Each coordinate lives in a particular type of space, determined by a smooth random
   * function called 'perlin noise.
   */
  spaceTypeFromPerlin(perlin: number): SpaceType;

  /**
   * Gets the radius of the playable area of the universe.
   */
  getWorldRadius(): number;

  /**
   * Gets the total amount of silver that lives on a planet that somebody owns.
   */
  getWorldSilver(): number;

  /**
   * Gets the total amount of energy that lives on a planet that somebody owns.
   */
  getUniverseTotalEnergy(): number;

  /**
   * gets both deposited artifacts that are on planets i own as well as artifacts i own
   */
  getMyArtifacts(): Artifact[];

  /**
   * Gets the total amount of silver that lives on planets that the given player owns.
   */
  getSilverOfPlayer(player: EthAddress): number;

  /**
   * Gets the total amount of energy that lives on planets that the given player owns.
   */
  getEnergyOfPlayer(player: EthAddress): number;

  /**
   * Gets the planet with the given hash. Returns null if the planet is neither in the contract
   * nor has been discovered locally. If the planet needs to be updated (because some time has
   * passed since we last updated the planet), then updates that planet first.
   */
  getPlanetWithId(planetId: LocationId): Planet | null;

  /**
   * Gets the artifact with the given id. Null if no artifact with id exists.
   */
  getArtifactWithId(artifactId: ArtifactId): Artifact | null;

  /**
   * Gets the planet that is located at the given coordinates. Returns null if not a valid
   * location or if no planet exists at location. If the planet needs to be updated (because
   * some time has passed since we last updated the planet), then updates that planet first.
   */
  getPlanetWithCoords(coords: WorldCoords): Planet | null;

  /**
   * Gets the planet that is closest to the given coordinates. Filters out irrelevant planets
   * using the `radiusMap` parameter, which specifies how close a planet must be in order to
   * be returned from this function, given that planet's level. Smaller planets have a smaller
   * radius, and larger planets have a larger radius.
   */
  getPlanetHitboxForCoords(
    coords: WorldCoords,
    radiusMap: Record<PlanetLevel, number>
  ): LocatablePlanet | null;

  /**
   * Gets the level of the given planet. Returns null if the planet does not exist. Does
   * NOT update the planet if the planet is stale, which means this function is fast.
   */
  getPlanetLevel(planetId: LocationId): PlanetLevel | null;

  /**
   * Gets the level of the given planet. Returns null if the planet does not exist. Does
   * NOT update the planet if the planet is stale, which means this function is fast.
   */
  getPlanetDetailLevel(planetId: LocationId): number | null;

  /**
   * Gets the location of the given planet. Returns null if the planet does not exist, or if
   * we do not know the location of this planet NOT update the planet if the planet is stale,
   * which means this function is fast.
   */
  getLocationOfPlanet(planetId: LocationId): Location | null;

  /**
   * Gets a list of planets that have an owner.
   */
  getAllOwnedPlanets(): Planet[];

  /**
   * Gets a list of the planets that the player logged into this `GameManager` owns.
   */
  getMyPlanets(): Planet[];

  /**
   * Gets all planets. This means all planets that are in the contract, and also all
   * planets that have been mined locally. Does not update planets if they are stale.
   * NOT PERFORMANT - for scripting only.
   */
  getAllPlanets(): Iterable<Planet>;

  /**
   * Gets all voyages that have not completed.
   */
  getAllVoyages(): QueuedArrival[];

  /**
   * Gets all moves that this client has queued to be uploaded to the contract, but
   * have not been successfully confirmed yet.
   */
  getUnconfirmedMoves(): UnconfirmedMove[];

  /**
   * Gets all upgrades that this client has queued to be uploaded to the contract, but
   * have not been successfully confirmed yet.
   */
  getUnconfirmedUpgrades(): UnconfirmedUpgrade[];

  /**
   * Gets the location of your home planet.
   */
  getHomeCoords(): WorldCoords | null;

  /**
   * Gets the hash of the location of your home planet.
   */
  getHomeHash(): LocationId | null;

  /**
   * Whether or not this client has successfully found and landed on a home planet.
   */
  hasJoinedGame(): boolean;

  /**
   * Gets the amount of hashes per second that the miner manager is calculating.
   */
  getHashesPerSec(): number;

  /**
   * Signs the given twitter handle with the private key of the current user. Used to
   * verify that the person who owns the Dark Forest account was the one that attempted
   * to link a twitter to their account.
   */
  getSignedTwitter(twitter: string): Promise<string>;

  /**
   * Gets the private key of the burner wallet used by this account.
   */
  getPrivateKey(): string;

  /**
   * Gets the balance of the account
   */
  getMyBalance(): number;

  /**
   * The perlin value at each coordinate determines the space type. There are three space
   * types, which means there are three ranges on the number line that correspond to
   * each space type. This function returns the boundary values between each of these
   * three ranges: `PERLIN_THRESHOLD_1` and `PERLIN_THRESHOLD_2`.
   */
  getPerlinThresholds(): [number, number];

  /**
   * Whether or not the given rectangle has been mined.
   */
  hasMinedChunk(chunkLocation: ChunkFootprint): boolean;

  /**
   * Sets the mining pattern of the miner. This kills the old miner and starts this one.
   */
  setMiningPattern(pattern: MiningPattern): void;

  /**
   * Gets the mining pattern that the miner is currently using.
   */
  getMiningPattern(): MiningPattern | null;

  /**
   * Set the amount of cores to mine the universe with. More cores equals faster!
   */
  setMinerCores(nCores: number): void;

  /**
   * Gets the rectangle bounding the chunk that the miner is currently in the process
   * of hashing.
   */
  getCurrentlyExploringChunk(): ChunkFootprint | null;

  /**
   * Starts the miner.
   */
  startExplore(): void;

  /**
   * Stops the miner.
   */
  stopExplore(): void;

  /**
   * Makes this game manager aware of a new chunk - which includes its location, size,
   * as well as all of the planets contained in that chunk. Causes the client to load
   * all of the information about those planets from the blockchain.
   */
  addNewChunk(chunk: ExploredChunkData): AbstractGameManager;

  /**
   * To add multiple chunks at once, use this function rather than `addNewChunk`, in order
   * to load all of the associated planet data in an efficient manner.
   */
  bulkAddNewChunks(chunks: ExploredChunkData[]): Promise<void>;

  /**
   * Calls the contract to find an artifact on the given planet.
   */
  findArtifact(planetId: LocationId): AbstractGameManager;

  /**
   * Once you have posted the verificatoin tweet - complete the twitter-account-linking
   * process by telling the Dark Forest webserver to look at that tweet.
   */
  verifyTwitter(twitter: string): Promise<boolean>;

  /**
   * Attempts to join the game. Should not be called once you've already joined.
   */
  joinGame(beforeRetry: (e: Error) => Promise<boolean>): AbstractGameManager;

  /**
   * Initializes a new player's game to start at the given home planet. Must have already
   * initialized the player on the contract.
   */
  addAccount(coords: WorldCoords): Promise<boolean>;

  /**
   * Submits a transaction to the blockchain to move the given amount of resources from
   * the given planet to the given planet.
   */
  move(
    from: LocationId,
    to: LocationId,
    forces: number,
    silver: number
  ): AbstractGameManager;

  /**
   * Submits a transaction to the blockchain to upgrade the given planet with the given
   * upgrade branch. You must own the planet, and have enough silver on it to complete
   * the upgrade.
   */
  upgrade(planetId: LocationId, branch: number): AbstractGameManager;

  /**
   * Submits a transaction to the blockchain to buy a hat for the given planet. You
   * must own the planet. Warning costs real xdai. Hats are permanently locked to a
   * planet. They are purely cosmetic and a great way to BM your opponents or just
   * look your best. Just like in the real world, more money means more hat.
   */
  buyHat(planetId: LocationId): AbstractGameManager;

  /**
   * Submits a transaction to the blockchain to deposit an artifact on a given planet.
   * You must own the planet, and the artifact, and the artifact must not be locked up
   * on another planet. Artifacts are locked to a planet for `ARTIFACT_LOCKUP_DURATION_SECONDS`
   * which is currently 12 hours
   */
  depositArtifact(
    planetId: LocationId,
    artifactId: ArtifactId
  ): AbstractGameManager;

  /**
   * Withdraws the artifact that is locked up on the given planet.
   */
  withdrawArtifact(planetId: LocationId): AbstractGameManager;

  /* ESTIMATION UTILITIES */

  /**
   * Gets the distance between two planets. Throws an exception if you don't
   * know the location of either planet.
   */
  getDist(fromId: LocationId, toId: LocationId): number;

  /**
   * Gets the maximuim distance that you can send your energy from the given planet,
   * using the given percentage of that planet's current silver.
   */
  getMaxMoveDist(planetId: LocationId, sendingPercent: number): number;

  /**
   * Gets all the planets that you can reach with at least 1 energy from
   * the given planet.
   */
  getPlanetsInRange(planetId: LocationId, sendingPercent: number): Planet[];

  /**
   * Gets the amount of energy needed in order for a voyage from the given to the given
   * planet to arrive with your desired amount of energy.
   */
  getEnergyNeededForMove(
    fromId: LocationId,
    toId: LocationId,
    arrivingEnergy: number
  ): number;

  /**
   * Gets the amount of energy that would arrive if a voyage with the given parameters
   * was to occur.
   */
  getEnergyArrivingForMove(
    fromId: LocationId,
    toId: LocationId,
    sentEnergy: number
  ): number;

  /**
   * Gets the amount of time, in seconds that a voyage between from the first to the
   * second planet would take.
   */
  getTimeForMove(fromId: LocationId, toId: LocationId): number;

  /**
   * Gets the temperature of a given location.
   */
  getTemperature(coords: WorldCoords): number;

  /**
   * Load the serialized versions of all the plugins that this player has.
   */
  loadPlugins(): Promise<SerializedPlugin[]>;

  /**
   * Overwrites all the saved plugins to equal the given array of plugins.
   */
  savePlugins(savedPlugins: SerializedPlugin[]): Promise<void>;

  /**
   * Whether or not the given planet is capable of minting an artifact.
   */
  isPlanetMineable(p: Planet): boolean;

  /**
   * Returns constructors of classes that may be useful for developing plugins.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getConstructors(): any;

  /**
   * Gets the perlin value at the given location in the world. SpaceType is based
   * on this value.
   */
  getPerlin(coords: WorldCoords): number;

  /**
   * Gets the biome perlin valie at the given location in the world.
   */
  getBiomePerlin(coords: WorldCoords): Biome;

  /**
   * Helpful functions for getting the names, descriptions, and colors of in-game entities.
   */
  getProcgenUtils(): typeof ProcgenUtils;

  /**
   * Heplful functions for converting between bytes and ids and such.
   */
  getCheckedTypeUtils(): typeof CheckedTypeUtils;

  /**
   * Helpful for listening to user input events.
   */
  getUIEventEmitter(): UIEmitter;

  /**
   * Gets the chunk at the given location, if we've mined this chunk
   */
  getChunk(chunkFootprint: ChunkFootprint): ExploredChunkData | null;

  /**
   * Whether or not this planet is upgradeable.
   */
  planetCanUpgrade(planet: Planet): boolean;

  /**
   * Allows you to load an ethereum contract in so that you can execute transactions
   * on behalf of your burner wallet account.
   */
  loadContract(
    contractAddress: string,
    contractABI: ContractInterface
  ): Promise<Contract>;

  /**
   * Gets a reference to the notifications manager.
   */
  getNotificationsManager(): NotificationManager;
}
