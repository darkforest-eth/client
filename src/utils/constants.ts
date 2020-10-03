import * as bigInt from 'big-integer';
import { deriveChunkSize, parseCoresInput } from './cores';

const MIN_CHUNK_SIZE = 16;
const MAX_CHUNK_SIZE = 256;
const LOCATION_ID_UB = bigInt(
  '21888242871839275222246405745257275088548364400416034343698204186575808495617'
);
const CORES_TO_USE = parseCoresInput(typeof window !== "undefined" ? window.localStorage.getItem('CORES_TO_USE') : 1)

const DERIVED_CHUNK_SIZE = deriveChunkSize(CORES_TO_USE)
console.debug('[CORES_TO_USE]: ', CORES_TO_USE, DERIVED_CHUNK_SIZE)
export { MIN_CHUNK_SIZE, DERIVED_CHUNK_SIZE, MAX_CHUNK_SIZE, CORES_TO_USE, LOCATION_ID_UB };

// no slash at end plz
export const BLOCK_EXPLORER_URL = 'https://blockscout.com/poa/xdai';
