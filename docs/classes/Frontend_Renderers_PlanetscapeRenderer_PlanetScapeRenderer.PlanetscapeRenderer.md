# Class: PlanetscapeRenderer

[Frontend/Renderers/PlanetscapeRenderer/PlanetScapeRenderer](../modules/Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.md).PlanetscapeRenderer

## Hierarchy

- [`WebGLManager`](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md)

  ↳ **`PlanetscapeRenderer`**

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#constructor)

### Properties

- [TICK_SIZE](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#tick_size)
- [artifacts](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#artifacts)
- [canvas](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#canvas)
- [frameRequestId](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#framerequestid)
- [gl](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#gl)
- [isPaused](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#ispaused)
- [moonCanvas](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#mooncanvas)
- [moonCtx](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#moonctx)
- [pathRenderer](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#pathrenderer)
- [planet](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#planet)
- [projectionMatrix](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#projectionmatrix)
- [spriteRenderer](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#spriterenderer)
- [uiManager](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#uimanager)

### Methods

- [clear](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#clear)
- [destroy](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#destroy)
- [draw](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#draw)
- [drawHill](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#drawhill)
- [drawMoon](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#drawmoon)
- [drawScape](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#drawscape)
- [flushArtifactOnce](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#flushartifactonce)
- [getTexIdx](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#gettexidx)
- [loop](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#loop)
- [queueArtifacts](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#queueartifacts)
- [setPaused](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#setpaused)
- [setPlanet](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#setplanet)
- [setProjectionMatrix](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md#setprojectionmatrix)

## Constructors

### constructor

• **new PlanetscapeRenderer**(`canvas`, `moonCanvas`, `uiManager`)

#### Parameters

| Name         | Type                                                    |
| :----------- | :------------------------------------------------------ |
| `canvas`     | `HTMLCanvasElement`                                     |
| `moonCanvas` | `HTMLCanvasElement`                                     |
| `uiManager`  | [`default`](Backend_GameLogic_GameUIManager.default.md) |

#### Overrides

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[constructor](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#constructor)

## Properties

### TICK_SIZE

• `Private` **TICK_SIZE**: `number` = `3`

---

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

### isPaused

• `Private` **isPaused**: `boolean`

---

### moonCanvas

• `Private` **moonCanvas**: `HTMLCanvasElement`

---

### moonCtx

• `Private` **moonCtx**: `CanvasRenderingContext2D`

---

### pathRenderer

• `Private` **pathRenderer**: [`PathRenderer`](Frontend_Renderers_PlanetscapeRenderer_PathRenderer.PathRenderer.md)

---

### planet

• **planet**: `undefined` \| `Planet`

---

### projectionMatrix

• **projectionMatrix**: `mat4`

#### Overrides

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[projectionMatrix](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#projectionmatrix)

---

### spriteRenderer

• `Private` **spriteRenderer**: [`SpriteRenderer`](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md)

---

### uiManager

• `Private` **uiManager**: [`default`](Backend_GameLogic_GameUIManager.default.md)

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

### drawHill

▸ `Private` **drawHill**(`fn`, `color`): `void`

#### Parameters

| Name    | Type                                                                         |
| :------ | :--------------------------------------------------------------------------- |
| `fn`    | (`x`: `number`) => `number`                                                  |
| `color` | [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec) |

#### Returns

`void`

---

### drawMoon

▸ `Private` **drawMoon**(): `void`

#### Returns

`void`

---

### drawScape

▸ `Private` **drawScape**(): `void`

#### Returns

`void`

---

### flushArtifactOnce

▸ `Private` **flushArtifactOnce**(): `void`

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

### queueArtifacts

▸ `Private` **queueArtifacts**(): `void`

#### Returns

`void`

---

### setPaused

▸ **setPaused**(`isPaused?`): `void`

#### Parameters

| Name        | Type      |
| :---------- | :-------- |
| `isPaused?` | `boolean` |

#### Returns

`void`

---

### setPlanet

▸ **setPlanet**(`planet`): `void`

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |

#### Returns

`void`

---

### setProjectionMatrix

▸ **setProjectionMatrix**(): `void`

#### Returns

`void`

#### Inherited from

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[setProjectionMatrix](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#setprojectionmatrix)
