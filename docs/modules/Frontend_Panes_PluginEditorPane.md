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

| Name                            | Type                                                                                      |
| :------------------------------ | :---------------------------------------------------------------------------------------- |
| `__namedParameters`             | `Object`                                                                                  |
| `__namedParameters.pluginHost?` | `null` \| [`PluginManager`](../classes/Backend_GameLogic_PluginManager.PluginManager.md)  |
| `__namedParameters.pluginId?`   | `PluginId`                                                                                |
| `__namedParameters.overwrite`   | (`newPluginName`: `string`, `newPluginCode`: `string`, `pluginId?`: `PluginId`) => `void` |
| `__namedParameters.setIsOpen`   | (`open`: `boolean`) => `void`                                                             |

#### Returns

`Element`
