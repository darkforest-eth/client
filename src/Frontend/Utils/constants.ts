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

const competitiveConfig = '0x38329f176da42d2c89b7e424175e8b0ab3c9008cb0d98f947857884d76c6d9d2';

const roundStartTimestamp = '2022-06-11T00:00:00.000Z';

const roundEndTimestamp = '2022-06-13T00:00:00.000Z';

const bronzeTime = 5400; // 90 minutes in seconds

const silverTime = 3600; // 1 hour in seconds

const goldTime = 1800; // 30 minutes in seconds

export {
  MIN_CHUNK_SIZE,
  MAX_CHUNK_SIZE,
  LOCATION_ID_UB,
  roundEndTimestamp,
  roundStartTimestamp,
  competitiveConfig,
  bronzeTime,
  silverTime,
  goldTime
};

export const enum DFZIndex {
  MenuBar = 4,
  HoverPlanet = 1001,
  Modal = 1001,
  Tooltip = 16000000,
  Notification = 1000,
}
