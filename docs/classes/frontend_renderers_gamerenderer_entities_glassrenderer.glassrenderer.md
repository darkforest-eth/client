# Class: GlassRenderer

[Frontend/Renderers/GameRenderer/Entities/GlassRenderer](../modules/frontend_renderers_gamerenderer_entities_glassrenderer.md).GlassRenderer

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md#constructor)

### Properties

- [loaded](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md#loaded)
- [manager](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md#manager)
- [matrixULoc](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md#matrixuloc)
- [posA](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md#posa)
- [posBuffer](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md#posbuffer)
- [program](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md#program)
- [texA](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md#texa)
- [texBuffer](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md#texbuffer)
- [texIdx](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md#texidx)
- [textureULoc](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md#textureuloc)
- [verts](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md#verts)

### Methods

- [beginFrame](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md#beginframe)
- [flush](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md#flush)
- [loadTexture](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md#loadtexture)
- [queueGlass](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md#queueglass)
- [queueGlassWorld](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md#queueglassworld)
- [setup](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md#setup)

## Constructors

### constructor

\+ **new GlassRenderer**(`manager`: [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md)): [_GlassRenderer_](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md)

#### Parameters

| Name      | Type                                                                                    |
| :-------- | :-------------------------------------------------------------------------------------- |
| `manager` | [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md) |

**Returns:** [_GlassRenderer_](frontend_renderers_gamerenderer_entities_glassrenderer.glassrenderer.md)

## Properties

### loaded

• **loaded**: _boolean_

---

### manager

• **manager**: [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md)

---

### matrixULoc

• **matrixULoc**: `null` \| WebGLUniformLocation

---

### posA

• **posA**: [_default_](frontend_renderers_gamerenderer_webgl_attribmanager.default.md)

---

### posBuffer

• **posBuffer**: _number_[]

---

### program

• **program**: WebGLProgram

---

### texA

• **texA**: [_default_](frontend_renderers_gamerenderer_webgl_attribmanager.default.md)

---

### texBuffer

• **texBuffer**: _number_[]

---

### texIdx

• **texIdx**: _number_

---

### textureULoc

• **textureULoc**: `null` \| WebGLUniformLocation

---

### verts

• **verts**: _number_

## Methods

### beginFrame

▸ `Private` **beginFrame**(): _void_

**Returns:** _void_

---

### flush

▸ **flush**(): _void_

**Returns:** _void_

---

### loadTexture

▸ `Private` **loadTexture**(`img`: HTMLImageElement, `texIdx`: _number_): _Promise_<void\>

#### Parameters

| Name     | Type             |
| :------- | :--------------- |
| `img`    | HTMLImageElement |
| `texIdx` | _number_         |

**Returns:** _Promise_<void\>

---

### queueGlass

▸ **queueGlass**(`__namedParameters`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)): _void_

#### Parameters

| Name                | Type                                                                      |
| :------------------ | :------------------------------------------------------------------------ |
| `__namedParameters` | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md) |

**Returns:** _void_

---

### queueGlassWorld

▸ **queueGlassWorld**(`loc`: WorldCoords): _void_

#### Parameters

| Name  | Type        |
| :---- | :---------- |
| `loc` | WorldCoords |

**Returns:** _void_

---

### setup

▸ `Private` **setup**(): _Promise_<void\>

**Returns:** _Promise_<void\>
