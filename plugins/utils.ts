import { Artifact, Planet, PlanetType, QueuedArrival, UnconfirmedMove } from "@darkforest_eth/types"
import { PlanetTypeWeightsBySpaceType } from "../src/_types/darkforest/api/ContractsAPITypes"

export const PlanetTypes: { [ key:string]: PlanetType } = {
  PLANET: 0,
  ASTEROID: 1,
  FOUNDRY: 2,
  RIP: 3,
  QUASAR: 4
}

export function isAsteroid(p: Planet) {
  return p.planetType === PlanetTypes.ASTEROID
}

export function hasPendingMove(p: Planet) {
  return p.unconfirmedDepartures.length > 0
}

export function energy(p: Planet) {
  return Math.floor(p.energy / p.energyCap * 100);
}

/**
 * df.getMyArtifacts() misses some.. This function loops through
 * all planets and gathers artifacts then combines them with
 * the ones from the inventory to be we don't miss any.
 */
export function getAllArtifacts(myPlanets: Planet[])
{
  const artifactsFromPlanets = myPlanets.flatMap(p => {
    const artifacts = df.getArtifactsWithIds(p.heldArtifactIds)

    // fix bug where onPlanetId isn't set?
    artifacts.forEach(a => {
      if (a && !a.onPlanetId) a.onPlanetId = p.locationId
    })

    return artifacts
  })

  const artifactsFromInventory = df.getMyArtifacts().filter(a => ! a.onPlanetId)
  const artifacts = artifactsFromPlanets.concat(artifactsFromInventory)

  return artifacts
}

const emptyAddress = "0x0000000000000000000000000000000000000000";

export const isUnowned = (planet: Planet) => planet.owner === emptyAddress;

export function planetName(p: Planet) {
  return df.getProcgenUtils().getPlanetName(p)
}

export function getIncomingMoves(p: Planet) {
  const pendingMoves = df.getUnconfirmedMoves()
  const journeys = df.getAllVoyages().filter(p => p.arrivalTime > Date.now() / 1000)

  const incoming: QueuedArrival[] = journeys.filter(j => j.toPlanet === p.locationId)
  const unconfirmed: UnconfirmedMove[] = pendingMoves.filter(m => m.to === p.locationId)

  return [...incoming, ...unconfirmed]
}

export function hasIncomingMove(p: Planet) {
  return getIncomingMoves(p).length > 0
}

export interface Move {
  from: Planet,
  to: Planet,
  energy: number,
}

export function getBestMove(to: Planet, from: Planet[], targetEnergy: number): Move {
  const moves = from.map(from => {
    return {
      from,
      to,
      energy: getEnergyNeeded(from, to, targetEnergy)
    }
  })

  const movesByEnergy = moves.sort((a, b) => a.energy - b.energy)

  console.log({
    to: planetName(to),
    moves
  })

  return movesByEnergy[0]
}

export function onlyIfMinEnergy(move: Move, minEnergy: number) {
  const energyPending = move.from.unconfirmedDepartures.reduce((total, m) => total + m.forces, 0)
  const remainingAfterMove = move.from.energy - energyPending - move.energy
  const percentAfterMove = remainingAfterMove / move.from.energyCap * 100

  console.log(`Checking capture of ${planetName(move.to)} from ${planetName(move.from)} with ${move.energy} - ${percentAfterMove}% after move: ${percentAfterMove > minEnergy}`)

  return percentAfterMove > minEnergy
}

export function getEnergyNeeded(from: Planet, to: Planet, targetEnergy: number) {
  const energyArriving = (to.energyCap * targetEnergy / 100) + (to.energy * (to.defense / 100));

  const energyNeeded = Math.ceil(df.getEnergyNeededForMove(from.locationId, to.locationId, energyArriving));

  return energyNeeded
}
