import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { LocationId, Planet, PlanetLevel, PlanetType } from '@darkforest_eth/types';
import { getBestMove, getIncomingMoves, getPendingEnergy, getPlanetRank, isMine, Move, planetCanAcceptMove, planetName, PlanetTypes, planetWillHaveMinEnergyAfterMove, planetWillHaveSilverAfterMove } from '../utils';
import { ConsoleLogger } from 'typedoc/dist/lib/utils';

declare const df: GameManager
declare const ui: GameUIManager

function getPlanetCurrentAndFutureSilver(planet: Planet) {
  const future = getIncomingMoves(planet).reduce((total, m) => total + (m.silver || m.silverMoved), 0)

  return planet.silver + future
}

function maxSilverToSend(from: Planet, to: Planet)
{
  const potential = Math.ceil(to.silverCap - getPlanetCurrentAndFutureSilver(to))
  const pending = getPendingEnergy(from)

  const silver = Math.min(potential, from.silver - pending)

  return silver
}

interface config {
  fromId?: LocationId,
  fromMaxLevel: PlanetLevel,
  toMinLevel: PlanetLevel,
  toPlanetType: PlanetType,
}
export function distributeSilver(config: config)
{
  const from = df.getMyPlanets()
    .filter(p => p.planetLevel <= config.fromMaxLevel)
    .filter(p => p.planetType === PlanetTypes.ASTEROID)
    .filter(p => p.silver / p.silverCap > 0.95)
    .filter(p => ! config.fromId || p.locationId === config.fromId)

  const movesToMake: Move[] = from.flatMap(from => {
    const to = df.getPlanetsInRange(from.locationId, 100)
      .filter(isMine)
      .filter(p => p.planetLevel >= config.toMinLevel)
      .filter(p => p.planetType === config.toPlanetType)
      .filter(p => getPlanetRank(p) < 5)
      .filter(p => p.silverCap !== p.silver)

    const moves = to.map(to => {
      const silver = maxSilverToSend(from, to)
      const energy = Math.ceil(df.getEnergyNeededForMove(from.locationId, to.locationId, 1))

      return {
        from,
        to,
        energy,
        silver
      }
    })

    return moves
  })

  // Make the moves with the MOST silver first - this will ensure largest amount of silver moves
  // before running out.
  movesToMake.sort((a, b) => b.silver - a.silver || a.energy - b.energy)

  console.log({ movesToMake })

  const moves = movesToMake.map(move => {
    const silver = maxSilverToSend(move.from, move.to)

    if (
      planetWillHaveMinEnergyAfterMove(move, 0)
      && silver > 0
      && planetCanAcceptMove(move)
    ) {
      console.log(`SENDING ${move.silver} to ${planetName(move.to)} (ui.centerLocationId('${move.to.locationId}')) FROM ${planetName(move.from)} (ui.centerLocationId('${move.from.locationId}')) WITH ${move.energy}`)
      return df.move(move.from.locationId, move.to.locationId, move.energy, silver);
    }
  })

  return moves
}
