# Class: default

[Frontend/Game/ModalManager](../modules/Frontend_Game_ModalManager.md).default

## Hierarchy

- `EventEmitter`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](Frontend_Game_ModalManager.default.md#constructor)

### Properties

- [activeModalId$](Frontend_Game_ModalManager.default.md#activemodalid$)
- [cursorState](Frontend_Game_ModalManager.default.md#cursorstate)
- [lastIndex](Frontend_Game_ModalManager.default.md#lastindex)
- [modalPositionChanged$](Frontend_Game_ModalManager.default.md#modalpositionchanged$)
- [modalPositions](Frontend_Game_ModalManager.default.md#modalpositions)
- [modalPositions$](Frontend_Game_ModalManager.default.md#modalpositions$)
- [persistentChunkStore](Frontend_Game_ModalManager.default.md#persistentchunkstore)
- [instance](Frontend_Game_ModalManager.default.md#instance)

### Methods

- [acceptInputForTarget](Frontend_Game_ModalManager.default.md#acceptinputfortarget)
- [clearModalPosition](Frontend_Game_ModalManager.default.md#clearmodalposition)
- [getCursorState](Frontend_Game_ModalManager.default.md#getcursorstate)
- [getIndex](Frontend_Game_ModalManager.default.md#getindex)
- [getModalPosition](Frontend_Game_ModalManager.default.md#getmodalposition)
- [getModalPositions](Frontend_Game_ModalManager.default.md#getmodalpositions)
- [setCursorState](Frontend_Game_ModalManager.default.md#setcursorstate)
- [setModalPosition](Frontend_Game_ModalManager.default.md#setmodalposition)
- [setModalState](Frontend_Game_ModalManager.default.md#setmodalstate)
- [create](Frontend_Game_ModalManager.default.md#create)

## Constructors

### constructor

• `Private` **new default**(`persistentChunkStore`, `modalPositions`)

#### Parameters

| Name                   | Type                                                         |
| :--------------------- | :----------------------------------------------------------- |
| `persistentChunkStore` | [`default`](Backend_Storage_PersistentChunkStore.default.md) |
| `modalPositions`       | `Map`<`ModalId`, `ModalPosition`\>                           |

#### Overrides

EventEmitter.constructor

## Properties

### activeModalId$

• `Readonly` **activeModalId$**: `Monomitter`<`string`\>

---

### cursorState

• `Private` **cursorState**: `CursorState`

---

### lastIndex

• `Private` **lastIndex**: `number`

---

### modalPositionChanged$

• `Readonly` **modalPositionChanged$**: `Monomitter`<`ModalId`\>

---

### modalPositions

• `Private` **modalPositions**: `Map`<`ModalId`, `ModalPosition`\>

---

### modalPositions$

• **modalPositions$**: `Monomitter`<`Map`<`ModalId`, `ModalPosition`\>\>

---

### persistentChunkStore

• `Private` **persistentChunkStore**: [`default`](Backend_Storage_PersistentChunkStore.default.md)

---

### instance

▪ `Static` **instance**: [`default`](Frontend_Game_ModalManager.default.md)

## Methods

### acceptInputForTarget

▸ **acceptInputForTarget**(`input`): `void`

#### Parameters

| Name    | Type          |
| :------ | :------------ |
| `input` | `WorldCoords` |

#### Returns

`void`

---

### clearModalPosition

▸ **clearModalPosition**(`modalId`): `void`

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `modalId` | `ModalId` |

#### Returns

`void`

---

### getCursorState

▸ **getCursorState**(): `CursorState`

#### Returns

`CursorState`

---

### getIndex

▸ **getIndex**(): `number`

#### Returns

`number`

---

### getModalPosition

▸ **getModalPosition**(`modalId`): `undefined` \| `ModalPosition`

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `modalId` | `ModalId` |

#### Returns

`undefined` \| `ModalPosition`

---

### getModalPositions

▸ **getModalPositions**(`modalIds?`): `Map`<`ModalId`, `ModalPosition`\>

#### Parameters

| Name       | Type        | Default value |
| :--------- | :---------- | :------------ |
| `modalIds` | `ModalId`[] | `[]`          |

#### Returns

`Map`<`ModalId`, `ModalPosition`\>

---

### setCursorState

▸ **setCursorState**(`newstate`): `void`

#### Parameters

| Name       | Type          |
| :--------- | :------------ |
| `newstate` | `CursorState` |

#### Returns

`void`

---

### setModalPosition

▸ **setModalPosition**(`modalId`, `pos`): `void`

#### Parameters

| Name      | Type            |
| :-------- | :-------------- |
| `modalId` | `ModalId`       |
| `pos`     | `ModalPosition` |

#### Returns

`void`

---

### setModalState

▸ **setModalState**(`modalId`, `state`): `void`

#### Parameters

| Name      | Type                                    |
| :-------- | :-------------------------------------- |
| `modalId` | `ModalId`                               |
| `state`   | `"open"` \| `"minimized"` \| `"closed"` |

#### Returns

`void`

---

### create

▸ `Static` **create**(`persistentChunkStore`): `Promise`<[`default`](Frontend_Game_ModalManager.default.md)\>

#### Parameters

| Name                   | Type                                                         |
| :--------------------- | :----------------------------------------------------------- |
| `persistentChunkStore` | [`default`](Backend_Storage_PersistentChunkStore.default.md) |

#### Returns

`Promise`<[`default`](Frontend_Game_ModalManager.default.md)\>
