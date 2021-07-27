import { Planet, WorldCoords } from '@darkforest_eth/types';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import Viewport from '../../../Game/Viewport';
import EngineUtils from '../EngineUtils';
import { BLACKDOMAIN_PROGRAM_DEFINITION } from '../Programs/BlackDomainProgram';
import { GameGLManager } from '../WebGL/GameGLManager';
import { GenericRenderer } from '../WebGL/GenericRenderer';

/** Renders a shadow-type thing over destroyed planets */
export default class BlackDomainRenderer extends GenericRenderer<
  typeof BLACKDOMAIN_PROGRAM_DEFINITION
> {
  quad3Buffer: number[];
  quad2Buffer: number[];

  constructor(manager: GameGLManager) {
    super(manager, BLACKDOMAIN_PROGRAM_DEFINITION);

    this.quad3Buffer = EngineUtils.makeEmptyQuad();
    this.quad2Buffer = EngineUtils.makeQuadVec2(-1, 1, 1, -1);
  }

  public queueBlackDomainScreen(_planet: Planet, center: CanvasCoords, radius: number, z: number) {
    const { position, rectPos } = this.attribManagers;

    const r = radius * 1.2;

    const x1 = center.x - r;
    const y1 = center.y - r;
    const x2 = center.x + r;
    const y2 = center.y + r;

    EngineUtils.makeQuadBuffered(this.quad3Buffer, x1, y1, x2, y2, z);
    position.setVertex(this.quad3Buffer, this.verts);
    rectPos.setVertex(this.quad2Buffer, this.verts);

    this.verts += 6;
  }

  public queueBlackDomain(planet: Planet, centerW: WorldCoords, radiusW: number): void {
    const center = Viewport.getInstance().worldToCanvasCoords(centerW);
    const radius = Viewport.getInstance().worldToCanvasDist(radiusW);
    const z = EngineUtils.getPlanetZIndex(planet);

    this.queueBlackDomainScreen(planet, center, radius, z);
  }

  public setUniforms() {
    this.uniformSetters.matrix(this.manager.projectionMatrix);

    const time = EngineUtils.getNow();
    this.uniformSetters.now(time / 6);
  }
}
