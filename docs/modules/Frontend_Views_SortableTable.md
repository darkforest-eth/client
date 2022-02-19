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

| Name                              | Type                                       |
| :-------------------------------- | :----------------------------------------- |
| `__namedParameters`               | `Object`                                   |
| `__namedParameters.alignments?`   | (`"r"` \| `"l"` \| `"c"`)[]                |
| `__namedParameters.columns`       | (`t`: `T`, `i`: `number`) => `ReactNode`[] |
| `__namedParameters.headers`       | `ReactNode`[]                              |
| `__namedParameters.paginated?`    | `boolean`                                  |
| `__namedParameters.rows`          | `T`[]                                      |
| `__namedParameters.sortFunctions` | (`left`: `T`, `right`: `T`) => `number`[]  |

#### Returns

`Element`
