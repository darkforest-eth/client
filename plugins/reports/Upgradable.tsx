import { Component, h } from 'preact'
import { Planet } from '@darkforest_eth/types'
import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { PlanetLink } from '../components/PlanetLink'
import { Header, Sub, Title } from '../components/Text'
import { Table } from '../Components/Table';
import { ManageInterval } from '../Components/ManageInterval'

import { distributeSilver } from '../strategies/DistributeSilver'
import { withdrawSilver } from '../strategies/WithdrawSilver'
import { upgrade } from '../strategies/Upgrade'

import { capturePlanets } from '../strategies/Crawl'
import { availableSilver, buttonGridStyle, canPlanetUpgrade, energy, enoughEnergyToProspect, getPlanetRank, hasPendingMove, isAsteroid, isFindable, isProspectable, PlanetTypes, SelectedPlanetProp } from '../utils'

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
    this.interval = pauseable.setInterval(2 * 60 * 1000, onUpgradeClick)
  }

  render()
  {
   const headers = ['Planet Name', 'Level', 'Rank'];
   const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r', 'r'];

   const rows = df.getMyPlanets()
     .filter(canPlanetUpgrade)
     .sort((a, b) => b.planetLevel - a.planetLevel)

   const columns = [
     (planet: Planet) => <PlanetLink planet={planet}>{df.getProcgenUtils().getPlanetName(planet)}</PlanetLink>,
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
