import { Chunk, Rectangle, WorldCoords, WorldLocation } from '@darkforest_eth/types';
import { BucketId, ChunkId, PersistedChunk } from '../../_types/darkforest/api/ChunkStoreTypes';

/**
 * Deterministically assigns a bucket ID to a rectangle, based on its position and size in the
 * universe. This is kind of like a shitty hash function. Its purpose is to distribute chunks
 * roughly evenly between the buckets.
 */
export function getBucket(chunk: Rectangle): BucketId {
  const alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let sum =
    (Math.floor(chunk.bottomLeft.x / chunk.sideLength) +
      Math.floor(chunk.bottomLeft.y / chunk.sideLength)) %
    alphanumeric.length;
  if (sum < 0) sum += alphanumeric.length;
  return alphanumeric[sum] as BucketId;
}

/**
 * A unique ID generated for each chunk based on its rectangle, as well as its bucket. It's the
 * primary key by which chunks are identified.
 */
export function getChunkKey(chunkLoc: Rectangle): ChunkId {
  return (`${getBucket(chunkLoc)},` +
    `${chunkLoc.sideLength},` +
    `${chunkLoc.bottomLeft.x},` +
    `${chunkLoc.bottomLeft.y}`) as ChunkId;
}

/**
 * Converts from the in-game representation of a chunk to its persisted representation.
 */
export function toPersistedChunk(chunk: Chunk): PersistedChunk {
  const planetLocations = chunk.planetLocations.map((location) => ({
    x: location.coords.x,
    y: location.coords.y,
    h: location.hash,
    p: location.perlin,
    b: location.biomebase,
  }));

  return {
    x: chunk.chunkFootprint.bottomLeft.x,
    y: chunk.chunkFootprint.bottomLeft.y,
    s: chunk.chunkFootprint.sideLength,
    l: planetLocations,
    p: chunk.perlin,
  };
}

/**
 * Converts from the persisted representation of a chunk to the in-game representation of a chunk.
 */
export const toExploredChunk = (chunk: PersistedChunk): Chunk => {
  const planetLocations = chunk.l.map((location) => ({
    coords: { x: location.x, y: location.y },
    hash: location.h,
    perlin: location.p,
    biomebase: location.b,
  }));

  return {
    chunkFootprint: {
      bottomLeft: { x: chunk.x, y: chunk.y },
      sideLength: chunk.s,
    },
    planetLocations,
    perlin: chunk.p,
  };
};

/**
 * An aligned chunk is one whose corner's coordinates are multiples of its side length, and its side
 * length is a power of two between {@link MIN_CHUNK_SIZE} and {@link MAX_CHUNK_SIZE} inclusive.
 *
 * "Aligned" chunks is that they can be merged into other aligned chunks. Non-aligned chunks cannot
 * always be merged into squares. The reason we care about merging is that merging chunks allows us
 * to represent more world-space using fewer chunks. This saves memory at both runtime and
 * storage-time. Therefore, we only store aligned chunks.
 *
 * As an example, chunks with any corner at (0, 0) are always aligned. A chunk with side length 4 is
 * aligned if it's on (4, 4), (8, 12), but not (4, 6).
 *
 * This function returns the other three chunks with the same side length of the given chunk, such
 * that the four chunks, if merged, would result in an "aligned" chunk whose side length is double
 * the given chunk.
 */
export const getSiblingLocations = (chunkLoc: Rectangle): [Rectangle, Rectangle, Rectangle] => {
  const doubleSideLen = 2 * chunkLoc.sideLength;
  const newBottomLeftX = Math.floor(chunkLoc.bottomLeft.x / doubleSideLen) * doubleSideLen;
  const newBottomLeftY = Math.floor(chunkLoc.bottomLeft.y / doubleSideLen) * doubleSideLen;
  const newBottomLeft = { x: newBottomLeftX, y: newBottomLeftY };

  const siblingLocs: Rectangle[] = [];

  for (let i = 0; i < 2; i += 1) {
    for (let j = 0; j < 2; j += 1) {
      const x = newBottomLeft.x + i * chunkLoc.sideLength;
      const y = newBottomLeft.y + j * chunkLoc.sideLength;

      if (x === chunkLoc.bottomLeft.x && y === chunkLoc.bottomLeft.y) {
        continue;
      }

      siblingLocs.push({
        bottomLeft: { x, y },
        sideLength: chunkLoc.sideLength,
      });
    }
  }
  return [siblingLocs[0], siblingLocs[1], siblingLocs[2]];
};

/**
 * Returns the unique aligned chunk (for definition of "aligned" see comment on
 * `getSiblingLocations`) with the given side length that contains the given point. A chunk contains
 * all of the points strictly inside of its bounds, as well as the bottom and left edges. This means
 * it does not contain points which are on its right or top edges.
 */
export function getChunkOfSideLengthContainingPoint(
  coords: WorldCoords,
  sideLength: number
): Rectangle {
  return {
    sideLength,
    bottomLeft: {
      x: Math.floor(coords.x / sideLength) * sideLength,
      y: Math.floor(coords.y / sideLength) * sideLength,
    },
  };
}

/**
 * At a high level, call this function to update an efficient quadtree-like store containing all of
 * the chunks that a player has either mined or imported in their client.
 *
 * More speecifically, adds the given new chunk to the given map of chunks. If the map of chunks
 * contains all of the "sibling" chunks to this new chunk, then instead of adding it, we merge the 4
 * sibling chunks, and add the merged chunk to the map and remove the existing sibling chunks. This
 * function is recursive, which means that if the newly created merged chunk can also be merged with
 * its siblings, then we merge it, add the new larger chunk, and also remove the previously existing
 * sibling chunks.
 *
 * The maximum chunk size is represented by the `maxChunkSize` parameter (which has to be a power of
 * two). If no `maxChunkSize` parameter is provided, then there is no maxmimum chunk size, meaning
 * that chunks will be merged until no further merging is possible.
 *
 * `onAdd` and `onRemove` are called for each of the chunks that we add and remove to/from the
 * `existingChunks` map. `onAdd` will be called exactly once, whereas `onRemove` only ever be called
 * for sibling chunks that existed prior to this function being called.
 */
export function addToChunkMap(
  existingChunks: Map<ChunkId, Chunk>,
  newChunk: Chunk,
  onAdd?: (arg: Chunk) => void,
  onRemove?: (arg: Chunk) => void,
  maxChunkSize?: number
) {
  let sideLength = newChunk.chunkFootprint.sideLength;
  let chunkToAdd: Chunk = {
    chunkFootprint: {
      bottomLeft: newChunk.chunkFootprint.bottomLeft,
      sideLength,
    },
    planetLocations: [...newChunk.planetLocations],
    perlin: newChunk.perlin,
  };
  while (!maxChunkSize || sideLength < maxChunkSize) {
    const siblingLocs = getSiblingLocations(chunkToAdd.chunkFootprint);
    let siblingsMined = true;
    for (const siblingLoc of siblingLocs) {
      if (!existingChunks.get(getChunkKey(siblingLoc))) {
        siblingsMined = false;
        break;
      }
    }
    if (!siblingsMined) break;
    sideLength *= 2;
    let planetLocations: WorldLocation[] = chunkToAdd.planetLocations;
    let newPerlin = chunkToAdd.perlin / 4;
    for (const siblingLoc of siblingLocs) {
      const siblingKey = getChunkKey(siblingLoc);
      const sibling = existingChunks.get(siblingKey);
      if (onRemove !== undefined && sibling) {
        onRemove(sibling);
      } else {
        existingChunks.delete(siblingKey);
      }
      if (sibling) {
        planetLocations = planetLocations.concat(sibling.planetLocations);
        newPerlin += sibling.perlin / 4;
      }
    }
    const chunkFootprint = getChunkOfSideLengthContainingPoint(
      chunkToAdd.chunkFootprint.bottomLeft,
      sideLength
    );
    chunkToAdd = {
      chunkFootprint,
      planetLocations,
      perlin: Math.floor(newPerlin * 1000) / 1000,
    };
  }
  if (onAdd !== undefined) {
    onAdd(chunkToAdd);
  } else {
    existingChunks.set(getChunkKey(chunkToAdd.chunkFootprint), chunkToAdd);
  }
}
