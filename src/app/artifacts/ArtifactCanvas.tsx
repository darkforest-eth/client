import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import dfstyles from '../../styles/dfstyles';
import { Artifact } from '../../_types/global/GlobalTypes';
import { ArtifactDetailsRenderer } from './ArtifactDetailsRenderer';

const artifactW = 128;
const artifactM = 12;
export const artifactCanvasDim = artifactW + 2 * artifactM;

const StyledArtifactCanvas = styled.div`
  background: ${dfstyles.game.canvasbg};
`;

export function ArtifactCanvas({
  artifact,
  visible,
}: {
  artifact: Artifact | null;
  visible: boolean;
}) {
  const [renderer, setRenderer] = useState<ArtifactDetailsRenderer | null>(
    null
  );

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    setRenderer(new ArtifactDetailsRenderer(canvasRef.current, artifactM));
  }, [canvasRef]);

  useEffect(() => {
    renderer?.setVisible(visible);
  }, [visible, renderer]);

  useEffect(() => {
    renderer?.setArtifact(artifact);
  }, [artifact, renderer]);

  return (
    <StyledArtifactCanvas>
      <canvas
        width={artifactCanvasDim}
        height={artifactCanvasDim}
        ref={canvasRef}
      ></canvas>
    </StyledArtifactCanvas>
  );
}
