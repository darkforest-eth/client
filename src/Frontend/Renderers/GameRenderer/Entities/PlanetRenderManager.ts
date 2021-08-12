import { EMPTY_ADDRESS } from '@darkforest_eth/constants';
import {
  Artifact,
  LocatablePlanet,
  LocationId,
  Planet,
  PlanetType,
  WorldCoords,
} from '@darkforest_eth/types';
import { getRange } from '../../../../Backend/GameLogic/ArrivalUtils';
import { PlanetRenderInfo } from '../../../../Backend/GameLogic/ViewportEntities';
import { ProcgenUtils } from '../../../../Backend/Procedural/ProcgenUtils';
import { formatNumber, hasOwner } from '../../../../Backend/Utils/Utils';
import { isLocatable } from '../../../../_types/global/GlobalTypes';
import Viewport from '../../../Game/Viewport';
import { HatType } from '../../../Utils/Hats';
import { engineConsts } from '../EngineConsts';
import { TextAlign, TextAnchor } from '../EngineTypes';
import Renderer from '../Renderer';

const { whiteA, barbsA, gold } = engineConsts.colors;
const { maxRadius } = engineConsts.planet;

/**
 * this guy is always going to call things in worldcoords, we'll convert them
 * to CanvasCoords. responsible for rendering planets by calling primitive renderers
 */
export default class PlanetRenderManager {
  renderer: Renderer;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  queueLocation(renderInfo: PlanetRenderInfo, now: number, highPerfMode: boolean): void {
    const { gameUIManager: uiManager, circleRenderer: cR } = this.renderer;
    const planet = renderInfo.planet;
    const renderAtReducedQuality = renderInfo.radii.radiusPixels <= 5 && highPerfMode;
    const isHovering = uiManager.getHoveringOverPlanet()?.locationId === planet.locationId;
    const isSelected = uiManager.getSelectedPlanet()?.locationId === planet.locationId;

    let textAlpha = 255;
    if (renderInfo.radii.radiusPixels < 2 * maxRadius) {
      // text alpha scales a bit faster
      textAlpha *= renderInfo.radii.radiusPixels / (2 * maxRadius);
    }

    const artifacts = uiManager
      .getArtifactsWithIds(planet.heldArtifactIds)
      .filter((a) => !!a) as Artifact[];
    const color = uiManager.isOwnedByMe(planet) ? whiteA : ProcgenUtils.getOwnerColorVec(planet);

    // draw planet body
    this.queuePlanetBody(planet, planet.location.coords, renderInfo.radii.radiusWorld);
    this.queueAsteroids(planet, planet.location.coords, renderInfo.radii.radiusWorld);
    this.queueArtifactsAroundPlanet(
      planet,
      artifacts,
      planet.location.coords,
      renderInfo.radii.radiusWorld,
      now,
      textAlpha
    );

    this.queueRings(planet, planet.location.coords, renderInfo.radii.radiusWorld);

    // render black domain
    if (planet.destroyed) {
      this.queueBlackDomain(planet, planet.location.coords, renderInfo.radii.radiusWorld);
      return;
    }

    // draw hp bar
    let cA = 1.0; // circle alpha
    if (renderInfo.radii.radiusPixels < 2 * maxRadius) {
      cA *= renderInfo.radii.radiusPixels / (2 * maxRadius);
    }

    if (hasOwner(planet)) {
      color[3] = cA * 120;
      cR.queueCircleWorld(planet.location.coords, renderInfo.radii.radiusWorld * 1.1, color, 0.5);
      const pct = planet.energy / planet.energyCap;
      color[3] = cA * 255;
      cR.queueCircleWorld(
        planet.location.coords,
        renderInfo.radii.radiusWorld * 1.1,
        color,
        2,
        pct
      );
    }

    this.queueHat(planet, planet.location.coords, renderInfo.radii.radiusWorld);

    /* draw text */
    if (!renderAtReducedQuality) {
      this.queuePlanetEnergyText(
        planet,
        planet.location.coords,
        renderInfo.radii.radiusWorld,
        textAlpha
      );

      this.queuePlanetSilverText(
        planet,
        planet.location.coords,
        renderInfo.radii.radiusWorld,
        textAlpha
      );

      this.queueArtifactIcon(planet, planet.location.coords, renderInfo.radii.radiusWorld);
      this.drawPlanetMessages(
        renderInfo,
        planet.location.coords,
        renderInfo.radii.radiusWorld,
        isHovering ? 0.2 : textAlpha
      );
    }

    if (isHovering && !isSelected) {
      this.queueRangeRings(planet);
    }
  }

  private queueArtifactsAroundPlanet(
    planet: Planet,
    artifacts: Artifact[],
    centerW: WorldCoords,
    radiusW: number,
    now: number,
    alpha: number
  ) {
    const numArtifacts = artifacts.length;

    const MS_PER_ROTATION = 10 * 1000 * (planet.planetLevel + 1);
    const anglePerArtifact = (Math.PI * 2) / numArtifacts;
    const startingAngle = 0 - Math.PI / 2;
    const nowAngle = (Math.PI * 2 * (now % MS_PER_ROTATION)) / MS_PER_ROTATION;
    const artifactSize = 0.67 * radiusW;
    const distanceRadiusScale = 1.5;
    const distanceFromCenterOfPlanet = radiusW * distanceRadiusScale + artifactSize;

    for (let i = 0; i < artifacts.length; i++) {
      const x =
        Math.cos(anglePerArtifact * i + startingAngle + nowAngle) * distanceFromCenterOfPlanet +
        centerW.x;
      const y =
        Math.sin(anglePerArtifact * i + startingAngle + nowAngle) * distanceFromCenterOfPlanet +
        centerW.y;

      this.renderer.spriteRenderer.queueArtifactWorld(artifacts[i], { x, y }, artifactSize, alpha);
    }
  }

  private drawPlanetMessages(
    renderInfo: PlanetRenderInfo,
    coords: WorldCoords,
    radiusW: number,
    textAlpha: number
  ) {
    if (!renderInfo.planet.messages) return;
    const { overlay2dRenderer: cM } = this.renderer;
    cM.drawPlanetMessages(coords, radiusW, renderInfo, textAlpha);
  }

  private queueArtifactIcon(planet: Planet, { x, y }: WorldCoords, radius: number) {
    const { overlay2dRenderer: cM } = this.renderer;

    if (!isLocatable(planet)) return;
    const mineable = planet.planetType === PlanetType.RUINS;

    const iconLoc = { x: x - radius, y: y + radius };

    if (mineable && !planet.hasTriedFindingArtifact) {
      const viewport = Viewport.getInstance();
      const screenRadius = viewport.worldToCanvasDist(radius);
      const scale = Math.min(1, screenRadius / 20);
      if (screenRadius > 4) cM.drawArtifactIcon(iconLoc, scale);
    }
  }

  private queuePlanetSilverText(
    planet: Planet,
    center: WorldCoords,
    radius: number,
    alpha: number
  ) {
    const { textRenderer: tR } = this.renderer;
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
  private getMouseAtk(): number | undefined {
    const { gameUIManager: uiManager } = this.renderer;

    const fromPlanet = uiManager.getMouseDownPlanet();
    const toPlanet = uiManager.getHoveringOverPlanet();

    if (!fromPlanet || !toPlanet) return undefined;

    let effectiveEnergy = fromPlanet.energy;
    for (const unconfirmedMove of fromPlanet.unconfirmedDepartures) {
      effectiveEnergy -= unconfirmedMove.forces;
    }
    const shipsMoved = (uiManager.getForcesSending(fromPlanet.locationId) / 100) * effectiveEnergy;

    const myAtk: number = uiManager.getEnergyArrivingForMove(
      fromPlanet.locationId,
      toPlanet.locationId,
      undefined,
      shipsMoved
    );

    return myAtk;
  }

  private queueRings(planet: Planet, center: WorldCoords, radius: number) {
    const { ringRenderer } = this.renderer;
    let idx = 0;

    const { defense, range, speed } = engineConsts.colors.belt;

    for (let i = 0; i < planet.upgradeState[0]; i++) {
      ringRenderer.queueBeltAtIdx(planet, center, radius, defense, idx++);
    }
    for (let i = 0; i < planet.upgradeState[1]; i++) {
      ringRenderer.queueBeltAtIdx(planet, center, radius, range, idx++);
    }
    for (let i = 0; i < planet.upgradeState[2]; i++) {
      ringRenderer.queueBeltAtIdx(planet, center, radius, speed, idx++);
    }
  }

  private queuePlanetBody(planet: Planet, centerW: WorldCoords, radiusW: number) {
    const {
      quasarRenderer: qR,
      planetRenderer: pR,
      spacetimeRipRenderer: sR,
      ruinsRenderer: rR,
      mineRenderer: mR,
    } = this.renderer;

    const { planetType } = planet;

    if (planetType === PlanetType.SILVER_MINE) {
      mR.queueMine(planet, centerW, radiusW);
    } else if (planetType === PlanetType.TRADING_POST) {
      sR.queueRip(planet, centerW, radiusW);
    } else if (planetType === PlanetType.SILVER_BANK) {
      qR.queueQuasar(planet, centerW, radiusW);
    } else if (planetType === PlanetType.RUINS) {
      rR.queueRuins(planet, centerW, radiusW);
    } else {
      pR.queuePlanetBody(planet, centerW, radiusW);
    }
  }

  private queueBlackDomain(planet: Planet, center: WorldCoords, radius: number) {
    const { blackDomainRenderer: bR } = this.renderer;

    bR.queueBlackDomain(planet, center, radius);
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
    const hoveringPlanet = uiManager.getHoveringOverPlanet() !== undefined;
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
      this.renderer.overlay2dRenderer.drawHat(
        cosmetic.hatType,
        512,
        512,
        center,
        1.2 * radius * hatScale,
        1.2 * radius * hatScale,
        radius,
        myRotation,
        hoveringPlanet,
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

    const playerColor = hasOwner(planet) ? ProcgenUtils.getOwnerColorVec(planet) : barbsA;
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
      toPlanet?.locationId === planet.locationId &&
      !uiManager.getIsChoosingTargetPlanet();

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

  /**
   * Renders rings around planet that show how far sending the given percentage of this planet's
   * energy would be able to travel.
   */
  drawRangeAtPercent(planet: LocatablePlanet, pct: number) {
    const { circleRenderer: cR, textRenderer: tR } = this.renderer;
    const range = getRange(planet, pct);
    const {
      range: { dash },
    } = engineConsts.colors;
    cR.queueCircleWorld(planet.location.coords, range, [...dash, 255], 1, 1, true);
    tR.queueTextWorld(
      `${pct}%`,
      { x: planet.location.coords.x, y: planet.location.coords.y + range },
      [...dash, 255]
    );
  }

  /**
   * Renders three rings around the planet that show the player how far this planet can attack.
   */
  queueRangeRings(planet: LocatablePlanet) {
    const { circleRenderer: cR, gameUIManager, textRenderer: tR } = this.renderer;
    const {
      range: { energy },
    } = engineConsts.colors;
    const { x, y } = planet.location.coords;

    this.drawRangeAtPercent(planet, 100);
    this.drawRangeAtPercent(planet, 50);
    this.drawRangeAtPercent(planet, 25);

    if (planet.owner === EMPTY_ADDRESS) return;

    const percentForces = gameUIManager.getForcesSending(planet.locationId); // [0, 100]
    const forces = (percentForces / 100) * planet.energy;
    const scaledForces = (percentForces * planet.energy) / planet.energyCap;
    const range = getRange(planet, scaledForces);

    if (range > 1) {
      cR.queueCircleWorld({ x, y }, range, [...energy, 255], 1, 1, true);
      tR.queueTextWorld(
        `${formatNumber(forces)}`,
        { x, y: y + range },
        [...energy, 255],
        0,
        TextAlign.Center,
        TextAnchor.Bottom
      );
    }

    // so that it draws below the planets
    cR.flush();
  }

  queuePlanets(
    cachedPlanets: Map<LocationId, PlanetRenderInfo>,
    now: number,
    highPerfMode: boolean
  ): void {
    for (const entry of cachedPlanets.entries()) {
      this.queueLocation(entry[1], now, highPerfMode);
    }
  }

  flush() {
    const {
      planetRenderer,
      asteroidRenderer,
      beltRenderer,
      mineRenderer,
      quasarRenderer,
      spacetimeRipRenderer,
      ruinsRenderer,
      ringRenderer,
      blackDomainRenderer,
      glManager: { gl },
    } = this.renderer;

    // we use depth testing here because it's super speedy for GPU sorting
    gl.enable(gl.DEPTH_TEST);
    planetRenderer.flush();
    asteroidRenderer.flush();
    beltRenderer.flush();
    mineRenderer.flush();
    spacetimeRipRenderer.flush();
    ruinsRenderer.flush();
    ringRenderer.flush();
    gl.disable(gl.DEPTH_TEST);

    quasarRenderer.flush();
    blackDomainRenderer.flush();
  }
}
