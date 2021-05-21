# Module: Frontend/Utils/AppHooks

## Table of contents

### Variables

- [TopLevelDivProvider](frontend_utils_apphooks.md#topleveldivprovider)
- [UIManagerProvider](frontend_utils_apphooks.md#uimanagerprovider)

### Functions

- [useAccount](frontend_utils_apphooks.md#useaccount)
- [useContextMenu](frontend_utils_apphooks.md#usecontextmenu)
- [useControlDown](frontend_utils_apphooks.md#usecontroldown)
- [useMyArtifacts](frontend_utils_apphooks.md#usemyartifacts)
- [useSelectedArtifact](frontend_utils_apphooks.md#useselectedartifact)
- [useSelectedPlanet](frontend_utils_apphooks.md#useselectedplanet)
- [useTopLevelDiv](frontend_utils_apphooks.md#usetopleveldiv)
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

### useContextMenu

▸ **useContextMenu**(`selectedPlanet`: Planet \| _undefined_): [_ContextMenuType_](../enums/frontend_components_contextmenu.contextmenutype.md)

Calculate current context menu from the current UI state

#### Parameters

| Name             | Type                  | Description                   |
| :--------------- | :-------------------- | :---------------------------- |
| `selectedPlanet` | Planet \| _undefined_ | the currently selected planet |

**Returns:** [_ContextMenuType_](../enums/frontend_components_contextmenu.contextmenutype.md)

---

### useControlDown

▸ **useControlDown**(): _boolean_

Return a bool that indicates if the control key is pressed.

**Returns:** _boolean_

---

### useMyArtifacts

▸ **useMyArtifacts**(`uiManager`: [_default_](../classes/backend_gamelogic_gameuimanager.default.md)): [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Map<ArtifactId, Artifact\> \| undefined\>

#### Parameters

| Name        | Type                                                               |
| :---------- | :----------------------------------------------------------------- |
| `uiManager` | [_default_](../classes/backend_gamelogic_gameuimanager.default.md) |

**Returns:** [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Map<ArtifactId, Artifact\> \| undefined\>

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

### useUIManager

▸ **useUIManager**(): [_default_](../classes/backend_gamelogic_gameuimanager.default.md)

**Returns:** [_default_](../classes/backend_gamelogic_gameuimanager.default.md)
