# Module: Frontend/Views/ModalPane

## Table of contents

### Enumerations

- [ModalName](../enums/Frontend_Views_ModalPane.ModalName.md)

### Type aliases

- [ModalHook](Frontend_Views_ModalPane.md#modalhook)

### Variables

- [RECOMMENDED_WIDTH](Frontend_Views_ModalPane.md#recommended_width)

### Functions

- [ModalPane](Frontend_Views_ModalPane.md#modalpane)

## Type aliases

### ModalHook

Ƭ **ModalHook**: [`Hook`](_types_global_GlobalTypes.md#hook)<`boolean`\>

## Variables

### RECOMMENDED_WIDTH

• `Const` **RECOMMENDED_WIDTH**: `"450px"`

## Functions

### ModalPane

▸ **ModalPane**(`__namedParameters`): `Element`

#### Parameters

| Name                | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters` | [`PaneProps`](Frontend_Components_GameWindowComponents.md#paneprops) & { `backgroundColor?`: `string` ; `borderColor?`: `string` ; `hideClose?`: `boolean` ; `hook`: [`Hook`](_types_global_GlobalTypes.md#hook)<`boolean`\> ; `name?`: [`ModalName`](../enums/Frontend_Views_ModalPane.ModalName.md) ; `noPadding?`: `boolean` ; `style?`: `React.CSSProperties` ; `titlebarColor?`: `string` ; `width?`: `string` ; `helpContent?`: () => `ReactNode` } |

#### Returns

`Element`
