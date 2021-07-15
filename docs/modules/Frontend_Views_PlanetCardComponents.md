# Module: Frontend/Views/PlanetCardComponents

## Table of contents

### Variables

- [ArtifactSection](Frontend_Views_PlanetCardComponents.md#artifactsection)
- [BigStatCell](Frontend_Views_PlanetCardComponents.md#bigstatcell)
- [DestroyedMarker](Frontend_Views_PlanetCardComponents.md#destroyedmarker)
- [IconsWrapper](Frontend_Views_PlanetCardComponents.md#iconswrapper)
- [PlanetTag](Frontend_Views_PlanetCardComponents.md#planettag)
- [PreviewSection](Frontend_Views_PlanetCardComponents.md#previewsection)
- [Small](Frontend_Views_PlanetCardComponents.md#small)
- [StatCell](Frontend_Views_PlanetCardComponents.md#statcell)
- [StatRow](Frontend_Views_PlanetCardComponents.md#statrow)
- [StatSection](Frontend_Views_PlanetCardComponents.md#statsection)
- [StyledPlanetCard](Frontend_Views_PlanetCardComponents.md#styledplanetcard)
- [StyledStatIcon](Frontend_Views_PlanetCardComponents.md#styledstaticon)
- [TitleBar](Frontend_Views_PlanetCardComponents.md#titlebar)
- [TopRow](Frontend_Views_PlanetCardComponents.md#toprow)

### Functions

- [PCStatIcon](Frontend_Views_PlanetCardComponents.md#pcstaticon)
- [PlanetActiveArtifact](Frontend_Views_PlanetCardComponents.md#planetactiveartifact)
- [RowTip](Frontend_Views_PlanetCardComponents.md#rowtip)

## Variables

### ArtifactSection

• `Const` **ArtifactSection**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### BigStatCell

• `Const` **BigStatCell**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### DestroyedMarker

• `Const` **DestroyedMarker**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### IconsWrapper

• `Const` **IconsWrapper**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### PlanetTag

• `Const` **PlanetTag**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### PreviewSection

• `Const` **PreviewSection**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### Small

• `Const` **Small**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### StatCell

• `Const` **StatCell**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### StatRow

• `Const` **StatRow**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### StatSection

• `Const` **StatSection**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### StyledPlanetCard

• `Const` **StyledPlanetCard**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### StyledStatIcon

• `Const` **StyledStatIcon**: `StyledComponent`<`"span"`, `any`, `Object`, `never`\>

---

### TitleBar

• `Const` **TitleBar**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### TopRow

• `Const` **TopRow**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

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
