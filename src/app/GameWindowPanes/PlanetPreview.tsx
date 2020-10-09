import autoBind from 'auto-bind';
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import dfstyles from '../../styles/dfstyles';
import {
  getPlanetCosmetic,
  PixelCoords,
  planetPerlin,
  planetRandom,
} from '../../utils/ProcgenUtils';
import { Planet, PlanetResource } from '../../_types/global/GlobalTypes';
import { PlanetIcons } from './PlanetScape';

const StyledPlanetPreview = styled.div`
  position: relative;

  width: 128px;
  height: 128px;
  border: 1px solid white;

  background: ${dfstyles.game.canvasbg};

  canvas {
    display: none;
    &:last-child {
      display: block;
      width: 128px;
      height: 128px;
    }
  }
`;

class PlanetPreviewRenderer {
  planet: Planet | null;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  bufferCanvas: HTMLCanvasElement;
  bufferCtx: CanvasRenderingContext2D;

  frameRequestId: number;

  constructor(canvas: HTMLCanvasElement, bufferCanvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Not a 2D canvas.');
    this.ctx = ctx;

    this.bufferCanvas = bufferCanvas;
    const bufferCtx = bufferCanvas.getContext('2d');
    if (!bufferCtx) throw new Error('Not a 2D canvas.');
    this.bufferCtx = bufferCtx;

    this.ctx.imageSmoothingEnabled = false;

    autoBind(this);
    this.draw();
  }

  destroy() {
    window.cancelAnimationFrame(this.frameRequestId);
  }

  setPlanet(planet: Planet | null) {
    this.planet = planet;
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height
    );
  }

  draw() {
    this.clear();
    if (this.planet?.planetResource === PlanetResource.NONE) {
      this.drawPlanet();
    } else {
      this.drawAsteroids();
    }

    // this.frameRequestId = window.requestAnimationFrame(this.draw);
  }

  drawAsteroids(): void {
    const { ctx, bufferCtx, bufferCanvas, planet } = this;
    const colors = getPlanetCosmetic(planet);
    const perlin = planet
      ? planetPerlin(planet.locationId)
      : (_: PixelCoords) => 0;
    const rand = planet ? planetRandom(planet.locationId) : () => 0;

    const mid = { x: bufferCanvas.width / 2, y: bufferCanvas.height / 2 };

    bufferCtx.save();
    bufferCtx.translate(mid.x, mid.y); // push translate

    const blobPath = (cx, cy, r) => {
      bufferCtx.save();
      bufferCtx.translate(cx, cy);

      bufferCtx.beginPath();
      bufferCtx.moveTo(r, 0);
      const offX = rand() * 100;
      const offY = rand() * 100;
      for (let i = 0; i < 12; i++) {
        const t = (i * (Math.PI * 2)) / 12;
        let x = r * Math.cos(t);
        let y = r * Math.sin(t);
        const p = perlin({ x: 5 * x + offX, y: 5 * y + offY });
        const rad = r * (1 + p * 0.5);

        x = rad * Math.cos(t);
        y = rad * Math.sin(t);

        bufferCtx.lineTo(x, y);
      }
      bufferCtx.closePath();
      bufferCtx.restore();
    };

    const drawAsteroid = (cx, cy) => {
      bufferCtx.save();
      bufferCtx.translate(cx, cy);

      blobPath(cx, cy, 10);
      bufferCtx.fillStyle = colors.previewColor;
      bufferCtx.fill();
      bufferCtx.strokeStyle = colors.asteroidColor;
      bufferCtx.stroke();
      bufferCtx.strokeStyle = 'black';
      bufferCtx.globalAlpha = 0.7;
      bufferCtx.stroke();
      bufferCtx.globalAlpha = 1;

      bufferCtx.clip();

      bufferCtx.fillStyle = colors.asteroidColor;
      const offset = () => -10 + rand() * 20;
      const count = rand() * 3 + 1;
      for (let i = 0; i < count; i++) {
        blobPath(cx + offset(), cy + offset(), 3);
        bufferCtx.fill();
      }

      bufferCtx.restore();
    };

    for (let i = 0; i < 5; i++) {
      const t = (i * (2 * Math.PI)) / 5;
      const x = 10 * Math.cos(t);
      const y = 10 * Math.sin(t);
      drawAsteroid(x, y);
    }

    bufferCtx.restore(); // pop translate

    ctx.drawImage(bufferCanvas, 0, 0, 128, 128);
  }

  drawPlanet(): void {
    const { ctx, bufferCtx, bufferCanvas, planet } = this;

    const colors = getPlanetCosmetic(planet);
    const perlin = planet
      ? planetPerlin(planet.locationId)
      : (_: PixelCoords) => 0;

    const mid = { x: bufferCanvas.width / 2, y: bufferCanvas.height / 2 };

    bufferCtx.beginPath();
    bufferCtx.arc(mid.x, mid.y, 20, 0, 2 * Math.PI);
    bufferCtx.fillStyle = colors.baseColor;
    bufferCtx.fill();

    bufferCtx.save(); // push clip
    bufferCtx.clip();

    bufferCtx.fillStyle = colors.backgroundColor;
    for (let x = 0; x < bufferCanvas.width; x++) {
      for (let y = 0; y < bufferCanvas.height; y++) {
        if (perlin({ x: x * 4, y: y * 4 }) > 0.4)
          bufferCtx.fillRect(x, y, 1, 1);
      }
    }

    // draw right side shadow
    const rad = 24;
    const offX = 10;

    // push rotate
    bufferCtx.translate(mid.x, mid.y);
    bufferCtx.rotate(0.4);
    bufferCtx.translate(-mid.x, -mid.y);

    bufferCtx.beginPath();
    bufferCtx.moveTo(mid.x - offX, 0);
    bufferCtx.lineTo(mid.x - offX, mid.y - (rad + 2));
    bufferCtx.arc(mid.x - offX, mid.y, rad, -0.5 * Math.PI, 0.5 * Math.PI);
    bufferCtx.lineTo(mid.x - offX, bufferCanvas.height);
    bufferCtx.lineTo(bufferCanvas.width, bufferCanvas.height);
    bufferCtx.lineTo(bufferCanvas.width, 0);

    bufferCtx.fillStyle = 'black';
    bufferCtx.globalAlpha = 0.2;
    bufferCtx.fill();
    bufferCtx.globalAlpha = 1;

    bufferCtx.restore(); // pop clip, rotate
    // draw clouds
    bufferCtx.beginPath();
    bufferCtx.arc(mid.x, mid.y, 23, 0, 2 * Math.PI);

    bufferCtx.save();
    bufferCtx.clip(); // push clip

    bufferCtx.fillStyle = 'white';
    bufferCtx.globalAlpha = 0.7;
    for (let x = 0; x < bufferCanvas.width; x++) {
      for (let y = 0; y < bufferCanvas.height; y++) {
        if (perlin({ x: x + 10 /* + Date.now() / 100*/, y: y * 8 + 10 }) > 0.5)
          bufferCtx.fillRect(x, y, 1, 1);
      }
    }
    bufferCtx.globalAlpha = 1.0;

    bufferCtx.restore(); // pop clip

    ctx.drawImage(bufferCanvas, 0, 0, 128, 128);
  }
}

export function PlanetPreview({ selected }: { selected: Planet | null }) {
  const bufferRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [renderer, setRenderer] = useState<PlanetPreviewRenderer | null>(null);

  // sync ref to renderer
  useEffect(() => {
    if (canvasRef.current && bufferRef.current)
      setRenderer(
        new PlanetPreviewRenderer(canvasRef.current, bufferRef.current)
      );
  }, [canvasRef, bufferRef]);

  // sync planet to renderer
  useEffect(() => {
    if (!renderer) return;
    renderer.setPlanet(selected);

    renderer.draw();
  }, [selected, renderer]);

  return (
    <StyledPlanetPreview>
      <PlanetIcons planet={selected} />
      <canvas ref={bufferRef} width={64} height={64}></canvas>
      <canvas ref={canvasRef} width={128} height={128}></canvas>
    </StyledPlanetPreview>
  );
}
