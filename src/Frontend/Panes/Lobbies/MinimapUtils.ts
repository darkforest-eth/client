import { SpaceType } from '@darkforest_eth/types';
import { hsl } from 'color';
import { CreatedPlanet } from '../../../Backend/Utils/LobbyAdminTools';
import { LobbyPlanet } from './LobbiesUtils';

export type MinimapConfig = {
  worldRadius: number;
  // perlin
  key: number;
  scale: number;
  dot: number;
  mirrorX: boolean;
  mirrorY: boolean;
  perlinThreshold1: number;
  perlinThreshold2: number;
  perlinThreshold3: number;
  stagedPlanets: LobbyPlanet[];
  createdPlanets: CreatedPlanet[];
};

export type PlanetType = 'staged' | 'target' | 'spawn' | 'created' | undefined
export type DrawMessage = {
  radius: number;
  dot : number;
  data: { x: number; y: number; type: SpaceType; planet: PlanetType}[];
};

export const MinimapColors = {
    stagedPlanet : `${hsl(285, 100, 60)}`,
    spawnPlanet : `${hsl(51, 100, 55)}`,
    targetPlanet: `${hsl(0, 100, 55)}`,
    createdPlanet:`${hsl(123, 100, 55)}`,
    innerNebula : `${hsl(221, 100, 35)}`,
    outerNebula : `${hsl(240, 100, 25)}`,
    deepSpace : `${hsl(245, 100, 4)}`, // deep space
    deadSpace : `${hsl(119, 100, 10)}`, // dead space
}