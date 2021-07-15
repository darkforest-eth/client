# Interface: ShareProps<T\>

[Frontend/Views/Share](../modules/Frontend_Views_Share.md).ShareProps

## Type parameters

| Name |
| :--- |
| `T`  |

## Table of contents

### Methods

- [children](Frontend_Views_Share.ShareProps.md#children)
- [load](Frontend_Views_Share.ShareProps.md#load)

## Methods

### children

▸ **children**(`state`, `loading`, `error`): `ReactNode`

#### Parameters

| Name      | Type                   |
| :-------- | :--------------------- |
| `state`   | `undefined` \| `T`     |
| `loading` | `boolean`              |
| `error`   | `undefined` \| `Error` |

#### Returns

`ReactNode`

---

### load

▸ **load**(`store`): `Promise`<`T`\>

#### Parameters

| Name    | Type                                                               |
| :------ | :----------------------------------------------------------------- |
| `store` | [`default`](../classes/Backend_Storage_ReaderDataStore.default.md) |

#### Returns

`Promise`<`T`\>
