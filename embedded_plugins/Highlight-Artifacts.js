// src: https://github.com/darkforest-eth/plugins/blob/master/content/artifacts/easy-highlight-artifacts/plugin.js

import {
  html,
  render,
  useCallback,
  useState,
} from "https://unpkg.com/htm/preact/standalone.module.js";

import { EMPTY_ADDRESS } from "https://cdn.skypack.dev/@darkforest_eth/constants";
import {
  ArtifactRarity,
  ArtifactRarityNames,
  ArtifactType,
  ArtifactTypeNames,
  PlanetLevel,
  PlanetType,
  PlanetTypeNames,
} from "https://cdn.skypack.dev/@darkforest_eth/types";

const PIRATES = EMPTY_ADDRESS;

const PLANET_LEVELS = Object.values(PlanetLevel).map((level) => ({
  value: level,
  text: level.toString(),
}));
const PLANET_ANY_TYPE = -1;
const ARTIFACT_ANY_TYPE = -1;
const ARTIFACT_ANY_RARITY = -1;

const PLANET_TYPES = [
  {
    value: PLANET_ANY_TYPE,
    text: "Any",
  },
  ...Object.values(PlanetType)
    .filter((type) => type !== PlanetType.Unknown)
    .map((type) => ({
      value: type,
      text: PlanetTypeNames[type],
    })),
];

const OwnerType = {
  ANYONE: 0,
  UNCLAIMED: 1,
  CLAIMED_BY_MYSELF: 2,
  CLAIMED_BY_OTHERS: 3,
};

const OWNER_TYPES_MAPPING = [
  {
    value: OwnerType.ANYONE,
    text: "Anyone",
  },
  {
    value: OwnerType.UNCLAIMED,
    text: "Unclaimed",
  },
  {
    value: OwnerType.CLAIMED_BY_OTHERS,
    text: "Claimed by others",
  },
  {
    value: OwnerType.CLAIMED_BY_MYSELF,
    text: "Claimed by myself",
  },
];

const ARTIFACT_TYPES = [
  {
    value: ARTIFACT_ANY_TYPE,
    text: "Any",
  },
  ...Object.values(ArtifactType)
    .filter((type) => type !== ArtifactType.Unknown)
    .map((type) => ({
      value: type,
      text: ArtifactTypeNames[type],
    })),
];

const ARTIFACT_RARITIES = [
  {
    value: ARTIFACT_ANY_RARITY,
    text: "Any",
  },
  ...Object.values(ArtifactRarity)
    .filter((rarity) => rarity !== ArtifactRarity.Unknown)
    .map((rarity) => ({
      value: rarity,
      text: ArtifactRarityNames[rarity],
    })),
];

function CreateSelectFilter({ items, selectedValue, onSelect }) {
  const selectStyle = {
    background: "rgb(8,8,8)",
    width: "140px",
    padding: "3px 5px",
    border: "1px solid white",
    borderRadius: "3px",
  };

  return html`
    <select
      style=${selectStyle}
      value=${selectedValue}
      onChange=${(e) => onSelect(Number(e.target.value))}
    >
      ${items.map(
        ({ value, text }) => html`<option value=${value}>${text}</option>`
      )}
    </select>
  `;
}

function LevelFilter({ levels, selectedLevels, onSelectLevel }) {
  const buttonStyle = {
    border: "1px solid #ffffff",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",

    width: "40px",
    height: "25px",
    padding: "0 0.3em",
    color: "white",
    textAlign: "center",
    transition: "background-color 0.2s, color 0.2s",
    borderRadius: "3px",
  };

  const buttonSelectedStyle = {
    ...buttonStyle,
    color: "white",
    background: "#00ADE1",
    borderRadius: 0,
  };

  const buttonsRow = {
    display: "flex",
    flexDirection: "row",
  };

  const button = ({ value, text, onClick, selected = false }) => html`
    <div
      style=${selected ? buttonSelectedStyle : buttonStyle}
      onClick=${() => onClick(value)}
    >
      ${text}
    </div>
  `;
  const inRange = (value) =>
    value <= Math.max(...selectedLevels) &&
    value >= Math.min(...selectedLevels);
  return html`
    <div style=${buttonsRow}>
      ${levels.map(({ value, text }) =>
        button({
          value,
          text,
          onClick: onSelectLevel,
          selected: inRange(value),
        })
      )}
    </div>
  `;
}

function createDivider() {
  const dividerStyle = {
    width: "100%",
    border: "0.1px solid white",
    margin: "20px 0",
    height: 0,
  };

  return html`<div style=${dividerStyle}></div> `;
}

function createButton({ loading, onClick, ctaText }) {
  const buttonStyle = {
    // margin: "10px 0",
    background: "rgb(8,8,8)",
    width: "80px",
    padding: "3px 5px",
    border: "1px solid white",
    borderRadius: "8px",
    textAlign: "center",
  };

  const hoverStyle = {
    color: "#080808",
    background: "#ffffff",
  };

  const [hover, setHover] = useState(false);
  return html` <button
    disabled=${loading}
    style=${{
      ...buttonStyle,
      ...(hover ? hoverStyle : {}),
    }}
    onClick=${onClick}
    onMouseEnter=${() => setHover(true)}
    onMouseLeave=${() => setHover(false)}
  >
    ${ctaText}
  </button>`;
}

// @ts-ignore
let eligiblePlanets = [];

function App({}) {
  const [onlyShowZeroJunk, setOnlyShowZeroJunk] = useState(true);
  const [selectedLevels, setSelectedLevels] = useState([0, 9]);
  const [selectedPlanetType, setSelectedPlanetType] = useState(-1);
  const [selectedArtifactType, setSelectedArtifactType] = useState(-1);
  const [selectedArtifactRarity, setSelectedArtifactRarity] = useState(-1);
  const [selectedOwnerType, setSelectedOwnerType] = useState(
    OwnerType.CLAIMED_BY_MYSELF
  );

  // @ts-ignore
  const usePlanetArtifacts = useCallback((planet) => {
    const artifacts = planet.heldArtifactIds
      ? ui.getArtifactsWithIds(planet.heldArtifactIds)
      : [];
    return artifacts.filter((a) => !!a);
  });

  const getOwnerType = useCallback((planet) => {
    if (!planet) return OwnerType.ANYONE;
    let ownerType;
    switch (planet.owner) {
      case df.account:
        ownerType = OwnerType.CLAIMED_BY_MYSELF;
        break;
      case PIRATES:
        ownerType = OwnerType.UNCLAIMED;
        break;
      default:
        ownerType = OwnerType.CLAIMED_BY_OTHERS;
    }
    return ownerType;
  }, []);

  const getEligiblePlanets = useCallback(() => {
    let planets = [];
    for (let planet of df.getAllPlanets()) {
      // show planet with zero junk
      if (onlyShowZeroJunk && planet.spaceJunk > 0) {
        continue;
      }

      // check planet level in range
      if (
        !(
          planet.planetLevel >= Math.min(...selectedLevels) &&
          planet.planetLevel <= Math.max(...selectedLevels)
        )
      ) {
        continue;
      }

      // check owner type
      const ownerType = getOwnerType(planet);
      if (
        selectedOwnerType != OwnerType.ANYONE &&
        ownerType !== selectedOwnerType
      ) {
        continue;
      }

      // check planet type
      if (
        selectedPlanetType !== PLANET_ANY_TYPE &&
        planet.planetType != selectedPlanetType
      ) {
        continue;
      }

      // if artifact type or rarity selected, then we require a planet contain a artifact satisfying
      // requirements
      const mustHoldArtifacts =
        selectedArtifactRarity !== ARTIFACT_ANY_RARITY ||
        selectedArtifactType !== ARTIFACT_ANY_TYPE;

      if (!mustHoldArtifacts) {
        planets.push(planet);
      } else {
        let artifacts = usePlanetArtifacts(planet);
        // check planet must have artifact of specific type and rarity
        if (selectedArtifactType !== ARTIFACT_ANY_TYPE) {
          // @ts-ignore
          artifacts = artifacts.filter(
            (artifact) => artifact.artifactType === selectedArtifactType
          );
        }

        if (selectedArtifactRarity !== ARTIFACT_ANY_RARITY) {
          // @ts-ignore
          artifacts = artifacts.filter(
            (artifact) => artifact.rarity >= selectedArtifactRarity
          );
        }
        if (artifacts.length > 0) {
          planets.push(planet);
        }
      }
    }
    return planets;
  }, [
    selectedLevels,
    selectedPlanetType,
    selectedOwnerType,
    selectedArtifactType,
    selectedArtifactRarity,
    onlyShowZeroJunk,
  ]);

  const resetEligiblePlanets = useCallback(() => {
    eligiblePlanets = [];
    setSelectedLevels([0, 9]);
    setSelectedPlanetType(PLANET_ANY_TYPE);
    setSelectedArtifactRarity(ARTIFACT_ANY_RARITY);
    setSelectedArtifactType(ARTIFACT_ANY_TYPE);
    setSelectedOwnerType(OwnerType.CLAIMED_BY_MYSELF);
    setOnlyShowZeroJunk(true);
  }, [
    setSelectedLevels,
    setSelectedPlanetType,
    setSelectedArtifactRarity,
    setSelectedArtifactType,
    setSelectedOwnerType,
    setOnlyShowZeroJunk,
  ]);

  const flexRow = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-even",
  };

  const zeroJunkCheckBox = html`
    <div style=${{ display: "flex", alignItems: "center" }}>
      <input
        type="checkbox"
        checked=${onlyShowZeroJunk}
        onChange=${() => {
          setOnlyShowZeroJunk(!onlyShowZeroJunk);
        }}
      />
      <div style=${{ marginLeft: "12px" }}>No Junk</div>
    </div>
  `;

  const planetLevelFilter = html` <div style=${{ marginBottom: "3px" }}>
      Planet Level Ranges
    </div>
    <${LevelFilter}
      levels=${PLANET_LEVELS}
      selectedLevels=${selectedLevels}
      onSelectLevel=${(level) => {
        if (selectedLevels.length == 2) {
          setSelectedLevels([level]);
        } else {
          setSelectedLevels([level, selectedLevels[0]]);
        }
      }}
    />`;

  const planetTypeFilter = html`<div>
    <div style=${{ marginBottom: "3px" }}>Planet Type</div>
    <${CreateSelectFilter}
      items=${PLANET_TYPES}
      selectedValue=${selectedPlanetType}
      onSelect=${setSelectedPlanetType}
    />
  </div>`;

  const ownerTypeFilter = html`
    <div>
      <div style=${{ marginBottom: "3px" }}>Owner Type</div>
      <${CreateSelectFilter}
        items=${OWNER_TYPES_MAPPING}
        selectedValue=${selectedOwnerType}
        onSelect=${setSelectedOwnerType}
      />
    </div>
  `;

  const planetUnionFilters = html`
    <div
      style=${{
        ...flexRow,
        justifyContent: "space-between",
        marginTop: "10px",
      }}
    >
      ${planetTypeFilter} ${ownerTypeFilter}
    </div>
  `;

  const artifactTypeFilter = html`<div>
    <div style=${{ marginBottom: "3px" }}>Artifacts Type</div>
    <${CreateSelectFilter}
      items=${ARTIFACT_TYPES}
      selectedValue=${selectedArtifactType}
      onSelect=${setSelectedArtifactType}
    />
  </div>`;

  const artifactRarityFilter = html`
    <div>
      <div style=${{ marginBottom: "3px" }}>Min Rarity</div>
      <${CreateSelectFilter}
        items=${ARTIFACT_RARITIES}
        selectedValue=${selectedArtifactRarity}
        onSelect=${setSelectedArtifactRarity}
      />
    </div>
  `;

  const artifactFilters = html`<div
    style=${{ ...flexRow, justifyContent: "space-between", marginTop: "10px" }}
  >
    ${artifactTypeFilter} ${artifactRarityFilter}
  </div>`;

  const [loading, setLoading] = useState(false);

  const highlightPlanet = () => {
    setLoading(true);
    eligiblePlanets = getEligiblePlanets();
    setLoading(false);
  };

  const submitButton = html`<${createButton}
    loading=${loading}
    onClick=${highlightPlanet}
    ctaText=${"Submit"}
  />`;

  const resetButton = html`<${createButton}
    onClick=${resetEligiblePlanets}
    ctaText=${"Reset"}
  />`;

  return html`
    ${zeroJunkCheckBox} ${planetLevelFilter} ${planetUnionFilters}
    ${artifactFilters}
    <${createDivider} />
    <div
      style=${{
        ...flexRow,
        justifyContent: "space-around",
        width: "100%",
        marginTop: "10px",
      }}
    >
      ${submitButton} ${resetButton}
    </div>
  `;
}

//@ts-ignore
class Plugin {
  constructor() {
    this.container = null;
  }

  draw(ctx) {
    // @ts-ignore
    const viewport = ui.getViewport();

    ctx.save();
    ctx.fillStyle = "red";
    ctx.strokeStyle = "red";
    for (let planet of eligiblePlanets) {
      if (!planet.location) continue;
      let { x, y } = planet.location.coords;

      // add red circle when level <= 4
      if (planet.planetLevel <= 4) {
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "dashed";
        ctx.beginPath();
        ctx.arc(
          viewport.worldToCanvasX(x),
          viewport.worldToCanvasY(y),
          viewport.worldToCanvasDist(ui.getRadiusOfPlanetLevel(3) * 6),
          0,
          2 * Math.PI
        );
        // ctx.fill();
        ctx.stroke();
        ctx.closePath();
      }

      ctx.beginPath();
      ctx.arc(
        viewport.worldToCanvasX(x),
        viewport.worldToCanvasY(y),
        viewport.worldToCanvasDist(
          ui.getRadiusOfPlanetLevel(planet.planetLevel)
        ),
        0,
        2 * Math.PI
      );
      ctx.fill();
      // ctx.stroke();
      ctx.closePath();
    }
    ctx.restore();
  }

  async render(container) {
    this.container = container;
    // container.style.width = '450px';
    render(html`<${App} />`, container);
  }

  destroy() {
    render(null, this.container);
  }
}

export default Plugin;
