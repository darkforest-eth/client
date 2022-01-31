# Class: default

[Backend/Storage/ReaderDataStore](../modules/Backend_Storage_ReaderDataStore.md).default

A data store that allows you to retrieve data from the contract,
and combine it with data that is stored in this browser about a
particular user.

## Table of contents

### Constructors

- [constructor](Backend_Storage_ReaderDataStore.default.md#constructor)

### Properties

- [addressTwitterMap](Backend_Storage_ReaderDataStore.default.md#addresstwittermap)
- [contractConstants](Backend_Storage_ReaderDataStore.default.md#contractconstants)
- [contractsAPI](Backend_Storage_ReaderDataStore.default.md#contractsapi)
- [persistentChunkStore](Backend_Storage_ReaderDataStore.default.md#persistentchunkstore)
- [viewer](Backend_Storage_ReaderDataStore.default.md#viewer)

### Methods

- [destroy](Backend_Storage_ReaderDataStore.default.md#destroy)
- [getBiome](Backend_Storage_ReaderDataStore.default.md#getbiome)
- [getTwitter](Backend_Storage_ReaderDataStore.default.md#gettwitter)
- [getViewer](Backend_Storage_ReaderDataStore.default.md#getviewer)
- [loadArtifactFromContract](Backend_Storage_ReaderDataStore.default.md#loadartifactfromcontract)
- [loadPlanetFromContract](Backend_Storage_ReaderDataStore.default.md#loadplanetfromcontract)
- [setPlanetLocationIfKnown](Backend_Storage_ReaderDataStore.default.md#setplanetlocationifknown)
- [spaceTypeFromPerlin](Backend_Storage_ReaderDataStore.default.md#spacetypefromperlin)
- [create](Backend_Storage_ReaderDataStore.default.md#create)

## Constructors

### constructor

• `Private` **new default**(`viewer`, `addressTwitterMap`, `contractConstants`, `contractsAPI`, `persistentChunkStore`)

#### Parameters

| Name                   | Type                                                                                               |
| :--------------------- | :------------------------------------------------------------------------------------------------- |
| `viewer`               | `undefined` \| `EthAddress`                                                                        |
| `addressTwitterMap`    | [`AddressTwitterMap`](../modules/_types_darkforest_api_UtilityServerAPITypes.md#addresstwittermap) |
| `contractConstants`    | [`ContractConstants`](../interfaces/_types_darkforest_api_ContractsAPITypes.ContractConstants.md)  |
| `contractsAPI`         | [`ContractsAPI`](Backend_GameLogic_ContractsAPI.ContractsAPI.md)                                   |
| `persistentChunkStore` | `undefined` \| [`default`](Backend_Storage_PersistentChunkStore.default.md)                        |

## Properties

### addressTwitterMap

• `Private` `Readonly` **addressTwitterMap**: [`AddressTwitterMap`](../modules/_types_darkforest_api_UtilityServerAPITypes.md#addresstwittermap)

---

### contractConstants

• `Private` `Readonly` **contractConstants**: [`ContractConstants`](../interfaces/_types_darkforest_api_ContractsAPITypes.ContractConstants.md)

---

### contractsAPI

• `Private` `Readonly` **contractsAPI**: [`ContractsAPI`](Backend_GameLogic_ContractsAPI.ContractsAPI.md)

---

### persistentChunkStore

• `Private` `Readonly` **persistentChunkStore**: `undefined` \| [`default`](Backend_Storage_PersistentChunkStore.default.md)

---

### viewer

• `Private` `Readonly` **viewer**: `undefined` \| `EthAddress`

## Methods

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

---

### getBiome

▸ `Private` **getBiome**(`loc`): `Biome`

#### Parameters

| Name  | Type            |
| :---- | :-------------- |
| `loc` | `WorldLocation` |

#### Returns

`Biome`

---

### getTwitter

▸ **getTwitter**(`owner`): `undefined` \| `string`

#### Parameters

| Name    | Type                        |
| :------ | :-------------------------- |
| `owner` | `undefined` \| `EthAddress` |

#### Returns

`undefined` \| `string`

---

### getViewer

▸ **getViewer**(): `undefined` \| `EthAddress`

#### Returns

`undefined` \| `EthAddress`

---

### loadArtifactFromContract

▸ **loadArtifactFromContract**(`artifactId`): `Promise`<`Artifact`\>

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `artifactId` | `ArtifactId` |

#### Returns

`Promise`<`Artifact`\>

---

### loadPlanetFromContract

▸ **loadPlanetFromContract**(`planetId`): `Promise`<`Planet` \| `LocatablePlanet`\>

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`Promise`<`Planet` \| `LocatablePlanet`\>

---

### setPlanetLocationIfKnown

▸ `Private` **setPlanetLocationIfKnown**(`planet`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`void`

---

### spaceTypeFromPerlin

▸ `Private` **spaceTypeFromPerlin**(`perlin`): `SpaceType`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `perlin` | `number` |

#### Returns

`SpaceType`

---

### create

▸ `Static` **create**(`terminal`, `ethConnection`, `viewer`): `Promise`<[`default`](Backend_Storage_ReaderDataStore.default.md)\>

#### Parameters

| Name            | Type                                                                                                            |
| :-------------- | :-------------------------------------------------------------------------------------------------------------- |
| `terminal`      | `MutableRefObject`<`undefined` \| [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md)\> |
| `ethConnection` | `EthConnection`                                                                                                 |
| `viewer`        | `undefined` \| `EthAddress`                                                                                     |

#### Returns

`Promise`<[`default`](Backend_Storage_ReaderDataStore.default.md)\>
