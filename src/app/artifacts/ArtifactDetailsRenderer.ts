/*
 * Renders a sprite to the artifact details pane.
 */
import { mat4 } from 'gl-matrix';
import { Artifact } from '../../_types/global/GlobalTypes';
import { SpriteRenderer } from '../renderer/entities/SpriteRenderer';
import { WebGLManager } from '../renderer/webgl/WebGLManager';

export class ArtifactDetailsRenderer extends WebGLManager {
  private frameRequestId: number;
  public projectionMatrix: mat4;
  private spriteRenderer: SpriteRenderer;
  private artifact: Artifact | null = null;
  private visible = false;

  private margin: number;

  constructor(canvas: HTMLCanvasElement, margin = 0) {
    super(canvas);

    this.margin = margin;
    this.spriteRenderer = new SpriteRenderer(this);

    this.loop();
  }

  public setArtifact(artifact: Artifact | null) {
    this.artifact = artifact;
  }

  public setVisible(visible: boolean) {
    this.visible = visible;
  }

  private draw() {
    if (!this.artifact) return;
    this.spriteRenderer.queueArtifact(
      this.artifact,
      { x: this.margin, y: this.margin },
      128
    );
    this.spriteRenderer.flush();
  }

  private loop() {
    if (this.visible && this.artifact) {
      this.setProjectionMatrix();
      this.clear();
      this.draw();
    }
    this.frameRequestId = window.requestAnimationFrame(this.loop);
  }
}
