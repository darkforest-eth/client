# Class: SpriteRenderer

[Frontend/Renderers/GameRenderer/Entities/SpriteRenderer](../modules/Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.md).SpriteRenderer

## Hierarchy

- [`GenericRenderer`](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md)<typeof [`SPRITE_PROGRAM_DEFINITION`](../modules/Frontend_Renderers_GameRenderer_Programs_SpriteProgram.md#sprite_program_definition)\>

  ↳ **`SpriteRenderer`**

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#constructor)

### Properties

- [attribData](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#attribdata)
- [attribManagers](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#attribmanagers)
- [flip](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#flip)
- [loaded](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#loaded)
- [manager](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#manager)
- [posBuffer](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#posbuffer)
- [program](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#program)
- [rectposBuffer](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#rectposbuffer)
- [texBuffer](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#texbuffer)
- [texIdx](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#texidx)
- [thumb](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#thumb)
- [uniformData](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#uniformdata)
- [uniformLocs](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#uniformlocs)
- [uniformSetters](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#uniformsetters)
- [verts](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#verts)

### Methods

- [flush](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#flush)
- [loadAtlas](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#loadatlas)
- [loadTexture](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#loadtexture)
- [queueArtifact](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#queueartifact)
- [queueArtifactWorld](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#queueartifactworld)
- [queueIconWorld](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#queueiconworld)
- [queueOutline](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#queueoutline)
- [queueSprite](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#queuesprite)
- [setUniforms](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md#setuniforms)

## Constructors

### constructor

• **new SpriteRenderer**(`manager`, `thumb?`, `flip?`)

Create a renderer from a WebGLManager and program data.

#### Parameters

| Name      | Type                                                                                 | Default value |
| :-------- | :----------------------------------------------------------------------------------- | :------------ |
| `manager` | [`WebGLManager`](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md) | `undefined`   |
| `thumb`   | `boolean`                                                                            | `false`       |
| `flip`    | `boolean`                                                                            | `false`       |

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

### flip

• `Private` **flip**: `boolean`

---

### loaded

• `Private` **loaded**: `boolean`

---

### manager

• **manager**: [`WebGLManager`](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md)

WebGLManager corresponding to this program.

#### Inherited from

[GenericRenderer](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md).[manager](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#manager)

---

### posBuffer

• `Private` **posBuffer**: `number`[]

---

### program

• **program**: `WebGLProgram`

The program corresponding to this renderer.

#### Inherited from

[GenericRenderer](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md).[program](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#program)

---

### rectposBuffer

• `Private` **rectposBuffer**: `number`[]

---

### texBuffer

• `Private` **texBuffer**: `number`[]

---

### texIdx

• `Private` **texIdx**: `number`

---

### thumb

• `Private` **thumb**: `boolean`

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

▸ **flush**(): `void`

Draw all buffered vertices to the screen.

#### Returns

`void`

#### Overrides

[GenericRenderer](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md).[flush](Frontend_Renderers_GameRenderer_WebGL_GenericRenderer.GenericRenderer.md#flush)

---

### loadAtlas

▸ `Private` **loadAtlas**(`thumb`): `Promise`<`void`\>

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `thumb` | `boolean` |

#### Returns

`Promise`<`void`\>

---

### loadTexture

▸ `Private` **loadTexture**(`img`, `texIdx`): `Promise`<`void`\>

#### Parameters

| Name     | Type               |
| :------- | :----------------- |
| `img`    | `HTMLImageElement` |
| `texIdx` | `number`           |

#### Returns

`Promise`<`void`\>

---

### queueArtifact

▸ **queueArtifact**(`artifact`, `pos`, `width?`, `alpha?`, `atFrame?`, `color?`, `theta?`): `void`

#### Parameters

| Name       | Type                                                                                        | Default value |
| :--------- | :------------------------------------------------------------------------------------------ | :------------ |
| `artifact` | [`RenderedArtifact`](../interfaces/Backend_GameLogic_ArtifactUtils.RenderedArtifact.md)     | `undefined`   |
| `pos`      | [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md)                   | `undefined`   |
| `width`    | `number`                                                                                    | `128`         |
| `alpha`    | `number`                                                                                    | `255`         |
| `atFrame`  | `undefined` \| `number`                                                                     | `undefined`   |
| `color`    | `undefined` \| [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec) | `undefined`   |
| `theta`    | `undefined` \| `number`                                                                     | `undefined`   |

#### Returns

`void`

---

### queueArtifactWorld

▸ **queueArtifactWorld**(`artifact`, `posW`, `widthW`, `alpha?`, `atFrame?`, `color?`, `theta?`): `void`

Queue artifact to worldcoords, centered

#### Parameters

| Name       | Type                                                                                        | Default value |
| :--------- | :------------------------------------------------------------------------------------------ | :------------ |
| `artifact` | [`RenderedArtifact`](../interfaces/Backend_GameLogic_ArtifactUtils.RenderedArtifact.md)     | `undefined`   |
| `posW`     | [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md)                   | `undefined`   |
| `widthW`   | `number`                                                                                    | `undefined`   |
| `alpha`    | `number`                                                                                    | `255`         |
| `atFrame`  | `undefined` \| `number`                                                                     | `undefined`   |
| `color`    | `undefined` \| [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec) | `undefined`   |
| `theta`    | `undefined` \| `number`                                                                     | `undefined`   |

#### Returns

`void`

---

### queueIconWorld

▸ **queueIconWorld**(`artifact`, `topLeft`, `widthW`, `maxWidth?`): `void`

#### Parameters

| Name       | Type          | Default value |
| :--------- | :------------ | :------------ |
| `artifact` | `Artifact`    | `undefined`   |
| `topLeft`  | `WorldCoords` | `undefined`   |
| `widthW`   | `number`      | `undefined`   |
| `maxWidth` | `number`      | `32`          |

#### Returns

`void`

---

### queueOutline

▸ **queueOutline**(`artifact`, `__namedParameters`, `width`, `alpha`, `theta`, `color?`): `void`

#### Parameters

| Name                | Type                                                                                    |
| :------------------ | :-------------------------------------------------------------------------------------- |
| `artifact`          | [`RenderedArtifact`](../interfaces/Backend_GameLogic_ArtifactUtils.RenderedArtifact.md) |
| `__namedParameters` | [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md)               |
| `width`             | `number`                                                                                |
| `alpha`             | `number`                                                                                |
| `theta`             | `undefined` \| `number`                                                                 |
| `color`             | [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec)            |

#### Returns

`void`

---

### queueSprite

▸ **queueSprite**(`artifact`, `topLeft`, `width`, `alpha`, `color?`, `atFrame?`, `theta?`): `void`

#### Parameters

| Name       | Type                                                                                        |
| :--------- | :------------------------------------------------------------------------------------------ |
| `artifact` | [`RenderedArtifact`](../interfaces/Backend_GameLogic_ArtifactUtils.RenderedArtifact.md)     |
| `topLeft`  | [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md)                   |
| `width`    | `number`                                                                                    |
| `alpha`    | `number`                                                                                    |
| `color`    | `undefined` \| [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec) |
| `atFrame`  | `undefined` \| `number`                                                                     |
| `theta`    | `undefined` \| `number`                                                                     |

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
