# Class: Wrapper<T\>

[Backend/Utils/Wrapper](../modules/backend_utils_wrapper.md).Wrapper

React uses referential identity to detect changes, and rerender. Rather
than copying an object into a new object, to force a rerender, we can
just wrap it in a new {@code Wrapper}, which will force a rerender.

## Type parameters

| Name |
| :--- |
| `T`  |

## Table of contents

### Constructors

- [constructor](backend_utils_wrapper.wrapper.md#constructor)

### Properties

- [value](backend_utils_wrapper.wrapper.md#value)

## Constructors

### constructor

\+ **new Wrapper**<T\>(`value`: T): [_Wrapper_](backend_utils_wrapper.wrapper.md)<T\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type |
| :------ | :--- |
| `value` | T    |

**Returns:** [_Wrapper_](backend_utils_wrapper.wrapper.md)<T\>

## Properties

### value

• `Readonly` **value**: T
