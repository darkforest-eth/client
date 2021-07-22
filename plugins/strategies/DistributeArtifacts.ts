import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { artifactNameFromArtifact, ArtifactRarity, ArtifactType, LocationId, Planet, PlanetLevel, PlanetType } from '@darkforest_eth/types';
import { getMinimumEnergyNeeded, getMyPlanets, getMyPlanetsInRange, isActivated, MAX_ARTIFACT_COUNT, Move, planetCanAcceptMove, planetName, PlanetTypes, planetWillHaveMinEnergyAfterMove } from '../utils';

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
  fromId?: LocationId,
  types: ArtifactType[]
  rarities: ArtifactRarity[],
  toMinLevel: PlanetLevel,
  toPlanetType: PlanetType,
}
export function distributeArtifacts(config: config)
{
  const from = getMyPlanets()
    .filter(p => p.planetType === PlanetTypes.FOUNDRY)
    .filter(p => ! config.fromId || p.locationId === config.fromId)
    .filter(p => findArtifact(p, config.rarities, config.types))

  console.log(`Distributing artifacts from ${from.length} planets with `, config)

  // current max artifacts on the planet (before the move)
  const maxArtifacts = config.toPlanetType === PlanetType.PLANET ? 0 : 5

  const movesToMake: Move[] = from.flatMap(from => {
    const to = getMyPlanetsInRange(from)
      .filter(p => p.planetLevel >= config.toMinLevel)
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

  // Max 100 at a time
  const moves = movesToMake.slice(0, 100).map(move => {
    if (
      planetWillHaveMinEnergyAfterMove(move, 1)
      && ! move.artifact!.unconfirmedMove
      && planetCanAcceptMove(move.to, maxArtifacts)
    ) {
      console.log(`SENDING ${artifactNameFromArtifact(move.artifact!)} FROM ${planetName(move.from)} (ui.centerLocationId('${move.from.locationId}')) TO ${planetName(move.to)} (ui.centerLocationId('${move.to.locationId}')) WITH ${move.energy}`)
      return df.move(move.from.locationId, move.to.locationId, move.energy, 0, move.artifact!.id);
    }
  })

  return moves
}
