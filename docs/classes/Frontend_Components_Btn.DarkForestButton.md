# Class: DarkForestButton

[Frontend/Components/Btn](../modules/Frontend_Components_Btn.md).DarkForestButton

## Hierarchy

- `LitElement`

  ↳ **`DarkForestButton`**

  ↳↳ [`DarkForestShortcutButton`](Frontend_Components_Btn.DarkForestShortcutButton.md)

## Table of contents

### Constructors

- [constructor](Frontend_Components_Btn.DarkForestButton.md#constructor)

### Properties

- [active](Frontend_Components_Btn.DarkForestButton.md#active)
- [disabled](Frontend_Components_Btn.DarkForestButton.md#disabled)
- [size](Frontend_Components_Btn.DarkForestButton.md#size)
- [variant](Frontend_Components_Btn.DarkForestButton.md#variant)
- [properties](Frontend_Components_Btn.DarkForestButton.md#properties)
- [styles](Frontend_Components_Btn.DarkForestButton.md#styles)
- [tagName](Frontend_Components_Btn.DarkForestButton.md#tagname)

### Methods

- [\_handleClick](Frontend_Components_Btn.DarkForestButton.md#_handleclick)
- [render](Frontend_Components_Btn.DarkForestButton.md#render)

## Constructors

### constructor

• **new DarkForestButton**()

#### Inherited from

LitElement.constructor

## Properties

### active

• **active**: `boolean`

---

### disabled

• **disabled**: `boolean`

---

### size

• **size**: `"small"` \| `"stretch"` \| `"medium"` \| `"large"`

---

### variant

• **variant**: `"normal"` \| `"danger"`

---

### properties

▪ `Static` **properties**: `Object`

#### Type declaration

| Name            | Type                             |
| :-------------- | :------------------------------- |
| `active`        | { `type`: `BooleanConstructor` } |
| `active.type`   | `BooleanConstructor`             |
| `disabled`      | { `type`: `BooleanConstructor` } |
| `disabled.type` | `BooleanConstructor`             |
| `size`          | { `type`: `StringConstructor` }  |
| `size.type`     | `StringConstructor`              |
| `variant`       | { `type`: `StringConstructor` }  |
| `variant.type`  | `StringConstructor`              |

#### Overrides

LitElement.properties

---

### styles

▪ `Static` **styles**: `CSSResult`[]

#### Overrides

LitElement.styles

---

### tagName

▪ `Static` **tagName**: `string`

## Methods

### \_handleClick

▸ `Protected` **\_handleClick**(`evt`): `void`

#### Parameters

| Name  | Type         |
| :---- | :----------- |
| `evt` | `MouseEvent` |

#### Returns

`void`

---

### render

▸ **render**(): `TemplateResult`<`1`\>

#### Returns

`TemplateResult`<`1`\>

#### Overrides

LitElement.render
