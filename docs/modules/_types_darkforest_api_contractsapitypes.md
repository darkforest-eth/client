# Module: \_types/darkforest/api/ContractsAPITypes

## Table of contents

### Enumerations

- [ContractEvent](../enums/_types_darkforest_api_contractsapitypes.contractevent.md)
- [ContractsAPIEvent](../enums/_types_darkforest_api_contractsapitypes.contractsapievent.md)
- [InitArgIdxs](../enums/_types_darkforest_api_contractsapitypes.initargidxs.md)
- [MoveArgIdxs](../enums/_types_darkforest_api_contractsapitypes.moveargidxs.md)
- [PlanetEventType](../enums/_types_darkforest_api_contractsapitypes.planeteventtype.md)
- [UpgradeArgIdxs](../enums/_types_darkforest_api_contractsapitypes.upgradeargidxs.md)
- [ZKArgIdx](../enums/_types_darkforest_api_contractsapitypes.zkargidx.md)

### Interfaces

- [ContractConstants](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md)

### Type aliases

- [ClientMockchainData](_types_darkforest_api_contractsapitypes.md#clientmockchaindata)
- [DepositArtifactArgs](_types_darkforest_api_contractsapitypes.md#depositartifactargs)
- [MoveArgs](_types_darkforest_api_contractsapitypes.md#moveargs)
- [PlanetTypeWeights](_types_darkforest_api_contractsapitypes.md#planettypeweights)
- [PlanetTypeWeightsByLevel](_types_darkforest_api_contractsapitypes.md#planettypeweightsbylevel)
- [PlanetTypeWeightsBySpaceType](_types_darkforest_api_contractsapitypes.md#planettypeweightsbyspacetype)
- [UpgradeArgs](_types_darkforest_api_contractsapitypes.md#upgradeargs)
- [WithdrawArtifactArgs](_types_darkforest_api_contractsapitypes.md#withdrawartifactargs)

## Type aliases

### ClientMockchainData

Ƭ **ClientMockchainData**: `null` \| _undefined_ \| _number_ \| _string_ \| _boolean_ \| EthersBN \| [_ClientMockchainData_](_types_darkforest_api_contractsapitypes.md#clientmockchaindata)[] \| { [key in string \| number]: ClientMockchainData}

---

### DepositArtifactArgs

Ƭ **DepositArtifactArgs**: [*string*, *string*]

---

### MoveArgs

Ƭ **MoveArgs**: [[*string*, *string*], [[*string*, *string*], [*string*, *string*]], [*string*, *string*], [*string*, *string*, *string*, *string*, *string*, *string*, *string*, *string*, *string*, *string*, *string*, *string*, *string*]]

---

### PlanetTypeWeights

Ƭ **PlanetTypeWeights**: [*number*, *number*, *number*, *number*, *number*]

---

### PlanetTypeWeightsByLevel

Ƭ **PlanetTypeWeightsByLevel**: [[_PlanetTypeWeights_](_types_darkforest_api_contractsapitypes.md#planettypeweights), [_PlanetTypeWeights_](_types_darkforest_api_contractsapitypes.md#planettypeweights), [_PlanetTypeWeights_](_types_darkforest_api_contractsapitypes.md#planettypeweights), [_PlanetTypeWeights_](_types_darkforest_api_contractsapitypes.md#planettypeweights), [_PlanetTypeWeights_](_types_darkforest_api_contractsapitypes.md#planettypeweights), [_PlanetTypeWeights_](_types_darkforest_api_contractsapitypes.md#planettypeweights), [_PlanetTypeWeights_](_types_darkforest_api_contractsapitypes.md#planettypeweights), [_PlanetTypeWeights_](_types_darkforest_api_contractsapitypes.md#planettypeweights), [_PlanetTypeWeights_](_types_darkforest_api_contractsapitypes.md#planettypeweights), [_PlanetTypeWeights_](_types_darkforest_api_contractsapitypes.md#planettypeweights)]

---

### PlanetTypeWeightsBySpaceType

Ƭ **PlanetTypeWeightsBySpaceType**: [[_PlanetTypeWeightsByLevel_](_types_darkforest_api_contractsapitypes.md#planettypeweightsbylevel), [_PlanetTypeWeightsByLevel_](_types_darkforest_api_contractsapitypes.md#planettypeweightsbylevel), [_PlanetTypeWeightsByLevel_](_types_darkforest_api_contractsapitypes.md#planettypeweightsbylevel), [_PlanetTypeWeightsByLevel_](_types_darkforest_api_contractsapitypes.md#planettypeweightsbylevel)]

---

### UpgradeArgs

Ƭ **UpgradeArgs**: [*string*, *string*]

---

### WithdrawArtifactArgs

Ƭ **WithdrawArtifactArgs**: [*string*, *string*]
