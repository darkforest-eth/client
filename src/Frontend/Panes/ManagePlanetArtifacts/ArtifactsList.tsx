import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Artifact, ArtifactId, Upgrade } from '@darkforest_eth/types';
import { isActivated } from '../../../Backend/GameLogic/ArtifactUtils';
import { CenterBackgroundSubtext } from '../../Components/CoreUI';
import { ArtifactListItem } from './ArtifactListItem';

export function ArtifactsList({
  artifacts,
  sortBy,
  openArtifactDetails,
  actions,
}: {
  artifacts: Array<Artifact | undefined>;
  sortBy: keyof Upgrade | undefined;
  openArtifactDetails: (artifactId: ArtifactId) => void;
  actions: (artifact: Artifact) => React.ReactElement | undefined;
}) {
  const [sortedArtifacts, setSortedArtifacts] = useState([...artifacts]);

  useEffect(() => {
    setSortedArtifacts(
      _.orderBy(
        artifacts,
        [
          (item) => (isActivated(item) ? 1 : 0),
          (item) => (item && sortBy !== undefined ? item.upgrade[sortBy] : 0),
        ],
        ['desc', 'desc']
      )
    );
  }, [artifacts, sortBy]);

  return (
    <ArtifactsListContainer>
      {sortedArtifacts.length === 0 && (
        <CenterBackgroundSubtext width='100%' height='100%'>
          No Artifacts
        </CenterBackgroundSubtext>
      )}
      {sortedArtifacts.map((a, i) => (
        <ArtifactListItem
          key={a?.id + '' + i}
          artifact={a}
          actions={actions}
          openArtifactDetails={openArtifactDetails}
        />
      ))}
    </ArtifactsListContainer>
  );
}

const ArtifactsListContainer = styled.div`
  height: 250px;
  width: 100%;
  overflow-y: scroll;
`;
