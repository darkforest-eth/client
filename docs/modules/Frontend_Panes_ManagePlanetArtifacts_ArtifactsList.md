# Module: Frontend/Panes/ManagePlanetArtifacts/ArtifactsList

## Table of contents

### Functions

- [ArtifactsList](Frontend_Panes_ManagePlanetArtifacts_ArtifactsList.md#artifactslist)

## Functions

### ArtifactsList

▸ **ArtifactsList**(`__namedParameters`): `Element`

#### Parameters

| Name                          | Type                                                                                                           |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `__namedParameters`           | `Object`                                                                                                       |
| `__namedParameters.artifacts` | (`undefined` \| `Artifact`)[]                                                                                  |
| `__namedParameters.modal`     | [`ModalHandle`](../interfaces/Frontend_Views_ModalPane.ModalHandle.md)                                         |
| `__namedParameters.sortBy`    | `undefined` \| keyof `Upgrade`                                                                                 |
| `__namedParameters.actions`   | (`artifact`: `Artifact`) => `undefined` \| `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\> |

#### Returns

`Element`
