import { Artifact, RarityNames } from '@darkforest_eth/types';
import React from 'react';
import { artifactBiomeAndName } from '../../Backend/Procedural/ArtifactProcgen';

export const ArtifactBiomeNameLabel = ({ artifact }: { artifact: Artifact }) => (
  <>{artifactBiomeAndName(artifact)}</>
);

export const ArtifactRarityBiomeNameLabel = ({ artifact }: { artifact: Artifact }) => (
  <>
    {RarityNames[artifact.rarity]} {artifactBiomeAndName(artifact)}{' '}
  </>
);
