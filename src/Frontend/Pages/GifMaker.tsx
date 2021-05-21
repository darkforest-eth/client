import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Biome, ArtifactRarity, ArtifactType } from '@darkforest_eth/types';
import { GifRenderer, GIF_ARTIFACT_COLOR } from '../Renderers/GifRenderer';
import { artifactFileName } from '../../Backend/GameLogic/ArtifactUtils';
import { EMPTY_LOCATION_ID } from '@darkforest_eth/constants';

const GIF_DIM = 90;

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

enum PreviewType {
  None,
  Image,
  Video,
}

const IS_THUMB = true;

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

    setRenderer(new GifRenderer(canvasRef.current, GIF_DIM, IS_THUMB));
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
        Click the buttons below to preview from /public/img/artifacts/sprites and
        /public/img/artifacts/videos (for verifying that zips were created correctly)
      </p>
      <div>
        <button onClick={() => setPreview(PreviewType.Image)}>Click to Preview Images</button>
        <button onClick={() => setPreview(PreviewType.Video)}>Click to Preview Gifs</button>
      </div>
      <div>
        <h1>Artifacts</h1>
        {_.range(ArtifactType.Monolith, ArtifactType.Pyramid + 1).map((type) => (
          <div key={type}>
            {_.range(ArtifactRarity.Common, ArtifactRarity.Mythic + 1).map((rarity) => (
              <div key={rarity}>
                {_.range(Biome.MIN, Biome.MAX + 1).map((biome, i) => (
                  <ArtifactPreviewer
                    key={i}
                    type={type}
                    biome={biome}
                    rarity={rarity}
                    preview={preview}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
        <h1>Relics</h1>
        {_.range(ArtifactType.Wormhole, ArtifactType.BlackDomain + 1).map((type) => (
          <div key={type}>
            {_.range(ArtifactRarity.Common, ArtifactRarity.Mythic + 1).map((rarity, i) => (
              <ArtifactPreviewer key={i} type={type} biome={1} rarity={rarity} preview={preview} />
            ))}
          </div>
        ))}
        <h1>Ancient</h1>
        {_.range(ArtifactType.MIN, ArtifactType.MAX + 1).map((type) => (
          <div key={type}>
            {_.range(ArtifactRarity.Common, ArtifactRarity.Mythic + 1).map((rarity, i) => (
              <ArtifactPreviewer
                key={i}
                type={type}
                biome={1}
                rarity={rarity}
                preview={preview}
                ancient
              />
            ))}
          </div>
        ))}
      </div>
    </StyledGifMaker>
  );
}

function ArtifactPreviewer({
  type,
  biome,
  rarity,
  ancient,
  preview,
}: {
  type: ArtifactType;
  biome: Biome;
  rarity: ArtifactRarity;
  ancient?: boolean;
  preview: PreviewType;
}) {
  if (preview !== PreviewType.Video) return <></>;

  return (
    <video width={250} loop autoPlay key={type + '-' + biome + '-' + rarity + 'vid'}>
      <source
        src={
          '/public/img/artifacts/videos/' +
          artifactFileName(
            true,
            IS_THUMB,
            {
              artifactType: type,
              planetBiome: biome,
              rarity,
              id: EMPTY_LOCATION_ID,
            },
            GIF_ARTIFACT_COLOR,
            { forceAncient: ancient === true, skipCaching: true }
          )
        }
        type={'video/webm'}
      />
    </video>
  );
}
