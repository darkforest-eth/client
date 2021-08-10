# Module: Frontend/Utils/KeyEmitters

## Table of contents

### Variables

- [SpecialKey](Frontend_Utils_KeyEmitters.md#specialkey)
- [keyDown$](Frontend_Utils_KeyEmitters.md#keydown$)
- [keyUp$](Frontend_Utils_KeyEmitters.md#keyup$)

### Functions

- [listenForKeyboardEvents](Frontend_Utils_KeyEmitters.md#listenforkeyboardevents)
- [unlinkKeyboardEvents](Frontend_Utils_KeyEmitters.md#unlinkkeyboardevents)
- [useIsDown](Frontend_Utils_KeyEmitters.md#useisdown)
- [useOnUp](Frontend_Utils_KeyEmitters.md#useonup)

## Variables

### SpecialKey

• `Const` **SpecialKey**: `Object`

#### Type declaration

| Name      | Type        |
| :-------- | :---------- |
| `Control` | `"Control"` |
| `Escape`  | `"Escape"`  |
| `Shift`   | `"Shift"`   |
| `Space`   | `" "`       |
| `Tab`     | `"Tab"`     |

---

### keyDown$

• `Const` **keyDown$**: `Monomitter`<[`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`string`\>\>

---

### keyUp$

• `Const` **keyUp$**: `Monomitter`<[`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`string`\>\>

## Functions

### listenForKeyboardEvents

▸ **listenForKeyboardEvents**(): `void`

#### Returns

`void`

---

### unlinkKeyboardEvents

▸ **unlinkKeyboardEvents**(): `void`

#### Returns

`void`

---

### useIsDown

▸ **useIsDown**(`key?`): `boolean`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `key?` | `string` |

#### Returns

`boolean`

---

### useOnUp

▸ **useOnUp**(`key?`, `onUp?`): `void`

#### Parameters

| Name    | Type         |
| :------ | :----------- |
| `key?`  | `string`     |
| `onUp?` | () => `void` |

#### Returns

`void`
