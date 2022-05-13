# Class: DarkForestNumberInput

[Frontend/Components/Input](../modules/Frontend_Components_Input.md).DarkForestNumberInput

## Hierarchy

- `LitElement`

  ↳ **`DarkForestNumberInput`**

## Table of contents

### Constructors

- [constructor](Frontend_Components_Input.DarkForestNumberInput.md#constructor)

### Properties

- [\_handleInput](Frontend_Components_Input.DarkForestNumberInput.md#_handleinput)
- [\_handleKeyDown](Frontend_Components_Input.DarkForestNumberInput.md#_handlekeydown)
- [\_handleKeyUp](Frontend_Components_Input.DarkForestNumberInput.md#_handlekeyup)
- [\_handleWheel](Frontend_Components_Input.DarkForestNumberInput.md#_handlewheel)
- [\_inputRef](Frontend_Components_Input.DarkForestNumberInput.md#_inputref)
- [\_value](Frontend_Components_Input.DarkForestNumberInput.md#_value)
- [disabled](Frontend_Components_Input.DarkForestNumberInput.md#disabled)
- [format](Frontend_Components_Input.DarkForestNumberInput.md#format)
- [readonly](Frontend_Components_Input.DarkForestNumberInput.md#readonly)
- [selected](Frontend_Components_Input.DarkForestNumberInput.md#selected)
- [properties](Frontend_Components_Input.DarkForestNumberInput.md#properties)
- [styles](Frontend_Components_Input.DarkForestNumberInput.md#styles)
- [tagName](Frontend_Components_Input.DarkForestNumberInput.md#tagname)

### Accessors

- [value](Frontend_Components_Input.DarkForestNumberInput.md#value)

### Methods

- [firstUpdated](Frontend_Components_Input.DarkForestNumberInput.md#firstupdated)
- [focus](Frontend_Components_Input.DarkForestNumberInput.md#focus)
- [render](Frontend_Components_Input.DarkForestNumberInput.md#render)
- [select](Frontend_Components_Input.DarkForestNumberInput.md#select)

## Constructors

### constructor

• **new DarkForestNumberInput**()

#### Inherited from

LitElement.constructor

## Properties

### \_handleInput

• `Private` **\_handleInput**: `any`

---

### \_handleKeyDown

• `Private` **\_handleKeyDown**: `any`

---

### \_handleKeyUp

• `Private` **\_handleKeyUp**: `any`

---

### \_handleWheel

• `Private` **\_handleWheel**: `any`

---

### \_inputRef

• `Private` **\_inputRef**: `any`

---

### \_value

• `Private` **\_value**: `any`

---

### disabled

• `Optional` **disabled**: `boolean`

---

### format

• **format**: `"integer"` \| `"float"`

---

### readonly

• **readonly**: `boolean`

---

### selected

• **selected**: `boolean`

---

### properties

▪ `Static` **properties**: `Object`

#### Type declaration

| Name            | Type                             |
| :-------------- | :------------------------------- |
| `_value`        | { `state`: `boolean` }           |
| `_value.state`  | `boolean`                        |
| `disabled`      | { `type`: `BooleanConstructor` } |
| `disabled.type` | `BooleanConstructor`             |
| `format`        | { `type`: `StringConstructor` }  |
| `format.type`   | `StringConstructor`              |
| `readonly`      | { `type`: `BooleanConstructor` } |
| `readonly.type` | `BooleanConstructor`             |
| `selected`      | { `type`: `BooleanConstructor` } |
| `selected.type` | `BooleanConstructor`             |
| `value`         | { `type`: `NumberConstructor` }  |
| `value.type`    | `NumberConstructor`              |

#### Overrides

LitElement.properties

---

### styles

▪ `Static` **styles**: `CSSResult`

#### Overrides

LitElement.styles

---

### tagName

▪ `Static` **tagName**: `string`

## Accessors

### value

• `get` **value**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

• `set` **value**(`newValue`): `void`

#### Parameters

| Name       | Type                    |
| :--------- | :---------------------- |
| `newValue` | `undefined` \| `number` |

#### Returns

`void`

## Methods

### firstUpdated

▸ **firstUpdated**(): `void`

#### Returns

`void`

#### Overrides

LitElement.firstUpdated

---

### focus

▸ **focus**(): `void`

#### Returns

`void`

#### Overrides

LitElement.focus

---

### render

▸ **render**(): `TemplateResult`<`1`\>

#### Returns

`TemplateResult`<`1`\>

#### Overrides

LitElement.render

---

### select

▸ **select**(): `void`

#### Returns

`void`
