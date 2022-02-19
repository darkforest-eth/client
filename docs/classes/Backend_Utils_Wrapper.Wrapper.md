# Class: Wrapper<T\>

[Backend/Utils/Wrapper](../modules/Backend_Utils_Wrapper.md).Wrapper

React uses referential identity to detect changes, and rerender. Rather
than copying an object into a new object, to force a rerender, we can
just wrap it in a new {@code Wrapper}, which will force a rerender.

## Type parameters

| Name |
| :--- |
| `T`  |

## Table of contents

### Constructors

- [constructor](Backend_Utils_Wrapper.Wrapper.md#constructor)

### Properties

- [value](Backend_Utils_Wrapper.Wrapper.md#value)

## Constructors

### constructor

• **new Wrapper**<`T`\>(`value`)

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type |
| :------ | :--- |
| `value` | `T`  |

## Properties

### value

• `Readonly` **value**: `T`
