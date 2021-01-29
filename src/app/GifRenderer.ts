import { mat4 } from 'gl-matrix';
import JSZip from 'jszip';
import { mockArtifactWithRarity } from '../utils/ArtifactUtils';
import {
  ArtifactType,
  Biome,
  ArtifactRarity,
  Artifact,
  ArtifactNames,
  RarityNames,
  BiomeNames,
} from '../_types/global/GlobalTypes';
import { SpriteRenderer } from './renderer/entities/SpriteRenderer';
import { WebGLManager } from './renderer/webgl/WebGLManager';

const FileSaver = require('file-saver');

declare global {
  interface Window {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    CCapture: any;
  }
}

export class GifRenderer extends WebGLManager {
  private spriteRenderer: SpriteRenderer;

  public projectionMatrix: mat4;

  private margin: number;
  private canvasDim: number;
  private artifactDim: number;
  private resolution: number;

  constructor(canvas: HTMLCanvasElement, dim: number) {
    super(canvas, { preserveDrawingBuffer: true });

    this.spriteRenderer = new SpriteRenderer(this);
    this.setDim(dim);

    // shitty way to make sure texture is loaded first
    setTimeout(() => this.start(), 1000);
  }

  setDim(dim: number) {
    this.canvasDim = dim;
    this.resolution = Math.floor(this.canvasDim / 64) - 1;
    this.artifactDim = this.resolution * 64;
    this.margin = Math.floor(0.5 * (this.canvasDim - this.artifactDim));

    this.setProjectionMatrix();
  }

  // https://gist.github.com/ahgood/bfc57a7f44d6ab7803f3ee2ec0abb980
  private start() {
    this.drawSprite(
      mockArtifactWithRarity(
        ArtifactRarity.Mythic,
        ArtifactType.Monolith,
        Biome.ICE
      )
    );
    window.requestAnimationFrame(this.start);
  }

  private drawSprite(artifact: Artifact, atFrame: number | null = null) {
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
    const b64 = this.canvas
      .toDataURL('image/png')
      .replace(/^data:image\/(png|jpg);base64,/, '');

    return b64;
  }

  public static getName(
    type: ArtifactType,
    biome: Biome,
    rarity: ArtifactRarity,
    videoMode: boolean
  ): string {
    const typeStr = ArtifactNames[type];
    const rarityStr = RarityNames[rarity];
    const biomeStr = biome + BiomeNames[biome];
    const ext = videoMode ? 'webm' : 'png';

    const fileName = `64-${typeStr}-${rarityStr}-${biomeStr}.${ext}`;
    return fileName;
  }

  private addSprite(
    dir: JSZip,
    type: ArtifactType,
    biome: Biome,
    rarity: ArtifactRarity
  ) {
    const fileName = GifRenderer.getName(type, biome, rarity, false);
    this.drawSprite(mockArtifactWithRarity(rarity, type, biome));

    dir.file(fileName, this.getBase64(), { base64: true });
  }

  private async addVideo(
    dir: JSZip,
    type: ArtifactType,
    biome: Biome,
    rarity: ArtifactRarity
  ) {
    const fileName = GifRenderer.getName(type, biome, rarity, true);
    const artifact = mockArtifactWithRarity(rarity, type, biome);

    const capturer = new window.CCapture({
      format: 'webm',
      framerate: 60,
      verbose: true,
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
        resolve();
      });
    });
  }

  private async getAll(videoMode = false) {
    const zip = new JSZip();

    zip.folder('img');
    const dir = zip.folder('img');
    if (!dir) {
      console.error('jszip error');
      return;
    }

    for (let type = 1; type <= 4; type++) {
      for (let biome = Biome.MIN; biome <= Biome.MAX; biome++) {
        for (
          let rarity = ArtifactRarity.Common;
          rarity <= ArtifactRarity.Mythic;
          rarity++
        ) {
          if (videoMode) await this.addVideo(dir, type, biome, rarity);
          else this.addSprite(dir, type, biome, rarity);
        }
      }
    }

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
    super.clear(0, [0.0724, 0.051, 0.3111, 1]);
  }
}
