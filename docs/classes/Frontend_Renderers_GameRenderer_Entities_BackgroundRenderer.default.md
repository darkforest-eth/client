# Class: default

[Frontend/Renderers/GameRenderer/Entities/BackgroundRenderer](../modules/Frontend_Renderers_GameRenderer_Entities_BackgroundRenderer.md).default

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_Entities_BackgroundRenderer.default.md#constructor)

### Properties

- [borderRenderer](Frontend_Renderers_GameRenderer_Entities_BackgroundRenderer.default.md#borderrenderer)
- [manager](Frontend_Renderers_GameRenderer_Entities_BackgroundRenderer.default.md#manager)
- [perlinRenderer](Frontend_Renderers_GameRenderer_Entities_BackgroundRenderer.default.md#perlinrenderer)
- [renderer](Frontend_Renderers_GameRenderer_Entities_BackgroundRenderer.default.md#renderer)

### Methods

- [drawChunks](Frontend_Renderers_GameRenderer_Entities_BackgroundRenderer.default.md#drawchunks)
- [fillPerlin](Frontend_Renderers_GameRenderer_Entities_BackgroundRenderer.default.md#fillperlin)
- [flush](Frontend_Renderers_GameRenderer_Entities_BackgroundRenderer.default.md#flush)

## Constructors

### constructor

• **new default**(`manager`, `config`, `thresholds`)

#### Parameters

| Name         | Type                                                                                    |
| :----------- | :-------------------------------------------------------------------------------------- |
| `manager`    | [`GameGLManager`](Frontend_Renderers_GameRenderer_WebGL_GameGLManager.GameGLManager.md) |
| `config`     | `PerlinConfig`                                                                          |
| `thresholds` | [`number`, `number`, `number`]                                                          |

## Properties

### borderRenderer

• **borderRenderer**: [`default`](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md)

---

### manager

• **manager**: [`GameGLManager`](Frontend_Renderers_GameRenderer_WebGL_GameGLManager.GameGLManager.md)

---

### perlinRenderer

• **perlinRenderer**: [`PerlinRenderer`](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md)

---

### renderer

• **renderer**: [`default`](Frontend_Renderers_GameRenderer_Renderer.default.md)

## Methods

### drawChunks

▸ **drawChunks**(`exploredChunks`, `highPerfMode`, `drawChunkBorders`): `void`

#### Parameters

| Name               | Type                                                       |
| :----------------- | :--------------------------------------------------------- |
| `exploredChunks`   | `Iterable`<[`Chunk`](_types_global_GlobalTypes.Chunk.md)\> |
| `highPerfMode`     | `boolean`                                                  |
| `drawChunkBorders` | `boolean`                                                  |

#### Returns

`void`

---

### fillPerlin

▸ **fillPerlin**(): `void`

#### Returns

`void`

---

### flush

▸ **flush**(): `void`

#### Returns

`void`
