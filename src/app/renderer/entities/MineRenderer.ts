import autoBind from 'auto-bind';
import { CanvasCoords, WorldCoords } from '../../../utils/Coordinates';
import { ProcgenUtils } from '../../../utils/ProcgenUtils';
import { Planet } from '../../../_types/global/GlobalTypes';
import Viewport from '../../board/Viewport';
import {
  minePosProps,
  mineColorProps,
  mineRadiusProps,
  getMineProgramAndUniforms,
  mineSeedProps,
  mineOffsetProps,
} from '../programs/MineProgram';
import { RGBVec } from '../utils/EngineTypes';
import EngineUtils from '../utils/EngineUtils';
import AttribManager from '../webgl/AttribManager';
import { WebGLManager } from '../webgl/WebGLManager';

export class MineRenderer {
  manager: WebGLManager;
  program: WebGLProgram;

  posA: AttribManager;
  colorA: AttribManager;
  radiusA: AttribManager;
  seedA: AttribManager;
  offsetA: AttribManager;

  verts: number;

  matrixULoc: WebGLUniformLocation | null; // screenspace to clipspace
  nowULoc: WebGLUniformLocation | null;
  viewport: Viewport;

  constructor(manager: WebGLManager) {
    autoBind(this);

    this.viewport = Viewport.getInstance();

    this.verts = 0;

    this.manager = manager;

    const { gl } = this.manager;

    try {
      const { program, uniforms } = getMineProgramAndUniforms(gl);
      this.program = program;
      gl.useProgram(program);

      this.posA = new AttribManager(gl, program, minePosProps);
      this.colorA = new AttribManager(gl, program, mineColorProps);
      this.radiusA = new AttribManager(gl, program, mineRadiusProps);
      this.seedA = new AttribManager(gl, program, mineSeedProps);
      this.offsetA = new AttribManager(gl, program, mineOffsetProps);

      this.matrixULoc = uniforms.matrix;
      this.nowULoc = uniforms.now;
    } catch (e) {
      console.error(e);
    }

    this.beginFrame();
  }

  private beginFrame() {
    this.verts = 0;
  }

  private queuePoint(
    { x, y }: CanvasCoords,
    z: number,
    radius: number, // canvas coords
    color: RGBVec,
    seed: number,
    offset: number
  ) {
    this.posA.setVertex([x, y, z], this.verts);
    this.radiusA.setVertex([radius], this.verts);
    this.colorA.setVertex(color, this.verts);
    this.seedA.setVertex([seed], this.verts);
    this.offsetA.setVertex([offset], this.verts);

    this.verts += 1;
  }

  queueMineScreen(
    planet: Planet,
    center: WorldCoords,
    radius: number,
    z: number
  ) {
    const cosmetic = ProcgenUtils.getPlanetCosmetic(planet);
    const { seed } = cosmetic;
    const numAsteroids = planet.planetLevel + 1;
    const interval = (2 * Math.PI) / numAsteroids;
    const [h, s, l] = cosmetic.asteroidHsl;

    const p = 5;

    for (let i = 0; i < numAsteroids; i++) {
      const offset = i * interval;
      const rand1 = ((seed + 1741 * i) % p) / p; // bad deterinistic random
      const rand2 = ((seed + 1741 * (i + 10)) % p) / p; // bad deterinistic random

      const delS = -20 + rand1 * 40;
      const delL = -20 + rand2 * 40;

      const ptColor = ProcgenUtils.hslToRgb([h, s + delS, l + delL]);
      this.queuePoint(center, z, radius, ptColor, seed + i, offset);
    }
  }

  queueMine(planet: Planet, centerW: WorldCoords, radiusW: number) {
    const center = this.viewport.worldToCanvasCoords(centerW);
    const radius = this.viewport.worldToCanvasDist(radiusW);
    const z = EngineUtils.getPlanetZIndex(planet);

    this.queueMineScreen(planet, center, radius, z);
  }

  flush() {
    if (this.verts === 0) return;

    const { gl } = this.manager;

    gl.useProgram(this.program);

    this.posA.bufferData(this.verts);
    this.colorA.bufferData(this.verts);
    this.radiusA.bufferData(this.verts);
    this.seedA.bufferData(this.verts);
    this.offsetA.bufferData(this.verts);

    // set uniforms
    gl.uniformMatrix4fv(this.matrixULoc, false, this.manager.projectionMatrix);
    gl.uniform1f(this.nowULoc, EngineUtils.getNow());

    // draw
    gl.drawArrays(gl.POINTS, 0, this.verts);

    this.beginFrame();
  }
}
