# Class: GenericErrorBoundary

[Frontend/Views/GenericErrorBoundary](../modules/frontend_views_genericerrorboundary.md).GenericErrorBoundary

## Hierarchy

- _Component_<GenericErrorBoundaryProps, { `hasError`: _boolean_ }\>

  ↳ **GenericErrorBoundary**

## Table of contents

### Constructors

- [constructor](frontend_views_genericerrorboundary.genericerrorboundary.md#constructor)

### Methods

- [componentDidCatch](frontend_views_genericerrorboundary.genericerrorboundary.md#componentdidcatch)
- [render](frontend_views_genericerrorboundary.genericerrorboundary.md#render)
- [getDerivedStateFromError](frontend_views_genericerrorboundary.genericerrorboundary.md#getderivedstatefromerror)

## Constructors

### constructor

\+ **new GenericErrorBoundary**(`props`: GenericErrorBoundaryProps): [_GenericErrorBoundary_](frontend_views_genericerrorboundary.genericerrorboundary.md)

#### Parameters

| Name    | Type                      |
| :------ | :------------------------ |
| `props` | GenericErrorBoundaryProps |

**Returns:** [_GenericErrorBoundary_](frontend_views_genericerrorboundary.genericerrorboundary.md)

Overrides: React.Component&lt;
GenericErrorBoundaryProps,
{ hasError: boolean }
\&gt;.constructor

## Methods

### componentDidCatch

▸ **componentDidCatch**(`error`: Error, `_errorInfo`: ErrorInfo): _void_

#### Parameters

| Name         | Type      |
| :----------- | :-------- |
| `error`      | Error     |
| `_errorInfo` | ErrorInfo |

**Returns:** _void_

Overrides: React.Component.componentDidCatch

---

### render

▸ **render**(): _undefined_ \| `null` \| {}

**Returns:** _undefined_ \| `null` \| {}

Overrides: React.Component.render

---

### getDerivedStateFromError

▸ `Static` **getDerivedStateFromError**(`_error`: Error): _object_

#### Parameters

| Name     | Type  |
| :------- | :---- |
| `_error` | Error |

**Returns:** _object_

| Name       | Type      |
| :--------- | :-------- |
| `hasError` | _boolean_ |
