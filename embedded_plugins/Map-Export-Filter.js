// 
//  author: https://twitter.com/DfArchon
// 
//  Map Filter Export
//  
//  Export filtered planets with or without background.
//  
//  the speed of export and import is faster :-)   
//  
//  notice 1: If the number of planets is too large, the website may crash, 
//            so we recommend choose a reasonable planetLevel range, such as [3,9].
//            We don't recommend to choose the planetLevel 0, 
//            because the planets's amount maybe very large.
//           
//  notice 2: If you choose to [Download Map With Background], 
//            plugin will export the map which has a lot of 16x16 pixel blocks,
//            the import speed is fast, but you may need to wait the planets to show up for a while.
//            Click the button [Show Planets] and Use the middle mouse button to zoom in 
//            and out may help to make the planets show up more quickly.
//
//  notice 3: Your planets can still be attacked by other's small planets which you can't see.
// 
//  When writing this plugin, we learn a lot from the plugin named map export,
//  Thanks to the authors of map export https://github.com/darkforest-eth/plugins/blob/master/content/utilities/map-export/plugin.js!


import { PlanetLevel, PlanetType, SpaceType } from
  "https://cdn.skypack.dev/@darkforest_eth/types";

import { html, render, useState } from
  "https://unpkg.com/htm/preact/standalone.module.js";

import { getPlayerColor } from
  "https://cdn.skypack.dev/@darkforest_eth/procedural";

let showPlanets = [];

export const isPlanet = planet => planet.planetType === PlanetType.PLANET;
export const isAsteroidField = planet => planet.planetType === PlanetType.SILVER_MINE;
export const isFoundry = planet => planet.planetType === PlanetType.RUINS;
export const isSpacetimeRip = planet => planet.planetType === PlanetType.TRADING_POST;
export const isQuasar = planet => planet.planetType === PlanetType.SILVER_BANK;

export const inBlackSpace = planet => planet.spaceType === SpaceType.DEEP_SPACE;
export const inGreenSpace = planet => planet.spaceType === SpaceType.DEAD_SPACE;
export const inBlueSpace = planet => planet.spaceType === SpaceType.NEBULA;
export const inDarkblueSpace = planet => planet.spaceType === SpaceType.SPACE;
export const destroyedFilter = plt => {
  return plt.location !== undefined && plt.destroyed === false;
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function drawRound(ctx, p, color, width = 1) {
  if (!p) return '(???,???)';
  const viewport = ui.getViewport();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  const {
    x,
    y
  } = viewport.worldToCanvasCoords(p.location.coords);
  const range = p.range * 0.01 * 20;
  const trueRange = viewport.worldToCanvasDist(range);
  ctx.beginPath();
  // ctx.setLineDash([10,10]);
  ctx.arc(x, y, trueRange, 0, 2 * Math.PI);
  ctx.stroke();
  return `(${p.location.coords.x},${p.location.coords.y})`;
}

function zeroFill(i) {
  if (i >= 0 && i <= 9) return "0" + i;
  else return i;
}

function getCurrentTime() {
  var date = new Date();
  var month = zeroFill(date.getMonth() + 1);
  var day = zeroFill(date.getDate());
  var hour = zeroFill(date.getHours());
  var minute = zeroFill(date.getMinutes());
  var second = zeroFill(date.getSeconds());

  var curTime = date.getFullYear() + "-" + month + "-" + day
    + "_" + hour + "-" + minute + "-" + second;

  return curTime;
}

const PLANET_LEVELS = Object.values(PlanetLevel).map((level) => ({
  value: level,
  text: level.toString(),
}));


function mapFilterExport() {

  const [leftLevel, setLeftLevel] = useState(3);
  const [rightLevel, setRightLevel] = useState(9);

  const [hasPlanet, setHasPlanet] = useState(true);
  const [hasAsteroidField, setHasAsteroidField] = useState(true);
  const [hasFoundry, setHasFoundry] = useState(true);
  const [hasSpacetimeRip, setHasSpacetimeRip] = useState(true);
  const [hasQuasar, setHasQuasar] = useState(false);

  const [ohBlackSpace, setOhBlackSpace] = useState(true);
  const [ohGreenSpace, setOhGreenSpace] = useState(true);
  const [ohBlueSpace, setOhBlueSpace] = useState(true);
  const [ohDarkblueSpace, setOhDarkblueSpace] = useState(true);
  const [onlyMe, setOnlyMe] = useState(false);

  const [info, setInfo] = useState('');
  const [info2, setInfo2] = useState('');


  //functions 
  function judgeLevel(plt) {
    let minLevel = Math.min(leftLevel, rightLevel);
    let maxLevel = Math.max(leftLevel, rightLevel);
    return minLevel <= plt.planetLevel && plt.planetLevel <= maxLevel;
  }

  function judgePlanetType(plt) {
    if (hasPlanet && isPlanet(plt)) return true;
    if (hasAsteroidField && isAsteroidField(plt)) return true;
    if (hasFoundry && isFoundry(plt)) return true;
    if (hasSpacetimeRip && isSpacetimeRip(plt)) return true;
    if (hasQuasar && isQuasar(plt)) return true;
    return false;
  }

  function judgeOwner(plt) {
    if (onlyMe === false) return true;
    if (plt.owner === df.account) return true;
    return false;

  }

  function judgeSpaceType(plt) {
    if (ohBlackSpace && inBlackSpace(plt)) return true;
    if (ohGreenSpace && inGreenSpace(plt)) return true;
    if (ohBlueSpace && inBlueSpace(plt)) return true;
    if (ohDarkblueSpace && inDarkblueSpace(plt)) return true;
    return false;
  }

  function generateMapWithoutBackground() {
    let chunks = ui.getExploredChunks();
    let chunksAsArray = Array.from(chunks);

    let res = [];

    let planetsCount = 0;
    let mapPixelsCnt = 0;


    for (let i = 0; i < chunksAsArray.length; i++) {
      const chunk = chunksAsArray[i];
   
      let chunkFootprint = chunk.chunkFootprint;
      let bottomLeft = chunkFootprint.bottomLeft;
      let sideLength = chunkFootprint.sideLength;
      let chunkPerlin = chunkFootprint.perlin;

      let planetLocations = chunk.planetLocations;

      let smallLength = 16;
      let number = sideLength / smallLength;

      if (sideLength < smallLength) continue;

      mapPixelsCnt += number * number;

      let planetLocationsWithMark = [];

      planetLocations.forEach(item => {
        const coords = item.coords;
        let plt = df.getPlanetWithCoords(coords);

        let flag = true;

        if (judgeLevel(plt) === false) flag = false;
        if (judgePlanetType(plt) === false) flag = false;
        if (judgeSpaceType(plt) === false) flag = false;
        if (judgeOwner(plt) === false) flag = false;
        if (destroyedFilter(plt) === false) flag = false;

        if (flag) {
          let tx = coords.x - bottomLeft.x;
          let ty = coords.y - bottomLeft.y;
          tx = Math.floor(tx / smallLength);
          ty = Math.floor(ty / smallLength);

          let value = tx * number + ty;
          let newItem = item;
          newItem.mark = value;
          planetLocationsWithMark.push(newItem);
          planetsCount++;
        }
      });

      planetLocationsWithMark = planetLocationsWithMark.sort((a, b) => a.mark - b.mark);

      let stack = [];

      for (let i = 0; i < planetLocationsWithMark.length; i++) {
        let item = planetLocationsWithMark[i];
        let mark = item.mark;
        let rhs = {};
        rhs.biomebase = item.biomebase;
        rhs.coords = item.coords;
        rhs.hash = item.hash;
        rhs.perlin = item.perlin;

        stack.push(rhs);

        if ((i === planetLocationsWithMark.length - 1) ||
          (i + 1 < planetLocationsWithMark.length &&
            planetLocationsWithMark[i].mark != planetLocationsWithMark[i + 1].mark)
        ) {

          let newChunk = {};
          newChunk.chunkFootprint = {};

          let tx = Math.floor(mark / number) * smallLength;
          let ty = (mark - number * Math.floor(mark / number)) * smallLength;
          tx += bottomLeft.x;
          ty += bottomLeft.y;
          let coords = { x: tx, y: ty };
          newChunk.chunkFootprint.bottomLeft = coords;
          newChunk.chunkFootprint.sideLength = smallLength;
          newChunk.perlin = chunkPerlin;
          let notCnt = 0;
          for (let j = 0; j < stack.length; j++) {
            let pltCoords = stack[j].coords;
            if (pltCoords.x >= tx && pltCoords.x < tx + smallLength && pltCoords.y >= ty && pltCoords.y < ty + smallLength);
            else notCnt++;
          }

          //notice: normally notCnt===0
          if (notCnt !== 0) console.error('notCnt:' + notCnt);

          newChunk.planetLocations = stack;
          if (stack.length !== 0) {
            res.push(newChunk);
            stack = [];
          }
        }
      }
    }

    let newInfo = html`<div>
      <div style=${{ color: '#FFFF00' }}> export ${planetsCount} planets </div>
      <div style=${{ color: '#FFFFCC' }}>${mapPixelsCnt} 16x16 pixel blocks before</div>
      <div style=${{ color: '#FFFF00' }}>${res.length} 16x16 pixel blocks now </div>
    </div>`;
    setInfo(newInfo);
    return res;
  }

  let onDownloadWithoutBackground = async () => {
    let newInfo = html`<div style=${{ color: '#CCFFFF' }}>Begin To Download Map Without Background</div>`;
    setInfo(newInfo);
    let newInfo2 = html`<div style=${{ color: '#CCFFFF' }}>You may need to wait for a while...</div>`;
    setInfo2(newInfo2);
    // notice : sleep is to refresh page
    await sleep(100);

    let mapRaw = generateMapWithoutBackground();
    try {
      let map = JSON.stringify(mapRaw);
      var blob = new Blob([map], { type: 'application/json' }),
        anchor = document.createElement('a');
      let currentTime = getCurrentTime();
      anchor.download = df.getContractAddress().substring(0, 6) + '_' + currentTime + '_map.json';
      anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
      anchor.dataset.downloadurl = ['application/json', anchor.download, anchor.href].join(':');
      anchor.click();
      let newInfo = html`<div style=${{ color: '#FFFFCC' }}>Download Map Successfully :-)</div>`;
      setInfo2(newInfo);

    } catch (err) {
      console.error(err);
      let newInfo = html`<div style=${{ color: 'red' }}>Download Map Error :-|</div>`;
      setInfo(newInfo);
    }
  }

  function generateMapWithBackground() {
    let chunks = ui.getExploredChunks();
    let chunksAsArray = Array.from(chunks);

    let planetsCount = 0;

   
    
    let res = [];

    for (let i = 0; i < chunksAsArray.length; i++) {
      const chunk = chunksAsArray[i];
      const planetLocations = chunk.planetLocations;
      let planetLocationsWithMark = [];
      let newChunk = {};
      newChunk.chunkFootprint = {};
      newChunk.chunkFootprint.bottomLeft = chunk.chunkFootprint.bottomLeft;
      newChunk.chunkFootprint.sideLength = chunk.chunkFootprint.sideLength;
      newChunk.perlin = chunk.perlin;


      planetLocations.forEach(item=>{
        const coords = item.coords;
        let plt = df.getPlanetWithCoords(coords);
        let flag = true;
        if(judgeLevel(plt)===false) flag =  false;
        if(judgePlanetType(plt)===false) flag =  false;
        if(judgeSpaceType(plt)===false) flag = false;
        if(judgeOwner(plt)===false) flag =  false;
        if(destroyedFilter(plt)===false) flag = false;
        if(flag){
          planetLocationsWithMark.push(item);

        }
      });
      
      newChunk.planetLocations = planetLocationsWithMark;
      res.push(newChunk);
      planetsCount+=planetLocationsWithMark.length;
    }

    let newInfo = html`<div>
      <div style=${{ color: '#FFFF00' }}> export ${planetsCount} planets </div>
    </div>`;
    setInfo(newInfo);
    return res;
  }

  let onDownloadWithBackground = async () => {
    let newInfo = html`<div style=${{ color: '#CCFFFF' }}>Begin To Download Map With Background</div>`;
    setInfo(newInfo);
    let newInfo2 = html`<div style=${{ color: '#CCFFFF' }}>You may need to wait for a while...</div>`;
    setInfo2(newInfo2);
    // notice : sleep is to refresh page
    await sleep(100);

    let mapRaw = generateMapWithBackground();
    try {
      let map = JSON.stringify(mapRaw);
      var blob = new Blob([map], { type: 'application/json' }),
        anchor = document.createElement('a');
      let currentTime = getCurrentTime();
      anchor.download = df.getContractAddress().substring(0, 6) + '_' + currentTime + '_map.json';
      anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
      anchor.dataset.downloadurl = ['application/json', anchor.download, anchor.href].join(':');
      anchor.click();
      let newInfo = html`<div style=${{ color: '#FFFFCC' }}>Download Map Successfully :-)</div>`;
      setInfo2(newInfo);

    } catch (err) {
      console.error(err);
      let newInfo = html`<div style=${{ color: 'red' }}>Download Map Error :-|</div>`;
      setInfo(newInfo);
    }
  }




  async function processMap(input) {
    let chunks;
    try {
      chunks = JSON.parse(input);

    } catch (err) {
      console.error(err);
      let newInfo = html`<div style=${{ color: 'red' }}>Invalid map data. Check the data in your file.</div>`;
      setInfo(newInfo);
      return;
    }

    let newInfo = html`<div style=${{ color: 'white' }}>Importing, this will take a while...</div>`;
    setInfo(newInfo);
    try {
      await df.bulkAddNewChunks(chunks)
      let newInfo = html`<div style=${{ color: '#FFFF00' }}>Successfully imported map :-)</div>`;
      setInfo(newInfo);
    } catch (err) {
      console.error(err);
      let newInfo = html`<div style=${{ color: 'red' }}>Encountered an unexpected error :-(</div>`;
      setInfo(newInfo);
    }
  }

  let onUpload = async () => {
    let newInfo = html`<div style=${{ color: '#CCFFFF' }}>Begin To Upload</div>`;
    setInfo(newInfo);
    let newInfo2 = html`<div style=${{ color: '#CCFFFF' }}>You may need to wait For a while...</div>`;
    setInfo2(newInfo2);

    let inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.onchange = () => {
      try {
        var file = inputFile.files.item(0);
        var reader = new FileReader();
        reader.onload = () => {
          processMap(reader.result);
        };
        reader.readAsText(file);

        newInfo2 = html`<div style=${{ color: '#FFFF00' }}>NOTICE: Filter Functions Only Used In Download!</div>`;
        setInfo2(newInfo2);

      } catch (err) {
        console.error(err);
        let newInfo = html`<div style=${{ color: 'red' }}>Unable to upload map :-(</div>`;
        setInfo(newInfo);
        setInfo2('');
        return;
      }
    }
    inputFile.click();
  }

  let updatePlanets = () => {
    showPlanets = Array.from(df.getAllPlanets())
      .filter(destroyedFilter)
      .filter(judgeLevel)
      .filter(judgeOwner)
      .filter(judgeSpaceType);
  }

  let clearPlanets = () => {
    showPlanets = [];
  }

  // css style 
  let divStyle = {
    textAlign: 'center',
    justifyContent: "space-around",
    width: "100%",
    marginTop: "10px",
  };

  let buttonStyle = { height: "25px", width: "130px" };

  let longButtonStyle = { height: "25px", width: "300px" };
  let selectStyle = {
    background: "rgb(8,8,8)",
    width: "100px",
    padding: "3px 5px",
    border: "1px solid white",
    borderRadius: "3px",
  };

  let planetLevelStyle = {
    marginTop: "5px",
    marginBottom: "5px"
  };

  // Component
  const leftLevelSelect = html`
    <select style=${selectStyle} value=${leftLevel} onChange=${(e) => setLeftLevel(e.target.value)}>
        ${PLANET_LEVELS.map(({ value, text }) => html`<option value=${value}>${text}</option>`)}
    </select>
  `;
  const rightLevelSelect = html`
    <select style=${selectStyle} value=${rightLevel} onChange=${(e) => setRightLevel(e.target.value)}>
        ${PLANET_LEVELS.map(({ value, text }) => html`<option value=${value}>${text}</option>`)}
    </select>
  `;

  let levelComponent = html`<div style=${planetLevelStyle}> 
      ${leftLevelSelect}
      ${' '}
      ${rightLevelSelect}
    </div>`;

  let thePlanetComponent = html`<div>
    <input type="checkbox" checked=${hasPlanet} onChange=${() => setHasPlanet(!hasPlanet)}/>
      ${' Planet'} </div>`;

  let theAsteroidFiledComponent = html`<div>
    <input type="checkbox" checked=${hasAsteroidField} onChange=${() => setHasAsteroidField(!hasAsteroidField)}/>
      ${' AsteroidField'} </div>`;

  let theFoundryComponent = html`<div>
    <input type="checkbox" checked=${hasFoundry} onChange=${() => setHasFoundry(!hasFoundry)}/>
      ${' Foundry'} </div>`;

  let theSpacetimeRipComponent = html`<div>
    <input type="checkbox" checked=${hasSpacetimeRip} onChange=${() => setHasSpacetimeRip(!hasSpacetimeRip)}/>
      ${' SpacetimeRip'} </div>`;

  let theQuasarComponent = html`<div>
    <input type="checkbox" checked=${hasQuasar} onChange=${() => setHasQuasar(!hasQuasar)}/>
      ${' Quasar'} </div>`;

  let planetTypeComponent = html`
    <div style=${{ marginLeft: '20px', textAlign: 'left', float: 'left' }}>
    ${thePlanetComponent}
    ${theAsteroidFiledComponent}
    ${theFoundryComponent}
    ${theSpacetimeRipComponent}
    ${theQuasarComponent}
    </div>
  `;

  let theBlackSpaceComponent = html`<div>
    <input type="checkbox" checked=${ohBlackSpace} onChange=${() => setOhBlackSpace(!ohBlackSpace)}/>
      ${' Black'}</div>`;

  let theGreenSpaceComponent = html`<div>
    <input type="checkbox" checked=${ohGreenSpace} onChange=${() => setOhGreenSpace(!ohGreenSpace)}/>
      ${' Green'}</div>`;

  let theBlueSpaceComponent = html`<div>
    <input type="checkbox" checked=${ohBlueSpace} onChange=${() => setOhBlueSpace(!ohBlackSpace)}/>
      ${' Blue'}</div>`;
  let theDarkblueSpaceComponent = html`<div>
    <input type="checkbox" checked=${ohDarkblueSpace} onChange=${() => setOhDarkblueSpace(!ohDarkblueSpace)}/>
      ${' Darkblue'}</div>`;

  let spaceTypeComponent = html`
    <div style=${{ marginLeft: '20px', textAlign: 'left', float: 'left' }}>
  
    ${theBlackSpaceComponent}
    ${theGreenSpaceComponent}
    ${theBlueSpaceComponent}
    ${theDarkblueSpaceComponent}
    </div>`;

  let ownerComponent = html`
  <div style=${{ marginLeft: '20px', textAlign: 'left', float: 'left' }}>
   <input type="checkbox" checked=${!onlyMe} onChange=${() => setOnlyMe(!onlyMe)}/> 
    
  ${' All '}
   <input type="checkbox" checked=${onlyMe} onChange=${() => setOnlyMe(!onlyMe)}/> 
   ${' Me '}
  </div>`;

  return html`<div  style=${divStyle} >
    ${levelComponent}
    <div style=${{ marginBottom: '10px' }}> 
    ${planetTypeComponent}
    ${ownerComponent}
    ${spaceTypeComponent}
   
    </div>
    <div style=${{ marginTop: '5px' }}>
    <button style=${longButtonStyle} onClick=${onDownloadWithoutBackground}> Download Map Without Background </button>
    </div>
    <div style=${{ marginTop: '5px' }}>
    <button style=${longButtonStyle} onClick=${onDownloadWithBackground}> Download Map With Background</button>
    </div>
    <div style=${{ marginTop: '5px' }}>
    <button style=${buttonStyle} onClick=${onUpload}> Upload Map </button>
    </div>
    <div style=${{ marginTop: '5px' }}>
    <button style=${buttonStyle} onClick=${updatePlanets}> Show Planets </button>
    ${' '}
    <button style=${buttonStyle} onClick=${clearPlanets}> Clear Planets </button>
    </div>


    ${info}
    ${info2}
  </div>`;
}

class Plugin {
  constructor() {
    this.container = null;
  }

  draw(ctx) {
    showPlanets.forEach(p => {
      let color = getPlayerColor(p.owner);
      drawRound(ctx, p, color, 2);
    });
  }

  async render(container) {
    this.container = container;
    container.style.width = "320px";
    container.style.height = "380px";
    render(html`<${mapFilterExport} />`, container);
  }

  destroy() {
    render(null, this.container);
  }
}

export default Plugin;

