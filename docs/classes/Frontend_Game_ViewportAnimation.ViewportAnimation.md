# Class: ViewportAnimation

[Frontend/Game/ViewportAnimation](../modules/Frontend_Game_ViewportAnimation.md).ViewportAnimation

## Table of contents

### Constructors

- [constructor](Frontend_Game_ViewportAnimation.ViewportAnimation.md#constructor)

### Properties

- [coordsEnd](Frontend_Game_ViewportAnimation.ViewportAnimation.md#coordsend)
- [coordsStart](Frontend_Game_ViewportAnimation.ViewportAnimation.md#coordsstart)
- [durationMs](Frontend_Game_ViewportAnimation.ViewportAnimation.md#durationms)
- [heightEnd](Frontend_Game_ViewportAnimation.ViewportAnimation.md#heightend)
- [heightStart](Frontend_Game_ViewportAnimation.ViewportAnimation.md#heightstart)
- [timeStarted](Frontend_Game_ViewportAnimation.ViewportAnimation.md#timestarted)

### Methods

- [apply](Frontend_Game_ViewportAnimation.ViewportAnimation.md#apply)
- [between](Frontend_Game_ViewportAnimation.ViewportAnimation.md#between)

## Constructors

### constructor

• **new ViewportAnimation**(`timeStarted`, `coordsStart`, `coordsEnd`, `heightStart`, `heightEnd`, `durationMs`)

#### Parameters

| Name          | Type          |
| :------------ | :------------ |
| `timeStarted` | `number`      |
| `coordsStart` | `WorldCoords` |
| `coordsEnd`   | `WorldCoords` |
| `heightStart` | `number`      |
| `heightEnd`   | `number`      |
| `durationMs`  | `number`      |

## Properties

### coordsEnd

• `Readonly` **coordsEnd**: `WorldCoords`

---

### coordsStart

• `Readonly` **coordsStart**: `WorldCoords`

---

### durationMs

• `Readonly` **durationMs**: `number`

---

### heightEnd

• `Readonly` **heightEnd**: `number`

---

### heightStart

• `Readonly` **heightStart**: `number`

---

### timeStarted

• `Readonly` **timeStarted**: `number`

## Methods

### apply

▸ **apply**(`percent`, `viewport`): `void`

#### Parameters

| Name       | Type                                           |
| :--------- | :--------------------------------------------- |
| `percent`  | `number`                                       |
| `viewport` | [`default`](Frontend_Game_Viewport.default.md) |

#### Returns

`void`

---

### between

▸ `Static` **between**(`timeStarted`, `from`, `to`, `heightStart`, `heightEnd`): [`ViewportAnimation`](Frontend_Game_ViewportAnimation.ViewportAnimation.md)

#### Parameters

| Name          | Type          |
| :------------ | :------------ |
| `timeStarted` | `number`      |
| `from`        | `WorldCoords` |
| `to`          | `WorldCoords` |
| `heightStart` | `number`      |
| `heightEnd`   | `number`      |

#### Returns

[`ViewportAnimation`](Frontend_Game_ViewportAnimation.ViewportAnimation.md)
