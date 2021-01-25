import autoBind from 'auto-bind';
import { CanvasCoords, WorldCoords } from '../../../utils/Coordinates';
import Viewport from '../../board/Viewport';
import {
  getGlassProgramAndUniforms,
  glassPosProps,
  glassTexProps,
} from '../programs/GlassProgram';
import EngineUtils from '../utils/EngineUtils';
import { glassSprite, loadSprite } from '../utils/TextureManager';
import AttribManager from '../webgl/AttribManager';
import { GameGLManager } from '../webgl/GameGLManager';

// isn't used anywhere, mostly this is used for copy-pasting. later we will make it a proper class
export class GlassRenderer {
  manager: GameGLManager;
  program: WebGLProgram;

  posA: AttribManager;
  texA: AttribManager;

  verts: number;

  matrixULoc: WebGLUniformLocation | null; // screenspace to clipspace
  textureULoc: WebGLUniformLocation | null;

  posBuffer: number[];
  texBuffer: number[];

  loaded: boolean;

  texIdx: number;

  constructor(manager: GameGLManager) {
    autoBind(this);

    this.loaded = false;
    this.verts = 0;
    this.manager = manager;

    const { gl } = this.manager;

    try {
      const { program, uniforms } = getGlassProgramAndUniforms(gl);
      this.program = program;
      gl.useProgram(program);

      this.posA = new AttribManager(gl, program, glassPosProps);
      this.texA = new AttribManager(gl, program, glassTexProps);

      this.matrixULoc = uniforms.matrix;
      this.textureULoc = uniforms.texture;
    } catch (e) {
      console.error(e);
    }

    this.posBuffer = Array(6 * 2).fill(0);
    this.texBuffer = EngineUtils.makeQuadVec2(0, 1, 1, 0);

    this.beginFrame();

    this.setup();
  }

  private beginFrame() {
    this.verts = 0;
  }

  private async setup() {
    const img = await loadSprite(glassSprite);
    const texIdx = this.manager.getTexIdx();
    await this.loadTexture(img, texIdx);
    console.log('texture loaded!');
    this.loaded = true;
  }

  private async loadTexture(img: HTMLImageElement, texIdx: number) {
    this.texIdx = texIdx;

    const { gl } = this.manager;
    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + texIdx);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    EngineUtils.fillTexture(gl);

    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  }

  queueGlass({ x, y }: CanvasCoords) {
    if (!this.loaded) return;

    EngineUtils.makeQuadVec2Buffered(this.posBuffer, x, y, x + 16, y + 16);
    this.posA.setVertex(this.posBuffer, this.verts);
    this.texA.setVertex(this.texBuffer, this.verts);

    this.verts += 6;
  }

  queueGlassWorld(loc: WorldCoords) {
    const viewport = Viewport.getInstance();
    const locC = viewport.worldToCanvasCoords(loc);

    this.queueGlass(locC);
  }

  flush() {
    if (this.verts === 0) return;

    const { gl } = this.manager;

    gl.useProgram(this.program);

    this.posA.bufferData(this.verts);
    this.texA.bufferData(this.verts);

    // set uniforms
    gl.uniformMatrix4fv(this.matrixULoc, false, this.manager.projectionMatrix);
    gl.uniform1i(this.textureULoc, this.texIdx);

    // draw
    gl.drawArrays(gl.TRIANGLES, 0, this.verts);

    this.beginFrame();
  }
}
