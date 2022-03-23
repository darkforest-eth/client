# Module: Frontend/Components/Text

## Table of contents

### Variables

- [Blue](Frontend_Components_Text.md#blue)
- [Colored](Frontend_Components_Text.md#colored)
- [Gold](Frontend_Components_Text.md#gold)
- [Green](Frontend_Components_Text.md#green)
- [HideSmall](Frontend_Components_Text.md#hidesmall)
- [Invisible](Frontend_Components_Text.md#invisible)
- [Red](Frontend_Components_Text.md#red)
- [Smaller](Frontend_Components_Text.md#smaller)
- [Sub](Frontend_Components_Text.md#sub)
- [Subber](Frontend_Components_Text.md#subber)
- [Text](Frontend_Components_Text.md#text)
- [White](Frontend_Components_Text.md#white)

### Functions

- [ArtifactNameLink](Frontend_Components_Text.md#artifactnamelink)
- [BlinkCursor](Frontend_Components_Text.md#blinkcursor)
- [CenterChunkLink](Frontend_Components_Text.md#centerchunklink)
- [CenterPlanetLink](Frontend_Components_Text.md#centerplanetlink)
- [Coords](Frontend_Components_Text.md#coords)
- [FAQ04Link](Frontend_Components_Text.md#faq04link)
- [LongDash](Frontend_Components_Text.md#longdash)
- [PlanetNameLink](Frontend_Components_Text.md#planetnamelink)
- [TxLink](Frontend_Components_Text.md#txlink)

## Variables

### Blue

• `Const` **Blue**: `StyledComponent`<`"span"`, `any`, {}, `never`\>

---

### Colored

• `Const` **Colored**: `StyledComponent`<`"span"`, `any`, { `color`: `string` }, `never`\>

---

### Gold

• `Const` **Gold**: `StyledComponent`<`"span"`, `any`, {}, `never`\>

---

### Green

• `Const` **Green**: `StyledComponent`<`"span"`, `any`, {}, `never`\>

---

### HideSmall

• `Const` **HideSmall**: `StyledComponent`<`"span"`, `any`, {}, `never`\>

---

### Invisible

• `Const` **Invisible**: `StyledComponent`<`"span"`, `any`, {}, `never`\>

---

### Red

• `Const` **Red**: `StyledComponent`<`"span"`, `any`, {}, `never`\>

---

### Smaller

• `Const` **Smaller**: `StyledComponent`<`"span"`, `any`, {}, `never`\>

---

### Sub

• `Const` **Sub**: `StyledComponent`<`"span"`, `any`, {}, `never`\>

---

### Subber

• `Const` **Subber**: `StyledComponent`<`"span"`, `any`, {}, `never`\>

---

### Text

• `Const` **Text**: `StyledComponent`<`"span"`, `any`, {}, `never`\>

---

### White

• `Const` **White**: `StyledComponent`<`"span"`, `any`, {}, `never`\>

## Functions

### ArtifactNameLink

▸ **ArtifactNameLink**(`__namedParameters`): `Element`

#### Parameters

| Name                   | Type         |
| :--------------------- | :----------- |
| `__namedParameters`    | `Object`     |
| `__namedParameters.id` | `ArtifactId` |

#### Returns

`Element`

---

### BlinkCursor

▸ **BlinkCursor**(): `Element`

#### Returns

`Element`

---

### CenterChunkLink

▸ **CenterChunkLink**(`__namedParameters`): `Element`

#### Parameters

| Name                         | Type        |
| :--------------------------- | :---------- |
| `__namedParameters`          | `Object`    |
| `__namedParameters.children` | `ReactNode` |
| `__namedParameters.chunk`    | `Chunk`     |

#### Returns

`Element`

---

### CenterPlanetLink

▸ **CenterPlanetLink**(`__namedParameters`): `Element`

#### Parameters

| Name                         | Type        |
| :--------------------------- | :---------- |
| `__namedParameters`          | `Object`    |
| `__namedParameters.children` | `ReactNode` |
| `__namedParameters.planet`   | `Planet`    |

#### Returns

`Element`

---

### Coords

▸ **Coords**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type          |
| :------------------------- | :------------ |
| `__namedParameters`        | `Object`      |
| `__namedParameters.coords` | `WorldCoords` |

#### Returns

`Element`

---

### FAQ04Link

▸ **FAQ04Link**(`__namedParameters`): `Element`

#### Parameters

| Name                         | Type        |
| :--------------------------- | :---------- |
| `__namedParameters`          | `Object`    |
| `__namedParameters.children` | `ReactNode` |

#### Returns

`Element`

---

### LongDash

▸ **LongDash**(): `Element`

#### Returns

`Element`

---

### PlanetNameLink

▸ **PlanetNameLink**(`__namedParameters`): `Element`

#### Parameters

| Name                       | Type     |
| :------------------------- | :------- |
| `__namedParameters`        | `Object` |
| `__namedParameters.planet` | `Planet` |

#### Returns

`Element`

---

### TxLink

▸ **TxLink**(`__namedParameters`): `Element`

#### Parameters

| Name                   | Type                       |
| :--------------------- | :------------------------- |
| `__namedParameters`    | `Object`                   |
| `__namedParameters.tx` | `Transaction`<`TxIntent`\> |

#### Returns

`Element`
