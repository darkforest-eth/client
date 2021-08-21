// Remote Explore for Blue Space
//
// This plugin is a version of the Dark Forest Remote Explorer plugin that works
// with blue space.
//
// When running this on https://zkga.me/, you might get an error about blocked
// insecure content. You probably should install an SSL Certificate on your
// explore server. If you can't, you can enable mixed content, __but this can be
// extremely dangerous.__

import { html, render, useState, useEffect, useLayoutEffect } from 'https://unpkg.com/htm/preact/standalone.module.js';
import { locationIdFromDecStr } from 'https://cdn.skypack.dev/@darkforest_eth/serde';

const { MinerManager: Miner, SwissCheesePattern, SpiralPattern, TowardsCenterPatternV2 } = df.getConstructors();

const NEW_CHUNK = 'DiscoveredNewChunk';

function getChunkSize(chunkSize) {
  switch (chunkSize) {
    case 'large':
      return 1024;
    case 'medium':
      return 512;
    case 'small':
      return 256;
   default:
      return 128;
  }
}

function getPattern(coords, patternType, chunkSize) {
  const chunkSizeTiles = getChunkSize(chunkSize)
  if (patternType === 'swiss') {
    return new SwissCheesePattern(coords, chunkSizeTiles);
  } else if (patternType === 'spiral') {
    return new SpiralPattern(coords, chunkSizeTiles);
  } else {
    return new TowardsCenterPatternV2(coords, chunkSizeTiles);
  }
}

function worldRadius() {
  return df.getWorldRadius()
}

function workerFactory(url) {
  class RemoteWorker {
    url = url;

    async postMessage(msg) {
      const msgJson = JSON.parse(msg);

      const x = msgJson.chunkFootprint.bottomLeft.x;
      const y = msgJson.chunkFootprint.bottomLeft.y;
      const size = msgJson.chunkFootprint.sideLength;
      const rarity = msgJson.planetRarity;
      const key = msgJson.planetHashKey;
      const resp = await fetch(this.url, {
        method: 'POST',
        body: JSON.stringify({
          id: 0,
          jsonrpc: "2.0",
          method: "stateless_mine",
          params: [x, y, size, rarity, key],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const rpc_response = await resp.json();
      const exploredChunk = rpc_response.result;

      const chunkCenter = {
        x: exploredChunk.chunkFootprint.bottomLeft.x + exploredChunk.chunkFootprint.sideLength / 2,
        y: exploredChunk.chunkFootprint.bottomLeft.y + exploredChunk.chunkFootprint.sideLength / 2,
      };

      exploredChunk.perlin = df.spaceTypePerlin(chunkCenter, false);
      for (const planetLoc of exploredChunk.planetLocations) {
        planetLoc.hash = locationIdFromDecStr(planetLoc.hash);
        planetLoc.perlin = df.spaceTypePerlin(
          { x: planetLoc.coords.x, y: planetLoc.coords.y },
          true
        );
        planetLoc.biomebase = df.biomebasePerlin(
          { x: planetLoc.coords.x, y: planetLoc.coords.y },
          true
        );
      }

      this.onmessage({ data: JSON.stringify([exploredChunk, msgJson.jobId]) });
    }

    onmessage(_a) {
      console.warn('Unimplemented: onmessage');
    }
    terminate() {
      console.warn('Unimplemented: terminate');
    }
    onmessageerror() {
      console.warn('Unimplemented: onmessageerror');
    }
    addEventListener() {
      console.warn('Unimplemented: addEventListener');
    }
    removeEventListener() {
      console.warn('Unimplemented: removeEventListener');
    }
    dispatchEvent(_event) {
      return false;
    }
    onerror() {
      console.warn('Unimplemented: onerror');
    }
  }

  return RemoteWorker;
}

function Target() {
  const wrapper = {
    width: '1em',
    height: '1em',
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'text-bottom',
  };

  const svg = {
    width: '100%',
    height: '100%',
  };

  const path = {
    fill: 'white',
  };

  return html`
    <span style=${wrapper}>
      <svg
        style=${svg}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="512"
        height="512"
        viewBox="0 0 512 512"
      >
        <path
          style=${path}
          d="M512 224h-50.462c-13.82-89.12-84.418-159.718-173.538-173.538v-50.462h-64v50.462c-89.12 13.82-159.718 84.418-173.538 173.538h-50.462v64h50.462c13.82 89.12 84.418 159.718 173.538 173.538v50.462h64v-50.462c89.12-13.82 159.718-84.418 173.538-173.538h50.462v-64zM396.411 224h-49.881c-9.642-27.275-31.255-48.889-58.53-58.53v-49.881c53.757 12.245 96.166 54.655 108.411 108.411zM256 288c-17.673 0-32-14.327-32-32s14.327-32 32-32c17.673 0 32 14.327 32 32s-14.327 32-32 32zM224 115.589v49.881c-27.275 9.641-48.889 31.255-58.53 58.53h-49.881c12.245-53.756 54.655-96.166 108.411-108.411zM115.589 288h49.881c9.641 27.275 31.255 48.889 58.53 58.53v49.881c-53.756-12.245-96.166-54.654-108.411-108.411zM288 396.411v-49.881c27.275-9.642 48.889-31.255 58.53-58.53h49.881c-12.245 53.757-54.654 96.166-108.411 108.411z"
        ></path>
      </svg>
    </span>
  `;
}

function MinerUI({
  miner,
  onRemove,
}) {
  const [hashRate, setHashRate] = useState(0);

  // No idea why useEffect doesn't run
  useLayoutEffect(() => {
    const calcHash = (chunk, miningTimeMillis) => {
      df.addNewChunk(chunk);
      const hashRate = chunk.chunkFootprint.sideLength ** 2 / (miningTimeMillis / 1000);
      setHashRate(Math.floor(hashRate));

      const res = miner.getCurrentlyExploringChunk();
      if (res) {
        const { bottomLeft, sideLength } = res;
        ui?.setExtraMinerLocation?.(miner.id, {
          x: bottomLeft.x + sideLength / 2,
          y: bottomLeft.y + sideLength / 2,
        });
      } else {
        ui?.removeExtraMinerLocation?.(miner.id);
      }
    };
    miner.on(NEW_CHUNK, calcHash);

    return () => {
      miner.off(NEW_CHUNK, calcHash);
    };
  }, [miner]);

  const wrapper = {
    paddingBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    whiteSpace: 'nowrap',
  };

  const buttonWrapper = {
    width: '50px',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const remove = () => {
    onRemove(miner);
  };

  const [targeting, setTargeting] = useState(false);
  const target = () => setTargeting(true);

  useEffect(() => {
    const hover = () => {
      const coords = ui.getHoveringOverCoords();
      if (coords) {
        ui?.setExtraMinerLocation?.(miner.id, coords);
      }
    };
    const click = () => {
      window.removeEventListener('mousemove', hover);
      window.removeEventListener('click', click);
      const coords = ui.getHoveringOverCoords();
      if (coords) {
        const pattern = getPattern(coords, miner.patternType, miner.chunkSize);
        miner.setMiningPattern(pattern);
      }
      miner.setRadius(worldRadius());
      miner.startExplore();
      setTargeting(false);
    };
    if (targeting) {
      miner.stopExplore();
      window.addEventListener('mousemove', hover);
      window.addEventListener('click', click);
    }

    return () => {
      window.removeEventListener('mousemove', hover);
      window.removeEventListener('click', click);
    };
  }, [targeting, miner]);

  return html`
    <div style=${wrapper}>
      <span>${miner.url} - ${hashRate} hashes/sec</span>
      <div style=${buttonWrapper}>
        <button onClick=${target}><${Target} /></button>
        <button onClick=${remove}>X</button>
      </div>
    </div>
  `;
}

function App({
  initialMiners = [],
  addMiner,
  removeMiner,
}) {
  const wrapper = { display: 'flex' };
  const input = {
    flex: '1',
    padding: '5px',
    outline: 'none',
    color: 'black',
  };
  const button = {
    marginLeft: '5px',
    outline: 'none',
  };
  const select = {
    background: 'rgb(8,8,8)',
  };
  const [miners, setMiners] = useState(initialMiners);
  const [nextUrl, setNextUrl] = useState(null);
  const [patternType, setPatternType] = useState('spiral');
  const [chunkSize, setChunkSize] = useState('small');

  const onChange = (evt) => {
    setNextUrl(evt.target.value);
  };

  const add = () => {
    if (nextUrl) {
      const miners = addMiner(nextUrl, patternType, chunkSize);
      setMiners(miners);
      setNextUrl(null);
    }
  };

  const remove = (miner) => {
    const miners = removeMiner(miner);
    setMiners(miners);
  };

  const changeChunkSize = (evt) => {
    setChunkSize(evt.target.value);
  };

  const changePattern = (evt) => {
    setPatternType(evt.target.value);
  };

  return html`
    <div>
      ${miners.map((miner) => html`
        <${MinerUI} key=${miner.url} miner=${miner} onRemove=${remove} />
      `)}
      <div style=${wrapper}>
        <input
          style=${input}
          value=${nextUrl}
          onChange=${onChange}
          placeholder="URL for explore server"
        />
        <select style=${select} value=${chunkSize} onChange=${changeChunkSize}>
          <option value="tiny">Tiny (Why not?)</option>
          <option value="small">Small (The Default)</option>
          <option value="medium">Medium (Four times as big)</option>
          <option value="large">Large (It's a bad idea)</option>
        </select>
        <select style=${select} value=${patternType} onChange=${changePattern}>
          <option value="center">Towards Center</option>
          <option value="spiral">Spiral</option>
          <option value="swiss">Swiss</option>
        </select>
        <button style=${button} onClick=${add}>Explore!</button>
      </div>
    </div>
  `;
}

class RemoteExplorerPlugin {

  constructor() {
    this.miners = [];
    this.id = 0;

    this.addMiner('http://142.93.37.251:8888/', 'spiral', 'small');
  }

  addMiner = (url, patternType = 'spiral', chunkSize = 'small') => {
    const pattern = getPattern({ x: 0, y: 0 }, patternType, chunkSize);
    const miner = Miner.create(
      df.getChunkStore(),
      pattern,
      worldRadius(),
      df.planetRarity,
      df.getHashConfig(),
      false,
      workerFactory(url)
    );

    miner.url = url;
    miner.id = this.id++;
    miner.chunkSize = chunkSize;
    miner.patternType = patternType;

    miner.startExplore();

    this.miners.push(miner);

    return this.miners;
  };

  removeMiner = (miner) => {
    this.miners = this.miners.filter((m) => {
      if (m === miner) {
        ui?.removeExtraMinerLocation?.(m.id);
        m.stopExplore();
        m.destroy();
        return false;
      } else {
        return true;
      }
    });

    return this.miners;
  };

  async render(container) {
    container.style.minWidth = '450px';
    container.style.width = 'auto';

    render(
      html`
        <${App}
          initialMiners=${this.miners}
          addMiner=${this.addMiner}
          removeMiner=${this.removeMiner}
        />
      `,
      container
    );
  }

  destroy() {
    for (const miner of this.miners) {
      ui?.removeExtraMinerLocation?.(miner.id);
      miner.stopExplore();
      miner.destroy();
    }
  }
}

export default RemoteExplorerPlugin;
