# Module: Frontend/Components/CoreUI

## Table of contents

### Variables

- [AlignCenterHorizontally](Frontend_Components_CoreUI.md#aligncenterhorizontally)
- [AlignCenterVertically](Frontend_Components_CoreUI.md#aligncentervertically)
- [BorderlessPane](Frontend_Components_CoreUI.md#borderlesspane)
- [Bottom](Frontend_Components_CoreUI.md#bottom)
- [CenterBackgroundSubtext](Frontend_Components_CoreUI.md#centerbackgroundsubtext)
- [CenterRow](Frontend_Components_CoreUI.md#centerrow)
- [Display](Frontend_Components_CoreUI.md#display)
- [DontShrink](Frontend_Components_CoreUI.md#dontshrink)
- [EmSpacer](Frontend_Components_CoreUI.md#emspacer)
- [Emphasized](Frontend_Components_CoreUI.md#emphasized)
- [Expand](Frontend_Components_CoreUI.md#expand)
- [FloatRight](Frontend_Components_CoreUI.md#floatright)
- [FullHeight](Frontend_Components_CoreUI.md#fullheight)
- [HeaderText](Frontend_Components_CoreUI.md#headertext)
- [Hidden](Frontend_Components_CoreUI.md#hidden)
- [InlineBlock](Frontend_Components_CoreUI.md#inlineblock)
- [MaxWidth](Frontend_Components_CoreUI.md#maxwidth)
- [Padded](Frontend_Components_CoreUI.md#padded)
- [PluginElements](Frontend_Components_CoreUI.md#pluginelements)
- [Section](Frontend_Components_CoreUI.md#section)
- [SectionHeader](Frontend_Components_CoreUI.md#sectionheader)
- [Select](Frontend_Components_CoreUI.md#select)
- [Separator](Frontend_Components_CoreUI.md#separator)
- [Spacer](Frontend_Components_CoreUI.md#spacer)
- [Spread](Frontend_Components_CoreUI.md#spread)
- [SpreadApart](Frontend_Components_CoreUI.md#spreadapart)
- [TextButton](Frontend_Components_CoreUI.md#textbutton)
- [Title](Frontend_Components_CoreUI.md#title)
- [Truncate](Frontend_Components_CoreUI.md#truncate)
- [Underline](Frontend_Components_CoreUI.md#underline)

### Functions

- [Link](Frontend_Components_CoreUI.md#link)
- [SelectFrom](Frontend_Components_CoreUI.md#selectfrom)
- [VerticalSplit](Frontend_Components_CoreUI.md#verticalsplit)

## Variables

### AlignCenterHorizontally

• **AlignCenterHorizontally**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

Fills parent width, aligns children horizontally in the center.

---

### AlignCenterVertically

• **AlignCenterVertically**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### BorderlessPane

• **BorderlessPane**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### Bottom

• **Bottom**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### CenterBackgroundSubtext

• **CenterBackgroundSubtext**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

A box which centers some darkened text. Useful for displaying
_somthing_ instead of empty space, if there isn't something to
be displayed. Think of it as a placeholder.

---

### CenterRow

• **CenterRow**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### Display

• **Display**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### DontShrink

• **DontShrink**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

Don't shrink in a flexbox.

---

### EmSpacer

• **EmSpacer**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

Inline block rectangle, measured in ems, default 1em by 1em.

---

### Emphasized

• **Emphasized**: `StyledComponent`<`"span"`, `any`, `Object`, `never`\>

---

### Expand

• **Expand**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

Expands to fill space in a flexbox.

---

### FloatRight

• **FloatRight**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### FullHeight

• **FullHeight**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### HeaderText

• **HeaderText**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### Hidden

• **Hidden**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### InlineBlock

• **InlineBlock**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### MaxWidth

• **MaxWidth**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### Padded

• **Padded**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### PluginElements

• **PluginElements**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

The container element into which a plugin renders its html elements.
Contains styles for child elements so that plugins can use UI
that is consistent with the rest of Dark Forest's UI. Keeping this up
to date will be an ongoing challange, but there's probably some better
way to do this.

---

### Section

• **Section**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### SectionHeader

• **SectionHeader**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### Select

• **Select**: `StyledComponent`<`"select"`, `any`, `Object`, `never`\>

---

### Separator

• **Separator**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### Spacer

• **Spacer**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### Spread

• **Spread**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

Expands to fit the width of container. Is itself a flex box that spreads out its children
horizontally.

---

### SpreadApart

• **SpreadApart**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

Expands to fit the width of container. Is itself a flex box that spreads out its children
horizontally.

---

### TextButton

• **TextButton**: `StyledComponent`<`"span"`, `any`, `Object`, `never`\>

---

### Title

• **Title**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### Truncate

• **Truncate**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>

---

### Underline

• **Underline**: `StyledComponent`<`"span"`, `any`, `Object`, `never`\>

## Functions

### Link

▸ **Link**(`props`): `Element`

This is the link that all core ui in Dark Forest should use. Please!

#### Parameters

| Name    | Type                                                                                                                                          |
| :------ | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `props` | { `children`: `ReactNode` ; `color?`: `string` ; `openInThisTab?`: `boolean` ; `to?`: `string` } & `HtmlHTMLAttributes`<`HTMLAnchorElement`\> |

#### Returns

`Element`

---

### SelectFrom

▸ **SelectFrom**(`__namedParameters`): `Element`

Controllable input that allows the user to select from one of the
given string values.

#### Parameters

| Name                         | Type                          |
| :--------------------------- | :---------------------------- |
| `__namedParameters`          | `Object`                      |
| `__namedParameters.labels`   | `string`[]                    |
| `__namedParameters.style?`   | `CSSProperties`               |
| `__namedParameters.value`    | `string`                      |
| `__namedParameters.values`   | `string`[]                    |
| `__namedParameters.wide?`    | `boolean`                     |
| `__namedParameters.setValue` | (`value`: `string`) => `void` |

#### Returns

`Element`

---

### VerticalSplit

▸ `Const` **VerticalSplit**(`__namedParameters`): `Element`

#### Parameters

| Name                         | Type                       |
| :--------------------------- | :------------------------- |
| `__namedParameters`          | `Object`                   |
| `__namedParameters.children` | [`ReactNode`, `ReactNode`] |

#### Returns

`Element`
