import { Artifact, Planet, PlanetType } from "@darkforest_eth/types"
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
    const artifacts = df.getArtifactsWithIds(p.heldArtifactIds) as Artifact[]

    // fix bug where onPlanetId isn't set?
    artifacts.forEach(a => {
        if (!a.onPlanetId) a.onPlanetId = p.locationId
    })

    return artifacts
  })

  const artifactsFromInventory = df.getMyArtifacts().filter(a => ! a.onPlanetId)
  const artifacts = artifactsFromPlanets.concat(artifactsFromInventory)
}
