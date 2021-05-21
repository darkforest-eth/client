# Module: Frontend/Views/OwnedPluginView

## Table of contents

### Classes

- [OwnedPluginView](../classes/frontend_views_ownedpluginview.ownedpluginview.md)

### Type aliases

- [OpenEditor](frontend_views_ownedpluginview.md#openeditor)

### Variables

- [Actions](frontend_views_ownedpluginview.md#actions)

## Type aliases

### OpenEditor

Ƭ **OpenEditor**: (`pluginId`: [_PluginId_](backend_plugins_serializedplugin.md#pluginid)) => () => _void_

Should

1. open an editor for this plugin
2. return a function that closes the editor.

#### Type declaration

▸ (`pluginId`: [_PluginId_](backend_plugins_serializedplugin.md#pluginid)): _function_

#### Parameters

| Name       | Type                                                       |
| :--------- | :--------------------------------------------------------- |
| `pluginId` | [_PluginId_](backend_plugins_serializedplugin.md#pluginid) |

**Returns:** () => _void_

## Variables

### Actions

• `Const` **Actions**: _StyledComponent_<`"div"`, any, {}, never\>
