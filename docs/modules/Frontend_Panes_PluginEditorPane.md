# Module: Frontend/Panes/PluginEditorPane

## Table of contents

### Functions

- [PluginEditorPane](Frontend_Panes_PluginEditorPane.md#plugineditorpane)

## Functions

### PluginEditorPane

▸ **PluginEditorPane**(`__namedParameters`): `Element`

Component for editing plugins. Saving causes its containing modal
to be closed, and the `overwrite` to be called, indicating that the
given plugin's source should be overwritten and reloaded. If no
plugin id is provided, assumes we're editing a new plugin.

#### Parameters

| Name                            | Type                                                                                     |
| :------------------------------ | :--------------------------------------------------------------------------------------- |
| `__namedParameters`             | `Object`                                                                                 |
| `__namedParameters.pluginHost?` | [`PluginManager`](../classes/Backend_GameLogic_PluginManager.PluginManager.md) \| `null` |
| `__namedParameters.pluginId?`   | [`PluginId`](Backend_Plugins_SerializedPlugin.md#pluginid)                               |
| `__namedParameters.overwrite`   |                                                                                          |
| `__namedParameters.setIsOpen`   |                                                                                          |

#### Returns

`Element`
