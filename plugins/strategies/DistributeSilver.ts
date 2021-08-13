import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { LocationId, Planet, PlanetLevel, PlanetType } from '@darkforest_eth/types';
import { availableSilver, getIncomingMoves, getMinimumEnergyNeeded, getMyPlanets, getMyPlanetsInRange, getPlanetMaxRank, getPlanetRank, getSilverRequiredForNextUpgrade, Move, planetCanAcceptMove, planetName, PlanetTypes, planetWillHaveMinEnergyAfterMove } from '../utils';

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
  fromPlanetType: PlanetType,
  toMinLevel: PlanetLevel,
  toPlanetType: PlanetType,
}
export function distributeSilver(config: config)
{
  const from = getMyPlanets()
    .filter(p => p.planetLevel >= config.fromMinLevel)
    .filter(p => p.planetLevel <= config.fromMaxLevel)
    .filter(p => p.planetType !== PlanetTypes.PLANET)
    .filter(p => p.silver > 0)
    .filter(p => ! config.fromId || p.locationId === config.fromId)

  console.log('Sending silver from', from)

  const movesToMake: Move[] = from.flatMap(from => {
    const to = getMyPlanetsInRange(from) // this is missing planets not sure why
      .filter(p => p.planetLevel >= config.toMinLevel)
      .filter(p => p.planetType === config.toPlanetType)
      .filter(p => getPlanetRank(p) < getPlanetMaxRank(p))
      .filter(p => getSilverRequiredForNextUpgrade(p) <  from.silver)
      .filter(p => p.planetLevel >= from.planetLevel - 1) // L4 to L3 etc..
      .filter(p => p.silverCap !== p.silver)

    const moves = to.map(to => {
      const silver = maxSilverToSend(from, to)
      const energy = getMinimumEnergyNeeded(from, to)

      return {
        from,
        to,
        fromName: planetName(from),
        toName: planetName(to),
        energy,
        silver
      }
    })

    return moves
  })

  // Make the moves with the MOST silver first - this will ensure largest amount of silver moves
  // before running out.
  movesToMake.sort((a, b) => b.silver! - a.silver! || a.energy - b.energy)

  console.log('Sending silver to ', movesToMake)

  // Move max 100 at a time
  let count = 0
  const moves = movesToMake.map(move => {
    const silver = Math.floor(maxSilverToSend(move.from, move.to))

    if (
      planetWillHaveMinEnergyAfterMove(move, 1)
      && silver > 0
      && planetCanAcceptMove(move.to)
      && count++ < 100
    ) {
      console.log(`SENDING ${move.silver} silver to ${planetName(move.to)} (ui.centerLocationId('${move.to.locationId}')) FROM ${planetName(move.from)} (ui.centerLocationId('${move.from.locationId}')) WITH ${move.energy}`)
      return df.move(move.from.locationId, move.to.locationId, move.energy, silver);
    }
  })

  return moves
}
