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
  ChunkFootprint,
  SpaceType,
  Artifact,
  ArtifactId,
  isLocatable,
  VoyageId,
  LocatablePlanet,
} from '../_types/global/GlobalTypes';
import PersistentChunkStore from './PersistentChunkStore';
import { MIN_CHUNK_SIZE } from '../utils/constants';
import ContractsAPI, {
  isUnconfirmedBuyHat,
  isUnconfirmedDepositArtifact,
  isUnconfirmedFindArtifact,
  isUnconfirmedInit,
  isUnconfirmedMove,
  isUnconfirmedUpgrade,
  isUnconfirmedWithdrawArtifact,
} from './ContractsAPI';
import MinerManager, {
  HomePlanetMinerChunkStore,
  MinerManagerEvent,
} from './MinerManager';
import SnarkHelper from './SnarkArgsHelper';
import { WorldCoords } from '../utils/Coordinates';
import _ from 'lodash';

import { SpiralPattern, MiningPattern } from '../utils/MiningPatterns';
import AbstractGameManager from './AbstractGameManager';
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
import { GameEntityMemoryStore } from './GameEntityMemoryStore';
import { address, locationIdToDecStr } from '../utils/CheckedTypeUtils';

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
import EthereumAccountManager from './EthereumAccountManager';
import {
  getRandomActionId,
  locationFromCoords,
  moveShipsDecay,
} from '../utils/Utils';
import NotificationManager from '../utils/NotificationManager';
import { SerializedPlugin } from '../plugins/SerializedPlugin';

class GameManager extends EventEmitter implements AbstractGameManager {
  private readonly account: EthAddress | null;
  private balance: number;
  private balanceInterval: number;
  private readonly players: Map<string, Player>;

  private readonly contractsAPI: ContractsAPI;
  private readonly persistentChunkStore: PersistentChunkStore;
  private readonly snarkHelper: SnarkHelper;
  private readonly entityStore: GameEntityMemoryStore;

  private readonly useMockHash: boolean;

  private minerManager?: MinerManager;
  private hashRate: number;

  private homeLocation: Location | null;

  private readonly contractConstants: ContractConstants;

  private worldRadius: number;

  private get planetRarity(): number {
    return this.contractConstants.PLANET_RARITY;
  }

  private readonly endTimeSeconds: number = 1609372800;

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
    artifacts: Map<ArtifactId, Artifact>
  ) {
    super();

    this.account = account;
    this.balance = balance;
    this.players = players;
    this.worldRadius = worldRadius;

    this.contractConstants = contractConstants;
    this.homeLocation = homeLocation;

    this.entityStore = new GameEntityMemoryStore(
      touchedPlanets,
      allTouchedPlanetIds,
      artifacts,
      persistentChunkStore,
      unprocessedArrivals,
      unprocessedPlanetArrivalIds,
      contractConstants,
      this.endTimeSeconds,
      this.getAccount()
    );
    this.contractsAPI = contractsAPI;
    this.persistentChunkStore = persistentChunkStore;
    this.snarkHelper = snarkHelper;
    this.useMockHash = useMockHash;

    this.balanceInterval = setInterval(() => {
      if (this.account) {
        EthereumAccountManager.getInstance()
          .getBalance(this.account)
          .then((balance) => {
            this.balance = balance;
          });
      }
    }, 5000);

    this.hashRate = 0;
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

  static async create(): Promise<GameManager> {
    // initialize dependencies according to a DAG

    // first we initialize the ContractsAPI and get the user's eth account, and load contract constants + state
    const contractsAPI = await ContractsAPI.create();
    const useMockHash = await contractsAPI.zkChecksDisabled();

    // then we initialize the local storage manager and SNARK helper
    const account = contractsAPI.account;
    const balance = await EthereumAccountManager.getInstance().getBalance(
      account
    );
    const persistentChunkStore = await PersistentChunkStore.create(account);
    const possibleHomes = await persistentChunkStore.getHomeLocations();
    const storedTouchedPlanetIds = await persistentChunkStore.getSavedTouchedPlanetIds();

    const snarkHelper = SnarkHelper.create(useMockHash);

    // get data from the contract
    const contractConstants = await contractsAPI.getConstants();
    const players = await contractsAPI.getPlayers();
    const worldRadius = await contractsAPI.getWorldRadius();

    const arrivals: Map<VoyageId, QueuedArrival> = new Map();
    const planetVoyageIdMap: Map<LocationId, VoyageId[]> = new Map();

    const minedChunks = Array.from(await persistentChunkStore.allChunks());
    const minedPlanetIds = _.flatMap(minedChunks, (c) => c.planetLocations).map(
      (l) => l.hash
    );
    const loadedPlanetIds = await contractsAPI.getTouchedPlanetIds(
      storedTouchedPlanetIds.length
    );

    const allTouchedPlanetIds = storedTouchedPlanetIds.concat(loadedPlanetIds);
    await persistentChunkStore.saveTouchedPlanetIds(allTouchedPlanetIds);

    // only load {arrival data, planet data} for planets that we have mined on this device.
    const planetsToLoad = allTouchedPlanetIds.filter((id) =>
      minedPlanetIds.some((p) => id === p)
    );

    // fetch planets after allArrivals, since an arrival to a new planet might be sent
    // while we are fetching
    const allArrivals = await contractsAPI.getAllArrivals(planetsToLoad);
    const touchedAndMinedPlanets = await contractsAPI.getTouchedPlanets(
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
      knownArtifacts
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
          gameManager.balance = await EthereumAccountManager.getInstance().getBalance(
            gameManager.account
          );
        }
      })
      .on(ContractsAPIEvent.TxReverted, async (unconfirmedTx: SubmittedTx) => {
        gameManager.entityStore.clearUnconfirmedTxIntent(unconfirmedTx);
        gameManager.persistentChunkStore.onEthTxComplete(unconfirmedTx.txHash);
        if (gameManager.account) {
          gameManager.balance = await EthereumAccountManager.getInstance().getBalance(
            gameManager.account
          );
        }
      })
      .on(ContractsAPIEvent.RadiusUpdated, async () => {
        const newRadius = await gameManager.contractsAPI.getWorldRadius();
        gameManager.setRadius(newRadius);
      });

    const unconfirmedTxs = await persistentChunkStore.getUnconfirmedSubmittedEthTxs();
    for (const unconfirmedTx of unconfirmedTxs) {
      // recommits the tx to storage but whatever
      gameManager.contractsAPI.onTxSubmit(unconfirmedTx);
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

  public getAccount(): EthAddress | null {
    return this.account;
  }

  public getContractAddress(): EthAddress {
    return this.contractsAPI.getContractAddress();
  }

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

  public getEndTimeSeconds(): number {
    return this.endTimeSeconds;
  }

  public getEnergyCurveAtPercent(planet: Planet, percent: number): number {
    return this.entityStore.getEnergyCurveAtPercent(planet, percent);
  }

  public getSilverCurveAtPercent(
    planet: Planet,
    percent: number
  ): number | null {
    return this.entityStore.getSilverCurveAtPercent(planet, percent);
  }

  public getUpgrade(branch: number, level: number): Upgrade {
    return this.contractConstants.upgrades[branch][level];
  }

  public getAllPlayers(): Player[] {
    return Array.from(this.players.values());
  }

  public getExploredChunks(): Iterable<ExploredChunkData> {
    return this.persistentChunkStore.allChunks();
  }

  public getWorldRadius(): number {
    return this.worldRadius;
  }

  public getWorldSilver(): number {
    return this.getAllOwnedPlanets().reduce(
      (totalSoFar: number, nextPlanet: Planet) =>
        totalSoFar + nextPlanet.silver,
      0
    );
  }

  public getUniverseTotalEnergy(): number {
    return this.getAllOwnedPlanets().reduce(
      (totalSoFar: number, nextPlanet: Planet) =>
        totalSoFar + nextPlanet.energy,
      0
    );
  }

  public getSilverOfPlayer(player: EthAddress): number {
    return this.getAllOwnedPlanets()
      .filter((planet) => planet.owner === player)
      .reduce(
        (totalSoFar: number, nextPlanet: Planet) =>
          totalSoFar + nextPlanet.silver,
        0
      );
  }

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

  setMiningPattern(pattern: MiningPattern): void {
    if (this.minerManager) {
      this.minerManager.setMiningPattern(pattern);
    }
  }
  getMiningPattern(): MiningPattern | null {
    if (this.minerManager) return this.minerManager.getMiningPattern();
    else return null;
  }

  setMinerCores(nCores: number): void {
    this.minerManager?.setCores(nCores);
  }

  getCurrentlyExploringChunk(): ChunkFootprint | null {
    if (this.minerManager) {
      return this.minerManager.getCurrentlyExploringChunk();
    }
    return null;
  }

  hasJoinedGame(): boolean {
    return this.players.has(this.account as string);
  }

  // gets both deposited artifacts that are on planets i own as well as artifacts i own
  getMyArtifacts(): Artifact[] {
    if (!this.account) return [];
    const ownedByMe = this.entityStore.getArtifactsOwnedBy(this.account);
    const onPlanetsOwnedByMe = this.entityStore.getArtifactsOnPlanetsOwnedBy(
      this.account
    );
    return [...ownedByMe, ...onPlanetsOwnedByMe];
  }

  // can't just hash the coords and ask entityStore since this needs to be fast
  // so we sort of use knownChunks as a cache
  getPlanetWithCoords(coords: WorldCoords): Planet | null {
    return this.entityStore.getPlanetWithCoords(coords);
  }

  // gets a planet by ID. returns empty planet if planet is not in contract
  // planetID must be in the contract or in known chunks, else returns null
  getPlanetWithId(planetId: LocationId): Planet | null {
    return this.entityStore.getPlanetWithId(planetId);
  }

  getPlanetHitboxForCoords(
    coords: WorldCoords,
    radiusMap: Record<PlanetLevel, number>
  ): LocatablePlanet | null {
    return this.entityStore.getPlanetHitboxForCoords(coords, radiusMap);
  }

  // gets an artifact id - copied from above fn. i didn't vet it. - alan
  getArtifactWithId(artifactId: ArtifactId): Artifact | null {
    return this.entityStore.getArtifactById(artifactId);
  }

  // fast query that doesn't update planet if stale
  // returns null if planet is neither in contract nor known chunks
  getPlanetLevel(planetId: LocationId): PlanetLevel | null {
    return this.entityStore.getPlanetLevel(planetId);
  }

  // fast query that doesn't update planet if stale
  // returns null if planet is neither in contract nor known chunks
  getPlanetDetailLevel(planetId: LocationId): number | null {
    if (planetId === this.homeLocation?.hash) {
      return Infinity;
    }
    return this.entityStore.getPlanetDetailLevel(planetId);
  }

  getLocationOfPlanet(planetId: LocationId): Location | null {
    return this.entityStore.getLocationOfPlanet(planetId);
  }

  getAllVoyages(): QueuedArrival[] {
    return this.entityStore.getAllVoyages();
  }

  getAllPlanets(): Iterable<Planet> {
    return this.entityStore.getAllPlanets();
  }

  getAllOwnedPlanets(): Planet[] {
    return this.entityStore.getAllOwnedPlanets();
  }

  getMyPlanets(): Planet[] {
    return this.getAllOwnedPlanets().filter(
      (planet) => planet.owner === this.account
    );
  }

  spaceTypeFromPerlin(perlin: number): SpaceType {
    return this.entityStore.spaceTypeFromPerlin(perlin);
  }

  getHashesPerSec(): number {
    return this.hashRate;
  }

  async getSignedTwitter(twitter: string): Promise<string> {
    return EthereumAccountManager.getInstance().signMessage(twitter);
  }

  getPrivateKey(): string {
    return EthereumAccountManager.getInstance().getPrivateKey();
  }

  getMyBalance(): number {
    if (!this.account) return 0;
    return this.balance;
  }

  getUnconfirmedMoves(): UnconfirmedMove[] {
    return this.entityStore.getUnconfirmedMoves();
  }

  getUnconfirmedUpgrades(): UnconfirmedUpgrade[] {
    return this.entityStore.getUnconfirmedUpgrades();
  }

  // can return undefined
  getHomeCoords(): WorldCoords | null {
    if (!this.homeLocation) return null;
    return {
      x: this.homeLocation.coords.x,
      y: this.homeLocation.coords.y,
    };
  }

  getHomeHash(): LocationId | null {
    return this.homeLocation ? this.homeLocation.hash : null;
  }

  hasMinedChunk(chunkLocation: ChunkFootprint): boolean {
    return this.persistentChunkStore.hasMinedChunk(chunkLocation);
  }

  getPerlinThresholds(): [number, number] {
    return [
      this.contractConstants.PERLIN_THRESHOLD_1,
      this.contractConstants.PERLIN_THRESHOLD_2,
    ];
  }

  startExplore(): void {
    if (this.minerManager) {
      this.minerManager.startExplore();
    }
  }

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
      const addr = address(key);
      const player = this.players.get(addr);
      if (player) player.twitter = addressTwitters[addr];
    }
  }

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

  // TODO: remove beforeRetry: (e: Error) => Promise<boolean>
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

  async addAccount(coords: WorldCoords): Promise<boolean> {
    /*
    const homePlanetId = locationIdFromBigInt(mimcHash(coords.x, coords.y));
    const planet = this.getPlanetWithId(homePlanetId);
    if (!planet || planet.owner !== this.account) {
      return Promise.resolve(false);
    }
    */
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
      // target4 is about 800; universe doesn't expand until virtual radius reaches ~32000
      const UNIFORM_RANDOM_UNTIL = 34000;

      let x: number;
      let y: number;
      let d: number;
      let p: number;

      // only initialize in areas with perlin = PERLIN_THRESHOLD_1 - 1
      // contract will only enforce <= PERLIN_THRESHOLD_1 but there's no reason to
      // initialize in a lower perlin area
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
        (this.worldRadius > UNIFORM_RANDOM_UNTIL && d <= 0.9 * this.worldRadius) // can't be in inner 90%, if worldRadius large enough
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

    if (!GameEntityMemoryStore.isPlanetMineable(planet)) {
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
      .then((snarkArgs) =>
        this.contractsAPI.findArtifact(planet.location, snarkArgs, actionId)
      )
      .catch((err) => {
        this.onTxIntentFail(txIntent, err);
      });

    return this;
  }

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

    try {
      this.contractsAPI.depositArtifact(txIntent);
    } catch (e) {
      this.onTxIntentFail(txIntent, e);
    }
    return this;
  }

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

    try {
      this.contractsAPI.withdrawArtifact(txIntent);
    } catch (e) {
      this.onTxIntentFail(txIntent, e);
    }
    return this;
  }

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
      locationIdToDecStr(planetId),
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

    try {
      this.contractsAPI.upgradePlanet(upgradeArgs, actionId);
    } catch (e) {
      this.onTxIntentFail(txIntent, e);
    }
    return this;
  }

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

    try {
      this.contractsAPI.buyHat(
        locationIdToDecStr(planetId),
        planet.hatLevel,
        actionId
      );
    } catch (e) {
      this.onTxIntentFail(txIntent, e);
    }
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

    try {
      this.contractsAPI.transferOwnership(planetId, newOwner, actionId);
    } catch (e) {
      this.onTxIntentFail(txIntent, e);
    }
    return this;
  }

  private handleTxIntent(txIntent: TxIntent) {
    this.entityStore.onTxIntent(txIntent);
  }

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

  // utils - scripting only

  getMaxMoveDist(planetId: LocationId, sendingPercent: number): number {
    const planet = this.getPlanetWithId(planetId);
    if (!planet) throw new Error('origin planet unknown');
    // log_2(sendingPercent / 5%)
    let ratio = Math.log(sendingPercent / 5) / Math.log(2);
    ratio = Math.max(ratio, 0);
    return ratio * planet.range;
  }

  getDist(fromId: LocationId, toId: LocationId): number {
    const fromLoc = this.entityStore.getLocationOfPlanet(fromId);
    if (!fromLoc) throw new Error('origin location unknown');
    const toLoc = this.entityStore.getLocationOfPlanet(toId);
    if (!toLoc) throw new Error('destination location unknown');

    const { x: fromX, y: fromY } = fromLoc.coords;
    const { x: toX, y: toY } = toLoc.coords;

    return Math.sqrt((fromX - toX) ** 2 + (fromY - toY) ** 2);
  }

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

  getTimeForMove(fromId: LocationId, toId: LocationId): number {
    const from = this.getPlanetWithId(fromId);
    if (!from) throw new Error('origin planet unknown');
    const dist = this.getDist(fromId, toId);
    return dist / (from.speed / 100);
  }

  getTemperature(coords: WorldCoords): number {
    const p = perlin(coords, false);
    return (16 - p) * 16;
  }

  public async loadPlugins(): Promise<SerializedPlugin[]> {
    return this.persistentChunkStore.loadPlugins();
  }

  public async savePlugins(savedPlugins: SerializedPlugin[]): Promise<void> {
    await this.persistentChunkStore.savePlugins(savedPlugins);
  }

  public isPlanetMineable(p: Planet): boolean {
    if (isLocatable(p)) {
      return GameEntityMemoryStore.isPlanetMineable(p);
    }

    return false;
  }
}

export default GameManager;
