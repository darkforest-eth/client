# Class: MineRenderer

[Frontend/Renderers/GameRenderer/Entities/MineRenderer](../modules/Frontend_Renderers_GameRenderer_Entities_MineRenderer.md).MineRenderer

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_Entities_MineRenderer.MineRenderer.md#constructor)

### Properties

- [beltRenderer](Frontend_Renderers_GameRenderer_Entities_MineRenderer.MineRenderer.md#beltrenderer)
- [mineBodyRenderer](Frontend_Renderers_GameRenderer_Entities_MineRenderer.MineRenderer.md#minebodyrenderer)

### Methods

- [flush](Frontend_Renderers_GameRenderer_Entities_MineRenderer.MineRenderer.md#flush)
- [queueMine](Frontend_Renderers_GameRenderer_Entities_MineRenderer.MineRenderer.md#queuemine)
- [queueMineScreen](Frontend_Renderers_GameRenderer_Entities_MineRenderer.MineRenderer.md#queueminescreen)
- [setUniforms](Frontend_Renderers_GameRenderer_Entities_MineRenderer.MineRenderer.md#setuniforms)

## Constructors

### constructor

• **new MineRenderer**(`manager`)

#### Parameters

| Name      | Type                                                                                 |
| :-------- | :----------------------------------------------------------------------------------- |
| `manager` | [`WebGLManager`](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md) |

## Properties

### beltRenderer

• **beltRenderer**: [`default`](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md)

---

### mineBodyRenderer

• **mineBodyRenderer**: [`MineBodyRenderer`](Frontend_Renderers_GameRenderer_Entities_MineBodyRenderer.MineBodyRenderer.md)

## Methods

### flush

▸ **flush**(): `void`

#### Returns

`void`

---

### queueMine

▸ **queueMine**(`planet`, `centerW`, `radiusW`): `void`

#### Parameters

| Name      | Type          |
| :-------- | :------------ |
| `planet`  | `Planet`      |
| `centerW` | `WorldCoords` |
| `radiusW` | `number`      |

#### Returns

`void`

---

### queueMineScreen

▸ **queueMineScreen**(`planet`, `centerW`, `radiusW`, `z`): `void`

#### Parameters

| Name      | Type          |
| :-------- | :------------ |
| `planet`  | `Planet`      |
| `centerW` | `WorldCoords` |
| `radiusW` | `number`      |
| `z`       | `number`      |

#### Returns

`void`

---

### setUniforms

▸ **setUniforms**(): `void`

#### Returns

`void`
