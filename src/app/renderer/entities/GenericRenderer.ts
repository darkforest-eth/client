import autoBind from 'auto-bind';
import {
  genPosProps,
  genColorProps,
  getGenericProgramAndUniforms,
} from '../programs/GenericProgram';
import AttribManager from '../webgl/AttribManager';
import { GameGLManager } from '../webgl/GameGLManager';

// isn't used anywhere, mostly this is used for copy-pasting. later we will make it a proper class
export class GenericRenderer {
  manager: GameGLManager;
  program: WebGLProgram;

  posA: AttribManager;
  colorA: AttribManager;

  verts: number;

  matrixULoc: WebGLUniformLocation | null; // screenspace to clipspace

  constructor(manager: GameGLManager) {
    autoBind(this);

    this.verts = 0;

    this.manager = manager;

    const { gl } = this.manager;

    try {
      const { program, uniforms } = getGenericProgramAndUniforms(gl);
      this.program = program;
      gl.useProgram(program);

      this.posA = new AttribManager(gl, program, genPosProps);
      this.colorA = new AttribManager(gl, program, genColorProps);

      this.matrixULoc = uniforms.matrix;
    } catch (e) {
      console.error(e);
    }

    this.beginFrame();
  }

  private beginFrame() {
    this.verts = 0;
  }

  flush() {
    const { gl } = this.manager;

    gl.useProgram(this.program);

    this.posA.bufferData(this.verts);
    this.colorA.bufferData(this.verts);

    // set uniforms
    gl.uniformMatrix4fv(this.matrixULoc, false, this.manager.projectionMatrix);

    // draw
    gl.drawArrays(gl.TRIANGLES, 0, this.verts);

    this.beginFrame();
  }
}
