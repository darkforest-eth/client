import { Component, h } from 'preact'
import { Planet, PlanetLevel } from '@darkforest_eth/types'
import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { PlanetLink } from '../components/PlanetLink'
import { Header, Sub, Title } from '../components/Text'
import { Table } from '../Components/Table';
import { ManageInterval } from '../Components/ManageInterval'

import { capturePlanets, highestLevel, lowestEnergy } from '../strategies/Crawl'
import { buttonGridStyle, canHaveArtifact, isReachable, isUnowned, PlanetTypes } from '../utils'

const pauseable = require('pauseable')

declare const df: GameManager
declare const ui: GameUIManager

function onCrawlClick(selectedPlanet: Planet|null = null) {
  capturePlanets({
    fromId: selectedPlanet?.locationId,
    fromMaxLevel: selectedPlanet?.planetLevel || PlanetLevel.NINE,
    fromMinEnergyLeftPercent: 37.5,
    toMinLevel: PlanetLevel.THREE,
    toPlanetType: PlanetTypes.FOUNDRY,
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

export class FoundriesToTake extends Component
{
  interval: any

  constructor() {
    super()
    this.interval = pauseable.setInterval(4 * 60 * 1000, onCrawlClick)
    this.interval.pause()
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
