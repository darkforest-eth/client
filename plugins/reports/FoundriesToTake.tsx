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
import { availableSilver, buttonGridStyle, canHaveArtifact, canPlanetUpgrade, energy, enoughEnergyToProspect, getPlanetRank, hasPendingMove, isAsteroid, isFindable, isProspectable, isReachable, isUnowned, PlanetTypes, SelectedPlanetProp } from '../utils'

declare const df: GameManager
declare const ui: GameUIManager

export function FoundriesToTake(props: SelectedPlanetProp)
 {
   const headers = ['Planet Name', 'Level'];
   const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r'];

   const rows = Array.from(df.getAllPlanets())
     .filter(p => p.location)
     .filter(isUnowned)
     .filter(p => p.planetLevel >= 3)
     .filter(canHaveArtifact)
     .filter(isReachable)
     .sort((a, b) => b.planetLevel - a.planetLevel)

   const columns = [
     (planet: Planet) => <PlanetLink planet={planet}>{df.getProcgenUtils().getPlanetName(planet)}</PlanetLink>,
     (planet: Planet) => <Sub>{planet.planetLevel}</Sub>,
   ];

   function onCrawlClick() {
     capturePlanets({
       fromId: props.selectedPlanet?.locationId,
       fromMaxLevel: props.selectedPlanet?.planetLevel || 4,
       fromMinEnergyLeftPercent: 37.5,
       toMinLevel: 3,
       toPlanetType: PlanetTypes.FOUNDRY,
       toTargetEnergy: 95.5
     })
   }

   return <div>
    <Header>Foundries</Header>
    <div style={buttonGridStyle}>
      <button onClick={onCrawlClick}>Crawl</button>
    </div>
    <Table
      rows={rows}
      headers={headers}
      columns={columns}
      alignments={alignments}
    />
  </div>
 }
