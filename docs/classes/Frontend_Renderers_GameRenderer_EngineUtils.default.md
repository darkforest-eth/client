# Class: default

[Frontend/Renderers/GameRenderer/EngineUtils](../modules/Frontend_Renderers_GameRenderer_EngineUtils.md).default

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_EngineUtils.default.md#constructor)

### Methods

- [fillTexture](Frontend_Renderers_GameRenderer_EngineUtils.default.md#filltexture)
- [getNow](Frontend_Renderers_GameRenderer_EngineUtils.default.md#getnow)
- [getPlanetZIndex](Frontend_Renderers_GameRenderer_EngineUtils.default.md#getplanetzindex)
- [makeDoubleQuadBuffered](Frontend_Renderers_GameRenderer_EngineUtils.default.md#makedoublequadbuffered)
- [makeEmptyDoubleQuad](Frontend_Renderers_GameRenderer_EngineUtils.default.md#makeemptydoublequad)
- [makeEmptyQuad](Frontend_Renderers_GameRenderer_EngineUtils.default.md#makeemptyquad)
- [makeEmptyQuadVec2](Frontend_Renderers_GameRenderer_EngineUtils.default.md#makeemptyquadvec2)
- [makeQuad](Frontend_Renderers_GameRenderer_EngineUtils.default.md#makequad)
- [makeQuadBuffered](Frontend_Renderers_GameRenderer_EngineUtils.default.md#makequadbuffered)
- [makeQuadVec2](Frontend_Renderers_GameRenderer_EngineUtils.default.md#makequadvec2)
- [makeQuadVec2Buffered](Frontend_Renderers_GameRenderer_EngineUtils.default.md#makequadvec2buffered)
- [rgbVecToHex](Frontend_Renderers_GameRenderer_EngineUtils.default.md#rgbvectohex)
- [rotateIndices](Frontend_Renderers_GameRenderer_EngineUtils.default.md#rotateindices)
- [rotateQuad](Frontend_Renderers_GameRenderer_EngineUtils.default.md#rotatequad)
- [rotateQuadVec2](Frontend_Renderers_GameRenderer_EngineUtils.default.md#rotatequadvec2)
- [translateIndices](Frontend_Renderers_GameRenderer_EngineUtils.default.md#translateindices)
- [translateQuad](Frontend_Renderers_GameRenderer_EngineUtils.default.md#translatequad)
- [translateQuadVec2](Frontend_Renderers_GameRenderer_EngineUtils.default.md#translatequadvec2)

## Constructors

### constructor

• **new default**()

## Methods

### fillTexture

▸ `Static` **fillTexture**(`gl`): `void`

#### Parameters

| Name | Type                     |
| :--- | :----------------------- |
| `gl` | `WebGL2RenderingContext` |

#### Returns

`void`

---

### getNow

▸ `Static` **getNow**(): `number`

#### Returns

`number`

---

### getPlanetZIndex

▸ `Static` **getPlanetZIndex**(`planet`): `number`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`number`

---

### makeDoubleQuadBuffered

▸ `Static` **makeDoubleQuadBuffered**(`b`, `ax1`, `ay1`, `ax2`, `ay2`, `bx1`, `by1`, `bx2`, `by2`): `void`

#### Parameters

| Name  | Type       |
| :---- | :--------- |
| `b`   | `number`[] |
| `ax1` | `number`   |
| `ay1` | `number`   |
| `ax2` | `number`   |
| `ay2` | `number`   |
| `bx1` | `number`   |
| `by1` | `number`   |
| `bx2` | `number`   |
| `by2` | `number`   |

#### Returns

`void`

---

### makeEmptyDoubleQuad

▸ `Static` **makeEmptyDoubleQuad**(): `number`[]

#### Returns

`number`[]

---

### makeEmptyQuad

▸ `Static` **makeEmptyQuad**(): `number`[]

#### Returns

`number`[]

---

### makeEmptyQuadVec2

▸ `Static` **makeEmptyQuadVec2**(): `number`[]

#### Returns

`number`[]

---

### makeQuad

▸ `Static` **makeQuad**(`x1`, `y1`, `x2`, `y2`, `z`): `number`[]

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x1` | `number` |
| `y1` | `number` |
| `x2` | `number` |
| `y2` | `number` |
| `z`  | `number` |

#### Returns

`number`[]

---

### makeQuadBuffered

▸ `Static` **makeQuadBuffered**(`b`, `x1`, `y1`, `x2`, `y2`, `z`): `void`

#### Parameters

| Name | Type       |
| :--- | :--------- |
| `b`  | `number`[] |
| `x1` | `number`   |
| `y1` | `number`   |
| `x2` | `number`   |
| `y2` | `number`   |
| `z`  | `number`   |

#### Returns

`void`

---

### makeQuadVec2

▸ `Static` **makeQuadVec2**(`x1`, `y1`, `x2`, `y2`): `number`[]

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x1` | `number` |
| `y1` | `number` |
| `x2` | `number` |
| `y2` | `number` |

#### Returns

`number`[]

---

### makeQuadVec2Buffered

▸ `Static` **makeQuadVec2Buffered**(`b`, `x1`, `y1`, `x2`, `y2`): `void`

#### Parameters

| Name | Type       |
| :--- | :--------- |
| `b`  | `number`[] |
| `x1` | `number`   |
| `y1` | `number`   |
| `x2` | `number`   |
| `y2` | `number`   |

#### Returns

`void`

---

### rgbVecToHex

▸ `Static` **rgbVecToHex**(`rgb`): `string`

#### Parameters

| Name  | Type                                                                         |
| :---- | :--------------------------------------------------------------------------- |
| `rgb` | [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec) |

#### Returns

`string`

---

### rotateIndices

▸ `Static` `Private` **rotateIndices**(`b`, `i`, `j`, `angle`): `void`

#### Parameters

| Name    | Type       |
| :------ | :--------- |
| `b`     | `number`[] |
| `i`     | `number`   |
| `j`     | `number`   |
| `angle` | `number`   |

#### Returns

`void`

---

### rotateQuad

▸ `Static` **rotateQuad**(`b`, `angle`): `void`

#### Parameters

| Name    | Type       |
| :------ | :--------- |
| `b`     | `number`[] |
| `angle` | `number`   |

#### Returns

`void`

---

### rotateQuadVec2

▸ `Static` **rotateQuadVec2**(`b`, `angle`): `void`

#### Parameters

| Name    | Type       |
| :------ | :--------- |
| `b`     | `number`[] |
| `angle` | `number`   |

#### Returns

`void`

---

### translateIndices

▸ `Static` `Private` **translateIndices**(`b`, `i`, `j`, `__namedParameters`): `void`

#### Parameters

| Name                | Type                 |
| :------------------ | :------------------- |
| `b`                 | `number`[]           |
| `i`                 | `number`             |
| `j`                 | `number`             |
| `__namedParameters` | [`number`, `number`] |

#### Returns

`void`

---

### translateQuad

▸ `Static` **translateQuad**(`b`, `t`): `void`

#### Parameters

| Name | Type                 |
| :--- | :------------------- |
| `b`  | `number`[]           |
| `t`  | [`number`, `number`] |

#### Returns

`void`

---

### translateQuadVec2

▸ `Static` **translateQuadVec2**(`b`, `t`): `void`

#### Parameters

| Name | Type                 |
| :--- | :------------------- |
| `b`  | `number`[]           |
| `t`  | [`number`, `number`] |

#### Returns

`void`
