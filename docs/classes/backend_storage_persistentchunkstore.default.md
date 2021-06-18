# Class: default

[Backend/Storage/PersistentChunkStore](../modules/backend_storage_persistentchunkstore.md).default

## Implements

- [_ChunkStore_](../interfaces/_types_darkforest_api_chunkstoretypes.chunkstore.md)

## Table of contents

### Constructors

- [constructor](backend_storage_persistentchunkstore.default.md#constructor)

### Properties

- [account](backend_storage_persistentchunkstore.default.md#account)
- [chunkMap](backend_storage_persistentchunkstore.default.md#chunkmap)
- [confirmedTxHashes](backend_storage_persistentchunkstore.default.md#confirmedtxhashes)
- [db](backend_storage_persistentchunkstore.default.md#db)
- [diagnosticUpdater](backend_storage_persistentchunkstore.default.md#diagnosticupdater)
- [nUpdatesLastTwoMins](backend_storage_persistentchunkstore.default.md#nupdateslasttwomins)
- [queuedChunkWrites](backend_storage_persistentchunkstore.default.md#queuedchunkwrites)
- [throttledSaveChunkCacheToDisk](backend_storage_persistentchunkstore.default.md#throttledsavechunkcachetodisk)

### Methods

- [addChunk](backend_storage_persistentchunkstore.default.md#addchunk)
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
- [loadChunks](backend_storage_persistentchunkstore.default.md#loadchunks)
- [loadPlugins](backend_storage_persistentchunkstore.default.md#loadplugins)
- [onEthTxComplete](backend_storage_persistentchunkstore.default.md#onethtxcomplete)
- [onEthTxSubmit](backend_storage_persistentchunkstore.default.md#onethtxsubmit)
- [persistQueuedChunks](backend_storage_persistentchunkstore.default.md#persistqueuedchunks)
- [recomputeSaveThrottleAfterUpdate](backend_storage_persistentchunkstore.default.md#recomputesavethrottleafterupdate)
- [removeKey](backend_storage_persistentchunkstore.default.md#removekey)
- [savePlugins](backend_storage_persistentchunkstore.default.md#saveplugins)
- [saveRevealedCoords](backend_storage_persistentchunkstore.default.md#saverevealedcoords)
- [saveTouchedPlanetIds](backend_storage_persistentchunkstore.default.md#savetouchedplanetids)
- [setDiagnosticUpdater](backend_storage_persistentchunkstore.default.md#setdiagnosticupdater)
- [setKey](backend_storage_persistentchunkstore.default.md#setkey)
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

### chunkMap

• `Private` **chunkMap**: _Map_<[_ChunkId_](../modules/_types_darkforest_api_chunkstoretypes.md#chunkid), [_Chunk_](_types_global_globaltypes.chunk.md)\>

---

### confirmedTxHashes

• `Private` **confirmedTxHashes**: _Set_<string\>

---

### db

• `Private` **db**: _IDBPDatabase_<unknown\>

---

### diagnosticUpdater

• `Private` `Optional` **diagnosticUpdater**: [_DiagnosticUpdater_](../interfaces/backend_interfaces_diagnosticupdater.diagnosticupdater.md)

---

### nUpdatesLastTwoMins

• `Private` **nUpdatesLastTwoMins**: _number_= 0

---

### queuedChunkWrites

• `Private` **queuedChunkWrites**: DBTx[]

---

### throttledSaveChunkCacheToDisk

• `Private` **throttledSaveChunkCacheToDisk**: _DebouncedFunc_<() => _Promise_<void\>\>

## Methods

### addChunk

▸ **addChunk**(`chunk`: [_Chunk_](_types_global_globaltypes.chunk.md), `persistChunk?`: _boolean_): _void_

When a chunk is mined, or a chunk is imported via map import, or a chunk is loaded from
persistent storage for the first time, we need to add this chunk to the game. This function
allows you to add a new chunk to the game, and optionally persist that chunk. The reason you
might not want to persist the chunk is if you are sure that you got it from persistent storage.
i.e. it already exists in persistent storage.

#### Parameters

| Name           | Type                                          | Default value |
| :------------- | :-------------------------------------------- | :------------ |
| `chunk`        | [_Chunk_](_types_global_globaltypes.chunk.md) | -             |
| `persistChunk` | _boolean_                                     | true          |

**Returns:** _void_

---

### addHomeLocation

▸ **addHomeLocation**(`location`: WorldLocation): _Promise_<void\>

#### Parameters

| Name       | Type          |
| :--------- | :------------ |
| `location` | WorldLocation |

**Returns:** _Promise_<void\>

---

### allChunks

▸ **allChunks**(): _Iterable_<[_Chunk_](_types_global_globaltypes.chunk.md)\>

**Returns:** _Iterable_<[_Chunk_](_types_global_globaltypes.chunk.md)\>

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

▸ **getChunkByFootprint**(`chunkLoc`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)): _undefined_ \| [_Chunk_](_types_global_globaltypes.chunk.md)

Returns the explored chunk data for the given rectangle if that chunk has been mined. If this
chunk is entirely contained within another bigger chunk that has been mined, return that chunk.
`chunkLoc` is an aligned square, as defined in ChunkUtils.ts in the `getSiblingLocations`
function.

#### Parameters

| Name       | Type                                                                |
| :--------- | :------------------------------------------------------------------ |
| `chunkLoc` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |

**Returns:** _undefined_ \| [_Chunk_](_types_global_globaltypes.chunk.md)

---

### getChunkById

▸ `Private` **getChunkById**(`chunkId`: [_ChunkId_](../modules/_types_darkforest_api_chunkstoretypes.md#chunkid)): _undefined_ \| [_Chunk_](_types_global_globaltypes.chunk.md)

#### Parameters

| Name      | Type                                                                     |
| :-------- | :----------------------------------------------------------------------- |
| `chunkId` | [_ChunkId_](../modules/_types_darkforest_api_chunkstoretypes.md#chunkid) |

**Returns:** _undefined_ \| [_Chunk_](_types_global_globaltypes.chunk.md)

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

Important! This sets the key in indexed db per account and per contract. This means the same
client can connect to multiple different dark forest contracts, with multiple different
accounts, and the persistent storage will not overwrite data that is not relevant for the
current configuration of the client.

#### Parameters

| Name       | Type        |
| :--------- | :---------- |
| `key`      | _string_    |
| `objStore` | ObjectStore |

**Returns:** _Promise_<undefined \| string\>

---

### getMinedSubChunks

▸ `Private` **getMinedSubChunks**(`chunk`: [_Chunk_](_types_global_globaltypes.chunk.md)): [_Chunk_](_types_global_globaltypes.chunk.md)[]

Returns all the mined chunks with smaller sidelength strictly contained in the chunk.

TODO: move this into ChunkUtils, and also make use of it, the way that it is currently used, in
the function named `addToChunkMap`.

#### Parameters

| Name    | Type                                          |
| :------ | :-------------------------------------------- |
| `chunk` | [_Chunk_](_types_global_globaltypes.chunk.md) |

**Returns:** [_Chunk_](_types_global_globaltypes.chunk.md)[]

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

### loadChunks

▸ `Private` **loadChunks**(): _Promise_<void\>

This function loads all chunks persisted in the user's storage into the game.

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

### persistQueuedChunks

▸ `Private` **persistQueuedChunks**(): _Promise_<void\>

Rather than saving a chunk immediately after it's mined, we queue up new chunks, and
periodically save them. This function gets all of the queued new chunks, and persists them to
indexed db.

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

### setDiagnosticUpdater

▸ **setDiagnosticUpdater**(`diagnosticUpdater?`: [_DiagnosticUpdater_](../interfaces/backend_interfaces_diagnosticupdater.diagnosticupdater.md)): _void_

#### Parameters

| Name                 | Type                                                                                           |
| :------------------- | :--------------------------------------------------------------------------------------------- |
| `diagnosticUpdater?` | [_DiagnosticUpdater_](../interfaces/backend_interfaces_diagnosticupdater.diagnosticupdater.md) |

**Returns:** _void_

---

### setKey

▸ `Private` **setKey**(`key`: _string_, `value`: _string_, `objStore?`: ObjectStore): _Promise_<void\>

Important! This sets the key in indexed db per account and per contract. This means the same
client can connect to multiple different dark forest contracts, with multiple different
accounts, and the persistent storage will not overwrite data that is not relevant for the
current configuration of the client.

#### Parameters

| Name       | Type        |
| :--------- | :---------- |
| `key`      | _string_    |
| `value`    | _string_    |
| `objStore` | ObjectStore |

**Returns:** _Promise_<void\>

---

### create

▸ `Static` **create**(`account`: EthAddress): _Promise_<[_default_](backend_storage_persistentchunkstore.default.md)\>

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `account` | EthAddress |

**Returns:** _Promise_<[_default_](backend_storage_persistentchunkstore.default.md)\>
