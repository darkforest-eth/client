import { Chunk } from '../../../../_types/global/GlobalTypes';
import Viewport from '../../../Game/Viewport';
import EngineUtils from '../EngineUtils';
import { MASK_PROGRAM_DEFINITION } from '../Programs/MaskProgram';
import { GameGLManager } from '../WebGL/GameGLManager';
import { GenericRenderer } from '../WebGL/GenericRenderer';

export default class MaskRenderer extends GenericRenderer<typeof MASK_PROGRAM_DEFINITION> {
  manager: GameGLManager;
  bgCanvas: HTMLCanvasElement;
  quadBuffer: number[];
  perlinThresholds: number[];

  constructor(manager: GameGLManager) {
    super(manager, MASK_PROGRAM_DEFINITION);
    this.quadBuffer = EngineUtils.makeEmptyQuad();
    this.perlinThresholds = this.manager.renderer.gameUIManager.getPerlinThresholds();
  }

  queueChunk(chunk: Chunk): void {
    const [t1, t2, t3] = this.perlinThresholds;

    /* draw using mask program */
    const viewport = Viewport.getInstance();

    const {
      chunkFootprint: { bottomLeft, sideLength },
      perlin,
    } = chunk;
    const { x: x1, y: y2 } = viewport.worldToCanvasCoords(bottomLeft);
    const chunkW = viewport.worldToCanvasDist(sideLength);
    const x2 = x1 + chunkW;
    const y1 = y2 - chunkW;

    let color = 0; // 0 is nebula, 3 is dead space

    if (perlin > t1) color = 1;
    if (perlin > t2) color = 2;
    if (perlin > t3) color = 3;

    const { position } = this.attribManagers;

    EngineUtils.makeQuadBuffered(this.quadBuffer, x1, y1, x2, y2, color);
    position.setVertex(this.quadBuffer, this.verts);

    this.verts += 6;
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
