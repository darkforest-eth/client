# Module: Backend/Miner/ChunkUtils

## Table of contents

### Functions

- [addToChunkMap](backend_miner_chunkutils.md#addtochunkmap)
- [getBucket](backend_miner_chunkutils.md#getbucket)
- [getChunkKey](backend_miner_chunkutils.md#getchunkkey)
- [getChunkOfSideLength](backend_miner_chunkutils.md#getchunkofsidelength)
- [getSiblingLocations](backend_miner_chunkutils.md#getsiblinglocations)
- [toExploredChunk](backend_miner_chunkutils.md#toexploredchunk)
- [toLSMChunk](backend_miner_chunkutils.md#tolsmchunk)

## Functions

### addToChunkMap

▸ `Const` **addToChunkMap**(`map`: _Map_<string, [_ExploredChunkData_](../classes/_types_global_globaltypes.exploredchunkdata.md)\>, `chunk`: [_ExploredChunkData_](../classes/_types_global_globaltypes.exploredchunkdata.md), `includePlanets?`: _boolean_, `onAdd?`: (`arg`: [_ExploredChunkData_](../classes/_types_global_globaltypes.exploredchunkdata.md)) => _void_, `onRemove?`: (`arg`: [_ExploredChunkData_](../classes/_types_global_globaltypes.exploredchunkdata.md)) => _void_, `maxChunkSize?`: _number_): _void_

#### Parameters

| Name             | Type                                                                                                | Default value |
| :--------------- | :-------------------------------------------------------------------------------------------------- | :------------ |
| `map`            | _Map_<string, [_ExploredChunkData_](../classes/_types_global_globaltypes.exploredchunkdata.md)\>    | -             |
| `chunk`          | [_ExploredChunkData_](../classes/_types_global_globaltypes.exploredchunkdata.md)                    | -             |
| `includePlanets` | _boolean_                                                                                           | true          |
| `onAdd?`         | (`arg`: [_ExploredChunkData_](../classes/_types_global_globaltypes.exploredchunkdata.md)) => _void_ | -             |
| `onRemove?`      | (`arg`: [_ExploredChunkData_](../classes/_types_global_globaltypes.exploredchunkdata.md)) => _void_ | -             |
| `maxChunkSize?`  | _number_                                                                                            | -             |

**Returns:** _void_

---

### getBucket

▸ `Const` **getBucket**(`chunk`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)): _string_

#### Parameters

| Name    | Type                                                                |
| :------ | :------------------------------------------------------------------ |
| `chunk` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |

**Returns:** _string_

---

### getChunkKey

▸ `Const` **getChunkKey**(`chunkLoc`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)): _string_

#### Parameters

| Name       | Type                                                                |
| :--------- | :------------------------------------------------------------------ |
| `chunkLoc` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |

**Returns:** _string_

---

### getChunkOfSideLength

▸ `Const` **getChunkOfSideLength**(`coords`: WorldCoords, `sideLength`: _number_): [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)

#### Parameters

| Name         | Type        |
| :----------- | :---------- |
| `coords`     | WorldCoords |
| `sideLength` | _number_    |

**Returns:** [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)

---

### getSiblingLocations

▸ `Const` **getSiblingLocations**(`chunkLoc`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)): [[_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md), [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md), [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)]

#### Parameters

| Name       | Type                                                                |
| :--------- | :------------------------------------------------------------------ |
| `chunkLoc` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |

**Returns:** [[_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md), [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md), [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)]

---

### toExploredChunk

▸ `Const` **toExploredChunk**(`chunk`: [_LSMChunkData_](../interfaces/_types_darkforest_api_chunkstoretypes.lsmchunkdata.md)): [_ExploredChunkData_](../classes/_types_global_globaltypes.exploredchunkdata.md)

#### Parameters

| Name    | Type                                                                                  |
| :------ | :------------------------------------------------------------------------------------ |
| `chunk` | [_LSMChunkData_](../interfaces/_types_darkforest_api_chunkstoretypes.lsmchunkdata.md) |

**Returns:** [_ExploredChunkData_](../classes/_types_global_globaltypes.exploredchunkdata.md)

---

### toLSMChunk

▸ `Const` **toLSMChunk**(`chunk`: [_ExploredChunkData_](../classes/_types_global_globaltypes.exploredchunkdata.md)): [_LSMChunkData_](../interfaces/_types_darkforest_api_chunkstoretypes.lsmchunkdata.md)

#### Parameters

| Name    | Type                                                                             |
| :------ | :------------------------------------------------------------------------------- |
| `chunk` | [_ExploredChunkData_](../classes/_types_global_globaltypes.exploredchunkdata.md) |

**Returns:** [_LSMChunkData_](../interfaces/_types_darkforest_api_chunkstoretypes.lsmchunkdata.md)
