import { Component, h } from 'preact'
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
import { ManageInterval } from '../Components/ManageInterval'

import { ArtifactRarities, ArtifactTypes, buttonGridStyle, canBeActivated, getAllArtifacts, isActivated, PlanetTypes } from '../utils'

const pauseable = require('pauseable')

declare const df: GameManager
declare const ui: GameUIManager

function onDistributeClick(selectedPlanet: Planet|null = null) {
  // causes perf errors
  // distributeArtifacts({
  //   fromId: selectedPlanet?.locationId,
  //   rarity: ArtifactRarities.Common,
  //   toPlanetType: PlanetTypes.PLANET,
  //   toMinLevel: 4,
  // })

  const rarities = [
    // ArtifactRarities.Common,
    ArtifactRarities.Rare,
    ArtifactRarities.Epic,
    ArtifactRarities.Legendary,
    ArtifactRarities.Mythic,
  ]

  for (const level of rarities) {
    distributeArtifacts({
      fromId: selectedPlanet?.locationId,
      rarity: level,
      toPlanetType: PlanetTypes.RIP,
      toMinLevel: level + 1,
    })
  }
}

function onWithdrawClick(selectedPlanet: Planet|null = null) {
  withdrawArtifacts({
    fromId: selectedPlanet?.locationId
  })
}

function onActivateClick(selectedPlanet: Planet|null = null) {
  activateArtifacts({
    fromId: selectedPlanet?.locationId,
    level: 4,
    planetType: PlanetTypes.PLANET,
  })
}

export class UsefulArtifacts extends Component
{
  interval: any

  constructor() {
    super()
    this.interval = pauseable.setInterval(6 * 60 * 1000, () => {
      onDistributeClick()
      onWithdrawClick()
      onActivateClick()
    })
    this.interval.pause()
  }

  render()
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

    return <div>
      <Header>Useful Artifacts</Header>
      <ManageInterval interval={this.interval} />
      <div style={buttonGridStyle}>
        <button onClick={() => onDistributeClick(ui.getSelectedPlanet())}>Distribute</button>
        <button onClick={() => onWithdrawClick(ui.getSelectedPlanet())}>Withdraw</button>
        <button onClick={() => onActivateClick(ui.getSelectedPlanet())}>Activate</button>
      </div>
      <Table
        rows={rows}
        headers={headers}
        columns={columns}
        alignments={alignments}
      />
    </div>
  }
}
