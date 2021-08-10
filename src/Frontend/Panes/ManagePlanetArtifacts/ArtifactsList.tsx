import { Artifact, Upgrade } from '@darkforest_eth/types';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { isActivated } from '../../../Backend/GameLogic/ArtifactUtils';
import { CenterBackgroundSubtext } from '../../Components/CoreUI';
import { ModalHandle } from '../../Views/ModalPane';
import { ArtifactListItem } from './ArtifactListItem';

export function ArtifactsList({
  artifacts,
  sortBy,
  modal,
  actions,
}: {
  artifacts: Array<Artifact | undefined>;
  sortBy: keyof Upgrade | undefined;
  modal: ModalHandle;
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
          No Artifacts <br />
          On This Planet
        </CenterBackgroundSubtext>
      )}
      {sortedArtifacts.map((a, i) => (
        <ArtifactListItem key={a?.id || i} artifact={a} actions={actions} modal={modal} />
      ))}
    </ArtifactsListContainer>
  );
}

const ArtifactsListContainer = styled.div`
  height: 250px;
  width: 100%;
  overflow-y: scroll;
`;
