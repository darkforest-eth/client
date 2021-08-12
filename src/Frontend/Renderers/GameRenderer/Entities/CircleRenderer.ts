import { WorldCoords } from '@darkforest_eth/types';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import Viewport from '../../../Game/Viewport';
import { engineConsts } from '../EngineConsts';
import { RGBAVec } from '../EngineTypes';
import EngineUtils from '../EngineUtils';
import { CIRCLE_PROGRAM_DEFINITION } from '../Programs/CircleProgram';
import { GameGLManager } from '../WebGL/GameGLManager';
import { GenericRenderer } from '../WebGL/GenericRenderer';

export default class CircleRenderer extends GenericRenderer<typeof CIRCLE_PROGRAM_DEFINITION> {
  quadBuffer: number[];

  viewport: Viewport;

  constructor(manager: GameGLManager) {
    super(manager, CIRCLE_PROGRAM_DEFINITION);
    this.viewport = Viewport.getInstance();
    this.quadBuffer = EngineUtils.makeEmptyDoubleQuad();
  }

  public queueCircle(
    center: CanvasCoords,
    radius: number,
    color: RGBAVec = [255, 0, 0, 255],
    stroke = -1,
    angle = 1, // percent of arc to render
    dashed = false
  ): void {
    const { position: posA, color: colorA, props: propsA, eps: epsA } = this.attribManagers;
    const { x, y } = center;
    // 1 on either side for antialiasing
    const r = radius + (stroke > 0 ? 2 : 1);

    const { x1, y1 } = { x1: x - r, y1: y - r };
    const { x2, y2 } = { x2: x + r, y2: y + r };

    // prettier-ignore
    EngineUtils.makeDoubleQuadBuffered(
      this.quadBuffer,
      x1, y1, x2, y2, -1, -1, 1, 1
    );

    posA.setVertex(this.quadBuffer, this.verts);

    const strokePct = stroke / radius;

    // convert pixels to radians
    const interval = engineConsts.dashLength;
    const pixPerRad = radius;

    const dashRad = interval / pixPerRad;
    const dash = dashed ? dashRad : -1;

    const eps = 1 / radius;

    for (let i = 0; i < 6; i++) {
      colorA.setVertex(color, this.verts + i);
      propsA.setVertex([strokePct, angle, dash], this.verts + i);
      epsA.setVertex([eps], this.verts + i);
    }

    this.verts += 6;
  }

  public queueCircleWorld(
    center: WorldCoords,
    radius: number, // world coords
    color: RGBAVec = [255, 0, 0, 255],
    stroke = -1,
    angle = 1,
    dashed = false
  ) {
    const centerCanvas = this.viewport.worldToCanvasCoords(center);
    const rCanvas = this.viewport.worldToCanvasDist(radius);
    this.queueCircle(centerCanvas, rCanvas, color, stroke, angle, dashed);
  }

  // only convert center to world coords
  // only used for voyages right now
  public queueCircleWorldCenterOnly(
    center: WorldCoords,
    radius: number, // canvas coords
    color: RGBAVec = [255, 0, 0, 255]
  ) {
    const centerCanvas = this.viewport.worldToCanvasCoords(center);
    this.queueCircle(centerCanvas, radius, color);
  }

  public setUniforms() {
    this.uniformSetters.matrix(this.manager.projectionMatrix);
  }
}
