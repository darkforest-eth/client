import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { LocationId } from '@darkforest_eth/types';
import { PlanetTypes } from '../utils';

declare const df: GameManager
declare const ui: GameUIManager

interface config {
  fromId?: LocationId,
}
export function withdrawArtifacts(config: config)
{
  const from = df.getMyPlanets()
    .filter(p => p.planetType === PlanetTypes.RIP)
    .filter(p => p.heldArtifactIds.length > 0)
    .filter(p => ! p.unconfirmedWithdrawArtifact)
    .filter(p => ! config.fromId || p.locationId === config.fromId)

  return from.map(from => df.withdrawArtifact(from.locationId, from.heldArtifactIds[0]))
}
