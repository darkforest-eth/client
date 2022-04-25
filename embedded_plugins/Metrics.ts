// organize-imports-ignore
import { BLOCK_EXPLORER_URL } from '@darkforest_eth/constants';
import { DarkForest } from '@darkforest_eth/contracts/typechain';
import type {
  ContractMethodName,
  EthAddress,
  LocatablePlanet,
  LocationId,
  Planet,
  Transaction,
  TxIntent,
} from '@darkforest_eth/types';
import { ContractTransaction, logger } from 'ethers';
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

type Tx = Transaction<{
  args: Promise<never[]>;
  contract: DarkForest;
  methodName: ContractMethodName;
}>

async function dfWaitWithMetrics(tx: Tx): Promise<number> {
  try {
    // console.log(`tx`, tx);
    const submit = await tx.submittedPromise;
    // console.log(`submit`, submit);
    var startTime = performance.now()
    const receipt = await tx.confirmedPromise;
    var endTime = performance.now()
    // console.log(`${tx.intent.methodName} confirmed ${endTime - startTime} milliseconds`)
    //console.log(`confirmed with ${receipt.confirmations} blocks, ${receipt.gasUsed} gas used and ${submit.gasPrice} price (wei)`);  
    return endTime - startTime;
  } catch (error) {
    console.log(`ERROR`, error);
    return 0;
  } 
}

async function waitWithMetrics(tx: ContractTransaction, name?: string): Promise<number> {
  try {
    var startTime = performance.now()
    const receipt = await tx.wait();
    var endTime = performance.now()
    // console.log(`${name} confirmed ${endTime - startTime} milliseconds`)
    //console.log(`confirmed with ${receipt.confirmations} blocks, ${receipt.gasUsed} gas used and ${tx.gasPrice} price (wei)`);
    return endTime - startTime;  
  } catch (error) {
    console.log(`ERROR`)
    return 0;
  }
}


async function pauseGame() {
  const tx = await df.submitTransaction({
    args: Promise.resolve([]),
    contract: df.getContract(),
    methodName: 'pause' as ContractMethodName,
  });
  return await dfWaitWithMetrics(tx);
}

async function unpauseGame() {
  const tx = await df.submitTransaction({
    args: Promise.resolve([]),
    contract: df.getContract(),
    methodName: 'unpause' as ContractMethodName,
  });
  return await dfWaitWithMetrics(tx);
}

async function rawPauseGame() {
  const contract = df.getContract();
  const tx = await contract.pause()
  return await waitWithMetrics(tx, 'raw pause');
}

async function rawUnpauseGame() {
  const contract = df.getContract();
  const tx = await contract.unpause()
  return await waitWithMetrics(tx, 'raw unpause');
}

async function changeRPC(rpcUrl: string) {
  df.getEthConnection()
  .setRpcUrl(rpcUrl)
  .then(() => {
    localStorage.setItem('XDAI_RPC_ENDPOINT_v5', rpcUrl);
  })
  .catch(() => {
    console.log(`error setting RPC`);
  });
}

async function testPauseDifference() {
  await changeRPC('https://kovan.optimism.io');
  setPollingInterval();

  await logPauseDifference(2)

  await changeRPC('wss://ws-kovan.optimism.io');
  await logPauseDifference(2);
}

function setPollingInterval(interval = 8000) {
  const interval1 = df.getEthConnection().getProvider().pollingInterval;
  console.log(`polling interval is ${interval1}`)

  // Return if wss websocket rpc, which has interval of 0.
  if(interval1 == 0) return;

  // @ts-expect-error Need to do this because getEthConnection() creates a fresh provider each time
  df.ethConnection.provider.pollingInterval = interval;
  const res = df.getEthConnection().getProvider().pollingInterval
  console.log(`polling interval is now ${res}`)

}

function pollingIntervalSanityCheck() {
  console.log(`running pollInterval sanity check`);
  for(var i = 0; i < 5; i++) {
    setTimeout(() => {setPollingInterval()}, 5000 * i + 1);
  }
}

async function logPauseDifference(iterations = 1) {
  console.log(`testing Pause difference with:
  polling interval ${df.getEthConnection().getProvider().pollingInterval}
  rpc: ${df.getEthConnection().getRpcEndpoint()}`);

  let paused = await df.getContract().paused();
  console.log('pre: paused?', paused);

  if(paused) await unpauseGame();
  paused = await df.getContract().paused();
  console.log('post: paused?', paused);
  if(paused) throw new Error('must test on unpaused game');

  var pauseTime = 0;
  var unPauseTime = 0;
  var rawPauseTime = 0;
  var rawUnPauseTime = 0;

  setPollingInterval();

  for(var i = 0; i < iterations; i++) {
    console.log(`getting metrics for round ${i} of normal pause / unpause`);

    pauseTime += await pauseGame();
    unPauseTime += await unpauseGame();
  
    console.log(`getting metrics for round ${i} of raw pause / unpause`);
    rawPauseTime += await rawPauseGame();
    rawUnPauseTime += await rawUnpauseGame();
  }

  const normalAvg = (pauseTime + unPauseTime) / iterations;
  const rawAvg = (rawPauseTime + rawUnPauseTime) / iterations;

  var results: any = {};
  results['normal_avg_ms'] = normalAvg.toFixed(2);
  results['raw_avg_ms'] = rawAvg.toFixed(2);
  results['polling_interval'] = df.getEthConnection().getProvider().pollingInterval
  results['rpc'] = df.getEthConnection().getRpcEndpoint()
  console.log('Test results', results);
}

function Heading({ title }: { title: string }) {
  return html`<h2 style=${{ fontSize: '14pt', textDecoration: 'underline' }}>${title}</h2>`;
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
        <df-button onClick=${() => rawPauseGame()}> Raw Pause </df-button>
        <df-button onClick=${() => rawUnpauseGame()}> Raw Unpause </df-button>
        <df-button onClick=${() => logPauseDifference()}> Log Pause Difference </df-button>
        <df-button onClick=${() => testPauseDifference()}> Test Pause Difference </df-button>
        <df-button onClick=${() => pollingIntervalSanityCheck()}> Poll Interval Sanity </df-button>

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