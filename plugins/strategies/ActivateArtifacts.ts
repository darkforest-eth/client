import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { LocationId, Planet, PlanetLevel, PlanetType } from '@darkforest_eth/types'
import { artifactStatTypes, ArtifactTypes, canBeActivated, getMyPlanets, isActivated } from '../utils'

declare const df: GameManager
declare const ui: GameUIManager

function hasActiveArtifact(p: Planet) {
  return df.getArtifactsWithIds(p.heldArtifactIds).find(a => {
    return a && isActivated(a)
  })
}

interface config {
  fromId?: LocationId,
  minLevel: PlanetLevel,
  planetType: PlanetType,
}
export function activateArtifacts(config: config)
{
  const from = getMyPlanets()
    .filter(p => p.planetType === config.planetType)
    .filter(p => ! p.unconfirmedActivateArtifact)
    .filter(p => p.heldArtifactIds.length > 0)
    .filter(p => p.planetLevel >= config.minLevel)
    .filter(p => ! hasActiveArtifact(p))
    .filter(p => ! config.fromId || p.locationId === config.fromId)

  console.log('Activating from', from)

  const typesToActivate = [ArtifactTypes.PhotoidCannon, ...artifactStatTypes]

  return from.map(from => {
    const artifact = df.getArtifactsWithIds(from.heldArtifactIds).find(a => {
      return a
        && !isActivated(a)
        && canBeActivated(a)
        && typesToActivate.includes(a.artifactType)
    })

    artifact && df.activateArtifact(from.locationId, artifact.id, undefined)
    artifact && console.log('Activating on ' + from.locationId)
  })
}
