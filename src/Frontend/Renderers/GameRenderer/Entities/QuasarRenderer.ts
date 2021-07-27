import { Planet, WorldCoords } from '@darkforest_eth/types';
import { CanvasCoords } from '../../../../Backend/Utils/Coordinates';
import EngineUtils from '../EngineUtils';
import Renderer from '../Renderer';
import { WebGLManager } from '../WebGL/WebGLManager';
import { QuasarBodyRenderer } from './QuasarBodyRenderer';
import { QuasarRayRenderer } from './QuasarRayRenderer';

export class QuasarRenderer {
  manager: WebGLManager;
  renderer: Renderer;

  quasarBodyRenderer: QuasarBodyRenderer;
  quasarRayRendererTop: QuasarRayRenderer;
  quasarRayRendererBot: QuasarRayRenderer;

  constructor(manager: WebGLManager) {
    this.manager = manager;

    this.quasarBodyRenderer = new QuasarBodyRenderer(manager);
    this.quasarRayRendererTop = new QuasarRayRenderer(manager);
    this.quasarRayRendererBot = new QuasarRayRenderer(manager);
  }

  private getAngle(): number {
    return EngineUtils.getNow() * 0.5;
  }

  public queueQuasarScreen(planet: Planet, center: CanvasCoords, radius: number, z: number) {
    const angle = this.getAngle();
    this.quasarRayRendererBot.queueQuasarRayScreen(false, planet, center, radius, z, angle);
    this.quasarRayRendererTop.queueQuasarRayScreen(true, planet, center, radius, z, angle);
    this.quasarBodyRenderer.queueQuasarBodyScreen(planet, center, radius, z, angle);
  }

  public queueQuasar(planet: Planet, centerW: WorldCoords, radiusW: number) {
    const angle = this.getAngle();

    const z = EngineUtils.getPlanetZIndex(planet);
    this.quasarRayRendererBot.queueQuasarRay(false, planet, centerW, radiusW, z, angle);
    this.quasarRayRendererTop.queueQuasarRay(true, planet, centerW, radiusW, z, angle);
    this.quasarBodyRenderer.queueQuasarBody(planet, centerW, radiusW, z, angle);
  }

  public flush() {
    // order matters!
    this.quasarRayRendererBot.flush();
    this.quasarBodyRenderer.flush();
    this.quasarRayRendererTop.flush();
  }

  public setUniforms() {
    this.quasarRayRendererBot.setUniforms();
    this.quasarRayRendererTop.setUniforms();
    this.quasarBodyRenderer.setUniforms();
  }
}
