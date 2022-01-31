# Class: GifRenderer

[Frontend/Renderers/GifRenderer](../modules/Frontend_Renderers_GifRenderer.md).GifRenderer

## Hierarchy

- [`WebGLManager`](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md)

  ↳ **`GifRenderer`**

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GifRenderer.GifRenderer.md#constructor)

### Properties

- [artifactDim](Frontend_Renderers_GifRenderer.GifRenderer.md#artifactdim)
- [canvas](Frontend_Renderers_GifRenderer.GifRenderer.md#canvas)
- [canvasDim](Frontend_Renderers_GifRenderer.GifRenderer.md#canvasdim)
- [gl](Frontend_Renderers_GifRenderer.GifRenderer.md#gl)
- [margin](Frontend_Renderers_GifRenderer.GifRenderer.md#margin)
- [projectionMatrix](Frontend_Renderers_GifRenderer.GifRenderer.md#projectionmatrix)
- [resolution](Frontend_Renderers_GifRenderer.GifRenderer.md#resolution)
- [spriteRenderer](Frontend_Renderers_GifRenderer.GifRenderer.md#spriterenderer)
- [thumb](Frontend_Renderers_GifRenderer.GifRenderer.md#thumb)

### Methods

- [addAncient](Frontend_Renderers_GifRenderer.GifRenderer.md#addancient)
- [addBiomes](Frontend_Renderers_GifRenderer.GifRenderer.md#addbiomes)
- [addSprite](Frontend_Renderers_GifRenderer.GifRenderer.md#addsprite)
- [addVideo](Frontend_Renderers_GifRenderer.GifRenderer.md#addvideo)
- [clear](Frontend_Renderers_GifRenderer.GifRenderer.md#clear)
- [drawSprite](Frontend_Renderers_GifRenderer.GifRenderer.md#drawsprite)
- [getAll](Frontend_Renderers_GifRenderer.GifRenderer.md#getall)
- [getAllSprites](Frontend_Renderers_GifRenderer.GifRenderer.md#getallsprites)
- [getAllVideos](Frontend_Renderers_GifRenderer.GifRenderer.md#getallvideos)
- [getBase64](Frontend_Renderers_GifRenderer.GifRenderer.md#getbase64)
- [getFileName](Frontend_Renderers_GifRenderer.GifRenderer.md#getfilename)
- [getTexIdx](Frontend_Renderers_GifRenderer.GifRenderer.md#gettexidx)
- [setDim](Frontend_Renderers_GifRenderer.GifRenderer.md#setdim)
- [setProjectionMatrix](Frontend_Renderers_GifRenderer.GifRenderer.md#setprojectionmatrix)

## Constructors

### constructor

• **new GifRenderer**(`canvas`, `dim`, `isThumb`)

#### Parameters

| Name      | Type                |
| :-------- | :------------------ |
| `canvas`  | `HTMLCanvasElement` |
| `dim`     | `number`            |
| `isThumb` | `boolean`           |

#### Overrides

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[constructor](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#constructor)

## Properties

### artifactDim

• `Private` **artifactDim**: `number`

---

### canvas

• **canvas**: `HTMLCanvasElement`

#### Inherited from

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[canvas](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#canvas)

---

### canvasDim

• `Private` **canvasDim**: `number`

---

### gl

• **gl**: `WebGL2RenderingContext`

#### Inherited from

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[gl](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#gl)

---

### margin

• `Private` **margin**: `number`

---

### projectionMatrix

• **projectionMatrix**: `mat4`

#### Overrides

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[projectionMatrix](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#projectionmatrix)

---

### resolution

• `Private` **resolution**: `number`

---

### spriteRenderer

• `Private` **spriteRenderer**: [`SpriteRenderer`](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md)

---

### thumb

• `Private` **thumb**: `boolean`

## Methods

### addAncient

▸ `Private` **addAncient**(`videoMode`, `dir`): `Promise`<`void`\>

#### Parameters

| Name        | Type      |
| :---------- | :-------- |
| `videoMode` | `boolean` |
| `dir`       | `JSZip`   |

#### Returns

`Promise`<`void`\>

---

### addBiomes

▸ `Private` **addBiomes**(`videoMode`, `dir`): `Promise`<`void`\>

#### Parameters

| Name        | Type      |
| :---------- | :-------- |
| `videoMode` | `boolean` |
| `dir`       | `JSZip`   |

#### Returns

`Promise`<`void`\>

---

### addSprite

▸ `Private` **addSprite**(`dir`, `type`, `biome`, `rarity`, `ancient?`): `void`

#### Parameters

| Name      | Type             | Default value |
| :-------- | :--------------- | :------------ |
| `dir`     | `JSZip`          | `undefined`   |
| `type`    | `ArtifactType`   | `undefined`   |
| `biome`   | `Biome`          | `undefined`   |
| `rarity`  | `ArtifactRarity` | `undefined`   |
| `ancient` | `boolean`        | `false`       |

#### Returns

`void`

---

### addVideo

▸ `Private` **addVideo**(`dir`, `type`, `biome`, `rarity`, `ancient?`): `Promise`<`void`\>

#### Parameters

| Name      | Type             | Default value |
| :-------- | :--------------- | :------------ |
| `dir`     | `JSZip`          | `undefined`   |
| `type`    | `ArtifactType`   | `undefined`   |
| `biome`   | `Biome`          | `undefined`   |
| `rarity`  | `ArtifactRarity` | `undefined`   |
| `ancient` | `boolean`        | `false`       |

#### Returns

`Promise`<`void`\>

---

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Overrides

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[clear](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#clear)

---

### drawSprite

▸ `Private` **drawSprite**(`artifact`, `atFrame?`): `void`

#### Parameters

| Name       | Type                    |
| :--------- | :---------------------- |
| `artifact` | `Artifact`              |
| `atFrame`  | `undefined` \| `number` |

#### Returns

`void`

---

### getAll

▸ `Private` **getAll**(`videoMode?`): `Promise`<`void`\>

#### Parameters

| Name        | Type      | Default value |
| :---------- | :-------- | :------------ |
| `videoMode` | `boolean` | `false`       |

#### Returns

`Promise`<`void`\>

---

### getAllSprites

▸ **getAllSprites**(): `void`

#### Returns

`void`

---

### getAllVideos

▸ **getAllVideos**(): `void`

#### Returns

`void`

---

### getBase64

▸ `Private` **getBase64**(): `string`

#### Returns

`string`

---

### getFileName

▸ `Private` **getFileName**(`video`, `type`, `biome`, `rarity`, `ancient`): `string`

#### Parameters

| Name      | Type             |
| :-------- | :--------------- |
| `video`   | `boolean`        |
| `type`    | `ArtifactType`   |
| `biome`   | `Biome`          |
| `rarity`  | `ArtifactRarity` |
| `ancient` | `boolean`        |

#### Returns

`string`

---

### getTexIdx

▸ **getTexIdx**(): `number`

#### Returns

`number`

#### Inherited from

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[getTexIdx](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#gettexidx)

---

### setDim

▸ `Private` **setDim**(`dim`): `void`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `dim` | `number` |

#### Returns

`void`

---

### setProjectionMatrix

▸ **setProjectionMatrix**(): `void`

#### Returns

`void`

#### Inherited from

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[setProjectionMatrix](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#setprojectionmatrix)
