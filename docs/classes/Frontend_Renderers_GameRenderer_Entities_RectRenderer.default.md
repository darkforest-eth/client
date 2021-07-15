# Class: default

[Frontend/Renderers/GameRenderer/Entities/RectRenderer](../modules/Frontend_Renderers_GameRenderer_Entities_RectRenderer.md).default

## Hierarchy

- [`GenericRenderer`](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md)<typeof [`RECT_PROGRAM_DEFINITION`](../modules/Frontend_Renderers_GameRenderer_Programs_RectProgram.md#rect_program_definition)\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md#constructor)

### Properties

- [attribData](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md#attribdata)
- [attribManagers](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md#attribmanagers)
- [manager](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md#manager)
- [program](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md#program)
- [quad2Buffer](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md#quad2buffer)
- [quad3Buffer](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md#quad3buffer)
- [uniformData](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md#uniformdata)
- [uniformLocs](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md#uniformlocs)
- [uniformSetters](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md#uniformsetters)
- [verts](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md#verts)

### Methods

- [flush](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md#flush)
- [queueChunkBorder](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md#queuechunkborder)
- [queueRect](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md#queuerect)
- [queueRectCenterWorld](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md#queuerectcenterworld)
- [queueRectWorld](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md#queuerectworld)
- [setUniforms](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md#setuniforms)

## Constructors

### constructor

• **new default**(`manager`)

Create a renderer from a WebGLManager and program data.

#### Parameters

| Name      | Type                                                                                    |
| :-------- | :-------------------------------------------------------------------------------------- |
| `manager` | [`GameGLManager`](Frontend_Renderers_GameRenderer_WebGL_GameGLManager.GameGLManager.md) |

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

### flush

▸ **flush**(`drawMode?`): `void`

Draw all buffered vertices to the screen.

#### Parameters

| Name       | Type                                                                           | Description                                                     |
| :--------- | :----------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| `drawMode` | [`DrawMode`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.DrawMode.md) | The drawing mode for the buffered vertices. Default: Triangles. |

#### Returns

`void`

#### Inherited from

[GenericRenderer](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md).[flush](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#flush)

---

### queueChunkBorder

▸ **queueChunkBorder**(`chunk`): `void`

#### Parameters

| Name    | Type                                          |
| :------ | :-------------------------------------------- |
| `chunk` | [`Chunk`](_types_global_GlobalTypes.Chunk.md) |

#### Returns

`void`

---

### queueRect

▸ **queueRect**(`__namedParameters`, `width`, `height`, `color?`, `stroke?`, `zIdx?`): `void`

#### Parameters

| Name                | Type                                                                         | Default value |
| :------------------ | :--------------------------------------------------------------------------- | :------------ |
| `__namedParameters` | [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md)    | `undefined`   |
| `width`             | `number`                                                                     | `undefined`   |
| `height`            | `number`                                                                     | `undefined`   |
| `color`             | [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec) | `undefined`   |
| `stroke`            | `number`                                                                     | `-1`          |
| `zIdx`              | `number`                                                                     | `undefined`   |

#### Returns

`void`

---

### queueRectCenterWorld

▸ **queueRectCenterWorld**(`center`, `width`, `height`, `color?`, `stroke?`, `zIdx?`): `void`

#### Parameters

| Name     | Type                                                                         | Default value |
| :------- | :--------------------------------------------------------------------------- | :------------ |
| `center` | `WorldCoords`                                                                | `undefined`   |
| `width`  | `number`                                                                     | `undefined`   |
| `height` | `number`                                                                     | `undefined`   |
| `color`  | [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec) | `undefined`   |
| `stroke` | `number`                                                                     | `-1`          |
| `zIdx`   | `number`                                                                     | `undefined`   |

#### Returns

`void`

---

### queueRectWorld

▸ **queueRectWorld**(`coords`, `width`, `height`, `color?`, `stroke?`, `zIdx?`): `void`

#### Parameters

| Name     | Type                                                                         | Default value |
| :------- | :--------------------------------------------------------------------------- | :------------ |
| `coords` | `WorldCoords`                                                                | `undefined`   |
| `width`  | `number`                                                                     | `undefined`   |
| `height` | `number`                                                                     | `undefined`   |
| `color`  | [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec) | `undefined`   |
| `stroke` | `number`                                                                     | `-1`          |
| `zIdx`   | `number`                                                                     | `undefined`   |

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
