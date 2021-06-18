# Class: default

[Frontend/Game/NotificationManager](../modules/frontend_game_notificationmanager.md).default

## Hierarchy

- _EventEmitter_

  ↳ **default**

## Table of contents

### Constructors

- [constructor](frontend_game_notificationmanager.default.md#constructor)

### Properties

- [instance](frontend_game_notificationmanager.default.md#instance)

### Methods

- [balanceEmpty](frontend_game_notificationmanager.default.md#balanceempty)
- [foundArtifact](frontend_game_notificationmanager.default.md#foundartifact)
- [foundBiome](frontend_game_notificationmanager.default.md#foundbiome)
- [foundComet](frontend_game_notificationmanager.default.md#foundcomet)
- [foundDeadSpace](frontend_game_notificationmanager.default.md#founddeadspace)
- [foundDeepSpace](frontend_game_notificationmanager.default.md#founddeepspace)
- [foundPirates](frontend_game_notificationmanager.default.md#foundpirates)
- [foundSilver](frontend_game_notificationmanager.default.md#foundsilver)
- [foundSilverBank](frontend_game_notificationmanager.default.md#foundsilverbank)
- [foundSpace](frontend_game_notificationmanager.default.md#foundspace)
- [foundTradingPost](frontend_game_notificationmanager.default.md#foundtradingpost)
- [getIcon](frontend_game_notificationmanager.default.md#geticon)
- [notify](frontend_game_notificationmanager.default.md#notify)
- [notifyTx](frontend_game_notificationmanager.default.md#notifytx)
- [planetCanUpgrade](frontend_game_notificationmanager.default.md#planetcanupgrade)
- [receivedPlanet](frontend_game_notificationmanager.default.md#receivedplanet)
- [txConfirm](frontend_game_notificationmanager.default.md#txconfirm)
- [txInit](frontend_game_notificationmanager.default.md#txinit)
- [txRevert](frontend_game_notificationmanager.default.md#txrevert)
- [txSubmit](frontend_game_notificationmanager.default.md#txsubmit)
- [unsubmittedTxFail](frontend_game_notificationmanager.default.md#unsubmittedtxfail)
- [welcomePlayer](frontend_game_notificationmanager.default.md#welcomeplayer)
- [getInstance](frontend_game_notificationmanager.default.md#getinstance)

## Constructors

### constructor

\+ `Private` **new default**(): [_default_](frontend_game_notificationmanager.default.md)

**Returns:** [_default_](frontend_game_notificationmanager.default.md)

Overrides: EventEmitter.constructor

## Properties

### instance

▪ `Static` **instance**: [_default_](frontend_game_notificationmanager.default.md)

## Methods

### balanceEmpty

▸ **balanceEmpty**(): _void_

**Returns:** _void_

---

### foundArtifact

▸ **foundArtifact**(`planet`: LocatablePlanet): _void_

#### Parameters

| Name     | Type            |
| :------- | :-------------- |
| `planet` | LocatablePlanet |

**Returns:** _void_

---

### foundBiome

▸ **foundBiome**(`planet`: LocatablePlanet): _void_

#### Parameters

| Name     | Type            |
| :------- | :-------------- |
| `planet` | LocatablePlanet |

**Returns:** _void_

---

### foundComet

▸ **foundComet**(`planet`: Planet): _void_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _void_

---

### foundDeadSpace

▸ **foundDeadSpace**(`chunk`: [_Chunk_](_types_global_globaltypes.chunk.md)): _void_

#### Parameters

| Name    | Type                                          |
| :------ | :-------------------------------------------- |
| `chunk` | [_Chunk_](_types_global_globaltypes.chunk.md) |

**Returns:** _void_

---

### foundDeepSpace

▸ **foundDeepSpace**(`chunk`: [_Chunk_](_types_global_globaltypes.chunk.md)): _void_

#### Parameters

| Name    | Type                                          |
| :------ | :-------------------------------------------- |
| `chunk` | [_Chunk_](_types_global_globaltypes.chunk.md) |

**Returns:** _void_

---

### foundPirates

▸ **foundPirates**(`planet`: Planet): _void_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _void_

---

### foundSilver

▸ **foundSilver**(`planet`: Planet): _void_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _void_

---

### foundSilverBank

▸ **foundSilverBank**(`planet`: Planet): _void_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _void_

---

### foundSpace

▸ **foundSpace**(`chunk`: [_Chunk_](_types_global_globaltypes.chunk.md)): _void_

#### Parameters

| Name    | Type                                          |
| :------ | :-------------------------------------------- |
| `chunk` | [_Chunk_](_types_global_globaltypes.chunk.md) |

**Returns:** _void_

---

### foundTradingPost

▸ **foundTradingPost**(`planet`: Planet): _void_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _void_

---

### getIcon

▸ `Private` **getIcon**(`type`: [_NotificationType_](../enums/frontend_game_notificationmanager.notificationtype.md)): _Element_

#### Parameters

| Name   | Type                                                                                 |
| :----- | :----------------------------------------------------------------------------------- |
| `type` | [_NotificationType_](../enums/frontend_game_notificationmanager.notificationtype.md) |

**Returns:** _Element_

---

### notify

▸ **notify**(`type`: [_NotificationType_](../enums/frontend_game_notificationmanager.notificationtype.md), `message`: ReactNode): _void_

#### Parameters

| Name      | Type                                                                                 |
| :-------- | :----------------------------------------------------------------------------------- |
| `type`    | [_NotificationType_](../enums/frontend_game_notificationmanager.notificationtype.md) |
| `message` | ReactNode                                                                            |

**Returns:** _void_

---

### notifyTx

▸ **notifyTx**(`txData`: TxIntent, `message`: ReactNode, `txStatus`: EthTxStatus): _void_

#### Parameters

| Name       | Type        |
| :--------- | :---------- |
| `txData`   | TxIntent    |
| `message`  | ReactNode   |
| `txStatus` | EthTxStatus |

**Returns:** _void_

---

### planetCanUpgrade

▸ **planetCanUpgrade**(`planet`: Planet): _void_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _void_

---

### receivedPlanet

▸ **receivedPlanet**(`planet`: Planet): _void_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _void_

---

### txConfirm

▸ **txConfirm**(`tx`: SubmittedTx): _void_

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `tx` | SubmittedTx |

**Returns:** _void_

---

### txInit

▸ **txInit**(`txIntent`: TxIntent): _void_

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `txIntent` | TxIntent |

**Returns:** _void_

---

### txRevert

▸ **txRevert**(`tx`: SubmittedTx): _void_

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `tx` | SubmittedTx |

**Returns:** _void_

---

### txSubmit

▸ **txSubmit**(`tx`: SubmittedTx): _void_

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `tx` | SubmittedTx |

**Returns:** _void_

---

### unsubmittedTxFail

▸ **unsubmittedTxFail**(`txIntent`: TxIntent, `_e`: Error): _void_

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `txIntent` | TxIntent |
| `_e`       | Error    |

**Returns:** _void_

---

### welcomePlayer

▸ **welcomePlayer**(): _void_

**Returns:** _void_

---

### getInstance

▸ `Static` **getInstance**(): [_default_](frontend_game_notificationmanager.default.md)

**Returns:** [_default_](frontend_game_notificationmanager.default.md)
