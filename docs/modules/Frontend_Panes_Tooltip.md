# Module: Frontend/Panes/Tooltip

## Table of contents

### Interfaces

- [TooltipProps](../interfaces/Frontend_Panes_Tooltip.TooltipProps.md)
- [TooltipTriggerProps](../interfaces/Frontend_Panes_Tooltip.TooltipTriggerProps.md)

### Functions

- [Tooltip](Frontend_Panes_Tooltip.md#tooltip)
- [TooltipTrigger](Frontend_Panes_Tooltip.md#tooltiptrigger)

## Functions

### Tooltip

▸ **Tooltip**(`props`): `null` \| `Element`

At any given moment, there can only be one tooltip visible in the game. This is true because a
player only has one mouse cursor on the screen, and therefore can only be hovering over a single
[TooltipTrigger](Frontend_Panes_Tooltip.md#tooltiptrigger) element at any given time. This component is responsible for keeping track
of which tooltip has been hovered over, and rendering the corresponding content.

#### Parameters

| Name    | Type                                                                   |
| :------ | :--------------------------------------------------------------------- |
| `props` | [`TooltipProps`](../interfaces/Frontend_Panes_Tooltip.TooltipProps.md) |

#### Returns

`null` \| `Element`

---

### TooltipTrigger

▸ **TooltipTrigger**(`props`): `Element`

When the player hovers over this element, triggers the tooltip with the given name to be
displayed on top of everything.

#### Parameters

| Name    | Type                                                                                 |
| :------ | :----------------------------------------------------------------------------------- |
| `props` | [`TooltipTriggerProps`](../interfaces/Frontend_Panes_Tooltip.TooltipTriggerProps.md) |

#### Returns

`Element`
