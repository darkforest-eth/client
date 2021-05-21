# Class: default

[Frontend/Renderers/GameRenderer/Entities/CircleRenderer](../modules/frontend_renderers_gamerenderer_entities_circlerenderer.md).default

## Hierarchy

- [_GenericRenderer_](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)<_typeof_ [_CIRCLE_PROGRAM_DEFINITION_](../modules/frontend_renderers_gamerenderer_programs_circleprogram.md#circle_program_definition)\>

  ↳ **default**

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_entities_circlerenderer.default.md#constructor)

### Properties

- [attribData](frontend_renderers_gamerenderer_entities_circlerenderer.default.md#attribdata)
- [attribManagers](frontend_renderers_gamerenderer_entities_circlerenderer.default.md#attribmanagers)
- [manager](frontend_renderers_gamerenderer_entities_circlerenderer.default.md#manager)
- [program](frontend_renderers_gamerenderer_entities_circlerenderer.default.md#program)
- [quadBuffer](frontend_renderers_gamerenderer_entities_circlerenderer.default.md#quadbuffer)
- [uniformData](frontend_renderers_gamerenderer_entities_circlerenderer.default.md#uniformdata)
- [uniformLocs](frontend_renderers_gamerenderer_entities_circlerenderer.default.md#uniformlocs)
- [uniformSetters](frontend_renderers_gamerenderer_entities_circlerenderer.default.md#uniformsetters)
- [verts](frontend_renderers_gamerenderer_entities_circlerenderer.default.md#verts)
- [viewport](frontend_renderers_gamerenderer_entities_circlerenderer.default.md#viewport)

### Methods

- [flush](frontend_renderers_gamerenderer_entities_circlerenderer.default.md#flush)
- [queueCircle](frontend_renderers_gamerenderer_entities_circlerenderer.default.md#queuecircle)
- [queueCircleWorld](frontend_renderers_gamerenderer_entities_circlerenderer.default.md#queuecircleworld)
- [queueCircleWorldCenterOnly](frontend_renderers_gamerenderer_entities_circlerenderer.default.md#queuecircleworldcenteronly)
- [setUniforms](frontend_renderers_gamerenderer_entities_circlerenderer.default.md#setuniforms)

## Constructors

### constructor

\+ **new default**(`manager`: [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md)): [_default_](frontend_renderers_gamerenderer_entities_circlerenderer.default.md)

#### Parameters

| Name      | Type                                                                                    |
| :-------- | :-------------------------------------------------------------------------------------- |
| `manager` | [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md) |

**Returns:** [_default_](frontend_renderers_gamerenderer_entities_circlerenderer.default.md)

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)

## Properties

### attribData

• **attribData**: AttribData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[attribData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#attribdata)

---

### attribManagers

• **attribManagers**: _AttribManagers_<{ `attribs`: { `color`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `eps`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `props`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

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

### quadBuffer

• **quadBuffer**: _number_[]

---

### uniformData

• **uniformData**: UniformData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformdata)

---

### uniformLocs

• **uniformLocs**: _UniformLocs_<{ `attribs`: { `color`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `eps`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `props`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

Uniform locs for this program. Typically not referenced directly,
but rather through generated uniformSetters. Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformLocs](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformlocs)

---

### uniformSetters

• **uniformSetters**: _UniformSetters_<{ `attribs`: { `color`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `eps`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `props`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

A dictionary of uniform setters, keyed by uniform name.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformSetters](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformsetters)

---

### verts

• **verts**: _number_

The number of queued vertices so far. Used for batch rendering.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[verts](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#verts)

---

### viewport

• **viewport**: [_default_](frontend_game_viewport.default.md)

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

### queueCircle

▸ **queueCircle**(`center`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md), `radius`: _number_, `color?`: [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec), `stroke?`: _number_, `angle?`: _number_, `dashed?`: _boolean_): _void_

#### Parameters

| Name     | Type                                                                           | Default value |
| :------- | :----------------------------------------------------------------------------- | :------------ |
| `center` | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)      | -             |
| `radius` | _number_                                                                       | -             |
| `color`  | [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec) | -             |
| `stroke` | _number_                                                                       | -1            |
| `angle`  | _number_                                                                       | 1             |
| `dashed` | _boolean_                                                                      | false         |

**Returns:** _void_

---

### queueCircleWorld

▸ **queueCircleWorld**(`center`: WorldCoords, `radius`: _number_, `color?`: [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec), `stroke?`: _number_, `angle?`: _number_, `dashed?`: _boolean_): _void_

#### Parameters

| Name     | Type                                                                           | Default value |
| :------- | :----------------------------------------------------------------------------- | :------------ |
| `center` | WorldCoords                                                                    | -             |
| `radius` | _number_                                                                       | -             |
| `color`  | [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec) | -             |
| `stroke` | _number_                                                                       | -1            |
| `angle`  | _number_                                                                       | 1             |
| `dashed` | _boolean_                                                                      | false         |

**Returns:** _void_

---

### queueCircleWorldCenterOnly

▸ **queueCircleWorldCenterOnly**(`center`: WorldCoords, `radius`: _number_, `color?`: [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec)): _void_

#### Parameters

| Name     | Type                                                                           |
| :------- | :----------------------------------------------------------------------------- |
| `center` | WorldCoords                                                                    |
| `radius` | _number_                                                                       |
| `color`  | [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec) |

**Returns:** _void_

---

### setUniforms

▸ **setUniforms**(): _void_

**Returns:** _void_

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)
