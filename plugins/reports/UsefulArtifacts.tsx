import { Component, h } from 'preact'
import { Artifact, artifactNameFromArtifact, Planet, PlanetLevel } from '@darkforest_eth/types'
import GameManager from '../../declarations/src/Backend/GameLogic/GameManager'
import GameUIManager from '../../declarations/src/Backend/GameLogic/GameUIManager'
import { PlanetLink } from '../components/PlanetLink'
import { Header, Sub, Title } from '../components/Text'
import { Table } from '../Components/Table';

import { harvestArtifacts } from '../strategies/HarvestArtifacts'
import { distributeArtifacts } from '../strategies/DistributeArtifacts'
// import { withdrawArtifacts } from '../strategies/WithdrawArtifacts'
import { activateArtifacts } from '../strategies/ActivateArtifacts'
import { ManageInterval } from '../Components/ManageInterval'

import { ArtifactRarities, artifactStatTypes, artifactTacticalTypes, artifactType, ArtifactTypes, buttonGridStyle, canBeActivated, getAllArtifacts, getPlanetTypeAcronym, isActivated, planetName, PlanetTypes, PrimeMinutes } from '../utils'

const pauseable = require('pauseable')

declare const df: GameManager
declare const ui: GameUIManager

const rarities = [
  // ArtifactRarities.Common,
  ArtifactRarities.Rare,
  ArtifactRarities.Epic,
  ArtifactRarities.Legendary,
  ArtifactRarities.Mythic,
]

function onHarvestClick(selectedPlanet: Planet|null = null) {
  // Shit artifacts from foundries to planets
  harvestArtifacts({
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
    harvestArtifacts({
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
}

function onDistributeClick(selectedPlanet: Planet|null = null) {
  // Bloom filters to Quasars
  for (const level of rarities) {
    distributeArtifacts({
      fromId: selectedPlanet?.locationId,
      types: [ArtifactTypes.BloomFilter],
      rarities: [level],
      nearPlanetType: PlanetTypes.QUASAR,
      nearMinLevel: level * 2 - 1, // Rare to 3+, Epic to 5+ etc..
      nearMaxLevel: level * 2,
    })
  }

  // Cannons from rips to 5 planets (unless it has a wormhole)
  distributeArtifacts({
    fromId: selectedPlanet?.locationId,
    types: [ArtifactTypes.PhotoidCannon],
    rarities: [ArtifactRarities.Rare],
    nearPlanetType: PlanetTypes.PLANET,
    nearMinLevel: PlanetLevel.FIVE,
    nearMaxLevel: PlanetLevel.FIVE,
  })

  // Wormholes from rips to l6+ planets
  distributeArtifacts({
    fromId: selectedPlanet?.locationId,
    types: [ArtifactTypes.Wormhole],
    rarities: [ArtifactRarities.Rare],
    nearPlanetType: PlanetTypes.PLANET,
    nearMinLevel: PlanetLevel.SIX,
    nearMaxLevel: PlanetLevel.NINE,
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
    artifactTypes: [ArtifactTypes.Wormhole],
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
      onHarvestClick()
      onDistributeClick()
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
      (a: Artifact) => <Sub>{artifactType(a)}</Sub>,
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
        <button onClick={() => onHarvestClick(ui.getSelectedPlanet())}>Harvest</button>
        <button onClick={() => onDistributeClick(ui.getSelectedPlanet())}>Distribute</button>
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
