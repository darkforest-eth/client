# Class: DarkForestModal

[Frontend/Components/Modal](../modules/Frontend_Components_Modal.md).DarkForestModal

## Hierarchy

- `LitElement`

  ↳ **`DarkForestModal`**

## Table of contents

### Constructors

- [constructor](Frontend_Components_Modal.DarkForestModal.md#constructor)

### Properties

- [\_coords](Frontend_Components_Modal.DarkForestModal.md#_coords)
- [\_delCoords](Frontend_Components_Modal.DarkForestModal.md#_delcoords)
- [\_dragging](Frontend_Components_Modal.DarkForestModal.md#_dragging)
- [\_handleMouseMove](Frontend_Components_Modal.DarkForestModal.md#_handlemousemove)
- [\_handleMoveEnd](Frontend_Components_Modal.DarkForestModal.md#_handlemoveend)
- [\_handleResize](Frontend_Components_Modal.DarkForestModal.md#_handleresize)
- [\_mousedownCoords](Frontend_Components_Modal.DarkForestModal.md#_mousedowncoords)
- [\_setDragging](Frontend_Components_Modal.DarkForestModal.md#_setdragging)
- [\_unsetDragging](Frontend_Components_Modal.DarkForestModal.md#_unsetdragging)
- [contain](Frontend_Components_Modal.DarkForestModal.md#contain)
- [index](Frontend_Components_Modal.DarkForestModal.md#index)
- [initialX](Frontend_Components_Modal.DarkForestModal.md#initialx)
- [initialY](Frontend_Components_Modal.DarkForestModal.md#initialy)
- [minimized](Frontend_Components_Modal.DarkForestModal.md#minimized)
- [renderContent](Frontend_Components_Modal.DarkForestModal.md#rendercontent)
- [renderTitleBar](Frontend_Components_Modal.DarkForestModal.md#rendertitlebar)
- [width](Frontend_Components_Modal.DarkForestModal.md#width)
- [properties](Frontend_Components_Modal.DarkForestModal.md#properties)
- [styles](Frontend_Components_Modal.DarkForestModal.md#styles)
- [tagName](Frontend_Components_Modal.DarkForestModal.md#tagname)

### Methods

- [connectedCallback](Frontend_Components_Modal.DarkForestModal.md#connectedcallback)
- [disconnectedCallback](Frontend_Components_Modal.DarkForestModal.md#disconnectedcallback)
- [firstUpdated](Frontend_Components_Modal.DarkForestModal.md#firstupdated)
- [render](Frontend_Components_Modal.DarkForestModal.md#render)
- [updated](Frontend_Components_Modal.DarkForestModal.md#updated)

## Constructors

### constructor

• **new DarkForestModal**()

#### Inherited from

LitElement.constructor

## Properties

### \_coords

• `Private` `Optional` **\_coords**: `any`

---

### \_delCoords

• `Private` `Optional` **\_delCoords**: `any`

---

### \_dragging

• `Private` **\_dragging**: `any`

---

### \_handleMouseMove

• `Private` **\_handleMouseMove**: `any`

---

### \_handleMoveEnd

• `Private` **\_handleMoveEnd**: `any`

---

### \_handleResize

• `Private` **\_handleResize**: `any`

---

### \_mousedownCoords

• `Private` `Optional` **\_mousedownCoords**: `any`

---

### \_setDragging

• `Private` **\_setDragging**: `any`

---

### \_unsetDragging

• `Private` **\_unsetDragging**: `any`

---

### contain

• **contain**: `Contain`[]

---

### index

• `Optional` **index**: `number`

---

### initialX

• `Optional` **initialX**: `number`

---

### initialY

• `Optional` **initialY**: `number`

---

### minimized

• **minimized**: `boolean`

---

### renderContent

• `Private` **renderContent**: `any`

---

### renderTitleBar

• `Private` **renderTitleBar**: `any`

---

### width

• `Optional` **width**: `string`

---

### properties

▪ `Static` **properties**: `Object`

#### Type declaration

| Name                     | Type                             |
| :----------------------- | :------------------------------- |
| `_delCoords`             | { `state`: `boolean` }           |
| `_delCoords.state`       | `boolean`                        |
| `_dragging`              | { `state`: `boolean` }           |
| `_dragging.state`        | `boolean`                        |
| `_mousedownCoords`       | { `state`: `boolean` }           |
| `_mousedownCoords.state` | `boolean`                        |
| `contain`                | { `type`: `ArrayConstructor` }   |
| `contain.type`           | `ArrayConstructor`               |
| `index`                  | { `type`: `NumberConstructor` }  |
| `index.type`             | `NumberConstructor`              |
| `initialX`               | { `type`: `NumberConstructor` }  |
| `initialX.type`          | `NumberConstructor`              |
| `initialY`               | { `type`: `NumberConstructor` }  |
| `initialY.type`          | `NumberConstructor`              |
| `minimized`              | { `type`: `BooleanConstructor` } |
| `minimized.type`         | `BooleanConstructor`             |
| `width`                  | { `type`: `StringConstructor` }  |
| `width.type`             | `StringConstructor`              |

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

## Methods

### connectedCallback

▸ **connectedCallback**(): `void`

#### Returns

`void`

#### Overrides

LitElement.connectedCallback

---

### disconnectedCallback

▸ **disconnectedCallback**(): `void`

#### Returns

`void`

#### Overrides

LitElement.disconnectedCallback

---

### firstUpdated

▸ **firstUpdated**(): `void`

#### Returns

`void`

#### Overrides

LitElement.firstUpdated

---

### render

▸ **render**(): `TemplateResult`<`1`\>

#### Returns

`TemplateResult`<`1`\>

#### Overrides

LitElement.render

---

### updated

▸ **updated**(`changedProperties`): `void`

#### Parameters

| Name                | Type                                                |
| :------------------ | :-------------------------------------------------- |
| `changedProperties` | `Map`<`string` \| `number` \| `symbol`, `unknown`\> |

#### Returns

`void`

#### Overrides

LitElement.updated
