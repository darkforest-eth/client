// Remote Snarker
//
// Similar to the remote explore plugin, the remote snarker plugin allows
// players to run snark proof generation on another computer. We
// usehttps://github.com/bind/df-snarker as a webserver that exposes a `/move`
// endpoint and connect to it from in-game with this plugin. When running this
// on https://zkga.me/, you might get an error about blocked insecure content.
// You probably just want to install a SSL Certificate on your explore server.
// If you can't, you can enable mixed content __but this can be extremely
// dangerous.__

import PromiseQueue from "https://cdn.skypack.dev/p-queue";

import {
  html,
  render,
  useState,
  useLayoutEffect,
} from "https://unpkg.com/htm/preact/standalone.module.js";

function shortenFloat(num) {
  return Number.parseFloat(num).toFixed(2);
}

function isActivated(artifact) {
  if (artifact === undefined) {
    return false;
  }
}
class Snarker {
  url;
  concurrency;
  outstanding_requests_count = 0;
  request_count = 0;
  ra_sample_size = 5;
  ra_sample = [];
  constructor(url, concurrency) {
    this.url = url;
    this.concurrency = concurrency;
  }
  updateConcurrency(number) {
    this.concurrency = number;
  }
  rollingAverageResponseTime() {
    if (this.ra_sample.length === 0) return 0;
    return (
      this.ra_sample.reduce((acc, s) => acc + s, 0) / this.ra_sample.length
    );
  }
  async execute(x1, y1, x2, y2, r, distMax) {
    let startTime = new Date();
    this.request_count = this.request_count + 1;
    this.outstanding_requests_count = this.outstanding_requests_count + 1;
    let results = await fetch(this.url, {
      method: "POST",
      body: JSON.stringify({ x1, y1, x2, y2, r, distMax }),
      headers: { "content-type": "application/json" },
    }).then((res) => res.json());
    let endTime = new Date();
    let timeDiff = endTime - startTime; //in ms
    timeDiff /= 1000;
    let seconds = Math.round(timeDiff);
    this.ra_sample.push(seconds);
    if (this.ra_sample.length > this.ra_sample_size) {
      this.ra_sample.shift();
    }
    this.outstanding_requests_count = this.outstanding_requests_count - 1;
    return results;
  }
}

class SnarkerPool {
  pool = [];
  constructor() { }
  addSnarker(snarker) {
    this.pool.push(snarker);
    return this.pool;
  }

  getAvailableSnarker() {
    const snarker = this.pool.filter(
      (s) => s.concurrency > s.outstanding_requests_count
    );
    if (typeof snarker === "undefined") return false;
    return snarker[0];
  }
}

let poolManager = new SnarkerPool();
window.poolManager = poolManager;
let moveSnarkQueue;
if (window.moveSnarkQueue === undefined) {
  moveSnarkQueue = new PromiseQueue({ concurrency: 1 });
  moveSnarkQueue.on("add", () => {
    console.log(
      "Adding to task to the MoveSnark Queue. Size:",
      moveSnarkQueue.size
    );
  });
  moveSnarkQueue.on("next", () => {
    console.log(
      "Processed task from MoveSnark Queue. Remaining size:",
      moveSnarkQueue.size
    );
  });
  window.moveSnarkQueue = moveSnarkQueue;
} else {
  moveSnarkQueue = window.moveSnarkQueue;
  moveSnarkQueue.concurrency = 1;
}

// Taken from game logic
function getRandomActionId() {
  const hex = "0123456789abcdef";

  let ret = "";
  for (let i = 0; i < 10; i += 1) {
    ret += hex[Math.floor(hex.length * Math.random())];
  }
  return ret;
}

// Split from GameManager.move() to using our queue
async function snark(actionId, oldX, oldY, newX, newY) {
  let snarker = poolManager.getAvailableSnarker();
  let txIntent = df.entityStore.unconfirmedMoves[actionId];

  const xDiff = newX - oldX;
  const yDiff = newY - oldY;

  const distMax = Math.ceil(Math.sqrt(xDiff ** 2 + yDiff ** 2));

  try {
    let callArgs = await snarker.execute(
      oldX,
      oldY,
      newX,
      newY,
      df.worldRadius,
      distMax
    );
    const cacheKey = `${oldX}-${oldY}-${newX}-${newY}-${df.worldRadius}-${distMax}`;
    df.snarkHelper.moveSnarkCache.set(cacheKey, callArgs);
    return df.contractsAPI.move(
      actionId,
      callArgs,
      txIntent.forces,
      txIntent.silver,
      txIntent.artifact
    );
  } catch (err) {
    console.log(err);
    df.onTxIntentFail(txIntent, err);
  }
}

// Kinda like GameManager.move() but without localstorage and using our queue
function move(from, to, forces, silver, artifactMoved) {
  const oldLocation = df.entityStore.getLocationOfPlanet(from);
  const newLocation = df.entityStore.getLocationOfPlanet(to);
  const fromPlanet = df.entityStore.getPlanetWithId(from);
  if (!oldLocation) {
    console.error("tried to move from planet that does not exist");
    return;
  }
  if (!newLocation) {
    console.error("tried to move from planet that does not exist");
    return;
  }

  if (fromPlanet.energy < forces) {
    return;
  }
  const oldX = oldLocation.coords.x;
  const oldY = oldLocation.coords.y;
  const newX = newLocation.coords.x;
  const newY = newLocation.coords.y;

  const shipsMoved = forces;
  const silverMoved = silver;

  if (newX ** 2 + newY ** 2 >= df.worldRadius ** 2) {
    throw new Error("attempted to move out of bounds");
  }

  const oldPlanet = df.entityStore.getPlanetWithLocation(oldLocation);

  if (!df.account || !oldPlanet || oldPlanet.owner !== df.account) {
    throw new Error("attempted to move from a planet not owned by player");
  }
  const actionId = getRandomActionId();

  const txIntent = {
    actionId,
    type: "MOVE",
    from: oldLocation.hash,
    to: newLocation.hash,
    forces: shipsMoved,
    silver: silverMoved,
  };

  if (artifactMoved) {
    const artifact = df.entityStore.getArtifactById(artifactMoved);
    if (!artifact) {
      throw new Error("couldn't find this artifact");
    }
    if (isActivated(artifact)) {
      throw new Error("can't move an activated artifact");
    }
    if (!oldPlanet.heldArtifactIds.includes(artifactMoved)) {
      throw new Error("that artifact isn't on this planet!");
    }
    txIntent.artifact = artifactMoved;
  }

  df.handleTxIntent(txIntent);

  const xDiff = newX - oldX;
  const yDiff = newY - oldY;

  const distMax = Math.ceil(Math.sqrt(xDiff ** 2 + yDiff ** 2));

  const cacheKey = `${oldX}-${oldY}-${newX}-${newY}-${df.worldRadius}-${distMax}`;
  const cachedResult = df.snarkHelper.moveSnarkCache.get(cacheKey);
  if (cachedResult) {
    return df.contractsAPI.move(
      actionId,
      cachedResult,
      shipsMoved,
      silverMoved,
      artifactMoved
    );
  } else {
    moveSnarkQueue.add(() => snark(actionId, oldX, oldY, newX, newY));
  }
}

function updateConcurrency() {
  let num = (df.snarkHelper.snarkProverQueue.taskQueue.concurrency =
    poolManager.pool.reduce((acc, s) => s.concurrency + acc, 0));
  moveSnarkQueue.concurrency = num;
}

function SnarkerUI({ snarker, onRemove }) {
  let [averageResponseTime, setAverageResponseTime] = useState("--");
  let [busyPercentage, setBusyPercentage] = useState("--");
  useLayoutEffect(() => {
    let calcAvgResponseTime = () => {
      setAverageResponseTime(
        shortenFloat(snarker.rollingAverageResponseTime())
      );
    };
    let calcBusyPercentage = () => {
      setBusyPercentage(
        shortenFloat(snarker.outstanding_requests_count / snarker.concurrency)
      );
    };
    moveSnarkQueue.on("next", calcAvgResponseTime);
    moveSnarkQueue.on("next", calcBusyPercentage);

    return () => {
      moveSnarkQueue.off("next", calcAvgResponseTime);
      moveSnarkQueue.off("next", calcBusyPercentage);
    };
  }, [snarker]);

  const wrapper = {
    paddingBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    whiteSpace: "nowrap",
  };

  const buttonWrapper = {
    width: "50px",
    display: "flex",
    justifyContent: "flex-end",
  };

  let remove = () => {
    onRemove(snarker);
  };
  return html`
    <div style=${wrapper}>
      <span
        >${snarker.url} | busy: ${busyPercentage}${" | "}
        ${averageResponseTime}s/snark | ${snarker.request_count} Snarks
        Calc'd</span
      >
      <div style=${buttonWrapper}>
        <button style=${{ float: "right" }} onClick=${remove}>X</button>
      </div>
    </div>
  `;
}

function App({ initialPool = [], addSnarker, removeSnarker }) {
  const [nextUrl, setNextUrl] = useState("");
  const [concurrency, setConcurrency] = useState(1);
  const [pool, setPool] = useState(initialPool);
  const wrapper = { display: "flex" };
  const input = {
    padding: "5px",
    outline: "none",
    color: "black",
    marginRight: "5px",
  };
  const button = {
    marginLeft: "5px",
    outline: "none",
  };

  const onChange = (evt) => {
    console.log(evt.target.value);
    setNextUrl(evt.target.value);
  };
  const onChangeConcurrency = (evt) => {
    setConcurrency(evt.target.value);
  };

  const add = () => {
    let _pool = addSnarker(nextUrl, concurrency * 1); //this was somehow returning a string after manual input
    setPool(_pool);
    setNextUrl("");
  };

  const remove = (snarker) => {
    let pool = removeSnarker(snarker);
    setPool(pool);
  };
  return html`
    <div>
      ${pool.map(
    (snarker) => html`
          <${SnarkerUI}
            key=${snarker.url}
            snarker=${snarker}
            onRemove=${remove}
          />
        `
  )}
      <div style=${wrapper}>
        <input
          style=${{ ...input, flexGrow: "1" }}
          type="text"
          name="url"
          value=${nextUrl}
          onInput=${onChange}
          placeholder="URL for remote snarker"
        />
        <input
          type="number"
          name="thread"
          style=${{ ...input, width: "50px" }}
          value=${concurrency}
          onInput=${onChangeConcurrency}
          min="1"
        />
        <button style=${button} onClick=${add}>Add</button>
      </div>
    </div>
  `;
}

class Plugin {
  constructor() {
    df._move = df.move;
    df.snarkHelper.setSnarkCacheSize(100);
    df.move = move;
  }

  addSnarker = (url, concurrency) => {
    const pool = poolManager.addSnarker(new Snarker(url, concurrency));
    updateConcurrency();
    return pool;
  };

  removeSnarker = (snarker) => {
    poolManager.pool = poolManager.pool.filter((s) => s !== snarker);
    return poolManager.pool;
  };

  async render(container) {
    container.style.minWidth = "450px";
    container.style.width = "auto";
    this.container = container;
    render(
      html`
        <${App}
          initialPool=${poolManager.pool}
          addSnarker=${this.addSnarker}
          removeSnarker=${this.removeSnarker}
        />
      `,
      container
    );
  }

  destroy() {
    df.move = df._move;
    render(null, this.container);
  }
}

export default Plugin;
