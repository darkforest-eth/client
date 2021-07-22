# Class: default

[Frontend/Renderers/GameRenderer/Entities/RingRenderer](../modules/Frontend_Renderers_GameRenderer_Entities_RingRenderer.md).default

## Hierarchy

- [`GenericRenderer`](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md)<typeof [`RING_PROGRAM_DEFINITION`](../modules/Frontend_Renderers_GameRenderer_Programs_RingProgram.md#ring_program_definition)\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md#constructor)

### Properties

- [attribData](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md#attribdata)
- [attribManagers](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md#attribmanagers)
- [botRectPosBuffer](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md#botrectposbuffer)
- [manager](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md#manager)
- [posBuffer](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md#posbuffer)
- [program](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md#program)
- [topRectPosBuffer](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md#toprectposbuffer)
- [uniformData](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md#uniformdata)
- [uniformLocs](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md#uniformlocs)
- [uniformSetters](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md#uniformsetters)
- [verts](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md#verts)
- [viewport](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md#viewport)

### Methods

- [flush](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md#flush)
- [queueBelt](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md#queuebelt)
- [queueBeltAtIdx](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md#queuebeltatidx)
- [queueBeltWorld](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md#queuebeltworld)
- [setUniforms](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md#setuniforms)

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

### botRectPosBuffer

• **botRectPosBuffer**: `number`[]

---

### manager

• **manager**: [`WebGLManager`](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md)

WebGLManager corresponding to this program.

#### Inherited from

[GenericRenderer](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md).[manager](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#manager)

---

### posBuffer

• **posBuffer**: `number`[]

---

### program

• **program**: `WebGLProgram`

The program corresponding to this renderer.

#### Inherited from

[GenericRenderer](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md).[program](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#program)

---

### topRectPosBuffer

• **topRectPosBuffer**: `number`[]

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

---

### viewport

• **viewport**: [`default`](Frontend_Game_Viewport.default.md)

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

### queueBelt

▸ **queueBelt**(`center`, `radius`, `color`, `l?`, `z?`, `delZ?`, `props?`, `angle?`): `void`

#### Parameters

| Name     | Type                                                                                        | Default value |
| :------- | :------------------------------------------------------------------------------------------ | :------------ |
| `center` | [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md)                   | `undefined`   |
| `radius` | `number`                                                                                    | `undefined`   |
| `color`  | [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec)                | `undefined`   |
| `l`      | `number`                                                                                    | `1`           |
| `z`      | `number`                                                                                    | `0`           |
| `delZ`   | `number`                                                                                    | `0`           |
| `props`  | [`RingProps`](../modules/Frontend_Renderers_GameRenderer_Programs_RingProgram.md#ringprops) | `undefined`   |
| `angle`  | `number`                                                                                    | `0`           |

#### Returns

`void`

---

### queueBeltAtIdx

▸ **queueBeltAtIdx**(`planet`, `centerW`, `radiusW`, `color`, `beltIdx`, `angle?`): `void`

#### Parameters

| Name      | Type                                                                         | Default value |
| :-------- | :--------------------------------------------------------------------------- | :------------ |
| `planet`  | `Planet`                                                                     | `undefined`   |
| `centerW` | `WorldCoords`                                                                | `undefined`   |
| `radiusW` | `number`                                                                     | `undefined`   |
| `color`   | [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec) | `undefined`   |
| `beltIdx` | `number`                                                                     | `undefined`   |
| `angle`   | `number`                                                                     | `0`           |

#### Returns

`void`

---

### queueBeltWorld

▸ **queueBeltWorld**(`centerW`, `radiusW`, `color`, `l?`, `z?`, `delZ?`, `props?`, `angle?`): `void`

#### Parameters

| Name      | Type                                                                                        | Default value |
| :-------- | :------------------------------------------------------------------------------------------ | :------------ |
| `centerW` | [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md)                   | `undefined`   |
| `radiusW` | `number`                                                                                    | `undefined`   |
| `color`   | [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec)                | `undefined`   |
| `l`       | `number`                                                                                    | `1`           |
| `z`       | `number`                                                                                    | `0`           |
| `delZ`    | `number`                                                                                    | `0`           |
| `props`   | [`RingProps`](../modules/Frontend_Renderers_GameRenderer_Programs_RingProgram.md#ringprops) | `undefined`   |
| `angle`   | `number`                                                                                    | `0`           |

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
