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

• `Private` **new default**(`__namedParameters`)

#### Parameters

| Name                | Type                    |
| :------------------ | :---------------------- |
| `__namedParameters` | `ReaderDataStoreConfig` |

## Properties

### addressTwitterMap

• `Private` `Readonly` **addressTwitterMap**: [`AddressTwitterMap`](../modules/types_darkforest_api_UtilityServerAPITypes.md#addresstwittermap)

---

### contractConstants

• `Private` `Readonly` **contractConstants**: [`ContractConstants`](../interfaces/types_darkforest_api_ContractsAPITypes.ContractConstants.md)

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

▸ `Static` **create**(`__namedParameters`): `Promise`<[`default`](Backend_Storage_ReaderDataStore.default.md)\>

#### Parameters

| Name                                | Type                        |
| :---------------------------------- | :-------------------------- |
| `__namedParameters`                 | `Object`                    |
| `__namedParameters.connection`      | `EthConnection`             |
| `__namedParameters.contractAddress` | `EthAddress`                |
| `__namedParameters.viewer`          | `undefined` \| `EthAddress` |

#### Returns

`Promise`<[`default`](Backend_Storage_ReaderDataStore.default.md)\>
