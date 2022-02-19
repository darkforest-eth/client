# Module: Frontend/Panes/PluginLibraryPane

## Table of contents

### Functions

- [PluginLibraryPane](Frontend_Panes_PluginLibraryPane.md#pluginlibrarypane)

## Functions

### PluginLibraryPane

▸ **PluginLibraryPane**(`__namedParameters`): `Element`

This modal presents an overview of all of the player's plugins. Has a button to add a new plugin,
and lists out all the existing plugins, allowing the user to view their titles, as well as either
edit, delete, or open their modal.

You can think of this as the plugin process list, the Activity Monitor of Dark forest.

#### Parameters

| Name                                | Type                                                               |
| :---------------------------------- | :----------------------------------------------------------------- |
| `__namedParameters`                 | `Object`                                                           |
| `__namedParameters.gameUIManager`   | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) |
| `__namedParameters.modalsContainer` | `Element`                                                          |
| `__namedParameters.visible`         | `boolean`                                                          |
| `__namedParameters.onClose`         | () => `void`                                                       |

#### Returns

`Element`
