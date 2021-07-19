import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { LocationId, PlanetLevel, PlanetType, UpgradeBranchName } from '@darkforest_eth/types';
import { canPlanetUpgrade, getMyPlanets, getPlanetRank, getPlanetRankForBranch } from '../utils'

declare const df: GameManager
declare const ui: GameUIManager

const Branches: { [key:string]: UpgradeBranchName } = {
  DEFENSE: 0,
  RANGE: 1,
  SPEED: 2,
}

interface config {
  fromId?: LocationId,
}
export function upgrade(config: config)
{
  getMyPlanets()
    .filter(canPlanetUpgrade)
    .filter(p => p.unconfirmedUpgrades.length === 0)
    .filter(p => ! config.fromId || p.locationId === config.fromId)
    .map(p => {
      const rangeHigher = p.upgradeState[Branches.RANGE] > p.upgradeState[Branches.SPEED]

      const branch = rangeHigher ? Branches.SPEED : Branches.RANGE

      df.upgrade(p.locationId, branch)
    })
}
