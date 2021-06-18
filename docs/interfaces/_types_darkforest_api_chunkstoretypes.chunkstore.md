# Interface: ChunkStore

[\_types/darkforest/api/ChunkStoreTypes](../modules/_types_darkforest_api_chunkstoretypes.md).ChunkStore

Abstract interface shared between different types of chunk stores. Currently we have one that
writes to IndexedDB, and one that simply throws away the data.

## Implemented by

- [_HomePlanetMinerChunkStore_](../classes/backend_miner_minermanager.homeplanetminerchunkstore.md)
- [_default_](../classes/backend_storage_persistentchunkstore.default.md)

## Table of contents

### Properties

- [hasMinedChunk](_types_darkforest_api_chunkstoretypes.chunkstore.md#hasminedchunk)

## Properties

### hasMinedChunk

• **hasMinedChunk**: (`chunkFootprint`: [_Rectangle_](_types_global_globaltypes.rectangle.md)) => _boolean_

#### Type declaration

▸ (`chunkFootprint`: [_Rectangle_](_types_global_globaltypes.rectangle.md)): _boolean_

#### Parameters

| Name             | Type                                                  |
| :--------------- | :---------------------------------------------------- |
| `chunkFootprint` | [_Rectangle_](_types_global_globaltypes.rectangle.md) |

**Returns:** _boolean_
