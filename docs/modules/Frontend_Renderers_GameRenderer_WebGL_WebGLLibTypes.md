# Module: Frontend/Renderers/GameRenderer/WebGL/WebGLLibTypes

## Table of contents

### Interfaces

- [Attributes](../interfaces/Frontend_Renderers_GameRenderer_WebGL_WebGLLibTypes.Attributes.md)
- [Uniforms](../interfaces/Frontend_Renderers_GameRenderer_WebGL_WebGLLibTypes.Uniforms.md)

### Type aliases

- [AttributeSetters](Frontend_Renderers_GameRenderer_WebGL_WebGLLibTypes.md#attributesetters)
- [CompiledProgram](Frontend_Renderers_GameRenderer_WebGL_WebGLLibTypes.md#compiledprogram)
- [ProgramInfo](Frontend_Renderers_GameRenderer_WebGL_WebGLLibTypes.md#programinfo)
- [UniformSetters](Frontend_Renderers_GameRenderer_WebGL_WebGLLibTypes.md#uniformsetters)

## Type aliases

### AttributeSetters

Ƭ **AttributeSetters**<`U`\>: { [key in keyof U]: function}

#### Type parameters

| Name | Type                                                                                                    |
| :--- | :------------------------------------------------------------------------------------------------------ |
| `U`  | extends [`Attributes`](../interfaces/Frontend_Renderers_GameRenderer_WebGL_WebGLLibTypes.Attributes.md) |

---

### CompiledProgram

Ƭ **CompiledProgram**<`U`\>: `Object`

#### Type parameters

| Name | Type                                                                                                |
| :--- | :-------------------------------------------------------------------------------------------------- |
| `U`  | extends [`Uniforms`](../interfaces/Frontend_Renderers_GameRenderer_WebGL_WebGLLibTypes.Uniforms.md) |

#### Type declaration

| Name         | Type                                                                                            |
| :----------- | :---------------------------------------------------------------------------------------------- |
| `program`    | `WebGLProgram`                                                                                  |
| `setUniform` | [`UniformSetters`](Frontend_Renderers_GameRenderer_WebGL_WebGLLibTypes.md#uniformsetters)<`U`\> |

---

### ProgramInfo

Ƭ **ProgramInfo**: `Object`

#### Type declaration

| Name           | Type                                                                                        |
| :------------- | :------------------------------------------------------------------------------------------ |
| `fragShader`   | `string`                                                                                    |
| `uniforms`     | [`Uniforms`](../interfaces/Frontend_Renderers_GameRenderer_WebGL_WebGLLibTypes.Uniforms.md) |
| `vertexShader` | `string`                                                                                    |

---

### UniformSetters

Ƭ **UniformSetters**<`U`\>: { [key in keyof U]: function}

#### Type parameters

| Name | Type                                                                                                |
| :--- | :-------------------------------------------------------------------------------------------------- |
| `U`  | extends [`Uniforms`](../interfaces/Frontend_Renderers_GameRenderer_WebGL_WebGLLibTypes.Uniforms.md) |
