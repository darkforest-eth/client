import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { LocationId, PlanetLevel, PlanetType, UpgradeBranchName } from '@darkforest_eth/types';
import { canPlanetUpgrade, energy, getMyPlanets, getPlanetRank, getPlanetRankForBranch } from '../utils'

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
    .filter(p => energy(p) > 15) // once we upgrade, energy cap goes up which means we're lower on the S curve, better off to wait a bit.
    .filter(p => ! config.fromId || p.locationId === config.fromId)
    .map(p => {
      const range = p.upgradeState[Branches.RANGE]

      // 0 DEF, 4 RANGE, 1 SPEED (RANGE FIRST)
      const branch = range < 4 ? Branches.RANGE : Branches.SPEED

      df.upgrade(p.locationId, branch)
    })
}
