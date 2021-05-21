# Class: WebGLManager

[Frontend/Renderers/GameRenderer/WebGL/WebGLManager](../modules/frontend_renderers_gamerenderer_webgl_webglmanager.md).WebGLManager

## Hierarchy

- **WebGLManager**

  ↳ [_ArtifactRenderer_](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md)

  ↳ [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md)

  ↳ [_GifRenderer_](frontend_renderers_gifrenderer.gifrenderer.md)

  ↳ [_PlanetscapeRenderer_](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md)

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#constructor)

### Properties

- [canvas](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#canvas)
- [gl](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#gl)
- [projectionMatrix](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#projectionmatrix)
- [texIdx](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#texidx)

### Methods

- [clear](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#clear)
- [getTexIdx](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#gettexidx)
- [setProjectionMatrix](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#setprojectionmatrix)

## Constructors

### constructor

\+ **new WebGLManager**(`canvas`: HTMLCanvasElement, `attr?`: WebGLContextAttributes): [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

#### Parameters

| Name     | Type                   |
| :------- | :--------------------- |
| `canvas` | HTMLCanvasElement      |
| `attr?`  | WebGLContextAttributes |

**Returns:** [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

## Properties

### canvas

• **canvas**: HTMLCanvasElement

---

### gl

• **gl**: WebGL2RenderingContext

---

### projectionMatrix

• **projectionMatrix**: mat4

---

### texIdx

• `Private` **texIdx**: _number_= 0

## Methods

### clear

▸ **clear**(`bits?`: _number_, `color?`: [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec)): _void_

#### Parameters

| Name     | Type                                                                           |
| :------- | :----------------------------------------------------------------------------- |
| `bits?`  | _number_                                                                       |
| `color?` | [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec) |

**Returns:** _void_

---

### getTexIdx

▸ **getTexIdx**(): _number_

**Returns:** _number_

---

### setProjectionMatrix

▸ **setProjectionMatrix**(): _void_

**Returns:** _void_
