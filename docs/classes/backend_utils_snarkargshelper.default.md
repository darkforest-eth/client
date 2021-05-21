# Class: default

[Backend/Utils/SnarkArgsHelper](../modules/backend_utils_snarkargshelper.md).default

## Table of contents

### Constructors

- [constructor](backend_utils_snarkargshelper.default.md#constructor)

### Properties

- [biomebasePerlinOpts](backend_utils_snarkargshelper.default.md#biomebaseperlinopts)
- [hashConfig](backend_utils_snarkargshelper.default.md#hashconfig)
- [moveSnarkCache](backend_utils_snarkargshelper.default.md#movesnarkcache)
- [planetHashMimc](backend_utils_snarkargshelper.default.md#planethashmimc)
- [snarkProverQueue](backend_utils_snarkargshelper.default.md#snarkproverqueue)
- [spaceTypePerlinOpts](backend_utils_snarkargshelper.default.md#spacetypeperlinopts)
- [terminal](backend_utils_snarkargshelper.default.md#terminal)
- [useMockHash](backend_utils_snarkargshelper.default.md#usemockhash)
- [DEFAULT_SNARK_CACHE_SIZE](backend_utils_snarkargshelper.default.md#default_snark_cache_size)

### Methods

- [fakeBiomebaseProof](backend_utils_snarkargshelper.default.md#fakebiomebaseproof)
- [fakeInitProof](backend_utils_snarkargshelper.default.md#fakeinitproof)
- [fakeMoveProof](backend_utils_snarkargshelper.default.md#fakemoveproof)
- [fakeRevealProof](backend_utils_snarkargshelper.default.md#fakerevealproof)
- [getFindArtifactArgs](backend_utils_snarkargshelper.default.md#getfindartifactargs)
- [getInitArgs](backend_utils_snarkargshelper.default.md#getinitargs)
- [getMoveArgs](backend_utils_snarkargshelper.default.md#getmoveargs)
- [getRevealArgs](backend_utils_snarkargshelper.default.md#getrevealargs)
- [setSnarkCacheSize](backend_utils_snarkargshelper.default.md#setsnarkcachesize)
- [create](backend_utils_snarkargshelper.default.md#create)

## Constructors

### constructor

\+ `Private` **new default**(`hashConfig`: [_HashConfig_](../modules/_types_global_globaltypes.md#hashconfig), `terminal`: _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\>, `useMockHash`: _boolean_): [_default_](backend_utils_snarkargshelper.default.md)

#### Parameters

| Name          | Type                                                                                                          |
| :------------ | :------------------------------------------------------------------------------------------------------------ |
| `hashConfig`  | [_HashConfig_](../modules/_types_global_globaltypes.md#hashconfig)                                            |
| `terminal`    | _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\> |
| `useMockHash` | _boolean_                                                                                                     |

**Returns:** [_default_](backend_utils_snarkargshelper.default.md)

## Properties

### biomebasePerlinOpts

• `Private` `Readonly` **biomebasePerlinOpts**: PerlinConfig

---

### hashConfig

• `Private` `Readonly` **hashConfig**: [_HashConfig_](../modules/_types_global_globaltypes.md#hashconfig)

---

### moveSnarkCache

• `Private` **moveSnarkCache**: _default_<string, MoveSnarkContractCallArgs\>

---

### planetHashMimc

• `Private` `Readonly` **planetHashMimc**: (...`inputs`: _number_[]) => BigInteger

#### Type declaration

▸ (...`inputs`: _number_[]): BigInteger

#### Parameters

| Name        | Type       |
| :---------- | :--------- |
| `...inputs` | _number_[] |

**Returns:** BigInteger

---

### snarkProverQueue

• `Private` `Readonly` **snarkProverQueue**: _SnarkProverQueue_

---

### spaceTypePerlinOpts

• `Private` `Readonly` **spaceTypePerlinOpts**: PerlinConfig

---

### terminal

• `Private` `Readonly` **terminal**: _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\>

---

### useMockHash

• `Private` `Readonly` **useMockHash**: _boolean_

---

### DEFAULT_SNARK_CACHE_SIZE

▪ `Static` `Private` `Readonly` **DEFAULT_SNARK_CACHE_SIZE**: `20`= 20

How many snark results to keep in an LRU cache.

## Methods

### fakeBiomebaseProof

▸ `Private` **fakeBiomebaseProof**(`x`: _number_, `y`: _number_): SnarkJSProofAndSignals

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | _number_ |
| `y`  | _number_ |

**Returns:** SnarkJSProofAndSignals

---

### fakeInitProof

▸ `Private` **fakeInitProof**(`x`: _number_, `y`: _number_, `r`: _number_): SnarkJSProofAndSignals

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | _number_ |
| `y`  | _number_ |
| `r`  | _number_ |

**Returns:** SnarkJSProofAndSignals

---

### fakeMoveProof

▸ `Private` **fakeMoveProof**(`x1`: _number_, `y1`: _number_, `x2`: _number_, `y2`: _number_, `r`: _number_, `distMax`: _number_): SnarkJSProofAndSignals

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `x1`      | _number_ |
| `y1`      | _number_ |
| `x2`      | _number_ |
| `y2`      | _number_ |
| `r`       | _number_ |
| `distMax` | _number_ |

**Returns:** SnarkJSProofAndSignals

---

### fakeRevealProof

▸ `Private` **fakeRevealProof**(`x`: _number_, `y`: _number_): SnarkJSProofAndSignals

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | _number_ |
| `y`  | _number_ |

**Returns:** SnarkJSProofAndSignals

---

### getFindArtifactArgs

▸ **getFindArtifactArgs**(`x`: _number_, `y`: _number_): _Promise_<BiomebaseSnarkContractCallArgs\>

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | _number_ |
| `y`  | _number_ |

**Returns:** _Promise_<BiomebaseSnarkContractCallArgs\>

---

### getInitArgs

▸ **getInitArgs**(`x`: _number_, `y`: _number_, `r`: _number_): _Promise_<InitSnarkContractCallArgs\>

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | _number_ |
| `y`  | _number_ |
| `r`  | _number_ |

**Returns:** _Promise_<InitSnarkContractCallArgs\>

---

### getMoveArgs

▸ **getMoveArgs**(`x1`: _number_, `y1`: _number_, `x2`: _number_, `y2`: _number_, `r`: _number_, `distMax`: _number_): _Promise_<MoveSnarkContractCallArgs\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `x1`      | _number_ |
| `y1`      | _number_ |
| `x2`      | _number_ |
| `y2`      | _number_ |
| `r`       | _number_ |
| `distMax` | _number_ |

**Returns:** _Promise_<MoveSnarkContractCallArgs\>

---

### getRevealArgs

▸ **getRevealArgs**(`x`: _number_, `y`: _number_): _Promise_<RevealSnarkContractCallArgs\>

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | _number_ |
| `y`  | _number_ |

**Returns:** _Promise_<RevealSnarkContractCallArgs\>

---

### setSnarkCacheSize

▸ **setSnarkCacheSize**(`size`: _number_): _void_

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `size` | _number_ |

**Returns:** _void_

---

### create

▸ `Static` **create**(`hashConfig`: [_HashConfig_](../modules/_types_global_globaltypes.md#hashconfig), `terminal`: _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\>, `fakeHash?`: _boolean_): [_default_](backend_utils_snarkargshelper.default.md)

#### Parameters

| Name         | Type                                                                                                          | Default value |
| :----------- | :------------------------------------------------------------------------------------------------------------ | :------------ |
| `hashConfig` | [_HashConfig_](../modules/_types_global_globaltypes.md#hashconfig)                                            | -             |
| `terminal`   | _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\> | -             |
| `fakeHash`   | _boolean_                                                                                                     | false         |

**Returns:** [_default_](backend_utils_snarkargshelper.default.md)
