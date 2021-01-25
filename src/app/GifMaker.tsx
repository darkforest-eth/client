import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { GifRenderer } from './GifRenderer';
import styled from 'styled-components';
import _ from 'lodash';
import { ArtifactRarity, Biome } from '../_types/global/GlobalTypes';

const GIF_DIM = 350;

const StyledGifMaker = styled.div`
  canvas {
    border: 1px solid white;
  }

  input {
    color: black;
  }

  img {
    margin-right: 4px;
  }
`;

enum PreviewType {
  None,
  Image,
  Video,
}

/**
 * Entrypoint for gif and sprite generation, accessed via `yarn run gifs`.
 * Wait a second or so for the textures to get loaded, then click the buttons to download files as a zip.
 * gifs are saved as 60fps webm, and can take a while - open the console to see progress (logged verbosely)
 */
export function GifMaker() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [dim, setDim] = useState<number>(GIF_DIM);

  const [renderer, setRenderer] = useState<GifRenderer | null>(null);
  useEffect(() => {
    if (!canvasRef.current) return;

    setRenderer(new GifRenderer(canvasRef.current, GIF_DIM));
  }, [canvasRef]);

  useEffect(() => {
    renderer?.setDim(dim);
  }, [renderer, dim]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const syncVal = () => {
    inputRef.current && setDim(parseInt(inputRef.current.value) || 0);
  };

  useEffect(() => {
    const script = document.createElement('script');

    script.src = './public/CCapture.all.min.js';
    script.async = true;

    document.body.appendChild(script);
  }, []);

  const [preview, setPreview] = useState<PreviewType>(PreviewType.None);

  return (
    <StyledGifMaker>
      <canvas width={dim} height={dim} ref={canvasRef}></canvas>
      <br />
      <span>{dim}</span>
      <input ref={inputRef} type='text' />
      <button onClick={syncVal}>set value</button>
      <br />
      <button onClick={() => renderer?.getAllSprites()}>Get All Sprites</button>
      <button onClick={() => renderer?.getAllVideos()}>Get All Videos</button>

      <br />
      <p>
        Click the buttons below to preview from /public/img/artifacts/sprites
        and /public/img/artifacts/videos (for verifying that zips were created
        correctly)
      </p>
      <div>
        <button onClick={() => setPreview(PreviewType.Image)}>
          Click to Preview Images
        </button>
        <button onClick={() => setPreview(PreviewType.Video)}>
          Click to Preview Gifs
        </button>
      </div>
      <div>
        {_.range(1, 5).map((type) => (
          <div key={type}>
            {_.range(Biome.MIN, Biome.MAX + 1).map((biome) => (
              <>
                {_.range(
                  ArtifactRarity.Common,
                  ArtifactRarity.Legendary + 1
                ).map((rarity) => (
                  <>
                    {preview === PreviewType.Image && (
                      <img
                        key={type + '-' + biome + '-' + rarity + 'img'}
                        src={
                          '/public/img/artifacts/sprites/' +
                          GifRenderer.getName(type, biome, rarity, false)
                        }
                      />
                    )}
                    {preview === PreviewType.Video && (
                      <video
                        width={250}
                        loop
                        autoPlay
                        key={type + '-' + biome + '-' + rarity + 'vid'}
                      >
                        <source
                          src={
                            '/public/img/artifacts/videos/' +
                            GifRenderer.getName(type, biome, rarity, true)
                          }
                          type={'video/webm'}
                        />
                      </video>
                    )}
                  </>
                ))}
                <br />
              </>
            ))}
          </div>
        ))}
      </div>
    </StyledGifMaker>
  );
}
