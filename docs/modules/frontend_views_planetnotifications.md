# Module: Frontend/Views/PlanetNotifications

## Table of contents

### Enumerations

- [PlanetNotifType](../enums/frontend_views_planetnotifications.planetnotiftype.md)

### Type aliases

- [PlanetNotifHooks](frontend_views_planetnotifications.md#planetnotifhooks)

### Functions

- [PlanetNotifications](frontend_views_planetnotifications.md#planetnotifications)
- [getNotifsForPlanet](frontend_views_planetnotifications.md#getnotifsforplanet)

## Type aliases

### PlanetNotifHooks

Ƭ **PlanetNotifHooks**: _object_

#### Type declaration

| Name             | Type                                                 |
| :--------------- | :--------------------------------------------------- |
| `upgradeDetHook` | [_ModalHook_](frontend_views_modalpane.md#modalhook) |

## Functions

### PlanetNotifications

▸ **PlanetNotifications**(`__namedParameters`: { `notifs`: [_PlanetNotifType_](../enums/frontend_views_planetnotifications.planetnotiftype.md)[] ; `wrapper`: [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Planet \| undefined\> } & [_PlanetNotifHooks_](frontend_views_planetnotifications.md#planetnotifhooks)): _Element_

#### Parameters

| Name                | Type                                                                                                                                                                                                                                                                           |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters` | { `notifs`: [_PlanetNotifType_](../enums/frontend_views_planetnotifications.planetnotiftype.md)[] ; `wrapper`: [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<Planet \| undefined\> } & [_PlanetNotifHooks_](frontend_views_planetnotifications.md#planetnotifhooks) |

**Returns:** _Element_

---

### getNotifsForPlanet

▸ **getNotifsForPlanet**(`planet`: Planet \| _undefined_, `currentBlockNumber`: _number_ \| _undefined_): [_PlanetNotifType_](../enums/frontend_views_planetnotifications.planetnotiftype.md)[]

#### Parameters

| Name                 | Type                    |
| :------------------- | :---------------------- |
| `planet`             | Planet \| _undefined_   |
| `currentBlockNumber` | _number_ \| _undefined_ |

**Returns:** [_PlanetNotifType_](../enums/frontend_views_planetnotifications.planetnotiftype.md)[]
