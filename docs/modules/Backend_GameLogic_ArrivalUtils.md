# Module: Backend/GameLogic/ArrivalUtils

## Table of contents

### Interfaces

- [PlanetDiff](../interfaces/Backend_GameLogic_ArrivalUtils.PlanetDiff.md)

### Functions

- [applyUpgrade](Backend_GameLogic_ArrivalUtils.md#applyupgrade)
- [arrive](Backend_GameLogic_ArrivalUtils.md#arrive)
- [blocksLeftToProspectExpiration](Backend_GameLogic_ArrivalUtils.md#blockslefttoprospectexpiration)
- [enoughEnergyToProspect](Backend_GameLogic_ArrivalUtils.md#enoughenergytoprospect)
- [getEmojiMessage](Backend_GameLogic_ArrivalUtils.md#getemojimessage)
- [getRange](Backend_GameLogic_ArrivalUtils.md#getrange)
- [isFindable](Backend_GameLogic_ArrivalUtils.md#isfindable)
- [isProspectable](Backend_GameLogic_ArrivalUtils.md#isprospectable)
- [prospectExpired](Backend_GameLogic_ArrivalUtils.md#prospectexpired)
- [updatePlanetToTime](Backend_GameLogic_ArrivalUtils.md#updateplanettotime)

## Functions

### applyUpgrade

▸ `Const` **applyUpgrade**(`planet`, `upgrade`, `unApply?`): `void`

#### Parameters

| Name      | Type      | Default value |
| :-------- | :-------- | :------------ |
| `planet`  | `Planet`  | `undefined`   |
| `upgrade` | `Upgrade` | `undefined`   |
| `unApply` | `boolean` | `false`       |

#### Returns

`void`

---

### arrive

▸ `Const` **arrive**(`toPlanet`, `artifactsOnPlanet`, `arrival`, `contractConstants`): [`PlanetDiff`](../interfaces/Backend_GameLogic_ArrivalUtils.PlanetDiff.md)

#### Parameters

| Name                | Type                                                                                              |
| :------------------ | :------------------------------------------------------------------------------------------------ |
| `toPlanet`          | `Planet`                                                                                          |
| `artifactsOnPlanet` | `Artifact`[]                                                                                      |
| `arrival`           | `QueuedArrival`                                                                                   |
| `contractConstants` | [`ContractConstants`](../interfaces/_types_darkforest_api_ContractsAPITypes.ContractConstants.md) |

#### Returns

[`PlanetDiff`](../interfaces/Backend_GameLogic_ArrivalUtils.PlanetDiff.md)

---

### blocksLeftToProspectExpiration

▸ `Const` **blocksLeftToProspectExpiration**(`currentBlockNumber`, `prospectedBlockNumber?`): `number`

#### Parameters

| Name                     | Type     |
| :----------------------- | :------- |
| `currentBlockNumber`     | `number` |
| `prospectedBlockNumber?` | `number` |

#### Returns

`number`

---

### enoughEnergyToProspect

▸ `Const` **enoughEnergyToProspect**(`p`): `boolean`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `p`  | `Planet` |

#### Returns

`boolean`

---

### getEmojiMessage

▸ **getEmojiMessage**(`planet`): `PlanetMessage`<`EmojiFlagBody`\> \| `undefined`

**`todo`** ArrivalUtils has become a dumping ground for functions that should just live inside of a
`Planet` class.

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `Planet` \| `undefined` |

#### Returns

`PlanetMessage`<`EmojiFlagBody`\> \| `undefined`

---

### getRange

▸ **getRange**(`planet`, `percentEnergySending?`): `number`

**`todo`** - planet class

#### Parameters

| Name                   | Type     | Default value |
| :--------------------- | :------- | :------------ |
| `planet`               | `Planet` | `undefined`   |
| `percentEnergySending` | `number` | `100`         |

#### Returns

`number`

---

### isFindable

▸ `Const` **isFindable**(`planet`, `currentBlockNumber?`): `boolean`

#### Parameters

| Name                  | Type     |
| :-------------------- | :------- |
| `planet`              | `Planet` |
| `currentBlockNumber?` | `number` |

#### Returns

`boolean`

---

### isProspectable

▸ `Const` **isProspectable**(`planet`): `boolean`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`boolean`

---

### prospectExpired

▸ `Const` **prospectExpired**(`currentBlockNumber`, `prospectedBlockNumber`): `boolean`

#### Parameters

| Name                    | Type     |
| :---------------------- | :------- |
| `currentBlockNumber`    | `number` |
| `prospectedBlockNumber` | `number` |

#### Returns

`boolean`

---

### updatePlanetToTime

▸ `Const` **updatePlanetToTime**(`planet`, `planetArtifacts`, `atTimeMillis`, `contractConstants`, `setPlanet?`): `void`

#### Parameters

| Name                | Type                                                                                              |
| :------------------ | :------------------------------------------------------------------------------------------------ |
| `planet`            | `Planet`                                                                                          |
| `planetArtifacts`   | `Artifact`[]                                                                                      |
| `atTimeMillis`      | `number`                                                                                          |
| `contractConstants` | [`ContractConstants`](../interfaces/_types_darkforest_api_ContractsAPITypes.ContractConstants.md) |
| `setPlanet`         | (`p`: `Planet`) => `void`                                                                         |

#### Returns

`void`
