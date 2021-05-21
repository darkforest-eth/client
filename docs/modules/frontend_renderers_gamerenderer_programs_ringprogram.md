# Module: Frontend/Renderers/GameRenderer/Programs/RingProgram

## Table of contents

### Type aliases

- [RingProps](frontend_renderers_gamerenderer_programs_ringprogram.md#ringprops)

### Variables

- [RING_PROGRAM_DEFINITION](frontend_renderers_gamerenderer_programs_ringprogram.md#ring_program_definition)

### Functions

- [propsFromIdx](frontend_renderers_gamerenderer_programs_ringprogram.md#propsfromidx)

## Type aliases

### RingProps

Ƭ **RingProps**: [*number*, *number*, *number*]

## Variables

### RING_PROGRAM_DEFINITION

• `Const` **RING_PROGRAM_DEFINITION**: _object_

#### Type declaration

| Name                         | Type                                                                                 |
| :--------------------------- | :----------------------------------------------------------------------------------- |
| `attribs`                    | _object_                                                                             |
| `attribs.color`              | _object_                                                                             |
| `attribs.color.dim`          | _number_                                                                             |
| `attribs.color.name`         | _string_                                                                             |
| `attribs.color.normalize`    | _boolean_                                                                            |
| `attribs.color.type`         | [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md)   |
| `attribs.position`           | _object_                                                                             |
| `attribs.position.dim`       | _number_                                                                             |
| `attribs.position.name`      | _string_                                                                             |
| `attribs.position.normalize` | _boolean_                                                                            |
| `attribs.position.type`      | [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md)   |
| `attribs.props`              | _object_                                                                             |
| `attribs.props.dim`          | _number_                                                                             |
| `attribs.props.name`         | _string_                                                                             |
| `attribs.props.normalize`    | _boolean_                                                                            |
| `attribs.props.type`         | [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md)   |
| `attribs.rectPos`            | _object_                                                                             |
| `attribs.rectPos.dim`        | _number_                                                                             |
| `attribs.rectPos.name`       | _string_                                                                             |
| `attribs.rectPos.normalize`  | _boolean_                                                                            |
| `attribs.rectPos.type`       | [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md)   |
| `fragmentShader`             | _string_                                                                             |
| `uniforms`                   | _object_                                                                             |
| `uniforms.matrix`            | _object_                                                                             |
| `uniforms.matrix.name`       | _string_                                                                             |
| `uniforms.matrix.type`       | [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) |
| `uniforms.now`               | _object_                                                                             |
| `uniforms.now.name`          | _string_                                                                             |
| `uniforms.now.type`          | [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) |
| `vertexShader`               | _string_                                                                             |

## Functions

### propsFromIdx

▸ `Const` **propsFromIdx**(`idx`: _number_): [_RingProps_](frontend_renderers_gamerenderer_programs_ringprogram.md#ringprops)

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `idx` | _number_ |

**Returns:** [_RingProps_](frontend_renderers_gamerenderer_programs_ringprogram.md#ringprops)
