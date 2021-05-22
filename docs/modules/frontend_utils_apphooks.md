# Module: Frontend/Utils/AppHooks

## Table of contents

### Variables

- [TopLevelDivProvider](frontend_utils_apphooks.md#topleveldivprovider)
- [UIManagerProvider](frontend_utils_apphooks.md#uimanagerprovider)

### Functions

- [useAccount](frontend_utils_apphooks.md#useaccount)
- [useActiveArtifact](frontend_utils_apphooks.md#useactiveartifact)
- [useControlDown](frontend_utils_apphooks.md#usecontroldown)
- [useHoverPlanet](frontend_utils_apphooks.md#usehoverplanet)
- [useLeaderboard](frontend_utils_apphooks.md#useleaderboard)
- [useMyArtifacts](frontend_utils_apphooks.md#usemyartifacts)
- [usePlanetArtifacts](frontend_utils_apphooks.md#useplanetartifacts)
- [usePlanetInactiveArtifacts](frontend_utils_apphooks.md#useplanetinactiveartifacts)
- [useSelectedArtifact](frontend_utils_apphooks.md#useselectedartifact)
- [useSelectedPlanet](frontend_utils_apphooks.md#useselectedplanet)
- [useTopLevelDiv](frontend_utils_apphooks.md#usetopleveldiv)
- [useTwitter](frontend_utils_apphooks.md#usetwitter)
- [useUIManager](frontend_utils_apphooks.md#useuimanager)

## Variables

### TopLevelDivProvider

• **TopLevelDivProvider**: _Provider_<HTMLDivElement\>

---

### UIManagerProvider

• **UIManagerProvider**: _Provider_<[_default_](../classes/backend_gamelogic_gameuimanager.default.md)\>

## Functions

### useAccount

▸ **useAccount**(`uiManager`: [_default_](../classes/backend_gamelogic_gameuimanager.default.md)): EthAddress \| _undefined_

Get the currently used account on the client.

#### Parameters

| Name        | Type                                                               | Description               |
| :---------- | :----------------------------------------------------------------- | :------------------------ |
| `uiManager` | [_default_](../classes/backend_gamelogic_gameuimanager.default.md) | instance of GameUIManager |

**Returns:** EthAddress \| _undefined_

---

### useActiveArtifact

▸ **useActiveArtifact**(`planet`: [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Planet \| undefined\>, `uiManager`: [_default_](../classes/backend_gamelogic_gameuimanager.default.md)): Artifact \| _undefined_

#### Parameters

| Name        | Type                                                                           |
| :---------- | :----------------------------------------------------------------------------- |
| `planet`    | [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Planet \| undefined\> |
| `uiManager` | [_default_](../classes/backend_gamelogic_gameuimanager.default.md)             |

**Returns:** Artifact \| _undefined_

---

### useControlDown

▸ **useControlDown**(): _boolean_

Return a bool that indicates if the control key is pressed.

**Returns:** _boolean_

---

### useHoverPlanet

▸ **useHoverPlanet**(`uiManager`: [_default_](../classes/backend_gamelogic_gameuimanager.default.md)): [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Planet \| undefined\>

Create a subscription to the currently hovering planet.

#### Parameters

| Name        | Type                                                               | Description               |
| :---------- | :----------------------------------------------------------------- | :------------------------ |
| `uiManager` | [_default_](../classes/backend_gamelogic_gameuimanager.default.md) | instance of GameUIManager |

**Returns:** [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Planet \| undefined\>

---

### useLeaderboard

▸ **useLeaderboard**(`poll?`: _number_ \| _undefined_): _object_

Loads the leaderboard

#### Parameters

| Name   | Type                    |
| :----- | :---------------------- |
| `poll` | _number_ \| _undefined_ |

**Returns:** _object_

| Name          | Type                                |
| :------------ | :---------------------------------- |
| `error`       | Error \| _undefined_                |
| `leaderboard` | AggregateLeaderboard \| _undefined_ |

---

### useMyArtifacts

▸ **useMyArtifacts**(`uiManager`: [_default_](../classes/backend_gamelogic_gameuimanager.default.md)): [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Map<ArtifactId, Artifact\> \| undefined\>

#### Parameters

| Name        | Type                                                               |
| :---------- | :----------------------------------------------------------------- |
| `uiManager` | [_default_](../classes/backend_gamelogic_gameuimanager.default.md) |

**Returns:** [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Map<ArtifactId, Artifact\> \| undefined\>

---

### usePlanetArtifacts

▸ **usePlanetArtifacts**(`planet`: [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Planet \| undefined\>, `uiManager`: [_default_](../classes/backend_gamelogic_gameuimanager.default.md)): Artifact[]

#### Parameters

| Name        | Type                                                                           |
| :---------- | :----------------------------------------------------------------------------- |
| `planet`    | [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Planet \| undefined\> |
| `uiManager` | [_default_](../classes/backend_gamelogic_gameuimanager.default.md)             |

**Returns:** Artifact[]

---

### usePlanetInactiveArtifacts

▸ **usePlanetInactiveArtifacts**(`planet`: [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Planet \| undefined\>, `uiManager`: [_default_](../classes/backend_gamelogic_gameuimanager.default.md)): Artifact[]

#### Parameters

| Name        | Type                                                                           |
| :---------- | :----------------------------------------------------------------------------- |
| `planet`    | [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Planet \| undefined\> |
| `uiManager` | [_default_](../classes/backend_gamelogic_gameuimanager.default.md)             |

**Returns:** Artifact[]

---

### useSelectedArtifact

▸ **useSelectedArtifact**(`uiManager`: [_default_](../classes/backend_gamelogic_gameuimanager.default.md)): [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Artifact \| undefined\>

Create a subscription to the currently selected artifact.

#### Parameters

| Name        | Type                                                               | Description               |
| :---------- | :----------------------------------------------------------------- | :------------------------ |
| `uiManager` | [_default_](../classes/backend_gamelogic_gameuimanager.default.md) | instance of GameUIManager |

**Returns:** [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Artifact \| undefined\>

---

### useSelectedPlanet

▸ **useSelectedPlanet**(`uiManager`: [_default_](../classes/backend_gamelogic_gameuimanager.default.md)): [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Planet \| undefined\>

Create a subscription to the currently selected planet.

#### Parameters

| Name        | Type                                                               | Description               |
| :---------- | :----------------------------------------------------------------- | :------------------------ |
| `uiManager` | [_default_](../classes/backend_gamelogic_gameuimanager.default.md) | instance of GameUIManager |

**Returns:** [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Planet \| undefined\>

---

### useTopLevelDiv

▸ **useTopLevelDiv**(): HTMLDivElement

**Returns:** HTMLDivElement

---

### useTwitter

▸ **useTwitter**(`account`: EthAddress \| _undefined_, `uiManager`: [_default_](../classes/backend_gamelogic_gameuimanager.default.md)): _string_ \| _undefined_

#### Parameters

| Name        | Type                                                               |
| :---------- | :----------------------------------------------------------------- |
| `account`   | EthAddress \| _undefined_                                          |
| `uiManager` | [_default_](../classes/backend_gamelogic_gameuimanager.default.md) |

**Returns:** _string_ \| _undefined_

---

### useUIManager

▸ **useUIManager**(): [_default_](../classes/backend_gamelogic_gameuimanager.default.md)

**Returns:** [_default_](../classes/backend_gamelogic_gameuimanager.default.md)
