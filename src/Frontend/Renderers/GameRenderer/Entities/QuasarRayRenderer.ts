import { Planet, WorldCoords } from '@darkforest_eth/types';
import { ProcgenUtils } from '../../../../Backend/Procedural/ProcgenUtils';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import Viewport from '../../../Game/Viewport';
import EngineUtils from '../EngineUtils';
import { QUASARRAY_PROGRAM_DEFINITION } from '../Programs/QuasarRayProgram';
import { GenericRenderer } from '../WebGL/GenericRenderer';
import { WebGLManager } from '../WebGL/WebGLManager';

export class QuasarRayRenderer extends GenericRenderer<typeof QUASARRAY_PROGRAM_DEFINITION> {
  quad3Buffer: number[];
  quad2BufferTop: number[];
  quad2BufferBot: number[];

  constructor(manager: WebGLManager) {
    super(manager, QUASARRAY_PROGRAM_DEFINITION);
    const { gl } = this.manager;

    this.quad3Buffer = EngineUtils.makeEmptyQuad();
    this.quad2BufferTop = EngineUtils.makeQuadVec2(-1, 1, 1, 0);
    this.quad2BufferBot = EngineUtils.makeQuadVec2(-1, 0, 1, -1);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }

  public queueQuasarRayScreen(
    top = true,
    planet: Planet,
    center: CanvasCoords,
    radius: number,
    z: number,
    angle = 0
  ) {
    const { position, color, rectPos } = this.attribManagers;

    const facTop = 0.93 + Math.cos(angle + Math.PI) * 0.07;
    const facBot = 0.93 + Math.cos(angle) * 0.07;

    const x1 = -radius * (top ? facBot : facTop);
    const y1 = !top ? 0 : -2 * radius * facBot;
    const x2 = +radius * (top ? facBot : facTop);
    const y2 = top ? 0 : 2 * radius * facTop;

    const cosmetic = ProcgenUtils.getPlanetCosmetic(planet);

    const eps = top ? -0.01 : 0.01;

    const effAngle = Math.sin(angle) * (Math.PI / 6);

    EngineUtils.makeQuadBuffered(this.quad3Buffer, x1, y1, x2, y2, z + eps);
    EngineUtils.rotateQuad(this.quad3Buffer, effAngle);
    EngineUtils.translateQuad(this.quad3Buffer, [center.x, center.y]);

    position.setVertex(this.quad3Buffer, this.verts);

    // set rectPos
    const myBuffer = top ? this.quad2BufferTop : this.quad2BufferBot;
    rectPos.setVertex(myBuffer, this.verts);

    // push the same color 6 times
    for (let i = 0; i < 6; i++) {
      color.setVertex(cosmetic.landRgb, this.verts + i);
    }

    this.verts += 6;
  }

  public queueQuasarRay(
    top = true,
    planet: Planet,
    centerW: WorldCoords,
    radiusW: number,
    z: number,
    angle = 0
  ): void {
    const center = Viewport.getInstance().worldToCanvasCoords(centerW);
    const radius = Viewport.getInstance().worldToCanvasDist(radiusW);

    this.queueQuasarRayScreen(top, planet, center, radius, z, angle);
  }

  public setUniforms() {
    this.uniformSetters.matrix(this.manager.projectionMatrix);

    const time = EngineUtils.getNow();
    this.uniformSetters.time(time / 6);
  }
}
