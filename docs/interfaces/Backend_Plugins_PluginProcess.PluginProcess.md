# Interface: PluginProcess

[Backend/Plugins/PluginProcess](../modules/Backend_Plugins_PluginProcess.md).PluginProcess

All plugins must conform to this interface. Provides facilities for
displaying an interactive UI, as well as references to game state,
which are set externally.

## Table of contents

### Constructors

- [constructor](Backend_Plugins_PluginProcess.PluginProcess.md#constructor)

### Methods

- [destroy](Backend_Plugins_PluginProcess.PluginProcess.md#destroy)
- [draw](Backend_Plugins_PluginProcess.PluginProcess.md#draw)
- [render](Backend_Plugins_PluginProcess.PluginProcess.md#render)

## Constructors

### constructor

• **new PluginProcess**()

## Methods

### destroy

▸ `Optional` **destroy**(): `void`

Called when the plugin is unloaded. Plugins unload whenever the
plugin is edited (modified and saved, or deleted).

#### Returns

`void`

---

### draw

▸ `Optional` **draw**(`ctx`): `void`

If present, called at the same framerate the the game is running at,
and allows you to draw on top of the game UI.

#### Parameters

| Name  | Type                       |
| :---- | :------------------------- |
| `ctx` | `CanvasRenderingContext2D` |

#### Returns

`void`

---

### render

▸ `Optional` **render**(`into`): `void`

If present, called once when the user clicks 'run' in the plugin
manager modal.

#### Parameters

| Name   | Type             |
| :----- | :--------------- |
| `into` | `HTMLDivElement` |

#### Returns

`void`
