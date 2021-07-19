import GameManager from '@df/GameManager'
import GameUIManager from '@df/GameUIManager'
import { LocationId, Planet, PlanetLevel, PlanetType } from "@darkforest_eth/types";
import { getEnergyNeeded, getMyPlanets, hasIncomingMove, isUnowned, Move, planetName, planetWillHaveMinEnergyAfterMove } from 'plugins/utils';
import { moveSyntheticComments } from 'typescript';
// import { isUnowned } from 'utils/utils';
// import { planetName, PlanetTypes } from './CM-utils'

declare const df: GameManager
declare const ui: GameUIManager

export function getBestMove(to: Planet, from: Planet[], targetEnergy: number): Move {
  const moves = from.map(from => {
    return {
      from,
      to,
      energy: getEnergyNeeded(from, to, targetEnergy)
    }
  })

  const movesByEnergy = moves.sort((a, b) => a.energy - b.energy)

  return movesByEnergy[0]
}

interface config {
  fromId?: LocationId,
  fromMaxLevel: PlanetLevel,
  fromMinEnergyLeftPercent: number,
  toMinLevel: PlanetLevel,
  toPlanetType: PlanetType,
  toTargetEnergy: number,
}
export function capturePlanets(config: config)
{
  // @ts-ignore
  const to = Array.from(df.getAllPlanets()).filter(p => p.location)
    .filter(isUnowned)
    .filter(p => ! hasIncomingMove(p))
    .filter(p => p.planetLevel >= config.toMinLevel)
    .filter(p => p.planetType === config.toPlanetType)

  const from = getMyPlanets()
    .filter(p => p.planetLevel <= config.fromMaxLevel)
    // @todo only planets?
    .filter(p => ! config.fromId || p.locationId === config.fromId)

  // Calculate moves required to take and use the first one
  // @todo This will get the best possible move but might be skipped if the
  // planet doesn't have enough energy to make it - should we try the
  // next best move - or wait until the best move is possible?
  const movesToMake = to.map(to => getBestMove(to, from, config.toTargetEnergy))

  // Make moves with the smallest amount of energy first - this will make the most moves before running out
  movesToMake.sort((a, b) => a.energy - b.energy)

  const moves = movesToMake.map(move => {
    if (planetWillHaveMinEnergyAfterMove(move, config.fromMinEnergyLeftPercent)) {
      console.log(`CAPTURING ${planetName(move.to)} (${move.to.locationId}) FROM ${planetName(move.from)} WITH ${move.energy}`)
      return df.move(move.from.locationId, move.to.locationId, move.energy, 0);
    }
  })

  return moves
}
