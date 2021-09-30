# Module: Frontend/Views/ModalPane

## Table of contents

### Enumerations

- [ModalName](../enums/Frontend_Views_ModalPane.ModalName.md)

### Interfaces

- [ModalFrame](../interfaces/Frontend_Views_ModalPane.ModalFrame.md)
- [ModalHandle](../interfaces/Frontend_Views_ModalPane.ModalHandle.md)

### Type aliases

- [ModalHook](Frontend_Views_ModalPane.md#modalhook)
- [ModalProps](Frontend_Views_ModalPane.md#modalprops)

### Functions

- [ModalPane](Frontend_Views_ModalPane.md#modalpane)

## Type aliases

### ModalHook

Ƭ **ModalHook**: [`Hook`](_types_global_GlobalTypes.md#hook)<`boolean`\>

---

### ModalProps

Ƭ **ModalProps**: [`PaneProps`](Frontend_Components_GameWindowComponents.md#paneprops) & { `borderColor?`: `string` ; `hideClose?`: `boolean` ; `hook`: [`Hook`](_types_global_GlobalTypes.md#hook)<`boolean`\> ; `initialPosition?`: { `x`: `number` ; `y`: `number` } ; `name?`: [`ModalName`](../enums/Frontend_Views_ModalPane.ModalName.md) ; `noPadding?`: `boolean` ; `style?`: `React.CSSProperties` ; `title`: `string` \| `React.ReactNode` ; `width?`: `string` ; `helpContent?`: () => `ReactNode` }

## Functions

### ModalPane

▸ **ModalPane**(`__namedParameters`): `Element`

#### Parameters

| Name                | Type                                                   |
| :------------------ | :----------------------------------------------------- |
| `__namedParameters` | [`ModalProps`](Frontend_Views_ModalPane.md#modalprops) |

#### Returns

`Element`
