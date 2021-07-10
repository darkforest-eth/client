import GameManager from '@df/GameManager'
import GameUIManager from '@df/GameUIManager'
import { LocationId, Planet, PlanetLevel, PlanetType } from "@darkforest_eth/types";
import { getBestMove, getEnergyNeeded, getPossibleMoves, hasIncomingMove, isUnowned, onlyIfMinEnergy, planetName } from 'plugins/utils';
import { moveSyntheticComments } from 'typescript';
// import { isUnowned } from 'utils/utils';
// import { planetName, PlanetTypes } from './CM-utils'

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
export function capturePlanets(config: config)
{
  const to = Array.from(df.getAllPlanets()).filter(p => p.location)
    .filter(isUnowned)
    .filter(p => ! hasIncomingMove(p))
    .filter(p => p.planetLevel >= config.minCaptureLevel)
    .filter(p => p.planetType === config.planetType)

  const from = df.getMyPlanets()
    .filter(p => p.planetLevel <= config.maxSourceLevel)
    .filter(p => ! config.fromId || p.locationId === config.fromId)

  // Calculate moves required to take and use the first one
  const bestMoves = to.map(to => getBestMove(to, from, config.targetEnergy))

  // @todo sort by smallest energy

  for (const move of movesToMake) {
    // Filter out moves which will drain the source too much
    const movesToMake = bestMoves.filter(m => onlyIfMinEnergy(m, config.minEnergyLeft))
    console.log(`CAPTURING ${planetName(move.to)} (${move.to.locationId}) FROM ${planetName(move.from)} WITH ${move.energy}`)
    // df.move(move.from.locationId, move.to.locationId, move.energy, 0);
  }

  return movesToMake
}
