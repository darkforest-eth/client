# Module: Frontend/Components/Text

## Table of contents

### Variables

- [BasicLink](frontend_components_text.md#basiclink)
- [Blue](frontend_components_text.md#blue)
- [Colored](frontend_components_text.md#colored)
- [Gold](frontend_components_text.md#gold)
- [Green](frontend_components_text.md#green)
- [HideSmall](frontend_components_text.md#hidesmall)
- [Invisible](frontend_components_text.md#invisible)
- [Item](frontend_components_text.md#item)
- [List](frontend_components_text.md#list)
- [Paragraph](frontend_components_text.md#paragraph)
- [Red](frontend_components_text.md#red)
- [Smaller](frontend_components_text.md#smaller)
- [StyledLink](frontend_components_text.md#styledlink)
- [Sub](frontend_components_text.md#sub)
- [Subber](frontend_components_text.md#subber)
- [White](frontend_components_text.md#white)

### Functions

- [ArtifactNameLink](frontend_components_text.md#artifactnamelink)
- [BlinkCursor](frontend_components_text.md#blinkcursor)
- [CenterChunkLink](frontend_components_text.md#centerchunklink)
- [CenterPlanetLink](frontend_components_text.md#centerplanetlink)
- [Coords](frontend_components_text.md#coords)
- [FAQ04Link](frontend_components_text.md#faq04link)
- [FakeLine](frontend_components_text.md#fakeline)
- [Header](frontend_components_text.md#header)
- [Link](frontend_components_text.md#link)
- [LongDash](frontend_components_text.md#longdash)
- [PlanetNameLink](frontend_components_text.md#planetnamelink)
- [Space](frontend_components_text.md#space)
- [Tab](frontend_components_text.md#tab)
- [Text](frontend_components_text.md#text)
- [Title](frontend_components_text.md#title)
- [TxLink](frontend_components_text.md#txlink)

## Variables

### BasicLink

• `Const` **BasicLink**: _StyledComponent_<`"u"`, any, {}, never\>

---

### Blue

• `Const` **Blue**: _StyledComponent_<`"span"`, any, {}, never\>

---

### Colored

• `Const` **Colored**: _StyledComponent_<`"span"`, any, { `color`: _string_ }, never\>

---

### Gold

• `Const` **Gold**: _StyledComponent_<`"span"`, any, {}, never\>

---

### Green

• `Const` **Green**: _StyledComponent_<`"span"`, any, {}, never\>

---

### HideSmall

• `Const` **HideSmall**: _StyledComponent_<`"span"`, any, {}, never\>

---

### Invisible

• `Const` **Invisible**: _StyledComponent_<`"span"`, any, {}, never\>

---

### Item

• `Const` **Item**: _StyledComponent_<`"li"`, any, {}, never\>

---

### List

• `Const` **List**: _StyledComponent_<`"ul"`, any, {}, never\>

---

### Paragraph

• `Const` **Paragraph**: _StyledComponent_<`"p"`, any, {}, never\>

---

### Red

• `Const` **Red**: _StyledComponent_<`"span"`, any, {}, never\>

---

### Smaller

• `Const` **Smaller**: _StyledComponent_<`"span"`, any, {}, never\>

---

### StyledLink

• `Const` **StyledLink**: _StyledComponent_<`"span"`, any, {}, never\>

---

### Sub

• `Const` **Sub**: _StyledComponent_<`"span"`, any, {}, never\>

---

### Subber

• `Const` **Subber**: _StyledComponent_<`"span"`, any, {}, never\>

---

### White

• `Const` **White**: _StyledComponent_<`"span"`, any, {}, never\>

## Functions

### ArtifactNameLink

▸ **ArtifactNameLink**(`__namedParameters`: { `id`: ArtifactId }): _Element_

#### Parameters

| Name                   | Type       |
| :--------------------- | :--------- |
| `__namedParameters`    | _object_   |
| `__namedParameters.id` | ArtifactId |

**Returns:** _Element_

---

### BlinkCursor

▸ **BlinkCursor**(): _Element_

**Returns:** _Element_

---

### CenterChunkLink

▸ **CenterChunkLink**(`__namedParameters`: { `children`: React.ReactNode ; `chunk`: [_Chunk_](../classes/_types_global_globaltypes.chunk.md) }): _Element_

#### Parameters

| Name                         | Type                                                     |
| :--------------------------- | :------------------------------------------------------- |
| `__namedParameters`          | _object_                                                 |
| `__namedParameters.children` | React.ReactNode                                          |
| `__namedParameters.chunk`    | [_Chunk_](../classes/_types_global_globaltypes.chunk.md) |

**Returns:** _Element_

---

### CenterPlanetLink

▸ **CenterPlanetLink**(`__namedParameters`: { `children`: React.ReactNode ; `planet`: Planet }): _Element_

#### Parameters

| Name                         | Type            |
| :--------------------------- | :-------------- |
| `__namedParameters`          | _object_        |
| `__namedParameters.children` | React.ReactNode |
| `__namedParameters.planet`   | Planet          |

**Returns:** _Element_

---

### Coords

▸ `Const` **Coords**(`__namedParameters`: { `coords`: WorldCoords }): _Element_

#### Parameters

| Name                       | Type        |
| :------------------------- | :---------- |
| `__namedParameters`        | _object_    |
| `__namedParameters.coords` | WorldCoords |

**Returns:** _Element_

---

### FAQ04Link

▸ **FAQ04Link**(`__namedParameters`: { `children`: React.ReactNode }): _Element_

#### Parameters

| Name                         | Type            |
| :--------------------------- | :-------------- |
| `__namedParameters`          | _object_        |
| `__namedParameters.children` | React.ReactNode |

**Returns:** _Element_

---

### FakeLine

▸ `Const` **FakeLine**(): _Element_

**Returns:** _Element_

---

### Header

▸ **Header**(`__namedParameters`: { `children`: React.ReactNode ; `style?`: React.CSSProperties }): _Element_

#### Parameters

| Name                         | Type                |
| :--------------------------- | :------------------ |
| `__namedParameters`          | _object_            |
| `__namedParameters.children` | React.ReactNode     |
| `__namedParameters.style?`   | React.CSSProperties |

**Returns:** _Element_

---

### Link

▸ **Link**(`__namedParameters`: LinkProps): _Element_

#### Parameters

| Name                | Type      |
| :------------------ | :-------- |
| `__namedParameters` | LinkProps |

**Returns:** _Element_

---

### LongDash

▸ `Const` **LongDash**(): _Element_

**Returns:** _Element_

---

### PlanetNameLink

▸ **PlanetNameLink**(`__namedParameters`: { `planet`: Planet }): _Element_

#### Parameters

| Name                       | Type     |
| :------------------------- | :------- |
| `__namedParameters`        | _object_ |
| `__namedParameters.planet` | Planet   |

**Returns:** _Element_

---

### Space

▸ **Space**(`__namedParameters`: { `length`: _number_ }): _Element_

#### Parameters

| Name                       | Type     |
| :------------------------- | :------- |
| `__namedParameters`        | _object_ |
| `__namedParameters.length` | _number_ |

**Returns:** _Element_

---

### Tab

▸ `Const` **Tab**(): _Element_

**Returns:** _Element_

---

### Text

▸ **Text**(`__namedParameters`: TextProps): _Element_

#### Parameters

| Name                | Type      |
| :------------------ | :-------- |
| `__namedParameters` | TextProps |

**Returns:** _Element_

---

### Title

▸ **Title**(`__namedParameters`: { `children`: React.ReactNode }): _Element_

#### Parameters

| Name                         | Type            |
| :--------------------------- | :-------------- |
| `__namedParameters`          | _object_        |
| `__namedParameters.children` | React.ReactNode |

**Returns:** _Element_

---

### TxLink

▸ **TxLink**(`__namedParameters`: { `tx`: SubmittedTx }): _Element_

#### Parameters

| Name                   | Type        |
| :--------------------- | :---------- |
| `__namedParameters`    | _object_    |
| `__namedParameters.tx` | SubmittedTx |

**Returns:** _Element_
