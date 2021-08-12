# Module: Backend/Utils/Utils

## Table of contents

### Variables

- [ONE_DAY](Backend_Utils_Utils.md#one_day)

### Functions

- [formatNumber](Backend_Utils_Utils.md#formatnumber)
- [getFormatProp](Backend_Utils_Utils.md#getformatprop)
- [getOwnerColor](Backend_Utils_Utils.md#getownercolor)
- [getPlanetMaxRank](Backend_Utils_Utils.md#getplanetmaxrank)
- [getPlanetRank](Backend_Utils_Utils.md#getplanetrank)
- [getPlanetShortHash](Backend_Utils_Utils.md#getplanetshorthash)
- [getPlayerColor](Backend_Utils_Utils.md#getplayercolor)
- [getPlayerShortHash](Backend_Utils_Utils.md#getplayershorthash)
- [getRandomActionId](Backend_Utils_Utils.md#getrandomactionid)
- [getUpgradeStat](Backend_Utils_Utils.md#getupgradestat)
- [hasOwner](Backend_Utils_Utils.md#hasowner)
- [hexifyBigIntNestedArray](Backend_Utils_Utils.md#hexifybigintnestedarray)
- [hslStr](Backend_Utils_Utils.md#hslstr)
- [isFullRank](Backend_Utils_Utils.md#isfullrank)
- [titleCase](Backend_Utils_Utils.md#titlecase)
- [upgradeName](Backend_Utils_Utils.md#upgradename)

## Variables

### ONE_DAY

• `Const` **ONE_DAY**: `number`

## Functions

### formatNumber

▸ `Const` **formatNumber**(`num`, `smallDec?`): `string`

#### Parameters

| Name       | Type     | Default value |
| :--------- | :------- | :------------ |
| `num`      | `number` | `undefined`   |
| `smallDec` | `number` | `0`           |

#### Returns

`string`

---

### getFormatProp

▸ `Const` **getFormatProp**(`planet`, `prop`): `string`

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |
| `prop`   | `string`                |

#### Returns

`string`

---

### getOwnerColor

▸ `Const` **getOwnerColor**(`planet`): `string`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`string`

---

### getPlanetMaxRank

▸ `Const` **getPlanetMaxRank**(`planet`): `number`

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |

#### Returns

`number`

---

### getPlanetRank

▸ `Const` **getPlanetRank**(`planet`): `number`

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |

#### Returns

`number`

---

### getPlanetShortHash

▸ `Const` **getPlanetShortHash**(`planet`): `string`

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |

#### Returns

`string`

---

### getPlayerColor

▸ `Const` **getPlayerColor**(`player`): `string`

#### Parameters

| Name     | Type         |
| :------- | :----------- |
| `player` | `EthAddress` |

#### Returns

`string`

---

### getPlayerShortHash

▸ `Const` **getPlayerShortHash**(`address`): `string`

#### Parameters

| Name      | Type         |
| :-------- | :----------- |
| `address` | `EthAddress` |

#### Returns

`string`

---

### getRandomActionId

▸ `Const` **getRandomActionId**(): `string`

#### Returns

`string`

---

### getUpgradeStat

▸ `Const` **getUpgradeStat**(`upgrade`, `stat`): `number`

#### Parameters

| Name      | Type                                                       |
| :-------- | :--------------------------------------------------------- |
| `upgrade` | `Upgrade`                                                  |
| `stat`    | [`StatIdx`](../enums/_types_global_GlobalTypes.StatIdx.md) |

#### Returns

`number`

---

### hasOwner

▸ `Const` **hasOwner**(`planet`): `boolean`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`boolean`

---

### hexifyBigIntNestedArray

▸ `Const` **hexifyBigIntNestedArray**(`arr`): `NestedStringArray`

#### Parameters

| Name  | Type                |
| :---- | :------------------ |
| `arr` | `NestedBigIntArray` |

#### Returns

`NestedStringArray`

---

### hslStr

▸ `Const` **hslStr**(`h`, `s`, `l`): `string`

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

▸ `Const` **isFullRank**(`planet`): `boolean`

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |

#### Returns

`boolean`

---

### titleCase

▸ `Const` **titleCase**(`title`): `string`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `title` | `string` |

#### Returns

`string`

---

### upgradeName

▸ `Const` **upgradeName**(`branchName`): `string`

#### Parameters

| Name         | Type                |
| :----------- | :------------------ |
| `branchName` | `UpgradeBranchName` |

#### Returns

`string`
