# Class: default

[Frontend/Renderers/GameRenderer/Entities/RingRenderer](../modules/frontend_renderers_gamerenderer_entities_ringrenderer.md).default

## Hierarchy

- [_GenericRenderer_](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)<_typeof_ [_RING_PROGRAM_DEFINITION_](../modules/frontend_renderers_gamerenderer_programs_ringprogram.md#ring_program_definition)\>

  ↳ **default**

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_entities_ringrenderer.default.md#constructor)

### Properties

- [attribData](frontend_renderers_gamerenderer_entities_ringrenderer.default.md#attribdata)
- [attribManagers](frontend_renderers_gamerenderer_entities_ringrenderer.default.md#attribmanagers)
- [botRectPosBuffer](frontend_renderers_gamerenderer_entities_ringrenderer.default.md#botrectposbuffer)
- [manager](frontend_renderers_gamerenderer_entities_ringrenderer.default.md#manager)
- [posBuffer](frontend_renderers_gamerenderer_entities_ringrenderer.default.md#posbuffer)
- [program](frontend_renderers_gamerenderer_entities_ringrenderer.default.md#program)
- [topRectPosBuffer](frontend_renderers_gamerenderer_entities_ringrenderer.default.md#toprectposbuffer)
- [uniformData](frontend_renderers_gamerenderer_entities_ringrenderer.default.md#uniformdata)
- [uniformLocs](frontend_renderers_gamerenderer_entities_ringrenderer.default.md#uniformlocs)
- [uniformSetters](frontend_renderers_gamerenderer_entities_ringrenderer.default.md#uniformsetters)
- [verts](frontend_renderers_gamerenderer_entities_ringrenderer.default.md#verts)
- [viewport](frontend_renderers_gamerenderer_entities_ringrenderer.default.md#viewport)

### Methods

- [flush](frontend_renderers_gamerenderer_entities_ringrenderer.default.md#flush)
- [queueBelt](frontend_renderers_gamerenderer_entities_ringrenderer.default.md#queuebelt)
- [queueBeltAtIdx](frontend_renderers_gamerenderer_entities_ringrenderer.default.md#queuebeltatidx)
- [queueBeltWorld](frontend_renderers_gamerenderer_entities_ringrenderer.default.md#queuebeltworld)
- [setUniforms](frontend_renderers_gamerenderer_entities_ringrenderer.default.md#setuniforms)

## Constructors

### constructor

\+ **new default**(`manager`: [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md)): [_default_](frontend_renderers_gamerenderer_entities_ringrenderer.default.md)

#### Parameters

| Name      | Type                                                                                    |
| :-------- | :-------------------------------------------------------------------------------------- |
| `manager` | [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md) |

**Returns:** [_default_](frontend_renderers_gamerenderer_entities_ringrenderer.default.md)

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)

## Properties

### attribData

• **attribData**: AttribData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[attribData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#attribdata)

---

### attribManagers

• **attribManagers**: _AttribManagers_<{ `attribs`: { `color`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `props`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `rectPos`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `now`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

A dictionary of attrib managers, keyed by attrib name.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[attribManagers](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#attribmanagers)

---

### botRectPosBuffer

• **botRectPosBuffer**: _number_[]

---

### manager

• **manager**: [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

WebGLManager corresponding to this program.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[manager](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#manager)

---

### posBuffer

• **posBuffer**: _number_[]

---

### program

• **program**: WebGLProgram

The program corresponding to this renderer.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[program](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#program)

---

### topRectPosBuffer

• **topRectPosBuffer**: _number_[]

---

### uniformData

• **uniformData**: UniformData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformdata)

---

### uniformLocs

• **uniformLocs**: _UniformLocs_<{ `attribs`: { `color`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `props`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `rectPos`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `now`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

Uniform locs for this program. Typically not referenced directly,
but rather through generated uniformSetters. Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformLocs](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformlocs)

---

### uniformSetters

• **uniformSetters**: _UniformSetters_<{ `attribs`: { `color`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `props`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `rectPos`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `now`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

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

### queueBelt

▸ **queueBelt**(`center`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md), `radius`: _number_, `color`: [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec), `l?`: _number_, `z?`: _number_, `delZ?`: _number_, `props?`: [_RingProps_](../modules/frontend_renderers_gamerenderer_programs_ringprogram.md#ringprops), `angle?`: _number_): _void_

#### Parameters

| Name     | Type                                                                                        | Default value |
| :------- | :------------------------------------------------------------------------------------------ | :------------ |
| `center` | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)                   | -             |
| `radius` | _number_                                                                                    | -             |
| `color`  | [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec)                | -             |
| `l`      | _number_                                                                                    | 1             |
| `z`      | _number_                                                                                    | 0             |
| `delZ`   | _number_                                                                                    | 0             |
| `props`  | [_RingProps_](../modules/frontend_renderers_gamerenderer_programs_ringprogram.md#ringprops) | -             |
| `angle`  | _number_                                                                                    | 0             |

**Returns:** _void_

---

### queueBeltAtIdx

▸ **queueBeltAtIdx**(`planet`: Planet, `centerW`: WorldCoords, `radiusW`: _number_, `color`: [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec), `beltIdx`: _number_, `angle?`: _number_): _void_

#### Parameters

| Name      | Type                                                                         | Default value |
| :-------- | :--------------------------------------------------------------------------- | :------------ |
| `planet`  | Planet                                                                       | -             |
| `centerW` | WorldCoords                                                                  | -             |
| `radiusW` | _number_                                                                     | -             |
| `color`   | [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec) | -             |
| `beltIdx` | _number_                                                                     | -             |
| `angle`   | _number_                                                                     | 0             |

**Returns:** _void_

---

### queueBeltWorld

▸ **queueBeltWorld**(`centerW`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md), `radiusW`: _number_, `color`: [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec), `l?`: _number_, `z?`: _number_, `delZ?`: _number_, `props?`: [_RingProps_](../modules/frontend_renderers_gamerenderer_programs_ringprogram.md#ringprops), `angle?`: _number_): _void_

#### Parameters

| Name      | Type                                                                                        | Default value |
| :-------- | :------------------------------------------------------------------------------------------ | :------------ |
| `centerW` | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)                   | -             |
| `radiusW` | _number_                                                                                    | -             |
| `color`   | [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec)                | -             |
| `l`       | _number_                                                                                    | 1             |
| `z`       | _number_                                                                                    | 0             |
| `delZ`    | _number_                                                                                    | 0             |
| `props`   | [_RingProps_](../modules/frontend_renderers_gamerenderer_programs_ringprogram.md#ringprops) | -             |
| `angle`   | _number_                                                                                    | 0             |

**Returns:** _void_

---

### setUniforms

▸ **setUniforms**(): _void_

**Returns:** _void_

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)
