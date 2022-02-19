import type { Subscription } from '@darkforest_eth/events';
import type {
  ContractMethodName,
  EthAddress,
  LocatablePlanet,
  LocationId,
  Planet,
} from '@darkforest_eth/types';

class AdminControls implements DFPlugin {
  subscription: Subscription;
  div: HTMLElement;
  button: HTMLButtonElement;
  text: HTMLDivElement;
  selectedPlanet?: Planet;

  public async render(div: HTMLElement) {
    this.div = div;

    div.innerHTML = `
      log in as the following address in development mode to be admin:
      <br />
      ${df.getContractConstants().adminAddress}
      <br />
    `;

    const button = document.createElement('df-button');
    const text = document.createElement('div');

    div.appendChild(button);
    div.appendChild(text);

    button.innerText = 'take ownership of selected planet';
    button.onclick = () => {
      const address = df.getAddress();

      if (!address) {
        alert('no account');
      } else if (!this.selectedPlanet) {
        alert('no selected planet');
      } else {
        this.setOwner(this.selectedPlanet as LocatablePlanet, address);
      }
    };

    this.subscription = ui.selectedPlanetId$.subscribe((p: LocationId) => {
      this.selectedPlanet = ui.getPlanetWithId(p);
      text.innerText = `selected planet id: ${this.selectedPlanet?.locationId}`;
    });
  }

  /**
   * Admin-only function, takes ownership over a planet.
   */
  public async setOwner(planet: LocatablePlanet, newOwner: EthAddress) {
    const getArgs = async () => {
      const snarkArgs = await df.getSnarkHelper().getInitArgs(
        planet.location.coords.x,
        planet.location.coords.y,
        Math.floor(Math.sqrt(planet.location.coords.x ** 2 + planet.location.coords.y ** 2)) + 1 // floor(sqrt(x^2 + y^2)) + 1
      );

      return [newOwner, ...snarkArgs];
    };

    const tx = await df.submitTransaction({
      locationId: planet.locationId,
      newOwner,
      args: getArgs(),
      contract: df.getContract(),
      methodName: 'safeSetOwner' as ContractMethodName,
    });

    tx.confirmedPromise.then(() => df.hardRefreshPlanet(planet.locationId));

    return tx;
  }

  public destroy() {
    this.subscription.unsubscribe();
  }
}

export default AdminControls;
