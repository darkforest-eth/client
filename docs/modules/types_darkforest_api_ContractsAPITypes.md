# Module: \_types/darkforest/api/ContractsAPITypes

## Table of contents

### Enumerations

- [ContractEvent](../enums/types_darkforest_api_ContractsAPITypes.ContractEvent.md)
- [ContractsAPIEvent](../enums/types_darkforest_api_ContractsAPITypes.ContractsAPIEvent.md)
- [InitArgIdxs](../enums/types_darkforest_api_ContractsAPITypes.InitArgIdxs.md)
- [MoveArgIdxs](../enums/types_darkforest_api_ContractsAPITypes.MoveArgIdxs.md)
- [PlanetEventType](../enums/types_darkforest_api_ContractsAPITypes.PlanetEventType.md)
- [UpgradeArgIdxs](../enums/types_darkforest_api_ContractsAPITypes.UpgradeArgIdxs.md)
- [ZKArgIdx](../enums/types_darkforest_api_ContractsAPITypes.ZKArgIdx.md)

### Interfaces

- [ContractConstants](../interfaces/types_darkforest_api_ContractsAPITypes.ContractConstants.md)

### Type aliases

- [ClaimArgs](types_darkforest_api_ContractsAPITypes.md#claimargs)
- [ClientMockchainData](types_darkforest_api_ContractsAPITypes.md#clientmockchaindata)
- [DepositArtifactArgs](types_darkforest_api_ContractsAPITypes.md#depositartifactargs)
- [MoveArgs](types_darkforest_api_ContractsAPITypes.md#moveargs)
- [PlanetTypeWeights](types_darkforest_api_ContractsAPITypes.md#planettypeweights)
- [PlanetTypeWeightsByLevel](types_darkforest_api_ContractsAPITypes.md#planettypeweightsbylevel)
- [PlanetTypeWeightsBySpaceType](types_darkforest_api_ContractsAPITypes.md#planettypeweightsbyspacetype)
- [UpgradeArgs](types_darkforest_api_ContractsAPITypes.md#upgradeargs)
- [WhitelistArgs](types_darkforest_api_ContractsAPITypes.md#whitelistargs)
- [WithdrawArtifactArgs](types_darkforest_api_ContractsAPITypes.md#withdrawartifactargs)

## Type aliases

### ClaimArgs

Ƭ **ClaimArgs**: [[`string`, `string`], [[`string`, `string`], [`string`, `string`]], [`string`, `string`], [`string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`]]

---

### ClientMockchainData

Ƭ **ClientMockchainData**: `null` \| `undefined` \| `number` \| `string` \| `boolean` \| `EthersBN` \| [`ClientMockchainData`](types_darkforest_api_ContractsAPITypes.md#clientmockchaindata)[] \| { [key in string \| number]: ClientMockchainData }

---

### DepositArtifactArgs

Ƭ **DepositArtifactArgs**: [`string`, `string`]

---

### MoveArgs

Ƭ **MoveArgs**: [[`string`, `string`], [[`string`, `string`], [`string`, `string`]], [`string`, `string`], [`string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`, `string`]]

---

### PlanetTypeWeights

Ƭ **PlanetTypeWeights**: [`number`, `number`, `number`, `number`, `number`]

---

### PlanetTypeWeightsByLevel

Ƭ **PlanetTypeWeightsByLevel**: [[`PlanetTypeWeights`](types_darkforest_api_ContractsAPITypes.md#planettypeweights), [`PlanetTypeWeights`](types_darkforest_api_ContractsAPITypes.md#planettypeweights), [`PlanetTypeWeights`](types_darkforest_api_ContractsAPITypes.md#planettypeweights), [`PlanetTypeWeights`](types_darkforest_api_ContractsAPITypes.md#planettypeweights), [`PlanetTypeWeights`](types_darkforest_api_ContractsAPITypes.md#planettypeweights), [`PlanetTypeWeights`](types_darkforest_api_ContractsAPITypes.md#planettypeweights), [`PlanetTypeWeights`](types_darkforest_api_ContractsAPITypes.md#planettypeweights), [`PlanetTypeWeights`](types_darkforest_api_ContractsAPITypes.md#planettypeweights), [`PlanetTypeWeights`](types_darkforest_api_ContractsAPITypes.md#planettypeweights), [`PlanetTypeWeights`](types_darkforest_api_ContractsAPITypes.md#planettypeweights)]

---

### PlanetTypeWeightsBySpaceType

Ƭ **PlanetTypeWeightsBySpaceType**: [[`PlanetTypeWeightsByLevel`](types_darkforest_api_ContractsAPITypes.md#planettypeweightsbylevel), [`PlanetTypeWeightsByLevel`](types_darkforest_api_ContractsAPITypes.md#planettypeweightsbylevel), [`PlanetTypeWeightsByLevel`](types_darkforest_api_ContractsAPITypes.md#planettypeweightsbylevel), [`PlanetTypeWeightsByLevel`](types_darkforest_api_ContractsAPITypes.md#planettypeweightsbylevel)]

---

### UpgradeArgs

Ƭ **UpgradeArgs**: [`string`, `string`]

---

### WhitelistArgs

Ƭ **WhitelistArgs**: [`string`, `string`]

---

### WithdrawArtifactArgs

Ƭ **WithdrawArtifactArgs**: [`string`, `string`]
