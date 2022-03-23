# Module: Backend/GameLogic/ArrivalUtils

## Table of contents

### Interfaces

- [PlanetDiff](../interfaces/Backend_GameLogic_ArrivalUtils.PlanetDiff.md)

### Functions

- [applyUpgrade](Backend_GameLogic_ArrivalUtils.md#applyupgrade)
- [arrive](Backend_GameLogic_ArrivalUtils.md#arrive)
- [blocksLeftToProspectExpiration](Backend_GameLogic_ArrivalUtils.md#blockslefttoprospectexpiration)
- [getEmojiMessage](Backend_GameLogic_ArrivalUtils.md#getemojimessage)
- [isFindable](Backend_GameLogic_ArrivalUtils.md#isfindable)
- [isProspectable](Backend_GameLogic_ArrivalUtils.md#isprospectable)
- [prospectExpired](Backend_GameLogic_ArrivalUtils.md#prospectexpired)
- [updatePlanetToTime](Backend_GameLogic_ArrivalUtils.md#updateplanettotime)

## Functions

### applyUpgrade

▸ **applyUpgrade**(`planet`, `upgrade`, `unApply?`): `void`

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

▸ **arrive**(`toPlanet`, `artifactsOnPlanet`, `arrival`, `arrivingArtifact`, `contractConstants`): [`PlanetDiff`](../interfaces/Backend_GameLogic_ArrivalUtils.PlanetDiff.md)

#### Parameters

| Name                | Type                                                                                             |
| :------------------ | :----------------------------------------------------------------------------------------------- |
| `toPlanet`          | `Planet`                                                                                         |
| `artifactsOnPlanet` | `Artifact`[]                                                                                     |
| `arrival`           | `QueuedArrival`                                                                                  |
| `arrivingArtifact`  | `undefined` \| `Artifact`                                                                        |
| `contractConstants` | [`ContractConstants`](../interfaces/types_darkforest_api_ContractsAPITypes.ContractConstants.md) |

#### Returns

[`PlanetDiff`](../interfaces/Backend_GameLogic_ArrivalUtils.PlanetDiff.md)

---

### blocksLeftToProspectExpiration

▸ **blocksLeftToProspectExpiration**(`currentBlockNumber`, `prospectedBlockNumber?`): `number`

#### Parameters

| Name                     | Type     |
| :----------------------- | :------- |
| `currentBlockNumber`     | `number` |
| `prospectedBlockNumber?` | `number` |

#### Returns

`number`

---

### getEmojiMessage

▸ **getEmojiMessage**(`planet`): `PlanetMessage`<`EmojiFlagBody`\> \| `undefined`

**`todo`** ArrivalUtils has become a dumping ground for functions that should just live inside of a
`Planet` class.

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |

#### Returns

`PlanetMessage`<`EmojiFlagBody`\> \| `undefined`

---

### isFindable

▸ **isFindable**(`planet`, `currentBlockNumber?`): `boolean`

#### Parameters

| Name                  | Type     |
| :-------------------- | :------- |
| `planet`              | `Planet` |
| `currentBlockNumber?` | `number` |

#### Returns

`boolean`

---

### isProspectable

▸ **isProspectable**(`planet`): `boolean`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`boolean`

---

### prospectExpired

▸ **prospectExpired**(`currentBlockNumber`, `prospectedBlockNumber`): `boolean`

#### Parameters

| Name                    | Type     |
| :---------------------- | :------- |
| `currentBlockNumber`    | `number` |
| `prospectedBlockNumber` | `number` |

#### Returns

`boolean`

---

### updatePlanetToTime

▸ **updatePlanetToTime**(`planet`, `planetArtifacts`, `atTimeMillis`, `contractConstants`, `setPlanet?`): `void`

#### Parameters

| Name                | Type                                                                                             |
| :------------------ | :----------------------------------------------------------------------------------------------- |
| `planet`            | `Planet`                                                                                         |
| `planetArtifacts`   | `Artifact`[]                                                                                     |
| `atTimeMillis`      | `number`                                                                                         |
| `contractConstants` | [`ContractConstants`](../interfaces/types_darkforest_api_ContractsAPITypes.ContractConstants.md) |
| `setPlanet`         | (`p`: `Planet`) => `void`                                                                        |

#### Returns

`void`
