import { isAncient, isLocatable } from '@darkforest_eth/gamelogic';
import { Artifact, Biome, BiomeNames, LocatablePlanet, Planet } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { BiomeTextColors } from '../../Styles/Colors';
import { AncientLabel, AncientLabelAnim } from '../AncientLabel';
import { icyAnim, shakeAnim } from '../BiomeAnims';
import { LavaLabel } from './LavaLabel';
import { WastelandLabel } from './WastelandLabel';

/** Renders colored text corresponding to a biome */
export const BiomeLabel = styled.span<{ biome: Biome }>`
  color: ${({ biome }) => BiomeTextColors[biome]};
`;

const StyledBiomeLabelAnim = styled(BiomeLabel)<{ biome: Biome }>`
  ${({ biome }) => biome === Biome.CORRUPTED && shakeAnim};
  ${({ biome }) => biome === Biome.ICE && icyAnim};
`;

/** Renders animated colored text corresponding to a biome */
export const BiomeLabelAnim = ({ biome }: { biome: Biome }) =>
  biome === Biome.LAVA ? (
    <LavaLabel />
  ) : biome === Biome.WASTELAND ? (
    <WastelandLabel />
  ) : (
    <StyledBiomeLabelAnim biome={biome}>{BiomeNames[biome]}</StyledBiomeLabelAnim>
  );

export const PlanetBiomeLabelAnim = ({ planet }: { planet: LocatablePlanet }) => (
  <BiomeLabelAnim biome={planet.biome} />
);

export const OptionalPlanetBiomeLabelAnim = ({ planet }: { planet: Planet | undefined }) => (
  <>{planet && isLocatable(planet) && <PlanetBiomeLabelAnim planet={planet} />}</>
);

export const ArtifactBiomeLabel = ({ artifact }: { artifact: Artifact }) =>
  isAncient(artifact) ? <AncientLabel /> : <BiomeLabel biome={artifact.planetBiome} />;

export const ArtifactBiomeLabelAnim = ({ artifact }: { artifact: Artifact }) =>
  isAncient(artifact) ? <AncientLabelAnim /> : <BiomeLabelAnim biome={artifact.planetBiome} />;
