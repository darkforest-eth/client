import {
  Artifact,
  ArtifactId,
  artifactNameFromArtifact,
  ArtifactRarity,
  LocatablePlanet,
  LocationId,
  Planet,
  PlanetLevel,
} from '@darkforest_eth/types'

import { h, render } from 'preact'
import htm from 'htm'
import { useState, useLayoutEffect } from 'preact/hooks'

import GameManager from '@df/GameManager'
import GameUIManager from '@df/GameUIManager'

import { availableEnergy, availableSilver, canPlanetUpgrade, blocksLeft, blocksLeftToProspectExpiration, energy, enoughEnergyToProspect, getAllArtifacts, hasPendingMove, isAsteroid, isFindable, isProspectable, planetName, PlanetTypes, getPlanetRank, isUnowned, canHaveArtifact, isReachable, ArtifactTypes, isArtifact, ArtifactRarities, canBeActivated, isActivated, SelectedPlanetProp, buttonGridStyle } from './utils'

import { Table } from './Components/Table';
import { Header, Sub, Title } from './components/Text'
import { PlanetLink } from './components/PlanetLink'
import { PlanetsWithEnergy } from './reports/PlanetsWithEnergy'
import { FullSilver } from './reports/FullSilver'
import { ProspectOrFind } from './reports/ProspectOrFind'
import { Cannons } from './reports/Cannons'
import { Upgradable } from './reports/Upgradable'
import { FoundriesToTake } from './reports/FoundriesToTake'
import { UsefulArtifacts } from './reports/UsefulArtifacts'
import { activateArtifacts } from './strategies/ActivateArtifacts'

import { distributeArtifacts } from './strategies/DistributeArtifacts'

import { withdrawArtifacts } from './strategies/WithdrawArtifacts'

import { prospectAndFind } from './strategies/ProspectAndFind'
import { addHours, formatDistanceToNow, fromUnixTime, isAfter, isBefore, subHours } from 'date-fns'

declare const df: GameManager
declare const ui: GameUIManager

const html = htm.bind(h)

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
