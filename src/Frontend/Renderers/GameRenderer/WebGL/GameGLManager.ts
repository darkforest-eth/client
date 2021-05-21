import { mat4 } from 'gl-matrix';
import Renderer from '../Renderer';
import { WebGLManager } from './WebGLManager';

export class GameGLManager extends WebGLManager {
  renderer: Renderer;
  gl: WebGL2RenderingContext;

  stencil: boolean;

  projectionMatrix: mat4;

  constructor(engine: Renderer, glCanvas: HTMLCanvasElement) {
    super(glCanvas, { stencil: true });
    const { gl } = this;

    this.renderer = engine;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }

  public clear() {
    const { gl } = this;
    super.clear(
      gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT,
      [0.3, 0.3, 0.35, 1.0]
    );
  }
}
