# Module: Frontend/Panes/ArtifactDetailsPane

## Table of contents

### Functions

- [ArtifactDetailsBody](Frontend_Panes_ArtifactDetailsPane.md#artifactdetailsbody)
- [ArtifactDetailsHelpContent](Frontend_Panes_ArtifactDetailsPane.md#artifactdetailshelpcontent)
- [ArtifactDetailsPane](Frontend_Panes_ArtifactDetailsPane.md#artifactdetailspane)
- [UpgradeStatInfo](Frontend_Panes_ArtifactDetailsPane.md#upgradestatinfo)

## Functions

### ArtifactDetailsBody

▸ **ArtifactDetailsBody**(`__namedParameters`): `null` \| `Element`

#### Parameters

| Name                                  | Type                                                                                             |
| :------------------------------------ | :----------------------------------------------------------------------------------------------- |
| `__namedParameters`                   | `Object`                                                                                         |
| `__namedParameters.artifactId`        | `ArtifactId`                                                                                     |
| `__namedParameters.contractConstants` | [`ContractConstants`](../interfaces/types_darkforest_api_ContractsAPITypes.ContractConstants.md) |
| `__namedParameters.depositOn?`        | `LocationId`                                                                                     |
| `__namedParameters.modal?`            | [`ModalHandle`](../interfaces/Frontend_Views_ModalPane.ModalHandle.md)                           |
| `__namedParameters.noActions?`        | `boolean`                                                                                        |

#### Returns

`null` \| `Element`

---

### ArtifactDetailsHelpContent

▸ **ArtifactDetailsHelpContent**(): `Element`

#### Returns

`Element`

---

### ArtifactDetailsPane

▸ **ArtifactDetailsPane**(`__namedParameters`): `Element`

#### Parameters

| Name                           | Type                                                                   |
| :----------------------------- | :--------------------------------------------------------------------- |
| `__namedParameters`            | `Object`                                                               |
| `__namedParameters.artifactId` | `ArtifactId`                                                           |
| `__namedParameters.depositOn?` | `LocationId`                                                           |
| `__namedParameters.modal`      | [`ModalHandle`](../interfaces/Frontend_Views_ModalPane.ModalHandle.md) |

#### Returns

`Element`

---

### UpgradeStatInfo

▸ **UpgradeStatInfo**(`__namedParameters`): `Element`

#### Parameters

| Name                         | Type                                                      |
| :--------------------------- | :-------------------------------------------------------- |
| `__namedParameters`          | `Object`                                                  |
| `__namedParameters.stat`     | [`StatIdx`](../enums/types_global_GlobalTypes.StatIdx.md) |
| `__namedParameters.upgrades` | (`undefined` \| `Upgrade`)[]                              |

#### Returns

`Element`
