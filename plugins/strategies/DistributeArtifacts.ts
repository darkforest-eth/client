import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { artifactNameFromArtifact, ArtifactRarity, ArtifactType, LocationId, Planet, PlanetLevel, PlanetType } from '@darkforest_eth/types';
import { artifactType, ArtifactTypes, closestToCenter, findArtifact, findArtifactFromInventory, getClosestPlanet, getMinimumEnergyNeeded, getMyPlanets, getMyPlanetsInRange, isActivated, isMine, MAX_ARTIFACT_COUNT, Move, planetCanAcceptMove, planetName, PlanetTypes, planetWillHaveMinEnergyAfterMove } from '../utils';

declare const df: GameManager
declare const ui: GameUIManager

interface config {
  fromId?: LocationId,
  types: ArtifactType[]
  rarities: ArtifactRarity[],
  nearMinLevel: PlanetLevel,
  nearMaxLevel: PlanetLevel,
  nearPlanetType: PlanetType,
}
/**
 * @todo
 *
 * Goes through each rip:
 *
 * 1. If artifact & planet in range, send to planet
 * 2. If artifact & ! planet in range, withdraw
 * 3. If ! artifact & planet in range, drop
 * 4. if ! artifact & ! planet in range, do nothing...
 */
export function distributeArtifacts(config: config)
{
  // Rips to send from or withdraw
  getMyPlanets()
    .filter(r => r.planetType === PlanetTypes.RIP)
    .filter(r => ! config.fromId || r.locationId === config.fromId)
    .filter(r => findArtifact(r, config.rarities, config.types))
    .sort(closestToCenter)
    .forEach(rip => {
      const planet = getClosestPlanet(rip, p => (
          isMine(p)
          && p.planetType === config.nearPlanetType
          && p.planetLevel >= config.nearMinLevel
          && p.planetLevel <= config.nearMaxLevel
          && planetCanAcceptMove(p, 0)
      ))

      const artifact = findArtifact(rip, config.rarities, config.types)

      if (! artifact) return

      if (planet) {
        const energy = getMinimumEnergyNeeded(rip, planet)

        console.log(`SENDING ${artifactNameFromArtifact(artifact)} FROM ${planetName(rip)} TO ${planetName(planet)}`)

        return df.move(rip.locationId, planet.locationId, energy, 0, artifact.id);
      }
      else {
        // @todo Rip level for Artifact rarity?
        console.log(`WITHDRAWING ${artifactType(artifact)} FROM ${planetName(rip)}`)

        return df.withdrawArtifact(rip.locationId, artifact.id)
      }
    })

    // Planets which want an artifact - drop nearby
    getMyPlanets()
      .filter(p => p.planetType === config.nearPlanetType)
      .filter(p => p.planetLevel >= config.nearMinLevel)
      .filter(p => p.planetLevel <= config.nearMaxLevel)
      .filter(p => ! config.fromId || p.locationId === config.fromId)
      .filter(p => planetCanAcceptMove(p, 0))
      .sort(closestToCenter)
      .forEach(planet => {
        const artifact = findArtifactFromInventory(config.rarities, config.types)

        // @todo Rip level for Artifact rarity?
        const rip = getClosestPlanet(planet, r => (
            isMine(r)
            && r.planetType === PlanetTypes.RIP
        ))

        if (! rip || ! artifact) return

        console.log(`DROPPING ${artifactType(artifact)} ON ${planetName(rip)}`)

        return df.depositArtifact(rip.locationId, artifact.id)
      })
}
