import { Component, h } from 'preact'
import { Planet } from '@darkforest_eth/types'
import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { PlanetLink } from '../components/PlanetLink'
import { Header, Sub, Title } from '../components/Text'
import { Table } from '../Components/Table';
import { ManageInterval } from '../Components/ManageInterval'

import { capturePlanets } from '../strategies/Crawl'
import { buttonGridStyle, energy, getMyPlanets, hasPendingMove, isAsteroid, PlanetTypes } from '../utils'
const pauseable = require('pauseable')

declare const df: GameManager
declare const ui: GameUIManager

function onCrawlClick(selectedPlanet: Planet|null = null) {
  console.log('Crawling')

  capturePlanets({
    fromId: selectedPlanet?.locationId,
    toMinLevel: 2,
    fromMaxLevel: 4,
    fromMinEnergyLeftPercent: 37.5,
    toPlanetType: PlanetTypes.RIP,
    toTargetEnergy: 15
  })

  capturePlanets({
    fromId: selectedPlanet?.locationId,
    toMinLevel: 4,
    fromMaxLevel: 4,
    fromMinEnergyLeftPercent: 37.5,
    toPlanetType: PlanetTypes.QUASAR,
    toTargetEnergy: 0
  })

  capturePlanets({
    fromId: selectedPlanet?.locationId,
    toMinLevel: 4,
    fromMaxLevel: 4,
    fromMinEnergyLeftPercent: 37.5,
    toPlanetType: PlanetTypes.ASTEROID,
    toTargetEnergy: 15
  })

  capturePlanets({
    fromId: selectedPlanet?.locationId,
    toMinLevel: 4,
    fromMaxLevel: 4,
    fromMinEnergyLeftPercent: 37.5,
    toPlanetType: PlanetTypes.PLANET,
    toTargetEnergy: 15
  })
}

export class PlanetsWithEnergy extends Component
{
  interval: any

  constructor() {
    super()
    this.interval = pauseable.setInterval(10 * 60 * 1000, onCrawlClick)
    this.interval.pause()
  }

  render()
  {
    console.log('PlanetsWithEnergy')
    const headers = ['Planet Name', 'Level', 'Energy'];
    const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r', 'r'];

    const rows = getMyPlanets()
      .filter(p => p.planetLevel >= 4)
      .filter(p => ! isAsteroid(p))
      .filter(p => ! hasPendingMove(p))
      .filter(p => energy(p) > 75)
      .sort((a, b) => energy(b) - energy(a))

    const columns = [
      (planet: Planet) => <PlanetLink planet={planet}>{df.getProcgenUtils().getPlanetName(planet)}</PlanetLink>,
      (planet: Planet) => <Sub>{planet.planetLevel}</Sub>,
      (planet: Planet) => <Sub>{energy(planet)}%</Sub>,
    ]

    return <div>
    <Header>Planets with &gt; 75% Energy</Header>
    <ManageInterval interval={this.interval} />
    <div style={buttonGridStyle}>
      <button onClick={() => onCrawlClick(ui.getSelectedPlanet())}>
        Crawl
      </button>
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
