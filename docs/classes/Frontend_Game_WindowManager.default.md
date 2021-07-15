# Class: default

[Frontend/Game/WindowManager](../modules/Frontend_Game_WindowManager.md).default

## Hierarchy

- `EventEmitter`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](Frontend_Game_WindowManager.default.md#constructor)

### Properties

- [currentTooltip](Frontend_Game_WindowManager.default.md#currenttooltip)
- [cursorState](Frontend_Game_WindowManager.default.md#cursorstate)
- [lastZIndex](Frontend_Game_WindowManager.default.md#lastzindex)
- [mousePos](Frontend_Game_WindowManager.default.md#mousepos)
- [mousedownPos](Frontend_Game_WindowManager.default.md#mousedownpos)
- [instance](Frontend_Game_WindowManager.default.md#instance)

### Methods

- [acceptInputForTarget](Frontend_Game_WindowManager.default.md#acceptinputfortarget)
- [getClickDelta](Frontend_Game_WindowManager.default.md#getclickdelta)
- [getCursorState](Frontend_Game_WindowManager.default.md#getcursorstate)
- [getIndex](Frontend_Game_WindowManager.default.md#getindex)
- [getTooltip](Frontend_Game_WindowManager.default.md#gettooltip)
- [setCursorState](Frontend_Game_WindowManager.default.md#setcursorstate)
- [setTooltip](Frontend_Game_WindowManager.default.md#settooltip)
- [getInstance](Frontend_Game_WindowManager.default.md#getinstance)

## Constructors

### constructor

• `Private` **new default**()

#### Overrides

EventEmitter.constructor

## Properties

### currentTooltip

• `Private` **currentTooltip**: [`TooltipName`](../enums/Frontend_Game_WindowManager.TooltipName.md)

---

### cursorState

• `Private` **cursorState**: [`CursorState`](../enums/Frontend_Game_WindowManager.CursorState.md)

---

### lastZIndex

• `Private` **lastZIndex**: `number`

---

### mousePos

• `Private` **mousePos**: [`MousePos`](../modules/Frontend_Game_WindowManager.md#mousepos)

---

### mousedownPos

• `Private` **mousedownPos**: `null` \| [`MousePos`](../modules/Frontend_Game_WindowManager.md#mousepos)

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

### getClickDelta

▸ **getClickDelta**(): [`MousePos`](../modules/Frontend_Game_WindowManager.md#mousepos)

#### Returns

[`MousePos`](../modules/Frontend_Game_WindowManager.md#mousepos)

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

### getTooltip

▸ **getTooltip**(): [`TooltipName`](../enums/Frontend_Game_WindowManager.TooltipName.md)

#### Returns

[`TooltipName`](../enums/Frontend_Game_WindowManager.TooltipName.md)

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

### setTooltip

▸ **setTooltip**(`tooltip`): `void`

#### Parameters

| Name      | Type                                                                 |
| :-------- | :------------------------------------------------------------------- |
| `tooltip` | [`TooltipName`](../enums/Frontend_Game_WindowManager.TooltipName.md) |

#### Returns

`void`

---

### getInstance

▸ `Static` **getInstance**(): [`default`](Frontend_Game_WindowManager.default.md)

#### Returns

[`default`](Frontend_Game_WindowManager.default.md)
