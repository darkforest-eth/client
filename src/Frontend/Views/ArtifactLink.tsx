import { Artifact } from '@darkforest_eth/types';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { artifactName } from '../../Backend/Procedural/ArtifactProcgen';
import { ArtifactDetailsPane } from '../Panes/ArtifactDetailsPane';
import dfstyles from '../Styles/dfstyles';
import { ModalHandle } from './ModalPane';

export function ArtifactLink({
  modal,
  children,
  artifact,
}: {
  modal: ModalHandle;
  artifact: Artifact;
  children: React.ReactNode | React.ReactNode[];
}) {
  const onClick = useCallback(() => {
    modal.push({
      element: <ArtifactDetailsPane artifactId={artifact?.id} modal={modal} />,
      title: artifactName(artifact),
    });
  }, [artifact, modal]);

  return <LinkContainer onClick={onClick}>{children}</LinkContainer>;
}

const LinkContainer = styled.span`
  color: ${dfstyles.colors.subtext};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: white;
  }
`;
