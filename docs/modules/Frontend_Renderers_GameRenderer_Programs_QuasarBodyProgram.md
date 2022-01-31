# Module: Frontend/Renderers/GameRenderer/Programs/QuasarBodyProgram

## Table of contents

### Variables

- [QUASARBODY_PROGRAM_DEFINITION](Frontend_Renderers_GameRenderer_Programs_QuasarBodyProgram.md#quasarbody_program_definition)

## Variables

### QUASARBODY_PROGRAM_DEFINITION

• `Const` **QUASARBODY_PROGRAM_DEFINITION**: `Object`

#### Type declaration

| Name                         | Type                                                                                 |
| :--------------------------- | :----------------------------------------------------------------------------------- |
| `attribs`                    | `Object`                                                                             |
| `attribs.color`              | `Object`                                                                             |
| `attribs.color.dim`          | `number`                                                                             |
| `attribs.color.name`         | `string`                                                                             |
| `attribs.color.normalize`    | `boolean`                                                                            |
| `attribs.color.type`         | [`AttribType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.AttribType.md)   |
| `attribs.position`           | `Object`                                                                             |
| `attribs.position.dim`       | `number`                                                                             |
| `attribs.position.name`      | `string`                                                                             |
| `attribs.position.normalize` | `boolean`                                                                            |
| `attribs.position.type`      | [`AttribType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.AttribType.md)   |
| `attribs.rectPos`            | `Object`                                                                             |
| `attribs.rectPos.dim`        | `number`                                                                             |
| `attribs.rectPos.name`       | `string`                                                                             |
| `attribs.rectPos.normalize`  | `boolean`                                                                            |
| `attribs.rectPos.type`       | [`AttribType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.AttribType.md)   |
| `fragmentShader`             | `string`                                                                             |
| `uniforms`                   | `Object`                                                                             |
| `uniforms.matrix`            | `Object`                                                                             |
| `uniforms.matrix.name`       | `string`                                                                             |
| `uniforms.matrix.type`       | [`UniformType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.UniformType.md) |
| `uniforms.time`              | `Object`                                                                             |
| `uniforms.time.name`         | `string`                                                                             |
| `uniforms.time.type`         | [`UniformType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.UniformType.md) |
| `vertexShader`               | `string`                                                                             |
