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

| Name                             | Type                                       |
| :------------------------------- | :----------------------------------------- |
| `__namedParameters`              | `Object`                                   |
| `__namedParameters.alignments?`  | (`"r"` \| `"l"` \| `"c"`)[]                |
| `__namedParameters.columns`      | (`t`: `T`, `i`: `number`) => `ReactNode`[] |
| `__namedParameters.headerStyle?` | `CSSProperties`                            |
| `__namedParameters.headers`      | `ReactNode`[]                              |
| `__namedParameters.paginated?`   | `boolean`                                  |
| `__namedParameters.rows`         | `T`[]                                      |

#### Returns

`Element`
