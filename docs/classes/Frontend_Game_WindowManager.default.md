# Class: default

[Frontend/Game/WindowManager](../modules/Frontend_Game_WindowManager.md).default

## Hierarchy

- `EventEmitter`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](Frontend_Game_WindowManager.default.md#constructor)

### Properties

- [activeWindowId$](Frontend_Game_WindowManager.default.md#activewindowid$)
- [cursorState](Frontend_Game_WindowManager.default.md#cursorstate)
- [lastZIndex](Frontend_Game_WindowManager.default.md#lastzindex)
- [instance](Frontend_Game_WindowManager.default.md#instance)

### Methods

- [acceptInputForTarget](Frontend_Game_WindowManager.default.md#acceptinputfortarget)
- [getCursorState](Frontend_Game_WindowManager.default.md#getcursorstate)
- [getIndex](Frontend_Game_WindowManager.default.md#getindex)
- [setCursorState](Frontend_Game_WindowManager.default.md#setcursorstate)
- [getInstance](Frontend_Game_WindowManager.default.md#getinstance)

## Constructors

### constructor

• `Private` **new default**()

#### Overrides

EventEmitter.constructor

## Properties

### activeWindowId$

• `Readonly` **activeWindowId$**: `Monomitter`<`string`\>

---

### cursorState

• `Private` **cursorState**: [`CursorState`](../enums/Frontend_Game_WindowManager.CursorState.md)

---

### lastZIndex

• `Private` **lastZIndex**: `number`

---

### instance

▪ `Static` **instance**: [`default`](Frontend_Game_WindowManager.default.md)

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

### getCursorState

▸ **getCursorState**(): [`CursorState`](../enums/Frontend_Game_WindowManager.CursorState.md)

#### Returns

[`CursorState`](../enums/Frontend_Game_WindowManager.CursorState.md)

---

### getIndex

▸ **getIndex**(): `number`

#### Returns

`number`

---

### setCursorState

▸ **setCursorState**(`newstate`): `void`

#### Parameters

| Name       | Type                                                                 |
| :--------- | :------------------------------------------------------------------- |
| `newstate` | [`CursorState`](../enums/Frontend_Game_WindowManager.CursorState.md) |

#### Returns

`void`

---

### getInstance

▸ `Static` **getInstance**(): [`default`](Frontend_Game_WindowManager.default.md)

#### Returns

[`default`](Frontend_Game_WindowManager.default.md)
