# Class: default

[Frontend/Renderers/GameRenderer/Entities/BlackDomainRenderer](../modules/frontend_renderers_gamerenderer_entities_blackdomainrenderer.md).default

Renders a shadow-type thing over destroyed planets

## Hierarchy

- [_GenericRenderer_](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)<_typeof_ [_BLACKDOMAIN_PROGRAM_DEFINITION_](../modules/frontend_renderers_gamerenderer_programs_blackdomainprogram.md#blackdomain_program_definition)\>

  ↳ **default**

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md#constructor)

### Properties

- [attribData](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md#attribdata)
- [attribManagers](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md#attribmanagers)
- [manager](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md#manager)
- [program](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md#program)
- [quad2Buffer](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md#quad2buffer)
- [quad3Buffer](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md#quad3buffer)
- [uniformData](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md#uniformdata)
- [uniformLocs](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md#uniformlocs)
- [uniformSetters](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md#uniformsetters)
- [verts](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md#verts)

### Methods

- [flush](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md#flush)
- [queueBlackDomain](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md#queueblackdomain)
- [queueBlackDomainScreen](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md#queueblackdomainscreen)
- [setUniforms](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md#setuniforms)

## Constructors

### constructor

\+ **new default**(`manager`: [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md)): [_default_](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md)

#### Parameters

| Name      | Type                                                                                    |
| :-------- | :-------------------------------------------------------------------------------------- |
| `manager` | [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md) |

**Returns:** [_default_](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md)

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)

## Properties

### attribData

• **attribData**: AttribData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[attribData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#attribdata)

---

### attribManagers

• **attribManagers**: _AttribManagers_<{ `attribs`: { `position`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `rectPos`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `now`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

A dictionary of attrib managers, keyed by attrib name.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[attribManagers](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#attribmanagers)

---

### manager

• **manager**: [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

WebGLManager corresponding to this program.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[manager](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#manager)

---

### program

• **program**: WebGLProgram

The program corresponding to this renderer.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[program](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#program)

---

### quad2Buffer

• **quad2Buffer**: _number_[]

---

### quad3Buffer

• **quad3Buffer**: _number_[]

---

### uniformData

• **uniformData**: UniformData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformdata)

---

### uniformLocs

• **uniformLocs**: _UniformLocs_<{ `attribs`: { `position`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `rectPos`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `now`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

Uniform locs for this program. Typically not referenced directly,
but rather through generated uniformSetters. Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformLocs](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformlocs)

---

### uniformSetters

• **uniformSetters**: _UniformSetters_<{ `attribs`: { `position`: { `dim`: _number_ = 3; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `rectPos`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `now`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

A dictionary of uniform setters, keyed by uniform name.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformSetters](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformsetters)

---

### verts

• **verts**: _number_

The number of queued vertices so far. Used for batch rendering.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[verts](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#verts)

## Methods

### flush

▸ **flush**(`drawMode?`: [_DrawMode_](../enums/frontend_renderers_gamerenderer_enginetypes.drawmode.md)): _void_

Draw all buffered vertices to the screen.

#### Parameters

| Name       | Type                                                                           | Description                                                     |
| :--------- | :----------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| `drawMode` | [_DrawMode_](../enums/frontend_renderers_gamerenderer_enginetypes.drawmode.md) | The drawing mode for the buffered vertices. Default: Triangles. |

**Returns:** _void_

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)

---

### queueBlackDomain

▸ **queueBlackDomain**(`planet`: Planet, `centerW`: WorldCoords, `radiusW`: _number_): _void_

#### Parameters

| Name      | Type        |
| :-------- | :---------- |
| `planet`  | Planet      |
| `centerW` | WorldCoords |
| `radiusW` | _number_    |

**Returns:** _void_

---

### queueBlackDomainScreen

▸ **queueBlackDomainScreen**(`_planet`: Planet, `center`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md), `radius`: _number_, `z`: _number_): _void_

#### Parameters

| Name      | Type                                                                      |
| :-------- | :------------------------------------------------------------------------ |
| `_planet` | Planet                                                                    |
| `center`  | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md) |
| `radius`  | _number_                                                                  |
| `z`       | _number_                                                                  |

**Returns:** _void_

---

### setUniforms

▸ **setUniforms**(): _void_

**Returns:** _void_

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)
