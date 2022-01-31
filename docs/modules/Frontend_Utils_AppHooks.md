# Module: Frontend/Utils/AppHooks

## Table of contents

### Variables

- [TopLevelDivProvider](Frontend_Utils_AppHooks.md#topleveldivprovider)
- [UIManagerProvider](Frontend_Utils_AppHooks.md#uimanagerprovider)

### Functions

- [useAccount](Frontend_Utils_AppHooks.md#useaccount)
- [useActiveArtifact](Frontend_Utils_AppHooks.md#useactiveartifact)
- [useArtifact](Frontend_Utils_AppHooks.md#useartifact)
- [useHoverPlanet](Frontend_Utils_AppHooks.md#usehoverplanet)
- [useLeaderboard](Frontend_Utils_AppHooks.md#useleaderboard)
- [useMyArtifacts](Frontend_Utils_AppHooks.md#usemyartifacts)
- [useMyArtifactsList](Frontend_Utils_AppHooks.md#usemyartifactslist)
- [useOnSendCompleted](Frontend_Utils_AppHooks.md#useonsendcompleted)
- [useOverlayContainer](Frontend_Utils_AppHooks.md#useoverlaycontainer)
- [usePlanet](Frontend_Utils_AppHooks.md#useplanet)
- [usePlanetArtifacts](Frontend_Utils_AppHooks.md#useplanetartifacts)
- [usePlanetInactiveArtifacts](Frontend_Utils_AppHooks.md#useplanetinactiveartifacts)
- [usePlayer](Frontend_Utils_AppHooks.md#useplayer)
- [usePopAllOnSelectedPlanetChanged](Frontend_Utils_AppHooks.md#usepopallonselectedplanetchanged)
- [useSelectedArtifact](Frontend_Utils_AppHooks.md#useselectedartifact)
- [useSelectedPlanet](Frontend_Utils_AppHooks.md#useselectedplanet)
- [useSelectedPlanetId](Frontend_Utils_AppHooks.md#useselectedplanetid)
- [useTopLevelDiv](Frontend_Utils_AppHooks.md#usetopleveldiv)
- [useUIManager](Frontend_Utils_AppHooks.md#useuimanager)

## Variables

### TopLevelDivProvider

• **TopLevelDivProvider**: `Provider`<`HTMLDivElement`\>

---

### UIManagerProvider

• **UIManagerProvider**: `Provider`<[`default`](../classes/Backend_GameLogic_GameUIManager.default.md)\>

## Functions

### useAccount

▸ **useAccount**(`uiManager`): `EthAddress` \| `undefined`

Get the currently used account on the client.

#### Parameters

| Name        | Type                                                               | Description               |
| :---------- | :----------------------------------------------------------------- | :------------------------ |
| `uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) | instance of GameUIManager |

#### Returns

`EthAddress` \| `undefined`

---

### useActiveArtifact

▸ **useActiveArtifact**(`planet`, `uiManager`): `Artifact` \| `undefined`

#### Parameters

| Name        | Type                                                                               |
| :---------- | :--------------------------------------------------------------------------------- |
| `planet`    | [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Planet` \| `undefined`\> |
| `uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md)                 |

#### Returns

`Artifact` \| `undefined`

---

### useArtifact

▸ **useArtifact**(`uiManager`, `artifactId`): [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`undefined` \| `Artifact`\>

#### Parameters

| Name         | Type                                                               |
| :----------- | :----------------------------------------------------------------- |
| `uiManager`  | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) |
| `artifactId` | `ArtifactId`                                                       |

#### Returns

[`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`undefined` \| `Artifact`\>

---

### useHoverPlanet

▸ **useHoverPlanet**(`uiManager`): [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Planet` \| `undefined`\>

Create a subscription to the currently hovering planet.

#### Parameters

| Name        | Type                                                               | Description               |
| :---------- | :----------------------------------------------------------------- | :------------------------ |
| `uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) | instance of GameUIManager |

#### Returns

[`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Planet` \| `undefined`\>

---

### useLeaderboard

▸ **useLeaderboard**(`poll?`): `Object`

Loads the leaderboard

#### Parameters

| Name   | Type                    |
| :----- | :---------------------- |
| `poll` | `number` \| `undefined` |

#### Returns

`Object`

| Name          | Type                         |
| :------------ | :--------------------------- |
| `error`       | `Error` \| `undefined`       |
| `leaderboard` | `Leaderboard` \| `undefined` |

---

### useMyArtifacts

▸ **useMyArtifacts**(`uiManager`): [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Artifact`[]\>

#### Parameters

| Name        | Type                                                               |
| :---------- | :----------------------------------------------------------------- |
| `uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) |

#### Returns

[`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Artifact`[]\>

---

### useMyArtifactsList

▸ **useMyArtifactsList**(`uiManager`): `Artifact`[]

#### Parameters

| Name        | Type                                                               |
| :---------- | :----------------------------------------------------------------- |
| `uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) |

#### Returns

`Artifact`[]

---

### useOnSendCompleted

▸ **useOnSendCompleted**(`onCompleted`): `void`

Calls {@code onCompleted} when the user sends a move via the ui.

#### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `onCompleted` | () => `void` |

#### Returns

`void`

---

### useOverlayContainer

▸ **useOverlayContainer**(): `HTMLDivElement` \| `null`

#### Returns

`HTMLDivElement` \| `null`

---

### usePlanet

▸ **usePlanet**(`uiManager`, `locationId`): [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Planet` \| `undefined`\>

#### Parameters

| Name         | Type                                                               |
| :----------- | :----------------------------------------------------------------- |
| `uiManager`  | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) |
| `locationId` | `LocationId` \| `undefined`                                        |

#### Returns

[`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Planet` \| `undefined`\>

---

### usePlanetArtifacts

▸ **usePlanetArtifacts**(`planet`, `uiManager`): `Artifact`[]

#### Parameters

| Name        | Type                                                                               |
| :---------- | :--------------------------------------------------------------------------------- |
| `planet`    | [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Planet` \| `undefined`\> |
| `uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md)                 |

#### Returns

`Artifact`[]

---

### usePlanetInactiveArtifacts

▸ **usePlanetInactiveArtifacts**(`planet`, `uiManager`): `Artifact`[]

#### Parameters

| Name        | Type                                                                               |
| :---------- | :--------------------------------------------------------------------------------- |
| `planet`    | [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Planet` \| `undefined`\> |
| `uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md)                 |

#### Returns

`Artifact`[]

---

### usePlayer

▸ **usePlayer**(`uiManager`, `ethAddress?`): [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Player` \| `undefined`\>

Hook which gets you the player, and updates whenever that player's twitter or score changes.

#### Parameters

| Name          | Type                                                               |
| :------------ | :----------------------------------------------------------------- |
| `uiManager`   | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) |
| `ethAddress?` | `EthAddress`                                                       |

#### Returns

[`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Player` \| `undefined`\>

---

### usePopAllOnSelectedPlanetChanged

▸ **usePopAllOnSelectedPlanetChanged**(`modal`, `startingId`): `void`

#### Parameters

| Name         | Type                                                                   |
| :----------- | :--------------------------------------------------------------------- |
| `modal`      | [`ModalHandle`](../interfaces/Frontend_Views_ModalPane.ModalHandle.md) |
| `startingId` | `LocationId` \| `undefined`                                            |

#### Returns

`void`

---

### useSelectedArtifact

▸ **useSelectedArtifact**(`uiManager`): [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Artifact` \| `undefined`\>

Create a subscription to the currently selected artifact.

#### Parameters

| Name        | Type                                                               | Description               |
| :---------- | :----------------------------------------------------------------- | :------------------------ |
| `uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) | instance of GameUIManager |

#### Returns

[`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Artifact` \| `undefined`\>

---

### useSelectedPlanet

▸ **useSelectedPlanet**(`uiManager`): [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Planet` \| `undefined`\>

Create a subscription to the currently selected planet.

#### Parameters

| Name        | Type                                                               | Description               |
| :---------- | :----------------------------------------------------------------- | :------------------------ |
| `uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) | instance of GameUIManager |

#### Returns

[`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Planet` \| `undefined`\>

---

### useSelectedPlanetId

▸ **useSelectedPlanetId**(`uiManager`, `defaultId?`): [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`undefined` \| `LocationId`\>

#### Parameters

| Name         | Type                                                               |
| :----------- | :----------------------------------------------------------------- |
| `uiManager`  | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) |
| `defaultId?` | `LocationId`                                                       |

#### Returns

[`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`undefined` \| `LocationId`\>

---

### useTopLevelDiv

▸ **useTopLevelDiv**(): `HTMLDivElement`

#### Returns

`HTMLDivElement`

---

### useUIManager

▸ **useUIManager**(): [`default`](../classes/Backend_GameLogic_GameUIManager.default.md)

#### Returns

[`default`](../classes/Backend_GameLogic_GameUIManager.default.md)
