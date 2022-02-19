# Interface: SerializedPlugin

[Backend/Plugins/SerializedPlugin](../modules/Backend_Plugins_SerializedPlugin.md).SerializedPlugin

Represents a plugin that the user has added to their game. Used
internally for storing plugins. Not used for evaluating plugins!

## Table of contents

### Properties

- [code](Backend_Plugins_SerializedPlugin.SerializedPlugin.md#code)
- [id](Backend_Plugins_SerializedPlugin.SerializedPlugin.md#id)
- [lastEdited](Backend_Plugins_SerializedPlugin.SerializedPlugin.md#lastedited)
- [name](Backend_Plugins_SerializedPlugin.SerializedPlugin.md#name)

## Properties

### code

• **code**: `string`

This code is a javascript object that complies with the
[PluginProcess](Backend_Plugins_PluginProcess.PluginProcess.md) interface.

---

### id

• **id**: `PluginId`

Unique ID, assigned at the time the plugin is first saved.

---

### lastEdited

• **lastEdited**: `number`

{@code new Date.getTime()} at the point that this plugin was saved

---

### name

• **name**: `string`

Shown in the list of plugins.
