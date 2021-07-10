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

import { availableEnergy, availableSilver, canPlanetUpgrade, blocksLeft, blocksLeftToProspectExpiration, energy, enoughEnergyToProspect, getAllArtifacts, hasPendingMove, isAsteroid, isFindable, isProspectable, planetName, PlanetTypes, getPlanetRank } from './utils'

import { Table } from './Components/Table';
import { Header, Sub, Title } from './components/Text'
import { PlanetLink } from './components/PlanetLink'
import { capturePlanets } from './strategies/Crawl'
import { distributeSilver } from './strategies/Distribute'
import { withdrawSilver } from './strategies/Withdraw'
import { upgrade } from './strategies/Upgrade'

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
      toMinLevel: 3,
      fromMaxLevel: 9,
      fromMinEnergyLeftPercent: 37.5,
      toPlanetType: PlanetTypes.FOUNDRY,
      toTargetEnergy: 95.5
    })

    capturePlanets({
      fromId: props.selectedPlanet?.locationId,
      toMinLevel: 3,
      fromMaxLevel: 9,
      fromMinEnergyLeftPercent: 37.5,
      toPlanetType: PlanetTypes.ASTEROID,
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

  // Grab current state.
  const planets = Array.from(df.getAllPlanets()).filter(p => p.location)
  const myPlanets = df.getMyPlanets()
  const currentBlockNumber = df.contractsAPI.ethConnection.blockNumber;
  const artifacts = getAllArtifacts(myPlanets)
  const pendingMoves = df.getUnconfirmedMoves()
  const journeys = df.getAllVoyages().filter(p => p.arrivalTime > Date.now() / 1000)

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
      -->
      <${Upgradable} selectedPlanet=${selectedPlanet} />
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
