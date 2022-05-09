// Voyage Time
//
// View estimated time for a voyage.

let oneMinute = 60;
let oneHour = 60 * oneMinute;


class VoyageTime {
  constructor() {
    this.energyPercent = 55;
    this.estimatedTime = document.createElement('div');
    this.estimatedTime.innerText = '?????';
    this.estimatedTime.style.textAlign = 'center';
    this.estimatedTimeSeconds = document.createElement('div');
    this.estimatedTimeSeconds.innerText = '';
    this.estimatedTimeSeconds.style.textAlign = 'center';
    this.estimatedEnergy = document.createElement('div');
    this.estimatedEnergy.innerText = '?????';
    this.estimatedEnergy.style.textAlign = 'center';
  }

  calcVoyageTime = () => {
    let fromPlanet = ui.getSelectedPlanet();
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
        // this.estimatedTimeSeconds.innerText = `${time} secs`;
        // Energy
        let sendEnergy = (fromPlanet.energyCap * this.energyPercent / 100);
        let arriveEnergy = df.getEnergyArrivingForMove(fromPlanet.locationId, toPlanet.locationId, undefined, sendEnergy);
        if (toPlanet.owner !== df.getAccount()) {
          arriveEnergy = arriveEnergy * 100 / toPlanet.defense
        }
        sendEnergy = Math.ceil(sendEnergy);
        arriveEnergy = Math.ceil(arriveEnergy);
        if (sendEnergy > 1000000) {
          sendEnergy = (sendEnergy / 1000000).toFixed(1) + 'M';
        } else if (sendEnergy > 1000) {
          sendEnergy = (sendEnergy / 1000).toFixed(1) + 'K';
        }
        if (arriveEnergy > 1000000) {
          arriveEnergy = (arriveEnergy / 1000000).toFixed(1) + 'M';
        } else if (arriveEnergy > 1000) {
          arriveEnergy = (arriveEnergy / 1000).toFixed(1) + 'K';
        }
        this.estimatedEnergy.innerText = `Sending ${sendEnergy}, will receive ${arriveEnergy}`;
      } else {
        this.estimatedTime.innerText = '?????';
        this.estimatedTimeSeconds.innerText = ``;
        this.estimatedEnergy.innerText = '?????';
      }
    } else {
      this.estimatedTime.innerText = '?????';
      this.estimatedTimeSeconds.innerText = ``;
      this.estimatedEnergy.innerText = '?????';
    }
  }

  render(container) {
    container.parentElement.style.minHeight = 'unset';
    container.style.width = '250px';
    container.style.minHeight = 'unset';
    window.addEventListener('mousemove', this.calcVoyageTime);

    let label = document.createElement('div');
    label.innerText = 'Voyage Time:'
    label.style.textAlign = 'center';

    container.appendChild(label);
    container.appendChild(this.estimatedTime);
    container.appendChild(this.estimatedTimeSeconds);

    let stepperLabel = document.createElement('label');
    stepperLabel.innerText = 'Energy sent:';
    stepperLabel.style.textAlign = 'center';
    stepperLabel.style.display = 'block';

    let stepper = document.createElement('input');
    stepper.type = 'range';
    stepper.min = '0';
    stepper.max = '100';
    stepper.step = '5';
    stepper.value = `${this.energyPercent}`;
    stepper.style.width = '80%';
    stepper.style.height = '24px';

    let percent = document.createElement('span');
    percent.innerText = `${stepper.value}%`;
    percent.style.float = 'right';

    stepper.onchange = (evt) => {
      percent.innerText = `${evt.target.value}%`;
      try {
        this.energyPercent = parseInt(evt.target.value, 10);
      } catch (e) {
        console.error('could not parse energy percent', e);
      }
    }

    container.appendChild(stepperLabel);
    container.appendChild(stepper);
    container.appendChild(percent);
    container.appendChild(this.estimatedEnergy);
  }

  destroy() {
    window.removeEventListener('mousemove', this.calcVoyageTime);
    delete this.estimatedTime
    delete this.estimatedTimeSeconds
  }
}

export default VoyageTime;