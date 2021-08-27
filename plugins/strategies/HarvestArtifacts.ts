import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { artifactNameFromArtifact, ArtifactRarity, ArtifactType, LocationId, Planet, PlanetLevel, PlanetType } from '@darkforest_eth/types';
import { artifactType, findArtifact, getMinimumEnergyNeeded, getMyPlanets, getMyPlanetsInRange, isActivated, MAX_ARTIFACT_COUNT, Move, planetCanAcceptMove, planetName, PlanetTypes, planetWillHaveMinEnergyAfterMove } from '../utils';

declare const df: GameManager
declare const ui: GameUIManager

interface config {
  fromId?: LocationId,
  fromPlanetType: PlanetType,
  types: ArtifactType[]
  rarities: ArtifactRarity[],
  toMinLevel: PlanetLevel,
  toMaxLevel: PlanetLevel,
  toPlanetType: PlanetType,
  ifEmpty: boolean
}
export function harvestArtifacts(config: config)
{
  const from = getMyPlanets()
    .filter(p => p.planetType === config.fromPlanetType)
    .filter(p => ! config.fromId || p.locationId === config.fromId)
    .filter(p => findArtifact(p, config.rarities, config.types))

  console.log(`Distributing artifacts from ${from.length} planets with `, config)

  // current max artifacts on the planet (before the move)
  const maxArtifacts = config.ifEmpty ? 0 : 5

  const movesToMake: Move[] = from.flatMap(from => {
    const to = getMyPlanetsInRange(from)
      .filter(p => p.planetLevel >= config.toMinLevel)
      .filter(p => p.planetLevel <= config.toMaxLevel)
      .filter(p => p.planetType === config.toPlanetType)
      .filter(p => planetCanAcceptMove(p, maxArtifacts))

    const moves = to.map(to => {
      const energy = getMinimumEnergyNeeded(from, to)
      const artifact = findArtifact(from, config.rarities, config.types)

      return {
        from,
        to,
        energy,
        artifact,
      }
    })

    return moves
  })

  // Make the moves with the rarest artifacts first
  movesToMake.sort((a, b) => b.artifact!.rarity - a.artifact!.rarity || a.energy - b.energy)

  console.log({ movesToMake })

  const moves = movesToMake.map(move => {
    if (
      planetWillHaveMinEnergyAfterMove(move, 1)
      && ! move.artifact!.unconfirmedMove
      && planetCanAcceptMove(move.to, maxArtifacts)
      && df.getUnconfirmedMoves().length < 50
    ) {
      console.log(`SENDING ${artifactType(move.artifact!)} FROM ${planetName(move.from)} TO ${planetName(move.to)}`)
      return df.move(move.from.locationId, move.to.locationId, move.energy, 0, move.artifact!.id);
    }
  })

  return moves
}
