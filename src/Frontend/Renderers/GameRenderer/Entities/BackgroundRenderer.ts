import { Chunk } from '../../../../_types/global/GlobalTypes';
import Viewport from '../../../Game/Viewport';
import EngineUtils from '../EngineUtils';
import { MASK_PROGRAM_DEFINITION } from '../Programs/MaskProgram';
import { GameGLManager } from '../WebGL/GameGLManager';
import { GenericRenderer } from '../WebGL/GenericRenderer';

export default class BackgroundRenderer extends GenericRenderer<typeof MASK_PROGRAM_DEFINITION> {
  manager: GameGLManager;
  bgCanvas: HTMLCanvasElement;
  matrixULoc: WebGLUniformLocation | null;
  quadBuffer: number[];
  perlinThresholds: number[];

  constructor(manager: GameGLManager) {
    super(manager, MASK_PROGRAM_DEFINITION);
    this.quadBuffer = EngineUtils.makeEmptyQuad();
    this.perlinThresholds = this.manager.renderer.gameUIManager.getPerlinThresholds();
  }

  drawChunks(
    exploredChunks: Iterable<Chunk>,
    highPerfMode: boolean,
    drawChunkBorders: boolean
  ): void {
    // upload current camera transform to shader

    /* draw using mask program */
    const viewport = Viewport.getInstance();

    const [t1, t2, t3] = this.perlinThresholds;

    let vertCount = 0;

    if (highPerfMode) {
      return;
    }
    for (const exploredChunk of exploredChunks) {
      if (viewport.intersectsViewport(exploredChunk)) {
        // add this chunk to the verts array
        const {
          chunkFootprint: { bottomLeft, sideLength },
          perlin,
        } = exploredChunk;
        const { x: x1, y: y2 } = viewport.worldToCanvasCoords(bottomLeft);
        const chunkW = viewport.worldToCanvasDist(sideLength);
        const x2 = x1 + chunkW;
        const y1 = y2 - chunkW;

        let color = 0; // 0 is space, 3 is dead space

        if (perlin > t1) color = 1;
        if (perlin > t2) color = 2;
        if (perlin > t3) color = 3;

        // a border is just a bigger rectangle with a different color drawn directly
        // behind the rectangle you actually want to draw.
        if (drawChunkBorders) {
          EngineUtils.makeQuadBuffered(this.quadBuffer, x1, y1, x2, y2, 4);
          this.attribManagers.position.setVertex(this.quadBuffer, vertCount);
          vertCount += 6;
        }

        // if we're drawing a border, render the box a little bit smaller than the border box, so
        // that the border box looks like a ... border
        const shrinkByPx = drawChunkBorders ? 1 : 0;

        EngineUtils.makeQuadBuffered(
          this.quadBuffer,
          x1 + shrinkByPx,
          y1 + shrinkByPx,
          x2 - shrinkByPx,
          y2 - shrinkByPx,
          color
        );

        this.attribManagers.position.setVertex(this.quadBuffer, vertCount);
        vertCount += 6;
      }
    }

    this.verts = vertCount;
    this.flush();
  }

  public setUniforms() {
    this.uniformSetters.matrix(this.manager.projectionMatrix);
  }
}

// we'll need this code later for improved perlin
/*
  setStencil(stencil: boolean) {
    this.stencil = stencil;
    if (stencil) this.gl.enable(this.gl.STENCIL_TEST);
    else this.gl.disable(this.gl.STENCIL_TEST);
  }

  private checkStencil(): boolean {
    if (!this.stencil) {
      console.error('stencil not enabled!');
    }

    return this.stencil;
  }

  startMasking() {
    if (!this.checkStencil()) return;

    const gl = this.gl;
    gl.stencilOp(gl.REPLACE, gl.REPLACE, gl.REPLACE); // always update stencil
    gl.stencilFunc(gl.ALWAYS, 1, 0xff); // everything passes stencil test
    gl.stencilMask(0xff); // enable stencil writes
  }

  stopMasking() {
    if (!this.checkStencil()) return;

    const gl = this.gl;
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP); // never update stencil
    gl.stencilFunc(gl.EQUAL, 1, 0xff); // only pass if eq
    gl.stencilMask(0x00); // disable stencil writes
  }
  */
