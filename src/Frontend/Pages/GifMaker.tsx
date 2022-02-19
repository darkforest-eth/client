import { ArtifactFileColor } from '@darkforest_eth/gamelogic';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { GifRenderer } from '../Renderers/GifRenderer';

const IS_THUMB = true;
const GIF_DIM = IS_THUMB ? 90 : 350;
export const GIF_ARTIFACT_COLOR = ArtifactFileColor.APP_BACKGROUND;

const StyledGifMaker = styled.div`
  overflow-x: scroll;
  width: max-content;

  input {
    color: black;
  }

  img {
    margin-right: 4px;
  }
`;

/**
 * Entrypoint for gif and sprite generation, accessed via `yarn run gifs`.
 * Wait a second or so for the textures to get loaded, then click the buttons to download files as a zip.
 * gifs are saved as 60fps webm, and can take a while - open the console to see progress (logged verbosely)
 */
export function GifMaker() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [renderer, setRenderer] = useState<GifRenderer | null>(null);
  useEffect(() => {
    if (!canvasRef.current) return;

    setRenderer(new GifRenderer(canvasRef.current, GIF_DIM, IS_THUMB));
  }, [canvasRef]);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = '/public/CCapture.all.min.js';
    script.async = true;

    document.body.appendChild(script);
  }, []);

  return (
    <StyledGifMaker>
      <canvas width={GIF_DIM} height={GIF_DIM} ref={canvasRef}></canvas>
      <button onClick={() => renderer?.getAllSprites()}>Get All Sprites</button>
      <button onClick={() => renderer?.getAllVideos()}>Get All Videos</button>
    </StyledGifMaker>
  );
}
