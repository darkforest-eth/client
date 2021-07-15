# Class: PathRenderer

[Frontend/Renderers/PlanetscapeRenderer/PathRenderer](../modules/Frontend_Renderers_PlanetscapeRenderer_PathRenderer.md).PathRenderer

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_PlanetscapeRenderer_PathRenderer.PathRenderer.md#constructor)

### Properties

- [colorA](Frontend_Renderers_PlanetscapeRenderer_PathRenderer.PathRenderer.md#colora)
- [manager](Frontend_Renderers_PlanetscapeRenderer_PathRenderer.PathRenderer.md#manager)
- [matrixULoc](Frontend_Renderers_PlanetscapeRenderer_PathRenderer.PathRenderer.md#matrixuloc)
- [posA](Frontend_Renderers_PlanetscapeRenderer_PathRenderer.PathRenderer.md#posa)
- [program](Frontend_Renderers_PlanetscapeRenderer_PathRenderer.PathRenderer.md#program)

### Methods

- [drawPath](Frontend_Renderers_PlanetscapeRenderer_PathRenderer.PathRenderer.md#drawpath)

## Constructors

### constructor

• **new PathRenderer**(`manager`)

#### Parameters

| Name      | Type                                                                                 |
| :-------- | :----------------------------------------------------------------------------------- |
| `manager` | [`WebGLManager`](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md) |

## Properties

### colorA

• `Private` **colorA**: [`default`](Frontend_Renderers_GameRenderer_WebGL_AttribManager.default.md)

---

### manager

• `Private` **manager**: [`WebGLManager`](Frontend_Renderers_GameRenderer_WebGL_WebGLManager.WebGLManager.md)

---

### matrixULoc

• `Private` **matrixULoc**: `null` \| `WebGLUniformLocation`

---

### posA

• `Private` **posA**: [`default`](Frontend_Renderers_GameRenderer_WebGL_AttribManager.default.md)

---

### program

• `Private` **program**: `WebGLProgram`

## Methods

### drawPath

▸ **drawPath**(`arr`, `color`): `void`

#### Parameters

| Name    | Type                                                                         |
| :------ | :--------------------------------------------------------------------------- |
| `arr`   | [`PixelCoords`](../modules/Backend_Procedural_ProcgenUtils.md#pixelcoords)[] |
| `color` | [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec) |

#### Returns

`void`
