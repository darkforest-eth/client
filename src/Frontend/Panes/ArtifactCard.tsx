import { ArtifactId } from '@darkforest_eth/types';
import React from 'react';
import { Padded } from '../Components/CoreUI';
import { useUIManager } from '../Utils/AppHooks';
import { ArtifactDetailsBody } from './ArtifactDetailsPane';

export function ArtifactCard({ artifactId }: { artifactId?: ArtifactId }) {
  const uiManager = useUIManager();

  if (!artifactId) return null;

  return (
    <Padded>
      <ArtifactDetailsBody
        noActions={true}
        artifactId={artifactId}
        contractConstants={uiManager.contractConstants}
      />
    </Padded>
  );
}
