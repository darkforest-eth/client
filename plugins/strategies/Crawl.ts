import GameManager from '@df/GameManager'
import GameUIManager from '@df/GameUIManager'
import { LocationId, Planet, PlanetLevel, PlanetType } from "@darkforest_eth/types";
import { getEnergyNeeded, getMyPlanets, hasIncomingMove, isUnowned, Move, planetName, PlanetTypes, planetWillHaveMinEnergyAfterMove } from 'plugins/utils';
import { moveSyntheticComments } from 'typescript';
// import { isUnowned } from 'utils/utils';
// import { planetName, PlanetTypes } from './CM-utils'

declare const df: GameManager
declare const ui: GameUIManager

export function getBestMove(to: Planet, from: Planet[], targetEnergy: number, sortFunction: SortFunction): Move {
  const moves = from.map(from => {
    return {
      from,
      to,
      fromName: planetName(from),
      toName: planetName(to),
      energy: getEnergyNeeded(from, to, targetEnergy)
    }
  })

  moves.sort(sortFunction)

  return moves[0]
}

export type SortFunction = (a: Move, b: Move) => number

// Make moves with the smallest amount of energy first -
// this will make the most moves before running out
export function lowestEnergy(a: Move, b: Move) {
  return a.energy - b.energy
}

function distToCenter(m: Move) {
  const center = { x: 0, y: 0 };
  return Math.floor(df.getDistCoords(m.to.location?.coords, center))
}

// Make moves closest to the center first -
// this will make least moves before running out
export function closestToCenter(a: Move, b: Move) {
  return distToCenter(a) - distToCenter(b)
}

function angleBetween(m: Move) {
  const from = m.from.location?.coords
  const to = m.to.location?.coords

  return Math.atan2(from.y - to.y, from.x - to.x)
}

export function directionToCenter(a: Move, b: Move) {
  const from = a.from.location?.coords
  const fromToCenter = Math.atan2(from.y, from.x)

  const diffA = Math.abs(angleBetween(a) - fromToCenter)
  const diffB = Math.abs(angleBetween(b) - fromToCenter)

  return diffA - diffB
}

export function highestLevel(a: Move, b: Move) {
  return b.to.planetLevel - a.to.planetLevel || a.energy - b.energy
}

export function sevenBridges(a: Move, b: Move) {
  return 0;
}

interface config {
  fromId?: LocationId,
  fromMaxLevel: PlanetLevel,
  fromMinEnergyLeftPercent: number,
  toMinLevel: PlanetLevel,
  toPlanetType: PlanetType,
  toTargetEnergy: number,
  sortFunction: SortFunction
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
    .filter(p => p.planetType === PlanetTypes.PLANET)
    .filter(p => ! config.fromId || p.locationId === config.fromId)

  // Calculate moves required to take and use the first one
  // Note: This will get the best possible move but might be skipped if the
  // planet doesn't have enough energy to make it - should we try the
  // next best move - or wait until the best move is possible?
  const movesToMake = to.map(to => getBestMove(to, from, config.toTargetEnergy, config.sortFunction))

  movesToMake.sort(config.sortFunction)

  console.log({ movesToMake })

  // Max 100 at a time
  const moves = movesToMake.slice(0, 100).map(move => {
    if (planetWillHaveMinEnergyAfterMove(move, config.fromMinEnergyLeftPercent)) {
      console.log(`CAPTURING ${planetName(move.to)} (${move.to.locationId}) FROM ${planetName(move.from)} WITH ${move.energy}`)
      return df.move(move.from.locationId, move.to.locationId, move.energy, 0);
    }
  })

  return moves
}
