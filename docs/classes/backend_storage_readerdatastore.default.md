# Class: default

[Backend/Storage/ReaderDataStore](../modules/backend_storage_readerdatastore.md).default

A data store that allows you to retrieve data from the contract,
and combine it with data that is stored in this browser about a
particular user.

## Table of contents

### Constructors

- [constructor](backend_storage_readerdatastore.default.md#constructor)

### Properties

- [addressTwitterMap](backend_storage_readerdatastore.default.md#addresstwittermap)
- [contractConstants](backend_storage_readerdatastore.default.md#contractconstants)
- [contractsAPI](backend_storage_readerdatastore.default.md#contractsapi)
- [persistentChunkStore](backend_storage_readerdatastore.default.md#persistentchunkstore)
- [viewer](backend_storage_readerdatastore.default.md#viewer)

### Methods

- [destroy](backend_storage_readerdatastore.default.md#destroy)
- [getBiome](backend_storage_readerdatastore.default.md#getbiome)
- [getTwitter](backend_storage_readerdatastore.default.md#gettwitter)
- [getViewer](backend_storage_readerdatastore.default.md#getviewer)
- [loadArtifactFromContract](backend_storage_readerdatastore.default.md#loadartifactfromcontract)
- [loadPlanetFromContract](backend_storage_readerdatastore.default.md#loadplanetfromcontract)
- [setPlanetLocationIfKnown](backend_storage_readerdatastore.default.md#setplanetlocationifknown)
- [spaceTypeFromPerlin](backend_storage_readerdatastore.default.md#spacetypefromperlin)
- [create](backend_storage_readerdatastore.default.md#create)

## Constructors

### constructor

\+ `Private` **new default**(`viewer`: _undefined_ \| EthAddress, `addressTwitterMap`: [_AddressTwitterMap_](../modules/_types_darkforest_api_utilityserverapitypes.md#addresstwittermap), `contractConstants`: [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md), `contractsAPI`: [_default_](backend_gamelogic_contractsapi.default.md), `persistentChunkStore`: _undefined_ \| [_default_](backend_storage_persistentchunkstore.default.md)): [_default_](backend_storage_readerdatastore.default.md)

#### Parameters

| Name                   | Type                                                                                               |
| :--------------------- | :------------------------------------------------------------------------------------------------- |
| `viewer`               | _undefined_ \| EthAddress                                                                          |
| `addressTwitterMap`    | [_AddressTwitterMap_](../modules/_types_darkforest_api_utilityserverapitypes.md#addresstwittermap) |
| `contractConstants`    | [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md)  |
| `contractsAPI`         | [_default_](backend_gamelogic_contractsapi.default.md)                                             |
| `persistentChunkStore` | _undefined_ \| [_default_](backend_storage_persistentchunkstore.default.md)                        |

**Returns:** [_default_](backend_storage_readerdatastore.default.md)

## Properties

### addressTwitterMap

• `Private` `Readonly` **addressTwitterMap**: [_AddressTwitterMap_](../modules/_types_darkforest_api_utilityserverapitypes.md#addresstwittermap)

---

### contractConstants

• `Private` `Readonly` **contractConstants**: [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md)

---

### contractsAPI

• `Private` `Readonly` **contractsAPI**: [_default_](backend_gamelogic_contractsapi.default.md)

---

### persistentChunkStore

• `Private` `Readonly` **persistentChunkStore**: _undefined_ \| [_default_](backend_storage_persistentchunkstore.default.md)

---

### viewer

• `Private` `Readonly` **viewer**: _undefined_ \| EthAddress

## Methods

### destroy

▸ **destroy**(): _void_

**Returns:** _void_

---

### getBiome

▸ `Private` **getBiome**(`loc`: WorldLocation): Biome

#### Parameters

| Name  | Type          |
| :---- | :------------ |
| `loc` | WorldLocation |

**Returns:** Biome

---

### getTwitter

▸ **getTwitter**(`owner`: _undefined_ \| EthAddress): _undefined_ \| _string_

#### Parameters

| Name    | Type                      |
| :------ | :------------------------ |
| `owner` | _undefined_ \| EthAddress |

**Returns:** _undefined_ \| _string_

---

### getViewer

▸ **getViewer**(): _undefined_ \| EthAddress

**Returns:** _undefined_ \| EthAddress

---

### loadArtifactFromContract

▸ **loadArtifactFromContract**(`artifactId`: ArtifactId): _Promise_<Artifact\>

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `artifactId` | ArtifactId |

**Returns:** _Promise_<Artifact\>

---

### loadPlanetFromContract

▸ **loadPlanetFromContract**(`planetId`: LocationId): _Promise_<Planet \| LocatablePlanet\>

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _Promise_<Planet \| LocatablePlanet\>

---

### setPlanetLocationIfKnown

▸ `Private` **setPlanetLocationIfKnown**(`planet`: Planet): _void_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _void_

---

### spaceTypeFromPerlin

▸ `Private` **spaceTypeFromPerlin**(`perlin`: _number_): SpaceType

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `perlin` | _number_ |

**Returns:** SpaceType

---

### create

▸ `Static` **create**(`terminal`: _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\>, `ethConnection`: [_default_](backend_network_ethconnection.default.md), `viewer`: _undefined_ \| EthAddress): _Promise_<[_default_](backend_storage_readerdatastore.default.md)\>

#### Parameters

| Name            | Type                                                                                                          |
| :-------------- | :------------------------------------------------------------------------------------------------------------ |
| `terminal`      | _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\> |
| `ethConnection` | [_default_](backend_network_ethconnection.default.md)                                                         |
| `viewer`        | _undefined_ \| EthAddress                                                                                     |

**Returns:** _Promise_<[_default_](backend_storage_readerdatastore.default.md)\>
