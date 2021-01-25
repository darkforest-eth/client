import { PixelCoords } from '../../utils/ProcgenUtils';
import { RGBVec } from '../renderer/utils/EngineTypes';
import AttribManager from '../renderer/webgl/AttribManager';
import { WebGLManager } from '../renderer/webgl/WebGLManager';
import {
  getPathProgramAndUniforms,
  scapePosProps,
  scapeColorProps,
} from './PathProgram';

export class PathRenderer {
  private manager: WebGLManager;

  private program: WebGLProgram;
  private matrixULoc: WebGLUniformLocation | null;

  private posA: AttribManager;
  private colorA: AttribManager;

  constructor(manager: WebGLManager) {
    this.manager = manager;

    const { gl } = this.manager;

    const { program, uniforms } = getPathProgramAndUniforms(gl);
    this.program = program;
    this.matrixULoc = uniforms.matrix;

    this.posA = new AttribManager(gl, program, scapePosProps);
    this.colorA = new AttribManager(gl, program, scapeColorProps);
  }

  drawPath(arr: PixelCoords[], color: RGBVec): void {
    let verts = 0;

    const { gl, projectionMatrix } = this.manager;

    gl.useProgram(this.program);
    gl.uniformMatrix4fv(this.matrixULoc, false, projectionMatrix);

    for (const { x, y } of arr) {
      this.posA.setVertex([x, y], verts);
      this.colorA.setVertex(color, verts);
      verts++;
    }

    this.posA.bufferData(verts);
    this.colorA.bufferData(verts);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, verts);

    return;
  }
}
