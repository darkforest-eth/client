# Module: Frontend/Components/MaybeShortcutButton

## Table of contents

### Functions

- [MaybeShortcutButton](Frontend_Components_MaybeShortcutButton.md#maybeshortcutbutton)

## Functions

### MaybeShortcutButton

▸ **MaybeShortcutButton**(`props`): `Element`

A button that will show shortcuts if enabled globally in the game, otherwise it will display a normal button

Must ONLY be used when a GameUIManager is available.

#### Parameters

| Name    | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `props` | `Partial`<`Omit`<[`DarkForestButton`](../classes/Frontend_Components_Btn.DarkForestButton.md), `"children"`\>\> & `Events`<{ `onClick`: (`evt`: `Event` & `MouseEvent`<[`DarkForestButton`](../classes/Frontend_Components_Btn.DarkForestButton.md), `MouseEvent`\>) => `void` }\> & `HTMLAttributes`<`HTMLElement`\> & {} & `RefAttributes`<`unknown`\> \| `Partial`<`Omit`<[`DarkForestShortcutButton`](../classes/Frontend_Components_Btn.DarkForestShortcutButton.md), `"children"`\>\> & `Events`<{ `onClick`: (`evt`: `Event` & `MouseEvent`<[`DarkForestShortcutButton`](../classes/Frontend_Components_Btn.DarkForestShortcutButton.md), `MouseEvent`\>) => `void` ; `onShortcutPressed`: (`evt`: [`ShortcutPressedEvent`](../classes/Frontend_Components_Btn.ShortcutPressedEvent.md)) => `void` }\> & `HTMLAttributes`<`HTMLElement`\> & {} & `RefAttributes`<`unknown`\> |

#### Returns

`Element`
