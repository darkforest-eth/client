# Class: GameGLManager

[Frontend/Renderers/GameRenderer/WebGL/GameGLManager](../modules/Frontend_Renderers_GameRenderer_WebGL_GameGLManager.md).GameGLManager

## Hierarchy

- [`WebGLManager`](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md)

  ↳ **`GameGLManager`**

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_WebGL_GameGLManager.GameGLManager.md#constructor)

### Properties

- [canvas](Frontend_Renderers_GameRenderer_WebGL_GameGLManager.GameGLManager.md#canvas)
- [gl](Frontend_Renderers_GameRenderer_WebGL_GameGLManager.GameGLManager.md#gl)
- [isHighPerf](Frontend_Renderers_GameRenderer_WebGL_GameGLManager.GameGLManager.md#ishighperf)
- [projectionMatrix](Frontend_Renderers_GameRenderer_WebGL_GameGLManager.GameGLManager.md#projectionmatrix)
- [renderer](Frontend_Renderers_GameRenderer_WebGL_GameGLManager.GameGLManager.md#renderer)
- [stencil](Frontend_Renderers_GameRenderer_WebGL_GameGLManager.GameGLManager.md#stencil)

### Methods

- [clear](Frontend_Renderers_GameRenderer_WebGL_GameGLManager.GameGLManager.md#clear)
- [getTexIdx](Frontend_Renderers_GameRenderer_WebGL_GameGLManager.GameGLManager.md#gettexidx)
- [setProjectionMatrix](Frontend_Renderers_GameRenderer_WebGL_GameGLManager.GameGLManager.md#setprojectionmatrix)

## Constructors

### constructor

• **new GameGLManager**(`engine`, `glCanvas`)

#### Parameters

| Name       | Type                                                             |
| :--------- | :--------------------------------------------------------------- |
| `engine`   | [`default`](Frontend_Renderers_GameRenderer_Renderer.default.md) |
| `glCanvas` | `HTMLCanvasElement`                                              |

#### Overrides

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[constructor](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#constructor)

## Properties

### canvas

• **canvas**: `HTMLCanvasElement`

#### Inherited from

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[canvas](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#canvas)

---

### gl

• **gl**: `WebGL2RenderingContext`

#### Overrides

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[gl](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#gl)

---

### isHighPerf

• **isHighPerf**: `boolean`

---

### projectionMatrix

• **projectionMatrix**: `mat4`

#### Overrides

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[projectionMatrix](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#projectionmatrix)

---

### renderer

• **renderer**: [`default`](Frontend_Renderers_GameRenderer_Renderer.default.md)

---

### stencil

• **stencil**: `boolean`

## Methods

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Overrides

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[clear](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#clear)

---

### getTexIdx

▸ **getTexIdx**(): `number`

#### Returns

`number`

#### Inherited from

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[getTexIdx](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#gettexidx)

---

### setProjectionMatrix

▸ **setProjectionMatrix**(): `void`

#### Returns

`void`

#### Inherited from

[WebGLManager](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md).[setProjectionMatrix](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md#setprojectionmatrix)
