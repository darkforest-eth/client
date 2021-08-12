import { PerlinConfig } from '@darkforest_eth/hashing';
import { SpaceType } from '@darkforest_eth/types';
import { Chunk } from '../../../../_types/global/GlobalTypes';
import Viewport from '../../../Game/Viewport';
import { RGBVec } from '../EngineTypes';
import Renderer from '../Renderer';
import { GameGLManager } from '../WebGL/GameGLManager';
import { PerlinRenderer } from './PerlinRenderer';
import RectRenderer from './RectRenderer';

export default class BackgroundRenderer {
  manager: GameGLManager;
  renderer: Renderer;

  perlinRenderer: PerlinRenderer;
  borderRenderer: RectRenderer;

  constructor(manager: GameGLManager, config: PerlinConfig, thresholds: [number, number, number]) {
    this.manager = manager;
    this.renderer = manager.renderer;

    const rectRenderer = new RectRenderer(manager);
    this.borderRenderer = rectRenderer;
    this.perlinRenderer = new PerlinRenderer(manager, config, thresholds, rectRenderer);
  }

  drawChunks(
    exploredChunks: Iterable<Chunk>,
    highPerfMode: boolean,
    drawChunkBorders: boolean
  ): void {
    // upload current camera transform to shader
    if (highPerfMode) return;

    /* draw using mask program */
    const viewport = Viewport.getInstance();

    for (const exploredChunk of exploredChunks) {
      if (viewport.intersectsViewport(exploredChunk)) {
        // add this chunk to the verts array
        this.perlinRenderer.queueChunk(exploredChunk);

        if (drawChunkBorders) {
          this.borderRenderer.queueChunkBorder(exploredChunk);
          // this.renderer.overlay2dRenderer.drawChunk(exploredChunk);
        }
      }
    }

    this.flush();
  }

  fillPerlin() {
    const {
      canvas: { width, height },
      ctx,
    } = this.renderer.overlay2dRenderer;

    const { gameUIManager } = this.renderer;
    const viewport = Viewport.getInstance();

    ctx.globalAlpha = 0.5;
    for (let x = 0; x < width; x += 100) {
      for (let y = 0; y < height; y += 100) {
        const worldCoords = viewport.canvasToWorldCoords({ x, y });

        const space = gameUIManager.spaceTypeFromPerlin(
          gameUIManager.getSpaceTypePerlin(worldCoords, false)
        );

        let color: RGBVec = [255, 0, 0];
        // if (space === SpaceType.NEBULA) ctx.fillStyle = '#ff0000';
        if (space === SpaceType.SPACE) color = [0, 255, 0];
        if (space === SpaceType.DEEP_SPACE) color = [0, 0, 255];
        if (space === SpaceType.DEAD_SPACE) color = [0, 255, 0];

        // ctx.beginPath();
        // ctx.fillRect(x, y, 20, 20);

        this.borderRenderer.queueRect({ x, y }, 20, 20, color);
      }
    }

    ctx.globalAlpha = 1.0;
  }

  flush(): void {
    this.perlinRenderer.flush();
    this.borderRenderer.flush();
  }
}
