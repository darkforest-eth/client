// organize-imports-ignore
import type {
  ContractMethodName,
  EthAddress,
  LocatablePlanet,
  LocationId,
  Planet,
} from '@darkforest_eth/types';
import {
  MAX_ARTIFACT_RARITY,
  MAX_SPACESHIP_TYPE,
  MIN_ARTIFACT_RARITY,
  MIN_ARTIFACT_TYPE,
  MIN_SPACESHIP_TYPE,
  //@ts-ignore
} from 'https://cdn.skypack.dev/@darkforest_eth/constants';
//@ts-ignore
import { getPlanetNameHash } from 'https://cdn.skypack.dev/@darkforest_eth/procedural';
import {
  locationIdToDecStr,
  artifactIdFromHexStr,
  //@ts-ignore
} from 'https://cdn.skypack.dev/@darkforest_eth/serde';
import {
  ArtifactRarityNames,
  ArtifactType,
  ArtifactTypeNames,
  //@ts-ignore
} from 'https://cdn.skypack.dev/@darkforest_eth/types';
import {
  html,
  render,
  useEffect,
  useState,
  //@ts-ignore
} from 'https://unpkg.com/htm/preact/standalone.module.js';

function random256Id() {
  const alphabet = '0123456789ABCDEF'.split('');
  let result = '0x';
  for (let i = 0; i < 256 / 4; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return result;
}

async function createArtifact(owner: EthAddress, type: ArtifactType, rarity = '1') {
  if (!owner) {
    alert('no account');
    return;
  }

  const tokenId = random256Id();
  // see contracts/types/ActionTypes.sol - CreateArtifactArgs
  const args = Promise.resolve([
    {
      tokenId,
      discoverer: owner,
      planetId: '0',
      rarity,
      biome: '1',
      artifactType: type,
      owner: owner,
      controller: '0x0000000000000000000000000000000000000000',
    },
  ]);

  const tx = await df.submitTransaction({
    args,
    contract: df.getContract(),
    methodName: 'createArtifact' as ContractMethodName,
  });
  tx.confirmedPromise.then(() => {
    df.hardRefreshArtifact(artifactIdFromHexStr(tokenId.slice(2)));
  });

  return tx;
}

async function initPlanet(planet: LocatablePlanet) {
  if (planet.isInContract) return;

  const args = Promise.resolve([locationIdToDecStr(planet.locationId), planet.perlin]);

  const tx = await df.submitTransaction({
    args,
    contract: df.getContract(),
    methodName: 'adminInitializePlanet' as ContractMethodName,
  });

  await tx.confirmedPromise;

  return tx;
}

async function spawnSpaceship(
  planet: LocatablePlanet | undefined,
  owner: EthAddress | undefined,
  shipType: ArtifactType
) {
  if (!owner) {
    alert('no account');
    return;
  }

  if (!planet) {
    alert('no selected planet');
    return;
  }

  await initPlanet(planet);

  const args = Promise.resolve([locationIdToDecStr(planet.locationId), owner, shipType]);

  const tx = await df.submitTransaction({
    args,
    contract: df.getContract(),
    methodName: 'adminGiveSpaceShip' as ContractMethodName,
  });

  tx.confirmedPromise.then(() => df.hardRefreshPlanet(planet.locationId));

  return tx;
}

async function takeOwnership(
  planet: LocatablePlanet | undefined,
  newOwner: EthAddress | undefined
) {
  if (!newOwner) {
    alert('no account');
    return;
  }

  if (!planet) {
    alert('no selected planet');
    return;
  }

  const snarkArgs = await df.getSnarkHelper().getInitArgs(
    planet.location.coords.x,
    planet.location.coords.y,
    Math.floor(Math.sqrt(planet.location.coords.x ** 2 + planet.location.coords.y ** 2)) + 1 // floor(sqrt(x^2 + y^2)) + 1
  );

  const args = Promise.resolve([newOwner, ...snarkArgs]);

  const tx = await df.submitTransaction({
    locationId: planet.locationId,
    newOwner,
    args,
    contract: df.getContract(),
    methodName: 'safeSetOwner' as ContractMethodName,
  });

  tx.confirmedPromise.then(() => df.hardRefreshPlanet(planet.locationId));

  return tx;
}

async function pauseGame() {
  const tx = await df.submitTransaction({
    args: Promise.resolve([]),
    contract: df.getContract(),
    methodName: 'pause' as ContractMethodName,
  });

  return tx;
}

async function unpauseGame() {
  const tx = await df.submitTransaction({
    args: Promise.resolve([]),
    contract: df.getContract(),
    methodName: 'unpause' as ContractMethodName,
  });

  return tx;
}

async function addAddressToWhitelist(address: EthAddress) {
  const args = Promise.resolve([address]);

  const tx = await df.submitTransaction({
    args,
    contract: df.getContract(),
    methodName: 'addToWhitelist' as ContractMethodName,
  });

  return tx;
}

function PlanetLink({ planetId }: { planetId?: LocationId }) {
  if (planetId) {
    return html`<a
      style=${{ cursor: 'pointer', textDecoration: 'underline', color: '#00ADE1' }}
      onClick=${() => ui.centerLocationId(planetId)}
    >
      ${getPlanetNameHash(planetId)}
    </a>`;
  } else {
    return '(none selected)';
  }
}

function Heading({ title }: { title: string }) {
  return html`<h2 style=${{ fontSize: '14pt', textDecoration: 'underline' }}>${title}</h2>`;
}

function shipOptions() {
  const options = [] as HTMLOptionElement[];
  for (let i = MIN_SPACESHIP_TYPE; i <= MAX_SPACESHIP_TYPE; i++) {
    options.push(html`<option value=${i}>${ArtifactTypeNames[i]}</option>`);
  }
  return options;
}

function artifactOptions() {
  const options = [] as HTMLOptionElement[];
  for (let i = MIN_ARTIFACT_TYPE; i < MIN_SPACESHIP_TYPE; i++) {
    options.push(html`<option value=${i}>${ArtifactTypeNames[i]}</option>`);
  }
  return options;
}

function artifactRarityOptions() {
  const options = [] as HTMLOptionElement[];
  for (let i = MIN_ARTIFACT_RARITY; i <= MAX_ARTIFACT_RARITY; i++) {
    options.push(html`<option value=${i}>${ArtifactRarityNames[i]}</option>`);
  }
  return options;
}

function Select({
  style,
  value,
  onChange,
  items,
}: {
  style: Record<string, string>;
  value: string;
  onChange: (e: InputEvent) => void;
  items: unknown[];
}) {
  return html`
    <select
      style=${{
        ...style,
        outline: 'none',
        background: '#151515',
        color: '#838383',
        borderRadius: '4px',
        border: '1px solid #777',
        width: '100%',
        padding: '2px 6px',
        cursor: 'pointer',
      }}
      value=${value}
      onChange=${onChange}
    >
      ${items}
    </select>
  `;
}

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
};

const rowStyle = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
};

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [selectedShip, setSelectedShip] = useState(MIN_SPACESHIP_TYPE);
  const [selectedArtifact, setSelectedArtifact] = useState(MIN_ARTIFACT_TYPE);
  const [artifactRarity, setArtifactRarity] = useState('1');
  const [whitelistAddress, setWhitelistAddress] = useState(null);
  const [account, setAccount] = useState(null);
  const [shipAccount, setShipAccount] = useState(null);
  const [planetAccount, setPlanetAccount] = useState(null);
  const [artifactAccount, setArtifactAccount] = useState(null);

  useEffect(() => {
    const account = df.getAccount();
    setAccount(account);
    setShipAccount(account);
    setPlanetAccount(account);
    setArtifactAccount(account);
  }, []);

  useEffect(() => {
    const subscription = ui.selectedPlanetId$.subscribe((p: LocationId) => {
      setSelectedPlanet(ui.getPlanetWithId(p));
    });

    return () => subscription.unsubscribe();
  }, [setSelectedPlanet]);

  return html`
    <div style=${wrapperStyle}>
      <p>Logged in as account: ${account}</p>

      <${Heading} title="Game state" />

      <div style=${rowStyle}>
        <span>Change game state:</span>
        <df-button onClick=${() => pauseGame()}> Pause </df-button>
        <df-button onClick=${() => unpauseGame()}> Unpause </df-button>
      </div>

      <${Heading} title="Whitelist players" />

      <div style=${rowStyle}>
        <df-text-input
          style=${{ flex: '1' }}
          value=${whitelistAddress}
          onInput=${(e: InputEvent) => setWhitelistAddress((e.target as HTMLInputElement).value)}
          placeholder="Address to whitelist"
        ></df-text-input>
        <df-button onClick=${() => addAddressToWhitelist(whitelistAddress)}>
          Whitelist Address
        </df-button>
      </div>

      <${Heading} title="Give Planets" />

      <div style=${rowStyle}>
        <span> Planet: <${PlanetLink} planetId=${(selectedPlanet as Planet)?.locationId} /> </span>
        <span> to </span>
        <df-text-input
          style=${{ flex: '1' }}
          value=${planetAccount}
          onInput=${(e: InputEvent) => setPlanetAccount((e.target as HTMLInputElement).value)}
          placeholder="Address receiving planet"
        ></df-text-input>
        <df-button onClick=${() => takeOwnership(selectedPlanet, planetAccount)}>
          Give Planet
        </df-button>
      </div>

      <${Heading} title="Give Spaceships" />

      <div style=${rowStyle}>
        <${Select}
          style=${{ flex: '1' }}
          value=${selectedShip}
          onChange=${(e: InputEvent) => setSelectedShip((e.target as HTMLSelectElement).value)}
          items=${shipOptions()}
        />

        <span> to </span>

        <df-text-input
          style=${{ flex: '1' }}
          value=${shipAccount}
          onInput=${(e: InputEvent) => setShipAccount((e.target as HTMLInputElement).value)}
          placeholder="Address receiving ship"
        ></df-text-input>
      </div>

      <div style=${{ ...rowStyle, justifyContent: 'space-between' }}>
        <span>
          ${'On planet: '}
          <${PlanetLink} planetId=${(selectedPlanet as Planet)?.locationId} />
        </span>

        <df-button onClick=${() => spawnSpaceship(selectedPlanet, shipAccount, selectedShip)}>
          Spawn Spaceship
        </df-button>
      </div>

      <${Heading} title="Give Artifacts" />

      <div style=${rowStyle}>
        <${Select}
          style=${{ flex: '1' }}
          value=${artifactRarity}
          onChange=${(e: InputEvent) => setArtifactRarity((e.target as HTMLSelectElement).value)}
          items=${artifactRarityOptions()}
        />

        <${Select}
          style=${{ flex: '1' }}
          value=${selectedArtifact}
          onChange=${(e: InputEvent) => setSelectedArtifact((e.target as HTMLSelectElement).value)}
          items=${artifactOptions()}
        />

        <span> to </span>

        <df-text-input
          value=${artifactAccount}
          onInput=${(e: InputEvent) => setArtifactAccount((e.target as HTMLInputElement).value)}
          placeholder="Address receiving artifact"
        ></df-text-input>

        <df-button
          onClick=${() => createArtifact(artifactAccount, selectedArtifact, artifactRarity)}
        >
          Give Artifact
        </df-button>
      </div>
    </div>
  `;
}

class Plugin implements DFPlugin {
  async render(container: HTMLDivElement) {
    container.style.width = '525px';

    render(html`<${App} />`, container);
  }
}

export default Plugin;
