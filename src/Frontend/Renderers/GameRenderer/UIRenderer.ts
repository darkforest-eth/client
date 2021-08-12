import { Planet, WorldCoords } from '@darkforest_eth/types';
import { engineConsts } from './EngineConsts';
import { RenderZIndex, RGBVec } from './EngineTypes';
import Renderer from './Renderer';

const { red, white, redA, whiteA, purpleA } = engineConsts.colors;

export class UIRenderer {
  renderer: Renderer;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  queueBorders() {
    const { circleRenderer, gameUIManager } = this.renderer;
    const radius = gameUIManager.getWorldRadius();
    whiteA[3] = 255;
    circleRenderer.queueCircleWorld({ x: 0, y: 0 }, radius, whiteA, 2);
  }

  queueMousePath() {
    const { gameUIManager: uiManager, lineRenderer: lR, textRenderer: tR } = this.renderer;
    const mouseDownPlanet = uiManager.getMouseDownPlanet();
    const loc = mouseDownPlanet
      ? uiManager.getLocationOfPlanet(mouseDownPlanet.locationId)
      : undefined;

    const to: WorldCoords | undefined = uiManager.getHoveringOverCoords();
    const from: WorldCoords | undefined = loc?.coords;
    const toPlanet = uiManager.getPlanetWithCoords(to);

    if (mouseDownPlanet && from && to) {
      if (uiManager.getIsChoosingTargetPlanet()) {
        lR.queueLineWorld(from, to, purpleA, 2, RenderZIndex.Voyages);
        tR.queueTextWorld(`Wormhole Target`, { x: to.x, y: to.y }, purpleA);
      } else {
        const myPlanet = uiManager.isOverOwnPlanet(from);
        if (myPlanet && to !== from) {
          lR.queueLineWorld(from, to, whiteA, 2, RenderZIndex.Voyages);

          let effectiveEnergy = myPlanet.energy;

          for (const unconfirmedMove of myPlanet.unconfirmedDepartures) {
            effectiveEnergy -= unconfirmedMove.forces;
          }

          const energy = (uiManager.getForcesSending(myPlanet.locationId) / 100) * effectiveEnergy;
          const distance = uiManager.getDistCoords(from, to);

          const myAtk: number = uiManager.getEnergyArrivingForMove(
            myPlanet.locationId,
            toPlanet?.locationId,
            distance,
            energy
          );

          if (!uiManager.getHoveringOverPlanet()) {
            const color = myAtk > 0 ? whiteA : redA;
            color[3] = 255;
            tR.queueTextWorld(`Energy: ${Math.round(myAtk)}`, { x: to.x, y: to.y }, color);
          }
        }
      }
    }
  }

  private queueRectAtPlanet(planet: Planet, coords: WorldCoords, color: RGBVec) {
    const { gameUIManager: uiManager, rectRenderer } = this.renderer;
    const sideLength = 2.3 * uiManager.getRadiusOfPlanetLevel(planet.planetLevel);

    rectRenderer.queueRectCenterWorld(coords, sideLength, sideLength, color, 2);
  }

  queueSelectedRect() {
    const { gameUIManager: uiManager } = this.renderer;
    const selectedCoords = uiManager.getSelectedCoords();
    const selectedPlanet = uiManager.getSelectedPlanet();
    if (!selectedPlanet || !selectedCoords) return;

    redA[3] = 255;
    this.queueRectAtPlanet(selectedPlanet, selectedCoords, red);
  }

  queueHoveringRect() {
    const { gameUIManager: uiManager, rectRenderer } = this.renderer;

    const hoverCoords = uiManager.getHoveringOverCoords();
    const hoverPlanet = uiManager.getHoveringOverPlanet();
    if (!hoverCoords) return;
    if (!hoverPlanet) {
      rectRenderer.queueRectCenterWorld(hoverCoords, 1, 1, white, 2);
    } else {
      this.queueRectAtPlanet(hoverPlanet, hoverCoords, white);
    }
  }

  drawMiner() {
    const { overlay2dRenderer } = this.renderer;
    overlay2dRenderer.drawMiner();
  }

  queueSelectedRangeRing() {
    const selectedPlanet = this.renderer.gameUIManager.getSelectedPlanet();
    const hoverPlanet = this.renderer.gameUIManager.getHoveringOverPlanet();
    selectedPlanet &&
      (!hoverPlanet || hoverPlanet?.locationId === selectedPlanet.locationId) &&
      this.renderer.planetRenderManager.queueRangeRings(selectedPlanet);
  }
}
