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

| Name                                  | Type                                                                                              |
| :------------------------------------ | :------------------------------------------------------------------------------------------------ |
| `__namedParameters`                   | `Object`                                                                                          |
| `__namedParameters.artifactId`        | `ArtifactId`                                                                                      |
| `__namedParameters.contractConstants` | [`ContractConstants`](../interfaces/_types_darkforest_api_ContractsAPITypes.ContractConstants.md) |
| `__namedParameters.modal`             | [`ModalHandle`](../interfaces/Frontend_Views_ModalPane.ModalHandle.md)                            |

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
| `__namedParameters.modal`      | [`ModalHandle`](../interfaces/Frontend_Views_ModalPane.ModalHandle.md) |

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
