import { SpaceType, AdminPlanet } from '@darkforest_eth/types';

export type MinimapConfig = {
  worldRadius: number;
  // perlin
  key: number;
  scale: number;
  mirrorX: boolean;
  mirrorY: boolean;
  perlinThreshold1: number;
  perlinThreshold2: number;
  perlinThreshold3: number;
  planets: AdminPlanet[];
};

export type DrawMessage = {
  radius: number;
  data: { x: number; y: number; type: SpaceType; planet: boolean}[];
};
