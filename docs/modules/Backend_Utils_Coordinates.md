# Module: Backend/Utils/Coordinates

## Table of contents

### Interfaces

- [CanvasCoords](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md)

### Functions

- [coordsEqual](Backend_Utils_Coordinates.md#coordsequal)
- [distL2](Backend_Utils_Coordinates.md#distl2)
- [normalizeVector](Backend_Utils_Coordinates.md#normalizevector)
- [scaleVector](Backend_Utils_Coordinates.md#scalevector)
- [vectorLength](Backend_Utils_Coordinates.md#vectorlength)

## Functions

### coordsEqual

▸ `Const` **coordsEqual**(`a`, `b`): `boolean`

#### Parameters

| Name | Type          |
| :--- | :------------ |
| `a`  | `WorldCoords` |
| `b`  | `WorldCoords` |

#### Returns

`boolean`

---

### distL2

▸ `Const` **distL2**(`a`, `b`): `number`

#### Parameters

| Name | Type                                                                                       |
| :--- | :----------------------------------------------------------------------------------------- |
| `a`  | `WorldCoords` \| [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md) |
| `b`  | `WorldCoords` \| [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md) |

#### Returns

`number`

---

### normalizeVector

▸ `Const` **normalizeVector**(`a`): `WorldCoords`

#### Parameters

| Name | Type          |
| :--- | :------------ |
| `a`  | `WorldCoords` |

#### Returns

`WorldCoords`

---

### scaleVector

▸ `Const` **scaleVector**(`a`, `k`): `Object`

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

▸ `Const` **vectorLength**(`a`): `number`

#### Parameters

| Name | Type                                                                                       |
| :--- | :----------------------------------------------------------------------------------------- |
| `a`  | `WorldCoords` \| [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md) |

#### Returns

`number`
