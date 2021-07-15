# Module: Frontend/Panes/ArtifactDetailsPane

## Table of contents

### Functions

- [ArtifactDetailsBody](Frontend_Panes_ArtifactDetailsPane.md#artifactdetailsbody)
- [ArtifactDetailsPane](Frontend_Panes_ArtifactDetailsPane.md#artifactdetailspane)
- [UpgradeStatInfo](Frontend_Panes_ArtifactDetailsPane.md#upgradestatinfo)

## Functions

### ArtifactDetailsBody

▸ **ArtifactDetailsBody**(`__namedParameters`): `null` \| `Element`

#### Parameters

| Name                                            | Type                                                                                              |
| :---------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `__namedParameters`                             | `Object`                                                                                          |
| `__namedParameters.artifactWrapper`             | [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Artifact` \| `undefined`\>              |
| `__namedParameters.contractConstants`           | [`ContractConstants`](../interfaces/_types_darkforest_api_ContractsAPITypes.ContractConstants.md) |
| `__namedParameters.openConversationForArtifact` |                                                                                                   |

#### Returns

`null` \| `Element`

---

### ArtifactDetailsPane

▸ **ArtifactDetailsPane**(`__namedParameters`): `Element`

#### Parameters

| Name                                            | Type                                                 |
| :---------------------------------------------- | :--------------------------------------------------- |
| `__namedParameters`                             | `Object`                                             |
| `__namedParameters.hook`                        | [`ModalHook`](Frontend_Views_ModalPane.md#modalhook) |
| `__namedParameters.openConversationForArtifact` |                                                      |

#### Returns

`Element`

---

### UpgradeStatInfo

▸ **UpgradeStatInfo**(`__namedParameters`): `Element`

#### Parameters

| Name                         | Type                                                       |
| :--------------------------- | :--------------------------------------------------------- |
| `__namedParameters`          | `Object`                                                   |
| `__namedParameters.stat`     | [`StatIdx`](../enums/_types_global_GlobalTypes.StatIdx.md) |
| `__namedParameters.upgrades` | (`Upgrade` \| `undefined`)[]                               |

#### Returns

`Element`
