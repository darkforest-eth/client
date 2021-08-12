import { ArtifactRarity, Biome } from '@darkforest_eth/types';
import dfstyles from './dfstyles';

/* tsx file so that we get color previews in VScode! */

export const BiomeTextColors = {
  [Biome.UNKNOWN]: '#000000',
  [Biome.OCEAN]: '#0088ff',
  [Biome.FOREST]: '#46FB73',
  [Biome.GRASSLAND]: '#CFF391',
  [Biome.TUNDRA]: '#FB6A9D',
  [Biome.SWAMP]: '#b48812',
  [Biome.DESERT]: '#ffe554',
  [Biome.ICE]: 'hsl(198, 78%, 77%)',
  [Biome.WASTELAND]: '#000000',
  [Biome.LAVA]: '#FF5100',
  [Biome.CORRUPTED]: '#8DF15B',
} as const;

export const BiomeBackgroundColors = {
  [Biome.UNKNOWN]: '#000000',
  [Biome.OCEAN]: '#000e2d',
  [Biome.FOREST]: '#06251d',
  [Biome.GRASSLAND]: '#212617',
  [Biome.TUNDRA]: '#260f17',
  [Biome.SWAMP]: '#211b0e',
  [Biome.DESERT]: '#302e0e',
  [Biome.ICE]: '#0d212f',
  [Biome.WASTELAND]: '#321b1b',
  [Biome.LAVA]: '#321000',
  [Biome.CORRUPTED]: '#15260D',
} as const;

export const ANCIENT_PURPLE = '#d23191';
export const ANCIENT_BLUE = '#b2fffc';

export const RarityColors = {
  [ArtifactRarity.Unknown]: '#000000',
  [ArtifactRarity.Common]: dfstyles.colors.subtext,
  [ArtifactRarity.Rare]: '#6b68ff',
  [ArtifactRarity.Epic]: '#c13cff',
  [ArtifactRarity.Legendary]: '#f8b73e',
  [ArtifactRarity.Mythic]: '#ff44b7',
} as const;
