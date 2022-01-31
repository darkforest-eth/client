# Module: Frontend/Renderers/GameRenderer/Programs/PlanetProgram

## Table of contents

### Variables

- [PLANET_PROGRAM_DEFINITION](Frontend_Renderers_GameRenderer_Programs_PlanetProgram.md#planet_program_definition)

### Functions

- [beachFromPlanet](Frontend_Renderers_GameRenderer_Programs_PlanetProgram.md#beachfromplanet)
- [cloudsFromPlanet](Frontend_Renderers_GameRenderer_Programs_PlanetProgram.md#cloudsfromplanet)
- [distortFromPlanet](Frontend_Renderers_GameRenderer_Programs_PlanetProgram.md#distortfromplanet)
- [morphFromPlanet](Frontend_Renderers_GameRenderer_Programs_PlanetProgram.md#morphfromplanet)
- [octavesFromPlanet](Frontend_Renderers_GameRenderer_Programs_PlanetProgram.md#octavesfromplanet)
- [propsFromPlanet](Frontend_Renderers_GameRenderer_Programs_PlanetProgram.md#propsfromplanet)

## Variables

### PLANET_PROGRAM_DEFINITION

• `Const` **PLANET_PROGRAM_DEFINITION**: `Object`

#### Type declaration

| Name                         | Type                                                                                 |
| :--------------------------- | :----------------------------------------------------------------------------------- |
| `attribs`                    | `Object`                                                                             |
| `attribs.color`              | `Object`                                                                             |
| `attribs.color.dim`          | `number`                                                                             |
| `attribs.color.name`         | `string`                                                                             |
| `attribs.color.normalize`    | `boolean`                                                                            |
| `attribs.color.type`         | [`AttribType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.AttribType.md)   |
| `attribs.color2`             | `Object`                                                                             |
| `attribs.color2.dim`         | `number`                                                                             |
| `attribs.color2.name`        | `string`                                                                             |
| `attribs.color2.normalize`   | `boolean`                                                                            |
| `attribs.color2.type`        | [`AttribType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.AttribType.md)   |
| `attribs.color3`             | `Object`                                                                             |
| `attribs.color3.dim`         | `number`                                                                             |
| `attribs.color3.name`        | `string`                                                                             |
| `attribs.color3.normalize`   | `boolean`                                                                            |
| `attribs.color3.type`        | [`AttribType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.AttribType.md)   |
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
| `attribs.props2`             | `Object`                                                                             |
| `attribs.props2.dim`         | `number`                                                                             |
| `attribs.props2.name`        | `string`                                                                             |
| `attribs.props2.normalize`   | `boolean`                                                                            |
| `attribs.props2.type`        | [`AttribType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.AttribType.md)   |
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
| `uniforms.timeMatrix`        | `Object`                                                                             |
| `uniforms.timeMatrix.name`   | `string`                                                                             |
| `uniforms.timeMatrix.type`   | [`UniformType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.UniformType.md) |
| `vertexShader`               | `string`                                                                             |

## Functions

### beachFromPlanet

▸ `Const` **beachFromPlanet**(`p`): `number`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `p`  | `Planet` |

#### Returns

`number`

---

### cloudsFromPlanet

▸ `Const` **cloudsFromPlanet**(`p`): `number`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `p`  | `Planet` |

#### Returns

`number`

---

### distortFromPlanet

▸ **distortFromPlanet**(`p`): `number`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `p`  | `Planet` |

#### Returns

`number`

---

### morphFromPlanet

▸ `Const` **morphFromPlanet**(`p`): `number`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `p`  | `Planet` |

#### Returns

`number`

---

### octavesFromPlanet

▸ `Const` **octavesFromPlanet**(`p`): `number`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `p`  | `Planet` |

#### Returns

`number`

---

### propsFromPlanet

▸ `Const` **propsFromPlanet**(`p`): [`number`, `number`, `number`, `number`]

#### Parameters

| Name | Type     |
| :--- | :------- |
| `p`  | `Planet` |

#### Returns

[`number`, `number`, `number`, `number`]
