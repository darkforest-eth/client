import { getPlanetRank, getPlanetTypeAcronym } from "./utils";

const { getPlanetName, getOwnerColor } = df.getProcgenUtils();

class ScoringPlanets {
  constructor() {
    // Top 63
    this.topX = 63;

    this.table = document.createElement('table');
    this.table.style.width = '100%';
    this.table.style.borderCollapse = 'separate';
    this.table.style.borderSpacing = '10px 0';

    this.thead = document.createElement('thead');
    this.thead.innerHTML = `<tr><th></th><th>Planet</th><th>Level</th><th>Score</th>`;
    this.table.appendChild(this.thead);

    this.tbody = document.createElement('tbody');
    this.table.appendChild(this.tbody);
  }

  renderPlanets() {
    this.tbody.innerHTML = "";

    const knownScoringPlanets = [];
    for (const planet of df.getAllPlanets()) {
      if (planet.destroyed) continue;
      if (planet.planetLevel < 3) continue;
      if (!planet?.location?.coords) continue;

      knownScoringPlanets.push({
        locationId: planet.locationId,
        score: Math.floor(df.getDistCoords(planet.location.coords, { x: 0, y: 0 }))
      });
    }

    const sortedScoringPlanets = knownScoringPlanets
      .sort((a, b) => a.score - b.score)
      .slice(0, this.topX);
    for (const [idx, p] of sortedScoringPlanets.entries()) {
      const planet = df.getPlanetWithId(p.locationId);
      if (!planet) {
        console.log(`Where is planet: ${p.locationId}`);
        continue;
      }
      const row = document.createElement('tr');
      row.style.color = getOwnerColor(planet);
      row.onclick = () => {
        ui.centerLocationId(planet.locationId);
      }
      row.innerHTML = `<td>${idx + 1}.</td><td>${getPlanetName(planet)}</td><td style="text-align: center">${getPlanetTypeAcronym(planet)}${planet.planetLevel}R${getPlanetRank(planet)}</td><td>${p.score}</td>`
      this.tbody.appendChild(row);
    }
  }
  render(container) {
    const topLabel = document.createElement('label');
    topLabel.style.display = 'block';
    topLabel.style.width = '100%';
    topLabel.style.padding = '5px 0';
    topLabel.innerText = `Top ${this.topX} scoring planets`;
    const topSlider = document.createElement('input');
    topSlider.style.display = 'block';
    topSlider.style.width = '100%';
    topSlider.style.padding = '5px 0';
    topSlider.type = 'range';
    topSlider.value = `${this.topX}`;
    topSlider.min = 1
    topSlider.max = 1000;
    topSlider.onchange = (evt) => {
      try {
        this.topX = parseInt(evt.target.value, 10);
        topLabel.innerText = `Top ${this.topX} scoring planets`;
        this.renderPlanets();
      } catch (err) {
        console.error('Unable to parse number', err);
      }
    }

    container.appendChild(topLabel);
    container.appendChild(topSlider);
    container.appendChild(this.table);

    this.renderPlanets();
  }
}

export default ScoringPlanets;
