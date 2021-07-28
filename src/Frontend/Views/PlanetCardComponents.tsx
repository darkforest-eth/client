import { Artifact, Planet } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { ArtifactImage } from '../Components/ArtifactImage';
import {
  ArtifactBiomeText,
  ArtifactRarityLabelAnim,
  ArtifactTypeText,
} from '../Components/Labels/ArtifactLabels';
import { Sub } from '../Components/Text';
import { TooltipName } from '../Game/WindowManager';
import { TooltipTrigger } from '../Panes/Tooltip';
import dfstyles from '../Styles/dfstyles';
import { planetBackground } from '../Styles/Mixins';

/**
 * Displayed in {@link PlanetContextPane} when a planet is {@code destroyed}.
 */
export const DestroyedMarker = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;

  background-image: url('/public/img/destroyedbg.png');
  background-size: 100px 100px;
  background-position: right bottom;
  background-repeat: no-repeat;
`;

const StyledTimesTwo = styled.span`
  color: ${dfstyles.colors.dfgreen};
  font-size: 0.8em;
  vertical-align: center;
  line-height: 1.5em;
  margin-left: 8px;
`;

export const TimesTwo = () => <StyledTimesTwo>x2</StyledTimesTwo>;

/**
 * Expands to fit the width of container. Is itself a flex box that spreads out its children
 * horizontally.
 */
export const SpreadApart = styled.div`
  width: 100%;
  box-sizing: border-box;
  flex-grow: 1;
  display: inline-flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;

  &:first-child {
    border-left: none;
  }
`;

export const RowTip = ({ name, children }: { name: TooltipName; children: React.ReactNode }) => (
  <TooltipTrigger name={name} style={{ lineHeight: '100%', position: 'relative', top: '0.2em' }}>
    {children}
  </TooltipTrigger>
);

export const TitleBar = styled.div`
  height: 2em;
  padding: 0.25em 0.5em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${dfstyles.colors.border};
`;

const StyledPlanetActiveArtifact = styled.div<{ planet: Planet | undefined }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0.4em;
  align-items: center;

  font-size: ${dfstyles.fontSizeXS};

  ${planetBackground}
`;

const ImageWrapper = styled.span`
  display: inline-block;
  border: 1px solid ${dfstyles.colors.subtext};
  margin-right: 0.4em;

  width: 22px;
  height: 22px;
`;

export function PlanetActiveArtifact({
  artifact,
  planet,
}: {
  artifact: Artifact;
  planet: Planet | undefined;
}) {
  return (
    <StyledPlanetActiveArtifact planet={planet}>
      <ImageWrapper>
        <ArtifactImage artifact={artifact} size={20} thumb />
      </ImageWrapper>
      <Sub>
        Active:
        <ArtifactRarityLabelAnim artifact={artifact} /> <ArtifactBiomeText artifact={artifact} />{' '}
        <ArtifactTypeText artifact={artifact} />
      </Sub>
    </StyledPlanetActiveArtifact>
  );
}
