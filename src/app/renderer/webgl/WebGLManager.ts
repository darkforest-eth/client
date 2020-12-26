import CanvasRenderer from '../CanvasRenderer';
import { mat4 } from 'gl-matrix';

export interface AbstractGLManager {
  gl: WebGL2RenderingContext;
  projectionMatrix: mat4;
}

export interface TextureGLManager extends AbstractGLManager {
  gl: WebGL2RenderingContext;
  projectionMatrix: mat4;
  getTexIdx: () => number;
}

export default class WebGLManager implements TextureGLManager {
  renderer: CanvasRenderer;
  canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext;

  stencil: boolean;

  projectionMatrix: mat4;

  private texIdx = 0;

  constructor(engine: CanvasRenderer, glCanvas: HTMLCanvasElement) {
    this.renderer = engine;
    this.canvas = glCanvas;

    const gl = this.canvas.getContext('webgl2', { stencil: true });
    if (!gl) {
      console.error('error getting webgl2 context');
      return;
    }
    this.gl = gl;

    this.stencil = false;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this.projectionMatrix = mat4.create();
    this.setProjectionMatrix();
  }

  public getTexIdx(): number {
    return this.texIdx++;
  }

  setProjectionMatrix(): void {
    const height = this.canvas.height;
    const width = this.canvas.width;
    const depth = 100; // arbitrary # which represents max zidx

    // projects xy onto clip space and also compresses z

    // prettier-ignore
    mat4.set(this.projectionMatrix, 
      2 / width, 0, 0, 0,
      0, -2 / height, 0, 0,
      0, 0, 1 / depth, 0, // TODO make it so that positive is in front
      -1, 1, 0, 1,
    );

    // the reason we don't put -1/depth is because it breaks RHR; we need to reverse all of our triangles
  }

  // we'll need this code later for improved perlin
  /*
  setStencil(stencil: boolean) {
    this.stencil = stencil;
    if (stencil) this.gl.enable(this.gl.STENCIL_TEST);
    else this.gl.disable(this.gl.STENCIL_TEST);
  }

  private checkStencil(): boolean {
    if (!this.stencil) {
      console.error('stencil not enabled!');
    }

    return this.stencil;
  }

  startMasking() {
    if (!this.checkStencil()) return;

    const gl = this.gl;
    gl.stencilOp(gl.REPLACE, gl.REPLACE, gl.REPLACE); // always update stencil
    gl.stencilFunc(gl.ALWAYS, 1, 0xff); // everything passes stencil test
    gl.stencilMask(0xff); // enable stencil writes
  }

  stopMasking() {
    if (!this.checkStencil()) return;

    const gl = this.gl;
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP); // never update stencil
    gl.stencilFunc(gl.EQUAL, 1, 0xff); // only pass if eq
    gl.stencilMask(0x00); // disable stencil writes
  }
  */

  clear() {
    const gl = this.gl;
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0.3, 0.3, 0.35, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
  }
}
