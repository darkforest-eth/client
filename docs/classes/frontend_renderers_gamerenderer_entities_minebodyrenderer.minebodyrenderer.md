# Class: MineBodyRenderer

[Frontend/Renderers/GameRenderer/Entities/MineBodyRenderer](../modules/frontend_renderers_gamerenderer_entities_minebodyrenderer.md).MineBodyRenderer

Renderers asteroids at the center of silver mines

## Hierarchy

- [_GenericRenderer_](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)<_typeof_ [_MINE_PROGRAM_DEFINITION_](../modules/frontend_renderers_gamerenderer_programs_mineprogram.md#mine_program_definition)\>

  ↳ **MineBodyRenderer**

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_entities_minebodyrenderer.minebodyrenderer.md#constructor)

### Properties

- [attribData](frontend_renderers_gamerenderer_entities_minebodyrenderer.minebodyrenderer.md#attribdata)
- [attribManagers](frontend_renderers_gamerenderer_entities_minebodyrenderer.minebodyrenderer.md#attribmanagers)
- [manager](frontend_renderers_gamerenderer_entities_minebodyrenderer.minebodyrenderer.md#manager)
- [program](frontend_renderers_gamerenderer_entities_minebodyrenderer.minebodyrenderer.md#program)
- [uniformData](frontend_renderers_gamerenderer_entities_minebodyrenderer.minebodyrenderer.md#uniformdata)
- [uniformLocs](frontend_renderers_gamerenderer_entities_minebodyrenderer.minebodyrenderer.md#uniformlocs)
- [uniformSetters](frontend_renderers_gamerenderer_entities_minebodyrenderer.minebodyrenderer.md#uniformsetters)
- [verts](frontend_renderers_gamerenderer_entities_minebodyrenderer.minebodyrenderer.md#verts)

### Methods

- [flush](frontend_renderers_gamerenderer_entities_minebodyrenderer.minebodyrenderer.md#flush)
- [queueMine](frontend_renderers_gamerenderer_entities_minebodyrenderer.minebodyrenderer.md#queuemine)
- [queueMineScreen](frontend_renderers_gamerenderer_entities_minebodyrenderer.minebodyrenderer.md#queueminescreen)
- [queuePoint](frontend_renderers_gamerenderer_entities_minebodyrenderer.minebodyrenderer.md#queuepoint)
- [setUniforms](frontend_renderers_gamerenderer_entities_minebodyrenderer.minebodyrenderer.md#setuniforms)

## Constructors

### constructor

\+ **new MineBodyRenderer**(`manager`: [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)): [_MineBodyRenderer_](frontend_renderers_gamerenderer_entities_minebodyrenderer.minebodyrenderer.md)

#### Parameters

| Name      | Type                                                                                 |
| :-------- | :----------------------------------------------------------------------------------- |
| `manager` | [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md) |

**Returns:** [_MineBodyRenderer_](frontend_renderers_gamerenderer_entities_minebodyrenderer.minebodyrenderer.md)

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)

## Properties

### attribData

• **attribData**: AttribData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[attribData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#attribdata)

---

### attribManagers

• **attribManagers**: _AttribManagers_<{ `attribs`: { `color`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `offset`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `radius`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `seed`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `now`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

A dictionary of attrib managers, keyed by attrib name.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[attribManagers](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#attribmanagers)

---

### manager

• **manager**: [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

WebGLManager corresponding to this program.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[manager](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#manager)

---

### program

• **program**: WebGLProgram

The program corresponding to this renderer.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[program](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#program)

---

### uniformData

• **uniformData**: UniformData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformdata)

---

### uniformLocs

• **uniformLocs**: _UniformLocs_<{ `attribs`: { `color`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `offset`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `radius`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `seed`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `now`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

Uniform locs for this program. Typically not referenced directly,
but rather through generated uniformSetters. Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformLocs](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformlocs)

---

### uniformSetters

• **uniformSetters**: _UniformSetters_<{ `attribs`: { `color`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `offset`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `radius`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `seed`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `now`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

A dictionary of uniform setters, keyed by uniform name.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformSetters](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformsetters)

---

### verts

• **verts**: _number_

The number of queued vertices so far. Used for batch rendering.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[verts](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#verts)

## Methods

### flush

▸ **flush**(): _void_

**Returns:** _void_

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)

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

▸ **queueMineScreen**(`planet`: Planet, `center`: WorldCoords, `radius`: _number_, `z`: _number_): _void_

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `planet` | Planet      |
| `center` | WorldCoords |
| `radius` | _number_    |
| `z`      | _number_    |

**Returns:** _void_

---

### queuePoint

▸ `Private` **queuePoint**(`__namedParameters`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md), `z`: _number_, `radius`: _number_, `color`: [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec), `seed`: _number_, `offset`: _number_): _void_

#### Parameters

| Name                | Type                                                                         |
| :------------------ | :--------------------------------------------------------------------------- |
| `__namedParameters` | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)    |
| `z`                 | _number_                                                                     |
| `radius`            | _number_                                                                     |
| `color`             | [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec) |
| `seed`              | _number_                                                                     |
| `offset`            | _number_                                                                     |

**Returns:** _void_

---

### setUniforms

▸ **setUniforms**(): _void_

**Returns:** _void_

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)
