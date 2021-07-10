import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { LocationId, PlanetLevel, PlanetType, UpgradeBranchName } from '@darkforest_eth/types';
import { canPlanetUpgrade, getPlanetRank, getPlanetRankForBranch } from '../utils'

declare const df: GameManager
declare const ui: GameUIManager

const Branches: { [key:string]: UpgradeBranchName } = {
  DEFENSE: 0,
  RANGE: 1,
  SPEED: 2,
}

const upgradeOrder = [
  Branches.RANGE,
  Branches.SPEED,
  Branches.RANGE,
  Branches.SPEED,
  Branches.RANGE,
]

interface config {
  fromId?: LocationId,
}
export function upgrade(config: config)
{
  df.getMyPlanets()
    .filter(canPlanetUpgrade)
    .filter(p => ! config.fromId || p.locationId === config.fromId)
    .map(p => {
      df.upgrade(p.locationId, upgradeOrder[getPlanetRank(p)])
    })
}
