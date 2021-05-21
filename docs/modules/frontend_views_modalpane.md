# Module: Frontend/Views/ModalPane

## Table of contents

### Enumerations

- [ModalName](../enums/frontend_views_modalpane.modalname.md)

### Type aliases

- [ModalHook](frontend_views_modalpane.md#modalhook)

### Variables

- [RECOMMENDED_WIDTH](frontend_views_modalpane.md#recommended_width)

### Functions

- [ModalPane](frontend_views_modalpane.md#modalpane)

## Type aliases

### ModalHook

Ƭ **ModalHook**: [*boolean*, ModalIconStateFn]

## Variables

### RECOMMENDED_WIDTH

• `Const` **RECOMMENDED_WIDTH**: `"450px"`= '450px'

## Functions

### ModalPane

▸ **ModalPane**(`__namedParameters`: [_PaneProps_](frontend_components_gamewindowcomponents.md#paneprops) & { `helpContent?`: () => React.ReactNode ; `hideClose?`: _boolean_ ; `hook`: [_ModalHook_](frontend_views_modalpane.md#modalhook) ; `name?`: [_ModalName_](../enums/frontend_views_modalpane.modalname.md) ; `noPadding?`: _boolean_ ; `style?`: React.CSSProperties ; `width?`: _string_ }): _Element_

#### Parameters

| Name                | Type                                                                                                                                                                                                                                                                                                                                                              |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters` | [_PaneProps_](frontend_components_gamewindowcomponents.md#paneprops) & { `helpContent?`: () => React.ReactNode ; `hideClose?`: _boolean_ ; `hook`: [_ModalHook_](frontend_views_modalpane.md#modalhook) ; `name?`: [_ModalName_](../enums/frontend_views_modalpane.modalname.md) ; `noPadding?`: _boolean_ ; `style?`: React.CSSProperties ; `width?`: _string_ } |

**Returns:** _Element_
