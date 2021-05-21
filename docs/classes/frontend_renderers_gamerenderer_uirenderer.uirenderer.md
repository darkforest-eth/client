# Class: UIRenderer

[Frontend/Renderers/GameRenderer/UIRenderer](../modules/frontend_renderers_gamerenderer_uirenderer.md).UIRenderer

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_uirenderer.uirenderer.md#constructor)

### Properties

- [renderer](frontend_renderers_gamerenderer_uirenderer.uirenderer.md#renderer)

### Methods

- [drawMiner](frontend_renderers_gamerenderer_uirenderer.uirenderer.md#drawminer)
- [queueBorders](frontend_renderers_gamerenderer_uirenderer.uirenderer.md#queueborders)
- [queueHoveringRect](frontend_renderers_gamerenderer_uirenderer.uirenderer.md#queuehoveringrect)
- [queueMousePath](frontend_renderers_gamerenderer_uirenderer.uirenderer.md#queuemousepath)
- [queueRectAtPlanet](frontend_renderers_gamerenderer_uirenderer.uirenderer.md#queuerectatplanet)
- [queueSelectedRangeRing](frontend_renderers_gamerenderer_uirenderer.uirenderer.md#queueselectedrangering)
- [queueSelectedRect](frontend_renderers_gamerenderer_uirenderer.uirenderer.md#queueselectedrect)

## Constructors

### constructor

\+ **new UIRenderer**(`renderer`: [_default_](frontend_renderers_gamerenderer_renderer.default.md)): [_UIRenderer_](frontend_renderers_gamerenderer_uirenderer.uirenderer.md)

#### Parameters

| Name       | Type                                                             |
| :--------- | :--------------------------------------------------------------- |
| `renderer` | [_default_](frontend_renderers_gamerenderer_renderer.default.md) |

**Returns:** [_UIRenderer_](frontend_renderers_gamerenderer_uirenderer.uirenderer.md)

## Properties

### renderer

• **renderer**: [_default_](frontend_renderers_gamerenderer_renderer.default.md)

## Methods

### drawMiner

▸ **drawMiner**(): _void_

**Returns:** _void_

---

### queueBorders

▸ **queueBorders**(): _void_

**Returns:** _void_

---

### queueHoveringRect

▸ **queueHoveringRect**(): _void_

**Returns:** _void_

---

### queueMousePath

▸ **queueMousePath**(): _void_

**Returns:** _void_

---

### queueRectAtPlanet

▸ `Private` **queueRectAtPlanet**(`planet`: Planet, `coords`: WorldCoords, `color`: [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec)): _void_

#### Parameters

| Name     | Type                                                                         |
| :------- | :--------------------------------------------------------------------------- |
| `planet` | Planet                                                                       |
| `coords` | WorldCoords                                                                  |
| `color`  | [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec) |

**Returns:** _void_

---

### queueSelectedRangeRing

▸ **queueSelectedRangeRing**(): _void_

**Returns:** _void_

---

### queueSelectedRect

▸ **queueSelectedRect**(): _void_

**Returns:** _void_
