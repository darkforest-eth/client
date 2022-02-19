# Interface: TooltipTriggerProps

[Frontend/Panes/Tooltip](../modules/Frontend_Panes_Tooltip.md).TooltipTriggerProps

Each {@link TooltipName} has a corresponding tooltip element.

## Hierarchy

- **`TooltipTriggerProps`**

  ↳ [`TooltipProps`](Frontend_Panes_Tooltip.TooltipProps.md)

## Table of contents

### Properties

- [children](Frontend_Panes_Tooltip.TooltipTriggerProps.md#children)
- [extraContent](Frontend_Panes_Tooltip.TooltipTriggerProps.md#extracontent)
- [name](Frontend_Panes_Tooltip.TooltipTriggerProps.md#name)
- [style](Frontend_Panes_Tooltip.TooltipTriggerProps.md#style)

## Properties

### children

• **children**: `ReactNode`

A [TooltipTrigger](../modules/Frontend_Panes_Tooltip.md#tooltiptrigger) wraps this child, and causes a tooltip to appear when the user hovers
over it.

---

### extraContent

• `Optional` **extraContent**: `ReactNode`

You can append some dynamic content to the given tooltip by setting this field to a React node.

---

### name

• **name**: `undefined` \| `TooltipName`

The name of the tooltip element to display. You can see all the concrete tooltip contents in
the file called {@link TooltipPanes}. Set to `undefined` to not render the tooltip.

---

### style

• `Optional` **style**: `CSSProperties`

You can optionally style the tooltip trigger element, not the tooltip itself.
