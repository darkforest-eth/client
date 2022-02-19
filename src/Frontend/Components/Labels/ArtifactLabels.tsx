import { isAncient } from '@darkforest_eth/gamelogic';
import {
  Artifact,
  ArtifactRarity,
  ArtifactRarityNames,
  ArtifactTypeNames,
  BiomeNames,
} from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { RarityColors } from '../../Styles/Colors';
import { LegendaryLabel } from './LegendaryLabel';
import { MythicLabel } from './MythicLabel';

export const ArtifactRarityText = ({ rarity }: { rarity: ArtifactRarity }) => (
  <>{ArtifactRarityNames[rarity]}</>
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

export const ArtifactRarityLabel = ({ rarity }: { rarity: ArtifactRarity }) => (
  <StyledArtifactRarityLabel rarity={rarity}>
    <ArtifactRarityText rarity={rarity} />
  </StyledArtifactRarityLabel>
);

export const ArtifactRarityLabelAnim = ({ rarity }: { rarity: ArtifactRarity }) =>
  rarity === ArtifactRarity.Mythic ? (
    <MythicLabel />
  ) : rarity === ArtifactRarity.Legendary ? (
    <LegendaryLabel />
  ) : (
    <ArtifactRarityLabel rarity={rarity} />
  );

// combined labels

export const ArtifactRarityBiomeTypeText = ({ artifact }: { artifact: Artifact }) => (
  <>
    <ArtifactRarityText rarity={artifact.rarity} /> <ArtifactBiomeText artifact={artifact} />{' '}
    <ArtifactTypeText artifact={artifact} />
  </>
);
