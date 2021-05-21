# Class: QuasarRenderer

[Frontend/Renderers/GameRenderer/Entities/QuasarRenderer](../modules/frontend_renderers_gamerenderer_entities_quasarrenderer.md).QuasarRenderer

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_entities_quasarrenderer.quasarrenderer.md#constructor)

### Properties

- [manager](frontend_renderers_gamerenderer_entities_quasarrenderer.quasarrenderer.md#manager)
- [quasarBodyRenderer](frontend_renderers_gamerenderer_entities_quasarrenderer.quasarrenderer.md#quasarbodyrenderer)
- [quasarRayRendererBot](frontend_renderers_gamerenderer_entities_quasarrenderer.quasarrenderer.md#quasarrayrendererbot)
- [quasarRayRendererTop](frontend_renderers_gamerenderer_entities_quasarrenderer.quasarrenderer.md#quasarrayrenderertop)
- [renderer](frontend_renderers_gamerenderer_entities_quasarrenderer.quasarrenderer.md#renderer)

### Methods

- [flush](frontend_renderers_gamerenderer_entities_quasarrenderer.quasarrenderer.md#flush)
- [getAngle](frontend_renderers_gamerenderer_entities_quasarrenderer.quasarrenderer.md#getangle)
- [queueQuasar](frontend_renderers_gamerenderer_entities_quasarrenderer.quasarrenderer.md#queuequasar)
- [queueQuasarScreen](frontend_renderers_gamerenderer_entities_quasarrenderer.quasarrenderer.md#queuequasarscreen)
- [setUniforms](frontend_renderers_gamerenderer_entities_quasarrenderer.quasarrenderer.md#setuniforms)

## Constructors

### constructor

\+ **new QuasarRenderer**(`manager`: [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)): [_QuasarRenderer_](frontend_renderers_gamerenderer_entities_quasarrenderer.quasarrenderer.md)

#### Parameters

| Name      | Type                                                                                 |
| :-------- | :----------------------------------------------------------------------------------- |
| `manager` | [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md) |

**Returns:** [_QuasarRenderer_](frontend_renderers_gamerenderer_entities_quasarrenderer.quasarrenderer.md)

## Properties

### manager

• **manager**: [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

---

### quasarBodyRenderer

• **quasarBodyRenderer**: [_QuasarBodyRenderer_](frontend_renderers_gamerenderer_entities_quasarbodyrenderer.quasarbodyrenderer.md)

---

### quasarRayRendererBot

• **quasarRayRendererBot**: [_QuasarRayRenderer_](frontend_renderers_gamerenderer_entities_quasarrayrenderer.quasarrayrenderer.md)

---

### quasarRayRendererTop

• **quasarRayRendererTop**: [_QuasarRayRenderer_](frontend_renderers_gamerenderer_entities_quasarrayrenderer.quasarrayrenderer.md)

---

### renderer

• **renderer**: [_default_](frontend_renderers_gamerenderer_renderer.default.md)

## Methods

### flush

▸ **flush**(): _void_

**Returns:** _void_

---

### getAngle

▸ `Private` **getAngle**(): _number_

**Returns:** _number_

---

### queueQuasar

▸ **queueQuasar**(`planet`: Planet, `centerW`: WorldCoords, `radiusW`: _number_): _void_

#### Parameters

| Name      | Type        |
| :-------- | :---------- |
| `planet`  | Planet      |
| `centerW` | WorldCoords |
| `radiusW` | _number_    |

**Returns:** _void_

---

### queueQuasarScreen

▸ **queueQuasarScreen**(`planet`: Planet, `center`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md), `radius`: _number_, `z`: _number_): _void_

#### Parameters

| Name     | Type                                                                      |
| :------- | :------------------------------------------------------------------------ |
| `planet` | Planet                                                                    |
| `center` | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md) |
| `radius` | _number_                                                                  |
| `z`      | _number_                                                                  |

**Returns:** _void_

---

### setUniforms

▸ **setUniforms**(): _void_

**Returns:** _void_
