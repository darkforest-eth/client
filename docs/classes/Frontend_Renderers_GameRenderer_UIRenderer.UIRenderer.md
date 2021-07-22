# Class: UIRenderer

[Frontend/Renderers/GameRenderer/UIRenderer](../modules/Frontend_Renderers_GameRenderer_UIRenderer.md).UIRenderer

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_UIRenderer.UIRenderer.md#constructor)

### Properties

- [renderer](Frontend_Renderers_GameRenderer_UIRenderer.UIRenderer.md#renderer)

### Methods

- [drawMiner](Frontend_Renderers_GameRenderer_UIRenderer.UIRenderer.md#drawminer)
- [queueBorders](Frontend_Renderers_GameRenderer_UIRenderer.UIRenderer.md#queueborders)
- [queueHoveringRect](Frontend_Renderers_GameRenderer_UIRenderer.UIRenderer.md#queuehoveringrect)
- [queueMousePath](Frontend_Renderers_GameRenderer_UIRenderer.UIRenderer.md#queuemousepath)
- [queueRectAtPlanet](Frontend_Renderers_GameRenderer_UIRenderer.UIRenderer.md#queuerectatplanet)
- [queueSelectedRangeRing](Frontend_Renderers_GameRenderer_UIRenderer.UIRenderer.md#queueselectedrangering)
- [queueSelectedRect](Frontend_Renderers_GameRenderer_UIRenderer.UIRenderer.md#queueselectedrect)

## Constructors

### constructor

• **new UIRenderer**(`renderer`)

#### Parameters

| Name       | Type                                                             |
| :--------- | :--------------------------------------------------------------- |
| `renderer` | [`default`](Frontend_Renderers_GameRenderer_Renderer.default.md) |

## Properties

### renderer

• **renderer**: [`default`](Frontend_Renderers_GameRenderer_Renderer.default.md)

## Methods

### drawMiner

▸ **drawMiner**(): `void`

#### Returns

`void`

---

### queueBorders

▸ **queueBorders**(): `void`

#### Returns

`void`

---

### queueHoveringRect

▸ **queueHoveringRect**(): `void`

#### Returns

`void`

---

### queueMousePath

▸ **queueMousePath**(): `void`

#### Returns

`void`

---

### queueRectAtPlanet

▸ `Private` **queueRectAtPlanet**(`planet`, `coords`, `color`): `void`

#### Parameters

| Name     | Type                                                                         |
| :------- | :--------------------------------------------------------------------------- |
| `planet` | `Planet`                                                                     |
| `coords` | `WorldCoords`                                                                |
| `color`  | [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec) |

#### Returns

`void`

---

### queueSelectedRangeRing

▸ **queueSelectedRangeRing**(): `void`

#### Returns

`void`

---

### queueSelectedRect

▸ **queueSelectedRect**(): `void`

#### Returns

`void`
