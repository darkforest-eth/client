import autoBind from 'auto-bind';
import GameUIManager from '../../../Backend/GameLogic/GameUIManager';
import { Setting } from '../../Utils/SettingsHooks';
import AsteroidRenderer from './Entities/AsteroidRenderer';
import BackgroundRenderer from './Entities/BackgroundRenderer';
import BeltRenderer from './Entities/BeltRenderer';
import BlackDomainRenderer from './Entities/BlackDomainRenderer';
import CircleRenderer from './Entities/CircleRenderer';
import LineRenderer from './Entities/LineRenderer';
import { MineRenderer } from './Entities/MineRenderer';
import PlanetRenderer from './Entities/PlanetRenderer';
import PlanetRenderManager from './Entities/PlanetRenderManager';
import { QuasarRenderer } from './Entities/QuasarRenderer';
import RectRenderer from './Entities/RectRenderer';
import RingRenderer from './Entities/RingRenderer';
import { RuinsRenderer } from './Entities/RuinsRenderer';
import { SpacetimeRipRenderer } from './Entities/SpacetimeRipRenderer';
import { SpriteRenderer } from './Entities/SpriteRenderer';
import TextRenderer from './Entities/TextRenderer';
import VoyageRenderer from './Entities/VoyageRenderer';
import { WormholeRenderer } from './Entities/WormholeRenderer';
import Overlay2DRenderer from './Overlay2DRenderer';
import { UIRenderer } from './UIRenderer';
import { GameGLManager } from './WebGL/GameGLManager';

class Renderer {
  static instance: Renderer | null;

  canvas: HTMLCanvasElement;
  glCanvas: HTMLCanvasElement;

  bufferCanvas: HTMLCanvasElement;

  frameRequestId: number;
  gameUIManager: GameUIManager;

  frameCount: number;
  now: number; // so that we only need to compute Date.now() once per frame

  // render engines
  glManager: GameGLManager;
  overlay2dRenderer: Overlay2DRenderer;

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
  spriteRenderer: SpriteRenderer;
  quasarRenderer: QuasarRenderer;
  spacetimeRipRenderer: SpacetimeRipRenderer;
  ruinsRenderer: RuinsRenderer;
  ringRenderer: RingRenderer;
  blackDomainRenderer: BlackDomainRenderer;

  // render managers
  uiRenderManager: UIRenderer;
  planetRenderManager: PlanetRenderManager;
  voyageRenderManager: VoyageRenderer;
  wormholeRenderManager: WormholeRenderer;

  private previousRenderTimestamp: number;

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
    this.overlay2dRenderer = new Overlay2DRenderer(this, this.canvas);
    this.previousRenderTimestamp = Date.now();

    this.gameUIManager = gameUIManager;

    this.frameCount = 0;
    this.now = Date.now();

    autoBind(this);

    // do async stuff here e.g.: loadTextures(() => this.setup());
    this.setup();
  }

  private setup() {
    this.bgRenderer = new BackgroundRenderer(
      this.glManager,
      this.gameUIManager.getPerlinConfig(),
      this.gameUIManager.getPerlinThresholds()
    );
    this.planetRenderer = new PlanetRenderer(this.glManager);
    this.asteroidRenderer = new AsteroidRenderer(this.glManager);
    this.beltRenderer = new BeltRenderer(this.glManager);
    this.mineRenderer = new MineRenderer(this.glManager);
    this.spriteRenderer = new SpriteRenderer(this.glManager, true, true);
    this.quasarRenderer = new QuasarRenderer(this.glManager);
    this.spacetimeRipRenderer = new SpacetimeRipRenderer(this.glManager);
    this.ruinsRenderer = new RuinsRenderer(this.glManager);
    this.ringRenderer = new RingRenderer(this.glManager);
    this.blackDomainRenderer = new BlackDomainRenderer(this.glManager);

    this.lineRenderer = new LineRenderer(this.glManager);
    this.circleRenderer = new CircleRenderer(this.glManager);
    this.rectRenderer = new RectRenderer(this.glManager);
    this.textRenderer = new TextRenderer(this.glManager, this.bufferCanvas);

    this.voyageRenderManager = new VoyageRenderer(this);
    this.wormholeRenderManager = new WormholeRenderer(this);
    this.planetRenderManager = new PlanetRenderManager(this);
    this.uiRenderManager = new UIRenderer(this);

    this.loop();
  }

  static destroy(): void {
    if (Renderer.instance) {
      window.cancelAnimationFrame(Renderer.instance.frameRequestId);
    }
    Renderer.instance = null;
  }

  static initialize(
    canvas: HTMLCanvasElement,
    glCanvas: HTMLCanvasElement,
    bufferCanvas: HTMLCanvasElement,
    gameUIManager: GameUIManager
  ) {
    const canvasRenderer = new Renderer(canvas, glCanvas, bufferCanvas, gameUIManager);
    Renderer.instance = canvasRenderer;

    return canvasRenderer;
  }

  private recordRender(now: number) {
    this.gameUIManager.updateDiagnostics((d) => {
      d.fps = 1000 / (now - this.previousRenderTimestamp);
    });

    this.previousRenderTimestamp = now;
  }

  private loop() {
    this.frameCount++;
    this.now = Date.now();
    this.draw();
    this.recordRender(Date.now());

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
    this.overlay2dRenderer.clear();
    this.glManager.isHighPerf = this.gameUIManager.getIsHighPerfMode();
    this.glManager.clear();

    // get some data
    const { cachedPlanets, chunks } = this.gameUIManager.getLocationsAndChunks();
    const isHighPerfMode = this.gameUIManager.getBooleanSetting(Setting.HighPerformanceRendering);
    const disableEmojis = this.gameUIManager.getBooleanSetting(Setting.DisableEmojiRendering);
    const disableHats = this.gameUIManager.getBooleanSetting(Setting.DisableHatRendering);
    const drawChunkBorders = this.gameUIManager.getBooleanSetting(Setting.DrawChunkBorders);

    // draw the bg
    this.bgRenderer.drawChunks(chunks, isHighPerfMode, drawChunkBorders);

    this.uiRenderManager.queueBorders();
    this.uiRenderManager.queueSelectedRangeRing();
    this.uiRenderManager.queueSelectedRect();
    this.uiRenderManager.queueHoveringRect();
    this.uiRenderManager.queueMousePath();
    this.uiRenderManager.drawMiner(); // drawn to canvas, which sits above gl

    // queue voyages calls
    this.voyageRenderManager.queueVoyages();

    // queue wormhole calls
    this.wormholeRenderManager.queueWormholes();

    // queue planets
    this.planetRenderManager.queuePlanets(
      cachedPlanets,
      this.now,
      isHighPerfMode,
      disableEmojis,
      disableHats
    );

    // flush all - ordering matters! (they get drawn bottom-up)
    this.lineRenderer.flush();
    this.planetRenderManager.flush();
    this.circleRenderer.flush();
    this.rectRenderer.flush();
    this.textRenderer.flush();
    this.spriteRenderer.flush();

    // render all of the plugins
    this.gameUIManager.getPluginManager()?.drawAllRunningPlugins(this.overlay2dRenderer.ctx);
  }
}

export default Renderer;
