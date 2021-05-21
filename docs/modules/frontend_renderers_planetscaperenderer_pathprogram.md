# Module: Frontend/Renderers/PlanetscapeRenderer/PathProgram

## Table of contents

### Type aliases

- [PathProgramWithUniforms](frontend_renderers_planetscaperenderer_pathprogram.md#pathprogramwithuniforms)
- [ScapeUniforms](frontend_renderers_planetscaperenderer_pathprogram.md#scapeuniforms)

### Variables

- [scapeColorProps](frontend_renderers_planetscaperenderer_pathprogram.md#scapecolorprops)
- [scapePosProps](frontend_renderers_planetscaperenderer_pathprogram.md#scapeposprops)

### Functions

- [getPathProgramAndUniforms](frontend_renderers_planetscaperenderer_pathprogram.md#getpathprogramanduniforms)

## Type aliases

### PathProgramWithUniforms

Ƭ **PathProgramWithUniforms**: _object_

#### Type declaration

| Name       | Type                                                                                   |
| :--------- | :------------------------------------------------------------------------------------- |
| `program`  | WebGLProgram                                                                           |
| `uniforms` | [_ScapeUniforms_](frontend_renderers_planetscaperenderer_pathprogram.md#scapeuniforms) |

---

### ScapeUniforms

Ƭ **ScapeUniforms**: _object_

#### Type declaration

| Name     | Type                           |
| :------- | :----------------------------- |
| `matrix` | WebGLUniformLocation \| `null` |

## Variables

### scapeColorProps

• `Const` **scapeColorProps**: [_AttribProps_](frontend_renderers_gamerenderer_enginetypes.md#attribprops)

---

### scapePosProps

• `Const` **scapePosProps**: [_AttribProps_](frontend_renderers_gamerenderer_enginetypes.md#attribprops)

## Functions

### getPathProgramAndUniforms

▸ `Const` **getPathProgramAndUniforms**(`gl`: WebGL2RenderingContext): [_PathProgramWithUniforms_](frontend_renderers_planetscaperenderer_pathprogram.md#pathprogramwithuniforms)

#### Parameters

| Name | Type                   |
| :--- | :--------------------- |
| `gl` | WebGL2RenderingContext |

**Returns:** [_PathProgramWithUniforms_](frontend_renderers_planetscaperenderer_pathprogram.md#pathprogramwithuniforms)
