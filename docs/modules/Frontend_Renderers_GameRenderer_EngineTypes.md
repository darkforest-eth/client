# Module: Frontend/Renderers/GameRenderer/EngineTypes

## Table of contents

### Enumerations

- [AttribType](../enums/Frontend_Renderers_GameRenderer_EngineTypes.AttribType.md)
- [DrawMode](../enums/Frontend_Renderers_GameRenderer_EngineTypes.DrawMode.md)
- [RenderZIndex](../enums/Frontend_Renderers_GameRenderer_EngineTypes.RenderZIndex.md)
- [TextAlign](../enums/Frontend_Renderers_GameRenderer_EngineTypes.TextAlign.md)
- [TextAnchor](../enums/Frontend_Renderers_GameRenderer_EngineTypes.TextAnchor.md)
- [UniformType](../enums/Frontend_Renderers_GameRenderer_EngineTypes.UniformType.md)

### Type aliases

- [AttribProps](Frontend_Renderers_GameRenderer_EngineTypes.md#attribprops)
- [HSLVec](Frontend_Renderers_GameRenderer_EngineTypes.md#hslvec)
- [RGBAVec](Frontend_Renderers_GameRenderer_EngineTypes.md#rgbavec)
- [RGBVec](Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec)
- [Scaling](Frontend_Renderers_GameRenderer_EngineTypes.md#scaling)
- [Translation](Frontend_Renderers_GameRenderer_EngineTypes.md#translation)
- [UniformJSType](Frontend_Renderers_GameRenderer_EngineTypes.md#uniformjstype)
- [UniformProps](Frontend_Renderers_GameRenderer_EngineTypes.md#uniformprops)
- [Vec3](Frontend_Renderers_GameRenderer_EngineTypes.md#vec3)

## Type aliases

### AttribProps

Ƭ **AttribProps**: `Object`

#### Type declaration

| Name        | Type                                                                               |
| :---------- | :--------------------------------------------------------------------------------- |
| `dim`       | `number`                                                                           |
| `name`      | `string`                                                                           |
| `normalize` | `boolean`                                                                          |
| `type`      | [`AttribType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.AttribType.md) |

---

### HSLVec

Ƭ **HSLVec**: readonly [`number`, `number`, `number`]

---

### RGBAVec

Ƭ **RGBAVec**: [`number`, `number`, `number`, `number`]

---

### RGBVec

Ƭ **RGBVec**: [`number`, `number`, `number`]

---

### Scaling

Ƭ **Scaling**: `Object`

#### Type declaration

| Name | Type     |
| :--- | :------- |
| `x`  | `number` |
| `y`  | `number` |

---

### Translation

Ƭ **Translation**: `Object`

#### Type declaration

| Name | Type     |
| :--- | :------- |
| `x`  | `number` |
| `y`  | `number` |

---

### UniformJSType

Ƭ **UniformJSType**: `mat4` \| `mat3` \| `number` \| [`Vec3`](Frontend_Renderers_GameRenderer_EngineTypes.md#vec3)

---

### UniformProps

Ƭ **UniformProps**: `Object`

#### Type declaration

| Name   | Type                                                                                 |
| :----- | :----------------------------------------------------------------------------------- |
| `name` | `string`                                                                             |
| `type` | [`UniformType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.UniformType.md) |

---

### Vec3

Ƭ **Vec3**: [`number`, `number`, `number`]
