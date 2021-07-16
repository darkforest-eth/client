import { h } from 'preact'
import { Planet } from '@darkforest_eth/types'
import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { PlanetLink } from '../components/PlanetLink'
import { Header, Sub, Title } from '../components/Text'
import { Table } from '../Components/Table';

import { distributeSilver } from '../strategies/DistributeSilver'
import { withdrawSilver } from '../strategies/WithdrawSilver'
import { upgrade } from '../strategies/Upgrade'

import { capturePlanets } from '../strategies/Crawl'
import { availableSilver, buttonGridStyle, canPlanetUpgrade, energy, enoughEnergyToProspect, getPlanetRank, hasPendingMove, isAsteroid, isFindable, isProspectable, PlanetTypes, SelectedPlanetProp } from '../utils'

declare const df: GameManager
declare const ui: GameUIManager

/**
 * @todo Can't test this since round was over.
 */
 export function Upgradable(props: SelectedPlanetProp)
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

   function onUpgradeClick() {
     upgrade({
       fromId: props.selectedPlanet?.locationId,
     })
   }

   return <div>
    <Header>Upgradable</Header>
    <div style={buttonGridStyle}>
      <button onClick={onUpgradeClick}>Upgrade</button>
    </div>
    <Table
      rows={rows}
      headers={headers}
      columns={columns}
      alignments={alignments}
    />
  </div>
}
