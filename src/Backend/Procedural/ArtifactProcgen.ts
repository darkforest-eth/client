import { EMPTY_ADDRESS, EMPTY_LOCATION_ID } from '@darkforest_eth/constants';
import {
  Artifact,
  ArtifactId,
  artifactNameFromArtifact,
  ArtifactRarity,
  ArtifactType,
  ArtifactTypeNames,
  Biome,
} from '@darkforest_eth/types';
import { artifactBiomeName } from '../GameLogic/ArtifactUtils';

export const artifactBiomeAndName = (artifact: Artifact | undefined): string => {
  if (!artifact) return '';
  return `${artifactBiomeName(artifact)} ${ArtifactTypeNames[artifact.artifactType]}`;
};

export const dateMintedAt = (artifact: Artifact | undefined): string => {
  if (!artifact) return '00/00/0000';
  return new Date(artifact.mintedAtTimestamp * 1000).toDateString();
};

const namesById = new Map<ArtifactId, string>();
export const artifactName = (artifact: Artifact | undefined): string => {
  if (!artifact) return 'Unknown';

  const myName = namesById.get(artifact.id);
  if (myName) return myName;

  const name = artifactNameFromArtifact(artifact);
  namesById.set(artifact.id, name);

  return name;
};

const randomHex = (len: number): string => {
  let str = '';
  const chars = 'abcdef0123456789'.split('');
  while (str.length < len) {
    str = str + chars[Math.floor(Math.random() * chars.length)];
  }

  return str;
};

export const mockArtifact = (
  rarity: ArtifactRarity,
  artifactType: ArtifactType = ArtifactType.Spaceship,
  planetBiome: Biome = Biome.WASTELAND
): Artifact =>
  ({
    id: randomHex(64) as ArtifactId,
    planetDiscoveredOn: EMPTY_LOCATION_ID,
    planetBiome,
    mintedAtTimestamp: Date.now(),
    discoverer: EMPTY_ADDRESS,
    currentOwner: EMPTY_ADDRESS,
    isInititalized: true,
    lastActivated: 0,
    lastDeactivated: 0,
    rarity: rarity,
    artifactType,
    upgrade: {
      energyCapMultiplier: 120,
      energyGroMultiplier: 100,
      rangeMultiplier: 100,
      speedMultiplier: 85,
      defMultiplier: 100,
    },
    onPlanetId: undefined,
  } as Artifact);

export const mockArtifactWithRarity = (
  rarity: ArtifactRarity,
  artifactType: ArtifactType = ArtifactType.Spaceship,
  planetBiome: Biome = Biome.WASTELAND
): Artifact => mockArtifact(rarity, artifactType, planetBiome);

export const mockCommon = mockArtifactWithRarity(
  ArtifactRarity.Common,
  ArtifactType.Spaceship,
  Biome.WASTELAND
);

export const mockRare = mockArtifactWithRarity(
  ArtifactRarity.Rare,
  ArtifactType.Spaceship,
  Biome.WASTELAND
);

export const mockEpic = mockArtifactWithRarity(
  ArtifactRarity.Epic,
  ArtifactType.Spaceship,
  Biome.WASTELAND
);

export const mockLegendary = mockArtifactWithRarity(
  ArtifactRarity.Legendary,
  ArtifactType.Spaceship,
  Biome.WASTELAND
);
