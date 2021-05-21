# Module: Frontend/Renderers/GameRenderer/Programs/GlassProgram

## Table of contents

### Type aliases

- [GlassProgramWithUniforms](frontend_renderers_gamerenderer_programs_glassprogram.md#glassprogramwithuniforms)
- [GlassUniforms](frontend_renderers_gamerenderer_programs_glassprogram.md#glassuniforms)

### Variables

- [glassPosProps](frontend_renderers_gamerenderer_programs_glassprogram.md#glassposprops)
- [glassTexProps](frontend_renderers_gamerenderer_programs_glassprogram.md#glasstexprops)

### Functions

- [getGlassProgramAndUniforms](frontend_renderers_gamerenderer_programs_glassprogram.md#getglassprogramanduniforms)

## Type aliases

### GlassProgramWithUniforms

Ƭ **GlassProgramWithUniforms**: _object_

#### Type declaration

| Name       | Type                                                                                      |
| :--------- | :---------------------------------------------------------------------------------------- |
| `program`  | WebGLProgram                                                                              |
| `uniforms` | [_GlassUniforms_](frontend_renderers_gamerenderer_programs_glassprogram.md#glassuniforms) |

---

### GlassUniforms

Ƭ **GlassUniforms**: _object_

#### Type declaration

| Name      | Type                           |
| :-------- | :----------------------------- |
| `matrix`  | WebGLUniformLocation \| `null` |
| `texture` | WebGLUniformLocation \| `null` |

## Variables

### glassPosProps

• `Const` **glassPosProps**: [_AttribProps_](frontend_renderers_gamerenderer_enginetypes.md#attribprops)

---

### glassTexProps

• `Const` **glassTexProps**: [_AttribProps_](frontend_renderers_gamerenderer_enginetypes.md#attribprops)

## Functions

### getGlassProgramAndUniforms

▸ `Const` **getGlassProgramAndUniforms**(`gl`: WebGL2RenderingContext): [_GlassProgramWithUniforms_](frontend_renderers_gamerenderer_programs_glassprogram.md#glassprogramwithuniforms)

#### Parameters

| Name | Type                   |
| :--- | :--------------------- |
| `gl` | WebGL2RenderingContext |

**Returns:** [_GlassProgramWithUniforms_](frontend_renderers_gamerenderer_programs_glassprogram.md#glassprogramwithuniforms)
