# Class: default

[Backend/Storage/PersistentChunkStore](../modules/backend_storage_persistentchunkstore.md).default

## Implements

- [_ChunkStore_](../interfaces/_types_darkforest_api_chunkstoretypes.chunkstore.md)

## Table of contents

### Constructors

- [constructor](backend_storage_persistentchunkstore.default.md#constructor)

### Properties

- [account](backend_storage_persistentchunkstore.default.md#account)
- [cached](backend_storage_persistentchunkstore.default.md#cached)
- [chunkMap](backend_storage_persistentchunkstore.default.md#chunkmap)
- [confirmedTxHashes](backend_storage_persistentchunkstore.default.md#confirmedtxhashes)
- [db](backend_storage_persistentchunkstore.default.md#db)
- [nUpdatesLastTwoMins](backend_storage_persistentchunkstore.default.md#nupdateslasttwomins)
- [throttledSaveChunkCacheToDisk](backend_storage_persistentchunkstore.default.md#throttledsavechunkcachetodisk)

### Methods

- [addHomeLocation](backend_storage_persistentchunkstore.default.md#addhomelocation)
- [allChunks](backend_storage_persistentchunkstore.default.md#allchunks)
- [bulkSetKeyInCollection](backend_storage_persistentchunkstore.default.md#bulksetkeyincollection)
- [confirmHomeLocation](backend_storage_persistentchunkstore.default.md#confirmhomelocation)
- [destroy](backend_storage_persistentchunkstore.default.md#destroy)
- [getChunkByFootprint](backend_storage_persistentchunkstore.default.md#getchunkbyfootprint)
- [getChunkById](backend_storage_persistentchunkstore.default.md#getchunkbyid)
- [getHomeLocations](backend_storage_persistentchunkstore.default.md#gethomelocations)
- [getKey](backend_storage_persistentchunkstore.default.md#getkey)
- [getMinedSubChunks](backend_storage_persistentchunkstore.default.md#getminedsubchunks)
- [getSavedRevealedCoords](backend_storage_persistentchunkstore.default.md#getsavedrevealedcoords)
- [getSavedTouchedPlanetIds](backend_storage_persistentchunkstore.default.md#getsavedtouchedplanetids)
- [getUnconfirmedSubmittedEthTxs](backend_storage_persistentchunkstore.default.md#getunconfirmedsubmittedethtxs)
- [hasMinedChunk](backend_storage_persistentchunkstore.default.md#hasminedchunk)
- [loadIntoMemory](backend_storage_persistentchunkstore.default.md#loadintomemory)
- [loadPlugins](backend_storage_persistentchunkstore.default.md#loadplugins)
- [onEthTxComplete](backend_storage_persistentchunkstore.default.md#onethtxcomplete)
- [onEthTxSubmit](backend_storage_persistentchunkstore.default.md#onethtxsubmit)
- [recomputeSaveThrottleAfterUpdate](backend_storage_persistentchunkstore.default.md#recomputesavethrottleafterupdate)
- [removeKey](backend_storage_persistentchunkstore.default.md#removekey)
- [saveChunkCacheToDisk](backend_storage_persistentchunkstore.default.md#savechunkcachetodisk)
- [savePlugins](backend_storage_persistentchunkstore.default.md#saveplugins)
- [saveRevealedCoords](backend_storage_persistentchunkstore.default.md#saverevealedcoords)
- [saveTouchedPlanetIds](backend_storage_persistentchunkstore.default.md#savetouchedplanetids)
- [setKey](backend_storage_persistentchunkstore.default.md#setkey)
- [updateChunk](backend_storage_persistentchunkstore.default.md#updatechunk)
- [create](backend_storage_persistentchunkstore.default.md#create)

## Constructors

### constructor

\+ **new default**(`db`: _IDBPDatabase_<unknown\>, `account`: EthAddress): [_default_](backend_storage_persistentchunkstore.default.md)

#### Parameters

| Name      | Type                     |
| :-------- | :----------------------- |
| `db`      | _IDBPDatabase_<unknown\> |
| `account` | EthAddress               |

**Returns:** [_default_](backend_storage_persistentchunkstore.default.md)

## Properties

### account

• `Private` **account**: EthAddress

---

### cached

• `Private` **cached**: DBTx[]

---

### chunkMap

• `Private` **chunkMap**: _Map_<string, [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)\>

---

### confirmedTxHashes

• `Private` **confirmedTxHashes**: _Set_<string\>

---

### db

• `Private` **db**: _IDBPDatabase_<unknown\>

---

### nUpdatesLastTwoMins

• `Private` **nUpdatesLastTwoMins**: _number_= 0

---

### throttledSaveChunkCacheToDisk

• `Private` **throttledSaveChunkCacheToDisk**: _DebouncedFunc_<() => _Promise_<void\>\>

## Methods

### addHomeLocation

▸ **addHomeLocation**(`location`: WorldLocation): _Promise_<void\>

#### Parameters

| Name       | Type          |
| :--------- | :------------ |
| `location` | WorldLocation |

**Returns:** _Promise_<void\>

---

### allChunks

▸ **allChunks**(): _Iterable_<[_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)\>

**Returns:** _Iterable_<[_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)\>

---

### bulkSetKeyInCollection

▸ `Private` **bulkSetKeyInCollection**(`updateChunkTxs`: DBTx[], `collection`: ObjectStore): _Promise_<void\>

#### Parameters

| Name             | Type        |
| :--------------- | :---------- |
| `updateChunkTxs` | DBTx[]      |
| `collection`     | ObjectStore |

**Returns:** _Promise_<void\>

---

### confirmHomeLocation

▸ **confirmHomeLocation**(`location`: WorldLocation): _Promise_<void\>

#### Parameters

| Name       | Type          |
| :--------- | :------------ |
| `location` | WorldLocation |

**Returns:** _Promise_<void\>

---

### destroy

▸ **destroy**(): _void_

**Returns:** _void_

---

### getChunkByFootprint

▸ **getChunkByFootprint**(`chunkLoc`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)): _undefined_ \| [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)

#### Parameters

| Name       | Type                                                                |
| :--------- | :------------------------------------------------------------------ |
| `chunkLoc` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |

**Returns:** _undefined_ \| [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)

---

### getChunkById

▸ `Private` **getChunkById**(`chunkId`: _string_): _undefined_ \| [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `chunkId` | _string_ |

**Returns:** _undefined_ \| [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)

---

### getHomeLocations

▸ **getHomeLocations**(): _Promise_<WorldLocation[]\>

we keep a list rather than a single location, since client/contract can
often go out of sync on initialization - if client thinks that init
failed but is wrong, it will prompt user to initialize with new home coords,
which bricks the user's account.

**Returns:** _Promise_<WorldLocation[]\>

---

### getKey

▸ `Private` **getKey**(`key`: _string_, `objStore?`: ObjectStore): _Promise_<undefined \| string\>

#### Parameters

| Name       | Type        |
| :--------- | :---------- |
| `key`      | _string_    |
| `objStore` | ObjectStore |

**Returns:** _Promise_<undefined \| string\>

---

### getMinedSubChunks

▸ `Private` **getMinedSubChunks**(`e`: [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)): [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)[]

#### Parameters

| Name | Type                                                                  |
| :--- | :-------------------------------------------------------------------- |
| `e`  | [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md) |

**Returns:** [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)[]

---

### getSavedRevealedCoords

▸ **getSavedRevealedCoords**(): _Promise_<RevealedCoords[]\>

**Returns:** _Promise_<RevealedCoords[]\>

---

### getSavedTouchedPlanetIds

▸ **getSavedTouchedPlanetIds**(): _Promise_<LocationId[]\>

**Returns:** _Promise_<LocationId[]\>

---

### getUnconfirmedSubmittedEthTxs

▸ **getUnconfirmedSubmittedEthTxs**(): _Promise_<SubmittedTx[]\>

**Returns:** _Promise_<SubmittedTx[]\>

---

### hasMinedChunk

▸ **hasMinedChunk**(`chunkLoc`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)): _boolean_

#### Parameters

| Name       | Type                                                                |
| :--------- | :------------------------------------------------------------------ |
| `chunkLoc` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |

**Returns:** _boolean_

Implementation of: ChunkStore.hasMinedChunk

---

### loadIntoMemory

▸ `Private` **loadIntoMemory**(): _Promise_<void\>

**Returns:** _Promise_<void\>

---

### loadPlugins

▸ **loadPlugins**(): _Promise_<[_SerializedPlugin_](../interfaces/backend_plugins_serializedplugin.serializedplugin.md)[]\>

**Returns:** _Promise_<[_SerializedPlugin_](../interfaces/backend_plugins_serializedplugin.serializedplugin.md)[]\>

---

### onEthTxComplete

▸ **onEthTxComplete**(`txHash`: _string_): _Promise_<void\>

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `txHash` | _string_ |

**Returns:** _Promise_<void\>

---

### onEthTxSubmit

▸ **onEthTxSubmit**(`tx`: SubmittedTx): _Promise_<void\>

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `tx` | SubmittedTx |

**Returns:** _Promise_<void\>

---

### recomputeSaveThrottleAfterUpdate

▸ `Private` **recomputeSaveThrottleAfterUpdate**(): _void_

**Returns:** _void_

---

### removeKey

▸ `Private` **removeKey**(`key`: _string_, `objStore?`: ObjectStore): _Promise_<void\>

#### Parameters

| Name       | Type        |
| :--------- | :---------- |
| `key`      | _string_    |
| `objStore` | ObjectStore |

**Returns:** _Promise_<void\>

---

### saveChunkCacheToDisk

▸ `Private` **saveChunkCacheToDisk**(): _Promise_<void\>

**Returns:** _Promise_<void\>

---

### savePlugins

▸ **savePlugins**(`plugins`: [_SerializedPlugin_](../interfaces/backend_plugins_serializedplugin.serializedplugin.md)[]): _Promise_<void\>

#### Parameters

| Name      | Type                                                                                       |
| :-------- | :----------------------------------------------------------------------------------------- |
| `plugins` | [_SerializedPlugin_](../interfaces/backend_plugins_serializedplugin.serializedplugin.md)[] |

**Returns:** _Promise_<void\>

---

### saveRevealedCoords

▸ **saveRevealedCoords**(`revealedCoordTups`: RevealedCoords[]): _Promise_<void\>

#### Parameters

| Name                | Type             |
| :------------------ | :--------------- |
| `revealedCoordTups` | RevealedCoords[] |

**Returns:** _Promise_<void\>

---

### saveTouchedPlanetIds

▸ **saveTouchedPlanetIds**(`ids`: LocationId[]): _Promise_<void\>

#### Parameters

| Name  | Type         |
| :---- | :----------- |
| `ids` | LocationId[] |

**Returns:** _Promise_<void\>

---

### setKey

▸ `Private` **setKey**(`key`: _string_, `value`: _string_, `objStore?`: ObjectStore): _Promise_<void\>

#### Parameters

| Name       | Type        |
| :--------- | :---------- |
| `key`      | _string_    |
| `value`    | _string_    |
| `objStore` | ObjectStore |

**Returns:** _Promise_<void\>

---

### updateChunk

▸ **updateChunk**(`e`: [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md), `loadedFromStorage?`: _boolean_): _void_

#### Parameters

| Name                | Type                                                                  | Default value |
| :------------------ | :-------------------------------------------------------------------- | :------------ |
| `e`                 | [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md) | -             |
| `loadedFromStorage` | _boolean_                                                             | false         |

**Returns:** _void_

---

### create

▸ `Static` **create**(`account`: EthAddress): _Promise_<[_default_](backend_storage_persistentchunkstore.default.md)\>

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `account` | EthAddress |

**Returns:** _Promise_<[_default_](backend_storage_persistentchunkstore.default.md)\>
