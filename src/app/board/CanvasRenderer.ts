import { RefObject } from 'react';
import GameUIManager from './GameUIManager';
import Viewport from './Viewport';
import { CanvasCoords, WorldCoords } from '../../utils/Coordinates';
import {
  Location,
  QueuedArrival,
  LocationId,
  Planet,
  ExploredChunkData,
  PlanetResource,
  PlanetLevel,
} from '../../_types/global/GlobalTypes';
import {
  hasOwner,
  moveShipsDecay,
  bonusFromHex,
  getPlanetRank,
  formatNumber,
} from '../../utils/Utils';
import autoBind from 'auto-bind';
import { addToChunkMap } from '../../utils/ChunkUtils';
import dfstyles from '../../styles/dfstyles';
import { getPlanetCosmetic, getOwnerColor } from '../../utils/ProcgenUtils';
import { emptyAddress } from '../../utils/CheckedTypeUtils';
import { hatFromType, HatType } from '../../utils/Hats';
import { UIDataKey } from '../../api/UIStateStorageManager';

class CanvasRenderer {
  static instance: CanvasRenderer | null;

  zone0ChunkMap: Map<string, ExploredChunkData>;
  zone1ChunkMap: Map<string, ExploredChunkData>;
  zone2ChunkMap: Map<string, ExploredChunkData>;

  canvasRef: RefObject<HTMLCanvasElement>;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  frameRequestId: number;
  gameUIManager: GameUIManager;
  perlinThreshold1: number;
  perlinThreshold2: number;

  imgPattern: CanvasPattern | null;

  frameCount: number;
  highPerf: boolean;
  now: number;
  selected: Planet | null;

  private constructor(
    canvas: HTMLCanvasElement,
    gameUIManager: GameUIManager,
    image: HTMLImageElement
  ) {
    this.canvas = canvas;
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Not a 2D canvas.');
    }
    this.ctx = ctx;

    this.gameUIManager = gameUIManager;
    this.perlinThreshold1 = gameUIManager.getPerlinThresholds()[0];
    this.perlinThreshold2 = gameUIManager.getPerlinThresholds()[1];
    this.zone0ChunkMap = new Map<string, ExploredChunkData>();
    this.zone1ChunkMap = new Map<string, ExploredChunkData>();
    this.zone2ChunkMap = new Map<string, ExploredChunkData>();

    this.imgPattern = ctx.createPattern(image, 'repeat');

    this.frameCount = 0;
    this.now = Date.now();
    this.highPerf = false;
    this.selected = null;

    this.frame();
    autoBind(this);
  }

  static getInstance(): CanvasRenderer {
    if (!CanvasRenderer.instance) {
      throw new Error(
        'Attempted to get CanvasRenderer object before initialized'
      );
    }

    return CanvasRenderer.instance;
  }

  static destroyInstance(): void {
    if (CanvasRenderer.instance) {
      window.cancelAnimationFrame(CanvasRenderer.instance.frameRequestId);
    }
    CanvasRenderer.instance = null;
  }

  static initialize(
    canvas: HTMLCanvasElement,
    gameUIManager: GameUIManager,
    image: HTMLImageElement
  ) {
    const canvasRenderer = new CanvasRenderer(canvas, gameUIManager, image);
    CanvasRenderer.instance = canvasRenderer;

    return canvasRenderer;
  }

  private draw() {
    const viewport = Viewport.getInstance();

    const exploredChunks = this.gameUIManager.getExploredChunks();
    this.zone0ChunkMap = new Map<string, ExploredChunkData>();
    this.zone1ChunkMap = new Map<string, ExploredChunkData>();
    this.zone2ChunkMap = new Map<string, ExploredChunkData>();
    const planetLocations: Location[] = [];
    for (const exploredChunk of exploredChunks) {
      if (viewport.intersectsViewport(exploredChunk)) {
        let chunkMap: Map<string, ExploredChunkData>;
        if (exploredChunk.perlin < this.perlinThreshold1) {
          chunkMap = this.zone0ChunkMap;
        } else if (exploredChunk.perlin < this.perlinThreshold2) {
          chunkMap = this.zone1ChunkMap;
        } else {
          chunkMap = this.zone2ChunkMap;
        }
        addToChunkMap(chunkMap, exploredChunk, false);
        for (const planetLocation of exploredChunk.planetLocations) {
          planetLocations.push(planetLocation);
        }
      }
    }

    this.drawCleanBoard();
    this.drawKnownChunks([
      this.zone0ChunkMap.values(),
      this.zone1ChunkMap.values(),
      this.zone2ChunkMap.values(),
    ]);

    this.drawSelectedRangeRing();
    this.drawVoyages();
    this.drawPlanets(planetLocations);

    this.drawSelectedRect();
    this.drawHoveringRect();
    this.drawMousePath();
    this.drawBorders();

    this.drawMiner();
  }

  private frame() {
    this.frameCount++;

    if (this.frameCount % 60 === 0) {
      // don't need to update that often
      this.highPerf = this.gameUIManager.getUIDataItem(UIDataKey.highPerf);
    }

    // make the tick depend on detail level?
    const tick = this.highPerf ? 3 : 1;

    if (this.frameCount % tick === 0) {
      this.selected = this.gameUIManager.getSelectedPlanet();
      this.now = Date.now();
      this.draw();
    }
    this.frameRequestId = window.requestAnimationFrame(this.frame.bind(this));
  }

  private drawMiner() {
    const minerLoc = this.gameUIManager.getMinerLocation();
    if (minerLoc === null) return;

    const viewport = Viewport.getInstance();
    const loc = viewport.worldToCanvasCoords(minerLoc);

    const { ctx } = this;

    ctx.save();
    ctx.translate(loc.x, loc.y);
    ctx.scale(1 / 16, 1 / 16);

    const path = new Path2D(
      'M512 224h-50.462c-13.82-89.12-84.418-159.718-173.538-173.538v-50.462h-64v50.462c-89.12 13.82-159.718 84.418-173.538 173.538h-50.462v64h50.462c13.82 89.12 84.418 159.718 173.538 173.538v50.462h64v-50.462c89.12-13.82 159.718-84.418 173.538-173.538h50.462v-64zM396.411 224h-49.881c-9.642-27.275-31.255-48.889-58.53-58.53v-49.881c53.757 12.245 96.166 54.655 108.411 108.411zM256 288c-17.673 0-32-14.327-32-32s14.327-32 32-32c17.673 0 32 14.327 32 32s-14.327 32-32 32zM224 115.589v49.881c-27.275 9.641-48.889 31.255-58.53 58.53h-49.881c12.245-53.756 54.655-96.166 108.411-108.411zM115.589 288h49.881c9.641 27.275 31.255 48.889 58.53 58.53v49.881c-53.756-12.245-96.166-54.654-108.411-108.411zM288 396.411v-49.881c27.275-9.642 48.889-31.255 58.53-58.53h49.881c-12.245 53.757-54.654 96.166-108.411 108.411z'
    );
    ctx.translate(-256, -256);

    ctx.fillStyle = 'white';
    ctx.fill(path);

    ctx.restore();
  }

  private drawCleanBoard() {
    const viewport = Viewport.getInstance();

    this.ctx.clearRect(0, 0, viewport.viewportWidth, viewport.viewportHeight);
    this.ctx.fillStyle = 'grey';
    this.ctx.fillRect(0, 0, viewport.viewportWidth, viewport.viewportHeight);
  }

  private drawKnownChunks(
    knownChunksInterables: Iterable<ExploredChunkData>[]
  ) {
    if (!this.imgPattern) {
      console.error('error loading image pattern!');
      return;
    }

    for (const knownChunks of knownChunksInterables) {
      for (const chunk of knownChunks) {
        const chunkLoc = chunk.chunkFootprint;
        const center = {
          x: chunkLoc.bottomLeft.x + chunkLoc.sideLength / 2,
          y: chunkLoc.bottomLeft.y + chunkLoc.sideLength / 2,
        };
        const p = chunk.perlin;

        let fill: CanvasPattern | string = 'black';

        if (p < this.perlinThreshold1) {
          fill = '#303080';
        } else if (p < this.perlinThreshold2) {
          fill = '#202060';
        }

        this.drawRectWithCenter(
          center,
          chunkLoc.sideLength,
          chunkLoc.sideLength,
          fill
        );
      }
    }
  }

  private drawPlanets(planetLocations: Location[]) {
    for (let l = PlanetLevel.MAX; l >= PlanetLevel.MIN; l--) {
      for (let i = 0; i < planetLocations.length; i++) {
        this.drawPlanetAtLocation(planetLocations[i], l);
      }
    }
  }

  private drawPlanetAtLocation(location: Location, atLevel: PlanetLevel) {
    const uiManager = this.gameUIManager;
    const planetLevel = uiManager.getPlanetDetailLevel(location.hash);
    if (planetLevel !== atLevel) return; // strictly for ordering

    const isSelected = location.hash === this.selected?.locationId;
    const planet = uiManager.getPlanetWithId(location.hash);
    if (!planet) return; // if we messed up somehow

    const isVeryBig = planetLevel >= 6;

    const radius = uiManager.getRadiusOfPlanetLevel(planet.planetLevel);
    const viewport = Viewport.getInstance();
    const radiusReal = viewport.worldToCanvasDist(radius);

    const MIN_RADIUS = 2;
    if (!isSelected) {
      if (radiusReal < MIN_RADIUS && !isVeryBig) return; // detail level fallback
      if (planetLevel === null || planetLevel < uiManager.getDetailLevel()) {
        return; // so we don't call getPlanetWithLocation, which triggers updates every second
      }
    }

    if (isSelected || isVeryBig) {
      this.ctx.globalAlpha = 1;
    } else {
      const alpha = Math.max(0, 0.15 * (radiusReal - MIN_RADIUS));
      this.ctx.globalAlpha = Math.min(alpha, 1);
    }

    const energy = planet ? Math.ceil(planet.energy) : 0;

    const silver = planet ? Math.floor(planet.silver) : 0;
    const center = { x: location.coords.x, y: location.coords.y };

    const colors = getPlanetCosmetic(planet);

    const myRotation = (-40 + (colors.baseHue % 80)) * (Math.PI / 180);

    /* draw ring back */
    const rank = getPlanetRank(planet);
    // const numRings = this.highPerf ? (rank > 0 ? 1 : 0) : rank;
    const numRings = rank;
    // const numRings = 2;

    for (let i = 0; i < numRings; i++)
      this.drawHalfRingWithCenter(
        center,
        radius,
        i,
        myRotation,
        true,
        // colorIndex[offset + i]
        colors.backgroundColor
      );

    /* draw planet */

    // hp bar 1
    if (hasOwner(planet)) {
      if (uiManager.isOwnedByMe(planet)) {
        this.drawLoopWithCenter(
          center,
          radius * 1.2,
          1,
          'rgba(255, 255, 255, 0.7)'
        );
      } else {
        this.drawLoopWithCenter(
          center,
          radius * 1.2,
          1,
          getOwnerColor(planet, 0.7)
        );
      }
    }

    this.drawPlanetBody(center, radius, planet);

    /* draw ring front */
    for (let i = 0; i < numRings; i++)
      this.drawHalfRingWithCenter(
        center,
        radius,
        i,
        myRotation,
        false,
        // colorIndex[offset + i]
        colors.backgroundColor
      );

    this.drawAsteroidBelt(center, radius, planet);

    const hatLevel = planet.hatLevel;
    // const hatLevel = planetRandomInt(planet.locationId)() % 5;

    if (hatLevel > 0) {
      const hatScale = 1.65 ** (hatLevel - 1);

      this.drawHat(
        colors.hatType,
        // HatType.Squid,
        512,
        512,
        center,
        1.2 * radius * hatScale,
        1.2 * radius * hatScale,
        radius,
        myRotation,
        colors.backgroundColor,
        colors.previewColor
      );
    }

    // draw text
    const current = uiManager.getDetailLevel();
    const det = uiManager.getPlanetDetailLevel(planet.locationId);
    if (det === null) return;
    if (det > current + 1 || isSelected) {
      if (!isSelected && !isVeryBig) {
        this.ctx.globalAlpha = Math.min(0.1 * radiusReal, 1);
      }

      const fromPlanet = uiManager.getMouseDownPlanet();
      const fromCoords = uiManager.getMouseDownCoords();
      const toPlanet = uiManager.getHoveringOverPlanet();
      const toCoords = uiManager.getHoveringOverCoords();
      const moveHereInProgress =
        fromPlanet &&
        fromCoords &&
        toPlanet &&
        toCoords &&
        fromPlanet.locationId !== toPlanet.locationId &&
        toPlanet.locationId === planet.locationId;
      if (moveHereInProgress || (hasOwner(planet) && energy > 0)) {
        let energyString = energy.toString();
        let lockedEnergy = 0;
        for (const unconfirmedMove of planet.unconfirmedDepartures) {
          lockedEnergy += unconfirmedMove.forces;
        }
        if (lockedEnergy > 0) {
          energyString += ` (-${Math.floor(lockedEnergy)})`;
        }

        // typescript complains if we just copy moveHereInProgress here :(
        if (
          fromPlanet &&
          fromCoords &&
          toPlanet &&
          toCoords &&
          fromPlanet.locationId !== toPlanet.locationId &&
          toPlanet.locationId === planet.locationId
        ) {
          // user is click-dragging to this planet

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
          if (uiManager.isOwnedByMe(planet) || planet.energy === 0) {
            energyString += ` (+${Math.floor(myAtk)})`;
          } else {
            energyString += ` (-${Math.floor(
              (myAtk * 100) / toPlanet.defense
            )})`;
          }
        }
        this.drawText(
          energyString,
          15,
          {
            x: center.x,
            y: center.y - 1.1 * radius - (planet.owner ? 0.75 : 0.25),
          },
          uiManager.isOwnedByMe(planet) ? 'white' : getOwnerColor(planet, 1)
        );
        // hp bar 2
        if (uiManager.isOwnedByMe(planet)) {
          this.drawArcWithCenter(
            center,
            radius * 1.2,
            3,
            (planet.energy / planet.energyCap) * 100,
            'white'
          );
        } else {
          this.drawArcWithCenter(
            center,
            radius * 1.2,
            3,
            (planet.energy / planet.energyCap) * 100,
            getOwnerColor(planet, 1)
          );
        }
      } else if (!hasOwner(planet) && energy > 0) {
        const current = uiManager.getDetailLevel();
        const det = uiManager.getPlanetDetailLevel(planet.locationId);
        if (det === null) return;
        if (det > current) {
          this.drawText(
            formatNumber(energy),
            15,
            {
              x: center.x,
              y: center.y - 1.1 * radius - (planet.owner ? 0.75 : 0.25),
            },
            '#996666'
          );
        }
      }

      if (planet.silverGrowth > 0 || planet.silver > 0) {
        this.drawText(
          silver.toString(),
          15,
          {
            x: center.x,
            y: center.y + 1.1 * radius + (planet.owner ? 0.75 : 0.25),
          },
          'gold'
        );
      }
    }

    this.ctx.globalAlpha = 1;
  }

  private drawVoyages() {
    const voyages = this.gameUIManager.getAllVoyages();
    for (const voyage of voyages) {
      const now = this.now / 1000;
      if (now < voyage.arrivalTime) {
        const isMyVoyage = voyage.player === this.gameUIManager.getAccount();
        this.drawVoyagePath(
          voyage.fromPlanet,
          voyage.toPlanet,
          true,
          isMyVoyage
        );
        this.drawFleet(voyage);
      }
    }

    const unconfirmedDepartures = this.gameUIManager.getUnconfirmedMoves();
    for (const unconfirmedMove of unconfirmedDepartures) {
      this.drawVoyagePath(
        unconfirmedMove.from,
        unconfirmedMove.to,
        false,
        true
      );
    }
  }

  private drawFleet(voyage: QueuedArrival) {
    const fromLoc = this.gameUIManager.getLocationOfPlanet(voyage.fromPlanet);
    const fromPlanet = this.gameUIManager.getPlanetWithId(voyage.fromPlanet);
    const toLoc = this.gameUIManager.getLocationOfPlanet(voyage.toPlanet);
    if (!fromPlanet || !toLoc) {
      // not enough info to draw anything
      return;
    } else if (!fromLoc && fromPlanet && toLoc) {
      // can draw a red ring around dest, but don't know source location
      const myMove = voyage.player === this.gameUIManager.getAccount();
      const now = this.now / 1000;
      const timeLeft = voyage.arrivalTime - now;
      const radius = (timeLeft * fromPlanet.speed) / 100;
      this.drawLoopWithCenter(
        toLoc.coords,
        radius,
        2,
        myMove ? 'blue' : 'red',
        true
      );
      this.drawText(`${Math.floor(timeLeft)}s`, 15, {
        x: toLoc.coords.x,
        y: toLoc.coords.y + radius * 1.1,
      });
    } else if (fromLoc && fromPlanet && toLoc) {
      // know source and destination locations

      const myMove = voyage.player === this.gameUIManager.getAccount();
      const now = this.now / 1000;
      let proportion =
        (now - voyage.departureTime) /
        (voyage.arrivalTime - voyage.departureTime);
      proportion = Math.max(proportion, 0.01);
      proportion = Math.min(proportion, 0.99);

      const shipsLocationX =
        (1 - proportion) * fromLoc.coords.x + proportion * toLoc.coords.x;
      const shipsLocationY =
        (1 - proportion) * fromLoc.coords.y + proportion * toLoc.coords.y;
      const shipsLocation = { x: shipsLocationX, y: shipsLocationY };

      this.drawCircleWithCenter(shipsLocation, 1, myMove ? 'blue' : 'red');
      const timeLeftSeconds = Math.floor(voyage.arrivalTime - now);
      this.drawText(
        `${timeLeftSeconds.toString()}s`,
        15,
        { x: shipsLocationX, y: shipsLocationY - 1.1 },
        'white'
      );
    }
  }

  private drawVoyagePath(
    from: LocationId,
    to: LocationId,
    confirmed: boolean,
    isMyVoyage: boolean
  ) {
    const fromLoc = this.gameUIManager.getLocationOfPlanet(from);
    const fromPlanet = this.gameUIManager.getPlanetWithId(from);
    const toLoc = this.gameUIManager.getLocationOfPlanet(to);
    if (!fromPlanet || !fromLoc || !toLoc) {
      return;
    }

    this.drawLine(
      fromLoc.coords,
      toLoc.coords,
      confirmed ? 2 : 1,
      isMyVoyage ? 'blue' : 'red',
      confirmed ? false : true
    );
  }

  private drawHoveringRect() {
    const uiManager = this.gameUIManager;

    const hoveringOverCoords = uiManager.getHoveringOverCoords();
    if (!hoveringOverCoords) {
      return;
    }

    const hoveringOverPlanet = uiManager.getHoveringOverPlanet();

    const sideLength = hoveringOverPlanet
      ? 2.4 * uiManager.getRadiusOfPlanetLevel(hoveringOverPlanet.planetLevel)
      : 1;

    this.drawRectBorderWithCenter(
      hoveringOverCoords,
      sideLength,
      sideLength,
      2,
      'white'
    );
  }

  private drawSelectedRangeRing() {
    const selected = this.selected;

    if (!selected) return;
    const loc = this.gameUIManager.getLocationOfPlanet(selected.locationId);
    if (!loc) return;
    const { x, y } = loc?.coords;

    this.drawLoopWithCenter(
      { x, y },
      4.3219 * selected.range, // log_2 (100/5)
      1,
      dfstyles.game.rangecolors.dash,
      true
    );
    this.drawText(
      '100%',
      15,
      { x, y: y + 4.3219 * selected.range },
      dfstyles.game.rangecolors.dash
    );

    this.drawLoopWithCenter(
      { x, y },
      3.3219 * selected.range, // log_2 (50/5)
      1,
      dfstyles.game.rangecolors.dash,
      true
    );
    this.drawText(
      '50%',
      15,
      { x, y: y + 3.3219 * selected.range },
      dfstyles.game.rangecolors.dash
    );

    this.drawLoopWithCenter(
      { x, y },
      2.3219 * selected.range, // log_2 (25/5)
      1,
      dfstyles.game.rangecolors.dash,
      true
    );
    this.drawText(
      '25%',
      15,
      { x, y: y + 2.3219 * selected.range },
      dfstyles.game.rangecolors.dash
    );

    if (selected.owner === emptyAddress) return;

    const forcesSending = this.gameUIManager.getForcesSending(
      selected.locationId
    ); // [0, 100]
    const totalForces = (forcesSending / 100) * selected.energy;

    const scaled = (forcesSending * selected.energy) / selected.energyCap;
    let ratio = Math.log(scaled / 5) / Math.log(2);
    ratio = Math.max(ratio, 0);

    const rOrange = ratio * selected.range;

    if (rOrange > 1) {
      this.drawLoopWithCenter(
        { x, y },
        rOrange, // log_2 (25/5)
        1,
        dfstyles.game.rangecolors.dashenergy,
        true
      );
      this.drawText(
        `${formatNumber(totalForces)}`,
        15,
        { x, y: y + rOrange },
        dfstyles.game.rangecolors.dashenergy
      );
    }
  }

  private drawSelectedRect() {
    const uiManager = this.gameUIManager;
    const selectedCoords = uiManager.getSelectedCoords();
    const selectedPlanet = uiManager.getSelectedPlanet();
    if (!selectedPlanet || !selectedCoords) {
      return;
    }

    const sideLength =
      2.4 * uiManager.getRadiusOfPlanetLevel(selectedPlanet.planetLevel);
    this.drawRectBorderWithCenter(
      selectedCoords,
      sideLength,
      sideLength,
      2,
      'red'
    );
  }

  private drawMousePath() {
    const uiManager = this.gameUIManager;
    const mouseDownPlanet = uiManager.getMouseDownPlanet();
    const loc = mouseDownPlanet
      ? uiManager.getLocationOfPlanet(mouseDownPlanet.locationId)
      : null;

    const to: WorldCoords | null = uiManager.getHoveringOverCoords();

    if (mouseDownPlanet && loc && to) {
      const from: WorldCoords | null = loc.coords;

      const myPlanet = uiManager.isOverOwnPlanet(from);
      if (myPlanet && to !== from) {
        this.drawLine(from, to, 2);
        let effectiveEnergy = myPlanet.energy;
        for (const unconfirmedMove of myPlanet.unconfirmedDepartures) {
          effectiveEnergy -= unconfirmedMove.forces;
        }
        const shipsMoved =
          (uiManager.getForcesSending(myPlanet.locationId) / 100) *
          effectiveEnergy;

        const dist = Math.sqrt((from.x - to.x) ** 2 + (from.y - to.y) ** 2);

        const myAtk: number = moveShipsDecay(shipsMoved, myPlanet, dist);
        if (!uiManager.getHoveringOverPlanet()) {
          this.drawText(
            `Energy: ${Math.round(myAtk)}`,
            15,
            { x: to.x, y: to.y },
            myAtk > 0 ? 'white' : 'red'
          );
        }
      }
    }
  }

  private drawBorders() {
    const radius = this.gameUIManager.getWorldRadius();
    this.drawLoopWithCenter({ x: 0, y: 0 }, radius, 2, 'white');
  }

  private drawHat(
    hatType: HatType,
    pathHeight: number,
    pathWidth: number,
    center: WorldCoords,
    width: number,
    height: number,
    radius: number,
    rotation: number,
    fill1: string | CanvasPattern = 'white',
    fill2: string | CanvasPattern = 'red'
  ) {
    const { ctx } = this;
    const viewport = Viewport.getInstance();
    const hat = hatFromType(hatType);

    const trueCenter = viewport.worldToCanvasCoords(center);
    const trueRadius = viewport.worldToCanvasDist(radius);
    const trueWidth = viewport.worldToCanvasDist(width);
    const trueHeight = viewport.worldToCanvasDist(height);

    ctx.save();

    // move to planet center
    ctx.translate(trueCenter.x, trueCenter.y);

    // extrude out to outside
    ctx.rotate(rotation);
    ctx.translate(0, -trueRadius - trueHeight / 4);

    // move to svg center
    ctx.scale(trueWidth / pathWidth, trueHeight / pathHeight);
    ctx.translate(-pathWidth / 2, -pathHeight / 2);

    ctx.fillStyle = fill1;
    for (const pathStr of hat.bottomLayer) {
      ctx.fill(new Path2D(pathStr));
    }

    ctx.fillStyle = fill2;
    for (const pathStr of hat.topLayer) {
      ctx.fill(new Path2D(pathStr));
    }

    ctx.restore();
  }

  private drawRectWithCenter(
    center: WorldCoords,
    width: number, // TODO we should label w/h with world vs canvas coords
    height: number,
    fill: string | CanvasPattern = 'white'
  ) {
    const { ctx } = this;
    const viewport = Viewport.getInstance();

    const centerCanvasCoords = viewport.worldToCanvasCoords(center);
    const widthCanvasCoords = viewport.worldToCanvasDist(width);
    const heightCanvasCoords = viewport.worldToCanvasDist(height);

    if (typeof fill === 'string') {
      ctx.fillStyle = fill;
      ctx.fillRect(
        Math.floor(centerCanvasCoords.x - widthCanvasCoords / 2),
        Math.floor(centerCanvasCoords.y - heightCanvasCoords / 2),
        widthCanvasCoords,
        heightCanvasCoords
      );
    } else {
      ctx.fillStyle = fill;

      const vCenter = viewport.centerWorldCoords;

      const offX = viewport.worldToCanvasDist(vCenter.x);
      const offY = -viewport.worldToCanvasDist(vCenter.y);

      ctx.save();
      ctx.translate(-offX, -offY);

      ctx.globalCompositeOperation = 'overlay';
      ctx.fillRect(
        Math.floor(centerCanvasCoords.x - widthCanvasCoords / 2) + offX,
        Math.floor(centerCanvasCoords.y - heightCanvasCoords / 2) + offY,
        widthCanvasCoords,
        heightCanvasCoords
      );

      ctx.restore();
    }
  }

  private drawAsteroidBelt(
    center: WorldCoords,
    radius: number,
    planet: Planet
  ) {
    const { ctx } = this;
    const planetDetailLevel = this.gameUIManager.getPlanetDetailLevel(
      planet.locationId
    );
    const detailLevel = this.gameUIManager.getDetailLevel();
    if (planetDetailLevel === null || planetDetailLevel < detailLevel + 1) {
      return;
    }

    const viewport = Viewport.getInstance();
    const centerCanvasCoords = viewport.worldToCanvasCoords(center);
    const r = viewport.worldToCanvasDist(0.3 * radius);
    const orbit = viewport.worldToCanvasDist(1.2 * radius) + r;

    const [
      energyCapBonus,
      energyGroBonus,
      rangeBonus,
      speedBonus,
      defBonus,
    ] = bonusFromHex(planet.locationId);

    ctx.save();
    ctx.translate(centerCanvasCoords.x, centerCanvasCoords.y);

    const angle = this.now * 0.001;

    const drawAsteroid = (t: number, color: string) => {
      const theta = t + angle;
      const x = Math.cos(theta);
      const y = Math.sin(theta);

      if (!this.highPerf) {
        const clip = (tt) => tt % (Math.PI * 2);
        ctx.lineWidth = r;
        const oldAlpha = ctx.globalAlpha;
        for (let i = 1; i <= 8; i++) {
          ctx.globalAlpha = 0.04 * oldAlpha;

          ctx.beginPath();
          ctx.arc(0, 0, orbit, clip(theta - 0.1 * i), clip(theta));

          ctx.strokeStyle = color;
          ctx.stroke();
          ctx.strokeStyle = 'white';
          ctx.stroke();
          ctx.stroke();
        }
        ctx.globalAlpha = oldAlpha;
      }

      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(orbit * x, orbit * y, r, 0, 2 * Math.PI);
      ctx.fill();
    };

    const delT = 1.0;
    if (energyCapBonus) {
      drawAsteroid(0 * delT, dfstyles.game.bonuscolors.energyCap);
    }
    if (energyGroBonus) {
      drawAsteroid(1 * delT, dfstyles.game.bonuscolors.energyGro);
    }
    if (speedBonus) {
      drawAsteroid(2 * delT, dfstyles.game.bonuscolors.speed);
    }
    if (defBonus) {
      drawAsteroid(3 * delT, dfstyles.game.bonuscolors.def);
    }
    if (rangeBonus) {
      drawAsteroid(4 * delT, dfstyles.game.bonuscolors.range);
    }

    ctx.restore();
  }

  private drawRectBorderWithCenter(
    center: WorldCoords,
    width: number,
    height: number,
    strokeWidth: number,
    color = 'white'
  ) {
    const viewport = Viewport.getInstance();

    const centerCanvasCoords = viewport.worldToCanvasCoords(center);
    const widthCanvasCoords = viewport.worldToCanvasDist(width);
    const heightCanvasCoords = viewport.worldToCanvasDist(height);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = strokeWidth;
    this.ctx.strokeRect(
      centerCanvasCoords.x - widthCanvasCoords / 2,
      centerCanvasCoords.y - heightCanvasCoords / 2,
      widthCanvasCoords,
      heightCanvasCoords
    );
  }

  private drawCircleWithCenter(
    center: WorldCoords,
    radius: number,
    color = 'white'
  ) {
    const viewport = Viewport.getInstance();

    const centerCanvasCoords = viewport.worldToCanvasCoords(center);
    const radiusCanvasCoords = viewport.worldToCanvasDist(radius);
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(
      centerCanvasCoords.x,
      centerCanvasCoords.y,
      radiusCanvasCoords,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.fill();
  }

  private drawPlanetBody(
    centerRaw: WorldCoords,
    radiusRaw: number,
    planet: Planet
  ) {
    const { ctx } = this;
    const viewport = Viewport.getInstance();

    const center = viewport.worldToCanvasCoords(centerRaw);
    const radius = viewport.worldToCanvasDist(radiusRaw);

    ctx.save();
    ctx.translate(center.x, center.y);

    const colors = getPlanetCosmetic(planet);
    if (planet.planetResource === PlanetResource.NONE) {
      ctx.fillStyle = colors.previewColor;

      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fill();
    } else {
      // silver-producing

      for (let i = 0; i < 5; i++) {
        const t = (i * (Math.PI * 2)) / 5 + this.now * 0.0003;

        ctx.fillStyle = colors.asteroidColor;
        ctx.beginPath();
        ctx.arc(
          radius * 0.6 * Math.cos(t),
          radius * 0.6 * Math.sin(t),
          radius * 0.3,
          0,
          2 * Math.PI
        );

        ctx.fill();
      }
    }

    ctx.restore();
  }

  private drawHalfRingWithCenter(
    centerRaw: WorldCoords,
    radiusRaw: number,
    ringNumber: number,
    rotation: number,
    isFlipped: boolean,
    color = 'white'
  ) {
    const ctx = this.ctx;
    const i = ringNumber;
    const viewport = Viewport.getInstance();

    const center = viewport.worldToCanvasCoords(centerRaw);
    const radius = viewport.worldToCanvasDist(radiusRaw);
    ctx.fillStyle = color;

    ctx.save();
    ctx.translate(center.x, center.y);
    ctx.rotate(rotation);

    ctx.beginPath();
    ctx.ellipse(
      0,
      0,
      (1.4 + 0.45 * i) * radius,
      (0.5 + 0.15 * i) * radius,
      0,
      Math.PI,
      2 * Math.PI,
      !isFlipped
    );
    ctx.ellipse(
      0,
      0,
      (1.1 + 0.45 * i) * radius,
      (0.4 + 0.15 * i) * radius,
      0,
      2 * Math.PI,
      Math.PI,
      isFlipped
    );
    ctx.fill();

    ctx.restore();
  }

  private drawLoopWithCenter(
    center: WorldCoords,
    radius: number,
    width: number,
    color = 'white',
    dotted = false
  ) {
    this.drawArcWithCenter(center, radius, width, 100, color, dotted);
  }

  private drawArcWithCenter(
    center: WorldCoords,
    radius: number,
    width: number,
    percent: number,
    color = 'white',
    dotted = false
  ) {
    const viewport = Viewport.getInstance();

    const centerCanvasCoords = viewport.worldToCanvasCoords(center);
    const radiusCanvasCoords = viewport.worldToCanvasDist(radius);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    this.ctx.strokeStyle = color;
    // this.ctx.lineWidth = viewport.worldToCanvasDist(width);
    this.ctx.lineWidth = width;
    this.ctx.beginPath();
    this.ctx.arc(
      centerCanvasCoords.x,
      centerCanvasCoords.y,
      radiusCanvasCoords,
      1.5 * Math.PI,
      1.5 * Math.PI + (2 * Math.PI * percent) / 100,
      false
    );

    if (dotted) this.ctx.setLineDash([15, 15]);
    else this.ctx.setLineDash([]);
    this.ctx.stroke();

    this.ctx.setLineDash([]);
  }

  private drawLine(
    startCoords: WorldCoords,
    endCoords: WorldCoords,
    lineWidth: number,
    color = 'white',
    dotted = false
  ) {
    const viewport = Viewport.getInstance();

    this.ctx.beginPath();
    // this.ctx.lineWidth = viewport.worldToCanvasDist(lineWidth);
    this.ctx.lineWidth = lineWidth;
    this.ctx.strokeStyle = color;
    const startCanvasCoords: CanvasCoords = viewport.worldToCanvasCoords(
      startCoords
    );
    this.ctx.moveTo(startCanvasCoords.x, startCanvasCoords.y);
    const endCanvasCoords: CanvasCoords = viewport.worldToCanvasCoords(
      endCoords
    );
    this.ctx.lineTo(endCanvasCoords.x, endCanvasCoords.y);

    if (dotted) this.ctx.setLineDash([15, 15]);
    else this.ctx.setLineDash([]);
    this.ctx.stroke();

    this.ctx.setLineDash([]);
  }

  private drawText(
    text: string,
    fontSize: number,
    center: WorldCoords,
    color = 'white'
  ) {
    const viewport = Viewport.getInstance();

    const centerCanvasCoords = viewport.worldToCanvasCoords(center);

    this.ctx.font = `${fontSize}px sans-serif`;
    this.ctx.textBaseline = 'top';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = color;
    this.ctx.fillText(text, centerCanvasCoords.x, centerCanvasCoords.y);
  }
}

export default CanvasRenderer;
