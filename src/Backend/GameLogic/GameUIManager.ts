import {
  LocationId,
  ArtifactId,
  EthAddress,
  Player,
  Artifact,
  Planet,
  LocatablePlanet,
  PlanetLevel,
  UpgradeBranchName,
  WorldLocation,
  WorldCoords,
  Biome,
  SpaceType,
  PlanetType,
  QueuedArrival,
  Upgrade,
  Conversation,
  UnconfirmedMove,
  UnconfirmedUpgrade,
  UnconfirmedActivateArtifact,
} from '@darkforest_eth/types';
import autoBind from 'auto-bind';
import EventEmitter from 'events';
import NotificationManager from '../../Frontend/Game/NotificationManager';
import Viewport from '../../Frontend/Game/Viewport';
import { getObjectWithIdFromMap } from '../../Frontend/Utils/EmitterUtils';
import { Monomitter, monomitter } from '../../Frontend/Utils/Monomitter';
import UIEmitter, { UIEmitterEvent } from '../../Frontend/Utils/UIEmitter';
import { TerminalHandle } from '../../Frontend/Views/Terminal';
import { ContractConstants } from '../../_types/darkforest/api/ContractsAPITypes';
import {
  ExploredChunkData,
  Rectangle,
  isLocatable,
  Wormhole,
  HashConfig,
} from '../../_types/global/GlobalTypes';
import { MiningPattern } from '../Miner/MiningPatterns';
import EthConnection from '../Network/EthConnection';
import { UIDataKey } from '../Storage/UIStateStorageManager';
import { coordsEqual } from '../Utils/Coordinates';
import { deferred } from '../Utils/Utils';
import { biomeName } from './ArtifactUtils';
import GameManager, { GameManagerEvent } from './GameManager';
import { PluginManager } from './PluginManager';
import TutorialManager, { TutorialState } from './TutorialManager';
import { EMPTY_ADDRESS } from '@darkforest_eth/constants';
import { planetHasBonus } from '@darkforest_eth/hexgen';

export enum GameUIManagerEvent {
  InitializedPlayer = 'InitializedPlayer',
  InitializedPlayerError = 'InitializedPlayerError',
}

class GameUIManager extends EventEmitter {
  private gameManager: GameManager;
  private terminal: React.MutableRefObject<TerminalHandle | undefined>;

  private readonly radiusMap: Record<PlanetLevel, number>;
  private detailLevel: number; // 0 is show everything; higher means show less
  private previousSelectedPlanet: Planet | undefined;
  private selectedPlanet: Planet | undefined;
  private selectedCoords: WorldCoords | undefined;
  private mouseDownOverPlanet: Planet | undefined;
  private mouseDownOverCoords: WorldCoords | undefined;
  private mouseHoveringOverPlanet: Planet | undefined;
  private mouseHoveringOverCoords: WorldCoords | undefined;
  private sendingPlanet: Planet | undefined;
  private sendingCoords: WorldCoords | undefined;
  private isSending = false;

  /**
   * The Wormhole artifact requires you to choose a target planet. This value
   * indicates whether or not the player is currently selecting a target planet.
   */
  private isChoosingTargetPlanet = false;
  private onChooseTargetPlanet?: (planet: LocatablePlanet | undefined) => void;
  // TODO: Remove later and just use minerLocations array
  private minerLocation: WorldCoords | undefined;
  private extraMinerLocations: WorldCoords[] = [];

  private forcesSending: { [key: string]: number } = {}; // this is a percentage
  private silverSending: { [key: string]: number } = {}; // this is a percentage

  private artifactSending: { [key: string]: Artifact | undefined } = {};

  private plugins: PluginManager;

  public readonly selectedPlanetId$: Monomitter<LocationId | undefined>;
  public readonly selectedPlanet$: Monomitter<Planet | undefined>;
  public readonly hoverPlanetId$: Monomitter<LocationId | undefined>;
  public readonly hoverPlanet$: Monomitter<Planet | undefined>;
  public readonly selectedArtifactId$: Monomitter<ArtifactId | undefined>;
  public readonly selectedArtifact$: Monomitter<Artifact | undefined>;
  public readonly myArtifacts$: Monomitter<Map<ArtifactId, Artifact>>;

  // lifecycle methods

  private constructor(
    gameManager: GameManager,
    terminalHandle: React.MutableRefObject<TerminalHandle | undefined>
  ) {
    super();

    this.gameManager = gameManager;
    this.terminal = terminalHandle;

    // if planets are more dense, make radii smaller
    // if planets are less dense, make radii larger
    // the default radii are tuned for a default planet rarity of 16384
    const scaleFactor = Math.sqrt(this.gameManager.getPlanetRarity() / 16384);

    // TODO: will radii this large degrade performance?
    this.radiusMap = {
      [PlanetLevel.ZERO]: 1 * scaleFactor,
      [PlanetLevel.ONE]: 3 * scaleFactor,
      [PlanetLevel.TWO]: 9 * scaleFactor,
      [PlanetLevel.THREE]: 27 * scaleFactor,
      [PlanetLevel.FOUR]: 81 * scaleFactor,
      [PlanetLevel.FIVE]: 243 * scaleFactor,
      [PlanetLevel.SIX]: 486 * scaleFactor,
      [PlanetLevel.SEVEN]: 729 * scaleFactor,
      [PlanetLevel.EIGHT]: 972 * scaleFactor,
      [PlanetLevel.NINE]: 1215 * scaleFactor,
    };

    this.plugins = new PluginManager(gameManager);

    this.selectedPlanetId$ = monomitter<LocationId | undefined>();
    this.selectedPlanet$ = getObjectWithIdFromMap<Planet, LocationId>(
      this.getPlanetMap(),
      this.selectedPlanetId$,
      this.gameManager.getPlanetUpdated$()
    );

    this.hoverPlanetId$ = monomitter<LocationId | undefined>();
    this.hoverPlanet$ = getObjectWithIdFromMap<Planet, LocationId>(
      this.getPlanetMap(),
      this.hoverPlanetId$,
      this.gameManager.getPlanetUpdated$()
    );

    this.selectedArtifactId$ = monomitter<ArtifactId | undefined>();
    this.selectedArtifact$ = getObjectWithIdFromMap<Artifact, ArtifactId>(
      this.getArtifactMap(),
      this.selectedArtifactId$,
      this.gameManager.getArtifactUpdated$()
    );
    this.myArtifacts$ = this.gameManager.getMyArtifactsUpdated$();

    autoBind(this);
  }

  static async create(
    gameManager: GameManager,
    terminalHandle: React.MutableRefObject<TerminalHandle | undefined>
  ) {
    const uiEmitter = UIEmitter.getInstance();

    const uiManager = new GameUIManager(gameManager, terminalHandle);

    uiEmitter.on(UIEmitterEvent.WorldMouseDown, uiManager.onMouseDown);
    uiEmitter.on(UIEmitterEvent.WorldMouseClick, uiManager.onMouseClick);
    uiEmitter.on(UIEmitterEvent.WorldMouseMove, uiManager.onMouseMove);
    uiEmitter.on(UIEmitterEvent.WorldMouseUp, uiManager.onMouseUp);
    uiEmitter.on(UIEmitterEvent.WorldMouseOut, uiManager.onMouseOut);

    uiEmitter.on(UIEmitterEvent.SendInitiated, uiManager.onSendInit);
    uiEmitter.on(UIEmitterEvent.SendCancelled, uiManager.onSendCancel);

    gameManager.on(GameManagerEvent.PlanetUpdate, uiManager.updatePlanets);
    gameManager.on(GameManagerEvent.DiscoveredNewChunk, uiManager.onDiscoveredChunk);

    return uiManager;
  }

  destroy(): void {
    const uiEmitter = UIEmitter.getInstance();

    uiEmitter.removeListener(UIEmitterEvent.WorldMouseDown, this.onMouseDown);
    uiEmitter.removeListener(UIEmitterEvent.WorldMouseClick, this.onMouseClick);
    uiEmitter.removeListener(UIEmitterEvent.WorldMouseMove, this.onMouseMove);
    uiEmitter.removeListener(UIEmitterEvent.WorldMouseUp, this.onMouseUp);
    uiEmitter.removeListener(UIEmitterEvent.WorldMouseOut, this.onMouseOut);

    uiEmitter.on(UIEmitterEvent.SendInitiated, this.onSendInit);
    uiEmitter.on(UIEmitterEvent.SendCancelled, this.onSendCancel);

    this.gameManager.removeListener(GameManagerEvent.PlanetUpdate, this.updatePlanets);
    this.gameManager.removeListener(
      GameManagerEvent.InitializedPlayer,
      this.onEmitInitializedPlayer
    );
    this.gameManager.removeListener(
      GameManagerEvent.InitializedPlayerError,
      this.onEmitInitializedPlayerError
    );
    this.gameManager.removeListener(GameManagerEvent.DiscoveredNewChunk, this.onDiscoveredChunk);

    this.gameManager.destroy();
    this.selectedPlanetId$.clear();
    this.selectedArtifactId$.clear();
  }

  getEthConnection(): EthConnection {
    return this.gameManager.getEthConnection();
  }

  getContractAddress(): EthAddress {
    return this.gameManager.getContractAddress();
  }

  // actions

  centerPlanet(planet: Planet | undefined) {
    if (planet) {
      Viewport.getInstance().centerPlanet(planet);
      this.setSelectedPlanet(planet);
    }
  }

  centerCoords(coords: WorldCoords) {
    const planet = this.gameManager.getPlanetWithCoords(coords);
    if (planet) {
      this.centerPlanet(planet);
    } else {
      Viewport.getInstance().centerCoords(coords);
    }
  }

  centerLocationId(planetId: LocationId) {
    const planet = this.getPlanetWithId(planetId);
    this.centerPlanet(planet);
  }

  joinGame(beforeRetry: (e: Error) => Promise<boolean>): GameUIManager {
    this.gameManager
      .joinGame(beforeRetry)
      .once(GameManagerEvent.InitializedPlayer, this.onEmitInitializedPlayer)
      .once(GameManagerEvent.InitializedPlayerError, this.onEmitInitializedPlayerError);

    return this;
  }

  addAccount(coords: WorldCoords): Promise<boolean> {
    return this.gameManager.addAccount(coords);
  }

  verifyTwitter(twitter: string): Promise<boolean> {
    return this.gameManager.verifyTwitter(twitter);
  }

  getPluginManager(): PluginManager {
    return this.plugins;
  }

  getPrivateKey(): string {
    return this.gameManager.getPrivateKey();
  }

  getMyBalance(): number {
    return this.gameManager.getMyBalance();
  }

  getMyBalanceEmitter(): Monomitter<number> {
    return this.gameManager.getMyBalanceEmitter();
  }

  findArtifact(planetId: LocationId) {
    this.gameManager.findArtifact(planetId);
  }

  prospectPlanet(planetId: LocationId) {
    this.gameManager.prospectPlanet(planetId);
  }

  withdrawArtifact(locationId: LocationId, artifactId: ArtifactId) {
    this.gameManager.withdrawArtifact(locationId, artifactId);
  }

  depositArtifact(locationId: LocationId, artifactId: ArtifactId) {
    this.gameManager.depositArtifact(locationId, artifactId);
  }

  activateArtifact(locationId: LocationId, id: ArtifactId, wormholeTo?: LocationId) {
    const confirmationText =
      `Are you sure you want to activate this artifact? ` +
      `You can only have one artifact active at time. After` +
      ` deactivation, you must wait for a long cooldown` +
      ` before you can activate it again. Some artifacts (bloom filter, black domain, photoid cannon) are consumed on usage.`;

    if (!confirm(confirmationText)) return;

    this.gameManager.activateArtifact(locationId, id, wormholeTo);
  }

  deactivateArtifact(locationId: LocationId, artifactId: ArtifactId) {
    const confirmationText =
      `Are you sure you want to deactivate this artifact? ` +
      `After deactivation, you must wait for a long cooldown` +
      ` before you can activate it again. Some artifacts (planetary shields) are consumed on deactivation.`;

    if (!confirm(confirmationText)) return;

    this.gameManager.deactivateArtifact(locationId, artifactId);
  }

  withdrawSilver(locationId: LocationId, amount: number) {
    const dontShowWarningStorageKey = `${this.getAccount()?.toLowerCase()}-withdrawnWarningAcked`;

    if (localStorage.getItem(dontShowWarningStorageKey) !== 'true') {
      localStorage.setItem(dontShowWarningStorageKey, 'true');
      const confirmationText =
        `Are you sure you want withdraw this silver? Once you withdraw it, you ` +
        `cannot deposit it again. Your withdrawn silver amount will be added to your score. You'll only see this warning once!`;
      if (!confirm(confirmationText)) return;
    }

    this.gameManager.withdrawSilver(locationId, amount);
  }

  startWormholeFrom(planet: LocatablePlanet): Promise<LocatablePlanet | undefined> {
    this.isChoosingTargetPlanet = true;
    this.mouseDownOverCoords = planet.location.coords;
    this.mouseDownOverPlanet = planet;

    const [resolve, _reject, resultPromise] = deferred<LocatablePlanet | undefined>();

    this.onChooseTargetPlanet = resolve;

    return resultPromise;
  }

  public revealLocation(locationId: LocationId) {
    this.gameManager.revealLocation(locationId);
  }

  public getNextBroadcastAvailableTimestamp() {
    return this.gameManager.getNextBroadcastAvailableTimestamp();
  }

  public getConversation(artifactId: ArtifactId): Promise<Conversation | undefined> {
    return this.gameManager.getConversation(artifactId);
  }

  public startConversation(artifactId: ArtifactId): Promise<Conversation> {
    return this.gameManager.startConversation(artifactId);
  }

  public stepConversation(artifactId: ArtifactId, message: string): Promise<Conversation> {
    return this.gameManager.stepConversation(artifactId, message);
  }

  public getEnergyArrivingForMove(
    from: LocationId,
    to: LocationId | undefined,
    dist: number | undefined,
    energy: number
  ) {
    return this.gameManager.getEnergyArrivingForMove(from, to, dist, energy);
  }

  getIsChoosingTargetPlanet() {
    return this.isChoosingTargetPlanet;
  }

  onMouseDown(coords: WorldCoords) {
    if (this.sendingPlanet) return;

    const hoveringOverCoords = this.updateMouseHoveringOverCoords(coords);
    const hoveringOverPlanet = this.gameManager.getPlanetWithCoords(hoveringOverCoords);

    if (this.getIsChoosingTargetPlanet()) {
      this.isChoosingTargetPlanet = false;
      if (this.onChooseTargetPlanet) {
        this.onChooseTargetPlanet(hoveringOverPlanet as LocatablePlanet);
        this.mouseDownOverPlanet = undefined;
        this.mouseDownOverCoords = undefined;
      }
    } else {
      this.mouseDownOverPlanet = hoveringOverPlanet;
      this.mouseDownOverCoords = this.mouseHoveringOverCoords;
    }
  }

  onMouseClick(_coords: WorldCoords) {
    if (!this.mouseDownOverPlanet && !this.mouseHoveringOverPlanet) {
      this.setSelectedPlanet(undefined);
      this.selectedCoords = undefined;
    }
  }

  onMouseMove(coords: WorldCoords) {
    this.updateMouseHoveringOverCoords(coords);
  }

  onMouseUp(coords: WorldCoords) {
    const mouseUpOverCoords = this.updateMouseHoveringOverCoords(coords);
    const mouseUpOverPlanet = this.gameManager.getPlanetWithCoords(mouseUpOverCoords);

    const mouseDownPlanet = this.getMouseDownPlanet();

    if (mouseUpOverPlanet) {
      if (
        this.mouseDownOverPlanet &&
        mouseUpOverPlanet.locationId === this.mouseDownOverPlanet.locationId
      ) {
        // select planet
        this.setSelectedPlanet(mouseUpOverPlanet);
        this.selectedCoords = mouseUpOverCoords;
        this.terminal.current?.println(`Selected: ${mouseUpOverPlanet.locationId}`);
      } else if (mouseDownPlanet && mouseDownPlanet.owner === this.gameManager.getAccount()) {
        // move initiated if enough forces
        const from = mouseDownPlanet;
        const to = mouseUpOverPlanet;

        // TODO: the following code block needs to be in a Planet class
        let effectiveEnergy = from.energy;
        for (const unconfirmedMove of from.unconfirmedDepartures) {
          effectiveEnergy -= unconfirmedMove.forces;
        }
        const effPercent = Math.min(this.getForcesSending(from.locationId), 98);
        let forces = Math.floor((effectiveEnergy * effPercent) / 100);

        // make it so you leave one force behind
        if (forces >= from.energy) {
          forces = from.energy - 1;
          if (forces < 1) return;
        }

        const dist = this.gameManager.getDist(from.locationId, to.locationId);

        const myAtk: number = this.gameManager.getEnergyArrivingForMove(
          from.locationId,
          to.locationId,
          dist,
          forces
        );

        let effPercentSilver = this.getSilverSending(from.locationId);

        if (
          effPercentSilver > 98 &&
          from.planetType === PlanetType.SILVER_MINE &&
          from.silver < from.silverCap
        ) {
          // player is trying to send 100% silver from a silver mine that is not at cap
          // Date.now() and block.timestamp are occasionally a bit out of sync, so clip
          effPercentSilver = 98;
        }
        if (myAtk > 0) {
          const silver = Math.floor((from.silver * effPercentSilver) / 100);
          // TODO: do something like JSON.stringify(args) so we know formatting is correct
          this.terminal.current?.printShellLn(
            `df.move('${from.locationId}', '${to.locationId}', ${forces}, ${silver})`
          );
          const artifact = this.getArtifactSending(from.locationId);

          this.gameManager.move(from.locationId, to.locationId, forces, silver, artifact?.id);
          const tutorialManager = TutorialManager.getInstance();
          tutorialManager.acceptInput(TutorialState.SendFleet);
        }
      }

      this.isChoosingTargetPlanet = false;
    }

    this.mouseDownOverPlanet = undefined;
    this.mouseDownOverCoords = undefined;

    const uiEmitter = UIEmitter.getInstance();
    uiEmitter.emit(UIEmitterEvent.SendCompleted);
    this.sendingPlanet = undefined;
    this.isSending = false;
  }

  onMouseOut() {
    this.mouseDownOverPlanet = undefined;
    this.mouseDownOverCoords = undefined;
    this.setHoveringOverPlanet(undefined);
    this.mouseHoveringOverCoords = undefined;
  }

  startExplore() {
    this.gameManager.startExplore();
  }

  stopExplore() {
    this.gameManager.stopExplore();
    this.minerLocation = undefined;
  }

  setForcesSending(planetId: LocationId, percentage: number) {
    this.forcesSending[planetId] = percentage;
  }

  setSilverSending(planetId: LocationId, percentage: number) {
    this.silverSending[planetId] = percentage;
  }

  setArtifactSending(planetId: LocationId, artifact?: Artifact) {
    this.artifactSending[planetId] = artifact;
  }

  isOwnedByMe(planet: Planet): boolean {
    return planet.owner === this.gameManager.getAccount();
  }

  setDetailLevel(level: number) {
    this.detailLevel = level;
  }

  addNewChunk(chunk: ExploredChunkData) {
    this.gameManager.addNewChunk(chunk);
  }

  bulkAddNewChunks(chunks: ExploredChunkData[]): Promise<void> {
    return this.gameManager.bulkAddNewChunks(chunks);
  }

  // mining stuff
  setMiningPattern(pattern: MiningPattern) {
    this.gameManager.setMiningPattern(pattern);
  }

  getMiningPattern(): MiningPattern | undefined {
    return this.gameManager.getMiningPattern();
  }

  isMining(): boolean {
    return this.gameManager.isMining();
  }

  // getters

  getAccount(): EthAddress | undefined {
    return this.gameManager.getAccount();
  }

  getTwitter(address: EthAddress | undefined): string | undefined {
    return this.gameManager.getTwitter(address);
  }

  getEndTimeSeconds(): number {
    return this.gameManager.getEndTimeSeconds();
  }

  getUpgrade(branch: UpgradeBranchName, level: number): Upgrade {
    return this.gameManager.getUpgrade(branch, level);
  }

  private getBiomeKey(biome: Biome) {
    return `${this.getAccount()}-${this.gameManager.getContractAddress()}-biome-${biome}`;
  }

  getDiscoverBiomeName(biome: Biome): string {
    const item = localStorage.getItem(this.getBiomeKey(biome));
    if (item === 'true') {
      return biomeName(biome);
    }
    return 'Undiscovered';
  }

  getDistCoords(from: WorldCoords, to: WorldCoords) {
    return this.gameManager.getDistCoords(from, to);
  }

  discoverBiome(planet: LocatablePlanet): void {
    const key = this.getBiomeKey(planet.biome);
    const item = localStorage.getItem(key);
    if (item !== 'true') {
      const notifManager = NotificationManager.getInstance();
      localStorage.setItem(key, 'true');
      notifManager.foundBiome(planet);
    }
  }

  getAllPlayers(): Player[] {
    return this.gameManager.getAllPlayers();
  }

  getDetailLevel(): number {
    return this.detailLevel;
  }

  getSelectedPlanet(): Planet | undefined {
    return this.selectedPlanet;
  }

  getPreviousSelectedPlanet(): Planet | undefined {
    return this.previousSelectedPlanet;
  }

  setSelectedId(id: LocationId): void {
    const planet = this.getPlanetWithId(id);
    if (planet) this.setSelectedPlanet(planet);
  }

  setSelectedPlanet(planet: Planet | undefined): void {
    this.previousSelectedPlanet = this.selectedPlanet;

    if (!planet) {
      const tutorialManager = TutorialManager.getInstance();
      tutorialManager.acceptInput(TutorialState.Deselect);
    }

    const uiEmitter = UIEmitter.getInstance();
    this.selectedPlanet = planet;
    if (!planet) {
      this.selectedCoords = undefined;
    } else {
      const loc = this.getLocationOfPlanet(planet.locationId);
      if (!loc) this.selectedCoords = undefined;
      else {
        // loc is not undefined
        this.selectedCoords = loc.coords;

        if (coordsEqual(loc.coords, this.getHomeCoords())) {
          const tutorialManager = TutorialManager.getInstance();
          tutorialManager.acceptInput(TutorialState.HomePlanet);
        }
      }
    }
    uiEmitter.emit(UIEmitterEvent.GamePlanetSelected);

    this.selectedPlanetId$.publish(planet?.locationId);
  }

  getSelectedCoords(): WorldCoords | undefined {
    return this.selectedCoords;
  }

  getMouseDownPlanet(): Planet | undefined {
    if (this.isSending && this.sendingPlanet) return this.sendingPlanet;
    return this.mouseDownOverPlanet;
  }

  onSendInit(planet: Planet | undefined): void {
    this.isSending = true;
    this.sendingPlanet = planet;
    const loc = planet && this.getLocationOfPlanet(planet.locationId);
    this.sendingCoords = loc ? loc.coords : { x: 0, y: 0 };
  }

  onSendCancel(): void {
    this.isSending = false;
    this.sendingPlanet = undefined;
    this.sendingCoords = undefined;
  }

  hasMinedChunk(chunkLocation: Rectangle): boolean {
    return this.gameManager.hasMinedChunk(chunkLocation);
  }

  getChunk(chunkFootprint: Rectangle): ExploredChunkData | undefined {
    return this.gameManager.getChunk(chunkFootprint);
  }

  spaceTypeFromPerlin(perlin: number): SpaceType {
    return this.gameManager.spaceTypeFromPerlin(perlin);
  }

  getSpaceTypePerlin(coords: WorldCoords, floor: boolean): number {
    return this.gameManager.spaceTypePerlin(coords, floor);
  }

  getBiomePerlin(coords: WorldCoords, floor: boolean): number {
    return this.gameManager.biomebasePerlin(coords, floor);
  }

  onDiscoveredChunk(chunk: ExploredChunkData): void {
    const res = this.gameManager.getCurrentlyExploringChunk();
    if (res) {
      const { bottomLeft, sideLength } = res;
      this.minerLocation = {
        x: bottomLeft.x + sideLength / 2,
        y: bottomLeft.y + sideLength / 2,
      };
    } else {
      this.minerLocation = undefined;
    }

    // TODO: skip this if everything has already been found
    const notifManager = NotificationManager.getInstance();
    for (const loc of chunk.planetLocations) {
      const planet = this.getPlanetWithId(loc.hash);
      if (!planet) break;

      if (planet.owner === EMPTY_ADDRESS && planet.energy > 0) {
        if (
          !this.getUIDataItem(UIDataKey.foundPirates) &&
          this.getUIDataItem(UIDataKey.tutorialCompleted)
        ) {
          notifManager.foundPirates(planet);
          this.setUIDataItem(UIDataKey.foundPirates, true);
        }
      }

      if (planet.planetType === PlanetType.SILVER_MINE) {
        if (
          !this.getUIDataItem(UIDataKey.foundSilver) &&
          this.getUIDataItem(UIDataKey.tutorialCompleted)
        ) {
          notifManager.foundSilver(planet);
          this.setUIDataItem(UIDataKey.foundSilver, true);
        }
      }
      if (planet.planetType === PlanetType.SILVER_BANK) {
        if (
          !this.getUIDataItem(UIDataKey.foundSilverBank) &&
          this.getUIDataItem(UIDataKey.tutorialCompleted)
        ) {
          notifManager.foundSilverBank(planet);
          this.setUIDataItem(UIDataKey.foundSilverBank, true);
        }
      }
      if (planet.planetType === PlanetType.TRADING_POST) {
        if (
          !this.getUIDataItem(UIDataKey.foundTradingPost) &&
          this.getUIDataItem(UIDataKey.tutorialCompleted)
        ) {
          notifManager.foundTradingPost(planet);
          this.setUIDataItem(UIDataKey.foundTradingPost, true);
        }
      }
      if (planetHasBonus(planet)) {
        if (
          !this.getUIDataItem(UIDataKey.foundComet) &&
          this.getUIDataItem(UIDataKey.tutorialCompleted)
        ) {
          notifManager.foundComet(planet);
          this.setUIDataItem(UIDataKey.foundComet, true);
        }
      }
      if (isLocatable(planet) && planet.planetType === PlanetType.PLANET) {
        this.discoverBiome(planet);
      }
      if (isLocatable(planet) && planet.planetType === PlanetType.RUINS) {
        if (
          !this.getUIDataItem(UIDataKey.foundArtifact) &&
          this.getUIDataItem(UIDataKey.tutorialCompleted)
        ) {
          notifManager.foundArtifact(planet);
          this.setUIDataItem(UIDataKey.foundArtifact, true);
        }
      }
    }

    if (this.spaceTypeFromPerlin(chunk.perlin) === SpaceType.DEEP_SPACE) {
      if (
        !this.getUIDataItem(UIDataKey.foundDeepSpace) &&
        this.getUIDataItem(UIDataKey.tutorialCompleted)
      ) {
        notifManager.foundDeepSpace(chunk);
        this.setUIDataItem(UIDataKey.foundDeepSpace, true);
      }
    } else if (this.spaceTypeFromPerlin(chunk.perlin) === SpaceType.SPACE) {
      if (
        !this.getUIDataItem(UIDataKey.foundSpace) &&
        this.getUIDataItem(UIDataKey.tutorialCompleted)
      ) {
        notifManager.foundSpace(chunk);
        this.setUIDataItem(UIDataKey.foundSpace, true);
      }
    } else if (this.spaceTypeFromPerlin(chunk.perlin) === SpaceType.DEAD_SPACE) {
      if (
        !this.getUIDataItem(UIDataKey.foundDeadSpace) &&
        this.getUIDataItem(UIDataKey.tutorialCompleted)
      ) {
        notifManager.foundDeadSpace(chunk);
        this.setUIDataItem(UIDataKey.foundDeadSpace, true);
      }
    }
  }

  getMinerLocation(): WorldCoords | undefined {
    return this.minerLocation;
  }

  setExtraMinerLocation(idx: number, coords: WorldCoords): void {
    this.extraMinerLocations[idx] = coords;
  }

  removeExtraMinerLocation(idx: number): void {
    this.extraMinerLocations.splice(idx, 1);
  }

  getAllMinerLocations(): WorldCoords[] {
    if (this.minerLocation) {
      return [this.minerLocation, ...this.extraMinerLocations];
    } else {
      return this.extraMinerLocations;
    }
  }

  getMouseDownCoords(): WorldCoords | undefined {
    if (this.isSending && this.sendingPlanet) return this.sendingCoords;
    return this.mouseDownOverCoords;
  }

  private setHoveringOverPlanet(planet: Planet | undefined) {
    const lastHover = this.mouseHoveringOverPlanet;

    this.mouseHoveringOverPlanet = planet;

    if (lastHover?.locationId !== planet?.locationId) {
      this.hoverPlanetId$.publish(planet?.locationId);
    }
  }

  getHoveringOverPlanet(): Planet | undefined {
    return this.mouseHoveringOverPlanet;
  }

  getHoveringOverCoords(): WorldCoords | undefined {
    return this.mouseHoveringOverCoords;
  }

  getForcesSending(planetId: LocationId): number {
    return this.forcesSending[planetId] || 50;
  }

  getSilverSending(planetId: LocationId): number {
    return this.silverSending[planetId] || 0;
  }

  getArtifactSending(planetId: LocationId): Artifact | undefined {
    return this.artifactSending[planetId];
  }

  isOverOwnPlanet(coords: WorldCoords): Planet | undefined {
    const res = this.planetHitboxForCoords(coords);
    const planet: LocatablePlanet | undefined = res;
    if (!planet) {
      return undefined;
    }
    return planet.owner === this.gameManager.getAccount() ? planet : undefined;
  }

  getMyArtifacts(): Artifact[] {
    return this.gameManager.getMyArtifacts();
  }

  getMyArtifactsNotOnPlanet(): Artifact[] {
    return this.getMyArtifacts().filter((a) => !a.onPlanetId);
  }

  getPlanetWithId(planetId: LocationId): Planet | undefined {
    return this.gameManager.getPlanetWithId(planetId);
  }

  getMyScore(): number {
    return this.gameManager.getMyScore();
  }

  getArtifactWithId(artifactId: ArtifactId): Artifact | undefined {
    return this.gameManager.getArtifactWithId(artifactId);
  }

  getPlanetWithCoords(coords: WorldCoords | undefined): Planet | undefined {
    return coords && this.gameManager.getPlanetWithCoords(coords);
  }

  getArtifactsWithIds(artifactIds: ArtifactId[]): Array<Artifact | undefined> {
    return this.gameManager.getArtifactsWithIds(artifactIds);
  }

  getArtifactPlanet(artifact: Artifact): Planet | undefined {
    if (!artifact.onPlanetId) return undefined;
    return this.getPlanetWithId(artifact.onPlanetId);
  }

  getPlanetLevel(planetId: LocationId): PlanetLevel | undefined {
    return this.gameManager.getPlanetLevel(planetId);
  }

  getPlanetDetailLevel(planetId: LocationId): number | undefined {
    return this.gameManager.getPlanetDetailLevel(planetId);
  }

  getAllOwnedPlanets(): Planet[] {
    return this.gameManager.getAllOwnedPlanets();
  }

  getAllVoyages(): QueuedArrival[] {
    return this.gameManager.getAllVoyages();
  }

  getUnconfirmedMoves(): UnconfirmedMove[] {
    return this.gameManager.getUnconfirmedMoves();
  }

  getUnconfirmedUpgrades(): UnconfirmedUpgrade[] {
    return this.gameManager.getUnconfirmedUpgrades();
  }

  isCurrentlyRevealing(): boolean {
    return this.gameManager.getNextRevealCountdownInfo().currentlyRevealing;
  }

  getUnconfirmedWormholeActivations(): UnconfirmedActivateArtifact[] {
    return this.gameManager.getUnconfirmedWormholeActivations();
  }

  getWormholes(): Iterable<Wormhole> {
    return this.gameManager.getWormholes();
  }

  getLocationOfPlanet(planetId: LocationId): WorldLocation | undefined {
    return this.gameManager.getLocationOfPlanet(planetId);
  }

  getExploredChunks(): Iterable<ExploredChunkData> {
    return this.gameManager.getExploredChunks();
  }

  getLocationsAndChunks(): {
    locations: Iterable<WorldLocation>;
    chunks: Iterable<ExploredChunkData>;
  } {
    const locations: Set<WorldLocation> = new Set();
    const chunks: Set<ExploredChunkData> = new Set();

    const viewport = Viewport.getInstance();
    const exploredChunks = this.getExploredChunks();

    for (const exploredChunk of exploredChunks) {
      if (viewport.intersectsViewport(exploredChunk)) {
        chunks.add(exploredChunk);
        for (const planetLocation of exploredChunk.planetLocations) {
          locations.add(planetLocation);
        }
      }
    }
    // revealed locations are not necessarily included in a chunk
    const revealedLocationsMap = this.gameManager.getRevealedLocations();
    for (const location of revealedLocationsMap.values()) {
      if (viewport.isInOrAroundViewport(location.coords)) locations.add(location);
    }
    return { locations, chunks };
  }

  getPlanetsInViewport(): Planet[] {
    return Array.from(this.getLocationsAndChunks().locations).map((loc) =>
      this.gameManager.getPlanetWithCoords(loc.coords)
    ) as Planet[];
  }

  getWorldRadius(): number {
    return this.gameManager.getWorldRadius();
  }

  getWorldSilver(): number {
    return this.gameManager.getWorldSilver();
  }

  getUniverseTotalEnergy(): number {
    return this.gameManager.getUniverseTotalEnergy();
  }

  getSilverOfPlayer(player: EthAddress): number {
    return this.gameManager.getSilverOfPlayer(player);
  }

  getEnergyOfPlayer(player: EthAddress): number {
    return this.gameManager.getEnergyOfPlayer(player);
  }

  getWithdrawnSilverOfPlayer(player: EthAddress): number {
    return this.gameManager.getWithdrawnSilverOfPlayer(player);
  }

  upgrade(planet: Planet, branch: number): void {
    // TODO: do something like JSON.stringify(args) so we know formatting is correct
    this.terminal.current?.printShellLn(`df.upgrade('${planet.locationId}', ${branch})`);
    this.gameManager.upgrade(planet.locationId, branch);
  }

  buyHat(planet: Planet): void {
    // TODO: do something like JSON.stringify(args) so we know formatting is correct
    this.terminal.current?.printShellLn(`df.buyHat('${planet.locationId}')`);
    this.gameManager.buyHat(planet.locationId);
  }

  buyGPTCredits(amount: number) {
    this.gameManager.buyGPTCredits(amount);
  }

  public getGptCreditPriceEmitter(): Monomitter<number> {
    return this.gameManager.getGptCreditPriceEmitter();
  }

  public getGptCreditBalanceEmitter(): Monomitter<number> {
    return this.gameManager.getGptCreditBalanceEmitter();
  }

  public getIsBuyingCreditsEmitter(): Monomitter<boolean> {
    return this.gameManager.getIsBuyingCreditsEmitter();
  }

  // non-nullable
  getHomeCoords(): WorldCoords {
    return this.gameManager.getHomeCoords() || { x: 0, y: 0 };
  }
  getHomeHash(): LocationId | undefined {
    return this.gameManager.getHomeHash();
  }
  getHomePlanet(): Planet | undefined {
    const homeHash = this.getHomeHash();
    if (!homeHash) return undefined;
    return this.getPlanetWithId(homeHash);
  }

  getRadiusOfPlanetLevel(planetRarity: PlanetLevel): number {
    return this.radiusMap[planetRarity];
  }

  getEnergyCurveAtPercent(planet: Planet, percent: number): number {
    return this.gameManager.getEnergyCurveAtPercent(planet, percent);
  }

  getSilverCurveAtPercent(planet: Planet, percent: number): number | undefined {
    return this.gameManager.getSilverCurveAtPercent(planet, percent);
  }

  getHashesPerSec(): number {
    return this.gameManager.getHashesPerSec();
  }

  generateVerificationTweet(twitter: string): Promise<string> {
    return this.gameManager.getSignedTwitter(twitter);
  }

  getPerlinThresholds(): [number, number, number] {
    return this.gameManager.getPerlinThresholds();
  }

  getHashConfig(): HashConfig {
    return this.gameManager.getHashConfig();
  }

  setUIDataItem(key: UIDataKey, value: number | boolean): void {
    this.gameManager.setUIDataItem(key, value);
  }

  getUIDataItem(key: UIDataKey): number | boolean {
    return this.gameManager.getUIDataItem(key);
  }

  getViewport(): Viewport {
    return Viewport.getInstance();
  }

  public getPlanetMap(): Map<LocationId, Planet> {
    return this.gameManager.getPlanetMap();
  }

  public getArtifactMap(): Map<ArtifactId, Artifact> {
    return this.gameManager.getArtifactMap();
  }

  public getMyPlanetMap(): Map<LocationId, Planet> {
    return this.gameManager.getMyPlanetMap();
  }

  public getMyArtifactMap(): Map<ArtifactId, Artifact> {
    return this.gameManager.getMyArtifactMap();
  }

  public getTerminal(): TerminalHandle | undefined {
    return this.terminal.current;
  }

  public getContractConstants(): ContractConstants {
    return this.gameManager.getContractConstants();
  }

  // internal utils

  private updatePlanets() {
    if (this.selectedPlanet) {
      this.selectedPlanet = this.gameManager.getPlanetWithId(this.selectedPlanet.locationId);
    }
    if (this.mouseDownOverPlanet) {
      this.mouseDownOverPlanet = this.gameManager.getPlanetWithId(
        this.mouseDownOverPlanet.locationId
      );
    }
    if (this.mouseHoveringOverPlanet) {
      this.setHoveringOverPlanet(
        this.gameManager.getPlanetWithId(this.mouseHoveringOverPlanet.locationId)
      );
    }
  }

  private updateMouseHoveringOverCoords(coords: WorldCoords): WorldCoords {
    // if the mouse is inside hitbox of a planet, snaps the mouse to center of planet
    this.mouseHoveringOverCoords = coords;
    let hoveringPlanet = undefined;

    const res = this.planetHitboxForCoords(coords);
    if (res) {
      hoveringPlanet = res;
      this.mouseHoveringOverCoords = res.location.coords;
    }

    this.setHoveringOverPlanet(hoveringPlanet);

    this.mouseHoveringOverCoords = {
      x: Math.round(this.mouseHoveringOverCoords.x),
      y: Math.round(this.mouseHoveringOverCoords.y),
    };
    return this.mouseHoveringOverCoords;
  }

  private planetHitboxForCoords(coords: WorldCoords): LocatablePlanet | undefined {
    return this.gameManager.getPlanetHitboxForCoords(coords, this.radiusMap);
  }

  private onEmitInitializedPlayer() {
    this.emit(GameUIManagerEvent.InitializedPlayer);
  }

  private onEmitInitializedPlayerError(err: React.ReactNode) {
    this.emit(GameUIManagerEvent.InitializedPlayerError, err);
  }
}

export default GameUIManager;
