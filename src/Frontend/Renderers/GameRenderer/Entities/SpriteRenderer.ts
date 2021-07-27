import { Artifact, ArtifactRarity, WorldCoords } from '@darkforest_eth/types';
import { RenderedArtifact } from '../../../../Backend/GameLogic/ArtifactUtils';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import Viewport from '../../../Game/Viewport';
import { engineConsts } from '../EngineConsts';
import { RGBAVec, RGBVec } from '../EngineTypes';
import EngineUtils from '../EngineUtils';
import { SPRITE_PROGRAM_DEFINITION } from '../Programs/SpriteProgram';
import {
  loadArtifactAtlas,
  loadArtifactThumbAtlas,
  spriteFromArtifact,
  SpriteRectangle,
} from '../TextureManager';
import { GenericRenderer } from '../WebGL/GenericRenderer';
import { WebGLManager } from '../WebGL/WebGLManager';

export class SpriteRenderer extends GenericRenderer<typeof SPRITE_PROGRAM_DEFINITION> {
  private posBuffer: number[];
  private texBuffer: number[];
  private rectposBuffer: number[];

  private loaded: boolean;
  private thumb: boolean;
  private texIdx: number;
  private flip: boolean;

  constructor(manager: WebGLManager, thumb = false, flip = false) {
    super(manager, SPRITE_PROGRAM_DEFINITION);

    this.thumb = thumb;
    this.flip = flip;

    this.loaded = false;

    this.texBuffer = EngineUtils.makeEmptyQuadVec2();
    this.posBuffer = EngineUtils.makeEmptyQuad();
    this.rectposBuffer = EngineUtils.makeQuadVec2(0, 0, 1, 1);

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
    EngineUtils.fillTexture(gl);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  }

  public queueArtifact(
    artifact: RenderedArtifact,
    pos: CanvasCoords,
    width = 128,
    alpha = 255,
    atFrame: number | undefined = undefined,
    color: RGBVec | undefined = undefined,
    theta: number | undefined = undefined
  ) {
    const rarity = artifact.rarity;

    if (rarity >= ArtifactRarity.Rare) {
      this.queueOutline(artifact, pos, width, alpha, theta);
    }

    if (artifact.unconfirmedMove) {
      alpha = 127;
    }

    this.queueSprite(artifact, pos, width, alpha, color, atFrame, theta);
  }

  /** Queue artifact to worldcoords, centered */
  public queueArtifactWorld(
    artifact: RenderedArtifact,
    posW: CanvasCoords,
    widthW: number,
    alpha = 255,
    atFrame: number | undefined = undefined,
    color: RGBVec | undefined = undefined,
    theta: number | undefined = undefined
  ) {
    const viewport = Viewport.getInstance();
    const pos = viewport.worldToCanvasCoords(posW);
    const width = viewport.worldToCanvasDist(widthW);
    const displayedW = Math.max(width, 4);

    this.queueArtifact(
      artifact,
      { x: pos.x - width / 2, y: pos.y - width / 2 },
      displayedW,
      alpha,
      atFrame,
      color,
      theta
    );
  }

  public queueSprite(
    artifact: RenderedArtifact,
    topLeft: CanvasCoords,
    width: number,
    alpha: number,
    color: RGBVec | undefined = undefined,
    atFrame: number | undefined = undefined,
    theta: number | undefined = undefined // rotate around [w/2, w/2]
  ) {
    if (!this.loaded) return;

    const { rarity } = artifact;
    const shine = rarity >= ArtifactRarity.Rare;
    const invert = rarity === ArtifactRarity.Legendary;
    const mythic = rarity === ArtifactRarity.Mythic;

    const {
      position: posA,
      texcoord: texA,
      rectPos: rectPosA,
      color: colorA,
      shine: shineA,
      invert: invertA,
      mythic: mythicA,
    } = this.attribManagers;

    /* set up attributes */
    // we'll always want pixel-perfect icons
    const { x, y } = { x: Math.floor(topLeft.x), y: Math.floor(topLeft.y) };

    const totalDur = 3;
    const totalFrames = totalDur * 60;

    // [0, totalFrames]
    const nowFrame = Math.floor((EngineUtils.getNow() % totalDur) * 60);

    const frameNo = atFrame === undefined ? nowFrame : atFrame;
    const shineVal = frameNo / totalFrames;

    // [0, 1] or null - gets mapped to [-0.5, 2] in the shader
    const shineLoc = shine ? shineVal : -1000;

    const tex: SpriteRectangle = spriteFromArtifact(artifact);

    const { x1, x2, y1, y2 } = tex;

    const dim = width;
    EngineUtils.makeQuadVec2Buffered(this.posBuffer, 0, 0, dim, dim);

    if (theta !== undefined) {
      EngineUtils.translateQuadVec2(this.posBuffer, [-dim / 2, -dim / 2]);
      EngineUtils.rotateQuadVec2(this.posBuffer, theta);
      EngineUtils.translateQuadVec2(this.posBuffer, [dim / 2, dim / 2]);
    }

    EngineUtils.translateQuadVec2(this.posBuffer, [x, y]);

    if (this.flip) {
      EngineUtils.makeQuadVec2Buffered(this.texBuffer, x1, 1 - y1, x2, 1 - y2);
    } else {
      EngineUtils.makeQuadVec2Buffered(this.texBuffer, x1, y1, x2, y2);
    }

    // 0, 0, 0 is a special color; the program looks for it
    const myColor: RGBAVec = [...(color || [0, 0, 0]), alpha];

    /* buffer attributes */
    posA.setVertex(this.posBuffer, this.verts);
    texA.setVertex(this.texBuffer, this.verts);
    rectPosA.setVertex(this.rectposBuffer, this.verts);

    for (let i = 0; i < 6; i++) {
      colorA.setVertex(myColor, this.verts + i);
      shineA.setVertex([shineLoc], this.verts + i);
      invertA.setVertex([invert ? 1 : 0], this.verts + i);
      mythicA.setVertex([mythic ? 1 : 0], this.verts + i);
    }
    this.verts += 6;
  }

  public queueOutline(
    artifact: RenderedArtifact,
    { x, y }: CanvasCoords,
    width: number,
    alpha: number,
    theta: number | undefined,
    color: RGBVec = engineConsts.colors.artifacts.trim
  ) {
    const s = this.thumb ? width / 16 : width / 64;
    const iters = this.thumb ? 1 : 2;
    for (let del = s; del <= iters * s; del += s) {
      this.queueSprite(artifact, { x, y: y - del }, width, alpha, color, undefined, theta);
      this.queueSprite(artifact, { x, y: y + del }, width, alpha, color, undefined, theta);
      this.queueSprite(artifact, { x: x + del, y }, width, alpha, color, undefined, theta);
      this.queueSprite(artifact, { x: x - del, y }, width, alpha, color, undefined, theta);
    }

    if (iters === 2) {
      this.queueSprite(artifact, { x: x - 1, y: y - 1 }, width, alpha, color, undefined, theta);
      this.queueSprite(artifact, { x: x - 1, y: y + 1 }, width, alpha, color, undefined, theta);
      this.queueSprite(artifact, { x: x + 1, y: y - 1 }, width, alpha, color, undefined, theta);
      this.queueSprite(artifact, { x: x + 1, y: y + 1 }, width, alpha, color, undefined, theta);
    }
  }

  queueIconWorld(artifact: Artifact, topLeft: WorldCoords, widthW: number, maxWidth = 32) {
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

  public setUniforms() {
    this.uniformSetters.texture(this.texIdx);
    this.uniformSetters.matrix(this.manager.projectionMatrix);
  }

  flush() {
    if (!this.loaded || this.verts === 0) return;

    const { gl } = this.manager;
    gl.activeTexture(gl.TEXTURE0 + this.texIdx);
    super.flush();

    this.verts = 0;
  }
}
