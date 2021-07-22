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

• `Const` **BiomeLabel**: `StyledComponent`<`"span"`, `any`, `Object`, `never`\>

Renders colored text corresponding to a biome

## Functions

### ArtifactBiomeLabel

▸ `Const` **ArtifactBiomeLabel**(`__namedParameters`): `Element`

#### Parameters

| Name                         | Type       |
| :--------------------------- | :--------- |
| `__namedParameters`          | `Object`   |
| `__namedParameters.artifact` | `Artifact` |

#### Returns

`Element`

---

### ArtifactBiomeLabelAnim

▸ `Const` **ArtifactBiomeLabelAnim**(`__namedParameters`): `Element`

#### Parameters

| Name                         | Type       |
| :--------------------------- | :--------- |
| `__namedParameters`          | `Object`   |
| `__namedParameters.artifact` | `Artifact` |

#### Returns

`Element`

---

### BiomeLabelAnim

▸ `Const` **BiomeLabelAnim**(`__namedParameters`): `Element`

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

▸ `Const` **OptionalPlanetBiomeLabelAnim**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### PlanetBiomeLabelAnim

▸ `Const` **PlanetBiomeLabelAnim**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type              |
| :------------------------- | :---------------- |
| `__namedParameters`        | `Object`          |
| `__namedParameters.planet` | `LocatablePlanet` |

#### Returns

`Element`
