import { LocatablePlanet, LocationId, PlanetLevel, WorldCoords } from '@darkforest_eth/types';
import Viewport from '../../Frontend/Game/Viewport';
import { ExploredChunkData, isLocatable } from '../../_types/global/GlobalTypes';
import GameManager from './GameManager';
import GameUIManager from './GameUIManager';

export interface PlanetRenderInfo {
  planet: LocatablePlanet;
  radii: Radii;
}

export interface Radii {
  radiusWorld: number;
  radiusPixels: number;
}

/**
 * Efficiently calculates which planets are in the viewport, and allows you to find the nearest
 * visible planet to the mouse.
 */
export class ViewportEntities {
  private readonly gameManager: GameManager;
  private readonly uiManager: GameUIManager;

  private cachedExploredChunks: Set<ExploredChunkData> = new Set();
  private cachedPlanets: Map<LocationId, PlanetRenderInfo> = new Map();
  private cachedPlanetsAsList: PlanetRenderInfo[] = [];

  public constructor(gameManager: GameManager, gameUIManager: GameUIManager) {
    this.gameManager = gameManager;
    this.uiManager = gameUIManager;
  }

  public getPlanetsAndChunks() {
    this.updateLocationsAndChunks();

    return {
      chunks: this.cachedExploredChunks,
      cachedPlanets: this.cachedPlanets,
    };
  }

  private updateLocationsAndChunks() {
    const viewport = Viewport.getInstance();
    this.recalculateViewportPlanets(viewport);
    this.recalculateViewportChunks(viewport);
  }

  private recalculateViewportChunks(viewport: Viewport) {
    if (this.uiManager.getIsHighPerfMode()) {
      return;
    }

    const chunks = new Set<ExploredChunkData>();

    for (const exploredChunk of this.uiManager.getExploredChunks()) {
      if (viewport.intersectsViewport(exploredChunk)) {
        chunks.add(exploredChunk);
      }
    }

    this.cachedExploredChunks = chunks;
  }

  private recalculateViewportPlanets(viewport: Viewport) {
    this.cachedPlanets.clear();

    const radii = this.getPlanetRadii(viewport);

    const planetsInViewport = this.gameManager.getPlanetsInWorldRectangle(
      viewport.getViewportPosition().x - viewport.widthInWorldUnits / 2,
      viewport.getViewportPosition().y - viewport.heightInWorldUnits / 2,
      viewport.widthInWorldUnits,
      viewport.heightInWorldUnits,
      this.getVisiblePlanetLevels(viewport),
      radii,
      true
    );

    const selectedPlanet = this.uiManager.getSelectedPlanet();

    if (selectedPlanet && isLocatable(selectedPlanet)) {
      planetsInViewport.push(selectedPlanet);
    }

    planetsInViewport.forEach((planetInGameManager) => {
      if (planetInGameManager) {
        this.cachedPlanets.set(planetInGameManager.locationId, {
          planet: planetInGameManager,
          radii: radii.get(planetInGameManager.planetLevel) as Radii,
        });
      }
    });

    this.cachedPlanetsAsList = Array.from(this.cachedPlanets.values());
  }

  /**
   * Gets the planet that is closest to the given coordinates. Filters out irrelevant planets
   * using the `radiusMap` parameter, which specifies how close a planet must be in order to
   * be returned from this function, given that planet's level. Smaller planets have a smaller
   * radius, and larger planets have a larger radius.
   *
   * If a smaller and a larger planet are both within respective radii of coords, the smaller
   * planet is returned.
   */
  public getNearestVisiblePlanet(coords: WorldCoords): LocatablePlanet | undefined {
    const radii = this.getPlanetRadii(Viewport.getInstance());
    let bestPlanet: LocatablePlanet | undefined;

    for (const planetInfo of this.cachedPlanetsAsList) {
      const planet = planetInfo.planet;
      const distThreshold = radii.get(planet.planetLevel)?.radiusWorld as number;

      if (
        Math.abs(coords.x - planet.location.coords.x) <= distThreshold &&
        Math.abs(coords.y - planet.location.coords.y) <= distThreshold
      ) {
        if (!bestPlanet || bestPlanet.planetLevel > planet.planetLevel) {
          bestPlanet = planet;
        }
      }
    }

    return bestPlanet;
  }

  /**
   * One entry per planet level - radius in screen pixels of that planet level given the current
   * viewport configuration, as well as the world radius.
   */
  private getPlanetRadii(viewport: Viewport): Map<PlanetLevel, Radii> {
    const result = new Map();

    for (let i = PlanetLevel.MIN; i <= PlanetLevel.MAX; i++) {
      const radiusWorld = this.uiManager.getRadiusOfPlanetLevel(i as PlanetLevel);
      const radiusPixels = viewport.worldToCanvasDist(radiusWorld);

      result.set(i, { radiusWorld, radiusPixels });
    }

    return result;
  }

  /**
   * Returns a list of planet levels which, when rendered, would result in a planet that has a size
   * larger than one pixel.
   */
  private getVisiblePlanetLevels(viewport: Viewport) {
    const result = [];

    for (let i = 0; i <= PlanetLevel.MAX; i++) {
      const radiusW = this.uiManager.getRadiusOfPlanetLevel(i as PlanetLevel);
      const radiusPx = viewport.worldToCanvasDist(radiusW);

      if (radiusPx >= 1) {
        result.push(i);
      }
    }

    return result;
  }
}
