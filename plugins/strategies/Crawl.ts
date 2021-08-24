import GameManager from '@df/GameManager'
import GameUIManager from '@df/GameUIManager'
import { LocatablePlanet, LocationId, Planet, PlanetLevel, PlanetType, WorldCoords } from "@darkforest_eth/types";
import { center, getEnergyNeeded, getMyPlanets, hasIncomingMove, isUnowned, Move, planetName, PlanetTypes, planetWillHaveMinEnergyAfterMove, distToCenter, isFoundry, hasCannon } from 'plugins/utils';
import { moveSyntheticComments } from 'typescript';
import { isLocatable } from 'src/_types/global/GlobalTypes';
// import { isUnowned } from 'utils/utils';
// import { planetName, PlanetTypes } from './CM-utils'

declare const df: GameManager
declare const ui: GameUIManager

type MoveWithData = Move & {
  angleToCenter: number,
  angleToTarget: number,
  angleDiff: number,
  angleDiffGroup: number,
  fromName: string,
  toName: string,
}

export function getMovesToTake(to: LocatablePlanet, from: LocatablePlanet[], targetEnergy: number): MoveWithData[] {
  const moves = from.map(from => {
    const angleToCenter = angle(from.location.coords, center)
    const angleToTarget = angle(from.location.coords, to.location.coords)
    const angleDiff = Math.abs(angleToCenter - angleToTarget) // 0 to 270
    const angleDiffGroup = Math.floor(angleDiff / 10) // 27 segments

    return {
      from,
      to,
      angleToCenter,
      angleToTarget,
      angleDiff,
      angleDiffGroup,
      distanceToCenter: distToCenter(to.location.coords),
      fromName: planetName(from),
      toName: planetName(to),
      energy: getEnergyNeeded(from, to, targetEnergy)
    }
  })

  return moves
}

export type SortFunction = (a: MoveWithData, b: MoveWithData) => number

// Make moves with the smallest amount of energy first -
// this will make the most moves before running out
export function lowestEnergy(a: MoveWithData, b: MoveWithData) {
  return a.energy - b.energy
}

/**
 * Returns -180 to 180
 */
function angle(p1: WorldCoords, p2: WorldCoords) {
  return Math.atan2(p1.y - p2.y, p1.x - p2.x) * 180 / Math.PI
}

/**
 * @todo Use something like https://github.com/mikolalysenko/compare-angle
 * but still "group" them so we use the least energy.
 */
export function directionToCenter(a: MoveWithData, b: MoveWithData) {
  return a.angleDiffGroup - b.angleDiffGroup || a.energy - b.energy
}

export function highestLevel(a: Move, b: Move) {
  return b.to.planetLevel - a.to.planetLevel || a.energy - b.energy
}

/**
 * @todo Build a graph database with the "energy" as the weight
 * between the planets and calculate the shortest path to the
 * center.
 */
export function shortestPathToCenter(a: MoveWithData, b: MoveWithData) {
}

interface config {
  fromId?: LocationId,
  fromMinLevel: PlanetLevel,
  fromMaxLevel: PlanetLevel,
  fromMinEnergyLeftPercent: number,
  toMinLevel: PlanetLevel,
  toPlanetTypes: PlanetType[],
  toTargetEnergy: number,
  sortFunction: SortFunction
}
export function capturePlanets(config: config)
{
  // @ts-ignore
  const to = Array.from(df.getAllPlanets())
    .filter(isLocatable)
    .filter(isUnowned)
    .filter(p => ! hasIncomingMove(p))
    .filter(p => p.planetLevel >= config.toMinLevel)
    .filter(p => config.toPlanetTypes.includes(p.planetType))

  const from = getMyPlanets()
    .filter(isLocatable)
    .filter(p => p.planetLevel >= config.fromMinLevel)
    .filter(p => p.planetLevel <= config.fromMaxLevel)
    .filter(p => [PlanetTypes.PLANET].includes(p.planetType))
    .filter(p => ! config.fromId || p.locationId === config.fromId)

  // Calculate moves required to take and use the first one
  // Note: This will get the best possible move but might be skipped if the
  // planet doesn't have enough energy to make it - should we try the
  // next best move - or wait until the best move is possible?
  const movesToMake = to.flatMap(to => getMovesToTake(to, from, config.toTargetEnergy))

  movesToMake.sort(config.sortFunction)

  console.log({ movesToMake })

  // Max 100 at a time
  let count = 0
  const moves = movesToMake.map(move => {
    if (
      planetWillHaveMinEnergyAfterMove(move, config.fromMinEnergyLeftPercent)
      && ! hasIncomingMove(move.to)
      && count++ < 100
    ) {
      console.log(`CAPTURING ${planetName(move.to)} (${move.to.locationId}) FROM ${planetName(move.from)} WITH ${move.energy}`)
      return df.move(move.from.locationId, move.to.locationId, move.energy, 0);
    }
  })

  return moves
}
