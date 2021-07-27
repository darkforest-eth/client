import { Planet, PlanetLevel, WorldCoords } from '@darkforest_eth/types';
import { ProcgenUtils } from '../../../../Backend/Procedural/ProcgenUtils';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import Viewport from '../../../Game/Viewport';
import { RGBVec } from '../EngineTypes';
import EngineUtils from '../EngineUtils';
import { RUINS_PROGRAM_DEFINITION } from '../Programs/RuinsProgram';
import { GenericRenderer } from '../WebGL/GenericRenderer';
import { WebGLManager } from '../WebGL/WebGLManager';

export class RuinsRenderer extends GenericRenderer<typeof RUINS_PROGRAM_DEFINITION> {
  quad3Buffer: number[];
  quad2Buffer: number[];

  constructor(manager: WebGLManager) {
    super(manager, RUINS_PROGRAM_DEFINITION);

    this.quad3Buffer = EngineUtils.makeEmptyQuad();
    this.quad2Buffer = EngineUtils.makeQuadVec2(-1, 1, 1, -1);
  }

  public queueRuinsScreen(planet: Planet, center: CanvasCoords, radius: number, z: number) {
    const cosmetic = ProcgenUtils.getPlanetCosmetic(planet);

    const interval = 1 / (planet.planetLevel + 1);

    const c1 = cosmetic.baseColor;
    const c2 = cosmetic.baseColor2;
    const c3 = cosmetic.baseColor3;

    for (let i = 0; i < planet.planetLevel + 1; i++) {
      if (!cosmetic.ruins) break;

      const idx = i as PlanetLevel;

      const weights = cosmetic.ruins[idx].weights;
      const props = cosmetic.ruins[idx].props;

      const myColor = [c1, c2, c3][i % 3];

      props[0] = i + 2;

      const r = (i + 1) * interval;
      const myZ = z + 0.0001 * (i + 1);
      this.queueBloom(center, r * radius, myZ, myColor, weights, props);
    }
  }

  private queueBloom(
    center: CanvasCoords,
    radius: number,
    z: number,
    color: RGBVec,
    weights: [number, number, number, number],
    props: [number, number, number, number]
  ) {
    const {
      position,
      color: colorA,
      rectPos,
      weights: weightsA,
      props: propsA,
    } = this.attribManagers;

    const r = radius * 1.0;

    const x1 = center.x - r;
    const y1 = center.y - r;
    const x2 = center.x + r;
    const y2 = center.y + r;

    EngineUtils.makeQuadBuffered(this.quad3Buffer, x1, y1, x2, y2, z);
    position.setVertex(this.quad3Buffer, this.verts);
    rectPos.setVertex(this.quad2Buffer, this.verts);

    // push the same color 6 times
    for (let i = 0; i < 6; i++) {
      colorA.setVertex(color, this.verts + i);
      weightsA.setVertex(weights, this.verts + i);
      propsA.setVertex(props, this.verts + i);
    }

    this.verts += 6;
  }

  public queueRuins(planet: Planet, centerW: WorldCoords, radiusW: number): void {
    const center = Viewport.getInstance().worldToCanvasCoords(centerW);
    const radius = Viewport.getInstance().worldToCanvasDist(radiusW);
    const z = EngineUtils.getPlanetZIndex(planet);

    this.queueRuinsScreen(planet, center, radius, z);
  }

  public setUniforms() {
    this.uniformSetters.matrix(this.manager.projectionMatrix);

    const time = EngineUtils.getNow();
    this.uniformSetters.time(time);
  }
}
