import { ArtifactRarity, Biome } from '@darkforest_eth/types';
import dfstyles from './dfstyles';

/* tsx file so that we get color previews in VScode! */

export const BiomeTextColors: Record<Biome, string> = [
  '#000000',
  '#0088ff', // OCEAN
  '#46FB73', // FOREST
  '#CFF391', // GRASSLAND
  '#FB6A9D', // TUNDRA
  '#b48812', // SWAMP
  '#ffe554', // DESERT
  'hsl(198, 78%, 77%)', // ICE
  '#000000', // WASTELAND
  '#FF5100', // LAVA
  '#bf5bf1', // CORRUPTED
];

export const BiomeBackgroundColors: Record<Biome, string> = [
  '#000000',
  '#000e2d', // OCEAN
  '#06251d', // FOREST
  '#212617', // GRASSLAND
  '#260f17', // TUNDRA
  '#211b0e', // SWAMP
  '#302e0e', // DESERT
  '#0d212f', // ICE
  '#321b1b', // WASTELAND
  '#321000', // LAVA
  '#1e0d26', // CORRUPTED
];

export const ANCIENT_PURPLE = '#d23191';
export const ANCIENT_BLUE = '#b2fffc';

export const RarityColors: Record<ArtifactRarity, string> = [
  '#000000',
  dfstyles.colors.subtext, // Common
  '#6b68ff', // Rare
  '#c13cff', // Epic
  '#f8b73e', // Legendary
  '#ff44b7', // Mythic
];
