# Module: Frontend/Components/Labels/PlanetLabels

## Table of contents

### Functions

- [DefenseText](Frontend_Components_Labels_PlanetLabels.md#defensetext)
- [EnergyCapText](Frontend_Components_Labels_PlanetLabels.md#energycaptext)
- [EnergyGrowthText](Frontend_Components_Labels_PlanetLabels.md#energygrowthtext)
- [EnergyText](Frontend_Components_Labels_PlanetLabels.md#energytext)
- [GrowthText](Frontend_Components_Labels_PlanetLabels.md#growthtext)
- [JunkText](Frontend_Components_Labels_PlanetLabels.md#junktext)
- [LevelRankText](Frontend_Components_Labels_PlanetLabels.md#levelranktext)
- [LevelRankTextEm](Frontend_Components_Labels_PlanetLabels.md#levelranktextem)
- [PlanetBiomeTypeLabelAnim](Frontend_Components_Labels_PlanetLabels.md#planetbiometypelabelanim)
- [PlanetEnergyLabel](Frontend_Components_Labels_PlanetLabels.md#planetenergylabel)
- [PlanetLevel](Frontend_Components_Labels_PlanetLabels.md#planetlevel)
- [PlanetLevelText](Frontend_Components_Labels_PlanetLabels.md#planetleveltext)
- [PlanetOwnerLabel](Frontend_Components_Labels_PlanetLabels.md#planetownerlabel)
- [PlanetRank](Frontend_Components_Labels_PlanetLabels.md#planetrank)
- [PlanetRankText](Frontend_Components_Labels_PlanetLabels.md#planetranktext)
- [PlanetSilverLabel](Frontend_Components_Labels_PlanetLabels.md#planetsilverlabel)
- [PlanetTypeLabelAnim](Frontend_Components_Labels_PlanetLabels.md#planettypelabelanim)
- [RangeText](Frontend_Components_Labels_PlanetLabels.md#rangetext)
- [SilverCapText](Frontend_Components_Labels_PlanetLabels.md#silvercaptext)
- [SilverGrowthText](Frontend_Components_Labels_PlanetLabels.md#silvergrowthtext)
- [SilverText](Frontend_Components_Labels_PlanetLabels.md#silvertext)
- [SpeedText](Frontend_Components_Labels_PlanetLabels.md#speedtext)
- [StatText](Frontend_Components_Labels_PlanetLabels.md#stattext)

## Functions

### DefenseText

▸ **DefenseText**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### EnergyCapText

▸ **EnergyCapText**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### EnergyGrowthText

▸ **EnergyGrowthText**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### EnergyText

▸ **EnergyText**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### GrowthText

▸ **GrowthText**(`__namedParameters`): `Element`

#### Parameters

| Name                        | Type                        |
| :-------------------------- | :-------------------------- |
| `__namedParameters`         | `Object`                    |
| `__namedParameters.planet`  | `undefined` \| `Planet`     |
| `__namedParameters.style?`  | `CSSProperties`             |
| `__namedParameters.getStat` | (`p`: `Planet`) => `number` |

#### Returns

`Element`

---

### JunkText

▸ **JunkText**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### LevelRankText

▸ **LevelRankText**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.delim?` | `string`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### LevelRankTextEm

▸ **LevelRankTextEm**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.delim?` | `string`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### PlanetBiomeTypeLabelAnim

▸ **PlanetBiomeTypeLabelAnim**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### PlanetEnergyLabel

▸ **PlanetEnergyLabel**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### PlanetLevel

▸ **PlanetLevel**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### PlanetLevelText

▸ **PlanetLevelText**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### PlanetOwnerLabel

▸ **PlanetOwnerLabel**(`__namedParameters`): `Element`

Either 'yours' in green text,

#### Parameters

| Name                                      | Type                    |
| :---------------------------------------- | :---------------------- |
| `__namedParameters`                       | `Object`                |
| `__namedParameters.abbreviateOwnAddress?` | `boolean`               |
| `__namedParameters.colorWithOwnerColor?`  | `boolean`               |
| `__namedParameters.planet`                | `undefined` \| `Planet` |

#### Returns

`Element`

---

### PlanetRank

▸ **PlanetRank**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### PlanetRankText

▸ **PlanetRankText**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### PlanetSilverLabel

▸ **PlanetSilverLabel**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### PlanetTypeLabelAnim

▸ **PlanetTypeLabelAnim**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### RangeText

▸ **RangeText**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.buff?`  | `number`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### SilverCapText

▸ **SilverCapText**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### SilverGrowthText

▸ **SilverGrowthText**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### SilverText

▸ **SilverText**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### SpeedText

▸ **SpeedText**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                    |
| :------------------------- | :---------------------- |
| `__namedParameters`        | `Object`                |
| `__namedParameters.buff?`  | `number`                |
| `__namedParameters.planet` | `undefined` \| `Planet` |

#### Returns

`Element`

---

### StatText

▸ **StatText**(`__namedParameters`): `Element`

#### Parameters

| Name                        | Type                        |
| :-------------------------- | :-------------------------- |
| `__namedParameters`         | `Object`                    |
| `__namedParameters.buff?`   | `number`                    |
| `__namedParameters.planet`  | `undefined` \| `Planet`     |
| `__namedParameters.style?`  | `CSSProperties`             |
| `__namedParameters.getStat` | (`p`: `Planet`) => `number` |

#### Returns

`Element`
