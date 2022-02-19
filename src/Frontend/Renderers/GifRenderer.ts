import {
  EMPTY_ARTIFACT_ID,
  MAX_ARTIFACT_RARITY,
  MAX_ARTIFACT_TYPE,
  MAX_BIOME,
  MIN_ARTIFACT_RARITY,
  MIN_ARTIFACT_TYPE,
  MIN_BIOME,
} from '@darkforest_eth/constants';
import { ArtifactFileColor, artifactFileName, setForceAncient } from '@darkforest_eth/gamelogic';
import { mockArtifactWithRarity } from '@darkforest_eth/procedural';
import { SpriteRenderer, WebGLManager } from '@darkforest_eth/renderer';
import { Artifact, ArtifactRarity, ArtifactType, Biome } from '@darkforest_eth/types';
import { mat4 } from 'gl-matrix';
import JSZip from 'jszip';
import { GIF_ARTIFACT_COLOR } from '../Pages/GifMaker';

const FileSaver = require('file-saver');

declare global {
  interface Window {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    CCapture: any;
  }
}

const COLORS: Record<ArtifactFileColor, readonly [number, number, number, number]> = {
  [ArtifactFileColor.BLUE]: [0.0724, 0.051, 0.3111, 1] as const,
  [ArtifactFileColor.APP_BACKGROUND]: [0.031372549, 0.031372549, 0.031372549, 1] as const,
};

export class GifRenderer extends WebGLManager {
  public projectionMatrix: mat4;
  private spriteRenderer: SpriteRenderer;
  private margin: number;
  private canvasDim: number;
  private artifactDim: number;
  private resolution: number;

  private thumb: boolean;

  constructor(canvas: HTMLCanvasElement, dim: number, isThumb: boolean) {
    super(canvas, { preserveDrawingBuffer: true });

    this.thumb = isThumb;

    this.spriteRenderer = new SpriteRenderer(this, isThumb);
    this.setDim(dim);
  }

  private setDim(dim: number) {
    const SPRITE_DIM = this.thumb ? 16 : 64;

    this.canvasDim = dim;
    this.resolution = Math.floor(this.canvasDim / SPRITE_DIM) - 1;
    this.artifactDim = this.resolution * SPRITE_DIM;

    this.margin = Math.floor(0.5 * (this.canvasDim - this.artifactDim));

    this.setProjectionMatrix();
  }

  // https://gist.github.com/ahgood/bfc57a7f44d6ab7803f3ee2ec0abb980

  private drawSprite(artifact: Artifact, atFrame: number | undefined = undefined) {
    this.clear();
    this.spriteRenderer.queueArtifact(
      artifact,
      { x: this.margin, y: this.margin },
      this.artifactDim,
      255,
      atFrame
    );
    this.spriteRenderer.flush();
  }

  private getBase64(): string {
    const b64 = this.canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, '');

    return b64;
  }

  private getFileName(
    video: boolean,
    type: ArtifactType,
    biome: Biome,
    rarity: ArtifactRarity,
    ancient: boolean
  ) {
    return artifactFileName(
      video,
      this.thumb,
      { artifactType: type, planetBiome: biome, rarity, id: EMPTY_ARTIFACT_ID },
      GIF_ARTIFACT_COLOR,
      { skipCaching: true, forceAncient: ancient }
    );
  }

  private addSprite(
    dir: JSZip,
    type: ArtifactType,
    biome: Biome,
    rarity: ArtifactRarity,
    ancient = false
  ) {
    const fileName = this.getFileName(false, type, biome, rarity, ancient);
    this.drawSprite(mockArtifactWithRarity(rarity, type, biome));

    dir.file(fileName, this.getBase64(), { base64: true });
  }

  private async addVideo(
    dir: JSZip,
    type: ArtifactType,
    biome: Biome,
    rarity: ArtifactRarity,
    ancient = false
  ) {
    const fileName = this.getFileName(true, type, biome, rarity, ancient);
    const artifact = mockArtifactWithRarity(rarity, type, biome);

    const capturer = new window.CCapture({
      format: 'webm',
      framerate: 60,
      quality: 0.999,
    });
    capturer.start();

    for (let i = 0; i < 180; i++) {
      this.drawSprite(artifact, i);
      capturer.capture(this.canvas);
    }
    capturer.stop();
    return new Promise<void>((resolve) => {
      capturer.save((blob: Blob) => {
        dir.file(fileName, blob);
        console.log('saved ' + fileName + '!');
        resolve();
      });
    });
  }

  private async addBiomes(videoMode: boolean, dir: JSZip) {
    setForceAncient(false);
    for (let type = MIN_ARTIFACT_TYPE; type <= MAX_ARTIFACT_TYPE; type++) {
      for (let rarity = MIN_ARTIFACT_RARITY; rarity <= MAX_ARTIFACT_RARITY; rarity++) {
        for (let biome = MIN_BIOME; biome <= MAX_BIOME; biome++) {
          if (videoMode) await this.addVideo(dir, type, biome, rarity, false);
          else this.addSprite(dir, type, biome, rarity, false);
        }
      }
    }
  }

  private async addAncient(videoMode: boolean, dir: JSZip) {
    setForceAncient(true);
    for (let type = MIN_ARTIFACT_TYPE; type <= MAX_ARTIFACT_TYPE; type++) {
      for (let rarity = MIN_ARTIFACT_RARITY; rarity <= MAX_ARTIFACT_RARITY; rarity++) {
        if (videoMode) await this.addVideo(dir, type, Biome.OCEAN, rarity, true);
        else this.addSprite(dir, type, Biome.OCEAN, rarity, true);
      }
    }
  }

  private async getAll(videoMode = false) {
    const zip = new JSZip();

    zip.folder('img');
    const dir = zip.folder('img');
    if (!dir) {
      console.error('jszip error');
      return;
    }

    await this.addBiomes(videoMode, dir);
    await this.addAncient(videoMode, dir);

    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, 'files.zip');
    });
  }

  getAllSprites() {
    this.getAll(false);
  }

  getAllVideos() {
    this.getAll(true);
  }

  clear() {
    super.clear(0, [...COLORS[GIF_ARTIFACT_COLOR]]);
  }
}
