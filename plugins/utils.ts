import { Artifact, Planet } from "@darkforest_eth/types"

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
