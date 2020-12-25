import autoBind from 'auto-bind';
import { CanvasCoords, WorldCoords } from '../../../utils/Coordinates';
import Viewport from '../../board/Viewport';
import {
  getRectProgram,
  getRectUniforms,
  rectColorProps,
  rectPosProps,
  rectRectPosProps,
  rectStrokeXProps,
  rectStrokeYProps,
} from '../programs/RectProgram';
import { RenderZIndex, RGBVec } from '../utils/EngineTypes';
import { makeQuadBuffered, makeQuadVec2 } from '../utils/EngineUtils';
import AttribManager from '../webgl/AttribManager';
import WebGLManager from '../webgl/WebGLManager';

export default class RectRenderer {
  glManager: WebGLManager;
  verts: number;

  program: WebGLProgram;
  posA: AttribManager;
  colorA: AttribManager;
  rectPosA: AttribManager;
  strokeXA: AttribManager;
  strokeYA: AttribManager;

  matrixULoc: WebGLUniformLocation | null;

  quad3Buffer: number[];
  quad2Buffer: number[];

  gl: WebGL2RenderingContext;

  constructor(glManager: WebGLManager) {
    autoBind(this);

    this.glManager = glManager;
    const { gl } = glManager;
    this.gl = gl;

    try {
      const program = getRectProgram(gl);
      this.program = program;
      gl.useProgram(program);

      this.posA = new AttribManager(gl, program, rectPosProps);
      this.colorA = new AttribManager(gl, program, rectColorProps);
      this.rectPosA = new AttribManager(gl, program, rectRectPosProps);
      this.strokeXA = new AttribManager(gl, program, rectStrokeXProps);
      this.strokeYA = new AttribManager(gl, program, rectStrokeYProps);

      this.matrixULoc = getRectUniforms(gl).matrix;

      this.quad3Buffer = Array(6 * 3).fill(0);
      this.quad2Buffer = makeQuadVec2(0, 0, 1, 1);
    } catch (e) {
      console.error(e);
    }

    this.beginFrame();
  }

  beginFrame(): void {
    this.verts = 0;
  }

  queueRect(
    { x, y }: CanvasCoords,
    width: number,
    height: number,
    color: RGBVec = [255, 0, 0],
    stroke = -1,
    zIdx: number = RenderZIndex.DEFAULT
  ): void {
    this.gl.useProgram(this.program);
    const { x1, y1 } = { x1: x, y1: y };
    const { x2, y2 } = { x2: x + width, y2: y + height };

    makeQuadBuffered(this.quad3Buffer, x1, y1, x2, y2, zIdx);
    this.posA.setVertex(this.quad3Buffer, this.verts);
    this.rectPosA.setVertex(this.quad2Buffer, this.verts);

    for (let i = 0; i < 6; i++) {
      this.colorA.setVertex(color, this.verts + i);
      this.strokeXA.setVertex([stroke / width], this.verts + i);
      this.strokeYA.setVertex([stroke / height], this.verts + i);
    }

    this.verts += 6;
  }

  queueRectWorld(
    coords: WorldCoords,
    width: number,
    height: number,
    color: RGBVec = [255, 0, 0],
    stroke = -1,
    zIdx: number = RenderZIndex.DEFAULT
  ): void {
    const viewport = Viewport.getInstance();
    const canvasCoords = viewport.worldToCanvasCoords(coords);
    const widthC = viewport.worldToCanvasDist(width);
    const heightC = viewport.worldToCanvasDist(height);

    this.queueRect(canvasCoords, widthC, heightC, color, stroke, zIdx);
  }

  queueRectCenterWorld(
    center: WorldCoords,
    width: number,
    height: number,
    color: RGBVec = [255, 0, 0],
    stroke = -1,
    zIdx: number = RenderZIndex.DEFAULT
  ) {
    const topLeft: WorldCoords = {
      x: center.x - width / 2,
      y: center.y + height / 2,
    };

    this.queueRectWorld(topLeft, width, height, color, stroke, zIdx);
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
    this.rectPosA.bufferData(this.verts);
    this.strokeXA.bufferData(this.verts);
    this.strokeYA.bufferData(this.verts);

    gl.drawArrays(gl.TRIANGLES, 0, this.verts);

    this.beginFrame();
  }
}
