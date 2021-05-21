# Module: Backend/Procedural/ArtifactProcgen

## Table of contents

### Variables

- [mockCommon](backend_procedural_artifactprocgen.md#mockcommon)
- [mockEpic](backend_procedural_artifactprocgen.md#mockepic)
- [mockLegendary](backend_procedural_artifactprocgen.md#mocklegendary)
- [mockRare](backend_procedural_artifactprocgen.md#mockrare)

### Functions

- [artifactBiomeAndName](backend_procedural_artifactprocgen.md#artifactbiomeandname)
- [artifactName](backend_procedural_artifactprocgen.md#artifactname)
- [dateMintedAt](backend_procedural_artifactprocgen.md#datemintedat)
- [mockArtifact](backend_procedural_artifactprocgen.md#mockartifact)
- [mockArtifactWithRarity](backend_procedural_artifactprocgen.md#mockartifactwithrarity)

## Variables

### mockCommon

• `Const` **mockCommon**: Artifact

---

### mockEpic

• `Const` **mockEpic**: Artifact

---

### mockLegendary

• `Const` **mockLegendary**: Artifact

---

### mockRare

• `Const` **mockRare**: Artifact

## Functions

### artifactBiomeAndName

▸ `Const` **artifactBiomeAndName**(`artifact`: _undefined_ \| Artifact): _string_

#### Parameters

| Name       | Type                    |
| :--------- | :---------------------- |
| `artifact` | _undefined_ \| Artifact |

**Returns:** _string_

---

### artifactName

▸ `Const` **artifactName**(`artifact`: _undefined_ \| Artifact): _string_

#### Parameters

| Name       | Type                    |
| :--------- | :---------------------- |
| `artifact` | _undefined_ \| Artifact |

**Returns:** _string_

---

### dateMintedAt

▸ `Const` **dateMintedAt**(`artifact`: _undefined_ \| Artifact): _string_

#### Parameters

| Name       | Type                    |
| :--------- | :---------------------- |
| `artifact` | _undefined_ \| Artifact |

**Returns:** _string_

---

### mockArtifact

▸ `Const` **mockArtifact**(`rarity`: ArtifactRarity, `artifactType?`: ArtifactType, `planetBiome?`: Biome): Artifact

#### Parameters

| Name           | Type           |
| :------------- | :------------- |
| `rarity`       | ArtifactRarity |
| `artifactType` | ArtifactType   |
| `planetBiome`  | Biome          |

**Returns:** Artifact

---

### mockArtifactWithRarity

▸ `Const` **mockArtifactWithRarity**(`rarity`: ArtifactRarity, `artifactType?`: ArtifactType, `planetBiome?`: Biome): Artifact

#### Parameters

| Name           | Type           |
| :------------- | :------------- |
| `rarity`       | ArtifactRarity |
| `artifactType` | ArtifactType   |
| `planetBiome`  | Biome          |

**Returns:** Artifact
