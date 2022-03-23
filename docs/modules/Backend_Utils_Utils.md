# Module: Backend/Utils/Utils

## Table of contents

### Variables

- [ONE_DAY](Backend_Utils_Utils.md#one_day)

### Functions

- [getFormatProp](Backend_Utils_Utils.md#getformatprop)
- [getOwnerColor](Backend_Utils_Utils.md#getownercolor)
- [getPlanetMaxRank](Backend_Utils_Utils.md#getplanetmaxrank)
- [getPlanetRank](Backend_Utils_Utils.md#getplanetrank)
- [getPlanetShortHash](Backend_Utils_Utils.md#getplanetshorthash)
- [getPlayerColor](Backend_Utils_Utils.md#getplayercolor)
- [getPlayerShortHash](Backend_Utils_Utils.md#getplayershorthash)
- [getRandomActionId](Backend_Utils_Utils.md#getrandomactionid)
- [getUpgradeStat](Backend_Utils_Utils.md#getupgradestat)
- [hexifyBigIntNestedArray](Backend_Utils_Utils.md#hexifybigintnestedarray)
- [hslStr](Backend_Utils_Utils.md#hslstr)
- [isFullRank](Backend_Utils_Utils.md#isfullrank)
- [titleCase](Backend_Utils_Utils.md#titlecase)
- [upgradeName](Backend_Utils_Utils.md#upgradename)

## Variables

### ONE_DAY

• `Const` **ONE_DAY**: `number`

## Functions

### getFormatProp

▸ **getFormatProp**(`planet`, `prop`): `string`

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |
| `prop`   | `string`                |

#### Returns

`string`

---

### getOwnerColor

▸ **getOwnerColor**(`planet`): `string`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`string`

---

### getPlanetMaxRank

▸ **getPlanetMaxRank**(`planet`): `number`

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |

#### Returns

`number`

---

### getPlanetRank

▸ **getPlanetRank**(`planet`): `number`

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |

#### Returns

`number`

---

### getPlanetShortHash

▸ **getPlanetShortHash**(`planet`): `string`

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |

#### Returns

`string`

---

### getPlayerColor

▸ **getPlayerColor**(`player`): `string`

#### Parameters

| Name     | Type         |
| :------- | :----------- |
| `player` | `EthAddress` |

#### Returns

`string`

---

### getPlayerShortHash

▸ **getPlayerShortHash**(`address`): `string`

#### Parameters

| Name      | Type         |
| :-------- | :----------- |
| `address` | `EthAddress` |

#### Returns

`string`

---

### getRandomActionId

▸ **getRandomActionId**(): `string`

#### Returns

`string`

---

### getUpgradeStat

▸ **getUpgradeStat**(`upgrade`, `stat`): `number`

#### Parameters

| Name      | Type                                                      |
| :-------- | :-------------------------------------------------------- |
| `upgrade` | `Upgrade`                                                 |
| `stat`    | [`StatIdx`](../enums/types_global_GlobalTypes.StatIdx.md) |

#### Returns

`number`

---

### hexifyBigIntNestedArray

▸ **hexifyBigIntNestedArray**(`arr`): `NestedStringArray`

#### Parameters

| Name  | Type                |
| :---- | :------------------ |
| `arr` | `NestedBigIntArray` |

#### Returns

`NestedStringArray`

---

### hslStr

▸ **hslStr**(`h`, `s`, `l`): `string`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `h`  | `number` |
| `s`  | `number` |
| `l`  | `number` |

#### Returns

`string`

---

### isFullRank

▸ **isFullRank**(`planet`): `boolean`

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |

#### Returns

`boolean`

---

### titleCase

▸ **titleCase**(`title`): `string`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `title` | `string` |

#### Returns

`string`

---

### upgradeName

▸ **upgradeName**(`branchName`): `string`

#### Parameters

| Name         | Type                |
| :----------- | :------------------ |
| `branchName` | `UpgradeBranchName` |

#### Returns

`string`
