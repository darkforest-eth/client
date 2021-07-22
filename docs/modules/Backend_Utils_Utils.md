# Module: Backend/Utils/Utils

## Table of contents

### Type aliases

- [RetryErrorHandler](Backend_Utils_Utils.md#retryerrorhandler)

### Variables

- [ONE_DAY](Backend_Utils_Utils.md#one_day)

### Functions

- [aggregateBulkGetter](Backend_Utils_Utils.md#aggregatebulkgetter)
- [callWithRetry](Backend_Utils_Utils.md#callwithretry)
- [deferred](Backend_Utils_Utils.md#deferred)
- [formatNumber](Backend_Utils_Utils.md#formatnumber)
- [getFormatProp](Backend_Utils_Utils.md#getformatprop)
- [getGasSettingGwei](Backend_Utils_Utils.md#getgassettinggwei)
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
- [neverResolves](Backend_Utils_Utils.md#neverresolves)
- [rejectAfter](Backend_Utils_Utils.md#rejectafter)
- [sleep](Backend_Utils_Utils.md#sleep)
- [timeoutAfter](Backend_Utils_Utils.md#timeoutafter)
- [titleCase](Backend_Utils_Utils.md#titlecase)
- [upgradeName](Backend_Utils_Utils.md#upgradename)

## Type aliases

### RetryErrorHandler

Ƭ **RetryErrorHandler**: (`i`: `number`, `e`: `Error`) => `void`

#### Type declaration

▸ (`i`, `e`): `void`

##### Parameters

| Name | Type     |
| :--- | :------- |
| `i`  | `number` |
| `e`  | `Error`  |

##### Returns

`void`

## Variables

### ONE_DAY

• `Const` **ONE_DAY**: `number`

## Functions

### aggregateBulkGetter

▸ `Const` **aggregateBulkGetter**<`T`\>(`logTag`, `total`, `querySize`, `getterFn`, `onProgress?`): `Promise`<`T`[]\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name          | Type                                                            |
| :------------ | :-------------------------------------------------------------- |
| `logTag`      | `string`                                                        |
| `total`       | `number`                                                        |
| `querySize`   | `number`                                                        |
| `getterFn`    | (`startIdx`: `number`, `endIdx`: `number`) => `Promise`<`T`[]\> |
| `onProgress?` | (`fractionCompleted`: `number`) => `void`                       |

#### Returns

`Promise`<`T`[]\>

---

### callWithRetry

▸ `Const` **callWithRetry**<`T`\>(`fn`, `args?`, `onError?`, `maxRetries?`, `retryInterval?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name            | Type                                                            | Default value |
| :-------------- | :-------------------------------------------------------------- | :------------ |
| `fn`            | (...`args`: `unknown`[]) => `Promise`<`T`\>                     | `undefined`   |
| `args`          | `unknown`[]                                                     | `[]`          |
| `onError?`      | [`RetryErrorHandler`](Backend_Utils_Utils.md#retryerrorhandler) | `undefined`   |
| `maxRetries`    | `number`                                                        | `10`          |
| `retryInterval` | `number`                                                        | `1000`        |

#### Returns

`Promise`<`T`\>

---

### deferred

▸ **deferred**<`T`\>(): [(`t`: `T`) => `void`, (`t`: `Error`) => `void`, `Promise`<`T`\>]

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Returns

[(`t`: `T`) => `void`, (`t`: `Error`) => `void`, `Promise`<`T`\>]

---

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

### getGasSettingGwei

▸ **getGasSettingGwei**(`setting`, `gasPrices`): `number` \| `undefined`

#### Parameters

| Name        | Type                                                                        |
| :---------- | :-------------------------------------------------------------------------- |
| `setting`   | [`AutoGasSetting`](../enums/Frontend_Utils_SettingsHooks.AutoGasSetting.md) |
| `gasPrices` | `GasPrices`                                                                 |

#### Returns

`number` \| `undefined`

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

### neverResolves

▸ **neverResolves**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

---

### rejectAfter

▸ **rejectAfter**<`T`\>(`ms`, `msg`): `Promise`<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `ms`  | `number` |
| `msg` | `string` |

#### Returns

`Promise`<`T`\>

---

### sleep

▸ **sleep**<`T`\>(`timeout`, `returns?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `timeout`  | `number` |
| `returns?` | `T`      |

#### Returns

`Promise`<`T`\>

---

### timeoutAfter

▸ `Const` **timeoutAfter**<`T`\>(`promise`, `ms`, `timeoutMsg`): `Promise`<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type            |
| :----------- | :-------------- |
| `promise`    | `Promise`<`T`\> |
| `ms`         | `number`        |
| `timeoutMsg` | `string`        |

#### Returns

`Promise`<`T`\>

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
