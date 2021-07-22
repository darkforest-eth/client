# Class: default

[Frontend/Renderers/GameRenderer/Entities/CircleRenderer](../modules/Frontend_Renderers_GameRenderer_Entities_CircleRenderer.md).default

## Hierarchy

- [`GenericRenderer`](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md)<typeof [`CIRCLE_PROGRAM_DEFINITION`](../modules/Frontend_Renderers_GameRenderer_Programs_CircleProgram.md#circle_program_definition)\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_Entities_CircleRenderer.default.md#constructor)

### Properties

- [attribData](Frontend_Renderers_GameRenderer_Entities_CircleRenderer.default.md#attribdata)
- [attribManagers](Frontend_Renderers_GameRenderer_Entities_CircleRenderer.default.md#attribmanagers)
- [manager](Frontend_Renderers_GameRenderer_Entities_CircleRenderer.default.md#manager)
- [program](Frontend_Renderers_GameRenderer_Entities_CircleRenderer.default.md#program)
- [quadBuffer](Frontend_Renderers_GameRenderer_Entities_CircleRenderer.default.md#quadbuffer)
- [uniformData](Frontend_Renderers_GameRenderer_Entities_CircleRenderer.default.md#uniformdata)
- [uniformLocs](Frontend_Renderers_GameRenderer_Entities_CircleRenderer.default.md#uniformlocs)
- [uniformSetters](Frontend_Renderers_GameRenderer_Entities_CircleRenderer.default.md#uniformsetters)
- [verts](Frontend_Renderers_GameRenderer_Entities_CircleRenderer.default.md#verts)
- [viewport](Frontend_Renderers_GameRenderer_Entities_CircleRenderer.default.md#viewport)

### Methods

- [flush](Frontend_Renderers_GameRenderer_Entities_CircleRenderer.default.md#flush)
- [queueCircle](Frontend_Renderers_GameRenderer_Entities_CircleRenderer.default.md#queuecircle)
- [queueCircleWorld](Frontend_Renderers_GameRenderer_Entities_CircleRenderer.default.md#queuecircleworld)
- [queueCircleWorldCenterOnly](Frontend_Renderers_GameRenderer_Entities_CircleRenderer.default.md#queuecircleworldcenteronly)
- [setUniforms](Frontend_Renderers_GameRenderer_Entities_CircleRenderer.default.md#setuniforms)

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

### quadBuffer

• **quadBuffer**: `number`[]

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

### queueCircle

▸ **queueCircle**(`center`, `radius`, `color?`, `stroke?`, `angle?`, `dashed?`): `void`

#### Parameters

| Name     | Type                                                                           | Default value |
| :------- | :----------------------------------------------------------------------------- | :------------ |
| `center` | [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md)      | `undefined`   |
| `radius` | `number`                                                                       | `undefined`   |
| `color`  | [`RGBAVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbavec) | `undefined`   |
| `stroke` | `number`                                                                       | `-1`          |
| `angle`  | `number`                                                                       | `1`           |
| `dashed` | `boolean`                                                                      | `false`       |

#### Returns

`void`

---

### queueCircleWorld

▸ **queueCircleWorld**(`center`, `radius`, `color?`, `stroke?`, `angle?`, `dashed?`): `void`

#### Parameters

| Name     | Type                                                                           | Default value |
| :------- | :----------------------------------------------------------------------------- | :------------ |
| `center` | `WorldCoords`                                                                  | `undefined`   |
| `radius` | `number`                                                                       | `undefined`   |
| `color`  | [`RGBAVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbavec) | `undefined`   |
| `stroke` | `number`                                                                       | `-1`          |
| `angle`  | `number`                                                                       | `1`           |
| `dashed` | `boolean`                                                                      | `false`       |

#### Returns

`void`

---

### queueCircleWorldCenterOnly

▸ **queueCircleWorldCenterOnly**(`center`, `radius`, `color?`): `void`

#### Parameters

| Name     | Type                                                                           |
| :------- | :----------------------------------------------------------------------------- |
| `center` | `WorldCoords`                                                                  |
| `radius` | `number`                                                                       |
| `color`  | [`RGBAVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbavec) |

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
