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

• `Const` **Blue**: `StyledComponent`<`"span"`, `any`, `Object`, `never`\>

---

### Colored

• `Const` **Colored**: `StyledComponent`<`"span"`, `any`, `Object`, `never`\>

---

### Gold

• `Const` **Gold**: `StyledComponent`<`"span"`, `any`, `Object`, `never`\>

---

### Green

• `Const` **Green**: `StyledComponent`<`"span"`, `any`, `Object`, `never`\>

---

### HideSmall

• `Const` **HideSmall**: `StyledComponent`<`"span"`, `any`, `Object`, `never`\>

---

### Invisible

• `Const` **Invisible**: `StyledComponent`<`"span"`, `any`, `Object`, `never`\>

---

### Red

• `Const` **Red**: `StyledComponent`<`"span"`, `any`, `Object`, `never`\>

---

### Smaller

• `Const` **Smaller**: `StyledComponent`<`"span"`, `any`, `Object`, `never`\>

---

### Sub

• `Const` **Sub**: `StyledComponent`<`"span"`, `any`, `Object`, `never`\>

---

### Subber

• `Const` **Subber**: `StyledComponent`<`"span"`, `any`, `Object`, `never`\>

---

### Text

• `Const` **Text**: `StyledComponent`<`"span"`, `any`, `Object`, `never`\>

---

### White

• `Const` **White**: `StyledComponent`<`"span"`, `any`, `Object`, `never`\>

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

| Name                         | Type                                                     |
| :--------------------------- | :------------------------------------------------------- |
| `__namedParameters`          | `Object`                                                 |
| `__namedParameters.children` | `React.ReactNode`                                        |
| `__namedParameters.chunk`    | [`Chunk`](../classes/_types_global_GlobalTypes.Chunk.md) |

#### Returns

`Element`

---

### CenterPlanetLink

▸ **CenterPlanetLink**(`__namedParameters`): `Element`

#### Parameters

| Name                         | Type              |
| :--------------------------- | :---------------- |
| `__namedParameters`          | `Object`          |
| `__namedParameters.children` | `React.ReactNode` |
| `__namedParameters.planet`   | `Planet`          |

#### Returns

`Element`

---

### Coords

▸ `Const` **Coords**(`__namedParameters`): `Element`

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

| Name                         | Type              |
| :--------------------------- | :---------------- |
| `__namedParameters`          | `Object`          |
| `__namedParameters.children` | `React.ReactNode` |

#### Returns

`Element`

---

### LongDash

▸ `Const` **LongDash**(): `Element`

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

| Name                   | Type          |
| :--------------------- | :------------ |
| `__namedParameters`    | `Object`      |
| `__namedParameters.tx` | `SubmittedTx` |

#### Returns

`Element`
