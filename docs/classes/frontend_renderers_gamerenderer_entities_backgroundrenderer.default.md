# Class: default

[Frontend/Renderers/GameRenderer/Entities/BackgroundRenderer](../modules/frontend_renderers_gamerenderer_entities_backgroundrenderer.md).default

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_entities_backgroundrenderer.default.md#constructor)

### Properties

- [borderRenderer](frontend_renderers_gamerenderer_entities_backgroundrenderer.default.md#borderrenderer)
- [manager](frontend_renderers_gamerenderer_entities_backgroundrenderer.default.md#manager)
- [perlinRenderer](frontend_renderers_gamerenderer_entities_backgroundrenderer.default.md#perlinrenderer)
- [renderer](frontend_renderers_gamerenderer_entities_backgroundrenderer.default.md#renderer)

### Methods

- [drawChunks](frontend_renderers_gamerenderer_entities_backgroundrenderer.default.md#drawchunks)
- [fillPerlin](frontend_renderers_gamerenderer_entities_backgroundrenderer.default.md#fillperlin)
- [flush](frontend_renderers_gamerenderer_entities_backgroundrenderer.default.md#flush)

## Constructors

### constructor

\+ **new default**(`manager`: [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md), `config`: PerlinConfig, `thresholds`: [*number*, *number*, *number*]): [_default_](frontend_renderers_gamerenderer_entities_backgroundrenderer.default.md)

#### Parameters

| Name         | Type                                                                                    |
| :----------- | :-------------------------------------------------------------------------------------- |
| `manager`    | [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md) |
| `config`     | PerlinConfig                                                                            |
| `thresholds` | [*number*, *number*, *number*]                                                          |

**Returns:** [_default_](frontend_renderers_gamerenderer_entities_backgroundrenderer.default.md)

## Properties

### borderRenderer

• **borderRenderer**: [_default_](frontend_renderers_gamerenderer_entities_rectrenderer.default.md)

---

### manager

• **manager**: [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md)

---

### perlinRenderer

• **perlinRenderer**: [_PerlinRenderer_](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md)

---

### renderer

• **renderer**: [_default_](frontend_renderers_gamerenderer_renderer.default.md)

## Methods

### drawChunks

▸ **drawChunks**(`exploredChunks`: _Iterable_<[_Chunk_](_types_global_globaltypes.chunk.md)\>, `highPerfMode`: _boolean_, `drawChunkBorders`: _boolean_): _void_

#### Parameters

| Name               | Type                                                       |
| :----------------- | :--------------------------------------------------------- |
| `exploredChunks`   | _Iterable_<[_Chunk_](_types_global_globaltypes.chunk.md)\> |
| `highPerfMode`     | _boolean_                                                  |
| `drawChunkBorders` | _boolean_                                                  |

**Returns:** _void_

---

### fillPerlin

▸ **fillPerlin**(): _void_

**Returns:** _void_

---

### flush

▸ **flush**(): _void_

**Returns:** _void_
