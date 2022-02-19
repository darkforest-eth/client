import { ArtifactFileColor, artifactFileName, isSpaceShip } from '@darkforest_eth/gamelogic';
import { Artifact } from '@darkforest_eth/types';
import React from 'react';
import styled, { css } from 'styled-components';
import dfstyles from '../Styles/dfstyles';

export const ARTIFACT_URL = 'https://d2wspbczt15cqu.cloudfront.net/v0.6.0-artifacts/';
// const ARTIFACT_URL = '/public/img/artifacts/videos/';

function getArtifactUrl(thumb: boolean, artifact: Artifact, color: ArtifactFileColor): string {
  const fileName = artifactFileName(true, thumb, artifact, color);
  return ARTIFACT_URL + fileName;
}

export function ArtifactImage({
  artifact,
  size,
  thumb,
  bgColor,
}: {
  artifact: Artifact;
  size: number;
  thumb?: boolean;
  bgColor?: ArtifactFileColor;
}) {
  const url = getArtifactUrl(thumb || false, artifact, bgColor || ArtifactFileColor.BLUE);
  const image = isSpaceShip(artifact.artifactType) ? (
    <img width={size} height={size} src={url} />
  ) : (
    <video width={size} height={size} loop autoPlay key={artifact.id}>
      <source src={url} type={'video/webm'} />
    </video>
  );

  return (
    <Container width={size} height={size}>
      {image}
    </Container>
  );
}

const Container = styled.div`
  image-rendering: crisp-edges;

  ${({ width, height }: { width: number; height: number }) => css`
    width: ${width}px;
    height: ${height}px;
    min-width: ${width}px;
    min-height: ${height}px;
    background-color: ${dfstyles.colors.artifactBackground};
    display: inline-block;
  `}
`;
