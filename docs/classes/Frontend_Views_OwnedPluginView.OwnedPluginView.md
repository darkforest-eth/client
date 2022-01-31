# Class: OwnedPluginView

[Frontend/Views/OwnedPluginView](../modules/Frontend_Views_OwnedPluginView.md).OwnedPluginView

One row in {@link PluginLibraryView}. Represents a single plugin. Allows
the user to edit, delete, or open the plugin. This class is responsible for
evaluating a plugin's source code (as safely as we can), and calling its
appropriate lifecycle methods. Loads and evaluates the plugin on mount,
and destroys and unloads the plugin on dismount. I'm not sure I like how tightly
coupled rendering is to evaluating here, so I'll probably move the evaluation
code into {@link PluginHost} at some point.

## Hierarchy

- `Component`<`Props`, `State`\>

  ↳ **`OwnedPluginView`**

## Table of contents

### Constructors

- [constructor](Frontend_Views_OwnedPluginView.OwnedPluginView.md#constructor)

### Properties

- [closeEditor](Frontend_Views_OwnedPluginView.OwnedPluginView.md#closeeditor)
- [renderedPluginRef](Frontend_Views_OwnedPluginView.OwnedPluginView.md#renderedpluginref)
- [state](Frontend_Views_OwnedPluginView.OwnedPluginView.md#state)

### Methods

- [deletePluginClicked](Frontend_Views_OwnedPluginView.OwnedPluginView.md#deletepluginclicked)
- [editClicked](Frontend_Views_OwnedPluginView.OwnedPluginView.md#editclicked)
- [render](Frontend_Views_OwnedPluginView.OwnedPluginView.md#render)
- [runClicked](Frontend_Views_OwnedPluginView.OwnedPluginView.md#runclicked)
- [saveRef](Frontend_Views_OwnedPluginView.OwnedPluginView.md#saveref)
- [setModalIsOpen](Frontend_Views_OwnedPluginView.OwnedPluginView.md#setmodalisopen)

## Constructors

### constructor

• **new OwnedPluginView**(`props`)

#### Parameters

| Name    | Type                            |
| :------ | :------------------------------ |
| `props` | `Props` \| `Readonly`<`Props`\> |

#### Inherited from

React.Component<Props, State\>.constructor

• **new OwnedPluginView**(`props`, `context`)

**`deprecated`**

**`see`** https://reactjs.org/docs/legacy-context.html

#### Parameters

| Name      | Type    |
| :-------- | :------ |
| `props`   | `Props` |
| `context` | `any`   |

#### Inherited from

React.Component<Props, State\>.constructor

## Properties

### closeEditor

• `Private` **closeEditor**: `undefined` \| () => `void`

---

### renderedPluginRef

• `Private` **renderedPluginRef**: `null` \| `HTMLDivElement`

---

### state

• **state**: `Object`

#### Type declaration

| Name        | Type        |
| :---------- | :---------- |
| `error`     | `undefined` |
| `modalOpen` | `boolean`   |
| `rendered`  | `boolean`   |

#### Overrides

React.Component.state

## Methods

### deletePluginClicked

▸ `Private` **deletePluginClicked**(): `void`

#### Returns

`void`

---

### editClicked

▸ `Private` **editClicked**(): `void`

#### Returns

`void`

---

### render

▸ **render**(): `Element`

#### Returns

`Element`

#### Overrides

React.Component.render

---

### runClicked

▸ `Private` **runClicked**(): `void`

#### Returns

`void`

---

### saveRef

▸ `Private` **saveRef**(`el`): `void`

#### Parameters

| Name | Type                       |
| :--- | :------------------------- |
| `el` | `null` \| `HTMLDivElement` |

#### Returns

`void`

---

### setModalIsOpen

▸ `Private` **setModalIsOpen**(`isOpen`): `void`

#### Parameters

| Name     | Type      |
| :------- | :-------- |
| `isOpen` | `boolean` |

#### Returns

`void`
