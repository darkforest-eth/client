import { Planet, WorldCoords } from '@darkforest_eth/types';
import { ProcgenUtils } from '../../../../Backend/Procedural/ProcgenUtils';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import Viewport from '../../../Game/Viewport';
import EngineUtils from '../EngineUtils';
import { QUASARBODY_PROGRAM_DEFINITION } from '../Programs/QuasarBodyProgram';
import { GenericRenderer } from '../WebGL/GenericRenderer';
import { WebGLManager } from '../WebGL/WebGLManager';

export class QuasarBodyRenderer extends GenericRenderer<typeof QUASARBODY_PROGRAM_DEFINITION> {
  quad3Buffer: number[];
  quad2Buffer: number[];

  constructor(manager: WebGLManager) {
    super(manager, QUASARBODY_PROGRAM_DEFINITION);

    this.quad3Buffer = EngineUtils.makeEmptyQuad();
    this.quad2Buffer = EngineUtils.makeQuadVec2(-1, 1, 1, -1);
  }

  public queueQuasarBodyScreen(
    planet: Planet,
    center: CanvasCoords,
    radius: number,
    z: number,
    angle = 0
  ) {
    const { position, color, rectPos } = this.attribManagers;

    const h = radius * (0.65 + Math.cos(angle) * 0.35);
    const w = radius;

    const x1 = -w;
    const y1 = -h;
    const x2 = +w;
    const y2 = +h;

    const effAngle = Math.sin(angle) * (Math.PI / 6);

    EngineUtils.makeQuadBuffered(this.quad3Buffer, x1, y1, x2, y2, z);
    EngineUtils.rotateQuad(this.quad3Buffer, effAngle);
    EngineUtils.translateQuad(this.quad3Buffer, [center.x, center.y]);

    position.setVertex(this.quad3Buffer, this.verts);
    rectPos.setVertex(this.quad2Buffer, this.verts);

    const cosmetic = ProcgenUtils.getPlanetCosmetic(planet);

    // push the same color 6 times
    for (let i = 0; i < 6; i++) {
      color.setVertex(cosmetic.oceanRgb, this.verts + i);
    }

    this.verts += 6;
  }

  public queueQuasarBody(
    planet: Planet,
    centerW: WorldCoords,
    radiusW: number,
    z: number,
    angle = 0
  ): void {
    const center = Viewport.getInstance().worldToCanvasCoords(centerW);
    const radius = Viewport.getInstance().worldToCanvasDist(radiusW);

    this.queueQuasarBodyScreen(planet, center, radius, z, angle);
  }

  public setUniforms() {
    this.uniformSetters.matrix(this.manager.projectionMatrix);

    const time = EngineUtils.getNow();
    this.uniformSetters.time(time / 6);
  }
}
