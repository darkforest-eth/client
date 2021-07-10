import GameManager from '@df/GameManager'
import GameUIManager from '@df/GameUIManager'
import { LocationId, Planet, PlanetLevel, PlanetType } from "@darkforest_eth/types";
import { getBestMove, getEnergyNeeded, hasIncomingMove, isUnowned, planetName, planetWillHaveMinEnergyAfterMove } from 'plugins/utils';
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
    // @todo only planets?
    .filter(p => ! config.fromId || p.locationId === config.fromId)

  // Calculate moves required to take and use the first one
  // @todo This will get the best possible move but might be skipped if the
  // planet doesn't have enough energy to make it - should we try the
  // next best move - or wait until the best move is possible?
  const movesToMake = to.map(to => getBestMove(to, from, config.targetEnergy))

  movesToMake.sort((a, b) => a.energy - b.energy)

  const moves = movesToMake.map(move => {
    if (planetWillHaveMinEnergyAfterMove(move, config.minEnergyLeft)) {
      console.log(`CAPTURING ${planetName(move.to)} (${move.to.locationId}) FROM ${planetName(move.from)} WITH ${move.energy}`)
      return df.move(move.from.locationId, move.to.locationId, move.energy, 0);
    }
  })

  return moves
}
