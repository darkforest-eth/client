# Class: default

[Frontend/Renderers/GameRenderer/Entities/RectRenderer](../modules/frontend_renderers_gamerenderer_entities_rectrenderer.md).default

## Hierarchy

- [_GenericRenderer_](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)<_typeof_ [_RECT_PROGRAM_DEFINITION_](../modules/frontend_renderers_gamerenderer_programs_rectprogram.md#rect_program_definition)\>

  ↳ **default**

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_entities_rectrenderer.default.md#constructor)

### Properties

- [attribData](frontend_renderers_gamerenderer_entities_rectrenderer.default.md#attribdata)
- [attribManagers](frontend_renderers_gamerenderer_entities_rectrenderer.default.md#attribmanagers)
- [manager](frontend_renderers_gamerenderer_entities_rectrenderer.default.md#manager)
- [program](frontend_renderers_gamerenderer_entities_rectrenderer.default.md#program)
- [quad2Buffer](frontend_renderers_gamerenderer_entities_rectrenderer.default.md#quad2buffer)
- [quad3Buffer](frontend_renderers_gamerenderer_entities_rectrenderer.default.md#quad3buffer)
- [uniformData](frontend_renderers_gamerenderer_entities_rectrenderer.default.md#uniformdata)
- [uniformLocs](frontend_renderers_gamerenderer_entities_rectrenderer.default.md#uniformlocs)
- [uniformSetters](frontend_renderers_gamerenderer_entities_rectrenderer.default.md#uniformsetters)
- [verts](frontend_renderers_gamerenderer_entities_rectrenderer.default.md#verts)

### Methods

- [flush](frontend_renderers_gamerenderer_entities_rectrenderer.default.md#flush)
- [queueChunkBorder](frontend_renderers_gamerenderer_entities_rectrenderer.default.md#queuechunkborder)
- [queueRect](frontend_renderers_gamerenderer_entities_rectrenderer.default.md#queuerect)
- [queueRectCenterWorld](frontend_renderers_gamerenderer_entities_rectrenderer.default.md#queuerectcenterworld)
- [queueRectWorld](frontend_renderers_gamerenderer_entities_rectrenderer.default.md#queuerectworld)
- [setUniforms](frontend_renderers_gamerenderer_entities_rectrenderer.default.md#setuniforms)

## Constructors

### constructor

\+ **new default**(`manager`: [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md)): [_default_](frontend_renderers_gamerenderer_entities_rectrenderer.default.md)

#### Parameters

| Name      | Type                                                                                    |
| :-------- | :-------------------------------------------------------------------------------------- |
| `manager` | [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md) |

**Returns:** [_default_](frontend_renderers_gamerenderer_entities_rectrenderer.default.md)

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)

## Properties

### attribData

• **attribData**: AttribData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[attribData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#attribdata)

---

### attribManagers

• **attribManagers**: _AttribManagers_<{ `attribs`: { `color`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `rectPos`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `strokeX`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `strokeY`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

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

### quad2Buffer

• **quad2Buffer**: _number_[]

---

### quad3Buffer

• **quad3Buffer**: _number_[]

---

### uniformData

• **uniformData**: UniformData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformdata)

---

### uniformLocs

• **uniformLocs**: _UniformLocs_<{ `attribs`: { `color`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `rectPos`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `strokeX`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `strokeY`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

Uniform locs for this program. Typically not referenced directly,
but rather through generated uniformSetters. Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformLocs](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformlocs)

---

### uniformSetters

• **uniformSetters**: _UniformSetters_<{ `attribs`: { `color`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `rectPos`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `strokeX`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `strokeY`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

A dictionary of uniform setters, keyed by uniform name.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformSetters](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformsetters)

---

### verts

• **verts**: _number_

The number of queued vertices so far. Used for batch rendering.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[verts](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#verts)

## Methods

### flush

▸ **flush**(`drawMode?`: [_DrawMode_](../enums/frontend_renderers_gamerenderer_enginetypes.drawmode.md)): _void_

Draw all buffered vertices to the screen.

#### Parameters

| Name       | Type                                                                           | Description                                                     |
| :--------- | :----------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| `drawMode` | [_DrawMode_](../enums/frontend_renderers_gamerenderer_enginetypes.drawmode.md) | The drawing mode for the buffered vertices. Default: Triangles. |

**Returns:** _void_

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)

---

### queueChunkBorder

▸ **queueChunkBorder**(`chunk`: [_Chunk_](_types_global_globaltypes.chunk.md)): _void_

#### Parameters

| Name    | Type                                          |
| :------ | :-------------------------------------------- |
| `chunk` | [_Chunk_](_types_global_globaltypes.chunk.md) |

**Returns:** _void_

---

### queueRect

▸ **queueRect**(`__namedParameters`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md), `width`: _number_, `height`: _number_, `color?`: [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec), `stroke?`: _number_, `zIdx?`: _number_): _void_

#### Parameters

| Name                | Type                                                                         | Default value |
| :------------------ | :--------------------------------------------------------------------------- | :------------ |
| `__namedParameters` | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)    | -             |
| `width`             | _number_                                                                     | -             |
| `height`            | _number_                                                                     | -             |
| `color`             | [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec) | -             |
| `stroke`            | _number_                                                                     | -1            |
| `zIdx`              | _number_                                                                     | -             |

**Returns:** _void_

---

### queueRectCenterWorld

▸ **queueRectCenterWorld**(`center`: WorldCoords, `width`: _number_, `height`: _number_, `color?`: [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec), `stroke?`: _number_, `zIdx?`: _number_): _void_

#### Parameters

| Name     | Type                                                                         | Default value |
| :------- | :--------------------------------------------------------------------------- | :------------ |
| `center` | WorldCoords                                                                  | -             |
| `width`  | _number_                                                                     | -             |
| `height` | _number_                                                                     | -             |
| `color`  | [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec) | -             |
| `stroke` | _number_                                                                     | -1            |
| `zIdx`   | _number_                                                                     | -             |

**Returns:** _void_

---

### queueRectWorld

▸ **queueRectWorld**(`coords`: WorldCoords, `width`: _number_, `height`: _number_, `color?`: [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec), `stroke?`: _number_, `zIdx?`: _number_): _void_

#### Parameters

| Name     | Type                                                                         | Default value |
| :------- | :--------------------------------------------------------------------------- | :------------ |
| `coords` | WorldCoords                                                                  | -             |
| `width`  | _number_                                                                     | -             |
| `height` | _number_                                                                     | -             |
| `color`  | [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec) | -             |
| `stroke` | _number_                                                                     | -1            |
| `zIdx`   | _number_                                                                     | -             |

**Returns:** _void_

---

### setUniforms

▸ **setUniforms**(): _void_

**Returns:** _void_

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)
