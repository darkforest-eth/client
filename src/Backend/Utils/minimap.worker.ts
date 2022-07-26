import { perlin } from "@darkforest_eth/hashing";
import { SpaceType, WorldCoords } from "@darkforest_eth/types";
import { DrawMessage, MinimapConfig, PlanetType } from "../../Frontend/Panes/Lobby/MinimapUtils";

const ctx = self as unknown as Worker;

function spaceTypePerlin(coords: WorldCoords, config: MinimapConfig): number {
  return perlin(coords, { ...config, floor: true });
}

function spaceTypeFromPerlin(perlin: number, config: MinimapConfig): SpaceType {
  if (perlin < config.perlinThreshold1) {
    return SpaceType.NEBULA;
  } else if (perlin < config.perlinThreshold2) {
    return SpaceType.SPACE;
  } else if (perlin < config.perlinThreshold3) {
    return SpaceType.DEEP_SPACE;
  } else {
    return SpaceType.DEAD_SPACE;
  }
}

// Initial implementation by @nicholashc (https://github.com/nicholashc)
// https://github.com/darkforest-eth/plugins/blob/358a386356b9145005f17045d9f4ce22661d99a1/content/utilities/mini-map/plugin.js
function generate(config: MinimapConfig): DrawMessage {
  const data = [];
  const step = config.worldRadius * config.dot / 100;

  const radius = config.worldRadius;

  // utility functions
  const checkBounds = (a: number, b: number, x: number, y: number, r: number) => {
    const dist = (a - x) * (a - x) + (b - y) * (b - y);
    r *= r;
    if (dist < r) {
      return true;
    }
    return false;
  };

  const checkStagedPlanet = (x: number, y: number) : PlanetType => {
    let s = Math.round(step / 2);
    const stagedPlanet = config.stagedPlanets.find(
      (planet) => x - s <= planet.x && planet.x < x + s && y - s <= planet.y && planet.y < y + s
    );
    const createdPlanet = config.createdPlanets.find(
      (planet) => x - s <= planet.x && planet.x < x + s && y - s <= planet.y && planet.y < y + s
    );
    if (createdPlanet) return 'created' as PlanetType;
    if (stagedPlanet?.isSpawnPlanet) return 'spawn' as PlanetType;
    if (stagedPlanet?.isTargetPlanet) return 'target' as PlanetType;
    if (stagedPlanet) return 'staged' as PlanetType;
    return undefined;
  };
  // generate x coordinates
  for (let i = radius * -1; i < radius; i += step) {
    // generate y coordinates
    for (let j = radius * -1; j < radius; j += step) {
      // filter points within map circle
      if (!checkBounds(0, 0, i, j, radius)) {
        continue;
      }
        // store coordinate and space type
      data.push({
        x: i,
        y: j,
        type: spaceTypeFromPerlin(spaceTypePerlin({ x: i, y: j }, config), config),
        planet: checkStagedPlanet(i, j)
      });
    }
  }

  return { radius, data, dot: config.dot };
}

ctx.addEventListener('message', (e: MessageEvent) => {
  if (e.data) {
    const msg = generate(JSON.parse(e.data));
    ctx.postMessage(JSON.stringify(msg));
  }
});
