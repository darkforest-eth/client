# Module: Frontend/Components/Labels/BiomeLabels

## Table of contents

### Variables

- [BiomeLabel](frontend_components_labels_biomelabels.md#biomelabel)

### Functions

- [ArtifactBiomeLabel](frontend_components_labels_biomelabels.md#artifactbiomelabel)
- [ArtifactBiomeLabelAnim](frontend_components_labels_biomelabels.md#artifactbiomelabelanim)
- [BiomeLabelAnim](frontend_components_labels_biomelabels.md#biomelabelanim)
- [OptionalPlanetBiomeLabelAnim](frontend_components_labels_biomelabels.md#optionalplanetbiomelabelanim)
- [PlanetBiomeLabelAnim](frontend_components_labels_biomelabels.md#planetbiomelabelanim)

## Variables

### BiomeLabel

• `Const` **BiomeLabel**: _StyledComponent_<`"span"`, any, { `biome`: Biome }, never\>

Renders colored text corresponding to a biome

## Functions

### ArtifactBiomeLabel

▸ `Const` **ArtifactBiomeLabel**(`__namedParameters`: { `artifact`: Artifact }): _Element_

#### Parameters

| Name                         | Type     |
| :--------------------------- | :------- |
| `__namedParameters`          | _object_ |
| `__namedParameters.artifact` | Artifact |

**Returns:** _Element_

---

### ArtifactBiomeLabelAnim

▸ `Const` **ArtifactBiomeLabelAnim**(`__namedParameters`: { `artifact`: Artifact }): _Element_

#### Parameters

| Name                         | Type     |
| :--------------------------- | :------- |
| `__namedParameters`          | _object_ |
| `__namedParameters.artifact` | Artifact |

**Returns:** _Element_

---

### BiomeLabelAnim

▸ `Const` **BiomeLabelAnim**(`__namedParameters`: { `biome`: Biome }): _Element_

Renders animated colored text corresponding to a biome

#### Parameters

| Name                      | Type     |
| :------------------------ | :------- |
| `__namedParameters`       | _object_ |
| `__namedParameters.biome` | Biome    |

**Returns:** _Element_

---

### OptionalPlanetBiomeLabelAnim

▸ `Const` **OptionalPlanetBiomeLabelAnim**(`__namedParameters`: { `planet`: _undefined_ \| Planet }): _Element_

#### Parameters

| Name                       | Type                  |
| :------------------------- | :-------------------- |
| `__namedParameters`        | _object_              |
| `__namedParameters.planet` | _undefined_ \| Planet |

**Returns:** _Element_

---

### PlanetBiomeLabelAnim

▸ `Const` **PlanetBiomeLabelAnim**(`__namedParameters`: { `planet`: LocatablePlanet }): _Element_

#### Parameters

| Name                       | Type            |
| :------------------------- | :-------------- |
| `__namedParameters`        | _object_        |
| `__namedParameters.planet` | LocatablePlanet |

**Returns:** _Element_
