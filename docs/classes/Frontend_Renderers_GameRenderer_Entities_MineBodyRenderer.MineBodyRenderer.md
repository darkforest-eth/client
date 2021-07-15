# Class: MineBodyRenderer

[Frontend/Renderers/GameRenderer/Entities/MineBodyRenderer](../modules/Frontend_Renderers_GameRenderer_Entities_MineBodyRenderer.md).MineBodyRenderer

Renderers asteroids at the center of silver mines

## Hierarchy

- [`GenericRenderer`](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md)<typeof [`MINE_PROGRAM_DEFINITION`](../modules/Frontend_Renderers_GameRenderer_Programs_MineProgram.md#mine_program_definition)\>

  ↳ **`MineBodyRenderer`**

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_Entities_MineBodyRenderer.MineBodyRenderer.md#constructor)

### Properties

- [attribData](Frontend_Renderers_GameRenderer_Entities_MineBodyRenderer.MineBodyRenderer.md#attribdata)
- [attribManagers](Frontend_Renderers_GameRenderer_Entities_MineBodyRenderer.MineBodyRenderer.md#attribmanagers)
- [manager](Frontend_Renderers_GameRenderer_Entities_MineBodyRenderer.MineBodyRenderer.md#manager)
- [program](Frontend_Renderers_GameRenderer_Entities_MineBodyRenderer.MineBodyRenderer.md#program)
- [uniformData](Frontend_Renderers_GameRenderer_Entities_MineBodyRenderer.MineBodyRenderer.md#uniformdata)
- [uniformLocs](Frontend_Renderers_GameRenderer_Entities_MineBodyRenderer.MineBodyRenderer.md#uniformlocs)
- [uniformSetters](Frontend_Renderers_GameRenderer_Entities_MineBodyRenderer.MineBodyRenderer.md#uniformsetters)
- [verts](Frontend_Renderers_GameRenderer_Entities_MineBodyRenderer.MineBodyRenderer.md#verts)

### Methods

- [flush](Frontend_Renderers_GameRenderer_Entities_MineBodyRenderer.MineBodyRenderer.md#flush)
- [queueMine](Frontend_Renderers_GameRenderer_Entities_MineBodyRenderer.MineBodyRenderer.md#queuemine)
- [queueMineScreen](Frontend_Renderers_GameRenderer_Entities_MineBodyRenderer.MineBodyRenderer.md#queueminescreen)
- [queuePoint](Frontend_Renderers_GameRenderer_Entities_MineBodyRenderer.MineBodyRenderer.md#queuepoint)
- [setUniforms](Frontend_Renderers_GameRenderer_Entities_MineBodyRenderer.MineBodyRenderer.md#setuniforms)

## Constructors

### constructor

• **new MineBodyRenderer**(`manager`)

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

▸ **flush**(): `void`

Draw all buffered vertices to the screen.

#### Returns

`void`

#### Overrides

[GenericRenderer](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md).[flush](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#flush)

---

### queueMine

▸ **queueMine**(`planet`, `centerW`, `radiusW`): `void`

#### Parameters

| Name      | Type          |
| :-------- | :------------ |
| `planet`  | `Planet`      |
| `centerW` | `WorldCoords` |
| `radiusW` | `number`      |

#### Returns

`void`

---

### queueMineScreen

▸ **queueMineScreen**(`planet`, `center`, `radius`, `z`): `void`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `planet` | `Planet`      |
| `center` | `WorldCoords` |
| `radius` | `number`      |
| `z`      | `number`      |

#### Returns

`void`

---

### queuePoint

▸ `Private` **queuePoint**(`__namedParameters`, `z`, `radius`, `color`, `seed`, `offset`): `void`

#### Parameters

| Name                | Type                                                                         |
| :------------------ | :--------------------------------------------------------------------------- |
| `__namedParameters` | [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md)    |
| `z`                 | `number`                                                                     |
| `radius`            | `number`                                                                     |
| `color`             | [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec) |
| `seed`              | `number`                                                                     |
| `offset`            | `number`                                                                     |

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
