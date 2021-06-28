import autoBind from 'auto-bind';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { CanvasCoords, distL2, vectorLength } from '../../Backend/Utils/Coordinates';
import { isLocatable, Chunk } from '../../_types/global/GlobalTypes';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';
import { WorldCoords, Planet } from '@darkforest_eth/types';
import { AnimationManager, ViewportAnimation } from './ViewportAnimation';

export const getDefaultScroll = (): number => {
  const isFirefox = navigator.userAgent.indexOf('Firefox') > 0;
  return isFirefox ? 1.005 : 1.0006;
};

type ViewportData = {
  widthInWorldUnits: number;
  centerWorldCoords: WorldCoords;
};

// multiplied by init velocity, since mousemove won't always happen at the same rate as rAF
const BASE_VEL = 1;
// if vel gets below this, kill it
const VEL_THRESHOLD = 0.05;

class Viewport {
  // The sole listener for events from Canvas
  // Handles panning and zooming
  // Handles reports of user interaction in canvas coords, transforms these events to world coords and filters when necessary,
  // and sends events up to GameUIManager

  static instance: Viewport | undefined;

  // the following two fields represent the position of the vieport in the world
  centerWorldCoords: WorldCoords;
  widthInWorldUnits: number;
  heightInWorldUnits: number;

  viewportWidth: number; // pixels
  viewportHeight: number; // pixels

  isPanning = false;
  mouseLastCoords: CanvasCoords | undefined;
  canvas: HTMLCanvasElement;

  isFirefox: boolean;

  gameUIManager: GameUIManager;

  mousedownCoords: CanvasCoords | undefined = undefined;

  // for momentum stuff
  velocity: WorldCoords | undefined = undefined;
  momentum = false;

  mouseSensitivity: number;
  intervalId: ReturnType<typeof setTimeout>;
  frameRequestId: number;

  scale: number;
  private isSending = false;
  private animationManager: AnimationManager;

  private constructor(
    gameUIManager: GameUIManager,
    centerWorldCoords: WorldCoords,
    widthInWorldUnits: number,
    viewportWidth: number,
    viewportHeight: number,
    canvas: HTMLCanvasElement
  ) {
    this.gameUIManager = gameUIManager;

    // each of these is measured relative to the world coordinate system
    this.centerWorldCoords = centerWorldCoords;
    this.widthInWorldUnits = widthInWorldUnits;
    this.heightInWorldUnits = (widthInWorldUnits * viewportHeight) / viewportWidth;
    // while all of the above are in the world coordinate system, the below are in the page coordinate system
    this.viewportWidth = viewportWidth; // width / height
    this.viewportHeight = viewportHeight;

    this.mouseLastCoords = centerWorldCoords;
    this.canvas = canvas;
    this.animationManager = new AnimationManager();

    const scroll = localStorage.getItem('scrollSpeed');
    if (scroll) {
      this.mouseSensitivity = parseFloat(scroll);
    } else {
      this.mouseSensitivity = getDefaultScroll();
    }

    this.isPanning = false;
    autoBind(this);

    // fixes issue where viewport inits weirdly - TODO figure out why
    this.setWorldWidth(this.widthInWorldUnits);
    this.onScroll(0);
  }

  onSendInit() {
    this.isSending = true;
  }

  onSendComplete() {
    this.isSending = false;
  }

  get minWorldWidth(): number {
    // TODO: Figure out a better way to set this based on viewport
    return 2;
  }

  get maxWorldWidth(): number {
    return this.gameUIManager.getWorldRadius() * 4;
  }

  public getViewportPosition() {
    return { ...this.centerWorldCoords };
  }

  public getBottomBound() {
    return this.centerWorldCoords.y - this.heightInWorldUnits / 2;
  }

  public getLeftBound() {
    return this.centerWorldCoords.x - this.widthInWorldUnits / 2;
  }

  public getTopBound() {
    return this.centerWorldCoords.y + this.heightInWorldUnits / 2;
  }

  public getRightBound() {
    return this.centerWorldCoords.x + this.widthInWorldUnits / 2;
  }

  public getViewportWorldWidth() {
    return this.widthInWorldUnits;
  }

  public getViewportWorldHeight() {
    return this.heightInWorldUnits;
  }

  public setMouseSensitivty(mouseSensitivity: number) {
    this.mouseSensitivity = 1 + mouseSensitivity;
    localStorage.setItem('scrollSpeed', this.mouseSensitivity.toString());
  }

  static getInstance(): Viewport {
    if (!Viewport.instance) {
      throw new Error('Attempted to get Viewport object before initialized');
    }

    return Viewport.instance;
  }

  static destroyInstance(): void {
    const uiEmitter = UIEmitter.getInstance();
    const viewport = Viewport.instance;

    if (viewport) {
      uiEmitter
        .removeListener(UIEmitterEvent.CanvasMouseDown, viewport.onMouseDown)
        .removeListener(UIEmitterEvent.CanvasMouseMove, viewport.onMouseMove)
        .removeListener(UIEmitterEvent.CanvasMouseUp, viewport.onMouseUp)
        .removeListener(UIEmitterEvent.CanvasMouseOut, viewport.onMouseOut)
        .removeListener(UIEmitterEvent.CanvasScroll, viewport.onScroll)
        .removeListener(UIEmitterEvent.WindowResize, viewport.onWindowResize)
        .removeListener(UIEmitterEvent.CenterPlanet, viewport.centerPlanet)
        .removeListener(UIEmitterEvent.ZoomIn, viewport.zoomIn)
        .removeListener(UIEmitterEvent.ZoomOut, viewport.zoomOut)
        .removeAllListeners(UIEmitterEvent.SendInitiated)
        .removeAllListeners(UIEmitterEvent.SendCancelled)
        .removeAllListeners(UIEmitterEvent.SendCompleted)
        .removeAllListeners(UIEmitterEvent.WindowResize);
      clearInterval(viewport.intervalId);
      window.cancelAnimationFrame(viewport.frameRequestId);
    }
    Viewport.instance = undefined;
  }

  static initialize(
    gameUIManager: GameUIManager,
    widthInWorldUnits: number,
    canvas: HTMLCanvasElement
  ): Viewport {
    const uiEmitter = UIEmitter.getInstance();

    const homeCoords = gameUIManager.getHomeCoords();

    const viewport = new Viewport(
      gameUIManager,
      homeCoords,
      widthInWorldUnits,
      canvas.width,
      canvas.height,
      canvas
    );

    // set starting position based on storage
    const stored = viewport.getStorage();
    if (!stored) {
      viewport.zoomPlanet(gameUIManager.getHomePlanet());
    } else {
      viewport.setData(stored);
    }

    uiEmitter
      .on(UIEmitterEvent.CanvasMouseDown, viewport.onMouseDown)
      .on(UIEmitterEvent.CanvasMouseMove, viewport.onMouseMove)
      .on(UIEmitterEvent.CanvasMouseUp, viewport.onMouseUp)
      .on(UIEmitterEvent.CanvasMouseOut, viewport.onMouseOut)
      .on(UIEmitterEvent.CanvasScroll, viewport.onScroll)
      .on(UIEmitterEvent.WindowResize, viewport.onWindowResize)
      .on(UIEmitterEvent.CenterPlanet, viewport.centerPlanet)
      .on(UIEmitterEvent.ZoomIn, viewport.zoomIn)
      .on(UIEmitterEvent.ZoomOut, viewport.zoomOut)
      .on(UIEmitterEvent.SendInitiated, viewport.onSendInit)
      .on(UIEmitterEvent.SendCancelled, viewport.onSendComplete)
      .on(UIEmitterEvent.SendCompleted, viewport.onSendComplete)
      .on(UIEmitterEvent.WindowResize, viewport.onResize);

    viewport.intervalId = setInterval(viewport.setStorage, 5000);
    Viewport.instance = viewport;

    return viewport;
  }

  onResize() {
    this.onScroll(0);
  }

  private getStorageKey(): string {
    const acc = this.gameUIManager.getAccount();
    const addr = this.gameUIManager.getContractAddress();
    return `${acc}-${addr}-viewport`;
  }

  // returns this viewport's ViewportData, which will let us initialize it at the same zoom / pos
  getStorage(): ViewportData | undefined {
    const key = this.getStorageKey();
    const stored = localStorage.getItem(key);
    if (stored) return (JSON.parse(stored) as ViewportData) || undefined;
    return undefined;
  }

  // stores this viewport's ViewportData into storage
  setStorage() {
    const key = this.getStorageKey();
    const data: ViewportData = {
      widthInWorldUnits: this.widthInWorldUnits,
      centerWorldCoords: this.centerWorldCoords,
    };
    localStorage.setItem(key, JSON.stringify(data));
  }

  // set this viewport's zoom and pos to the given ViewportData
  setData(data: ViewportData) {
    // lets us prevent the program from crashing if this was called poorly
    typeof data.widthInWorldUnits === 'number' && this.setWorldWidth(data.widthInWorldUnits);
    typeof data.widthInWorldUnits === 'number' && this.centerCoords(data.centerWorldCoords);
  }

  centerPlanetAnimated(planet: Planet | undefined): void {
    if (planet && isLocatable(planet)) {
      // if the user previously had a planet selected, then we want to move the viewport
      // to the new planet in such a way that it occupies the same screen location that
      // the previous planet occupied.

      let endPoint = planet.location.coords;
      const previousPlanet = this.gameUIManager.getPreviousSelectedPlanet();
      if (
        previousPlanet &&
        isLocatable(previousPlanet) &&
        this.isInViewport(previousPlanet.location.coords)
      ) {
        endPoint = {
          x: this.centerWorldCoords.x - previousPlanet.location.coords.x + planet.location.coords.x,
          y: this.centerWorldCoords.y - previousPlanet.location.coords.y + planet.location.coords.y,
        };
      }

      this.animationManager.replaceAnimation(
        ViewportAnimation.between(
          Date.now(),
          this.centerWorldCoords,
          endPoint,
          this.heightInWorldUnits,
          this.heightInWorldUnits
        )
      );
    }
  }

  centerPlanet(planet: Planet | undefined): void {
    this.centerPlanetAnimated(planet);
  }

  // centers on a planet and makes it fill the viewport
  zoomPlanet(planet: Planet | undefined): void {
    if (!planet || !isLocatable(planet)) return;
    this.centerPlanet(planet);
    // in world coords
    const rad = this.gameUIManager.getRadiusOfPlanetLevel(planet.planetLevel);
    this.setWorldHeight(4 * rad);
  }

  centerCoords(coords: WorldCoords): void {
    this.centerWorldCoords = coords;
  }

  centerChunk(chunk: Chunk): void {
    const { bottomLeft, sideLength } = chunk.chunkFootprint;
    this.centerWorldCoords = {
      x: bottomLeft.x + sideLength / 2,
      y: bottomLeft.y + sideLength / 2,
    };
  }

  zoomIn(): void {
    this.onScroll(-600, true);
  }

  zoomOut(): void {
    this.onScroll(600, true);
  }

  // Event handlers
  onMouseDown(canvasCoords: CanvasCoords) {
    this.animationManager.stopCurrentAnimation();

    if (this.isSending) return;

    this.mousedownCoords = canvasCoords;

    const uiManager = this.gameUIManager;
    const uiEmitter = UIEmitter.getInstance();

    const worldCoords = this.canvasToWorldCoords(canvasCoords);
    if (!uiManager.isOverOwnPlanet(worldCoords)) {
      this.isPanning = true;
    }
    uiEmitter.emit(UIEmitterEvent.WorldMouseDown, worldCoords);
    this.mouseLastCoords = canvasCoords;

    this.momentum = false;
    this.velocity = undefined;
  }

  onMouseMove(canvasCoords: CanvasCoords) {
    const uiEmitter = UIEmitter.getInstance();

    if (this.isPanning && this.mouseLastCoords) {
      // if panning, don't need to emit mouse move event
      const dx = this.scale * (this.mouseLastCoords.x - canvasCoords.x);
      const dy = -this.scale * (this.mouseLastCoords.y - canvasCoords.y);

      this.velocity = { x: dx * BASE_VEL, y: dy * BASE_VEL };

      this.centerWorldCoords.x += dx;
      this.centerWorldCoords.y += dy;
    } else {
      const worldCoords = this.canvasToWorldCoords(canvasCoords);
      uiEmitter.emit(UIEmitterEvent.WorldMouseMove, worldCoords);
    }
    this.mouseLastCoords = canvasCoords;
  }

  onMouseUp(canvasCoords: CanvasCoords) {
    const uiEmitter = UIEmitter.getInstance();

    const worldCoords = this.canvasToWorldCoords(canvasCoords);
    if (this.mousedownCoords && distL2(canvasCoords, this.mousedownCoords) < 3) {
      uiEmitter.emit(UIEmitterEvent.WorldMouseClick, worldCoords);
    }

    this.mousedownCoords = undefined;
    uiEmitter.emit(UIEmitterEvent.WorldMouseUp, worldCoords);
    this.isPanning = false;

    this.momentum = true;
    this.mouseLastCoords = canvasCoords;

    if (this.velocity && vectorLength(this.velocity) < VEL_THRESHOLD) {
      this.velocity = undefined;
      this.momentum = false;
    }
  }

  onMouseOut() {
    const uiEmitter = UIEmitter.getInstance();

    uiEmitter.emit(UIEmitterEvent.WorldMouseOut);
    this.isPanning = false;
    this.mouseLastCoords = undefined;
  }

  onScroll(deltaY: number, forceZoom = false) {
    if (this.mouseLastCoords !== undefined || forceZoom) {
      const base = this.mouseSensitivity;
      const newWidth = this.widthInWorldUnits * base ** deltaY;
      if (!this.isValidWorldWidth(newWidth)) {
        return;
      }

      let mouseWorldCoords = this.centerWorldCoords;
      if (this.mouseLastCoords) {
        mouseWorldCoords = this.canvasToWorldCoords(this.mouseLastCoords);
      }
      const centersDiff = {
        x: this.centerWorldCoords.x - mouseWorldCoords.x,
        y: this.centerWorldCoords.y - mouseWorldCoords.y,
      };
      const newCentersDiff = {
        x: centersDiff.x * base ** deltaY,
        y: centersDiff.y * base ** deltaY,
      };
      const newCenter = {
        x: mouseWorldCoords.x + newCentersDiff.x,
        y: mouseWorldCoords.y + newCentersDiff.y,
      };
      this.centerWorldCoords.x = newCenter.x;
      this.centerWorldCoords.y = newCenter.y;

      this.setWorldWidth(newWidth);
    }
  }

  onWindowResize() {
    this.viewportHeight = this.canvas.height;
    this.viewportWidth = this.canvas.width;
    this.scale = this.widthInWorldUnits / this.viewportWidth;
  }

  // Camera utility functions
  canvasToWorldCoords(canvasCoords: CanvasCoords): WorldCoords {
    const worldX = this.canvasToWorldX(canvasCoords.x);
    const worldY = this.canvasToWorldY(canvasCoords.y);
    return { x: worldX, y: worldY };
  }

  worldToCanvasCoords(worldCoords: WorldCoords): CanvasCoords {
    const canvasX = this.worldToCanvasX(worldCoords.x);
    const canvasY = this.worldToCanvasY(worldCoords.y);
    return { x: canvasX, y: canvasY };
  }

  public worldToCanvasDist(d: number): number {
    return d / this.scale;
  }

  public canvasToWorldDist(d: number): number {
    return d * this.scale;
  }

  private worldToCanvasX(x: number): number {
    return (x - this.centerWorldCoords.x) / this.scale + this.viewportWidth / 2;
  }

  private canvasToWorldX(x: number): number {
    return (x - this.viewportWidth / 2) * this.scale + this.centerWorldCoords.x;
  }

  private worldToCanvasY(y: number): number {
    return (-1 * (y - this.centerWorldCoords.y)) / this.scale + this.viewportHeight / 2;
  }

  private canvasToWorldY(y: number): number {
    return -1 * (y - this.viewportHeight / 2) * this.scale + this.centerWorldCoords.y;
  }

  public isInOrAroundViewport(coords: WorldCoords): boolean {
    if (Math.abs(coords.x - this.centerWorldCoords.x) > 0.6 * this.widthInWorldUnits) {
      return false;
    }
    if (Math.abs(coords.y - this.centerWorldCoords.y) > 0.6 * this.heightInWorldUnits) {
      return false;
    }
    return true;
  }

  public isInViewport(coords: WorldCoords) {
    return (
      coords.x >= this.centerWorldCoords.x - this.widthInWorldUnits / 2 &&
      coords.x <= this.centerWorldCoords.x + this.widthInWorldUnits / 2 &&
      coords.y >= this.centerWorldCoords.y - this.heightInWorldUnits / 2 &&
      coords.y <= this.centerWorldCoords.y + this.heightInWorldUnits / 2
    );
  }

  public intersectsViewport(chunk: Chunk): boolean {
    const chunkLeft = chunk.chunkFootprint.bottomLeft.x;
    const chunkRight = chunkLeft + chunk.chunkFootprint.sideLength;
    const chunkBottom = chunk.chunkFootprint.bottomLeft.y;
    const chunkTop = chunkBottom + chunk.chunkFootprint.sideLength;

    const viewportLeft = this.centerWorldCoords.x - this.widthInWorldUnits / 2;
    const viewportRight = this.centerWorldCoords.x + this.widthInWorldUnits / 2;
    const viewportBottom = this.centerWorldCoords.y - this.heightInWorldUnits / 2;
    const viewportTop = this.centerWorldCoords.y + this.heightInWorldUnits / 2;
    if (
      chunkLeft > viewportRight ||
      chunkRight < viewportLeft ||
      chunkBottom > viewportTop ||
      chunkTop < viewportBottom
    ) {
      return false;
    }
    return true;
  }

  private isValidWorldWidth(width: number) {
    return width >= this.minWorldWidth && width <= this.maxWorldWidth;
  }

  private setWorldWidth(width: number): void {
    if (this.isValidWorldWidth(width)) {
      this.widthInWorldUnits = width;
      this.heightInWorldUnits = (width * this.viewportHeight) / this.viewportWidth;
      this.scale = this.widthInWorldUnits / this.viewportWidth;
    }
  }

  public setWorldHeight(height: number): void {
    this.heightInWorldUnits = height;
    this.widthInWorldUnits = (height * this.viewportWidth) / this.viewportHeight;
  }

  private getDetailLevel(): number {
    if (this.widthInWorldUnits > 65536) {
      return 5;
    }
    if (this.widthInWorldUnits > 32768) {
      return 4;
    }
    if (this.widthInWorldUnits > 16384) {
      return 3;
    }
    if (this.widthInWorldUnits > 8192) {
      return 2;
    }
    if (this.widthInWorldUnits > 4096) {
      return 1;
    }
    if (this.widthInWorldUnits > 2048) {
      return 0;
    }
    if (this.widthInWorldUnits > 1024) {
      return -1;
    }
    if (this.widthInWorldUnits > 512) {
      return -2;
    }
    return -3;
  }
}

export default Viewport;
