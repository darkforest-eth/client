import { Component, h } from 'preact'
import { Planet } from '@darkforest_eth/types'
import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { PlanetLink } from '../components/PlanetLink'
import { Header, Sub, Title } from '../components/Text'
import { Table } from '../Components/Table';

import { capturePlanets } from '../strategies/Crawl'
import { buttonGridStyle, energy, hasPendingMove, isAsteroid, PlanetTypes, SelectedPlanetProp } from '../utils'
const pauseable = require('pauseable')

declare const df: GameManager
declare const ui: GameUIManager

function onCrawlClick(selectedPlanet: Planet) {
  console.log('Crawling')
  // capturePlanets({
  //   fromId: selectedPlanet?.locationId,
  //   toMinLevel: 2,
  //   fromMaxLevel: 4,
  //   fromMinEnergyLeftPercent: 37.5,
  //   toPlanetType: PlanetTypes.RIP,
  //   toTargetEnergy: 15
  // })

  // capturePlanets({
  //   fromId: selectedPlanet?.locationId,
  //   toMinLevel: 4,
  //   fromMaxLevel: 4,
  //   fromMinEnergyLeftPercent: 37.5,
  //   toPlanetType: PlanetTypes.QUASAR,
  //   toTargetEnergy: 0
  // })

  // capturePlanets({
  //   fromId: selectedPlanet?.locationId,
  //   toMinLevel: 4,
  //   fromMaxLevel: 4,
  //   fromMinEnergyLeftPercent: 37.5,
  //   toPlanetType: PlanetTypes.ASTEROID,
  //   toTargetEnergy: 15
  // })

  // capturePlanets({
  //   fromId: selectedPlanet?.locationId,
  //   toMinLevel: 4,
  //   fromMaxLevel: 4,
  //   fromMinEnergyLeftPercent: 37.5,
  //   toPlanetType: PlanetTypes.PLANET,
  //   toTargetEnergy: 15
  // })
}

export class PlanetsWithEnergy extends Component
{
  interval: any

  constructor() {
    super()
    console.log('mount')
    this.interval = pauseable.setInterval(5 * 60 * 1000, onCrawlClick);
  }

  render(props: SelectedPlanetProp, state: any)
  {
    console.log('PlanetsWithEnergy')
    const headers = ['Planet Name', 'Level', 'Energy'];
    const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r', 'r'];

    const rows = df.getMyPlanets()
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
    <div>Next Tick in {this.interval.next()}</div>
    <div style={buttonGridStyle}>
      <button onClick={() => onCrawlClick(props.selectedPlanet)}>
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