import { Planet, WorldCoords } from '@darkforest_eth/types';
import autoBind from 'auto-bind';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import Viewport from '../../../Game/Viewport';
import { RGBVec } from '../EngineTypes';
import EngineUtils from '../EngineUtils';
import { BeltProps, BELT_PROGRAM_DEFINITION, propsFromIdx } from '../Programs/BeltProgram';
import { GenericRenderer } from '../WebGL/GenericRenderer';
import { WebGLManager } from '../WebGL/WebGLManager';

export default class BeltRenderer extends GenericRenderer<typeof BELT_PROGRAM_DEFINITION> {
  topRectPosBuffer: number[]; // 2d for rect pos
  botRectPosBuffer: number[]; // 2d for rect pos
  posBuffer: number[]; // 3d for writing actual pos

  constructor(manager: WebGLManager) {
    super(manager, BELT_PROGRAM_DEFINITION);

    this.topRectPosBuffer = EngineUtils.makeEmptyQuadVec2();
    this.botRectPosBuffer = EngineUtils.makeEmptyQuadVec2();
    this.posBuffer = EngineUtils.makeEmptyQuad();

    autoBind(this);
  }

  queueBeltWorld(
    centerW: CanvasCoords,
    radiusW: number, // screen coords
    color: RGBVec,
    l = 1, // number of radii length
    z = 0,
    delZ = 0,
    props: BeltProps = [10, 1, 1, 0.05],
    angle = 0
  ) {
    const viewport = Viewport.getInstance();

    const center = viewport.worldToCanvasCoords(centerW);
    const radius = viewport.worldToCanvasDist(radiusW);

    this.queueBelt(center, radius, color, l, z, delZ, props, angle);
  }

  queueBelt(
    center: CanvasCoords,
    radius: number, // screen coords
    color: RGBVec,
    l = 1, // number of radii length
    z = 0,
    delZ = 0,
    props: BeltProps = [10, 1, 1, 0.05],
    angle = 0
  ) {
    const { position: posA, rectPos: rectPosA, color: colorA, props: propsA } = this.attribManagers;

    EngineUtils.makeQuadVec2Buffered(this.topRectPosBuffer, -l, l, l, 0);
    EngineUtils.makeQuadVec2Buffered(this.botRectPosBuffer, -l, 0, l, -l);
    const sideLength = l * radius;

    const d1: [number, number] = [-sideLength, -sideLength];
    const d2: [number, number] = [+sideLength, +sideLength];

    const x1 = d1[0];
    const y1 = d1[1];
    const x2 = d2[0];
    const y2 = d2[1];

    // buffer top half
    EngineUtils.makeQuadBuffered(this.posBuffer, x1, y1, x2, 0, z + delZ);
    EngineUtils.rotateQuad(this.posBuffer, angle);
    EngineUtils.translateQuad(this.posBuffer, [center.x, center.y]);

    posA.setVertex(this.posBuffer, this.verts);
    rectPosA.setVertex(this.topRectPosBuffer, this.verts);

    for (let i = 0; i < 6; i++) {
      colorA.setVertex(color, this.verts + i);
      propsA.setVertex(props, this.verts + i);
    }
    this.verts += 6;

    // buffer bottom half
    EngineUtils.makeQuadBuffered(this.posBuffer, x1, 0, x2, y2, z - delZ);
    EngineUtils.rotateQuad(this.posBuffer, angle);
    EngineUtils.translateQuad(this.posBuffer, [center.x, center.y]);
    posA.setVertex(this.posBuffer, this.verts);
    rectPosA.setVertex(this.botRectPosBuffer, this.verts);

    for (let i = 0; i < 6; i++) {
      colorA.setVertex(color, this.verts + i);
      propsA.setVertex(props, this.verts + i);
    }

    this.verts += 6;
  }

  queueBeltAtIdx(
    planet: Planet,
    center: WorldCoords | CanvasCoords,
    radius: number,
    color: RGBVec,
    beltIdx: number,
    angle = 0,
    screen = false
  ) {
    const delZ = 0.01 * (beltIdx + 1);

    const props = propsFromIdx(beltIdx);
    const z = EngineUtils.getPlanetZIndex(planet);
    const l = 3.0 + beltIdx * 1.5;

    const queue = screen ? this.queueBelt : this.queueBeltWorld;

    queue(center, radius, color, l, z, delZ, props, angle);
  }

  public setUniforms() {
    this.uniformSetters.matrix(this.manager.projectionMatrix);
    this.uniformSetters.now(EngineUtils.getNow() / 2);
  }
}
