# Module: Frontend/Views/PlanetCardComponents

## Table of contents

### Variables

- [DestroyedMarker](Frontend_Views_PlanetCardComponents.md#destroyedmarker)
- [PlanetTag](Frontend_Views_PlanetCardComponents.md#planettag)
- [StatCell](Frontend_Views_PlanetCardComponents.md#statcell)
- [StatContainer](Frontend_Views_PlanetCardComponents.md#statcontainer)
- [StatRow](Frontend_Views_PlanetCardComponents.md#statrow)
- [TitleBar](Frontend_Views_PlanetCardComponents.md#titlebar)

### Functions

- [PCStatIcon](Frontend_Views_PlanetCardComponents.md#pcstaticon)
- [PlanetActiveArtifact](Frontend_Views_PlanetCardComponents.md#planetactiveartifact)
- [RowTip](Frontend_Views_PlanetCardComponents.md#rowtip)

## Variables

### DestroyedMarker

• `Const` **DestroyedMarker**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### PlanetTag

• `Const` **PlanetTag**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### StatCell

• `Const` **StatCell**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### StatContainer

• `Const` **StatContainer**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### StatRow

• `Const` **StatRow**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### TitleBar

• `Const` **TitleBar**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

## Functions

### PCStatIcon

▸ **PCStatIcon**(`__namedParameters`): `Element`

#### Parameters

| Name                         | Type                                                       |
| :--------------------------- | :--------------------------------------------------------- |
| `__namedParameters`          | `Object`                                                   |
| `__namedParameters.children` | `React.ReactNode`                                          |
| `__namedParameters.planet`   | `Planet` \| `undefined`                                    |
| `__namedParameters.stat`     | [`StatIdx`](../enums/_types_global_GlobalTypes.StatIdx.md) |

#### Returns

`Element`

---

### PlanetActiveArtifact

▸ **PlanetActiveArtifact**(`__namedParameters`): `Element`

#### Parameters

| Name                         | Type                    |
| :--------------------------- | :---------------------- |
| `__namedParameters`          | `Object`                |
| `__namedParameters.artifact` | `Artifact`              |
| `__namedParameters.planet`   | `Planet` \| `undefined` |

#### Returns

`Element`

---

### RowTip

▸ `Const` **RowTip**(`__namedParameters`): `Element`

#### Parameters

| Name                         | Type                                                                 |
| :--------------------------- | :------------------------------------------------------------------- |
| `__namedParameters`          | `Object`                                                             |
| `__namedParameters.children` | `ReactNode`                                                          |
| `__namedParameters.name`     | [`TooltipName`](../enums/Frontend_Game_WindowManager.TooltipName.md) |

#### Returns

`Element`
