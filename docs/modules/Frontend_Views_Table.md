# Module: Frontend/Views/Table

## Table of contents

### Functions

- [Table](Frontend_Views_Table.md#table)

## Functions

### Table

▸ **Table**<`T`\>(`__namedParameters`): `Element`

React api for creating tables.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name                             | Type                                             | Description                                                                                                                                                |
| :------------------------------- | :----------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters`              | `Object`                                         | -                                                                                                                                                          |
| `__namedParameters.alignments?`  | (`"r"` \| `"c"` \| `"l"`)[]                      | optional, one per column, specifies that the text-alignment in that cell is either right, center, or left, represented by the characters 'r', 'c', and 'l' |
| `__namedParameters.columns`      | (`t`: `T`, `i`: `number`) => `React.ReactNode`[] | functions, one per column, that convert a row into the react representation of that row's column's value.                                                  |
| `__namedParameters.headerStyle?` | `React.CSSProperties`                            | -                                                                                                                                                          |
| `__namedParameters.headers`      | `React.ReactNode`[]                              | required (for now) array of strings that head each column                                                                                                  |
| `__namedParameters.rows`         | `T`[]                                            | rows of an arbitrary type                                                                                                                                  |

#### Returns

`Element`
