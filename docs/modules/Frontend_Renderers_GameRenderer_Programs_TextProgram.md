# Module: Frontend/Renderers/GameRenderer/Programs/TextProgram

## Table of contents

### Variables

- [TEXT_PROGRAM_DEFINITION](Frontend_Renderers_GameRenderer_Programs_TextProgram.md#text_program_definition)

## Variables

### TEXT_PROGRAM_DEFINITION

• `Const` **TEXT_PROGRAM_DEFINITION**: `Object`

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
| `attribs.texcoord`           | `Object`                                                                             |
| `attribs.texcoord.dim`       | `number`                                                                             |
| `attribs.texcoord.name`      | `string`                                                                             |
| `attribs.texcoord.normalize` | `boolean`                                                                            |
| `attribs.texcoord.type`      | [`AttribType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.AttribType.md)   |
| `fragmentShader`             | `string`                                                                             |
| `uniforms`                   | `Object`                                                                             |
| `uniforms.matrix`            | `Object`                                                                             |
| `uniforms.matrix.name`       | `string`                                                                             |
| `uniforms.matrix.type`       | [`UniformType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.UniformType.md) |
| `uniforms.texture`           | `Object`                                                                             |
| `uniforms.texture.name`      | `string`                                                                             |
| `uniforms.texture.type`      | [`UniformType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.UniformType.md) |
| `vertexShader`               | `string`                                                                             |
