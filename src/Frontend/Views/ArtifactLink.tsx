import { artifactName } from '@darkforest_eth/procedural';
import { Artifact, LocationId } from '@darkforest_eth/types';
import React, { useCallback, useEffect } from 'react';
import { Link } from '../Components/CoreUI';
import { ArtifactDetailsPane } from '../Panes/ArtifactDetailsPane';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { ModalHandle } from './ModalPane';

export function ArtifactLink({
  modal,
  children,
  artifact,
  depositOn,
}: {
  modal?: ModalHandle;
  artifact: Artifact;
  children: React.ReactNode | React.ReactNode[];
  depositOn?: LocationId;
}) {
  const uiManager = useUIManager();

  useEffect(() => {
    // this is called when the component is unrendered
    return () => uiManager?.setHoveringOverArtifact(undefined);
  }, [uiManager]);

  const onClick = useCallback(() => {
    uiManager?.setHoveringOverArtifact(undefined);
    modal &&
      modal.push({
        element() {
          return (
            <ArtifactDetailsPane depositOn={depositOn} artifactId={artifact?.id} modal={modal} />
          );
        },
        title: artifactName(artifact),
      });
  }, [artifact, modal, depositOn, uiManager]);

  return (
    <Link
      color={dfstyles.colors.text}
      onClick={onClick}
      onMouseDown={() => {
        uiManager?.setHoveringOverArtifact(undefined);
      }}
      onMouseEnter={() => {
        uiManager?.setHoveringOverArtifact(artifact.id);
      }}
      onMouseLeave={() => {
        uiManager?.setHoveringOverArtifact(undefined);
      }}
    >
      {children}
    </Link>
  );
}
