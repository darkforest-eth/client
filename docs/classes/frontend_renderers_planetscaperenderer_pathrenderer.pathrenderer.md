# Class: PathRenderer

[Frontend/Renderers/PlanetscapeRenderer/PathRenderer](../modules/frontend_renderers_planetscaperenderer_pathrenderer.md).PathRenderer

## Table of contents

### Constructors

- [constructor](frontend_renderers_planetscaperenderer_pathrenderer.pathrenderer.md#constructor)

### Properties

- [colorA](frontend_renderers_planetscaperenderer_pathrenderer.pathrenderer.md#colora)
- [manager](frontend_renderers_planetscaperenderer_pathrenderer.pathrenderer.md#manager)
- [matrixULoc](frontend_renderers_planetscaperenderer_pathrenderer.pathrenderer.md#matrixuloc)
- [posA](frontend_renderers_planetscaperenderer_pathrenderer.pathrenderer.md#posa)
- [program](frontend_renderers_planetscaperenderer_pathrenderer.pathrenderer.md#program)

### Methods

- [drawPath](frontend_renderers_planetscaperenderer_pathrenderer.pathrenderer.md#drawpath)

## Constructors

### constructor

\+ **new PathRenderer**(`manager`: [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)): [_PathRenderer_](frontend_renderers_planetscaperenderer_pathrenderer.pathrenderer.md)

#### Parameters

| Name      | Type                                                                                 |
| :-------- | :----------------------------------------------------------------------------------- |
| `manager` | [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md) |

**Returns:** [_PathRenderer_](frontend_renderers_planetscaperenderer_pathrenderer.pathrenderer.md)

## Properties

### colorA

• `Private` **colorA**: [_default_](frontend_renderers_gamerenderer_webgl_attribmanager.default.md)

---

### manager

• `Private` **manager**: [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

---

### matrixULoc

• `Private` **matrixULoc**: `null` \| WebGLUniformLocation

---

### posA

• `Private` **posA**: [_default_](frontend_renderers_gamerenderer_webgl_attribmanager.default.md)

---

### program

• `Private` **program**: WebGLProgram

## Methods

### drawPath

▸ **drawPath**(`arr`: [_PixelCoords_](../modules/backend_procedural_procgenutils.md#pixelcoords)[], `color`: [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec)): _void_

#### Parameters

| Name    | Type                                                                         |
| :------ | :--------------------------------------------------------------------------- |
| `arr`   | [_PixelCoords_](../modules/backend_procedural_procgenutils.md#pixelcoords)[] |
| `color` | [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec) |

**Returns:** _void_
