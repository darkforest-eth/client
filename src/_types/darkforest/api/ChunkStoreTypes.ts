import type { Abstract, LocationId, Rectangle } from '@darkforest_eth/types';

/**
 * one of "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
 */
export type BucketId = Abstract<string, 'BucketId'>;

/**
 * Don't worry about the values here. Never base code off the values here. PLEASE.
 */
export type ChunkId = Abstract<string, 'ChunkId'>;

/**
 * Chunks represent map data in some rectangle. This type represents a chunk when it is at rest in
 * IndexedDB. The reason for this type's existence is that we want to reduce the amount of data we
 * store on the user's computer. Shorter names hopefully means less data.
 */
export interface PersistedChunk {
  x: number; // left
  y: number; // bottom
  s: number; // side length
  l: PersistedLocation[];
  p: number; // approximate avg perlin value. used for rendering
}

/**
 * A location is a point sample of the universe. This type represents that point sample at rest when
 * it is stored in IndexedDB.
 */
export interface PersistedLocation {
  x: number;
  y: number;
  h: LocationId;
  p: number; // perlin
  b: number; // biomebase perlin
}

/**
 * Abstract interface shared between different types of chunk stores. Currently we have one that
 * writes to IndexedDB, and one that simply throws away the data.
 */
export interface ChunkStore {
  hasMinedChunk: (chunkFootprint: Rectangle) => boolean;
}
