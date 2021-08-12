import { EMPTY_ADDRESS } from '@darkforest_eth/constants';
import { Monomitter, monomitter } from '@darkforest_eth/events';
import { PerlinConfig } from '@darkforest_eth/hashing';
import { planetHasBonus } from '@darkforest_eth/hexgen';
import { EthConnection } from '@darkforest_eth/network';
import {
  Artifact,
  ArtifactId,
  Biome,
  Conversation,
  Diagnostics,
  EthAddress,
  LocatablePlanet,
  LocationId,
  Planet,
  PlanetLevel,
  PlanetType,
  Player,
  QueuedArrival,
  SpaceType,
  UnconfirmedActivateArtifact,
  UnconfirmedMove,
  UnconfirmedUpgrade,
  Upgrade,
  UpgradeBranchName,
  WorldCoords,
  WorldLocation,
} from '@darkforest_eth/types';
import autoBind from 'auto-bind';
import { BigNumber } from 'ethers';
import EventEmitter from 'events';
import deferred from 'p-defer';
import NotificationManager from '../../Frontend/Game/NotificationManager';
import Viewport from '../../Frontend/Game/Viewport';
import WindowManager, { CursorState } from '../../Frontend/Game/WindowManager';
import { getObjectWithIdFromMap } from '../../Frontend/Utils/EmitterUtils';
import { listenForKeyboardEvents, unlinkKeyboardEvents } from '../../Frontend/Utils/KeyEmitters';
import {
  getBooleanSetting,
  getSetting,
  setBooleanSetting,
  Setting,
} from '../../Frontend/Utils/SettingsHooks';
import UIEmitter, { UIEmitterEvent } from '../../Frontend/Utils/UIEmitter';
import { TerminalHandle } from '../../Frontend/Views/Terminal';
import { ContractConstants } from '../../_types/darkforest/api/ContractsAPITypes';
import {
  Chunk,
  HashConfig,
  isLocatable,
  Rectangle,
  Wormhole,
} from '../../_types/global/GlobalTypes';
import { MiningPattern } from '../Miner/MiningPatterns';
import { coordsEqual } from '../Utils/Coordinates';
import { biomeName } from './ArtifactUtils';
import GameManager, { GameManagerEvent } from './GameManager';
import { GameObjects } from './GameObjects';
import { PluginManager } from './PluginManager';
import TutorialManager, { TutorialState } from './TutorialManager';
import { ViewportEntities } from './ViewportEntities';

export const enum GameUIManagerEvent {
  InitializedPlayer = 'InitializedPlayer',
  InitializedPlayerError = 'InitializedPlayerError',
}

class GameUIManager extends EventEmitter {
  private readonly radiusMap: { [PlanetLevel: number]: number };
  private readonly gameManager: GameManager;

  private terminal: React.MutableRefObject<TerminalHandle | undefined>;
  private previousSelectedPlanet: Planet | undefined;
  private selectedPlanet: LocatablePlanet | undefined;
  private selectedCoords: WorldCoords | undefined;
  private mouseDownOverPlanet: LocatablePlanet | undefined;
  private mouseDownOverCoords: WorldCoords | undefined;
  private mouseHoveringOverPlanet: LocatablePlanet | undefined;
  private mouseHoveringOverCoords: WorldCoords | undefined;
  private sendingPlanet: LocatablePlanet | undefined;
  private sendingCoords: WorldCoords | undefined;
  private isSending = false;
  private viewportEntities: ViewportEntities;

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
    } as const;

    this.plugins = new PluginManager(gameManager);

    this.selectedPlanetId$ = monomitter<LocationId | undefined>(true);
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
    this.viewportEntities = new ViewportEntities(this.gameManager, this);

    autoBind(this);
  }

  public static async create(
    gameManager: GameManager,
    terminalHandle: React.MutableRefObject<TerminalHandle | undefined>
  ) {
    listenForKeyboardEvents();
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

  public destroy(): void {
    unlinkKeyboardEvents();
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

  public getStringSetting(setting: Setting): string | undefined {
    const address = this.getAccount();

    return address && getSetting(address, setting);
  }

  public getBooleanSetting(setting: Setting): boolean {
    const address = this.getAccount();

    if (!address) {
      return false;
    }

    return getBooleanSetting(address, setting);
  }

  public getDiagnostics(): Diagnostics {
    return this.gameManager.getDiagnostics();
  }

  public updateDiagnostics(updateFn: (d: Diagnostics) => void) {
    this.gameManager.updateDiagnostics(updateFn);
  }

  public getEthConnection(): EthConnection {
    return this.gameManager.getEthConnection();
  }

  public getContractAddress(): EthAddress {
    return this.gameManager.getContractAddress();
  }

  // actions

  public centerPlanet(planet: LocatablePlanet | undefined) {
    if (planet) {
      Viewport.getInstance().centerPlanet(planet);
      this.setSelectedPlanet(planet);
    }
  }

  public centerCoords(coords: WorldCoords) {
    const planet = this.gameManager.getPlanetWithCoords(coords);
    if (planet && isLocatable(planet)) {
      this.centerPlanet(planet);
    } else {
      Viewport.getInstance().centerCoords(coords);
    }
  }

  public centerLocationId(planetId: LocationId) {
    const planet = this.getPlanetWithId(planetId);
    if (planet && isLocatable(planet)) {
      this.centerPlanet(planet);
    }
  }

  public joinGame(beforeRetry: (e: Error) => Promise<boolean>): GameUIManager {
    this.gameManager
      .joinGame(beforeRetry)
      .once(GameManagerEvent.InitializedPlayer, this.onEmitInitializedPlayer)
      .once(GameManagerEvent.InitializedPlayerError, this.onEmitInitializedPlayerError);

    return this;
  }

  public addAccount(coords: WorldCoords): Promise<boolean> {
    return this.gameManager.addAccount(coords);
  }

  public verifyTwitter(twitter: string): Promise<boolean> {
    return this.gameManager.submitVerifyTwitter(twitter);
  }

  public disconnectTwitter(twitter: string) {
    return this.gameManager.submitDisconnectTwitter(twitter);
  }

  public getPluginManager(): PluginManager {
    return this.plugins;
  }

  public getPrivateKey(): string | undefined {
    return this.gameManager.getPrivateKey();
  }

  public getMyBalance(): number {
    return this.gameManager.getMyBalanceEth();
  }

  public getMyBalance$(): Monomitter<BigNumber> {
    return this.gameManager.getMyBalance$();
  }

  public findArtifact(planetId: LocationId) {
    if (this.gameManager.isRoundOver()) {
      alert('This round has ended, and you can no longer find artifacts!');
      return;
    }
    this.gameManager.findArtifact(planetId);
  }

  public prospectPlanet(planetId: LocationId) {
    if (this.gameManager.isRoundOver()) {
      alert('This round has ended, and you can no longer find artifacts!');
      return;
    }
    this.gameManager.prospectPlanet(planetId);
  }

  public withdrawArtifact(locationId: LocationId, artifactId: ArtifactId) {
    this.gameManager.withdrawArtifact(locationId, artifactId);
  }

  public depositArtifact(locationId: LocationId, artifactId: ArtifactId) {
    this.gameManager.depositArtifact(locationId, artifactId);
  }

  public activateArtifact(locationId: LocationId, id: ArtifactId, wormholeTo?: LocationId) {
    const confirmationText =
      `Are you sure you want to activate this artifact? ` +
      `You can only have one artifact active at time. After` +
      ` deactivation, you must wait for a long cooldown` +
      ` before you can activate it again. Some artifacts (bloom filter, black domain, photoid cannon) are consumed on usage.`;

    if (!confirm(confirmationText)) return;

    this.gameManager.activateArtifact(locationId, id, wormholeTo);
  }

  public deactivateArtifact(locationId: LocationId, artifactId: ArtifactId) {
    const confirmationText =
      `Are you sure you want to deactivate this artifact? ` +
      `After deactivation, you must wait for a long cooldown` +
      ` before you can activate it again. Some artifacts (planetary shields) are consumed on deactivation.`;

    if (!confirm(confirmationText)) return;

    this.gameManager.deactivateArtifact(locationId, artifactId);
  }

  public withdrawSilver(locationId: LocationId, amount: number) {
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

  public startWormholeFrom(planet: LocatablePlanet): Promise<LocatablePlanet | undefined> {
    this.isChoosingTargetPlanet = true;
    this.mouseDownOverCoords = planet.location.coords;
    this.mouseDownOverPlanet = planet;

    const { resolve, promise } = deferred<LocatablePlanet | undefined>();

    this.onChooseTargetPlanet = resolve;

    return promise;
  }

  public revealLocation(locationId: LocationId) {
    this.gameManager.revealLocation(locationId);
  }

  public claimLocation(locationId: LocationId) {
    this.gameManager.claimLocation(locationId);
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

  public onMouseDown(coords: WorldCoords) {
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

  public onMouseClick(_coords: WorldCoords) {
    if (!this.mouseDownOverPlanet && !this.mouseHoveringOverPlanet) {
      this.setSelectedPlanet(undefined);
      this.selectedCoords = undefined;
    }
  }

  public onMouseMove(coords: WorldCoords) {
    this.updateMouseHoveringOverCoords(coords);
  }

  public onMouseUp(coords: WorldCoords) {
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
        this.terminal.current?.println(``);
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

  public onMouseOut() {
    this.mouseDownOverPlanet = undefined;
    this.mouseDownOverCoords = undefined;
    this.setHoveringOverPlanet(undefined);
    this.mouseHoveringOverCoords = undefined;
  }

  public startExplore() {
    this.gameManager.startExplore();
  }

  public stopExplore() {
    this.gameManager.stopExplore();
    this.minerLocation = undefined;
  }

  public toggleExplore() {
    if (this.isMining()) {
      this?.stopExplore();
      TutorialManager.getInstance().acceptInput(TutorialState.MinerPause);
    } else {
      this?.startExplore();
    }
  }

  public toggleTargettingExplorer() {
    const windowManager = WindowManager.getInstance();
    if (windowManager.getCursorState() === CursorState.TargetingExplorer)
      windowManager.setCursorState(CursorState.Normal);
    else windowManager.setCursorState(CursorState.TargetingExplorer);
  }

  public setForcesSending(planetId: LocationId, percentage: number) {
    this.forcesSending[planetId] = percentage;
  }

  public setSilverSending(planetId: LocationId, percentage: number) {
    this.silverSending[planetId] = percentage;
  }

  public setArtifactSending(planetId: LocationId, artifact?: Artifact) {
    this.artifactSending[planetId] = artifact;
  }

  public isOwnedByMe(planet: Planet): boolean {
    return planet.owner === this.gameManager.getAccount();
  }

  public addNewChunk(chunk: Chunk) {
    this.gameManager.addNewChunk(chunk);
  }

  public bulkAddNewChunks(chunks: Chunk[]): Promise<void> {
    return this.gameManager.bulkAddNewChunks(chunks);
  }

  // mining stuff
  public setMiningPattern(pattern: MiningPattern) {
    this.gameManager.setMiningPattern(pattern);
  }

  public getMiningPattern(): MiningPattern | undefined {
    return this.gameManager.getMiningPattern();
  }

  public isMining(): boolean {
    return this.gameManager.isMining();
  }

  // getters

  public getAccount(): EthAddress | undefined {
    return this.gameManager.getAccount();
  }

  public getTwitter(address: EthAddress | undefined): string | undefined {
    return this.gameManager.getTwitter(address);
  }

  public getEndTimeSeconds(): number {
    return this.gameManager.getEndTimeSeconds();
  }

  public isRoundOver(): boolean {
    return this.gameManager.isRoundOver();
  }

  public getUpgrade(branch: UpgradeBranchName, level: number): Upgrade {
    return this.gameManager.getUpgrade(branch, level);
  }

  private getBiomeKey(biome: Biome) {
    return `${this.getAccount()}-${this.gameManager.getContractAddress()}-biome-${biome}`;
  }

  public getDiscoverBiomeName(biome: Biome): string {
    const item = localStorage.getItem(this.getBiomeKey(biome));
    if (item === 'true') {
      return biomeName(biome);
    }
    return 'Undiscovered';
  }

  public getDistCoords(from: WorldCoords, to: WorldCoords) {
    return this.gameManager.getDistCoords(from, to);
  }

  public discoverBiome(planet: LocatablePlanet): void {
    const key = this.getBiomeKey(planet.biome);
    const item = localStorage.getItem(key);
    if (item !== 'true') {
      const notifManager = NotificationManager.getInstance();
      localStorage.setItem(key, 'true');
      notifManager.foundBiome(planet);
    }
  }

  public getAllPlayers(): Player[] {
    return this.gameManager.getAllPlayers();
  }

  public getSelectedPlanet(): LocatablePlanet | undefined {
    return this.selectedPlanet;
  }

  public getPreviousSelectedPlanet(): Planet | undefined {
    return this.previousSelectedPlanet;
  }

  public setSelectedId(id: LocationId): void {
    const planet = this.getPlanetWithId(id);
    if (planet && isLocatable(planet)) this.setSelectedPlanet(planet);
  }

  public setSelectedPlanet(planet: LocatablePlanet | undefined): void {
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

  public getSelectedCoords(): WorldCoords | undefined {
    return this.selectedCoords;
  }

  public getMouseDownPlanet(): LocatablePlanet | undefined {
    if (this.isSending && this.sendingPlanet) return this.sendingPlanet;
    return this.mouseDownOverPlanet;
  }

  public onSendInit(planet: LocatablePlanet | undefined): void {
    this.isSending = true;
    this.sendingPlanet = planet;
    const loc = planet && this.getLocationOfPlanet(planet.locationId);
    this.sendingCoords = loc ? loc.coords : { x: 0, y: 0 };
  }

  public onSendCancel(): void {
    this.isSending = false;
    this.sendingPlanet = undefined;
    this.sendingCoords = undefined;
  }

  public hasMinedChunk(chunkLocation: Rectangle): boolean {
    return this.gameManager.hasMinedChunk(chunkLocation);
  }

  public getChunk(chunkFootprint: Rectangle): Chunk | undefined {
    return this.gameManager.getChunk(chunkFootprint);
  }

  public spaceTypeFromPerlin(perlin: number): SpaceType {
    return this.gameManager.spaceTypeFromPerlin(perlin);
  }

  public getSpaceTypePerlin(coords: WorldCoords, floor: boolean): number {
    return this.gameManager.spaceTypePerlin(coords, floor);
  }

  public getBiomePerlin(coords: WorldCoords, floor: boolean): number {
    return this.gameManager.biomebasePerlin(coords, floor);
  }

  public onDiscoveredChunk(chunk: Chunk): void {
    const res = this.gameManager.getCurrentlyExploringChunk();
    const account = this.getAccount();

    if (res) {
      const { bottomLeft, sideLength } = res;
      this.minerLocation = {
        x: bottomLeft.x + sideLength / 2,
        y: bottomLeft.y + sideLength / 2,
      };
    } else {
      this.minerLocation = undefined;
    }

    const notifManager = NotificationManager.getInstance();

    for (const loc of chunk.planetLocations) {
      const planet = this.getPlanetWithId(loc.hash);
      if (!planet || !account) break;

      if (planet.owner === EMPTY_ADDRESS && planet.energy > 0) {
        if (
          !this.getBooleanSetting(Setting.FoundPirates) &&
          this.getBooleanSetting(Setting.TutorialCompleted)
        ) {
          notifManager.foundPirates(planet);
          setBooleanSetting(account, Setting.FoundPirates, true);
        }
      }

      if (planet.planetType === PlanetType.SILVER_MINE) {
        if (
          !this.getBooleanSetting(Setting.FoundSilver) &&
          this.getBooleanSetting(Setting.TutorialCompleted)
        ) {
          notifManager.foundSilver(planet);
          setBooleanSetting(account, Setting.FoundSilver, true);
        }
      }
      if (planet.planetType === PlanetType.SILVER_BANK) {
        if (
          !this.getBooleanSetting(Setting.FoundSilverBank) &&
          this.getBooleanSetting(Setting.TutorialCompleted)
        ) {
          notifManager.foundSilverBank(planet);
          setBooleanSetting(account, Setting.FoundSilverBank, true);
        }
      }
      if (planet.planetType === PlanetType.TRADING_POST) {
        if (
          !this.getBooleanSetting(Setting.FoundTradingPost) &&
          this.getBooleanSetting(Setting.TutorialCompleted)
        ) {
          notifManager.foundTradingPost(planet);
          setBooleanSetting(account, Setting.FoundTradingPost, true);
        }
      }
      if (planetHasBonus(planet)) {
        if (
          !this.getBooleanSetting(Setting.FoundComet) &&
          this.getBooleanSetting(Setting.TutorialCompleted)
        ) {
          notifManager.foundComet(planet);
          setBooleanSetting(account, Setting.FoundComet, true);
        }
      }
      if (isLocatable(planet) && planet.planetType === PlanetType.PLANET) {
        this.discoverBiome(planet);
      }
      if (isLocatable(planet) && planet.planetType === PlanetType.RUINS) {
        if (
          !this.getBooleanSetting(Setting.FoundArtifact) &&
          this.getBooleanSetting(Setting.TutorialCompleted)
        ) {
          notifManager.foundFoundry(planet);
          setBooleanSetting(account, Setting.FoundArtifact, true);
        }
      }
    }

    if (account !== undefined) {
      if (this.spaceTypeFromPerlin(chunk.perlin) === SpaceType.DEEP_SPACE) {
        if (
          !this.getBooleanSetting(Setting.FoundDeepSpace) &&
          this.getBooleanSetting(Setting.TutorialCompleted)
        ) {
          notifManager.foundDeepSpace(chunk);
          setBooleanSetting(account, Setting.FoundDeepSpace, true);
        }
      } else if (this.spaceTypeFromPerlin(chunk.perlin) === SpaceType.SPACE) {
        if (
          !this.getBooleanSetting(Setting.FoundSpace) &&
          this.getBooleanSetting(Setting.TutorialCompleted)
        ) {
          notifManager.foundSpace(chunk);
          setBooleanSetting(account, Setting.FoundSpace, true);
        }
      } else if (this.spaceTypeFromPerlin(chunk.perlin) === SpaceType.DEAD_SPACE) {
        if (
          !this.getBooleanSetting(Setting.FoundDeepSpace) &&
          this.getBooleanSetting(Setting.TutorialCompleted)
        ) {
          notifManager.foundDeadSpace(chunk);
          setBooleanSetting(account, Setting.FoundDeepSpace, true);
        }
      }
    }
  }

  public getMinerLocation(): WorldCoords | undefined {
    return this.minerLocation;
  }

  public setExtraMinerLocation(idx: number, coords: WorldCoords): void {
    this.extraMinerLocations[idx] = coords;
  }

  public removeExtraMinerLocation(idx: number): void {
    this.extraMinerLocations.splice(idx, 1);
  }

  public getAllMinerLocations(): WorldCoords[] {
    if (this.minerLocation) {
      return [this.minerLocation, ...this.extraMinerLocations];
    } else {
      return this.extraMinerLocations;
    }
  }

  public getMouseDownCoords(): WorldCoords | undefined {
    if (this.isSending && this.sendingPlanet) return this.sendingCoords;
    return this.mouseDownOverCoords;
  }

  private setHoveringOverPlanet(planet: LocatablePlanet | undefined) {
    const lastHover = this.mouseHoveringOverPlanet;

    this.mouseHoveringOverPlanet = planet;

    if (lastHover?.locationId !== planet?.locationId) {
      this.hoverPlanetId$.publish(planet?.locationId);
    }
  }

  public getHoveringOverPlanet(): Planet | undefined {
    return this.mouseHoveringOverPlanet;
  }

  public getHoveringOverCoords(): WorldCoords | undefined {
    return this.mouseHoveringOverCoords;
  }

  /**
   * Percent from 0 to 100.
   */
  public getForcesSending(planetId: LocationId): number {
    const forces = this.forcesSending[planetId];
    return forces ?? 50;
  }

  /**
   * Percent from 0 to 100.
   */
  public getSilverSending(planetId: LocationId): number {
    return this.silverSending[planetId] || 0;
  }

  public getArtifactSending(planetId: LocationId): Artifact | undefined {
    return this.artifactSending[planetId];
  }

  public isOverOwnPlanet(coords: WorldCoords): Planet | undefined {
    const res = this.viewportEntities.getNearestVisiblePlanet(coords);
    const planet: LocatablePlanet | undefined = res;
    if (!planet) {
      return undefined;
    }
    return planet.owner === this.gameManager.getAccount() ? planet : undefined;
  }

  public getMyArtifacts(): Artifact[] {
    return this.gameManager.getMyArtifacts();
  }

  public getMyArtifactsNotOnPlanet(): Artifact[] {
    return this.getMyArtifacts().filter((a) => !a.onPlanetId);
  }

  public getPlanetWithId(planetId: LocationId | undefined): Planet | undefined {
    return this.gameManager.getPlanetWithId(planetId);
  }

  public getMyScore(): number | undefined {
    return this.gameManager.getMyScore();
  }

  public getPlayer(address?: EthAddress): Player | undefined {
    return this.gameManager.getPlayer(address);
  }

  public getArtifactWithId(artifactId: ArtifactId): Artifact | undefined {
    return this.gameManager.getArtifactWithId(artifactId);
  }

  public getPlanetWithCoords(coords: WorldCoords | undefined): Planet | undefined {
    return coords && this.gameManager.getPlanetWithCoords(coords);
  }

  public getArtifactsWithIds(artifactIds: ArtifactId[]): Array<Artifact | undefined> {
    return this.gameManager.getArtifactsWithIds(artifactIds);
  }

  public getArtifactPlanet(artifact: Artifact): Planet | undefined {
    if (!artifact.onPlanetId) return undefined;
    return this.getPlanetWithId(artifact.onPlanetId);
  }

  public getPlanetLevel(planetId: LocationId): PlanetLevel | undefined {
    return this.gameManager.getPlanetLevel(planetId);
  }

  public getAllOwnedPlanets(): Planet[] {
    return this.gameManager.getAllOwnedPlanets();
  }

  public getAllVoyages(): QueuedArrival[] {
    return this.gameManager.getAllVoyages();
  }

  /**
   * @todo delete this. now that {@link GameObjects} is publically accessible, we shouldn't need to
   * drill fields like this anymore.
   * @tutorial Plugin developers, please access fields like this with something like {@code df.getGameObjects().}
   * @deprecated
   */
  getUnconfirmedMoves(): UnconfirmedMove[] {
    return this.gameManager.getUnconfirmedMoves();
  }

  public getUnconfirmedUpgrades(): UnconfirmedUpgrade[] {
    return this.gameManager.getUnconfirmedUpgrades();
  }

  public isCurrentlyRevealing(): boolean {
    return this.gameManager.getNextRevealCountdownInfo().currentlyRevealing;
  }
  public isCurrentlyClaiming(): boolean {
    return this.gameManager.getNextClaimCountdownInfo().currentlyClaiming;
  }

  public getUnconfirmedWormholeActivations(): UnconfirmedActivateArtifact[] {
    return this.gameManager.getUnconfirmedWormholeActivations();
  }

  public getWormholes(): Iterable<Wormhole> {
    return this.gameManager.getWormholes();
  }

  public getLocationOfPlanet(planetId: LocationId): WorldLocation | undefined {
    return this.gameManager.getLocationOfPlanet(planetId);
  }

  public getExploredChunks(): Iterable<Chunk> {
    return this.gameManager.getExploredChunks();
  }

  public getLocationsAndChunks() {
    return this.viewportEntities.getPlanetsAndChunks();
  }

  public getIsHighPerfMode(): boolean {
    const account = this.getAccount();

    if (account === undefined) {
      return false;
    }

    return this.getBooleanSetting(Setting.HighPerformanceRendering);
  }

  public getPlanetsInViewport(): Planet[] {
    return Array.from(this.viewportEntities.getPlanetsAndChunks().cachedPlanets.values()).map(
      (p) => p.planet
    );
  }

  public getWorldRadius(): number {
    return this.gameManager.getWorldRadius();
  }

  public getWorldSilver(): number {
    return this.gameManager.getWorldSilver();
  }

  public getUniverseTotalEnergy(): number {
    return this.gameManager.getUniverseTotalEnergy();
  }

  public getSilverOfPlayer(player: EthAddress): number {
    return this.gameManager.getSilverOfPlayer(player);
  }

  public getEnergyOfPlayer(player: EthAddress): number {
    return this.gameManager.getEnergyOfPlayer(player);
  }

  public getPlayerScore(player: EthAddress): number | undefined {
    return this.gameManager.getPlayerScore(player);
  }

  public upgrade(planet: Planet, branch: number): void {
    // TODO: do something like JSON.stringify(args) so we know formatting is correct
    this.terminal.current?.printShellLn(`df.upgrade('${planet.locationId}', ${branch})`);
    this.gameManager.upgrade(planet.locationId, branch);
  }

  public buyHat(planet: Planet): void {
    // TODO: do something like JSON.stringify(args) so we know formatting is correct
    this.terminal.current?.printShellLn(`df.buyHat('${planet.locationId}')`);
    this.gameManager.buyHat(planet.locationId);
  }

  public buyGPTCredits(amount: number) {
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
  public getHomeCoords(): WorldCoords {
    return this.gameManager.getHomeCoords() || { x: 0, y: 0 };
  }

  public getHomeHash(): LocationId | undefined {
    return this.gameManager.getHomeHash();
  }

  public getHomePlanet(): Planet | undefined {
    const homeHash = this.getHomeHash();
    if (!homeHash) return undefined;
    return this.getPlanetWithId(homeHash);
  }

  public getRadiusOfPlanetLevel(planetRarity: PlanetLevel): number {
    return this.radiusMap[planetRarity];
  }

  public getEnergyCurveAtPercent(planet: Planet, percent: number): number {
    return this.gameManager.getEnergyCurveAtPercent(planet, percent);
  }

  public getSilverCurveAtPercent(planet: Planet, percent: number): number | undefined {
    return this.gameManager.getSilverCurveAtPercent(planet, percent);
  }

  public getHashesPerSec(): number {
    return this.gameManager.getHashesPerSec();
  }

  public generateVerificationTweet(twitter: string): Promise<string> {
    return this.gameManager.getSignedTwitter(twitter);
  }

  public getPerlinThresholds(): [number, number, number] {
    return this.gameManager.getPerlinThresholds();
  }

  public getHashConfig(): HashConfig {
    return this.gameManager.getHashConfig();
  }

  public getViewport(): Viewport {
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

  public getPerlinConfig(isBiome = false): PerlinConfig {
    const hashConfig = this.gameManager.getHashConfig();
    const key = isBiome ? hashConfig.biomebaseKey : hashConfig.spaceTypeKey;

    return {
      key,
      scale: hashConfig.perlinLengthScale,
      mirrorX: hashConfig.perlinMirrorX,
      mirrorY: hashConfig.perlinMirrorY,
      floor: false,
    };
  }

  /**
   * Gets a reference to the game's internal representation of the world state. Beware! Use this for
   * reading only, otherwise you might mess up the state of the game. You can try modifying the game
   * state in some way
   */
  public getGameObjects(): GameObjects {
    return this.gameManager.getGameObjects();
  }

  // internal utils

  private updatePlanets() {
    if (this.selectedPlanet) {
      this.selectedPlanet = this.gameManager.getPlanetWithId(
        this.selectedPlanet.locationId
      ) as LocatablePlanet;
    }
    if (this.mouseDownOverPlanet) {
      this.mouseDownOverPlanet = this.gameManager.getPlanetWithId(
        this.mouseDownOverPlanet.locationId
      ) as LocatablePlanet;
    }
    if (this.mouseHoveringOverPlanet) {
      this.setHoveringOverPlanet(
        this.gameManager.getPlanetWithId(this.mouseHoveringOverPlanet.locationId) as LocatablePlanet
      );
    }
  }

  private updateMouseHoveringOverCoords(coords: WorldCoords): WorldCoords {
    // if the mouse is inside hitbox of a planet, snaps the mouse to center of planet
    this.mouseHoveringOverCoords = coords;
    let hoveringPlanet = undefined;

    const res = this.viewportEntities.getNearestVisiblePlanet(coords);
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

  private onEmitInitializedPlayer() {
    this.emit(GameUIManagerEvent.InitializedPlayer);
  }

  private onEmitInitializedPlayerError(err: React.ReactNode) {
    this.emit(GameUIManagerEvent.InitializedPlayerError, err);
  }

  public getGameManager(): GameManager {
    return this.gameManager;
  }
}

export default GameUIManager;
