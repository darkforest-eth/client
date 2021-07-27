import { PerlinConfig } from '@darkforest_eth/hashing';
import { Chunk, Rectangle } from '../../../../_types/global/GlobalTypes';
import Viewport from '../../../Game/Viewport';
import { Vec3 } from '../EngineTypes';
import EngineUtils from '../EngineUtils';
import { PERLIN_PROGRAM_DEFINITION } from '../Programs/PerlinProgram';
import AttribManager from '../WebGL/AttribManager';
import { GameGLManager } from '../WebGL/GameGLManager';
import { GenericRenderer } from '../WebGL/GenericRenderer';
import {
  getCachedGradient,
  getGridPoint,
  getPerlinChunks,
  PerlinOctave,
  right,
  up,
  valueOf,
} from './PerlinUtils';
import RectRenderer from './RectRenderer';

export class PerlinRenderer extends GenericRenderer<typeof PERLIN_PROGRAM_DEFINITION> {
  manager: GameGLManager;
  config: PerlinConfig;

  posBuffer: number[];
  coordsBuffer: number[];

  rectRenderer: RectRenderer | undefined;

  thresholds: Vec3;

  constructor(
    manager: GameGLManager,
    config: PerlinConfig,
    thresholds: [number, number, number],
    rectRenderer: RectRenderer | undefined = undefined
  ) {
    super(manager, PERLIN_PROGRAM_DEFINITION);
    this.config = config;
    this.rectRenderer = rectRenderer;

    this.posBuffer = EngineUtils.makeEmptyQuadVec2();
    this.coordsBuffer = EngineUtils.makeEmptyQuadVec2();

    this.thresholds = thresholds;
  }

  private bufferGradients(
    rect: Rectangle,
    octave: PerlinOctave,
    topGrad: AttribManager,
    botGrad: AttribManager
  ) {
    const { scale } = this.config;
    const { bottomLeft } = rect;
    const octaveScale = scale * 2 ** octave;

    const gridPoint = getGridPoint(bottomLeft, octaveScale);

    const botLeft = gridPoint;
    const botRight = right(botLeft, octaveScale);
    const topLeft = up(botLeft, octaveScale);
    const topRight = right(up(botLeft, octaveScale), octaveScale);

    const botLeftGrad = getCachedGradient(botLeft, this.config, octave);
    const botRightGrad = getCachedGradient(botRight, this.config, octave);
    const topLeftGrad = getCachedGradient(topLeft, this.config, octave);
    const topRightGrad = getCachedGradient(topRight, this.config, octave);

    // technically we should buffer this
    const topGradVals = [...valueOf(topLeftGrad), ...valueOf(topRightGrad)];
    const botGradVals = [...valueOf(botLeftGrad), ...valueOf(botRightGrad)];

    for (let i = 0; i < 6; i++) {
      topGrad.setVertex(topGradVals, this.verts + i);
      botGrad.setVertex(botGradVals, this.verts + i);
    }
  }

  private queueRect(rect: Rectangle): void {
    const { bottomLeft } = rect;

    // get info
    const { sideLength } = rect;
    const { x: xW, y: yW } = bottomLeft;

    const viewport = Viewport.getInstance();
    const { x: xC, y: yC } = viewport.worldToCanvasCoords(bottomLeft);
    const dim = viewport.worldToCanvasDist(sideLength);
    const { x1, y1 } = { x1: xC, y1: yC - dim };
    const { x2, y2 } = { x2: xC + dim, y2: yC };

    // queue it
    const {
      position: posA,
      p0topGrad,
      p0botGrad,
      p1topGrad,
      p1botGrad,
      p2topGrad,
      p2botGrad,
      worldCoords: worldCoordsA,
    } = this.attribManagers;

    EngineUtils.makeQuadVec2Buffered(this.posBuffer, x1, y1, x2, y2);
    posA.setVertex(this.posBuffer, this.verts);

    EngineUtils.makeQuadVec2Buffered(this.coordsBuffer, xW, yW + sideLength, xW + sideLength, yW);
    worldCoordsA.setVertex(this.coordsBuffer, this.verts);

    this.bufferGradients(rect, PerlinOctave._0, p0topGrad, p0botGrad);
    this.bufferGradients(rect, PerlinOctave._1, p1topGrad, p1botGrad);
    this.bufferGradients(rect, PerlinOctave._2, p2topGrad, p2botGrad);

    this.verts += 6;
  }

  public queueChunk(chunk: Chunk) {
    // calculate gradients
    if (chunk.chunkFootprint.sideLength > this.config.scale) {
      const rects = getPerlinChunks(chunk.chunkFootprint, this.config.scale);
      for (const rect of rects) this.queueRect(rect);
    } else this.queueRect(chunk.chunkFootprint);
  }

  public setUniforms() {
    this.uniformSetters.matrix(this.manager.projectionMatrix);
    this.uniformSetters.lengthScale(this.config.scale);
    this.uniformSetters.thresholds(this.thresholds);
  }
}
