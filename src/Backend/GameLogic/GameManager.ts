import {
  BLOCK_EXPLORER_URL,
  CONTRACT_PRECISION,
  EMPTY_ADDRESS,
  MIN_PLANET_LEVEL,
} from '@darkforest_eth/constants';
import type { DarkForest } from '@darkforest_eth/contracts/typechain';
import { monomitter, Monomitter, Subscription } from '@darkforest_eth/events';
import {
  getRange,
  isActivated,
  isLocatable,
  isSpaceShip,
  timeUntilNextBroadcastAvailable,
} from '@darkforest_eth/gamelogic';
import { fakeHash, mimcHash, perlin } from '@darkforest_eth/hashing';
import {
  createContract,
  EthConnection,
  ThrottledConcurrentQueue,
  verifySignature,
  weiToEth,
} from '@darkforest_eth/network';
import { getPlanetName } from '@darkforest_eth/procedural';
import {
  artifactIdToDecStr,
  isUnconfirmedActivateArtifactTx,
  isUnconfirmedBuyHatTx,
  isUnconfirmedCapturePlanetTx,
  isUnconfirmedDeactivateArtifactTx,
  isUnconfirmedDepositArtifactTx,
  isUnconfirmedFindArtifactTx,
  isUnconfirmedInitTx,
  isUnconfirmedInvadePlanetTx,
  isUnconfirmedMoveTx,
  isUnconfirmedProspectPlanetTx,
  isUnconfirmedRevealTx,
  isUnconfirmedUpgradeTx,
  isUnconfirmedWithdrawArtifactTx,
  isUnconfirmedWithdrawSilverTx,
  locationIdFromBigInt,
  locationIdToDecStr,
} from '@darkforest_eth/serde';
import {
  Artifact,
  ArtifactId,
  ArtifactRarity,
  ArtifactType,
  CaptureZone,
  Chunk,
  ClaimedCoords,
  ClaimedLocation,
  Diagnostics,
  EthAddress,
  LocatablePlanet,
  LocationId,
  NetworkHealthSummary,
  Planet,
  PlanetLevel,
  PlanetMessageType,
  PlanetType,
  Player,
  QueuedArrival,
  Radii,
  Rectangle,
  RevealedCoords,
  RevealedLocation,
  Setting,
  SignedMessage,
  SpaceType,
  Transaction,
  TxIntent,
  UnconfirmedActivateArtifact,
  UnconfirmedBuyHat,
  UnconfirmedCapturePlanet,
  UnconfirmedDeactivateArtifact,
  UnconfirmedDepositArtifact,
  UnconfirmedFindArtifact,
  UnconfirmedInit,
  UnconfirmedInvadePlanet,
  UnconfirmedMove,
  UnconfirmedPlanetTransfer,
  UnconfirmedProspectPlanet,
  UnconfirmedReveal,
  UnconfirmedUpgrade,
  UnconfirmedWithdrawArtifact,
  UnconfirmedWithdrawSilver,
  Upgrade,
  VoyageId,
  WorldCoords,
  WorldLocation,
  Wormhole,
} from '@darkforest_eth/types';
import bigInt, { BigInteger } from 'big-integer';
import delay from 'delay';
import { BigNumber, Contract, ContractInterface, providers } from 'ethers';
import { EventEmitter } from 'events';
import NotificationManager from '../../Frontend/Game/NotificationManager';
import { MIN_CHUNK_SIZE } from '../../Frontend/Utils/constants';
import { Diff, generateDiffEmitter, getDisposableEmitter } from '../../Frontend/Utils/EmitterUtils';
import {
  getBooleanSetting,
  getNumberSetting,
  pollSetting,
  setBooleanSetting,
  setSetting,
  settingChanged$,
} from '../../Frontend/Utils/SettingsHooks';
import { TerminalTextStyle } from '../../Frontend/Utils/TerminalTypes';
import UIEmitter from '../../Frontend/Utils/UIEmitter';
import { TerminalHandle } from '../../Frontend/Views/Terminal';
import {
  ContractConstants,
  ContractsAPIEvent,
  MoveArgIdxs,
  MoveArgs,
  ZKArgIdx,
} from '../../_types/darkforest/api/ContractsAPITypes';
import { AddressTwitterMap } from '../../_types/darkforest/api/UtilityServerAPITypes';
import { HashConfig, RevealCountdownInfo } from '../../_types/global/GlobalTypes';
import MinerManager, { HomePlanetMinerChunkStore, MinerManagerEvent } from '../Miner/MinerManager';
import {
  MiningPattern,
  SpiralPattern,
  SwissCheesePattern,
  TowardsCenterPattern,
  TowardsCenterPatternV2,
} from '../Miner/MiningPatterns';
import { eventLogger, EventType } from '../Network/EventLogger';
import { loadLeaderboard } from '../Network/LeaderboardApi';
import { addMessage, deleteMessages, getMessagesOnPlanets } from '../Network/MessageAPI';
import { loadNetworkHealth } from '../Network/NetworkHealthApi';
import {
  disconnectTwitter,
  getAllTwitters,
  verifyTwitterHandle,
} from '../Network/UtilityServerAPI';
import { SerializedPlugin } from '../Plugins/SerializedPlugin';
import PersistentChunkStore from '../Storage/PersistentChunkStore';
import { easeInAnimation, emojiEaseOutAnimation } from '../Utils/Animation';
import SnarkArgsHelper from '../Utils/SnarkArgsHelper';
import { hexifyBigIntNestedArray } from '../Utils/Utils';
import { getEmojiMessage } from './ArrivalUtils';
import { CaptureZoneGenerator, CaptureZonesGeneratedEvent } from './CaptureZoneGenerator';
import { ContractsAPI, makeContractsAPI } from './ContractsAPI';
import { GameObjects } from './GameObjects';
import { InitialGameStateDownloader } from './InitialGameStateDownloader';

export enum GameManagerEvent {
  PlanetUpdate = 'PlanetUpdate',
  DiscoveredNewChunk = 'DiscoveredNewChunk',
  InitializedPlayer = 'InitializedPlayer',
  InitializedPlayerError = 'InitializedPlayerError',
  ArtifactUpdate = 'ArtifactUpdate',
  Moved = 'Moved',
}

class GameManager extends EventEmitter {
  /**
   * This variable contains the internal state of objects that live in the game world.
   */
  private readonly entityStore: GameObjects;

  /**
   * Kind of hacky, but we store a reference to the terminal that the player sees when the initially
   * load into the game. This is the same exact terminal that appears inside the collapsable right
   * bar of the game.
   */
  private readonly terminal: React.MutableRefObject<TerminalHandle | undefined>;

  /**
   * The ethereum address of the player who is currently logged in. We support 'no account',
   * represented by `undefined` in the case when you want to simply load the game state from the
   * contract and view it without be able to make any moves.
   */
  private readonly account: EthAddress | undefined;

  /**
   * Map from ethereum addresses to player objects. This isn't stored in {@link GameObjects},
   * because it's not techincally an entity that exists in the world. A player just controls planets
   * and artifacts that do exist in the world.
   *
   * @todo move this into a new `Players` class.
   */
  private readonly players: Map<string, Player>;

  /**
   * Allows us to make contract calls, and execute transactions. Be careful about how you use this
   * guy. You don't want to cause your client to send an excessive amount of traffic to whatever
   * node you're connected to.
   *
   * Interacting with the blockchain isn't free, and we need to be mindful about about the way our
   * application interacts with the blockchain. The current rate limiting strategy consists of three
   * points:
   *
   * - data that needs to be fetched often should be fetched in bulk.
   * - rate limit smart contract calls (reads from the blockchain), implemented by
   *   {@link ContractCaller} and transactions (writes to the blockchain on behalf of the player),
   *   implemented by {@link TxExecutor} via two separately tuned {@link ThrottledConcurrentQueue}s.
   */
  private readonly contractsAPI: ContractsAPI;

  /**
   * An object that syncs any newly added or deleted chunks to the player's IndexedDB.
   *
   * @todo it also persists other game data to IndexedDB. This class needs to be renamed `GameSaver`
   * or something like that.
   */
  private readonly persistentChunkStore: PersistentChunkStore;

  /**
   * Responsible for generating snark proofs.
   */
  private readonly snarkHelper: SnarkArgsHelper;

  /**
   * In debug builds of the game, we can connect to a set of contracts deployed to a local
   * blockchain, which are tweaked to not verify planet hashes, meaning we can use a faster hash
   * function with similar properties to mimc. This allows us to mine the map faster in debug mode.
   *
   * @todo move this into a separate `GameConfiguration` class.
   */
  private readonly useMockHash: boolean;

  /**
   * Game parameters set by the contract. Stuff like perlin keys, which are important for mining the
   * correct universe, or the time multiplier, which allows us to tune how quickly voyages go.
   *
   * @todo move this into a separate `GameConfiguration` class.
   */
  private readonly contractConstants: ContractConstants;

  private paused: boolean;

  /**
   * @todo change this to the correct timestamp each round.
   */
  private readonly endTimeSeconds: number = 1948939200; // new Date("2031-10-05T04:00:00.000Z").getTime() / 1000

  /**
   * An interface to the blockchain that is a little bit lower-level than {@link ContractsAPI}. It
   * allows us to do basic operations such as wait for a transaction to complete, check the player's
   * address and balance, etc.
   */
  private readonly ethConnection: EthConnection;

  /**
   * Each round we change the hash configuration of the game. The hash configuration is download
   * from the blockchain, and essentially acts as a salt, permuting the universe into a unique
   * configuration for each new round.
   *
   * @todo deduplicate this and `useMockHash` somehow.
   */
  private readonly hashConfig: HashConfig;

  /**
   * The aforementioned hash function. In debug mode where `DISABLE_ZK_CHECKS` is on, we use a
   * faster hash function. Othewise, in production mode, use MiMC hash (https://byt3bit.github.io/primesym/).
   */
  private readonly planetHashMimc: (...inputs: number[]) => BigInteger;

  /**
   * Whenever we refresh the players twitter accounts or scores, we publish an event here.
   */
  public readonly playersUpdated$: Monomitter<void>;

  /**
   * Handle to an interval that periodically uploads diagnostic information from this client.
   */
  private diagnosticsInterval: ReturnType<typeof setInterval>;

  /**
   * Handle to an interval that periodically refreshes some information about the player from the
   * blockchain.
   *
   * @todo move this into a new `PlayerState` class.
   */
  private playerInterval: ReturnType<typeof setInterval>;

  /**
   * Handle to an interval that periodically refreshes the scoreboard from our webserver.
   */
  private scoreboardInterval: ReturnType<typeof setInterval>;

  /**
   * Handle to an interval that periodically refreshes the network's health from our webserver.
   */
  private networkHealthInterval: ReturnType<typeof setInterval>;

  /**
   * Manages the process of mining new space territory.
   */
  private minerManager?: MinerManager;

  /**
   * Continuously updated value representing the total hashes per second that the game is currently
   * mining the universe at.
   *
   * @todo keep this in {@link MinerManager}
   */
  private hashRate: number;

  /**
   * The spawn location of the current player.
   *
   * @todo, make this smarter somehow. It's really annoying to have to import world coordinates, and
   * get them wrong or something. Maybe we need to mark a planet, once it's been initialized
   * contract-side, as the homeworld of the user who initialized on it. That way, when you import a
   * new account into the game, and you import map data that contains your home planet, the client
   * would be able to automatically detect which planet is the player's home planet.
   *
   * @todo move this into a new `PlayerState` class.
   */
  private homeLocation: WorldLocation | undefined;

  /**
   * Sometimes the universe gets bigger... Sometimes it doesn't.
   *
   * @todo move this into a new `GameConfiguration` class.
   */
  private worldRadius: number;

  /**
   * Emits whenever we load the network health summary from the webserver, which is derived from
   * diagnostics that the client sends up to the webserver as well.
   */
  public networkHealth$: Monomitter<NetworkHealthSummary>;

  public paused$: Monomitter<boolean>;

  /**
   * Diagnostic information about the game.
   */
  private diagnostics: Diagnostics;

  /**
   * Subscription to act on setting changes
   */
  private settingsSubscription: Subscription | undefined;

  /**
   * Setting to allow players to start game without plugins that were running during the previous
   * run of the game client. By default, the game launches plugins that were running that were
   * running when the game was last closed.
   */
  private safeMode: boolean;

  public get planetRarity(): number {
    return this.contractConstants.PLANET_RARITY;
  }

  /**
   * Generates capture zones.
   */
  private captureZoneGenerator: CaptureZoneGenerator | undefined;

  private constructor(
    terminal: React.MutableRefObject<TerminalHandle | undefined>,
    account: EthAddress | undefined,
    players: Map<string, Player>,
    touchedPlanets: Map<LocationId, Planet>,
    allTouchedPlanetIds: Set<LocationId>,
    revealedCoords: Map<LocationId, RevealedCoords>,
    claimedCoords: Map<LocationId, ClaimedCoords>,
    worldRadius: number,
    unprocessedArrivals: Map<VoyageId, QueuedArrival>,
    unprocessedPlanetArrivalIds: Map<LocationId, VoyageId[]>,
    contractsAPI: ContractsAPI,
    contractConstants: ContractConstants,
    persistentChunkStore: PersistentChunkStore,
    snarkHelper: SnarkArgsHelper,
    homeLocation: WorldLocation | undefined,
    useMockHash: boolean,
    artifacts: Map<ArtifactId, Artifact>,
    ethConnection: EthConnection,
    paused: boolean
  ) {
    super();

    this.diagnostics = {
      rpcUrl: 'unknown',
      totalPlanets: 0,
      visiblePlanets: 0,
      visibleChunks: 0,
      fps: 0,
      chunkUpdates: 0,
      callsInQueue: 0,
      totalCalls: 0,
      totalTransactions: 0,
      transactionsInQueue: 0,
      totalChunks: 0,
      width: 0,
      height: 0,
    };
    this.terminal = terminal;
    this.account = account;
    this.players = players;
    this.worldRadius = worldRadius;
    this.networkHealth$ = monomitter(true);
    this.paused$ = monomitter(true);
    this.playersUpdated$ = monomitter();

    if (contractConstants.CAPTURE_ZONES_ENABLED) {
      this.captureZoneGenerator = new CaptureZoneGenerator(
        this,
        contractConstants.GAME_START_BLOCK,
        contractConstants.CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL
      );
    }

    this.hashConfig = {
      planetHashKey: contractConstants.PLANETHASH_KEY,
      spaceTypeKey: contractConstants.SPACETYPE_KEY,
      biomebaseKey: contractConstants.BIOMEBASE_KEY,
      perlinLengthScale: contractConstants.PERLIN_LENGTH_SCALE,
      perlinMirrorX: contractConstants.PERLIN_MIRROR_X,
      perlinMirrorY: contractConstants.PERLIN_MIRROR_Y,
      planetRarity: contractConstants.PLANET_RARITY,
    };
    this.planetHashMimc = useMockHash
      ? fakeHash(this.hashConfig.planetRarity)
      : mimcHash(this.hashConfig.planetHashKey);

    this.contractConstants = contractConstants;
    this.homeLocation = homeLocation;

    const revealedLocations = new Map<LocationId, RevealedLocation>();
    for (const [locationId, coords] of revealedCoords) {
      const planet = touchedPlanets.get(locationId);
      if (planet) {
        const location: WorldLocation = {
          hash: locationId,
          coords,
          perlin: planet.perlin,
          biomebase: this.biomebasePerlin(coords, true),
        };
        revealedLocations.set(locationId, { ...location, revealer: coords.revealer });
      }
    }

    const claimedLocations = new Map<LocationId, ClaimedLocation>();

    for (const [locationId, coords] of claimedCoords) {
      const planet = touchedPlanets.get(locationId);

      if (planet) {
        const location: WorldLocation = {
          hash: locationId,
          coords,
          perlin: planet.perlin,
          biomebase: this.biomebasePerlin(coords, true),
        };

        const revealedLocation = { ...location, revealer: coords.revealer };

        revealedLocations.set(locationId, revealedLocation);
        claimedLocations.set(locationId, revealedLocation);
      }
    }

    this.entityStore = new GameObjects(
      account,
      touchedPlanets,
      allTouchedPlanetIds,
      revealedLocations,
      claimedLocations,
      artifacts,
      persistentChunkStore.allChunks(),
      unprocessedArrivals,
      unprocessedPlanetArrivalIds,
      contractConstants,
      worldRadius
    );

    this.contractsAPI = contractsAPI;
    this.persistentChunkStore = persistentChunkStore;
    this.snarkHelper = snarkHelper;
    this.useMockHash = useMockHash;
    this.paused = paused;

    this.ethConnection = ethConnection;

    this.diagnosticsInterval = setInterval(this.uploadDiagnostics.bind(this), 10_000);
    this.scoreboardInterval = setInterval(this.refreshScoreboard.bind(this), 10_000);
    this.networkHealthInterval = setInterval(this.refreshNetworkHealth.bind(this), 10_000);

    this.playerInterval = setInterval(() => {
      if (this.account) {
        this.hardRefreshPlayer(this.account);
      }
    }, 5000);

    this.hashRate = 0;

    this.settingsSubscription = settingChanged$.subscribe((setting: Setting) => {
      if (setting === Setting.MiningCores) {
        if (this.minerManager) {
          const config = {
            contractAddress: this.getContractAddress(),
            account: this.account,
          };
          const cores = getNumberSetting(config, Setting.MiningCores);
          this.minerManager.setCores(cores);
        }
      }
    });

    this.refreshScoreboard();
    this.refreshNetworkHealth();
    this.getSpaceships();

    this.safeMode = false;
  }

  private async uploadDiagnostics() {
    eventLogger.logEvent(EventType.Diagnostics, this.diagnostics);
  }

  private async refreshNetworkHealth() {
    try {
      this.networkHealth$.publish(await loadNetworkHealth());
    } catch (e) {
      // @todo - what do we do if we can't connect to the webserver
    }
  }

  private async refreshScoreboard() {
    try {
      const leaderboard = await loadLeaderboard();

      for (const entry of leaderboard.entries) {
        const player = this.players.get(entry.ethAddress);
        if (player) {
          // current player's score is updated via `this.playerInterval`
          if (player.address !== this.account && entry.score !== undefined) {
            player.score = entry.score;
          }
        }
      }

      this.playersUpdated$.publish();
    } catch (e) {
      // @todo - what do we do if we can't connect to the webserver? in general this should be a
      // valid state of affairs because arenas is a thing.
    }
  }

  public getEthConnection() {
    return this.ethConnection;
  }

  public destroy(): void {
    // removes singletons of ContractsAPI, LocalStorageManager, MinerManager
    if (this.minerManager) {
      this.minerManager.removeAllListeners(MinerManagerEvent.DiscoveredNewChunk);
      this.minerManager.destroy();
    }
    this.contractsAPI.destroy();
    this.persistentChunkStore.destroy();
    clearInterval(this.playerInterval);
    clearInterval(this.diagnosticsInterval);
    clearInterval(this.scoreboardInterval);
    clearInterval(this.networkHealthInterval);
    this.settingsSubscription?.unsubscribe();
  }

  static async create({
    connection,
    terminal,
    contractAddress,
  }: {
    connection: EthConnection;
    terminal: React.MutableRefObject<TerminalHandle | undefined>;
    contractAddress: EthAddress;
  }): Promise<GameManager> {
    if (!terminal.current) {
      throw new Error('you must pass in a handle to a terminal');
    }

    const account = connection.getAddress();

    if (!account) {
      throw new Error('no account on eth connection');
    }

    const gameStateDownloader = new InitialGameStateDownloader(terminal.current);
    const contractsAPI = await makeContractsAPI({ connection, contractAddress });

    terminal.current?.println('Loading game data from disk...');

    const persistentChunkStore = await PersistentChunkStore.create({ account, contractAddress });

    terminal.current?.println('Downloading data from the blockchain...');
    terminal.current?.println('(the contract is very big. this may take a while)');
    terminal.current?.newline();

    const initialState = await gameStateDownloader.download(contractsAPI, persistentChunkStore);
    const possibleHomes = await persistentChunkStore.getHomeLocations();

    terminal.current?.println('');
    terminal.current?.println('Building Index...');

    await persistentChunkStore.saveTouchedPlanetIds(initialState.allTouchedPlanetIds);
    await persistentChunkStore.saveRevealedCoords(initialState.allRevealedCoords);

    const knownArtifacts: Map<ArtifactId, Artifact> = new Map();

    for (let i = 0; i < initialState.loadedPlanets.length; i++) {
      const planet = initialState.touchedAndLocatedPlanets.get(initialState.loadedPlanets[i]);

      if (!planet) {
        continue;
      }

      planet.heldArtifactIds = initialState.heldArtifacts[i].map((a) => a.id);

      for (const heldArtifact of initialState.heldArtifacts[i]) {
        knownArtifacts.set(heldArtifact.id, heldArtifact);
      }
    }

    for (const myArtifact of initialState.myArtifacts) {
      knownArtifacts.set(myArtifact.id, myArtifact);
    }

    for (const artifact of initialState.artifactsOnVoyages) {
      knownArtifacts.set(artifact.id, artifact);
    }

    // figure out what's my home planet
    let homeLocation: WorldLocation | undefined = undefined;
    for (const loc of possibleHomes) {
      if (initialState.allTouchedPlanetIds.includes(loc.hash)) {
        homeLocation = loc;
        await persistentChunkStore.confirmHomeLocation(loc);
        break;
      }
    }

    const hashConfig: HashConfig = {
      planetHashKey: initialState.contractConstants.PLANETHASH_KEY,
      spaceTypeKey: initialState.contractConstants.SPACETYPE_KEY,
      biomebaseKey: initialState.contractConstants.BIOMEBASE_KEY,
      perlinLengthScale: initialState.contractConstants.PERLIN_LENGTH_SCALE,
      perlinMirrorX: initialState.contractConstants.PERLIN_MIRROR_X,
      perlinMirrorY: initialState.contractConstants.PERLIN_MIRROR_Y,
      planetRarity: initialState.contractConstants.PLANET_RARITY,
    };

    const useMockHash = initialState.contractConstants.DISABLE_ZK_CHECKS;
    const snarkHelper = SnarkArgsHelper.create(hashConfig, terminal, useMockHash);

    const gameManager = new GameManager(
      terminal,
      account,
      initialState.players,
      initialState.touchedAndLocatedPlanets,
      new Set(Array.from(initialState.allTouchedPlanetIds)),
      initialState.revealedCoordsMap,
      initialState.claimedCoordsMap
        ? initialState.claimedCoordsMap
        : new Map<LocationId, ClaimedCoords>(),
      initialState.worldRadius,
      initialState.arrivals,
      initialState.planetVoyageIdMap,
      contractsAPI,
      initialState.contractConstants,
      persistentChunkStore,
      snarkHelper,
      homeLocation,
      useMockHash,
      knownArtifacts,
      connection,
      initialState.paused
    );

    gameManager.setPlayerTwitters(initialState.twitters);

    const config = {
      contractAddress,
      account: gameManager.getAccount(),
    };
    pollSetting(config, Setting.AutoApproveNonPurchaseTransactions);

    persistentChunkStore.setDiagnosticUpdater(gameManager);
    contractsAPI.setDiagnosticUpdater(gameManager);

    // important that this happens AFTER we load the game state from the blockchain. Otherwise our
    // 'loading game state' contract calls will be competing with events from the blockchain that
    // are happening now, which makes no sense.
    contractsAPI.setupEventListeners();

    // get twitter handles
    gameManager.refreshTwitters();

    gameManager.listenForNewBlock();

    // set up listeners: whenever ContractsAPI reports some game state update, do some logic
    gameManager.contractsAPI
      .on(ContractsAPIEvent.ArtifactUpdate, async (artifactId: ArtifactId) => {
        await gameManager.hardRefreshArtifact(artifactId);
        gameManager.emit(GameManagerEvent.ArtifactUpdate, artifactId);
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
      .on(ContractsAPIEvent.PlayerUpdate, async (playerId: EthAddress) => {
        await gameManager.hardRefreshPlayer(playerId);
      })
      .on(ContractsAPIEvent.PauseStateChanged, async (paused: boolean) => {
        gameManager.paused = paused;
        gameManager.paused$.publish(paused);
      })
      .on(ContractsAPIEvent.PlanetUpdate, async (planetId: LocationId) => {
        // don't reload planets that you don't have in your map. once a planet
        // is in your map it will be loaded from the contract.
        const localPlanet = gameManager.entityStore.getPlanetWithId(planetId);
        if (localPlanet && isLocatable(localPlanet)) {
          await gameManager.hardRefreshPlanet(planetId);
          gameManager.emit(GameManagerEvent.PlanetUpdate);
        }
      })
      .on(
        ContractsAPIEvent.ArrivalQueued,
        async (_arrivalId: VoyageId, fromId: LocationId, toId: LocationId) => {
          // only reload planets if the toPlanet is in the map
          const localToPlanet = gameManager.entityStore.getPlanetWithId(toId);
          if (localToPlanet && isLocatable(localToPlanet)) {
            await gameManager.bulkHardRefreshPlanets([fromId, toId]);
            gameManager.emit(GameManagerEvent.PlanetUpdate);
          }
        }
      )
      .on(
        ContractsAPIEvent.LocationRevealed,
        async (planetId: LocationId, _revealer: EthAddress) => {
          // TODO: hook notifs or emit event to UI if you want
          await gameManager.hardRefreshPlanet(planetId);
          gameManager.emit(GameManagerEvent.PlanetUpdate);
        }
      )
      .on(ContractsAPIEvent.TxQueued, (tx: Transaction) => {
        gameManager.entityStore.onTxIntent(tx);
      })
      .on(ContractsAPIEvent.TxSubmitted, (tx: Transaction) => {
        gameManager.persistentChunkStore.onEthTxSubmit(tx);
        gameManager.onTxSubmit(tx);
      })
      .on(ContractsAPIEvent.TxConfirmed, async (tx: Transaction) => {
        if (!tx.hash) return; // this should never happen
        gameManager.persistentChunkStore.onEthTxComplete(tx.hash);

        if (isUnconfirmedRevealTx(tx)) {
          await gameManager.hardRefreshPlanet(tx.intent.locationId);
        } else if (isUnconfirmedInitTx(tx)) {
          terminal.current?.println('Loading Home Planet from Blockchain...');
          const retries = 5;
          for (let i = 0; i < retries; i++) {
            const planet = await gameManager.contractsAPI.getPlanetById(tx.intent.locationId);
            if (planet) {
              break;
            } else if (i === retries - 1) {
              console.error("couldn't load player's home planet");
            } else {
              await delay(2000);
            }
          }
          await gameManager.hardRefreshPlanet(tx.intent.locationId);
          // mining manager should be initialized already via joinGame, but just in case...
          gameManager.initMiningManager(tx.intent.location.coords, 4);
        } else if (isUnconfirmedMoveTx(tx)) {
          const promises = [gameManager.bulkHardRefreshPlanets([tx.intent.from, tx.intent.to])];
          if (tx.intent.artifact) {
            promises.push(gameManager.hardRefreshArtifact(tx.intent.artifact));
          }
          await Promise.all(promises);
        } else if (isUnconfirmedUpgradeTx(tx)) {
          await gameManager.hardRefreshPlanet(tx.intent.locationId);
        } else if (isUnconfirmedBuyHatTx(tx)) {
          await gameManager.hardRefreshPlanet(tx.intent.locationId);
        } else if (isUnconfirmedInitTx(tx)) {
          await gameManager.hardRefreshPlanet(tx.intent.locationId);
        } else if (isUnconfirmedFindArtifactTx(tx)) {
          await gameManager.hardRefreshPlanet(tx.intent.planetId);
        } else if (isUnconfirmedDepositArtifactTx(tx)) {
          await Promise.all([
            gameManager.hardRefreshPlanet(tx.intent.locationId),
            gameManager.hardRefreshArtifact(tx.intent.artifactId),
          ]);
        } else if (isUnconfirmedWithdrawArtifactTx(tx)) {
          await Promise.all([
            await gameManager.hardRefreshPlanet(tx.intent.locationId),
            await gameManager.hardRefreshArtifact(tx.intent.artifactId),
          ]);
        } else if (isUnconfirmedProspectPlanetTx(tx)) {
          await gameManager.softRefreshPlanet(tx.intent.planetId);
        } else if (isUnconfirmedActivateArtifactTx(tx)) {
          await Promise.all([
            gameManager.hardRefreshPlanet(tx.intent.locationId),
            gameManager.hardRefreshArtifact(tx.intent.artifactId),
          ]);
        } else if (isUnconfirmedDeactivateArtifactTx(tx)) {
          await Promise.all([
            gameManager.hardRefreshPlanet(tx.intent.locationId),
            gameManager.hardRefreshArtifact(tx.intent.artifactId),
          ]);
        } else if (isUnconfirmedWithdrawSilverTx(tx)) {
          await gameManager.softRefreshPlanet(tx.intent.locationId);
        } else if (isUnconfirmedCapturePlanetTx(tx)) {
          await Promise.all([
            gameManager.hardRefreshPlayer(gameManager.getAccount()),
            gameManager.hardRefreshPlanet(tx.intent.locationId),
          ]);
        } else if (isUnconfirmedInvadePlanetTx(tx)) {
          await Promise.all([
            gameManager.hardRefreshPlayer(gameManager.getAccount()),
            gameManager.hardRefreshPlanet(tx.intent.locationId),
          ]);
        }

        gameManager.entityStore.clearUnconfirmedTxIntent(tx);
        gameManager.onTxConfirmed(tx);
      })
      .on(ContractsAPIEvent.TxErrored, async (tx: Transaction) => {
        gameManager.entityStore.clearUnconfirmedTxIntent(tx);
        if (tx.hash) {
          gameManager.persistentChunkStore.onEthTxComplete(tx.hash);
        }
        gameManager.onTxReverted(tx);
      })
      .on(ContractsAPIEvent.TxCancelled, async (tx: Transaction) => {
        gameManager.onTxCancelled(tx);
      })
      .on(ContractsAPIEvent.RadiusUpdated, async () => {
        const newRadius = await gameManager.contractsAPI.getWorldRadius();
        gameManager.setRadius(newRadius);
      });

    const unconfirmedTxs = await persistentChunkStore.getUnconfirmedSubmittedEthTxs();
    const confirmationQueue = new ThrottledConcurrentQueue({
      invocationIntervalMs: 1000,
      maxInvocationsPerIntervalMs: 10,
      maxConcurrency: 1,
    });

    for (const unconfirmedTx of unconfirmedTxs) {
      confirmationQueue.add(async () => {
        const tx = gameManager.contractsAPI.txExecutor.waitForTransaction(unconfirmedTx);
        gameManager.contractsAPI.emitTransactionEvents(tx);
        return tx.confirmedPromise;
      });
    }

    // we only want to initialize the mining manager if the player has already joined the game
    // if they haven't, we'll do this once the player has joined the game
    if (!!homeLocation && initialState.players.has(account as string)) {
      gameManager.initMiningManager(homeLocation.coords);
    }

    return gameManager;
  }

  private async hardRefreshPlayer(address?: EthAddress): Promise<void> {
    if (!address) return;
    const playerFromBlockchain = await this.contractsAPI.getPlayerById(address);
    if (!playerFromBlockchain) return;

    const localPlayer = this.getPlayer(address);

    if (localPlayer?.twitter) {
      playerFromBlockchain.twitter = localPlayer.twitter;
    }

    this.players.set(address, playerFromBlockchain);
    this.playersUpdated$.publish();
  }

  // Dirty hack for only refreshing properties on a planet and nothing else
  private async softRefreshPlanet(planetId: LocationId): Promise<void> {
    const planet = await this.contractsAPI.getPlanetById(planetId);
    if (!planet) return;
    this.entityStore.replacePlanetFromContractData(planet);
  }

  public async hardRefreshPlanet(planetId: LocationId): Promise<void> {
    const planet = await this.contractsAPI.getPlanetById(planetId);
    if (!planet) return;
    const arrivals = await this.contractsAPI.getArrivalsForPlanet(planetId);
    const artifactsOnPlanets = await this.contractsAPI.bulkGetArtifactsOnPlanets([planetId]);
    const artifactsOnPlanet = artifactsOnPlanets[0];

    const revealedCoords = await this.contractsAPI.getRevealedCoordsByIdIfExists(planetId);
    let revealedLocation: RevealedLocation | undefined;
    let claimedCoords: ClaimedCoords | undefined;

    if (revealedCoords) {
      revealedLocation = {
        ...this.locationFromCoords(revealedCoords),
        revealer: revealedCoords.revealer,
      };
    }

    this.entityStore.replacePlanetFromContractData(
      planet,
      arrivals,
      artifactsOnPlanet.map((a) => a.id),
      revealedLocation,
      claimedCoords?.revealer
    );

    // it's important that we reload the artifacts that are on the planet after the move
    // completes because this move could have been a photoid canon move. one of the side
    // effects of this type of move is that the active photoid canon deactivates upon a move
    // meaning we need to reload its data from the blockchain.
    artifactsOnPlanet.forEach((a) => this.entityStore.replaceArtifactFromContractData(a));
  }

  private async bulkHardRefreshPlanets(planetIds: LocationId[]): Promise<void> {
    const planetVoyageMap: Map<LocationId, QueuedArrival[]> = new Map();

    const allVoyages = await this.contractsAPI.getAllArrivals(planetIds);
    const planetsToUpdateMap = await this.contractsAPI.bulkGetPlanets(planetIds);
    const artifactsOnPlanets = await this.contractsAPI.bulkGetArtifactsOnPlanets(planetIds);
    planetsToUpdateMap.forEach((planet, locId) => {
      if (planetsToUpdateMap.has(locId)) {
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

    for (let i = 0; i < planetIds.length; i++) {
      const planetId = planetIds[i];
      const planet = planetsToUpdateMap.get(planetId);

      // This shouldn't really happen, but we are better off being safe - opposed to throwing
      if (!planet) {
        continue;
      }

      const voyagesForPlanet = planetVoyageMap.get(planet.locationId);
      if (voyagesForPlanet) {
        this.entityStore.replacePlanetFromContractData(
          planet,
          voyagesForPlanet,
          artifactsOnPlanets[i].map((a) => a.id)
        );
      }
    }

    for (const artifacts of artifactsOnPlanets) {
      this.entityStore.replaceArtifactsFromContractData(artifacts);
    }
  }

  public async hardRefreshArtifact(artifactId: ArtifactId): Promise<void> {
    const artifact = await this.contractsAPI.getArtifactById(artifactId);
    if (!artifact) return;
    this.entityStore.replaceArtifactFromContractData(artifact);
  }

  private onTxSubmit(tx: Transaction): void {
    this.terminal.current?.print(`${tx.intent.methodName} transaction (`, TerminalTextStyle.Blue);
    this.terminal.current?.printLink(
      `${tx.hash?.slice(0, 6) ?? ''}`,
      () => {
        window.open(`${BLOCK_EXPLORER_URL}/${tx.hash ?? ''}`);
      },
      TerminalTextStyle.White
    );
    this.terminal.current?.println(`) submitted`, TerminalTextStyle.Blue);
  }

  private onTxConfirmed(tx: Transaction) {
    this.terminal.current?.print(`${tx.intent.methodName} transaction (`, TerminalTextStyle.Green);
    this.terminal.current?.printLink(
      `${tx.hash?.slice(0, 6) ?? ''}`,
      () => {
        window.open(`${BLOCK_EXPLORER_URL}/${tx.hash ?? ''}`);
      },
      TerminalTextStyle.White
    );
    this.terminal.current?.println(`) confirmed`, TerminalTextStyle.Green);
  }

  private onTxReverted(tx: Transaction) {
    this.terminal.current?.print(`${tx.intent.methodName} transaction (`, TerminalTextStyle.Red);
    this.terminal.current?.printLink(
      `${tx.hash?.slice(0, 6) ?? ''}`,
      () => {
        window.open(`${BLOCK_EXPLORER_URL}/${tx.hash ?? ''}`);
      },
      TerminalTextStyle.White
    );

    this.terminal.current?.println(`) reverted`, TerminalTextStyle.Red);
  }

  private onTxCancelled(tx: Transaction) {
    this.entityStore.clearUnconfirmedTxIntent(tx);
    this.terminal.current?.print(`${tx.intent.methodName} transaction (`, TerminalTextStyle.Red);
    this.terminal.current?.printLink(
      `${tx.hash?.slice(0, 6) ?? ''}`,
      () => {
        window.open(`${BLOCK_EXPLORER_URL}/${tx.hash ?? ''}`);
      },
      TerminalTextStyle.White
    );

    this.terminal.current?.println(`) cancelled`, TerminalTextStyle.Red);
  }

  /**
   * Gets the address of the player logged into this game manager.
   */
  public getAccount(): EthAddress | undefined {
    return this.account;
  }

  /**
   * Get the thing that handles contract interaction.
   */
  public getContractAPI(): ContractsAPI {
    return this.contractsAPI;
  }

  /**
   * Gets the address of the `DarkForest` contract, which is the 'backend' of the game.
   */
  public getContractAddress(): EthAddress {
    return this.contractsAPI.getContractAddress();
  }

  /**
   * Gets the twitter handle of the given ethereum account which is associated
   * with Dark Forest.
   */
  public getTwitter(address: EthAddress | undefined): string | undefined {
    let myAddress;
    if (!address) myAddress = this.getAccount();
    else myAddress = address;

    if (!myAddress) {
      return undefined;
    }
    const twitter = this.players.get(myAddress)?.twitter;
    return twitter;
  }

  /**
   * The game ends at a particular time in the future - get this time measured
   * in seconds from the epoch.
   */
  public getEndTimeSeconds(): number {
    return this.endTimeSeconds;
  }

  /**
   * Dark Forest tokens can only be minted up to a certain time - get this time measured in seconds from epoch.
   */
  public getTokenMintEndTimeSeconds(): number {
    return this.contractConstants.TOKEN_MINT_END_SECONDS;
  }

  /**
   * Gets the rarity of planets in the universe
   */
  public getPlanetRarity(): number {
    return this.contractConstants.PLANET_RARITY;
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
   * doesn't produce silver, returns undefined if already over percent% of silcap,
   */
  public getSilverCurveAtPercent(planet: Planet, percent: number): number | undefined {
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
   * Gets either the given player, or if no address was provided, gets the player that is logged
   * this client.
   */
  public getPlayer(address?: EthAddress): Player | undefined {
    address = address || this.account;

    if (!address) {
      return undefined;
    }

    return this.players.get(address);
  }

  /**
   * Gets all the map chunks that this client is aware of. Chunks may have come from
   * mining, or from importing map data.
   */
  public getExploredChunks(): Iterable<Chunk> {
    return this.persistentChunkStore.allChunks();
  }

  /**
   * Gets the ids of all the planets that are both within the given bounding box (defined by its bottom
   * left coordinate, width, and height) in the world and of a level that was passed in via the
   * `planetLevels` parameter.
   */
  public getPlanetsInWorldRectangle(
    worldX: number,
    worldY: number,
    worldWidth: number,
    worldHeight: number,
    levels: number[],
    planetLevelToRadii: Map<number, Radii>,
    updateIfStale = true
  ): LocatablePlanet[] {
    return this.entityStore.getPlanetsInWorldRectangle(
      worldX,
      worldY,
      worldWidth,
      worldHeight,
      levels,
      planetLevelToRadii,
      updateIfStale
    );
  }

  /**
   * Returns whether or not the current round has ended.
   */
  public isRoundOver(): boolean {
    return Date.now() / 1000 > this.getTokenMintEndTimeSeconds();
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
      (totalSoFar: number, nextPlanet: Planet) => totalSoFar + nextPlanet.silver,
      0
    );
  }

  /**
   * Gets the total amount of energy that lives on a planet that somebody owns.
   */
  public getUniverseTotalEnergy(): number {
    return this.getAllOwnedPlanets().reduce(
      (totalSoFar: number, nextPlanet: Planet) => totalSoFar + nextPlanet.energy,
      0
    );
  }

  /**
   * Gets the total amount of silver that lives on planets that the given player owns.
   */
  public getSilverOfPlayer(player: EthAddress): number {
    return this.getAllOwnedPlanets()
      .filter((planet) => planet.owner === player)
      .reduce((totalSoFar: number, nextPlanet: Planet) => totalSoFar + nextPlanet.silver, 0);
  }

  /**
   * Gets the total amount of energy that lives on planets that the given player owns.
   */
  public getEnergyOfPlayer(player: EthAddress): number {
    return this.getAllOwnedPlanets()
      .filter((planet) => planet.owner === player)
      .reduce((totalSoFar: number, nextPlanet: Planet) => totalSoFar + nextPlanet.energy, 0);
  }

  public getPlayerScore(addr: EthAddress): number | undefined {
    const player = this.players.get(addr);
    return player?.score;
  }

  public getPlayerSpaceJunk(addr: EthAddress): number | undefined {
    const player = this.players.get(addr);
    return player?.spaceJunk;
  }

  public getPlayerSpaceJunkLimit(addr: EthAddress): number | undefined {
    const player = this.players.get(addr);
    return player?.spaceJunkLimit;
  }

  public getDefaultSpaceJunkForPlanetLevel(level: number) {
    return this.contractConstants.PLANET_LEVEL_JUNK[level];
  }

  private initMiningManager(homeCoords: WorldCoords, cores?: number): void {
    if (this.minerManager) return;

    const myPattern: MiningPattern = new SpiralPattern(homeCoords, MIN_CHUNK_SIZE);

    this.minerManager = MinerManager.create(
      this.persistentChunkStore,
      myPattern,
      this.worldRadius,
      this.planetRarity,
      this.hashConfig,
      this.useMockHash
    );

    const config = {
      contractAddress: this.getContractAddress(),
      account: this.account,
    };

    this.minerManager.setCores(cores || getNumberSetting(config, Setting.MiningCores));

    this.minerManager.on(
      MinerManagerEvent.DiscoveredNewChunk,
      (chunk: Chunk, miningTimeMillis: number) => {
        this.addNewChunk(chunk);
        this.hashRate = chunk.chunkFootprint.sideLength ** 2 / (miningTimeMillis / 1000);
        this.emit(GameManagerEvent.DiscoveredNewChunk, chunk);
      }
    );

    const isMining = getBooleanSetting(config, Setting.IsMining);
    if (isMining) {
      this.minerManager.startExplore();
    }
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
  getMiningPattern(): MiningPattern | undefined {
    if (this.minerManager) return this.minerManager.getMiningPattern();
    else return undefined;
  }

  /**
   * Set the amount of cores to mine the universe with. More cores equals faster!
   */
  setMinerCores(nCores: number): void {
    const config = {
      contractAddress: this.getContractAddress(),
      account: this.account,
    };
    setSetting(config, Setting.MiningCores, nCores + '');
  }

  /**
   * Whether or not the miner is currently exploring space.
   */
  isMining(): boolean {
    return this.minerManager?.isMining() || false;
  }

  /**
   * Changes the amount of move snark proofs that are cached.
   */
  setSnarkCacheSize(size: number): void {
    this.snarkHelper.setSnarkCacheSize(size);
  }

  /**
   * Gets the rectangle bounding the chunk that the miner is currently in the process
   * of hashing.
   */
  getCurrentlyExploringChunk(): Rectangle | undefined {
    if (this.minerManager) {
      return this.minerManager.getCurrentlyExploringChunk();
    }
    return undefined;
  }

  /**
   * Whether or not this client has successfully found and landed on a home planet.
   */
  hasJoinedGame(): boolean {
    return this.players.has(this.account as string);
  }

  /**
   * Returns info about the next time you can broadcast coordinates
   */
  getNextRevealCountdownInfo(): RevealCountdownInfo {
    if (!this.account) {
      throw new Error('no account set');
    }
    const myLastRevealTimestamp = this.players.get(this.account)?.lastRevealTimestamp;
    return {
      myLastRevealTimestamp: myLastRevealTimestamp || undefined,
      currentlyRevealing: this.entityStore.transactions.hasTransaction(isUnconfirmedRevealTx),
      revealCooldownTime: this.contractConstants.LOCATION_REVEAL_COOLDOWN,
    };
  }

  /**
   * gets both deposited artifacts that are on planets i own as well as artifacts i own
   */
  getMyArtifacts(): Artifact[] {
    if (!this.account) return [];
    const ownedByMe = this.entityStore.getArtifactsOwnedBy(this.account);
    const onPlanetsOwnedByMe = this.entityStore
      .getArtifactsOnPlanetsOwnedBy(this.account)
      // filter out space ships because they always show up
      // in the `ownedByMe` array.
      .filter((a) => !isSpaceShip(a.artifactType));

    return [...ownedByMe, ...onPlanetsOwnedByMe];
  }

  /**
   * Gets the planet that is located at the given coordinates. Returns undefined if not a valid
   * location or if no planet exists at location. If the planet needs to be updated (because
   * some time has passed since we last updated the planet), then updates that planet first.
   */
  getPlanetWithCoords(coords: WorldCoords): LocatablePlanet | undefined {
    return this.entityStore.getPlanetWithCoords(coords);
  }

  /**
   * Gets the planet with the given hash. Returns undefined if the planet is neither in the contract
   * nor has been discovered locally. If the planet needs to be updated (because some time has
   * passed since we last updated the planet), then updates that planet first.
   */
  getPlanetWithId(planetId: LocationId | undefined): Planet | undefined {
    return planetId && this.entityStore.getPlanetWithId(planetId);
  }

  /**
   * Gets a list of planets in the client's memory with the given ids. If a planet with the given id
   * doesn't exist, no entry for that planet will be returned in the result.
   */
  getPlanetsWithIds(planetId: LocationId[]): Planet[] {
    return planetId.map((id) => this.getPlanetWithId(id)).filter((p) => !!p) as Planet[];
  }

  getStalePlanetWithId(planetId: LocationId): Planet | undefined {
    return this.entityStore.getPlanetWithId(planetId, false);
  }

  /**
   * Get the score of the currently logged-in account.
   */
  getMyScore(): number | undefined {
    if (!this.account) {
      return undefined;
    }
    const player = this.players.get(this.account);
    return player?.score;
  }

  /**
   * Gets the artifact with the given id. Null if no artifact with id exists.
   */
  getArtifactWithId(artifactId?: ArtifactId): Artifact | undefined {
    return this.entityStore.getArtifactById(artifactId);
  }

  /**
   * Gets the artifacts with the given ids, including ones we know exist but haven't been loaded,
   * represented by `undefined`.
   */
  getArtifactsWithIds(artifactIds: ArtifactId[] = []): Array<Artifact | undefined> {
    return artifactIds.map((id) => this.getArtifactWithId(id));
  }

  /**
   * Gets the level of the given planet. Returns undefined if the planet does not exist. Does
   * NOT update the planet if the planet is stale, which means this function is fast.
   */
  getPlanetLevel(planetId: LocationId): PlanetLevel | undefined {
    return this.entityStore.getPlanetLevel(planetId);
  }

  /**
   * Gets the location of the given planet. Returns undefined if the planet does not exist, or if
   * we do not know the location of this planet NOT update the planet if the planet is stale,
   * which means this function is fast.
   */
  getLocationOfPlanet(planetId: LocationId): WorldLocation | undefined {
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
    return this.getAllOwnedPlanets().filter((planet) => planet.owner === this.account);
  }

  /**
   * Gets a map of all location IDs whose coords have been publically revealed
   */
  getRevealedLocations(): Map<LocationId, RevealedLocation> {
    return this.entityStore.getRevealedLocations();
  }

  /**
   * Gets a map of all location IDs which have been claimed.
   */
  getClaimedLocations(): Map<LocationId, ClaimedLocation> {
    return this.entityStore.getClaimedLocations();
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
  getPrivateKey(): string | undefined {
    return this.ethConnection.getPrivateKey();
  }

  /**
   * Gets the balance of the account measured in Eth (i.e. in full units of the chain).
   */
  getMyBalanceEth(): number {
    if (!this.account) return 0;
    return weiToEth(this.getMyBalance());
  }

  /**
   * Gets the balance of the account
   */
  getMyBalance(): BigNumber {
    return this.ethConnection.getMyBalance() || BigNumber.from('0');
  }

  /**
   * Returns the monomitter which publishes events whenever the player's balance changes.
   */
  getMyBalance$(): Monomitter<BigNumber> {
    return this.ethConnection.myBalance$;
  }

  /**
   * Gets all moves that this client has queued to be uploaded to the contract, but
   * have not been successfully confirmed yet.
   */
  getUnconfirmedMoves(): Transaction<UnconfirmedMove>[] {
    return this.entityStore.transactions.getTransactions(isUnconfirmedMoveTx);
  }

  /**
   * Gets all upgrades that this client has queued to be uploaded to the contract, but
   * have not been successfully confirmed yet.
   */
  getUnconfirmedUpgrades(): Transaction<UnconfirmedUpgrade>[] {
    return this.entityStore.transactions.getTransactions(isUnconfirmedUpgradeTx);
  }

  getUnconfirmedWormholeActivations(): Transaction<UnconfirmedActivateArtifact>[] {
    return this.entityStore.transactions
      .getTransactions(isUnconfirmedActivateArtifactTx)
      .filter((tx) => tx.intent.wormholeTo !== undefined);
  }

  /**
   * Gets the location of your home planet.
   */
  getHomeCoords(): WorldCoords | undefined {
    if (!this.homeLocation) return undefined;
    return {
      x: this.homeLocation.coords.x,
      y: this.homeLocation.coords.y,
    };
  }

  /**
   * Gets the hash of the location of your home planet.
   */
  getHomeHash(): LocationId | undefined {
    return this.homeLocation?.hash;
  }

  /**
   * Gets the HASH CONFIG
   */
  getHashConfig(): HashConfig {
    return { ...this.hashConfig };
  }

  /**
   * Whether or not the given rectangle has been mined.
   */
  hasMinedChunk(chunkLocation: Rectangle): boolean {
    return this.persistentChunkStore.hasMinedChunk(chunkLocation);
  }

  getChunk(chunkFootprint: Rectangle): Chunk | undefined {
    return this.persistentChunkStore.getChunkByFootprint(chunkFootprint);
  }

  getChunkStore(): PersistentChunkStore {
    return this.persistentChunkStore;
  }

  /**
   * The perlin value at each coordinate determines the space type. There are four space
   * types, which means there are four ranges on the number line that correspond to
   * each space type. This function returns the boundary values between each of these
   * four ranges: `PERLIN_THRESHOLD_1`, `PERLIN_THRESHOLD_2`, `PERLIN_THRESHOLD_3`.
   */
  getPerlinThresholds(): [number, number, number] {
    return [
      this.contractConstants.PERLIN_THRESHOLD_1,
      this.contractConstants.PERLIN_THRESHOLD_2,
      this.contractConstants.PERLIN_THRESHOLD_3,
    ];
  }

  /**
   * Starts the miner.
   */
  startExplore(): void {
    if (this.minerManager) {
      const config = {
        contractAddress: this.getContractAddress(),
        account: this.account,
      };
      setBooleanSetting(config, Setting.IsMining, true);
      this.minerManager.startExplore();
    }
  }

  /**
   * Stops the miner.
   */
  stopExplore(): void {
    if (this.minerManager) {
      const config = {
        contractAddress: this.getContractAddress(),
        account: this.account,
      };
      setBooleanSetting(config, Setting.IsMining, false);
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
    const addressTwitters = await getAllTwitters();
    this.setPlayerTwitters(addressTwitters);
  }

  private setPlayerTwitters(twitters: AddressTwitterMap): void {
    for (const [address, player] of this.players.entries()) {
      const newPlayerTwitter = twitters[address];
      player.twitter = newPlayerTwitter;
    }
    this.playersUpdated$.publish();
  }

  /**
   * Once you have posted the verification tweet - complete the twitter-account-linking
   * process by telling the Dark Forest webserver to look at that tweet.
   */
  async submitVerifyTwitter(twitter: string): Promise<boolean> {
    if (!this.account) return Promise.resolve(false);
    const success = await verifyTwitterHandle(
      await this.ethConnection.signMessageObject({ twitter })
    );
    await this.refreshTwitters();
    return success;
  }

  private checkGameHasEnded(): boolean {
    if (Date.now() / 1000 > this.endTimeSeconds) {
      this.terminal.current?.println('[ERROR] Game has ended.');
      return true;
    }
    return false;
  }

  /**
   * Gets the timestamp (ms) of the next time that we can broadcast the coordinates of a planet.
   */
  public getNextBroadcastAvailableTimestamp() {
    return Date.now() + this.timeUntilNextBroadcastAvailable();
  }

  /**
   * Gets the amount of time (ms) until the next time the current player can broadcast a planet.
   */
  public timeUntilNextBroadcastAvailable() {
    if (!this.account) {
      throw new Error('no account set');
    }

    const myLastRevealTimestamp = this.players.get(this.account)?.lastRevealTimestamp;

    return timeUntilNextBroadcastAvailable(
      myLastRevealTimestamp,
      this.contractConstants.LOCATION_REVEAL_COOLDOWN
    );
  }

  /**
   * Gets the timestamp (ms) of the next time that we can claim a planet.
   */
  public getNextClaimAvailableTimestamp() {
    if (!this.account) {
      throw new Error('no account set');
    }
    const myLastClaimTimestamp = this.players.get(this.account)?.lastClaimTimestamp;

    if (!myLastClaimTimestamp) {
      return Date.now();
    }
    if (!this.contractConstants.CLAIM_PLANET_COOLDOWN) {
      return 0;
    }

    // both the variables in the next line are denominated in seconds
    return (myLastClaimTimestamp + this.contractConstants.CLAIM_PLANET_COOLDOWN) * 1000;
  }

  public getCaptureZones(): Set<CaptureZone> {
    return this.captureZoneGenerator?.getZones() || new Set();
  }

  /**
   * Reveals a planet's location on-chain.
   */
  public async revealLocation(planetId: LocationId): Promise<Transaction<UnconfirmedReveal>> {
    try {
      if (!this.account) {
        throw new Error('no account set');
      }

      const planet = this.entityStore.getPlanetWithId(planetId);

      if (!planet) {
        throw new Error("you can't reveal a planet you haven't discovered");
      }

      if (!isLocatable(planet)) {
        throw new Error("you can't reveal a planet whose coordinates you don't know");
      }

      if (planet.coordsRevealed) {
        throw new Error("this planet's location is already revealed");
      }

      if (planet.transactions?.hasTransaction(isUnconfirmedRevealTx)) {
        throw new Error("you're already revealing this planet's location");
      }

      if (this.entityStore.transactions.hasTransaction(isUnconfirmedRevealTx)) {
        throw new Error("you're already broadcasting coordinates");
      }

      const myLastRevealTimestamp = this.players.get(this.account)?.lastRevealTimestamp;
      if (myLastRevealTimestamp && Date.now() < this.getNextBroadcastAvailableTimestamp()) {
        throw new Error('still on cooldown for broadcasting');
      }

      // this is shitty. used for the popup window
      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-revealLocationId`, planetId);

      const getArgs = async () => {
        const revealArgs = await this.snarkHelper.getRevealArgs(
          planet.location.coords.x,
          planet.location.coords.y
        );

        this.terminal.current?.println(
          'REVEAL: calculated SNARK with args:',
          TerminalTextStyle.Sub
        );
        this.terminal.current?.println(
          JSON.stringify(hexifyBigIntNestedArray(revealArgs.slice(0, 3))),
          TerminalTextStyle.Sub
        );
        this.terminal.current?.newline();

        return revealArgs;
      };

      const txIntent: UnconfirmedReveal = {
        methodName: 'revealLocation',
        contract: this.contractsAPI.contract,
        locationId: planetId,
        location: planet.location,
        args: getArgs(),
      };

      // Always await the submitTransaction so we can catch rejections
      const tx = await this.contractsAPI.submitTransaction(txIntent);

      return tx;
    } catch (e) {
      this.getNotificationsManager().txInitError('revealLocation', e.message);
      throw e;
    }
  }

  public async invadePlanet(locationId: LocationId) {
    try {
      if (!this.captureZoneGenerator) {
        throw new Error('Capture zones are not enabled in this game');
      }

      const planet = this.entityStore.getPlanetWithId(locationId);

      if (!planet || !isLocatable(planet)) {
        throw new Error("you can't invade a planet you haven't discovered");
      }

      if (planet.destroyed) {
        throw new Error("you can't invade destroyed planets");
      }

      if (planet.invader !== EMPTY_ADDRESS) {
        throw new Error("you can't invade planets that have already been invaded");
      }

      if (planet.owner !== this.account) {
        throw new Error('you can only invade planets you own');
      }

      if (!this.captureZoneGenerator.isInZone(planet.locationId)) {
        throw new Error("you can't invade planets that are not in a capture zone");
      }

      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-invadePlanet`, locationId);

      const getArgs = async () => {
        const revealArgs = await this.snarkHelper.getRevealArgs(
          planet.location.coords.x,
          planet.location.coords.y
        );

        this.terminal.current?.println(
          'REVEAL: calculated SNARK with args:',
          TerminalTextStyle.Sub
        );
        this.terminal.current?.println(
          JSON.stringify(hexifyBigIntNestedArray(revealArgs.slice(0, 3))),
          TerminalTextStyle.Sub
        );
        this.terminal.current?.newline();

        return revealArgs;
      };

      const txIntent: UnconfirmedInvadePlanet = {
        methodName: 'invadePlanet',
        contract: this.contractsAPI.contract,
        locationId,
        args: getArgs(),
      };

      const tx = await this.contractsAPI.submitTransaction(txIntent);
      return tx;
    } catch (e) {
      this.getNotificationsManager().txInitError('invadePlanet', e.message);
      throw e;
    }
  }

  public async capturePlanet(locationId: LocationId) {
    try {
      const planet = this.entityStore.getPlanetWithId(locationId);

      if (!planet) {
        throw new Error('planet is not loaded');
      }

      if (planet.destroyed) {
        throw new Error("you can't capture destroyed planets");
      }

      if (planet.capturer !== EMPTY_ADDRESS) {
        throw new Error("you can't capture planets that have already been captured");
      }

      if (planet.owner !== this.account) {
        throw new Error('you can only capture planets you own');
      }

      if (planet.energy < planet.energyCap * 0.8) {
        throw new Error('the planet needs >80% energy before capturing');
      }

      if (
        !planet.invadeStartBlock ||
        this.ethConnection.getCurrentBlockNumber() <
          planet.invadeStartBlock + this.contractConstants.CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED
      ) {
        throw new Error(
          `you need to hold a planet for ${this.contractConstants.CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED} blocks before capturing`
        );
      }

      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-capturePlanet`, locationId);

      const txIntent: UnconfirmedCapturePlanet = {
        methodName: 'capturePlanet',
        contract: this.contractsAPI.contract,
        locationId,
        args: Promise.resolve([locationIdToDecStr(locationId)]),
      };

      const tx = await this.contractsAPI.submitTransaction(txIntent);
      return tx;
    } catch (e) {
      this.getNotificationsManager().txInitError('capturePlanet', e.message);
      throw e;
    }
  }

  /**
   * Attempts to join the game. Should not be called once you've already joined.
   */
  public async joinGame(beforeRetry: (e: Error) => Promise<boolean>): Promise<void> {
    try {
      if (this.checkGameHasEnded()) {
        throw new Error('game has ended');
      }

      const planet = await this.findRandomHomePlanet();
      this.homeLocation = planet.location;
      this.terminal.current?.println('');
      this.terminal.current?.println(`Found Suitable Home Planet: ${getPlanetName(planet)} `);
      this.terminal.current?.println(
        `Its coordinates are: (${planet.location.coords.x}, ${planet.location.coords.y})`
      );
      this.terminal.current?.println('');

      await this.persistentChunkStore.addHomeLocation(planet.location);

      const getArgs = async () => {
        const args = await this.snarkHelper.getInitArgs(
          planet.location.coords.x,
          planet.location.coords.y,
          Math.floor(Math.sqrt(planet.location.coords.x ** 2 + planet.location.coords.y ** 2)) + 1 // floor(sqrt(x^2 + y^2)) + 1
        );
        this.terminal.current?.println('INIT: calculated SNARK with args:', TerminalTextStyle.Sub);
        this.terminal.current?.println(
          JSON.stringify(hexifyBigIntNestedArray(args.slice(0, 3) as unknown as string[])),
          TerminalTextStyle.Sub
        );
        this.terminal.current?.newline();
        return args;
      };

      const txIntent: UnconfirmedInit = {
        methodName: 'initializePlayer',
        contract: this.contractsAPI.contract,
        locationId: planet.location.hash,
        location: planet.location,
        args: getArgs(),
      };

      this.terminal.current?.println('INIT: proving that planet exists', TerminalTextStyle.Sub);

      this.initMiningManager(planet.location.coords); // get an early start

      // if player initialization causes an error, give the caller an opportunity
      // to resolve that error. if the asynchronous `beforeRetry` function returns
      // true, retry initializing the player. if it returns false, or if the
      // `beforeRetry` is undefined, then don't retry and throw an exception.
      while (true) {
        try {
          const tx = await this.contractsAPI.submitTransaction(txIntent);
          await tx.confirmedPromise;
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

      await this.getSpaceships();
      await this.hardRefreshPlanet(planet.locationId);

      this.emit(GameManagerEvent.InitializedPlayer);
    } catch (e) {
      this.getNotificationsManager().txInitError('initializePlayer', e.message);
      throw e;
    }
  }

  private async getSpaceships() {
    if (!this.account || !this.homeLocation?.hash) return;

    const player = await this.contractsAPI.getPlayerById(this.account);
    if (player?.claimedShips) return;

    if (this.getGameObjects().isGettingSpaceships()) return;
    const tx = await this.contractsAPI.submitTransaction({
      methodName: 'giveSpaceShips',
      contract: this.contractsAPI.contract,
      args: Promise.resolve(['0x' + this.homeLocation?.hash]),
    });
    await tx.confirmedPromise;
    this.hardRefreshPlanet(this.homeLocation?.hash);
  }

  // this is slow, do not call in i.e. render/draw loop
  /**
   *
   * computes the WorldLocation object corresponding to a set of coordinates
   * very slow since it actually calculates the hash; do not use in render loop
   */
  private locationFromCoords(coords: WorldCoords): WorldLocation {
    return {
      coords,
      hash: locationIdFromBigInt(this.planetHashMimc(coords.x, coords.y)),
      perlin: this.spaceTypePerlin(coords, true),
      biomebase: this.biomebasePerlin(coords, true),
    };
  }

  /**
   * Initializes a new player's game to start at the given home planet. Must have already
   * initialized the player on the contract.
   */
  async addAccount(coords: WorldCoords): Promise<boolean> {
    const loc: WorldLocation = this.locationFromCoords(coords);
    await this.persistentChunkStore.addHomeLocation(loc);
    this.initMiningManager(coords);
    this.homeLocation = loc;
    return true;
  }

  private async findRandomHomePlanet(): Promise<LocatablePlanet> {
    return new Promise<LocatablePlanet>((resolve, reject) => {
      const initPerlinMin = this.contractConstants.INIT_PERLIN_MIN;
      const initPerlinMax = this.contractConstants.INIT_PERLIN_MAX;
      let minedChunksCount = 0;

      let x: number;
      let y: number;
      let d: number;
      let p: number;

      // if this.contractConstants.SPAWN_RIM_AREA is non-zero, then players must spawn in that
      // area, distributed evenly in the inner perimeter of the world
      let spawnInnerRadius = Math.sqrt(
        Math.max(Math.PI * this.worldRadius ** 2 - this.contractConstants.SPAWN_RIM_AREA, 0) /
          Math.PI
      );

      if (this.contractConstants.SPAWN_RIM_AREA === 0) {
        spawnInnerRadius = 0;
      }

      do {
        // sample from square
        x = Math.random() * this.worldRadius * 2 - this.worldRadius;
        y = Math.random() * this.worldRadius * 2 - this.worldRadius;
        d = Math.sqrt(x ** 2 + y ** 2);
        p = this.spaceTypePerlin({ x, y }, false);
      } while (
        p >= initPerlinMax || // keep searching if above or equal to the max
        p < initPerlinMin || // keep searching if below the minimum
        d >= this.worldRadius || // can't be out of bound
        d <= spawnInnerRadius // can't be inside spawn area ring
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

      const pattern: MiningPattern = new SpiralPattern({ x, y }, MIN_CHUNK_SIZE);
      const chunkStore = new HomePlanetMinerChunkStore(
        initPerlinMin,
        initPerlinMax,
        this.hashConfig
      );
      const homePlanetFinder = MinerManager.create(
        chunkStore,
        pattern,
        this.worldRadius,
        this.planetRarity,
        this.hashConfig,
        this.useMockHash
      );

      this.terminal.current?.println(``);
      this.terminal.current?.println(`Initializing Home Planet Search...`);
      this.terminal.current?.println(``);
      this.terminal.current?.println(`Chunked explorer: start!`);
      this.terminal.current?.println(
        `Each chunk contains ${MIN_CHUNK_SIZE}x${MIN_CHUNK_SIZE} coordinates.`
      );
      const percentSpawn = (1 / this.contractConstants.PLANET_RARITY) * 100;
      const printProgress = 8;
      this.terminal.current?.print(`Each coordinate has a`);
      this.terminal.current?.print(` ${percentSpawn}%`, TerminalTextStyle.Text);
      this.terminal.current?.print(` chance of spawning a planet.`);
      this.terminal.current?.println('');

      this.terminal.current?.println(
        `Hashing first ${MIN_CHUNK_SIZE ** 2 * printProgress} potential home planets...`
      );

      homePlanetFinder.on(MinerManagerEvent.DiscoveredNewChunk, (chunk: Chunk) => {
        chunkStore.addChunk(chunk);
        minedChunksCount++;
        if (minedChunksCount % printProgress === 0) {
          this.terminal.current?.println(
            `Hashed ${minedChunksCount * MIN_CHUNK_SIZE ** 2} potential home planets...`
          );
        }
        for (const homePlanetLocation of chunk.planetLocations) {
          const planetPerlin = homePlanetLocation.perlin;
          const planetX = homePlanetLocation.coords.x;
          const planetY = homePlanetLocation.coords.y;
          const planetLevel = this.entityStore.planetLevelFromHexPerlin(
            homePlanetLocation.hash,
            homePlanetLocation.perlin
          );
          const planetType = this.entityStore.planetTypeFromHexPerlin(
            homePlanetLocation.hash,
            homePlanetLocation.perlin
          );
          const planet = this.getPlanetWithId(homePlanetLocation.hash);
          const distFromOrigin = Math.sqrt(planetX ** 2 + planetY ** 2);
          if (
            planetPerlin < initPerlinMax &&
            planetPerlin >= initPerlinMin &&
            distFromOrigin < this.worldRadius &&
            distFromOrigin > spawnInnerRadius &&
            planetLevel === MIN_PLANET_LEVEL &&
            planetType === PlanetType.PLANET &&
            (!planet || !planet.isInContract) // init will fail if planet has been initialized in contract already
          ) {
            // valid home planet
            homePlanetFinder.stopExplore();
            homePlanetFinder.destroy();

            const homePlanet = this.getGameObjects().getPlanetWithLocation(homePlanetLocation);

            if (!homePlanet) {
              reject(new Error("Unable to create default planet for your home planet's location."));
            } else {
              // can cast to `LocatablePlanet` because we know its location, as we just mined it.
              resolve(homePlanet as LocatablePlanet);
            }

            break;
          }
        }
      });
      homePlanetFinder.startExplore();
    });
  }

  public async prospectPlanet(
    planetId: LocationId,
    bypassChecks = false
  ): Promise<Transaction<UnconfirmedProspectPlanet>> {
    const planet = this.entityStore.getPlanetWithId(planetId);

    try {
      if (!planet || !isLocatable(planet)) {
        throw new Error("you can't prospect a planet you haven't discovered");
      }

      if (!bypassChecks) {
        if (this.checkGameHasEnded()) throw new Error('game ended');

        if (!planet) {
          throw new Error("you can't prospect a planet you haven't discovered");
        }

        if (planet.owner !== this.getAccount()) {
          throw new Error("you can't prospect a planet you don't own");
        }

        if (!isLocatable(planet)) {
          throw new Error("you don't know this planet's location");
        }

        if (planet.prospectedBlockNumber !== undefined) {
          throw new Error('someone already prospected this planet');
        }

        if (planet.transactions?.hasTransaction(isUnconfirmedProspectPlanetTx)) {
          throw new Error("you're already looking bro...");
        }

        if (planet.planetType !== PlanetType.RUINS) {
          throw new Error("this planet doesn't have an artifact on it.");
        }
      }

      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-prospectPlanet`, planetId);

      const txIntent: UnconfirmedProspectPlanet = {
        methodName: 'prospectPlanet',
        contract: this.contractsAPI.contract,
        planetId: planetId,
        args: Promise.resolve([locationIdToDecStr(planetId)]),
      };

      const tx = await this.contractsAPI.submitTransaction(txIntent);

      tx.confirmedPromise.then(() =>
        NotificationManager.getInstance().artifactProspected(planet as LocatablePlanet)
      );

      return tx;
    } catch (e) {
      this.getNotificationsManager().txInitError('prospectPlanet', e.message);
      throw e;
    }
  }

  /**
   * Calls the contract to find an artifact on the given planet.
   */
  public async findArtifact(
    planetId: LocationId,
    bypassChecks = false
  ): Promise<Transaction<UnconfirmedFindArtifact>> {
    const planet = this.entityStore.getPlanetWithId(planetId);

    try {
      if (!planet) {
        throw new Error("you can't find artifacts on a planet you haven't discovered");
      }

      if (!isLocatable(planet)) {
        throw new Error("you don't know the biome of this planet");
      }

      if (!bypassChecks) {
        if (this.checkGameHasEnded()) {
          throw new Error('game has ended');
        }

        if (planet.owner !== this.getAccount()) {
          throw new Error("you can't find artifacts on planets you don't own");
        }

        if (planet.hasTriedFindingArtifact) {
          throw new Error('someone already tried finding an artifact on this planet');
        }

        if (planet.transactions?.hasTransaction(isUnconfirmedFindArtifactTx)) {
          throw new Error("you're already looking bro...");
        }

        if (planet.planetType !== PlanetType.RUINS) {
          throw new Error("this planet doesn't have an artifact on it.");
        }
      }

      // this is shitty. used for the popup window
      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-findArtifactOnPlanet`, planetId);

      const txIntent: UnconfirmedFindArtifact = {
        methodName: 'findArtifact',
        contract: this.contractsAPI.contract,
        planetId: planet.locationId,
        args: this.snarkHelper.getFindArtifactArgs(
          planet.location.coords.x,
          planet.location.coords.y
        ),
      };

      const tx = await this.contractsAPI.submitTransaction<UnconfirmedFindArtifact>(txIntent);

      tx.confirmedPromise
        .then(() => {
          return this.waitForPlanet<Artifact>(planet.locationId, ({ current }: Diff<Planet>) => {
            return current.heldArtifactIds
              .map(this.getArtifactWithId.bind(this))
              .find((a: Artifact) => a?.planetDiscoveredOn === planet.locationId) as Artifact;
          }).then((foundArtifact) => {
            if (!foundArtifact) throw new Error('Artifact not found?');
            const notifManager = NotificationManager.getInstance();

            notifManager.artifactFound(planet as LocatablePlanet, foundArtifact);
          });
        })
        .catch(console.log);

      return tx;
    } catch (e) {
      this.getNotificationsManager().txInitError('findArtifact', e.message);
      throw e;
    }
  }

  getContractConstants(): ContractConstants {
    return this.contractConstants;
  }

  /**
   * Submits a transaction to the blockchain to deposit an artifact on a given planet.
   * You must own the planet and you must own the artifact directly (can't be locked in contract)
   */
  public async depositArtifact(
    locationId: LocationId,
    artifactId: ArtifactId
  ): Promise<Transaction<UnconfirmedDepositArtifact>> {
    try {
      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-depositPlanet`, locationId);
      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-depositArtifact`, artifactId);

      if (this.checkGameHasEnded()) {
        const error = new Error('game has ended');
        this.getNotificationsManager().txInitError('depositArtifact', error.message);
        throw error;
      }

      const txIntent: UnconfirmedDepositArtifact = {
        methodName: 'depositArtifact',
        contract: this.contractsAPI.contract,
        locationId,
        artifactId,
        args: Promise.resolve([locationIdToDecStr(locationId), artifactIdToDecStr(artifactId)]),
      };

      const tx = await this.contractsAPI.submitTransaction(txIntent);

      tx.confirmedPromise.then(() =>
        this.getGameObjects().updateArtifact(artifactId, (a) => (a.onPlanetId = locationId))
      );

      return tx;
    } catch (e) {
      this.getNotificationsManager().txInitError('depositArtifact', e.message);
      throw e;
    }
  }

  /**
   * Withdraws the artifact that is locked up on the given planet.
   */
  public async withdrawArtifact(
    locationId: LocationId,
    artifactId: ArtifactId,
    bypassChecks = true
  ): Promise<Transaction<UnconfirmedWithdrawArtifact>> {
    try {
      if (!bypassChecks) {
        if (this.checkGameHasEnded()) {
          throw new Error('game has ended');
        }
        const planet = this.entityStore.getPlanetWithId(locationId);
        if (!planet) {
          throw new Error('tried to withdraw from unknown planet');
        }
        if (!artifactId) {
          throw new Error('must supply an artifact id');
        }
      }

      // this is shitty. used for the popup window
      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-withdrawPlanet`, locationId);
      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-withdrawArtifact`, artifactId);

      const txIntent: UnconfirmedWithdrawArtifact = {
        methodName: 'withdrawArtifact',
        contract: this.contractsAPI.contract,
        args: Promise.resolve([locationIdToDecStr(locationId), artifactIdToDecStr(artifactId)]),
        locationId,
        artifactId,
      };

      this.terminal.current?.println(
        'WITHDRAW_ARTIFACT: sending withdrawal to blockchain',
        TerminalTextStyle.Sub
      );
      this.terminal.current?.newline();

      const tx = await this.contractsAPI.submitTransaction(txIntent);

      tx.confirmedPromise.then(() =>
        this.getGameObjects().updateArtifact(artifactId, (a) => (a.onPlanetId = undefined))
      );

      return tx;
    } catch (e) {
      this.getNotificationsManager().txInitError('withdrawArtifact', e.message);
      throw e;
    }
  }

  public async activateArtifact(
    locationId: LocationId,
    artifactId: ArtifactId,
    wormholeTo: LocationId | undefined,
    bypassChecks = false
  ): Promise<Transaction<UnconfirmedActivateArtifact>> {
    try {
      if (this.checkGameHasEnded()) {
        throw new Error('game has ended');
      }
      if (!bypassChecks) {
        const planet = this.entityStore.getPlanetWithId(locationId);
        if (this.checkGameHasEnded()) {
          throw new Error('game has ended');
        }

        if (!planet) {
          throw new Error('tried to activate on an unknown planet');
        }
        if (!artifactId) {
          throw new Error('must supply an artifact id');
        }
      }

      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-activatePlanet`, locationId);
      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-activateArtifact`, artifactId);

      const txIntent: UnconfirmedActivateArtifact = {
        methodName: 'activateArtifact',
        contract: this.contractsAPI.contract,
        args: Promise.resolve([
          locationIdToDecStr(locationId),
          artifactIdToDecStr(artifactId),
          wormholeTo ? locationIdToDecStr(wormholeTo) : '0',
        ]),
        locationId,
        artifactId,
        wormholeTo,
      };

      // Always await the submitTransaction so we can catch rejections
      const tx = await this.contractsAPI.submitTransaction(txIntent);

      return tx;
    } catch (e) {
      this.getNotificationsManager().txInitError('activateArtifact', e.message);
      throw e;
    }
  }

  public async deactivateArtifact(
    locationId: LocationId,
    artifactId: ArtifactId,
    bypassChecks = false
  ): Promise<Transaction<UnconfirmedDeactivateArtifact>> {
    try {
      if (!bypassChecks) {
        const planet = this.entityStore.getPlanetWithId(locationId);
        if (!planet) {
          throw new Error('tried to deactivate on an unknown planet');
        }
      }

      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-deactivatePlanet`, locationId);
      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-deactivateArtifact`, artifactId);

      const txIntent: UnconfirmedDeactivateArtifact = {
        methodName: 'deactivateArtifact',
        contract: this.contractsAPI.contract,
        args: Promise.resolve([locationIdToDecStr(locationId)]),
        locationId,
        artifactId,
      };

      // Always await the submitTransaction so we can catch rejections
      const tx = await this.contractsAPI.submitTransaction(txIntent);

      return tx;
    } catch (e) {
      this.getNotificationsManager().txInitError('deactivateArtifact', e.message);
      throw e;
    }
  }

  public async withdrawSilver(
    locationId: LocationId,
    amount: number,
    bypassChecks = false
  ): Promise<Transaction<UnconfirmedWithdrawSilver>> {
    try {
      if (!bypassChecks) {
        if (!this.account) throw new Error('no account');
        if (this.checkGameHasEnded()) {
          throw new Error('game has ended');
        }
        const planet = this.entityStore.getPlanetWithId(locationId);
        if (!planet) {
          throw new Error('tried to withdraw silver from an unknown planet');
        }
        if (planet.planetType !== PlanetType.TRADING_POST) {
          throw new Error('can only withdraw silver from spacetime rips');
        }
        if (planet.owner !== this.account) {
          throw new Error('can only withdraw silver from a planet you own');
        }
        if (planet.transactions?.hasTransaction(isUnconfirmedWithdrawSilverTx)) {
          throw new Error('a withdraw silver action is already in progress for this planet');
        }
        if (amount > planet.silver) {
          throw new Error('not enough silver to withdraw!');
        }
        if (amount === 0) {
          throw new Error('must withdraw more than 0 silver!');
        }
        if (planet.destroyed) {
          throw new Error("can't withdraw silver from a destroyed planet");
        }
      }

      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-withdrawSilverPlanet`, locationId);

      const txIntent: UnconfirmedWithdrawSilver = {
        methodName: 'withdrawSilver',
        contract: this.contractsAPI.contract,
        args: Promise.resolve([locationIdToDecStr(locationId), amount * CONTRACT_PRECISION]),
        locationId,
        amount,
      };

      // Always await the submitTransaction so we can catch rejections
      const tx = await this.contractsAPI.submitTransaction(txIntent);

      return tx;
    } catch (e) {
      this.getNotificationsManager().txInitError('withdrawSilver', e.message);
      throw e;
    }
  }

  /**
   * We have two locations which planet state can live: on the server, and on the blockchain. We use
   * the blockchain for the 'physics' of the universe, and the webserver for optional 'add-on'
   * features, which are cryptographically secure, but live off-chain.
   *
   * This function loads the planet states which live on the server. Plays nicely with our
   * notifications system and sets the appropriate loading state values on the planet.
   */
  public async refreshServerPlanetStates(planetIds: LocationId[]) {
    const planets = this.getPlanetsWithIds(planetIds);

    planetIds.forEach((id) =>
      this.getGameObjects().updatePlanet(id, (p) => {
        p.loadingServerState = true;
      })
    );

    const messages = await getMessagesOnPlanets({ planets: planetIds });

    planets.forEach((planet) => {
      const previousPlanetEmoji = getEmojiMessage(planet);
      planet.messages = messages[planet.locationId];
      const nowPlanetEmoji = getEmojiMessage(planet);

      // an emoji was added
      if (previousPlanetEmoji === undefined && nowPlanetEmoji !== undefined) {
        planet.emojiZoopAnimation = easeInAnimation(2000);
        // an emoji was removed
      } else if (nowPlanetEmoji === undefined && previousPlanetEmoji !== undefined) {
        planet.emojiZoopAnimation = undefined;
        planet.emojiZoopOutAnimation = emojiEaseOutAnimation(3000, previousPlanetEmoji.body.emoji);
      }
    });

    planetIds.forEach((id) =>
      this.getGameObjects().updatePlanet(id, (p) => {
        p.loadingServerState = false;
        p.needsServerRefresh = false;
      })
    );
  }

  /**
   * If you are the owner of this planet, you can set an 'emoji' to hover above the planet.
   * `emojiStr` must be a string that contains a single emoji, otherwise this function will throw an
   * error.
   *
   * The emoji is stored off-chain in a postgres database. We verify planet ownership via a contract
   * call from the webserver, and by verifying that the request to add (or remove) an emoji from a
   * planet was signed by the owner.
   */
  public setPlanetEmoji(locationId: LocationId, emojiStr: string) {
    return this.submitPlanetMessage(locationId, PlanetMessageType.EmojiFlag, {
      emoji: emojiStr,
    });
  }

  /**
   * If you are the owner of this planet, you can delete the emoji that is hovering above the
   * planet.
   */
  public async clearEmoji(locationId: LocationId) {
    if (this.account === undefined) {
      throw new Error("can't clear emoji: not logged in");
    }

    if (this.getPlanetWithId(locationId)?.unconfirmedClearEmoji) {
      throw new Error(`can't clear emoji: alreading clearing emoji from ${locationId}`);
    }

    this.getGameObjects().updatePlanet(locationId, (p) => {
      p.unconfirmedClearEmoji = true;
    });

    const request = await this.ethConnection.signMessageObject({
      locationId,
      ids: this.getPlanetWithId(locationId)?.messages?.map((m) => m.id) || [],
    });

    try {
      await deleteMessages(request);
    } catch (e) {
      throw e;
    } finally {
      this.getGameObjects().updatePlanet(locationId, (p) => {
        p.needsServerRefresh = true;
        p.unconfirmedClearEmoji = false;
      });
    }

    await this.refreshServerPlanetStates([locationId]);
  }

  public async submitDisconnectTwitter(twitter: string) {
    await disconnectTwitter(await this.ethConnection.signMessageObject({ twitter }));
    await this.refreshTwitters();
  }

  /**
   * The planet emoji feature is built on top of a more general 'Planet Message' system, which
   * allows players to upload pieces of data called 'Message's to planets that they own. Emojis are
   * just one type of message. Their implementation leaves the door open to more off-chain data.
   */
  private async submitPlanetMessage(
    locationId: LocationId,
    type: PlanetMessageType,
    body: unknown
  ) {
    if (this.account === undefined) {
      throw new Error("can't submit planet message not logged in");
    }

    if (this.getPlanetWithId(locationId)?.unconfirmedAddEmoji) {
      throw new Error(`can't submit planet message: already submitting for planet ${locationId}`);
    }

    this.getGameObjects().updatePlanet(locationId, (p) => {
      p.unconfirmedAddEmoji = true;
    });

    const request = await this.ethConnection.signMessageObject({
      locationId,
      sender: this.account,
      type,
      body,
    });

    try {
      await addMessage(request);
    } catch (e) {
      throw e;
    } finally {
      this.getGameObjects().updatePlanet(locationId, (p) => {
        p.unconfirmedAddEmoji = false;
        p.needsServerRefresh = true;
      });
    }

    await this.refreshServerPlanetStates([locationId]);
  }

  /**
   * Checks that a message signed by {@link GameManager#signMessage} was signed by the address that
   * it claims it was signed by.
   */
  private async verifyMessage(message: SignedMessage<unknown>): Promise<boolean> {
    const preSigned = JSON.stringify(message.message);

    return verifySignature(preSigned, message.signature as string, message.sender);
  }

  /**
   * Submits a transaction to the blockchain to move the given amount of resources from
   * the given planet to the given planet.
   */
  public async move(
    from: LocationId,
    to: LocationId,
    forces: number,
    silver: number,
    artifactMoved?: ArtifactId,
    abandoning = false,
    bypassChecks = false
  ): Promise<Transaction<UnconfirmedMove>> {
    localStorage.setItem(`${this.getAccount()?.toLowerCase()}-fromPlanet`, from);
    localStorage.setItem(`${this.getAccount()?.toLowerCase()}-toPlanet`, to);

    try {
      if (!bypassChecks && this.checkGameHasEnded()) {
        throw new Error('game has ended');
      }

      const arrivalsToOriginPlanet = this.entityStore.getArrivalIdsForLocation(from);
      const hasIncomingVoyage = arrivalsToOriginPlanet && arrivalsToOriginPlanet.length > 0;
      if (abandoning && hasIncomingVoyage) {
        throw new Error('cannot abandon a planet that has incoming voyages');
      }

      const oldLocation = this.entityStore.getLocationOfPlanet(from);
      const newLocation = this.entityStore.getLocationOfPlanet(to);
      if (!oldLocation) {
        throw new Error('tried to move from planet that does not exist');
      }
      if (!newLocation) {
        throw new Error('tried to move from planet that does not exist');
      }

      const oldX = oldLocation.coords.x;
      const oldY = oldLocation.coords.y;
      const newX = newLocation.coords.x;
      const newY = newLocation.coords.y;
      const xDiff = newX - oldX;
      const yDiff = newY - oldY;

      const distMax = Math.ceil(Math.sqrt(xDiff ** 2 + yDiff ** 2));

      // Contract will automatically send full forces/silver on abandon
      const shipsMoved = !abandoning ? forces : 0;
      const silverMoved = !abandoning ? silver : 0;

      if (newX ** 2 + newY ** 2 >= this.worldRadius ** 2) {
        throw new Error('attempted to move out of bounds');
      }

      const oldPlanet = this.entityStore.getPlanetWithLocation(oldLocation);

      if (
        ((!bypassChecks && !this.account) || !oldPlanet || oldPlanet.owner !== this.account) &&
        !isSpaceShip(this.getArtifactWithId(artifactMoved)?.artifactType)
      ) {
        throw new Error('attempted to move from a planet not owned by player');
      }

      const getArgs = async (): Promise<unknown[]> => {
        const snarkArgs = await this.snarkHelper.getMoveArgs(
          oldX,
          oldY,
          newX,
          newY,
          this.worldRadius,
          distMax
        );

        const args: MoveArgs = [
          snarkArgs[ZKArgIdx.PROOF_A],
          snarkArgs[ZKArgIdx.PROOF_B],
          snarkArgs[ZKArgIdx.PROOF_C],
          [
            ...snarkArgs[ZKArgIdx.DATA],
            (shipsMoved * CONTRACT_PRECISION).toString(),
            (silverMoved * CONTRACT_PRECISION).toString(),
            '0',
            abandoning ? '1' : '0',
          ],
        ] as MoveArgs;

        this.terminal.current?.println('MOVE: calculated SNARK with args:', TerminalTextStyle.Sub);
        this.terminal.current?.println(
          JSON.stringify(hexifyBigIntNestedArray(args)),
          TerminalTextStyle.Sub
        );
        this.terminal.current?.newline();

        if (artifactMoved) {
          args[ZKArgIdx.DATA][MoveArgIdxs.ARTIFACT_SENT] = artifactIdToDecStr(artifactMoved);
        }

        return args;
      };

      const txIntent: UnconfirmedMove = {
        methodName: 'move',
        contract: this.contractsAPI.contract,
        args: getArgs(),
        from: oldLocation.hash,
        to: newLocation.hash,
        forces: shipsMoved,
        silver: silverMoved,
        artifact: artifactMoved,
        abandoning,
      };

      if (artifactMoved) {
        const artifact = this.entityStore.getArtifactById(artifactMoved);

        if (!bypassChecks) {
          if (!artifact) {
            throw new Error("couldn't find this artifact");
          }
          if (isActivated(artifact)) {
            throw new Error("can't move an activated artifact");
          }
          if (!oldPlanet?.heldArtifactIds?.includes(artifactMoved)) {
            throw new Error("that artifact isn't on this planet!");
          }
        }
      }

      // Always await the submitTransaction so we can catch rejections
      const tx = await this.contractsAPI.submitTransaction(txIntent);

      return tx;
    } catch (e) {
      this.getNotificationsManager().txInitError('move', e.message);
      throw e;
    }
  }

  /**
   * Submits a transaction to the blockchain to upgrade the given planet with the given
   * upgrade branch. You must own the planet, and have enough silver on it to complete
   * the upgrade.
   */
  public async upgrade(
    planetId: LocationId,
    branch: number,
    _bypassChecks = false
  ): Promise<Transaction<UnconfirmedUpgrade>> {
    try {
      // this is shitty
      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-upPlanet`, planetId);
      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-branch`, branch.toString());

      const txIntent: UnconfirmedUpgrade = {
        methodName: 'upgradePlanet',
        contract: this.contractsAPI.contract,
        args: Promise.resolve([locationIdToDecStr(planetId), branch.toString()]),
        locationId: planetId,
        upgradeBranch: branch,
      };

      // Always await the submitTransaction so we can catch rejections
      const tx = await this.contractsAPI.submitTransaction(txIntent);

      return tx;
    } catch (e) {
      this.getNotificationsManager().txInitError('upgradePlanet', e.message);
      throw e;
    }
  }

  /**
   * Submits a transaction to the blockchain to buy a hat for the given planet. You must own the
   * planet. Warning costs real xdai. Hats are permanently locked to a planet. They are purely
   * cosmetic and a great way to BM your opponents or just look your best. Just like in the real
   * world, more money means more hat.
   */
  public async buyHat(
    planetId: LocationId,
    _bypassChecks = false
  ): Promise<Transaction<UnconfirmedBuyHat>> {
    const planetLoc = this.entityStore.getLocationOfPlanet(planetId);
    const planet = this.entityStore.getPlanetWithLocation(planetLoc);

    try {
      if (!planetLoc) {
        console.error('planet not found');
        throw new Error('[TX ERROR] Planet not found');
      }
      if (!planet) {
        console.error('planet not found');
        throw new Error('[TX ERROR] Planet not found');
      }

      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-hatPlanet`, planetId);
      localStorage.setItem(
        `${this.getAccount()?.toLowerCase()}-hatLevel`,
        planet.hatLevel.toString()
      );

      const txIntent: UnconfirmedBuyHat = {
        methodName: 'buyHat',
        contract: this.contractsAPI.contract,
        args: Promise.resolve([locationIdToDecStr(planetId)]),
        locationId: planetId,
      };

      // Always await the submitTransaction so we can catch rejections
      const tx = await this.contractsAPI.submitTransaction(txIntent, {
        gasLimit: 500000,
        value: bigInt(1000000000000000000)
          .multiply(2 ** planet.hatLevel)
          .toString(),
      });

      return tx;
    } catch (e) {
      this.getNotificationsManager().txInitError('buyHat', e.message);
      throw e;
    }
  }

  // TODO: Change this to transferPlanet in a breaking release
  public async transferOwnership(
    planetId: LocationId,
    newOwner: EthAddress,
    bypassChecks = false
  ): Promise<Transaction<UnconfirmedPlanetTransfer>> {
    try {
      if (!bypassChecks) {
        if (this.checkGameHasEnded()) {
          throw new Error('game has ended');
        }
        const planetLoc = this.entityStore.getLocationOfPlanet(planetId);
        if (!planetLoc) {
          console.error('planet not found');
          throw new Error('[TX ERROR] Planet not found');
        }
        const planet = this.entityStore.getPlanetWithLocation(planetLoc);
        if (!planet) {
          console.error('planet not found');
          throw new Error('[TX ERROR] Planet not found');
        }
      }

      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-transferPlanet`, planetId);
      localStorage.setItem(`${this.getAccount()?.toLowerCase()}-transferOwner`, newOwner);

      const txIntent: UnconfirmedPlanetTransfer = {
        methodName: 'transferPlanet',
        contract: this.contractsAPI.contract,
        args: Promise.resolve([locationIdToDecStr(planetId), newOwner]),
        planetId,
        newOwner,
      };

      // Always await the submitTransaction so we can catch rejections
      const tx = await this.contractsAPI.submitTransaction(txIntent);

      return tx;
    } catch (e) {
      this.getNotificationsManager().txInitError('transferPlanet', e.message);
      throw e;
    }
  }

  /**
   * Makes this game manager aware of a new chunk - which includes its location, size,
   * as well as all of the planets contained in that chunk. Causes the client to load
   * all of the information about those planets from the blockchain.
   */
  addNewChunk(chunk: Chunk): GameManager {
    this.persistentChunkStore.addChunk(chunk, true);
    for (const planetLocation of chunk.planetLocations) {
      this.entityStore.addPlanetLocation(planetLocation);

      if (this.entityStore.isPlanetInContract(planetLocation.hash)) {
        this.hardRefreshPlanet(planetLocation.hash); // don't need to await, just start the process of hard refreshing
      }
    }
    return this;
  }

  listenForNewBlock() {
    this.getEthConnection().blockNumber$.subscribe((blockNumber) => {
      if (this.captureZoneGenerator) {
        this.captureZoneGenerator.generate(blockNumber);
      }
    });
  }

  /**
   * To add multiple chunks at once, use this function rather than `addNewChunk`, in order
   * to load all of the associated planet data in an efficient manner.
   */
  async bulkAddNewChunks(chunks: Chunk[]): Promise<void> {
    this.terminal.current?.println(
      'IMPORTING MAP: if you are importing a large map, this may take a while...'
    );
    const planetIdsToUpdate: LocationId[] = [];
    for (const chunk of chunks) {
      this.persistentChunkStore.addChunk(chunk, true);
      for (const planetLocation of chunk.planetLocations) {
        this.entityStore.addPlanetLocation(planetLocation);

        if (this.entityStore.isPlanetInContract(planetLocation.hash)) {
          // Await this so we don't crash the game
          planetIdsToUpdate.push(planetLocation.hash);
        }
      }
    }
    this.terminal.current?.println(
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
  getMaxMoveDist(planetId: LocationId, sendingPercent: number, abandoning: boolean): number {
    const planet = this.getPlanetWithId(planetId);
    if (!planet) throw new Error('origin planet unknown');
    return getRange(planet, sendingPercent, this.getRangeBuff(abandoning));
  }

  /**
   * Gets the distance between two planets. Throws an exception if you don't
   * know the location of either planet. Takes into account wormholes.
   */
  getDist(fromId: LocationId, toId: LocationId): number {
    const from = this.entityStore.getPlanetWithId(fromId);
    const to = this.entityStore.getPlanetWithId(toId);

    if (!from) throw new Error('origin planet unknown');
    if (!to) throw new Error('destination planet unknown');
    if (!isLocatable(from)) throw new Error('origin location unknown');
    if (!isLocatable(to)) throw new Error('destination location unknown');

    const wormholeFactors = this.getWormholeFactors(from, to);

    let distance = this.getDistCoords(from.location.coords, to.location.coords);

    if (wormholeFactors) {
      distance /= wormholeFactors.distanceFactor;
    }

    return distance;
  }

  /**
   * Gets the distance between two coordinates in space.
   */
  getDistCoords(fromCoords: WorldCoords, toCoords: WorldCoords) {
    return Math.sqrt((fromCoords.x - toCoords.x) ** 2 + (fromCoords.y - toCoords.y) ** 2);
  }

  /**
   * Gets all the planets that you can reach with at least 1 energy from
   * the given planet. Does not take into account wormholes.
   */
  getPlanetsInRange(planetId: LocationId, sendingPercent: number, abandoning: boolean): Planet[] {
    const planet = this.entityStore.getPlanetWithId(planetId);
    if (!planet) throw new Error('planet unknown');
    if (!isLocatable(planet)) throw new Error('planet location unknown');

    // Performance improvements originally suggested by [@modokon](https://github.com/modukon)
    // at https://github.com/darkforest-eth/client/issues/15
    // Improved by using `planetMap` by [@phated](https://github.com/phated)
    const result = [];
    const range = getRange(planet, sendingPercent, this.getRangeBuff(abandoning));
    for (const p of this.getPlanetMap().values()) {
      if (isLocatable(p)) {
        if (this.getDistCoords(planet.location.coords, p.location.coords) < range) {
          result.push(p);
        }
      }
    }

    return result;
  }

  /**
   * Gets the amount of energy needed in order for a voyage from the given to the given
   * planet to arrive with your desired amount of energy.
   */
  getEnergyNeededForMove(
    fromId: LocationId,
    toId: LocationId,
    arrivingEnergy: number,
    abandoning = false
  ): number {
    const from = this.getPlanetWithId(fromId);
    if (!from) throw new Error('origin planet unknown');
    const dist = this.getDist(fromId, toId);
    const range = from.range * this.getRangeBuff(abandoning);
    const rangeSteps = dist / range;

    const arrivingProp = arrivingEnergy / from.energyCap + 0.05;

    return arrivingProp * Math.pow(2, rangeSteps) * from.energyCap;
  }

  /**
   * Gets the amount of energy that would arrive if a voyage with the given parameters
   * was to occur. The toPlanet is optional, in case you want an estimate that doesn't include
   * wormhole speedups.
   */
  getEnergyArrivingForMove(
    fromId: LocationId,
    toId: LocationId | undefined,
    distance: number | undefined,
    sentEnergy: number,
    abandoning: boolean
  ) {
    const from = this.getPlanetWithId(fromId);
    const to = this.getPlanetWithId(toId);

    if (!from) throw new Error(`unknown planet`);
    if (distance === undefined && toId === undefined)
      throw new Error(`you must provide either a target planet or a distance`);

    const dist = (toId && this.getDist(fromId, toId)) || (distance as number);

    if (to && toId) {
      const wormholeFactors = this.getWormholeFactors(from, to);
      if (wormholeFactors !== undefined) {
        if (to.owner !== from.owner) {
          return 0;
        }
      }
    }

    const range = from.range * this.getRangeBuff(abandoning);
    const scale = (1 / 2) ** (dist / range);
    let ret = scale * sentEnergy - 0.05 * from.energyCap;
    if (ret < 0) ret = 0;

    return ret;
  }

  /**
   * Gets the active artifact on this planet, if one exists.
   */
  getActiveArtifact(planet: Planet): Artifact | undefined {
    const artifacts = this.getArtifactsWithIds(planet.heldArtifactIds);
    const active = artifacts.find((a) => a && isActivated(a));

    return active;
  }

  /**
   * If there's an active artifact on either of these planets which happens to be a wormhole which
   * is active and targetting the other planet, return the wormhole boost which is greater. Values
   * represent a multiplier.
   */
  getWormholeFactors(
    fromPlanet: Planet,
    toPlanet: Planet
  ): { distanceFactor: number; speedFactor: number } | undefined {
    const fromActiveArtifact = this.getActiveArtifact(fromPlanet);
    const toActiveArtifact = this.getActiveArtifact(toPlanet);

    let greaterRarity: ArtifactRarity | undefined;

    if (
      fromActiveArtifact?.artifactType === ArtifactType.Wormhole &&
      fromActiveArtifact.wormholeTo === toPlanet.locationId
    ) {
      greaterRarity = fromActiveArtifact.rarity;
    }

    if (
      toActiveArtifact?.artifactType === ArtifactType.Wormhole &&
      toActiveArtifact.wormholeTo === fromPlanet.locationId
    ) {
      if (greaterRarity === undefined) {
        greaterRarity = toActiveArtifact.rarity;
      } else {
        greaterRarity = Math.max(greaterRarity, toActiveArtifact.rarity) as ArtifactRarity;
      }
    }

    const rangeUpgradesPerRarity = [0, 2, 4, 6, 8, 10];
    const speedUpgradesPerRarity = [0, 10, 20, 30, 40, 50];

    if (!greaterRarity || greaterRarity <= ArtifactRarity.Unknown) {
      return undefined;
    }

    return {
      distanceFactor: rangeUpgradesPerRarity[greaterRarity],
      speedFactor: speedUpgradesPerRarity[greaterRarity],
    };
  }

  /**
   * Gets the amount of time, in seconds that a voyage between from the first to the
   * second planet would take.
   */
  getTimeForMove(fromId: LocationId, toId: LocationId, abandoning = false): number {
    const from = this.getPlanetWithId(fromId);
    if (!from) throw new Error('origin planet unknown');
    const dist = this.getDist(fromId, toId);

    const speed = from.speed * this.getSpeedBuff(abandoning);
    return dist / (speed / 100);
  }

  /**
   * Gets the temperature of a given location.
   */
  getTemperature(coords: WorldCoords): number {
    const p = this.spaceTypePerlin(coords, false);
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
    return p.planetType === PlanetType.RUINS;
  }

  /**
   * Returns constructors of classes that may be useful for developing plugins.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getConstructors() {
    return {
      MinerManager,
      SpiralPattern,
      SwissCheesePattern,
      TowardsCenterPattern,
      TowardsCenterPatternV2,
    };
  }

  /**
   * Gets the perlin value at the given location in the world. SpaceType is based
   * on this value.
   */
  public spaceTypePerlin(coords: WorldCoords, floor: boolean): number {
    return perlin(coords, {
      key: this.hashConfig.spaceTypeKey,
      scale: this.hashConfig.perlinLengthScale,
      mirrorX: this.hashConfig.perlinMirrorX,
      mirrorY: this.hashConfig.perlinMirrorY,
      floor,
    });
  }

  /**
   * Gets the biome perlin valie at the given location in the world.
   */
  public biomebasePerlin(coords: WorldCoords, floor: boolean): number {
    return perlin(coords, {
      key: this.hashConfig.biomebaseKey,
      scale: this.hashConfig.perlinLengthScale,
      mirrorX: this.hashConfig.perlinMirrorX,
      mirrorY: this.hashConfig.perlinMirrorY,
      floor,
    });
  }

  public locationBigIntFromCoords(coords: WorldCoords): BigInteger {
    return this.planetHashMimc(coords.x, coords.y);
  }

  /**
   * Helpful for listening to user input events.
   */
  public getUIEventEmitter() {
    return UIEmitter.getInstance();
  }

  public getCaptureZoneGenerator() {
    return this.captureZoneGenerator;
  }

  /**
   * Emits when new capture zones are generated.
   */
  public get captureZoneGeneratedEmitter(): Monomitter<CaptureZonesGeneratedEvent> | undefined {
    return this.captureZoneGenerator?.generated$;
  }

  public getNotificationsManager() {
    return NotificationManager.getInstance();
  }

  getWormholes(): Iterable<Wormhole> {
    return this.entityStore.getWormholes();
  }

  /** Return a reference to the planet map */
  public getPlanetMap(): Map<LocationId, Planet> {
    return this.entityStore.getPlanetMap();
  }

  /** Return a reference to the artifact map */
  public getArtifactMap(): Map<ArtifactId, Artifact> {
    return this.entityStore.getArtifactMap();
  }

  /** Return a reference to the map of my planets */
  public getMyPlanetMap(): Map<LocationId, Planet> {
    return this.entityStore.getMyPlanetMap();
  }

  /** Return a reference to the map of my artifacts */
  public getMyArtifactMap(): Map<ArtifactId, Artifact> {
    return this.entityStore.getMyArtifactMap();
  }

  public getPlanetUpdated$(): Monomitter<LocationId> {
    return this.entityStore.planetUpdated$;
  }

  public getArtifactUpdated$(): Monomitter<ArtifactId> {
    return this.entityStore.artifactUpdated$;
  }

  public getMyPlanetsUpdated$(): Monomitter<Map<LocationId, Planet>> {
    return this.entityStore.myPlanetsUpdated$;
  }

  public getMyArtifactsUpdated$(): Monomitter<Map<ArtifactId, Artifact>> {
    return this.entityStore.myArtifactsUpdated$;
  }

  /**
   * Returns an instance of a `Contract` from the ethersjs library. This is the library we use to
   * connect to the blockchain. For documentation about how `Contract` works, see:
   * https://docs.ethers.io/v5/api/contract/contract/
   *
   * Also, registers your contract in the system to make calls against it and to reload it when
   * necessary (such as the RPC endpoint changing).
   */
  public loadContract<T extends Contract>(
    contractAddress: string,
    contractABI: ContractInterface
  ): Promise<T> {
    return this.ethConnection.loadContract(contractAddress, async (address, provider, signer) =>
      createContract<T>(address, contractABI, provider, signer)
    );
  }

  public testNotification() {
    NotificationManager.getInstance().reallyLongNotification();
  }

  /**
   * Gets a reference to the game's internal representation of the world state. This includes
   * voyages, planets, artifacts, and active wormholes,
   */
  public getGameObjects(): GameObjects {
    return this.entityStore;
  }

  public forceTick(locationId: LocationId) {
    this.getGameObjects().forceTick(locationId);
  }

  /**
   * Gets some diagnostic information about the game. Returns a copy, you can't modify it.
   */
  public getDiagnostics(): Diagnostics {
    return { ...this.diagnostics };
  }

  /**
   * Updates the diagnostic info of the game using the supplied function. Ideally, each spot in the
   * codebase that would like to record a metric is able to update its specific metric in a
   * convenient manner.
   */
  public updateDiagnostics(updateFn: (d: Diagnostics) => void): void {
    updateFn(this.diagnostics);
  }

  /**
   * Listen for changes to a planet take action,
   * eg.
   * waitForPlanet("yourAsteroidId", ({current}) => current.silverCap / current.silver > 90)
   * .then(() => {
   *  // Send Silver to nearby planet
   * })
   *
   * @param locationId A locationId to watch for updates
   * @param predicate a function that accepts a Diff and should return a truth-y value, value will be passed to promise.resolve()
   * @returns a promise that will resolve with results returned from the predicate function
   */
  public waitForPlanet<T>(
    locationId: LocationId,
    predicate: ({ current, previous }: Diff<Planet>) => T | undefined
  ): Promise<T> {
    const disposableEmitter = getDisposableEmitter<Planet, LocationId>(
      this.getPlanetMap(),
      locationId,
      this.getPlanetUpdated$()
    );
    const diffEmitter = generateDiffEmitter(disposableEmitter);
    return new Promise((resolve, reject) => {
      diffEmitter.subscribe(({ current, previous }: Diff<Planet>) => {
        try {
          const predicateResults = predicate({ current, previous });
          if (!!predicateResults) {
            disposableEmitter.clear();
            diffEmitter.clear();
            resolve(predicateResults);
          }
        } catch (err) {
          disposableEmitter.clear();
          diffEmitter.clear();
          reject(err);
        }
      });
    });
  }

  public getSafeMode() {
    return this.safeMode;
  }

  public setSafeMode(safeMode: boolean) {
    this.safeMode = safeMode;
  }

  public getAddress() {
    return this.ethConnection.getAddress();
  }

  public isAdmin(): boolean {
    return this.getAddress() === this.contractConstants.adminAddress;
  }

  /**
   * Right now the only buffs supported in this way are
   * speed/range buffs from Abandoning a planet.
   *
   * The abandoning argument is used when interacting with
   * this function programmatically.
   */
  public getSpeedBuff(abandoning: boolean): number {
    const { SPACE_JUNK_ENABLED, ABANDON_SPEED_CHANGE_PERCENT } = this.contractConstants;
    if (SPACE_JUNK_ENABLED && abandoning) {
      return ABANDON_SPEED_CHANGE_PERCENT / 100;
    }

    return 1;
  }

  public getRangeBuff(abandoning: boolean): number {
    const { SPACE_JUNK_ENABLED, ABANDON_RANGE_CHANGE_PERCENT } = this.contractConstants;
    if (SPACE_JUNK_ENABLED && abandoning) {
      return ABANDON_RANGE_CHANGE_PERCENT / 100;
    }

    return 1;
  }

  public getSnarkHelper(): SnarkArgsHelper {
    return this.snarkHelper;
  }

  public async submitTransaction<T extends TxIntent>(
    txIntent: T,
    overrides?: providers.TransactionRequest
  ): Promise<Transaction<T>> {
    return this.contractsAPI.submitTransaction(txIntent, overrides);
  }

  public getContract(): DarkForest {
    return this.contractsAPI.contract;
  }

  public getPaused(): boolean {
    return this.paused;
  }

  public getPaused$(): Monomitter<boolean> {
    return this.paused$;
  }
}

export default GameManager;
