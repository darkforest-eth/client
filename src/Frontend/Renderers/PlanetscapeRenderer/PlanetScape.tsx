import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Planet } from '@darkforest_eth/types';
import { PlanetscapeRenderer } from './PlanetScapeRenderer';
import { useUIManager } from '../../Utils/AppHooks';

const PlanetScapeContainer = styled.div`
  position: relative;

  canvas {
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;

    &:last-of-type {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;

export const SCAPE_WIDTH = 450;
export const SCAPE_HEIGHT = 150;

// NOTE this refreshes every second like everything else; if it's slow we can cache a planet and wait for select
export function PlanetScape({ planet }: { planet: Planet | undefined }) {
  const scapeRef = useRef<HTMLCanvasElement | null>(null);
  const moonRef = useRef<HTMLCanvasElement | null>(null);

  const [renderer, setRenderer] = useState<PlanetscapeRenderer | undefined>(undefined);

  const parentRef = useRef<HTMLDivElement | null>(null);

  const uiManager = useUIManager();

  // sync renderer to canvas
  useEffect(() => {
    if (!scapeRef.current || !uiManager || !moonRef.current) return;

    const newRenderer = new PlanetscapeRenderer(scapeRef.current, moonRef.current, uiManager);
    setRenderer(newRenderer);

    scapeRef.current.width = scapeRef.current.getBoundingClientRect().width;
    scapeRef.current.height = scapeRef.current.getBoundingClientRect().height;
    moonRef.current.width = moonRef.current.getBoundingClientRect().width;
    moonRef.current.width = moonRef.current.getBoundingClientRect().width;

    return () => {
      newRenderer.destroy();
      setRenderer(undefined);
    };
  }, [scapeRef, moonRef, uiManager]);

  // sync renderer to planet
  useEffect(() => {
    renderer?.setPlanet(planet);
  }, [planet, renderer]);

  const canvasH = SCAPE_HEIGHT + 'px';

  return (
    <PlanetScapeContainer ref={parentRef}>
      <canvas
        style={{
          width: '100%',
          height: canvasH,
        }}
        ref={moonRef}
      ></canvas>
      <canvas
        style={{
          width: '100%',
          height: canvasH,
        }}
        ref={scapeRef}
      ></canvas>
    </PlanetScapeContainer>
  );
}
