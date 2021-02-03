import { EventEmitter } from 'events';
import {
  EthAddress,
  Location,
  Planet,
  Player,
  QueuedArrival,
  LocationId,
  ExploredChunkData,
  PlanetLevel,
  Upgrade,
  Rectangle,
  SpaceType,
  Artifact,
  ArtifactId,
  isLocatable,
  VoyageId,
  LocatablePlanet,
} from '../_types/global/GlobalTypes';
import PersistentChunkStore from './PersistentChunkStore';
import { MIN_CHUNK_SIZE } from '../utils/constants';
import ContractsAPI from './ContractsAPI';
import MinerManager, {
  HomePlanetMinerChunkStore,
  MinerManagerEvent,
} from './MinerManager';
import SnarkHelper from './SnarkArgsHelper';
import { WorldCoords } from '../utils/Coordinates';
import _ from 'lodash';

import { SpiralPattern, MiningPattern } from '../utils/MiningPatterns';
import {
  ContractConstants,
  TxIntent,
  UnconfirmedMove,
  ContractsAPIEvent,
  UpgradeArgs,
  UnconfirmedUpgrade,
  EthTxType,
  SubmittedTx,
  UnconfirmedInit,
  UnconfirmedPlanetTransfer,
  UnconfirmedFindArtifact,
  UnconfirmedDepositArtifact,
  UnconfirmedWithdrawArtifact,
} from '../_types/darkforest/api/ContractsAPITypes';
import perlin from '../miner/perlin';
import { GameObjects } from './GameObjects';
import { CheckedTypeUtils } from '../utils/CheckedTypeUtils';

export enum GameManagerEvent {
  PlanetUpdate = 'PlanetUpdate',
  DiscoveredNewChunk = 'DiscoveredNewChunk',
  InitializedPlayer = 'InitializedPlayer',
  InitializedPlayerError = 'InitializedPlayerError',
  ArtifactUpdate = 'ArtifactUpdate',
  Moved = 'Moved',
}

import TerminalEmitter, { TerminalTextStyle } from '../utils/TerminalEmitter';
import { getAllTwitters, verifyTwitterHandle } from './UtilityServerAPI';
import EthConnection from './EthConnection';
import {
  getRandomActionId,
  hexifyBigIntNestedArray,
  locationFromCoords,
  moveShipsDecay,
  planetCanUpgrade,
} from '../utils/Utils';
import NotificationManager from '../utils/NotificationManager';
import { SerializedPlugin } from '../plugins/SerializedPlugin';
import { ProcgenUtils } from '../utils/ProcgenUtils';
import UIEmitter from '../utils/UIEmitter';
import { Contract, ContractInterface } from 'ethers';
import {
  isUnconfirmedInit,
  isUnconfirmedMove,
  isUnconfirmedUpgrade,
  isUnconfirmedBuyHat,
  isUnconfirmedFindArtifact,
  isUnconfirmedDepositArtifact,
  isUnconfirmedWithdrawArtifact,
} from '../utils/TypeAssertions';
import { ThrottledConcurrentQueue } from '../utils/ThrottledConcurrentQueue';

class GameManager extends EventEmitter {
  private readonly account: EthAddress | null;
  private readonly players: Map<string, Player>;
  private readonly contractsAPI: ContractsAPI;
  private readonly persistentChunkStore: PersistentChunkStore;
  private readonly snarkHelper: SnarkHelper;
  private readonly entityStore: GameObjects;
  private readonly useMockHash: boolean;
  private readonly contractConstants: ContractConstants;
  private readonly endTimeSeconds: number = 1643587533; // jan 2022
  private readonly ethConnection: EthConnection;

  private balance: number;
  private balanceInterval: ReturnType<typeof setInterval>;
  private minerManager?: MinerManager;
  private hashRate: number;
  private homeLocation: Location | null;
  private worldRadius: number;

  private get planetRarity(): number {
    return this.contractConstants.PLANET_RARITY;
  }

  private constructor(
    account: EthAddress | null,
    balance: number,
    players: Map<string, Player>,
    touchedPlanets: Map<LocationId, Planet>,
    allTouchedPlanetIds: Set<LocationId>,
    worldRadius: number,
    unprocessedArrivals: Map<VoyageId, QueuedArrival>,
    unprocessedPlanetArrivalIds: Map<LocationId, VoyageId[]>,
    contractsAPI: ContractsAPI,
    contractConstants: ContractConstants,
    persistentChunkStore: PersistentChunkStore,
    snarkHelper: SnarkHelper,
    homeLocation: Location | null,
    useMockHash: boolean,
    artifacts: Map<ArtifactId, Artifact>,
    ethConnection: EthConnection
  ) {
    super();

    this.account = account;
    this.balance = balance;
    this.players = players;
    this.worldRadius = worldRadius;

    this.contractConstants = contractConstants;
    this.homeLocation = homeLocation;

    this.entityStore = new GameObjects(
      account,
      touchedPlanets,
      allTouchedPlanetIds,
      artifacts,
      persistentChunkStore.allChunks(),
      unprocessedArrivals,
      unprocessedPlanetArrivalIds,
      contractConstants
    );
    this.contractsAPI = contractsAPI;
    this.persistentChunkStore = persistentChunkStore;
    this.snarkHelper = snarkHelper;
    this.useMockHash = useMockHash;

    this.ethConnection = ethConnection;

    this.balanceInterval = setInterval(() => {
      if (this.account) {
        ethConnection.getBalance(this.account).then((balance) => {
          this.balance = balance;
        });
      }
    }, 5000);

    this.hashRate = 0;
  }

  public getEthConnection() {
    return this.ethConnection;
  }

  public destroy(): void {
    // removes singletons of ContractsAPI, LocalStorageManager, MinerManager
    if (this.minerManager) {
      this.minerManager.removeAllListeners(
        MinerManagerEvent.DiscoveredNewChunk
      );
      this.minerManager.destroy();
    }
    this.contractsAPI.removeAllListeners(ContractsAPIEvent.PlayerInit);
    this.contractsAPI.removeAllListeners(ContractsAPIEvent.PlanetUpdate);
    this.contractsAPI.destroy();
    this.persistentChunkStore.destroy();
    this.snarkHelper.destroy();
    clearInterval(this.balanceInterval);
  }

  static async create(ethConnection: EthConnection): Promise<GameManager> {
    // initialize dependencies according to a DAG

    // first we initialize the ContractsAPI and get the user's eth account,
    // and load contract constants + state
    const contractsAPI = await ContractsAPI.create(ethConnection);
    const useMockHash = await contractsAPI.zkChecksDisabled();

    // then we initialize the local storage manager and SNARK helper
    const account = ethConnection.getAddress();
    const balance = await ethConnection.getBalance(account);
    const persistentChunkStore = await PersistentChunkStore.create(account);
    const possibleHomes = await persistentChunkStore.getHomeLocations();
    const storedTouchedPlanetIds = await persistentChunkStore.getSavedTouchedPlanetIds();

    const snarkHelper = SnarkHelper.create(useMockHash);

    // get data from the contract
    const terminalEmitter = TerminalEmitter.getInstance();
    terminalEmitter.println(
      '(1/5) Getting game constants...',
      TerminalTextStyle.Sub
    );
    const contractConstants = await contractsAPI.getConstants();
    const players = await contractsAPI.getPlayers();
    const worldRadius = await contractsAPI.getWorldRadius();

    const arrivals: Map<VoyageId, QueuedArrival> = new Map();
    const planetVoyageIdMap: Map<LocationId, VoyageId[]> = new Map();

    const minedChunks = Array.from(await persistentChunkStore.allChunks());
    const minedPlanetIds = new Set(
      _.flatMap(minedChunks, (c) => c.planetLocations).map((l) => l.hash)
    );
    terminalEmitter.println('(2/5) Getting planet IDs...');
    const loadedPlanetIds = await contractsAPI.getTouchedPlanetIds(
      storedTouchedPlanetIds.length
    );

    const allTouchedPlanetIds = storedTouchedPlanetIds.concat(loadedPlanetIds);
    await persistentChunkStore.saveTouchedPlanetIds(allTouchedPlanetIds);

    // only load {arrival data, planet data} for planets that we have mined on this device.
    const planetsToLoad = allTouchedPlanetIds.filter((id) =>
      minedPlanetIds.has(id)
    );

    // fetch planets after allArrivals, since an arrival to a new planet might be sent
    // while we are fetching
    terminalEmitter.println('(3/5) Getting pending moves...');
    const allArrivals = await contractsAPI.getAllArrivals(planetsToLoad);
    terminalEmitter.println('(4/5) Getting planet metadata...');
    const touchedAndMinedPlanets = await contractsAPI.bulkGetPlanets(
      planetsToLoad
    );

    touchedAndMinedPlanets.forEach((planet, locId) => {
      if (touchedAndMinedPlanets.has(locId)) {
        planetVoyageIdMap.set(locId, []);
      }
    });

    for (const arrival of allArrivals) {
      const voyageIds = planetVoyageIdMap.get(arrival.toPlanet);
      if (voyageIds) {
        voyageIds.push(arrival.eventId);
        planetVoyageIdMap.set(arrival.toPlanet, voyageIds);
      }
      arrivals.set(arrival.eventId, arrival);
    }

    // get artifacts on touched + mined planets
    // as well as artifacts i own as NFTs
    const heldArtifactIds: ArtifactId[] = [];
    touchedAndMinedPlanets.forEach((planet) => {
      if (planet.heldArtifactId) {
        heldArtifactIds.push(planet.heldArtifactId);
      }
    });
    terminalEmitter.println('(5/5) Getting artifacts...');
    const heldArtifacts = await contractsAPI.bulkGetArtifacts(
      heldArtifactIds,
      true
    );
    const myArtifacts = await contractsAPI.getPlayerArtifacts(account);
    const knownArtifacts: Map<ArtifactId, Artifact> = new Map();
    for (const artifact of [...heldArtifacts, ...myArtifacts]) {
      knownArtifacts.set(artifact.id, artifact);
    }

    // figure out what's my home planet
    let homeLocation: Location | null = null;
    for (const loc of possibleHomes) {
      if (allTouchedPlanetIds.includes(loc.hash)) {
        homeLocation = loc;
        await persistentChunkStore.confirmHomeLocation(loc);
        break;
      }
    }

    const gameManager = new GameManager(
      account,
      balance,
      players,
      touchedAndMinedPlanets,
      new Set<LocationId>(Array.from(allTouchedPlanetIds)),
      worldRadius,
      arrivals,
      planetVoyageIdMap,
      contractsAPI,
      contractConstants,
      persistentChunkStore,
      snarkHelper,
      homeLocation,
      useMockHash,
      knownArtifacts,
      ethConnection
    );

    // get twitter handles
    gameManager.refreshTwitters();

    // set up listeners: whenever ContractsAPI reports some game state update, do some logic
    gameManager.contractsAPI
      .on(ContractsAPIEvent.ArtifactUpdate, async (artifactId: ArtifactId) => {
        await gameManager.hardRefreshArtifact(artifactId);
        gameManager.emit(GameManagerEvent.ArtifactUpdate, artifactId);
      })
      .on(ContractsAPIEvent.PlayerInit, (player: Player) => {
        gameManager.players.set(player.address, player);
      })
      .on(
        ContractsAPIEvent.PlanetTransferred,
        async (planetId: LocationId, newOwner: EthAddress) => {
          await gameManager.hardRefreshPlanet(planetId);
          const planetAfter = gameManager.getPlanetWithId(planetId);

          if (planetAfter && newOwner === gameManager.account) {
            NotificationManager.getInstance().receivedPlanet(planetAfter);
          }
        }
      )
      .on(ContractsAPIEvent.PlanetUpdate, async (planetId: LocationId) => {
        await gameManager.hardRefreshPlanet(planetId);
        gameManager.emit(GameManagerEvent.PlanetUpdate);
      })
      .on(ContractsAPIEvent.TxSubmitted, (unconfirmedTx: SubmittedTx) => {
        gameManager.persistentChunkStore.onEthTxSubmit(unconfirmedTx);
      })
      .on(ContractsAPIEvent.TxConfirmed, async (unconfirmedTx: SubmittedTx) => {
        gameManager.persistentChunkStore.onEthTxComplete(unconfirmedTx.txHash);
        if (isUnconfirmedInit(unconfirmedTx)) {
          gameManager.emit(GameManagerEvent.InitializedPlayer);
          // mining manager should be initialized already via joinGame, but just in case...
          gameManager.initMiningManager(unconfirmedTx.location.coords);
        } else if (isUnconfirmedMove(unconfirmedTx)) {
          await gameManager.hardRefreshPlanet(unconfirmedTx.from);
          await gameManager.hardRefreshPlanet(unconfirmedTx.to);
        } else if (isUnconfirmedUpgrade(unconfirmedTx)) {
          await gameManager.hardRefreshPlanet(unconfirmedTx.locationId);
        } else if (isUnconfirmedBuyHat(unconfirmedTx)) {
          await gameManager.hardRefreshPlanet(unconfirmedTx.locationId);
        } else if (isUnconfirmedInit(unconfirmedTx)) {
          await gameManager.hardRefreshPlanet(unconfirmedTx.locationId);
        } else if (isUnconfirmedFindArtifact(unconfirmedTx)) {
          await gameManager.hardRefreshPlanet(unconfirmedTx.planetId);
        } else if (isUnconfirmedDepositArtifact(unconfirmedTx)) {
          await gameManager.hardRefreshPlanet(unconfirmedTx.locationId);
          await gameManager.hardRefreshArtifact(unconfirmedTx.artifactId);
        } else if (isUnconfirmedWithdrawArtifact(unconfirmedTx)) {
          await gameManager.hardRefreshPlanet(unconfirmedTx.locationId);
          await gameManager.hardRefreshArtifact(unconfirmedTx.artifactId);
        }
        gameManager.entityStore.clearUnconfirmedTxIntent(unconfirmedTx);
        if (gameManager.account) {
          gameManager.balance = await gameManager.ethConnection.getBalance(
            gameManager.account
          );
        }
      })
      .on(ContractsAPIEvent.TxReverted, async (unconfirmedTx: SubmittedTx) => {
        gameManager.entityStore.clearUnconfirmedTxIntent(unconfirmedTx);
        gameManager.persistentChunkStore.onEthTxComplete(unconfirmedTx.txHash);
        if (gameManager.account) {
          gameManager.balance = await gameManager.ethConnection.getBalance(
            gameManager.account
          );
        }
      })
      .on(ContractsAPIEvent.RadiusUpdated, async () => {
        const newRadius = await gameManager.contractsAPI.getWorldRadius();
        gameManager.setRadius(newRadius);
      });

    const unconfirmedTxs = await persistentChunkStore.getUnconfirmedSubmittedEthTxs();
    const confirmationQueue = new ThrottledConcurrentQueue(10, 1000, 1);

    for (const unconfirmedTx of unconfirmedTxs) {
      // recommits the tx to storage but whatever
      gameManager.contractsAPI.waitFor(
        unconfirmedTx,
        confirmationQueue.add(() =>
          ethConnection.waitForTransaction(unconfirmedTx.txHash)
        )
      );
    }

    // we only want to initialize the mining manager if the player has already joined the game
    // if they haven't, we'll do this once the player has joined the game
    if (!!homeLocation && players.has(account as string)) {
      gameManager.initMiningManager(homeLocation.coords);
    }

    return gameManager;
  }

  private async hardRefreshPlanet(planetId: LocationId): Promise<void> {
    const planet = await this.contractsAPI.getPlanetById(planetId);
    if (!planet) return;
    const arrivals = await this.contractsAPI.getArrivalsForPlanet(planetId);
    this.entityStore.replacePlanetFromContractData(planet, arrivals);
  }

  private async bulkHardRefreshPlanets(planetIds: LocationId[]): Promise<void> {
    const planetVoyageMap: Map<LocationId, QueuedArrival[]> = new Map();

    const allVoyages = await this.contractsAPI.getAllArrivals(planetIds);
    const planetsToUpdate = await this.contractsAPI.bulkGetPlanets(planetIds);

    planetsToUpdate.forEach((planet, locId) => {
      if (planetsToUpdate.has(locId)) {
        planetVoyageMap.set(locId, []);
      }
    });

    for (const voyage of allVoyages) {
      const voyagesForToPlanet = planetVoyageMap.get(voyage.toPlanet);
      if (voyagesForToPlanet) {
        voyagesForToPlanet.push(voyage);
        planetVoyageMap.set(voyage.toPlanet, voyagesForToPlanet);
      }
    }

    for (const planet of planetsToUpdate.values()) {
      const voyagesForPlanet = planetVoyageMap.get(planet.locationId);
      if (voyagesForPlanet) {
        this.entityStore.replacePlanetFromContractData(
          planet,
          voyagesForPlanet
        );
      }
    }
  }

  private async hardRefreshArtifact(artifactId: ArtifactId): Promise<void> {
    const artifact = await this.contractsAPI.getArtifactById(artifactId);
    if (!artifact) return;
    this.entityStore.replaceArtifactFromContractData(artifact);
  }

  private onTxIntentFail(txIntent: TxIntent, e: Error): void {
    const notifManager = NotificationManager.getInstance();
    notifManager.unsubmittedTxFail(txIntent, e);

    const terminalEmitter = TerminalEmitter.getInstance();
    terminalEmitter.println(
      `[TX ERROR]: ${e.message.slice(0, 10000)}`,
      TerminalTextStyle.Red,
      true
    );
    this.entityStore.clearUnconfirmedTxIntent(txIntent);
  }

  /**
   * Gets the address of the player logged into this game manager.
   */
  public getAccount(): EthAddress | null {
    return this.account;
  }

  /**
   * Gets the address of the `DarkForestCore` contract, which is essentially
   * the 'backend' of the game.
   */
  public getContractAddress(): EthAddress {
    return this.contractsAPI.getContractAddress();
  }

  /**
   * Gets the twitter handle of the given ethereum account which is associated
   * with Dark Forest.
   */
  public getTwitter(address: EthAddress | null): string | null {
    let myAddress;
    if (!address) myAddress = this.getAccount();
    else myAddress = address;

    if (!myAddress) {
      return null;
    }
    const twitter = this.players.get(myAddress)?.twitter;
    return twitter || null;
  }

  /**
   * The game ends at a particular time in the future - get this time measured
   * in seconds from the epoch.
   */
  public getEndTimeSeconds(): number {
    return this.endTimeSeconds;
  }

  /**
   * returns timestamp (seconds) that planet will reach percent% of energycap
   * time may be in the past
   */
  public getEnergyCurveAtPercent(planet: Planet, percent: number): number {
    return this.entityStore.getEnergyCurveAtPercent(planet, percent);
  }

  /**
   * returns timestamp (seconds) that planet will reach percent% of silcap if
   * doesn't produce silver, returns nullif already over percent% of silcap,
   * returns null
   */
  public getSilverCurveAtPercent(
    planet: Planet,
    percent: number
  ): number | null {
    return this.entityStore.getSilverCurveAtPercent(planet, percent);
  }

  /**
   * Returns the upgrade that would be applied to a planet given a particular
   * upgrade branch (defense, range, speed) and level of upgrade.
   */
  public getUpgrade(branch: number, level: number): Upgrade {
    return this.contractConstants.upgrades[branch][level];
  }

  /**
   * Gets a list of all the players in the game (not just the ones you've
   * encounterd)
   */
  public getAllPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  /**
   * Gets all the map chunks that this client is aware of. Chunks may have come from
   * mining, or from importing map data.
   */
  public getExploredChunks(): Iterable<ExploredChunkData> {
    return this.persistentChunkStore.allChunks();
  }

  /**
   * Gets the radius of the playable area of the universe.
   */
  public getWorldRadius(): number {
    return this.worldRadius;
  }

  /**
   * Gets the total amount of silver that lives on a planet that somebody owns.
   */
  public getWorldSilver(): number {
    return this.getAllOwnedPlanets().reduce(
      (totalSoFar: number, nextPlanet: Planet) =>
        totalSoFar + nextPlanet.silver,
      0
    );
  }

  /**
   * Gets the total amount of energy that lives on a planet that somebody owns.
   */
  public getUniverseTotalEnergy(): number {
    return this.getAllOwnedPlanets().reduce(
      (totalSoFar: number, nextPlanet: Planet) =>
        totalSoFar + nextPlanet.energy,
      0
    );
  }

  /**
   * Gets the total amount of silver that lives on planets that the given player owns.
   */
  public getSilverOfPlayer(player: EthAddress): number {
    return this.getAllOwnedPlanets()
      .filter((planet) => planet.owner === player)
      .reduce(
        (totalSoFar: number, nextPlanet: Planet) =>
          totalSoFar + nextPlanet.silver,
        0
      );
  }

  /**
   * Gets the total amount of energy that lives on planets that the given player owns.
   */
  public getEnergyOfPlayer(player: EthAddress): number {
    return this.getAllOwnedPlanets()
      .filter((planet) => planet.owner === player)
      .reduce(
        (totalSoFar: number, nextPlanet: Planet) =>
          totalSoFar + nextPlanet.energy,
        0
      );
  }

  private initMiningManager(homeCoords: WorldCoords): void {
    if (this.minerManager) return;

    const myPattern: MiningPattern = new SpiralPattern(
      homeCoords,
      MIN_CHUNK_SIZE
    );

    this.minerManager = MinerManager.create(
      this.persistentChunkStore,
      myPattern,
      this.worldRadius,
      this.planetRarity,
      this.useMockHash
    );

    this.minerManager.on(
      MinerManagerEvent.DiscoveredNewChunk,
      (chunk: ExploredChunkData, miningTimeMillis: number) => {
        this.addNewChunk(chunk);
        this.hashRate =
          chunk.chunkFootprint.sideLength ** 2 / (miningTimeMillis / 1000);
        this.emit(GameManagerEvent.DiscoveredNewChunk, chunk);
      }
    );
    this.minerManager.startExplore();
  }

  /**
   * Sets the mining pattern of the miner. This kills the old miner and starts this one.
   */
  setMiningPattern(pattern: MiningPattern): void {
    if (this.minerManager) {
      this.minerManager.setMiningPattern(pattern);
    }
  }

  /**
   * Gets the mining pattern that the miner is currently using.
   */
  getMiningPattern(): MiningPattern | null {
    if (this.minerManager) return this.minerManager.getMiningPattern();
    else return null;
  }

  /**
   * Set the amount of cores to mine the universe with. More cores equals faster!
   */
  setMinerCores(nCores: number): void {
    this.minerManager?.setCores(nCores);
  }

  /**
   * Gets the rectangle bounding the chunk that the miner is currently in the process
   * of hashing.
   */
  getCurrentlyExploringChunk(): Rectangle | null {
    if (this.minerManager) {
      return this.minerManager.getCurrentlyExploringChunk();
    }
    return null;
  }

  /**
   * Whether or not this client has successfully found and landed on a home planet.
   */
  hasJoinedGame(): boolean {
    return this.players.has(this.account as string);
  }

  /**
   * gets both deposited artifacts that are on planets i own as well as artifacts i own
   */
  getMyArtifacts(): Artifact[] {
    if (!this.account) return [];
    const ownedByMe = this.entityStore.getArtifactsOwnedBy(this.account);
    const onPlanetsOwnedByMe = this.entityStore.getArtifactsOnPlanetsOwnedBy(
      this.account
    );
    return [...ownedByMe, ...onPlanetsOwnedByMe];
  }

  /**
   * Gets the planet that is located at the given coordinates. Returns null if not a valid
   * location or if no planet exists at location. If the planet needs to be updated (because
   * some time has passed since we last updated the planet), then updates that planet first.
   */
  getPlanetWithCoords(coords: WorldCoords): Planet | null {
    return this.entityStore.getPlanetWithCoords(coords);
  }

  /**
   * Gets the planet with the given hash. Returns null if the planet is neither in the contract
   * nor has been discovered locally. If the planet needs to be updated (because some time has
   * passed since we last updated the planet), then updates that planet first.
   */
  getPlanetWithId(planetId: LocationId): Planet | null {
    return this.entityStore.getPlanetWithId(planetId);
  }

  /**
   * Gets the planet that is closest to the given coordinates. Filters out irrelevant planets
   * using the `radiusMap` parameter, which specifies how close a planet must be in order to
   * be returned from this function, given that planet's level. Smaller planets have a smaller
   * radius, and larger planets have a larger radius.
   *
   * If a smaller and a larger planet are both within respective radii of coords, the smaller
   * planet is returned.
   */
  getPlanetHitboxForCoords(
    coords: WorldCoords,
    radiusMap: Record<PlanetLevel, number>
  ): LocatablePlanet | null {
    return this.entityStore.getPlanetHitboxForCoords(coords, radiusMap);
  }

  /**
   * Gets the artifact with the given id. Null if no artifact with id exists.
   */
  getArtifactWithId(artifactId: ArtifactId): Artifact | null {
    return this.entityStore.getArtifactById(artifactId);
  }

  /**
   * Gets the level of the given planet. Returns null if the planet does not exist. Does
   * NOT update the planet if the planet is stale, which means this function is fast.
   */
  getPlanetLevel(planetId: LocationId): PlanetLevel | null {
    return this.entityStore.getPlanetLevel(planetId);
  }

  /**
   * Gets the detail level of the given planet. Returns null if the planet does not exist. Does
   * NOT update the planet if the planet is stale, which means this function is fast.
   */
  getPlanetDetailLevel(planetId: LocationId): number | null {
    if (planetId === this.homeLocation?.hash) {
      return Infinity;
    }
    return this.entityStore.getPlanetDetailLevel(planetId);
  }

  /**
   * Gets the location of the given planet. Returns null if the planet does not exist, or if
   * we do not know the location of this planet NOT update the planet if the planet is stale,
   * which means this function is fast.
   */
  getLocationOfPlanet(planetId: LocationId): Location | null {
    return this.entityStore.getLocationOfPlanet(planetId);
  }

  /**
   * Gets all voyages that have not completed.
   */
  getAllVoyages(): QueuedArrival[] {
    return this.entityStore.getAllVoyages();
  }

  /**
   * Gets all planets. This means all planets that are in the contract, and also all
   * planets that have been mined locally. Does not update planets if they are stale.
   * NOT PERFORMANT - for scripting only.
   */
  getAllPlanets(): Iterable<Planet> {
    return this.entityStore.getAllPlanets();
  }

  /**
   * Gets a list of planets that have an owner.
   */
  getAllOwnedPlanets(): Planet[] {
    return this.entityStore.getAllOwnedPlanets();
  }

  /**
   * Gets a list of the planets that the player logged into this `GameManager` owns.
   */
  getMyPlanets(): Planet[] {
    return this.getAllOwnedPlanets().filter(
      (planet) => planet.owner === this.account
    );
  }

  /**
   * Each coordinate lives in a particular type of space, determined by a smooth random
   * function called 'perlin noise.
   */
  spaceTypeFromPerlin(perlin: number): SpaceType {
    return this.entityStore.spaceTypeFromPerlin(perlin);
  }

  /**
   * Gets the amount of hashes per second that the miner manager is calculating.
   */
  getHashesPerSec(): number {
    return this.hashRate;
  }

  /**
   * Signs the given twitter handle with the private key of the current user. Used to
   * verify that the person who owns the Dark Forest account was the one that attempted
   * to link a twitter to their account.
   */
  async getSignedTwitter(twitter: string): Promise<string> {
    return this.ethConnection.signMessage(twitter);
  }

  /**
   * Gets the private key of the burner wallet used by this account.
   */
  getPrivateKey(): string {
    return this.ethConnection.getPrivateKey();
  }

  /**
   * Gets the balance of the account
   */
  getMyBalance(): number {
    if (!this.account) return 0;
    return this.balance;
  }

  /**
   * Gets all moves that this client has queued to be uploaded to the contract, but
   * have not been successfully confirmed yet.
   */
  getUnconfirmedMoves(): UnconfirmedMove[] {
    return this.entityStore.getUnconfirmedMoves();
  }

  /**
   * Gets all upgrades that this client has queued to be uploaded to the contract, but
   * have not been successfully confirmed yet.
   */
  getUnconfirmedUpgrades(): UnconfirmedUpgrade[] {
    return this.entityStore.getUnconfirmedUpgrades();
  }

  /**
   * Gets the location of your home planet.
   */
  getHomeCoords(): WorldCoords | null {
    if (!this.homeLocation) return null;
    return {
      x: this.homeLocation.coords.x,
      y: this.homeLocation.coords.y,
    };
  }

  /**
   * Gets the hash of the location of your home planet.
   */
  getHomeHash(): LocationId | null {
    return this.homeLocation ? this.homeLocation.hash : null;
  }

  /**
   * Whether or not the given rectangle has been mined.
   */
  hasMinedChunk(chunkLocation: Rectangle): boolean {
    return this.persistentChunkStore.hasMinedChunk(chunkLocation);
  }

  getChunk(chunkFootprint: Rectangle): ExploredChunkData | null {
    return this.persistentChunkStore.getChunkByFootprint(chunkFootprint);
  }

  /**
   * The perlin value at each coordinate determines the space type. There are three space
   * types, which means there are three ranges on the number line that correspond to
   * each space type. This function returns the boundary values between each of these
   * three ranges: `PERLIN_THRESHOLD_1` and `PERLIN_THRESHOLD_2`.
   */
  getPerlinThresholds(): [number, number] {
    return [
      this.contractConstants.PERLIN_THRESHOLD_1,
      this.contractConstants.PERLIN_THRESHOLD_2,
    ];
  }

  /**
   * Starts the miner.
   */
  startExplore(): void {
    if (this.minerManager) {
      this.minerManager.startExplore();
    }
  }

  /**
   * Stops the miner.
   */
  stopExplore(): void {
    if (this.minerManager) {
      this.hashRate = 0;
      this.minerManager.stopExplore();
    }
  }

  private setRadius(worldRadius: number) {
    this.worldRadius = worldRadius;

    if (this.minerManager) {
      this.minerManager.setRadius(this.worldRadius);
    }
  }

  private async refreshTwitters(): Promise<void> {
    // get twitter handles
    const addressTwitters = await getAllTwitters();
    for (const key of Object.keys(addressTwitters)) {
      const addr = CheckedTypeUtils.address(key);
      const player = this.players.get(addr);
      if (player) player.twitter = addressTwitters[addr];
    }
  }

  /**
   * Once you have posted the verificatoin tweet - complete the twitter-account-linking
   * process by telling the Dark Forest webserver to look at that tweet.
   */
  async verifyTwitter(twitter: string): Promise<boolean> {
    if (!this.account) return Promise.resolve(false);
    const success = await verifyTwitterHandle(twitter, this.account);
    await this.refreshTwitters();
    return success;
  }

  private checkGameHasEnded(): boolean {
    if (Date.now() / 1000 > this.endTimeSeconds) {
      const terminalEmitter = TerminalEmitter.getInstance();
      terminalEmitter.println('[ERROR] Game has ended.');
      return true;
    }
    return false;
  }

  /**
   * Attempts to join the game. Should not be called once you've already joined.
   */
  joinGame(beforeRetry: (e: Error) => Promise<boolean>): GameManager {
    if (this.checkGameHasEnded()) return this;
    let actionId: string;
    let txIntent: UnconfirmedInit;
    this.getRandomHomePlanetCoords()
      .then(async (loc) => {
        const {
          coords: { x, y },
          hash: h,
        } = loc;
        console.log(x, y);
        this.homeLocation = loc;
        await this.persistentChunkStore.addHomeLocation(loc);
        actionId = getRandomActionId();
        txIntent = {
          actionId,
          type: EthTxType.INIT,
          locationId: h,
          location: loc,
        };
        this.handleTxIntent(txIntent as TxIntent);
        const callArgs = await this.snarkHelper.getInitArgs(
          x,
          y,
          this.worldRadius
        );
        this.initMiningManager(loc.coords); // get an early start

        // if player initialization causes an error, give the caller an opportunity
        // to resolve that error. if the asynchronous `beforeRetry` function returns
        // true, retry initializing the player. if it returns false, or if the
        // `beforeRetry` is undefined, then don't retry and throw an exception.
        while (true) {
          try {
            const terminalEmitter = TerminalEmitter.getInstance();
            terminalEmitter.println(
              'INIT: calculated SNARK with args:',
              TerminalTextStyle.Sub
            );
            terminalEmitter.println(
              JSON.stringify(hexifyBigIntNestedArray(callArgs.slice(0, 3))),
              TerminalTextStyle.Sub,
              true
            );
            terminalEmitter.newline();
            await this.contractsAPI.initializePlayer(callArgs, txIntent);
            break;
          } catch (e) {
            if (beforeRetry) {
              if (await beforeRetry(e)) {
                continue;
              }
            } else {
              throw e;
            }
          }
        }
      })
      .catch((err) => {
        this.onTxIntentFail(txIntent, err);
        this.emit(GameManagerEvent.InitializedPlayerError, err);
      });

    return this;
  }

  /**
   * Initializes a new player's game to start at the given home planet. Must have already
   * initialized the player on the contract.
   */
  async addAccount(coords: WorldCoords): Promise<boolean> {
    const loc: Location = locationFromCoords(coords);
    await this.persistentChunkStore.addHomeLocation(loc);
    this.initMiningManager(coords);
    this.homeLocation = loc;
    return true;
  }

  private async getRandomHomePlanetCoords(): Promise<Location> {
    const terminalEmitter = TerminalEmitter.getInstance();

    return new Promise<Location>((resolve) => {
      const perlinThreshold = this.contractConstants.PERLIN_THRESHOLD_1;
      let minedChunksCount = 0;
      // target4 is about 32000 in v0.5 prod; universe doesn't expand until virtual radius reaches ~64000
      const UNIFORM_RANDOM_UNTIL_1 = 80000;
      const UNIFORM_RANDOM_UNTIL_2 = 115000;

      let x: number;
      let y: number;
      let d: number;
      let p: number;

      // only initialize in areas with perlin = PERLIN_THRESHOLD_1 - 1
      // contract will only enforce <= PERLIN_THRESHOLD_1 but there's no reason to
      // initialize in a lower perlin area
      const isProd = process.env.NODE_ENV === 'production';
      do {
        // sample from square
        x = Math.random() * this.worldRadius * 2 - this.worldRadius;
        y = Math.random() * this.worldRadius * 2 - this.worldRadius;
        d = Math.sqrt(x ** 2 + y ** 2);
        p = perlin({ x, y }, false);
      } while (
        p >= perlinThreshold || // can't be in space/deepspace
        p < perlinThreshold - 1 || // can't be too deep in nebula
        d >= this.worldRadius || // can't be out of bound
        (isProd &&
          (d <= UNIFORM_RANDOM_UNTIL_1 || // can't be in initial (first 100 players) spawn circle
            (this.worldRadius > UNIFORM_RANDOM_UNTIL_2 &&
              d <= 0.95 * this.worldRadius))) // can't be in inner 90%, if worldRadius large enough
      );

      // when setting up a new account in development mode, you can tell
      // the game where to start searching for planets using this query
      // string parameter. for example:
      //
      // ?searchCenter=2866,5627
      //

      const params = new URLSearchParams(window.location.search);

      if (params.has('searchCenter')) {
        const parts = params.get('searchCenter')?.split(',');

        if (parts) {
          x = parseInt(parts[0], 10);
          y = parseInt(parts[1], 10);
        }
      }

      const pattern: MiningPattern = new SpiralPattern(
        { x, y },
        MIN_CHUNK_SIZE
      );
      const chunkStore = new HomePlanetMinerChunkStore(perlinThreshold);
      const homePlanetFinder = MinerManager.create(
        chunkStore,
        pattern,
        this.worldRadius,
        this.planetRarity,
        this.useMockHash
      );
      homePlanetFinder.on(
        MinerManagerEvent.DiscoveredNewChunk,
        (chunk: ExploredChunkData) => {
          chunkStore.addChunk(chunk);
          minedChunksCount++;
          if (minedChunksCount % 8 === 0) {
            terminalEmitter.println(
              `Hashed ${
                minedChunksCount * MIN_CHUNK_SIZE ** 2
              } potential home planets...`
            );
          }
          for (const planetLoc of chunk.planetLocations) {
            const planetPerlin = planetLoc.perlin;
            const planetX = planetLoc.coords.x;
            const planetY = planetLoc.coords.y;
            const planetLevel = this.entityStore.planetLevelFromHexPerlin(
              planetLoc.hash,
              planetLoc.perlin
            );
            if (
              planetPerlin < perlinThreshold &&
              planetPerlin >= perlinThreshold - 1 &&
              planetX ** 2 + planetY ** 2 < this.worldRadius ** 2 &&
              planetLevel === PlanetLevel.MIN
            ) {
              // valid home planet
              homePlanetFinder.stopExplore();
              homePlanetFinder.destroy();
              resolve(planetLoc);
              break;
            }
          }
        }
      );
      homePlanetFinder.startExplore();
    });
  }

  /**
   * Calls the contract to find an artifact on the given planet.
   */
  public findArtifact(planetId: LocationId): GameManager {
    if (this.checkGameHasEnded()) return this;

    const planet = this.entityStore.getPlanetWithId(planetId);

    if (!planet) {
      throw new Error(
        "you can't find artifacts on a planet you haven't discovered"
      );
    }

    if (planet.owner !== this.getAccount()) {
      throw new Error("you can't find artifacts on planets you don't own");
    }

    if (!isLocatable(planet)) {
      throw new Error("you don't know the biome of this planet");
    }

    if (planet.hasTriedFindingArtifact) {
      throw new Error(
        'someone already tried finding an artifact on this planet'
      );
    }

    if (planet.unconfirmedFindArtifact) {
      throw new Error("you're already looking bro...");
    }

    if (!GameObjects.isPlanetMineable(planet)) {
      throw new Error("this planet doesn't have an artifact on it.");
    }

    if (planet.energy < planet.energyCap * 0.95) {
      throw new Error(
        'you can only find artifacts on planets that are 95% to the energy cap'
      );
    }

    // this is shitty. used for the popup window
    localStorage.setItem(
      `${this.getAccount()?.toLowerCase()}-findArtifactOnPlanet`,
      planetId
    );

    const actionId = getRandomActionId();
    const txIntent: UnconfirmedFindArtifact = {
      actionId,
      type: EthTxType.FIND_ARTIFACT,
      planetId,
    };

    this.handleTxIntent(txIntent);

    this.snarkHelper
      .getFindArtifactArgs(planet.location.coords.x, planet.location.coords.y)
      .then((snarkArgs) => {
        const terminalEmitter = TerminalEmitter.getInstance();
        terminalEmitter.println(
          'ARTIFACT: calculated SNARK with args:',
          TerminalTextStyle.Sub
        );
        terminalEmitter.println(
          JSON.stringify(hexifyBigIntNestedArray(snarkArgs.slice(0, 3))),
          TerminalTextStyle.Sub,
          true
        );
        terminalEmitter.newline();

        return this.contractsAPI.findArtifact(
          planet.location,
          snarkArgs,
          actionId
        );
      })
      .catch((err) => {
        this.onTxIntentFail(txIntent, err);
      });

    return this;
  }

  /**
   * Submits a transaction to the blockchain to deposit an artifact on a given planet.
   * You must own the planet, and the artifact, and the artifact must not be locked up
   * on another planet. Artifacts are locked to a planet for `ARTIFACT_LOCKUP_DURATION_SECONDS`
   * which is currently 12 hours
   */
  depositArtifact(locationId: LocationId, artifactId: ArtifactId): GameManager {
    if (this.checkGameHasEnded()) return this;
    // this is shitty. used for the popup window
    localStorage.setItem(
      `${this.getAccount()?.toLowerCase()}-depositPlanet`,
      locationId
    );
    localStorage.setItem(
      `${this.getAccount()?.toLowerCase()}-depositArtifact`,
      artifactId
    );

    const actionId = getRandomActionId();
    const txIntent: UnconfirmedDepositArtifact = {
      actionId,
      type: EthTxType.DEPOSIT_ARTIFACT,
      locationId,
      artifactId,
    };
    this.handleTxIntent(txIntent);

    const terminalEmitter = TerminalEmitter.getInstance();
    terminalEmitter.println(
      'DEPOSIT_ARTIFACT: sending deposit to blockchain',
      TerminalTextStyle.Sub
    );
    terminalEmitter.newline();
    this.contractsAPI
      .depositArtifact(txIntent)
      .catch((e) => this.onTxIntentFail(txIntent, e));
    return this;
  }

  /**
   * Withdraws the artifact that is locked up on the given planet.
   */
  withdrawArtifact(locationId: LocationId): GameManager {
    if (this.checkGameHasEnded()) return this;

    const planet = this.entityStore.getPlanetWithId(locationId);
    if (!planet) {
      console.error('tried to withdraw from unknown planet');
      return this;
    }
    const artifactId = planet.heldArtifactId;
    if (!artifactId) {
      console.error('no artifact on this planet');
      return this;
    }

    // this is shitty. used for the popup window
    localStorage.setItem(
      `${this.getAccount()?.toLowerCase()}-withdrawPlanet`,
      locationId
    );
    localStorage.setItem(
      `${this.getAccount()?.toLowerCase()}-withdrawArtifact`,
      artifactId
    );

    if (Date.now() / 1000 > this.endTimeSeconds) {
      const terminalEmitter = TerminalEmitter.getInstance();
      terminalEmitter.println('[ERROR] Game has ended.');
      return this;
    }

    const actionId = getRandomActionId();
    const txIntent: UnconfirmedWithdrawArtifact = {
      actionId,
      type: EthTxType.WITHDRAW_ARTIFACT,
      locationId,
      artifactId,
    };
    this.handleTxIntent(txIntent);

    const terminalEmitter = TerminalEmitter.getInstance();
    terminalEmitter.println(
      'WITHDRAW_ARTIFACT: sending withdrawal to blockchain',
      TerminalTextStyle.Sub
    );
    terminalEmitter.newline();

    this.contractsAPI
      .withdrawArtifact(txIntent)
      .catch((e) => this.onTxIntentFail(txIntent, e));
    return this;
  }

  /**
   * Submits a transaction to the blockchain to move the given amount of resources from
   * the given planet to the given planet.
   */
  move(
    from: LocationId,
    to: LocationId,
    forces: number,
    silver: number
  ): GameManager {
    if (this.checkGameHasEnded()) return this;
    localStorage.setItem(
      `${this.getAccount()?.toLowerCase()}-fromPlanet`,
      from
    );
    localStorage.setItem(`${this.getAccount()?.toLowerCase()}-toPlanet`, to);

    if (Date.now() / 1000 > this.endTimeSeconds) {
      const terminalEmitter = TerminalEmitter.getInstance();
      terminalEmitter.println('[ERROR] Game has ended.');
      return this;
    }

    const oldLocation = this.entityStore.getLocationOfPlanet(from);
    const newLocation = this.entityStore.getLocationOfPlanet(to);
    if (!oldLocation) {
      console.error('tried to move from planet that does not exist');
      return this;
    }
    if (!newLocation) {
      console.error('tried to move from planet that does not exist');
      return this;
    }

    const oldX = oldLocation.coords.x;
    const oldY = oldLocation.coords.y;
    const newX = newLocation.coords.x;
    const newY = newLocation.coords.y;
    const xDiff = newX - oldX;
    const yDiff = newY - oldY;

    const distMax = Math.ceil(Math.sqrt(xDiff ** 2 + yDiff ** 2));

    const shipsMoved = forces;
    const silverMoved = silver;

    if (newX ** 2 + newY ** 2 >= this.worldRadius ** 2) {
      throw new Error('attempted to move out of bounds');
    }

    const oldPlanet = this.entityStore.getPlanetWithLocation(oldLocation);

    if (!this.account || !oldPlanet || oldPlanet.owner !== this.account) {
      throw new Error('attempted to move from a planet not owned by player');
    }
    const actionId = getRandomActionId();
    const txIntent = {
      actionId,
      type: EthTxType.MOVE,
      from: oldLocation.hash,
      to: newLocation.hash,
      forces: shipsMoved,
      silver: silverMoved,
    };

    this.handleTxIntent(txIntent);

    this.snarkHelper
      .getMoveArgs(oldX, oldY, newX, newY, this.worldRadius, distMax)
      .then((callArgs) => {
        const terminalEmitter = TerminalEmitter.getInstance();

        terminalEmitter.println(
          'MOVE: calculated SNARK with args:',
          TerminalTextStyle.Sub
        );
        terminalEmitter.println(
          JSON.stringify(hexifyBigIntNestedArray(callArgs)),
          TerminalTextStyle.Sub,
          true
        );
        terminalEmitter.newline();

        return this.contractsAPI.move(
          callArgs,
          shipsMoved,
          silverMoved,
          actionId
        );
      })
      .catch((err) => {
        this.onTxIntentFail(txIntent, err);
      });
    return this;
  }

  /**
   * Submits a transaction to the blockchain to upgrade the given planet with the given
   * upgrade branch. You must own the planet, and have enough silver on it to complete
   * the upgrade.
   */
  upgrade(planetId: LocationId, branch: number): GameManager {
    if (this.checkGameHasEnded()) return this;
    // this is shitty
    localStorage.setItem(
      `${this.getAccount()?.toLowerCase()}-upPlanet`,
      planetId
    );
    localStorage.setItem(
      `${this.getAccount()?.toLowerCase()}-branch`,
      branch.toString()
    );

    const upgradeArgs: UpgradeArgs = [
      CheckedTypeUtils.locationIdToDecStr(planetId),
      branch.toString(),
    ];
    const actionId = getRandomActionId();
    const txIntent = {
      actionId,
      type: EthTxType.UPGRADE,
      locationId: planetId,
      upgradeBranch: branch,
    };
    this.handleTxIntent(txIntent);

    const terminalEmitter = TerminalEmitter.getInstance();
    terminalEmitter.println(
      'UPGRADE: sending upgrade to blockchain',
      TerminalTextStyle.Sub
    );
    terminalEmitter.newline();
    this.contractsAPI
      .upgradePlanet(upgradeArgs, actionId)
      .catch((e) => this.onTxIntentFail(txIntent, e));

    return this;
  }

  /**
   * Submits a transaction to the blockchain to buy a hat for the given planet. You
   * must own the planet. Warning costs real xdai. Hats are permanently locked to a
   * planet. They are purely cosmetic and a great way to BM your opponents or just
   * look your best. Just like in the real world, more money means more hat.
   */
  buyHat(planetId: LocationId): GameManager {
    if (this.checkGameHasEnded()) return this;
    const terminalEmitter = TerminalEmitter.getInstance();

    const planetLoc = this.entityStore.getLocationOfPlanet(planetId);
    if (!planetLoc) {
      console.error('planet not found');
      terminalEmitter.println('[TX ERROR] Planet not found');
      return this;
    }
    const planet = this.entityStore.getPlanetWithLocation(planetLoc);
    if (!planet) {
      console.error('planet not found');
      terminalEmitter.println('[TX ERROR] Planet not found');
      return this;
    }

    localStorage.setItem(
      `${this.getAccount()?.toLowerCase()}-hatPlanet`,
      planetId
    );
    localStorage.setItem(
      `${this.getAccount()?.toLowerCase()}-hatLevel`,
      (planet.hatLevel + 1).toString()
    );

    const actionId = getRandomActionId();
    const txIntent = {
      actionId,
      type: EthTxType.BUY_HAT,
      locationId: planetId,
    };
    this.handleTxIntent(txIntent);

    terminalEmitter.println(
      'BUY HAT: sending request to blockchain',
      TerminalTextStyle.Sub
    );
    terminalEmitter.newline();

    this.contractsAPI
      .buyHat(
        CheckedTypeUtils.locationIdToDecStr(planetId),
        planet.hatLevel,
        actionId
      )
      .catch((e) => {
        this.onTxIntentFail(txIntent, e);
      });
    return this;
  }

  transferOwnership(planetId: LocationId, newOwner: EthAddress): GameManager {
    if (this.checkGameHasEnded()) return this;
    const terminalEmitter = TerminalEmitter.getInstance();

    const planetLoc = this.entityStore.getLocationOfPlanet(planetId);
    if (!planetLoc) {
      console.error('planet not found');
      terminalEmitter.println('[TX ERROR] Planet not found');
      return this;
    }
    const planet = this.entityStore.getPlanetWithLocation(planetLoc);
    if (!planet) {
      console.error('planet not found');
      terminalEmitter.println('[TX ERROR] Planet not found');
      return this;
    }

    localStorage.setItem(
      `${this.getAccount()?.toLowerCase()}-transferPlanet`,
      planetId
    );
    localStorage.setItem(
      `${this.getAccount()?.toLowerCase()}-transferOwner`,
      newOwner
    );

    const actionId = getRandomActionId();
    const txIntent: UnconfirmedPlanetTransfer = {
      actionId,
      type: EthTxType.PLANET_TRANSFER,
      planetId,
      newOwner,
    };
    this.handleTxIntent(txIntent);

    console.log(planet);

    this.contractsAPI
      .transferOwnership(planetId, newOwner, actionId)
      .catch((e) => this.onTxIntentFail(txIntent, e));
    return this;
  }

  private handleTxIntent(txIntent: TxIntent) {
    this.entityStore.onTxIntent(txIntent);
  }

  /**
   * Makes this game manager aware of a new chunk - which includes its location, size,
   * as well as all of the planets contained in that chunk. Causes the client to load
   * all of the information about those planets from the blockchain.
   */
  addNewChunk(chunk: ExploredChunkData): GameManager {
    this.persistentChunkStore.updateChunk(chunk, false);
    for (const planetLocation of chunk.planetLocations) {
      this.entityStore.addPlanetLocation(planetLocation);

      if (this.entityStore.isPlanetInContract(planetLocation.hash)) {
        this.hardRefreshPlanet(planetLocation.hash); // don't need to await, just start the process of hard refreshing
      }
    }
    return this;
  }

  /**
   * To add multiple chunks at once, use this function rather than `addNewChunk`, in order
   * to load all of the associated planet data in an efficient manner.
   */
  async bulkAddNewChunks(chunks: ExploredChunkData[]): Promise<void> {
    const terminalEmitter = TerminalEmitter.getInstance();
    terminalEmitter.println(
      'IMPORTING MAP: if you are importing a large map, this may take a while...'
    );
    const planetIdsToUpdate: LocationId[] = [];
    for (const chunk of chunks) {
      this.persistentChunkStore.updateChunk(chunk, false);
      for (const planetLocation of chunk.planetLocations) {
        this.entityStore.addPlanetLocation(planetLocation);

        if (this.entityStore.isPlanetInContract(planetLocation.hash)) {
          // Await this so we don't crash the game
          planetIdsToUpdate.push(planetLocation.hash);
        }
      }
    }
    terminalEmitter.println(
      `downloading data for ${planetIdsToUpdate.length} planets...`,
      TerminalTextStyle.Sub
    );
    this.bulkHardRefreshPlanets(planetIdsToUpdate);
  }

  // utils - scripting only

  /**
   * Gets the maximuim distance that you can send your energy from the given planet,
   * using the given percentage of that planet's current silver.
   */
  getMaxMoveDist(planetId: LocationId, sendingPercent: number): number {
    const planet = this.getPlanetWithId(planetId);
    if (!planet) throw new Error('origin planet unknown');
    // log_2(sendingPercent / 5%)
    let ratio = Math.log(sendingPercent / 5) / Math.log(2);
    ratio = Math.max(ratio, 0);
    return ratio * planet.range;
  }

  /**
   * Gets the distance between two planets. Throws an exception if you don't
   * know the location of either planet.
   */
  getDist(fromId: LocationId, toId: LocationId): number {
    const fromLoc = this.entityStore.getLocationOfPlanet(fromId);
    if (!fromLoc) throw new Error('origin location unknown');
    const toLoc = this.entityStore.getLocationOfPlanet(toId);
    if (!toLoc) throw new Error('destination location unknown');

    const { x: fromX, y: fromY } = fromLoc.coords;
    const { x: toX, y: toY } = toLoc.coords;

    return Math.sqrt((fromX - toX) ** 2 + (fromY - toY) ** 2);
  }

  /**
   * Gets all the planets that you can reach with at least 1 energy from
   * the given planet.
   */
  getPlanetsInRange(planetId: LocationId, sendingPercent: number): Planet[] {
    const loc = this.entityStore.getLocationOfPlanet(planetId);
    if (!loc) throw new Error('origin planet location unknown');

    const ret: Planet[] = [];
    const maxDist = this.getMaxMoveDist(planetId, sendingPercent);
    const planetsIt = this.entityStore.getAllPlanets();
    for (const toPlanet of planetsIt) {
      const toLoc = this.entityStore.getLocationOfPlanet(toPlanet.locationId);
      if (!toLoc) continue;

      const { x: fromX, y: fromY } = loc.coords;
      const { x: toX, y: toY } = toLoc.coords;
      if ((fromX - toX) ** 2 + (fromY - toY) ** 2 < maxDist ** 2) {
        ret.push(toPlanet);
      }
    }
    return ret;
  }

  /**
   * Gets the amount of energy needed in order for a voyage from the given to the given
   * planet to arrive with your desired amount of energy.
   */
  getEnergyNeededForMove(
    fromId: LocationId,
    toId: LocationId,
    arrivingEnergy: number
  ): number {
    const from = this.getPlanetWithId(fromId);
    if (!from) throw new Error('origin planet unknown');
    const dist = this.getDist(fromId, toId);
    const rangeSteps = dist / from.range;

    const arrivingProp = arrivingEnergy / from.energyCap + 0.05;

    return arrivingProp * Math.pow(2, rangeSteps) * from.energyCap;
  }

  /**
   * Gets the amount of energy that would arrive if a voyage with the given parameters
   * was to occur.
   */
  getEnergyArrivingForMove(
    fromId: LocationId,
    toId: LocationId,
    sentEnergy: number
  ) {
    const from = this.getPlanetWithId(fromId);
    if (!from) throw new Error('origin planet unknown');
    const dist = this.getDist(fromId, toId);
    return moveShipsDecay(sentEnergy, from, dist);
  }

  /**
   * Gets the amount of time, in seconds that a voyage between from the first to the
   * second planet would take.
   */
  getTimeForMove(fromId: LocationId, toId: LocationId): number {
    const from = this.getPlanetWithId(fromId);
    if (!from) throw new Error('origin planet unknown');
    const dist = this.getDist(fromId, toId);
    return dist / (from.speed / 100);
  }

  /**
   * Gets the temperature of a given location.
   */
  getTemperature(coords: WorldCoords): number {
    const p = perlin(coords, false);
    return (16 - p) * 16;
  }

  /**
   * Load the serialized versions of all the plugins that this player has.
   */
  public async loadPlugins(): Promise<SerializedPlugin[]> {
    return this.persistentChunkStore.loadPlugins();
  }

  /**
   * Overwrites all the saved plugins to equal the given array of plugins.
   */
  public async savePlugins(savedPlugins: SerializedPlugin[]): Promise<void> {
    await this.persistentChunkStore.savePlugins(savedPlugins);
  }

  /**
   * Whether or not the given planet is capable of minting an artifact.
   */
  public isPlanetMineable(p: Planet): boolean {
    if (isLocatable(p)) {
      return GameObjects.isPlanetMineable(p);
    }

    return false;
  }

  /**
   * Returns constructors of classes that may be useful for developing plugins.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getConstructors() {
    return {
      MinerManager,
      SpiralPattern,
    };
  }

  /**
   * Gets the perlin value at the given location in the world. SpaceType is based
   * on this value.
   */
  public getPerlin(coords: WorldCoords): number {
    return perlin(coords);
  }

  /**
   * Gets the biome perlin valie at the given location in the world.
   */
  public getBiomePerlin(coords: WorldCoords): number {
    return perlin(coords, true, true);
  }

  /**
   * Helpful functions for getting the names, descriptions, and colors of in-game entities.
   */
  public getProcgenUtils() {
    return ProcgenUtils;
  }

  /**
   * Heplful functions for converting between bytes and ids and such.
   */
  public getCheckedTypeUtils() {
    return CheckedTypeUtils;
  }

  /**
   * Helpful for listening to user input events.
   */
  public getUIEventEmitter() {
    return UIEmitter.getInstance();
  }

  public getNotificationsManager() {
    return NotificationManager.getInstance();
  }

  public planetCanUpgrade(planet: Planet) {
    return planetCanUpgrade(planet);
  }

  public loadContract(
    contractAddress: string,
    contractABI: ContractInterface
  ): Promise<Contract> {
    return this.ethConnection.loadContract(contractAddress, contractABI);
  }
}

export default GameManager;
