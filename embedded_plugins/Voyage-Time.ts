// Voyage Time
//
// View estimated time for a voyage.

let oneMinute = 60;
let oneHour = 60 * oneMinute;

class VoyageTime {
  constructor() {
    this.estimatedTime = document.createElement('div');
    this.estimatedTime.innerText = '?????';
    this.estimatedTime.style.textAlign = 'center';
    this.estimatedTimeSeconds = document.createElement('div');
    this.estimatedTimeSeconds.innerText = '';
    this.estimatedTimeSeconds.style.textAlign = 'center';
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

  render(container) {
    container.parentElement.style.minHeight = 'unset';
    container.style.width = '200px';
    container.style.minHeight = 'unset';
    window.addEventListener('mousemove', this.calcVoyageTime);

    let label = document.createElement('div');
    label.innerText = 'Estimated time:'
    label.style.textAlign = 'center';

    container.appendChild(label);
    container.appendChild(this.estimatedTime);
    container.appendChild(this.estimatedTimeSeconds);
  }

  destroy() {
    window.removeEventListener('mousemove', this.calcVoyageTime);
    delete this.estimatedTime
    delete this.estimatedTimeSeconds
  }
}

export default VoyageTime;
