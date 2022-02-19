# Interface: TooltipProps

[Frontend/Panes/Tooltip](../modules/Frontend_Panes_Tooltip.md).TooltipProps

## Hierarchy

- [`TooltipTriggerProps`](Frontend_Panes_Tooltip.TooltipTriggerProps.md)

  ↳ **`TooltipProps`**

## Table of contents

### Properties

- [children](Frontend_Panes_Tooltip.TooltipProps.md#children)
- [extraContent](Frontend_Panes_Tooltip.TooltipProps.md#extracontent)
- [left](Frontend_Panes_Tooltip.TooltipProps.md#left)
- [name](Frontend_Panes_Tooltip.TooltipProps.md#name)
- [style](Frontend_Panes_Tooltip.TooltipProps.md#style)
- [top](Frontend_Panes_Tooltip.TooltipProps.md#top)

## Properties

### children

• **children**: `ReactNode`

A [TooltipTrigger](../modules/Frontend_Panes_Tooltip.md#tooltiptrigger) wraps this child, and causes a tooltip to appear when the user hovers
over it.

#### Inherited from

[TooltipTriggerProps](Frontend_Panes_Tooltip.TooltipTriggerProps.md).[children](Frontend_Panes_Tooltip.TooltipTriggerProps.md#children)

---

### extraContent

• `Optional` **extraContent**: `ReactNode`

You can append some dynamic content to the given tooltip by setting this field to a React node.

#### Inherited from

[TooltipTriggerProps](Frontend_Panes_Tooltip.TooltipTriggerProps.md).[extraContent](Frontend_Panes_Tooltip.TooltipTriggerProps.md#extracontent)

---

### left

• **left**: `number`

---

### name

• **name**: `undefined` \| `TooltipName`

The name of the tooltip element to display. You can see all the concrete tooltip contents in
the file called {@link TooltipPanes}. Set to `undefined` to not render the tooltip.

#### Inherited from

[TooltipTriggerProps](Frontend_Panes_Tooltip.TooltipTriggerProps.md).[name](Frontend_Panes_Tooltip.TooltipTriggerProps.md#name)

---

### style

• `Optional` **style**: `CSSProperties`

You can optionally style the tooltip trigger element, not the tooltip itself.

#### Inherited from

[TooltipTriggerProps](Frontend_Panes_Tooltip.TooltipTriggerProps.md).[style](Frontend_Panes_Tooltip.TooltipTriggerProps.md#style)

---

### top

• **top**: `number`
