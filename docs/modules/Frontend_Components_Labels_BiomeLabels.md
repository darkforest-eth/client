# Module: Frontend/Components/Labels/BiomeLabels

## Table of contents

### Variables

- [BiomeLabel](Frontend_Components_Labels_BiomeLabels.md#biomelabel)

### Functions

- [ArtifactBiomeLabel](Frontend_Components_Labels_BiomeLabels.md#artifactbiomelabel)
- [ArtifactBiomeLabelAnim](Frontend_Components_Labels_BiomeLabels.md#artifactbiomelabelanim)
- [BiomeLabelAnim](Frontend_Components_Labels_BiomeLabels.md#biomelabelanim)
- [OptionalPlanetBiomeLabelAnim](Frontend_Components_Labels_BiomeLabels.md#optionalplanetbiomelabelanim)
- [PlanetBiomeLabelAnim](Frontend_Components_Labels_BiomeLabels.md#planetbiomelabelanim)

## Variables

### BiomeLabel

• `Const` **BiomeLabel**: `StyledComponent`<`"span"`, `any`, { `biome`: `Biome` }, `never`\>

Renders colored text corresponding to a biome

## Functions

### ArtifactBiomeLabel

▸ **ArtifactBiomeLabel**(`__namedParameters`): `Element`

#### Parameters

| Name                         | Type       |
| :--------------------------- | :--------- |
| `__namedParameters`          | `Object`   |
| `__namedParameters.artifact` | `Artifact` |

#### Returns

`Element`

---

### ArtifactBiomeLabelAnim

▸ **ArtifactBiomeLabelAnim**(`__namedParameters`): `Element`

#### Parameters

| Name                         | Type       |
| :--------------------------- | :--------- |
| `__namedParameters`          | `Object`   |
| `__namedParameters.artifact` | `Artifact` |

#### Returns

`Element`

---

### BiomeLabelAnim

▸ **BiomeLabelAnim**(`__namedParameters`): `Element`

Renders animated colored text corresponding to a biome

#### Parameters

| Name                      | Type     |
| :------------------------ | :------- |
| `__namedParameters`       | `Object` |
| `__namedParameters.biome` | `Biome`  |

#### Returns

`Element`

---

### OptionalPlanetBiomeLabelAnim

▸ **OptionalPlanetBiomeLabelAnim**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### PlanetBiomeLabelAnim

▸ **PlanetBiomeLabelAnim**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type              |
| :------------------------- | :---------------- |
| `__namedParameters`        | `Object`          |
| `__namedParameters.planet` | `LocatablePlanet` |

#### Returns

`Element`
