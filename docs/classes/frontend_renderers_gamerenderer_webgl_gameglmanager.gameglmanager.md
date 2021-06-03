# Class: GameGLManager

[Frontend/Renderers/GameRenderer/WebGL/GameGLManager](../modules/frontend_renderers_gamerenderer_webgl_gameglmanager.md).GameGLManager

## Hierarchy

- [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

  ↳ **GameGLManager**

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md#constructor)

### Properties

- [canvas](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md#canvas)
- [gl](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md#gl)
- [isHighPerf](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md#ishighperf)
- [projectionMatrix](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md#projectionmatrix)
- [renderer](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md#renderer)
- [stencil](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md#stencil)

### Methods

- [clear](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md#clear)
- [getTexIdx](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md#gettexidx)
- [setProjectionMatrix](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md#setprojectionmatrix)

## Constructors

### constructor

\+ **new GameGLManager**(`engine`: [_default_](frontend_renderers_gamerenderer_renderer.default.md), `glCanvas`: HTMLCanvasElement): [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md)

#### Parameters

| Name       | Type                                                             |
| :--------- | :--------------------------------------------------------------- |
| `engine`   | [_default_](frontend_renderers_gamerenderer_renderer.default.md) |
| `glCanvas` | HTMLCanvasElement                                                |

**Returns:** [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md)

Overrides: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

## Properties

### canvas

• **canvas**: HTMLCanvasElement

Inherited from: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md).[canvas](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#canvas)

---

### gl

• **gl**: WebGL2RenderingContext

Overrides: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md).[gl](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#gl)

---

### isHighPerf

• **isHighPerf**: _boolean_

---

### projectionMatrix

• **projectionMatrix**: mat4

Overrides: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md).[projectionMatrix](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#projectionmatrix)

---

### renderer

• **renderer**: [_default_](frontend_renderers_gamerenderer_renderer.default.md)

---

### stencil

• **stencil**: _boolean_

## Methods

### clear

▸ **clear**(): _void_

**Returns:** _void_

Overrides: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

---

### getTexIdx

▸ **getTexIdx**(): _number_

**Returns:** _number_

Inherited from: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

---

### setProjectionMatrix

▸ **setProjectionMatrix**(): _void_

**Returns:** _void_

Inherited from: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)
