import { h } from 'preact'
import { Artifact, Planet } from '@darkforest_eth/types'
import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { PlanetLink } from '../components/PlanetLink'
import { Header, Sub, Title } from '../components/Text'
import { Table } from '../Components/Table';

import { distributeSilver } from '../strategies/DistributeSilver'
import { withdrawSilver } from '../strategies/WithdrawSilver'
import { upgrade } from '../strategies/Upgrade'

import { capturePlanets } from '../strategies/Crawl'
import { ArtifactRarities, ArtifactTypes, canBeActivated, getAllArtifacts, getPlanetRank, hasPendingMove, isActivated, isAsteroid, isFindable, isProspectable, isReachable, isUnowned, PlanetTypes, SelectedPlanetProp } from '../utils'
import { addHours, formatDistanceToNow, fromUnixTime, isAfter } from 'date-fns'

declare const df: GameManager
declare const ui: GameUIManager

export function Cannons(props: SelectedPlanetProp)
{
  const headers = ['Rarity', 'Planet Name', 'Planet Level', 'Status'];
  const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r', 'r'];

  const rows = getAllArtifacts()
    .filter(a => a && a.artifactType == ArtifactTypes.PhotoidCannon)
    .filter(a => a && a.rarity > ArtifactRarities.Common)
    .sort((a, b) => b!.rarity - a!.rarity)

  const columns = [
    (a: Artifact) => <Sub>{Object.keys(ArtifactRarities)[a.rarity]}</Sub>,
    (a: Artifact) => {
      const planet = df.getPlanetWithId(a.onPlanetId)

      if (! planet) return <Sub>inventory</Sub>

      return <PlanetLink planet={planet}>{df.getProcgenUtils().getPlanetName(planet)}</PlanetLink>
    },
    (a: Artifact) => {
      const planet = df.getPlanetWithId(a.onPlanetId)

      if (! planet) return <Sub>-</Sub>

      return <Sub>{planet!.planetLevel}</Sub>
    },
    (a: Artifact) => {
      const lastActivated = fromUnixTime(a.lastActivated)
      const readyAt = addHours(lastActivated, 4)

      const status = isActivated(a)
          ? (isAfter(new Date, readyAt) ? 'FIRE' : `Fire in ${formatDistanceToNow(readyAt)}`)
          : canBeActivated(a) ? 'IDLE' : `WAIT`

      return <Sub>{status}</Sub>
    },
  ];

  return <div>
    <Header>Cannons</Header>
    <Table
      rows={rows}
      headers={headers}
      columns={columns}
      alignments={alignments}
    />
  </div>
}
