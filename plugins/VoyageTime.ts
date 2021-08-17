// Voyage Time
//
// View estimated time for a voyage.
import GameUIManager from '@df/GameUIManager'
import { isLocatable } from 'src/_types/global/GlobalTypes';
import { availableEnergy, isMine } from './utils';

declare const ui: GameUIManager

let oneMinute = 60;
let oneHour = 60 * oneMinute;

function modelEnergyGrowth(energy, energyGrowth, energyCap, duration = 10) {
  const denom =
    Math.exp((-4 * energyGrowth * duration) / energyCap) *
    (energyCap / energy - 1) +
    1;
  return energyCap / denom;
}

class VoyageTime {
  constructor() {
    this.estimatedTime = document.createElement('div');
    this.estimatedTime.innerText = '?????';
    this.estimatedTime.style.textAlign = 'center';
    this.estimatedTimeSeconds = document.createElement('div');
    this.estimatedTimeSeconds.innerText = '';
    this.estimatedTimeSeconds.style.textAlign = 'center';
    this.energyArriving = document.createElement('div');
    this.energyArriving.innerText = '?????';
    this.energyArriving.style.textAlign = 'center';
  }

  calcVoyageTime = () => {
    let fromPlanet = ui.getMouseDownPlanet();
    if (fromPlanet) {
      let toPlanet = ui.getHoveringOverPlanet();

      if (toPlanet && fromPlanet !== toPlanet) {
        // In seconds
        let time = Math.ceil(
          df.getTimeForMove(fromPlanet.locationId, toPlanet.locationId)
        );
        let hours = Math.floor(time / oneHour);
        let minutes = Math.floor(time % oneHour / 60);
        let seconds = Math.ceil(time % oneHour % oneMinute);
        if (hours >= 1) {
          this.estimatedTime.innerText = `${hours} hrs, ${minutes} mins, ${seconds} secs`;
        } else if (minutes >= 1) {
          this.estimatedTime.innerText = `${minutes} mins, ${seconds} secs`;
        } else {
          this.estimatedTime.innerText = `${seconds} secs`;
        }
        this.estimatedTimeSeconds.innerText = `${time} secs`;
      } else {
        this.estimatedTime.innerText = '?????';
        this.estimatedTimeSeconds.innerText = ``;
      }
    } else {
      this.estimatedTime.innerText = '?????';
      this.estimatedTimeSeconds.innerText = ``;
    }
  }

  calcEnergyArriving = () => {
    const from = ui.getMouseDownPlanet()
    const to = ui.getHoveringOverPlanet()
    if (!from || !to || ! isLocatable(from!) || ! isLocatable(to!) || from === to) {
      this.energyArriving.innerText = '????'
      return
    }

    const time = Math.ceil(df.getTimeForMove(from.locationId, to.locationId))
    const energy = (ui.getForcesSending(from.locationId) / 100) * availableEnergy(from);
    const distance = ui.getDistCoords(from.location.coords, to.location.coords)

    const energyArriving = ui.getEnergyArrivingForMove(
      from.locationId,
      to.locationId,
      distance,
      energy
    )

    const energyOnPlanet = isMine(to)
      ? modelEnergyGrowth(to.energy, to.energyGrowth, to.energyCap, time)
      : 0

    const energyCost = ! isMine(to)
      ? to.energy * (to.defense / 100)
      : 0

    const energyAfterAttack =  Math.max(energyArriving - energyCost, 0)
    const energyOnPlanetAfterAttack = energyOnPlanet + energyAfterAttack
    const energyPercent = energyOnPlanetAfterAttack / to.energyCap * 100;

    console.log({
      energyOnPlanet,
      energyArriving,
      energyCost,
      energyAfterAttack,
      energyOnPlanetAfterAttack,
      energyPercent,
    })

    this.energyArriving.innerText = `${Math.round(energyOnPlanetAfterAttack)} ${Math.round(energyPercent)}%`
  }

  render(container) {
    container.parentElement.style.minHeight = 'unset';
    container.style.width = '200px';
    container.style.minHeight = 'unset';
    window.addEventListener('mousemove', this.calcEnergyArriving);
    window.addEventListener('mousemove', this.calcVoyageTime);

    let label = document.createElement('div');
    label.innerText = 'Estimated time:'
    label.style.textAlign = 'center';

    container.appendChild(label);
    container.appendChild(this.estimatedTime);
    container.appendChild(this.estimatedTimeSeconds);

    let label2 = document.createElement('div');
    label2.innerText = 'Energy after:'
    label2.style.textAlign = 'center';

    container.appendChild(label2);
    container.appendChild(this.energyArriving);
  }

  destroy() {
    window.removeEventListener('mousemove', this.calcVoyageTime);
    window.removeEventListener('mousemove', this.calcEnergyArriving);
    delete this.estimatedTime
    delete this.estimatedTimeSeconds
    delete this.energyArriving
  }
}

export default VoyageTime;
