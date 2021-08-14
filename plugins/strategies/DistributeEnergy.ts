import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { LocationId, Planet, PlanetLevel, PlanetType } from '@darkforest_eth/types';
import { availableSilver, energy, getIncomingMoves, getMinimumEnergyNeeded, getMyPlanets, getMyPlanetsInRange, getPlanetMaxRank, getPlanetRank, getSilverRequiredForNextUpgrade, isFoundry, isMine, isUnowned, Move, planetCanAcceptMove, planetName, PlanetTypes, planetWillHaveMinEnergyAfterMove } from '../utils';

declare const df: GameManager
declare const ui: GameUIManager

function getPlanetIncomingSilver(planet: Planet) {
  // @ts-ignore
  const future = getIncomingMoves(planet).reduce((total, m) => total + (m.silver || m.silverMoved), 0)

  return future
}

function maxSilverToSend(from: Planet, to: Planet)
{
  const potential = Math.ceil(to.silverCap - to.silver - getPlanetIncomingSilver(to))
  const available = availableSilver(from)

  const silver = Math.min(potential, available)

  return silver
}

interface config {
  fromId?: LocationId,
  fromMinLevel: PlanetLevel,
  fromMaxLevel: PlanetLevel,
}
export function distributeEnergy(config: config)
{
  const from = getMyPlanets()
    .filter(p => p.planetLevel >= config.fromMinLevel)
    .filter(p => p.planetLevel <= config.fromMaxLevel)
    .filter(p => ! isFoundry(p))
    .filter(p => energy(p) > 75)
    .filter(p => ! config.fromId || p.locationId === config.fromId)

  console.log('Sending energy from', from)

  const movesToMake: Move[] = from.map(from => {

    // When 75% energy, send 50% of it.. 37.5% left optimum for S curve
    const energy = Math.floor(0.5 * from.energy)

    const to = df.getPlanetsInRange(from.locationId, energy / from.energyCap * 100)
      .filter(p => {
        const mineAndBigger = isMine(p) && p.planetLevel > from.planetLevel
        const unownedAndSame = isUnowned(p) && p.planetLevel >= from.planetLevel

        return mineAndBigger || unownedAndSame
      })
      .filter(p => p.planetType !== PlanetTypes.QUASAR)
      .sort((a, b) => getMinimumEnergyNeeded(from, a) - getMinimumEnergyNeeded(from, b))

    if (to.length < 1) return null

    return {
      from,
      to: to[0],
      fromName: planetName(from),
      toName: planetName(to[0]),
      energy,
    }
  })

  // Make the moves with the MOST energy first.
  movesToMake.filter(m => m).sort((a, b) => b.energy - a.energy)

  console.log('Sending energy to ', movesToMake)

  // Move max 100 at a time
  const moves = movesToMake.slice(0, 100).map(move => {
    if (planetCanAcceptMove(move.to)
    ) {
      console.log(`SENDING ${move.energy} energy to ${planetName(move.to)} (ui.centerLocationId('${move.to.locationId}')) FROM ${planetName(move.from)} (ui.centerLocationId('${move.from.locationId}'))`)
      return df.move(move.from.locationId, move.to.locationId, move.energy, 0);
    }
  })

  return moves
}
