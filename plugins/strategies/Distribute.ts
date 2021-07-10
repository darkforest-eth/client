import { LocationId, PlanetLevel, PlanetType } from '@darkforest_eth/types';
import GameManager from '@df/GameManager'
import GameUIManager from '@df/GameUIManager'
import { PlanetTypes } from '../utils';

declare const df: GameManager
declare const ui: GameUIManager

interface config {
  fromId?: LocationId,
  minCaptureLevel: PlanetLevel,
  maxSourceLevel: PlanetLevel,
  minEnergyLeft: number,
  planetType: PlanetType,
  targetEnergy: number,
}
export function distributeSilver(config: config)
{
  const from = df.getMyPlanets()
    .filter(p => p.planetLevel <= config.maxSourceLevel)
    .filter(p => p.planetType === PlanetTypes.ASTEROID)
    .filter(p => ! config.fromId || p.locationId === config.fromId)

}
