# Class: HomePlanetMinerChunkStore

[Backend/Miner/MinerManager](../modules/backend_miner_minermanager.md).HomePlanetMinerChunkStore

## Implements

- [_ChunkStore_](../interfaces/_types_darkforest_api_chunkstoretypes.chunkstore.md)

## Table of contents

### Constructors

- [constructor](backend_miner_minermanager.homeplanetminerchunkstore.md#constructor)

### Properties

- [initPerlinMax](backend_miner_minermanager.homeplanetminerchunkstore.md#initperlinmax)
- [initPerlinMin](backend_miner_minermanager.homeplanetminerchunkstore.md#initperlinmin)
- [minedChunkKeys](backend_miner_minermanager.homeplanetminerchunkstore.md#minedchunkkeys)
- [perlinOptions](backend_miner_minermanager.homeplanetminerchunkstore.md#perlinoptions)

### Methods

- [addChunk](backend_miner_minermanager.homeplanetminerchunkstore.md#addchunk)
- [hasMinedChunk](backend_miner_minermanager.homeplanetminerchunkstore.md#hasminedchunk)

## Constructors

### constructor

\+ **new HomePlanetMinerChunkStore**(`initPerlinMin`: _number_, `initPerlinMax`: _number_, `hashConfig`: [_HashConfig_](../modules/_types_global_globaltypes.md#hashconfig)): [_HomePlanetMinerChunkStore_](backend_miner_minermanager.homeplanetminerchunkstore.md)

#### Parameters

| Name            | Type                                                               |
| :-------------- | :----------------------------------------------------------------- |
| `initPerlinMin` | _number_                                                           |
| `initPerlinMax` | _number_                                                           |
| `hashConfig`    | [_HashConfig_](../modules/_types_global_globaltypes.md#hashconfig) |

**Returns:** [_HomePlanetMinerChunkStore_](backend_miner_minermanager.homeplanetminerchunkstore.md)

## Properties

### initPerlinMax

• `Private` **initPerlinMax**: _number_

---

### initPerlinMin

• `Private` **initPerlinMin**: _number_

---

### minedChunkKeys

• `Private` **minedChunkKeys**: _Set_<string\>

---

### perlinOptions

• `Private` **perlinOptions**: PerlinConfig

## Methods

### addChunk

▸ **addChunk**(`exploredChunk`: [_Chunk_](_types_global_globaltypes.chunk.md)): _void_

#### Parameters

| Name            | Type                                          |
| :-------------- | :-------------------------------------------- |
| `exploredChunk` | [_Chunk_](_types_global_globaltypes.chunk.md) |

**Returns:** _void_

---

### hasMinedChunk

▸ **hasMinedChunk**(`chunkFootprint`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)): _boolean_

#### Parameters

| Name             | Type                                                                |
| :--------------- | :------------------------------------------------------------------ |
| `chunkFootprint` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |

**Returns:** _boolean_

Implementation of: ChunkStore.hasMinedChunk
