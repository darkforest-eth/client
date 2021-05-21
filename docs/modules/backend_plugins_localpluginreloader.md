# Module: Backend/Plugins/LocalPluginReloader

## Table of contents

### Interfaces

- [HMRPlugin](../interfaces/backend_plugins_localpluginreloader.hmrplugin.md)

### Variables

- [hmrPlugins$](backend_plugins_localpluginreloader.md#hmrplugins$)

### Functions

- [getHmrPlugins](backend_plugins_localpluginreloader.md#gethmrplugins)
- [loadLocalPlugin](backend_plugins_localpluginreloader.md#loadlocalplugin)

## Variables

### hmrPlugins$

• `Const` **hmrPlugins$**: [_Monomitter_](frontend_utils_monomitter.md#monomitter)<[_HMRPlugin_](../interfaces/backend_plugins_localpluginreloader.hmrplugin.md)[]\>

## Functions

### getHmrPlugins

▸ **getHmrPlugins**(): [_HMRPlugin_](../interfaces/backend_plugins_localpluginreloader.hmrplugin.md)[]

**Returns:** [_HMRPlugin_](../interfaces/backend_plugins_localpluginreloader.hmrplugin.md)[]

---

### loadLocalPlugin

▸ **loadLocalPlugin**(`filename`: _string_): _Promise_<{ `default`: [_PluginProcess_](../interfaces/backend_plugins_pluginprocess.pluginprocess.md) }\>

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `filename` | _string_ |

**Returns:** _Promise_<{ `default`: [_PluginProcess_](../interfaces/backend_plugins_pluginprocess.pluginprocess.md) }\>
