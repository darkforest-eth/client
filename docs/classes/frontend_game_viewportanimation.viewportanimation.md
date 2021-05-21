# Class: ViewportAnimation

[Frontend/Game/ViewportAnimation](../modules/frontend_game_viewportanimation.md).ViewportAnimation

## Table of contents

### Constructors

- [constructor](frontend_game_viewportanimation.viewportanimation.md#constructor)

### Properties

- [coordsEnd](frontend_game_viewportanimation.viewportanimation.md#coordsend)
- [coordsStart](frontend_game_viewportanimation.viewportanimation.md#coordsstart)
- [durationMs](frontend_game_viewportanimation.viewportanimation.md#durationms)
- [heightEnd](frontend_game_viewportanimation.viewportanimation.md#heightend)
- [heightStart](frontend_game_viewportanimation.viewportanimation.md#heightstart)
- [timeStarted](frontend_game_viewportanimation.viewportanimation.md#timestarted)

### Methods

- [apply](frontend_game_viewportanimation.viewportanimation.md#apply)
- [between](frontend_game_viewportanimation.viewportanimation.md#between)

## Constructors

### constructor

\+ **new ViewportAnimation**(`timeStarted`: _number_, `coordsStart`: WorldCoords, `coordsEnd`: WorldCoords, `heightStart`: _number_, `heightEnd`: _number_, `durationMs`: _number_): [_ViewportAnimation_](frontend_game_viewportanimation.viewportanimation.md)

#### Parameters

| Name          | Type        |
| :------------ | :---------- |
| `timeStarted` | _number_    |
| `coordsStart` | WorldCoords |
| `coordsEnd`   | WorldCoords |
| `heightStart` | _number_    |
| `heightEnd`   | _number_    |
| `durationMs`  | _number_    |

**Returns:** [_ViewportAnimation_](frontend_game_viewportanimation.viewportanimation.md)

## Properties

### coordsEnd

• `Readonly` **coordsEnd**: WorldCoords

---

### coordsStart

• `Readonly` **coordsStart**: WorldCoords

---

### durationMs

• `Readonly` **durationMs**: _number_

---

### heightEnd

• `Readonly` **heightEnd**: _number_

---

### heightStart

• `Readonly` **heightStart**: _number_

---

### timeStarted

• `Readonly` **timeStarted**: _number_

## Methods

### apply

▸ **apply**(`percent`: _number_, `viewport`: [_default_](frontend_game_viewport.default.md)): _void_

#### Parameters

| Name       | Type                                           |
| :--------- | :--------------------------------------------- |
| `percent`  | _number_                                       |
| `viewport` | [_default_](frontend_game_viewport.default.md) |

**Returns:** _void_

---

### between

▸ `Static` **between**(`timeStarted`: _number_, `from`: WorldCoords, `to`: WorldCoords, `heightStart`: _number_, `heightEnd`: _number_): [_ViewportAnimation_](frontend_game_viewportanimation.viewportanimation.md)

#### Parameters

| Name          | Type        |
| :------------ | :---------- |
| `timeStarted` | _number_    |
| `from`        | WorldCoords |
| `to`          | WorldCoords |
| `heightStart` | _number_    |
| `heightEnd`   | _number_    |

**Returns:** [_ViewportAnimation_](frontend_game_viewportanimation.viewportanimation.md)
