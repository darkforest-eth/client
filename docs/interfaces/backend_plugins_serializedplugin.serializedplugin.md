# Interface: SerializedPlugin

[Backend/Plugins/SerializedPlugin](../modules/backend_plugins_serializedplugin.md).SerializedPlugin

Represents a plugin that the user has added to their game. Used
internally for storing plugins. Not used for evaluating plugins!

## Table of contents

### Properties

- [code](backend_plugins_serializedplugin.serializedplugin.md#code)
- [id](backend_plugins_serializedplugin.serializedplugin.md#id)
- [lastEdited](backend_plugins_serializedplugin.serializedplugin.md#lastedited)
- [name](backend_plugins_serializedplugin.serializedplugin.md#name)

## Properties

### code

• **code**: _string_

This code is a javascript object that complies with the
[PluginProcess](backend_plugins_pluginprocess.pluginprocess.md) interface.

---

### id

• **id**: [_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid)

Unique ID, assigned at the time the plugin is first saved.

---

### lastEdited

• **lastEdited**: _number_

{@code new Date.getTime()} at the point that this plugin was saved

---

### name

• **name**: _string_

Shown in the list of plugins.
