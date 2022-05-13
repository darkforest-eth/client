# Class: DFErrorBoundary

[Frontend/Views/DFErrorBoundary](../modules/Frontend_Views_DFErrorBoundary.md).DFErrorBoundary

## Hierarchy

- `Component`<`unknown`, { `hasError`: `boolean` }\>

  ↳ **`DFErrorBoundary`**

## Table of contents

### Constructors

- [constructor](Frontend_Views_DFErrorBoundary.DFErrorBoundary.md#constructor)

### Methods

- [componentDidCatch](Frontend_Views_DFErrorBoundary.DFErrorBoundary.md#componentdidcatch)
- [render](Frontend_Views_DFErrorBoundary.DFErrorBoundary.md#render)
- [getDerivedStateFromError](Frontend_Views_DFErrorBoundary.DFErrorBoundary.md#getderivedstatefromerror)

## Constructors

### constructor

• **new DFErrorBoundary**(`props`)

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `props` | `unknown` |

#### Overrides

React.Component&lt;unknown, { hasError: boolean }\&gt;.constructor

## Methods

### componentDidCatch

▸ **componentDidCatch**(`error`, `_errorInfo`): `void`

#### Parameters

| Name         | Type        |
| :----------- | :---------- |
| `error`      | `Error`     |
| `_errorInfo` | `ErrorInfo` |

#### Returns

`void`

#### Overrides

React.Component.componentDidCatch

---

### render

▸ **render**(): `ReactNode`

#### Returns

`ReactNode`

#### Overrides

React.Component.render

---

### getDerivedStateFromError

▸ `Static` **getDerivedStateFromError**(`_error`): `Object`

#### Parameters

| Name     | Type    |
| :------- | :------ |
| `_error` | `Error` |

#### Returns

`Object`

| Name       | Type      |
| :--------- | :-------- |
| `hasError` | `boolean` |
