# Class: default

[Backend/Storage/PersistentChunkStore](../modules/Backend_Storage_PersistentChunkStore.md).default

## Implements

- [`ChunkStore`](../interfaces/types_darkforest_api_ChunkStoreTypes.ChunkStore.md)

## Table of contents

### Constructors

- [constructor](Backend_Storage_PersistentChunkStore.default.md#constructor)

### Properties

- [account](Backend_Storage_PersistentChunkStore.default.md#account)
- [chunkMap](Backend_Storage_PersistentChunkStore.default.md#chunkmap)
- [confirmedTxHashes](Backend_Storage_PersistentChunkStore.default.md#confirmedtxhashes)
- [contractAddress](Backend_Storage_PersistentChunkStore.default.md#contractaddress)
- [db](Backend_Storage_PersistentChunkStore.default.md#db)
- [diagnosticUpdater](Backend_Storage_PersistentChunkStore.default.md#diagnosticupdater)
- [nUpdatesLastTwoMins](Backend_Storage_PersistentChunkStore.default.md#nupdateslasttwomins)
- [queuedChunkWrites](Backend_Storage_PersistentChunkStore.default.md#queuedchunkwrites)
- [throttledSaveChunkCacheToDisk](Backend_Storage_PersistentChunkStore.default.md#throttledsavechunkcachetodisk)

### Methods

- [addChunk](Backend_Storage_PersistentChunkStore.default.md#addchunk)
- [addHomeLocation](Backend_Storage_PersistentChunkStore.default.md#addhomelocation)
- [allChunks](Backend_Storage_PersistentChunkStore.default.md#allchunks)
- [bulkSetKeyInCollection](Backend_Storage_PersistentChunkStore.default.md#bulksetkeyincollection)
- [confirmHomeLocation](Backend_Storage_PersistentChunkStore.default.md#confirmhomelocation)
- [destroy](Backend_Storage_PersistentChunkStore.default.md#destroy)
- [getChunkByFootprint](Backend_Storage_PersistentChunkStore.default.md#getchunkbyfootprint)
- [getChunkById](Backend_Storage_PersistentChunkStore.default.md#getchunkbyid)
- [getHomeLocations](Backend_Storage_PersistentChunkStore.default.md#gethomelocations)
- [getKey](Backend_Storage_PersistentChunkStore.default.md#getkey)
- [getMinedSubChunks](Backend_Storage_PersistentChunkStore.default.md#getminedsubchunks)
- [getSavedClaimedCoords](Backend_Storage_PersistentChunkStore.default.md#getsavedclaimedcoords)
- [getSavedRevealedCoords](Backend_Storage_PersistentChunkStore.default.md#getsavedrevealedcoords)
- [getSavedTouchedPlanetIds](Backend_Storage_PersistentChunkStore.default.md#getsavedtouchedplanetids)
- [getUnconfirmedSubmittedEthTxs](Backend_Storage_PersistentChunkStore.default.md#getunconfirmedsubmittedethtxs)
- [hasMinedChunk](Backend_Storage_PersistentChunkStore.default.md#hasminedchunk)
- [loadChunks](Backend_Storage_PersistentChunkStore.default.md#loadchunks)
- [loadModalPositions](Backend_Storage_PersistentChunkStore.default.md#loadmodalpositions)
- [loadPlugins](Backend_Storage_PersistentChunkStore.default.md#loadplugins)
- [onEthTxComplete](Backend_Storage_PersistentChunkStore.default.md#onethtxcomplete)
- [onEthTxSubmit](Backend_Storage_PersistentChunkStore.default.md#onethtxsubmit)
- [persistQueuedChunks](Backend_Storage_PersistentChunkStore.default.md#persistqueuedchunks)
- [recomputeSaveThrottleAfterUpdate](Backend_Storage_PersistentChunkStore.default.md#recomputesavethrottleafterupdate)
- [removeKey](Backend_Storage_PersistentChunkStore.default.md#removekey)
- [saveClaimedCoords](Backend_Storage_PersistentChunkStore.default.md#saveclaimedcoords)
- [saveModalPositions](Backend_Storage_PersistentChunkStore.default.md#savemodalpositions)
- [savePlugins](Backend_Storage_PersistentChunkStore.default.md#saveplugins)
- [saveRevealedCoords](Backend_Storage_PersistentChunkStore.default.md#saverevealedcoords)
- [saveTouchedPlanetIds](Backend_Storage_PersistentChunkStore.default.md#savetouchedplanetids)
- [setDiagnosticUpdater](Backend_Storage_PersistentChunkStore.default.md#setdiagnosticupdater)
- [setKey](Backend_Storage_PersistentChunkStore.default.md#setkey)
- [create](Backend_Storage_PersistentChunkStore.default.md#create)

## Constructors

### constructor

• **new default**(`__namedParameters`)

#### Parameters

| Name                | Type                         |
| :------------------ | :--------------------------- |
| `__namedParameters` | `PersistentChunkStoreConfig` |

## Properties

### account

• `Private` **account**: `EthAddress`

---

### chunkMap

• `Private` **chunkMap**: `Map`<[`ChunkId`](../modules/types_darkforest_api_ChunkStoreTypes.md#chunkid), `Chunk`\>

---

### confirmedTxHashes

• `Private` **confirmedTxHashes**: `Set`<`string`\>

---

### contractAddress

• `Private` **contractAddress**: `EthAddress`

---

### db

• `Private` **db**: `IDBPDatabase`<`unknown`\>

---

### diagnosticUpdater

• `Private` `Optional` **diagnosticUpdater**: `DiagnosticUpdater`

---

### nUpdatesLastTwoMins

• `Private` **nUpdatesLastTwoMins**: `number` = `0`

---

### queuedChunkWrites

• `Private` **queuedChunkWrites**: `DBTx`[]

---

### throttledSaveChunkCacheToDisk

• `Private` **throttledSaveChunkCacheToDisk**: `DebouncedFunc`<() => `Promise`<`void`\>\>

## Methods

### addChunk

▸ **addChunk**(`chunk`, `persistChunk?`): `void`

When a chunk is mined, or a chunk is imported via map import, or a chunk is loaded from
persistent storage for the first time, we need to add this chunk to the game. This function
allows you to add a new chunk to the game, and optionally persist that chunk. The reason you
might not want to persist the chunk is if you are sure that you got it from persistent storage.
i.e. it already exists in persistent storage.

#### Parameters

| Name           | Type      | Default value |
| :------------- | :-------- | :------------ |
| `chunk`        | `Chunk`   | `undefined`   |
| `persistChunk` | `boolean` | `true`        |

#### Returns

`void`

---

### addHomeLocation

▸ **addHomeLocation**(`location`): `Promise`<`void`\>

#### Parameters

| Name       | Type            |
| :--------- | :-------------- |
| `location` | `WorldLocation` |

#### Returns

`Promise`<`void`\>

---

### allChunks

▸ **allChunks**(): `Iterable`<`Chunk`\>

#### Returns

`Iterable`<`Chunk`\>

---

### bulkSetKeyInCollection

▸ `Private` **bulkSetKeyInCollection**(`updateChunkTxs`, `collection`): `Promise`<`void`\>

#### Parameters

| Name             | Type          |
| :--------------- | :------------ |
| `updateChunkTxs` | `DBTx`[]      |
| `collection`     | `ObjectStore` |

#### Returns

`Promise`<`void`\>

---

### confirmHomeLocation

▸ **confirmHomeLocation**(`location`): `Promise`<`void`\>

#### Parameters

| Name       | Type            |
| :--------- | :-------------- |
| `location` | `WorldLocation` |

#### Returns

`Promise`<`void`\>

---

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

---

### getChunkByFootprint

▸ **getChunkByFootprint**(`chunkLoc`): `undefined` \| `Chunk`

Returns the explored chunk data for the given rectangle if that chunk has been mined. If this
chunk is entirely contained within another bigger chunk that has been mined, return that chunk.
`chunkLoc` is an aligned square, as defined in ChunkUtils.ts in the `getSiblingLocations`
function.

#### Parameters

| Name       | Type        |
| :--------- | :---------- |
| `chunkLoc` | `Rectangle` |

#### Returns

`undefined` \| `Chunk`

---

### getChunkById

▸ `Private` **getChunkById**(`chunkId`): `undefined` \| `Chunk`

#### Parameters

| Name      | Type                                                                    |
| :-------- | :---------------------------------------------------------------------- |
| `chunkId` | [`ChunkId`](../modules/types_darkforest_api_ChunkStoreTypes.md#chunkid) |

#### Returns

`undefined` \| `Chunk`

---

### getHomeLocations

▸ **getHomeLocations**(): `Promise`<`WorldLocation`[]\>

we keep a list rather than a single location, since client/contract can
often go out of sync on initialization - if client thinks that init
failed but is wrong, it will prompt user to initialize with new home coords,
which bricks the user's account.

#### Returns

`Promise`<`WorldLocation`[]\>

---

### getKey

▸ `Private` **getKey**(`key`, `objStore?`): `Promise`<`undefined` \| `string`\>

Important! This sets the key in indexed db per account and per contract. This means the same
client can connect to multiple different dark forest contracts, with multiple different
accounts, and the persistent storage will not overwrite data that is not relevant for the
current configuration of the client.

#### Parameters

| Name       | Type          | Default value         |
| :--------- | :------------ | :-------------------- |
| `key`      | `string`      | `undefined`           |
| `objStore` | `ObjectStore` | `ObjectStore.DEFAULT` |

#### Returns

`Promise`<`undefined` \| `string`\>

---

### getMinedSubChunks

▸ `Private` **getMinedSubChunks**(`chunk`): `Chunk`[]

Returns all the mined chunks with smaller sidelength strictly contained in the chunk.

TODO: move this into ChunkUtils, and also make use of it, the way that it is currently used, in
the function named `addToChunkMap`.

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `chunk` | `Chunk` |

#### Returns

`Chunk`[]

---

### getSavedClaimedCoords

▸ **getSavedClaimedCoords**(): `Promise`<`ClaimedCoords`[]\>

#### Returns

`Promise`<`ClaimedCoords`[]\>

---

### getSavedRevealedCoords

▸ **getSavedRevealedCoords**(): `Promise`<`RevealedCoords`[]\>

#### Returns

`Promise`<`RevealedCoords`[]\>

---

### getSavedTouchedPlanetIds

▸ **getSavedTouchedPlanetIds**(): `Promise`<`LocationId`[]\>

#### Returns

`Promise`<`LocationId`[]\>

---

### getUnconfirmedSubmittedEthTxs

▸ **getUnconfirmedSubmittedEthTxs**(): `Promise`<`PersistedTransaction`<`TxIntent`\>[]\>

#### Returns

`Promise`<`PersistedTransaction`<`TxIntent`\>[]\>

---

### hasMinedChunk

▸ **hasMinedChunk**(`chunkLoc`): `boolean`

#### Parameters

| Name       | Type        |
| :--------- | :---------- |
| `chunkLoc` | `Rectangle` |

#### Returns

`boolean`

#### Implementation of

[ChunkStore](../interfaces/types_darkforest_api_ChunkStoreTypes.ChunkStore.md).[hasMinedChunk](../interfaces/types_darkforest_api_ChunkStoreTypes.ChunkStore.md#hasminedchunk)

---

### loadChunks

▸ `Private` **loadChunks**(): `Promise`<`void`\>

This function loads all chunks persisted in the user's storage into the game.

#### Returns

`Promise`<`void`\>

---

### loadModalPositions

▸ **loadModalPositions**(): `Promise`<`Map`<`ModalId`, `ModalPosition`\>\>

#### Returns

`Promise`<`Map`<`ModalId`, `ModalPosition`\>\>

---

### loadPlugins

▸ **loadPlugins**(): `Promise`<[`SerializedPlugin`](../interfaces/Backend_Plugins_SerializedPlugin.SerializedPlugin.md)[]\>

#### Returns

`Promise`<[`SerializedPlugin`](../interfaces/Backend_Plugins_SerializedPlugin.SerializedPlugin.md)[]\>

---

### onEthTxComplete

▸ **onEthTxComplete**(`txHash`): `Promise`<`void`\>

Partner function to {@link PersistentChunkStore#onEthTxSubmit}

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `txHash` | `string` |

#### Returns

`Promise`<`void`\>

---

### onEthTxSubmit

▸ **onEthTxSubmit**(`tx`): `Promise`<`void`\>

Whenever a transaction is submitted, it is persisted. When the transaction either fails or
succeeds, it is un-persisted. The reason we persist submitted transactions is to be able to
wait for them upon a fresh start of the game if you close the game before a transaction
confirms.

#### Parameters

| Name | Type                       |
| :--- | :------------------------- |
| `tx` | `Transaction`<`TxIntent`\> |

#### Returns

`Promise`<`void`\>

---

### persistQueuedChunks

▸ `Private` **persistQueuedChunks**(): `Promise`<`void`\>

Rather than saving a chunk immediately after it's mined, we queue up new chunks, and
periodically save them. This function gets all of the queued new chunks, and persists them to
indexed db.

#### Returns

`Promise`<`void`\>

---

### recomputeSaveThrottleAfterUpdate

▸ `Private` **recomputeSaveThrottleAfterUpdate**(): `void`

#### Returns

`void`

---

### removeKey

▸ `Private` **removeKey**(`key`, `objStore?`): `Promise`<`void`\>

#### Parameters

| Name       | Type          | Default value         |
| :--------- | :------------ | :-------------------- |
| `key`      | `string`      | `undefined`           |
| `objStore` | `ObjectStore` | `ObjectStore.DEFAULT` |

#### Returns

`Promise`<`void`\>

---

### saveClaimedCoords

▸ **saveClaimedCoords**(`claimedCoordTupps`): `Promise`<`void`\>

#### Parameters

| Name                | Type              |
| :------------------ | :---------------- |
| `claimedCoordTupps` | `ClaimedCoords`[] |

#### Returns

`Promise`<`void`\>

---

### saveModalPositions

▸ **saveModalPositions**(`modalPositions`): `Promise`<`void`\>

#### Parameters

| Name             | Type                               |
| :--------------- | :--------------------------------- |
| `modalPositions` | `Map`<`ModalId`, `ModalPosition`\> |

#### Returns

`Promise`<`void`\>

---

### savePlugins

▸ **savePlugins**(`plugins`): `Promise`<`void`\>

#### Parameters

| Name      | Type                                                                                       |
| :-------- | :----------------------------------------------------------------------------------------- |
| `plugins` | [`SerializedPlugin`](../interfaces/Backend_Plugins_SerializedPlugin.SerializedPlugin.md)[] |

#### Returns

`Promise`<`void`\>

---

### saveRevealedCoords

▸ **saveRevealedCoords**(`revealedCoordTups`): `Promise`<`void`\>

#### Parameters

| Name                | Type               |
| :------------------ | :----------------- |
| `revealedCoordTups` | `RevealedCoords`[] |

#### Returns

`Promise`<`void`\>

---

### saveTouchedPlanetIds

▸ **saveTouchedPlanetIds**(`ids`): `Promise`<`void`\>

#### Parameters

| Name  | Type           |
| :---- | :------------- |
| `ids` | `LocationId`[] |

#### Returns

`Promise`<`void`\>

---

### setDiagnosticUpdater

▸ **setDiagnosticUpdater**(`diagnosticUpdater?`): `void`

#### Parameters

| Name                 | Type                |
| :------------------- | :------------------ |
| `diagnosticUpdater?` | `DiagnosticUpdater` |

#### Returns

`void`

---

### setKey

▸ `Private` **setKey**(`key`, `value`, `objStore?`): `Promise`<`void`\>

Important! This sets the key in indexed db per account and per contract. This means the same
client can connect to multiple different dark forest contracts, with multiple different
accounts, and the persistent storage will not overwrite data that is not relevant for the
current configuration of the client.

#### Parameters

| Name       | Type          | Default value         |
| :--------- | :------------ | :-------------------- |
| `key`      | `string`      | `undefined`           |
| `value`    | `string`      | `undefined`           |
| `objStore` | `ObjectStore` | `ObjectStore.DEFAULT` |

#### Returns

`Promise`<`void`\>

---

### create

▸ `Static` **create**(`__namedParameters`): `Promise`<[`default`](Backend_Storage_PersistentChunkStore.default.md)\>

NOTE! if you're creating a new object store, it will not be _added_ to existing dark forest
accounts. This creation code runs once per account. Therefore, if you're adding a new object
store, and need to test it out, you must either clear the indexed db databse for this account,
or create a brand new account.

#### Parameters

| Name                | Type                                          |
| :------------------ | :-------------------------------------------- |
| `__namedParameters` | `Omit`<`PersistentChunkStoreConfig`, `"db"`\> |

#### Returns

`Promise`<[`default`](Backend_Storage_PersistentChunkStore.default.md)\>
