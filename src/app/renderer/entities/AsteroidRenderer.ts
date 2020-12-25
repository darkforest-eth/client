import autoBind from 'auto-bind';
import { CanvasCoords } from '../../../utils/Coordinates';
import { getPlanetCosmetic } from '../../../utils/ProcgenUtils';
import { Planet } from '../../../_types/global/GlobalTypes';
import Viewport from '../../board/Viewport';
import {
  astColorProps,
  astPosProps,
  astRadiusProps,
  astSeedProps,
  astThetaProps,
  getAsteroidProgram,
  getAsteroidUniforms,
} from '../programs/AsteroidProgram';
import { RGBVec } from '../utils/EngineTypes';
import { getNow, getPlanetZIndex } from '../utils/EngineUtils';
import AttribManager from '../webgl/AttribManager';
import WebGLManager from '../webgl/WebGLManager';

export default class AsteroidRenderer {
  manager: WebGLManager;
  program: WebGLProgram;

  posA: AttribManager;
  colorA: AttribManager;
  radiusA: AttribManager;
  thetaA: AttribManager;
  seedA: AttribManager;

  verts: number;

  matrixULoc: WebGLUniformLocation | null; // screenspace to clipspace
  nowULoc: WebGLUniformLocation | null;

  viewport: Viewport;

  time: number;

  constructor(manager: WebGLManager) {
    autoBind(this);
    this.viewport = Viewport.getInstance();

    this.verts = 0;
    this.time = 0;

    this.manager = manager;

    const { gl } = this.manager;

    try {
      const program = getAsteroidProgram(gl);
      this.program = program;
      gl.useProgram(program);

      this.posA = new AttribManager(gl, program, astPosProps);
      this.colorA = new AttribManager(gl, program, astColorProps);
      this.radiusA = new AttribManager(gl, program, astRadiusProps);
      this.thetaA = new AttribManager(gl, program, astThetaProps);
      this.seedA = new AttribManager(gl, program, astSeedProps);

      const uniforms = getAsteroidUniforms(gl);
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

  queueAsteroid(
    planet: Planet,
    centerW: CanvasCoords,
    radiusW: number,
    color: RGBVec
  ) {
    const center = this.viewport.worldToCanvasCoords(centerW);
    const radius = this.viewport.worldToCanvasDist(radiusW);

    const cosmetic = getPlanetCosmetic(planet);

    const { x, y } = center;

    const z = getPlanetZIndex(planet);

    // initial asteroid offset
    const theta = (color[0] * 255 ** 2 + color[1] * 255 + color[2]) % 10000;

    this.posA.setVertex([x, y, z], this.verts);
    this.colorA.setVertex(color, this.verts);
    this.radiusA.setVertex([radius], this.verts);
    this.thetaA.setVertex([theta], this.verts);
    this.seedA.setVertex([cosmetic.seed], this.verts);

    this.verts += 1;
  }

  flush() {
    this.time = getNow();

    if (this.verts === 0) return;

    const { gl } = this.manager;

    gl.useProgram(this.program);

    this.posA.bufferData(this.verts);
    this.colorA.bufferData(this.verts);
    this.radiusA.bufferData(this.verts);
    this.thetaA.bufferData(this.verts);
    this.seedA.bufferData(this.verts);

    // using Date.now() instead of renderer.now avoids a weird vsync issue
    // set uniforms
    gl.uniformMatrix4fv(this.matrixULoc, false, this.manager.projectionMatrix);
    gl.uniform1f(this.nowULoc, this.time);

    // draw
    gl.drawArrays(gl.POINTS, 0, this.verts);

    this.beginFrame();
  }
}
