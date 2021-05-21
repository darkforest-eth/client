# Interface: ShareProps<T\>

[Frontend/Views/Share](../modules/frontend_views_share.md).ShareProps

## Type parameters

| Name |
| :--- |
| `T`  |

## Table of contents

### Properties

- [children](frontend_views_share.shareprops.md#children)
- [load](frontend_views_share.shareprops.md#load)

## Properties

### children

• **children**: (`state`: _undefined_ \| T, `loading`: _boolean_, `error`: _undefined_ \| Error) => ReactNode

#### Type declaration

▸ (`state`: _undefined_ \| T, `loading`: _boolean_, `error`: _undefined_ \| Error): ReactNode

#### Parameters

| Name      | Type                 |
| :-------- | :------------------- |
| `state`   | _undefined_ \| T     |
| `loading` | _boolean_            |
| `error`   | _undefined_ \| Error |

**Returns:** ReactNode

---

### load

• **load**: (`store`: [_default_](../classes/backend_storage_readerdatastore.default.md)) => _Promise_<T\>

#### Type declaration

▸ (`store`: [_default_](../classes/backend_storage_readerdatastore.default.md)): _Promise_<T\>

#### Parameters

| Name    | Type                                                               |
| :------ | :----------------------------------------------------------------- |
| `store` | [_default_](../classes/backend_storage_readerdatastore.default.md) |

**Returns:** _Promise_<T\>
