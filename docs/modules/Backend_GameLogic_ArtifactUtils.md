# Module: Backend/GameLogic/ArtifactUtils

## Table of contents

### Enumerations

- [ArtifactFileColor](../enums/Backend_GameLogic_ArtifactUtils.ArtifactFileColor.md)

### Interfaces

- [RenderedArtifact](../interfaces/Backend_GameLogic_ArtifactUtils.RenderedArtifact.md)

### Variables

- [RelicsList](Backend_GameLogic_ArtifactUtils.md#relicslist)

### Functions

- [artifactAvailableTimestamp](Backend_GameLogic_ArtifactUtils.md#artifactavailabletimestamp)
- [artifactBiomeName](Backend_GameLogic_ArtifactUtils.md#artifactbiomename)
- [artifactFileName](Backend_GameLogic_ArtifactUtils.md#artifactfilename)
- [artifactRoll](Backend_GameLogic_ArtifactUtils.md#artifactroll)
- [biomeName](Backend_GameLogic_ArtifactUtils.md#biomename)
- [getActivatedArtifact](Backend_GameLogic_ArtifactUtils.md#getactivatedartifact)
- [getActiveBlackDomain](Backend_GameLogic_ArtifactUtils.md#getactiveblackdomain)
- [getArtifactDebugName](Backend_GameLogic_ArtifactUtils.md#getartifactdebugname)
- [hasUnconfirmedArtifactTx](Backend_GameLogic_ArtifactUtils.md#hasunconfirmedartifacttx)
- [isActivated](Backend_GameLogic_ArtifactUtils.md#isactivated)
- [isAncient](Backend_GameLogic_ArtifactUtils.md#isancient)
- [isBasic](Backend_GameLogic_ArtifactUtils.md#isbasic)
- [isRelic](Backend_GameLogic_ArtifactUtils.md#isrelic)
- [levelFromRarity](Backend_GameLogic_ArtifactUtils.md#levelfromrarity)
- [rarityName](Backend_GameLogic_ArtifactUtils.md#rarityname)
- [rarityNameFromArtifact](Backend_GameLogic_ArtifactUtils.md#raritynamefromartifact)
- [setForceAncient](Backend_GameLogic_ArtifactUtils.md#setforceancient)

## Variables

### RelicsList

• `Const` **RelicsList**: `ArtifactType`[]

## Functions

### artifactAvailableTimestamp

▸ **artifactAvailableTimestamp**(`artifact`): `number`

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `artifact` | `Artifact` |

#### Returns

`number`

---

### artifactBiomeName

▸ **artifactBiomeName**(`artifact`): `string`

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `artifact` | `Artifact` |

#### Returns

`string`

---

### artifactFileName

▸ **artifactFileName**(`videoMode`, `thumb`, `artifact`, `color`, `debugProps?`): `string`

#### Parameters

| Name         | Type                                                                                    |
| :----------- | :-------------------------------------------------------------------------------------- |
| `videoMode`  | `boolean`                                                                               |
| `thumb`      | `boolean`                                                                               |
| `artifact`   | [`RenderedArtifact`](../interfaces/Backend_GameLogic_ArtifactUtils.RenderedArtifact.md) |
| `color`      | [`ArtifactFileColor`](../enums/Backend_GameLogic_ArtifactUtils.ArtifactFileColor.md)    |
| `debugProps` | { `forceAncient`: `boolean` ; `skipCaching`: `boolean` } \| `undefined`                 |

#### Returns

`string`

---

### artifactRoll

▸ **artifactRoll**(`id`): `number`

Convert an `artifactId` to an int in [0, 255]

#### Parameters

| Name | Type         |
| :--- | :----------- |
| `id` | `ArtifactId` |

#### Returns

`number`

---

### biomeName

▸ `Const` **biomeName**(`biome`): `string`

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `biome` | `Biome` |

#### Returns

`string`

---

### getActivatedArtifact

▸ **getActivatedArtifact**(`artifacts`): `Artifact` \| `undefined`

#### Parameters

| Name        | Type         |
| :---------- | :----------- |
| `artifacts` | `Artifact`[] |

#### Returns

`Artifact` \| `undefined`

---

### getActiveBlackDomain

▸ **getActiveBlackDomain**(`artifacts`): `Artifact` \| `undefined`

#### Parameters

| Name        | Type         |
| :---------- | :----------- |
| `artifacts` | `Artifact`[] |

#### Returns

`Artifact` \| `undefined`

---

### getArtifactDebugName

▸ **getArtifactDebugName**(`a?`): `string`

#### Parameters

| Name | Type       |
| :--- | :--------- |
| `a?` | `Artifact` |

#### Returns

`string`

---

### hasUnconfirmedArtifactTx

▸ `Const` **hasUnconfirmedArtifactTx**(`p`): `boolean`

#### Parameters

| Name | Type                    |
| :--- | :---------------------- |
| `p`  | `undefined` \| `Planet` |

#### Returns

`boolean`

---

### isActivated

▸ **isActivated**(`artifact`): `boolean`

#### Parameters

| Name       | Type                      |
| :--------- | :------------------------ |
| `artifact` | `Artifact` \| `undefined` |

#### Returns

`boolean`

---

### isAncient

▸ **isAncient**(`artifact`): `boolean`

#### Parameters

| Name       | Type                                                                                    |
| :--------- | :-------------------------------------------------------------------------------------- |
| `artifact` | [`RenderedArtifact`](../interfaces/Backend_GameLogic_ArtifactUtils.RenderedArtifact.md) |

#### Returns

`boolean`

---

### isBasic

▸ **isBasic**(`type`): `boolean`

#### Parameters

| Name   | Type           |
| :----- | :------------- |
| `type` | `ArtifactType` |

#### Returns

`boolean`

---

### isRelic

▸ **isRelic**(`type`): `boolean`

#### Parameters

| Name   | Type           |
| :----- | :------------- |
| `type` | `ArtifactType` |

#### Returns

`boolean`

---

### levelFromRarity

▸ `Const` **levelFromRarity**(`rarity`): `PlanetLevel`

#### Parameters

| Name     | Type             |
| :------- | :--------------- |
| `rarity` | `ArtifactRarity` |

#### Returns

`PlanetLevel`

---

### rarityName

▸ `Const` **rarityName**(`rarity`): `string`

#### Parameters

| Name     | Type             |
| :------- | :--------------- |
| `rarity` | `ArtifactRarity` |

#### Returns

`string`

---

### rarityNameFromArtifact

▸ `Const` **rarityNameFromArtifact**(`a`): `string`

#### Parameters

| Name | Type       |
| :--- | :--------- |
| `a`  | `Artifact` |

#### Returns

`string`

---

### setForceAncient

▸ **setForceAncient**(`force`): `void`

Really, really shitty workaround to add a `return true` or `return false` to the above `isAncient`. Used in `GifRenderer.ts`

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `force` | `boolean` |

#### Returns

`void`
