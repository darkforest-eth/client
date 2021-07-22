# Module: Frontend/Utils/AppHooks

## Table of contents

### Variables

- [TopLevelDivProvider](Frontend_Utils_AppHooks.md#topleveldivprovider)
- [UIManagerProvider](Frontend_Utils_AppHooks.md#uimanagerprovider)

### Functions

- [useAccount](Frontend_Utils_AppHooks.md#useaccount)
- [useActiveArtifact](Frontend_Utils_AppHooks.md#useactiveartifact)
- [useControlDown](Frontend_Utils_AppHooks.md#usecontroldown)
- [useHoverPlanet](Frontend_Utils_AppHooks.md#usehoverplanet)
- [useLeaderboard](Frontend_Utils_AppHooks.md#useleaderboard)
- [useMyArtifacts](Frontend_Utils_AppHooks.md#usemyartifacts)
- [usePlanetArtifacts](Frontend_Utils_AppHooks.md#useplanetartifacts)
- [usePlanetInactiveArtifacts](Frontend_Utils_AppHooks.md#useplanetinactiveartifacts)
- [useSelectedArtifact](Frontend_Utils_AppHooks.md#useselectedartifact)
- [useSelectedPlanet](Frontend_Utils_AppHooks.md#useselectedplanet)
- [useTopLevelDiv](Frontend_Utils_AppHooks.md#usetopleveldiv)
- [useTwitter](Frontend_Utils_AppHooks.md#usetwitter)
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

### useControlDown

▸ **useControlDown**(): `boolean`

Return a bool that indicates if the control key is pressed.

#### Returns

`boolean`

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

▸ **useMyArtifacts**(`uiManager`): [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Map`<`ArtifactId`, `Artifact`\> \| `undefined`\>

#### Parameters

| Name        | Type                                                               |
| :---------- | :----------------------------------------------------------------- |
| `uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) |

#### Returns

[`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Map`<`ArtifactId`, `Artifact`\> \| `undefined`\>

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

### useTopLevelDiv

▸ **useTopLevelDiv**(): `HTMLDivElement`

#### Returns

`HTMLDivElement`

---

### useTwitter

▸ **useTwitter**(`account`, `uiManager`): `string` \| `undefined`

#### Parameters

| Name        | Type                                                               |
| :---------- | :----------------------------------------------------------------- |
| `account`   | `EthAddress` \| `undefined`                                        |
| `uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) |

#### Returns

`string` \| `undefined`

---

### useUIManager

▸ **useUIManager**(): [`default`](../classes/Backend_GameLogic_GameUIManager.default.md)

#### Returns

[`default`](../classes/Backend_GameLogic_GameUIManager.default.md)
