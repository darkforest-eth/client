# Class: default

[Frontend/Game/WindowManager](../modules/frontend_game_windowmanager.md).default

## Hierarchy

- _EventEmitter_

  ↳ **default**

## Table of contents

### Constructors

- [constructor](frontend_game_windowmanager.default.md#constructor)

### Properties

- [currentTooltip](frontend_game_windowmanager.default.md#currenttooltip)
- [cursorState](frontend_game_windowmanager.default.md#cursorstate)
- [lastZIndex](frontend_game_windowmanager.default.md#lastzindex)
- [mousePos](frontend_game_windowmanager.default.md#mousepos)
- [mousedownPos](frontend_game_windowmanager.default.md#mousedownpos)
- [instance](frontend_game_windowmanager.default.md#instance)

### Methods

- [acceptInputForTarget](frontend_game_windowmanager.default.md#acceptinputfortarget)
- [getClickDelta](frontend_game_windowmanager.default.md#getclickdelta)
- [getCursorState](frontend_game_windowmanager.default.md#getcursorstate)
- [getIndex](frontend_game_windowmanager.default.md#getindex)
- [getTooltip](frontend_game_windowmanager.default.md#gettooltip)
- [setCursorState](frontend_game_windowmanager.default.md#setcursorstate)
- [setTooltip](frontend_game_windowmanager.default.md#settooltip)
- [getInstance](frontend_game_windowmanager.default.md#getinstance)

## Constructors

### constructor

\+ `Private` **new default**(): [_default_](frontend_game_windowmanager.default.md)

**Returns:** [_default_](frontend_game_windowmanager.default.md)

Overrides: EventEmitter.constructor

## Properties

### currentTooltip

• `Private` **currentTooltip**: [_TooltipName_](../enums/frontend_game_windowmanager.tooltipname.md)

---

### cursorState

• `Private` **cursorState**: [_CursorState_](../enums/frontend_game_windowmanager.cursorstate.md)

---

### lastZIndex

• `Private` **lastZIndex**: _number_

---

### mousePos

• `Private` **mousePos**: [_MousePos_](../modules/frontend_game_windowmanager.md#mousepos)

---

### mousedownPos

• `Private` **mousedownPos**: `null` \| [_MousePos_](../modules/frontend_game_windowmanager.md#mousepos)

---

### instance

▪ `Static` **instance**: [_default_](frontend_game_windowmanager.default.md)

## Methods

### acceptInputForTarget

▸ **acceptInputForTarget**(`input`: WorldCoords): _void_

#### Parameters

| Name    | Type        |
| :------ | :---------- |
| `input` | WorldCoords |

**Returns:** _void_

---

### getClickDelta

▸ **getClickDelta**(): [_MousePos_](../modules/frontend_game_windowmanager.md#mousepos)

**Returns:** [_MousePos_](../modules/frontend_game_windowmanager.md#mousepos)

---

### getCursorState

▸ **getCursorState**(): [_CursorState_](../enums/frontend_game_windowmanager.cursorstate.md)

**Returns:** [_CursorState_](../enums/frontend_game_windowmanager.cursorstate.md)

---

### getIndex

▸ **getIndex**(): _number_

**Returns:** _number_

---

### getTooltip

▸ **getTooltip**(): [_TooltipName_](../enums/frontend_game_windowmanager.tooltipname.md)

**Returns:** [_TooltipName_](../enums/frontend_game_windowmanager.tooltipname.md)

---

### setCursorState

▸ **setCursorState**(`newstate`: [_CursorState_](../enums/frontend_game_windowmanager.cursorstate.md)): _void_

#### Parameters

| Name       | Type                                                                 |
| :--------- | :------------------------------------------------------------------- |
| `newstate` | [_CursorState_](../enums/frontend_game_windowmanager.cursorstate.md) |

**Returns:** _void_

---

### setTooltip

▸ **setTooltip**(`tooltip`: [_TooltipName_](../enums/frontend_game_windowmanager.tooltipname.md)): _void_

#### Parameters

| Name      | Type                                                                 |
| :-------- | :------------------------------------------------------------------- |
| `tooltip` | [_TooltipName_](../enums/frontend_game_windowmanager.tooltipname.md) |

**Returns:** _void_

---

### getInstance

▸ `Static` **getInstance**(): [_default_](frontend_game_windowmanager.default.md)

**Returns:** [_default_](frontend_game_windowmanager.default.md)
