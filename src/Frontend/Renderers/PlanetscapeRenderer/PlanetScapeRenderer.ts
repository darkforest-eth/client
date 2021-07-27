import { bonusFromHex } from '@darkforest_eth/hexgen';
import { Artifact, Planet, PlanetType } from '@darkforest_eth/types';
import autoBind from 'auto-bind';
import { mat4 } from 'gl-matrix';
import GameUIManager from '../../../Backend/GameLogic/GameUIManager';
import { mockCommon } from '../../../Backend/Procedural/ArtifactProcgen';
import { PixelCoords, ProcgenUtils } from '../../../Backend/Procedural/ProcgenUtils';
import { StatIdx } from '../../../_types/global/GlobalTypes';
import dfstyles from '../../Styles/dfstyles';
import { RGBVec } from '../GameRenderer/EngineTypes';
import { SpriteRenderer } from '../GameRenderer/Entities/SpriteRenderer';
import { WebGLManager } from '../GameRenderer/WebGL/WebGLManager';
import { PathRenderer } from './PathRenderer';

const ARTIFACT_W = 128;

export class PlanetscapeRenderer extends WebGLManager {
  public planet: Planet | undefined;
  public projectionMatrix: mat4;

  // we use the uiManager to get the artifacts
  private uiManager: GameUIManager;
  private artifacts: Artifact[];

  private moonCtx: CanvasRenderingContext2D;
  private moonCanvas: HTMLCanvasElement;
  private frameRequestId: number;
  private TICK_SIZE = 3;
  private pathRenderer: PathRenderer;
  private spriteRenderer: SpriteRenderer;
  private isPaused: boolean;

  constructor(canvas: HTMLCanvasElement, moonCanvas: HTMLCanvasElement, uiManager: GameUIManager) {
    super(canvas);

    this.uiManager = uiManager;
    this.artifacts = [];

    this.planet = undefined;
    this.moonCanvas = moonCanvas;

    const ctx = moonCanvas.getContext('2d');
    if (!ctx) {
      console.error('error getting 2d context');
      return;
    }
    this.moonCtx = ctx;

    const { gl } = this;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this.pathRenderer = new PathRenderer(this);
    this.spriteRenderer = new SpriteRenderer(this, false, true);

    this.isPaused = false;
    this.loop();

    autoBind(this);
  }

  setPaused(isPaused?: boolean) {
    this.isPaused = !!isPaused;
  }

  public destroy(): void {
    /* we're in bad territory if this ever gets called - it means there's a memory leak.
    you can't really clean up after WebGL contexts*/
    console.error('canceled PlanetScape!');
    window.cancelAnimationFrame(this.frameRequestId);
  }

  private loop(): void {
    if (!this.isPaused) {
      this.clear();
      this.setProjectionMatrix();
      this.draw();
    }

    this.frameRequestId = window.requestAnimationFrame(this.loop);
  }

  public setPlanet(planet: Planet | undefined): void {
    this.planet = planet;
    if (planet) {
      this.artifacts = this.uiManager
        .getArtifactsWithIds(planet.heldArtifactIds)
        .filter((a) => !!a) as Artifact[];
    } else {
      this.artifacts = [];
    }
  }

  private drawHill(fn: (x: number) => number, color: RGBVec): void {
    const {
      TICK_SIZE,
      canvas: { height, width },
    } = this;

    const arr: PixelCoords[] = [];
    const numTicks = Math.floor(width / TICK_SIZE);

    arr.push({ x: 0, y: height });

    for (let i = 0; i <= numTicks; i++) {
      const x = i * TICK_SIZE;

      arr.push({ x, y: fn(x) });
      arr.push({ x, y: height });
    }

    this.pathRenderer.drawPath(arr, color);
  }

  private drawScape(): void {
    const planet = this.planet;
    if (!planet) return;
    if (planet.planetType !== PlanetType.PLANET) return;

    const { height } = this.canvas;

    const cosmetic = ProcgenUtils.getPlanetCosmetic(planet);

    const perlin: (x: PixelCoords) => number = ProcgenUtils.planetPerlin(planet.locationId);
    // const rand: () => number = planetRandom(planet.locationId);

    const oct1 = (p: PixelCoords) => 0.5 * perlin({ x: 2 * p.x, y: 2 * p.y });
    const oct2 = (p: PixelCoords) => 0.25 * perlin({ x: 4 * p.x, y: 4 * p.y });

    const mtn = (p: PixelCoords) => perlin(p) + oct1(p) + oct2(p);

    const { mtnColor: mC1, mtnColor2: mC2, mtnColor3: mC3 } = cosmetic;

    // draw mountains
    const mtnY0 = height * 0.7;
    const mtnH = 60;
    this.drawHill((x) => 0 + mtnY0 + mtnH * mtn({ x: 2 * x, y: 30 }), mC1);
    this.drawHill((x) => 7 + mtnY0 + mtnH * mtn({ x: 2 * x, y: 37 }), mC2);
    this.drawHill((x) => 14 + mtnY0 + mtnH * mtn({ x: 2 * x, y: 44 }), mC3);

    const { baseColor: hC1, baseColor2: hC2, baseColor3: hC3 } = cosmetic;

    const hillY0 = height * 0.74;
    const hillH = 10;
    this.drawHill((x) => 0 + hillY0 + hillH * perlin({ x, y: 0 }), hC1);
    this.drawHill((x) => 5 + hillY0 + hillH * perlin({ x, y: 5 }), hC2);
    this.drawHill((x) => 15 + hillY0 + hillH * perlin({ x, y: 10 }), hC3);
  }

  // workaround for weird bug where not drawing once crashes the renderer
  // TODO fix & remove
  private flushArtifactOnce() {
    this.drawHill((x) => x, [255, 0, 0]);
    this.spriteRenderer.queueArtifact(mockCommon, { x: 0, y: 0 });
    this.spriteRenderer.flush();
    this.clear();
  }

  private queueArtifacts() {
    if (!this.planet) return;

    const { width } = this.canvas;

    const totalWidth = Math.max(2 * width, this.artifacts.length * (ARTIFACT_W + 10));

    const margin = totalWidth / this.artifacts.length;

    const offset = Date.now() / 30;

    for (let i = 0; i < this.artifacts.length; i++) {
      const artifact = this.artifacts[i];
      this.spriteRenderer.queueArtifact(artifact, {
        x: -0.5 * totalWidth + ((i * margin + offset) % totalWidth),
        y: 10,
      });
    }
  }

  private draw() {
    this.flushArtifactOnce();

    this.queueArtifacts();
    this.spriteRenderer.flush();

    this.drawMoon();
    this.drawScape();
  }

  // TODO convert this to GL
  private drawMoon() {
    const planet = this.planet;
    if (!planet) return;

    const cosmetic = ProcgenUtils.getPlanetCosmetic(planet);
    const bonuses = bonusFromHex(planet.locationId);

    const rand = ProcgenUtils.planetRandom(planet.locationId);

    const ctx = this.moonCtx;
    const canvas = this.canvas;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = cosmetic.bgStr;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'color-burn';
    const darkness = Math.max(0, 0.35 + 0.4 * Math.sin(Date.now() / 8500 + rand() * 10000));
    ctx.globalAlpha = darkness;
    ctx.fillStyle = '#020208';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';

    ctx.fillStyle = 'white';
    for (let i = 0; i < 20; i++) {
      const center = { x: (rand() * 10000) % 500, y: (rand() * 10000) % 200 };
      if (rand() < 0.5) {
        const starSize = 1 + rand() * 3;
        ctx.fillRect(center.x - starSize, center.y, 2 * starSize + 1, 1);
        ctx.fillRect(center.x, center.y - starSize, 1, 2 * starSize + 1);
      } else {
        ctx.fillRect(center.x, center.y, 1, 1);
      }
    }

    const dir = rand() < 0.5 ? -1 : 1;
    for (let i = 0; i < bonuses.length; i++) {
      const bar = 10000;
      const mult = (0.5 + rand() * 2) * 0.1;
      let posX = ((Date.now() * mult + rand() * bar) % bar) / bar;
      if (dir === -1) posX = 1 - posX;

      const radius = 15 + rand() * 20;
      const moonX = (-0.5 + 2 * posX) * canvas.width;
      const moonY = (0.1 + rand() * 0.2) * canvas.height;

      if (bonuses[i]) {
        let color;
        const { energyCap, energyGro, range, speed, def } = dfstyles.game.bonuscolors;
        if (i === StatIdx.EnergyCap) color = energyCap;
        else if (i === StatIdx.EnergyGro) color = energyGro;
        else if (i === StatIdx.Range) color = range;
        else if (i === StatIdx.Speed) color = speed;
        else color = def;

        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(moonX, moonY, radius + 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(moonX, moonY, radius, 0, 2 * Math.PI);

        ctx.globalAlpha = 0.3;
        ctx.fill();
        ctx.fillStyle = color;
        ctx.fill();
      }
    }
  }
}
