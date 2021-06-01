# Class: InitialGameStateDownloader

[Backend/GameLogic/InitialGameStateDownloader](../modules/backend_gamelogic_initialgamestatedownloader.md).InitialGameStateDownloader

## Table of contents

### Constructors

- [constructor](backend_gamelogic_initialgamestatedownloader.initialgamestatedownloader.md#constructor)

### Properties

- [terminal](backend_gamelogic_initialgamestatedownloader.initialgamestatedownloader.md#terminal)

### Methods

- [download](backend_gamelogic_initialgamestatedownloader.initialgamestatedownloader.md#download)
- [makeProgressListener](backend_gamelogic_initialgamestatedownloader.initialgamestatedownloader.md#makeprogresslistener)

## Constructors

### constructor

\+ **new InitialGameStateDownloader**(`terminal`: [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)): [_InitialGameStateDownloader_](backend_gamelogic_initialgamestatedownloader.initialgamestatedownloader.md)

#### Parameters

| Name       | Type                                                                        |
| :--------- | :-------------------------------------------------------------------------- |
| `terminal` | [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md) |

**Returns:** [_InitialGameStateDownloader_](backend_gamelogic_initialgamestatedownloader.initialgamestatedownloader.md)

## Properties

### terminal

• `Private` **terminal**: [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)

## Methods

### download

▸ **download**(`contractsAPI`: [_default_](backend_gamelogic_contractsapi.default.md), `persistentChunkStore`: [_default_](backend_storage_persistentchunkstore.default.md)): _Promise_<[_InitialGameState_](../interfaces/backend_gamelogic_initialgamestatedownloader.initialgamestate.md)\>

#### Parameters

| Name                   | Type                                                         |
| :--------------------- | :----------------------------------------------------------- |
| `contractsAPI`         | [_default_](backend_gamelogic_contractsapi.default.md)       |
| `persistentChunkStore` | [_default_](backend_storage_persistentchunkstore.default.md) |

**Returns:** _Promise_<[_InitialGameState_](../interfaces/backend_gamelogic_initialgamestatedownloader.initialgamestate.md)\>

---

### makeProgressListener

▸ `Private` **makeProgressListener**(`prettyEntityName`: _string_): _function_

#### Parameters

| Name               | Type     |
| :----------------- | :------- |
| `prettyEntityName` | _string_ |

**Returns:** (`percent`: _number_) => _void_
