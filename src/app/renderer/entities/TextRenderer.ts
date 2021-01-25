import autoBind from 'auto-bind';
import { CanvasCoords, WorldCoords } from '../../../utils/Coordinates';
import Viewport from '../../board/Viewport';
import {
  getTextProgram,
  getTextUniforms,
  textColorProps,
  textPosProps,
  textTexcoordProps,
} from '../programs/TextProgram';
import { engineConsts } from '../utils/EngineConsts';
import {
  RenderZIndex,
  RGBAVec,
  TextAlign,
  TextAnchor,
} from '../utils/EngineTypes';
import EngineUtils from '../utils/EngineUtils';
import AttribManager from '../webgl/AttribManager';
import { WebGLManager } from '../webgl/WebGLManager';

/* renders text */

type GlyphInfo = {
  x: number;
  y: number;
};

const { glyphW, glyphH, canvasDim, rowL, scale } = engineConsts.glyphs;
const screenW = glyphW / scale;
const screenH = glyphH / scale;

export default class TextRenderer {
  glManager: WebGLManager;
  bufferCanvas: HTMLCanvasElement;
  verts: number;

  program: WebGLProgram;
  posA: AttribManager;
  colorA: AttribManager;
  texcoordA: AttribManager;

  matrixULoc: WebGLUniformLocation | null;
  textureULoc: WebGLUniformLocation | null;

  quad3Buffer: number[];
  quad2Buffer: number[];

  gl: WebGL2RenderingContext;

  glyphData: Map<string, GlyphInfo>;

  texIdx: number;

  constructor(glManager: WebGLManager, bufferCanvas: HTMLCanvasElement) {
    autoBind(this);

    this.bufferCanvas = bufferCanvas;

    this.glManager = glManager;
    const { gl } = glManager;
    this.gl = gl;

    this.glyphData = new Map<string, GlyphInfo>();

    this.createGlyphs();

    try {
      const program = getTextProgram(gl);
      this.program = program;
      gl.useProgram(program);

      this.posA = new AttribManager(gl, program, textPosProps);
      this.colorA = new AttribManager(gl, program, textColorProps);
      this.texcoordA = new AttribManager(gl, program, textTexcoordProps);

      const uniforms = getTextUniforms(gl);

      this.matrixULoc = uniforms.matrix;
      this.textureULoc = uniforms.texture;

      this.texIdx = this.glManager.getTexIdx();
      this.setTexture(this.texIdx);
      this.quad3Buffer = Array(6 * 3).fill(0);
      this.quad2Buffer = Array(2 * 3).fill(0);
    } catch (e) {
      console.error(e);
    }

    this.beginFrame();
  }

  private setTexture(texIdx: number): void {
    const gl = this.gl;

    // gl.useProgram should be called from parent fn

    const atlasTex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + texIdx);
    gl.bindTexture(gl.TEXTURE_2D, atlasTex);

    const canvas = this.bufferCanvas;
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);

    gl.uniform1i(this.textureULoc, this.texIdx);
  }

  private createGlyphs(debug = false): void {
    const ctx = this.bufferCanvas.getContext('2d');
    if (!ctx) {
      console.error('error creating buffer canvas context');
      return;
    }

    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const other = ' 0123456789.()%,?!:+-';
    const chars = lower + upper + other;

    ctx.canvas.width = canvasDim;
    ctx.canvas.height = canvasDim;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    chars.split('').forEach((v: string, i: number) => {
      const col = Math.floor(i / rowL);
      const row = i - col * rowL;

      if ((row + col) % 2 === 0 && debug) {
        ctx.fillStyle = 'gray';
        ctx.fillRect(row * glyphW, col * glyphH, glyphW, glyphH);
      }

      // now draw the char
      const x = row * glyphW;
      const y = col * glyphH;

      ctx.fillStyle = 'white';
      ctx.font = engineConsts.fontStyle;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(v, x + 0.5 * glyphW, y + 0.5 * glyphH);

      this.glyphData.set(v, { x, y });
    });
  }

  beginFrame(): void {
    this.verts = 0;
  }

  /* queues text to be drawn at world coords */
  queueTextWorld(
    text: string,
    coords: WorldCoords,
    color: RGBAVec = [255, 255, 255, 255],
    offY = 0, // measured in text units - constant screen-coord offset that it useful for drawing nice things
    align: TextAlign = TextAlign.Center,
    anchor: TextAnchor = TextAnchor.Top,
    zIdx: number = RenderZIndex.Text
  ) {
    const viewport = Viewport.getInstance();
    const canvasCoords = viewport.worldToCanvasCoords(coords);
    const baseUnit = screenH + 2;

    const drawAt = { x: canvasCoords.x, y: canvasCoords.y + offY * baseUnit };

    this.queueText(text, drawAt, color, align, anchor, zIdx);
  }

  /* queues text to be drawn at screen coords */
  queueText(
    text: string,
    { x, y }: CanvasCoords,
    color: RGBAVec,
    align: TextAlign = TextAlign.Center,
    anchor: TextAnchor = TextAnchor.Top,
    zIdx: number = RenderZIndex.DEFAULT
  ): void {
    const dX = text.length * screenW * align;
    const dY = -screenH * anchor;

    text
      .split('')
      .forEach((char: string, i: number) =>
        this.queueGlyph(char, x - dX + i * screenW, y + dY, color, zIdx)
      );
  }

  private queueGlyph(
    glyph: string,
    x: number,
    y: number,
    color: RGBAVec,
    zIdx: number
  ): void {
    const info = this.glyphData.get(glyph);
    if (!info) {
      console.error('could not find glyph: ' + glyph);
      return;
    }

    const { x1, y1 } = { x1: x, y1: y };
    const { x2, y2 } = { x2: x + screenW, y2: y + screenH };
    EngineUtils.makeQuadBuffered(this.quad3Buffer, x1, y1, x2, y2, zIdx);
    this.posA.setVertex(this.quad3Buffer, this.verts);

    const { x: gx, y: gy } = info;
    const tx1 = gx / canvasDim;
    const ty1 = gy / canvasDim;
    const tx2 = (gx + glyphW) / canvasDim;
    const ty2 = (gy + glyphH) / canvasDim;
    EngineUtils.makeQuadVec2Buffered(this.quad2Buffer, tx1, ty1, tx2, ty2);
    this.texcoordA.setVertex(this.quad2Buffer, this.verts);

    for (let i = 0; i < 6; i++) this.colorA.setVertex(color, this.verts + i);

    this.verts += 6;
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
    this.texcoordA.bufferData(this.verts);

    this.gl.depthMask(false);
    gl.drawArrays(gl.TRIANGLES, 0, this.verts);
    this.gl.depthMask(true);

    this.beginFrame();
  }
}
