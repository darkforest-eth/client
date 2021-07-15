# Class: RuinsRenderer

[Frontend/Renderers/GameRenderer/Entities/RuinsRenderer](../modules/Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.md).RuinsRenderer

## Hierarchy

- [`GenericRenderer`](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md)<typeof [`RUINS_PROGRAM_DEFINITION`](../modules/Frontend_Renderers_GameRenderer_Programs_RuinsProgram.md#ruins_program_definition)\>

  ↳ **`RuinsRenderer`**

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.RuinsRenderer.md#constructor)

### Properties

- [attribData](Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.RuinsRenderer.md#attribdata)
- [attribManagers](Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.RuinsRenderer.md#attribmanagers)
- [manager](Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.RuinsRenderer.md#manager)
- [program](Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.RuinsRenderer.md#program)
- [quad2Buffer](Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.RuinsRenderer.md#quad2buffer)
- [quad3Buffer](Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.RuinsRenderer.md#quad3buffer)
- [uniformData](Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.RuinsRenderer.md#uniformdata)
- [uniformLocs](Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.RuinsRenderer.md#uniformlocs)
- [uniformSetters](Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.RuinsRenderer.md#uniformsetters)
- [verts](Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.RuinsRenderer.md#verts)

### Methods

- [flush](Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.RuinsRenderer.md#flush)
- [queueBloom](Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.RuinsRenderer.md#queuebloom)
- [queueRuins](Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.RuinsRenderer.md#queueruins)
- [queueRuinsScreen](Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.RuinsRenderer.md#queueruinsscreen)
- [setUniforms](Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.RuinsRenderer.md#setuniforms)

## Constructors

### constructor

• **new RuinsRenderer**(`manager`)

Create a renderer from a WebGLManager and program data.

#### Parameters

| Name      | Type                                                                                 |
| :-------- | :----------------------------------------------------------------------------------- |
| `manager` | [`WebGLManager`](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md) |

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

### queueBloom

▸ `Private` **queueBloom**(`center`, `radius`, `z`, `color`, `weights`, `props`): `void`

#### Parameters

| Name      | Type                                                                         |
| :-------- | :--------------------------------------------------------------------------- |
| `center`  | [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md)    |
| `radius`  | `number`                                                                     |
| `z`       | `number`                                                                     |
| `color`   | [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec) |
| `weights` | [`number`, `number`, `number`, `number`]                                     |
| `props`   | [`number`, `number`, `number`, `number`]                                     |

#### Returns

`void`

---

### queueRuins

▸ **queueRuins**(`planet`, `centerW`, `radiusW`): `void`

#### Parameters

| Name      | Type          |
| :-------- | :------------ |
| `planet`  | `Planet`      |
| `centerW` | `WorldCoords` |
| `radiusW` | `number`      |

#### Returns

`void`

---

### queueRuinsScreen

▸ **queueRuinsScreen**(`planet`, `center`, `radius`, `z`): `void`

#### Parameters

| Name     | Type                                                                      |
| :------- | :------------------------------------------------------------------------ |
| `planet` | `Planet`                                                                  |
| `center` | [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md) |
| `radius` | `number`                                                                  |
| `z`      | `number`                                                                  |

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
