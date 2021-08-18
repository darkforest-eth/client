import { Component, h } from 'preact'
import { Planet, PlanetLevel } from '@darkforest_eth/types'
import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { PlanetLink } from '../components/PlanetLink'
import { Header, Sub, Title } from '../components/Text'
import { Table } from '../components/Table';
import { ManageInterval } from '../components/ManageInterval'

import { capturePlanets, closestToCenter, directionToCenter, highestLevel, lowestEnergy } from '../strategies/Crawl'
import { distributeEnergy } from '../strategies/DistributeEnergy'
import { buttonGridStyle, energy, getMyPlanets, getPlanetTypeAcronym, hasPendingMove, isAsteroid, isFoundry, planetName, PlanetTypes, PrimeMinutes } from '../utils'
const pauseable = require('pauseable')

declare const df: GameManager
declare const ui: GameUIManager

function onCrawlClick(selectedPlanet: Planet|null = null) {
  console.log('Crawling')

  capturePlanets({
    fromId: selectedPlanet?.locationId,
    fromMaxLevel: selectedPlanet?.planetLevel || PlanetLevel.FIVE,
    fromMinEnergyLeftPercent: 37.5,
    toMinLevel: PlanetLevel.TWO,
    toPlanetTypes: [PlanetTypes.FOUNDRY],
    toTargetEnergy: 15,
    sortFunction: highestLevel,
  })

  capturePlanets({
    fromId: selectedPlanet?.locationId,
    fromMaxLevel: selectedPlanet?.planetLevel || PlanetLevel.FIVE,
    fromMinEnergyLeftPercent: 37.5,
    toPlanetTypes: [PlanetTypes.PLANET, PlanetTypes.ASTEROID, PlanetTypes.RIP],
    toMinLevel: PlanetLevel.FOUR,
    toTargetEnergy: 15,
    sortFunction: directionToCenter,
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

function onDistributeClick(selectedPlanet: Planet|null = null) {
  console.log('Distribute')

  distributeEnergy({
    fromId: selectedPlanet?.locationId,
    fromMinLevel: selectedPlanet?.planetLevel || PlanetLevel.FOUR,
    fromMaxLevel: selectedPlanet?.planetLevel || PlanetLevel.SIX,
  })
}

export class PlanetsWithEnergy extends Component
{
  interval: any

  constructor() {
    super()
    // takes 80 minutes for a l4 r5 planet to go from 37.5% to 50%
    // let's do this twice then the closest 10 planets should be sending energy
    this.interval = pauseable.setInterval(PrimeMinutes.NINETEEN, () => {
      onCrawlClick()
      onDistributeClick()
    })
    // this.interval.pause()
  }

  render()
  {
    console.log('PlanetsWithEnergy')
    const headers = ['Planet Name', 'Energy'];
    const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r', 'r'];

    const rows = getMyPlanets()
      .filter(p => p.planetLevel >= 5)
      .filter(p => ! isFoundry(p))
      .filter(p => ! hasPendingMove(p))
      .filter(p => energy(p) > 75)
      // .sort((a, b) => energy(b) - energy(a))
      .sort((a, b) => b.planetLevel - a.planetLevel || energy(b) - energy(a))

    const columns = [
      (planet: Planet) => <PlanetLink planet={planet}>{getPlanetTypeAcronym(planet)}L{planet.planetLevel} {planetName(planet)}</PlanetLink>,
      (planet: Planet) => <Sub>{energy(planet)}%</Sub>,
    ]

    return <div>
    <Header>Planets with &gt; 75% Energy</Header>
    <ManageInterval interval={this.interval} />
    <div style={buttonGridStyle}>
      <button onClick={() => onCrawlClick(ui.getSelectedPlanet())}>
        Crawl
      </button>
      <button onClick={() => onDistributeClick(ui.getSelectedPlanet())}>
        Distribute
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
