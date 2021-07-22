# Class: default

[Frontend/Renderers/GameRenderer/Entities/TextRenderer](../modules/Frontend_Renderers_GameRenderer_Entities_TextRenderer.md).default

## Hierarchy

- [`GenericRenderer`](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md)<typeof [`TEXT_PROGRAM_DEFINITION`](../modules/Frontend_Renderers_GameRenderer_Programs_TextProgram.md#text_program_definition)\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#constructor)

### Properties

- [attribData](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#attribdata)
- [attribManagers](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#attribmanagers)
- [bufferCanvas](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#buffercanvas)
- [glyphData](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#glyphdata)
- [manager](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#manager)
- [program](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#program)
- [quad2Buffer](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#quad2buffer)
- [quad3Buffer](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#quad3buffer)
- [texIdx](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#texidx)
- [uniformData](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#uniformdata)
- [uniformLocs](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#uniformlocs)
- [uniformSetters](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#uniformsetters)
- [verts](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#verts)

### Methods

- [createGlyphs](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#createglyphs)
- [flush](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#flush)
- [queueGlyph](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#queueglyph)
- [queueText](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#queuetext)
- [queueTextWorld](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#queuetextworld)
- [setTexture](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#settexture)
- [setUniforms](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md#setuniforms)

## Constructors

### constructor

• **new default**(`manager`, `bufferCanvas`)

Create a renderer from a WebGLManager and program data.

#### Parameters

| Name           | Type                                                                                 |
| :------------- | :----------------------------------------------------------------------------------- |
| `manager`      | [`WebGLManager`](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md) |
| `bufferCanvas` | `HTMLCanvasElement`                                                                  |

#### Overrides

[GenericRenderer](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md).[constructor](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#constructor)

## Properties

### attribData

• **attribData**: `AttribData`

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

#### Inherited from

[GenericRenderer](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md).[attribData](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#attribdata)

---

### attribManagers

• **attribManagers**: `AttribManagers`<`Object`\>

A dictionary of attrib managers, keyed by attrib name.

#### Inherited from

[GenericRenderer](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md).[attribManagers](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#attribmanagers)

---

### bufferCanvas

• **bufferCanvas**: `HTMLCanvasElement`

---

### glyphData

• **glyphData**: `Map`<`string`, `GlyphInfo`\>

---

### manager

• **manager**: [`WebGLManager`](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md)

WebGLManager corresponding to this program.

#### Inherited from

[GenericRenderer](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md).[manager](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#manager)

---

### program

• **program**: `WebGLProgram`

The program corresponding to this renderer.

#### Inherited from

[GenericRenderer](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md).[program](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#program)

---

### quad2Buffer

• **quad2Buffer**: `number`[]

---

### quad3Buffer

• **quad3Buffer**: `number`[]

---

### texIdx

• **texIdx**: `number`

---

### uniformData

• **uniformData**: `UniformData`

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

#### Inherited from

[GenericRenderer](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md).[uniformData](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#uniformdata)

---

### uniformLocs

• **uniformLocs**: `UniformLocs`<`Object`\>

Uniform locs for this program. Typically not referenced directly,
but rather through generated uniformSetters. Kept for use in inherited classes.

#### Inherited from

[GenericRenderer](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md).[uniformLocs](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#uniformlocs)

---

### uniformSetters

• **uniformSetters**: `UniformSetters`<`Object`\>

A dictionary of uniform setters, keyed by uniform name.

#### Inherited from

[GenericRenderer](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md).[uniformSetters](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#uniformsetters)

---

### verts

• **verts**: `number`

The number of queued vertices so far. Used for batch rendering.

#### Inherited from

[GenericRenderer](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md).[verts](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#verts)

## Methods

### createGlyphs

▸ `Private` **createGlyphs**(`debug?`): `void`

#### Parameters

| Name    | Type      | Default value |
| :------ | :-------- | :------------ |
| `debug` | `boolean` | `false`       |

#### Returns

`void`

---

### flush

▸ **flush**(): `void`

Draw all buffered vertices to the screen.

#### Returns

`void`

#### Overrides

[GenericRenderer](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md).[flush](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#flush)

---

### queueGlyph

▸ `Private` **queueGlyph**(`glyph`, `x`, `y`, `color`, `zIdx`): `void`

#### Parameters

| Name    | Type                                                                           |
| :------ | :----------------------------------------------------------------------------- |
| `glyph` | `string`                                                                       |
| `x`     | `number`                                                                       |
| `y`     | `number`                                                                       |
| `color` | [`RGBAVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbavec) |
| `zIdx`  | `number`                                                                       |

#### Returns

`void`

---

### queueText

▸ **queueText**(`text`, `__namedParameters`, `color`, `align?`, `anchor?`, `zIdx?`): `void`

#### Parameters

| Name                | Type                                                                               |
| :------------------ | :--------------------------------------------------------------------------------- |
| `text`              | `string`                                                                           |
| `__namedParameters` | [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md)          |
| `color`             | [`RGBAVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbavec)     |
| `align`             | [`TextAlign`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.TextAlign.md)   |
| `anchor`            | [`TextAnchor`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.TextAnchor.md) |
| `zIdx`              | `number`                                                                           |

#### Returns

`void`

---

### queueTextWorld

▸ **queueTextWorld**(`text`, `coords`, `color?`, `offY?`, `align?`, `anchor?`, `zIdx?`): `void`

#### Parameters

| Name     | Type                                                                               | Default value |
| :------- | :--------------------------------------------------------------------------------- | :------------ |
| `text`   | `string`                                                                           | `undefined`   |
| `coords` | `WorldCoords`                                                                      | `undefined`   |
| `color`  | [`RGBAVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbavec)     | `undefined`   |
| `offY`   | `number`                                                                           | `0`           |
| `align`  | [`TextAlign`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.TextAlign.md)   | `undefined`   |
| `anchor` | [`TextAnchor`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.TextAnchor.md) | `undefined`   |
| `zIdx`   | `number`                                                                           | `undefined`   |

#### Returns

`void`

---

### setTexture

▸ `Private` **setTexture**(`texIdx`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `texIdx` | `number` |

#### Returns

`void`

---

### setUniforms

▸ **setUniforms**(): `void`

Run by flush(). Override this in child classes. Programs with uniformss
should always override this.

#### Returns

`void`

#### Overrides

[GenericRenderer](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md).[setUniforms](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#setuniforms)
