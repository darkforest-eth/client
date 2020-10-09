import React, { useEffect, useState, useRef, RefObject } from 'react';
import styled from 'styled-components';
import dfstyles from '../../styles/dfstyles';
import {
  Planet,
  PlanetLevel,
  PlanetResource,
  StatIdx,
} from '../../_types/global/GlobalTypes';
import {
  getPlanetCosmetic,
  PixelCoords,
  planetPerlin,
  planetRandom,
  getPlanetName,
} from '../../utils/ProcgenUtils';
import { PlanetCosmeticInfo } from '../../_types/darkforest/app/board/utils/UtilsTypes';
import _ from 'lodash';
import { bonusFromHex, getPlanetRank } from '../../utils/Utils';
import { TooltipTrigger } from './Tooltip';
import { TooltipName } from '../../utils/WindowManager';
import {
  EnergyIcon,
  PiratesIcon,
  RangeIcon,
  RankIcon,
  MaxLevelIcon,
  SilverProdIcon,
  DefenseIcon,
  SpeedIcon,
  EnergyGrowthIcon,
} from '../Icons';
import { emptyAddress } from '../../utils/CheckedTypeUtils';
import autoBind from 'auto-bind';

const PlanetScapeContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  & canvas {
    outline-offset: -1px;
    outline: 1px solid ${dfstyles.colors.text};
  }
`;

const _PlanetIcons = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0.1em;

  & > span {
    width: 1.5em;
    height: 1.5em;
    border: 1px solid ${dfstyles.colors.text};
    background: ${dfstyles.colors.backgroundlighter};
    border-radius: 2px;
    margin: 0.1em;

    &,
    & > span {
      display: inline-flex !important;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    }
  }
`;

const ClownIcon = styled.span`
  background: red;
  width: 12px;
  height: 12px;
  border-radius: 6px;
`;

export function PlanetIcons({ planet }: { planet: Planet | null }) {
  if (!planet) return <_PlanetIcons />;
  const bonuses = bonusFromHex(planet.locationId);
  const rank = getPlanetRank(planet);

  return (
    <_PlanetIcons>
      {planet.owner === emptyAddress && planet.energy > 0 && (
        <TooltipTrigger name={TooltipName.Pirates}>
          <PiratesIcon />
        </TooltipTrigger>
      )}
      {planet.planetLevel === PlanetLevel.MAX && (
        <TooltipTrigger name={TooltipName.MaxLevel}>
          <MaxLevelIcon />
        </TooltipTrigger>
      )}
      {planet.planetResource === PlanetResource.SILVER && (
        <TooltipTrigger name={TooltipName.SilverProd}>
          <SilverProdIcon />
        </TooltipTrigger>
      )}
      {bonuses[StatIdx.EnergyCap] && (
        <TooltipTrigger name={TooltipName.BonusEnergyCap}>
          <EnergyIcon />
        </TooltipTrigger>
      )}
      {bonuses[StatIdx.EnergyGro] && (
        <TooltipTrigger name={TooltipName.BonusEnergyGro}>
          <EnergyGrowthIcon />
        </TooltipTrigger>
      )}
      {bonuses[StatIdx.Range] && (
        <TooltipTrigger name={TooltipName.BonusRange}>
          <RangeIcon />
        </TooltipTrigger>
      )}
      {bonuses[StatIdx.Speed] && (
        <TooltipTrigger name={TooltipName.BonusSpeed}>
          <SpeedIcon />
        </TooltipTrigger>
      )}
      {bonuses[StatIdx.Defense] && (
        <TooltipTrigger name={TooltipName.BonusDefense}>
          <DefenseIcon />
        </TooltipTrigger>
      )}
      {rank > 0 && (
        <TooltipTrigger name={TooltipName.PlanetRank}>
          <RankIcon planet={planet} />
        </TooltipTrigger>
      )}
      {getPlanetName(planet) === 'Clown Town' && (
        <TooltipTrigger name={TooltipName.Clowntown}>
          <ClownIcon />
        </TooltipTrigger>
      )}
    </_PlanetIcons>
  );
}

class PlanetscapeRenderer {
  canvasRef: RefObject<HTMLCanvasElement>;

  planet: Planet | null;

  scapeCanvas: HTMLCanvasElement;
  scapeCtx: CanvasRenderingContext2D;

  moonCanvas: HTMLCanvasElement;
  moonCtx: CanvasRenderingContext2D;

  frameRequestId: number;
  private TICK_SIZE = 2;
  frameCount = 0;

  constructor(scapeCanvas: HTMLCanvasElement, moonCanvas: HTMLCanvasElement) {
    this.planet = null;

    this.scapeCanvas = scapeCanvas;
    this.moonCanvas = moonCanvas;

    const planetCtx = this.scapeCanvas.getContext('2d');
    if (!planetCtx) throw new Error('Not a 2D canvas.');
    this.scapeCtx = planetCtx;

    const moonCtx = this.moonCanvas.getContext('2d');
    if (!moonCtx) throw new Error('Not a 2D canvas.');
    this.moonCtx = moonCtx;

    autoBind(this);
    this.draw();
  }

  destroy() {
    window.cancelAnimationFrame(this.frameRequestId);
  }

  draw() {
    this.frameCount++;
    if (this.frameCount % 3 === 0) this.drawMoon();
    // this.drawScape();
    this.frameRequestId = window.requestAnimationFrame(this.draw);
  }

  setPlanet(planet: Planet | null) {
    this.planet = planet;
  }

  drawMoon() {
    const { planet, moonCtx: ctx, moonCanvas: canvas } = this;

    if (!planet) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const colors = getPlanetCosmetic(planet);
    const bonuses = bonusFromHex(planet.locationId);

    const rand = planetRandom(planet.locationId);
    ctx.globalAlpha = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw bg
    if (planet.planetResource === PlanetResource.NONE) {
      ctx.fillStyle = colors.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'color-burn';
      const darkness = Math.max(
        0,
        0.35 + 0.4 * Math.sin(Date.now() / 15000 + rand() * 10000)
      );
      ctx.globalAlpha = darkness;
      ctx.fillStyle = '#020208';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';

      ctx.fillStyle = 'white';
      for (let i = 0; i < 20; i++) {
        const center = { x: (rand() * 10000) % 500, y: (rand() * 10000) % 200 };
        if (rand() < 0.5) {
          const starSize = 1 + rand() * 3;
          ctx.fillRect(center.x - starSize, center.y, 2 * starSize + 1, 1);
          ctx.fillRect(center.x, center.y - starSize, 1, 2 * starSize + 1);
        } else {
          ctx.fillRect(center.x, center.y, 1, 1);
        }
      }
    } else {
      ctx.fillStyle = colors.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'color-burn';
      const darkness = 0.8;
      ctx.globalAlpha = darkness;
      ctx.fillStyle = '#020208';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';

      ctx.fillStyle = 'white';
      for (let i = 0; i < 40; i++) {
        const center = { x: (rand() * 10000) % 500, y: (rand() * 10000) % 200 };
        if (rand() < 0.5) {
          const starSize = 1 + rand() * 3;
          ctx.fillRect(center.x - starSize, center.y, 2 * starSize + 1, 1);
          ctx.fillRect(center.x, center.y - starSize, 1, 2 * starSize + 1);
        } else {
          ctx.fillRect(center.x, center.y, 1, 1);
        }
      }
    }

    // draw moons
    const dir = rand() < 0.5 ? -1 : 1;
    for (let i = 0; i < bonuses.length; i++) {
      const bar = 10000;
      const mult = (0.5 + rand() * 2) * 0.1;
      let posX = ((Date.now() * mult + rand() * bar) % bar) / bar;
      if (dir === -1) posX = 1 - posX;

      const radius = 15 + rand() * 20;
      const moonX = (-0.5 + 2 * posX) * canvas.width;
      const moonY = (0.1 + rand() * 0.2) * canvas.height;

      if (bonuses[i]) {
        let color;
        const {
          energyCap,
          energyGro,
          range,
          speed,
          def,
        } = dfstyles.game.bonuscolors;
        if (i === StatIdx.EnergyCap) color = energyCap;
        else if (i === StatIdx.EnergyGro) color = energyGro;
        else if (i === StatIdx.Range) color = range;
        else if (i === StatIdx.Speed) color = speed;
        else color = def;

        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.arc(moonX, moonY, radius + 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(moonX, moonY, radius, 0, 2 * Math.PI);

        ctx.globalAlpha = 0.3;
        ctx.fill();
        ctx.fillStyle = color;
        ctx.fill();
      }
    }
  }

  drawScape() {
    const { planet, scapeCtx: ctx, scapeCanvas: canvas, TICK_SIZE } = this;

    if (!planet) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    const colors: PlanetCosmeticInfo = getPlanetCosmetic(planet);
    ctx.globalAlpha = 1;

    const perlin: (x: PixelCoords) => number = planetPerlin(planet.locationId);
    const rand: () => number = planetRandom(planet.locationId);

    function drawPath(arr: PixelCoords[]): void {
      if (arr.length < 3) return;

      ctx.beginPath();
      ctx.moveTo(arr[0].x, arr[0].y);

      for (let i = 1; i < arr.length; i++) {
        ctx.lineTo(arr[i].x, arr[i].y);
      }

      ctx.lineTo(arr[0].x, arr[0].y);
      ctx.fill();
    }

    function drawHill(fn: (x: number) => number): void {
      const arr: PixelCoords[] = [];
      const numTicks = Math.floor(canvas.width / TICK_SIZE);

      arr.push({ x: 0, y: canvas.height });

      for (let i = 0; i < numTicks; i++) {
        arr.push({
          x: i * TICK_SIZE,
          y: fn(i * TICK_SIZE),
        });
      }
      arr.push({ x: canvas.width, y: fn(canvas.width) });
      arr.push({ x: canvas.width, y: canvas.height });

      drawPath(arr);
    }
    const drawBlob = (cx, cy, r) => {
      const arr: PixelCoords[] = [];
      const ticks = 120;
      const offX = rand() * 100;
      const offY = rand() * 100;
      for (let i = 0; i < ticks; i++) {
        const t = (i * (Math.PI * 2)) / ticks;
        let x = r * Math.cos(t);
        let y = r * Math.sin(t);
        const p = perlin({ x: x * 1.2 + offX, y: y * 1.2 + offY });
        const rad = r * (1 + p * 0.3);

        x = rad * Math.cos(t);
        y = rad * Math.sin(t);

        arr.push({ x: x + cx, y: y + cy });
      }

      drawPath(arr);
    };
    if (canvas.width === 0 || canvas.height === 0) return;

    const { width, height } = canvas;

    // ctx.fillStyle = colors.backgroundColor;
    ctx.clearRect(0, 0, width, height);

    if (planet.planetResource === PlanetResource.SILVER) {
      const roidBase = height * 0.7;

      ctx.fillStyle = colors.secondaryColor;
      drawBlob(0.2 * width, roidBase - 30, 30);
      drawBlob(0.5 * width, roidBase - 50, 30);
      drawBlob(0.8 * width, roidBase - 30, 30);

      ctx.fillStyle = colors.secondaryColor2;
      drawBlob(0.35 * width, roidBase, 40);
      drawBlob(0.65 * width, roidBase, 40);
    } else {
      const oct1 = (p: PixelCoords) => 0.5 * perlin({ x: 2 * p.x, y: 2 * p.y });
      const oct2 = (p: PixelCoords) =>
        0.25 * perlin({ x: 4 * p.x, y: 4 * p.y });

      const mtn = (p: PixelCoords) => perlin(p) + oct1(p) + oct2(p);

      // const offset = Date.now() / 10;
      const offset = 0;

      const mtnBase = height * 0.7;
      const mtnHeight = 80;
      ctx.fillStyle = colors.secondaryColor;
      drawHill((x) => mtnBase + mtnHeight * mtn({ x: 2 * x + offset, y: 30 }));
      ctx.fillStyle = colors.secondaryColor2;
      drawHill(
        (x) => 7 + mtnBase + mtnHeight * mtn({ x: 2 * x + offset, y: 37 })
      );
      ctx.fillStyle = colors.secondaryColor3;
      drawHill(
        (x) => 14 + mtnBase + mtnHeight * mtn({ x: 2 * x + offset, y: 44 })
      );

      const hillBase = height * 0.74;
      const hillHeight = 10;
      ctx.fillStyle = colors.baseColor3;
      drawHill((x) => hillBase + hillHeight * perlin({ x, y: 0 }));
      ctx.fillStyle = colors.baseColor2;
      drawHill((x) => 5 + hillBase + hillHeight * perlin({ x, y: 5 }));
      ctx.fillStyle = colors.baseColor;
      drawHill((x) => 15 + hillBase + hillHeight * perlin({ x, y: 10 }));
    }
  }
}

// NOTE this refreshes every second like everything else; if it's slow we can cache a planet and wait for select
export function PlanetScape({
  planet,
  keepDrawing, // shitty solution but itll work for now
}: {
  planet: Planet | null;
  keepDrawing?: boolean;
}) {
  const [color, setColor] = useState<string>('none');

  const scapeRef = useRef<HTMLCanvasElement | null>(null);
  const moonRef = useRef<HTMLCanvasElement | null>(null);

  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(100);

  const [renderer, setRenderer] = useState<PlanetscapeRenderer | null>(null);

  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scapeRef.current) return;
    if (!moonRef.current) return;

    const newRenderer = new PlanetscapeRenderer(
      scapeRef.current,
      moonRef.current
    );
    setRenderer(newRenderer);

    return () => {
      newRenderer.destroy();
      setRenderer(null);
    };
  }, [scapeRef, moonRef]);

  // make sure canvas width matches element width
  useEffect(() => {
    if (!parentRef) return;

    if (parentRef.current === null) return;
    setWidth(parentRef.current.offsetWidth);
    setHeight(parentRef.current.offsetHeight);
  }, [parentRef, planet, renderer]);

  // make sure bg color matches planet
  useEffect(() => {
    const planetColors = getPlanetCosmetic(planet);
    setColor(planetColors.backgroundColor);
  }, [planet]);

  // sync renderer to planet
  useEffect(() => {
    renderer?.setPlanet(planet);
  }, [planet, renderer]);

  // finally make sure the scape gets drawin
  useEffect(() => {
    renderer?.drawScape();
  }, [planet, renderer, parentRef, scapeRef, width, height]);

  return (
    <PlanetScapeContainer ref={parentRef} style={{ background: color }}>
      {/* hacky but is it what it is */}
      <canvas
        width={width}
        height={height}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: '0',
          left: '0',
          background: 'none', // color fallback
        }}
        ref={moonRef}
      ></canvas>
      <canvas
        width={width}
        height={height}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: '0',
          left: '0',
        }}
        ref={scapeRef}
      ></canvas>
      {!keepDrawing && <PlanetIcons planet={planet} />}
    </PlanetScapeContainer>
  );
}
