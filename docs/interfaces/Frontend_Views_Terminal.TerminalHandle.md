# Interface: TerminalHandle

[Frontend/Views/Terminal](../modules/Frontend_Views_Terminal.md).TerminalHandle

## Table of contents

### Methods

- [clear](Frontend_Views_Terminal.TerminalHandle.md#clear)
- [focus](Frontend_Views_Terminal.TerminalHandle.md#focus)
- [getInput](Frontend_Views_Terminal.TerminalHandle.md#getinput)
- [newline](Frontend_Views_Terminal.TerminalHandle.md#newline)
- [print](Frontend_Views_Terminal.TerminalHandle.md#print)
- [printElement](Frontend_Views_Terminal.TerminalHandle.md#printelement)
- [printLink](Frontend_Views_Terminal.TerminalHandle.md#printlink)
- [printLoadingBar](Frontend_Views_Terminal.TerminalHandle.md#printloadingbar)
- [printLoadingSpinner](Frontend_Views_Terminal.TerminalHandle.md#printloadingspinner)
- [printShellLn](Frontend_Views_Terminal.TerminalHandle.md#printshellln)
- [println](Frontend_Views_Terminal.TerminalHandle.md#println)
- [removeLast](Frontend_Views_Terminal.TerminalHandle.md#removelast)
- [setInput](Frontend_Views_Terminal.TerminalHandle.md#setinput)
- [setUserInputEnabled](Frontend_Views_Terminal.TerminalHandle.md#setuserinputenabled)

## Methods

### clear

▸ **clear**(): `void`

#### Returns

`void`

---

### focus

▸ **focus**(): `void`

#### Returns

`void`

---

### getInput

▸ **getInput**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

---

### newline

▸ **newline**(): `void`

#### Returns

`void`

---

### print

▸ **print**(`str`, `style?`): `void`

#### Parameters

| Name     | Type                                                                              |
| :------- | :-------------------------------------------------------------------------------- |
| `str`    | `string`                                                                          |
| `style?` | [`TerminalTextStyle`](../enums/Frontend_Utils_TerminalTypes.TerminalTextStyle.md) |

#### Returns

`void`

---

### printElement

▸ **printElement**(`element`): `void`

#### Parameters

| Name      | Type                                                                |
| :-------- | :------------------------------------------------------------------ |
| `element` | `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\> |

#### Returns

`void`

---

### printLink

▸ **printLink**(`str`, `onClick`, `style`): `void`

#### Parameters

| Name      | Type                                                                              |
| :-------- | :-------------------------------------------------------------------------------- |
| `str`     | `string`                                                                          |
| `onClick` | () => `void`                                                                      |
| `style`   | [`TerminalTextStyle`](../enums/Frontend_Utils_TerminalTypes.TerminalTextStyle.md) |

#### Returns

`void`

---

### printLoadingBar

▸ **printLoadingBar**(`prettyEntityName`, `ref`): `void`

#### Parameters

| Name               | Type                                                                                       |
| :----------------- | :----------------------------------------------------------------------------------------- |
| `prettyEntityName` | `string`                                                                                   |
| `ref`              | `RefObject`<[`LoadingBarHandle`](Frontend_Components_TextLoadingBar.LoadingBarHandle.md)\> |

#### Returns

`void`

---

### printLoadingSpinner

▸ **printLoadingSpinner**(): `void`

#### Returns

`void`

---

### printShellLn

▸ **printShellLn**(`str`): `void`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `str` | `string` |

#### Returns

`void`

---

### println

▸ **println**(`str`, `style?`): `void`

#### Parameters

| Name     | Type                                                                              |
| :------- | :-------------------------------------------------------------------------------- |
| `str`    | `string`                                                                          |
| `style?` | [`TerminalTextStyle`](../enums/Frontend_Utils_TerminalTypes.TerminalTextStyle.md) |

#### Returns

`void`

---

### removeLast

▸ **removeLast**(`n`): `void`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `n`  | `number` |

#### Returns

`void`

---

### setInput

▸ **setInput**(`input`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `input` | `string` |

#### Returns

`void`

---

### setUserInputEnabled

▸ **setUserInputEnabled**(`enabled`): `void`

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `enabled` | `boolean` |

#### Returns

`void`
