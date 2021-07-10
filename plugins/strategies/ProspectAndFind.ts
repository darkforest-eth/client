import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'

declare const df: GameManager
declare const ui: GameUIManager

import { blocksLeft, blocksLeftToProspectExpiration, enoughEnergyToProspect, isFindable, isProspectable } from "../utils"

export function prospectAndFind()
{
  df.getMyPlanets()
    .filter(p => isFindable)
    .sort((a, b) => blocksLeft(a) - blocksLeft(b))
    .map(p => df.findArtifact(p.locationId))

  df.getMyPlanets()
    .filter(isProspectable)
    .filter(enoughEnergyToProspect)
    .slice(0, 10) // don't prospect too many at the same time
    .map(p => df.prospectPlanet(p.locationId))
}
