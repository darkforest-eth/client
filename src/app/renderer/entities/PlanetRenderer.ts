import { getPlanetCosmetic } from '../../../utils/ProcgenUtils';
import { mat4 } from 'gl-matrix';
import AttribManager from '../webgl/AttribManager';
import {
  getPlanetProgramAndUniforms,
  planetColor2Props,
  planetColor3Props,
  planetColorProps,
  planetPosProps,
  planetProps2Props,
  planetPropsProps,
  planetRectPosProps,
  propsFromPlanet,
} from '../programs/PlanetProgram';
import {
  getNow,
  getPlanetZIndex,
  makeQuadBuffered,
  makeQuadVec2Buffered,
} from '../utils/EngineUtils';
import autoBind from 'auto-bind';
import { CanvasCoords } from '../../../utils/Coordinates';
import { AbstractGLManager } from '../webgl/WebGLManager';
import Viewport from '../../board/Viewport';
import { Planet } from '../../../_types/global/GlobalTypes';
import { engineConsts } from '../utils/EngineConsts';

const { maxRadius } = engineConsts.planet;

export default class PlanetRenderer {
  planetProgram: WebGLProgram;

  posA: AttribManager;
  colorA: AttribManager;
  color2A: AttribManager;
  color3A: AttribManager;
  rectPosA: AttribManager;
  propsA: AttribManager;
  props2A: AttribManager;

  matrixULoc: WebGLUniformLocation | null; // screenspace to clipspace
  timeMatrixULoc: WebGLUniformLocation | null; // rotation matrix based on time
  timeULoc: WebGLUniformLocation | null;

  timeMatrix: mat4;

  quad3Buffer: number[];
  quad2Buffer: number[];

  manager: AbstractGLManager;
  verts: number;
  viewport: Viewport;
  time: number;

  constructor(manager: AbstractGLManager) {
    autoBind(this);

    this.time = 0;

    this.viewport = Viewport.getInstance();

    this.manager = manager;

    const { gl } = this.manager;

    try {
      const { program, uniforms } = getPlanetProgramAndUniforms(gl);

      this.planetProgram = program;
      gl.useProgram(program);

      // attr buffers
      this.posA = new AttribManager(gl, program, planetPosProps);
      this.colorA = new AttribManager(gl, program, planetColorProps);
      this.color2A = new AttribManager(gl, program, planetColor2Props);
      this.color3A = new AttribManager(gl, program, planetColor3Props);
      this.rectPosA = new AttribManager(gl, program, planetRectPosProps);
      this.propsA = new AttribManager(gl, program, planetPropsProps);
      this.props2A = new AttribManager(gl, program, planetProps2Props);

      // set uniform locs
      this.matrixULoc = uniforms.matrix;
      this.timeMatrixULoc = uniforms.timeMatrix;
      this.timeULoc = uniforms.time;

      // non-gl stuff
      this.timeMatrix = mat4.create();
      this.quad3Buffer = Array(6 * 3).fill(0);
      this.quad2Buffer = Array(6 * 2).fill(0);

      makeQuadVec2Buffered(this.quad2Buffer, -1, -1, 1, 1);
      this.beginFrame();
    } catch (e) {
      console.error(e);
    }
  }

  beginFrame(): void {
    this.verts = 0;
  }

  // this guy should only be called by PlanetRenderManager
  flush(): void {
    this.time = getNow();

    const { gl } = this.manager;

    const { verts } = this;
    if (verts === 0) return;

    /* now draw things */
    gl.useProgram(this.planetProgram);

    // write buffers
    this.posA.bufferData(verts);
    this.rectPosA.bufferData(verts);
    this.colorA.bufferData(verts);
    this.color2A.bufferData(verts);
    this.color3A.bufferData(verts);
    this.propsA.bufferData(verts);
    this.props2A.bufferData(verts);

    // set uniforms
    gl.uniformMatrix4fv(this.matrixULoc, false, this.manager.projectionMatrix);

    mat4.fromYRotation(this.timeMatrix, this.time / 5);
    gl.uniformMatrix4fv(this.timeMatrixULoc, false, this.timeMatrix);

    gl.uniform1f(this.timeULoc, this.time / 6);

    gl.drawArrays(gl.TRIANGLES, 0, verts);

    this.beginFrame();
  }

  queuePlanetBodyScreen(
    planet: Planet,
    radius: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    const cosmetic = getPlanetCosmetic(planet);

    // auto-sorts on GPU
    const z = getPlanetZIndex(planet);

    makeQuadBuffered(this.quad3Buffer, x1, y1, x2, y2, z);
    this.posA.setVertex(this.quad3Buffer, this.verts);
    this.rectPosA.setVertex(this.quad2Buffer, this.verts);

    // calculate size of epsilon as percentage of radius
    const eps = 1 / radius;

    // calculate props
    const props = propsFromPlanet(planet);

    let alpha = 1.0;
    if (radius < maxRadius) {
      alpha = radius / maxRadius;
    }

    // push the same color 6 times
    for (let i = 0; i < 6; i++) {
      this.colorA.setVertex(cosmetic.landRgb, this.verts + i);
      this.color2A.setVertex(cosmetic.oceanRgb, this.verts + i);
      this.color3A.setVertex(cosmetic.beachRgb, this.verts + i);
      this.propsA.setVertex(props, this.verts + i);
      this.props2A.setVertex([cosmetic.seed, eps, alpha], this.verts + i);
    }

    this.verts += 6;
  }

  queuePlanetBody(
    planet: Planet,
    centerW: CanvasCoords,
    radiusW: number
  ): void {
    const center = this.viewport.worldToCanvasCoords(centerW);
    const radius = this.viewport.worldToCanvasDist(radiusW);

    const x1 = center.x - radius;
    const y1 = center.y - radius;
    const x2 = center.x + radius;
    const y2 = center.y + radius;

    this.queuePlanetBodyScreen(planet, radius, x1, y1, x2, y2);
  }
}
