import UIEmitter, { UIEmitterEvent } from '../../utils/UIEmitter';
import {
  WorldCoords,
  CanvasCoords,
  distL2,
  vecLen,
  vecScale,
} from '../../utils/Coordinates';
import autoBind from 'auto-bind';
import {
  ExploredChunkData,
  isLocatable,
  Planet,
} from '../../_types/global/GlobalTypes';
import _ from 'lodash';
import { UIDataKey } from '../../api/UIStateStorageManager';
import GameUIManager from './GameUIManager';

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

  static instance: Viewport | null;

  centerWorldCoords: WorldCoords;
  widthInWorldUnits: number;
  heightInWorldUnits: number;
  viewportWidth: number;
  viewportHeight: number;
  isPanning = false;
  mouseLastCoords: CanvasCoords | null;
  canvas: HTMLCanvasElement;

  isFirefox: boolean;

  gameUIManager: GameUIManager;

  mousedownCoords: CanvasCoords | null = null;

  // for momentum stuff
  velocity: WorldCoords | null = null;
  momentum = false;
  shouldFling: boolean;

  mouseSensitivity: number;
  intervalId: ReturnType<typeof setTimeout>;
  frameRequestId: number;

  scale: number;
  private isSending = false;

  private constructor(
    gameUIManager: GameUIManager,
    centerWorldCoords: WorldCoords,
    widthInWorldUnits: number,
    viewportWidth: number,
    viewportHeight: number,
    canvas: HTMLCanvasElement
  ) {
    this.gameUIManager = gameUIManager;
    this.gameUIManager.setDetailLevel(this.getDetailLevel());

    this.shouldFling = gameUIManager.getUIDataItem(UIDataKey.shouldFling);

    // each of these is measured relative to the world coordinate system
    this.centerWorldCoords = centerWorldCoords;
    this.widthInWorldUnits = widthInWorldUnits;
    this.heightInWorldUnits =
      (widthInWorldUnits * viewportHeight) / viewportWidth;
    // while all of the above are in the world coordinate system, the below are in the page coordinate system
    this.viewportWidth = viewportWidth; // width / height
    this.viewportHeight = viewportHeight;

    this.mouseLastCoords = centerWorldCoords;
    this.canvas = canvas;

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
    Viewport.instance = null;
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
    viewport.loop();

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
  getStorage(): ViewportData | null {
    const key = this.getStorageKey();
    const stored = localStorage.getItem(key);
    if (stored) return (JSON.parse(stored) as ViewportData) || null;
    return null;
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
    typeof data.widthInWorldUnits === 'number' &&
      this.setWorldWidth(data.widthInWorldUnits);
    typeof data.widthInWorldUnits === 'number' &&
      this.centerCoords(data.centerWorldCoords);
  }

  centerPlanet(planet: Planet | null): void {
    if (!planet) return;
    const loc = this.gameUIManager.getLocationOfPlanet(planet.locationId);
    if (!loc) return;
    const { x, y } = loc.coords;
    this.centerWorldCoords = { x, y };
  }

  // centers on a planet and makes it fill the viewport
  zoomPlanet(planet: Planet | null): void {
    if (!planet || !isLocatable(planet)) return;
    this.centerPlanet(planet);
    // in world coords
    const rad = this.gameUIManager.getRadiusOfPlanetLevel(planet.planetLevel);
    this.setWorldHeight(4 * rad);
  }

  centerCoords(coords: WorldCoords): void {
    this.centerWorldCoords = coords;
  }

  centerChunk(chunk: ExploredChunkData): void {
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
    this.velocity = null;
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
    if (
      this.mousedownCoords &&
      distL2(canvasCoords, this.mousedownCoords) < 3
    ) {
      uiEmitter.emit(UIEmitterEvent.WorldMouseClick, worldCoords);
    }

    this.mousedownCoords = null;
    uiEmitter.emit(UIEmitterEvent.WorldMouseUp, worldCoords);
    this.isPanning = false;

    this.momentum = true;
    this.mouseLastCoords = canvasCoords;

    if (this.velocity && vecLen(this.velocity) < VEL_THRESHOLD) {
      this.velocity = null;
      this.momentum = false;
    }
  }

  setFling(fling: boolean) {
    this.shouldFling = fling;
  }

  loop() {
    if (this.shouldFling) {
      // do velocity
      if (this.momentum && this.velocity) {
        const velX = this.velocity.x;
        const velY = this.velocity.y;

        if (!isNaN(velX) && !isNaN(velY)) {
          this.centerWorldCoords = {
            x: this.centerWorldCoords.x + velX,
            y: this.centerWorldCoords.y + velY,
          };
        }

        this.velocity = vecScale(this.velocity, 0.98);

        if (vecLen(this.velocity) < VEL_THRESHOLD) {
          this.velocity = null;
          this.momentum = false;
        }
      }
    }

    this.frameRequestId = window.requestAnimationFrame(this.loop);
  }

  onMouseOut() {
    const uiEmitter = UIEmitter.getInstance();

    uiEmitter.emit(UIEmitterEvent.WorldMouseOut);
    this.isPanning = false;
    this.mouseLastCoords = null;
  }

  onScroll(deltaY: number, forceZoom = false) {
    if (this.mouseLastCoords !== null || forceZoom) {
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
      this.gameUIManager.setDetailLevel(this.getDetailLevel());
    }
  }

  onWindowResize() {
    this.viewportHeight = this.canvas.height;
    this.viewportWidth = this.canvas.width;
    this.updateScale();
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

  worldToCanvasX(x: number): number {
    return (x - this.centerWorldCoords.x) / this.scale + this.viewportWidth / 2;
  }

  canvasToWorldX(x: number): number {
    return (x - this.viewportWidth / 2) * this.scale + this.centerWorldCoords.x;
  }

  worldToCanvasY(y: number): number {
    return (
      (-1 * (y - this.centerWorldCoords.y)) / this.scale +
      this.viewportHeight / 2
    );
  }

  canvasToWorldY(y: number): number {
    return (
      -1 * (y - this.viewportHeight / 2) * this.scale + this.centerWorldCoords.y
    );
  }

  isInOrAroundViewport(coords: WorldCoords): boolean {
    if (
      Math.abs(coords.x - this.centerWorldCoords.x) >
      0.6 * this.widthInWorldUnits
    ) {
      return false;
    }
    if (
      Math.abs(coords.y - this.centerWorldCoords.y) >
      0.6 * this.heightInWorldUnits
    ) {
      return false;
    }
    return true;
  }

  intersectsViewport(chunk: ExploredChunkData): boolean {
    const chunkLeft = chunk.chunkFootprint.bottomLeft.x;
    const chunkRight = chunkLeft + chunk.chunkFootprint.sideLength;
    const chunkBottom = chunk.chunkFootprint.bottomLeft.y;
    const chunkTop = chunkBottom + chunk.chunkFootprint.sideLength;

    const viewportLeft = this.centerWorldCoords.x - this.widthInWorldUnits / 2;
    const viewportRight = this.centerWorldCoords.x + this.widthInWorldUnits / 2;
    const viewportBottom =
      this.centerWorldCoords.y - this.heightInWorldUnits / 2;
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
      // world scale width
      this.widthInWorldUnits = width;
      this.heightInWorldUnits =
        (width * this.viewportHeight) / this.viewportWidth;

      this.updateScale();
    }
  }

  private updateScale() {
    this.scale = this.widthInWorldUnits / this.viewportWidth;
  }

  private setWorldHeight(height: number): void {
    this.heightInWorldUnits = height;
    this.widthInWorldUnits =
      (height * this.viewportWidth) / this.viewportHeight;
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
