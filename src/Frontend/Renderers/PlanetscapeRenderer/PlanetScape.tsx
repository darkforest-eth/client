import { Planet, PlanetType } from '@darkforest_eth/types';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Wrapper } from '../../../Backend/Utils/Wrapper';
import dfstyles from '../../Styles/dfstyles';
import { useUIManager } from '../../Utils/AppHooks';
import { PlanetscapeRenderer } from './PlanetScapeRenderer';

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

const ArtifactLabel = styled.div`
  border: 1px solid ${dfstyles.colors.subtext};
  color: ${dfstyles.colors.subtext};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;

  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  & > p {
    width: 12em;
    display: inline-block;
    margin: 0 auto;
  }

  background: none;
`;

export const SCAPE_WIDTH = 450;
export const SCAPE_HEIGHT = 150;

// NOTE this refreshes every second like everything else; if it's slow we can cache a planet and wait for select
export function PlanetScape({ wrapper: p }: { wrapper: Wrapper<Planet | undefined> }) {
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
    renderer?.setPlanet(p.value);
  }, [p, renderer]);

  const canvasH = SCAPE_HEIGHT + 'px';

  return (
    <PlanetScapeContainer ref={parentRef}>
      {p &&
        p.value &&
        p.value.heldArtifactIds.length === 0 &&
        p.value.planetType !== PlanetType.PLANET && (
          <ArtifactLabel>
            <p>Artifacts on this planet will appear here</p>
          </ArtifactLabel>
        )}
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
