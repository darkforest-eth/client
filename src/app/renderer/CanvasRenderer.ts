import GameUIManager from '../board/GameUIManager';
import autoBind from 'auto-bind';
import BackgroundRenderer from './entities/BackgroundRenderer';
import CanvasManager from './CanvasManager';
import PlanetRenderer from './entities/PlanetRenderer';
import VoyageRenderManager from './entities/VoyageRenderManager';
import { UIRenderManager } from './entities/UIRenderManager';
import LineRenderer from './entities/LineRenderer';
import CircleRenderer from './entities/CircleRenderer';
import TextRenderer from './entities/TextRenderer';
import RectRenderer from './entities/RectRenderer';
import PlanetRenderManager from './entities/PlanetRenderManager';
import AsteroidRenderer from './entities/AsteroidRenderer';
import BeltRenderer from './entities/BeltRenderer';
import { MineRenderer } from './entities/MineRenderer';
import { SpriteRenderer } from './entities/SpriteRenderer';
import { GameGLManager } from './webgl/GameGLManager';

class CanvasRenderer {
  static instance: CanvasRenderer | null;

  canvas: HTMLCanvasElement;
  glCanvas: HTMLCanvasElement;

  bufferCanvas: HTMLCanvasElement;

  frameRequestId: number;
  gameUIManager: GameUIManager;

  frameCount: number;
  now: number; // so that we only need to compute Date.now() once per frame

  // render engines
  glManager: GameGLManager;
  canvasManager: CanvasManager;

  // primitives
  lineRenderer: LineRenderer;
  circleRenderer: CircleRenderer;
  textRenderer: TextRenderer;
  rectRenderer: RectRenderer;

  // game entities
  bgRenderer: BackgroundRenderer;
  planetRenderer: PlanetRenderer;
  asteroidRenderer: AsteroidRenderer;
  beltRenderer: BeltRenderer;
  mineRenderer: MineRenderer;
  thumbRenderer: SpriteRenderer;

  // render managers
  uiRenderManager: UIRenderManager;
  planetRenderManager: PlanetRenderManager;
  voyageRenderManager: VoyageRenderManager;

  private constructor(
    canvas: HTMLCanvasElement,
    glCanvas: HTMLCanvasElement,
    bufferCanvas: HTMLCanvasElement,
    gameUIManager: GameUIManager
  ) {
    this.canvas = canvas;
    this.glCanvas = glCanvas;
    this.bufferCanvas = bufferCanvas;

    this.glManager = new GameGLManager(this, this.glCanvas);
    this.canvasManager = new CanvasManager(this, this.canvas);

    this.gameUIManager = gameUIManager;

    this.frameCount = 0;
    this.now = Date.now();

    autoBind(this);

    // do async stuff here e.g.: loadTextures(() => this.setup());
    this.setup();
  }

  private setup() {
    this.bgRenderer = new BackgroundRenderer(this.glManager);
    this.planetRenderer = new PlanetRenderer(this.glManager);
    this.asteroidRenderer = new AsteroidRenderer(this.glManager);
    this.beltRenderer = new BeltRenderer(this.glManager);
    this.mineRenderer = new MineRenderer(this.glManager);
    this.thumbRenderer = new SpriteRenderer(this.glManager, true, true);

    this.lineRenderer = new LineRenderer(this.glManager);
    this.circleRenderer = new CircleRenderer(this.glManager);
    this.rectRenderer = new RectRenderer(this.glManager);
    this.textRenderer = new TextRenderer(this.glManager, this.bufferCanvas);

    this.voyageRenderManager = new VoyageRenderManager(this);
    this.planetRenderManager = new PlanetRenderManager(this);
    this.uiRenderManager = new UIRenderManager(this);

    this.loop();
  }

  static destroy(): void {
    if (CanvasRenderer.instance) {
      window.cancelAnimationFrame(CanvasRenderer.instance.frameRequestId);
    }
    CanvasRenderer.instance = null;
  }

  static initialize(
    canvas: HTMLCanvasElement,
    glCanvas: HTMLCanvasElement,
    bufferCanvas: HTMLCanvasElement,
    gameUIManager: GameUIManager
  ) {
    const canvasRenderer = new CanvasRenderer(
      canvas,
      glCanvas,
      bufferCanvas,
      gameUIManager
    );
    CanvasRenderer.instance = canvasRenderer;

    return canvasRenderer;
  }

  private loop() {
    this.frameCount++;
    this.now = Date.now();
    this.draw();

    this.frameRequestId = window.requestAnimationFrame(() => this.loop());
  }

  /* one optimization we make is to queue batches of lots of vertices, then flush them all to the GPU in one go.
     one result of this is that things don't draw in the order they're queued - they draw in the order they're flushed.
     so *all lines* will draw before *all planets*. if you want to change the ordering on the layers, you need to add 
     an early flush() somewhere. */

  private draw() {
    // write matrix uniform
    this.glManager.setProjectionMatrix();

    // clear all
    this.canvasManager.clear();
    this.glManager.clear();

    // get some data
    const { locations, chunks } = this.gameUIManager.getLocationsAndChunks();

    // draw the bg
    this.bgRenderer.drawChunks(chunks);

    this.uiRenderManager.queueBorders();
    this.uiRenderManager.queueSelectedRangeRing();
    this.uiRenderManager.queueSelectedRect();
    this.uiRenderManager.queueHoveringRect();
    this.uiRenderManager.queueMousePath();
    this.uiRenderManager.drawMiner(); // drawn to canvas, which sits above gl

    // queued voyages calls
    this.voyageRenderManager.queueVoyages();

    // queue planets
    this.planetRenderManager.queuePlanets(locations);

    // flush all - ordering matters! (they get drawn bottom-up)
    this.lineRenderer.flush();
    this.planetRenderManager.flush();
    this.circleRenderer.flush();
    this.rectRenderer.flush();
    this.textRenderer.flush();
    this.thumbRenderer.flush();

    // render all of the plugins
    this.gameUIManager
      .getPluginManager()
      ?.drawAllRunningPlugins(this.canvasManager.ctx);
  }

  // for throttled debugging: renderer.debug() && console.log(...);
  debug(interval = 120): boolean {
    return this.frameCount % interval === 0;
  }
}

export default CanvasRenderer;
