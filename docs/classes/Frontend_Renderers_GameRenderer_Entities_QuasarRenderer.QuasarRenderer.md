# Class: QuasarRenderer

[Frontend/Renderers/GameRenderer/Entities/QuasarRenderer](../modules/Frontend_Renderers_GameRenderer_Entities_QuasarRenderer.md).QuasarRenderer

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_Entities_QuasarRenderer.QuasarRenderer.md#constructor)

### Properties

- [manager](Frontend_Renderers_GameRenderer_Entities_QuasarRenderer.QuasarRenderer.md#manager)
- [quasarBodyRenderer](Frontend_Renderers_GameRenderer_Entities_QuasarRenderer.QuasarRenderer.md#quasarbodyrenderer)
- [quasarRayRendererBot](Frontend_Renderers_GameRenderer_Entities_QuasarRenderer.QuasarRenderer.md#quasarrayrendererbot)
- [quasarRayRendererTop](Frontend_Renderers_GameRenderer_Entities_QuasarRenderer.QuasarRenderer.md#quasarrayrenderertop)
- [renderer](Frontend_Renderers_GameRenderer_Entities_QuasarRenderer.QuasarRenderer.md#renderer)

### Methods

- [flush](Frontend_Renderers_GameRenderer_Entities_QuasarRenderer.QuasarRenderer.md#flush)
- [getAngle](Frontend_Renderers_GameRenderer_Entities_QuasarRenderer.QuasarRenderer.md#getangle)
- [queueQuasar](Frontend_Renderers_GameRenderer_Entities_QuasarRenderer.QuasarRenderer.md#queuequasar)
- [queueQuasarScreen](Frontend_Renderers_GameRenderer_Entities_QuasarRenderer.QuasarRenderer.md#queuequasarscreen)
- [setUniforms](Frontend_Renderers_GameRenderer_Entities_QuasarRenderer.QuasarRenderer.md#setuniforms)

## Constructors

### constructor

• **new QuasarRenderer**(`manager`)

#### Parameters

| Name      | Type                                                                                 |
| :-------- | :----------------------------------------------------------------------------------- |
| `manager` | [`WebGLManager`](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md) |

## Properties

### manager

• **manager**: [`WebGLManager`](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md)

---

### quasarBodyRenderer

• **quasarBodyRenderer**: [`QuasarBodyRenderer`](Frontend_Renderers_GameRenderer_Entities_QuasarBodyRenderer.QuasarBodyRenderer.md)

---

### quasarRayRendererBot

• **quasarRayRendererBot**: [`QuasarRayRenderer`](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md)

---

### quasarRayRendererTop

• **quasarRayRendererTop**: [`QuasarRayRenderer`](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md)

---

### renderer

• **renderer**: [`default`](Frontend_Renderers_GameRenderer_Renderer.default.md)

## Methods

### flush

▸ **flush**(): `void`

#### Returns

`void`

---

### getAngle

▸ `Private` **getAngle**(): `number`

#### Returns

`number`

---

### queueQuasar

▸ **queueQuasar**(`planet`, `centerW`, `radiusW`): `void`

#### Parameters

| Name      | Type          |
| :-------- | :------------ |
| `planet`  | `Planet`      |
| `centerW` | `WorldCoords` |
| `radiusW` | `number`      |

#### Returns

`void`

---

### queueQuasarScreen

▸ **queueQuasarScreen**(`planet`, `center`, `radius`, `z`): `void`

#### Parameters

| Name     | Type                                                                      |
| :------- | :------------------------------------------------------------------------ |
| `planet` | `Planet`                                                                  |
| `center` | [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md) |
| `radius` | `number`                                                                  |
| `z`      | `number`                                                                  |

#### Returns

`void`

---

### setUniforms

▸ **setUniforms**(): `void`

#### Returns

`void`
