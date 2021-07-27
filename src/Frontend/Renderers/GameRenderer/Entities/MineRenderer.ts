import { MAX_PLANET_LEVEL } from '@darkforest_eth/constants';
import { Planet, WorldCoords } from '@darkforest_eth/types';
import Viewport from '../../../Game/Viewport';
import { engineConsts } from '../EngineConsts';
import EngineUtils from '../EngineUtils';
import { WebGLManager } from '../WebGL/WebGLManager';
import BeltRenderer from './BeltRenderer';
import { MineBodyRenderer } from './MineBodyRenderer';

export class MineRenderer {
  mineBodyRenderer: MineBodyRenderer;
  beltRenderer: BeltRenderer;

  constructor(manager: WebGLManager) {
    this.mineBodyRenderer = new MineBodyRenderer(manager);
    this.beltRenderer = new BeltRenderer(manager);
  }

  public queueMineScreen(planet: Planet, centerW: WorldCoords, radiusW: number, z: number) {
    const {
      white,
      belt: { silver },
    } = engineConsts.colors;

    this.mineBodyRenderer.queueMineScreen(planet, centerW, radiusW, z);
    const level = planet.planetLevel;

    const now = EngineUtils.getNow() * 0.3;

    if (level >= 1)
      this.beltRenderer.queueBeltAtIdx(planet, centerW, radiusW, white, 0, now * 0.5, true);
    if (level >= 3)
      this.beltRenderer.queueBeltAtIdx(planet, centerW, radiusW, white, 0, -now * 0.5, true);
    if (level >= 5)
      this.beltRenderer.queueBeltAtIdx(planet, centerW, radiusW, white, 0, -now * 0.3, true);
    if (level >= 7)
      this.beltRenderer.queueBeltAtIdx(planet, centerW, radiusW, white, 0, now * 0.3, true);
    if (level === MAX_PLANET_LEVEL) {
      this.beltRenderer.queueBeltAtIdx(planet, centerW, radiusW, silver, 2, 0, true);
    }
  }

  public queueMine(planet: Planet, centerW: WorldCoords, radiusW: number) {
    const center = Viewport.getInstance().worldToCanvasCoords(centerW);
    const radius = Viewport.getInstance().worldToCanvasDist(radiusW);
    const z = EngineUtils.getPlanetZIndex(planet);

    this.queueMineScreen(planet, center, radius, z);
  }

  public flush() {
    this.beltRenderer.flush();
    this.mineBodyRenderer.flush();
  }

  public setUniforms() {
    this.mineBodyRenderer.setUniforms();
    this.beltRenderer.setUniforms();
  }
}
