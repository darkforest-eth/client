import { Biome, Planet, PlanetType } from '@darkforest_eth/types';
import { css, keyframes } from 'styled-components';
import { isLocatable } from '../../_types/global/GlobalTypes';

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

const scrolling = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 200px 200px;
  }
`;

export function planetBackground({ planet }: { planet: Planet | undefined }) {
  if (!planet || planet.planetType === PlanetType.TRADING_POST)
    return css`
      background: url('/public/img/spacebg.jpg');
      background-size: 200px 200px;
      background-repeat: repeat;
      animation: ${scrolling} 10s linear infinite;
    `;
  else
    return isLocatable(planet)
      ? css`
          background: ${BiomeBackgroundColors[planet.biome]};
        `
      : ``;
}
