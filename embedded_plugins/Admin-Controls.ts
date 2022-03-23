// organize-imports-ignore
import type { EthAddress, LocatablePlanet, LocationId, Planet } from '@darkforest_eth/types';
import {
  MAX_ARTIFACT_RARITY,
  MAX_SPACESHIP_TYPE,
  MIN_ARTIFACT_RARITY,
  MIN_ARTIFACT_TYPE,
  MIN_SPACESHIP_TYPE,
  MIN_BIOME,
  MAX_BIOME,
  //@ts-ignore
} from 'https://cdn.skypack.dev/@darkforest_eth/constants';
//@ts-ignore
import { getPlanetNameHash } from 'https://cdn.skypack.dev/@darkforest_eth/procedural';
import {
  locationIdToDecStr,
  artifactIdFromHexStr,
  locationIdFromDecStr,
  //@ts-ignore
} from 'https://cdn.skypack.dev/@darkforest_eth/serde';
import {
  ArtifactRarityNames,
  ArtifactType,
  ArtifactTypeNames,
  BiomeNames,
  Player,
  PlanetType,
  PlanetTypeNames,
  WorldCoords,
  //@ts-ignore
} from 'https://cdn.skypack.dev/@darkforest_eth/types';
import {
  html,
  render,
  useEffect,
  useState,
  useCallback,
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

async function createArtifact(
  owner: EthAddress,
  type: ArtifactType,
  planet: Planet,
  rarity: string,
  biome: string
) {
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
      planetId: locationIdToDecStr(planet.locationId),
      rarity,
      biome,
      artifactType: type,
      owner: owner,
      controller: '0x0000000000000000000000000000000000000000',
    },
  ]);

  const tx = await df.submitTransaction({
    args,
    contract: df.getContract(),
    methodName: 'adminGiveArtifact',
  });
  tx.confirmedPromise.then(() => {
    df.hardRefreshArtifact(artifactIdFromHexStr(tokenId.slice(2)));
    df.hardRefreshPlanet(planet.locationId);
  });

  return tx;
}

async function initPlanet(planet: LocatablePlanet) {
  if (planet.isInContract) return;

  const args = Promise.resolve([locationIdToDecStr(planet.locationId), planet.perlin]);

  const tx = await df.submitTransaction({
    args,
    contract: df.getContract(),
    methodName: 'adminInitializePlanet',
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
    methodName: 'adminGiveSpaceShip',
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
    methodName: 'safeSetOwner',
  });

  tx.confirmedPromise.then(() => df.hardRefreshPlanet(planet.locationId));

  return tx;
}

async function pauseGame() {
  const tx = await df.submitTransaction({
    args: Promise.resolve([]),
    contract: df.getContract(),
    methodName: 'pause',
  });

  return tx;
}

async function unpauseGame() {
  const tx = await df.submitTransaction({
    args: Promise.resolve([]),
    contract: df.getContract(),
    methodName: 'unpause',
  });

  return tx;
}

async function addAddressToWhitelist(address: EthAddress) {
  const args = Promise.resolve([address]);

  const tx = await df.submitTransaction({
    args,
    contract: df.getContract(),
    methodName: 'addToWhitelist',
  });

  return tx;
}

async function createPlanet(coords: WorldCoords, level: number, type: PlanetType) {
  coords.x = Math.round(coords.x);
  coords.y = Math.round(coords.y);

  const location = df.locationBigIntFromCoords(coords).toString();
  const perlinValue = df.biomebasePerlin(coords, true);

  const args = Promise.resolve([
    {
      x: coords.x,
      y: coords.y,
      level,
      planetType: type,
      requireValidLocationId: false,
      location: location,
      perlin: perlinValue,
    },
  ]);

  const tx = await df.submitTransaction({
    args,
    contract: df.getContract(),
    methodName: 'createPlanet',
  });

  await tx.confirmedPromise;

  const revealArgs = df.getSnarkHelper().getRevealArgs(coords.x, coords.y);
  const revealTx = await df.submitTransaction({
    args: revealArgs,
    contract: df.getContract(),
    methodName: 'revealLocation',
  });

  await revealTx.confirmedPromise;

  await df.hardRefreshPlanet(locationIdFromDecStr(location));
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

function artifactBiomeOptions() {
  const options = [] as HTMLOptionElement[];
  for (let i = MIN_BIOME; i <= MAX_BIOME; i++) {
    options.push(html`<option value=${i}>${BiomeNames[i]}</option>`);
  }
  return options;
}

function accountOptions(players: Player[]) {
  const options = [] as HTMLOptionElement[];
  for (const player of players) {
    options.push(
      html`<option value=${player.address}>${player.twitter || player.address}</option>`
    );
  }
  return options;
}
function planetTypeOptions() {
  const options = [] as HTMLOptionElement[];
  for (let i = 0; i <= Object.values(PlanetType).length - 1; i++) {
    options.push(html`<option value=${i}>${PlanetTypeNames[i]}</option>`);
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

function PlanetCreator() {
  const uiEmitter = ui.getUIEmitter();

  const [level, setLevel] = useState(0);
  const [planetType, setPlanetType] = useState(PlanetType.PLANET);
  const [choosingLocation, setChoosingLocation] = useState(false);
  const [planetCoords, setPlanetCoords] = useState(null);

  const placePlanet = useCallback(
    (coords: WorldCoords) => {
      createPlanet(coords, parseInt(level), planetType);
      setChoosingLocation(false);
    },
    [level, planetType, setChoosingLocation]
  );

  const updatePlanetCoords = useCallback(
    (coords: WorldCoords) => {
      setPlanetCoords(coords);
    },
    [setPlanetCoords]
  );

  useEffect(() => {
    if (choosingLocation) {
      uiEmitter.on('WorldMouseClick', placePlanet);
      uiEmitter.on('WorldMouseMove', updatePlanetCoords);

      return () => {
        uiEmitter.off('WorldMouseClick', placePlanet);
        uiEmitter.off('WorldMouseMove', updatePlanetCoords);
      };
    }

    return () => {};
  }, [uiEmitter, choosingLocation, placePlanet, updatePlanetCoords]);

  return html`
    <div style=${{ width: '100%' }}>
      <h2>Create Planet</h2>
      <div style=${rowStyle}>
        <df-slider
          label="Planet Level"
          value=${level}
          onChange=${(e: InputEvent) => setLevel((e.target as HTMLInputElement).value)}
          max=${9}
        ></df-slider>
        <div>
          <label for="planet-type-selector">Planet Type</label>
          <${Select}
            id="planet-type-selector"
            value=${planetType}
            onChange=${(e: InputEvent) => setPlanetType((e.target as HTMLSelectElement).value)}
            items=${planetTypeOptions()}
          />
        </div>
      </div>
      <div style=${{ ...rowStyle, justifyContent: 'space-between' }}>
        ${!choosingLocation &&
        html`
          <df-button
            onClick=${() => {
              setChoosingLocation(true);
            }}
          >
            Choose Planet Location
          </df-button>
        `}
        ${choosingLocation &&
        html` <p>
          Creating planet on coords <br />
          (${Math.round(planetCoords?.x)}, ${Math.round(planetCoords?.y)})
        </p>`}
        ${choosingLocation &&
        html`<df-button onClick=${() => setChoosingLocation(false)}> Cancel Creation</df-button>`}
      </div>
    </div>
  `;
}

function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [selectedShip, setSelectedShip] = useState(MIN_SPACESHIP_TYPE);
  const [selectedArtifact, setSelectedArtifact] = useState(MIN_ARTIFACT_TYPE);
  const [artifactRarity, setArtifactRarity] = useState('1');
  const [artifactBiome, setArtifactBiome] = useState(MIN_BIOME.toString());
  const [whitelistAddress, setWhitelistAddress] = useState(null);
  const [account, setAccount] = useState(null);
  const [targetAccount, setTargetAccount] = useState(null);
  const [allPlayers, setAllPlayers] = useState([]);

  useEffect(() => {
    const account = df.getAccount();
    setAccount(account);
    setTargetAccount(account);
  }, []);

  useEffect(() => {
    const refreshPlayers = () => {
      setAllPlayers(df.getAllPlayers());
    };

    const sub = df.playersUpdated$.subscribe(refreshPlayers);
    refreshPlayers();

    return () => sub.unsubscribe();
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
        <${Select}
          style=${{ flex: '1' }}
          value=${targetAccount}
          onChange=${(e: InputEvent) => setTargetAccount((e.target as HTMLSelectElement).value)}
          items=${accountOptions(allPlayers)}
        />
        <df-button onClick=${() => takeOwnership(selectedPlanet, targetAccount)}>
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

        <${Select}
          style=${{ flex: '1' }}
          value=${targetAccount}
          onChange=${(e: InputEvent) => setTargetAccount((e.target as HTMLSelectElement).value)}
          items=${accountOptions(allPlayers)}
        />
      </div>

      <div style=${{ ...rowStyle, justifyContent: 'space-between' }}>
        <span>
          ${'On planet: '}
          <${PlanetLink} planetId=${(selectedPlanet as Planet)?.locationId} />
        </span>

        <df-button onClick=${() => spawnSpaceship(selectedPlanet, targetAccount, selectedShip)}>
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
          value=${artifactBiome}
          onChange=${(e: InputEvent) => setArtifactBiome((e.target as HTMLSelectElement).value)}
          items=${artifactBiomeOptions()}
        />

        <${Select}
          style=${{ flex: '1' }}
          value=${selectedArtifact}
          onChange=${(e: InputEvent) => setSelectedArtifact((e.target as HTMLSelectElement).value)}
          items=${artifactOptions()}
        />

        <span> to </span>

        <${Select}
          style=${{ flex: '1' }}
          value=${targetAccount}
          onChange=${(e: InputEvent) => setTargetAccount((e.target as HTMLSelectElement).value)}
          items=${accountOptions(allPlayers)}
        />
      </div>

      <div style=${{ ...rowStyle, justifyContent: 'space-between' }}>
        <span>
          ${'On planet: '}
          <${PlanetLink} planetId=${(selectedPlanet as Planet)?.locationId} />
        </span>

        <df-button
          onClick=${() =>
            createArtifact(
              targetAccount,
              selectedArtifact,
              selectedPlanet,
              artifactRarity,
              artifactBiome
            )}
        >
          Give Artifact
        </df-button>
      </div>

      <div style=${rowStyle}>
        <${PlanetCreator} />
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
