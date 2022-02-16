# Module: Frontend/Panes/ManagePlanetArtifacts/ManageArtifacts

## Table of contents

### Functions

- [ManageArtifactsPane](Frontend_Panes_ManagePlanetArtifacts_ManageArtifacts.md#manageartifactspane)

## Functions

### ManageArtifactsPane

▸ **ManageArtifactsPane**(`__namedParameters`): `Element`

#### Parameters

| Name                                     | Type                                                                   |
| :--------------------------------------- | :--------------------------------------------------------------------- |
| `__namedParameters`                      | `Object`                                                               |
| `__namedParameters.artifactsInInventory` | `Artifact`[]                                                           |
| `__namedParameters.artifactsOnPlanet`    | (`undefined` \| `Artifact`)[]                                          |
| `__namedParameters.currentBlockNumber`   | `undefined` \| `number`                                                |
| `__namedParameters.modal`                | [`ModalHandle`](../interfaces/Frontend_Views_ModalPane.ModalHandle.md) |
| `__namedParameters.planet`               | `LocatablePlanet`                                                      |
| `__namedParameters.playerAddress`        | `string`                                                               |
| `__namedParameters.roundOver`            | `boolean`                                                              |
| `__namedParameters.activate`             | (`artifact`: `Artifact`) => `void`                                     |
| `__namedParameters.deactivate`           | (`artifact`: `Artifact`) => `void`                                     |
| `__namedParameters.deposit`              | (`artifact`: `Artifact`) => `void`                                     |
| `__namedParameters.find`                 | () => `void`                                                           |
| `__namedParameters.prospect`             | () => `void`                                                           |
| `__namedParameters.withdraw`             | (`artifact`: `Artifact`) => `void`                                     |

#### Returns

`Element`
