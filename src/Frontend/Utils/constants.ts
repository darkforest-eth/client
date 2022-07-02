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

const competitiveConfig = '0xc8b6b767570b2e39b622c6d5a8c4ac65a61d50a94f4312ac171483c95b2ec996';

const roundStartTimestamp = '2022-07-02T00:00:00.000Z';

const roundEndTimestamp = '2022-07-04T00:00:00.000Z';

const bronzeTime = 4500; // 80 minutes in seconds

const silverTime = 3500; // 40 minutes in seconds

const goldTime = 2500; // 20 minutes in seconds

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
