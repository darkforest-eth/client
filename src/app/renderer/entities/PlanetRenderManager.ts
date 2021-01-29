import { WorldCoords } from '../../../utils/Coordinates';
import { formatNumber, hasOwner, moveShipsDecay } from '../../../utils/Utils';
import {
  isLocatable,
  Planet,
  PlanetLevel,
  PlanetResource,
} from '../../../_types/global/GlobalTypes';
import Viewport from '../../board/Viewport';
import CanvasRenderer from '../CanvasRenderer';
import { engineConsts } from '../utils/EngineConsts';
import { Location } from '../../../_types/global/GlobalTypes';
import { RGBVec, TextAlign, TextAnchor } from '../utils/EngineTypes';
import { GameObjects } from '../../../api/GameObjects';
import { HatType } from '../../../utils/Hats';
import { ProcgenUtils } from '../../../utils/ProcgenUtils';
import EngineUtils from '../utils/EngineUtils';

const { whiteA, barbsA, gold } = engineConsts.colors;
const { maxRadius } = engineConsts.planet;
/* responsible for rendering planets by calling primitive renderers */

/*
  this guy is always going to call things in worldcoords, we'll convert them
  to CanvasCoords 
*/

export default class PlanetRenderManager {
  renderer: CanvasRenderer;

  constructor(renderer: CanvasRenderer) {
    this.renderer = renderer;
  }
  queueLocation(location: Location): void {
    const viewport = Viewport.getInstance();

    const { gameUIManager: uiManager, circleRenderer: cR } = this.renderer;

    /* check if we should skip it or not */
    // so we don't call getPlanetWithId, which triggers updates every second

    const isSelected =
      location.hash === uiManager.getSelectedPlanet()?.locationId;
    const level = uiManager.getPlanetLevel(location.hash);
    const isVeryBig = level && level >= PlanetLevel.MAX - 1;
    const forceShow = isSelected || isVeryBig;

    const planetDet = uiManager.getPlanetDetailLevel(location.hash);
    const viewDet = uiManager.getDetailLevel();
    if (planetDet === null) return;
    if (!forceShow && planetDet < viewDet) return;

    /* ok, now get the planet (and update it on the way) */
    const planet = uiManager.getPlanetWithId(location.hash);
    if (!planet) return;

    // world coords
    const radiusW = uiManager.getRadiusOfPlanetLevel(planet.planetLevel);

    const radius = viewport.worldToCanvasDist(radiusW);
    if (!forceShow && radius < 1) return;

    /* draw the planet */

    const centerW = location.coords;

    /* draw planet body */
    this.queuePlanetBody(planet, centerW, radiusW);
    this.queueAsteroids(planet, centerW, radiusW);
    this.queueBelt(planet, centerW, radiusW);

    /* draw hp bar */
    let cA = 1.0; // circle alpha
    if (radius < 2 * maxRadius) {
      cA *= radius / (2 * maxRadius);
    }

    if (hasOwner(planet)) {
      const color = uiManager.isOwnedByMe(planet)
        ? whiteA
        : ProcgenUtils.getOwnerColorVec(planet);

      color[3] = cA * 120;
      cR.queueCircleWorld(centerW, radiusW * 1.1, color, 0.5);
      const pct = planet.energy / planet.energyCap;
      color[3] = cA * 255;
      cR.queueCircleWorld(centerW, radiusW * 1.1, color, 2, pct);
    }

    /* draw hat */
    this.queueHat(planet, centerW, radiusW);

    /* draw text */
    // check if we should skip text
    // if (!forceShow && planetDet < viewDet + 1) return;

    let textAlpha = 255;
    if (radius < 2 * maxRadius) {
      // text alpha scales a bit faster
      textAlpha *= radius / (2 * maxRadius);
    }
    this.queuePlanetEnergyText(planet, centerW, radiusW, textAlpha);
    this.queuePlanetSilverText(planet, centerW, radiusW, textAlpha);

    /* queue artifact icon */
    this.queueArtifactIcon(planet, centerW, radiusW);
  }

  private queueArtifactIcon(
    planet: Planet,
    { x, y }: WorldCoords,
    radius: number
  ) {
    const { gameUIManager: uiManager } = this.renderer;

    const { canvasManager: cM, thumbRenderer: tR } = this.renderer;

    if (!isLocatable(planet)) return;
    const mineable = GameObjects.isPlanetMineable(planet);

    const iconLoc = { x: x - radius, y: y + radius };

    const id = planet.heldArtifactId;
    if (id) {
      const artifact = uiManager.getArtifactWithId(id);

      if (artifact) {
        tR.queueIconWorld(artifact, iconLoc, radius, 48);
      }
    } else if (mineable && !planet.hasTriedFindingArtifact) {
      const viewport = Viewport.getInstance();
      const screenRadius = viewport.worldToCanvasDist(radius);
      if (screenRadius > 15) cM.drawArtifactIcon(iconLoc);
    }
  }

  private queuePlanetSilverText(
    planet: Planet,
    center: WorldCoords,
    radius: number,
    alpha: number
  ) {
    const { textRenderer: tR } = this.renderer;
    // now draw silver
    const silver = planet ? Math.ceil(planet.silver) : 0;
    if (planet.silverGrowth > 0 || planet.silver > 0) {
      tR.queueTextWorld(
        formatNumber(silver),
        { x: center.x, y: center.y + 1.1 * radius + 0.75 },
        [...gold, alpha],
        0,
        TextAlign.Center,
        TextAnchor.Bottom
      );
    }
  }

  // calculates energy in that is queued to leave planet
  private getLockedEnergy(planet: Planet): number {
    let lockedEnergy = 0;
    for (const unconfirmedMove of planet.unconfirmedDepartures) {
      lockedEnergy += unconfirmedMove.forces;
    }

    return lockedEnergy;
  }

  // calculates attack value of mouse-drag action
  private getMouseAtk(): number | null {
    const { gameUIManager: uiManager } = this.renderer;

    const fromPlanet = uiManager.getMouseDownPlanet();
    const toPlanet = uiManager.getHoveringOverPlanet();

    const fromCoords = uiManager.getMouseDownCoords();
    const toCoords = uiManager.getHoveringOverCoords();

    if (!fromPlanet || !fromCoords || !toPlanet || !toCoords) return null;

    let effectiveEnergy = fromPlanet.energy;
    for (const unconfirmedMove of fromPlanet.unconfirmedDepartures) {
      effectiveEnergy -= unconfirmedMove.forces;
    }
    const shipsMoved =
      (uiManager.getForcesSending(fromPlanet.locationId) / 100) *
      effectiveEnergy;

    const dist = Math.sqrt(
      (fromCoords.x - toCoords.x) ** 2 + (fromCoords.y - toCoords.y) ** 2
    );

    const myAtk: number = moveShipsDecay(shipsMoved, fromPlanet, dist);
    return myAtk;
  }

  private queueBelt(planet: Planet, center: WorldCoords, radius: number) {
    const { beltRenderer } = this.renderer;
    let idx = 0;

    const { defense, range, speed } = engineConsts.colors.belt;

    for (let i = 0; i < planet.upgradeState[0]; i++) {
      beltRenderer.queueBeltAtIdx(planet, center, radius, defense, idx++);
    }
    for (let i = 0; i < planet.upgradeState[1]; i++) {
      beltRenderer.queueBeltAtIdx(planet, center, radius, range, idx++);
    }
    for (let i = 0; i < planet.upgradeState[2]; i++) {
      beltRenderer.queueBeltAtIdx(planet, center, radius, speed, idx++);
    }
  }

  private queuePlanetBody(
    planet: Planet,
    centerW: WorldCoords,
    radiusW: number
  ) {
    const { planetRenderer } = this.renderer;

    if (planet.planetResource === PlanetResource.SILVER) {
      this.queueSilverMine(planet, centerW, radiusW);
    } else {
      planetRenderer.queuePlanetBody(planet, centerW, radiusW);
    }
  }

  private queueSilverMine(
    planet: Planet,
    centerW: WorldCoords,
    radiusW: number
  ) {
    const {
      white,
      belt: { silver },
    } = engineConsts.colors;
    const { beltRenderer, mineRenderer } = this.renderer;

    mineRenderer.queueMine(planet, centerW, radiusW);
    const level = planet.planetLevel;

    const now = EngineUtils.getNow();

    const queue = (color: RGBVec, idx: number, angle: number) => {
      beltRenderer.queueBeltAtIdx(planet, centerW, radiusW, color, idx, angle);
    };
    if (level >= 2) queue(white, 0, now * 0.5);
    if (level >= 4) queue(white, 0, -now * 0.5);
    if (level >= 5) queue(white, 0, -now * 0.3);
    if (level >= 6) queue(white, 0, now * 0.3);
    if (level === PlanetLevel.MAX) {
      queue(silver, 2, 0);
    }
  }

  private queueAsteroids(planet: Planet, center: WorldCoords, radius: number) {
    const { asteroidRenderer: aR } = this.renderer;

    const { bonus } = engineConsts.colors;

    if (planet.bonus[0]) {
      aR.queueAsteroid(planet, center, radius, bonus.energyCap);
    }
    if (planet.bonus[1]) {
      aR.queueAsteroid(planet, center, radius, bonus.energyGro);
    }
    if (planet.bonus[2]) {
      aR.queueAsteroid(planet, center, radius, bonus.range);
    }
    if (planet.bonus[3]) {
      aR.queueAsteroid(planet, center, radius, bonus.speed);
    }
    if (planet.bonus[4]) {
      aR.queueAsteroid(planet, center, radius, bonus.defense);
    }
  }

  private queueHat(planet: Planet, center: WorldCoords, radius: number) {
    const { gameUIManager: uiManager } = this.renderer;
    const myRotation = 0;

    const hatLevel = planet.hatLevel;

    const cosmetic = ProcgenUtils.getPlanetCosmetic(planet);

    if (hatLevel > 0) {
      const hoverCoords = uiManager.getHoveringOverCoords();

      let bg = cosmetic.bgStr;
      let base = cosmetic.baseStr;
      if (cosmetic.hatType === HatType.SantaHat) {
        bg = 'red';
        base = 'white';
      }

      const hatScale = 1.65 ** (hatLevel - 1);
      this.renderer.canvasManager.drawHat(
        cosmetic.hatType,
        512,
        512,
        center,
        1.2 * radius * hatScale,
        1.2 * radius * hatScale,
        radius,
        myRotation,
        bg,
        base,
        hoverCoords
      );
    }
  }

  private queuePlanetEnergyText(
    planet: Planet,
    center: WorldCoords,
    radius: number,
    alpha: number
  ) {
    const { gameUIManager: uiManager, textRenderer: tR } = this.renderer;
    const energy = planet ? Math.ceil(planet.energy) : 0;
    const lockedEnergy = this.getLockedEnergy(planet);

    // construct base energy string
    let energyString = energy <= 0 ? '' : formatNumber(energy);
    if (lockedEnergy > 0) energyString += ` (-${formatNumber(lockedEnergy)})`;

    const playerColor = hasOwner(planet)
      ? ProcgenUtils.getOwnerColorVec(planet)
      : barbsA;
    const color = uiManager.isOwnedByMe(planet) ? whiteA : playerColor;
    color[3] = alpha;

    const textLoc: WorldCoords = {
      x: center.x,
      y: center.y - 1.1 * radius - 0.75,
    };

    tR.queueTextWorld(energyString, textLoc, color);

    // now display atk string
    const fromPlanet = uiManager.getMouseDownPlanet();
    const toPlanet = uiManager.getHoveringOverPlanet();

    const myAtk = this.getMouseAtk();

    const moveHereInProgress =
      myAtk &&
      fromPlanet?.locationId !== toPlanet?.locationId &&
      toPlanet?.locationId === planet.locationId;

    if (moveHereInProgress && myAtk && toPlanet) {
      let atkString = '';
      if (uiManager.isOwnedByMe(planet) || planet.energy === 0) {
        atkString += ` (+${formatNumber(myAtk)})`;
      } else {
        atkString += ` (-${formatNumber((myAtk * 100) / toPlanet.defense)})`;
      }

      tR.queueTextWorld(atkString, textLoc, color, 1);
    }
  }

  queuePlanets(planetLocations: Iterable<Location>): void {
    for (const location of planetLocations) {
      this.queueLocation(location);
    }
  }

  flush() {
    const {
      planetRenderer,
      asteroidRenderer,
      beltRenderer,
      mineRenderer,
      glManager: { gl },
    } = this.renderer;

    // we use depth testing here because it's super speedy for GPU sorting
    gl.enable(gl.DEPTH_TEST);
    planetRenderer.flush();
    asteroidRenderer.flush();
    beltRenderer.flush();
    mineRenderer.flush();
    gl.disable(gl.DEPTH_TEST);
  }
}
