# Module: \_types/darkforest/api/ContractsAPITypes

## Table of contents

### Enumerations

- [ContractEvent](../enums/_types_darkforest_api_ContractsAPITypes.ContractEvent.md)
- [ContractsAPIEvent](../enums/_types_darkforest_api_ContractsAPITypes.ContractsAPIEvent.md)
- [InitArgIdxs](../enums/_types_darkforest_api_ContractsAPITypes.InitArgIdxs.md)
- [MoveArgIdxs](../enums/_types_darkforest_api_ContractsAPITypes.MoveArgIdxs.md)
- [PlanetEventType](../enums/_types_darkforest_api_ContractsAPITypes.PlanetEventType.md)
- [UpgradeArgIdxs](../enums/_types_darkforest_api_ContractsAPITypes.UpgradeArgIdxs.md)
- [ZKArgIdx](../enums/_types_darkforest_api_ContractsAPITypes.ZKArgIdx.md)

### Interfaces

- [ContractConstants](../interfaces/_types_darkforest_api_ContractsAPITypes.ContractConstants.md)

### Type aliases

- [ClaimArgs](_types_darkforest_api_ContractsAPITypes.md#claimargs)
- [ClientMockchainData](_types_darkforest_api_ContractsAPITypes.md#clientmockchaindata)
- [DepositArtifactArgs](_types_darkforest_api_ContractsAPITypes.md#depositartifactargs)
- [MoveArgs](_types_darkforest_api_ContractsAPITypes.md#moveargs)
- [PlanetTypeWeights](_types_darkforest_api_ContractsAPITypes.md#planettypeweights)
- [PlanetTypeWeightsByLevel](_types_darkforest_api_ContractsAPITypes.md#planettypeweightsbylevel)
- [PlanetTypeWeightsBySpaceType](_types_darkforest_api_ContractsAPITypes.md#planettypeweightsbyspacetype)
- [UpgradeArgs](_types_darkforest_api_ContractsAPITypes.md#upgradeargs)
- [WithdrawArtifactArgs](_types_darkforest_api_ContractsAPITypes.md#withdrawartifactargs)

## Type aliases

### ClaimArgs

Ƭ **ClaimArgs**: [[`string`, `string`], [[`string`, `string`], [`string`, `string`]], [`string`, `string`], [`string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`]]

---

### ClientMockchainData

Ƭ **ClientMockchainData**: `null` \| `undefined` \| `number` \| `string` \| `boolean` \| `EthersBN` \| [`ClientMockchainData`](_types_darkforest_api_ContractsAPITypes.md#clientmockchaindata)[] \| { [key in string \| number]: ClientMockchainData}

---

### DepositArtifactArgs

Ƭ **DepositArtifactArgs**: [`string`, `string`]

---

### MoveArgs

Ƭ **MoveArgs**: [[`string`, `string`], [[`string`, `string`], [`string`, `string`]], [`string`, `string`], [`string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`]]

---

### PlanetTypeWeights

Ƭ **PlanetTypeWeights**: [`number`, `number`, `number`, `number`, `number`]

---

### PlanetTypeWeightsByLevel

Ƭ **PlanetTypeWeightsByLevel**: [[`PlanetTypeWeights`](_types_darkforest_api_ContractsAPITypes.md#planettypeweights), [`PlanetTypeWeights`](_types_darkforest_api_ContractsAPITypes.md#planettypeweights), [`PlanetTypeWeights`](_types_darkforest_api_ContractsAPITypes.md#planettypeweights), [`PlanetTypeWeights`](_types_darkforest_api_ContractsAPITypes.md#planettypeweights), [`PlanetTypeWeights`](_types_darkforest_api_ContractsAPITypes.md#planettypeweights), [`PlanetTypeWeights`](_types_darkforest_api_ContractsAPITypes.md#planettypeweights), [`PlanetTypeWeights`](_types_darkforest_api_ContractsAPITypes.md#planettypeweights), [`PlanetTypeWeights`](_types_darkforest_api_ContractsAPITypes.md#planettypeweights), [`PlanetTypeWeights`](_types_darkforest_api_ContractsAPITypes.md#planettypeweights), [`PlanetTypeWeights`](_types_darkforest_api_ContractsAPITypes.md#planettypeweights)]

---

### PlanetTypeWeightsBySpaceType

Ƭ **PlanetTypeWeightsBySpaceType**: [[`PlanetTypeWeightsByLevel`](_types_darkforest_api_ContractsAPITypes.md#planettypeweightsbylevel), [`PlanetTypeWeightsByLevel`](_types_darkforest_api_ContractsAPITypes.md#planettypeweightsbylevel), [`PlanetTypeWeightsByLevel`](_types_darkforest_api_ContractsAPITypes.md#planettypeweightsbylevel), [`PlanetTypeWeightsByLevel`](_types_darkforest_api_ContractsAPITypes.md#planettypeweightsbylevel)]

---

### UpgradeArgs

Ƭ **UpgradeArgs**: [`string`, `string`]

---

### WithdrawArtifactArgs

Ƭ **WithdrawArtifactArgs**: [`string`, `string`]
