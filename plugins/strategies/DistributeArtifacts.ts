import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { artifactNameFromArtifact, ArtifactRarity, LocationId, Planet, PlanetLevel, PlanetType } from '@darkforest_eth/types';
import { getMyPlanets, getMyPlanetsInRange, Move, planetCanAcceptMove, planetName, PlanetTypes, planetWillHaveMinEnergyAfterMove } from '../utils';

declare const df: GameManager
declare const ui: GameUIManager

function findArtifact(p: Planet, rarity: ArtifactRarity) {
  return df.getArtifactsWithIds(p.heldArtifactIds).find(a => {
    return a && ! a.unconfirmedMove && a.rarity === rarity
  })
}

interface config {
  fromId?: LocationId,
  rarity: ArtifactRarity,
  toMinLevel: PlanetLevel,
  toPlanetType: PlanetType,
}
export function distributeArtifacts(config: config)
{
  const from = getMyPlanets()
    .filter(p => p.planetType === PlanetTypes.FOUNDRY)
    .filter(p => ! config.fromId || p.locationId === config.fromId)
    .filter(p => findArtifact(p, config.rarity))
    .slice(0, 100) // max 100 at a time

  console.log(`Distributing artifacts from ${from.length} planets with `, config)

  const movesToMake: Move[] = from.flatMap(from => {
    const to = getMyPlanetsInRange(from)
      .filter(p => p.planetLevel >= config.toMinLevel)
      .filter(p => p.planetType === config.toPlanetType)
      .filter(p => p.heldArtifactIds.length < 5)

    const moves = to.map(to => {
      const energy = Math.ceil(df.getEnergyNeededForMove(from.locationId, to.locationId, 1))
      const artifact = findArtifact(from, config.rarity)

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

  const moves = movesToMake.map(move => {
    if (
      planetWillHaveMinEnergyAfterMove(move, 1)
      && ! move.artifact!.unconfirmedMove
      && planetCanAcceptMove(move)
    ) {
      console.log(`SENDING ${artifactNameFromArtifact(move.artifact!)} FROM ${planetName(move.from)} (ui.centerLocationId('${move.from.locationId}')) TO ${planetName(move.to)} (ui.centerLocationId('${move.to.locationId}')) WITH ${move.energy}`)
      return df.move(move.from.locationId, move.to.locationId, move.energy, 0, move.artifact!.id);
    }
  })

  return moves
}
