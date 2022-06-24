//@ts-ignore
import {
  PlanetType,
  SpaceType,
  PlanetTypeNames,
  //@ts-ignore
} from 'https://cdn.skypack.dev/@darkforest_eth/types';
//@ts-ignore
import { isUnconfirmedMoveTx } from 'https://cdn.skypack.dev/@darkforest_eth/serde';
//@ts-ignore
import {
  html,
  render,
  useEffect,
  useState,
  useLayoutEffect,
  //@ts-ignore
} from 'https://unpkg.com/htm/preact/standalone.module.js';

import { getPlanetName } from 'https://cdn.skypack.dev/@darkforest_eth/procedural';

const STAGGER = 15;
const getPlanetString = (locationId) => {
  const planet = df.getPlanetWithId(locationId);
  if(!planet) return '?????'
  let type = 'P';
  if( planet.planetType == PlanetType.SILVER_MINE) type = 'A'
  else if (planet.planetType == PlanetType.RUINS) type = 'F'
  else if (planet.planetType == PlanetType.TRADING_POST) type = 'STR'
  else if (planet.planetType == PlanetType.SILVER_BANK) type = 'Q'
  return `L${planet.planetLevel}-${type} ${getPlanetName(planet)}`;
};

const getPlanetMaxRank = (planet) => {

  if (!planet) return 0;
  if(planet.planetType != PlanetType.PLANET) return 0;
  if (planet.spaceType === SpaceType.NEBULA) return 3;
  else if (planet.spaceType === SpaceType.SPACE) return 4;
  else return 5;
};
const isFullRank = (planet) => {
  if (!planet) return true;
  const maxRank = getPlanetMaxRank(planet);
  const rank = planet.upgradeState.reduce(
    (a, b) => a + b,
    0
  );
  return rank >= maxRank;
};
function unconfirmedDepartures(planet) {
  return (
    planet.transactions
      ?.getTransactions(isUnconfirmedMoveTx)
      //@ts-ignore
      .reduce((acc, tx) => acc + tx.intent.forces, 0) || 0
  );
}
function planetCurrentPercentEnergy(planet) {
  const departures = unconfirmedDepartures(planet);
  const estimatedEnergy = Math.floor(planet.energy - departures);
  return Math.floor((estimatedEnergy / planet.energyCap) * 100);
}
// I use `let` here to sidestep any weird execution env problems
let PERCENTAGE_TRIGGER = 75;
let PERCENTAGE_SEND = 50;
class Repeater {
  constructor() {
    //@ts-ignore
    if (typeof window.__CORELOOP__ == 'undefined') {
      //setup append only interval id storage
      //@ts-ignore
      window.__CORELOOP__ = [];
    } else {
      //clear out old intervald
      console.log('KILLING PREVIOUS INTERVALS');
      //@ts-ignore
      window.__CORELOOP__.forEach((id) => window.clearInterval(id));
    }
    this.attacks = [];
    this.account = df.getAccount();
    if (localStorage.getItem(`repeatAttacks-${this.account}`)) {
      // @ts-ignore
      this.attacks = JSON.parse(localStorage.getItem(`repeatAttacks-${this.account}`));
    }
    this.intervalId = window.setInterval(this.coreLoop.bind(this), 1000);
    //@ts-ignore
    window.__CORELOOP__.push(this.intervalId);
  }
  saveAttacks() {
    localStorage.setItem(`repeatAttacks-${this.account}`, JSON.stringify(this.attacks));
  }
  addAttack(srcId, targetId) {
    const newAttacks = this.attacks.filter(item => item.srcId !== srcId);
    newAttacks.push({ srcId, targetId });
    this.attacks = newAttacks;
    this.saveAttacks();
  }
  removeAttack(position) {
    this.attacks.splice(position, 1);
    this.saveAttacks();
  }
  removeAllAttacks() {
    this.attacks = [];
    this.saveAttacks();
  }
  stopFiring(planetId) {
    this.attacks = this.attacks.filter(item => item.srcId !== planetId);
    this.saveAttacks();
  }
  stopBeingFiredAt(planetId) {
    this.attacks = this.attacks.filter(item => item.targetId !== planetId);
    this.saveAttacks();
  }
  coreLoop() {
    if(!this || !this.attacks) return;
    const length = this.attacks.length;

    for(let i = 0; i < length; i++){
      if(i % STAGGER == Math.floor(Date.now() / 1000) % STAGGER) {
        const a = this.attacks[i];
        ExecuteAttack(a.srcId, a.targetId);

      }
    }
    
    // this?.attacks?.forEach((a) => {
    //   ExecuteAttack(a.srcId, a.targetId);
    // });
  }
}
const ExecuteAttack = (srcId, targetId) => {
  let srcPlanet = df.getPlanetWithId(srcId);
  if (!srcPlanet) {
    // Well shit
    return;
  }
  // Needs updated check getUnconfirmedDepartingForces
  const departingForces = unconfirmedDepartures(srcPlanet);
  const TRIGGER_AMOUNT = Math.floor((srcPlanet.energyCap * PERCENTAGE_TRIGGER) / 100);
  const FUZZY_ENERGY = Math.floor(srcPlanet.energy - departingForces); //Best estimate of how much energy is ready to send
  if (FUZZY_ENERGY > TRIGGER_AMOUNT) {
    const overflow_send =
      planetCurrentPercentEnergy(srcPlanet) - (PERCENTAGE_TRIGGER - PERCENTAGE_SEND);
    const FORCES = Math.floor((srcPlanet.energyCap * overflow_send) / 100);
    let silver = 0;
    if (isFullRank(srcPlanet)) {
      silver = Math.round(srcPlanet.silver * .95);
    }
    df.move(srcId, targetId, FORCES, silver);
  }
};
let Spacing = {
  marginLeft: '12px',
  marginRight: '12px',
};
let VerticalSpacing = {
  marginBottom: '12px',
};
let HalfVerticalSpacing = {
  marginBottom: '6px',
};
let Clickable = {
  cursor: 'pointer',
  textDecoration: 'underline',
};
let ActionEntry = {
  marginBottom: '5px',
  display: 'flex',
  justifyContent: 'space-between',
  color: '',
};
function centerPlanet(id) {
  ui.centerLocationId(id);
}
function planetShort(locationId) {
  return locationId.substring(4, 9);
}
function Attack({ attack, onDelete }) {
  const srcString = getPlanetString(attack.srcId);
  const targetString = getPlanetString(attack.targetId);
  const finalSrc = srcString.length > 16 ? srcString.slice(0, 13).concat('...') : srcString;
  const finalTarget = targetString.length > 16 ? targetString.slice(0, 13).concat('...') : targetString;
  return html`
    <div style=${ActionEntry}>
      <span>
        <span style=${{ ...Spacing, ...Clickable }} onClick=${() => centerPlanet(attack.srcId)}
          >${finalSrc}</span
        >
        =>
        <span style=${{ ...Spacing, ...Clickable }} onClick=${() => centerPlanet(attack.targetId)}
          >${finalTarget}</span
        ></span
      >
      <button onClick=${onDelete}>X</button>
    </div>
  `;
}
function AddAttack({ onCreate, stopFiring, stopBeingFiredAt }) {
  let [planet, setPlanet] = useState(ui.getSelectedPlanet());
  let [source, setSource] = useState(undefined);
  let [target, setTarget] = useState(undefined);
  useLayoutEffect(() => {
    let onClick = () => {
      setPlanet(ui.getSelectedPlanet());
    };
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('click', onClick);
    };
  }, []);
  return html`
    <div style=${{ display: 'flex', flexDirection: 'column' }}>
      <div style=${{ display: 'flex' }}>
        <button
          style=${VerticalSpacing}
          onClick=${() => {
            setSource(planet);
          }}
        >
          Set Source
        </button>
        <span 
          style=${source ? { ...Spacing, ...Clickable, marginRight: 'auto' } : {...Spacing, marginRight: 'auto'}} 
          onClick=${source? () => centerPlanet(source.locationId) : () => {}}
          >${source ? getPlanetString(source.locationId) : '?????'}</span
        >
      </div>
      <div style=${{ display: 'flex' }}>
        <button style=${VerticalSpacing} onClick=${() => setTarget(planet)}>Set Target</button>
        <span 
        style=${target ? { ...Spacing, ...Clickable, marginRight: 'auto' } : {...Spacing, marginRight: 'auto'}} 
        onClick=${target? () => centerPlanet(target.locationId) : () => {}}
          >${target ? getPlanetString(target.locationId) : '?????'}</span
        >
      </div>
      <div>
        <button
          style=${{...VerticalSpacing, width: 150}}
          onClick=${() => target && source && onCreate(source.locationId, target.locationId)}
        >
          Start Firing!
        </button>
      </div>
      <hr
        style=${{borderColor: 'grey', marginBottom: '10px'}}
      />
      <div
        style=${{fontSize: '90%'}}
      >
        <button
          style=${{...VerticalSpacing, width: 80, marginRight: 10}}
          onClick=${() => planet && stopFiring(planet.locationId)}
        >
          Stop Firing
        </button>
        <button
          style=${{...VerticalSpacing, width: 93}}
          onClick=${() => planet && stopBeingFiredAt(planet.locationId)}
        >
          Stop Being Fired At
        </button>
        <span 
          style=${planet ? { ...Spacing, ...Clickable, marginRight: 'auto' } : {...Spacing, marginRight: 'auto'}} 
          onClick=${planet ? () => centerPlanet(planet.locationId) : () => {}}
          >${planet ? getPlanetString(planet.locationId) : '?????'}</span
        >
      </div>
      <hr
        style=${{borderColor: 'grey', marginBottom: '10px'}}
      /> 
    </div>
  `;
}
function AttackList({ repeater }) {
  const [attacks, setAttacks] = useState([...repeater.attacks]);
  useEffect(() => {
    const id = setInterval(() => {
      setAttacks([...repeater.attacks]);
    }, 1000);
    setAttacks([...repeater.attacks]);
    return () => clearInterval(id);
  }, [attacks.length]);
  let actionList = {
    backgroundColor: '#252525',
    maxHeight: '240px',
    overflowX: 'hidden',
    overflowY: 'scroll',
    padding: '5px',
    borderRadius: '5px',
  };
  //@ts-ignore
  let actionsChildren = attacks.map((action, index) => {
    return html`
      <${Attack}
        attack=${action}
        onDelete=${() => {
          repeater.removeAttack(index);
        }}
      />
    `;
  });
  return html`
    <i style=${{ ...VerticalSpacing, display: 'block' }}
      >Auto-attack when source planet >75% energy. Will send all planet silver
    </i>
    <${AddAttack}
      onCreate=${(srcId, targetId) => repeater.addAttack(srcId, targetId)}
      stopFiring=${planetId => repeater.stopFiring(planetId)}
      stopBeingFiredAt=${planetId => repeater.stopBeingFiredAt(planetId)}
    />
    <h1 style=${{...HalfVerticalSpacing, fontWeight: 'bold'}}>
      Active (${actionsChildren.length})
      <button style=${{ float: 'right', marginLeft: 10 }} onClick=${() => {repeater.removeAllAttacks(); setAttacks([])}}>
        Clear All
      </button>
      <button style=${{ float: 'right' }} onClick=${() => setAttacks([...repeater.attacks])}>
        Refresh
      </button>
    </h1>
    <div style=${actionList}>${actionsChildren.length ? actionsChildren : 'No Actions.'}</div>
  `;
}
function App({ repeater }) {
  return html`<${AttackList} repeater=${repeater} />`;
}
class Plugin {
  // localStorage.setItem("names", JSON.stringify(names));
  // //...
  // var storedNames = JSON.parse(localStorage.getItem("names"));
  constructor() {
    this.repeater = new Repeater();
    this.root = undefined;
  }
  stop() {
    //@ts-ignore
    window.__CORELOOP__.forEach((id) => window.clearInterval(id));
  }
  /**
   * Called when plugin is launched with the "run" button.
   */
  async render(container) {
    this.container = container;
    container.style.width = '400px';
    this.root = render(html`<${App} repeater=${this.repeater} />`, container);
  }
  /**
   * Called when plugin modal is closed.
   */
  destroy() {
    //@ts-ignore
    window.__CORELOOP__.forEach((id) => window.clearInterval(id));
    if (this.container) render(html`<div></div>`, this.container);
  }
}
/**
 * And don't forget to export it!
 */
export default Plugin;
