# Module: Frontend/Renderers/GameRenderer/Programs/RingProgram

## Table of contents

### Type aliases

- [RingProps](Frontend_Renderers_GameRenderer_Programs_RingProgram.md#ringprops)

### Variables

- [RING_PROGRAM_DEFINITION](Frontend_Renderers_GameRenderer_Programs_RingProgram.md#ring_program_definition)

### Functions

- [propsFromIdx](Frontend_Renderers_GameRenderer_Programs_RingProgram.md#propsfromidx)

## Type aliases

### RingProps

Ƭ **RingProps**: [`number`, `number`, `number`]

## Variables

### RING_PROGRAM_DEFINITION

• `Const` **RING_PROGRAM_DEFINITION**: `Object`

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
| `attribs.props`              | `Object`                                                                             |
| `attribs.props.dim`          | `number`                                                                             |
| `attribs.props.name`         | `string`                                                                             |
| `attribs.props.normalize`    | `boolean`                                                                            |
| `attribs.props.type`         | [`AttribType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.AttribType.md)   |
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

## Functions

### propsFromIdx

▸ `Const` **propsFromIdx**(`idx`): [`RingProps`](Frontend_Renderers_GameRenderer_Programs_RingProgram.md#ringprops)

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `idx` | `number` |

#### Returns

[`RingProps`](Frontend_Renderers_GameRenderer_Programs_RingProgram.md#ringprops)
