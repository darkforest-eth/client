import type { LocationId } from '@darkforest_eth/types';
import { engineConsts } from '../EngineConsts';
import { RenderZIndex } from '../EngineTypes';
import Renderer from '../Renderer';

const { purpleA } = engineConsts.colors;

export class WormholeRenderer {
  renderer: Renderer;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  queueWormholes() {
    const { gameUIManager } = this.renderer;

    for (const unconfirmedWormhole of gameUIManager.getUnconfirmedWormholeActivations()) {
      if (unconfirmedWormhole.wormholeTo)
        this.drawVoyagePath(unconfirmedWormhole.locationId, unconfirmedWormhole.wormholeTo, false);
    }

    for (const wormhole of gameUIManager.getWormholes()) {
      this.drawVoyagePath(wormhole.from, wormhole.to, true);
    }
  }

  private drawVoyagePath(from: LocationId, to: LocationId, confirmed: boolean) {
    const { gameUIManager } = this.renderer;

    const fromLoc = gameUIManager.getLocationOfPlanet(from);
    const fromPlanet = gameUIManager.getPlanetWithId(from);
    const toLoc = gameUIManager.getLocationOfPlanet(to);
    const toPlanet = gameUIManager.getPlanetWithId(to);
    if (!fromPlanet || !fromLoc || !toLoc || !toPlanet) {
      return;
    }

    this.renderer.lineRenderer.queueLineWorld(
      fromLoc.coords,
      toLoc.coords,
      purpleA,
      confirmed ? 2 : 1,
      RenderZIndex.Voyages,
      confirmed ? false : true
    );
  }
}
