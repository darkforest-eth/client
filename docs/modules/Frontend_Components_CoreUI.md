# Module: Frontend/Components/CoreUI

## Table of contents

### Variables

- [CenterBackgroundSubtext](Frontend_Components_CoreUI.md#centerbackgroundsubtext)
- [CenterRow](Frontend_Components_CoreUI.md#centerrow)
- [Hidden](Frontend_Components_CoreUI.md#hidden)
- [HoverableTooltip](Frontend_Components_CoreUI.md#hoverabletooltip)
- [MaxWidth](Frontend_Components_CoreUI.md#maxwidth)
- [PluginElements](Frontend_Components_CoreUI.md#pluginelements)
- [Select](Frontend_Components_CoreUI.md#select)
- [Spacer](Frontend_Components_CoreUI.md#spacer)
- [Truncate](Frontend_Components_CoreUI.md#truncate)
- [Underline](Frontend_Components_CoreUI.md#underline)

### Functions

- [SelectFrom](Frontend_Components_CoreUI.md#selectfrom)

## Variables

### CenterBackgroundSubtext

• `Const` **CenterBackgroundSubtext**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

A box which centers some darkened text. Useful for displaying
_somthing_ instead of empty space, if there isn't something to
be displayed. Think of it as a placeholder.

---

### CenterRow

• `Const` **CenterRow**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### Hidden

• `Const` **Hidden**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### HoverableTooltip

• `Const` **HoverableTooltip**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### MaxWidth

• `Const` **MaxWidth**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### PluginElements

• `Const` **PluginElements**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

The container element into which a plugin renders its html elements.
Contains styles for child elements so that plugins can use UI
that is consistent with the rest of Dark Forest's UI. Keeping this up
to date will be an ongoing challange, but there's probably some better
way to do this.

---

### Select

• `Const` **Select**: `StyledComponent`<`"select"`, `any`, `Object`, `never`\>

---

### Spacer

• `Const` **Spacer**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### Truncate

• `Const` **Truncate**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### Underline

• `Const` **Underline**: `StyledComponent`<`"span"`, `any`, `Object`, `never`\>

## Functions

### SelectFrom

▸ **SelectFrom**(`__namedParameters`): `Element`

Controllable input that allows the user to select from one of the
given string values.

#### Parameters

| Name                         | Type                  |
| :--------------------------- | :-------------------- |
| `__namedParameters`          | `Object`              |
| `__namedParameters.labels`   | `string`[]            |
| `__namedParameters.style?`   | `React.CSSProperties` |
| `__namedParameters.value`    | `string`              |
| `__namedParameters.values`   | `string`[]            |
| `__namedParameters.setValue` |                       |

#### Returns

`Element`
