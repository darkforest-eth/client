# Class: default

[Frontend/Renderers/GameRenderer/Entities/TextRenderer](../modules/frontend_renderers_gamerenderer_entities_textrenderer.md).default

## Hierarchy

- [_GenericRenderer_](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)<_typeof_ [_TEXT_PROGRAM_DEFINITION_](../modules/frontend_renderers_gamerenderer_programs_textprogram.md#text_program_definition)\>

  ↳ **default**

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_entities_textrenderer.default.md#constructor)

### Properties

- [attribData](frontend_renderers_gamerenderer_entities_textrenderer.default.md#attribdata)
- [attribManagers](frontend_renderers_gamerenderer_entities_textrenderer.default.md#attribmanagers)
- [bufferCanvas](frontend_renderers_gamerenderer_entities_textrenderer.default.md#buffercanvas)
- [glyphData](frontend_renderers_gamerenderer_entities_textrenderer.default.md#glyphdata)
- [manager](frontend_renderers_gamerenderer_entities_textrenderer.default.md#manager)
- [program](frontend_renderers_gamerenderer_entities_textrenderer.default.md#program)
- [quad2Buffer](frontend_renderers_gamerenderer_entities_textrenderer.default.md#quad2buffer)
- [quad3Buffer](frontend_renderers_gamerenderer_entities_textrenderer.default.md#quad3buffer)
- [texIdx](frontend_renderers_gamerenderer_entities_textrenderer.default.md#texidx)
- [uniformData](frontend_renderers_gamerenderer_entities_textrenderer.default.md#uniformdata)
- [uniformLocs](frontend_renderers_gamerenderer_entities_textrenderer.default.md#uniformlocs)
- [uniformSetters](frontend_renderers_gamerenderer_entities_textrenderer.default.md#uniformsetters)
- [verts](frontend_renderers_gamerenderer_entities_textrenderer.default.md#verts)

### Methods

- [createGlyphs](frontend_renderers_gamerenderer_entities_textrenderer.default.md#createglyphs)
- [flush](frontend_renderers_gamerenderer_entities_textrenderer.default.md#flush)
- [queueGlyph](frontend_renderers_gamerenderer_entities_textrenderer.default.md#queueglyph)
- [queueText](frontend_renderers_gamerenderer_entities_textrenderer.default.md#queuetext)
- [queueTextWorld](frontend_renderers_gamerenderer_entities_textrenderer.default.md#queuetextworld)
- [setTexture](frontend_renderers_gamerenderer_entities_textrenderer.default.md#settexture)
- [setUniforms](frontend_renderers_gamerenderer_entities_textrenderer.default.md#setuniforms)

## Constructors

### constructor

\+ **new default**(`manager`: [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md), `bufferCanvas`: HTMLCanvasElement): [_default_](frontend_renderers_gamerenderer_entities_textrenderer.default.md)

#### Parameters

| Name           | Type                                                                                 |
| :------------- | :----------------------------------------------------------------------------------- |
| `manager`      | [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md) |
| `bufferCanvas` | HTMLCanvasElement                                                                    |

**Returns:** [_default_](frontend_renderers_gamerenderer_entities_textrenderer.default.md)

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)

## Properties

### attribData

• **attribData**: AttribData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[attribData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#attribdata)

---

### attribManagers

• **attribManagers**: _AttribManagers_<{ `attribs`: { `color`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `texcoord`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `texture`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

A dictionary of attrib managers, keyed by attrib name.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[attribManagers](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#attribmanagers)

---

### bufferCanvas

• **bufferCanvas**: HTMLCanvasElement

---

### glyphData

• **glyphData**: _Map_<string, GlyphInfo\>

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

### texIdx

• **texIdx**: _number_

---

### uniformData

• **uniformData**: UniformData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformdata)

---

### uniformLocs

• **uniformLocs**: _UniformLocs_<{ `attribs`: { `color`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `texcoord`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `texture`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

Uniform locs for this program. Typically not referenced directly,
but rather through generated uniformSetters. Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformLocs](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformlocs)

---

### uniformSetters

• **uniformSetters**: _UniformSetters_<{ `attribs`: { `color`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `texcoord`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `texture`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

A dictionary of uniform setters, keyed by uniform name.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformSetters](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformsetters)

---

### verts

• **verts**: _number_

The number of queued vertices so far. Used for batch rendering.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[verts](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#verts)

## Methods

### createGlyphs

▸ `Private` **createGlyphs**(`debug?`: _boolean_): _void_

#### Parameters

| Name    | Type      | Default value |
| :------ | :-------- | :------------ |
| `debug` | _boolean_ | false         |

**Returns:** _void_

---

### flush

▸ **flush**(): _void_

**Returns:** _void_

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)

---

### queueGlyph

▸ `Private` **queueGlyph**(`glyph`: _string_, `x`: _number_, `y`: _number_, `color`: [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec), `zIdx`: _number_): _void_

#### Parameters

| Name    | Type                                                                           |
| :------ | :----------------------------------------------------------------------------- |
| `glyph` | _string_                                                                       |
| `x`     | _number_                                                                       |
| `y`     | _number_                                                                       |
| `color` | [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec) |
| `zIdx`  | _number_                                                                       |

**Returns:** _void_

---

### queueText

▸ **queueText**(`text`: _string_, `__namedParameters`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md), `color`: [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec), `align?`: [_TextAlign_](../enums/frontend_renderers_gamerenderer_enginetypes.textalign.md), `anchor?`: [_TextAnchor_](../enums/frontend_renderers_gamerenderer_enginetypes.textanchor.md), `zIdx?`: _number_): _void_

#### Parameters

| Name                | Type                                                                               |
| :------------------ | :--------------------------------------------------------------------------------- |
| `text`              | _string_                                                                           |
| `__namedParameters` | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)          |
| `color`             | [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec)     |
| `align`             | [_TextAlign_](../enums/frontend_renderers_gamerenderer_enginetypes.textalign.md)   |
| `anchor`            | [_TextAnchor_](../enums/frontend_renderers_gamerenderer_enginetypes.textanchor.md) |
| `zIdx`              | _number_                                                                           |

**Returns:** _void_

---

### queueTextWorld

▸ **queueTextWorld**(`text`: _string_, `coords`: WorldCoords, `color?`: [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec), `offY?`: _number_, `align?`: [_TextAlign_](../enums/frontend_renderers_gamerenderer_enginetypes.textalign.md), `anchor?`: [_TextAnchor_](../enums/frontend_renderers_gamerenderer_enginetypes.textanchor.md), `zIdx?`: _number_): _void_

#### Parameters

| Name     | Type                                                                               | Default value |
| :------- | :--------------------------------------------------------------------------------- | :------------ |
| `text`   | _string_                                                                           | -             |
| `coords` | WorldCoords                                                                        | -             |
| `color`  | [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec)     | -             |
| `offY`   | _number_                                                                           | 0             |
| `align`  | [_TextAlign_](../enums/frontend_renderers_gamerenderer_enginetypes.textalign.md)   | -             |
| `anchor` | [_TextAnchor_](../enums/frontend_renderers_gamerenderer_enginetypes.textanchor.md) | -             |
| `zIdx`   | _number_                                                                           | -             |

**Returns:** _void_

---

### setTexture

▸ `Private` **setTexture**(`texIdx`: _number_): _void_

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `texIdx` | _number_ |

**Returns:** _void_

---

### setUniforms

▸ **setUniforms**(): _void_

**Returns:** _void_

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)
