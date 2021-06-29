# Module: Backend/Utils/Utils

## Table of contents

### Type aliases

- [RetryErrorHandler](backend_utils_utils.md#retryerrorhandler)

### Variables

- [ONE_DAY](backend_utils_utils.md#one_day)

### Functions

- [aggregateBulkGetter](backend_utils_utils.md#aggregatebulkgetter)
- [callWithRetry](backend_utils_utils.md#callwithretry)
- [deferred](backend_utils_utils.md#deferred)
- [formatNumber](backend_utils_utils.md#formatnumber)
- [getFormatProp](backend_utils_utils.md#getformatprop)
- [getOwnerColor](backend_utils_utils.md#getownercolor)
- [getPlanetMaxRank](backend_utils_utils.md#getplanetmaxrank)
- [getPlanetRank](backend_utils_utils.md#getplanetrank)
- [getPlanetShortHash](backend_utils_utils.md#getplanetshorthash)
- [getPlayerColor](backend_utils_utils.md#getplayercolor)
- [getPlayerShortHash](backend_utils_utils.md#getplayershorthash)
- [getRandomActionId](backend_utils_utils.md#getrandomactionid)
- [getUpgradeStat](backend_utils_utils.md#getupgradestat)
- [hasOwner](backend_utils_utils.md#hasowner)
- [hexifyBigIntNestedArray](backend_utils_utils.md#hexifybigintnestedarray)
- [hslStr](backend_utils_utils.md#hslstr)
- [isFullRank](backend_utils_utils.md#isfullrank)
- [neverResolves](backend_utils_utils.md#neverresolves)
- [rejectAfter](backend_utils_utils.md#rejectafter)
- [sleep](backend_utils_utils.md#sleep)
- [timeoutAfter](backend_utils_utils.md#timeoutafter)
- [titleCase](backend_utils_utils.md#titlecase)
- [upgradeName](backend_utils_utils.md#upgradename)

## Type aliases

### RetryErrorHandler

Ƭ **RetryErrorHandler**: (`i`: _number_, `e`: Error) => _void_

#### Type declaration

▸ (`i`: _number_, `e`: Error): _void_

#### Parameters

| Name | Type     |
| :--- | :------- |
| `i`  | _number_ |
| `e`  | Error    |

**Returns:** _void_

## Variables

### ONE_DAY

• `Const` **ONE_DAY**: _number_

## Functions

### aggregateBulkGetter

▸ `Const` **aggregateBulkGetter**<T\>(`logTag`: _string_, `total`: _number_, `querySize`: _number_, `getterFn`: (`startIdx`: _number_, `endIdx`: _number_) => _Promise_<T[]\>, `onProgress?`: (`fractionCompleted`: _number_) => _void_): _Promise_<T[]\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name          | Type                                                          |
| :------------ | :------------------------------------------------------------ |
| `logTag`      | _string_                                                      |
| `total`       | _number_                                                      |
| `querySize`   | _number_                                                      |
| `getterFn`    | (`startIdx`: _number_, `endIdx`: _number_) => _Promise_<T[]\> |
| `onProgress?` | (`fractionCompleted`: _number_) => _void_                     |

**Returns:** _Promise_<T[]\>

---

### callWithRetry

▸ `Const` **callWithRetry**<T\>(`fn`: (...`args`: _unknown_[]) => _Promise_<T\>, `args?`: _unknown_[], `onError?`: [_RetryErrorHandler_](backend_utils_utils.md#retryerrorhandler), `maxRetries?`: _number_, `retryInterval?`: _number_): _Promise_<T\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name            | Type                                                            | Default value |
| :-------------- | :-------------------------------------------------------------- | :------------ |
| `fn`            | (...`args`: _unknown_[]) => _Promise_<T\>                       | -             |
| `args`          | _unknown_[]                                                     | []            |
| `onError?`      | [_RetryErrorHandler_](backend_utils_utils.md#retryerrorhandler) | -             |
| `maxRetries`    | _number_                                                        | 10            |
| `retryInterval` | _number_                                                        | 1000          |

**Returns:** _Promise_<T\>

---

### deferred

▸ **deferred**<T\>(): [(`t`: T) => *void*, (`t`: Error) => *void*, *Promise*<T\>]

#### Type parameters

| Name |
| :--- |
| `T`  |

**Returns:** [(`t`: T) => *void*, (`t`: Error) => *void*, *Promise*<T\>]

---

### formatNumber

▸ `Const` **formatNumber**(`num`: _number_, `smallDec?`: _number_): _string_

#### Parameters

| Name       | Type     | Default value |
| :--------- | :------- | :------------ |
| `num`      | _number_ | -             |
| `smallDec` | _number_ | 0             |

**Returns:** _string_

---

### getFormatProp

▸ `Const` **getFormatProp**(`planet`: _undefined_ \| Planet, `prop`: _string_): _string_

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `planet` | _undefined_ \| Planet |
| `prop`   | _string_              |

**Returns:** _string_

---

### getOwnerColor

▸ `Const` **getOwnerColor**(`planet`: Planet): _string_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _string_

---

### getPlanetMaxRank

▸ `Const` **getPlanetMaxRank**(`planet`: _undefined_ \| Planet): _number_

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `planet` | _undefined_ \| Planet |

**Returns:** _number_

---

### getPlanetRank

▸ `Const` **getPlanetRank**(`planet`: _undefined_ \| Planet): _number_

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `planet` | _undefined_ \| Planet |

**Returns:** _number_

---

### getPlanetShortHash

▸ `Const` **getPlanetShortHash**(`planet`: _undefined_ \| Planet): _string_

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `planet` | _undefined_ \| Planet |

**Returns:** _string_

---

### getPlayerColor

▸ `Const` **getPlayerColor**(`player`: EthAddress): _string_

#### Parameters

| Name     | Type       |
| :------- | :--------- |
| `player` | EthAddress |

**Returns:** _string_

---

### getPlayerShortHash

▸ `Const` **getPlayerShortHash**(`address`: EthAddress): _string_

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `address` | EthAddress |

**Returns:** _string_

---

### getRandomActionId

▸ `Const` **getRandomActionId**(): _string_

**Returns:** _string_

---

### getUpgradeStat

▸ `Const` **getUpgradeStat**(`upgrade`: Upgrade, `stat`: [_StatIdx_](../enums/_types_global_globaltypes.statidx.md)): _number_

#### Parameters

| Name      | Type                                                       |
| :-------- | :--------------------------------------------------------- |
| `upgrade` | Upgrade                                                    |
| `stat`    | [_StatIdx_](../enums/_types_global_globaltypes.statidx.md) |

**Returns:** _number_

---

### hasOwner

▸ `Const` **hasOwner**(`planet`: Planet): _boolean_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _boolean_

---

### hexifyBigIntNestedArray

▸ `Const` **hexifyBigIntNestedArray**(`arr`: NestedBigIntArray): NestedStringArray

#### Parameters

| Name  | Type              |
| :---- | :---------------- |
| `arr` | NestedBigIntArray |

**Returns:** NestedStringArray

---

### hslStr

▸ `Const` **hslStr**(`h`: _number_, `s`: _number_, `l`: _number_): _string_

#### Parameters

| Name | Type     |
| :--- | :------- |
| `h`  | _number_ |
| `s`  | _number_ |
| `l`  | _number_ |

**Returns:** _string_

---

### isFullRank

▸ `Const` **isFullRank**(`planet`: _undefined_ \| Planet): _boolean_

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `planet` | _undefined_ \| Planet |

**Returns:** _boolean_

---

### neverResolves

▸ **neverResolves**(): _Promise_<void\>

**Returns:** _Promise_<void\>

---

### rejectAfter

▸ **rejectAfter**<T\>(`ms`: _number_, `msg`: _string_): _Promise_<T\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `ms`  | _number_ |
| `msg` | _string_ |

**Returns:** _Promise_<T\>

---

### sleep

▸ **sleep**<T\>(`timeout`: _number_, `returns?`: T): _Promise_<T\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `timeout`  | _number_ |
| `returns?` | T        |

**Returns:** _Promise_<T\>

---

### timeoutAfter

▸ `Const` **timeoutAfter**<T\>(`promise`: _Promise_<T\>, `ms`: _number_, `timeoutMsg`: _string_): _Promise_<T\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type          |
| :----------- | :------------ |
| `promise`    | _Promise_<T\> |
| `ms`         | _number_      |
| `timeoutMsg` | _string_      |

**Returns:** _Promise_<T\>

---

### titleCase

▸ `Const` **titleCase**(`title`: _string_): _string_

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `title` | _string_ |

**Returns:** _string_

---

### upgradeName

▸ `Const` **upgradeName**(`branchName`: UpgradeBranchName): _string_

#### Parameters

| Name         | Type              |
| :----------- | :---------------- |
| `branchName` | UpgradeBranchName |

**Returns:** _string_
