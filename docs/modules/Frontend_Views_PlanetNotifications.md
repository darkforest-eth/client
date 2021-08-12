# Module: Frontend/Views/PlanetNotifications

## Table of contents

### Enumerations

- [PlanetNotifType](../enums/Frontend_Views_PlanetNotifications.PlanetNotifType.md)

### Functions

- [PlanetNotifications](Frontend_Views_PlanetNotifications.md#planetnotifications)
- [getNotifsForPlanet](Frontend_Views_PlanetNotifications.md#getnotifsforplanet)

## Functions

### PlanetNotifications

▸ **PlanetNotifications**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                                                                                  |
| :------------------------- | :------------------------------------------------------------------------------------ |
| `__namedParameters`        | `Object`                                                                              |
| `__namedParameters.notifs` | [`PlanetNotifType`](../enums/Frontend_Views_PlanetNotifications.PlanetNotifType.md)[] |
| `__namedParameters.planet` | [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`Planet` \| `undefined`\>    |

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
