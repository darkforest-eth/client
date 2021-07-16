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
import { availableSilver, buttonGridStyle, energy, enoughEnergyToProspect, hasPendingMove, isAsteroid, isFindable, isProspectable, PlanetTypes, SelectedPlanetProp } from '../utils'
import { prospectAndFind } from 'plugins/strategies/ProspectAndFind'

declare const df: GameManager
declare const ui: GameUIManager

/**
 * @todo Can't test this since round was over.
 */
 export function ProspectOrFind()
 {
   const headers = ['Planet Name', 'Level', 'Blocks Left'];
   const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r', 'r'];

   const currentBlockNumber = df.contractsAPI.ethConnection.blockNumber;

   const rows = df.getMyPlanets()
     .filter(enoughEnergyToProspect)
     .filter(p => isProspectable(p) || isFindable(p, currentBlockNumber))
     .sort((a, b) => b.planetLevel - a.planetLevel)

   const columns = [
     (planet: Planet) => <PlanetLink planet={planet}>{df.getProcgenUtils().getPlanetName(planet)}</PlanetLink>,
     (planet: Planet) => <Sub>{planet.planetLevel}</Sub>,
     (planet: Planet) => <Sub>{planet.prospectedBlockNumber ? blocksLeft(planet) : '-'}</Sub>,
   ];

   function onProspectAndFindClick() {
     prospectAndFind()
   }

   return <div>
    <Header>Prospect or Find</Header>
    <div style={buttonGridStyle}>
      <button onClick={onProspectAndFindClick}>Prospect & Find</button>
    </div>
    <Table
      rows={rows}
      headers={headers}
      columns={columns}
      alignments={alignments}
    />
  </div>
 }
