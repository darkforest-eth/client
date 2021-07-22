# Class: QuasarRayRenderer

[Frontend/Renderers/GameRenderer/Entities/QuasarRayRenderer](../modules/Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.md).QuasarRayRenderer

## Hierarchy

- [`GenericRenderer`](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md)<typeof [`QUASARRAY_PROGRAM_DEFINITION`](../modules/Frontend_Renderers_GameRenderer_Programs_QuasarRayProgram.md#quasarray_program_definition)\>

  ↳ **`QuasarRayRenderer`**

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md#constructor)

### Properties

- [attribData](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md#attribdata)
- [attribManagers](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md#attribmanagers)
- [manager](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md#manager)
- [program](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md#program)
- [quad2BufferBot](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md#quad2bufferbot)
- [quad2BufferTop](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md#quad2buffertop)
- [quad3Buffer](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md#quad3buffer)
- [uniformData](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md#uniformdata)
- [uniformLocs](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md#uniformlocs)
- [uniformSetters](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md#uniformsetters)
- [verts](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md#verts)

### Methods

- [flush](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md#flush)
- [queueQuasarRay](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md#queuequasarray)
- [queueQuasarRayScreen](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md#queuequasarrayscreen)
- [setUniforms](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md#setuniforms)

## Constructors

### constructor

• **new QuasarRayRenderer**(`manager`)

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

### quad2BufferBot

• **quad2BufferBot**: `number`[]

---

### quad2BufferTop

• **quad2BufferTop**: `number`[]

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

### queueQuasarRay

▸ **queueQuasarRay**(`top?`, `planet`, `centerW`, `radiusW`, `z`, `angle?`): `void`

#### Parameters

| Name      | Type          | Default value |
| :-------- | :------------ | :------------ |
| `top`     | `boolean`     | `true`        |
| `planet`  | `Planet`      | `undefined`   |
| `centerW` | `WorldCoords` | `undefined`   |
| `radiusW` | `number`      | `undefined`   |
| `z`       | `number`      | `undefined`   |
| `angle`   | `number`      | `0`           |

#### Returns

`void`

---

### queueQuasarRayScreen

▸ **queueQuasarRayScreen**(`top?`, `planet`, `center`, `radius`, `z`, `angle?`): `void`

#### Parameters

| Name     | Type                                                                      | Default value |
| :------- | :------------------------------------------------------------------------ | :------------ |
| `top`    | `boolean`                                                                 | `true`        |
| `planet` | `Planet`                                                                  | `undefined`   |
| `center` | [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md) | `undefined`   |
| `radius` | `number`                                                                  | `undefined`   |
| `z`      | `number`                                                                  | `undefined`   |
| `angle`  | `number`                                                                  | `0`           |

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
