# Module: Frontend/Components/CoreUI

## Table of contents

### Variables

- [CenterBackgroundSubtext](frontend_components_coreui.md#centerbackgroundsubtext)
- [CenterRow](frontend_components_coreui.md#centerrow)
- [Hidden](frontend_components_coreui.md#hidden)
- [HoverableTooltip](frontend_components_coreui.md#hoverabletooltip)
- [MaxWidth](frontend_components_coreui.md#maxwidth)
- [PluginElements](frontend_components_coreui.md#pluginelements)
- [Select](frontend_components_coreui.md#select)
- [Spacer](frontend_components_coreui.md#spacer)
- [Truncate](frontend_components_coreui.md#truncate)
- [Underline](frontend_components_coreui.md#underline)

### Functions

- [SelectFrom](frontend_components_coreui.md#selectfrom)

## Variables

### CenterBackgroundSubtext

• `Const` **CenterBackgroundSubtext**: _StyledComponent_<`"div"`, any, { `height`: _string_ ; `width`: _string_ }, never\>

A box which centers some darkened text. Useful for displaying
_somthing_ instead of empty space, if there isn't something to
be displayed. Think of it as a placeholder.

---

### CenterRow

• `Const` **CenterRow**: _StyledComponent_<`"div"`, any, {}, never\>

---

### Hidden

• `Const` **Hidden**: _StyledComponent_<`"div"`, any, {}, never\>

---

### HoverableTooltip

• `Const` **HoverableTooltip**: _StyledComponent_<`"div"`, any, {}, never\>

---

### MaxWidth

• `Const` **MaxWidth**: _StyledComponent_<`"div"`, any, { `width`: _string_ }, never\>

---

### PluginElements

• `Const` **PluginElements**: _StyledComponent_<`"div"`, any, {}, never\>

The container element into which a plugin renders its html elements.
Contains styles for child elements so that plugins can use UI
that is consistent with the rest of Dark Forest's UI. Keeping this up
to date will be an ongoing challange, but there's probably some better
way to do this.

---

### Select

• `Const` **Select**: _StyledComponent_<`"select"`, any, {}, never\>

---

### Spacer

• `Const` **Spacer**: _StyledComponent_<`"div"`, any, { `height?`: _number_ ; `width?`: _number_ }, never\>

---

### Truncate

• `Const` **Truncate**: _StyledComponent_<`"div"`, any, { `maxWidth?`: _string_ }, never\>

---

### Underline

• `Const` **Underline**: _StyledComponent_<`"span"`, any, {}, never\>

## Functions

### SelectFrom

▸ **SelectFrom**(`__namedParameters`: { `labels`: _string_[] ; `setValue`: (`value`: _string_) => _void_ ; `style?`: React.CSSProperties ; `value`: _string_ ; `values`: _string_[] }): _Element_

Controllable input that allows the user to select from one of the
given string values.

#### Parameters

| Name                         | Type                          |
| :--------------------------- | :---------------------------- |
| `__namedParameters`          | _object_                      |
| `__namedParameters.labels`   | _string_[]                    |
| `__namedParameters.setValue` | (`value`: _string_) => _void_ |
| `__namedParameters.style?`   | React.CSSProperties           |
| `__namedParameters.value`    | _string_                      |
| `__namedParameters.values`   | _string_[]                    |

**Returns:** _Element_
