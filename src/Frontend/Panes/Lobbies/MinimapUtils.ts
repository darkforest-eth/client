import { SpaceType } from '@darkforest_eth/types';
import { hsl } from 'color';
import { CreatedPlanet, LobbyAdminTools } from '../../../Backend/Utils/LobbyAdminTools';
import { LobbyPlanet } from './LobbiesUtils';
import { LobbyInitializers } from './Reducer';

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

export function generateMinimapConfig(config: LobbyInitializers, dot : number = 10, lobbyAdminTools : LobbyAdminTools | undefined = undefined): MinimapConfig {
  return {
    worldRadius: config.WORLD_RADIUS_MIN,
    key: config.SPACETYPE_KEY,
    scale: config.PERLIN_LENGTH_SCALE,
    mirrorX: config.PERLIN_MIRROR_X,
    mirrorY: config.PERLIN_MIRROR_Y,
    perlinThreshold1: config.PERLIN_THRESHOLD_1,
    perlinThreshold2: config.PERLIN_THRESHOLD_2,
    perlinThreshold3: config.PERLIN_THRESHOLD_3,
    stagedPlanets: config.ADMIN_PLANETS || [],
    createdPlanets: lobbyAdminTools?.planets || [],
    dot,
  } as MinimapConfig;
}