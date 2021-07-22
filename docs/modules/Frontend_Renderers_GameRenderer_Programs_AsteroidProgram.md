# Module: Frontend/Renderers/GameRenderer/Programs/AsteroidProgram

## Table of contents

### Variables

- [ASTEROID_PROGRAM_DEFINITION](Frontend_Renderers_GameRenderer_Programs_AsteroidProgram.md#asteroid_program_definition)

## Variables

### ASTEROID_PROGRAM_DEFINITION

• `Const` **ASTEROID_PROGRAM_DEFINITION**: `Object`

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
| `attribs.radius`             | `Object`                                                                             |
| `attribs.radius.dim`         | `number`                                                                             |
| `attribs.radius.name`        | `string`                                                                             |
| `attribs.radius.normalize`   | `boolean`                                                                            |
| `attribs.radius.type`        | [`AttribType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.AttribType.md)   |
| `attribs.seed`               | `Object`                                                                             |
| `attribs.seed.dim`           | `number`                                                                             |
| `attribs.seed.name`          | `string`                                                                             |
| `attribs.seed.normalize`     | `boolean`                                                                            |
| `attribs.seed.type`          | [`AttribType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.AttribType.md)   |
| `attribs.theta`              | `Object`                                                                             |
| `attribs.theta.dim`          | `number`                                                                             |
| `attribs.theta.name`         | `string`                                                                             |
| `attribs.theta.normalize`    | `boolean`                                                                            |
| `attribs.theta.type`         | [`AttribType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.AttribType.md)   |
| `fragmentShader`             | `string`                                                                             |
| `uniforms`                   | `Object`                                                                             |
| `uniforms.matrix`            | `Object`                                                                             |
| `uniforms.matrix.name`       | `string`                                                                             |
| `uniforms.matrix.type`       | [`UniformType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.UniformType.md) |
| `uniforms.now`               | `Object`                                                                             |
| `uniforms.now.name`          | `string`                                                                             |
| `uniforms.now.type`          | [`UniformType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.UniformType.md) |
| `vertexShader`               | `string`                                                                             |
