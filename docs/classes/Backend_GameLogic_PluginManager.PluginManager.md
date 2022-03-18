# Class: PluginManager

[Backend/GameLogic/PluginManager](../modules/Backend_GameLogic_PluginManager.md).PluginManager

This class keeps track of all the plugins that this player has loaded
into their game. Acts as a task manager, supports all CRUD operations
for plugins, as well as instantiating and destroying running plugins.
All library operations are also persisted to IndexDB.

Important! Does not run plugins until the user clicks 'run' somewhere in
this UI. This is important, because if someone develops a buggy plugin,
it would suck if that bricked their game.

## Table of contents

### Constructors

- [constructor](Backend_GameLogic_PluginManager.PluginManager.md#constructor)

### Properties

- [gameManager](Backend_GameLogic_PluginManager.PluginManager.md#gamemanager)
- [pluginLibrary](Backend_GameLogic_PluginManager.PluginManager.md#pluginlibrary)
- [pluginProcessInfos](Backend_GameLogic_PluginManager.PluginManager.md#pluginprocessinfos)
- [pluginProcesses](Backend_GameLogic_PluginManager.PluginManager.md#pluginprocesses)
- [plugins$](Backend_GameLogic_PluginManager.PluginManager.md#plugins$)

### Methods

- [addPluginToLibrary](Backend_GameLogic_PluginManager.PluginManager.md#addplugintolibrary)
- [deletePlugin](Backend_GameLogic_PluginManager.PluginManager.md#deleteplugin)
- [destroy](Backend_GameLogic_PluginManager.PluginManager.md#destroy)
- [drawAllRunningPlugins](Backend_GameLogic_PluginManager.PluginManager.md#drawallrunningplugins)
- [getAllProcessInfos](Backend_GameLogic_PluginManager.PluginManager.md#getallprocessinfos)
- [getLibrary](Backend_GameLogic_PluginManager.PluginManager.md#getlibrary)
- [getPluginFromLibrary](Backend_GameLogic_PluginManager.PluginManager.md#getpluginfromlibrary)
- [getProcessInfo](Backend_GameLogic_PluginManager.PluginManager.md#getprocessinfo)
- [hasPlugin](Backend_GameLogic_PluginManager.PluginManager.md#hasplugin)
- [load](Backend_GameLogic_PluginManager.PluginManager.md#load)
- [notifyPluginLibraryUpdated](Backend_GameLogic_PluginManager.PluginManager.md#notifypluginlibraryupdated)
- [onNewEmbeddedPlugins](Backend_GameLogic_PluginManager.PluginManager.md#onnewembeddedplugins)
- [overwritePlugin](Backend_GameLogic_PluginManager.PluginManager.md#overwriteplugin)
- [render](Backend_GameLogic_PluginManager.PluginManager.md#render)
- [reorderPlugins](Backend_GameLogic_PluginManager.PluginManager.md#reorderplugins)
- [spawn](Backend_GameLogic_PluginManager.PluginManager.md#spawn)
- [copy](Backend_GameLogic_PluginManager.PluginManager.md#copy)

## Constructors

### constructor

• **new PluginManager**(`gameManager`)

#### Parameters

| Name          | Type                                                  |
| :------------ | :---------------------------------------------------- |
| `gameManager` | [`default`](Backend_GameLogic_GameManager.default.md) |

## Properties

### gameManager

• `Private` **gameManager**: [`default`](Backend_GameLogic_GameManager.default.md)

---

### pluginLibrary

• `Private` **pluginLibrary**: [`SerializedPlugin`](../interfaces/Backend_Plugins_SerializedPlugin.SerializedPlugin.md)[]

All the plugins in the player's library. Not all of the player's plugins
are running, and therefore not all exist in `pluginInstances`.
`PluginsManager` keeps this field in sync with the plugins the user has
saved in the IndexDB via {@link PersistentChunkStore}

---

### pluginProcessInfos

• `Private` **pluginProcessInfos**: `Record`<`string`, [`ProcessInfo`](Backend_GameLogic_PluginManager.ProcessInfo.md)\>

parallel to pluginProcesses

---

### pluginProcesses

• `Private` **pluginProcesses**: `Record`<`string`, [`PluginProcess`](../interfaces/Backend_Plugins_PluginProcess.PluginProcess.md)\>

Plugins that are currently loaded into the game, and are rendering into a modal.
`PluginsManager` makes sure that when a plugin starts executing, it is added into
`pluginInstances`, and that once a plugin is unloaded, its `.destroy()` method is called, and
that the plugin is removed from `pluginInstances`.

---

### plugins$

• **plugins$**: `Monomitter`<[`SerializedPlugin`](../interfaces/Backend_Plugins_SerializedPlugin.SerializedPlugin.md)[]\>

Event emitter that publishes whenever the set of plugins changes.

## Methods

### addPluginToLibrary

▸ **addPluginToLibrary**(`id`, `name`, `code`): [`SerializedPlugin`](../interfaces/Backend_Plugins_SerializedPlugin.SerializedPlugin.md)

adds a new plugin into the plugin library.

#### Parameters

| Name   | Type       |
| :----- | :--------- |
| `id`   | `PluginId` |
| `name` | `string`   |
| `code` | `string`   |

#### Returns

[`SerializedPlugin`](../interfaces/Backend_Plugins_SerializedPlugin.SerializedPlugin.md)

---

### deletePlugin

▸ **deletePlugin**(`pluginId`): `Promise`<`void`\>

Remove the given plugin both from the player's library, and kills
the plugin if it is running.

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `pluginId` | `PluginId` |

#### Returns

`Promise`<`void`\>

---

### destroy

▸ **destroy**(`id`): `void`

If a plugin with the given id is running, call its `.destroy()` method,
and remove it from `pluginInstances`. Stop listening for new local plugins.

#### Parameters

| Name | Type       |
| :--- | :--------- |
| `id` | `PluginId` |

#### Returns

`void`

---

### drawAllRunningPlugins

▸ **drawAllRunningPlugins**(`ctx`): `void`

For each currently running plugin, if the plugin has a 'draw'
function, then draw that plugin to the screen.

#### Parameters

| Name  | Type                       |
| :---- | :------------------------- |
| `ctx` | `CanvasRenderingContext2D` |

#### Returns

`void`

---

### getAllProcessInfos

▸ **getAllProcessInfos**(): `Map`<`PluginId`, [`ProcessInfo`](Backend_GameLogic_PluginManager.ProcessInfo.md)\>

Gets a map of all the currently running processes

#### Returns

`Map`<`PluginId`, [`ProcessInfo`](Backend_GameLogic_PluginManager.ProcessInfo.md)\>

---

### getLibrary

▸ **getLibrary**(): [`SerializedPlugin`](../interfaces/Backend_Plugins_SerializedPlugin.SerializedPlugin.md)[]

Gets all the plugins in this player's library.

#### Returns

[`SerializedPlugin`](../interfaces/Backend_Plugins_SerializedPlugin.SerializedPlugin.md)[]

---

### getPluginFromLibrary

▸ **getPluginFromLibrary**(`id?`): `undefined` \| [`SerializedPlugin`](../interfaces/Backend_Plugins_SerializedPlugin.SerializedPlugin.md)

Gets the serialized plugin with the given id from the player's plugin
library. `undefined` if no plugin exists.

#### Parameters

| Name  | Type       |
| :---- | :--------- |
| `id?` | `PluginId` |

#### Returns

`undefined` \| [`SerializedPlugin`](../interfaces/Backend_Plugins_SerializedPlugin.SerializedPlugin.md)

---

### getProcessInfo

▸ **getProcessInfo**(`id`): [`ProcessInfo`](Backend_GameLogic_PluginManager.ProcessInfo.md)

If this process has been started, gets its info

#### Parameters

| Name | Type       |
| :--- | :--------- |
| `id` | `PluginId` |

#### Returns

[`ProcessInfo`](Backend_GameLogic_PluginManager.ProcessInfo.md)

---

### hasPlugin

▸ `Private` **hasPlugin**(`plugin`): `boolean`

#### Parameters

| Name     | Type                                                                                     |
| :------- | :--------------------------------------------------------------------------------------- |
| `plugin` | [`EmbeddedPlugin`](../interfaces/Backend_Plugins_EmbeddedPluginLoader.EmbeddedPlugin.md) |

#### Returns

`boolean`

---

### load

▸ **load**(`isAdmin`, `overwriteEmbeddedPlugins`): `Promise`<`void`\>

Load all plugins from this disk into `pluginLibrary`. Insert the default
plugins into the player's library if the default plugins have never been
added before. Effectively idempotent after the first time you call it.

#### Parameters

| Name                       | Type      | Description                                                                               |
| :------------------------- | :-------- | :---------------------------------------------------------------------------------------- |
| `isAdmin`                  | `boolean` | Is an admin loading the plugins.                                                          |
| `overwriteEmbeddedPlugins` | `boolean` | Reload all embedded plugins even if a local copy is found. Useful for plugin development. |

#### Returns

`Promise`<`void`\>

---

### notifyPluginLibraryUpdated

▸ `Private` **notifyPluginLibraryUpdated**(): `void`

#### Returns

`void`

---

### onNewEmbeddedPlugins

▸ `Private` **onNewEmbeddedPlugins**(`newPlugins`, `overwriteEmbeddedPlugins`): `void`

#### Parameters

| Name                       | Type                                                                                       |
| :------------------------- | :----------------------------------------------------------------------------------------- |
| `newPlugins`               | [`EmbeddedPlugin`](../interfaces/Backend_Plugins_EmbeddedPluginLoader.EmbeddedPlugin.md)[] |
| `overwriteEmbeddedPlugins` | `boolean`                                                                                  |

#### Returns

`void`

---

### overwritePlugin

▸ **overwritePlugin**(`newName`, `pluginCode`, `id`): `void`

1. kills the plugin if it's running
2. edits the plugin-library version of this plugin
3. if a plugin was edited, save the plugin library to disk

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `newName`    | `string`   |
| `pluginCode` | `string`   |
| `id`         | `PluginId` |

#### Returns

`void`

---

### render

▸ **render**(`id`, `element`): `Promise`<`void`\>

If this plugin's `render` method has not been called yet, then
call it! Remembers that this plugin has been rendered.

#### Parameters

| Name      | Type             |
| :-------- | :--------------- |
| `id`      | `PluginId`       |
| `element` | `HTMLDivElement` |

#### Returns

`Promise`<`void`\>

---

### reorderPlugins

▸ **reorderPlugins**(`newPluginIdOrder`): `void`

Reorders the current plugins. plugin ids in `newPluginIdOrder` must correspond
1:1 to plugins in the plugin library.

#### Parameters

| Name               | Type       |
| :----------------- | :--------- |
| `newPluginIdOrder` | `string`[] |

#### Returns

`void`

---

### spawn

▸ **spawn**(`id`): `Promise`<`undefined` \| [`PluginProcess`](../interfaces/Backend_Plugins_PluginProcess.PluginProcess.md)\>

Either spawns the given plugin by evaluating its `pluginCode`, or
returns the already running plugin instance. If starting a plugin
throws an error then returns `undefined`.

#### Parameters

| Name | Type       |
| :--- | :--------- |
| `id` | `PluginId` |

#### Returns

`Promise`<`undefined` \| [`PluginProcess`](../interfaces/Backend_Plugins_PluginProcess.PluginProcess.md)\>

---

### copy

▸ `Static` `Private` **copy**<`T`\>(`plugin`): `T`

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
| `plugin` | `T`  |

#### Returns

`T`
