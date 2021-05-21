# Module: Frontend/Panes/PluginLibraryPane

## Table of contents

### Functions

- [PluginLibraryPane](frontend_panes_pluginlibrarypane.md#pluginlibrarypane)

## Functions

### PluginLibraryPane

▸ **PluginLibraryPane**(`__namedParameters`: { `gameUIManager`: [_default_](../classes/backend_gamelogic_gameuimanager.default.md) ; `hook`: [_ModalHook_](frontend_views_modalpane.md#modalhook) ; `modalsContainer`: Element }): `null` \| _Element_

This modal presents an overview of all of the player's plugins. Has a button
to add a new plugin, and lists out all the existing plugins, allowing the
user to view their titles, as well as either edit, delete, or open their window.

You can think of this as the plugin process list, the Activity Monitor of
Dark forest.

#### Parameters

| Name                                | Type                                                               |
| :---------------------------------- | :----------------------------------------------------------------- |
| `__namedParameters`                 | _object_                                                           |
| `__namedParameters.gameUIManager`   | [_default_](../classes/backend_gamelogic_gameuimanager.default.md) |
| `__namedParameters.hook`            | [_ModalHook_](frontend_views_modalpane.md#modalhook)               |
| `__namedParameters.modalsContainer` | Element                                                            |

**Returns:** `null` \| _Element_
