import { Artifact, ArtifactId } from '@darkforest_eth/types';
import React from 'react';
import styled, { css } from 'styled-components';
import { isActivated } from '../../../Backend/GameLogic/ArtifactUtils';
import { ArtifactImage } from '../../Components/ArtifactImage';
import {
  ArtifactBiomeText,
  ArtifactRarityLabelAnim,
  ArtifactTypeText,
} from '../../Components/Labels/ArtifactLabels';
import { Spacer } from '../../Components/CoreUI';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { Smaller, Sub } from '../../Components/Text';
import dfstyles from '../../Styles/dfstyles';
import { UpgradeStatsView } from './UpgradeStatsView';
import { artifactName } from '../../../Backend/Procedural/ArtifactProcgen';

export function ArtifactListItem({
  artifact,
  openArtifactDetails,
  actions,
}: {
  artifact: Artifact | undefined;
  openArtifactDetails: (artifactId: ArtifactId) => void;
  actions: (artifact: Artifact) => React.ReactElement | undefined;
}) {
  if (artifact === undefined) {
    return (
      <ArtifactContainer>
        <Center>
          <Smaller>
            <LoadingSpinner initialText={'Loading Artifact...'} />
          </Smaller>
        </Center>
      </ArtifactContainer>
    );
  }

  return (
    <ArtifactContainer key={artifact.id} isActive={isActivated(artifact)}>
      <ArtifactImageContainer onClick={() => openArtifactDetails(artifact.id)}>
        <ArtifactImage artifact={artifact} size={35} thumb />
      </ArtifactImageContainer>
      <Spacer width={16} />
      <ArtifactContent>
        {artifactName(artifact)}
        <Spacer width={8} />
        <Smaller>
          <Sub>
            <ArtifactRarityLabelAnim artifact={artifact} />{' '}
            <ArtifactBiomeText artifact={artifact} /> <ArtifactTypeText artifact={artifact} />
          </Sub>
        </Smaller>
        {actions(artifact)}
        <br />
        <SecondRow>
          <UpgradeStatsView
            artifactType={artifact.artifactType}
            upgrade={artifact.upgrade}
            isActive={isActivated(artifact)}
          />
        </SecondRow>
      </ArtifactContent>
    </ArtifactContainer>
  );
}

const SecondRow = styled.div`
  line-height: 0;
  margin-top: 4px;
`;

const ArtifactContent = styled.div`
  height: 100%;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  white-space: nowrap;
  flex-grow: 1;
`;

const ArtifactImageContainer = styled.div`
  display: inline-flex;
  background-color: ${dfstyles.colors.artifactBackground};
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 100%;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    border: 1px solid white;
  }
`;

const ArtifactContainer = styled.div`
  ${({ isActive }: { isActive?: boolean }) => css`
    position: relative;
    height: 45px;
    background-color: ${isActive
      ? dfstyles.colors.backgroundlighter
      : dfstyles.colors.backgroundlight};
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 2px;
    border-radius: 2px;
  `}
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
