import { EMPTY_LOCATION_ID } from '@darkforest_eth/constants';
import { Planet, PlanetType } from '@darkforest_eth/types';
import autoBind from 'auto-bind';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MineRenderer } from '../Renderers/GameRenderer/Entities/MineRenderer';
import PlanetRenderer from '../Renderers/GameRenderer/Entities/PlanetRenderer';
import { QuasarRenderer } from '../Renderers/GameRenderer/Entities/QuasarRenderer';
import { RuinsRenderer } from '../Renderers/GameRenderer/Entities/RuinsRenderer';
import { SpacetimeRipRenderer } from '../Renderers/GameRenderer/Entities/SpacetimeRipRenderer';
import { WebGLManager } from '../Renderers/GameRenderer/WebGL/WebGLManager';

const PlanetPreviewWrapper = styled.div<{ size: string; color: string }>`
  ${({ size, color }) => `
  position: relative;

  width: ${size};

  background: ${color};

  canvas {
    display: none;
    &:last-child {
      display: block;
      width: ${size};
      height: ${size};
    }
  }
`}
`;

/*
 * Renders the planet preview (thumb in planet context menu)
 */

class PlanetPreviewRenderer extends WebGLManager {
  planet: Planet | undefined;

  frameRequestId: number;

  planetRenderer: PlanetRenderer;
  mineRenderer: MineRenderer;
  quasarRenderer: QuasarRenderer;
  spacetimeRipRenderer: SpacetimeRipRenderer;
  ruinsRenderer: RuinsRenderer;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.planetRenderer = new PlanetRenderer(this);
    this.mineRenderer = new MineRenderer(this);
    this.quasarRenderer = new QuasarRenderer(this);
    this.spacetimeRipRenderer = new SpacetimeRipRenderer(this);
    this.ruinsRenderer = new RuinsRenderer(this);

    this.gl.enable(this.gl.DEPTH_TEST);

    this.flushOnce();

    this.loop();

    autoBind(this);
  }

  public destroy() {
    /* we're in bad territory if this ever gets called - it means there's a memory leak.
    you can't really clean up after WebGL contexts*/
    console.error('canceled PlanetPreview!');
    window.cancelAnimationFrame(this.frameRequestId);
  }

  public setPlanet(planet: Planet | undefined) {
    this.planet = planet;
  }

  // fixes https://github.com/darkforest-eth/darkforest/issues/1062
  private flushOnce() {
    this.planetRenderer.queuePlanetBodyScreen(
      {
        locationId: EMPTY_LOCATION_ID,
      } as Planet,
      10,
      0,
      0,
      0,
      0
    );
    this.planetRenderer.flush();
  }

  private loop() {
    this.clear();
    this.draw();

    this.frameRequestId = window.requestAnimationFrame(this.loop);
  }

  public clear(): void {
    const gl = this.gl;
    super.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  private draw(): void {
    if (!this.planet) return;
    const {
      planetRenderer: pR,
      mineRenderer: mR,
      quasarRenderer: qR,
      spacetimeRipRenderer: sR,
      ruinsRenderer: rR,
    } = this;
    const margin = 8;

    const dim = this.canvas.width;

    const x1 = margin;
    const y1 = margin;
    const x2 = dim - margin;
    const y2 = dim - margin;

    if (this.planet.planetType === PlanetType.SILVER_MINE) {
      mR.queueMineScreen(this.planet, { x: dim / 2, y: dim / 2 }, (dim - margin) * 0.35, -1);
      mR.flush();
    } else if (this.planet.planetType === PlanetType.SILVER_BANK) {
      qR.queueQuasarScreen(this.planet, { x: dim / 2, y: dim / 2 }, 0.4 * (dim - margin), -1);
      qR.flush();
    } else if (this.planet.planetType === PlanetType.TRADING_POST) {
      sR.queueRipScreen(this.planet, { x: dim / 2, y: dim / 2 }, 0.35 * (dim - margin), -1);
      sR.flush();
    } else if (this.planet.planetType === PlanetType.RUINS) {
      rR.queueRuinsScreen(this.planet, { x: dim / 2, y: dim / 2 }, 0.45 * (dim - margin), -1);
      rR.flush();
    } else {
      pR.queuePlanetBodyScreen(this.planet, dim / 2, x1, y1, x2, y2);
      pR.flush();
    }
  }
}

/**
 * The amount of instances of this is equal to the max amount of planet previews we have ever
 * displayed this session. We keep a pool of them because there's no clean way to clean up a webgl
 * context. If we didn't keep a pool, we would leak every time we rerenred a planet preview.
 */
interface PlanetPreviewContext {
  canvas: HTMLCanvasElement;
  renderer: PlanetPreviewRenderer;
}

const cachedWebGlContexts: PlanetPreviewContext[] = [];

function getContext() {
  if (cachedWebGlContexts.length !== 0) {
    return cachedWebGlContexts.pop();
  }

  const canvas = document.createElement('canvas');
  canvas.height = 100;
  canvas.width = 100;
  const renderer = new PlanetPreviewRenderer(canvas);

  return { canvas, renderer };
}

export function PlanetPreviewImage({ planet }: { planet: Planet | undefined }) {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>();
  const [context, setContext] = useState<PlanetPreviewContext | undefined>();

  // sync ref to renderer
  useEffect(() => {
    if (!containerRef) return;

    if (!context) {
      setContext(getContext());
      return;
    }
    if (containerRef.contains(context.canvas)) {
      return;
    }

    containerRef.appendChild(context.canvas);

    return () => {
      if (containerRef.contains(context.canvas)) {
        containerRef.removeChild(context.canvas);
        cachedWebGlContexts.push(context);
        setContext(undefined);
      }
    };
  }, [context, containerRef]);

  // sync planet to renderer
  useEffect(() => {
    context?.renderer?.setPlanet(planet);
  }, [planet, context]);

  return <div ref={setContainerRef}></div>;
}

export function PlanetPreview({ planet, size }: { planet: Planet | undefined; size: string }) {
  return (
    <PlanetPreviewWrapper size={size} color={'rgba(0,0,0,0)'}>
      <PlanetPreviewImage planet={planet} />
    </PlanetPreviewWrapper>
  );
}
