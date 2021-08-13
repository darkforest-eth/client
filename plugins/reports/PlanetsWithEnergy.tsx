import { Component, h } from 'preact'
import { Planet, PlanetLevel } from '@darkforest_eth/types'
import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { PlanetLink } from '../components/PlanetLink'
import { Header, Sub, Title } from '../components/Text'
import { Table } from '../Components/Table';
import { ManageInterval } from '../Components/ManageInterval'

import { capturePlanets, closestToCenter, directionToCenter, lowestEnergy } from '../strategies/Crawl'
import { buttonGridStyle, energy, getMyPlanets, getPlanetTypeAcronym, hasPendingMove, isAsteroid, isFoundry, planetName, PlanetTypes, PrimeMinutes } from '../utils'
const pauseable = require('pauseable')

declare const df: GameManager
declare const ui: GameUIManager

function onCrawlClick(selectedPlanet: Planet|null = null) {
  console.log('Crawling')

  capturePlanets({
    fromId: selectedPlanet?.locationId,
    fromMaxLevel: selectedPlanet?.planetLevel || PlanetLevel.FOUR,
    fromMinEnergyLeftPercent: 37.5,
    toPlanetTypes: [PlanetTypes.PLANET, PlanetTypes.ASTEROID, PlanetTypes.RIP],
    toMinLevel: PlanetLevel.FOUR,
    toTargetEnergy: 15,
    sortFunction: directionToCenter,
  })
}

export class PlanetsWithEnergy extends Component
{
  interval: any

  constructor() {
    super()
    this.interval = pauseable.setInterval(PrimeMinutes.FIVE, onCrawlClick)
    // this.interval.pause()
  }

  render()
  {
    console.log('PlanetsWithEnergy')
    const headers = ['Planet Name', 'Level', 'Energy'];
    const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r', 'r'];

    const rows = getMyPlanets()
      .filter(p => p.planetLevel >= 3)
      .filter(p => ! isFoundry(p))
      .filter(p => ! hasPendingMove(p))
      .filter(p => energy(p) > 75)
      // .sort((a, b) => energy(b) - energy(a))
      .sort((a, b) => b.planetLevel - a.planetLevel || energy(b) - energy(a))

    const columns = [
      (planet: Planet) => <PlanetLink planet={planet}>P{getPlanetTypeAcronym(planet)} {planetName(planet)}</PlanetLink>,
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
