# Module: Frontend/Views/PlanetNotifications

## Table of contents

### Enumerations

- [PlanetNotifType](../enums/Frontend_Views_PlanetNotifications.PlanetNotifType.md)

### Type aliases

- [PlanetNotifHooks](Frontend_Views_PlanetNotifications.md#planetnotifhooks)

### Functions

- [PlanetNotifications](Frontend_Views_PlanetNotifications.md#planetnotifications)
- [getNotifsForPlanet](Frontend_Views_PlanetNotifications.md#getnotifsforplanet)

## Type aliases

### PlanetNotifHooks

Ƭ **PlanetNotifHooks**: `Object`

#### Type declaration

| Name             | Type                                                 |
| :--------------- | :--------------------------------------------------- |
| `upgradeDetHook` | [`ModalHook`](Frontend_Views_ModalPane.md#modalhook) |

## Functions

### PlanetNotifications

▸ **PlanetNotifications**(`__namedParameters`): `Element`

#### Parameters

| Name                | Type                                                                                                                                                                                                                                                                               |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters` | { `notifs`: [`PlanetNotifType`](../enums/Frontend_Views_PlanetNotifications.PlanetNotifType.md)[] ; `wrapper`: [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Planet` \| `undefined`\> } & [`PlanetNotifHooks`](Frontend_Views_PlanetNotifications.md#planetnotifhooks) |

#### Returns

`Element`

---

### getNotifsForPlanet

▸ **getNotifsForPlanet**(`planet`, `currentBlockNumber`): [`PlanetNotifType`](../enums/Frontend_Views_PlanetNotifications.PlanetNotifType.md)[]

#### Parameters

| Name                 | Type                    |
| :------------------- | :---------------------- |
| `planet`             | `Planet` \| `undefined` |
| `currentBlockNumber` | `number` \| `undefined` |

#### Returns

[`PlanetNotifType`](../enums/Frontend_Views_PlanetNotifications.PlanetNotifType.md)[]
