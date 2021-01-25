import autoBind from 'auto-bind';
import { CanvasCoords, WorldCoords } from '../../../utils/Coordinates';
import { Planet } from '../../../_types/global/GlobalTypes';
import Viewport from '../../board/Viewport';
import {
  getBeltProgram,
  beltPosProps,
  beltColorProps,
  getBeltUniforms,
  beltRectPosProps,
  beltPropsProps,
  propsFromIdx,
  BeltProps,
} from '../programs/BeltProgram';
import { RGBVec } from '../utils/EngineTypes';
import EngineUtils from '../utils/EngineUtils';
import AttribManager from '../webgl/AttribManager';
import { GameGLManager } from '../webgl/GameGLManager';

export default class BeltRenderer {
  manager: GameGLManager;
  program: WebGLProgram;

  posA: AttribManager;
  rectPosA: AttribManager;
  colorA: AttribManager;
  propsA: AttribManager;

  verts: number;

  matrixULoc: WebGLUniformLocation | null; // screenspace to clipspace
  nowULoc: WebGLUniformLocation | null;

  viewport: Viewport;

  topRectPosBuffer: number[]; // 2d for rect pos
  botRectPosBuffer: number[]; // 2d for rect pos
  posBuffer: number[]; // 3d for writing actual pos

  time: number;

  constructor(manager: GameGLManager) {
    this.time = 0;
    autoBind(this);
    this.viewport = Viewport.getInstance();

    this.verts = 0;

    this.manager = manager;

    const { gl } = this.manager;

    this.topRectPosBuffer = Array(6 * 2).fill(0);
    this.botRectPosBuffer = Array(6 * 2).fill(0);
    this.posBuffer = Array(6 * 3).fill(0);

    // consistent with math coords

    try {
      const program = getBeltProgram(gl);
      this.program = program;
      gl.useProgram(program);

      this.posA = new AttribManager(gl, program, beltPosProps);
      this.rectPosA = new AttribManager(gl, program, beltRectPosProps);
      this.colorA = new AttribManager(gl, program, beltColorProps);
      this.propsA = new AttribManager(gl, program, beltPropsProps);

      const uniforms = getBeltUniforms(gl);
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

  queueBeltWorld(
    centerW: CanvasCoords,
    radiusW: number, // screen coords
    color: RGBVec,
    l = 1, // number of radii length
    z = 0,
    delZ = 0,
    props: BeltProps = [10, 1, 1, 0.05],
    angle = 0
  ) {
    const center = this.viewport.worldToCanvasCoords(centerW);
    const radius = this.viewport.worldToCanvasDist(radiusW);

    this.queueBelt(center, radius, color, l, z, delZ, props, angle);
  }

  queueBelt(
    center: CanvasCoords,
    radius: number, // screen coords
    color: RGBVec,
    l = 1, // number of radii length
    z = 0,
    delZ = 0,
    props: BeltProps = [10, 1, 1, 0.05],
    angle = 0
  ) {
    EngineUtils.makeQuadVec2Buffered(this.topRectPosBuffer, -l, l, l, 0);
    EngineUtils.makeQuadVec2Buffered(this.botRectPosBuffer, -l, 0, l, -l);
    const sideLength = l * radius;

    const d1: [number, number] = [-sideLength, -sideLength];
    const d2: [number, number] = [+sideLength, +sideLength];

    const x1 = d1[0];
    const y1 = d1[1];
    const x2 = d2[0];
    const y2 = d2[1];

    // buffer top half
    EngineUtils.makeQuadBuffered(this.posBuffer, x1, y1, x2, 0, z + delZ);
    EngineUtils.rotateQuad(this.posBuffer, angle);
    EngineUtils.translateQuad(this.posBuffer, [center.x, center.y]);
    this.posA.setVertex(this.posBuffer, this.verts);
    this.rectPosA.setVertex(this.topRectPosBuffer, this.verts);

    for (let i = 0; i < 6; i++) {
      this.colorA.setVertex(color, this.verts + i);
      this.propsA.setVertex(props, this.verts + i);
    }
    this.verts += 6;

    // buffer bottom half
    EngineUtils.makeQuadBuffered(this.posBuffer, x1, 0, x2, y2, z - delZ);
    EngineUtils.rotateQuad(this.posBuffer, angle);
    EngineUtils.translateQuad(this.posBuffer, [center.x, center.y]);
    this.posA.setVertex(this.posBuffer, this.verts);
    this.rectPosA.setVertex(this.botRectPosBuffer, this.verts);

    for (let i = 0; i < 6; i++) {
      this.colorA.setVertex(color, this.verts + i);
      this.propsA.setVertex(props, this.verts + i);
    }
    this.verts += 6;
  }

  queueBeltAtIdx(
    planet: Planet,
    centerW: WorldCoords,
    radiusW: number,
    color: RGBVec,
    beltIdx: number,
    angle = 0
  ) {
    const delZ = 0.01 * (beltIdx + 1);

    const props = propsFromIdx(beltIdx);
    const z = EngineUtils.getPlanetZIndex(planet);
    const l = 3.0 + beltIdx * 1.5;

    this.queueBeltWorld(centerW, radiusW, color, l, z, delZ, props, angle);
  }

  flush() {
    this.time = EngineUtils.getNow();

    if (this.verts === 0) return;

    const { gl } = this.manager;

    gl.useProgram(this.program);

    this.posA.bufferData(this.verts);
    this.rectPosA.bufferData(this.verts);
    this.colorA.bufferData(this.verts);
    this.propsA.bufferData(this.verts);

    // using Date.now() instead of renderer.now avoids a weird vsync issue
    // set uniforms
    gl.uniformMatrix4fv(this.matrixULoc, false, this.manager.projectionMatrix);
    gl.uniform1f(this.nowULoc, this.time / 2);

    // draw
    gl.drawArrays(gl.TRIANGLES, 0, this.verts);

    this.beginFrame();
  }
}
