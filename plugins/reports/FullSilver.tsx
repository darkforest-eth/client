import { h } from 'preact'
import { Planet } from '@darkforest_eth/types'
import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { PlanetLink } from '../components/PlanetLink'
import { Header, Sub, Title } from '../components/Text'
import { Table } from '../Components/Table';

import { distributeSilver } from '../strategies/DistributeSilver'
import { withdrawSilver } from '../strategies/WithdrawSilver'

import { capturePlanets } from '../strategies/Crawl'
import { availableSilver, buttonGridStyle, energy, hasPendingMove, isAsteroid, PlanetTypes, SelectedPlanetProp } from '../utils'

declare const df: GameManager
declare const ui: GameUIManager

export function FullSilver(props: SelectedPlanetProp)
{
  const headers = ['Planet Name', 'Level', 'Silver'];
  const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r', 'r'];

  const rows = df.getMyPlanets()
    .filter(p => p.planetLevel >= 4)
    .filter(p => availableSilver(p) == p.silverCap)
    .sort((a, b) => b.silverCap - a.silverCap)

  const columns = [
    (planet: Planet) => <PlanetLink planet={planet}>{df.getProcgenUtils().getPlanetName(planet)}</PlanetLink>,
    (planet: Planet) => <Sub>{planet.planetLevel}</Sub>,
    (planet: Planet) => <Sub>{planet.silverCap / 1000}K</Sub>,
  ];

  function onDistributeClick() {
    distributeSilver({
      fromId: props.selectedPlanet?.locationId,
      fromMaxLevel: 4,
      toMinLevel: 4,
      toPlanetType: PlanetTypes.PLANET,
    })

    distributeSilver({
      fromId: props.selectedPlanet?.locationId,
      fromMaxLevel: 4,
      toMinLevel: 2,
      toPlanetType: PlanetTypes.RIP,
    })
  }

  function onWithdrawClick() {
    withdrawSilver({
      fromId: props.selectedPlanet?.locationId
    })
  }

  return <div>
    <Header>Full Silver</Header>
    <div style={buttonGridStyle}>
      <button onClick={onDistributeClick}>Rip</button>
      <button onClick={onWithdrawClick}>Withdraw</button>
    </div>
    <Table
      rows={rows}
      headers={headers}
      columns={columns}
      alignments={alignments}
    />
  </div>
}
