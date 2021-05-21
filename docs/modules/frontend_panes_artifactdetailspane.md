# Module: Frontend/Panes/ArtifactDetailsPane

## Table of contents

### Functions

- [ArtifactDetailsBody](frontend_panes_artifactdetailspane.md#artifactdetailsbody)
- [ArtifactDetailsPane](frontend_panes_artifactdetailspane.md#artifactdetailspane)
- [UpgradeStatInfo](frontend_panes_artifactdetailspane.md#upgradestatinfo)

## Functions

### ArtifactDetailsBody

▸ **ArtifactDetailsBody**(`__namedParameters`: { `artifactWrapper`: [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Artifact \| undefined\> ; `contractConstants`: [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md) ; `openConversationForArtifact`: (`id`: ArtifactId) => _void_ }): `null` \| _Element_

#### Parameters

| Name                                            | Type                                                                                              |
| :---------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `__namedParameters`                             | _object_                                                                                          |
| `__namedParameters.artifactWrapper`             | [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Artifact \| undefined\>                  |
| `__namedParameters.contractConstants`           | [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md) |
| `__namedParameters.openConversationForArtifact` | (`id`: ArtifactId) => _void_                                                                      |

**Returns:** `null` \| _Element_

---

### ArtifactDetailsPane

▸ **ArtifactDetailsPane**(`__namedParameters`: { `hook`: [_ModalHook_](frontend_views_modalpane.md#modalhook) ; `openConversationForArtifact`: (`id`: ArtifactId) => _void_ }): _Element_

#### Parameters

| Name                                            | Type                                                 |
| :---------------------------------------------- | :--------------------------------------------------- |
| `__namedParameters`                             | _object_                                             |
| `__namedParameters.hook`                        | [_ModalHook_](frontend_views_modalpane.md#modalhook) |
| `__namedParameters.openConversationForArtifact` | (`id`: ArtifactId) => _void_                         |

**Returns:** _Element_

---

### UpgradeStatInfo

▸ **UpgradeStatInfo**(`__namedParameters`: { `stat`: [_StatIdx_](../enums/_types_global_globaltypes.statidx.md) ; `upgrades`: (Upgrade \| _undefined_)[] }): _Element_

#### Parameters

| Name                         | Type                                                       |
| :--------------------------- | :--------------------------------------------------------- |
| `__namedParameters`          | _object_                                                   |
| `__namedParameters.stat`     | [_StatIdx_](../enums/_types_global_globaltypes.statidx.md) |
| `__namedParameters.upgrades` | (Upgrade \| _undefined_)[]                                 |

**Returns:** _Element_
