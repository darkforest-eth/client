# Module: Backend/Miner/ChunkUtils

## Table of contents

### Functions

- [addToChunkMap](Backend_Miner_ChunkUtils.md#addtochunkmap)
- [getBucket](Backend_Miner_ChunkUtils.md#getbucket)
- [getChunkKey](Backend_Miner_ChunkUtils.md#getchunkkey)
- [getChunkOfSideLengthContainingPoint](Backend_Miner_ChunkUtils.md#getchunkofsidelengthcontainingpoint)
- [getSiblingLocations](Backend_Miner_ChunkUtils.md#getsiblinglocations)
- [toExploredChunk](Backend_Miner_ChunkUtils.md#toexploredchunk)
- [toPersistedChunk](Backend_Miner_ChunkUtils.md#topersistedchunk)

## Functions

### addToChunkMap

▸ **addToChunkMap**(`existingChunks`, `newChunk`, `onAdd?`, `onRemove?`, `maxChunkSize?`): `void`

At a high level, call this function to update an efficient quadtree-like store containing all of
the chunks that a player has either mined or imported in their client.

More speecifically, adds the given new chunk to the given map of chunks. If the map of chunks
contains all of the "sibling" chunks to this new chunk, then instead of adding it, we merge the 4
sibling chunks, and add the merged chunk to the map and remove the existing sibling chunks. This
function is recursive, which means that if the newly created merged chunk can also be merged with
its siblings, then we merge it, add the new larger chunk, and also remove the previously existing
sibling chunks.

The maximum chunk size is represented by the `maxChunkSize` parameter (which has to be a power of
two). If no `maxChunkSize` parameter is provided, then there is no maxmimum chunk size, meaning
that chunks will be merged until no further merging is possible.

`onAdd` and `onRemove` are called for each of the chunks that we add and remove to/from the
`existingChunks` map. `onAdd` will be called exactly once, whereas `onRemove` only ever be called
for sibling chunks that existed prior to this function being called.

#### Parameters

| Name             | Type                                                                          |
| :--------------- | :---------------------------------------------------------------------------- |
| `existingChunks` | `Map`<[`ChunkId`](types_darkforest_api_ChunkStoreTypes.md#chunkid), `Chunk`\> |
| `newChunk`       | `Chunk`                                                                       |
| `onAdd?`         | (`arg`: `Chunk`) => `void`                                                    |
| `onRemove?`      | (`arg`: `Chunk`) => `void`                                                    |
| `maxChunkSize?`  | `number`                                                                      |

#### Returns

`void`

---

### getBucket

▸ **getBucket**(`chunk`): [`BucketId`](types_darkforest_api_ChunkStoreTypes.md#bucketid)

Deterministically assigns a bucket ID to a rectangle, based on its position and size in the
universe. This is kind of like a shitty hash function. Its purpose is to distribute chunks
roughly evenly between the buckets.

#### Parameters

| Name    | Type        |
| :------ | :---------- |
| `chunk` | `Rectangle` |

#### Returns

[`BucketId`](types_darkforest_api_ChunkStoreTypes.md#bucketid)

---

### getChunkKey

▸ **getChunkKey**(`chunkLoc`): [`ChunkId`](types_darkforest_api_ChunkStoreTypes.md#chunkid)

A unique ID generated for each chunk based on its rectangle, as well as its bucket. It's the
primary key by which chunks are identified.

#### Parameters

| Name       | Type        |
| :--------- | :---------- |
| `chunkLoc` | `Rectangle` |

#### Returns

[`ChunkId`](types_darkforest_api_ChunkStoreTypes.md#chunkid)

---

### getChunkOfSideLengthContainingPoint

▸ **getChunkOfSideLengthContainingPoint**(`coords`, `sideLength`): `Rectangle`

Returns the unique aligned chunk (for definition of "aligned" see comment on
`getSiblingLocations`) with the given side length that contains the given point. A chunk contains
all of the points strictly inside of its bounds, as well as the bottom and left edges. This means
it does not contain points which are on its right or top edges.

#### Parameters

| Name         | Type          |
| :----------- | :------------ |
| `coords`     | `WorldCoords` |
| `sideLength` | `number`      |

#### Returns

`Rectangle`

---

### getSiblingLocations

▸ **getSiblingLocations**(`chunkLoc`): [`Rectangle`, `Rectangle`, `Rectangle`]

An aligned chunk is one whose corner's coordinates are multiples of its side length, and its side
length is a power of two between [MIN_CHUNK_SIZE](Frontend_Utils_constants.md#min_chunk_size) and [MAX_CHUNK_SIZE](Frontend_Utils_constants.md#max_chunk_size) inclusive.

"Aligned" chunks is that they can be merged into other aligned chunks. Non-aligned chunks cannot
always be merged into squares. The reason we care about merging is that merging chunks allows us
to represent more world-space using fewer chunks. This saves memory at both runtime and
storage-time. Therefore, we only store aligned chunks.

As an example, chunks with any corner at (0, 0) are always aligned. A chunk with side length 4 is
aligned if it's on (4, 4), (8, 12), but not (4, 6).

This function returns the other three chunks with the same side length of the given chunk, such
that the four chunks, if merged, would result in an "aligned" chunk whose side length is double
the given chunk.

#### Parameters

| Name       | Type        |
| :--------- | :---------- |
| `chunkLoc` | `Rectangle` |

#### Returns

[`Rectangle`, `Rectangle`, `Rectangle`]

---

### toExploredChunk

▸ **toExploredChunk**(`chunk`): `Chunk`

Converts from the persisted representation of a chunk to the in-game representation of a chunk.

#### Parameters

| Name    | Type                                                                                     |
| :------ | :--------------------------------------------------------------------------------------- |
| `chunk` | [`PersistedChunk`](../interfaces/types_darkforest_api_ChunkStoreTypes.PersistedChunk.md) |

#### Returns

`Chunk`

---

### toPersistedChunk

▸ **toPersistedChunk**(`chunk`): [`PersistedChunk`](../interfaces/types_darkforest_api_ChunkStoreTypes.PersistedChunk.md)

Converts from the in-game representation of a chunk to its persisted representation.

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `chunk` | `Chunk` |

#### Returns

[`PersistedChunk`](../interfaces/types_darkforest_api_ChunkStoreTypes.PersistedChunk.md)
