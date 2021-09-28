import { Artifact } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { isActivated } from '../../../Backend/GameLogic/ArtifactUtils';
import { artifactName } from '../../../Backend/Procedural/ArtifactProcgen';
import { ArtifactImage } from '../../Components/ArtifactImage';
import { Spacer } from '../../Components/CoreUI';
import {
  ArtifactBiomeText,
  ArtifactRarityLabelAnim,
  ArtifactTypeText,
} from '../../Components/Labels/ArtifactLabels';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { Green, Smaller, Sub } from '../../Components/Text';
import dfstyles from '../../Styles/dfstyles';
import { ModalHandle } from '../../Views/ModalPane';
import { ArtifactDetailsHelpContent, ArtifactDetailsPane } from '../ArtifactDetailsPane';
import { UpgradeStatsView } from './UpgradeStatsView';

export function ArtifactListItem({
  artifact,
  actions,
  modal,
}: {
  artifact: Artifact | undefined;
  modal: ModalHandle;
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
    <ArtifactContainer
      key={artifact.id}
      onClick={() =>
        modal.push({
          title: 'Artifact Details',
          element: function artifactDetails() {
            return <ArtifactDetailsPane modal={modal} artifactId={artifact.id} />;
          },
          helpContent: ArtifactDetailsHelpContent(),
        })
      }
    >
      <ArtifactImageContainer>
        <ArtifactImage artifact={artifact} size={35} thumb />
      </ArtifactImageContainer>
      <Spacer width={16} />
      <ArtifactContent>
        {isActivated(artifact) && <Green>active</Green>} {artifactName(artifact)}{' '}
        <Smaller>
          <Sub>
            <ArtifactRarityLabelAnim rarity={artifact.rarity} />{' '}
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
  margin-bottom: 4px;
`;

const ArtifactContent = styled.div`
  height: 100%;
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  white-space: nowrap;
  flex-grow: 1;
  padding: 2px 4px;
`;

const ArtifactImageContainer = styled.div`
  display: inline-flex;
  background-color: ${dfstyles.colors.artifactBackground};
  justify-content: center;
  align-items: center;
  width: 45px;
  box-sizing: border-box;
  cursor: pointer;
  border-right: 1px solid ${dfstyles.colors.borderDark};

  &:hover {
    background-color: ${dfstyles.colors.artifactBackground};
  }
`;

const ArtifactContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 2px;
  border-radius: 3px;
  border: 1px solid ${dfstyles.colors.borderDark};
  background-color: ${dfstyles.colors.backgroundlight};
  cursor: pointer;

  &:hover {
    border: 1px solid ${dfstyles.colors.border};
    background-color: ${dfstyles.colors.backgroundlighter};
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
