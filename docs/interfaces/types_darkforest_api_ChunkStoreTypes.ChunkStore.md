# Interface: ChunkStore

[\_types/darkforest/api/ChunkStoreTypes](../modules/types_darkforest_api_ChunkStoreTypes.md).ChunkStore

Abstract interface shared between different types of chunk stores. Currently we have one that
writes to IndexedDB, and one that simply throws away the data.

## Implemented by

- [`HomePlanetMinerChunkStore`](../classes/Backend_Miner_MinerManager.HomePlanetMinerChunkStore.md)
- [`default`](../classes/Backend_Storage_PersistentChunkStore.default.md)

## Table of contents

### Methods

- [hasMinedChunk](types_darkforest_api_ChunkStoreTypes.ChunkStore.md#hasminedchunk)

## Methods

### hasMinedChunk

▸ **hasMinedChunk**(`chunkFootprint`): `boolean`

#### Parameters

| Name             | Type        |
| :--------------- | :---------- |
| `chunkFootprint` | `Rectangle` |

#### Returns

`boolean`
