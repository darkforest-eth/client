import { Artifact } from '@darkforest_eth/types';
import React, { useCallback } from 'react';
import { artifactName } from '../../Backend/Procedural/ArtifactProcgen';
import { Link } from '../Components/CoreUI';
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
      element() {
        return <ArtifactDetailsPane artifactId={artifact?.id} modal={modal} />;
      },
      title: artifactName(artifact),
    });
  }, [artifact, modal]);

  return (
    <Link color={dfstyles.colors.text} onClick={onClick}>
      {children}
    </Link>
  );
}
