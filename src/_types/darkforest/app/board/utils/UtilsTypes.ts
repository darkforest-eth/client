import { HatType } from '../../../../../utils/Hats';

export interface PlanetCosmeticInfo {
  baseHue: number;

  baseColor: string;
  baseColor2: string;
  baseColor3: string;

  secondaryColor: string;
  secondaryColor2: string;
  secondaryColor3: string;

  backgroundColor: string;
  previewColor: string;
  asteroidColor: string;

  // ultra ultra hacky, but we're doing this since it's cached in the renderer
  hatType: HatType;
}
