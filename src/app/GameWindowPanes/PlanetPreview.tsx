import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import dfstyles from '../../styles/dfstyles';
import { Planet, PlanetResource } from '../../_types/global/GlobalTypes';
import { mat4 } from 'gl-matrix';
import { WebGLManager } from '../renderer/webgl/WebGLManager';
import PlanetRenderer from '../renderer/entities/PlanetRenderer';
import { MineRenderer } from '../renderer/entities/MineRenderer';
import { PlanetIcons } from '../planetscape/PlanetIcons';

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

/*
 * Renders the planet preview (thumb in planet context menu)
 */

class PlanetPreviewRenderer extends WebGLManager {
  planet: Planet | null;

  frameRequestId: number;

  planetRenderer: PlanetRenderer;

  mineRenderer: MineRenderer;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.canvas = canvas;
    const gl = canvas.getContext('webgl2');
    if (!gl) {
      console.error('error getting webgl2 context');
      return;
    }
    this.gl = gl;

    this.projectionMatrix = mat4.create();
    this.setProjectionMatrix();
    this.planetRenderer = new PlanetRenderer(this);
    this.mineRenderer = new MineRenderer(this);

    gl.enable(gl.DEPTH_TEST);

    this.loop();
  }

  public destroy() {
    window.cancelAnimationFrame(this.frameRequestId);
  }

  public setPlanet(planet: Planet | null) {
    this.planet = planet;
  }

  public loop() {
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
    const { planetRenderer: pR, mineRenderer: mR } = this;
    const margin = 10;

    const dim = this.canvas.width;

    const x1 = margin;
    const y1 = margin;
    const x2 = dim - margin;
    const y2 = dim - margin;

    if (this.planet.planetResource === PlanetResource.SILVER) {
      mR.queueMineScreen(
        this.planet,
        { x: dim / 2, y: dim / 2 },
        (dim - margin) / 2,
        -1
      );
      mR.flush();
    } else {
      pR.queuePlanetBodyScreen(this.planet, dim / 2, x1, y1, x2, y2);
      pR.flush();
    }
  }
}

export function PlanetPreview({ selected }: { selected: Planet | null }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [renderer, setRenderer] = useState<PlanetPreviewRenderer | null>(null);

  // sync ref to renderer
  useEffect(() => {
    if (canvasRef.current)
      setRenderer(new PlanetPreviewRenderer(canvasRef.current));
  }, [canvasRef]);

  // sync planet to renderer
  useEffect(() => {
    if (!renderer) return;
    renderer.setPlanet(selected);

    renderer.loop();
  }, [selected, renderer]);

  return (
    <StyledPlanetPreview>
      <PlanetIcons planet={selected} />
      <canvas ref={canvasRef} width={128} height={128}></canvas>
    </StyledPlanetPreview>
  );
}
