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
import { isLocatable } from 'src/_types/global/GlobalTypes'
import { closestToCenter } from './strategies/Crawl'
import { distToCenter } from './utils'
import { EMPTY_ADDRESS } from '@darkforest_eth/constants'

declare const df: GameManager
declare const ui: GameUIManager

const html = htm.bind(h)

let eligiblePlanets: LocatablePlanet[] = []
let extraPlanets: LocatablePlanet[] = []

export function closestToCenter(a: LocatablePlanet, b: LocatablePlanet) {
  return distToCenter(a.location.coords) - distToCenter(b.location.coords)
}

function App() {
  console.log('Running Highlight Winners')

  const MAX_WINNERS = 63

  const closestPlanets = Array.from(df.getAllPlanets())
    .filter(isLocatable)
    .filter(p => p.planetLevel >= PlanetLevel.THREE)
    .sort(closestToCenter)

  eligiblePlanets = closestPlanets.slice(0, MAX_WINNERS)

  console.log(eligiblePlanets)

  const winners = eligiblePlanets
    .map(p => p.owner)
    .filter(a => a !== EMPTY_ADDRESS)

  const uniqueWinners = [...new Set(winners)]

  const extraPlanetCount = winners.length - uniqueWinners.length

  console.log(MAX_WINNERS + 1 + extraPlanetCount)

  extraPlanets = closestPlanets.slice(MAX_WINNERS + 1, MAX_WINNERS + 1 + extraPlanetCount)

  return html`
    <div>
      <div><a href="#" onClick=${() => this.forceUpdate()}>🔄</a></div>
    </div>
  `;
}

function circlePlanet(ctx, planet: LocatablePlanet, color: string)
{
  const viewport = ui.getViewport();

  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = "dashed";
  ctx.beginPath();
  ctx.arc(
    viewport.worldToCanvasX(planet.location.coords.x),
    viewport.worldToCanvasY(planet.location.coords.y),
    viewport.worldToCanvasDist(ui.getRadiusOfPlanetLevel(planet.planetLevel)),
    0,
    2 * Math.PI
  );
  ctx.stroke();
  ctx.closePath();
}

class HighlightWinners implements DFPlugin {

  container: HTMLDivElement
  loop: NodeJS.Timeout

  constructor() {}

  draw(ctx) {
    ctx.save();
    eligiblePlanets.map(p => circlePlanet(ctx, p, 'red'))
    extraPlanets.map(p => circlePlanet(ctx, p, 'blue'))
    ctx.restore();
  }

  /**
   * Called when plugin is launched with the "run" button.
   */
  async render(container: HTMLDivElement) {
      this.container = container

      render(html`<${App} />`, container)
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
export default HighlightWinners;
