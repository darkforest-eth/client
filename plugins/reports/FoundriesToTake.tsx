import { Component, h } from 'preact'
import { Planet, PlanetLevel } from '@darkforest_eth/types'
import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { PlanetLink } from '../components/PlanetLink'
import { Header, Sub, Title } from '../components/Text'
import { Table } from '../Components/Table';
import { ManageInterval } from '../Components/ManageInterval'

import { capturePlanets, highestLevel, lowestEnergy } from '../strategies/Crawl'
import { buttonGridStyle, canHaveArtifact, energy, getEnergyNeeded, getMyPlanets, isReachable, isUnowned, planetName, PlanetTypes, PrimeMinutes } from '../utils'

const pauseable = require('pauseable')

declare const df: GameManager
declare const ui: GameUIManager

function onCrawlClick(selectedPlanet: Planet|null = null) {
  capturePlanets({
    fromId: selectedPlanet?.locationId,
    fromMaxLevel: selectedPlanet?.planetLevel || PlanetLevel.FOUR,
    fromMinEnergyLeftPercent: 37.5,
    toMinLevel: PlanetLevel.TWO,
    toPlanetTypes: [PlanetTypes.FOUNDRY],
    toTargetEnergy: 95.5,
    sortFunction: highestLevel,
  })

  // capturePlanets({
  //   fromId: selectedPlanet?.locationId,
  //   fromMaxLevel: selectedPlanet?.planetLevel || PlanetLevel.NINE,
  //   fromMinEnergyLeftPercent: 37.5,
  //   toPlanetType: PlanetTypes.RIP,
  //   toMinLevel: PlanetLevel.THREE,
  //   toTargetEnergy: 15,
  //   sortFunction: lowestEnergy,
  // })
}

/**
 * From furtherst:
 *
 * - Could reach with 100% energy
 * - Could reach with current energy
 * - Could take over with current energy <--
 * - Could take over and prospect with current energy
 */
export function isReachable(p: Planet) {
  return getMyPlanets().some(myPlanet => {
    const energyNeeded = getEnergyNeeded(myPlanet, p, 40)
    const reachable = energyNeeded < myPlanet.energy

    reachable && console.log(`${planetName(p)} reachable by ${planetName(myPlanet,)} with ${energyNeeded}% energy`)

    return reachable
  })
}

export class FoundriesToTake extends Component
{
  interval: any

  constructor() {
    super()
    this.interval = pauseable.setInterval(PrimeMinutes.ELEVEN, onCrawlClick)
    // this.interval.pause()
  }

  render()
  {
    const headers = ['Planet Name', 'Level'];
    const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r'];

    const rows = Array.from(df.getAllPlanets())
      .filter(p => p.location)
      .filter(isUnowned)
      .filter(p => p.planetLevel >= 3)
      .filter(canHaveArtifact)
      .filter(isReachable)
      .sort((a, b) => b.planetLevel - a.planetLevel)

    const columns = [
      (planet: Planet) => <PlanetLink planet={planet}>{df.getProcgenUtils().getPlanetName(planet)}</PlanetLink>,
      (planet: Planet) => <Sub>{planet.planetLevel}</Sub>,
    ];

    return <div>
      <Header>Foundries</Header>
      <ManageInterval interval={this.interval} />
      <div style={buttonGridStyle}>
        <button onClick={() => onCrawlClick(ui.getSelectedPlanet())}>Crawl</button>
      </div>
      <Table
        rows={rows}
        headers={headers}
        columns={columns}
        alignments={alignments}
      />
    </div>
  }

  componentWillUnmount() {
    this.interval.clear()
  }
}
