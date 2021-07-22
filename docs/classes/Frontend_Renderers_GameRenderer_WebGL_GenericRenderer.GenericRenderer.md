# Class: GenericRenderer<T\>

[Frontend/Renderers/GameRenderer/WebGL/GenericRenderer](../modules/Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.md).GenericRenderer

Takes in a gl context, program sources (frag and vert shader),
and data about attribs / uniforms and provides:

- attrib managers
- uniform setters
- skeleton code for rendering in our engine via `flush()`

## Type parameters

| Name | Type                              |
| :--- | :-------------------------------- |
| `T`  | extends `EngineProgramDefinition` |

## Hierarchy

- **`GenericRenderer`**

  ↳ [`default`](Frontend_Renderers_GameRenderer_Entities_AsteroidRenderer.default.md)

  ↳ [`default`](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md)

  ↳ [`default`](Frontend_Renderers_GameRenderer_Entities_BlackDomainRenderer.default.md)

  ↳ [`default`](Frontend_Renderers_GameRenderer_Entities_CircleRenderer.default.md)

  ↳ [`default`](Frontend_Renderers_GameRenderer_Entities_LineRenderer.default.md)

  ↳ [`default`](Frontend_Renderers_GameRenderer_Entities_MaskRenderer.default.md)

  ↳ [`MineBodyRenderer`](Frontend_Renderers_GameRenderer_Entities_MineBodyRenderer.MineBodyRenderer.md)

  ↳ [`PerlinRenderer`](Frontend_Renderers_GameRenderer_Entities_PerlinRenderer.PerlinRenderer.md)

  ↳ [`default`](Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.default.md)

  ↳ [`QuasarBodyRenderer`](Frontend_Renderers_GameRenderer_Entities_QuasarBodyRenderer.QuasarBodyRenderer.md)

  ↳ [`QuasarRayRenderer`](Frontend_Renderers_GameRenderer_Entities_QuasarRayRenderer.QuasarRayRenderer.md)

  ↳ [`default`](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md)

  ↳ [`default`](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md)

  ↳ [`RuinsRenderer`](Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.RuinsRenderer.md)

  ↳ [`SpacetimeRipRenderer`](Frontend_Renderers_GameRenderer_Entities_SpacetimeRipRenderer.SpacetimeRipRenderer.md)

  ↳ [`SpriteRenderer`](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md)

  ↳ [`default`](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md)

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#constructor)

### Properties

- [attribData](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#attribdata)
- [attribManagers](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#attribmanagers)
- [manager](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#manager)
- [program](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#program)
- [uniformData](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#uniformdata)
- [uniformLocs](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#uniformlocs)
- [uniformSetters](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#uniformsetters)
- [verts](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#verts)

### Methods

- [flush](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#flush)
- [setUniforms](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#setuniforms)

## Constructors

### constructor

• **new GenericRenderer**<`T`\>(`glManager`, `programData`)

Create a renderer from a WebGLManager and program data.

#### Type parameters

| Name | Type                              |
| :--- | :-------------------------------- |
| `T`  | extends `EngineProgramDefinition` |

#### Parameters

| Name          | Type                                                                                 | Description                                                  |
| :------------ | :----------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| `glManager`   | [`WebGLManager`](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md) | WebGLManager which holds context for rendering this program. |
| `programData` | `T`                                                                                  | ProgramData describing this program.                         |

## Properties

### attribData

• **attribData**: `AttribData`

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

---

### attribManagers

• **attribManagers**: `AttribManagers`<`T`\>

A dictionary of attrib managers, keyed by attrib name.

---

### manager

• **manager**: [`WebGLManager`](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md)

WebGLManager corresponding to this program.

---

### program

• **program**: `WebGLProgram`

The program corresponding to this renderer.

---

### uniformData

• **uniformData**: `UniformData`

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

---

### uniformLocs

• **uniformLocs**: `UniformLocs`<`T`\>

Uniform locs for this program. Typically not referenced directly,
but rather through generated uniformSetters. Kept for use in inherited classes.

---

### uniformSetters

• **uniformSetters**: `UniformSetters`<`T`\>

A dictionary of uniform setters, keyed by uniform name.

---

### verts

• **verts**: `number`

The number of queued vertices so far. Used for batch rendering.

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

---

### setUniforms

▸ **setUniforms**(): `void`

Run by flush(). Override this in child classes. Programs with uniformss
should always override this.

#### Returns

`void`
