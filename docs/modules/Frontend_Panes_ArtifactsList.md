# Module: Frontend/Panes/ArtifactsList

## Table of contents

### Functions

- [AllArtifacts](Frontend_Panes_ArtifactsList.md#allartifacts)
- [ArtifactsList](Frontend_Panes_ArtifactsList.md#artifactslist)
- [ShipList](Frontend_Panes_ArtifactsList.md#shiplist)

## Functions

### AllArtifacts

▸ **AllArtifacts**(`__namedParameters`): `Element`

#### Parameters

| Name                                    | Type                                                                   |
| :-------------------------------------- | :--------------------------------------------------------------------- |
| `__namedParameters`                     | `Object`                                                               |
| `__namedParameters.artifacts`           | `Artifact`[]                                                           |
| `__namedParameters.depositOn?`          | `LocationId`                                                           |
| `__namedParameters.maxRarity?`          | `number`                                                               |
| `__namedParameters.modal`               | [`ModalHandle`](../interfaces/Frontend_Views_ModalPane.ModalHandle.md) |
| `__namedParameters.noArtifactsMessage?` | `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>    |
| `__namedParameters.noShipsMessage?`     | `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>    |

#### Returns

`Element`

---

### ArtifactsList

▸ **ArtifactsList**(`__namedParameters`): `Element`

#### Parameters

| Name                                    | Type                                                                   |
| :-------------------------------------- | :--------------------------------------------------------------------- |
| `__namedParameters`                     | `Object`                                                               |
| `__namedParameters.artifacts`           | `Artifact`[]                                                           |
| `__namedParameters.depositOn?`          | `LocationId`                                                           |
| `__namedParameters.maxRarity?`          | `number`                                                               |
| `__namedParameters.modal`               | [`ModalHandle`](../interfaces/Frontend_Views_ModalPane.ModalHandle.md) |
| `__namedParameters.noArtifactsMessage?` | `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>    |

#### Returns

`Element`

---

### ShipList

▸ **ShipList**(`__namedParameters`): `Element`

#### Parameters

| Name                                | Type                                                                   |
| :---------------------------------- | :--------------------------------------------------------------------- |
| `__namedParameters`                 | `Object`                                                               |
| `__namedParameters.artifacts`       | `Artifact`[]                                                           |
| `__namedParameters.depositOn?`      | `LocationId`                                                           |
| `__namedParameters.modal`           | [`ModalHandle`](../interfaces/Frontend_Views_ModalPane.ModalHandle.md) |
| `__namedParameters.noShipsMessage?` | `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\>    |

#### Returns

`Element`
