import React from 'react';
import { useHoverArtifactId, useUIManager } from '../Utils/AppHooks';
import { ArtifactCard } from './ArtifactCard';
import { HoverPane } from './HoverPane';

export function ArtifactHoverPane() {
  const uiManager = useUIManager();
  const hoverArtifactId = useHoverArtifactId(uiManager);

  return (
    <HoverPane
      visible={hoverArtifactId.value !== undefined}
      element={<ArtifactCard artifactId={hoverArtifactId.value} />}
    />
  );
}
