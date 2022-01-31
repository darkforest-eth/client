# Class: HomePlanetMinerChunkStore

[Backend/Miner/MinerManager](../modules/Backend_Miner_MinerManager.md).HomePlanetMinerChunkStore

## Implements

- [`ChunkStore`](../interfaces/_types_darkforest_api_ChunkStoreTypes.ChunkStore.md)

## Table of contents

### Constructors

- [constructor](Backend_Miner_MinerManager.HomePlanetMinerChunkStore.md#constructor)

### Properties

- [initPerlinMax](Backend_Miner_MinerManager.HomePlanetMinerChunkStore.md#initperlinmax)
- [initPerlinMin](Backend_Miner_MinerManager.HomePlanetMinerChunkStore.md#initperlinmin)
- [minedChunkKeys](Backend_Miner_MinerManager.HomePlanetMinerChunkStore.md#minedchunkkeys)
- [perlinOptions](Backend_Miner_MinerManager.HomePlanetMinerChunkStore.md#perlinoptions)

### Methods

- [addChunk](Backend_Miner_MinerManager.HomePlanetMinerChunkStore.md#addchunk)
- [hasMinedChunk](Backend_Miner_MinerManager.HomePlanetMinerChunkStore.md#hasminedchunk)

## Constructors

### constructor

• **new HomePlanetMinerChunkStore**(`initPerlinMin`, `initPerlinMax`, `hashConfig`)

#### Parameters

| Name            | Type                                                               |
| :-------------- | :----------------------------------------------------------------- |
| `initPerlinMin` | `number`                                                           |
| `initPerlinMax` | `number`                                                           |
| `hashConfig`    | [`HashConfig`](../modules/_types_global_GlobalTypes.md#hashconfig) |

## Properties

### initPerlinMax

• `Private` **initPerlinMax**: `number`

---

### initPerlinMin

• `Private` **initPerlinMin**: `number`

---

### minedChunkKeys

• `Private` **minedChunkKeys**: `Set`<`string`\>

---

### perlinOptions

• `Private` **perlinOptions**: `PerlinConfig`

## Methods

### addChunk

▸ **addChunk**(`exploredChunk`): `void`

#### Parameters

| Name            | Type                                          |
| :-------------- | :-------------------------------------------- |
| `exploredChunk` | [`Chunk`](_types_global_GlobalTypes.Chunk.md) |

#### Returns

`void`

---

### hasMinedChunk

▸ **hasMinedChunk**(`chunkFootprint`): `boolean`

#### Parameters

| Name             | Type                                                                |
| :--------------- | :------------------------------------------------------------------ |
| `chunkFootprint` | [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md) |

#### Returns

`boolean`

#### Implementation of

[ChunkStore](../interfaces/_types_darkforest_api_ChunkStoreTypes.ChunkStore.md).[hasMinedChunk](../interfaces/_types_darkforest_api_ChunkStoreTypes.ChunkStore.md#hasminedchunk)
