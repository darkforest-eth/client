import {
  Artifact,
  ArtifactId,
  artifactNameFromArtifact,
  ArtifactRarity,
  ArtifactType,
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
import { ArtifactTypes, canHaveArtifact, closestToCenter, distToCenter, isArtifact, isOwned, isUnowned, PlanetTypes } from './utils'
import { EMPTY_ADDRESS } from '@darkforest_eth/constants'

declare const df: GameManager
declare const ui: GameUIManager

const html = htm.bind(h)

const MAX_WINNERS = 63

export function getWinnerPlanets(all: LocatablePlanet[]) {
  const winners = new Set()
  const planets = []

  for (const planet of all) {
    if (isUnowned(planet)) {
      planets.push(planet)
    }
    else if (! winners.has(planet.owner)) {
      planets.push(planet)
      winners.add(planet.owner)
    }

    if (planets.length >= 63) break
  }

  return planets
}

export function l5PlanetesWithNoWormhole() {
  return Array.from(df.getMyPlanets())
    .filter(isLocatable)
    .filter(p => p.planetLevel >= PlanetLevel.FIVE)
    .filter(p => p.planetType === PlanetTypes.PLANET)
    .filter(p => {
      const artifacts = df.getArtifactsWithIds(p.heldArtifactIds).filter(isArtifact)
      return ! artifacts.some(a => [ArtifactTypes.Wormhole, ArtifactTypes.PhotoidCannon].includes(a.artifactType))
    })
}

export function planetsWithDoubleRange(all: LocatablePlanet[]) {
  return all
    .filter(p => p.planetLevel >= PlanetLevel.SIX)
    .filter(p => p.planetType === PlanetTypes.PLANET)
    .filter(p => p.bonus[2]) // range bonus
}

export function getRips(all: LocatablePlanet[]) {
  return all
    .filter(p => p.planetLevel >= PlanetLevel.THREE)
    .filter(p => p.planetType === PlanetTypes.RIP)
}

export function getFoundries(all: LocatablePlanet[]) {
  return all.filter(canHaveArtifact).filter(p => p.planetLevel >= 4)
}

function App() {
  console.log('Running Highlight Winners')

  return html`
    <div>
      <div><a href="#" onClick=${() => this.forceUpdate()}>🔄</a></div>
    </div>
  `;
}

function circlePlanet(ctx: CanvasRenderingContext2D, planet: LocatablePlanet, color: string)
{
  const viewport = ui.getViewport();

  const radius = ui.getRadiusOfPlanetLevel(planet.planetLevel)

  ctx.strokeStyle = color;
  ctx.lineWidth = 4;
  ctx.setLineDash([15, 5])
  ctx.beginPath();
  ctx.arc(
    viewport.worldToCanvasX(planet.location.coords.x),
    viewport.worldToCanvasY(planet.location.coords.y),
    viewport.worldToCanvasDist(radius * 1.5),
    0,
    2 * Math.PI
  );
  ctx.stroke();
  ctx.closePath();
}

class HighlightWinners implements DFPlugin {

  container: HTMLDivElement
  winnerPlanets: LocatablePlanet[] = []
  extraPlanets: LocatablePlanet[] = []
  rips: LocatablePlanet[] = []
  foundries: LocatablePlanet[] = []
  cannons: LocatablePlanet[] = []
  doubleRange: LocatablePlanet[] = []

  constructor() {
    const all = Array.from(df.getAllPlanets())
      .filter(isLocatable)
      .filter(p => p.planetLevel >= PlanetLevel.THREE)
      .filter(p => ! p.destroyed)
      .sort(closestToCenter)

    this.winnerPlanets = getWinnerPlanets(all)
    this.rips = getRips(all)
    this.foundries = getFoundries(all)
    this.cannons = l5PlanetesWithNoWormhole()
    this.doubleRange = planetsWithDoubleRange(all)
  }

  draw(ctx) {
    ctx.save();
    this.rips.map(p => circlePlanet(ctx, p, 'red'))
    this.cannons.map(p => circlePlanet(ctx, p, 'blue'))
    this.foundries.map(p => circlePlanet(ctx, p, 'yellow'))
    this.winnerPlanets.map(p => circlePlanet(ctx, p, 'green'))
    this.doubleRange.map(p => circlePlanet(ctx, p, 'pink'))
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
