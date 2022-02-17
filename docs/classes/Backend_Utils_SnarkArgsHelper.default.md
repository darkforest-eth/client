# Class: default

[Backend/Utils/SnarkArgsHelper](../modules/Backend_Utils_SnarkArgsHelper.md).default

## Table of contents

### Constructors

- [constructor](Backend_Utils_SnarkArgsHelper.default.md#constructor)

### Properties

- [biomebasePerlinOpts](Backend_Utils_SnarkArgsHelper.default.md#biomebaseperlinopts)
- [hashConfig](Backend_Utils_SnarkArgsHelper.default.md#hashconfig)
- [moveSnarkCache](Backend_Utils_SnarkArgsHelper.default.md#movesnarkcache)
- [planetHashMimc](Backend_Utils_SnarkArgsHelper.default.md#planethashmimc)
- [snarkProverQueue](Backend_Utils_SnarkArgsHelper.default.md#snarkproverqueue)
- [spaceTypePerlinOpts](Backend_Utils_SnarkArgsHelper.default.md#spacetypeperlinopts)
- [terminal](Backend_Utils_SnarkArgsHelper.default.md#terminal)
- [useMockHash](Backend_Utils_SnarkArgsHelper.default.md#usemockhash)
- [DEFAULT_SNARK_CACHE_SIZE](Backend_Utils_SnarkArgsHelper.default.md#default_snark_cache_size)

### Methods

- [fakeBiomebaseProof](Backend_Utils_SnarkArgsHelper.default.md#fakebiomebaseproof)
- [fakeInitProof](Backend_Utils_SnarkArgsHelper.default.md#fakeinitproof)
- [fakeMoveProof](Backend_Utils_SnarkArgsHelper.default.md#fakemoveproof)
- [fakeRevealProof](Backend_Utils_SnarkArgsHelper.default.md#fakerevealproof)
- [getFindArtifactArgs](Backend_Utils_SnarkArgsHelper.default.md#getfindartifactargs)
- [getInitArgs](Backend_Utils_SnarkArgsHelper.default.md#getinitargs)
- [getMoveArgs](Backend_Utils_SnarkArgsHelper.default.md#getmoveargs)
- [getRevealArgs](Backend_Utils_SnarkArgsHelper.default.md#getrevealargs)
- [setSnarkCacheSize](Backend_Utils_SnarkArgsHelper.default.md#setsnarkcachesize)
- [create](Backend_Utils_SnarkArgsHelper.default.md#create)

## Constructors

### constructor

• `Private` **new default**(`hashConfig`, `terminal`, `useMockHash`)

#### Parameters

| Name          | Type                                                                                                            |
| :------------ | :-------------------------------------------------------------------------------------------------------------- |
| `hashConfig`  | [`HashConfig`](../modules/types_global_GlobalTypes.md#hashconfig)                                               |
| `terminal`    | `MutableRefObject`<`undefined` \| [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md)\> |
| `useMockHash` | `boolean`                                                                                                       |

## Properties

### biomebasePerlinOpts

• `Private` `Readonly` **biomebasePerlinOpts**: `PerlinConfig`

---

### hashConfig

• `Private` `Readonly` **hashConfig**: [`HashConfig`](../modules/types_global_GlobalTypes.md#hashconfig)

---

### moveSnarkCache

• `Private` **moveSnarkCache**: `default`<`string`, `MoveSnarkContractCallArgs`\>

---

### planetHashMimc

• `Private` `Readonly` **planetHashMimc**: (...`inputs`: `number`[]) => `BigInteger`

#### Type declaration

▸ (...`inputs`): `BigInteger`

##### Parameters

| Name        | Type       |
| :---------- | :--------- |
| `...inputs` | `number`[] |

##### Returns

`BigInteger`

---

### snarkProverQueue

• `Private` `Readonly` **snarkProverQueue**: `SnarkProverQueue`

---

### spaceTypePerlinOpts

• `Private` `Readonly` **spaceTypePerlinOpts**: `PerlinConfig`

---

### terminal

• `Private` `Readonly` **terminal**: `MutableRefObject`<`undefined` \| [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md)\>

---

### useMockHash

• `Private` `Readonly` **useMockHash**: `boolean`

---

### DEFAULT_SNARK_CACHE_SIZE

▪ `Static` `Private` `Readonly` **DEFAULT_SNARK_CACHE_SIZE**: `20`

How many snark results to keep in an LRU cache.

## Methods

### fakeBiomebaseProof

▸ `Private` **fakeBiomebaseProof**(`x`, `y`): `SnarkJSProofAndSignals`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | `number` |
| `y`  | `number` |

#### Returns

`SnarkJSProofAndSignals`

---

### fakeInitProof

▸ `Private` **fakeInitProof**(`x`, `y`, `r`): `SnarkJSProofAndSignals`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | `number` |
| `y`  | `number` |
| `r`  | `number` |

#### Returns

`SnarkJSProofAndSignals`

---

### fakeMoveProof

▸ `Private` **fakeMoveProof**(`x1`, `y1`, `x2`, `y2`, `r`, `distMax`): `SnarkJSProofAndSignals`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `x1`      | `number` |
| `y1`      | `number` |
| `x2`      | `number` |
| `y2`      | `number` |
| `r`       | `number` |
| `distMax` | `number` |

#### Returns

`SnarkJSProofAndSignals`

---

### fakeRevealProof

▸ `Private` **fakeRevealProof**(`x`, `y`): `SnarkJSProofAndSignals`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | `number` |
| `y`  | `number` |

#### Returns

`SnarkJSProofAndSignals`

---

### getFindArtifactArgs

▸ **getFindArtifactArgs**(`x`, `y`): `Promise`<`BiomebaseSnarkContractCallArgs`\>

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | `number` |
| `y`  | `number` |

#### Returns

`Promise`<`BiomebaseSnarkContractCallArgs`\>

---

### getInitArgs

▸ **getInitArgs**(`x`, `y`, `r`): `Promise`<`InitSnarkContractCallArgs`\>

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | `number` |
| `y`  | `number` |
| `r`  | `number` |

#### Returns

`Promise`<`InitSnarkContractCallArgs`\>

---

### getMoveArgs

▸ **getMoveArgs**(`x1`, `y1`, `x2`, `y2`, `r`, `distMax`): `Promise`<`MoveSnarkContractCallArgs`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `x1`      | `number` |
| `y1`      | `number` |
| `x2`      | `number` |
| `y2`      | `number` |
| `r`       | `number` |
| `distMax` | `number` |

#### Returns

`Promise`<`MoveSnarkContractCallArgs`\>

---

### getRevealArgs

▸ **getRevealArgs**(`x`, `y`): `Promise`<`RevealSnarkContractCallArgs`\>

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | `number` |
| `y`  | `number` |

#### Returns

`Promise`<`RevealSnarkContractCallArgs`\>

---

### setSnarkCacheSize

▸ **setSnarkCacheSize**(`size`): `void`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `size` | `number` |

#### Returns

`void`

---

### create

▸ `Static` **create**(`hashConfig`, `terminal`, `fakeHash?`): [`default`](Backend_Utils_SnarkArgsHelper.default.md)

#### Parameters

| Name         | Type                                                                                                            | Default value |
| :----------- | :-------------------------------------------------------------------------------------------------------------- | :------------ |
| `hashConfig` | [`HashConfig`](../modules/types_global_GlobalTypes.md#hashconfig)                                               | `undefined`   |
| `terminal`   | `MutableRefObject`<`undefined` \| [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md)\> | `undefined`   |
| `fakeHash`   | `boolean`                                                                                                       | `false`       |

#### Returns

[`default`](Backend_Utils_SnarkArgsHelper.default.md)
