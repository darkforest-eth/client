/* eslint-disable */
/**
 * Below is a list of class definitions for renderers.
 * These are blank renderers as they have no functionality.
 * The result of using these renderers is the same as disabling the renderer.
 */
import {
  engineConsts,
  EngineUtils,
  GameGLManager,
  GenericRenderer,
  glsl,
//@ts-ignore
} from 'https://cdn.skypack.dev/@darkforest_eth/renderer';
import {
  AsteroidRendererType,
  AttribType,
  BackgroundRendererType,
  BeltRendererType,
  BlackDomainRendererType,
  CaptureZoneRendererType,
  CanvasCoords,
  Chunk,
  CircleRendererType,
  GameViewport,
  LineRendererType,
  LocatablePlanet,
  LocationId,
  MineBodyRendererType,
  MineRendererType,
  PerlinRendererType,
  Planet,
  PlanetRendererType,
  PlanetRenderInfo,
  PlanetRenderManagerType,
  QuasarBodyRendererType,
  QuasarRayRendererType,
  QuasarRendererType,
  RectRendererType,
  RenderedArtifact,
  RendererType,
  RGBAVec,
  RGBVec,
  RingRendererType,
  RuinsRendererType,
  SpaceRendererType,
  SpacetimeRipRendererType,
  SpriteRendererType,
  TextAlign,
  TextAnchor,
  TextRendererType,
  UIRendererType,
  UniformType,
  UnminedRendererType,
  VoyageRendererType,
  WorldCoords,
  WormholeRendererType,
//@ts-ignore
} from 'https://cdn.skypack.dev/@darkforest_eth/types';
//@ts-ignore
import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';

// Line 78 - 350: Blank Renderer
// Line 350 - 651: Circle Renderer
// Line 626 - End: Plugin
 



// Line 78 - 376
// "Blank" renderer class definitions
// When passing in these renderers into the Dark Forest API, the result would be the same as disabling that type of renderer.
 
class PlanetRenderer implements PlanetRendererType {
  rendererType = RendererType.Planet;
  queuePlanetBody(planet: Planet, centerW: WorldCoords, radiusW: number): void {}
  flush(): void {}
}

class MineRenderer implements MineRendererType {
  rendererType = RendererType.Mine;
  queueMine(planet: Planet, centerW: WorldCoords, radiusW: number): void {}
  flush(): void {}
}

class SpacetimeRipRenderer implements SpacetimeRipRendererType {
  rendererType = RendererType.SpacetimeRip;
  queueRip(planet: Planet, centerW: WorldCoords, radiusW: number): void {}
  flush(): void {}
}

class QuasarRenderer implements QuasarRendererType {
  rendererType = RendererType.Quasar;

  queueQuasar(planet: Planet, centerW: WorldCoords, radiusW: number): void {}
  flush(): void {}
}

class RuinsRenderer implements RuinsRendererType {
  rendererType = RendererType.Ruins;
  queueRuins(planet: Planet, centerW: WorldCoords, radiusW: number): void {}
  flush(): void {}
}
class AsteroidRenderer implements AsteroidRendererType {
  rendererType = RendererType.Asteroid;
  queueAsteroid(planet: Planet, centerW: CanvasCoords, radiusW: number, color?: RGBVec): void {}
  flush(): void {}
}

class RingRenderer implements RingRendererType {
  rendererType = RendererType.Ring;
  queueRingAtIdx(
    planet: Planet,
    centerW: WorldCoords,
    radiusW: number,
    color?: RGBVec,
    beltIdx?: number,
    angle?: number
  ): void {}
  flush(): void {}
}

class SpriteRenderer implements SpriteRendererType {
  rendererType = RendererType.Sprite;
  //drawing artifacts around world
  queueArtifactWorld(
    artifact: RenderedArtifact,
    posW: CanvasCoords,
    widthW: number,
    alpha?: number,
    atFrame?: number | undefined,
    color?: RGBVec | undefined,
    theta?: number | undefined,
    viewport?: GameViewport
  ): void {}
  //drawing artifacts when traveling with voyagers
  queueArtifact(
    artifact: RenderedArtifact,
    pos: CanvasCoords,
    width?: number,
    alpha?: number,
    atFrame?: number | undefined,
    color?: RGBVec | undefined,
    theta?: number | undefined
  ): void {}
  flush(): void {}
}

class BlackDomainRenderer implements BlackDomainRendererType {
  rendererType = RendererType.BlackDomain;
  queueBlackDomain(planet: Planet, centerW: WorldCoords, radiusW: number): void {}
  flush(): void {}
}

class TextRenderer implements TextRendererType {
  rendererType = RendererType.Text;
  queueTextWorld(
    text: string,
    coords: WorldCoords,
    color?: RGBAVec,
    offY?: number, // measured in text units - constant screen-coord offset that it useful for drawing nice things
    align?: TextAlign,
    anchor?: TextAnchor,
    zIdx?: number
  ): void {}
  flush(): void {}
}

class VoyageRenderer implements VoyageRendererType {
  rendererType = RendererType.Voyager;
  queueVoyages(): void {}
  flush(): void {}
}

class WormholeRenderer implements WormholeRendererType {
  rendererType = RendererType.Wormhole;
  queueWormholes(): void {}
  flush(): void {}
}

class MineBodyRenderer implements MineBodyRendererType {
  rendererType = RendererType.MineBody;
  queueMineScreen(planet: Planet, center: WorldCoords, radius: number, z: number): void {}
  flush(): void {}
  setUniforms(): void {}
}

class BeltRenderer implements BeltRendererType {
  rendererType = RendererType.Belt;
  queueBeltAtIdx(
    planet: Planet,
    center: WorldCoords | CanvasCoords,
    radius?: number,
    color?: RGBVec,
    beltIdx?: number,
    angle?: number,
    screen?: boolean
  ): void {}
  flush(): void {}
  setUniforms(): void {}
}

class BackgroundRenderer implements BackgroundRendererType {
  rendererType = RendererType.Background;
  queueChunks(
    exploredChunks: Iterable<Chunk>,
    highPerfMode: boolean,
    drawChunkBorders: boolean,
    disableFancySpaceEffect: boolean,
    innerNebulaColor?: string,
    nebulaColor?: string,
    spaceColor?: string,
    deepSpaceColor?: string,
    deadSpaceColor?: string
  ): void {}
  flush(): void {}
}

class SpaceRenderer implements SpaceRendererType {
  rendererType = RendererType.Space;
  queueChunk(chunk: Chunk): void {}
  setColorConfiguration(
    innerNebulaColor: string,
    nebulaColor: string,
    spaceColor: string,
    deepSpaceColor: string,
    deadSpaceColor: string
  ): void {}
  flush(): void {}
}

class UnminedRenderer implements UnminedRendererType {
  rendererType = RendererType.Unmined;
  queueRect(
    { x, y }: CanvasCoords,
    width: number,
    height: number,
    color: RGBVec,
    zIdx: number
  ): void {}
  flush(): void {}
}

class PerlinRenderer implements PerlinRendererType {
  rendererType = RendererType.Perlin;
  queueChunk(chunk: Chunk): void {}
  flush(): void {}
}

class LineRenderer implements LineRendererType {
  rendererType = RendererType.Line;
  queueLineWorld(
    start: WorldCoords,
    end: WorldCoords,
    color?: RGBAVec,
    width?: number,
    zIdx?: number,
    dashed?: boolean
  ): void {}
  flush(): void {}
}

class RectRenderer implements RectRendererType {
  rendererType = RendererType.Rect;
  queueRectCenterWorld(
    center: WorldCoords,
    width: number,
    height: number,
    color?: RGBVec,
    stroke?: number,
    zIdx?: number
  ): void {}
  flush(): void {}
}

class CircleRenderer implements CircleRendererType {
  rendererType = RendererType.Circle;
  queueCircleWorld(
    center: CanvasCoords,
    radius: number,
    color?: RGBAVec,
    stroke?: number,
    angle?: number, // percent of arc to render
    dashed?: boolean
  ): void {}
  queueCircleWorldCenterOnly(
    center: WorldCoords,
    radius: number, // canvas coords
    color?: RGBAVec
  ): void {}
  flush(): void {}
}

class UIRenderer implements UIRendererType {
  rendererType = RendererType.UI;
  queueBorders(): void {}
  queueSelectedRangeRing(): void {}
  queueSelectedRect(): void {}
  queueHoveringRect(): void {}
  queueMousePath(): void {}
  drawMiner(): void {}
  flush(): void {}
}

class PlanetRenderManager implements PlanetRenderManagerType {
  rendererType = RendererType.PlanetManager;
  queueRangeRings(planet: LocatablePlanet): void {}
  queuePlanets(
    cachedPlanets: Map<LocationId, PlanetRenderInfo>,
    now: number,
    highPerfMode: boolean,
    disableEmojis: boolean,
    disableHats: boolean
  ): void {}
  flush(): void {}
}

class QuasarBodyRenderer implements QuasarBodyRendererType {
  rendererType = RendererType.QuasarBody;
  queueQuasarBody(
    planet: Planet,
    centerW: WorldCoords,
    radiusW: number,
    z?: number,
    angle?: number
  ): void {}
  flush(): void {}
}

class QuasarRayRenderer implements QuasarRayRendererType {
  rendererType = RendererType.QuasarRay;
  queueQuasarRay(
    planet: Planet,
    centerW: WorldCoords,
    radiusW: number,
    z?: number,
    top?: boolean,
    angle?: number
  ): void {}
  flush(): void {}
}

class CaptureZoneRenderer implements CaptureZoneRendererType{
    rendererType = RendererType.CaptureZone;

    queueCaptureZones(): void {}

    flush(): void {} 
}

// line 350 - 351
// Circle Renderer Definitions using WebGl



// Program Definition
// A program is what we use to organizie the attributes and shaders of WebGl Programs
 
const u = {
  matrix: 'u_matrix', // matrix to convert from world coords to clipspace
};

const a = {
  position: 'a_position', // as [posx, posy, rectposx, rectposy]
  color: 'a_color',
  props: 'a_props', // as [stroke, angle, dash]
  eps: 'a_eps',
  planetInfo: 'a_planetInfo', //as [planetlevel, radius]
  PlanetUpgrades: 'a_planetUpgrades', //as [defense:number , range: number, speed: number]
  PlanetResources: 'a_planetResources', //as [energy:number , energy cap: number, silver: number, silver cap: number]
};

const GENERIC_PLANET_PROGRAM_DEFINITION = {
  uniforms: {
    matrix: { name: u.matrix, type: UniformType.Mat4 },
  },
  attribs: {
    position: {
      dim: 4,
      type: AttribType.Float,
      normalize: false,
      name: a.position,
    },
    eps: {
      dim: 1,
      type: AttribType.Float,
      normalize: false,
      name: a.eps,
    },
    color: {
      dim: 4,
      type: AttribType.UByte,
      normalize: true,
      name: a.color,
    },
    props: {
      dim: 2,
      type: AttribType.Float,
      normalize: false,
      name: a.props,
    },
    planetInfo: {
      dim: 2,
      type: AttribType.UByte,
      normalize: false,
      name: a.planetInfo,
    },
    planetUpgrades: {
      dim: 3,
      type: AttribType.UByte,
      normalize: false,
      name: a.PlanetUpgrades,
    },
    planetResources: {
      dim: 4,
      type: AttribType.UByte,
      normalize: false,
      name: a.PlanetResources,
    },
  },

  vertexShader: glsl`
          in vec4 a_position;
          in vec4 a_color;
          in vec2 a_props;
          in float a_eps;
          in vec2 a_planetInfo;
          in vec4 a_planetResources;
        
          uniform mat4 u_matrix;
        
          out float v_planetLevel;
          out vec4 v_color;
          out vec2 v_rectPos;
          out float v_angle;
          out float v_dash;
          out float v_eps;
          out float energy;
          out float energy_cap;
        
          void main() {
            gl_Position = u_matrix * vec4(a_position.xy, 0.0, 1.0);
        
            v_rectPos = a_position.zw;
            v_color = a_color;
            v_angle = a_props.x;
            v_dash = a_props.y;
            v_eps = a_eps;
            v_planetLevel = a_planetInfo[0];
            energy = a_planetResources[0];
            energy_cap = a_planetResources[1];
          }
          `,

  fragmentShader: glsl`
        #define PI 3.1415926535
        
        precision highp float;
        out vec4 outColor;
        
        in vec4 v_color;
        in vec2 v_rectPos;
        in float v_angle;
        in float v_dash;
        in float v_eps;
        in float v_planetLevel;
        in float energy;
        in float energy_cap;
        
        void main() {
          vec4 color = v_color;
          float dist = length(v_rectPos);
        
          if (dist > 1.0) discard; // if it's outside the circle
        
          // anti-aliasing if barely in the circle
          float ratio = (1.0 - dist) / v_eps;
          if (ratio < 1.) {
            color.a *= ratio;
          }
        
        
          /* get angle for both angle + dash checks */
          float angle = atan(v_rectPos.y, v_rectPos.x);
        
          // add 5pi/2 to translate it to [-PI/2, 3PI / 2]
          float check = angle + (5.0 * PI / 2.0);
          check -= (check > 2.0 * PI ? 2.0 * PI : 0.0);
          float pct = check / (2.0 * PI);
        
          /* do angle check */
        
          if (v_angle != 1.0 && pct > v_angle) discard;
        
          /* do dash check */
          bool isDash = v_dash > 0.0;
          float interval = angle / v_dash;
          float modulo = interval - 2.0 * floor(interval / 2.0);
          bool isGap = modulo > 1.0;
          if (isDash && isGap) discard;
        
          /* now draw it */
          outColor = vec4(1,1.0/energy_cap*energy,0,1);
        }
          `,
};
class CirclePlanetRenderer extends GenericRenderer<
  typeof GENERIC_PLANET_PROGRAM_DEFINITION,
  GameGLManager
> {
  quadBuffer: number[];

  viewport: GameViewport;
  rendererType: number;

  vertexShader: string;
  fragmentShader: string;

  manager: GameGLManager;

  constructor(glManager: GameGLManager, n: number) {
    super(glManager, GENERIC_PLANET_PROGRAM_DEFINITION);
    //@ts-ignore 
    this.verts = 0; //found in generic renderer

    this.manager = glManager;
    const { vertexShader: vert, fragmentShader: frag } = GENERIC_PLANET_PROGRAM_DEFINITION;
    this.vertexShader = vert;
    this.fragmentShader = frag;
    this.rendererType = n;
    this.viewport = this.manager.renderer.getViewport();
    this.quadBuffer = EngineUtils.makeEmptyDoubleQuad();
  }

  public queuePlanet(
    center: CanvasCoords,
    radius: number,
    planet: Planet,
    angle = 1, // percent of arc to render
    dashed = false
  ): void {
    const color = [255, 255, 255, 255] as RGBAVec;
    const {
      position: posA,
      color: colorA,
      props: propsA,
      eps: epsA,
      planetInfo: planetInfoA,
      planetUpgrades: planetUpgradesA,
      planetResources: planetResourcesA,
    //@ts-ignore 
    } = this.attribManagers;
    const { x, y } = center;
    // 1 on either side for antialiasing
    const r = radius + 1;

    const { x1, y1 } = { x1: x - r, y1: y - r };
    const { x2, y2 } = { x2: x + r, y2: y + r };

    // prettier-ignore
    EngineUtils.makeDoubleQuadBuffered(
           this.quadBuffer,
           x1, y1, x2, y2, -1, -1, 1, 1
         );
    //@ts-ignore
    posA.setVertex(this.quadBuffer, this.verts);

    // convert pixels to radians
    const interval = engineConsts.dashLength;
    const pixPerRad = radius;

    const dashRad = interval / pixPerRad;
    const dash = dashed ? dashRad : -1;

    const eps = 1 / radius;
    const resources = [planet.energy, planet.energyCap, planet.silver, planet.silverCap];
    for (let i = 0; i < 6; i++) {
      //@ts-ignore  
      colorA.setVertex(color, this.verts + i);
      //@ts-ignore
      propsA.setVertex([angle, dash], this.verts + i);
      //@ts-ignore
      planetInfoA.setVertex([planet.planetLevel, radius], this.verts + i);
      //@ts-ignore
      planetUpgradesA.setVertex(planet.upgradeState, this.verts + i);
      //@ts-ignore
      planetResourcesA.setVertex(resources, this.verts + i);
      //@ts-ignore
      epsA.setVertex([eps], this.verts + i);
    }
    //@ts-ignore
    this.verts += 6;
  }

  public queueGenericPlanet(
    planet: Planet,
    center: WorldCoords,
    radius: number, // world coords
    stroke = -1,
    angle = 1,
    dashed = false
  ) {
    const centerCanvas = this.viewport.worldToCanvasCoords(center);
    const rCanvas = this.viewport.worldToCanvasDist(radius);
    this.queuePlanet(centerCanvas, rCanvas, planet, angle, dashed);
  }

  public setUniforms() {
    //@ts-ignore
    this.uniformSetters.matrix(this.manager.projectionMatrix);
  }

  public queuePlanetBody(planet: Planet, centerW: WorldCoords, radiusW: number): void {
    this.queueGenericPlanet(planet, centerW, radiusW);
  }
  public queueMine(planet: Planet, centerW: WorldCoords, radiusW: number): void {
    this.queueGenericPlanet(planet, centerW, radiusW);
  }
  public queueRip(planet: Planet, centerW: WorldCoords, radiusW: number): void {
    this.queueGenericPlanet(planet, centerW, radiusW);
  }

  public queueQuasar(planet: Planet, centerW: WorldCoords, radiusW: number): void {
    this.queueGenericPlanet(planet, centerW, radiusW);
  }

  public queueRuins(planet: Planet, centerW: WorldCoords, radiusW: number): void {
    this.queueGenericPlanet(planet, centerW, radiusW);
  }

  public queueAsteroid(planet: Planet, centerW: CanvasCoords, radiusW: number): void {
    this.queueGenericPlanet(planet, centerW, radiusW);
  }
}

/**
 * 626-END: Plugin
 */

export default class EmbeddedRendererShowcase implements DFPlugin {
  CirclePlanetLibrary: { [key: string]: any };
  circleSelector: string;
  circleChecker: { [key: string]: boolean };

  constructor() {
    let glMan = ui.getGlManager();
    this.circleSelector = 'Planet';
    if (glMan) {
      this.CirclePlanetLibrary = {
        Planet: new CirclePlanetRenderer(glMan, RendererType.Planet),
        Mine: new CirclePlanetRenderer(glMan, RendererType.Mine),
        SpacetimeRip: new CirclePlanetRenderer(glMan, RendererType.SpacetimeRip),
        Quasar: new CirclePlanetRenderer(glMan, RendererType.Quasar),
        Ruins: new CirclePlanetRenderer(glMan, RendererType.Ruins),
      };
    }
    this.circleChecker = {};
    for (let key in this.CirclePlanetLibrary) {
      this.circleChecker[key] = false;
    }
  }
  async render(div: HTMLDivElement) {
    div.style.width = '500px';
    render(
      html`
        <section>Disabling Renderers</section>
        <section style=${discriptionStyle}>
          Whats actually happening here is that the current renderer is being replaced with a
          'blank' renderer. A blank renderer is a renderer who's flush function has no
          functionality. So the behavior is similar to disabling the current renderer.
        </section>
        <section>
          <select
            name="Renderers"
            id="Renderer-select"
            style=${selectStyle}
            onChange=${(e: any) => {
              currentPlanet = e.target.value;
              const btn = document.getElementById('RegPlanetBtn');
              if (disabled[currentPlanet] === false) {
                btn!.innerText = 'Disable';
              } else {
                btn!.innerText = 'Enable';
              }
            }}
          >
            <option value="Planet">Planet</option>
            <option value="Mine">Mine</option>
            <option value="MineBody">Mine Body</option>
            <option value="MineBelt">Mine Belt</option>
            <option value="SpacetimeRip">Spacetime RIP</option>
            <option value="Ruins">Ruins</option>
            <option value="Quasar">Quasar</option>
            <option value="Asteroid">Asteroid</option>
            <option value="Background">Background</option>
            <option value="UnminedBackground">Unmined Background</option>
            <option value="SpaceBackground">Space Background</option>
            <option value="Artifact">Artifact</option>
            <option value="AllPlanets">All Planets</option>
            <option value="Text">Text</option>
            <option value="Voyager">Voyager</option>
            <option value="Perlin">Perlin</option>
            <option value="Wormhole">Wormhole</option>
            <option value="BlackDomain">BlackDomain</option>
            <option value="Rectangles">Rectangles</option>
            <option value="Line">Line</option>
            <option value="Circle">Circle</option>
            <option value="Ring">Ring</option>
            <option value="UI">UI</option>
            <option value="QuasarBody">QuasarBody</option>
            <option value="QuasarRay">QuasarRay</option>
            <option value="CaptureZone">Capture Zone</option>
          </select>
          <df-button
            id="RegPlanetBtn"
            onClick=${() => {
              disable();
            }}
          >
            Disable
          </df-button>
        </section>
        <section id="Reg-Discription"></section>
        <section>Circle Planets</section>
        <section style=${discriptionStyle}>
          This replaces the current planet renderer with a renderer that uses WebGL to create a
          circle where the color of the circle changes on the percentage of energy on the planet.
        </section>
        <section>
          <select
            name="CirclePlanets"
            id="Circle-select"
            style=${selectStyle}
            onChange=${(e: any) => {
              this.circleSelector = e.target.value;
              console.log(this.circleSelector);
              const btn = document.getElementById('CirclePlanetBtn');
              if (this.circleChecker[this.circleSelector] === false) {
                btn!.innerText = 'Enable';
              } else {
                btn!.innerText = 'Disable';
              }
            }}
          >
            <option value="Planet">Planet</option>
            <option value="Mine">Mine</option>
            <option value="SpacetimeRip">Spacetime RIP</option>
            <option value="Ruins">Ruins</option>
            <option value="Quasar">Quasar</option>
          </select>

          <df-button
            id="CirclePlanetBtn"
            onClick=${() => {
              const btn = document.getElementById('CirclePlanetBtn');
              if (this.circleChecker[this.circleSelector] === false) {
                ui.setCustomRenderer(this.CirclePlanetLibrary[this.circleSelector]);
                this.circleChecker[this.circleSelector] = true;
                btn!.innerText = 'Disable';
              } else {
                ui.disableCustomRenderer(this.CirclePlanetLibrary[this.circleSelector]);
                this.circleChecker[this.circleSelector] = false;
                btn!.innerText = 'Enable';
              }
            }}
          >
            Enable
          </df-button>
        </section>
        <section id="Circle-Discription"></section>
        <section>Renderer Descriptions</section>
        <select
          id="Description-Select"
          style=${selectStyle}
          onChange=${(e: any) => {
            currentPlanet = e.target.value;
            const disc = document.getElementById('Renderer-Descriptions');
            disc!.innerText = rendererDescription[currentPlanet];
          }}
        >
          <option value="Blank"></option>
          <option value="Planet">Planet</option>
          <option value="Mine">Mine</option>
          <option value="MineBody">Mine Body</option>
          <option value="MineBelt">Mine Belt</option>
          <option value="SpacetimeRip">Spacetime RIP</option>
          <option value="Ruins">Ruins</option>
          <option value="Quasar">Quasar</option>
          <option value="Asteroid">Asteroid</option>
          <option value="Background">Background</option>
          <option value="UnminedBackground">Unmined Background</option>
          <option value="SpaceBackground">Space Background</option>
          <option value="Artifact">Artifact</option>
          <option value="AllPlanets">All Planets</option>
          <option value="Text">Text</option>
          <option value="Voyager">Voyager</option>
          <option value="Perlin">Perlin</option>
          <option value="Wormhole">Wormhole</option>
          <option value="BlackDomain">BlackDomain</option>
          <option value="Rectangles">Rectangles</option>
          <option value="Line">Line</option>
          <option value="Circle">Circle</option>
          <option value="Ring">Ring</option>
          <option value="UI">UI</option>
          <option value="QuasarBody">QuasarBody</option>
          <option value="QuasarRay">QuasarRay</option>
          <option value="CaptureZone">Capture Zone</option>
        </select>
        <section id="Renderer-Descriptions" style=${discriptionStyle}></section>
      `,
      div
    );
  }

  destroy(): void {
    currentPlanet = 'Planet';
    for (let key in rendererLibrary) {
      ui.disableCustomRenderer(rendererLibrary[key]);
    }
    for (let key in this.CirclePlanetLibrary) {
      ui.disableCustomRenderer(this.CirclePlanetLibrary[key]);
    }
  }
}

let selectStyle = {
  outline: 'none',
  background: '#151515',
  color: '#838383',
  borderRadius: '4px',
  border: '1px solid #777',
  width: '100px',
  padding: '2px 6px',
  cursor: 'pointer',
  margin: '10px',
};

let inputStyle = {
  background: 'rgb(8,8,8)',
  width: '400px',
  padding: '3px 5px',
};

let buttonStyle = { height: '25px', padding: '3px 5px', margin: '10px', 'text-align': 'center' };

let rendererLibrary: { [key: string]: any } = {
  Planet: new PlanetRenderer(),
  Mine: new MineRenderer(),
  SpacetimeRip: new SpacetimeRipRenderer(),
  Ruins: new RuinsRenderer(),
  Quasar: new QuasarRenderer(),
  Asteroid: new AsteroidRenderer(),
  MineBody: new MineBodyRenderer(),
  MineBelt: new BeltRenderer(),
  Background: new BackgroundRenderer(),
  UnminedBackground: new UnminedRenderer(),
  SpaceBackground: new SpaceRenderer(),
  Artifact: new SpriteRenderer(),
  AllPlanets: new PlanetRenderManager(),
  Text: new TextRenderer(),
  Voyager: new VoyageRenderer(),
  Perlin: new PerlinRenderer(),
  Wormhole: new WormholeRenderer(),
  BlackDomain: new BlackDomainRenderer(),
  Rectangles: new RectRenderer(),
  Line: new LineRenderer(),
  Circle: new CircleRenderer(),
  Ring: new RingRenderer(),
  UI: new UIRenderer(),
  QuasarBody: new QuasarBodyRenderer(),
  QuasarRay: new QuasarRayRenderer(),
  CaptureZone: new CaptureZoneRenderer(),
};

let disabled: { [key: string]: boolean } = {};
for (let key in rendererLibrary) {
  disabled[key] = false;
}

let currentPlanet: string = 'Planet';

function disable() {
  const btn = document.getElementById('RegPlanetBtn');
  if (disabled[currentPlanet] === false) {
    ui.setCustomRenderer(rendererLibrary[currentPlanet]);
    disabled[currentPlanet] = true;
    btn!.innerText = 'Enable';
  } else {
    ui.disableCustomRenderer(rendererLibrary[currentPlanet]);
    disabled[currentPlanet] = false;
    btn!.innerText = 'Disable';
  }
}

const cellStyle = {
  width: '25%',
  float: 'left',
};

const discriptionStyle = {
  TextAlign: 'justify',
};

// Used for discription of each type of renderer
let rendererDescription: { [key: string]: any } = {
  Blank: '',
  Planet: 'basic planets',
  Mine: 'asteroid fields',
  SpacetimeRip: 'Spacetime Rips',
  Ruins: 'foundries',
  Quasar: 'quasars',
  Asteroid: 'asteroid that hover around different planets',
  MineBody: 'the body/asteroids of asteroid fields',
  MineBelt: 'the belts/rings around asteroid fields',
  Background: 'the background of the game',
  UnminedBackground: 'unmined space chunks (part of the background)',
  SpaceBackground: 'mined space chunks (part of the background)',
  Artifact: 'artifacts',
  AllPlanets: 'All planet types',
  Text: 'text that are displayed on the game canvas',
  Voyager: 'Voyages. The transfer of energy between planets.',
  Perlin:
    'the game background. Perlin is the method in which we generate the location of space biomes.',
  Wormhole: 'visual effects of wormholes. Wormholes are generated by a special type of artifact.',
  BlackDomain:
    'visual effects of black domains. Black Domains are created by a special type of artifact',
  Rectangles: 'all rectangles drawn in game: indicators for selection of planet, ',
  Line: ' all lines drawn in game: The line that connect planets during voyages and wormholes ',
  Circle:
    'all circles drawn in the game: The voyager(circle) in voyages, Circles used to indicate the range a planets has, The boarder of the game world.  ',
  Ring: 'rings that indicate the level of a planet',
  UI: 'in game user interface: game borders, range indicators, selection indicators, mouse path, miner',
  QuasarBody: 'the body of the Quasar',
  QuasarRay: 'the ray of the Quasar',
  CaptureZone: 'the capture zones'
};
/* eslint-enable */
