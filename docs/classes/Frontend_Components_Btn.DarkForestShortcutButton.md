# Class: DarkForestShortcutButton

[Frontend/Components/Btn](../modules/Frontend_Components_Btn.md).DarkForestShortcutButton

## Hierarchy

- [`DarkForestButton`](Frontend_Components_Btn.DarkForestButton.md)

  ↳ **`DarkForestShortcutButton`**

## Table of contents

### Constructors

- [constructor](Frontend_Components_Btn.DarkForestShortcutButton.md#constructor)

### Properties

- [\_getKeyFromEvent](Frontend_Components_Btn.DarkForestShortcutButton.md#_getkeyfromevent)
- [\_handleKeyDown](Frontend_Components_Btn.DarkForestShortcutButton.md#_handlekeydown)
- [\_handleKeyUp](Frontend_Components_Btn.DarkForestShortcutButton.md#_handlekeyup)
- [\_renderKbd](Frontend_Components_Btn.DarkForestShortcutButton.md#_renderkbd)
- [\_shortcutPressed](Frontend_Components_Btn.DarkForestShortcutButton.md#_shortcutpressed)
- [active](Frontend_Components_Btn.DarkForestShortcutButton.md#active)
- [disabled](Frontend_Components_Btn.DarkForestShortcutButton.md#disabled)
- [shortcutKey](Frontend_Components_Btn.DarkForestShortcutButton.md#shortcutkey)
- [shortcutText](Frontend_Components_Btn.DarkForestShortcutButton.md#shortcuttext)
- [size](Frontend_Components_Btn.DarkForestShortcutButton.md#size)
- [variant](Frontend_Components_Btn.DarkForestShortcutButton.md#variant)
- [properties](Frontend_Components_Btn.DarkForestShortcutButton.md#properties)
- [styles](Frontend_Components_Btn.DarkForestShortcutButton.md#styles)
- [tagName](Frontend_Components_Btn.DarkForestShortcutButton.md#tagname)

### Methods

- [\_handleClick](Frontend_Components_Btn.DarkForestShortcutButton.md#_handleclick)
- [connectedCallback](Frontend_Components_Btn.DarkForestShortcutButton.md#connectedcallback)
- [disconnectedCallback](Frontend_Components_Btn.DarkForestShortcutButton.md#disconnectedcallback)
- [render](Frontend_Components_Btn.DarkForestShortcutButton.md#render)

## Constructors

### constructor

• **new DarkForestShortcutButton**()

#### Inherited from

[DarkForestButton](Frontend_Components_Btn.DarkForestButton.md).[constructor](Frontend_Components_Btn.DarkForestButton.md#constructor)

## Properties

### \_getKeyFromEvent

• `Private` **\_getKeyFromEvent**: `any`

---

### \_handleKeyDown

• `Private` **\_handleKeyDown**: `any`

---

### \_handleKeyUp

• `Private` **\_handleKeyUp**: `any`

---

### \_renderKbd

• `Private` **\_renderKbd**: `any`

---

### \_shortcutPressed

• `Private` **\_shortcutPressed**: `any`

---

### active

• **active**: `boolean`

#### Inherited from

[DarkForestButton](Frontend_Components_Btn.DarkForestButton.md).[active](Frontend_Components_Btn.DarkForestButton.md#active)

---

### disabled

• **disabled**: `boolean`

#### Inherited from

[DarkForestButton](Frontend_Components_Btn.DarkForestButton.md).[disabled](Frontend_Components_Btn.DarkForestButton.md#disabled)

---

### shortcutKey

• `Optional` **shortcutKey**: `string`

The `shortcutKey` indicates which key this component listens for while it is mounted

---

### shortcutText

• `Optional` **shortcutText**: `string`

The `shortcutText` indicates the key should be displayed and with what text

---

### size

• **size**: `"small"` \| `"stretch"` \| `"medium"` \| `"large"`

#### Inherited from

[DarkForestButton](Frontend_Components_Btn.DarkForestButton.md).[size](Frontend_Components_Btn.DarkForestButton.md#size)

---

### variant

• **variant**: `"normal"` \| `"danger"`

#### Inherited from

[DarkForestButton](Frontend_Components_Btn.DarkForestButton.md).[variant](Frontend_Components_Btn.DarkForestButton.md#variant)

---

### properties

▪ `Static` **properties**: `Object`

#### Type declaration

| Name                     | Type                             |
| :----------------------- | :------------------------------- |
| `_shortcutPressed`       | { `state`: `boolean` }           |
| `_shortcutPressed.state` | `boolean`                        |
| `active`                 | { `type`: `BooleanConstructor` } |
| `active.type`            | `BooleanConstructor`             |
| `disabled`               | { `type`: `BooleanConstructor` } |
| `disabled.type`          | `BooleanConstructor`             |
| `shortcutKey`            | { `type`: `StringConstructor` }  |
| `shortcutKey.type`       | `StringConstructor`              |
| `shortcutText`           | { `type`: `StringConstructor` }  |
| `shortcutText.type`      | `StringConstructor`              |
| `size`                   | { `type`: `StringConstructor` }  |
| `size.type`              | `StringConstructor`              |
| `variant`                | { `type`: `StringConstructor` }  |
| `variant.type`           | `StringConstructor`              |

#### Overrides

[DarkForestButton](Frontend_Components_Btn.DarkForestButton.md).[properties](Frontend_Components_Btn.DarkForestButton.md#properties)

---

### styles

▪ `Static` **styles**: `CSSResult`[]

#### Overrides

[DarkForestButton](Frontend_Components_Btn.DarkForestButton.md).[styles](Frontend_Components_Btn.DarkForestButton.md#styles)

---

### tagName

▪ `Static` **tagName**: `string`

#### Overrides

[DarkForestButton](Frontend_Components_Btn.DarkForestButton.md).[tagName](Frontend_Components_Btn.DarkForestButton.md#tagname)

## Methods

### \_handleClick

▸ `Protected` **\_handleClick**(`evt`): `void`

#### Parameters

| Name  | Type         |
| :---- | :----------- |
| `evt` | `MouseEvent` |

#### Returns

`void`

#### Inherited from

[DarkForestButton](Frontend_Components_Btn.DarkForestButton.md).[\_handleClick](Frontend_Components_Btn.DarkForestButton.md#_handleclick)

---

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Overrides

DarkForestButton.connectedCallback

---

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Overrides

DarkForestButton.disconnectedCallback

---

### render

▸ **render**(): `TemplateResult`<`1`\>

#### Returns

`TemplateResult`<`1`\>

#### Overrides

[DarkForestButton](Frontend_Components_Btn.DarkForestButton.md).[render](Frontend_Components_Btn.DarkForestButton.md#render)
