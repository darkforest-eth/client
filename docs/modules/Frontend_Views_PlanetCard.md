# Module: Frontend/Views/PlanetCard

## Table of contents

### Functions

- [PlanetCard](Frontend_Views_PlanetCard.md#planetcard)
- [PlanetCardTitle](Frontend_Views_PlanetCard.md#planetcardtitle)

## Functions

### PlanetCard

▸ **PlanetCard**(`__namedParameters`): `Element`

Preview basic planet information - used in `PlanetContextPane` and `HoverPlanetPane`

#### Parameters

| Name                              | Type                                                                               |
| :-------------------------------- | :--------------------------------------------------------------------------------- |
| `__namedParameters`               | `Object`                                                                           |
| `__namedParameters.planetWrapper` | [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`undefined` \| `Planet`\> |
| `__namedParameters.standalone?`   | `boolean`                                                                          |

#### Returns

`Element`

---

### PlanetCardTitle

▸ **PlanetCardTitle**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type                                                                               |
| :------------------------- | :--------------------------------------------------------------------------------- |
| `__namedParameters`        | `Object`                                                                           |
| `__namedParameters.planet` | [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`undefined` \| `Planet`\> |
| `__namedParameters.small?` | `boolean`                                                                          |

#### Returns

`Element`
