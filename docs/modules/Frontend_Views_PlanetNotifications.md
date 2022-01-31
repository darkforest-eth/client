# Module: Frontend/Views/PlanetNotifications

## Table of contents

### Enumerations

- [PlanetNotifType](../enums/Frontend_Views_PlanetNotifications.PlanetNotifType.md)

### Functions

- [DistanceFromCenterRow](Frontend_Views_PlanetNotifications.md#distancefromcenterrow)
- [PlanetClaimedRow](Frontend_Views_PlanetNotifications.md#planetclaimedrow)
- [PlanetNotifications](Frontend_Views_PlanetNotifications.md#planetnotifications)
- [getNotifsForPlanet](Frontend_Views_PlanetNotifications.md#getnotifsforplanet)

## Functions

### DistanceFromCenterRow

▸ `Const` **DistanceFromCenterRow**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                                                                               |
| :------------------------- | :--------------------------------------------------------------------------------- |
| `__namedParameters`        | `Object`                                                                           |
| `__namedParameters.planet` | [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`undefined` \| `Planet`\> |

#### Returns

`Element`

---

### PlanetClaimedRow

▸ `Const` **PlanetClaimedRow**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                                                                               |
| :------------------------- | :--------------------------------------------------------------------------------- |
| `__namedParameters`        | `Object`                                                                           |
| `__namedParameters.planet` | [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`undefined` \| `Planet`\> |

#### Returns

`Element`

---

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

▸ **getNotifsForPlanet**(`planet`, `account`, `currentBlockNumber`): [`PlanetNotifType`](../enums/Frontend_Views_PlanetNotifications.PlanetNotifType.md)[]

#### Parameters

| Name                 | Type                        |
| :------------------- | :-------------------------- |
| `planet`             | `Planet` \| `undefined`     |
| `account`            | `EthAddress` \| `undefined` |
| `currentBlockNumber` | `number` \| `undefined`     |

#### Returns

[`PlanetNotifType`](../enums/Frontend_Views_PlanetNotifications.PlanetNotifType.md)[]
