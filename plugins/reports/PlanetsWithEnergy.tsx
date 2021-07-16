import { h } from 'preact'
import { Planet } from '@darkforest_eth/types'
import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { PlanetLink } from '../components/PlanetLink'
import { Header, Sub, Title } from '../components/Text'
import { Table } from '../Components/Table';

import { capturePlanets } from '../strategies/Crawl'
import { energy, hasPendingMove, isAsteroid, PlanetTypes, SelectedPlanetProp } from '../utils'

declare const df: GameManager
declare const ui: GameUIManager

export function PlanetsWithEnergy(props: SelectedPlanetProp)
{
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

  function onCrawlClick() {
    capturePlanets({
      fromId: props.selectedPlanet?.locationId,
      toMinLevel: 2,
      fromMaxLevel: 4,
      fromMinEnergyLeftPercent: 37.5,
      toPlanetType: PlanetTypes.RIP,
      toTargetEnergy: 15
    })

    capturePlanets({
      fromId: props.selectedPlanet?.locationId,
      toMinLevel: 4,
      fromMaxLevel: 4,
      fromMinEnergyLeftPercent: 37.5,
      toPlanetType: PlanetTypes.QUASAR,
      toTargetEnergy: 0
    })

    capturePlanets({
      fromId: props.selectedPlanet?.locationId,
      toMinLevel: 4,
      fromMaxLevel: 4,
      fromMinEnergyLeftPercent: 37.5,
      toPlanetType: PlanetTypes.ASTEROID,
      toTargetEnergy: 15
    })

    capturePlanets({
      fromId: props.selectedPlanet?.locationId,
      toMinLevel: 4,
      fromMaxLevel: 4,
      fromMinEnergyLeftPercent: 37.5,
      toPlanetType: PlanetTypes.PLANET,
      toTargetEnergy: 15
    })
  }

  return <div>
  <Header>Planets with > 75% Energy</Header>
  <button onClick={onCrawlClick}>Crawl</button>
  <Table
    rows={rows}
    headers={headers}
    columns={columns}
    alignments={alignments}
  />
</div>
}
