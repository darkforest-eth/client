# Class: OwnedPluginView

[Frontend/Views/OwnedPluginView](../modules/frontend_views_ownedpluginview.md).OwnedPluginView

One row in {@link PluginLibraryView}. Represents a single plugin. Allows
the user to edit, delete, or open the plugin. This class is responsible for
evaluating a plugin's source code (as safely as we can), and calling its
appropriate lifecycle methods. Loads and evaluates the plugin on mount,
and destroys and unloads the plugin on dismount. I'm not sure I like how tightly
coupled rendering is to evaluating here, so I'll probably move the evaluation
code into {@link PluginHost} at some point.

## Hierarchy

- _Component_<Props, State\>

  ↳ **OwnedPluginView**

## Table of contents

### Constructors

- [constructor](frontend_views_ownedpluginview.ownedpluginview.md#constructor)

### Properties

- [closeEditor](frontend_views_ownedpluginview.ownedpluginview.md#closeeditor)
- [renderedPluginRef](frontend_views_ownedpluginview.ownedpluginview.md#renderedpluginref)
- [state](frontend_views_ownedpluginview.ownedpluginview.md#state)

### Methods

- [deletePluginClicked](frontend_views_ownedpluginview.ownedpluginview.md#deletepluginclicked)
- [editClicked](frontend_views_ownedpluginview.ownedpluginview.md#editclicked)
- [render](frontend_views_ownedpluginview.ownedpluginview.md#render)
- [runClicked](frontend_views_ownedpluginview.ownedpluginview.md#runclicked)
- [saveRef](frontend_views_ownedpluginview.ownedpluginview.md#saveref)
- [setModalIsOpen](frontend_views_ownedpluginview.ownedpluginview.md#setmodalisopen)

## Constructors

### constructor

\+ **new OwnedPluginView**(`props`: Props \| _Readonly_<Props\>): [_OwnedPluginView_](frontend_views_ownedpluginview.ownedpluginview.md)

#### Parameters

| Name    | Type                        |
| :------ | :-------------------------- |
| `props` | Props \| _Readonly_<Props\> |

**Returns:** [_OwnedPluginView_](frontend_views_ownedpluginview.ownedpluginview.md)

Inherited from: React.Component<Props, State\>.constructor

\+ **new OwnedPluginView**(`props`: Props, `context`: _any_): [_OwnedPluginView_](frontend_views_ownedpluginview.ownedpluginview.md)

**`deprecated`**

**`see`** https://reactjs.org/docs/legacy-context.html

#### Parameters

| Name      | Type  |
| :-------- | :---- |
| `props`   | Props |
| `context` | _any_ |

**Returns:** [_OwnedPluginView_](frontend_views_ownedpluginview.ownedpluginview.md)

Inherited from: React.Component<Props, State\>.constructor

## Properties

### closeEditor

• `Private` **closeEditor**: _undefined_ \| () => _void_

---

### renderedPluginRef

• `Private` **renderedPluginRef**: `null` \| HTMLDivElement

---

### state

• **state**: _object_

#### Type declaration

| Name        | Type        |
| :---------- | :---------- |
| `error`     | _undefined_ |
| `modalOpen` | _boolean_   |
| `rendered`  | _boolean_   |

Overrides: React.Component.state

## Methods

### deletePluginClicked

▸ `Private` **deletePluginClicked**(): _void_

**Returns:** _void_

---

### editClicked

▸ `Private` **editClicked**(): _void_

**Returns:** _void_

---

### render

▸ **render**(): _Element_

**Returns:** _Element_

Overrides: React.Component.render

---

### runClicked

▸ `Private` **runClicked**(): _void_

**Returns:** _void_

---

### saveRef

▸ `Private` **saveRef**(`el`: `null` \| HTMLDivElement): _void_

#### Parameters

| Name | Type                     |
| :--- | :----------------------- |
| `el` | `null` \| HTMLDivElement |

**Returns:** _void_

---

### setModalIsOpen

▸ `Private` **setModalIsOpen**(`isOpen`: _boolean_): _void_

#### Parameters

| Name     | Type      |
| :------- | :-------- |
| `isOpen` | _boolean_ |

**Returns:** _void_
