# Module: Frontend/Renderers/GameRenderer/Programs/BlackDomainProgram

## Table of contents

### Variables

- [BLACKDOMAIN_PROGRAM_DEFINITION](Frontend_Renderers_GameRenderer_Programs_BlackDomainProgram.md#blackdomain_program_definition)

## Variables

### BLACKDOMAIN_PROGRAM_DEFINITION

• `Const` **BLACKDOMAIN_PROGRAM_DEFINITION**: `Object`

#### Type declaration

| Name                         | Type                                                                                 |
| :--------------------------- | :----------------------------------------------------------------------------------- |
| `attribs`                    | `Object`                                                                             |
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
| `uniforms.now`               | `Object`                                                                             |
| `uniforms.now.name`          | `string`                                                                             |
| `uniforms.now.type`          | [`UniformType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.UniformType.md) |
| `vertexShader`               | `string`                                                                             |
