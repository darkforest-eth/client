import autoBind from 'auto-bind';
import { SpriteRenderer } from '../renderer/entities/SpriteRenderer';
import { levelFromRarity, rarityFromArtifact } from '../../utils/ArtifactUtils';
import { ARTIFACT_ROW_H } from '../../styles/dfstyles';
import {
  Artifact,
  ArtifactRarity,
  ArtifactType,
  Biome,
} from '../../_types/global/GlobalTypes';
import { WebGLManager } from '../renderer/webgl/WebGLManager';

const NUM_BIOMES = Biome.MAX;

const thumbDim = 32;
const cellDim = ARTIFACT_ROW_H;
const mTop = 0.5 * (cellDim - thumbDim);

export const artifactColM = 32;
export const artifactColW = cellDim * 4;

export const aDexCanvasW = 4 * artifactColW + 3 * artifactColM;
export const aDexCanvasH = NUM_BIOMES * cellDim;

export const aListCanvasW = cellDim;
export const aListCanvasH = 400;

export class ArtifactRenderer extends WebGLManager {
  private frameRequestId: number;

  private spriteRenderer: SpriteRenderer;

  private visible = false;
  private artifacts: Artifact[];
  private isDex: boolean;
  private scroll = 0;

  constructor(canvas: HTMLCanvasElement, isDex = true) {
    super(canvas);

    autoBind(this);

    this.setIsDex(isDex);

    this.spriteRenderer = new SpriteRenderer(this, true);

    this.loop();
  }

  public setIsDex(isDex: boolean) {
    this.isDex = isDex;
  }

  public setScroll(scroll: number) {
    this.scroll = scroll;
  }

  public setVisible(visible: boolean): void {
    this.visible = visible;
  }

  public setArtifacts(artifacts: Artifact[]): void {
    this.artifacts = artifacts;
  }

  private queueRarityColumn(rarity: ArtifactRarity, startX: number) {
    let col = 0;
    for (let type: ArtifactType = 1; type <= 4; type++) {
      this.queueArtifactColumn(type, rarity, startX + col * cellDim);
      col++;
    }
  }

  private containsArtifact(
    biome: Biome,
    rarity: ArtifactRarity,
    type: ArtifactType
  ) {
    for (const artifact of this.artifacts) {
      if (
        artifact.planetBiome === biome &&
        artifact.artifactType === type &&
        rarityFromArtifact(artifact) === rarity
      ) {
        return true;
      }
    }

    return false;
  }

  private queueArtifactColumn(
    type: ArtifactType,
    rarity: ArtifactRarity,
    startX: number
  ) {
    let row = 0;
    for (let biome: Biome = Biome.MIN; biome <= Biome.MAX; biome++) {
      const pos = { x: startX, y: mTop + row * ARTIFACT_ROW_H };
      const artifact = {
        planetBiome: biome,
        planetLevel: levelFromRarity(rarity),
        artifactType: type,
      } as Artifact;
      const contains = this.containsArtifact(biome, rarity, type);
      const alpha = contains ? 255 : 70;
      this.spriteRenderer.queueArtifact(artifact, pos, thumbDim, alpha);

      row++;
    }
  }

  private drawDex() {
    for (let r = ArtifactRarity.Common; r <= ArtifactRarity.Legendary; r++) {
      this.queueRarityColumn(r, r * (artifactColW + artifactColM));
    }
  }

  private drawList() {
    let row = 0;
    for (const artifact of this.artifacts) {
      const pos = { x: 0, y: row * ARTIFACT_ROW_H + mTop - this.scroll };
      this.spriteRenderer.queueArtifact(artifact, pos, thumbDim);
      row++;
    }
  }

  private draw() {
    if (this.isDex) this.drawDex();
    else this.drawList();

    this.spriteRenderer.flush();
  }

  private loop() {
    if (this.visible) {
      this.setProjectionMatrix();
      this.clear();
      this.draw();
    }

    this.frameRequestId = window.requestAnimationFrame(this.loop);
  }

  public destroy() {
    window.cancelAnimationFrame(this.frameRequestId);
  }
}
