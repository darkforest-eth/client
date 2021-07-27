# Class: InitialGameStateDownloader

[Backend/GameLogic/InitialGameStateDownloader](../modules/Backend_GameLogic_InitialGameStateDownloader.md).InitialGameStateDownloader

## Table of contents

### Constructors

- [constructor](Backend_GameLogic_InitialGameStateDownloader.InitialGameStateDownloader.md#constructor)

### Properties

- [terminal](Backend_GameLogic_InitialGameStateDownloader.InitialGameStateDownloader.md#terminal)

### Methods

- [download](Backend_GameLogic_InitialGameStateDownloader.InitialGameStateDownloader.md#download)
- [makeProgressListener](Backend_GameLogic_InitialGameStateDownloader.InitialGameStateDownloader.md#makeprogresslistener)

## Constructors

### constructor

• **new InitialGameStateDownloader**(`terminal`)

#### Parameters

| Name       | Type                                                                        |
| :--------- | :-------------------------------------------------------------------------- |
| `terminal` | [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md) |

## Properties

### terminal

• `Private` **terminal**: [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md)

## Methods

### download

▸ **download**(`contractsAPI`, `persistentChunkStore`): `Promise`<[`InitialGameState`](../interfaces/Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md)\>

#### Parameters

| Name                   | Type                                                             |
| :--------------------- | :--------------------------------------------------------------- |
| `contractsAPI`         | [`ContractsAPI`](Backend_GameLogic_ContractsAPI.ContractsAPI.md) |
| `persistentChunkStore` | [`default`](Backend_Storage_PersistentChunkStore.default.md)     |

#### Returns

`Promise`<[`InitialGameState`](../interfaces/Backend_GameLogic_InitialGameStateDownloader.InitialGameState.md)\>

---

### makeProgressListener

▸ `Private` **makeProgressListener**(`prettyEntityName`): (`percent`: `number`) => `void`

#### Parameters

| Name               | Type     |
| :----------------- | :------- |
| `prettyEntityName` | `string` |

#### Returns

`fn`

▸ (`percent`): `void`

##### Parameters

| Name      | Type     |
| :-------- | :------- |
| `percent` | `number` |

##### Returns

`void`
