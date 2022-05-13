# Module: Backend/Utils/Coordinates

## Table of contents

### Functions

- [coordsEqual](Backend_Utils_Coordinates.md#coordsequal)
- [distL2](Backend_Utils_Coordinates.md#distl2)
- [normalizeVector](Backend_Utils_Coordinates.md#normalizevector)
- [scaleVector](Backend_Utils_Coordinates.md#scalevector)
- [vectorLength](Backend_Utils_Coordinates.md#vectorlength)

## Functions

### coordsEqual

▸ **coordsEqual**(`a`, `b`): `boolean`

#### Parameters

| Name | Type          |
| :--- | :------------ |
| `a`  | `WorldCoords` |
| `b`  | `WorldCoords` |

#### Returns

`boolean`

---

### distL2

▸ **distL2**(`a`, `b`): `number`

#### Parameters

| Name | Type                            |
| :--- | :------------------------------ |
| `a`  | `WorldCoords` \| `CanvasCoords` |
| `b`  | `WorldCoords` \| `CanvasCoords` |

#### Returns

`number`

---

### normalizeVector

▸ **normalizeVector**(`a`): `WorldCoords`

#### Parameters

| Name | Type          |
| :--- | :------------ |
| `a`  | `WorldCoords` |

#### Returns

`WorldCoords`

---

### scaleVector

▸ **scaleVector**(`a`, `k`): `Object`

#### Parameters

| Name | Type          |
| :--- | :------------ |
| `a`  | `WorldCoords` |
| `k`  | `number`      |

#### Returns

`Object`

| Name | Type     |
| :--- | :------- |
| `x`  | `number` |
| `y`  | `number` |

---

### vectorLength

▸ **vectorLength**(`a`): `number`

#### Parameters

| Name | Type                            |
| :--- | :------------------------------ |
| `a`  | `WorldCoords` \| `CanvasCoords` |

#### Returns

`number`
