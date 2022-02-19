# Class: default

[Frontend/Game/NotificationManager](../modules/Frontend_Game_NotificationManager.md).default

## Hierarchy

- `EventEmitter`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](Frontend_Game_NotificationManager.default.md#constructor)

### Properties

- [instance](Frontend_Game_NotificationManager.default.md#instance)

### Methods

- [artifactFound](Frontend_Game_NotificationManager.default.md#artifactfound)
- [artifactProspected](Frontend_Game_NotificationManager.default.md#artifactprospected)
- [balanceEmpty](Frontend_Game_NotificationManager.default.md#balanceempty)
- [clearNotification](Frontend_Game_NotificationManager.default.md#clearnotification)
- [foundBiome](Frontend_Game_NotificationManager.default.md#foundbiome)
- [foundComet](Frontend_Game_NotificationManager.default.md#foundcomet)
- [foundDeadSpace](Frontend_Game_NotificationManager.default.md#founddeadspace)
- [foundDeepSpace](Frontend_Game_NotificationManager.default.md#founddeepspace)
- [foundFoundry](Frontend_Game_NotificationManager.default.md#foundfoundry)
- [foundPirates](Frontend_Game_NotificationManager.default.md#foundpirates)
- [foundSilver](Frontend_Game_NotificationManager.default.md#foundsilver)
- [foundSilverBank](Frontend_Game_NotificationManager.default.md#foundsilverbank)
- [foundSpace](Frontend_Game_NotificationManager.default.md#foundspace)
- [foundTradingPost](Frontend_Game_NotificationManager.default.md#foundtradingpost)
- [getIcon](Frontend_Game_NotificationManager.default.md#geticon)
- [notify](Frontend_Game_NotificationManager.default.md#notify)
- [planetAttacked](Frontend_Game_NotificationManager.default.md#planetattacked)
- [planetCanUpgrade](Frontend_Game_NotificationManager.default.md#planetcanupgrade)
- [planetConquered](Frontend_Game_NotificationManager.default.md#planetconquered)
- [planetLost](Frontend_Game_NotificationManager.default.md#planetlost)
- [reallyLongNotification](Frontend_Game_NotificationManager.default.md#reallylongnotification)
- [receivedPlanet](Frontend_Game_NotificationManager.default.md#receivedplanet)
- [txInitError](Frontend_Game_NotificationManager.default.md#txiniterror)
- [welcomePlayer](Frontend_Game_NotificationManager.default.md#welcomeplayer)
- [getInstance](Frontend_Game_NotificationManager.default.md#getinstance)

## Constructors

### constructor

• `Private` **new default**()

#### Overrides

EventEmitter.constructor

## Properties

### instance

▪ `Static` **instance**: [`default`](Frontend_Game_NotificationManager.default.md)

## Methods

### artifactFound

▸ **artifactFound**(`planet`, `artifact`): `void`

#### Parameters

| Name       | Type              |
| :--------- | :---------------- |
| `planet`   | `LocatablePlanet` |
| `artifact` | `Artifact`        |

#### Returns

`void`

---

### artifactProspected

▸ **artifactProspected**(`planet`): `void`

#### Parameters

| Name     | Type              |
| :------- | :---------------- |
| `planet` | `LocatablePlanet` |

#### Returns

`void`

---

### balanceEmpty

▸ **balanceEmpty**(): `void`

#### Returns

`void`

---

### clearNotification

▸ **clearNotification**(`id`): `void`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `string` |

#### Returns

`void`

---

### foundBiome

▸ **foundBiome**(`planet`): `void`

#### Parameters

| Name     | Type              |
| :------- | :---------------- |
| `planet` | `LocatablePlanet` |

#### Returns

`void`

---

### foundComet

▸ **foundComet**(`planet`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`void`

---

### foundDeadSpace

▸ **foundDeadSpace**(`chunk`): `void`

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `chunk` | `Chunk` |

#### Returns

`void`

---

### foundDeepSpace

▸ **foundDeepSpace**(`chunk`): `void`

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `chunk` | `Chunk` |

#### Returns

`void`

---

### foundFoundry

▸ **foundFoundry**(`planet`): `void`

#### Parameters

| Name     | Type              |
| :------- | :---------------- |
| `planet` | `LocatablePlanet` |

#### Returns

`void`

---

### foundPirates

▸ **foundPirates**(`planet`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`void`

---

### foundSilver

▸ **foundSilver**(`planet`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`void`

---

### foundSilverBank

▸ **foundSilverBank**(`planet`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`void`

---

### foundSpace

▸ **foundSpace**(`chunk`): `void`

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `chunk` | `Chunk` |

#### Returns

`void`

---

### foundTradingPost

▸ **foundTradingPost**(`planet`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`void`

---

### getIcon

▸ `Private` **getIcon**(`type`): `Element`

#### Parameters

| Name   | Type                                                                                 |
| :----- | :----------------------------------------------------------------------------------- |
| `type` | [`NotificationType`](../enums/Frontend_Game_NotificationManager.NotificationType.md) |

#### Returns

`Element`

---

### notify

▸ **notify**(`type`, `message`): `void`

#### Parameters

| Name      | Type                                                                                 |
| :-------- | :----------------------------------------------------------------------------------- |
| `type`    | [`NotificationType`](../enums/Frontend_Game_NotificationManager.NotificationType.md) |
| `message` | `ReactNode`                                                                          |

#### Returns

`void`

---

### planetAttacked

▸ **planetAttacked**(`planet`): `void`

#### Parameters

| Name     | Type              |
| :------- | :---------------- |
| `planet` | `LocatablePlanet` |

#### Returns

`void`

---

### planetCanUpgrade

▸ **planetCanUpgrade**(`planet`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`void`

---

### planetConquered

▸ **planetConquered**(`planet`): `void`

#### Parameters

| Name     | Type              |
| :------- | :---------------- |
| `planet` | `LocatablePlanet` |

#### Returns

`void`

---

### planetLost

▸ **planetLost**(`planet`): `void`

#### Parameters

| Name     | Type              |
| :------- | :---------------- |
| `planet` | `LocatablePlanet` |

#### Returns

`void`

---

### reallyLongNotification

▸ **reallyLongNotification**(): `void`

#### Returns

`void`

---

### receivedPlanet

▸ **receivedPlanet**(`planet`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`void`

---

### txInitError

▸ **txInitError**(`methodName`, `failureReason`): `void`

#### Parameters

| Name            | Type                 |
| :-------------- | :------------------- |
| `methodName`    | `ContractMethodName` |
| `failureReason` | `string`             |

#### Returns

`void`

---

### welcomePlayer

▸ **welcomePlayer**(): `void`

#### Returns

`void`

---

### getInstance

▸ `Static` **getInstance**(): [`default`](Frontend_Game_NotificationManager.default.md)

#### Returns

[`default`](Frontend_Game_NotificationManager.default.md)
