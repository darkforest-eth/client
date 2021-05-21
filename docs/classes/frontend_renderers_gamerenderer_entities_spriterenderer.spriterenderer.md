# Class: SpriteRenderer

[Frontend/Renderers/GameRenderer/Entities/SpriteRenderer](../modules/frontend_renderers_gamerenderer_entities_spriterenderer.md).SpriteRenderer

## Hierarchy

- [_GenericRenderer_](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)<_typeof_ [_SPRITE_PROGRAM_DEFINITION_](../modules/frontend_renderers_gamerenderer_programs_spriteprogram.md#sprite_program_definition)\>

  ↳ **SpriteRenderer**

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#constructor)

### Properties

- [attribData](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#attribdata)
- [attribManagers](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#attribmanagers)
- [flip](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#flip)
- [loaded](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#loaded)
- [manager](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#manager)
- [posBuffer](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#posbuffer)
- [program](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#program)
- [rectposBuffer](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#rectposbuffer)
- [texBuffer](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#texbuffer)
- [texIdx](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#texidx)
- [thumb](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#thumb)
- [uniformData](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#uniformdata)
- [uniformLocs](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#uniformlocs)
- [uniformSetters](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#uniformsetters)
- [verts](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#verts)

### Methods

- [flush](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#flush)
- [loadAtlas](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#loadatlas)
- [loadTexture](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#loadtexture)
- [queueArtifact](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#queueartifact)
- [queueArtifactWorld](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#queueartifactworld)
- [queueIconWorld](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#queueiconworld)
- [queueOutline](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#queueoutline)
- [queueSprite](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#queuesprite)
- [setUniforms](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md#setuniforms)

## Constructors

### constructor

\+ **new SpriteRenderer**(`manager`: [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md), `thumb?`: _boolean_, `flip?`: _boolean_): [_SpriteRenderer_](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md)

#### Parameters

| Name      | Type                                                                                 | Default value |
| :-------- | :----------------------------------------------------------------------------------- | :------------ |
| `manager` | [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md) | -             |
| `thumb`   | _boolean_                                                                            | false         |
| `flip`    | _boolean_                                                                            | false         |

**Returns:** [_SpriteRenderer_](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md)

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)

## Properties

### attribData

• **attribData**: AttribData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[attribData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#attribdata)

---

### attribManagers

• **attribManagers**: _AttribManagers_<{ `attribs`: { `color`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `invert`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `mythic`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `rectPos`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `shine`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `texcoord`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `texture`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

A dictionary of attrib managers, keyed by attrib name.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[attribManagers](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#attribmanagers)

---

### flip

• `Private` **flip**: _boolean_

---

### loaded

• `Private` **loaded**: _boolean_

---

### manager

• **manager**: [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

WebGLManager corresponding to this program.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[manager](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#manager)

---

### posBuffer

• `Private` **posBuffer**: _number_[]

---

### program

• **program**: WebGLProgram

The program corresponding to this renderer.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[program](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#program)

---

### rectposBuffer

• `Private` **rectposBuffer**: _number_[]

---

### texBuffer

• `Private` **texBuffer**: _number_[]

---

### texIdx

• `Private` **texIdx**: _number_

---

### thumb

• `Private` **thumb**: _boolean_

---

### uniformData

• **uniformData**: UniformData

Uniform data for this program. Typically not used after construction.
Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformData](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformdata)

---

### uniformLocs

• **uniformLocs**: _UniformLocs_<{ `attribs`: { `color`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `invert`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `mythic`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `rectPos`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `shine`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `texcoord`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `texture`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

Uniform locs for this program. Typically not referenced directly,
but rather through generated uniformSetters. Kept for use in inherited classes.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformLocs](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformlocs)

---

### uniformSetters

• **uniformSetters**: _UniformSetters_<{ `attribs`: { `color`: { `dim`: _number_ = 4; `name`: _string_ ; `normalize`: _boolean_ = true; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `invert`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `mythic`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `position`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `rectPos`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `shine`: { `dim`: _number_ = 1; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } ; `texcoord`: { `dim`: _number_ = 2; `name`: _string_ ; `normalize`: _boolean_ = false; `type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) } } ; `fragmentShader`: _string_ ; `uniforms`: { `matrix`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } ; `texture`: { `name`: _string_ ; `type`: [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) } } ; `vertexShader`: _string_ }\>

A dictionary of uniform setters, keyed by uniform name.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[uniformSetters](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#uniformsetters)

---

### verts

• **verts**: _number_

The number of queued vertices so far. Used for batch rendering.

Inherited from: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md).[verts](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md#verts)

## Methods

### flush

▸ **flush**(): _void_

**Returns:** _void_

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)

---

### loadAtlas

▸ `Private` **loadAtlas**(`thumb`: _boolean_): _Promise_<void\>

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `thumb` | _boolean_ |

**Returns:** _Promise_<void\>

---

### loadTexture

▸ `Private` **loadTexture**(`img`: HTMLImageElement, `texIdx`: _number_): _Promise_<void\>

#### Parameters

| Name     | Type             |
| :------- | :--------------- |
| `img`    | HTMLImageElement |
| `texIdx` | _number_         |

**Returns:** _Promise_<void\>

---

### queueArtifact

▸ **queueArtifact**(`artifact`: [_RenderedArtifact_](../interfaces/backend_gamelogic_artifactutils.renderedartifact.md), `pos`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md), `width?`: _number_, `alpha?`: _number_, `atFrame?`: _undefined_ \| _number_, `color?`: _undefined_ \| [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec), `theta?`: _undefined_ \| _number_): _void_

#### Parameters

| Name       | Type                                                                                        | Default value |
| :--------- | :------------------------------------------------------------------------------------------ | :------------ |
| `artifact` | [_RenderedArtifact_](../interfaces/backend_gamelogic_artifactutils.renderedartifact.md)     | -             |
| `pos`      | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)                   | -             |
| `width`    | _number_                                                                                    | 128           |
| `alpha`    | _number_                                                                                    | 255           |
| `atFrame`  | _undefined_ \| _number_                                                                     | -             |
| `color`    | _undefined_ \| [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec) | -             |
| `theta`    | _undefined_ \| _number_                                                                     | -             |

**Returns:** _void_

---

### queueArtifactWorld

▸ **queueArtifactWorld**(`artifact`: [_RenderedArtifact_](../interfaces/backend_gamelogic_artifactutils.renderedartifact.md), `posW`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md), `widthW`: _number_, `alpha?`: _number_, `atFrame?`: _undefined_ \| _number_, `color?`: _undefined_ \| [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec), `theta?`: _undefined_ \| _number_): _void_

Queue artifact to worldcoords, centered

#### Parameters

| Name       | Type                                                                                        | Default value |
| :--------- | :------------------------------------------------------------------------------------------ | :------------ |
| `artifact` | [_RenderedArtifact_](../interfaces/backend_gamelogic_artifactutils.renderedartifact.md)     | -             |
| `posW`     | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)                   | -             |
| `widthW`   | _number_                                                                                    | -             |
| `alpha`    | _number_                                                                                    | 255           |
| `atFrame`  | _undefined_ \| _number_                                                                     | -             |
| `color`    | _undefined_ \| [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec) | -             |
| `theta`    | _undefined_ \| _number_                                                                     | -             |

**Returns:** _void_

---

### queueIconWorld

▸ **queueIconWorld**(`artifact`: Artifact, `topLeft`: WorldCoords, `widthW`: _number_, `maxWidth?`: _number_): _void_

#### Parameters

| Name       | Type        | Default value |
| :--------- | :---------- | :------------ |
| `artifact` | Artifact    | -             |
| `topLeft`  | WorldCoords | -             |
| `widthW`   | _number_    | -             |
| `maxWidth` | _number_    | 32            |

**Returns:** _void_

---

### queueOutline

▸ **queueOutline**(`artifact`: [_RenderedArtifact_](../interfaces/backend_gamelogic_artifactutils.renderedartifact.md), `__namedParameters`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md), `width`: _number_, `alpha`: _number_, `theta`: _undefined_ \| _number_, `color?`: [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec)): _void_

#### Parameters

| Name                | Type                                                                                    |
| :------------------ | :-------------------------------------------------------------------------------------- |
| `artifact`          | [_RenderedArtifact_](../interfaces/backend_gamelogic_artifactutils.renderedartifact.md) |
| `__namedParameters` | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)               |
| `width`             | _number_                                                                                |
| `alpha`             | _number_                                                                                |
| `theta`             | _undefined_ \| _number_                                                                 |
| `color`             | [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec)            |

**Returns:** _void_

---

### queueSprite

▸ **queueSprite**(`artifact`: [_RenderedArtifact_](../interfaces/backend_gamelogic_artifactutils.renderedartifact.md), `topLeft`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md), `width`: _number_, `alpha`: _number_, `color?`: _undefined_ \| [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec), `atFrame?`: _undefined_ \| _number_, `theta?`: _undefined_ \| _number_): _void_

#### Parameters

| Name       | Type                                                                                        |
| :--------- | :------------------------------------------------------------------------------------------ |
| `artifact` | [_RenderedArtifact_](../interfaces/backend_gamelogic_artifactutils.renderedartifact.md)     |
| `topLeft`  | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)                   |
| `width`    | _number_                                                                                    |
| `alpha`    | _number_                                                                                    |
| `color`    | _undefined_ \| [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec) |
| `atFrame`  | _undefined_ \| _number_                                                                     |
| `theta`    | _undefined_ \| _number_                                                                     |

**Returns:** _void_

---

### setUniforms

▸ **setUniforms**(): _void_

**Returns:** _void_

Overrides: [GenericRenderer](frontend_renderers_gamerenderer_webgl_genericrenderer.genericrenderer.md)
