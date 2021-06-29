# Class: PluginManager

[Backend/GameLogic/PluginManager](../modules/backend_gamelogic_pluginmanager.md).PluginManager

This class keeps track of all the plugins that this player has loaded
into their game. Acts as a task manager, supports all CRUD operations
for plugins, as well as instantiating and destroying running plugins.
All library operations are also persisted to IndexDB.

Important! Does not run plugins until the user clicks 'run' somewhere in
this UI. This is important, because if someone develops a buggy plugin,
it would suck if that bricked their game.

## Table of contents

### Constructors

- [constructor](backend_gamelogic_pluginmanager.pluginmanager.md#constructor)

### Properties

- [gameManager](backend_gamelogic_pluginmanager.pluginmanager.md#gamemanager)
- [pluginLibrary](backend_gamelogic_pluginmanager.pluginmanager.md#pluginlibrary)
- [pluginProcessInfos](backend_gamelogic_pluginmanager.pluginmanager.md#pluginprocessinfos)
- [pluginProcesses](backend_gamelogic_pluginmanager.pluginmanager.md#pluginprocesses)
- [plugins$](backend_gamelogic_pluginmanager.pluginmanager.md#plugins$)

### Methods

- [addPluginToLibrary](backend_gamelogic_pluginmanager.pluginmanager.md#addplugintolibrary)
- [deletePlugin](backend_gamelogic_pluginmanager.pluginmanager.md#deleteplugin)
- [destroy](backend_gamelogic_pluginmanager.pluginmanager.md#destroy)
- [drawAllRunningPlugins](backend_gamelogic_pluginmanager.pluginmanager.md#drawallrunningplugins)
- [getAllProcessInfos](backend_gamelogic_pluginmanager.pluginmanager.md#getallprocessinfos)
- [getLibrary](backend_gamelogic_pluginmanager.pluginmanager.md#getlibrary)
- [getPluginFromLibrary](backend_gamelogic_pluginmanager.pluginmanager.md#getpluginfromlibrary)
- [getProcessInfo](backend_gamelogic_pluginmanager.pluginmanager.md#getprocessinfo)
- [hasPlugin](backend_gamelogic_pluginmanager.pluginmanager.md#hasplugin)
- [load](backend_gamelogic_pluginmanager.pluginmanager.md#load)
- [notifyPluginLibraryUpdated](backend_gamelogic_pluginmanager.pluginmanager.md#notifypluginlibraryupdated)
- [onNewEmbeddedPlugins](backend_gamelogic_pluginmanager.pluginmanager.md#onnewembeddedplugins)
- [overwritePlugin](backend_gamelogic_pluginmanager.pluginmanager.md#overwriteplugin)
- [render](backend_gamelogic_pluginmanager.pluginmanager.md#render)
- [reorderPlugins](backend_gamelogic_pluginmanager.pluginmanager.md#reorderplugins)
- [spawn](backend_gamelogic_pluginmanager.pluginmanager.md#spawn)
- [copy](backend_gamelogic_pluginmanager.pluginmanager.md#copy)

## Constructors

### constructor

\+ **new PluginManager**(`gameManager`: [_default_](backend_gamelogic_gamemanager.default.md)): [_PluginManager_](backend_gamelogic_pluginmanager.pluginmanager.md)

#### Parameters

| Name          | Type                                                  |
| :------------ | :---------------------------------------------------- |
| `gameManager` | [_default_](backend_gamelogic_gamemanager.default.md) |

**Returns:** [_PluginManager_](backend_gamelogic_pluginmanager.pluginmanager.md)

## Properties

### gameManager

• `Private` **gameManager**: [_default_](backend_gamelogic_gamemanager.default.md)

---

### pluginLibrary

• `Private` **pluginLibrary**: [_SerializedPlugin_](../interfaces/backend_plugins_serializedplugin.serializedplugin.md)[]

All the plugins in the player's library. Not all of the player's plugins
are running, and therefore not all exist in `pluginInstances`.
`PluginsManager` keeps this field in sync with the plugins the user has
saved in the IndexDB via {@link PersistentChunkStore}

---

### pluginProcessInfos

• `Private` **pluginProcessInfos**: _Record_<string, [_ProcessInfo_](backend_gamelogic_pluginmanager.processinfo.md)\>

parallel to pluginProcesses

---

### pluginProcesses

• `Private` **pluginProcesses**: _Record_<string, [_PluginProcess_](../interfaces/backend_plugins_pluginprocess.pluginprocess.md)\>

Plugins that are currently loaded into the game, and are rendering into a
window. `PluginsManager` makes sure that when a plugin starts executing, it
is added into `pluginInstances`, and that once a plugin is unloaded, its
`.destroy()` method is called, and that the plugin is removed from
`pluginInstances`.

---

### plugins$

• **plugins$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<[_SerializedPlugin_](../interfaces/backend_plugins_serializedplugin.serializedplugin.md)[]\>

Event emitter that publishes whenever the set of plugins changes.

## Methods

### addPluginToLibrary

▸ **addPluginToLibrary**(`id`: [_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid), `name`: _string_, `code`: _string_): [_SerializedPlugin_](../interfaces/backend_plugins_serializedplugin.serializedplugin.md)

adds a new plugin into the plugin library.

#### Parameters

| Name   | Type                                                                  |
| :----- | :-------------------------------------------------------------------- |
| `id`   | [_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid) |
| `name` | _string_                                                              |
| `code` | _string_                                                              |

**Returns:** [_SerializedPlugin_](../interfaces/backend_plugins_serializedplugin.serializedplugin.md)

---

### deletePlugin

▸ **deletePlugin**(`pluginId`: [_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid)): _Promise_<void\>

Remove the given plugin both from the player's library, and kills
the plugin if it is running.

#### Parameters

| Name       | Type                                                                  |
| :--------- | :-------------------------------------------------------------------- |
| `pluginId` | [_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid) |

**Returns:** _Promise_<void\>

---

### destroy

▸ **destroy**(`id`: [_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid)): _void_

If a plugin with the given id is running, call its `.destroy()` method,
and remove it from `pluginInstances`. Stop listening for new local plugins.

#### Parameters

| Name | Type                                                                  |
| :--- | :-------------------------------------------------------------------- |
| `id` | [_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid) |

**Returns:** _void_

---

### drawAllRunningPlugins

▸ **drawAllRunningPlugins**(`ctx`: CanvasRenderingContext2D): _void_

For each currently running plugin, if the plugin has a 'draw'
function, then draw that plugin to the screen.

#### Parameters

| Name  | Type                     |
| :---- | :----------------------- |
| `ctx` | CanvasRenderingContext2D |

**Returns:** _void_

---

### getAllProcessInfos

▸ **getAllProcessInfos**(): _Map_<[_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid), [_ProcessInfo_](backend_gamelogic_pluginmanager.processinfo.md)\>

Gets a map of all the currently running processes

**Returns:** _Map_<[_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid), [_ProcessInfo_](backend_gamelogic_pluginmanager.processinfo.md)\>

---

### getLibrary

▸ **getLibrary**(): [_SerializedPlugin_](../interfaces/backend_plugins_serializedplugin.serializedplugin.md)[]

Gets all the plugins in this player's library.

**Returns:** [_SerializedPlugin_](../interfaces/backend_plugins_serializedplugin.serializedplugin.md)[]

---

### getPluginFromLibrary

▸ **getPluginFromLibrary**(`id?`: [_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid)): _undefined_ \| [_SerializedPlugin_](../interfaces/backend_plugins_serializedplugin.serializedplugin.md)

Gets the serialized plugin with the given id from the player's plugin
library. `undefined` if no plugin exists.

#### Parameters

| Name  | Type                                                                  |
| :---- | :-------------------------------------------------------------------- |
| `id?` | [_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid) |

**Returns:** _undefined_ \| [_SerializedPlugin_](../interfaces/backend_plugins_serializedplugin.serializedplugin.md)

---

### getProcessInfo

▸ **getProcessInfo**(`id`: [_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid)): [_ProcessInfo_](backend_gamelogic_pluginmanager.processinfo.md)

If this process has been started, gets its info

#### Parameters

| Name | Type                                                                  |
| :--- | :-------------------------------------------------------------------- |
| `id` | [_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid) |

**Returns:** [_ProcessInfo_](backend_gamelogic_pluginmanager.processinfo.md)

---

### hasPlugin

▸ `Private` **hasPlugin**(`plugin`: [_EmbeddedPlugin_](../interfaces/backend_plugins_embeddedpluginloader.embeddedplugin.md)): _boolean_

#### Parameters

| Name     | Type                                                                                     |
| :------- | :--------------------------------------------------------------------------------------- |
| `plugin` | [_EmbeddedPlugin_](../interfaces/backend_plugins_embeddedpluginloader.embeddedplugin.md) |

**Returns:** _boolean_

---

### load

▸ **load**(): _Promise_<void\>

Load all plugins from this disk into `pluginLibrary`. Insert the default
plugins into the player's library if the default plugins have never been
added before. Effectively idempotent after the first time you call it.

**Returns:** _Promise_<void\>

---

### notifyPluginLibraryUpdated

▸ `Private` **notifyPluginLibraryUpdated**(): _void_

**Returns:** _void_

---

### onNewEmbeddedPlugins

▸ `Private` **onNewEmbeddedPlugins**(`newPlugins`: [_EmbeddedPlugin_](../interfaces/backend_plugins_embeddedpluginloader.embeddedplugin.md)[]): _void_

#### Parameters

| Name         | Type                                                                                       |
| :----------- | :----------------------------------------------------------------------------------------- |
| `newPlugins` | [_EmbeddedPlugin_](../interfaces/backend_plugins_embeddedpluginloader.embeddedplugin.md)[] |

**Returns:** _void_

---

### overwritePlugin

▸ **overwritePlugin**(`newName`: _string_, `pluginCode`: _string_, `id`: [_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid)): _void_

1. kills the plugin if it's running
2. edits the plugin-library version of this plugin
3. if a plugin was edited, save the plugin library to disk

#### Parameters

| Name         | Type                                                                  |
| :----------- | :-------------------------------------------------------------------- |
| `newName`    | _string_                                                              |
| `pluginCode` | _string_                                                              |
| `id`         | [_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid) |

**Returns:** _void_

---

### render

▸ **render**(`id`: [_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid), `element`: HTMLDivElement): _Promise_<void\>

If this plugin's `render` method has not been called yet, then
call it! Remembers that this plugin has been rendered.

#### Parameters

| Name      | Type                                                                  |
| :-------- | :-------------------------------------------------------------------- |
| `id`      | [_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid) |
| `element` | HTMLDivElement                                                        |

**Returns:** _Promise_<void\>

---

### reorderPlugins

▸ **reorderPlugins**(`newPluginIdOrder`: _string_[]): _void_

Reorders the current plugins. plugin ids in `newPluginIdOrder` must correspond
1:1 to plugins in the plugin library.

#### Parameters

| Name               | Type       |
| :----------------- | :--------- |
| `newPluginIdOrder` | _string_[] |

**Returns:** _void_

---

### spawn

▸ **spawn**(`id`: [_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid)): _Promise_<undefined \| [_PluginProcess_](../interfaces/backend_plugins_pluginprocess.pluginprocess.md)\>

Either spawns the given plugin by evaluating its `pluginCode`, or
returns the already running plugin instance. If starting a plugin
throws an error then returns `undefined`.

#### Parameters

| Name | Type                                                                  |
| :--- | :-------------------------------------------------------------------- |
| `id` | [_PluginId_](../modules/backend_plugins_serializedplugin.md#pluginid) |

**Returns:** _Promise_<undefined \| [_PluginProcess_](../interfaces/backend_plugins_pluginprocess.pluginprocess.md)\>

---

### copy

▸ `Static` `Private` **copy**<T\>(`plugin`: T): T

To prevent users of this class from modifying our plugins library,
we return clones of the plugins. This should probably be a function
in a Utils file somewhere, but I thought I should leave a good comment
about why we return copies of the plugins from the library.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name     | Type |
| :------- | :--- |
| `plugin` | T    |

**Returns:** T
