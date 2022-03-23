# Class: GenericErrorBoundary

[Frontend/Views/GenericErrorBoundary](../modules/Frontend_Views_GenericErrorBoundary.md).GenericErrorBoundary

## Hierarchy

- `Component`<`GenericErrorBoundaryProps`, { `hasError`: `boolean` }\>

  ↳ **`GenericErrorBoundary`**

## Table of contents

### Constructors

- [constructor](Frontend_Views_GenericErrorBoundary.GenericErrorBoundary.md#constructor)

### Methods

- [componentDidCatch](Frontend_Views_GenericErrorBoundary.GenericErrorBoundary.md#componentdidcatch)
- [render](Frontend_Views_GenericErrorBoundary.GenericErrorBoundary.md#render)
- [getDerivedStateFromError](Frontend_Views_GenericErrorBoundary.GenericErrorBoundary.md#getderivedstatefromerror)

## Constructors

### constructor

• **new GenericErrorBoundary**(`props`)

#### Parameters

| Name    | Type                        |
| :------ | :-------------------------- |
| `props` | `GenericErrorBoundaryProps` |

#### Overrides

React.Component&lt;
GenericErrorBoundaryProps,
{ hasError: boolean }
\&gt;.constructor

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
