import { MAX_PLANET_LEVEL, MIN_PLANET_LEVEL } from '@darkforest_eth/constants';
import { isLocatable } from '@darkforest_eth/gamelogic';
import {
  Chunk,
  LocatablePlanet,
  LocationId,
  PlanetLevel,
  PlanetRenderInfo,
  Radii,
  WorldCoords,
} from '@darkforest_eth/types';
import Viewport from '../../Frontend/Game/Viewport';
import { planetLevelToAnimationSpeed, sinusoidalAnimation } from '../Utils/Animation';
import GameManager from './GameManager';
import GameUIManager from './GameUIManager';

/**
 * Efficiently calculates which planets are in the viewport, and allows you to find the nearest
 * visible planet to the mouse.
 */
export class ViewportEntities {
  private readonly gameManager: GameManager;
  private readonly uiManager: GameUIManager;

  private cachedExploredChunks: Set<Chunk> = new Set();
  private cachedPlanets: Map<LocationId, PlanetRenderInfo> = new Map();

  public constructor(gameManager: GameManager, gameUIManager: GameUIManager) {
    this.gameManager = gameManager;
    this.uiManager = gameUIManager;
    this.startRefreshing();
  }

  public startRefreshing() {
    setInterval(() => {
      this.loadPlanetMessages();
    }, 10 * 1000);
  }

  public getPlanetsAndChunks() {
    this.updateLocationsAndChunks();

    for (const p of this.cachedPlanets.values()) {
      p.planet.emojiBobAnimation?.update();
      p.planet.emojiZoopAnimation?.update();
    }

    return {
      chunks: this.cachedExploredChunks,
      cachedPlanets: this.cachedPlanets,
    };
  }

  private updateLocationsAndChunks() {
    const viewport = Viewport.getInstance();
    this.recalculateViewportPlanets(viewport);
    this.recalculateViewportChunks(viewport);

    this.uiManager.updateDiagnostics((d) => {
      d.visibleChunks = this.cachedExploredChunks.size;
      d.visiblePlanets = this.cachedPlanets.size;
      d.totalPlanets = this.gameManager.getGameObjects().getAllPlanetsMap().size;
    });
  }

  private recalculateViewportChunks(viewport: Viewport) {
    if (this.uiManager.getIsHighPerfMode()) {
      return;
    }

    const chunks = new Set<Chunk>();

    for (const exploredChunk of this.uiManager.getExploredChunks()) {
      if (
        viewport.intersectsViewport(exploredChunk) &&
        viewport.worldToCanvasDist(exploredChunk.chunkFootprint.sideLength) >= 3
      ) {
        chunks.add(exploredChunk);
      }
    }

    this.cachedExploredChunks = chunks;
  }

  private async loadPlanetMessages() {
    const planetIds = [];
    for (const p of this.cachedPlanets.values()) {
      // by definition, only planets that are owned can have planet messages on them, so they must
      // also be 'in the contract'
      if (p.planet.isInContract) {
        planetIds.push(p.planet.locationId);
      }
    }

    this.gameManager.refreshServerPlanetStates(planetIds);
  }

  private recalculateViewportPlanets(viewport: Viewport) {
    const radii = this.getPlanetRadii(Viewport.getInstance());

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

    this.replacePlanets(planetsInViewport);
  }

  private replacePlanets(newPlanetsInViewport: LocatablePlanet[]) {
    const radii = this.getPlanetRadii(Viewport.getInstance());
    const planetsToRemove = new Set(Array.from(this.cachedPlanets.keys()));

    newPlanetsInViewport.forEach((planet: LocatablePlanet) => {
      planetsToRemove.delete(planet.locationId);

      const newPlanetInfo: PlanetRenderInfo = {
        planet: planet,
        radii: radii.get(planet.planetLevel) as Radii,
      };

      if (!planet.emojiBobAnimation) {
        planet.emojiBobAnimation = sinusoidalAnimation(
          planetLevelToAnimationSpeed(planet.planetLevel)
        );
      }

      this.cachedPlanets.set(planet.locationId, newPlanetInfo);
    });

    for (const toRemove of planetsToRemove) {
      this.cachedPlanets.delete(toRemove);
      const planet = this.cachedPlanets.get(toRemove);
      if (planet) {
        planet.planet.emojiBobAnimation = undefined;
      }
    }
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

    for (const planetInfo of this.cachedPlanets.values()) {
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

    for (let i = MIN_PLANET_LEVEL; i <= MAX_PLANET_LEVEL; i++) {
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

    const viewportWidthPx = viewport.worldToCanvasDist(viewport.getViewportWorldWidth());
    const minPlanetSize = viewportWidthPx > 40_000 ? 3 : 1;

    for (let i = 0; i <= MAX_PLANET_LEVEL; i++) {
      const radiusW = this.uiManager.getRadiusOfPlanetLevel(i as PlanetLevel);
      const radiusPx = viewport.worldToCanvasDist(radiusW);

      if (radiusPx >= minPlanetSize) {
        result.push(i);
      }
    }

    return result;
  }
}
