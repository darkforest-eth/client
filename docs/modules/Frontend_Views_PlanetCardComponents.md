# Module: Frontend/Views/PlanetCardComponents

## Table of contents

### Variables

- [DestroyedMarker](Frontend_Views_PlanetCardComponents.md#destroyedmarker)
- [TitleBar](Frontend_Views_PlanetCardComponents.md#titlebar)

### Functions

- [PlanetActiveArtifact](Frontend_Views_PlanetCardComponents.md#planetactiveartifact)
- [RowTip](Frontend_Views_PlanetCardComponents.md#rowtip)
- [TimesTwo](Frontend_Views_PlanetCardComponents.md#timestwo)

## Variables

### DestroyedMarker

• `Const` **DestroyedMarker**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

Displayed in [PlanetContextPane](Frontend_Panes_PlanetContextPane.md#planetcontextpane) when a planet is {@code destroyed}.

---

### TitleBar

• `Const` **TitleBar**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

## Functions

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

---

### TimesTwo

▸ `Const` **TimesTwo**(): `Element`

#### Returns

`Element`
