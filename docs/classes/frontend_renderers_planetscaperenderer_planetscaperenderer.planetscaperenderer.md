# Class: PlanetscapeRenderer

[Frontend/Renderers/PlanetscapeRenderer/PlanetScapeRenderer](../modules/frontend_renderers_planetscaperenderer_planetscaperenderer.md).PlanetscapeRenderer

## Hierarchy

- [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

  ↳ **PlanetscapeRenderer**

## Table of contents

### Constructors

- [constructor](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#constructor)

### Properties

- [TICK_SIZE](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#tick_size)
- [artifacts](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#artifacts)
- [canvas](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#canvas)
- [frameRequestId](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#framerequestid)
- [gl](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#gl)
- [isPaused](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#ispaused)
- [moonCanvas](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#mooncanvas)
- [moonCtx](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#moonctx)
- [pathRenderer](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#pathrenderer)
- [planet](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#planet)
- [projectionMatrix](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#projectionmatrix)
- [spriteRenderer](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#spriterenderer)
- [uiManager](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#uimanager)

### Methods

- [clear](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#clear)
- [destroy](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#destroy)
- [draw](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#draw)
- [drawHill](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#drawhill)
- [drawMoon](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#drawmoon)
- [drawScape](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#drawscape)
- [flushArtifactOnce](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#flushartifactonce)
- [getTexIdx](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#gettexidx)
- [loop](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#loop)
- [queueArtifacts](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#queueartifacts)
- [setPaused](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#setpaused)
- [setPlanet](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#setplanet)
- [setProjectionMatrix](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md#setprojectionmatrix)

## Constructors

### constructor

\+ **new PlanetscapeRenderer**(`canvas`: HTMLCanvasElement, `moonCanvas`: HTMLCanvasElement, `uiManager`: [_default_](backend_gamelogic_gameuimanager.default.md)): [_PlanetscapeRenderer_](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md)

#### Parameters

| Name         | Type                                                    |
| :----------- | :------------------------------------------------------ |
| `canvas`     | HTMLCanvasElement                                       |
| `moonCanvas` | HTMLCanvasElement                                       |
| `uiManager`  | [_default_](backend_gamelogic_gameuimanager.default.md) |

**Returns:** [_PlanetscapeRenderer_](frontend_renderers_planetscaperenderer_planetscaperenderer.planetscaperenderer.md)

Overrides: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

## Properties

### TICK_SIZE

• `Private` **TICK_SIZE**: _number_= 3

---

### artifacts

• `Private` **artifacts**: Artifact[]

---

### canvas

• **canvas**: HTMLCanvasElement

Inherited from: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md).[canvas](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#canvas)

---

### frameRequestId

• `Private` **frameRequestId**: _number_

---

### gl

• **gl**: WebGL2RenderingContext

Inherited from: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md).[gl](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#gl)

---

### isPaused

• `Private` **isPaused**: _boolean_

---

### moonCanvas

• `Private` **moonCanvas**: HTMLCanvasElement

---

### moonCtx

• `Private` **moonCtx**: CanvasRenderingContext2D

---

### pathRenderer

• `Private` **pathRenderer**: [_PathRenderer_](frontend_renderers_planetscaperenderer_pathrenderer.pathrenderer.md)

---

### planet

• **planet**: _undefined_ \| Planet

---

### projectionMatrix

• **projectionMatrix**: mat4

Overrides: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md).[projectionMatrix](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#projectionmatrix)

---

### spriteRenderer

• `Private` **spriteRenderer**: [_SpriteRenderer_](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md)

---

### uiManager

• `Private` **uiManager**: [_default_](backend_gamelogic_gameuimanager.default.md)

## Methods

### clear

▸ **clear**(`bits?`: _number_, `color?`: [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec)): _void_

#### Parameters

| Name     | Type                                                                           |
| :------- | :----------------------------------------------------------------------------- |
| `bits?`  | _number_                                                                       |
| `color?` | [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec) |

**Returns:** _void_

Inherited from: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

---

### destroy

▸ **destroy**(): _void_

**Returns:** _void_

---

### draw

▸ `Private` **draw**(): _void_

**Returns:** _void_

---

### drawHill

▸ `Private` **drawHill**(`fn`: (`x`: _number_) => _number_, `color`: [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec)): _void_

#### Parameters

| Name    | Type                                                                         |
| :------ | :--------------------------------------------------------------------------- |
| `fn`    | (`x`: _number_) => _number_                                                  |
| `color` | [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec) |

**Returns:** _void_

---

### drawMoon

▸ `Private` **drawMoon**(): _void_

**Returns:** _void_

---

### drawScape

▸ `Private` **drawScape**(): _void_

**Returns:** _void_

---

### flushArtifactOnce

▸ `Private` **flushArtifactOnce**(): _void_

**Returns:** _void_

---

### getTexIdx

▸ **getTexIdx**(): _number_

**Returns:** _number_

Inherited from: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

---

### loop

▸ `Private` **loop**(): _void_

**Returns:** _void_

---

### queueArtifacts

▸ `Private` **queueArtifacts**(): _void_

**Returns:** _void_

---

### setPaused

▸ **setPaused**(`isPaused?`: _boolean_): _void_

#### Parameters

| Name        | Type      |
| :---------- | :-------- |
| `isPaused?` | _boolean_ |

**Returns:** _void_

---

### setPlanet

▸ **setPlanet**(`planet`: _undefined_ \| Planet): _void_

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `planet` | _undefined_ \| Planet |

**Returns:** _void_

---

### setProjectionMatrix

▸ **setProjectionMatrix**(): _void_

**Returns:** _void_

Inherited from: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)
