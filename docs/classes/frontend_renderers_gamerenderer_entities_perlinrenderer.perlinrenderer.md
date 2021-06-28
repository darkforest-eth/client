# Class: PerlinRenderer

[Frontend/Renderers/GameRenderer/Entities/PerlinRenderer](../modules/frontend_renderers_gamerenderer_entities_perlinrenderer.md).PerlinRenderer

## Hierarchy

- [_GenericRenderer_](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)<_typeof_ [_PERLIN_PROGRAM_DEFINITION_](../modules/frontend_renderers_gamerenderer_programs_perlinprogram.md#perlin_program_definition)\>

  ↳ **PerlinRenderer**

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#constructor)

### Properties

- [attribData](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#attribdata)
- [attribManagers](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#attribmanagers)
- [config](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#config)
- [coordsBuffer](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#coordsbuffer)
- [manager](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#manager)
- [posBuffer](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#posbuffer)
- [program](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#program)
- [rectRenderer](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#rectrenderer)
- [thresholds](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#thresholds)
- [uniformData](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#uniformdata)
- [uniformLocs](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#uniformlocs)
- [uniformSetters](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#uniformsetters)
- [verts](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#verts)

### Methods

- [bufferGradients](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#buffergradients)
- [flush](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#flush)
- [queueChunk](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#queuechunk)
- [queueRect](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#queuerect)
- [setUniforms](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md#setuniforms)

## Constructors

### constructor

\+ **new PerlinRenderer**(`manager`: [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md), `config`: PerlinConfig, `thresholds`: [*number*, *number*, *number*], `rectRenderer?`: _undefined_ \| [_default_](frontend_renderers_gamerenderer_entities_rectrenderer.default.md)): [_PerlinRenderer_](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md)

#### Parameters

| Name           | Type                                                                                         |
| :------------- | :------------------------------------------------------------------------------------------- |
| `manager`      | [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md)      |
| `config`       | PerlinConfig                                                                                 |
| `thresholds`   | [*number*, *number*, *number*]                                                               |
| `rectRenderer` | _undefined_ \| [_default_](frontend_renderers_gamerenderer_entities_rectrenderer.default.md) |

**Returns:** [_PerlinRenderer_](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md)

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)

## Properties

### attribData

• **attribData**: AttribData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[attribData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#attribdata)

---

### attribManagers

• **attribManagers**: _AttribManagers_<{ `attribs`: { `p0botGrad`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `p0topGrad`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `p1botGrad`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `p1topGrad`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `p2botGrad`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `p2topGrad`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `worldCoords`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `lengthScale`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `thresholds`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

A dictionary of attrib managers, keyed by attrib name.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[attribManagers](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#attribmanagers)

---

### config

• **config**: PerlinConfig

---

### coordsBuffer

• **coordsBuffer**: _number_[]

---

### manager

• **manager**: [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md)

WebGLManager corresponding to this program.

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[manager](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#manager)

---

### posBuffer

• **posBuffer**: _number_[]

---

### program

• **program**: WebGLProgram

The program corresponding to this renderer.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[program](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#program)

---

### rectRenderer

• **rectRenderer**: _undefined_ \| [_default_](frontend_renderers_gamerenderer_entities_rectrenderer.default.md)

---

### thresholds

• **thresholds**: [_Vec3_](../modules/frontend_renderers_gamerenderer_enginetypes.md#vec3)

---

### uniformData

• **uniformData**: UniformData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformdata)

---

### uniformLocs

• **uniformLocs**: _UniformLocs_<{ `attribs`: { `p0botGrad`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `p0topGrad`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `p1botGrad`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `p1topGrad`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `p2botGrad`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `p2topGrad`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `worldCoords`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `lengthScale`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `thresholds`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

Uniform locs for this program. Typically not referenced directly,
but rather through generated uniformSetters. Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformLocs](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformlocs)

---

### uniformSetters

• **uniformSetters**: _UniformSetters_<{ `attribs`: { `p0botGrad`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `p0topGrad`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `p1botGrad`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `p1topGrad`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `p2botGrad`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `p2topGrad`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `worldCoords`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `lengthScale`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `thresholds`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

A dictionary of uniform setters, keyed by uniform name.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformSetters](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformsetters)

---

### verts

• **verts**: _number_

The number of queued vertices so far. Used for batch rendering.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[verts](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#verts)

## Methods

### bufferGradients

▸ `Private` **bufferGradients**(`rect`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md), `octave`: [_PerlinOctave_](../enums/frontend_renderers_gamerenderer_entities_perlinutils.perlinoctave.md), `topGrad`: [_default_](frontend_renderers_gamerenderer_webgl_attribmanager.default.md), `botGrad`: [_default_](frontend_renderers_gamerenderer_webgl_attribmanager.default.md)): _void_

#### Parameters

| Name      | Type                                                                                            |
| :-------- | :---------------------------------------------------------------------------------------------- |
| `rect`    | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)                             |
| `octave`  | [_PerlinOctave_](../enums/frontend_renderers_gamerenderer_entities_perlinutils.perlinoctave.md) |
| `topGrad` | [_default_](frontend_renderers_gamerenderer_webgl_attribmanager.default.md)                     |
| `botGrad` | [_default_](frontend_renderers_gamerenderer_webgl_attribmanager.default.md)                     |

**Returns:** _void_

---

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

### queueChunk

▸ **queueChunk**(`chunk`: [_Chunk_](_types_global_globaltypes.chunk.md)): _void_

#### Parameters

| Name    | Type                                          |
| :------ | :-------------------------------------------- |
| `chunk` | [_Chunk_](_types_global_globaltypes.chunk.md) |

**Returns:** _void_

---

### queueRect

▸ `Private` **queueRect**(`rect`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)): _void_

#### Parameters

| Name   | Type                                                                |
| :----- | :------------------------------------------------------------------ |
| `rect` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |

**Returns:** _void_

---

### setUniforms

▸ **setUniforms**(): _void_

**Returns:** _void_

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)
