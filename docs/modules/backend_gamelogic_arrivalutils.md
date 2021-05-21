# Module: Backend/GameLogic/ArrivalUtils

## Table of contents

### Functions

- [applyUpgrade](backend_gamelogic_arrivalutils.md#applyupgrade)
- [arrive](backend_gamelogic_arrivalutils.md#arrive)
- [blocksLeftToProspectExpiration](backend_gamelogic_arrivalutils.md#blockslefttoprospectexpiration)
- [isFindable](backend_gamelogic_arrivalutils.md#isfindable)
- [isProspectable](backend_gamelogic_arrivalutils.md#isprospectable)
- [prospectExpired](backend_gamelogic_arrivalutils.md#prospectexpired)
- [updatePlanetToTime](backend_gamelogic_arrivalutils.md#updateplanettotime)

## Functions

### applyUpgrade

▸ `Const` **applyUpgrade**(`planet`: Planet, `upgrade`: Upgrade, `unApply?`: _boolean_): _void_

#### Parameters

| Name      | Type      | Default value |
| :-------- | :-------- | :------------ |
| `planet`  | Planet    | -             |
| `upgrade` | Upgrade   | -             |
| `unApply` | _boolean_ | false         |

**Returns:** _void_

---

### arrive

▸ `Const` **arrive**(`toPlanet`: Planet, `artifactsOnPlanet`: Artifact[], `arrival`: QueuedArrival, `contractConstants`: [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md)): _void_

#### Parameters

| Name                | Type                                                                                              |
| :------------------ | :------------------------------------------------------------------------------------------------ |
| `toPlanet`          | Planet                                                                                            |
| `artifactsOnPlanet` | Artifact[]                                                                                        |
| `arrival`           | QueuedArrival                                                                                     |
| `contractConstants` | [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md) |

**Returns:** _void_

---

### blocksLeftToProspectExpiration

▸ `Const` **blocksLeftToProspectExpiration**(`currentBlockNumber`: _number_, `prospectedBlockNumber?`: _number_): _number_

#### Parameters

| Name                     | Type     |
| :----------------------- | :------- |
| `currentBlockNumber`     | _number_ |
| `prospectedBlockNumber?` | _number_ |

**Returns:** _number_

---

### isFindable

▸ `Const` **isFindable**(`planet`: Planet, `currentBlockNumber?`: _number_): _boolean_

#### Parameters

| Name                  | Type     |
| :-------------------- | :------- |
| `planet`              | Planet   |
| `currentBlockNumber?` | _number_ |

**Returns:** _boolean_

---

### isProspectable

▸ `Const` **isProspectable**(`planet`: Planet): _boolean_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _boolean_

---

### prospectExpired

▸ `Const` **prospectExpired**(`currentBlockNumber`: _number_, `prospectedBlockNumber`: _number_): _boolean_

#### Parameters

| Name                    | Type     |
| :---------------------- | :------- |
| `currentBlockNumber`    | _number_ |
| `prospectedBlockNumber` | _number_ |

**Returns:** _boolean_

---

### updatePlanetToTime

▸ `Const` **updatePlanetToTime**(`planet`: Planet, `planetArtifacts`: Artifact[], `atTimeMillis`: _number_, `contractConstants`: [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md), `setPlanet?`: (`p`: Planet) => _void_): _void_

#### Parameters

| Name                | Type                                                                                              |
| :------------------ | :------------------------------------------------------------------------------------------------ |
| `planet`            | Planet                                                                                            |
| `planetArtifacts`   | Artifact[]                                                                                        |
| `atTimeMillis`      | _number_                                                                                          |
| `contractConstants` | [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md) |
| `setPlanet`         | (`p`: Planet) => _void_                                                                           |

**Returns:** _void_
