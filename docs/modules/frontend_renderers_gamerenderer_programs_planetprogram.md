# Module: Frontend/Renderers/GameRenderer/Programs/PlanetProgram

## Table of contents

### Variables

- [PLANET_PROGRAM_DEFINITION](frontend_renderers_gamerenderer_programs_planetprogram.md#planet_program_definition)

### Functions

- [beachFromPlanet](frontend_renderers_gamerenderer_programs_planetprogram.md#beachfromplanet)
- [cloudsFromPlanet](frontend_renderers_gamerenderer_programs_planetprogram.md#cloudsfromplanet)
- [distortFromPlanet](frontend_renderers_gamerenderer_programs_planetprogram.md#distortfromplanet)
- [morphFromPlanet](frontend_renderers_gamerenderer_programs_planetprogram.md#morphfromplanet)
- [octavesFromPlanet](frontend_renderers_gamerenderer_programs_planetprogram.md#octavesfromplanet)
- [propsFromPlanet](frontend_renderers_gamerenderer_programs_planetprogram.md#propsfromplanet)

## Variables

### PLANET_PROGRAM_DEFINITION

• `Const` **PLANET_PROGRAM_DEFINITION**: _object_

#### Type declaration

| Name                         | Type                                                                                 |
| :--------------------------- | :----------------------------------------------------------------------------------- |
| `attribs`                    | _object_                                                                             |
| `attribs.color`              | _object_                                                                             |
| `attribs.color.dim`          | _number_                                                                             |
| `attribs.color.name`         | _string_                                                                             |
| `attribs.color.normalize`    | _boolean_                                                                            |
| `attribs.color.type`         | [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md)   |
| `attribs.color2`             | _object_                                                                             |
| `attribs.color2.dim`         | _number_                                                                             |
| `attribs.color2.name`        | _string_                                                                             |
| `attribs.color2.normalize`   | _boolean_                                                                            |
| `attribs.color2.type`        | [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md)   |
| `attribs.color3`             | _object_                                                                             |
| `attribs.color3.dim`         | _number_                                                                             |
| `attribs.color3.name`        | _string_                                                                             |
| `attribs.color3.normalize`   | _boolean_                                                                            |
| `attribs.color3.type`        | [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md)   |
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
| `attribs.props2`             | _object_                                                                             |
| `attribs.props2.dim`         | _number_                                                                             |
| `attribs.props2.name`        | _string_                                                                             |
| `attribs.props2.normalize`   | _boolean_                                                                            |
| `attribs.props2.type`        | [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md)   |
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
| `uniforms.time`              | _object_                                                                             |
| `uniforms.time.name`         | _string_                                                                             |
| `uniforms.time.type`         | [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) |
| `uniforms.timeMatrix`        | _object_                                                                             |
| `uniforms.timeMatrix.name`   | _string_                                                                             |
| `uniforms.timeMatrix.type`   | [_UniformType_](../enums/frontend_renderers_gamerenderer_enginetypes.uniformtype.md) |
| `vertexShader`               | _string_                                                                             |

## Functions

### beachFromPlanet

▸ `Const` **beachFromPlanet**(`p`: Planet): _number_

#### Parameters

| Name | Type   |
| :--- | :----- |
| `p`  | Planet |

**Returns:** _number_

---

### cloudsFromPlanet

▸ `Const` **cloudsFromPlanet**(`p`: Planet): _number_

#### Parameters

| Name | Type   |
| :--- | :----- |
| `p`  | Planet |

**Returns:** _number_

---

### distortFromPlanet

▸ **distortFromPlanet**(`p`: Planet): _number_

#### Parameters

| Name | Type   |
| :--- | :----- |
| `p`  | Planet |

**Returns:** _number_

---

### morphFromPlanet

▸ `Const` **morphFromPlanet**(`p`: Planet): _number_

#### Parameters

| Name | Type   |
| :--- | :----- |
| `p`  | Planet |

**Returns:** _number_

---

### octavesFromPlanet

▸ `Const` **octavesFromPlanet**(`p`: Planet): _number_

#### Parameters

| Name | Type   |
| :--- | :----- |
| `p`  | Planet |

**Returns:** _number_

---

### propsFromPlanet

▸ `Const` **propsFromPlanet**(`p`: Planet): [*number*, *number*, *number*, *number*]

#### Parameters

| Name | Type   |
| :--- | :----- |
| `p`  | Planet |

**Returns:** [*number*, *number*, *number*, *number*]
