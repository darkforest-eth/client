# Class: default

[Backend/Miner/MinerManager](../modules/Backend_Miner_MinerManager.md).default

## Hierarchy

- `EventEmitter`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](Backend_Miner_MinerManager.default.md#constructor)

### Properties

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
- [workerFactory](Backend_Miner_MinerManager.default.md#workerfactory)
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

• `Private` **new default**(`minedChunksStore`, `miningPattern`, `worldRadius`, `planetRarity`, `hashConfig`, `useMockHash`, `workerFactory`)

#### Parameters

| Name               | Type                                                                             |
| :----------------- | :------------------------------------------------------------------------------- |
| `minedChunksStore` | [`ChunkStore`](../interfaces/types_darkforest_api_ChunkStoreTypes.ChunkStore.md) |
| `miningPattern`    | [`MiningPattern`](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md)   |
| `worldRadius`      | `number`                                                                         |
| `planetRarity`     | `number`                                                                         |
| `hashConfig`       | [`HashConfig`](../modules/types_global_GlobalTypes.md#hashconfig)                |
| `useMockHash`      | `boolean`                                                                        |
| `workerFactory`    | [`workerFactory`](../modules/Backend_Miner_MinerManager.md#workerfactory)        |

#### Overrides

EventEmitter.constructor

## Properties

### cores

• `Private` **cores**: `number` = `1`

---

### currentJobId

• `Private` **currentJobId**: `number` = `0`

---

### exploringChunk

• `Private` **exploringChunk**: `Object` = `{}`

#### Index signature

▪ [chunkKey: `string`]: `Chunk`

---

### exploringChunkStart

• `Private` **exploringChunkStart**: `Object` = `{}`

#### Index signature

▪ [chunkKey: `string`]: `number`

---

### hashConfig

• `Private` **hashConfig**: [`HashConfig`](../modules/types_global_GlobalTypes.md#hashconfig)

---

### isExploring

• `Private` **isExploring**: `boolean` = `false`

---

### minedChunksStore

• `Private` `Readonly` **minedChunksStore**: [`ChunkStore`](../interfaces/types_darkforest_api_ChunkStoreTypes.ChunkStore.md)

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

### workerFactory

• `Private` **workerFactory**: [`workerFactory`](../modules/Backend_Miner_MinerManager.md#workerfactory)

---

### workers

• `Private` **workers**: `Worker`[]

---

### worldRadius

• `Private` **worldRadius**: `number`

## Methods

### chunkKeyToLocation

▸ `Private` **chunkKeyToLocation**(`chunkKey`): `undefined` \| [`Rectangle`, `number`]

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `chunkKey` | `string` |

#### Returns

`undefined` \| [`Rectangle`, `number`]

---

### chunkLocationToKey

▸ `Private` **chunkLocationToKey**(`chunkLocation`, `jobId`): `string`

#### Parameters

| Name            | Type        |
| :-------------- | :---------- |
| `chunkLocation` | `Rectangle` |
| `jobId`         | `number`    |

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

| Name        | Type        |
| :---------- | :---------- |
| `fromChunk` | `Rectangle` |
| `jobId`     | `number`    |

#### Returns

`void`

---

### getCurrentlyExploringChunk

▸ **getCurrentlyExploringChunk**(): `undefined` \| `Rectangle`

#### Returns

`undefined` \| `Rectangle`

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

| Name            | Type        |
| :-------------- | :---------- |
| `chunkLocation` | `Rectangle` |

#### Returns

`boolean`

---

### nextValidExploreTarget

▸ `Private` **nextValidExploreTarget**(`chunkLocation`, `jobId`): `Promise`<`undefined` \| `Rectangle`\>

#### Parameters

| Name            | Type        |
| :-------------- | :---------- |
| `chunkLocation` | `Rectangle` |
| `jobId`         | `number`    |

#### Returns

`Promise`<`undefined` \| `Rectangle`\>

---

### onDiscovered

▸ `Private` **onDiscovered**(`exploredChunk`, `jobId`): `Promise`<`void`\>

#### Parameters

| Name            | Type     |
| :-------------- | :------- |
| `exploredChunk` | `Chunk`  |
| `jobId`         | `number` |

#### Returns

`Promise`<`void`\>

---

### sendMessageToWorkers

▸ `Private` **sendMessageToWorkers**(`chunkToExplore`, `jobId`): `void`

#### Parameters

| Name             | Type        |
| :--------------- | :---------- |
| `chunkToExplore` | `Rectangle` |
| `jobId`          | `number`    |

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

▸ `Static` **create**(`chunkStore`, `miningPattern`, `worldRadius`, `planetRarity`, `hashConfig`, `useMockHash?`, `workerFactory?`): [`default`](Backend_Miner_MinerManager.default.md)

#### Parameters

| Name            | Type                                                                             | Default value   |
| :-------------- | :------------------------------------------------------------------------------- | :-------------- |
| `chunkStore`    | [`ChunkStore`](../interfaces/types_darkforest_api_ChunkStoreTypes.ChunkStore.md) | `undefined`     |
| `miningPattern` | [`MiningPattern`](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md)   | `undefined`     |
| `worldRadius`   | `number`                                                                         | `undefined`     |
| `planetRarity`  | `number`                                                                         | `undefined`     |
| `hashConfig`    | [`HashConfig`](../modules/types_global_GlobalTypes.md#hashconfig)                | `undefined`     |
| `useMockHash`   | `boolean`                                                                        | `false`         |
| `workerFactory` | [`workerFactory`](../modules/Backend_Miner_MinerManager.md#workerfactory)        | `defaultWorker` |

#### Returns

[`default`](Backend_Miner_MinerManager.default.md)
