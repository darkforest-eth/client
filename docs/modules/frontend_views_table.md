# Module: Frontend/Views/Table

## Table of contents

### Functions

- [Table](frontend_views_table.md#table)

## Functions

### Table

▸ **Table**<T\>(`__namedParameters`: { `alignments?`: (`"r"` \| `"c"` \| `"l"`)[] ; `columns`: (`t`: T, `i`: _number_) => React.ReactNode[] ; `headerStyle?`: React.CSSProperties ; `headers`: React.ReactNode[] ; `rows`: T[] }): _Element_

React api for creating tables.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name                             | Type                                         | Description                                                                                                                                                |
| :------------------------------- | :------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters`              | _object_                                     | -                                                                                                                                                          |
| `__namedParameters.alignments?`  | (`"r"` \| `"c"` \| `"l"`)[]                  | optional, one per column, specifies that the text-alignment in that cell is either right, center, or left, represented by the characters 'r', 'c', and 'l' |
| `__namedParameters.columns`      | (`t`: T, `i`: _number_) => React.ReactNode[] | functions, one per column, that convert a row into the react representation of that row's column's value.                                                  |
| `__namedParameters.headerStyle?` | React.CSSProperties                          | -                                                                                                                                                          |
| `__namedParameters.headers`      | React.ReactNode[]                            | required (for now) array of strings that head each column                                                                                                  |
| `__namedParameters.rows`         | T[]                                          | rows of an arbitrary type                                                                                                                                  |

**Returns:** _Element_
