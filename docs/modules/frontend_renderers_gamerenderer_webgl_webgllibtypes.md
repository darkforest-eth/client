# Module: Frontend/Renderers/GameRenderer/WebGL/WebGLLibTypes

## Table of contents

### Interfaces

- [Attributes](../interfaces/frontend_renderers_gamerenderer_webgl_webgllibtypes.attributes.md)
- [Uniforms](../interfaces/frontend_renderers_gamerenderer_webgl_webgllibtypes.uniforms.md)

### Type aliases

- [AttributeSetters](frontend_renderers_gamerenderer_webgl_webgllibtypes.md#attributesetters)
- [CompiledProgram](frontend_renderers_gamerenderer_webgl_webgllibtypes.md#compiledprogram)
- [ProgramInfo](frontend_renderers_gamerenderer_webgl_webgllibtypes.md#programinfo)
- [UniformSetters](frontend_renderers_gamerenderer_webgl_webgllibtypes.md#uniformsetters)

## Type aliases

### AttributeSetters

Ƭ **AttributeSetters**<U\>: { [key in keyof U]: function}

#### Type parameters

| Name | Type                                                                                            |
| :--- | :---------------------------------------------------------------------------------------------- |
| `U`  | [_Attributes_](../interfaces/frontend_renderers_gamerenderer_webgl_webgllibtypes.attributes.md) |

---

### CompiledProgram

Ƭ **CompiledProgram**<U\>: _object_

#### Type parameters

| Name | Type                                                                                        |
| :--- | :------------------------------------------------------------------------------------------ |
| `U`  | [_Uniforms_](../interfaces/frontend_renderers_gamerenderer_webgl_webgllibtypes.uniforms.md) |

#### Type declaration

| Name         | Type                                                                                          |
| :----------- | :-------------------------------------------------------------------------------------------- |
| `program`    | WebGLProgram                                                                                  |
| `setUniform` | [_UniformSetters_](frontend_renderers_gamerenderer_webgl_webgllibtypes.md#uniformsetters)<U\> |

---

### ProgramInfo

Ƭ **ProgramInfo**: _object_

#### Type declaration

| Name           | Type                                                                                        |
| :------------- | :------------------------------------------------------------------------------------------ |
| `fragShader`   | _string_                                                                                    |
| `uniforms`     | [_Uniforms_](../interfaces/frontend_renderers_gamerenderer_webgl_webgllibtypes.uniforms.md) |
| `vertexShader` | _string_                                                                                    |

---

### UniformSetters

Ƭ **UniformSetters**<U\>: { [key in keyof U]: function}

#### Type parameters

| Name | Type                                                                                        |
| :--- | :------------------------------------------------------------------------------------------ |
| `U`  | [_Uniforms_](../interfaces/frontend_renderers_gamerenderer_webgl_webgllibtypes.uniforms.md) |
