import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { LocationId, Planet, PlanetLevel, PlanetType } from '@darkforest_eth/types';
import { ArtifactTypes, availableSilver, energy, enoughEnergyToProspect, getClosestPlanet, getIncomingMoves, getMinimumEnergyNeeded, getMyPlanets, getMyPlanetsInRange, getPlanetMaxRank, getPlanetRank, getSilverRequiredForNextUpgrade, hasBeenProspected, hasCannon, isAsteroid, isFoundry, isFoundry, isMine, isUnowned, Move, planetCanAcceptMove, planetName, PlanetTypes, planetWillHaveMinEnergyAfterMove } from '../utils';

declare const df: GameManager
declare const ui: GameUIManager

export function mineAndBigger(from: Planet, candidate: Planet) {
  const isBigger = candidate.planetLevel > from.planetLevel;
  const isPlanet = candidate.planetType === PlanetTypes.PLANET;

  return isMine(candidate) && isBigger && isPlanet
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
    .filter(p => ! hasCannon(p))
    .filter(p => {
      const planetOrRip = [PlanetTypes.PLANET, PlanetTypes.RIP].includes(p.planetType)
      const usedFoundry = isFoundry(p) && hasBeenProspected(p)

      return planetOrRip || usedFoundry
    })
    .filter(p => energy(p) > 75)
    .filter(p => ! config.fromId || p.locationId === config.fromId)

  console.log('Sending energy from', from)

  const movesToMake: Move[] = from.map(from => {

    // When 75% energy, send 50% of it.. 37.5% left optimum for S curve
    const energy = Math.floor(0.5 * from.energy)

    const to = getClosestPlanet(from, p => {
      const foundryWantingEnergy = isMine(p) && isFoundry(p) && !hasBeenProspected(p) && !enoughEnergyToProspect(p);
      const mineBiggerPlanet = mineAndBigger(from, p);
      const unownedAndWant = isUnowned(p) && p.planetLevel >= from.planetLevel && p.planetType !== PlanetTypes.QUASAR;

      return mineBiggerPlanet || unownedAndWant || foundryWantingEnergy;
    })

    if (! to) return null

    const dist = df.getDist(from.locationId, to.locationId)

    return {
      from,
      to,
      fromName: planetName(from),
      toName: planetName(to),
      energy,
      energyArriving: df.getEnergyArrivingForMove(from.locationId, to.locationId, dist, energy)
    }
  })

  // Make the moves with the MOST energy first.
  const movesToMake2 = movesToMake.filter(m => m).sort((a, b) => b.energyArriving - a.energyArriving)

  console.log('Sending energy to ', movesToMake2)

  const moves = movesToMake2.map(move => {
    if (
      planetCanAcceptMove(move.to)
      && df.getUnconfirmedMoves().length < 50
    ) {
      console.log(`SENDING ${move.energy} energy to ${planetName(move.to)} (ui.centerLocationId('${move.to.locationId}')) FROM ${planetName(move.from)} (ui.centerLocationId('${move.from.locationId}'))`)
      return df.move(move.from.locationId, move.to.locationId, move.energy, 0);
    }
  })

  return moves
}
