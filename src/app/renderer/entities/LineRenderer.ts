import autoBind from 'auto-bind';
import { CanvasCoords, WorldCoords } from '../../../utils/Coordinates';
import Viewport from '../../board/Viewport';
import {
  getLineProgram,
  getLineUniforms,
  lineColorProps,
  lineDistProps,
  linePosProps,
} from '../programs/LineProgram';
import { RenderZIndex, RGBVec } from '../utils/EngineTypes';
import AttribManager from '../webgl/AttribManager';
import WebGLManager from '../webgl/WebGLManager';

export default class LineRenderer {
  glManager: WebGLManager;
  verts: number;

  program: WebGLProgram;
  posA: AttribManager;
  colorA: AttribManager;
  distA: AttribManager;

  matrixULoc: WebGLUniformLocation | null;

  gl: WebGL2RenderingContext;

  constructor(glManager: WebGLManager) {
    autoBind(this);

    this.glManager = glManager;
    const { gl } = glManager;
    this.gl = gl;

    try {
      const program = getLineProgram(gl);
      this.program = program;
      gl.useProgram(program);

      this.posA = new AttribManager(gl, program, linePosProps);
      this.colorA = new AttribManager(gl, program, lineColorProps);
      this.distA = new AttribManager(gl, program, lineDistProps);

      this.matrixULoc = getLineUniforms(gl).matrix;
    } catch (e) {
      console.error(e);
    }

    this.beginFrame();
  }

  beginFrame(): void {
    this.verts = 0;
  }

  private getOffset(start: CanvasCoords, end: CanvasCoords): CanvasCoords {
    // calculates normalized perp vector
    const delX = end.x - start.x;
    const delY = end.y - start.y;

    const vX = delY;
    const vY = -delX;

    const norm = Math.sqrt(vX ** 2 + vY ** 2);
    return { x: vX / norm, y: vY / norm };
  }

  queueLine(
    start: CanvasCoords,
    end: CanvasCoords,
    color: RGBVec = [255, 0, 0],
    width = 1,
    zIdx: number = RenderZIndex.DEFAULT,
    dashed = false
  ): void {
    const { x: x1, y: y1 } = start;
    const { x: x2, y: y2 } = end;

    let dist = 0;
    if (dashed) dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

    const { x: dX, y: dY } = this.getOffset(start, end);

    // note that width actually scales 2x - it goes 1, 3, 5, etc
    for (let i = -width; i <= width; i++) {
      this.posA.setVertex(
        // prettier-ignore
        [
          x1 + dX, y1 + dY, zIdx,
          x2 + dX, y2 + dY, zIdx,
        ],
        this.verts
      );
      this.colorA.setVertex([...color, ...color], this.verts);
      this.distA.setVertex([0, dist], this.verts);
      this.verts += 2;
    }
  }

  queueLineWorld(
    start: WorldCoords,
    end: WorldCoords,
    color: RGBVec = [255, 0, 0],
    width = 1,
    zIdx: number = RenderZIndex.DEFAULT,
    dashed = false
  ) {
    const viewport = Viewport.getInstance();
    const startC = viewport.worldToCanvasCoords(start);
    const endC = viewport.worldToCanvasCoords(end);
    this.queueLine(startC, endC, color, width, zIdx, dashed);
  }

  queueRectStrokeAtCenterWorld(
    center: WorldCoords,
    width: number, // worldcoords
    height: number,
    color: RGBVec = [255, 0, 0],
    zIdx: number = RenderZIndex.DEFAULT,
    weight = 2
  ) {
    const viewport = Viewport.getInstance();
    const centerC = viewport.worldToCanvasCoords(center);
    const widthC = viewport.worldToCanvasDist(width);
    const heightC = viewport.worldToCanvasDist(height);
    const x = centerC.x - widthC / 2;
    const y = centerC.y - heightC / 2;

    this.queueRectStroke(x, y, widthC, heightC, color, zIdx, weight);
  }

  queueRectStroke(
    x: number,
    y: number,
    width: number,
    height: number,
    color: RGBVec = [255, 0, 0],
    zIdx: number = RenderZIndex.DEFAULT,
    weight = 1
  ) {
    const upLeft = { x, y };
    const upRight = { x: x + width, y };
    const botLeft = { x, y: y + height };
    const botRight = { x: x + width, y: y + height };

    this.queueLine(upLeft, upRight, color, zIdx, weight);
    this.queueLine(upRight, botRight, color, zIdx, weight);
    this.queueLine(botRight, botLeft, color, zIdx, weight);
    this.queueLine(botLeft, upLeft, color, zIdx, weight);
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
    this.distA.bufferData(this.verts);

    gl.drawArrays(gl.LINES, 0, this.verts);

    this.beginFrame();
  }
}
