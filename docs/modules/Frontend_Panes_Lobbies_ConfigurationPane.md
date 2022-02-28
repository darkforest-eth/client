# Module: Frontend/Panes/Lobbies/ConfigurationPane

## Table of contents

### Functions

- [ConfigurationPane](Frontend_Panes_Lobbies_ConfigurationPane.md#configurationpane)

## Functions

### ConfigurationPane

▸ **ConfigurationPane**(`__namedParameters`): `Element`

#### Parameters

| Name                               | Type                                                                                                         |
| :--------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `__namedParameters`                | `Object`                                                                                                     |
| `__namedParameters.lobbyAddress`   | `undefined` \| `EthAddress`                                                                                  |
| `__namedParameters.modalIndex`     | `number`                                                                                                     |
| `__namedParameters.startingConfig` | [`LobbyInitializers`](Frontend_Panes_Lobbies_Reducer.md#lobbyinitializers)                                   |
| `__namedParameters.onCreate`       | (`config`: [`LobbyInitializers`](Frontend_Panes_Lobbies_Reducer.md#lobbyinitializers)) => `Promise`<`void`\> |
| `__namedParameters.onMapChange`    | (`props`: [`MinimapConfig`](Frontend_Panes_Lobbies_MinimapUtils.md#minimapconfig)) => `void`                 |

#### Returns

`Element`
