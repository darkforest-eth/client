import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { ArtifactType, LocationId, Planet, PlanetLevel, PlanetType } from '@darkforest_eth/types'
import { artifactStatTypes, ArtifactTypes, canBeActivated, getClosestPlanet, getMyPlanets, isActivated, planetName } from '../utils'
import { mineAndBigger } from './DistributeEnergy'

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
  artifactTypes: ArtifactType[],
  planetTypes: PlanetType[],
}
export function activateArtifacts(config: config)
{
  const from = getMyPlanets()
    .filter(p => config.planetTypes.includes(p.planetType))
    .filter(p => ! p.unconfirmedActivateArtifact)
    .filter(p => p.heldArtifactIds.length > 0)
    .filter(p => p.planetLevel >= config.minLevel)
    .filter(p => ! hasActiveArtifact(p))
    .filter(p => ! config.fromId || p.locationId === config.fromId)

  console.log('Activating from', from)

  return from.map(from => {
    const artifact = df.getArtifactsWithIds(from.heldArtifactIds).find(a => {
      return a
        && !isActivated(a)
        && canBeActivated(a)
        && config.artifactTypes.includes(a.artifactType)
    })

    if (! artifact) return

    if (artifact.artifactType === ArtifactTypes.Wormhole) {
      const filter = (p: Planet) => mineAndBigger(from, p)
      const wormholeTo = getClosestPlanet(from, filter)
      wormholeTo && df.activateArtifact(from.locationId, artifact.id, wormholeTo.locationId)
      wormholeTo && console.log(`Activating wormhole on ${planetName(from)} to ${planetName(wormholeTo)}`)
    }
    else {
      df.activateArtifact(from.locationId, artifact.id, undefined)
      console.log('Activating on ' + planetName(from))
    }
  })
}
