# Interface: PluginProcess

[Backend/Plugins/PluginProcess](../modules/backend_plugins_pluginprocess.md).PluginProcess

All plugins must conform to this interface. Provides facilities for
displaying an interactive UI, as well as references to game state,
which are set externally.

## Table of contents

### Constructors

- [constructor](backend_plugins_pluginprocess.pluginprocess.md#constructor)

### Properties

- [destroy](backend_plugins_pluginprocess.pluginprocess.md#destroy)
- [draw](backend_plugins_pluginprocess.pluginprocess.md#draw)
- [render](backend_plugins_pluginprocess.pluginprocess.md#render)

## Constructors

### constructor

\+ **new PluginProcess**(): [_PluginProcess_](backend_plugins_pluginprocess.pluginprocess.md)

**Returns:** [_PluginProcess_](backend_plugins_pluginprocess.pluginprocess.md)

## Properties

### destroy

• `Optional` **destroy**: () => _void_

Called when the plugin is unloaded. Plugins unload whenever the
plugin is edited (modified and saved, or deleted).

#### Type declaration

▸ (): _void_

**Returns:** _void_

---

### draw

• `Optional` **draw**: (`ctx`: CanvasRenderingContext2D) => _void_

If present, called at the same framerate the the game is running at,
and allows you to draw on top of the game UI.

#### Type declaration

▸ (`ctx`: CanvasRenderingContext2D): _void_

#### Parameters

| Name  | Type                     |
| :---- | :----------------------- |
| `ctx` | CanvasRenderingContext2D |

**Returns:** _void_

---

### render

• `Optional` **render**: (`into`: HTMLDivElement) => _void_

If present, called once when the user clicks 'run' in the plugin
manager modal.

#### Type declaration

▸ (`into`: HTMLDivElement): _void_

#### Parameters

| Name   | Type           |
| :----- | :------------- |
| `into` | HTMLDivElement |

**Returns:** _void_
