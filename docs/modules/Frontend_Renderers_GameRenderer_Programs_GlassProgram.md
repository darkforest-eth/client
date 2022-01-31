# Module: Frontend/Renderers/GameRenderer/Programs/GlassProgram

## Table of contents

### Type aliases

- [GlassProgramWithUniforms](Frontend_Renderers_GameRenderer_Programs_GlassProgram.md#glassprogramwithuniforms)
- [GlassUniforms](Frontend_Renderers_GameRenderer_Programs_GlassProgram.md#glassuniforms)

### Variables

- [glassPosProps](Frontend_Renderers_GameRenderer_Programs_GlassProgram.md#glassposprops)
- [glassTexProps](Frontend_Renderers_GameRenderer_Programs_GlassProgram.md#glasstexprops)

### Functions

- [getGlassProgramAndUniforms](Frontend_Renderers_GameRenderer_Programs_GlassProgram.md#getglassprogramanduniforms)

## Type aliases

### GlassProgramWithUniforms

Ƭ **GlassProgramWithUniforms**: `Object`

#### Type declaration

| Name       | Type                                                                                      |
| :--------- | :---------------------------------------------------------------------------------------- |
| `program`  | `WebGLProgram`                                                                            |
| `uniforms` | [`GlassUniforms`](Frontend_Renderers_GameRenderer_Programs_GlassProgram.md#glassuniforms) |

---

### GlassUniforms

Ƭ **GlassUniforms**: `Object`

#### Type declaration

| Name      | Type                             |
| :-------- | :------------------------------- |
| `matrix`  | `WebGLUniformLocation` \| `null` |
| `texture` | `WebGLUniformLocation` \| `null` |

## Variables

### glassPosProps

• `Const` **glassPosProps**: [`AttribProps`](Frontend_Renderers_GameRenderer_EngineTypes.md#attribprops)

---

### glassTexProps

• `Const` **glassTexProps**: [`AttribProps`](Frontend_Renderers_GameRenderer_EngineTypes.md#attribprops)

## Functions

### getGlassProgramAndUniforms

▸ `Const` **getGlassProgramAndUniforms**(`gl`): [`GlassProgramWithUniforms`](Frontend_Renderers_GameRenderer_Programs_GlassProgram.md#glassprogramwithuniforms)

#### Parameters

| Name | Type                     |
| :--- | :----------------------- |
| `gl` | `WebGL2RenderingContext` |

#### Returns

[`GlassProgramWithUniforms`](Frontend_Renderers_GameRenderer_Programs_GlassProgram.md#glassprogramwithuniforms)
