# Module: Frontend/Views/PlanetCardComponents

## Table of contents

### Variables

- [ArtifactSection](frontend_views_planetcardcomponents.md#artifactsection)
- [BigStatCell](frontend_views_planetcardcomponents.md#bigstatcell)
- [DestroyedMarker](frontend_views_planetcardcomponents.md#destroyedmarker)
- [IconsWrapper](frontend_views_planetcardcomponents.md#iconswrapper)
- [PlanetTag](frontend_views_planetcardcomponents.md#planettag)
- [PreviewSection](frontend_views_planetcardcomponents.md#previewsection)
- [Small](frontend_views_planetcardcomponents.md#small)
- [StatCell](frontend_views_planetcardcomponents.md#statcell)
- [StatRow](frontend_views_planetcardcomponents.md#statrow)
- [StatSection](frontend_views_planetcardcomponents.md#statsection)
- [StyledPlanetCard](frontend_views_planetcardcomponents.md#styledplanetcard)
- [StyledStatIcon](frontend_views_planetcardcomponents.md#styledstaticon)
- [TitleBar](frontend_views_planetcardcomponents.md#titlebar)
- [TopRow](frontend_views_planetcardcomponents.md#toprow)

### Functions

- [PCStatIcon](frontend_views_planetcardcomponents.md#pcstaticon)
- [PlanetActiveArtifact](frontend_views_planetcardcomponents.md#planetactiveartifact)
- [RowTip](frontend_views_planetcardcomponents.md#rowtip)

## Variables

### ArtifactSection

• `Const` **ArtifactSection**: _StyledComponent_<`"div"`, any, {}, never\>

---

### BigStatCell

• `Const` **BigStatCell**: _StyledComponent_<`"div"`, any, {}, never\>

---

### DestroyedMarker

• `Const` **DestroyedMarker**: _StyledComponent_<`"div"`, any, {}, never\>

---

### IconsWrapper

• `Const` **IconsWrapper**: _StyledComponent_<`"div"`, any, {}, never\>

---

### PlanetTag

• `Const` **PlanetTag**: _StyledComponent_<`"div"`, any, { `planet`: _undefined_ \| Planet }, never\>

---

### PreviewSection

• `Const` **PreviewSection**: _StyledComponent_<`"div"`, any, {}, never\>

---

### Small

• `Const` **Small**: _StyledComponent_<`"div"`, any, { `planet`: _undefined_ \| Planet }, never\>

---

### StatCell

• `Const` **StatCell**: _StyledComponent_<`"div"`, any, {}, never\>

---

### StatRow

• `Const` **StatRow**: _StyledComponent_<`"div"`, any, {}, never\>

---

### StatSection

• `Const` **StatSection**: _StyledComponent_<`"div"`, any, {}, never\>

---

### StyledPlanetCard

• `Const` **StyledPlanetCard**: _StyledComponent_<`"div"`, any, {}, never\>

---

### StyledStatIcon

• `Const` **StyledStatIcon**: _StyledComponent_<`"span"`, any, {}, never\>

---

### TitleBar

• `Const` **TitleBar**: _StyledComponent_<`"div"`, any, {}, never\>

---

### TopRow

• `Const` **TopRow**: _StyledComponent_<`"div"`, any, {}, never\>

## Functions

### PCStatIcon

▸ **PCStatIcon**(`__namedParameters`: { `children`: React.ReactNode ; `planet`: Planet \| _undefined_ ; `stat`: [_StatIdx_](../enums/_types_global_globaltypes.statidx.md) }): _Element_

#### Parameters

| Name                         | Type                                                       |
| :--------------------------- | :--------------------------------------------------------- |
| `__namedParameters`          | _object_                                                   |
| `__namedParameters.children` | React.ReactNode                                            |
| `__namedParameters.planet`   | Planet \| _undefined_                                      |
| `__namedParameters.stat`     | [_StatIdx_](../enums/_types_global_globaltypes.statidx.md) |

**Returns:** _Element_

---

### PlanetActiveArtifact

▸ **PlanetActiveArtifact**(`__namedParameters`: { `artifact`: Artifact ; `planet`: Planet \| _undefined_ }): _Element_

#### Parameters

| Name                         | Type                  |
| :--------------------------- | :-------------------- |
| `__namedParameters`          | _object_              |
| `__namedParameters.artifact` | Artifact              |
| `__namedParameters.planet`   | Planet \| _undefined_ |

**Returns:** _Element_

---

### RowTip

▸ `Const` **RowTip**(`__namedParameters`: { `children`: ReactNode ; `name`: [_TooltipName_](../enums/frontend_game_windowmanager.tooltipname.md) }): _Element_

#### Parameters

| Name                         | Type                                                                 |
| :--------------------------- | :------------------------------------------------------------------- |
| `__namedParameters`          | _object_                                                             |
| `__namedParameters.children` | ReactNode                                                            |
| `__namedParameters.name`     | [_TooltipName_](../enums/frontend_game_windowmanager.tooltipname.md) |

**Returns:** _Element_
