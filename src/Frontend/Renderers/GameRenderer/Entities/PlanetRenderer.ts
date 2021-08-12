import { Planet, WorldCoords } from '@darkforest_eth/types';
import { mat4 } from 'gl-matrix';
import { ProcgenUtils } from '../../../../Backend/Procedural/ProcgenUtils';
import Viewport from '../../../Game/Viewport';
import { engineConsts } from '../EngineConsts';
import EngineUtils from '../EngineUtils';
import {
  distortFromPlanet,
  PLANET_PROGRAM_DEFINITION,
  propsFromPlanet,
} from '../Programs/PlanetProgram';
import { GenericRenderer } from '../WebGL/GenericRenderer';
import { WebGLManager } from '../WebGL/WebGLManager';

const { maxRadius } = engineConsts.planet;

export default class PlanetRenderer extends GenericRenderer<typeof PLANET_PROGRAM_DEFINITION> {
  timeMatrix: mat4;

  quad3Buffer: number[];
  quad2Buffer: number[];

  constructor(manager: WebGLManager) {
    super(manager, PLANET_PROGRAM_DEFINITION);

    // non-gl stuff
    this.timeMatrix = mat4.create();
    this.quad3Buffer = EngineUtils.makeEmptyQuad();
    this.quad2Buffer = EngineUtils.makeQuadVec2(-1, -1, 1, 1);
  }

  public setUniforms() {
    const time = EngineUtils.getNow();
    this.uniformSetters.matrix(this.manager.projectionMatrix);

    mat4.fromYRotation(this.timeMatrix, time / 5);
    this.uniformSetters.timeMatrix(this.timeMatrix);

    this.uniformSetters.time(time / 6);
  }

  public queuePlanetBodyScreen(
    planet: Planet,
    radius: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    const { position, rectPos, color, color2, color3, props, props2 } = this.attribManagers;
    const cosmetic = ProcgenUtils.getPlanetCosmetic(planet);

    // auto-sorts on GPU
    const z = EngineUtils.getPlanetZIndex(planet);

    EngineUtils.makeQuadBuffered(this.quad3Buffer, x1, y1, x2, y2, z);
    position.setVertex(this.quad3Buffer, this.verts);
    rectPos.setVertex(this.quad2Buffer, this.verts);

    // calculate size of epsilon as percentage of radius
    const eps = 1 / radius;

    // calculate props
    const planetProps = propsFromPlanet(planet);

    const distort = distortFromPlanet(planet);

    let alpha = 1.0;
    if (radius < maxRadius) {
      alpha = radius / maxRadius;
    }

    // push the same color 6 times
    for (let i = 0; i < 6; i++) {
      color.setVertex(cosmetic.landRgb, this.verts + i);
      color2.setVertex(cosmetic.oceanRgb, this.verts + i);
      color3.setVertex(cosmetic.beachRgb, this.verts + i);
      props.setVertex(planetProps, this.verts + i);
      props2.setVertex([cosmetic.seed, eps, alpha, distort], this.verts + i);
    }

    this.verts += 6;
  }

  public queuePlanetBody(planet: Planet, centerW: WorldCoords, radiusW: number): void {
    const center = Viewport.getInstance().worldToCanvasCoords(centerW);
    const radius = Viewport.getInstance().worldToCanvasDist(radiusW);

    const x1 = center.x - radius;
    const y1 = center.y - radius;
    const x2 = center.x + radius;
    const y2 = center.y + radius;

    this.queuePlanetBodyScreen(planet, radius, x1, y1, x2, y2);
  }
}
