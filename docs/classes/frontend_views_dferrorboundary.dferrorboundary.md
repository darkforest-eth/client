# Class: DFErrorBoundary

[Frontend/Views/DFErrorBoundary](../modules/frontend_views_dferrorboundary.md).DFErrorBoundary

## Hierarchy

- _Component_<unknown, { `hasError`: _boolean_ }\>

  ↳ **DFErrorBoundary**

## Table of contents

### Constructors

- [constructor](frontend_views_dferrorboundary.dferrorboundary.md#constructor)

### Methods

- [componentDidCatch](frontend_views_dferrorboundary.dferrorboundary.md#componentdidcatch)
- [render](frontend_views_dferrorboundary.dferrorboundary.md#render)
- [getDerivedStateFromError](frontend_views_dferrorboundary.dferrorboundary.md#getderivedstatefromerror)

## Constructors

### constructor

\+ **new DFErrorBoundary**(`props`: _unknown_): [_DFErrorBoundary_](frontend_views_dferrorboundary.dferrorboundary.md)

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `props` | _unknown_ |

**Returns:** [_DFErrorBoundary_](frontend_views_dferrorboundary.dferrorboundary.md)

Overrides: React.Component&lt;unknown, { hasError: boolean }\&gt;.constructor

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
