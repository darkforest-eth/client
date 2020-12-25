import Viewport from '../../board/Viewport';
import { ExploredChunkData } from '../../../_types/global/GlobalTypes';
import AttribManager from '../webgl/AttribManager';
import {
  getMaskProgram,
  getMaskUniforms,
  maskPosProps,
} from '../programs/MaskProgram';
import { makeQuadBuffered } from '../utils/EngineUtils';
import WebGLManager from '../webgl/WebGLManager';

export default class BackgroundRenderer {
  manager: WebGLManager;
  bgCanvas: HTMLCanvasElement;

  maskProgram: WebGLProgram;

  posA: AttribManager;

  matrixULoc: WebGLUniformLocation | null;

  quadBuffer: number[];

  perlinThresholds: number[];

  constructor(manager: WebGLManager) {
    this.manager = manager;

    const { gl } = manager;

    try {
      /* create mask program */
      const maskProgram = getMaskProgram(gl);
      this.maskProgram = maskProgram;
      gl.useProgram(maskProgram);

      // attr buffers
      this.posA = new AttribManager(gl, maskProgram, maskPosProps);

      // uniforms
      this.matrixULoc = getMaskUniforms(gl).matrix;

      // r/w buffers, etc.
      this.quadBuffer = Array(6 * 3).fill(0);
      this.perlinThresholds = this.manager.renderer.gameUIManager.getPerlinThresholds();
    } catch (e) {
      console.error(e);
    }
  }

  drawChunks(exploredChunks: Iterable<ExploredChunkData>): void {
    // upload current camera transform to shader
    const { gl } = this.manager;

    // glManager.setStencil(true);

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

        makeQuadBuffered(this.quadBuffer, x1, y1, x2, y2, color);
        this.posA.setVertex(this.quadBuffer, vertCount);

        vertCount += 6;
      }
    }

    if (vertCount === 0) return;

    /* draw chunks */
    gl.useProgram(this.maskProgram);

    // write buffers
    this.posA.bufferData(vertCount);
    // this.colorA.bufferData(vertCount);

    // write uniforms
    // bgManager's matrix doesn't get updated
    gl.uniformMatrix4fv(this.matrixULoc, false, this.manager.projectionMatrix);

    // now draw
    gl.drawArrays(gl.TRIANGLES, 0, vertCount);
  }
}
