import { Component, h } from 'preact'
import { Artifact, artifactNameFromArtifact, Planet, PlanetLevel } from '@darkforest_eth/types'
import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { PlanetLink } from '../components/PlanetLink'
import { Header, Sub, Title } from '../components/Text'
import { Table } from '../Components/Table';

import { distributeArtifacts } from '../strategies/DistributeArtifacts'
import { dropArtifacts } from '../strategies/DropArtifacts'
// import { withdrawArtifacts } from '../strategies/WithdrawArtifacts'
import { activateArtifacts } from '../strategies/ActivateArtifacts'
import { ManageInterval } from '../Components/ManageInterval'

import { ArtifactRarities, artifactStatTypes, artifactTacticalTypes, ArtifactTypes, buttonGridStyle, canBeActivated, getAllArtifacts, getPlanetTypeAcronym, isActivated, planetName, PlanetTypes, PrimeMinutes } from '../utils'

const pauseable = require('pauseable')

declare const df: GameManager
declare const ui: GameUIManager

function onDistributeClick(selectedPlanet: Planet|null = null) {
  const rarities = [
    // ArtifactRarities.Common,
    ArtifactRarities.Rare,
    ArtifactRarities.Epic,
    ArtifactRarities.Legendary,
    ArtifactRarities.Mythic,
  ]

  // Shit artifacts from foundries to planets
  distributeArtifacts({
    fromId: selectedPlanet?.locationId,
    fromPlanetType: PlanetTypes.FOUNDRY,
    types: artifactStatTypes,
    rarities: [ArtifactRarities.Commmon, ...rarities],
    toPlanetType: PlanetTypes.PLANET,
    toMinLevel: PlanetLevel.FOUR,
    toMaxLevel: PlanetLevel.FOUR,
    ifEmpty: true,
  })

  // Good artifacts from foundries to rips
  for (const level of rarities) {
    distributeArtifacts({
      fromId: selectedPlanet?.locationId,
      fromPlanetType: PlanetTypes.FOUNDRY,
      types: artifactTacticalTypes,
      rarities: [level],
      toPlanetType: PlanetTypes.RIP,
      toMinLevel: level + 1,
      toMaxLevel: PlanetLevel.NINE,
      ifEmpty: false,
    })
  }

  // Bloom filters to Quasars
  for (const level of rarities) {
    distributeArtifacts({
      fromId: selectedPlanet?.locationId,
      fromPlanetType: PlanetTypes.RIP,
      types: [ArtifactTypes.BloomFilter],
      rarities: [level],
      toPlanetType: PlanetTypes.QUASAR,
      toMinLevel: level * 2 - 1, // Rare to 3+, Epic to 5+ etc..
      toMaxLevel: level * 2,
      ifEmpty: false,
    })
  }

  // Cannons from rips to 5 planets (unless it has a wormhole)
  distributeArtifacts({
    fromId: selectedPlanet?.locationId,
    fromPlanetType: PlanetTypes.RIP,
    types: [ArtifactTypes.PhotoidCannon],
    rarities: [ArtifactRarities.Rare],
    toPlanetType: PlanetTypes.PLANET,
    toMinLevel: PlanetLevel.FIVE,
    toMaxLevel: PlanetLevel.FIVE,
    ifEmpty: true,
  })

  // Wormholes from rips to l6+ planets
  distributeArtifacts({
    fromId: selectedPlanet?.locationId,
    fromPlanetType: PlanetTypes.RIP,
    types: [ArtifactTypes.Wormhole],
    rarities: [ArtifactRarities.Rare],
    toPlanetType: PlanetTypes.PLANET,
    toMinLevel: PlanetLevel.SIX,
    toMaxLevel: PlanetLevel.NINE,
    ifEmpty: true,
  })
}

// function onWithdrawClick(selectedPlanet: Planet|null = null) {
//   withdrawArtifacts({
//     fromId: selectedPlanet?.locationId
//   })
// }

function onDropClick(selectedPlanet: Planet|null = null) {
  // // Bloom Filters near Quasars
  // dropArtifacts({
  //   onId: selectedPlanet?.locationId,
  //   types: [ArtifactTypes.BloomFilter],
  //   rarities: [ArtifactRarities.Rare],
  //   maxRipLevel: selectedPlanet?.planetLevel || PlanetLevel.FOUR,
  //   nearMinLevel: PlanetLevel.FOUR,
  //   nearMaxLevel: PlanetLevel.FOUR,
  //   nearPlanetType: PlanetTypes.QUASAR,
  // })

  // Cannons near L5
  dropArtifacts({
    onId: selectedPlanet?.locationId,
    types: [ArtifactTypes.PhotoidCannon],
    rarities: [ArtifactRarities.Rare],
    maxRipLevel: selectedPlanet?.planetLevel || PlanetLevel.FOUR,
    nearMinLevel: PlanetLevel.FIVE,
    nearMaxLevel: PlanetLevel.FIVE,
    nearPlanetType: PlanetTypes.PLANET,
  })

  // Wormholes near L6
  dropArtifacts({
    onId: selectedPlanet?.locationId,
    types: [ArtifactTypes.Wormhole],
    rarities: [ArtifactRarities.Rare],
    maxRipLevel: selectedPlanet?.planetLevel || PlanetLevel.FOUR,
    nearMinLevel: PlanetLevel.SIX,
    nearMaxLevel: PlanetLevel.SIX,
    nearPlanetType: PlanetTypes.PLANET,
  })
}

function onActivateClick(selectedPlanet: Planet|null = null) {
  activateArtifacts({
    fromId: selectedPlanet?.locationId,
    minLevel: PlanetLevel.FOUR,
    artifactTypes: [ArtifactTypes.PhotoidCannon],
    planetTypes: [PlanetTypes.PLANET],
  })

  activateArtifacts({
    fromId: selectedPlanet?.locationId,
    minLevel: PlanetLevel.FOUR,
    artifactTypes: artifactStatTypes,
    planetTypes: [PlanetTypes.PLANET],
  })

  // activateArtifacts({
  //   fromId: selectedPlanet?.locationId,
  //   minLevel: PlanetLevel.FOUR,
  //   artifactTypes: [ArtifactTypes.BloomFilter],
  //   planetTypes: [PlanetTypes.QUASAR],
  // })
}

export class UsefulArtifacts extends Component
{
  interval: any

  constructor() {
    super()
    this.interval = pauseable.setInterval(PrimeMinutes.THIRTEEN, () => {
      onDistributeClick()
      // onWithdrawClick()
      onDropClick()
      onActivateClick()
    })
    this.interval.pause()
  }

  render()
  {
    const headers = [
      'Name',
      'Type',
      'Planet',
      'Rarity',
      // 'Status',
      'Lvl'
    ];
    const alignments: Array<'r' | 'c' | 'l'> = ['l', 'l', 'l', 'c', 'c', 'r'];

    const rows = getAllArtifacts()
      .filter(a => a && ! isActivated(a))
      .filter(a => a && ! a.unconfirmedMove)
      .filter(a => a && ! a.unconfirmedActivateArtifact)
      .filter(a => a && a.rarity >= ArtifactRarities.Rare)
      .filter(a => (
        [ArtifactTypes.Wormhole,ArtifactTypes.BloomFilter].includes(a.artifactType))
        || a.artifactType === ArtifactTypes.PlanetaryShield && a.rarity >= ArtifactRarities.Epic
      )
      .filter(canBeActivated)
      .sort((a, b) => {
        const pa = df.getPlanetWithId(a.onPlanetId)
        const pb = df.getPlanetWithId(b.onPlanetId)
        const levelA = pa ? pa.planetLevel : 10
        const levelB = pb ? pb.planetLevel : 10

        const type = b.artifactType - a.artifactType
        const rarity = b.rarity - a.rarity
        const level = levelB - levelA

        return type || level || rarity
      })

    const columns = [
      (a: Artifact) => <Sub>{artifactNameFromArtifact(a)}</Sub>,
      (a: Artifact) => <Sub>{Object.keys(ArtifactTypes)[a.artifactType]}</Sub>,
      (a: Artifact) => {
        const planet = df.getPlanetWithId(a.onPlanetId)

        if (! planet) return <Sub>inventory</Sub>

        return <PlanetLink planet={planet}>P{getPlanetTypeAcronym(planet)} {planetName(planet)}</PlanetLink>
      },
      (a: Artifact) => <Sub>{Object.keys(ArtifactRarities)[a.rarity]}</Sub>,
      // (a: Artifact) => {
      //   const status = isActivated(a)
      //     ? 'ACTIVE'
      //     : (canBeActivated(a) ? 'IDLE' : `WAIT`)

      //   return <Sub>{status}</Sub>
      // },
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
        {/* <button onClick={() => onWithdrawClick(ui.getSelectedPlanet())}>Withdraw</button> */}
        <button onClick={() => onDropClick(ui.getSelectedPlanet())}>Drop</button>
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

  componentWillUnmount() {
    this.interval.clear()
  }
}
