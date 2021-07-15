# Class: PerlinRenderer

[Frontend/Renderers/GameRenderer/Entities/PerlinRenderer](../modules/Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.md).PerlinRenderer

## Hierarchy

- [`GenericRenderer`](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md)<typeof [`PERLIN_PROGRAM_DEFINITION`](../modules/Frontend_Renderers_GameRenderer_Programs_PerlinProgram.md#perlin_program_definition)\>

  ↳ **`PerlinRenderer`**

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#constructor)

### Properties

- [attribData](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#attribdata)
- [attribManagers](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#attribmanagers)
- [config](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#config)
- [coordsBuffer](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#coordsbuffer)
- [manager](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#manager)
- [posBuffer](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#posbuffer)
- [program](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#program)
- [rectRenderer](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#rectrenderer)
- [thresholds](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#thresholds)
- [uniformData](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#uniformdata)
- [uniformLocs](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#uniformlocs)
- [uniformSetters](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#uniformsetters)
- [verts](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#verts)

### Methods

- [bufferGradients](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#buffergradients)
- [flush](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#flush)
- [queueChunk](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#queuechunk)
- [queueRect](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#queuerect)
- [setUniforms](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md#setuniforms)

## Constructors

### constructor

• **new PerlinRenderer**(`manager`, `config`, `thresholds`, `rectRenderer?`)

Create a renderer from a WebGLManager and program data.

#### Parameters

| Name           | Type                                                                                         |
| :------------- | :------------------------------------------------------------------------------------------- |
| `manager`      | [`GameGLManager`](Frontend_Renderers_GameRenderer_WebGL_GameGLManager.GameGLManager.md)      |
| `config`       | `PerlinConfig`                                                                               |
| `thresholds`   | [`number`, `number`, `number`]                                                               |
| `rectRenderer` | `undefined` \| [`default`](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md) |

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

### config

• **config**: `PerlinConfig`

---

### coordsBuffer

• **coordsBuffer**: `number`[]

---

### manager

• **manager**: [`GameGLManager`](Frontend_Renderers_GameRenderer_WebGL_GameGLManager.GameGLManager.md)

WebGLManager corresponding to this program.

#### Overrides

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

### rectRenderer

• **rectRenderer**: `undefined` \| [`default`](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md)

---

### thresholds

• **thresholds**: [`Vec3`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#vec3)

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

### bufferGradients

▸ `Private` **bufferGradients**(`rect`, `octave`, `topGrad`, `botGrad`): `void`

#### Parameters

| Name      | Type                                                                                            |
| :-------- | :---------------------------------------------------------------------------------------------- |
| `rect`    | [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md)                             |
| `octave`  | [`PerlinOctave`](../enums/Frontend_Renderers_GameRenderer_Entities_PerlinUtils.PerlinOctave.md) |
| `topGrad` | [`default`](Frontend_Renderers_GameRenderer_WebGL_AttribManager.default.md)                     |
| `botGrad` | [`default`](Frontend_Renderers_GameRenderer_WebGL_AttribManager.default.md)                     |

#### Returns

`void`

---

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

### queueChunk

▸ **queueChunk**(`chunk`): `void`

#### Parameters

| Name    | Type                                          |
| :------ | :-------------------------------------------- |
| `chunk` | [`Chunk`](_types_global_GlobalTypes.Chunk.md) |

#### Returns

`void`

---

### queueRect

▸ `Private` **queueRect**(`rect`): `void`

#### Parameters

| Name   | Type                                                                |
| :----- | :------------------------------------------------------------------ |
| `rect` | [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md) |

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
