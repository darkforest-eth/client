# Class: default

[Backend/Miner/MinerManager](../modules/Backend_Miner_MinerManager.md).default

## Hierarchy

- `EventEmitter`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](Backend_Miner_MinerManager.default.md#constructor)

### Properties

- [WorkerCtor](Backend_Miner_MinerManager.default.md#workerctor)
- [cores](Backend_Miner_MinerManager.default.md#cores)
- [currentJobId](Backend_Miner_MinerManager.default.md#currentjobid)
- [exploringChunk](Backend_Miner_MinerManager.default.md#exploringchunk)
- [exploringChunkStart](Backend_Miner_MinerManager.default.md#exploringchunkstart)
- [hashConfig](Backend_Miner_MinerManager.default.md#hashconfig)
- [isExploring](Backend_Miner_MinerManager.default.md#isexploring)
- [minedChunksStore](Backend_Miner_MinerManager.default.md#minedchunksstore)
- [minersComplete](Backend_Miner_MinerManager.default.md#minerscomplete)
- [miningPattern](Backend_Miner_MinerManager.default.md#miningpattern)
- [perlinOptions](Backend_Miner_MinerManager.default.md#perlinoptions)
- [planetRarity](Backend_Miner_MinerManager.default.md#planetrarity)
- [useMockHash](Backend_Miner_MinerManager.default.md#usemockhash)
- [workers](Backend_Miner_MinerManager.default.md#workers)
- [worldRadius](Backend_Miner_MinerManager.default.md#worldradius)

### Methods

- [chunkKeyToLocation](Backend_Miner_MinerManager.default.md#chunkkeytolocation)
- [chunkLocationToKey](Backend_Miner_MinerManager.default.md#chunklocationtokey)
- [destroy](Backend_Miner_MinerManager.default.md#destroy)
- [exploreNext](Backend_Miner_MinerManager.default.md#explorenext)
- [getCurrentlyExploringChunk](Backend_Miner_MinerManager.default.md#getcurrentlyexploringchunk)
- [getMiningPattern](Backend_Miner_MinerManager.default.md#getminingpattern)
- [initWorker](Backend_Miner_MinerManager.default.md#initworker)
- [isMining](Backend_Miner_MinerManager.default.md#ismining)
- [isValidExploreTarget](Backend_Miner_MinerManager.default.md#isvalidexploretarget)
- [nextValidExploreTarget](Backend_Miner_MinerManager.default.md#nextvalidexploretarget)
- [onDiscovered](Backend_Miner_MinerManager.default.md#ondiscovered)
- [sendMessageToWorkers](Backend_Miner_MinerManager.default.md#sendmessagetoworkers)
- [setCores](Backend_Miner_MinerManager.default.md#setcores)
- [setMiningPattern](Backend_Miner_MinerManager.default.md#setminingpattern)
- [setRadius](Backend_Miner_MinerManager.default.md#setradius)
- [startExplore](Backend_Miner_MinerManager.default.md#startexplore)
- [stopExplore](Backend_Miner_MinerManager.default.md#stopexplore)
- [create](Backend_Miner_MinerManager.default.md#create)

## Constructors

### constructor

• `Private` **new default**(`minedChunksStore`, `miningPattern`, `worldRadius`, `planetRarity`, `hashConfig`, `useMockHash`, `WorkerCtor`)

#### Parameters

| Name               | Type                                                                              |
| :----------------- | :-------------------------------------------------------------------------------- |
| `minedChunksStore` | [`ChunkStore`](../interfaces/_types_darkforest_api_ChunkStoreTypes.ChunkStore.md) |
| `miningPattern`    | [`MiningPattern`](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md)    |
| `worldRadius`      | `number`                                                                          |
| `planetRarity`     | `number`                                                                          |
| `hashConfig`       | [`HashConfig`](../modules/_types_global_GlobalTypes.md#hashconfig)                |
| `useMockHash`      | `boolean`                                                                         |
| `WorkerCtor`       | typeof [`default`](_types_worker_loader_WorkerTypes.default.md)                   |

#### Overrides

EventEmitter.constructor

## Properties

### WorkerCtor

• `Private` **WorkerCtor**: typeof [`default`](_types_worker_loader_WorkerTypes.default.md)

---

### cores

• `Private` **cores**: `number` = `1`

---

### currentJobId

• `Private` **currentJobId**: `number` = `0`

---

### exploringChunk

• `Private` **exploringChunk**: `Object` = `{}`

#### Index signature

▪ [chunkKey: `string`]: [`Chunk`](_types_global_GlobalTypes.Chunk.md)

---

### exploringChunkStart

• `Private` **exploringChunkStart**: `Object` = `{}`

#### Index signature

▪ [chunkKey: `string`]: `number`

---

### hashConfig

• `Private` **hashConfig**: [`HashConfig`](../modules/_types_global_GlobalTypes.md#hashconfig)

---

### isExploring

• `Private` **isExploring**: `boolean` = `false`

---

### minedChunksStore

• `Private` `Readonly` **minedChunksStore**: [`ChunkStore`](../interfaces/_types_darkforest_api_ChunkStoreTypes.ChunkStore.md)

---

### minersComplete

• `Private` **minersComplete**: `Object` = `{}`

#### Index signature

▪ [chunkKey: `string`]: `number`

---

### miningPattern

• `Private` **miningPattern**: [`MiningPattern`](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md)

---

### perlinOptions

• `Private` **perlinOptions**: `PerlinConfig`

---

### planetRarity

• `Private` `Readonly` **planetRarity**: `number`

---

### useMockHash

• `Private` **useMockHash**: `boolean`

---

### workers

• `Private` **workers**: [`default`](_types_worker_loader_WorkerTypes.default.md)[]

---

### worldRadius

• `Private` **worldRadius**: `number`

## Methods

### chunkKeyToLocation

▸ `Private` **chunkKeyToLocation**(`chunkKey`): `undefined` \| [[`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md), `number`]

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `chunkKey` | `string` |

#### Returns

`undefined` \| [[`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md), `number`]

---

### chunkLocationToKey

▸ `Private` **chunkLocationToKey**(`chunkLocation`, `jobId`): `string`

#### Parameters

| Name            | Type                                                                |
| :-------------- | :------------------------------------------------------------------ |
| `chunkLocation` | [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md) |
| `jobId`         | `number`                                                            |

#### Returns

`string`

---

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

---

### exploreNext

▸ `Private` **exploreNext**(`fromChunk`, `jobId`): `void`

#### Parameters

| Name        | Type                                                                |
| :---------- | :------------------------------------------------------------------ |
| `fromChunk` | [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md) |
| `jobId`     | `number`                                                            |

#### Returns

`void`

---

### getCurrentlyExploringChunk

▸ **getCurrentlyExploringChunk**(): `undefined` \| [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md)

#### Returns

`undefined` \| [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md)

---

### getMiningPattern

▸ **getMiningPattern**(): [`MiningPattern`](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md)

#### Returns

[`MiningPattern`](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md)

---

### initWorker

▸ `Private` **initWorker**(`index`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `index` | `number` |

#### Returns

`void`

---

### isMining

▸ **isMining**(): `boolean`

#### Returns

`boolean`

---

### isValidExploreTarget

▸ `Private` **isValidExploreTarget**(`chunkLocation`): `boolean`

#### Parameters

| Name            | Type                                                                |
| :-------------- | :------------------------------------------------------------------ |
| `chunkLocation` | [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md) |

#### Returns

`boolean`

---

### nextValidExploreTarget

▸ `Private` **nextValidExploreTarget**(`chunkLocation`, `jobId`): `Promise`<`undefined` \| [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md)\>

#### Parameters

| Name            | Type                                                                |
| :-------------- | :------------------------------------------------------------------ |
| `chunkLocation` | [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md) |
| `jobId`         | `number`                                                            |

#### Returns

`Promise`<`undefined` \| [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md)\>

---

### onDiscovered

▸ `Private` **onDiscovered**(`exploredChunk`, `jobId`): `Promise`<`void`\>

#### Parameters

| Name            | Type                                          |
| :-------------- | :-------------------------------------------- |
| `exploredChunk` | [`Chunk`](_types_global_GlobalTypes.Chunk.md) |
| `jobId`         | `number`                                      |

#### Returns

`Promise`<`void`\>

---

### sendMessageToWorkers

▸ `Private` **sendMessageToWorkers**(`chunkToExplore`, `jobId`): `void`

#### Parameters

| Name             | Type                                                                |
| :--------------- | :------------------------------------------------------------------ |
| `chunkToExplore` | [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md) |
| `jobId`          | `number`                                                            |

#### Returns

`void`

---

### setCores

▸ **setCores**(`nCores`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `nCores` | `number` |

#### Returns

`void`

---

### setMiningPattern

▸ **setMiningPattern**(`pattern`): `void`

#### Parameters

| Name      | Type                                                                           |
| :-------- | :----------------------------------------------------------------------------- |
| `pattern` | [`MiningPattern`](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md) |

#### Returns

`void`

---

### setRadius

▸ **setRadius**(`radius`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `radius` | `number` |

#### Returns

`void`

---

### startExplore

▸ **startExplore**(): `void`

#### Returns

`void`

---

### stopExplore

▸ **stopExplore**(): `void`

#### Returns

`void`

---

### create

▸ `Static` **create**(`chunkStore`, `miningPattern`, `worldRadius`, `planetRarity`, `hashConfig`, `useMockHash?`, `WorkerCtor?`): [`default`](Backend_Miner_MinerManager.default.md)

#### Parameters

| Name            | Type                                                                              | Default value |
| :-------------- | :-------------------------------------------------------------------------------- | :------------ |
| `chunkStore`    | [`ChunkStore`](../interfaces/_types_darkforest_api_ChunkStoreTypes.ChunkStore.md) | `undefined`   |
| `miningPattern` | [`MiningPattern`](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md)    | `undefined`   |
| `worldRadius`   | `number`                                                                          | `undefined`   |
| `planetRarity`  | `number`                                                                          | `undefined`   |
| `hashConfig`    | [`HashConfig`](../modules/_types_global_GlobalTypes.md#hashconfig)                | `undefined`   |
| `useMockHash`   | `boolean`                                                                         | `false`       |
| `WorkerCtor`    | typeof [`default`](_types_worker_loader_WorkerTypes.default.md)                   | `undefined`   |

#### Returns

[`default`](Backend_Miner_MinerManager.default.md)
