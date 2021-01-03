import React, { useEffect, useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import dfstyles from '../../styles/dfstyles';
import { PlanetStatsInfo } from '../../utils/Utils';
import { Planet } from '../../_types/global/GlobalTypes';
import GameUIManager from '../board/GameUIManager';
import GameUIManagerContext from '../board/GameUIManagerContext';
import { PlanetIcons } from './PlanetIcons';
import { PlanetscapeRenderer } from './PlanetScapeRenderer';

const PlanetScapeContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  canvas {
    outline-offset: -1px;
    outline: 1px solid ${dfstyles.colors.text};

    position: absolute;
    top: 0;
    left: 0;
  }

  canvas {
    image-rendering: -moz-crisp-edges;
    image-rendering: -webkit-crisp-edges;
    image-rendering: pixelated;
    image-rendering: crisp-edges;
  }
`;

export const SCAPE_WIDTH = 320;
export const SCAPE_HEIGHT = 150;
export const SCAPE_SCALE = 1;

// NOTE this refreshes every second like everything else; if it's slow we can cache a planet and wait for select
export function PlanetScape({
  planet,
  info,
  keepDrawing, // shitty solution but itll work for now TODO remove this
}: {
  planet: Planet | null;
  info: PlanetStatsInfo | null;
  keepDrawing?: boolean;
}) {
  const scapeRef = useRef<HTMLCanvasElement | null>(null);
  const moonRef = useRef<HTMLCanvasElement | null>(null);

  const [renderer, setRenderer] = useState<PlanetscapeRenderer | null>(null);

  const parentRef = useRef<HTMLDivElement>(null);

  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);

  useEffect(() => {
    if (!renderer) return;
    renderer.setPaused(!keepDrawing);
  }, [keepDrawing, renderer]);

  // sync renderer to canvas
  useEffect(() => {
    if (!scapeRef.current || !uiManager || !moonRef.current) return;

    const newRenderer = new PlanetscapeRenderer(
      scapeRef.current,
      moonRef.current,
      uiManager
    );
    newRenderer.setPaused(!keepDrawing);
    setRenderer(newRenderer);

    return () => {
      newRenderer.destroy();
      setRenderer(null);
    };
  }, [scapeRef, moonRef, uiManager, keepDrawing]);

  // sync renderer to planet
  useEffect(() => {
    renderer?.setPlanet(planet, info);
  }, [planet, renderer, info]);

  const canvasW = SCAPE_WIDTH * SCAPE_SCALE + 'px';
  const canvasH = SCAPE_HEIGHT * SCAPE_SCALE + 'px';

  return (
    <PlanetScapeContainer ref={parentRef}>
      <canvas
        style={{
          width: canvasW,
          height: canvasH,
        }}
        width={SCAPE_WIDTH}
        height={SCAPE_HEIGHT}
        ref={moonRef}
      ></canvas>
      <canvas
        style={{
          width: canvasW,
          height: canvasH,
        }}
        width={SCAPE_WIDTH}
        height={SCAPE_HEIGHT}
        ref={scapeRef}
      ></canvas>
      {!keepDrawing && <PlanetIcons planet={planet} />}
    </PlanetScapeContainer>
  );
}
