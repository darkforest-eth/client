import GameManager from '@df/GameManager'
import GameUIManager from '@df/GameUIManager'
import { Planet, PlanetType } from "@darkforest_eth/types";
// import { isUnowned } from 'utils/utils';
// import { planetName, PlanetTypes } from './CM-utils'

const emptyAddress = "0x0000000000000000000000000000000000000000";
export const isUnowned = (planet: Planet) => planet.owner === emptyAddress;
export const PlanetTypes = {
  PLANET: 0,
  ASTEROID: 1,
  FOUNDRY: 2,
  RIP: 3,
  QUASAR: 4
}
export function planetName(p: Planet) {
  return df.getProcgenUtils().getPlanetName(p)
}


declare const df: GameManager
declare const ui: GameUIManager

const planetTypes = {
    'Planet': 0,
    'Asteroid': 1,
    'Foundry': 2,
    'Spacetime Rip': 3,
    'Quasar': 4,
  };

  const planetLevels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const players = [
    "0x0000000000000000000000000000000000000000",
  ];

  const typeNames = Object.keys(planetTypes);

  class Plugin {

    planetType: number
    minPlanetLevel: number
    maxPlanetLevel: number
    minEnergyLeft: number

    constructor() {
      this.planetType = 1;
      this.minPlanetLevel = 3;
      this.maxPlanetLevel = 4;
      this.minEnergyLeft = 25;
    }
    render(container) {
      container.style.width = '200px';

      let stepperLabel = document.createElement('label');
      stepperLabel.innerText = 'Min % energy left';
      stepperLabel.style.display = 'block';

      let stepper = document.createElement('input');
      stepper.type = 'range';
      stepper.min = '0';
      stepper.max = '100';
      stepper.step = '5';
      stepper.value = `${this.minEnergyLeft}`;
      stepper.style.width = '80%';
      stepper.style.height = '24px';

      let percent = document.createElement('span');
      percent.innerText = `${stepper.value}%`;
      percent.style.float = 'right';

      stepper.onchange = (evt) => {
        percent.innerText = `${evt.target.value}%`;
        try {
          this.minEnergyLeft = parseInt(evt.target.value, 10);
        } catch (e) {
          console.error('could not parse energy percent', e);
        }
      }

      // MIN LEVEL TO CAPTURE
      let levelLabel = document.createElement('label');
      levelLabel.innerText = 'Min. level to capture';
      levelLabel.style.display = 'block';

      let level = document.createElement('select');
      level.style.background = 'rgb(8,8,8)';
      level.style.width = '100%';
      level.style.marginTop = '10px';
      level.style.marginBottom = '10px';
      planetLevels.forEach(lvl => {
        let opt = document.createElement('option');
        opt.value = `${lvl}`;
        opt.innerText = `Level ${lvl}`;
        level.appendChild(opt);
      });
      level.value = `${this.minPlanetLevel}`;

      level.onchange = (evt) => {
        try {
          this.minPlanetLevel = parseInt(evt.target.value, 10);
        } catch (e) {
          console.error('could not parse planet level', e);
        }
      }

      // MAX LEVEL FROM
      let levelLabelFrom = document.createElement('label');
      levelLabelFrom.innerText = 'Max. level to send from';
      levelLabelFrom.style.display = 'block';

      let levelFrom = document.createElement('select');
      levelFrom.style.background = 'rgb(8,8,8)';
      levelFrom.style.width = '100%';
      levelFrom.style.marginTop = '10px';
      levelFrom.style.marginBottom = '10px';
      planetLevels.forEach(lvl => {
        let opt = document.createElement('option');
        opt.value = `${lvl}`;
        opt.innerText = `Level ${lvl}`;
        levelFrom.appendChild(opt);
      });
      levelFrom.value = `${this.maxPlanetLevel}`;

      levelFrom.onchange = (evt) => {
        try {
          this.maxPlanetLevel = parseInt(evt.target.value, 10);
        } catch (e) {
          console.error('could not parse planet level', e);
        }
      }

      // TYPE
      let planetTypeLabel = document.createElement('label');
      planetTypeLabel.innerText = 'Planet type to capture';
      planetTypeLabel.style.display = 'block';

      let planetType = document.createElement('select');
      planetType.style.background = 'rgb(8,8,8)';
      planetType.style.width = '100%';
      planetType.style.marginTop = '10px';
      planetType.style.marginBottom = '10px';
      Object.entries(planetTypes).forEach(([name, key]) => {
        let opt = document.createElement('option');
        opt.value = `${key}`;
        opt.innerText = `${name}`;
        planetType.appendChild(opt);
      });
      planetType.value = `${this.planetType}`;

      planetType.onchange = (evt) => {
        try {
          this.planetType = parseInt(evt.target.value, 10);
        } catch (e) {
          console.error('could not parse planet planet type', e);
        }
      }

      let message = document.createElement('div');

      let button = document.createElement('button');
      button.style.width = '100%';
      button.style.marginBottom = '10px';
      button.innerHTML = 'Crawl from selected!'
      button.onclick = () => {
        let planet = ui.getSelectedPlanet();
        if (planet) {
          message.innerText = 'Please wait...';
          let moves = capturePlanets(
            planet.locationId,
            this.minPlanetLevel,
            this.maxPlanetLevel,
            this.minEnergyLeft,
            this.planetType,
          );
          message.innerText = `Crawling ${moves} ${typeNames[this.planetType]}s.`;
        } else {
          message.innerText = 'No planet selected.';
        }
      }

      let globalButton = document.createElement('button');
      globalButton.style.width = '100%';
      globalButton.style.marginBottom = '10px';
      globalButton.innerHTML = 'Crawl everything!'
      globalButton.onclick = () => {
        message.innerText = 'Please wait...';

        let moves = capturePlanets(
            null,
            this.minPlanetLevel,
            this.maxPlanetLevel,
            this.minEnergyLeft,
            this.planetType,
        );

        message.innerText = `Crawling ${moves} ${typeNames[this.planetType]}s.`;
      }

      container.appendChild(stepperLabel);
      container.appendChild(stepper);
      container.appendChild(percent);
      container.appendChild(levelLabel);
      container.appendChild(level);
      container.appendChild(levelLabelFrom);
      container.appendChild(levelFrom);
      container.appendChild(planetTypeLabel);
      container.appendChild(planetType);
      container.appendChild(button);
      container.appendChild(globalButton);
      container.appendChild(message);
    }
  }

  export default Plugin;

  export function capturePlanets(fromId, minCaptureLevel, maxSourceLevel, minEnergyLeft, planetType)
  {
    const pendingMoves = df.getUnconfirmedMoves()
    const journeys = df.getAllVoyages().filter(p => p.arrivalTime > Date.now() / 1000)

    const hasIncomingMove = (p: Planet) => {
        const incoming = journeys.some(j => j.toPlanet === p.locationId)
        const unconfirmed = pendingMoves.some(m => m.to === p.locationId)

        return incoming || unconfirmed
    }

    const candidates = Array.from(df.getAllPlanets()).filter(p => p.location)
        .filter(isUnowned)
        .filter(p => ! hasIncomingMove(p))
        .filter(p => p.planetLevel >= minCaptureLevel)
        .filter(p => p.planetType === planetType)

    const targetEnergies = {}
    targetEnergies[PlanetTypes.PLANET] = 0.15
    targetEnergies[PlanetTypes.ASTEROID] = 0.15
    targetEnergies[PlanetTypes.FOUNDRY] = 0.96
    targetEnergies[PlanetTypes.RIP] = 0
    targetEnergies[PlanetTypes.QUASAR] = 0

    const moves = candidates.reduce((count: number, candidate: Planet) => {
        const targetEnergy = targetEnergies[candidate.planetType]

        const myPlanets = df.getMyPlanets()
            .filter(p => p.planetLevel <= maxSourceLevel)
            .filter(p => ! fromId || p.locationId === fromId)

        // Get all my planets sorted by distance
        const myClosestPlanets = myPlanets.sort((a,b) => {
            const distA = df.getDist(a.locationId, candidate.locationId)
            const distB = df.getDist(b.locationId, candidate.locationId)

            return distA - distB
        })

        const getEnergyNeeded = (from: Planet, to: Planet) => {
            const energyArriving = (candidate.energyCap * targetEnergy) + (candidate.energy * (candidate.defense / 100));

            const energyNeeded = Math.ceil(df.getEnergyNeededForMove(from.locationId, candidate.locationId, energyArriving));

            return energyNeeded
        }

        // Find the first planet, which can take it, with required energy keeping min energy...
        const source = myClosestPlanets.find(p => {
            const energyNeeded = getEnergyNeeded(p, candidate)
            const energyPending = p.unconfirmedDepartures.reduce((total, m) => total + m.forces, 0)
            const remainingAfterMove = p.energy - energyPending - energyNeeded
            const percentAfterMove = remainingAfterMove / p.energyCap * 100

            // console.log(`Checking capture of ${planetName(candidate)} from ${planetName(p)} with ${energyNeeded} - ${percentAfterMove}% after move: ${percentAfterMove > minEnergyLeft}`)

            return percentAfterMove > minEnergyLeft
        })

        if (! source) {
            console.log(`Could not find planet to capture ${planetName(candidate)}`)
            return count
        }

        const energyNeeded = getEnergyNeeded(source, candidate)
        console.log(`CAPTURING ${planetName(candidate)} FROM ${planetName(source)} WITH ${energyNeeded}`)
        df.move(source.locationId, candidate.locationId, energyNeeded, 0);
        return count + 1
    }, 0)

    return moves;
  }

  function getArrivalsForPlanet(planetId) {
    return df.getAllVoyages().filter(arrival => arrival.toPlanet === planetId).filter(p => p.arrivalTime > Date.now() / 1000);
  }

  //returns tuples of [planet,distance]
  function distance(from, to) {
    let fromloc = from.location;
    let toloc = to.location;
    return Math.sqrt((fromloc.coords.x - toloc.coords.x) ** 2 + (fromloc.coords.y - toloc.coords.y) ** 2);
  }
