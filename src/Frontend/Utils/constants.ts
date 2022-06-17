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

const competitiveConfig = '0x58975a691f8765ef71b7ffd9f6d64fa3d22aa1bb046265984a07fb30f7ddad33';

const roundStartTimestamp = '2022-06-18T00:00:00.000Z';

const roundEndTimestamp = '2022-06-21T00:00:00.000Z';

const bronzeTime = 80 * 60; // 80 minutes in seconds

const silverTime = 40 * 60 // 40 minutes in seconds

const goldTime = 20 * 60; // 20 minutes in seconds

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
