# Class: ArtifactRenderer

[Frontend/Renderers/Artifacts/ArtifactRenderer](../modules/Frontend_Renderers_Artifacts_ArtifactRenderer.md).ArtifactRenderer

## Hierarchy

- [`WebGLManager`](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md)

  ↳ **`ArtifactRenderer`**

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#constructor)

### Properties

- [artifacts](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#artifacts)
- [canvas](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#canvas)
- [frameRequestId](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#framerequestid)
- [gl](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#gl)
- [isDex](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#isdex)
- [projectionMatrix](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#projectionmatrix)
- [scroll](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#scroll)
- [spriteRenderer](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#spriterenderer)
- [visible](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#visible)

### Methods

- [clear](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#clear)
- [containsArtifact](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#containsartifact)
- [destroy](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#destroy)
- [draw](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#draw)
- [drawDex](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#drawdex)
- [drawList](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#drawlist)
- [getTexIdx](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#gettexidx)
- [loop](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#loop)
- [queueArtifactColumn](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#queueartifactcolumn)
- [queueRarityColumn](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#queueraritycolumn)
- [setArtifacts](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#setartifacts)
- [setIsDex](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#setisdex)
- [setProjectionMatrix](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#setprojectionmatrix)
- [setScroll](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#setscroll)
- [setVisible](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md#setvisible)

## Constructors

### constructor

• **new ArtifactRenderer**(`canvas`, `isDex?`)

#### Parameters

| Name     | Type                | Default value |
| :------- | :------------------ | :------------ |
| `canvas` | `HTMLCanvasElement` | `undefined`   |
| `isDex`  | `boolean`           | `true`        |

#### Overrides

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[constructor](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#constructor)

## Properties

### artifacts

• `Private` **artifacts**: `Artifact`[]

---

### canvas

• **canvas**: `HTMLCanvasElement`

#### Inherited from

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[canvas](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#canvas)

---

### frameRequestId

• `Private` **frameRequestId**: `number`

---

### gl

• **gl**: `WebGL2RenderingContext`

#### Inherited from

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[gl](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#gl)

---

### isDex

• `Private` **isDex**: `boolean`

---

### projectionMatrix

• **projectionMatrix**: `mat4`

#### Inherited from

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[projectionMatrix](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#projectionmatrix)

---

### scroll

• `Private` **scroll**: `number` = `0`

---

### spriteRenderer

• `Private` **spriteRenderer**: [`SpriteRenderer`](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md)

---

### visible

• `Private` **visible**: `boolean` = `false`

## Methods

### clear

▸ **clear**(`bits?`, `color?`): `void`

#### Parameters

| Name     | Type                                                                           |
| :------- | :----------------------------------------------------------------------------- |
| `bits?`  | `number`                                                                       |
| `color?` | [`RGBAVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbavec) |

#### Returns

`void`

#### Inherited from

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[clear](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#clear)

---

### containsArtifact

▸ `Private` **containsArtifact**(`biome`, `rarity`, `type`): `boolean`

#### Parameters

| Name     | Type             |
| :------- | :--------------- |
| `biome`  | `Biome`          |
| `rarity` | `ArtifactRarity` |
| `type`   | `ArtifactType`   |

#### Returns

`boolean`

---

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

---

### draw

▸ `Private` **draw**(): `void`

#### Returns

`void`

---

### drawDex

▸ `Private` **drawDex**(): `void`

#### Returns

`void`

---

### drawList

▸ `Private` **drawList**(): `void`

#### Returns

`void`

---

### getTexIdx

▸ **getTexIdx**(): `number`

#### Returns

`number`

#### Inherited from

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[getTexIdx](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#gettexidx)

---

### loop

▸ `Private` **loop**(): `void`

#### Returns

`void`

---

### queueArtifactColumn

▸ `Private` **queueArtifactColumn**(`type`, `rarity`, `startX`): `void`

#### Parameters

| Name     | Type             |
| :------- | :--------------- |
| `type`   | `ArtifactType`   |
| `rarity` | `ArtifactRarity` |
| `startX` | `number`         |

#### Returns

`void`

---

### queueRarityColumn

▸ `Private` **queueRarityColumn**(`rarity`, `startX`): `void`

#### Parameters

| Name     | Type             |
| :------- | :--------------- |
| `rarity` | `ArtifactRarity` |
| `startX` | `number`         |

#### Returns

`void`

---

### setArtifacts

▸ **setArtifacts**(`artifacts`): `void`

#### Parameters

| Name        | Type         |
| :---------- | :----------- |
| `artifacts` | `Artifact`[] |

#### Returns

`void`

---

### setIsDex

▸ **setIsDex**(`isDex`): `void`

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `isDex` | `boolean` |

#### Returns

`void`

---

### setProjectionMatrix

▸ **setProjectionMatrix**(): `void`

#### Returns

`void`

#### Inherited from

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[setProjectionMatrix](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#setprojectionmatrix)

---

### setScroll

▸ **setScroll**(`scroll`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `scroll` | `number` |

#### Returns

`void`

---

### setVisible

▸ **setVisible**(`visible`): `void`

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `visible` | `boolean` |

#### Returns

`void`
