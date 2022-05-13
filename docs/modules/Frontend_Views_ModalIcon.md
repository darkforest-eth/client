# Module: Frontend/Views/ModalIcon

## Table of contents

### Functions

- [ModalToggleButton](Frontend_Views_ModalIcon.md#modaltogglebutton)

## Functions

### ModalToggleButton

▸ **ModalToggleButton**(`__namedParameters`): `Element`

A button which allows you to open a modal.

#### Parameters

| Name                | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters` | { `hook`: [`Hook`](types_global_GlobalTypes.md#hook)<`boolean`\> ; `modal`: `ModalName` ; `style?`: `CSSProperties` ; `text?`: `string` } & `Partial`<`Omit`<[`DarkForestButton`](../classes/Frontend_Components_Btn.DarkForestButton.md), `"children"`\>\> & `Events`<{ `onClick`: (`evt`: `Event` & `MouseEvent`<[`DarkForestButton`](../classes/Frontend_Components_Btn.DarkForestButton.md), `MouseEvent`\>) => `void` }\> & `HTMLAttributes`<`HTMLElement`\> & {} & `RefAttributes`<`unknown`\> & { `hook`: [`Hook`](types_global_GlobalTypes.md#hook)<`boolean`\> ; `modal`: `ModalName` ; `style?`: `CSSProperties` ; `text?`: `string` } & `Partial`<`Omit`<[`DarkForestShortcutButton`](../classes/Frontend_Components_Btn.DarkForestShortcutButton.md), `"children"`\>\> & `Events`<{ `onClick`: (`evt`: `Event` & `MouseEvent`<[`DarkForestShortcutButton`](../classes/Frontend_Components_Btn.DarkForestShortcutButton.md), `MouseEvent`\>) => `void` ; `onShortcutPressed`: (`evt`: [`ShortcutPressedEvent`](../classes/Frontend_Components_Btn.ShortcutPressedEvent.md)) => `void` }\> & `HTMLAttributes`<`HTMLElement`\> & {} & `RefAttributes`<`unknown`\> |

#### Returns

`Element`
