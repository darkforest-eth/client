# Class: default

[Frontend/Renderers/GameRenderer/Entities/PlanetRenderer](../modules/Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.md).default

## Hierarchy

- [`GenericRenderer`](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md)<typeof [`PLANET_PROGRAM_DEFINITION`](../modules/Frontend_Renderers_GameRenderer_Programs_PlanetProgram.md#planet_program_definition)\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.default.md#constructor)

### Properties

- [attribData](Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.default.md#attribdata)
- [attribManagers](Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.default.md#attribmanagers)
- [manager](Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.default.md#manager)
- [program](Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.default.md#program)
- [quad2Buffer](Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.default.md#quad2buffer)
- [quad3Buffer](Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.default.md#quad3buffer)
- [timeMatrix](Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.default.md#timematrix)
- [uniformData](Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.default.md#uniformdata)
- [uniformLocs](Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.default.md#uniformlocs)
- [uniformSetters](Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.default.md#uniformsetters)
- [verts](Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.default.md#verts)

### Methods

- [flush](Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.default.md#flush)
- [queuePlanetBody](Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.default.md#queueplanetbody)
- [queuePlanetBodyScreen](Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.default.md#queueplanetbodyscreen)
- [setUniforms](Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.default.md#setuniforms)

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

### timeMatrix

• **timeMatrix**: `mat4`

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

### queuePlanetBody

▸ **queuePlanetBody**(`planet`, `centerW`, `radiusW`): `void`

#### Parameters

| Name      | Type          |
| :-------- | :------------ |
| `planet`  | `Planet`      |
| `centerW` | `WorldCoords` |
| `radiusW` | `number`      |

#### Returns

`void`

---

### queuePlanetBodyScreen

▸ **queuePlanetBodyScreen**(`planet`, `radius`, `x1`, `y1`, `x2`, `y2`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |
| `radius` | `number` |
| `x1`     | `number` |
| `y1`     | `number` |
| `x2`     | `number` |
| `y2`     | `number` |

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
