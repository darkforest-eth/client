import {
  LSMBucket,
  LSMChunkData,
  LSMLoc,
} from '../_types/darkforest/api/ChunkStoreTypes';
import {
  Rectangle,
  ExploredChunkData,
  Location,
} from '../_types/global/GlobalTypes';
import { WorldCoords } from './Coordinates';

export const getBucket: (chunk: Rectangle) => LSMBucket = (chunk) => {
  const alphanumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let sum =
    (Math.floor(chunk.bottomLeft.x / chunk.sideLength) +
      Math.floor(chunk.bottomLeft.y / chunk.sideLength)) %
    alphanumeric.length;
  if (sum < 0) sum += alphanumeric.length;
  return alphanumeric[sum];
};

export const getChunkKey = (chunkLoc: Rectangle) => {
  const ret =
    `${getBucket(chunkLoc)},` +
    `${chunkLoc.sideLength},` +
    `${chunkLoc.bottomLeft.x},` +
    `${chunkLoc.bottomLeft.y}`;
  return ret;
};

export const toLSMChunk = (chunk: ExploredChunkData) => {
  const lsmLocs: LSMLoc[] = [];
  const { chunkFootprint: chunkLocation } = chunk;
  for (const location of chunk.planetLocations) {
    lsmLocs.push({
      x: location.coords.x,
      y: location.coords.y,
      h: location.hash,
      p: location.perlin,
      b: location.biomebase,
    });
  }
  const ret: LSMChunkData = {
    x: chunkLocation.bottomLeft.x,
    y: chunkLocation.bottomLeft.y,
    s: chunkLocation.sideLength,
    l: lsmLocs,
    p: chunk.perlin,
  };
  return ret;
};

export const toExploredChunk = (chunk: LSMChunkData) => {
  const planetLocs: Location[] = [];
  for (const lsmLoc of chunk.l) {
    planetLocs.push({
      coords: { x: lsmLoc.x, y: lsmLoc.y },
      hash: lsmLoc.h,
      perlin: lsmLoc.p,
      biomebase: lsmLoc.b,
    });
  }
  const ret: ExploredChunkData = {
    chunkFootprint: {
      bottomLeft: { x: chunk.x, y: chunk.y },
      sideLength: chunk.s,
    },
    planetLocations: planetLocs,
    perlin: chunk.p,
  };
  return ret;
};

export const getSiblingLocations = (chunkLoc: Rectangle) => {
  const doubleSideLen = 2 * chunkLoc.sideLength;
  const newBottomLeftX =
    Math.floor(chunkLoc.bottomLeft.x / doubleSideLen) * doubleSideLen;
  const newBottomLeftY =
    Math.floor(chunkLoc.bottomLeft.y / doubleSideLen) * doubleSideLen;
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
  const ret: [Rectangle, Rectangle, Rectangle] = [
    siblingLocs[0],
    siblingLocs[1],
    siblingLocs[2],
  ];
  return ret; // necessary for typescript type inference
};

export const getChunkOfSideLength = (
  coords: WorldCoords,
  sideLength: number
) => {
  const oldBottomLeftX = coords.x;
  const oldBottomLeftY = coords.y;
  const ret: Rectangle = {
    sideLength,
    bottomLeft: {
      x: Math.floor(oldBottomLeftX / sideLength) * sideLength,
      y: Math.floor(oldBottomLeftY / sideLength) * sideLength,
    },
  };
  return ret;
};

export const addToChunkMap = (
  map: Map<string, ExploredChunkData>,
  chunk: ExploredChunkData,
  includePlanets = true,
  onAdd?: (arg: ExploredChunkData) => void,
  onRemove?: (arg: ExploredChunkData) => void,
  maxChunkSize?: number
) => {
  let sideLength = chunk.chunkFootprint.sideLength;
  let chunkToAdd: ExploredChunkData = {
    chunkFootprint: {
      bottomLeft: chunk.chunkFootprint.bottomLeft,
      sideLength,
    },
    planetLocations: includePlanets ? [...chunk.planetLocations] : [],
    perlin: chunk.perlin,
  };
  while (!maxChunkSize || sideLength < maxChunkSize) {
    const siblingLocs = getSiblingLocations(chunkToAdd.chunkFootprint);
    let siblingsMined = true;
    for (const siblingLoc of siblingLocs) {
      if (!map.get(getChunkKey(siblingLoc))) {
        siblingsMined = false;
        break;
      }
    }
    if (!siblingsMined) break;
    sideLength *= 2;
    let planetLocations: Location[] = chunkToAdd.planetLocations;
    let newPerlin = chunkToAdd.perlin / 4;
    for (const siblingLoc of siblingLocs) {
      const siblingKey = getChunkKey(siblingLoc);
      const sibling = map.get(siblingKey);
      if (onRemove !== undefined && sibling) {
        onRemove(sibling);
      } else {
        map.delete(siblingKey);
      }
      if (sibling) {
        if (includePlanets) {
          planetLocations = planetLocations.concat(sibling.planetLocations);
        }
        newPerlin += sibling.perlin / 4;
      }
    }
    const chunkFootprint = getChunkOfSideLength(
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
    map.set(getChunkKey(chunkToAdd.chunkFootprint), chunkToAdd);
  }
};
