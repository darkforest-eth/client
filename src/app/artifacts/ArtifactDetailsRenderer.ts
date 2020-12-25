/*
 * Renders a sprite to the artifact details pane.
 */

import autoBind from 'auto-bind';
import { mat4 } from 'gl-matrix';
import { Artifact } from '../../_types/global/GlobalTypes';
import { SpriteRenderer } from '../planetscape/SpriteRenderer';
import { TextureGLManager } from '../renderer/webgl/WebGLManager';

export class ArtifactDetailsRenderer implements TextureGLManager {
  public gl: WebGL2RenderingContext;
  private canvas: HTMLCanvasElement;
  private frameRequestId: number;
  private texIdx = 0;
  public projectionMatrix: mat4;
  private spriteRenderer: SpriteRenderer;
  private artifact: Artifact | null = null;
  private visible = false;

  private margin: number;

  constructor(canvas: HTMLCanvasElement, margin = 0) {
    autoBind(this);
    this.margin = margin;

    this.canvas = canvas;
    this.projectionMatrix = mat4.create();

    const gl = canvas.getContext('webgl2');
    if (!gl) {
      console.error('error getting webgl2 context');
      return;
    }
    this.gl = gl;

    this.spriteRenderer = new SpriteRenderer(this);

    this.loop();
  }

  public getTexIdx(): number {
    return this.texIdx++;
  }

  public setArtifact(artifact: Artifact | null) {
    this.artifact = artifact;
  }

  public setVisible(visible: boolean) {
    this.visible = visible;
  }

  setProjectionMatrix(): void {
    const height = this.canvas.height;
    const width = this.canvas.width;

    // prettier-ignore
    mat4.set(this.projectionMatrix, 
      2 / width, 0, 0, 0,
      0, -2 / height, 0, 0,
      0, 0, 0, 0,
      -1, 1, 0, 1,
    );
  }

  private clear() {
    const gl = this.gl;
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
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
