# Module: Frontend/Renderers/GameRenderer/EngineTypes

## Table of contents

### Enumerations

- [AttribType](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md)
- [DrawMode](../enums/frontend_renderers_gamerenderer_enginetypes.drawmode.md)
- [RenderZIndex](../enums/frontend_renderers_gamerenderer_enginetypes.renderzindex.md)
- [TextAlign](../enums/frontend_renderers_gamerenderer_enginetypes.textalign.md)
- [TextAnchor](../enums/frontend_renderers_gamerenderer_enginetypes.textanchor.md)
- [UniformType](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md)

### Type aliases

- [AttribProps](frontend_renderers_gamerenderer_enginetypes.md#attribprops)
- [HSLVec](frontend_renderers_gamerenderer_enginetypes.md#hslvec)
- [RGBAVec](frontend_renderers_gamerenderer_enginetypes.md#rgbavec)
- [RGBVec](frontend_renderers_gamerenderer_enginetypes.md#rgbvec)
- [Scaling](frontend_renderers_gamerenderer_enginetypes.md#scaling)
- [Translation](frontend_renderers_gamerenderer_enginetypes.md#translation)
- [UniformJSType](frontend_renderers_gamerenderer_enginetypes.md#uniformjstype)
- [UniformProps](frontend_renderers_gamerenderer_enginetypes.md#uniformprops)
- [Vec3](frontend_renderers_gamerenderer_enginetypes.md#vec3)

## Type aliases

### AttribProps

Ƭ **AttribProps**: _object_

#### Type declaration

| Name        | Type                                                                               |
| :---------- | :--------------------------------------------------------------------------------- |
| `dim`       | _number_                                                                           |
| `name`      | _string_                                                                           |
| `normalize` | _boolean_                                                                          |
| `type`      | [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) |

---

### HSLVec

Ƭ **HSLVec**: [*number*, *number*, *number*]

---

### RGBAVec

Ƭ **RGBAVec**: [*number*, *number*, *number*, *number*]

---

### RGBVec

Ƭ **RGBVec**: [*number*, *number*, *number*]

---

### Scaling

Ƭ **Scaling**: _object_

#### Type declaration

| Name | Type     |
| :--- | :------- |
| `x`  | _number_ |
| `y`  | _number_ |

---

### Translation

Ƭ **Translation**: _object_

#### Type declaration

| Name | Type     |
| :--- | :------- |
| `x`  | _number_ |
| `y`  | _number_ |

---

### UniformJSType

Ƭ **UniformJSType**: mat4 \| mat3 \| _number_ \| [_Vec3_](frontend_renderers_gamerenderer_enginetypes.md#vec3)

---

### UniformProps

Ƭ **UniformProps**: _object_

#### Type declaration

| Name   | Type                                                                                 |
| :----- | :----------------------------------------------------------------------------------- |
| `name` | _string_                                                                             |
| `type` | [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) |

---

### Vec3

Ƭ **Vec3**: [*number*, *number*, *number*]
