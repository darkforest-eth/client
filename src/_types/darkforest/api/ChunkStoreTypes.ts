import { Rectangle, LocationId } from '../../global/GlobalTypes';

// (capital) alphanumeric character
// a "bucket" index deterministically generated from chunkX and chunkY
export type LSMBucket = string;

export interface LSMLoc {
  x: number;
  y: number;
  h: LocationId;
  p: number; // perlin
  b: number; // biomebase perlin
}

export interface LSMChunkData {
  x: number; // left
  y: number; // bottom
  s: number; // side length
  l: LSMLoc[];
  p: number; // approximate avg perlin value. used for rendering
}

export interface ChunkStore {
  hasMinedChunk: (chunkFootprint: Rectangle) => boolean;
}
