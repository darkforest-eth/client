# Module: Frontend/Views/SortableTable

## Table of contents

### Functions

- [SortableTable](frontend_views_sortabletable.md#sortabletable)

## Functions

### SortableTable

▸ **SortableTable**<T\>(`__namedParameters`: { `alignments?`: (`"r"` \| `"c"` \| `"l"`)[] ; `columns`: (`t`: T, `i`: _number_) => React.ReactNode[] ; `headers`: React.ReactNode[] ; `rows`: T[] ; `sortFunctions`: (`left`: T, `right`: T) => _number_[] }): _Element_

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name                              | Type                                         |
| :-------------------------------- | :------------------------------------------- |
| `__namedParameters`               | _object_                                     |
| `__namedParameters.alignments?`   | (`"r"` \| `"c"` \| `"l"`)[]                  |
| `__namedParameters.columns`       | (`t`: T, `i`: _number_) => React.ReactNode[] |
| `__namedParameters.headers`       | React.ReactNode[]                            |
| `__namedParameters.rows`          | T[]                                          |
| `__namedParameters.sortFunctions` | (`left`: T, `right`: T) => _number_[]        |

**Returns:** _Element_
