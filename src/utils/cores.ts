import { MIN_CHUNK_SIZE, MAX_CHUNK_SIZE } from './constants'

const DEFAULT_CORES = 1;

const isValidCores = (cores: number) => 
  cores <= 16 && cores > 0

export const deriveChunkSize = (cores: number) =>
  Math.min(MAX_CHUNK_SIZE, cores * MIN_CHUNK_SIZE)

export const parseCoresInput = (cores: any) => {
  if (!cores || cores === null) return DEFAULT_CORES;

  if (typeof(cores) === 'string') {
    const intCores = parseInt(cores)
    return isValidCores(intCores) ? intCores : DEFAULT_CORES
  } else if (typeof(cores) === 'number') {
    return isValidCores(cores) ? cores : DEFAULT_CORES;
  }
  return DEFAULT_CORES
}
