# Module: Backend/Miner/ChunkUtils

## Table of contents

### Functions

- [addToChunkMap](backend_miner_chunkutils.md#addtochunkmap)
- [getBucket](backend_miner_chunkutils.md#getbucket)
- [getChunkKey](backend_miner_chunkutils.md#getchunkkey)
- [getChunkOfSideLengthContainingPoint](backend_miner_chunkutils.md#getchunkofsidelengthcontainingpoint)
- [getSiblingLocations](backend_miner_chunkutils.md#getsiblinglocations)
- [toExploredChunk](backend_miner_chunkutils.md#toexploredchunk)
- [toPersistedChunk](backend_miner_chunkutils.md#topersistedchunk)

## Functions

### addToChunkMap

▸ **addToChunkMap**(`existingChunks`: _Map_<[_ChunkId_](_types_darkforest_api_chunkstoretypes.md#chunkid), [_Chunk_](../classes/_types_global_globaltypes.chunk.md)\>, `newChunk`: [_Chunk_](../classes/_types_global_globaltypes.chunk.md), `onAdd?`: (`arg`: [_Chunk_](../classes/_types_global_globaltypes.chunk.md)) => _void_, `onRemove?`: (`arg`: [_Chunk_](../classes/_types_global_globaltypes.chunk.md)) => _void_, `maxChunkSize?`: _number_): _void_

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

| Name             | Type                                                                                                                            |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `existingChunks` | _Map_<[_ChunkId_](_types_darkforest_api_chunkstoretypes.md#chunkid), [_Chunk_](../classes/_types_global_globaltypes.chunk.md)\> |
| `newChunk`       | [_Chunk_](../classes/_types_global_globaltypes.chunk.md)                                                                        |
| `onAdd?`         | (`arg`: [_Chunk_](../classes/_types_global_globaltypes.chunk.md)) => _void_                                                     |
| `onRemove?`      | (`arg`: [_Chunk_](../classes/_types_global_globaltypes.chunk.md)) => _void_                                                     |
| `maxChunkSize?`  | _number_                                                                                                                        |

**Returns:** _void_

---

### getBucket

▸ **getBucket**(`chunk`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)): [_BucketId_](_types_darkforest_api_chunkstoretypes.md#bucketid)

Deterministically assigns a bucket ID to a rectangle, based on its position and size in the
universe. This is kind of like a shitty hash function. Its purpose is to distribute chunks
roughly evenly between the buckets.

#### Parameters

| Name    | Type                                                                |
| :------ | :------------------------------------------------------------------ |
| `chunk` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |

**Returns:** [_BucketId_](_types_darkforest_api_chunkstoretypes.md#bucketid)

---

### getChunkKey

▸ **getChunkKey**(`chunkLoc`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)): [_ChunkId_](_types_darkforest_api_chunkstoretypes.md#chunkid)

A unique ID generated for each chunk based on its rectangle, as well as its bucket. It's the
primary key by which chunks are identified.

#### Parameters

| Name       | Type                                                                |
| :--------- | :------------------------------------------------------------------ |
| `chunkLoc` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |

**Returns:** [_ChunkId_](_types_darkforest_api_chunkstoretypes.md#chunkid)

---

### getChunkOfSideLengthContainingPoint

▸ **getChunkOfSideLengthContainingPoint**(`coords`: WorldCoords, `sideLength`: _number_): [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)

Returns the unique aligned chunk (for definition of "aligned" see comment on
`getSiblingLocations`) with the given side length that contains the given point. A chunk contains
all of the points strictly inside of its bounds, as well as the bottom and left edges. This means
it does not contain points which are on its right or top edges.

#### Parameters

| Name         | Type        |
| :----------- | :---------- |
| `coords`     | WorldCoords |
| `sideLength` | _number_    |

**Returns:** [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)

---

### getSiblingLocations

▸ `Const` **getSiblingLocations**(`chunkLoc`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)): [[_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md), [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md), [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)]

An aligned chunk is one whose corner's coordinates are multiples of its side length, and its side
length is a power of two between [MIN_CHUNK_SIZE](frontend_utils_constants.md#min_chunk_size) and [MAX_CHUNK_SIZE](frontend_utils_constants.md#max_chunk_size) inclusive.

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

| Name       | Type                                                                |
| :--------- | :------------------------------------------------------------------ |
| `chunkLoc` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |

**Returns:** [[_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md), [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md), [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)]

---

### toExploredChunk

▸ `Const` **toExploredChunk**(`chunk`: [_PersistedChunk_](../interfaces/_types_darkforest_api_chunkstoretypes.persistedchunk.md)): [_Chunk_](../classes/_types_global_globaltypes.chunk.md)

Converts from the persisted representation of a chunk to the in-game representation of a chunk.

#### Parameters

| Name    | Type                                                                                      |
| :------ | :---------------------------------------------------------------------------------------- |
| `chunk` | [_PersistedChunk_](../interfaces/_types_darkforest_api_chunkstoretypes.persistedchunk.md) |

**Returns:** [_Chunk_](../classes/_types_global_globaltypes.chunk.md)

---

### toPersistedChunk

▸ **toPersistedChunk**(`chunk`: [_Chunk_](../classes/_types_global_globaltypes.chunk.md)): [_PersistedChunk_](../interfaces/_types_darkforest_api_chunkstoretypes.persistedchunk.md)

Converts from the in-game representation of a chunk to its persisted representation.

#### Parameters

| Name    | Type                                                     |
| :------ | :------------------------------------------------------- |
| `chunk` | [_Chunk_](../classes/_types_global_globaltypes.chunk.md) |

**Returns:** [_PersistedChunk_](../interfaces/_types_darkforest_api_chunkstoretypes.persistedchunk.md)
