/**
 * Remember, you have access these globals:
 * 1. df - Just like the df object in your console.
 * 2. ui - For interacting with the game's user interface.
 *
 * Let's log these to the console when you run your plugin!
 */
console.log(df, ui);

class ArtifactsFinder implements DFPlugin {
  private planetList: HTMLDivElement;

  renderPlanets = () => {
    this.planetList.innerHTML = '';

    // keep track of how many we have found
    let count = 0;

    const countText = document.createElement('div');
    this.planetList.appendChild(countText);

    for (const planet of df.getAllPlanets()) {
      // @ts-ignore
      if (planet.location) {
        if (df.isPlanetMineable(planet)) {
          // is there any other filtering you'd want to do?
          // sometimes planets have artifacts deposited on them!
          // somtimes a planet's artifact has already been mined.
          // see if you can modify this plugin to make it do what
          // you want!
          const planetEntry = document.createElement('div');
          this.planetList.appendChild(planetEntry);

          // hint: have a hard time finding planets?
          // ui.centerCoords might help...
          planetEntry.innerText =
            '(' +
            // @ts-ignore
            planet.location.coords.x +
            ', ' +
            // @ts-ignore
            planet.location.coords.y +
            ')';

          count++;
        }
      }
    }

    if (count === 0) {
      countText.innerText = 'you have not found any artifacts yet';
    } else {
      countText.innerText = 'you have found ' + count + ' artifacts';
    }
  };

  async render(container: HTMLDivElement) {
    console.log('rendered 1 artifacts finder');
    const findArtifactsButton = document.createElement('df-button');
    findArtifactsButton.innerText = 'find me some artifacts!';
    container.appendChild(findArtifactsButton);
    container.appendChild(document.createElement('br'));
    container.appendChild(document.createElement('br'));
    findArtifactsButton.addEventListener('click', this.renderPlanets);
    this.planetList = document.createElement('div');
    container.appendChild(this.planetList);

    this.planetList.style.maxHeight = '300px';
    this.planetList.style.width = '400px';
    this.planetList.style.overflowX = 'hidden';
    this.planetList.style.overflowY = 'scroll';

    console.log('rendered artifacts finder');
  }
}

/**
 * And don't forget to export it!
 */
export default ArtifactsFinder;
