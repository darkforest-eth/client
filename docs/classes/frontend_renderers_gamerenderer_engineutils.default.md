# Class: default

[Frontend/Renderers/GameRenderer/EngineUtils](../modules/frontend_renderers_gamerenderer_engineutils.md).default

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_engineutils.default.md#constructor)

### Methods

- [fillTexture](frontend_renderers_gamerenderer_engineutils.default.md#filltexture)
- [getNow](frontend_renderers_gamerenderer_engineutils.default.md#getnow)
- [getPlanetZIndex](frontend_renderers_gamerenderer_engineutils.default.md#getplanetzindex)
- [makeDoubleQuadBuffered](frontend_renderers_gamerenderer_engineutils.default.md#makedoublequadbuffered)
- [makeEmptyDoubleQuad](frontend_renderers_gamerenderer_engineutils.default.md#makeemptydoublequad)
- [makeEmptyQuad](frontend_renderers_gamerenderer_engineutils.default.md#makeemptyquad)
- [makeEmptyQuadVec2](frontend_renderers_gamerenderer_engineutils.default.md#makeemptyquadvec2)
- [makeQuad](frontend_renderers_gamerenderer_engineutils.default.md#makequad)
- [makeQuadBuffered](frontend_renderers_gamerenderer_engineutils.default.md#makequadbuffered)
- [makeQuadVec2](frontend_renderers_gamerenderer_engineutils.default.md#makequadvec2)
- [makeQuadVec2Buffered](frontend_renderers_gamerenderer_engineutils.default.md#makequadvec2buffered)
- [rgbVecToHex](frontend_renderers_gamerenderer_engineutils.default.md#rgbvectohex)
- [rotateIndices](frontend_renderers_gamerenderer_engineutils.default.md#rotateindices)
- [rotateQuad](frontend_renderers_gamerenderer_engineutils.default.md#rotatequad)
- [rotateQuadVec2](frontend_renderers_gamerenderer_engineutils.default.md#rotatequadvec2)
- [translateIndices](frontend_renderers_gamerenderer_engineutils.default.md#translateindices)
- [translateQuad](frontend_renderers_gamerenderer_engineutils.default.md#translatequad)
- [translateQuadVec2](frontend_renderers_gamerenderer_engineutils.default.md#translatequadvec2)

## Constructors

### constructor

\+ **new default**(): [_default_](frontend_renderers_gamerenderer_engineutils.default.md)

**Returns:** [_default_](frontend_renderers_gamerenderer_engineutils.default.md)

## Methods

### fillTexture

▸ `Static` **fillTexture**(`gl`: WebGL2RenderingContext): _void_

#### Parameters

| Name | Type                   |
| :--- | :--------------------- |
| `gl` | WebGL2RenderingContext |

**Returns:** _void_

---

### getNow

▸ `Static` **getNow**(): _number_

**Returns:** _number_

---

### getPlanetZIndex

▸ `Static` **getPlanetZIndex**(`planet`: Planet): _number_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _number_

---

### makeDoubleQuadBuffered

▸ `Static` **makeDoubleQuadBuffered**(`b`: _number_[], `ax1`: _number_, `ay1`: _number_, `ax2`: _number_, `ay2`: _number_, `bx1`: _number_, `by1`: _number_, `bx2`: _number_, `by2`: _number_): _void_

#### Parameters

| Name  | Type       |
| :---- | :--------- |
| `b`   | _number_[] |
| `ax1` | _number_   |
| `ay1` | _number_   |
| `ax2` | _number_   |
| `ay2` | _number_   |
| `bx1` | _number_   |
| `by1` | _number_   |
| `bx2` | _number_   |
| `by2` | _number_   |

**Returns:** _void_

---

### makeEmptyDoubleQuad

▸ `Static` **makeEmptyDoubleQuad**(): _number_[]

**Returns:** _number_[]

---

### makeEmptyQuad

▸ `Static` **makeEmptyQuad**(): _number_[]

**Returns:** _number_[]

---

### makeEmptyQuadVec2

▸ `Static` **makeEmptyQuadVec2**(): _number_[]

**Returns:** _number_[]

---

### makeQuad

▸ `Static` **makeQuad**(`x1`: _number_, `y1`: _number_, `x2`: _number_, `y2`: _number_, `z`: _number_): _number_[]

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x1` | _number_ |
| `y1` | _number_ |
| `x2` | _number_ |
| `y2` | _number_ |
| `z`  | _number_ |

**Returns:** _number_[]

---

### makeQuadBuffered

▸ `Static` **makeQuadBuffered**(`b`: _number_[], `x1`: _number_, `y1`: _number_, `x2`: _number_, `y2`: _number_, `z`: _number_): _void_

#### Parameters

| Name | Type       |
| :--- | :--------- |
| `b`  | _number_[] |
| `x1` | _number_   |
| `y1` | _number_   |
| `x2` | _number_   |
| `y2` | _number_   |
| `z`  | _number_   |

**Returns:** _void_

---

### makeQuadVec2

▸ `Static` **makeQuadVec2**(`x1`: _number_, `y1`: _number_, `x2`: _number_, `y2`: _number_): _number_[]

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x1` | _number_ |
| `y1` | _number_ |
| `x2` | _number_ |
| `y2` | _number_ |

**Returns:** _number_[]

---

### makeQuadVec2Buffered

▸ `Static` **makeQuadVec2Buffered**(`b`: _number_[], `x1`: _number_, `y1`: _number_, `x2`: _number_, `y2`: _number_): _void_

#### Parameters

| Name | Type       |
| :--- | :--------- |
| `b`  | _number_[] |
| `x1` | _number_   |
| `y1` | _number_   |
| `x2` | _number_   |
| `y2` | _number_   |

**Returns:** _void_

---

### rgbVecToHex

▸ `Static` **rgbVecToHex**(`rgb`: [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec)): _string_

#### Parameters

| Name  | Type                                                                         |
| :---- | :--------------------------------------------------------------------------- |
| `rgb` | [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec) |

**Returns:** _string_

---

### rotateIndices

▸ `Static` `Private` **rotateIndices**(`b`: _number_[], `i`: _number_, `j`: _number_, `angle`: _number_): _void_

#### Parameters

| Name    | Type       |
| :------ | :--------- |
| `b`     | _number_[] |
| `i`     | _number_   |
| `j`     | _number_   |
| `angle` | _number_   |

**Returns:** _void_

---

### rotateQuad

▸ `Static` **rotateQuad**(`b`: _number_[], `angle`: _number_): _void_

#### Parameters

| Name    | Type       |
| :------ | :--------- |
| `b`     | _number_[] |
| `angle` | _number_   |

**Returns:** _void_

---

### rotateQuadVec2

▸ `Static` **rotateQuadVec2**(`b`: _number_[], `angle`: _number_): _void_

#### Parameters

| Name    | Type       |
| :------ | :--------- |
| `b`     | _number_[] |
| `angle` | _number_   |

**Returns:** _void_

---

### translateIndices

▸ `Static` `Private` **translateIndices**(`b`: _number_[], `i`: _number_, `j`: _number_, `__namedParameters`: [*number*, *number*]): _void_

#### Parameters

| Name                | Type                 |
| :------------------ | :------------------- |
| `b`                 | _number_[]           |
| `i`                 | _number_             |
| `j`                 | _number_             |
| `__namedParameters` | [*number*, *number*] |

**Returns:** _void_

---

### translateQuad

▸ `Static` **translateQuad**(`b`: _number_[], `t`: [*number*, *number*]): _void_

#### Parameters

| Name | Type                 |
| :--- | :------------------- |
| `b`  | _number_[]           |
| `t`  | [*number*, *number*] |

**Returns:** _void_

---

### translateQuadVec2

▸ `Static` **translateQuadVec2**(`b`: _number_[], `t`: [*number*, *number*]): _void_

#### Parameters

| Name | Type                 |
| :--- | :------------------- |
| `b`  | _number_[]           |
| `t`  | [*number*, *number*] |

**Returns:** _void_
