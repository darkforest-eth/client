import { rarityFromArtifact } from '../../utils/ArtifactUtils';
import { CanvasCoords, WorldCoords } from '../../utils/Coordinates';
import {
  Artifact,
  ArtifactRarity,
  ArtifactType,
  Biome,
} from '../../_types/global/GlobalTypes';
import Viewport from '../board/Viewport';
import { engineConsts } from '../renderer/utils/EngineConsts';
import { RGBAVec, RGBVec } from '../renderer/utils/EngineTypes';
import {
  fillTexture,
  getNow,
  makeQuadVec2,
  makeQuadVec2Buffered,
} from '../renderer/utils/EngineUtils';
import {
  AtlasInfo,
  getSpriteInfo,
  loadArtifactAtlas,
  loadArtifactThumbAtlas,
} from '../renderer/utils/TextureManager';
import AttribManager from '../renderer/webgl/AttribManager';
import { TextureGLManager } from '../renderer/webgl/WebGLManager';
import {
  getSpriteProgramAndUniforms,
  spriteColorProps,
  spriteInvertProps,
  spritePosProps,
  spriteRectPosProps,
  spriteShineProps,
  spriteTexProps,
} from './SpriteProgram';

export class SpriteRenderer {
  private manager: TextureGLManager;

  private program: WebGLProgram;
  private matrixULoc: WebGLUniformLocation | null;
  private textureULoc: WebGLUniformLocation | null;

  private posA: AttribManager;
  private texA: AttribManager;
  private colorA: AttribManager;
  private shineA: AttribManager;
  private invertA: AttribManager;
  private rectPosA: AttribManager;

  private posBuffer: number[];
  private texBuffer: number[];
  private rectposBuffer: number[];

  private loaded: boolean;
  private thumb: boolean;
  private spriteInfo: AtlasInfo;
  private texIdx: number;
  private flip: boolean;

  private verts = 0;

  constructor(manager: TextureGLManager, thumb = false, flip = false) {
    this.thumb = thumb;

    this.flip = flip;

    this.manager = manager;
    this.loaded = false;

    const { gl } = this.manager;

    const { program, uniforms } = getSpriteProgramAndUniforms(gl);
    this.program = program;
    this.matrixULoc = uniforms.matrix;
    this.textureULoc = uniforms.texture;

    this.posA = new AttribManager(gl, program, spritePosProps);
    this.rectPosA = new AttribManager(gl, program, spriteRectPosProps);
    this.texA = new AttribManager(gl, program, spriteTexProps);
    this.colorA = new AttribManager(gl, program, spriteColorProps);
    this.shineA = new AttribManager(gl, program, spriteShineProps);
    this.invertA = new AttribManager(gl, program, spriteInvertProps);

    this.texBuffer = Array(6 * 2).fill(0);
    this.posBuffer = Array(6 * 3).fill(0);
    this.rectposBuffer = makeQuadVec2(0, 0, 1, 1);

    this.spriteInfo = getSpriteInfo();

    this.loadAtlas(thumb);
  }

  private async loadAtlas(thumb: boolean) {
    const loader = thumb ? loadArtifactThumbAtlas : loadArtifactAtlas;

    const atlas = await loader();
    const texIdx = this.manager.getTexIdx();

    await this.loadTexture(atlas, texIdx);

    this.loaded = true; // ends async chain and allows sprites to be drawn
  }

  private async loadTexture(img: HTMLImageElement, texIdx: number) {
    this.texIdx = texIdx;
    const { gl } = this.manager;
    gl.activeTexture(gl.TEXTURE0 + texIdx);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    fillTexture(gl);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  }

  public queueArtifact(
    artifact: Artifact,
    pos: CanvasCoords,
    width = 128,
    alpha = 255
  ) {
    const type = artifact.artifactType;
    const rarity = rarityFromArtifact(artifact);
    const biome = artifact.planetBiome;

    const shine = rarity >= ArtifactRarity.Rare;
    const invert = rarity === ArtifactRarity.Legendary;
    const shiny = rarity === ArtifactRarity.Epic;

    if (rarity >= ArtifactRarity.Rare) {
      this.queueOutline(type, pos, width, alpha);
    }

    this.queueSprite(
      type,
      biome,
      pos,
      width,
      alpha,
      null,
      shine,
      shiny,
      invert
    );
  }

  public queueSprite(
    type: ArtifactType,
    biome: Biome,
    topLeft: CanvasCoords,
    width: number,
    alpha: number,
    color: RGBVec | null = null,
    shine = false,
    shiny = false,
    invert = false
  ) {
    if (!this.loaded) return;

    /* set up attributes */
    // we'll always want pixel-perfect icons
    const { x, y } = { x: Math.floor(topLeft.x), y: Math.floor(topLeft.y) };

    const now = -getNow() * 15;
    const shineVal = (now % 30) + 10; // i eyeballed this lol
    const shineLoc = shine ? shineVal : -1000;

    const info = this.spriteInfo[type][biome];
    const tex = shiny ? info.shiny : info.normal;

    const { x1, x2, y1, y2 } = tex;

    const dim = width;
    makeQuadVec2Buffered(this.posBuffer, x, y, x + dim, y + dim);

    if (this.flip) {
      makeQuadVec2Buffered(this.texBuffer, x1, 1 - y1, x2, 1 - y2);
    } else {
      makeQuadVec2Buffered(this.texBuffer, x1, y1, x2, y2);
    }

    // 0, 0, 0, 0 is a special color; the program looks for it
    const myColor: RGBAVec = [...(color || [0, 0, 0]), alpha];

    /* buffer attributes */
    this.posA.setVertex(this.posBuffer, this.verts);
    this.texA.setVertex(this.texBuffer, this.verts);
    this.rectPosA.setVertex(this.rectposBuffer, this.verts);

    for (let i = 0; i < 6; i++) {
      this.colorA.setVertex(myColor, this.verts + i);
      this.shineA.setVertex([shineLoc], this.verts + i);
      this.invertA.setVertex([invert ? 1 : 0], this.verts + i);
    }
    this.verts += 6;
  }

  public queueOutline(
    type: ArtifactType,
    { x, y }: CanvasCoords,
    width: number,
    alpha: number,
    color: RGBVec = engineConsts.colors.artifacts.trim
  ) {
    const s = this.thumb ? width / 16 : width / 64;
    const iters = this.thumb ? 1 : 2;
    for (let del = s; del <= iters * s; del += s) {
      this.queueSprite(type, 1, { x, y: y - del }, width, alpha, color);
      this.queueSprite(type, 1, { x, y: y + del }, width, alpha, color);
      this.queueSprite(type, 1, { x: x + del, y }, width, alpha, color);
      this.queueSprite(type, 1, { x: x - del, y }, width, alpha, color);
    }
  }

  queueIconWorld(
    artifact: Artifact,
    topLeft: WorldCoords,
    widthW: number,
    maxWidth = 32
  ) {
    const viewport = Viewport.getInstance();
    const width = viewport.worldToCanvasDist(widthW);
    const loc = viewport.worldToCanvasCoords(topLeft);
    const dim = Math.min(maxWidth, width);
    const pos = {
      x: loc.x - dim,
      y: loc.y - dim,
    };

    this.queueArtifact(artifact, pos, dim);
  }

  flush() {
    if (!this.loaded || this.verts === 0) return;

    const { gl, projectionMatrix } = this.manager;
    gl.useProgram(this.program);
    /* first do uniforms */

    gl.activeTexture(gl.TEXTURE0 + this.texIdx);
    gl.uniform1i(this.textureULoc, this.texIdx);
    gl.uniformMatrix4fv(this.matrixULoc, false, projectionMatrix);

    this.posA.bufferData(this.verts);
    this.texA.bufferData(this.verts);
    this.rectPosA.bufferData(this.verts);
    this.colorA.bufferData(this.verts);
    this.shineA.bufferData(this.verts);
    this.invertA.bufferData(this.verts);

    gl.drawArrays(gl.TRIANGLES, 0, this.verts);

    this.verts = 0;
  }
}
