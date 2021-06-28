# Class: default

[Backend/Miner/MinerManager](../modules/backend_miner_minermanager.md).default

## Hierarchy

- _EventEmitter_

  ↳ **default**

## Table of contents

### Constructors

- [constructor](backend_miner_minermanager.default.md#constructor)

### Properties

- [WorkerCtor](backend_miner_minermanager.default.md#workerctor)
- [cores](backend_miner_minermanager.default.md#cores)
- [currentJobId](backend_miner_minermanager.default.md#currentjobid)
- [exploringChunk](backend_miner_minermanager.default.md#exploringchunk)
- [exploringChunkStart](backend_miner_minermanager.default.md#exploringchunkstart)
- [hashConfig](backend_miner_minermanager.default.md#hashconfig)
- [isExploring](backend_miner_minermanager.default.md#isexploring)
- [minedChunksStore](backend_miner_minermanager.default.md#minedchunksstore)
- [minersComplete](backend_miner_minermanager.default.md#minerscomplete)
- [miningPattern](backend_miner_minermanager.default.md#miningpattern)
- [perlinOptions](backend_miner_minermanager.default.md#perlinoptions)
- [planetRarity](backend_miner_minermanager.default.md#planetrarity)
- [useMockHash](backend_miner_minermanager.default.md#usemockhash)
- [workers](backend_miner_minermanager.default.md#workers)
- [worldRadius](backend_miner_minermanager.default.md#worldradius)

### Methods

- [chunkKeyToLocation](backend_miner_minermanager.default.md#chunkkeytolocation)
- [chunkLocationToKey](backend_miner_minermanager.default.md#chunklocationtokey)
- [destroy](backend_miner_minermanager.default.md#destroy)
- [exploreNext](backend_miner_minermanager.default.md#explorenext)
- [getCurrentlyExploringChunk](backend_miner_minermanager.default.md#getcurrentlyexploringchunk)
- [getMiningPattern](backend_miner_minermanager.default.md#getminingpattern)
- [initWorker](backend_miner_minermanager.default.md#initworker)
- [isMining](backend_miner_minermanager.default.md#ismining)
- [isValidExploreTarget](backend_miner_minermanager.default.md#isvalidexploretarget)
- [nextValidExploreTarget](backend_miner_minermanager.default.md#nextvalidexploretarget)
- [onDiscovered](backend_miner_minermanager.default.md#ondiscovered)
- [sendMessageToWorkers](backend_miner_minermanager.default.md#sendmessagetoworkers)
- [setCores](backend_miner_minermanager.default.md#setcores)
- [setMiningPattern](backend_miner_minermanager.default.md#setminingpattern)
- [setRadius](backend_miner_minermanager.default.md#setradius)
- [startExplore](backend_miner_minermanager.default.md#startexplore)
- [stopExplore](backend_miner_minermanager.default.md#stopexplore)
- [create](backend_miner_minermanager.default.md#create)

## Constructors

### constructor

\+ `Private` **new default**(`minedChunksStore`: [_ChunkStore_](../interfaces/_types_darkforest_api_chunkstoretypes.chunkstore.md), `miningPattern`: [_MiningPattern_](../interfaces/backend_miner_miningpatterns.miningpattern.md), `worldRadius`: _number_, `planetRarity`: _number_, `hashConfig`: [_HashConfig_](../modules/_types_global_globaltypes.md#hashconfig), `useMockHash`: _boolean_, `WorkerCtor`: _typeof_ [_default_](_types_worker_loader_workertypes.default.md)): [_default_](backend_miner_minermanager.default.md)

#### Parameters

| Name               | Type                                                                              |
| :----------------- | :-------------------------------------------------------------------------------- |
| `minedChunksStore` | [_ChunkStore_](../interfaces/_types_darkforest_api_chunkstoretypes.chunkstore.md) |
| `miningPattern`    | [_MiningPattern_](../interfaces/backend_miner_miningpatterns.miningpattern.md)    |
| `worldRadius`      | _number_                                                                          |
| `planetRarity`     | _number_                                                                          |
| `hashConfig`       | [_HashConfig_](../modules/_types_global_globaltypes.md#hashconfig)                |
| `useMockHash`      | _boolean_                                                                         |
| `WorkerCtor`       | _typeof_ [_default_](_types_worker_loader_workertypes.default.md)                 |

**Returns:** [_default_](backend_miner_minermanager.default.md)

Overrides: EventEmitter.constructor

## Properties

### WorkerCtor

• `Private` **WorkerCtor**: _typeof_ [_default_](_types_worker_loader_workertypes.default.md)

---

### cores

• `Private` **cores**: _number_= 1

---

### currentJobId

• `Private` **currentJobId**: _number_= 0

---

### exploringChunk

• `Private` **exploringChunk**: _object_= {}

#### Type declaration

---

### exploringChunkStart

• `Private` **exploringChunkStart**: _object_= {}

#### Type declaration

---

### hashConfig

• `Private` **hashConfig**: [_HashConfig_](../modules/_types_global_globaltypes.md#hashconfig)

---

### isExploring

• `Private` **isExploring**: _boolean_= false

---

### minedChunksStore

• `Private` `Readonly` **minedChunksStore**: [_ChunkStore_](../interfaces/_types_darkforest_api_chunkstoretypes.chunkstore.md)

---

### minersComplete

• `Private` **minersComplete**: _object_= {}

#### Type declaration

---

### miningPattern

• `Private` **miningPattern**: [_MiningPattern_](../interfaces/backend_miner_miningpatterns.miningpattern.md)

---

### perlinOptions

• `Private` **perlinOptions**: PerlinConfig

---

### planetRarity

• `Private` `Readonly` **planetRarity**: _number_

---

### useMockHash

• `Private` **useMockHash**: _boolean_

---

### workers

• `Private` **workers**: [_default_](_types_worker_loader_workertypes.default.md)[]

---

### worldRadius

• `Private` **worldRadius**: _number_

## Methods

### chunkKeyToLocation

▸ `Private` **chunkKeyToLocation**(`chunkKey`: _string_): _undefined_ \| [[_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md), _number_]

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `chunkKey` | _string_ |

**Returns:** _undefined_ \| [[_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md), _number_]

---

### chunkLocationToKey

▸ `Private` **chunkLocationToKey**(`chunkLocation`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md), `jobId`: _number_): _string_

#### Parameters

| Name            | Type                                                                |
| :-------------- | :------------------------------------------------------------------ |
| `chunkLocation` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |
| `jobId`         | _number_                                                            |

**Returns:** _string_

---

### destroy

▸ **destroy**(): _void_

**Returns:** _void_

---

### exploreNext

▸ `Private` **exploreNext**(`fromChunk`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md), `jobId`: _number_): _void_

#### Parameters

| Name        | Type                                                                |
| :---------- | :------------------------------------------------------------------ |
| `fromChunk` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |
| `jobId`     | _number_                                                            |

**Returns:** _void_

---

### getCurrentlyExploringChunk

▸ **getCurrentlyExploringChunk**(): _undefined_ \| [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)

**Returns:** _undefined_ \| [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)

---

### getMiningPattern

▸ **getMiningPattern**(): [_MiningPattern_](../interfaces/backend_miner_miningpatterns.miningpattern.md)

**Returns:** [_MiningPattern_](../interfaces/backend_miner_miningpatterns.miningpattern.md)

---

### initWorker

▸ `Private` **initWorker**(`index`: _number_): _void_

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `index` | _number_ |

**Returns:** _void_

---

### isMining

▸ **isMining**(): _boolean_

**Returns:** _boolean_

---

### isValidExploreTarget

▸ `Private` **isValidExploreTarget**(`chunkLocation`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)): _boolean_

#### Parameters

| Name            | Type                                                                |
| :-------------- | :------------------------------------------------------------------ |
| `chunkLocation` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |

**Returns:** _boolean_

---

### nextValidExploreTarget

▸ `Private` **nextValidExploreTarget**(`chunkLocation`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md), `jobId`: _number_): _Promise_<undefined \| [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)\>

#### Parameters

| Name            | Type                                                                |
| :-------------- | :------------------------------------------------------------------ |
| `chunkLocation` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |
| `jobId`         | _number_                                                            |

**Returns:** _Promise_<undefined \| [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)\>

---

### onDiscovered

▸ `Private` **onDiscovered**(`exploredChunk`: [_Chunk_](_types_global_globaltypes.chunk.md), `jobId`: _number_): _Promise_<void\>

#### Parameters

| Name            | Type                                          |
| :-------------- | :-------------------------------------------- |
| `exploredChunk` | [_Chunk_](_types_global_globaltypes.chunk.md) |
| `jobId`         | _number_                                      |

**Returns:** _Promise_<void\>

---

### sendMessageToWorkers

▸ `Private` **sendMessageToWorkers**(`chunkToExplore`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md), `jobId`: _number_): _void_

#### Parameters

| Name             | Type                                                                |
| :--------------- | :------------------------------------------------------------------ |
| `chunkToExplore` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |
| `jobId`          | _number_                                                            |

**Returns:** _void_

---

### setCores

▸ **setCores**(`nCores`: _number_): _void_

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `nCores` | _number_ |

**Returns:** _void_

---

### setMiningPattern

▸ **setMiningPattern**(`pattern`: [_MiningPattern_](../interfaces/backend_miner_miningpatterns.miningpattern.md)): _void_

#### Parameters

| Name      | Type                                                                           |
| :-------- | :----------------------------------------------------------------------------- |
| `pattern` | [_MiningPattern_](../interfaces/backend_miner_miningpatterns.miningpattern.md) |

**Returns:** _void_

---

### setRadius

▸ **setRadius**(`radius`: _number_): _void_

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `radius` | _number_ |

**Returns:** _void_

---

### startExplore

▸ **startExplore**(): _void_

**Returns:** _void_

---

### stopExplore

▸ **stopExplore**(): _void_

**Returns:** _void_

---

### create

▸ `Static` **create**(`chunkStore`: [_ChunkStore_](../interfaces/_types_darkforest_api_chunkstoretypes.chunkstore.md), `miningPattern`: [_MiningPattern_](../interfaces/backend_miner_miningpatterns.miningpattern.md), `worldRadius`: _number_, `planetRarity`: _number_, `hashConfig`: [_HashConfig_](../modules/_types_global_globaltypes.md#hashconfig), `useMockHash?`: _boolean_, `WorkerCtor?`: _typeof_ [_default_](_types_worker_loader_workertypes.default.md)): [_default_](backend_miner_minermanager.default.md)

#### Parameters

| Name            | Type                                                                              | Default value |
| :-------------- | :-------------------------------------------------------------------------------- | :------------ |
| `chunkStore`    | [_ChunkStore_](../interfaces/_types_darkforest_api_chunkstoretypes.chunkstore.md) | -             |
| `miningPattern` | [_MiningPattern_](../interfaces/backend_miner_miningpatterns.miningpattern.md)    | -             |
| `worldRadius`   | _number_                                                                          | -             |
| `planetRarity`  | _number_                                                                          | -             |
| `hashConfig`    | [_HashConfig_](../modules/_types_global_globaltypes.md#hashconfig)                | -             |
| `useMockHash`   | _boolean_                                                                         | false         |
| `WorkerCtor`    | _typeof_ [_default_](_types_worker_loader_workertypes.default.md)                 | -             |

**Returns:** [_default_](backend_miner_minermanager.default.md)
