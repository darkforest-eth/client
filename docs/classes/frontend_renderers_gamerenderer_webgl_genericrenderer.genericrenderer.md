# Class: GenericRenderer<T\>

[Frontend/Renderers/GameRenderer/WebGL/GenericRenderer](../modules/frontend_renderers_gamerenderer_webgl_genericrenderer.md).GenericRenderer

Takes in a gl context, program sources (frag and vert shader),
and data about attribs / uniforms and provides:

- attrib managers
- uniform setters
- skeleton code for rendering in our engine via `flush()`

## Type parameters

| Name | Type                    |
| :--- | :---------------------- |
| `T`  | EngineProgramDefinition |

## Hierarchy

- **GenericRenderer**

  ↳ [_default_](frontend_renderers_gamerenderer_entities_asteroidrenderer.default.md)

  ↳ [_default_](frontend_renderers_gamerenderer_entities_beltrenderer.default.md)

  ↳ [_default_](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md)

  ↳ [_default_](frontend_renderers_gamerenderer_entities_circlerenderer.default.md)

  ↳ [_default_](frontend_renderers_gamerenderer_entities_linerenderer.default.md)

  ↳ [_default_](frontend_renderers_gamerenderer_entities_maskrenderer.default.md)

  ↳ [_MineBodyRenderer_](frontend_renderers_gamerenderer_entities_minebodyrenderer.minebodyrenderer.md)

  ↳ [_PerlinRenderer_](frontend_renderers_gamerenderer_entities_perlinrenderer.perlinrenderer.md)

  ↳ [_default_](frontend_renderers_gamerenderer_entities_planetrenderer.default.md)

  ↳ [_QuasarBodyRenderer_](frontend_renderers_gamerenderer_entities_quasarbodyrenderer.quasarbodyrenderer.md)

  ↳ [_QuasarRayRenderer_](frontend_renderers_gamerenderer_entities_quasarrayrenderer.quasarrayrenderer.md)

  ↳ [_default_](frontend_renderers_gamerenderer_entities_rectrenderer.default.md)

  ↳ [_default_](frontend_renderers_gamerenderer_entities_ringrenderer.default.md)

  ↳ [_RuinsRenderer_](frontend_renderers_gamerenderer_entities_ruinsrenderer.ruinsrenderer.md)

  ↳ [_SpacetimeRipRenderer_](frontend_renderers_gamerenderer_entities_spacetimeriprenderer.spacetimeriprenderer.md)

  ↳ [_SpriteRenderer_](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md)

  ↳ [_default_](frontend_renderers_gamerenderer_entities_textrenderer.default.md)

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#constructor)

### Properties

- [attribData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#attribdata)
- [attribManagers](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#attribmanagers)
- [manager](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#manager)
- [program](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#program)
- [uniformData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformdata)
- [uniformLocs](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformlocs)
- [uniformSetters](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformsetters)
- [verts](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#verts)

### Methods

- [flush](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#flush)
- [setUniforms](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#setuniforms)

## Constructors

### constructor

\+ **new GenericRenderer**<T\>(`glManager`: [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md), `programData`: T): [_GenericRenderer_](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)<T\>

Create a renderer from a WebGLManager and program data.

#### Type parameters

| Name | Type                    |
| :--- | :---------------------- |
| `T`  | EngineProgramDefinition |

#### Parameters

| Name          | Type                                                                                 | Description                                                  |
| :------------ | :----------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| `glManager`   | [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md) | WebGLManager which holds context for rendering this program. |
| `programData` | T                                                                                    | ProgramData describing this program.                         |

**Returns:** [_GenericRenderer_](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)<T\>

## Properties

### attribData

• **attribData**: AttribData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

---

### attribManagers

• **attribManagers**: _AttribManagers_<T\>

A dictionary of attrib managers, keyed by attrib name.

---

### manager

• **manager**: [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

WebGLManager corresponding to this program.

---

### program

• **program**: WebGLProgram

The program corresponding to this renderer.

---

### uniformData

• **uniformData**: UniformData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

---

### uniformLocs

• **uniformLocs**: _UniformLocs_<T\>

Uniform locs for this program. Typically not referenced directly,
but rather through generated uniformSetters. Kept for use in inherited classes.

---

### uniformSetters

• **uniformSetters**: _UniformSetters_<T\>

A dictionary of uniform setters, keyed by uniform name.

---

### verts

• **verts**: _number_

The number of queued vertices so far. Used for batch rendering.

## Methods

### flush

▸ **flush**(`drawMode?`: [_DrawMode_](../enums/frontend_renderers_gamerenderer_enginetypes.drawmode.md)): _void_

Draw all buffered vertices to the screen.

#### Parameters

| Name       | Type                                                                           | Description                                                     |
| :--------- | :----------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| `drawMode` | [_DrawMode_](../enums/frontend_renderers_gamerenderer_enginetypes.drawmode.md) | The drawing mode for the buffered vertices. Default: Triangles. |

**Returns:** _void_

---

### setUniforms

▸ **setUniforms**(): _void_

Run by flush(). Override this in child classes. Programs with uniformss
should always override this.

**Returns:** _void_
