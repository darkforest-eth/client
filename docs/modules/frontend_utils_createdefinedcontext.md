# Module: Frontend/Utils/createDefinedContext

## Table of contents

### Functions

- [createDefinedContext](frontend_utils_createdefinedcontext.md#createdefinedcontext)

## Functions

### createDefinedContext

▸ **createDefinedContext**<T\>(): _ContextHookWithProvider_<T\>

Return a hook and a provider which return a value that must be defined. Normally is difficult
because `React.createContext()` defaults to `undefined`.

`useDefinedContext()` must be called inside of `provider`, otherwise an error will be thrown.

#### Type parameters

| Name |
| :--- |
| `T`  |

**Returns:** _ContextHookWithProvider_<T\>
