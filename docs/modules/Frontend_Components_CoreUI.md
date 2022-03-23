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

• `Const` **AlignCenterHorizontally**: `StyledComponent`<`"div"`, `any`, {}, `never`\>

Fills parent width, aligns children horizontally in the center.

---

### AlignCenterVertically

• `Const` **AlignCenterVertically**: `StyledComponent`<`"div"`, `any`, {}, `never`\>

---

### BorderlessPane

• `Const` **BorderlessPane**: `StyledComponent`<`"div"`, `any`, {}, `never`\>

---

### Bottom

• `Const` **Bottom**: `StyledComponent`<`"div"`, `any`, {}, `never`\>

---

### CenterBackgroundSubtext

• `Const` **CenterBackgroundSubtext**: `StyledComponent`<`"div"`, `any`, { `height`: `string` ; `width`: `string` }, `never`\>

A box which centers some darkened text. Useful for displaying
_somthing_ instead of empty space, if there isn't something to
be displayed. Think of it as a placeholder.

---

### CenterRow

• `Const` **CenterRow**: `StyledComponent`<`"div"`, `any`, {}, `never`\>

---

### Display

• `Const` **Display**: `StyledComponent`<`"div"`, `any`, { `visible?`: `boolean` }, `never`\>

---

### DontShrink

• `Const` **DontShrink**: `StyledComponent`<`"div"`, `any`, {}, `never`\>

Don't shrink in a flexbox.

---

### EmSpacer

• `Const` **EmSpacer**: `StyledComponent`<`"div"`, `any`, { `height?`: `number` ; `width?`: `number` }, `never`\>

Inline block rectangle, measured in ems, default 1em by 1em.

---

### Emphasized

• `Const` **Emphasized**: `StyledComponent`<`"span"`, `any`, {}, `never`\>

---

### Expand

• `Const` **Expand**: `StyledComponent`<`"div"`, `any`, {}, `never`\>

Expands to fill space in a flexbox.

---

### FloatRight

• `Const` **FloatRight**: `StyledComponent`<`"div"`, `any`, {}, `never`\>

---

### FullHeight

• `Const` **FullHeight**: `StyledComponent`<`"div"`, `any`, {}, `never`\>

---

### HeaderText

• `Const` **HeaderText**: `StyledComponent`<`"div"`, `any`, {}, `never`\>

---

### Hidden

• `Const` **Hidden**: `StyledComponent`<`"div"`, `any`, {}, `never`\>

---

### InlineBlock

• `Const` **InlineBlock**: `StyledComponent`<`"div"`, `any`, {}, `never`\>

---

### MaxWidth

• `Const` **MaxWidth**: `StyledComponent`<`"div"`, `any`, { `width`: `string` }, `never`\>

---

### Padded

• `Const` **Padded**: `StyledComponent`<`"div"`, `any`, { `bottom?`: `string` ; `left?`: `string` ; `right?`: `string` ; `top?`: `string` }, `never`\>

---

### PluginElements

• `Const` **PluginElements**: `StyledComponent`<`"div"`, `any`, {}, `never`\>

The container element into which a plugin renders its html elements.
Contains styles for child elements so that plugins can use UI
that is consistent with the rest of Dark Forest's UI. Keeping this up
to date will be an ongoing challange, but there's probably some better
way to do this.

---

### Section

• `Const` **Section**: `StyledComponent`<`"div"`, `any`, {}, `never`\>

---

### SectionHeader

• `Const` **SectionHeader**: `StyledComponent`<`"div"`, `any`, {}, `never`\>

---

### Select

• `Const` **Select**: `StyledComponent`<`"select"`, `any`, { `wide?`: `boolean` }, `never`\>

---

### Separator

• `Const` **Separator**: `StyledComponent`<`"div"`, `any`, {}, `never`\>

---

### Spacer

• `Const` **Spacer**: `StyledComponent`<`"div"`, `any`, { `height?`: `number` ; `width?`: `number` }, `never`\>

---

### Spread

• `Const` **Spread**: `StyledComponent`<`"div"`, `any`, {}, `never`\>

Expands to fit the width of container. Is itself a flex box that spreads out its children
horizontally.

---

### SpreadApart

• `Const` **SpreadApart**: `StyledComponent`<`"div"`, `any`, {}, `never`\>

Expands to fit the width of container. Is itself a flex box that spreads out its children
horizontally.

---

### TextButton

• `Const` **TextButton**: `StyledComponent`<`"span"`, `any`, {}, `never`\>

---

### Title

• `Const` **Title**: `StyledComponent`<`"div"`, `any`, { `maxWidth?`: `string` }, `never`\>

---

### Truncate

• `Const` **Truncate**: `StyledComponent`<`"div"`, `any`, { `maxWidth?`: `string` }, `never`\>

---

### Underline

• `Const` **Underline**: `StyledComponent`<`"span"`, `any`, {}, `never`\>

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

▸ **VerticalSplit**(`__namedParameters`): `Element`

#### Parameters

| Name                         | Type                       |
| :--------------------------- | :------------------------- |
| `__namedParameters`          | `Object`                   |
| `__namedParameters.children` | [`ReactNode`, `ReactNode`] |

#### Returns

`Element`
