# Module: Frontend/Views/Share

## Table of contents

### Interfaces

- [ShareProps](../interfaces/Frontend_Views_Share.ShareProps.md)

### Functions

- [Share](Frontend_Views_Share.md#share)

## Functions

### Share

▸ **Share**<`T`\>(`props`): `Element`

Helper component that allows you to load data from the contract, as if it was
viewed from a particular account. Allows you to switch accounts. Just pass in:

1. a function that loads the data you want, given a [[ReaderDataStore]]
2. a function that renders the given data with React

... and this component will take care of loading what you want.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name    | Type                                                                   |
| :------ | :--------------------------------------------------------------------- |
| `props` | [`ShareProps`](../interfaces/Frontend_Views_Share.ShareProps.md)<`T`\> |

#### Returns

`Element`
