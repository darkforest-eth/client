import UIEmitter, { UIEmitterEvent } from '../../utils/UIEmitter';
import { compareWorldCoords, WorldCoords } from '../../utils/Coordinates';
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
  UpgradeBranchName,
  SpaceType,
  PlanetResource,
  ChunkFootprint,
} from '../../_types/global/GlobalTypes';
import autoBind from 'auto-bind';
import { EventEmitter } from 'events';
import AbstractUIManager from './AbstractUIManager';
import AbstractGameManager from '../../api/AbstractGameManager';
import { moveShipsDecay, planetHasBonus } from '../../utils/Utils';
import {
  UnconfirmedMove,
  UnconfirmedUpgrade,
} from '../../_types/darkforest/api/ContractsAPITypes';
import { MiningPattern } from '../../utils/MiningPatterns';
import { GameManagerEvent } from '../../api/GameManager';
import TutorialManager, { TutorialState } from '../../utils/TutorialManager';
import UIStateStorageManager, {
  UIDataKey,
  UIDataValue,
} from '../../api/UIStateStorageManager';
import NotificationManager from '../../utils/NotificationManager';
import { emptyAddress } from '../../utils/CheckedTypeUtils';
import TerminalEmitter from '../../utils/TerminalEmitter';

export enum GameUIManagerEvent {
  InitializedPlayer = 'InitializedPlayer',
  InitializedPlayerError = 'InitializedPlayerError',
}

class GameUIManager extends EventEmitter implements AbstractUIManager {
  private gameManager: AbstractGameManager;
  private uiStateStorageManager: UIStateStorageManager;

  private replayMode: boolean;
  private detailLevel: number; // 0 is show everything; higher means show less

  // TODO fix this
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly radiusMap: any = {};

  private selectedPlanet: Planet | null = null;
  private selectedCoords: WorldCoords | null = null;
  private mouseDownOverPlanet: Planet | null = null;
  private mouseDownOverCoords: WorldCoords | null = null;
  private mouseHoveringOverPlanet: Planet | null = null;
  private mouseHoveringOverCoords: WorldCoords | null = null;

  private sendingPlanet: Planet | null = null;
  private sendingCoords: WorldCoords | null = null;
  private isSending = false;

  private minerLocation: WorldCoords | null = null;
  private isMining = true;

  private forcesSending: { [key: string]: number } = {}; // this is a percentage
  private silverSending: { [key: string]: number } = {}; // this is a percentage

  // lifecycle methods

  private constructor(gameManager: AbstractGameManager, replayMode = false) {
    super();

    this.gameManager = gameManager;
    this.replayMode = replayMode;
    if (this.replayMode) this.stopExplore();

    // this.radiusMap[PlanetType.LittleAsteroid] = 1;
    this.radiusMap[PlanetLevel.Asteroid] = 1;
    this.radiusMap[PlanetLevel.BrownDwarf] = 3;
    this.radiusMap[PlanetLevel.RedDwarf] = 9;
    this.radiusMap[PlanetLevel.WhiteDwarf] = 27;
    this.radiusMap[PlanetLevel.YellowStar] = 54;
    this.radiusMap[PlanetLevel.BlueStar] = 72;
    this.radiusMap[PlanetLevel.Giant] = 81;
    this.radiusMap[PlanetLevel.Supergiant] = 90;
    // this.radiusMap[PlanetType.SuperGiant] = 75;
    // this.radiusMap[PlanetType.HyperGiant] = 100;

    const account = gameManager.getAccount();
    const contractAddress = gameManager.getContractAddress();
    this.uiStateStorageManager = UIStateStorageManager.create(
      account,
      contractAddress
    );

    autoBind(this);
  }

  static create(gameManager: AbstractGameManager) {
    const uiEmitter = UIEmitter.getInstance();

    const uiManager = new GameUIManager(
      gameManager,
      false // GameManager instanceof ReplayerManager
    );

    uiEmitter.on(UIEmitterEvent.WorldMouseDown, uiManager.onMouseDown);
    uiEmitter.on(UIEmitterEvent.WorldMouseClick, uiManager.onMouseClick);
    uiEmitter.on(UIEmitterEvent.WorldMouseMove, uiManager.onMouseMove);
    uiEmitter.on(UIEmitterEvent.WorldMouseUp, uiManager.onMouseUp);
    uiEmitter.on(UIEmitterEvent.WorldMouseOut, uiManager.onMouseOut);

    uiEmitter.on(UIEmitterEvent.SendInitiated, uiManager.onSendInit);
    uiEmitter.on(UIEmitterEvent.SendCancelled, uiManager.onSendCancel);

    gameManager.on(GameManagerEvent.PlanetUpdate, uiManager.updatePlanets);
    gameManager.on(
      GameManagerEvent.DiscoveredNewChunk,
      uiManager.onDiscoveredChunk
    );

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

    this.gameManager.removeListener(
      GameManagerEvent.PlanetUpdate,
      this.updatePlanets
    );
    this.gameManager.removeListener(
      GameManagerEvent.InitializedPlayer,
      this.onEmitInitializedPlayer
    );
    this.gameManager.removeListener(
      GameManagerEvent.InitializedPlayerError,
      this.onEmitInitializedPlayerError
    );
    this.gameManager.removeListener(
      GameManagerEvent.DiscoveredNewChunk,
      this.onDiscoveredChunk
    );

    this.gameManager.destroy();
    this.uiStateStorageManager.destroy();
  }

  getContractAddress(): EthAddress {
    return this.gameManager.getContractAddress();
  }

  // actions

  onJoinGameClicked(): GameUIManager {
    this.gameManager
      .joinGame()
      .once(GameManagerEvent.InitializedPlayer, this.onEmitInitializedPlayer)
      .once(
        GameManagerEvent.InitializedPlayerError,
        this.onEmitInitializedPlayerError
      );

    return this;
  }

  addAccount(coords: WorldCoords): Promise<boolean> {
    return this.gameManager.addAccount(coords);
  }

  verifyTwitter(twitter: string): Promise<boolean> {
    return this.gameManager.verifyTwitter(twitter);
  }

  getPrivateKey(): string {
    return this.gameManager.getPrivateKey();
  }

  getMyBalance(): number {
    return this.gameManager.getMyBalance();
  }

  onMouseDown(coords: WorldCoords) {
    if (this.sendingPlanet) return;

    const hoveringOverCoords = this.updateMouseHoveringOverCoords(coords);

    this.mouseDownOverPlanet = this.gameManager.getPlanetWithCoords(
      hoveringOverCoords
    );
    this.mouseDownOverCoords = this.mouseHoveringOverCoords;
  }

  onMouseClick(_coords: WorldCoords) {
    if (!this.mouseDownOverPlanet && !this.mouseHoveringOverPlanet) {
      this.setSelectedPlanet(null);
      this.selectedCoords = null;
    }
  }

  onMouseMove(coords: WorldCoords) {
    this.updateMouseHoveringOverCoords(coords);
  }

  onMouseUp(coords: WorldCoords) {
    const terminalEmitter = TerminalEmitter.getInstance();
    const mouseUpOverCoords = this.updateMouseHoveringOverCoords(coords);
    const mouseUpOverPlanet = this.gameManager.getPlanetWithCoords(
      mouseUpOverCoords
    );

    const mouseDownPlanet = this.getMouseDownPlanet();

    if (mouseUpOverPlanet) {
      if (
        this.mouseDownOverPlanet &&
        mouseUpOverPlanet.locationId === this.mouseDownOverPlanet.locationId
      ) {
        // select planet
        this.setSelectedPlanet(mouseUpOverPlanet);
        this.selectedCoords = mouseUpOverCoords;
        terminalEmitter.println(`Selected: ${mouseUpOverPlanet.locationId}`);
      } else if (
        mouseDownPlanet &&
        mouseDownPlanet.owner === this.gameManager.getAccount()
      ) {
        // move initiated if enough forces
        const from = mouseDownPlanet;
        const to = mouseUpOverPlanet;
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

        const loc = this.getLocationOfPlanet(mouseDownPlanet.locationId);
        const mouseDownCoords = loc ? loc.coords : { x: 0, y: 0 };

        const dist = Math.sqrt(
          (mouseDownCoords.x - mouseUpOverCoords.x) ** 2 +
            (mouseDownCoords.y - mouseUpOverCoords.y) ** 2
        );
        const myAtk: number = moveShipsDecay(forces, mouseDownPlanet, dist);
        let effPercentSilver = this.getSilverSending(from.locationId);
        if (
          effPercentSilver > 98 &&
          from.planetResource === PlanetResource.SILVER &&
          from.silver < from.silverCap
        ) {
          // player is trying to send 100% silver from a silver mine that is not at cap
          // Date.now() and block.timestamp are occasionally a bit out of sync, so clip
          effPercentSilver = 98;
        }
        if (myAtk > 0) {
          const silver = Math.floor((from.silver * effPercentSilver) / 100);
          // TODO: do something like JSON.stringify(args) so we know formatting is correct
          terminalEmitter.jsShell(
            `df.move('${from.locationId}', '${to.locationId}', ${forces}, ${silver})`
          );
          this.gameManager.move(from.locationId, to.locationId, forces, silver);
          const tutorialManager = TutorialManager.getInstance();
          tutorialManager.acceptInput(TutorialState.SendFleet);
        }
      }
    }

    this.mouseDownOverPlanet = null;
    this.mouseDownOverCoords = null;

    const uiEmitter = UIEmitter.getInstance();
    uiEmitter.emit(UIEmitterEvent.SendCompleted);
    this.sendingPlanet = null;
    this.isSending = false;
  }

  onMouseOut() {
    this.mouseDownOverPlanet = null;
    this.mouseDownOverCoords = null;
    this.mouseHoveringOverPlanet = null;
    this.mouseHoveringOverCoords = null;
  }

  startExplore() {
    this.gameManager.startExplore();
    this.isMining = true;
  }

  stopExplore() {
    this.gameManager.stopExplore();
    this.isMining = false;
    this.minerLocation = null;
  }

  setForcesSending(planetId: LocationId, percentage: number) {
    this.forcesSending[planetId] = percentage;
  }

  setSilverSending(planetId: LocationId, percentage: number) {
    this.silverSending[planetId] = percentage;
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

  // mining stuff
  setMiningPattern(pattern: MiningPattern) {
    this.gameManager.setMiningPattern(pattern);
  }
  getMiningPattern(): MiningPattern | null {
    return this.gameManager.getMiningPattern();
  }

  // getters

  getAccount(): EthAddress | null {
    return this.gameManager.getAccount();
  }

  getTwitter(address: EthAddress | null): string | null {
    return this.gameManager.getTwitter(address);
  }

  getEndTimeSeconds(): number {
    return this.gameManager.getEndTimeSeconds();
  }

  getUpgrade(branch: UpgradeBranchName, level: number): Upgrade {
    return this.gameManager.getUpgrade(branch, level);
  }

  getAllPlayers(): Player[] {
    return this.gameManager.getAllPlayers();
  }

  getDetailLevel(): number {
    return this.detailLevel;
  }

  getSelectedPlanet(): Planet | null {
    return this.selectedPlanet;
  }

  setSelectedPlanet(planet: Planet | null): void {
    if (!planet) {
      const tutorialManager = TutorialManager.getInstance();
      tutorialManager.acceptInput(TutorialState.Deselect);
    }

    const uiEmitter = UIEmitter.getInstance();
    this.selectedPlanet = planet;
    console.log(planet);
    if (!planet) {
      this.selectedCoords = null;
    } else {
      const loc = this.getLocationOfPlanet(planet.locationId);
      if (!loc) this.selectedCoords = null;
      else {
        // loc is not null
        this.selectedCoords = loc.coords;

        if (compareWorldCoords(loc.coords, this.getHomeCoords())) {
          const tutorialManager = TutorialManager.getInstance();
          tutorialManager.acceptInput(TutorialState.HomePlanet);
        }
      }
    }
    uiEmitter.emit(UIEmitterEvent.GamePlanetSelected);
  }

  getSelectedCoords(): WorldCoords | null {
    return this.selectedCoords;
  }

  getMouseDownPlanet(): Planet | null {
    if (this.isSending && this.sendingPlanet) return this.sendingPlanet;
    return this.mouseDownOverPlanet;
  }

  onSendInit(planet: Planet | null): void {
    this.isSending = true;
    this.sendingPlanet = planet;
    const loc = planet ? this.getLocationOfPlanet(planet.locationId) : null;
    this.sendingCoords = loc ? loc.coords : { x: 0, y: 0 };
  }

  onSendCancel(): void {
    this.isSending = false;
    this.sendingPlanet = null;
    this.sendingCoords = null;
  }

  hasMinedChunk(chunkLocation: ChunkFootprint): boolean {
    return this.gameManager.hasMinedChunk(chunkLocation);
  }

  spaceTypeFromPerlin(perlin: number): SpaceType {
    return this.gameManager.spaceTypeFromPerlin(perlin);
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
      this.minerLocation = null;
    }

    // TODO: skip this if everything has already been found
    const notifManager = NotificationManager.getInstance();
    for (const loc of chunk.planetLocations) {
      const planet = this.getPlanetWithId(loc.hash);
      if (!planet) break;

      if (planet.owner === emptyAddress && planet.energy > 0) {
        if (
          !this.getUIDataItem(UIDataKey.foundPirates) &&
          this.getUIDataItem(UIDataKey.tutorialCompleted)
        ) {
          notifManager.foundPirates(planet);
          this.setUIDataItem(UIDataKey.foundPirates, true);
        }
      }

      if (planet.planetResource === PlanetResource.SILVER) {
        if (
          !this.getUIDataItem(UIDataKey.foundSilver) &&
          this.getUIDataItem(UIDataKey.tutorialCompleted)
        ) {
          notifManager.foundSilver(planet);
          this.setUIDataItem(UIDataKey.foundSilver, true);
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
    }
  }

  getMinerLocation(): WorldCoords | null {
    return this.minerLocation;
  }

  getMouseDownCoords(): WorldCoords | null {
    if (this.isSending && this.sendingPlanet) return this.sendingCoords;
    return this.mouseDownOverCoords;
  }

  getHoveringOverPlanet(): Planet | null {
    return this.mouseHoveringOverPlanet;
  }

  getHoveringOverCoords(): WorldCoords | null {
    return this.mouseHoveringOverCoords;
  }

  getForcesSending(planetId: LocationId): number {
    return this.forcesSending[planetId] || 50;
  }

  getSilverSending(planetId: LocationId): number {
    return this.silverSending[planetId] || 0;
  }

  isOverOwnPlanet(coords: WorldCoords): Planet | null {
    if (this.replayMode) {
      return null;
    }
    const res = this.planetHitboxForCoords(coords);
    let planet: Planet | null = null;
    if (res) {
      planet = res[0];
    }
    if (!planet) {
      return null;
    }
    return planet.owner === this.gameManager.getAccount() ? planet : null;
  }

  getPlanetWithId(planetId: LocationId): Planet | null {
    return this.gameManager.getPlanetWithId(planetId);
  }

  getPlanetLevel(planetId: LocationId): PlanetLevel | null {
    return this.gameManager.getPlanetLevel(planetId);
  }

  getPlanetDetailLevel(planetId: LocationId): number | null {
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

  getLocationOfPlanet(planetId: LocationId): Location | null {
    return this.gameManager.getLocationOfPlanet(planetId);
  }

  getExploredChunks(): Iterable<ExploredChunkData> {
    return this.gameManager.getExploredChunks();
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

  upgrade(planet: Planet, branch: number): void {
    const terminalEmitter = TerminalEmitter.getInstance();
    // TODO: do something like JSON.stringify(args) so we know formatting is correct
    terminalEmitter.jsShell(`df.upgrade('${planet.locationId}', ${branch})`);
    this.gameManager.upgrade(planet.locationId, branch);
  }

  buyHat(planet: Planet): void {
    const terminalEmitter = TerminalEmitter.getInstance();
    // TODO: do something like JSON.stringify(args) so we know formatting is correct
    terminalEmitter.jsShell(`df.buyHat('${planet.locationId}')`);
    this.gameManager.buyHat(planet.locationId);
  }

  // non-nullable
  getHomeCoords(): WorldCoords {
    return this.gameManager.getHomeCoords() || { x: 0, y: 0 };
  }
  getHomeHash(): LocationId | null {
    return this.gameManager.getHomeHash();
  }

  getRadiusOfPlanetLevel(planetRarity: PlanetLevel): number {
    return this.radiusMap[planetRarity];
  }

  getEnergyCurveAtPercent(planet: Planet, percent: number): number {
    return this.gameManager.getEnergyCurveAtPercent(planet, percent);
  }

  getSilverCurveAtPercent(planet: Planet, percent: number): number | null {
    return this.gameManager.getSilverCurveAtPercent(planet, percent);
  }

  getHashesPerSec(): number {
    return this.gameManager.getHashesPerSec();
  }

  generateVerificationTweet(twitter: string): Promise<string> {
    return this.gameManager.getSignedTwitter(twitter);
  }

  getPerlinThresholds(): [number, number] {
    return this.gameManager.getPerlinThresholds();
  }

  setUIDataItem(key: UIDataKey, value: UIDataValue): void {
    this.uiStateStorageManager.setUIDataItem(key, value);
  }
  getUIDataItem(key: UIDataKey): UIDataValue {
    return this.uiStateStorageManager.getUIDataItem(key);
  }

  // internal utils

  private updatePlanets() {
    if (this.selectedPlanet) {
      this.selectedPlanet = this.gameManager.getPlanetWithId(
        this.selectedPlanet.locationId
      );
    }
    if (this.mouseDownOverPlanet) {
      this.mouseDownOverPlanet = this.gameManager.getPlanetWithId(
        this.mouseDownOverPlanet.locationId
      );
    }
    if (this.mouseHoveringOverPlanet) {
      this.mouseHoveringOverPlanet = this.gameManager.getPlanetWithId(
        this.mouseHoveringOverPlanet.locationId
      );
    }
  }

  private updateMouseHoveringOverCoords(coords: WorldCoords): WorldCoords {
    // if the mouse is inside hitbox of a planet, snaps the mouse to center of planet
    this.mouseHoveringOverCoords = coords;
    this.mouseHoveringOverPlanet = null;

    const res = this.planetHitboxForCoords(coords);
    if (res) {
      this.mouseHoveringOverPlanet = res[0];
      this.mouseHoveringOverCoords = res[1];
    }

    this.mouseHoveringOverCoords = {
      x: Math.round(this.mouseHoveringOverCoords.x),
      y: Math.round(this.mouseHoveringOverCoords.y),
    };
    return this.mouseHoveringOverCoords;
  }

  private planetHitboxForCoords(
    coords: WorldCoords
  ): [Planet, WorldCoords] | null {
    const maxRadius = this.radiusMap[PlanetLevel.MAX];
    let planetInHitbox: Planet | null = null;
    let smallestPlanetRadius: number = maxRadius + 1;
    let planetCoords: WorldCoords | null = null;

    for (let dx = -1 * maxRadius; dx < maxRadius + 1; dx += 1) {
      for (let dy = -1 * maxRadius; dy < maxRadius + 1; dy += 1) {
        const x = Math.round(coords.x) + dx;
        const y = Math.round(coords.y) + dy;
        const planet = this.gameManager.getPlanetWithCoords({ x, y });
        if (
          planet &&
          this.radiusMap[planet.planetLevel] >
            Math.max(Math.abs(x - coords.x), Math.abs(y - coords.y))
        ) {
          // coords is in hitbox
          if (this.radiusMap[planet.planetLevel] < smallestPlanetRadius) {
            // we want the smallest planet that we're in the hitbox of
            planetInHitbox = planet;
            smallestPlanetRadius = this.radiusMap[planet.planetLevel];
            planetCoords = { x, y };
          }
        }
      }
    }

    if (planetCoords && planetInHitbox) {
      return [planetInHitbox, planetCoords];
    }
    return null;
  }

  private onEmitInitializedPlayer() {
    this.emit(GameUIManagerEvent.InitializedPlayer);
  }

  private onEmitInitializedPlayerError(err) {
    this.emit(GameUIManagerEvent.InitializedPlayerError, err);
  }
}

export default GameUIManager;
