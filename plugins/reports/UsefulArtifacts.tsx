import { h } from 'preact'
import { Artifact, artifactNameFromArtifact, Planet } from '@darkforest_eth/types'
import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { PlanetLink } from '../components/PlanetLink'
import { Header, Sub, Title } from '../components/Text'
import { Table } from '../Components/Table';

import { distributeSilver } from '../strategies/DistributeSilver'
import { distributeArtifacts } from '../strategies/DistributeArtifacts'
import { withdrawArtifacts } from '../strategies/WithdrawArtifacts'
import { activateArtifacts } from '../strategies/ActivateArtifacts'
import { upgrade } from '../strategies/Upgrade'

import { capturePlanets } from '../strategies/Crawl'
import { ArtifactRarities, ArtifactTypes, availableSilver, buttonGridStyle, canBeActivated, canHaveArtifact, canPlanetUpgrade, energy, enoughEnergyToProspect, getAllArtifacts, getPlanetRank, hasPendingMove, isActivated, isAsteroid, isFindable, isProspectable, isReachable, isUnowned, PlanetTypes, SelectedPlanetProp } from '../utils'
import { addHours, formatDistanceToNow, fromUnixTime, isAfter } from 'date-fns'

declare const df: GameManager
declare const ui: GameUIManager

export function UsefulArtifacts(props: SelectedPlanetProp)
{
  const headers = ['Name', 'Type', 'Planet', 'Rarity', 'Status', 'Lvl'];
  const alignments: Array<'r' | 'c' | 'l'> = ['l', 'l', 'l', 'c', 'c', 'r'];

  const rows = getAllArtifacts()
    .filter(a => a && ! isActivated(a))
    .filter(a => a && a.rarity > ArtifactRarities.Common)
    .filter(a => [ArtifactTypes.Wormhole, ArtifactTypes.BloomFilter].includes(a.artifactType))
    .filter(canBeActivated)
    .sort((a, b) => b!.rarity - a!.rarity)

  const columns = [
    (a: Artifact) => <Sub>{artifactNameFromArtifact(a)}</Sub>,
    (a: Artifact) => <Sub>{Object.keys(ArtifactTypes)[a.artifactType]}</Sub>,
    (a: Artifact) => {
      const planet = df.getPlanetWithId(a.onPlanetId)

      if (! planet) return <Sub>inventory</Sub>

      return <PlanetLink planet={planet}>{df.getProcgenUtils().getPlanetName(planet)}</PlanetLink>
    },
    (a: Artifact) => <Sub>{Object.keys(ArtifactRarities)[a.rarity]}</Sub>,
    (a: Artifact) => {
      const status = isActivated(a)
        ? 'ACTIVE'
        : (canBeActivated(a) ? 'IDLE' : `WAIT`)

      return <Sub>{status}</Sub>
    },
    (a: Artifact) => {
      const planet = df.getPlanetWithId(a.onPlanetId)

      if (! planet) return <Sub>-</Sub>

      return <Sub>{planet.planetLevel}</Sub>
    },
  ];

  function onDistributeClick() {
    distributeArtifacts({
      fromId: props.selectedPlanet?.locationId,
      rarity: ArtifactRarities.Common,
      toPlanetType: PlanetTypes.PLANET,
      toMinLevel: 4,
    })

    const rarities = [
      // ArtifactRarities.Common,
      ArtifactRarities.Rare,
      ArtifactRarities.Epic,
      ArtifactRarities.Legendary,
      ArtifactRarities.Mythic,
    ]

    for (const level of rarities) {
      distributeArtifacts({
        fromId: props.selectedPlanet?.locationId,
        rarity: level,
        toPlanetType: PlanetTypes.RIP,
        toMinLevel: level + 1,
      })
    }
  }

  function onWithdrawClick() {
    withdrawArtifacts({
      fromId: props.selectedPlanet?.locationId
    })
  }

  function onActivateClick() {
    activateArtifacts({
      fromId: props.selectedPlanet?.locationId,
      level: 4,
      planetType: PlanetTypes.PLANET,
    })
  }

  return <div>
    <Header>Useful Artifacts</Header>
    <div style={buttonGridStyle}>
      <button onClick={onDistributeClick}>Distribute</button>
      <button onClick={onWithdrawClick}>Withdraw</button>
      <button onClick={onActivateClick}>Activate</button>
    </div>
    <Table
      rows={rows}
      headers={headers}
      columns={columns}
      alignments={alignments}
    />
  </div>
}
