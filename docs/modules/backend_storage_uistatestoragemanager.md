# Module: Backend/Storage/UIStateStorageManager

## Table of contents

### Enumerations

- [UIDataKey](../enums/backend_storage_uistatestoragemanager.uidatakey.md)

### Classes

- [default](../classes/backend_storage_uistatestoragemanager.default.md)

### Type aliases

- [UIData](backend_storage_uistatestoragemanager.md#uidata)
- [UIDataValue](backend_storage_uistatestoragemanager.md#uidatavalue)

### Variables

- [defaultUserData](backend_storage_uistatestoragemanager.md#defaultuserdata)

### Functions

- [useStoredUIState](backend_storage_uistatestoragemanager.md#usestoreduistate)

## Type aliases

### UIData

Ƭ **UIData**: _object_

#### Type declaration

| Name                    | Type      |
| :---------------------- | :-------- |
| `foundArtifact`         | _boolean_ |
| `foundComet`            | _boolean_ |
| `foundDeadSpace`        | _boolean_ |
| `foundDeepSpace`        | _boolean_ |
| `foundPirates`          | _boolean_ |
| `foundSilver`           | _boolean_ |
| `foundSilverBank`       | _boolean_ |
| `foundSpace`            | _boolean_ |
| `foundTradingPost`      | _boolean_ |
| `hasAcceptedPluginRisk` | _boolean_ |
| `hasAddedCanvasPlugin`  | _boolean_ |
| `hasAddedReadme`        | _boolean_ |
| `highPerf`              | _boolean_ |
| `newPlayer`             | _boolean_ |
| `notifMove`             | _boolean_ |
| `shouldFling`           | _boolean_ |
| `sidebarEnabled`        | _boolean_ |
| `terminalEnabled`       | _boolean_ |
| `tutorialCompleted`     | _boolean_ |
| `welcomedPlayer`        | _boolean_ |

---

### UIDataValue

Ƭ **UIDataValue**: _boolean_

## Variables

### defaultUserData

• `Const` **defaultUserData**: [_UIData_](backend_storage_uistatestoragemanager.md#uidata)

## Functions

### useStoredUIState

▸ **useStoredUIState**<T\>(`key`: [_UIDataKey_](../enums/backend_storage_uistatestoragemanager.uidatakey.md), `gameUIManager`: [_default_](../classes/backend_gamelogic_gameuimanager.default.md) \| _undefined_): [T, *Dispatch*<SetStateAction<T\>\>]

#### Type parameters

| Name | Type      |
| :--- | :-------- |
| `T`  | _boolean_ |

#### Parameters

| Name            | Type                                                                              |
| :-------------- | :-------------------------------------------------------------------------------- |
| `key`           | [_UIDataKey_](../enums/backend_storage_uistatestoragemanager.uidatakey.md)        |
| `gameUIManager` | [_default_](../classes/backend_gamelogic_gameuimanager.default.md) \| _undefined_ |

**Returns:** [T, *Dispatch*<SetStateAction<T\>\>]
