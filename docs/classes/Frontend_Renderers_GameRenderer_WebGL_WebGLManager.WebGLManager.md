# Class: WebGLManager

[Frontend/Renderers/GameRenderer/WebGL/WebGLManager](../modules/Frontend_Renderers_GameRenderer_WebGL_WebGLManager.md).WebGLManager

## Hierarchy

- **`WebGLManager`**

  ↳ [`ArtifactRenderer`](Frontend_Renderers_Artifacts_ArtifactRenderer.ArtifactRenderer.md)

  ↳ [`GameGLManager`](Frontend_Renderers_GameRenderer_WebGL_GameGLManager.GameGLManager.md)

  ↳ [`GifRenderer`](Frontend_Renderers_GifRenderer.GifRenderer.md)

  ↳ [`PlanetscapeRenderer`](Frontend_Renderers_PlanetscapeRenderer_PlanetScapeRenderer.PlanetscapeRenderer.md)

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#constructor)

### Properties

- [canvas](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#canvas)
- [gl](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#gl)
- [projectionMatrix](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#projectionmatrix)
- [texIdx](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#texidx)

### Methods

- [clear](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#clear)
- [getTexIdx](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#gettexidx)
- [setProjectionMatrix](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#setprojectionmatrix)

## Constructors

### constructor

• **new WebGLManager**(`canvas`, `attr?`)

#### Parameters

| Name     | Type                     |
| :------- | :----------------------- |
| `canvas` | `HTMLCanvasElement`      |
| `attr?`  | `WebGLContextAttributes` |

## Properties

### canvas

• **canvas**: `HTMLCanvasElement`

---

### gl

• **gl**: `WebGL2RenderingContext`

---

### projectionMatrix

• **projectionMatrix**: `mat4`

---

### texIdx

• `Private` **texIdx**: `number` = `0`

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

---

### getTexIdx

▸ **getTexIdx**(): `number`

#### Returns

`number`

---

### setProjectionMatrix

▸ **setProjectionMatrix**(): `void`

#### Returns

`void`
