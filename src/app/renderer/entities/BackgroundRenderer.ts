import Viewport from '../../board/Viewport';
import { ExploredChunkData } from '../../../_types/global/GlobalTypes';
import { MASK_PROGRAM_DEFINITION } from '../programs/MaskProgram';
import { GameGLManager } from '../webgl/GameGLManager';
import EngineUtils from '../utils/EngineUtils';
import { GenericRenderer } from '../webgl/GenericRenderer';

export default class BackgroundRenderer extends GenericRenderer<
  typeof MASK_PROGRAM_DEFINITION
> {
  manager: GameGLManager;
  bgCanvas: HTMLCanvasElement;

  maskProgram: WebGLProgram;

  matrixULoc: WebGLUniformLocation | null;

  quadBuffer: number[];

  perlinThresholds: number[];

  constructor(manager: GameGLManager) {
    super(manager, MASK_PROGRAM_DEFINITION);
    this.quadBuffer = EngineUtils.makeEmptyQuad();
    this.perlinThresholds = this.manager.renderer.gameUIManager.getPerlinThresholds();
  }

  drawChunks(exploredChunks: Iterable<ExploredChunkData>): void {
    // upload current camera transform to shader

    /* draw using mask program */
    const viewport = Viewport.getInstance();
    const [t1, t2] = this.perlinThresholds;

    let vertCount = 0;

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

        let color = 0;

        if (perlin < t1) color = 1;
        else if (perlin < t2) color = 2;

        EngineUtils.makeQuadBuffered(this.quadBuffer, x1, y1, x2, y2, color);
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
