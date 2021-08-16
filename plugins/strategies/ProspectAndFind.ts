import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'

declare const df: GameManager
declare const ui: GameUIManager

import { blocksLeft, blocksLeftToProspectExpiration, enoughEnergyToProspect, getMyPlanets, isFindable, isProspectable } from "../utils"

export function prospectAndFind()
{
  if (df.isRoundOver()) return

  getMyPlanets()
    .filter(isFindable)
    .sort((a, b) => blocksLeft(a) - blocksLeft(b))
    .map(p => {
      df.findArtifact(p.locationId)
    })

  getMyPlanets()
    .filter(isProspectable)
    .slice(0, 10) // don't prospect too many at the same time
    .map(async (p) => {
      await df.prospectPlanet(p.locationId)
      df.findArtifact(p.locationId)
    })
}
