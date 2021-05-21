# Module: Backend/Utils/Coordinates

## Table of contents

### Interfaces

- [CanvasCoords](../interfaces/backend_utils_coordinates.canvascoords.md)

### Functions

- [coordsEqual](backend_utils_coordinates.md#coordsequal)
- [distL2](backend_utils_coordinates.md#distl2)
- [normalizeVector](backend_utils_coordinates.md#normalizevector)
- [scaleVector](backend_utils_coordinates.md#scalevector)
- [vectorLength](backend_utils_coordinates.md#vectorlength)

## Functions

### coordsEqual

▸ `Const` **coordsEqual**(`a`: WorldCoords, `b`: WorldCoords): _boolean_

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `a`  | WorldCoords |
| `b`  | WorldCoords |

**Returns:** _boolean_

---

### distL2

▸ `Const` **distL2**(`a`: WorldCoords \| [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md), `b`: WorldCoords \| [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)): _number_

#### Parameters

| Name | Type                                                                                     |
| :--- | :--------------------------------------------------------------------------------------- |
| `a`  | WorldCoords \| [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md) |
| `b`  | WorldCoords \| [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md) |

**Returns:** _number_

---

### normalizeVector

▸ `Const` **normalizeVector**(`a`: WorldCoords): WorldCoords

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `a`  | WorldCoords |

**Returns:** WorldCoords

---

### scaleVector

▸ `Const` **scaleVector**(`a`: WorldCoords, `k`: _number_): _object_

#### Parameters

| Name | Type        |
| :--- | :---------- |
| `a`  | WorldCoords |
| `k`  | _number_    |

**Returns:** _object_

| Name | Type     |
| :--- | :------- |
| `x`  | _number_ |
| `y`  | _number_ |

---

### vectorLength

▸ `Const` **vectorLength**(`a`: WorldCoords \| [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)): _number_

#### Parameters

| Name | Type                                                                                     |
| :--- | :--------------------------------------------------------------------------------------- |
| `a`  | WorldCoords \| [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md) |

**Returns:** _number_
