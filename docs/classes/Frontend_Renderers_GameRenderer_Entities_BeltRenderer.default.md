# Class: default

[Frontend/Renderers/GameRenderer/Entities/BeltRenderer](../modules/Frontend_Renderers_GameRenderer_Entities_BeltRenderer.md).default

## Hierarchy

- [`GenericRenderer`](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md)<typeof [`BELT_PROGRAM_DEFINITION`](../modules/Frontend_Renderers_GameRenderer_Programs_BeltProgram.md#belt_program_definition)\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md#constructor)

### Properties

- [attribData](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md#attribdata)
- [attribManagers](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md#attribmanagers)
- [botRectPosBuffer](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md#botrectposbuffer)
- [manager](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md#manager)
- [posBuffer](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md#posbuffer)
- [program](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md#program)
- [topRectPosBuffer](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md#toprectposbuffer)
- [uniformData](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md#uniformdata)
- [uniformLocs](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md#uniformlocs)
- [uniformSetters](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md#uniformsetters)
- [verts](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md#verts)

### Methods

- [flush](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md#flush)
- [queueBelt](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md#queuebelt)
- [queueBeltAtIdx](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md#queuebeltatidx)
- [queueBeltWorld](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md#queuebeltworld)
- [setUniforms](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md#setuniforms)

## Constructors

### constructor

• **new default**(`manager`)

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
| `props`  | [`BeltProps`](../modules/Frontend_Renderers_GameRenderer_Programs_BeltProgram.md#beltprops) | `undefined`   |
| `angle`  | `number`                                                                                    | `0`           |

#### Returns

`void`

---

### queueBeltAtIdx

▸ **queueBeltAtIdx**(`planet`, `center`, `radius`, `color`, `beltIdx`, `angle?`, `screen?`): `void`

#### Parameters

| Name      | Type                                                                                       | Default value |
| :-------- | :----------------------------------------------------------------------------------------- | :------------ |
| `planet`  | `Planet`                                                                                   | `undefined`   |
| `center`  | `WorldCoords` \| [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md) | `undefined`   |
| `radius`  | `number`                                                                                   | `undefined`   |
| `color`   | [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec)               | `undefined`   |
| `beltIdx` | `number`                                                                                   | `undefined`   |
| `angle`   | `number`                                                                                   | `0`           |
| `screen`  | `boolean`                                                                                  | `false`       |

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
| `props`   | [`BeltProps`](../modules/Frontend_Renderers_GameRenderer_Programs_BeltProgram.md#beltprops) | `undefined`   |
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
