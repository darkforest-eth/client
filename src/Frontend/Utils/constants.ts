import * as bigInt from 'big-integer';

// To developer, increase this number to 256. This, in combination with setting `DISABLE_ZK_CHECKS`
// in darkforest.toml, will make you mine the map at ULTRA SPEED!
// To code reviewer, make sure this does not change in a PR to develop!
const MIN_CHUNK_SIZE = 16;

/**
 * @tutorial to speed up the game's background rendering code, it is possible to set this value to
 * be a higher power of two. This means that smaller chunks will be merged into larger chunks via
 * the algorithms implemented in {@link ChunkUtils}.
 *
 * {@code Math.floor(Math.pow(2, 16))} should be large enough for most.
 */
const MAX_CHUNK_SIZE = 2 ** 14;

const LOCATION_ID_UB = bigInt(
  '21888242871839275222246405745257275088548364400416034343698204186575808495617'
);

const competitiveConfig = '0xfe719a3cfccf2bcfa23f71f0af80a931eda4f4197331828d728b7505a6156930';

const tutorialConfig = '0xdccc97271cde9ad566db3a1e1d3d12220b04b595134bb7039b5606fdc57d82a1';

const roundStartTimestamp = '2022-07-13T00:00:00.000Z';

const roundEndTimestamp = '2022-07-20T00:00:00.000Z';

const bronzeTime = 4500; // 80 minutes in seconds

const silverTime = 3500; // 40 minutes in seconds

const goldTime = 2500; // 20 minutes in seconds

const OPTIMISM_GAS_LIMIT = 15000000;

const MAX_ADMIN_PLANETS = 30;

const CONFIG_CONSTANTS = `config{
  # CLAIM_PLANET_COOLDOWN,
  # INIT_PLANETS,
  ABANDON_RANGE_CHANGE_PERCENT,
  ABANDON_SPEED_CHANGE_PERCENT,
  ADMIN_CAN_ADD_PLANETS,
  ARTIFACT_POINT_VALUES,
  BIOME_THRESHOLD_1,
  BIOME_THRESHOLD_2,
  BIOMEBASE_KEY,
  BLOCK_CAPTURE,
  BLOCK_MOVES,
  CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL,
  CAPTURE_ZONE_COUNT,
  CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED,
  CAPTURE_ZONE_PLANET_LEVEL_SCORE,
  CAPTURE_ZONE_RADIUS,
  CAPTURE_ZONES_ENABLED,
  CAPTURE_ZONES_PER_5000_WORLD_RADIUS,
  CLAIM_VICTORY_ENERGY_PERCENT,
  CONFIRM_START,
  DISABLE_ZK_CHECKS,
  INIT_PERLIN_MAX,
  INIT_PERLIN_MIN,
  LOCATION_REVEAL_COOLDOWN,
  MANUAL_SPAWN,
  MAX_NATURAL_PLANET_LEVEL,
  MODIFIERS,
  NO_ADMIN,
  NUM_TEAMS,
  PERLIN_LENGTH_SCALE,
  PERLIN_MIRROR_X,
  PERLIN_MIRROR_Y,
  PERLIN_THRESHOLD_1,
  PERLIN_THRESHOLD_2,
  PERLIN_THRESHOLD_3,
  PHOTOID_ACTIVATION_DELAY,
  PLANET_LEVEL_JUNK,
  PLANET_LEVEL_THRESHOLDS,
  PLANET_RARITY,
  PLANET_TRANSFER_ENABLED,
  PLANET_TYPE_WEIGHTS,
  PLANETHASH_KEY,
  RANDOM_ARTIFACTS,
  RANKED,
  SILVER_SCORE_VALUE,
  SPACE_JUNK_ENABLED,
  SPACE_JUNK_LIMIT,
  SPACESHIPS,
  SPACETYPE_KEY,
  SPAWN_RIM_AREA,
  START_PAUSED,
  TARGET_PLANETS,
  TARGETS_REQUIRED_FOR_VICTORY,
  TEAMS_ENABLED,
  TIME_FACTOR_HUNDREDTHS,
  TOKEN_MINT_END_TIMESTAMP,
  WHITELIST_ENABLED,
  WORLD_RADIUS_LOCKED,
  WORLD_RADIUS_MIN,
},
planets(first: ${MAX_ADMIN_PLANETS}) {
  x,
  y,
  locationDec,
  perlin,
  level,
  planetType,
  targetPlanet,
  spawnPlanet,
  blockedPlanetIds {
    locationDec
    x
    y
  }
}`;

export {
  MIN_CHUNK_SIZE,
  MAX_CHUNK_SIZE,
  OPTIMISM_GAS_LIMIT,
  LOCATION_ID_UB,
  roundEndTimestamp,
  roundStartTimestamp,
  competitiveConfig,
  tutorialConfig,
  bronzeTime,
  silverTime,
  CONFIG_CONSTANTS,
  goldTime,
};

export const enum DFZIndex {
  MenuBar = 4,
  HoverPlanet = 1001,
  Modal = 1001,
  Tooltip = 16000000,
  Notification = 1000,
}
