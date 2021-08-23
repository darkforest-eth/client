import { Component, h } from 'preact'
import { Planet } from '@darkforest_eth/types'
import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { PlanetLink } from '../components/PlanetLink'
import { Header, Sub, Title } from '../components/Text'
import { Table } from '../Components/Table';
import { ManageInterval } from '../Components/ManageInterval'
import { upgrade } from '../strategies/Upgrade'
import { buttonGridStyle, canPlanetUpgrade, getMyPlanets, getPlanetRank, planetName, PrimeMinutes } from '../utils'

const pauseable = require('pauseable')

declare const df: GameManager
declare const ui: GameUIManager

function onUpgradeClick(selectedPlanet: Planet|null = null) {
  upgrade({
    fromId: selectedPlanet?.locationId,
  })
}

export class Upgradable extends Component
{
  interval: any

  constructor() {
    super()
    this.interval = pauseable.setInterval(PrimeMinutes.THREE, onUpgradeClick)
    this.interval.pause()
  }

  render()
  {
   const headers = ['Planet Name', 'Level', 'Rank'];
   const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r', 'r'];

   const rows = getMyPlanets()
     .filter(canPlanetUpgrade)
     .filter(p => p.unconfirmedUpgrades.length === 0)
     .sort((a, b) => b.planetLevel - a.planetLevel)

   const columns = [
     (planet: Planet) => <PlanetLink planet={planet}>{planetName(planet)}</PlanetLink>,
     (planet: Planet) => <Sub>{planet.planetLevel}</Sub>,
     (planet: Planet) => <Sub>{getPlanetRank(planet)}</Sub>,
   ];

   return <div>
    <Header>Upgradable</Header>
    <ManageInterval interval={this.interval} />
    <div style={buttonGridStyle}>
      <button onClick={() => onUpgradeClick(ui.getSelectedPlanet())}>Upgrade</button>
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
