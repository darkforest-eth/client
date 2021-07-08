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

import {
  Defense,
  Range,
  Speed,
} from 'https://plugins.zkga.me/game/Icons.js';

import {
  UpgradeBranchName,
  SpaceType,
  canStatUpgrade,
  canPlanetUpgrade,
} from 'https://plugins.zkga.me/utils/utils.js';
import { getAllArtifacts } from './utils'

declare const df: GameManager
declare const ui: GameUIManager

const html = htm.bind(h)

function upgrade(planet, branch) {
  if (planet && canPlanetUpgrade(planet) && canStatUpgrade(planet, branch)) {
    df.upgrade(planet.locationId, branch)
  }
}

function UpgradeButton({ Icon, planet, branch }) {
  let isEnabled = canPlanetUpgrade(planet) && canStatUpgrade(planet, branch);

  let button = {
    opacity: isEnabled ? '1' : '0.5',
  };

  let label = {
    marginLeft: '5px',
  };

  let [iconColor, setIconColor] = useState('white');

  function colorBlack() {
    setIconColor('black');
  }

  function colorWhite() {
    setIconColor('white');
  }

  function onClick() {
    upgrade(planet, branch);
  }

  return html`
    <button style=${button} disabled=${!isEnabled} onClick=${onClick} onMouseOver=${colorBlack} onMouseOut=${colorWhite}>
      <${Icon} pathStyle=${{ fill: iconColor }} />
      <span style=${label}>Lvl ${planet.upgradeState[branch]}</span>
    </button>
  `;
}

function UpgradeAllButton({ Icon, branch, onFeedback }) {
  let button = {
    paddingLeft: '10px',
    paddingRight: '10px',
  };

  let [iconColor, setIconColor] = useState('white');

  function colorBlack() {
    setIconColor('black');
  }

  function colorWhite() {
    setIconColor('white');
  }

  function onClick() {
    let myPlanets = df.getMyPlanets()
      .filter(planet => canPlanetUpgrade(planet) && canStatUpgrade(planet, branch));
    onFeedback(`Queueing ${myPlanets.length} planet upgrades.`);

    if (myPlanets.length === 0) {
      onFeedback('No planet upgrades to queue.');
      return;
    }

    eachLimit(myPlanets, 1, (planet, cb) => {
      setTimeout(() => {
        upgrade(planet, branch);
        cb();
      }, 250);
    }, () => {
      onFeedback('Planet upgrades queued!');
    });
  }

  return html`
    <button style=${button} onClick=${onClick} onMouseOver=${colorBlack} onMouseOut=${colorWhite}>
      <${Icon} pathStyle=${{ fill: iconColor }} />
    </button>
  `;
}

function UpgradeSelectedPlanet({ planet }) {
  let wrapper = {
    display: 'flex',
    justifyContent: 'space-between',
  };

  if (!planet) {
    return html`
      <div style=${wrapper}>
        No planet selected.
      </div>
    `;
  }
  return html`
    <div style=${wrapper}>
      <span>Selected:</span>
      <${UpgradeButton} Icon=${Defense} planet=${planet} branch=${UpgradeBranchName.Defense} />
      <${UpgradeButton} Icon=${Range} planet=${planet} branch=${UpgradeBranchName.Range} />
      <${UpgradeButton} Icon=${Speed} planet=${planet} branch=${UpgradeBranchName.Speed} />
    </div>
  `;
}

function UpgradeAllPlanets() {
  let wrapper = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  };

  let [feedback, setFeedback] = useState(null);

  return html`
    <div style=${wrapper}>
      <span>All planets:</span>
      <${UpgradeAllButton} Icon=${Defense} branch=${UpgradeBranchName.Defense} onFeedback=${setFeedback} />
      <${UpgradeAllButton} Icon=${Range} branch=${UpgradeBranchName.Range} onFeedback=${setFeedback} />
      <${UpgradeAllButton} Icon=${Speed} branch=${UpgradeBranchName.Speed} onFeedback=${setFeedback} />
    </div>
    <div>
      ${feedback}
    </div>
  `;
}

// import styled from 'styled-components';
import dfstyles from '../src/Frontend/Styles/dfstyles';
import { Table } from './Components/Table';
// import { formatNumber } from '../src/Backend/Utils/Utils'
// import { Sub } from '../src/Frontend/Components/Text'

const TableContainer = {
  maxHeight: '300px',
  height: '300px',
  overflowYy: 'scroll',
};

function PlanetsWithEnergy({ planets }: { planets: Planet[] })
{
  const headers = ['', 'Planet Name', 'Level', 'Energy', 'Silver', 'Artifacts', 'Prospect', 'Find'];
  const alignments: Array<'r' | 'c' | 'l'> = ['r', 'l', 'r', 'r', 'r', 'r', 'r', 'r'];

  // const Sub = styled.span`
  //   color: ${dfstyles.colors.subtext};
  // `;

  const columns = [
    (planet: Planet) => 'TODO',
    (planet: Planet) => {df.getProcgenUtils().getPlanetName(planet)},
    (planet: Planet) => planet.planetLevel,
    (planet: Planet) => 'TODO',
    (planet: Planet) => 'TODO',
    (planet: Planet) => 'TODO',
    (planet: Planet) => 'TODO',
    (planet: Planet) => 'TODO',
  ];

  console.log(planets)

  return html`<div style=${TableContainer}>
  <${Table}
    rows=${planets}
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
      <${PlanetsWithEnergy} planets=${myPlanets} />
      <${UpgradeSelectedPlanet} planet=${selectedPlanet} />
      <br />
      <hr />
      <${UpgradeAllPlanets} />
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
