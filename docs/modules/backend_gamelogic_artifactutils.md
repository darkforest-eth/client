# Module: Backend/GameLogic/ArtifactUtils

## Table of contents

### Enumerations

- [ArtifactFileColor](../enums/backend_gamelogic_artifactutils.artifactfilecolor.md)

### Interfaces

- [RenderedArtifact](../interfaces/backend_gamelogic_artifactutils.renderedartifact.md)

### Variables

- [RelicsList](backend_gamelogic_artifactutils.md#relicslist)

### Functions

- [artifactAvailableTimestamp](backend_gamelogic_artifactutils.md#artifactavailabletimestamp)
- [artifactBiomeName](backend_gamelogic_artifactutils.md#artifactbiomename)
- [artifactFileName](backend_gamelogic_artifactutils.md#artifactfilename)
- [artifactRoll](backend_gamelogic_artifactutils.md#artifactroll)
- [biomeName](backend_gamelogic_artifactutils.md#biomename)
- [getActivatedArtifact](backend_gamelogic_artifactutils.md#getactivatedartifact)
- [getActiveBlackDomain](backend_gamelogic_artifactutils.md#getactiveblackdomain)
- [getArtifactDebugName](backend_gamelogic_artifactutils.md#getartifactdebugname)
- [hasUnconfirmedArtifactTx](backend_gamelogic_artifactutils.md#hasunconfirmedartifacttx)
- [isActivated](backend_gamelogic_artifactutils.md#isactivated)
- [isAncient](backend_gamelogic_artifactutils.md#isancient)
- [isBasic](backend_gamelogic_artifactutils.md#isbasic)
- [isRelic](backend_gamelogic_artifactutils.md#isrelic)
- [levelFromRarity](backend_gamelogic_artifactutils.md#levelfromrarity)
- [rarityName](backend_gamelogic_artifactutils.md#rarityname)
- [rarityNameFromArtifact](backend_gamelogic_artifactutils.md#raritynamefromartifact)
- [setForceAncient](backend_gamelogic_artifactutils.md#setforceancient)

## Variables

### RelicsList

• `Const` **RelicsList**: ArtifactType[]

## Functions

### artifactAvailableTimestamp

▸ **artifactAvailableTimestamp**(`artifact`: Artifact): _number_

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `artifact` | Artifact |

**Returns:** _number_

---

### artifactBiomeName

▸ **artifactBiomeName**(`artifact`: Artifact): _string_

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `artifact` | Artifact |

**Returns:** _string_

---

### artifactFileName

▸ **artifactFileName**(`videoMode`: _boolean_, `thumb`: _boolean_, `artifact`: [_RenderedArtifact_](../interfaces/backend_gamelogic_artifactutils.renderedartifact.md), `color`: [_ArtifactFileColor_](../enums/backend_gamelogic_artifactutils.artifactfilecolor.md), `debugProps?`: { `forceAncient`: _boolean_ ; `skipCaching`: _boolean_ } \| _undefined_): _string_

#### Parameters

| Name         | Type                                                                                    |
| :----------- | :-------------------------------------------------------------------------------------- |
| `videoMode`  | _boolean_                                                                               |
| `thumb`      | _boolean_                                                                               |
| `artifact`   | [_RenderedArtifact_](../interfaces/backend_gamelogic_artifactutils.renderedartifact.md) |
| `color`      | [_ArtifactFileColor_](../enums/backend_gamelogic_artifactutils.artifactfilecolor.md)    |
| `debugProps` | { `forceAncient`: _boolean_ ; `skipCaching`: _boolean_ } \| _undefined_                 |

**Returns:** _string_

---

### artifactRoll

▸ **artifactRoll**(`id`: ArtifactId): _number_

Convert an `artifactId` to an int in [0, 255]

#### Parameters

| Name | Type       |
| :--- | :--------- |
| `id` | ArtifactId |

**Returns:** _number_

---

### biomeName

▸ `Const` **biomeName**(`biome`: Biome): _string_

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `biome` | Biome |

**Returns:** _string_

---

### getActivatedArtifact

▸ **getActivatedArtifact**(`artifacts`: Artifact[]): Artifact \| _undefined_

#### Parameters

| Name        | Type       |
| :---------- | :--------- |
| `artifacts` | Artifact[] |

**Returns:** Artifact \| _undefined_

---

### getActiveBlackDomain

▸ **getActiveBlackDomain**(`artifacts`: Artifact[]): Artifact \| _undefined_

#### Parameters

| Name        | Type       |
| :---------- | :--------- |
| `artifacts` | Artifact[] |

**Returns:** Artifact \| _undefined_

---

### getArtifactDebugName

▸ **getArtifactDebugName**(`a?`: Artifact): _string_

#### Parameters

| Name | Type     |
| :--- | :------- |
| `a?` | Artifact |

**Returns:** _string_

---

### hasUnconfirmedArtifactTx

▸ `Const` **hasUnconfirmedArtifactTx**(`p`: _undefined_ \| Planet): _boolean_

#### Parameters

| Name | Type                  |
| :--- | :-------------------- |
| `p`  | _undefined_ \| Planet |

**Returns:** _boolean_

---

### isActivated

▸ **isActivated**(`artifact`: Artifact \| _undefined_): _boolean_

#### Parameters

| Name       | Type                    |
| :--------- | :---------------------- |
| `artifact` | Artifact \| _undefined_ |

**Returns:** _boolean_

---

### isAncient

▸ **isAncient**(`artifact`: [_RenderedArtifact_](../interfaces/backend_gamelogic_artifactutils.renderedartifact.md)): _boolean_

#### Parameters

| Name       | Type                                                                                    |
| :--------- | :-------------------------------------------------------------------------------------- |
| `artifact` | [_RenderedArtifact_](../interfaces/backend_gamelogic_artifactutils.renderedartifact.md) |

**Returns:** _boolean_

---

### isBasic

▸ **isBasic**(`type`: ArtifactType): _boolean_

#### Parameters

| Name   | Type         |
| :----- | :----------- |
| `type` | ArtifactType |

**Returns:** _boolean_

---

### isRelic

▸ **isRelic**(`type`: ArtifactType): _boolean_

#### Parameters

| Name   | Type         |
| :----- | :----------- |
| `type` | ArtifactType |

**Returns:** _boolean_

---

### levelFromRarity

▸ `Const` **levelFromRarity**(`rarity`: ArtifactRarity): PlanetLevel

#### Parameters

| Name     | Type           |
| :------- | :------------- |
| `rarity` | ArtifactRarity |

**Returns:** PlanetLevel

---

### rarityName

▸ `Const` **rarityName**(`rarity`: ArtifactRarity): _string_

#### Parameters

| Name     | Type           |
| :------- | :------------- |
| `rarity` | ArtifactRarity |

**Returns:** _string_

---

### rarityNameFromArtifact

▸ `Const` **rarityNameFromArtifact**(`a`: Artifact): _string_

#### Parameters

| Name | Type     |
| :--- | :------- |
| `a`  | Artifact |

**Returns:** _string_

---

### setForceAncient

▸ **setForceAncient**(`force`: _boolean_): _void_

Really, really shitty workaround to add a `return true` or `return false` to the above `isAncient`. Used in `GifRenderer.ts`

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `force` | _boolean_ |

**Returns:** _void_
