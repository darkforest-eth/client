import { Planet, WorldCoords } from '@darkforest_eth/types';
import { ProcgenUtils } from '../../../../Backend/Procedural/ProcgenUtils';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import Viewport from '../../../Game/Viewport';
import { DrawMode, RGBVec } from '../EngineTypes';
import EngineUtils from '../EngineUtils';
import { MINE_PROGRAM_DEFINITION } from '../Programs/MineProgram';
import { GenericRenderer } from '../WebGL/GenericRenderer';
import { WebGLManager } from '../WebGL/WebGLManager';

/** Renderers asteroids at the center of silver mines  */
export class MineBodyRenderer extends GenericRenderer<typeof MINE_PROGRAM_DEFINITION> {
  constructor(manager: WebGLManager) {
    super(manager, MINE_PROGRAM_DEFINITION);
  }

  private queuePoint(
    { x, y }: CanvasCoords,
    z: number,
    radius: number, // canvas coords
    color: RGBVec,
    seed: number,
    offset: number
  ) {
    const {
      position: posA,
      radius: radiusA,
      color: colorA,
      seed: seedA,
      offset: offsetA,
    } = this.attribManagers;

    posA.setVertex([x, y, z], this.verts);
    radiusA.setVertex([radius], this.verts);
    colorA.setVertex(color, this.verts);
    seedA.setVertex([seed], this.verts);
    offsetA.setVertex([offset], this.verts);

    this.verts += 1;
  }

  queueMineScreen(planet: Planet, center: WorldCoords, radius: number, z: number) {
    const cosmetic = ProcgenUtils.getPlanetCosmetic(planet);
    const { seed } = cosmetic;
    const numAsteroids = planet.planetLevel + 1;
    const interval = (2 * Math.PI) / numAsteroids;
    const [h, s, l] = cosmetic.asteroidHsl;

    const p = 5;

    for (let i = 0; i < numAsteroids; i++) {
      const offset = i * interval;
      const rand1 = ((seed + 1741 * i) % p) / p; // bad deterinistic random
      const rand2 = ((seed + 1741 * (i + 10)) % p) / p; // bad deterinistic random

      const delS = -20 + rand1 * 40;
      const delL = -20 + rand2 * 40;

      const ptColor = ProcgenUtils.hslToRgb([h, s + delS, l + delL]);
      this.queuePoint(center, z, radius, ptColor, seed + i, offset);
    }
  }

  queueMine(planet: Planet, centerW: WorldCoords, radiusW: number) {
    const center = Viewport.getInstance().worldToCanvasCoords(centerW);
    const radius = Viewport.getInstance().worldToCanvasDist(radiusW);
    const z = EngineUtils.getPlanetZIndex(planet);

    this.queueMineScreen(planet, center, radius, z);
  }

  public setUniforms() {
    this.uniformSetters.matrix(this.manager.projectionMatrix);
    this.uniformSetters.now(EngineUtils.getNow());
  }

  flush() {
    super.flush(DrawMode.Points);
  }
}
