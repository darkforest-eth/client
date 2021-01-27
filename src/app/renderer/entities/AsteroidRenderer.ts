import { CanvasCoords } from '../../../utils/Coordinates';
import { ProcgenUtils } from '../../../utils/ProcgenUtils';
import { Planet } from '../../../_types/global/GlobalTypes';
import Viewport from '../../board/Viewport';
import { ASTEROID_PROGRAM_DEFINITION as ASTEROID_PROGRAM_DEFNITION } from '../programs/AsteroidProgram';
import { DrawMode, RGBVec } from '../utils/EngineTypes';
import EngineUtils from '../utils/EngineUtils';
import { GameGLManager } from '../webgl/GameGLManager';
import { GenericRenderer } from '../webgl/GenericRenderer';

export default class AsteroidRenderer extends GenericRenderer<
  typeof ASTEROID_PROGRAM_DEFNITION
> {
  viewport: Viewport;

  constructor(manager: GameGLManager) {
    super(manager, ASTEROID_PROGRAM_DEFNITION);
    this.viewport = Viewport.getInstance();
  }

  public queueAsteroid(
    planet: Planet,
    centerW: CanvasCoords,
    radiusW: number,
    color: RGBVec
  ) {
    const {
      position: posA,
      color: colorA,
      radius: radiusA,
      theta: thetaA,
      seed: seedA,
    } = this.attribManagers;

    const center = this.viewport.worldToCanvasCoords(centerW);
    const radius = this.viewport.worldToCanvasDist(radiusW);

    const cosmetic = ProcgenUtils.getPlanetCosmetic(planet);

    const { x, y } = center;

    const z = EngineUtils.getPlanetZIndex(planet);

    // initial asteroid offset
    const theta = (color[0] * 255 ** 2 + color[1] * 255 + color[2]) % 10000;

    posA.setVertex([x, y, z], this.verts);
    colorA.setVertex(color, this.verts);
    radiusA.setVertex([radius], this.verts);
    thetaA.setVertex([theta], this.verts);
    seedA.setVertex([cosmetic.seed], this.verts);

    this.verts += 1;
  }

  public setUniforms() {
    this.uniformSetters.matrix(this.manager.projectionMatrix);
    this.uniformSetters.now(EngineUtils.getNow());
  }

  public flush() {
    super.flush(DrawMode.Points);
  }
}
