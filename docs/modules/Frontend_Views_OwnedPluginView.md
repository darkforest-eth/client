# Module: Frontend/Views/OwnedPluginView

## Table of contents

### Classes

- [OwnedPluginView](../classes/Frontend_Views_OwnedPluginView.OwnedPluginView.md)

### Type aliases

- [OpenEditor](Frontend_Views_OwnedPluginView.md#openeditor)

### Variables

- [Actions](Frontend_Views_OwnedPluginView.md#actions)

## Type aliases

### OpenEditor

Ƭ **OpenEditor**: (`pluginId`: [`PluginId`](Backend_Plugins_SerializedPlugin.md#pluginid)) => () => `void`

#### Type declaration

▸ (`pluginId`): () => `void`

Should

1. open an editor for this plugin
2. return a function that closes the editor.

##### Parameters

| Name       | Type                                                       |
| :--------- | :--------------------------------------------------------- |
| `pluginId` | [`PluginId`](Backend_Plugins_SerializedPlugin.md#pluginid) |

##### Returns

`fn`

▸ (): `void`

##### Returns

`void`

## Variables

### Actions

• `Const` **Actions**: `StyledComponent`<`"div"`, `any`, `Object`, `never`\>
