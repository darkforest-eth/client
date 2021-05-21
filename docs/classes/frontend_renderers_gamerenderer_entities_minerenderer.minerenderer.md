# Class: MineRenderer

[Frontend/Renderers/GameRenderer/Entities/MineRenderer](../modules/frontend_renderers_gamerenderer_entities_minerenderer.md).MineRenderer

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_entities_minerenderer.minerenderer.md#constructor)

### Properties

- [beltRenderer](frontend_renderers_gamerenderer_entities_minerenderer.minerenderer.md#beltrenderer)
- [mineBodyRenderer](frontend_renderers_gamerenderer_entities_minerenderer.minerenderer.md#minebodyrenderer)

### Methods

- [flush](frontend_renderers_gamerenderer_entities_minerenderer.minerenderer.md#flush)
- [queueMine](frontend_renderers_gamerenderer_entities_minerenderer.minerenderer.md#queuemine)
- [queueMineScreen](frontend_renderers_gamerenderer_entities_minerenderer.minerenderer.md#queueminescreen)
- [setUniforms](frontend_renderers_gamerenderer_entities_minerenderer.minerenderer.md#setuniforms)

## Constructors

### constructor

\+ **new MineRenderer**(`manager`: [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)): [_MineRenderer_](frontend_renderers_gamerenderer_entities_minerenderer.minerenderer.md)

#### Parameters

| Name      | Type                                                                                 |
| :-------- | :----------------------------------------------------------------------------------- |
| `manager` | [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md) |

**Returns:** [_MineRenderer_](frontend_renderers_gamerenderer_entities_minerenderer.minerenderer.md)

## Properties

### beltRenderer

• **beltRenderer**: [_default_](frontend_renderers_gamerenderer_entities_beltrenderer.default.md)

---

### mineBodyRenderer

• **mineBodyRenderer**: [_MineBodyRenderer_](frontend_renderers_gamerenderer_entities_minebodyrenderer.minebodyrenderer.md)

## Methods

### flush

▸ **flush**(): _void_

**Returns:** _void_

---

### queueMine

▸ **queueMine**(`planet`: Planet, `centerW`: WorldCoords, `radiusW`: _number_): _void_

#### Parameters

| Name      | Type        |
| :-------- | :---------- |
| `planet`  | Planet      |
| `centerW` | WorldCoords |
| `radiusW` | _number_    |

**Returns:** _void_

---

### queueMineScreen

▸ **queueMineScreen**(`planet`: Planet, `centerW`: WorldCoords, `radiusW`: _number_, `z`: _number_): _void_

#### Parameters

| Name      | Type        |
| :-------- | :---------- |
| `planet`  | Planet      |
| `centerW` | WorldCoords |
| `radiusW` | _number_    |
| `z`       | _number_    |

**Returns:** _void_

---

### setUniforms

▸ **setUniforms**(): _void_

**Returns:** _void_
