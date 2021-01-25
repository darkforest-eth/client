import autoBind from 'auto-bind';
import { CanvasCoords, WorldCoords } from '../../../utils/Coordinates';
import Viewport from '../../board/Viewport';
import {
  circColorProps,
  circEpsProps,
  circPosProps,
  circPropsProps,
  getCircleProgram,
  getCircleUniforms,
} from '../programs/CircleProgram';
import { engineConsts } from '../utils/EngineConsts';
import { RGBAVec } from '../utils/EngineTypes';
import EngineUtils from '../utils/EngineUtils';
import AttribManager from '../webgl/AttribManager';
import { GameGLManager } from '../webgl/GameGLManager';

export default class CircleRenderer {
  glManager: GameGLManager;
  verts: number;

  program: WebGLProgram;
  posA: AttribManager;
  colorA: AttribManager;
  propsA: AttribManager;
  epsA: AttribManager;

  matrixULoc: WebGLUniformLocation | null;

  quadBuffer: number[];

  gl: WebGL2RenderingContext;

  viewport: Viewport;

  constructor(glManager: GameGLManager) {
    autoBind(this);
    this.viewport = Viewport.getInstance();

    this.glManager = glManager;
    const { gl } = glManager;
    this.gl = gl;

    try {
      const program = getCircleProgram(gl);
      this.program = program;
      gl.useProgram(program);

      this.posA = new AttribManager(gl, program, circPosProps);
      this.colorA = new AttribManager(gl, program, circColorProps);
      this.propsA = new AttribManager(gl, program, circPropsProps);
      this.epsA = new AttribManager(gl, program, circEpsProps);

      this.matrixULoc = getCircleUniforms(gl).matrix;

      this.quadBuffer = Array(6 * 2).fill(0);
    } catch (e) {
      console.error(e);
    }

    this.beginFrame();
  }

  beginFrame(): void {
    this.verts = 0;
  }

  queueCircle(
    center: CanvasCoords,
    radius: number,
    color: RGBAVec = [255, 0, 0, 255],
    stroke = -1,
    angle = 1, // percent of arc to render
    dashed = false
  ): void {
    const { x, y } = center;
    // 1 on either side for antialiasing
    const r = radius + (stroke > 0 ? 2 : 1);

    const { x1, y1 } = { x1: x - r, y1: y - r };
    const { x2, y2 } = { x2: x + r, y2: y + r };

    // prettier-ignore
    EngineUtils.makeDoubleQuadBuffered(
      this.quadBuffer, 
      x1, y1, x2, y2, -1, -1, 1, 1
    );

    this.posA.setVertex(this.quadBuffer, this.verts);

    const strokePct = stroke / radius;

    // convert pixels to radians
    const interval = engineConsts.dashLength;
    const pixPerRad = radius;

    const dashRad = interval / pixPerRad;
    const dash = dashed ? dashRad : -1;

    const eps = 1 / radius;

    for (let i = 0; i < 6; i++) {
      this.colorA.setVertex(color, this.verts + i);
      this.propsA.setVertex([strokePct, angle, dash], this.verts + i);
      this.epsA.setVertex([eps], this.verts + i);
    }

    this.verts += 6;
  }

  queueCircleWorld(
    center: WorldCoords,
    radius: number, // world coords
    color: RGBAVec = [255, 0, 0, 255],
    stroke = -1,
    angle = 1,
    dashed = false
  ) {
    const centerCanvas = this.viewport.worldToCanvasCoords(center);
    const rCanvas = this.viewport.worldToCanvasDist(radius);
    this.queueCircle(centerCanvas, rCanvas, color, stroke, angle, dashed);
  }

  // only convert center to world coords
  // only used for voyages righ
  queueCircleWorldCenterOnly(
    center: WorldCoords,
    radius: number, // canvas coords
    color: RGBAVec = [255, 0, 0, 255]
  ) {
    const centerCanvas = this.viewport.worldToCanvasCoords(center);
    this.queueCircle(centerCanvas, radius, color);
  }

  flush(): void {
    if (this.verts === 0) return;

    const { gl, glManager } = this;
    gl.useProgram(this.program);

    // write uniforms
    gl.uniformMatrix4fv(this.matrixULoc, false, glManager.projectionMatrix);

    // write buffers
    this.posA.bufferData(this.verts);
    this.colorA.bufferData(this.verts);
    this.epsA.bufferData(this.verts);

    // TODO combine these into one buffering action?
    this.propsA.bufferData(this.verts);

    gl.drawArrays(gl.TRIANGLES, 0, this.verts);

    this.beginFrame();
  }
}
