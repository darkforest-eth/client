# Module: Backend/Miner/permutation

## Table of contents

### Functions

- [getPlanetLocations](Backend_Miner_permutation.md#getplanetlocations)

## Functions

### getPlanetLocations

▸ `Const` **getPlanetLocations**(`spaceTypeKey`, `biomebaseKey`, `perlinLengthScale`, `perlinMirrorX`, `perlinMirrorY`): (`chunkFootprint`: [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md), `planetRarity`: `number`) => `WorldLocation`[]

#### Parameters

| Name                | Type      |
| :------------------ | :-------- |
| `spaceTypeKey`      | `number`  |
| `biomebaseKey`      | `number`  |
| `perlinLengthScale` | `number`  |
| `perlinMirrorX`     | `boolean` |
| `perlinMirrorY`     | `boolean` |

#### Returns

`fn`

▸ (`chunkFootprint`, `planetRarity`): `WorldLocation`[]

##### Parameters

| Name             | Type                                                                |
| :--------------- | :------------------------------------------------------------------ |
| `chunkFootprint` | [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md) |
| `planetRarity`   | `number`                                                            |

##### Returns

`WorldLocation`[]
