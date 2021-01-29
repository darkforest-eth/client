import { rarityFromArtifact } from '../../../utils/ArtifactUtils';
import { CanvasCoords, WorldCoords } from '../../../utils/Coordinates';
import {
  Artifact,
  ArtifactRarity,
  ArtifactType,
  Biome,
} from '../../../_types/global/GlobalTypes';
import Viewport from '../../board/Viewport';
import { SPRITE_PROGRAM_DEFINITION } from '../programs/SpriteProgram';
import { engineConsts } from '../utils/EngineConsts';
import { RGBAVec, RGBVec } from '../utils/EngineTypes';
import EngineUtils from '../utils/EngineUtils';
import {
  AtlasInfo,
  getSpriteInfo,
  loadArtifactAtlas,
  loadArtifactThumbAtlas,
} from '../utils/TextureManager';
import { GenericRenderer } from '../webgl/GenericRenderer';
import { WebGLManager } from '../webgl/WebGLManager';

export class SpriteRenderer extends GenericRenderer<
  typeof SPRITE_PROGRAM_DEFINITION
> {
  private posBuffer: number[];
  private texBuffer: number[];
  private rectposBuffer: number[];

  private loaded: boolean;
  private thumb: boolean;
  private spriteInfo: AtlasInfo;
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
    EngineUtils.fillTexture(gl);

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
    alpha = 255,
    atFrame: number | null = null
  ) {
    const type = artifact.artifactType;
    const rarity = rarityFromArtifact(artifact);
    const biome = artifact.planetBiome;

    const shine = rarity >= ArtifactRarity.Rare;
    const invert = rarity === ArtifactRarity.Legendary;
    const shiny = rarity === ArtifactRarity.Epic;
    const mythic = rarity === ArtifactRarity.Mythic;

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
      invert,
      mythic,
      atFrame
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
    invert = false,
    mythic = false,
    atFrame: number | null = null
  ) {
    if (!this.loaded) return;

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

    const frameNo = atFrame === null ? nowFrame : atFrame;
    const shineVal = frameNo / totalFrames;

    // [0, 1] or null - gets mapped to [-0.5, 2] in the shader
    const shineLoc = shine ? shineVal : -1000;

    const info = this.spriteInfo[type][biome];
    const tex = shiny ? info.shiny : info.normal;

    const { x1, x2, y1, y2 } = tex;

    const dim = width;
    EngineUtils.makeQuadVec2Buffered(this.posBuffer, x, y, x + dim, y + dim);

    if (this.flip) {
      EngineUtils.makeQuadVec2Buffered(this.texBuffer, x1, 1 - y1, x2, 1 - y2);
    } else {
      EngineUtils.makeQuadVec2Buffered(this.texBuffer, x1, y1, x2, y2);
    }

    // 0, 0, 0, 0 is a special color; the program looks for it
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

    if (iters === 2) {
      this.queueSprite(type, 1, { x: x - 1, y: y - 1 }, width, alpha, color);
      this.queueSprite(type, 1, { x: x - 1, y: y + 1 }, width, alpha, color);
      this.queueSprite(type, 1, { x: x + 1, y: y - 1 }, width, alpha, color);
      this.queueSprite(type, 1, { x: x + 1, y: y + 1 }, width, alpha, color);
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
