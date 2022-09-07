//
// Highlight Friends
//
// Circle your friends' planets with pink circles :)
//

import { PlanetLevel } from
  "https://cdn.skypack.dev/@darkforest_eth/types";

import { html, render, useState } from
  "https://unpkg.com/htm/preact/standalone.module.js";

import { getPlayerColor } from
  "https://cdn.skypack.dev/@darkforest_eth/procedural";

import {
  EMPTY_ADDRESS
} from 'https://cdn.skypack.dev/@darkforest_eth/constants';


function shortAddress(ethAddress) {
  let before = ethAddress.substring(0, 10);
  let zhong = '...';
  let res = before + zhong;
  return res;
}

function drawRound(ctx, p, color) {
  if (!p) return '(???,???)';
  const viewport = ui.getViewport();
  // ctx.strokeStyle=color;
  ctx.strokeStyle = '#FFC0CB';
  ctx.lineWidth = 2;
  const { x, y } = viewport.worldToCanvasCoords(p.location.coords);
  const range = p.range * 0.01 * 20;
  const trueRange = viewport.worldToCanvasDist(range);
  ctx.beginPath();
  // ctx.setLineDash([10,10]);
  ctx.arc(x, y, trueRange, 0, 2 * Math.PI);
  ctx.stroke();
  return `(${p.location.coords.x},${p.location.coords.y})`
}

const PLANET_LEVELS = Object.values(PlanetLevel).map((level) => ({
  value: level,
  text: level.toString(),
}));

let friend = [];
let minLevel = 4;
let maxLevel = 9;

function friendList() {

  const [inPlanet, setInPlanet] = useState(window.HIGHLIGHT_FRIENDS.planet);
  const [chosenPlanet, setChosenPlanet] = useState(undefined);

  const [inMinLevel, setInMinLevel] = useState(minLevel);
  const [inMaxLevel, setInMaxLevel] = useState(maxLevel);

  let divStyle = {
    textAlign: 'center',
    justifyContent: "space-around",
    width: "100%",
    marginTop: "10px",
  };

  let listStyle = {
    height: "200px",
    textAlign: "center",
    overflow: "auto",
  };

  let buttonStyle = { height: "25px" };

  let selectStyle = {
    background: "rgb(8,8,8)",
    width: "100px",
    padding: "3px 5px",
    border: "1px solid white",
    borderRadius: "3px",
  };

  let planetLevelStyle = {
    marginTop: "10px",
    marginBottom: "10px"
  };

  const minLevelSelect = html`
  <select
  style=${selectStyle}
  value=${inMinLevel}
  onChange=${(e) => {
      minLevel = Number(e.target.value);
      setInMinLevel(Number(e.target.value))
    }
    }
  >
  ${PLANET_LEVELS.map(
      ({ value, text }) => html`<option value=${value}>${text}</option>`
    )}
  </select>
`;

  const maxLevelSelect = html`
<select
  style=${selectStyle}
  value=${inMaxLevel}
  onChange=${(e) => {
      maxLevel = Number(e.target.value);
      setInMaxLevel(Number(e.target.value))
    }
    }
>
  ${PLANET_LEVELS.map(
      ({ value, text }) => html`<option value=${value}>${text}</option>`
    )}
</select>
`;

  let friendChildren =
    inPlanet.map((item) => {
      return html`<div>
    ${shortAddress(item.owner)}
    ${' '}
    <button style=${buttonStyle}
     onClick=${() => { center(item) }}
    > center </button>
    ${' '}
    <button
    style=${buttonStyle}
    onClick=${() => { removeFriend(item); }}
    > delete </button>
    </div>`;
    });

  function aimPlanet() {
    let tmpPlanet = ui.getSelectedPlanet();
    setChosenPlanet(tmpPlanet);
  }

  function center(thePlanet) {
    ui.centerLocationId(thePlanet.locationId);
  }

  function addFriend() {
    if (chosenPlanet == undefined) return;
    let flag = true;
    for (let i in HIGHLIGHT_FRIENDS.planet) {
      if (HIGHLIGHT_FRIENDS.planet[i].owner == chosenPlanet.owner)
        flag = false;
    }

    if (flag == true) HIGHLIGHT_FRIENDS.planet.push(chosenPlanet);
    setInPlanet([...HIGHLIGHT_FRIENDS.planet]);
    friend = [];
    for (const i in HIGHLIGHT_FRIENDS.planet)
      friend.push(HIGHLIGHT_FRIENDS.planet[i].owner);
  }


  function removeFriend(thePlanet) {
    let newPlanet = [];
    for (let i in HIGHLIGHT_FRIENDS.planet) {
      let p = HIGHLIGHT_FRIENDS.planet[i];
      if (p.owner == thePlanet.owner) continue;
      newPlanet.push(p);
    }
    HIGHLIGHT_FRIENDS.planet = newPlanet;
    setInPlanet([...HIGHLIGHT_FRIENDS.planet]);
    friend = [];
    for (const i in HIGHLIGHT_FRIENDS.planet) {
      friend.push(HIGHLIGHT_FRIENDS.planet[i].owner);
    }
  }

  function clearFriend() {
    HIGHLIGHT_FRIENDS.planet = [];
    friend = [];
    setInPlanet(HIGHLIGHT_FRIENDS.planet);
  }

  return html`<div  style=${divStyle} >
    <button onClick=${aimPlanet}> choose planet </button>
    <h1> ${chosenPlanet == undefined ? "not choose yet" : chosenPlanet.owner}</h1>
    <div>
    <button onClick=${addFriend}>add friend</button>
    ${' '}
    <button onClick=${clearFriend}>clear all</button>
    </div>
    <div>${' '}</div>
    <div
    style=${planetLevelStyle}
    >
    <h1> choose the planet Level </h1>
    ${minLevelSelect}
    ${' '}
    ${maxLevelSelect}
    </div>
    <div> number of friends： ${inPlanet.length}</div>
    <div style=${listStyle}
    > ${friendChildren}</div>
  </div>`;
}


function App() {
  return html`<${friendList} />`;
}

class Plugin {
  constructor() {
    if (typeof window.HIGHLIGHT_FRIENDS === "undefined") {
      window.HIGHLIGHT_FRIENDS = {}
      window.HIGHLIGHT_FRIENDS.planet =[];

      friend = [];

    } else {
      friend = [];
      let rhs = window.HIGHLIGHT_FRIENDS.planet;
      for (const i in rhs) {
        friend.push(rhs[i].owner);
      }
    }
    this.container = null;
  }

  draw(ctx) {
    const planets =  ui.getPlanetsInViewport()
      .filter(planet => (
        planet.owner!==EMPTY_ADDRESS &&
        planet.destroyed === false &&
        planet.planetLevel >= minLevel &&
        planet.planetLevel <= maxLevel
      ));

    if (minLevel > maxLevel) {
      let tmp = minLevel;
      minLevel = maxLevel;
      maxLevel = tmp;
    }

    // console.log([minLevel,maxLevel]);

    for (const p of planets) {
      if (!p?.location?.coords) continue;

      let flag = false;
      for (const i in friend) {
        let address = friend[i];
        if (p.owner == address) {
          flag = true;
        }
      }
      if (flag == false) continue;
      let color = getPlayerColor(p.owner);
      drawRound(ctx, p, color);
    }
  }

  async render(container) {
    this.container = container;
    container.style.width = "360px";
    container.style.height = "400px";
    render(html`<${App} />`, container);
  }

  destroy() {
    render(null, this.container);
  }
}

export default Plugin;
