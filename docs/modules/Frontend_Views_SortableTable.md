# Module: Frontend/Views/SortableTable

## Table of contents

### Functions

- [SortableTable](Frontend_Views_SortableTable.md#sortabletable)

## Functions

### SortableTable

▸ **SortableTable**<`T`\>(`__namedParameters`): `Element`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name                              | Type                                             |
| :-------------------------------- | :----------------------------------------------- |
| `__namedParameters`               | `Object`                                         |
| `__namedParameters.alignments?`   | (`"r"` \| `"c"` \| `"l"`)[]                      |
| `__namedParameters.columns`       | (`t`: `T`, `i`: `number`) => `React.ReactNode`[] |
| `__namedParameters.headers`       | `React.ReactNode`[]                              |
| `__namedParameters.rows`          | `T`[]                                            |
| `__namedParameters.sortFunctions` | (`left`: `T`, `right`: `T`) => `number`[]        |

#### Returns

`Element`
