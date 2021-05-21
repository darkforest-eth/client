# Module: Frontend/Views/Share

## Table of contents

### Interfaces

- [ShareProps](../interfaces/frontend_views_share.shareprops.md)

### Functions

- [Share](frontend_views_share.md#share)

## Functions

### Share

▸ **Share**<T\>(`props`: [_ShareProps_](../interfaces/frontend_views_share.shareprops.md)<T\>): _Element_

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

| Name    | Type                                                                 |
| :------ | :------------------------------------------------------------------- |
| `props` | [_ShareProps_](../interfaces/frontend_views_share.shareprops.md)<T\> |

**Returns:** _Element_
