import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { artifactNameFromArtifact, ArtifactRarity, ArtifactType, LocationId, Planet, PlanetLevel, PlanetType } from '@darkforest_eth/types';
import { ArtifactTypes, closestToCenter, getMinimumEnergyNeeded, getMyPlanets, getMyPlanetsInRange, isActivated, MAX_ARTIFACT_COUNT, Move, planetCanAcceptMove, planetName, PlanetTypes, planetWillHaveMinEnergyAfterMove } from '../utils';

declare const df: GameManager
declare const ui: GameUIManager

function findArtifact(p: Planet, rarities: ArtifactRarity[], types: ArtifactType[]) {
  return df.getArtifactsWithIds(p.heldArtifactIds).find(a => {
    return a
    && ! a.unconfirmedMove
    && rarities.includes(a.rarity)
    && types.includes(a.artifactType)
    && !isActivated(a)
  })
}

interface config {
  onId?: LocationId,
  types: ArtifactType[]
  rarities: ArtifactRarity[],
  maxRipLevel: PlanetLevel,
  nearMinLevel: PlanetLevel,
  nearMaxLevel: PlanetLevel,
  nearPlanetType: PlanetType,
}
export function dropArtifacts(config: config)
{
  const dropsToMake = getMyPlanets()
    .filter(r => r.planetType === PlanetTypes.RIP)
    .filter(r => r.planetLevel <= config.maxRipLevel)
    .filter(r => ! config.onId || r.locationId === config.onId)
    .filter(r => r.heldArtifactIds.length === 0)
    .filter(r => getMyPlanetsInRange(r).some(p => (
        p.planetType === config.nearPlanetType
        && p.planetLevel >= config.nearMinLevel
        && p.planetLevel <= config.nearMaxLevel
        && planetCanAcceptMove(p, 0)
    )))
    .sort(closestToCenter)
    .flatMap(rip => df.getMyArtifacts().filter(a => (
        ! a.onPlanetId
        && config.types.includes(a.artifactType)
        && config.rarities.includes(a.rarity)
      )).map(artifact => ({
        artifact,
        rip
      }))
    )

  console.log({ dropsToMake })

  const drops = dropsToMake.map(drop => {
    if (
      ! drop.rip.unconfirmedDepositArtifact
      && ! drop.artifact.unconfirmedDepositArtifact
    ) {
      console.log(`DROPPING ${artifactNameFromArtifact(drop.artifact!)} ${Object.keys(ArtifactTypes)[drop.artifact.artifactType]} TO ${planetName(drop.rip)}`)
      return df.depositArtifact(drop.rip.locationId, drop.artifact.id)
    }
  })

  return drops
}
