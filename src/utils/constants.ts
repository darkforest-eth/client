import * as bigInt from 'big-integer';

const MIN_CHUNK_SIZE = 16;
const MAX_CHUNK_SIZE = 256;
const LOCATION_ID_UB = bigInt(
  '21888242871839275222246405745257275088548364400416034343698204186575808495617'
);

export { MIN_CHUNK_SIZE, MAX_CHUNK_SIZE, LOCATION_ID_UB };

// no slash at end plz
export const BLOCK_EXPLORER_URL = 'https://blockscout.com/poa/xdai';

export const XDAI_CHAIN_ID = 100;

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
];
