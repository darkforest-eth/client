import { Artifact } from '@darkforest_eth/types';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';

export function ArtifactLink({
  artifact,
  setDetailsOpen,
  children,
}: {
  artifact: Artifact;
  setDetailsOpen: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const uiManager = useUIManager();

  const openArtifactDetails = useCallback(() => {
    uiManager.selectedArtifactId$.publish(artifact.id);
    setDetailsOpen(true);
  }, [uiManager, artifact, setDetailsOpen]);

  return <LinkContainer onClick={openArtifactDetails}>{children}</LinkContainer>;
}

const LinkContainer = styled.span`
  color: ${dfstyles.colors.subtext};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: white;
  }
`;
