# Module: Frontend/Renderers/PlanetscapeRenderer/PathProgram

## Table of contents

### Type aliases

- [PathProgramWithUniforms](Frontend_Renderers_PlanetscapeRenderer_PathProgram.md#pathprogramwithuniforms)
- [ScapeUniforms](Frontend_Renderers_PlanetscapeRenderer_PathProgram.md#scapeuniforms)

### Variables

- [scapeColorProps](Frontend_Renderers_PlanetscapeRenderer_PathProgram.md#scapecolorprops)
- [scapePosProps](Frontend_Renderers_PlanetscapeRenderer_PathProgram.md#scapeposprops)

### Functions

- [getPathProgramAndUniforms](Frontend_Renderers_PlanetscapeRenderer_PathProgram.md#getpathprogramanduniforms)

## Type aliases

### PathProgramWithUniforms

Ƭ **PathProgramWithUniforms**: `Object`

#### Type declaration

| Name       | Type                                                                                   |
| :--------- | :------------------------------------------------------------------------------------- |
| `program`  | `WebGLProgram`                                                                         |
| `uniforms` | [`ScapeUniforms`](Frontend_Renderers_PlanetscapeRenderer_PathProgram.md#scapeuniforms) |

---

### ScapeUniforms

Ƭ **ScapeUniforms**: `Object`

#### Type declaration

| Name     | Type                             |
| :------- | :------------------------------- |
| `matrix` | `WebGLUniformLocation` \| `null` |

## Variables

### scapeColorProps

• `Const` **scapeColorProps**: [`AttribProps`](Frontend_Renderers_GameRenderer_EngineTypes.md#attribprops)

---

### scapePosProps

• `Const` **scapePosProps**: [`AttribProps`](Frontend_Renderers_GameRenderer_EngineTypes.md#attribprops)

## Functions

### getPathProgramAndUniforms

▸ `Const` **getPathProgramAndUniforms**(`gl`): [`PathProgramWithUniforms`](Frontend_Renderers_PlanetscapeRenderer_PathProgram.md#pathprogramwithuniforms)

#### Parameters

| Name | Type                     |
| :--- | :----------------------- |
| `gl` | `WebGL2RenderingContext` |

#### Returns

[`PathProgramWithUniforms`](Frontend_Renderers_PlanetscapeRenderer_PathProgram.md#pathprogramwithuniforms)
