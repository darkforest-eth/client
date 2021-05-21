# Module: Frontend/Panes/PluginEditorPane

## Table of contents

### Functions

- [PluginEditorPane](frontend_panes_plugineditorpane.md#plugineditorpane)

## Functions

### PluginEditorPane

▸ **PluginEditorPane**(`__namedParameters`: { `overwrite`: (`newPluginName`: _string_, `newPluginCode`: _string_, `pluginId?`: [_PluginId_](backend_plugins_serializedplugin.md#pluginid)) => _void_ ; `pluginHost?`: [_PluginManager_](../classes/backend_gamelogic_pluginmanager.pluginmanager.md) \| `null` ; `pluginId?`: [_PluginId_](backend_plugins_serializedplugin.md#pluginid) ; `setIsOpen`: (`open`: _boolean_) => _void_ }): _Element_

Component for editing plugins. Saving causes its containing modal
to be closed, and the `overwrite` to be called, indicating that the
given plugin's source should be overwritten and reloaded. If no
plugin id is provided, assumes we're editing a new plugin.

#### Parameters

| Name                            | Type                                                                                                                                      |
| :------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters`             | _object_                                                                                                                                  |
| `__namedParameters.overwrite`   | (`newPluginName`: _string_, `newPluginCode`: _string_, `pluginId?`: [_PluginId_](backend_plugins_serializedplugin.md#pluginid)) => _void_ |
| `__namedParameters.pluginHost?` | [_PluginManager_](../classes/backend_gamelogic_pluginmanager.pluginmanager.md) \| `null`                                                  |
| `__namedParameters.pluginId?`   | [_PluginId_](backend_plugins_serializedplugin.md#pluginid)                                                                                |
| `__namedParameters.setIsOpen`   | (`open`: _boolean_) => _void_                                                                                                             |

**Returns:** _Element_
