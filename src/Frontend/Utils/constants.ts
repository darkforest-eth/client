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

export { MIN_CHUNK_SIZE, MAX_CHUNK_SIZE, LOCATION_ID_UB };

export const HAT_SIZES = [
  'None',
  'Tiny HAT',
  'Small HAT',
  'Medium HAT',
  'Large HAT',
  'Huge HAT',
  'Mega HAT',
  'Enormous HAT',
  'Titanic HAT',
  'Legendary HAT',
  'Almighty HAT',
  'Cosmic HAT',
  'Celestial HAT',
  'Empyrean HAT',
  'Ethereal HAT',
  'Transcendental HAT',
  'haaaat',
  'HAAAAT',
];

export const enum GameWindowZIndex {
  MenuBar = 4,
  HoverPlanet = 999,
  Modal = 1000,
  Tooltip = 16000000,
}
