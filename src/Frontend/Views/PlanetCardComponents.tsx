import { Artifact, Planet, TooltipName } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import {
  ArtifactBiomeText,
  ArtifactRarityLabelAnim,
  ArtifactTypeText,
} from '../Components/Labels/ArtifactLabels';
import { Sub, White } from '../Components/Text';
import { TooltipTrigger } from '../Panes/Tooltip';
import dfstyles from '../Styles/dfstyles';

const BonusStyle = styled.span`
  color: ${dfstyles.colors.dfgreen};
  font-size: 0.8em;
  vertical-align: center;
  line-height: 1.5em;
  margin-left: 8px;
`;

export const TimesTwo = () => <BonusStyle>x2</BonusStyle>;
export const Halved = () => <BonusStyle>%2</BonusStyle>;

export const RowTip = ({ name, children }: { name: TooltipName; children: React.ReactNode }) => (
  <TooltipTrigger
    name={name}
    style={{ lineHeight: '100%', position: 'relative', top: '0.2em', cursor: 'help' }}
  >
    {children}
  </TooltipTrigger>
);

export const TitleBar = styled.div`
  height: 2em;
  padding: 0.25em 0.5em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: ${dfstyles.colors.subtext};
  border-bottom: 1px solid ${dfstyles.colors.border};
`;

const StyledPlanetActiveArtifact = styled.div<{ planet: Planet | undefined }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  color: ${dfstyles.colors.text};
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
      <Sub>
        Active Artifact:{' '}
        <White>
          {' '}
          <ArtifactRarityLabelAnim rarity={artifact.rarity} />{' '}
          <ArtifactBiomeText artifact={artifact} /> <ArtifactTypeText artifact={artifact} />
        </White>
      </Sub>
    </StyledPlanetActiveArtifact>
  );
}
