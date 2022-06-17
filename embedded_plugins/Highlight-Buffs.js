// Highlight Buffs
//
// Find all 2x buffs, artifacts, spacetime rips, and more!
//
// author: https://twitter.com/davidryan59

import { PlanetType, PlanetTypeNames, PlanetLevel, PlanetLevelNames } from "https://cdn.skypack.dev/@darkforest_eth/types";
import { isSpaceShip } from "https://cdn.skypack.dev/@darkforest_eth/gamelogic";

// ----------------------------------------
// User Configurable Options

const DEFAULT_ELLIPSE = true
const DEFAULT_PULSE_OPACITY = false
const DEFAULT_LINE = true
const DEFAULT_PULSE_RADIUS = false
const DEFAULT_LINE_DASHED = true
const DEFAULT_PULSE_LINE_WIDTH = false
const DEFAULT_SYNC_PULSES = false
const DEFAULT_PULSE_FAST = false

const DEFAULT_LEVEL_MIN = 0;  // default minimum level of planets to highlight
const DEFAULT_LEVEL_MAX = 9;  // default maximum level of planets to highlight
const DEFAULT_RANGE_INDEX = 5;  // see below, index 3 is "Up to 10,000"

const ENABLE_ROUND_5_OPTIONS = true;  // Half Junk, Spaceship, Capture options introduced in v0.6 Round 5
const ENABLE_TARGET_AND_SPAWN = true;  // Target and Spawn are used in DF DAO Grand Prix

const REFRESH_INTERVAL_MS = 500;  // Recalculate highlights, useful if viewport moves
const DEV_MODE = false;  // Put as true to highlight UI sections for debugging

// ----------------------------------------


const viewport = ui.getViewport();

const PLUGIN_NAME = "Highlight Buffs";

const emptyAddress = "0x0000000000000000000000000000000000000000";
const ADDRESS_LOCAL_STORAGE_KEY = 'KNOWN_ADDRESSES';

const WIDTH_PX_CONTAINER = "320px";
const WIDTH_PX_HALF = "145px";
const MARGIN_WRAPPER = "0px 3px 6px 3px";
const PADDING_SECTION_LABEL = "3px 0px 3px 5px";

const LEVEL_MIN = "LEVEL_MIN";
const LEVEL_MAX = "LEVEL_MAX";
const PLANET_LEVELS = Object.values(PlanetLevel).map( lvl => [lvl, PlanetLevelNames[lvl]]);

const PLANET_TYPE = "PLANET_TYPE";
const ALL_PLANET_TYPES = -1;  // PlanetType is an Enum, values 0..4, so adding one more value here
const PLANET_TYPES = Object.values(PlanetType).map( type => [type, PlanetTypeNames[type]]);
PLANET_TYPES.push([ALL_PLANET_TYPES, "All types"]);

const RANGE_MAX = "RANGE_MAX";
const MAX_DISTANCE = 10 ** 8;
const RANGES = [
  [1000, "Up to 1000"],
  [2000, "Up to 2000"],
  [5000, "Up to 5000"],
  [10000, "Up to 10,000"],
  [20000, "Up to 20,000"],
  [50000, "Up to 50,000"],
  [100000, "Up to 100,000"],
  [200000, "Up to 200,000"],
  [500000, "Up to 500,000"],
  [999999, "Up to 999,999"]
];
const DEFAULT_RANGE_MAX = RANGES[DEFAULT_RANGE_INDEX][0];

// See Dark Forest Client, file: src/_types/global/GlobalTypes.ts/StatIdx
const StatIdx = {
  EnergyCap: 0,
  EnergyGro: 1,
  Range: 2,
  Speed: 3,
  Defense: 4,
  HalfJunk: 5,
}

// Miscellaneous constants
const BASE_LINE_WIDTH_PX = 1.0;
const LINE_WIDTH_PLANET_LEVEL_FACTOR = 0.5;
const EXTRA_RADIUS_CANVAS_PX_ADD = 2.0; 
const EXTRA_RADIUS_WORLD_PX_LINE_MULTIPLY = 1.15;
const EXTRA_RADIUS_WORLD_PX_PULSE_MULTIPLY = 1.30;
const ELLIPSE_FACTOR = 1.1;
const PULSES_PER_ROTATION = 3;  // Number of pulses for full rotation of the circular or elliptical arc
const CIRC_START_RAD = 0;
const CIRC_END_RAD = 2 * Math.PI;
const PULSE_FAST_FACTOR = 2;  // In fast mode, how much faster than normal mode
const ALWAYS_PULSE = 'ALWAYS_PULSE';
const SMALL_TEXT_SIZE = "90%";
const DEFAULT_ALPHA = 0.75;  // If not pulsing alpha, use this constant alpha
const [DESYNC_X, DESYNC_Y] = [101, 103];  // Desynchronises pulsing of separate planets using prime numbers multiplied by canvas coord components
const TOGGLE_OFF = "TOGGLE_OFF";  // Planet arrays are not highlighted if they have this constant as first element (and will be otherwise empty)
const isToggledOn = (arr) => arr[0] !== TOGGLE_OFF;

// When hovering over / mouseover a button, it is normal brightness
// Otherwise dim it by subtracting this number of RGB points, min=0
const NON_HOVER_DIMMER = 15;
const getRgb = (arr, hover, invert=false) => {
  const [r, g, b] = arr.map(c => hover ? (invert ? 255-c : c) : Math.max(0, (invert ? 255-c : c) - NON_HOVER_DIMMER));
  return `rgb(${r}, ${g}, ${b})`
}

// Control default button RGB colours, for toggle off and on, and for background, text, and border
const buttonDefaultColours = {
  off: {
    bg: [50, 50, 50],
    text: [200, 200, 200],
    bord: [120, 120, 120],
  },
  on: {
    bg: [80, 80, 80],
    text: [230, 230, 230],
    bord: [200, 200, 200],
  }
};

// Set up 7 different highlights

// Pulsing period - use prime numbers to desynchronise flashing of any two buffs
const periodMsHighlightArtifact = 1201;  // want artifact the fastest
const periodMsHighlightRip = 1279;
const periodMsHighlight2xEnergyCap = 1361;
const periodMsHighlight2xEnergyGro = 1451;
const periodMsHighlight2xDefense = 1543;
const periodMsHighlight2xSpeed = 1657;
const periodMsHighlight2xRange = 1753;
const periodMsHighlightHalfJunk = 1831;
const periodMsHighlightInvadeNoCapture = 1787;
const periodMsHighlightSpaceship = 1699;
const periodMsHighlightTarget = 1819;
const periodMsHighlightSpawn = 1947;

// Set up colours for each of the highlights. Use similar colours to asteroid colour for 2x buffs.
const colsHighlightArtifact = [255, 100, 100];
const colsHighlightRip = [80, 200, 255];
const colsHighlight2xEnergyCap = [255, 160, 60];
const colsHighlight2xEnergyGro = [120, 255, 120];
const colsHighlight2xDefense = [180, 140, 255];
const colsHighlight2xSpeed = [255, 100, 255];
const colsHighlight2xRange = [225, 225, 80];
const colsHighlightHalfJunk = [180, 150, 130];
const colsHighlightInvadeNoCapture = [170, 255, 100];
const colsHighlightSpaceship = [190, 100, 255];
const colsHighlightTarget = [212, 175, 155];
const colsHighlightSpawn = [69, 175, 155];

// Helper functions for spaceships
const loadAccounts = plugin => {
  const knownAddresses = [];
  const accounts = [];
  const serializedAddresses = localStorage.getItem(ADDRESS_LOCAL_STORAGE_KEY);
  if (serializedAddresses !== null) {
      const addresses = JSON.parse(serializedAddresses);
      for (const addressStr of addresses) {
          knownAddresses.push(addressStr);
      }
  }
  for (const addy of knownAddresses) {
      accounts.push({ address: addy });
  }
  plugin.accounts = accounts;
};
const loadSpaceships = plugin => {
  for (const acc of plugin.accounts) {
      const spaceshipsOwnedByAccount = df.entityStore
          .getArtifactsOwnedBy(acc.address)
          .filter(artifact => isSpaceShip(artifact.artifactType));
      plugin.spaceships = [...plugin.spaceships, ...spaceshipsOwnedByAccount];
  }
};

// Helper functions for filters
const prospectExpired = (plugin, planet) => {
  if (plugin.dateNow / 1000 > df.contractConstants.TOKEN_MINT_END_SECONDS) return true;  // Round has ended
  if (!planet.prospectedBlockNumber) return false;
  if (planet.hasTriedFindingArtifact) return false;
  return planet.prospectedBlockNumber + 255 - df.contractsAPI.ethConnection.blockNumber <= 0;  // 256 blocks to prospect an artifact
}
const planetWasAlreadyInvaded = p => p.invader !== emptyAddress;
const planetWasAlreadyCaptured = p => p.capturer !== emptyAddress;
const planetHasRelevantSpaceship = (plugin, planet) => planet.heldArtifactIds.some(id => plugin.spaceships.some(spaceship => id === spaceship.id));
const distanceToPlanetSquared = planet => planet.location ? (viewport.centerWorldCoords.x - planet.location.coords.x) ** 2 + (viewport.centerWorldCoords.y - planet.location.coords.y) ** 2 : MAX_DISTANCE;
const distanceInRange = (plugin, planet) => distanceToPlanetSquared(planet) <= plugin.getSelectValue(RANGE_MAX) ** 2;
const levelInRange = (plugin, planet) => plugin.getSelectValue(LEVEL_MIN) <= planet.planetLevel && planet.planetLevel <= plugin.getSelectValue(LEVEL_MAX);
const mainChecks = (plugin, planet) => levelInRange(plugin, planet) && distanceInRange(plugin, planet) && !planet.destroyed;
const planetTypeMatches = (plugin, planet) => {
  const type = plugin.getSelectValue(PLANET_TYPE);
  return type === ALL_PLANET_TYPES || type === planet.planetType;
};
const filter2xStat = (statIdx, upgradeIdx=-1) => (plugin, planet) => mainChecks(plugin, planet) && planetTypeMatches(plugin, planet) && (planet.bonus && planet.bonus[statIdx] || planet.upgradeState && planet.upgradeState[upgradeIdx]);

// Filters for each highlight type
const filter2xEnergyCap = filter2xStat(StatIdx.EnergyCap);
const filter2xEnergyGro = filter2xStat(StatIdx.EnergyGro);
const filter2xDefense = filter2xStat(StatIdx.Defense, 0);  // defense rank upgrades are on planet.upgradeState[0]
const filter2xSpeed = filter2xStat(StatIdx.Speed, 2);  // speed rank upgrades are on planet.upgradeState[2]
const filter2xRange = filter2xStat(StatIdx.Range, 1);  // range rank upgrades are on planet.upgradeState[1]
const filterHalfJunk = filter2xStat(StatIdx.HalfJunk);
const filterRip = (plugin, planet) => mainChecks(plugin, planet) && planet.planetType === PlanetType.TRADING_POST;
const filterInvadeNoCapture = (plugin, planet) => mainChecks(plugin, planet) && planetWasAlreadyInvaded(planet) && !planetWasAlreadyCaptured(planet);
const filterSpaceship = (plugin, planet) => mainChecks(plugin, planet) && planetHasRelevantSpaceship(plugin, planet);
const filterTarget = (plugin, planet) => mainChecks(plugin, planet) && planet.isTargetPlanet;
const filterSpawn = (plugin, planet) => mainChecks(plugin, planet) && planet.isSpawnPlanet;
const filterArtifact = (plugin, planet) => {
  // Filter out planets of wrong size
  if (!mainChecks(plugin, planet)) return false;

  // Include any planet with an artifact circling (and is big enough)
  if (planet.heldArtifactIds.length > 0) return true;

  // Otherwise, only keep planet if it's a foundry (RUINS) that hasn't been mined yet, and hasn't expired
  return planet.planetType === PlanetType.RUINS
    && !(planet.hasTriedFindingArtifact || planet.unconfirmedFindArtifact)
    && !prospectExpired(plugin, planet);
};

const divCreator = ({width, margin, padding, devCol="#550000"}) => {
  const div = document.createElement("div");
  div.style.display = "flex";
  div.style.flexWrap = "wrap";
  if (width) div.style.width = width;
  if (margin) div.style.margin = margin;
  if (padding) div.style.padding = padding;
  if (DEV_MODE) div.style.backgroundColor = devCol;
  return div;
}

const hrCreator = () => {
  const hr = document.createElement("hr");
  hr.style.margin = "7px 0px";
  hr.style.borderColor = "rgb(80, 80, 80)";
  return hr;
};

const labelCreator = ({text, color, padding, smallText=false, devCol="#111155"}) => {
  const label = document.createElement("label");
  label.style.display = "flex";
  label.innerText = text;
  if (color) label.style.color = color;
  if (padding) label.style.padding = padding;
  if (smallText) label.style.fontSize = SMALL_TEXT_SIZE;
  if (DEV_MODE) label.style.backgroundColor = devCol;
  return label;
};

const selectCreator = ({initialValue, valueLabelArr, onchange}) => {
  const select = document.createElement("select");
  let mouseOver = false;
  select.style.display = "inline";
  select.style.width = WIDTH_PX_HALF;
  select.style.border = "1px solid";
  select.style.borderRadius = "6px";
  select.style.padding = "5px 3px";
  valueLabelArr.forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = `${value}`;
    option.innerText = label;
    select.appendChild(option);
  });
  const updateColours = () => {
    const colArrs = buttonDefaultColours.off;
    select.style.color = getRgb(colArrs.text, mouseOver);
    select.style.borderColor = getRgb(colArrs.bord, mouseOver);
    select.style.backgroundColor = getRgb(colArrs.bg, mouseOver);
  }
  updateColours();
  select.onmouseover = () => {
    mouseOver = true;
    updateColours();
  };
  select.onmouseleave = () => {
    mouseOver = false;
    updateColours();
  };
  select.onchange = () => {
    onchange();
    select.blur();
  }
  select.value = `${initialValue}`;
  return select;
};

const selectData = [
  {
    id: LEVEL_MIN,
    label: "Min. level:",
    initialValue: DEFAULT_LEVEL_MIN,
    list: PLANET_LEVELS,
  },
  {
    id: LEVEL_MAX,
    label: "Max. level:",
    initialValue: DEFAULT_LEVEL_MAX,
    list: PLANET_LEVELS,
  },
  {
    id: RANGE_MAX,
    label: "Max. range:",
    initialValue: DEFAULT_RANGE_MAX,
    list: RANGES,
  },
  {
    id: PLANET_TYPE,
    label: "Planet type:",
    initialValue: ALL_PLANET_TYPES,
    list: PLANET_TYPES,
  },
];
const initialiseSelectWrappers = plugin => {
  selectData.forEach(obj => {
    obj.value = obj.initialValue;
    const wrapper = divCreator({width: WIDTH_PX_HALF, margin: MARGIN_WRAPPER, devCol: "#006633"});
    const label = labelCreator({text: obj.label, color: "#888888", padding: "0px 0px 0px 8px", smallText: true});
    const select = selectCreator({
      initialValue: obj.initialValue,
      valueLabelArr: obj.list,
      onchange: plugin.recalcAllHighlights
    });
    wrapper.appendChild(label);
    wrapper.appendChild(select);
    obj.element = {};
    obj.element.wrapper = wrapper;
    obj.element.label = label;
    obj.element.select = select;
    plugin.ui.select[obj.id] = obj;
  });  
}

const buttonCreator = ({text, onclick, initialToggleState=false, bgOverrideOn=false, invertTextOn=false, smallText=false}) => {
  const button = document.createElement("button");
  let toggledOn = initialToggleState;
  let mouseOver = false;
  button.innerText = text;
  button.style.display = "inline";
  button.style.width = WIDTH_PX_HALF;
  button.style.border = "1px solid";
  button.style.borderRadius = "6px";
  button.style.padding = "3px";
  if (smallText) button.style.fontSize = SMALL_TEXT_SIZE;
  const setButtonColours = () => {
    const colArrs = toggledOn ? buttonDefaultColours.on : buttonDefaultColours.off;
    const bgCols = toggledOn && bgOverrideOn ? bgOverrideOn : colArrs.bg;
    button.style.color = getRgb(colArrs.text, mouseOver, invertTextOn && toggledOn);
    button.style.borderColor = getRgb(colArrs.bord, mouseOver);
    button.style.backgroundColor = getRgb(bgCols, mouseOver);
  };
  setButtonColours();
  button.onmouseover = () => {
    mouseOver = true;
    setButtonColours();
  };
  button.onmouseleave = () => {
    mouseOver = false;
    setButtonColours();
  };
  button.onclick = () => {
    toggledOn = !toggledOn;
    setButtonColours();
    onclick();
    button.blur();
  };
  return button;
};

const drawHighlights = (plugin, planetArr, colRgbArr, periodMs) => {
  const ctx = plugin.ctx;
  const timeMs = plugin.dateNow;
  const drawOptions = plugin.drawOptions;
  if (isToggledOn(planetArr)) {
    for (let planet of planetArr) {
      if (!planet.location) continue;
      const { x, y } = planet.location.coords;
      // Function to calculate pulse shape, to vary parameter by a triangle wave between 0 and 1
      const getSawWave01 = (item, defaultValue=0.5, slowFactor=1) => {
        if (item === ALWAYS_PULSE || drawOptions[item].value) {
          const thisTimeMs = drawOptions.sync.value ? (timeMs / slowFactor) : (timeMs / slowFactor) + DESYNC_X * x + DESYNC_Y * y;  // Large number of seconds from 1970 (approx)
          const thisPeriodMs = drawOptions.pulseFast.value ? periodMs / PULSE_FAST_FACTOR : periodMs;  // Cycle Period, in ms
          return (thisTimeMs % thisPeriodMs) / thisPeriodMs;  // Sawtooth Wave, position in cycle, between 0 and 1
        } else {
          return defaultValue;
        }
      }
      const getTriWave01 = (item, defaultValue=0.5) => {
        const sawWave01 = getSawWave01(item, defaultValue);
        return 2 * Math.min(sawWave01, 1 - sawWave01);  // Triangle Wave, between 0 and 1
      }
      const colAlpha = getTriWave01("pulseOpacity", DEFAULT_ALPHA);
      let radius = ui.getRadiusOfPlanetLevel(planet.planetLevel);
      const extraRadiusFactor = 1 + EXTRA_RADIUS_WORLD_PX_PULSE_MULTIPLY * getTriWave01("pulseRadius");
      if (!drawOptions.line.value) {
        ctx.fillStyle = `rgba(${"" + colRgbArr[0]}, ${"" + colRgbArr[1]}, ${"" + colRgbArr[2]}, ${"" + colAlpha})`;
      } else {
        ctx.strokeStyle = `rgba(${"" + colRgbArr[0]}, ${"" + colRgbArr[1]}, ${"" + colRgbArr[2]}, ${"" + colAlpha})`;
        radius *= EXTRA_RADIUS_WORLD_PX_LINE_MULTIPLY;
        ctx.lineWidth = (BASE_LINE_WIDTH_PX + LINE_WIDTH_PLANET_LEVEL_FACTOR * planet.planetLevel) * (0.5 + getTriWave01("pulseLineWidth"));
        if (drawOptions.lineDashed.value) {
          ctx.setLineDash([5, 3]);
        } else {
          ctx.setLineDash([]);
        }
      }
      ctx.beginPath();
      const cX = viewport.worldToCanvasX(x);
      const cY = viewport.worldToCanvasY(y);
      const cR = extraRadiusFactor * (viewport.worldToCanvasDist(radius) + EXTRA_RADIUS_CANVAS_PX_ADD);
      const rotationRad = CIRC_END_RAD * getSawWave01(ALWAYS_PULSE, 0, PULSES_PER_ROTATION);
      if (drawOptions.ellipse.value && ctx.ellipse) {
        const cR1 = cR / ELLIPSE_FACTOR;
        const cR2 = cR * ELLIPSE_FACTOR;
        ctx.ellipse(cX, cY, cR1, cR2, rotationRad, CIRC_START_RAD, CIRC_END_RAD);  
      } else {
        ctx.arc(cX, cY, cR, CIRC_START_RAD + rotationRad, CIRC_END_RAD + rotationRad);  
      }
      if (drawOptions.line.value) {
        ctx.stroke();
      } else {
        ctx.fill();
      }
      ctx.closePath();
    }
  }
}

class Plugin {
  constructor() {
    this.ctx = null;
    this.dateNow = Date.now();
    this.ui = {};
    this.ui.select = {};
    initialiseSelectWrappers(this);
    this.accounts = [];
    this.spaceships = [];
    loadAccounts(this);
    loadSpaceships(this);
    this.drawOptions = {
      ellipse: {value: DEFAULT_ELLIPSE, label: "Ellipse"},
      pulseOpacity: {value: DEFAULT_PULSE_OPACITY, label: "Pulse Opacity"},
      line: {value: DEFAULT_LINE, label: "Line"},
      pulseRadius: {value: DEFAULT_PULSE_RADIUS, label: "Pulse Radius"},
      lineDashed: {value: DEFAULT_LINE_DASHED, label: "Line Dashed"},
      pulseLineWidth: {value: DEFAULT_PULSE_LINE_WIDTH, label: "Pulse Line Width"},
      sync: {value: DEFAULT_SYNC_PULSES, label: "Sync Pulses"},
      pulseFast: {value: DEFAULT_PULSE_FAST, label: "Pulse Fast"},
    }
    this.drawOptionList = Object.keys(this.drawOptions);
    this.highlightData = {
      planetsWithArtifact: {label: "Artifacts", filter: filterArtifact, array: [TOGGLE_OFF], periodMs: periodMsHighlightArtifact, cols: colsHighlightArtifact},
      planetsWithRip: {label: "Spacetime Rips", filter: filterRip, array: [TOGGLE_OFF], periodMs: periodMsHighlightRip, cols: colsHighlightRip},
      planetsWith2xDefense: {label: "Defense", filter: filter2xDefense, array: [TOGGLE_OFF], periodMs: periodMsHighlight2xDefense, cols: colsHighlight2xDefense},
      planetsWith2xEnergyCap: {label: "Energy Cap", filter: filter2xEnergyCap, array: [TOGGLE_OFF], periodMs: periodMsHighlight2xEnergyCap, cols: colsHighlight2xEnergyCap},
      planetsWith2xSpeed: {label: "Speed", filter: filter2xSpeed, array: [TOGGLE_OFF], periodMs: periodMsHighlight2xSpeed, cols: colsHighlight2xSpeed},
      planetsWith2xEnergyGro: {label: "Energy Gro", filter: filter2xEnergyGro, array: [TOGGLE_OFF], periodMs: periodMsHighlight2xEnergyGro, cols: colsHighlight2xEnergyGro},
      planetsWith2xRange: {label: "Range", filter: filter2xRange, array: [TOGGLE_OFF], periodMs: periodMsHighlight2xRange, cols: colsHighlight2xRange},
    };
    if (ENABLE_ROUND_5_OPTIONS) {
      this.highlightData['planetsWithHalfJunk'] = {label: "Half Junk", filter: filterHalfJunk, array: [TOGGLE_OFF], periodMs: periodMsHighlightHalfJunk, cols: colsHighlightHalfJunk};
      this.highlightData['planetsWithInvadeNoCapture'] = { label: "Need Capture", filter: filterInvadeNoCapture, array: [TOGGLE_OFF], periodMs: periodMsHighlightInvadeNoCapture, cols: colsHighlightInvadeNoCapture };
      this.highlightData['planetsWithSpaceship'] = { label: "Spaceship", filter: filterSpaceship, array: [TOGGLE_OFF], periodMs: periodMsHighlightSpaceship, cols: colsHighlightSpaceship };
    };
    if (ENABLE_TARGET_AND_SPAWN) {
      this.highlightData['planetsWithTarget'] = {label: "Target", filter: filterTarget, array: [TOGGLE_OFF], periodMs: periodMsHighlightTarget, cols: colsHighlightTarget};
      this.highlightData['planetsWithSpawn'] =  {label: "Spawn", filter: filterSpawn, array: [TOGGLE_OFF], periodMs: periodMsHighlightSpawn, cols: colsHighlightSpawn};
    };
    this.highlightList = Object.keys(this.highlightData);
    console.log(`Initialised ${PLUGIN_NAME} plugin:`);
    console.dir(this);

    this.refreshHighlightsTimer = setInterval(() => {
      setTimeout(this.recalcAllHighlights, 0);
    }, REFRESH_INTERVAL_MS);
  }

  // Toggle individual draw options on or off
  toggleDrawOption = key => {
    this.drawOptions[key].value = !this.drawOptions[key].value;
  };

  getSelectValue = id => {
    return this.ui.select[id].value;
  }

  updateSelectValues = () => {
    selectData.forEach(obj => {
      const uiEntry = this.ui.select[obj.id];
      uiEntry.value = parseInt(uiEntry.element.select.value, 10);
    })
  };

  logHighlight = (label, count) => {
    console.log(`${PLUGIN_NAME} plugin: highlighted ${count} of ${label}`);
  }

  // Recalculate all highlights, keep each state
  recalcAllHighlights = () => {
    this.updateSelectValues();
    this.highlightList.forEach(key => {
      const obj = this.highlightData[key];
      const arr = obj.array;
      const filterFn = obj.filter;
      if (isToggledOn(arr)) {
        // Recalc On
        arr.length = 0;
        for (let planet of df.getAllPlanets()) {
          if (filterFn(this, planet)) arr.push(planet);
        }
        this.logHighlight(obj.label, arr.length);
      } else {
        // Recalc Off
        arr.length = 0;
        arr[0] = TOGGLE_OFF;
      }
    })
  };

  // Recalculate specific highlight, toggle its state
  toggleHighlight = key => {
    this.updateSelectValues();
    const obj = this.highlightData[key];
    const arr = obj.array;
    const filterFn = obj.filter;
    if (isToggledOn(arr)) {
      // Toggle to Off
      arr.length = 0;  // Keep array object, but make it empty
      arr[0] = TOGGLE_OFF;
    } else {
      // Toggle to On
      arr.length = 0;
      for (let planet of df.getAllPlanets()) {
        if (filterFn(this, planet)) arr.push(planet);
      }
      this.logHighlight(obj.label, arr.length);
    }
  };

  render(container) {
    container.parentElement.style.minHeight = "unset";
    container.style.minHeight = "unset";
    container.style.width = WIDTH_PX_CONTAINER;
    if (DEV_MODE) container.style.backgroundColor = "#663300";

    container.appendChild(labelCreator({text: "Highlights:", padding: PADDING_SECTION_LABEL}));
    const highlightDiv = divCreator({});
    this.highlightList.forEach(key => {
      const obj = this.highlightData[key];
      const wrapper = divCreator({width: WIDTH_PX_HALF, margin: MARGIN_WRAPPER, devCol: "#006633"});
      wrapper.appendChild(buttonCreator({
        text: obj.label,
        onclick: () => this.toggleHighlight(key),
        initialToggleState: isToggledOn(obj.array),
        bgOverrideOn: obj.cols,
        invertTextOn: true
      }));
      highlightDiv.appendChild(wrapper);
    })
    container.appendChild(highlightDiv);

    container.appendChild(hrCreator());

    container.appendChild(labelCreator({text: "Filters:", padding: PADDING_SECTION_LABEL}));
    const filterDiv = divCreator({});
    filterDiv.appendChild(this.ui.select[LEVEL_MIN].element.wrapper);
    filterDiv.appendChild(this.ui.select[LEVEL_MAX].element.wrapper);
    filterDiv.appendChild(this.ui.select[RANGE_MAX].element.wrapper);
    filterDiv.appendChild(this.ui.select[PLANET_TYPE].element.wrapper);
    container.appendChild(filterDiv);

    container.appendChild(hrCreator());

    container.appendChild(labelCreator({text: "Display options:", padding: PADDING_SECTION_LABEL}));
    const displayOptsDiv = divCreator({});
    this.drawOptionList.forEach(key => {
      const obj = this.drawOptions[key];
      const wrapper = divCreator({width: WIDTH_PX_HALF, margin: MARGIN_WRAPPER, devCol: "#006633"});
      wrapper.appendChild(buttonCreator({
        text: obj.label,
        onclick: () => this.toggleDrawOption(key),
        initialToggleState: obj.value,
        smallText: true
      }));
      displayOptsDiv.appendChild(wrapper);
    })
    container.appendChild(displayOptsDiv);
  }

  draw(ctx) {
    ctx.save();
    this.ctx = ctx;
    this.dateNow = Date.now();
    this.highlightList.forEach(key => {
      const obj = this.highlightData[key];
      drawHighlights(this, obj.array, obj.cols, obj.periodMs);
    })
    ctx.restore();
  }

  clearRefreshHighlights() {
    if (this.refreshHighlightsTimer) {
      clearInterval(this.refreshHighlightsTimer)
    }
  }

  destroy() {
    this.clearRefreshHighlights();
  }
}

export default Plugin;