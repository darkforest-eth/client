import {
  Artifact,
  ArtifactId,
  LocatablePlanet,
  LocationId,
  Planet,
} from '@darkforest_eth/types'

import { h, render } from 'preact'
import htm from 'htm'
import { useState, useLayoutEffect } from 'preact/hooks'

import GameManager from '@df/GameManager'
import GameUIManager from '@df/GameUIManager'

import { availableEnergy, availableSilver, canPlanetUpgrade, blocksLeft, blocksLeftToProspectExpiration, energy, enoughEnergyToProspect, getAllArtifacts, hasPendingMove, isAsteroid, isFindable, isProspectable, planetName, PlanetTypes, getPlanetRank, isUnowned, canHaveArtifact, isReachable, ArtifactTypes, isArtifact, ArtifactRarities, canBeActivated, isActivated } from './utils'

import { Table } from './Components/Table';
import { Header, Sub, Title } from './components/Text'
import { PlanetLink } from './components/PlanetLink'
import { capturePlanets } from './strategies/Crawl'
import { distributeSilver } from './strategies/Distribute'
import { withdrawSilver } from './strategies/Withdraw'
import { upgrade } from './strategies/Upgrade'
import { prospectAndFind } from './strategies/ProspectAndFind'
import { addHours, formatDistanceToNow, fromUnixTime, isAfter, isBefore, subHours } from 'date-fns'

declare const df: GameManager
declare const ui: GameUIManager

const html = htm.bind(h)

const buttonGridStyle = {
  display: 'grid',
  gridAutoFlow: 'column',
  gridColumnGap: '10px'
}

interface SelectedPlanetProp {
  selectedPlanet: Planet,
}

function PlanetsWithEnergy(props: SelectedPlanetProp)
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
    (planet: Planet) => html`<${PlanetLink} planet=${planet}>${df.getProcgenUtils().getPlanetName(planet)}</${PlanetLink}>`,
    (planet: Planet) => html`<${Sub}>${planet.planetLevel}</${Sub}>`,
    (planet: Planet) => html`<${Sub}>${energy(planet)}%</${Sub}>`,
  ];

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

  return html`<div>
  <${Header}>Planets with > 75% Energy</${Header}>
  <button onClick=${onCrawlClick}>Crawl</button>
  <${Table}
    rows=${rows}
    headers=${headers}
    columns=${columns}
    alignments=${alignments}
  />
</div>`
}

function FullSilver(props: SelectedPlanetProp)
{
  const headers = ['Planet Name', 'Level', 'Silver'];
  const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r', 'r'];

  const rows = df.getMyPlanets()
    .filter(p => p.planetLevel >= 4)
    .filter(p => availableSilver(p) == p.silverCap)
    .sort((a, b) => b.silverCap - a.silverCap)

  const columns = [
    (planet: Planet) => html`<${PlanetLink} planet=${planet}>${df.getProcgenUtils().getPlanetName(planet)}</${PlanetLink}>`,
    (planet: Planet) => html`<${Sub}>${planet.planetLevel}</${Sub}>`,
    (planet: Planet) => html`<${Sub}>${planet.silverCap / 1000}K</${Sub}>`,
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

  return html`<div>
  <${Header}>Full Silver</${Header}>
  <div style=${buttonGridStyle}>
    <button onClick=${onDistributeClick}>Rip</button>
    <button onClick=${onWithdrawClick}>Withdraw</button>
  </div>
  <${Table}
    rows=${rows}
    headers=${headers}
    columns=${columns}
    alignments=${alignments}
  />
</div>`
}

/**
 * @todo Can't test this since round was over.
 */
function ProspectOrFind()
{
  const headers = ['Planet Name', 'Level', 'Blocks Left'];
  const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r', 'r'];

  const currentBlockNumber = df.contractsAPI.ethConnection.blockNumber;

  const rows = df.getMyPlanets()
    .filter(enoughEnergyToProspect)
    .filter(p => isProspectable(p) || isFindable(p, currentBlockNumber))
    .sort((a, b) => b.planetLevel - a.planetLevel)

  const columns = [
    (planet: Planet) => html`<${PlanetLink} planet=${planet}>${df.getProcgenUtils().getPlanetName(planet)}</${PlanetLink}>`,
    (planet: Planet) => html`<${Sub}>${planet.planetLevel}</${Sub}>`,
    (planet: Planet) => html`<${Sub}>${planet.prospectedBlockNumber ? blocksLeft(planet) : '-'}</${Sub}>`,
  ];

  function onProspectAndFindClick() {
    prospectAndFind()
  }

  return html`<div>
  <${Header}>Prospect or Find</${Header}>
  <div style=${buttonGridStyle}>
    <button onClick=${onProspectAndFindClick}>Prospect & Find</button>
  </div>
  <${Table}
    rows=${rows}
    headers=${headers}
    columns=${columns}
    alignments=${alignments}
  />
</div>`
}

function Upgradable(props: SelectedPlanetProp)
{
  const headers = ['Planet Name', 'Level', 'Rank'];
  const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r', 'r'];

  const rows = df.getMyPlanets()
    .filter(canPlanetUpgrade)
    .sort((a, b) => b.planetLevel - a.planetLevel)

  const columns = [
    (planet: Planet) => html`<${PlanetLink} planet=${planet}>${df.getProcgenUtils().getPlanetName(planet)}</${PlanetLink}>`,
    (planet: Planet) => html`<${Sub}>${planet.planetLevel}</${Sub}>`,
    (planet: Planet) => html`<${Sub}>${getPlanetRank(planet)}</${Sub}>`,
  ];

  function onUpgradeClick() {
    upgrade({
      fromId: props.selectedPlanet?.locationId,
    })
  }

  return html`<div>
  <${Header}>Upgradable</${Header}>
  <div style=${buttonGridStyle}>
    <button onClick=${onUpgradeClick}>Upgrade</button>
  </div>
  <${Table}
    rows=${rows}
    headers=${headers}
    columns=${columns}
    alignments=${alignments}
  />
</div>`
}

function FoundriesToTake(props: SelectedPlanetProp)
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
    (planet: Planet) => html`<${PlanetLink} planet=${planet}>${df.getProcgenUtils().getPlanetName(planet)}</${PlanetLink}>`,
    (planet: Planet) => html`<${Sub}>${planet.planetLevel}</${Sub}>`,
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

  return html`<div>
  <${Header}>Foundries</${Header}>
  <div style=${buttonGridStyle}>
    <button onClick=${onCrawlClick}>Crawl</button>
  </div>
  <${Table}
    rows=${rows}
    headers=${headers}
    columns=${columns}
    alignments=${alignments}
  />
</div>`
}

function Cannons(props: SelectedPlanetProp)
{
  const headers = ['Rarity', 'Planet Name', 'Planet Level', 'Status'];
  const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r', 'r'];

  const rows = getAllArtifacts()
    .filter(a => a && a.artifactType == ArtifactTypes.PhotoidCannon)
    .filter(a => a && a.rarity > ArtifactRarities.Common)
    .sort((a, b) => b!.rarity - a!.rarity)

  const columns = [
    (a: Artifact) => html`<${Sub}>${Object.keys(ArtifactRarities)[a.rarity]}</${Sub}>`,
    (a: Artifact) => {
      const planet = df.getPlanetWithId(a.onPlanetId)

      return html`<${PlanetLink} planet=${planet}>${df.getProcgenUtils().getPlanetName(planet)}</${PlanetLink}>`
    },
    (a: Artifact) => {
      const planet = df.getPlanetWithId(a.onPlanetId)

      return html`<${Sub}>${planet!.planetLevel}</${Sub}>`
    },
    (a: Artifact) => {
      const lastActivated = fromUnixTime(a.lastActivated)
      const readyAt = addHours(lastActivated, 4)

      const status = isActivated(a)
          ? (isAfter(new Date, readyAt) ? 'FIRE' : `Fire in ${formatDistanceToNow(readyAt)}`)
          : canBeActivated(a) ? 'IDLE' : `WAIT`

      return html`<${Sub}>${status}</${Sub}>`
    },
  ];

  return html`<div>
  <${Header}>Cannons</${Header}>
  <${Table}
    rows=${rows}
    headers=${headers}
    columns=${columns}
    alignments=${alignments}
  />
</div>`
}

function UsefulArtifacts(props: SelectedPlanetProp)
{
  const headers = ['Rarity', 'Type', 'Planet Name', 'Planet Level', 'Status'];
  const alignments: Array<'r' | 'c' | 'l'> = ['l', 'l', 'l', 'r', 'r'];

  const rows = getAllArtifacts()
    .filter(a => a && ! isActivated(a))
    .filter(a => a && a.rarity > ArtifactRarities.Common)
    .filter(a => [ArtifactTypes.Wormhole, ArtifactTypes.BloomFilter].includes(a.artifactType))
    .filter(canBeActivated)
    .sort((a, b) => b!.rarity - a!.rarity)

  const columns = [
    (a: Artifact) => html`<${Sub}>${Object.keys(ArtifactRarities)[a.rarity]}</${Sub}>`,
    (a: Artifact) => html`<${Sub}>${Object.keys(ArtifactTypes)[a.artifactType]}</${Sub}>`,
    (a: Artifact) => {
      const planet = df.getPlanetWithId(a.onPlanetId)

      return html`<${PlanetLink} planet=${planet}>${df.getProcgenUtils().getPlanetName(planet)}</${PlanetLink}>`
    },
    (a: Artifact) => {
      const planet = df.getPlanetWithId(a.onPlanetId)

      return html`<${Sub}>${planet!.planetLevel}</${Sub}>`
    },
    (a: Artifact) => {
      const status = isActivated(a)
        ? 'ACTIVE'
        : (canBeActivated(a) ? 'IDLE' : `WAIT`)

      return html`<${Sub}>${status}</${Sub}>`
    },
  ];

  function onDistributeClick() {
    // send all common to p4 or wormwhole
    // send all rare+ to wormhole
  }

  function onWithdrawClick() {
    // withdraw any on wormhole
  }

  function onActivateClick() {
    // activate on any planet l4+
  }

  return html`<div>
  <${Header}>Useful Artifacts</${Header}>
  <div style=${buttonGridStyle}>
    <button onClick=${onDistributeClick}>Distribute</button>
    <button onClick=${onWithdrawClick}>Withdraw</button>
    <button onClick=${onActivateClick}>Activate</button>
  </div>
  <${Table}
    rows=${rows}
    headers=${headers}
    columns=${columns}
    alignments=${alignments}
  />
</div>`
}


function App() {
  console.log('Running Status Report')

  // Grab currently selected planet
  let [selectedPlanet, setSelectedPlanet] = useState(ui.getSelectedPlanet());

  useLayoutEffect(() => {
    let onClick = () => {
      setSelectedPlanet(ui.getSelectedPlanet());
    }
    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    }
  }, []);

  return html`
    <div>
      Selected: ${selectedPlanet ? planetName(selectedPlanet) : '- none -'}
      <!--
      <${PlanetsWithEnergy} selectedPlanet=${selectedPlanet} />
      <br />
      <hr />
      <br />
      <${FullSilver} selectedPlanet=${selectedPlanet} />
      <br />
      <hr />
      <br />
      <${ProspectOrFind} selectedPlanet=${selectedPlanet} />
      <br />
      <hr />
      <br />
      <${Upgradable} selectedPlanet=${selectedPlanet} />
      <br />
      <hr />
      <br />
      <${FoundriesToTake} selectedPlanet=${selectedPlanet} />
      <br />
      <hr />
      <br />
      <${Cannons} selectedPlanet=${selectedPlanet} />
      <br />
      <hr />
      <br />
      -->
      <${UsefulArtifacts} selectedPlanet=${selectedPlanet} />
    </div>
  `;
}

class MissionControl implements DFPlugin {

  container: HTMLDivElement
  loop: NodeJS.Timeout

  constructor() {}

  /**
   * Called when plugin is launched with the "run" button.
   */
  async render(container: HTMLDivElement) {
      this.container = container

      render(html`<${App} />`, container)
      this.loop = setInterval(
        () => render(html`<${App} />`, container),
        1000 * 30 * 5
      )
  }

  /**
   * Called when plugin modal is closed.
   */
  destroy() {
    render(null, this.container)
    clearInterval(this.loop)
  }
}

/**
 * And don't forget to export it!
 */
export default MissionControl;
