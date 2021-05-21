# Class: default

[Frontend/Renderers/GameRenderer/Entities/LineRenderer](../modules/frontend_renderers_gamerenderer_entities_linerenderer.md).default

## Hierarchy

- [_GenericRenderer_](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)<_typeof_ [_LINE_PROGRAM_DEFINITION_](../modules/frontend_renderers_gamerenderer_programs_lineprogram.md#line_program_definition)\>

  ↳ **default**

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_entities_linerenderer.default.md#constructor)

### Properties

- [attribData](frontend_renderers_gamerenderer_entities_linerenderer.default.md#attribdata)
- [attribManagers](frontend_renderers_gamerenderer_entities_linerenderer.default.md#attribmanagers)
- [manager](frontend_renderers_gamerenderer_entities_linerenderer.default.md#manager)
- [program](frontend_renderers_gamerenderer_entities_linerenderer.default.md#program)
- [uniformData](frontend_renderers_gamerenderer_entities_linerenderer.default.md#uniformdata)
- [uniformLocs](frontend_renderers_gamerenderer_entities_linerenderer.default.md#uniformlocs)
- [uniformSetters](frontend_renderers_gamerenderer_entities_linerenderer.default.md#uniformsetters)
- [verts](frontend_renderers_gamerenderer_entities_linerenderer.default.md#verts)

### Methods

- [flush](frontend_renderers_gamerenderer_entities_linerenderer.default.md#flush)
- [getOffset](frontend_renderers_gamerenderer_entities_linerenderer.default.md#getoffset)
- [queueLine](frontend_renderers_gamerenderer_entities_linerenderer.default.md#queueline)
- [queueLineWorld](frontend_renderers_gamerenderer_entities_linerenderer.default.md#queuelineworld)
- [setUniforms](frontend_renderers_gamerenderer_entities_linerenderer.default.md#setuniforms)

## Constructors

### constructor

\+ **new default**(`glManager`: [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md)): [_default_](frontend_renderers_gamerenderer_entities_linerenderer.default.md)

#### Parameters

| Name        | Type                                                                                    |
| :---------- | :-------------------------------------------------------------------------------------- |
| `glManager` | [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md) |

**Returns:** [_default_](frontend_renderers_gamerenderer_entities_linerenderer.default.md)

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)

## Properties

### attribData

• **attribData**: AttribData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[attribData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#attribdata)

---

### attribManagers

• **attribManagers**: _AttribManagers_<{ `attribs`: { `color`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `dist`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

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

• **uniformLocs**: _UniformLocs_<{ `attribs`: { `color`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `dist`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

Uniform locs for this program. Typically not referenced directly,
but rather through generated uniformSetters. Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformLocs](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformlocs)

---

### uniformSetters

• **uniformSetters**: _UniformSetters_<{ `attribs`: { `color`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `dist`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

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

### getOffset

▸ `Private` **getOffset**(`start`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md), `end`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)): [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)

#### Parameters

| Name    | Type                                                                      |
| :------ | :------------------------------------------------------------------------ |
| `start` | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md) |
| `end`   | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md) |

**Returns:** [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)

---

### queueLine

▸ **queueLine**(`start`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md), `end`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md), `color?`: [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec), `width?`: _number_, `zIdx?`: _number_, `dashed?`: _boolean_): _void_

#### Parameters

| Name     | Type                                                                           | Default value |
| :------- | :----------------------------------------------------------------------------- | :------------ |
| `start`  | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)      | -             |
| `end`    | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)      | -             |
| `color`  | [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec) | -             |
| `width`  | _number_                                                                       | 1             |
| `zIdx`   | _number_                                                                       | -             |
| `dashed` | _boolean_                                                                      | false         |

**Returns:** _void_

---

### queueLineWorld

▸ **queueLineWorld**(`start`: WorldCoords, `end`: WorldCoords, `color?`: [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec), `width?`: _number_, `zIdx?`: _number_, `dashed?`: _boolean_): _void_

#### Parameters

| Name     | Type                                                                           | Default value |
| :------- | :----------------------------------------------------------------------------- | :------------ |
| `start`  | WorldCoords                                                                    | -             |
| `end`    | WorldCoords                                                                    | -             |
| `color`  | [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec) | -             |
| `width`  | _number_                                                                       | 1             |
| `zIdx`   | _number_                                                                       | -             |
| `dashed` | _boolean_                                                                      | false         |

**Returns:** _void_

---

### setUniforms

▸ **setUniforms**(): _void_

**Returns:** _void_

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)
