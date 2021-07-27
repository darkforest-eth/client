import {
  Artifact,
  ArtifactRarity,
  ArtifactRarityNames,
  ArtifactTypeNames,
  BiomeNames,
} from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { isAncient } from '../../../Backend/GameLogic/ArtifactUtils';
import { RarityColors } from '../../Styles/Colors';
import { LegendaryLabel } from './LegendaryLabel';
import { MythicLabel } from './MythicLabel';
// raw text

export const ArtifactRarityText = ({ artifact }: { artifact: Artifact }) => (
  <>{ArtifactRarityNames[artifact.rarity]}</>
);

export const ArtifactBiomeText = ({ artifact }: { artifact: Artifact }) => (
  <>{isAncient(artifact) ? 'Ancient' : BiomeNames[artifact.planetBiome]}</>
);

export const ArtifactTypeText = ({ artifact }: { artifact: Artifact }) => (
  <>{ArtifactTypeNames[artifact.artifactType]}</>
);

// colored labels

export const StyledArtifactRarityLabel = styled.span<{ rarity: ArtifactRarity }>`
  color: ${({ rarity }) => RarityColors[rarity]};
`;

export const ArtifactRarityLabel = ({ artifact }: { artifact: Artifact }) => (
  <StyledArtifactRarityLabel rarity={artifact.rarity}>
    <ArtifactRarityText artifact={artifact} />
  </StyledArtifactRarityLabel>
);

export const ArtifactRarityLabelAnim = ({ artifact }: { artifact: Artifact }) =>
  artifact.rarity === ArtifactRarity.Mythic ? (
    <MythicLabel />
  ) : artifact.rarity === ArtifactRarity.Legendary ? (
    <LegendaryLabel />
  ) : (
    <ArtifactRarityLabel artifact={artifact} />
  );

// combined labels

export const ArtifactRarityBiomeTypeText = ({ artifact }: { artifact: Artifact }) => (
  <>
    <ArtifactRarityText artifact={artifact} /> <ArtifactBiomeText artifact={artifact} />{' '}
    <ArtifactTypeText artifact={artifact} />
  </>
);
