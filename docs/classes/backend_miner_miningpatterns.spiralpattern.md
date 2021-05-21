# Class: SpiralPattern

[Backend/Miner/MiningPatterns](../modules/backend_miner_miningpatterns.md).SpiralPattern

## Implements

- [_MiningPattern_](../interfaces/backend_miner_miningpatterns.miningpattern.md)

## Table of contents

### Constructors

- [constructor](backend_miner_miningpatterns.spiralpattern.md#constructor)

### Properties

- [chunkSideLength](backend_miner_miningpatterns.spiralpattern.md#chunksidelength)
- [fromChunk](backend_miner_miningpatterns.spiralpattern.md#fromchunk)
- [type](backend_miner_miningpatterns.spiralpattern.md#type)

### Methods

- [nextChunk](backend_miner_miningpatterns.spiralpattern.md#nextchunk)

## Constructors

### constructor

\+ **new SpiralPattern**(`center`: WorldCoords, `chunkSize`: _number_): [_SpiralPattern_](backend_miner_miningpatterns.spiralpattern.md)

#### Parameters

| Name        | Type        |
| :---------- | :---------- |
| `center`    | WorldCoords |
| `chunkSize` | _number_    |

**Returns:** [_SpiralPattern_](backend_miner_miningpatterns.spiralpattern.md)

## Properties

### chunkSideLength

• **chunkSideLength**: _number_

---

### fromChunk

• **fromChunk**: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)

Implementation of: [MiningPattern](../interfaces/backend_miner_miningpatterns.miningpattern.md).[fromChunk](../interfaces/backend_miner_miningpatterns.miningpattern.md#fromchunk)

---

### type

• **type**: [_MiningPatternType_](../enums/backend_miner_miningpatterns.miningpatterntype.md)

Implementation of: [MiningPattern](../interfaces/backend_miner_miningpatterns.miningpattern.md).[type](../interfaces/backend_miner_miningpatterns.miningpattern.md#type)

## Methods

### nextChunk

▸ **nextChunk**(`chunk`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)): [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)

#### Parameters

| Name    | Type                                                                |
| :------ | :------------------------------------------------------------------ |
| `chunk` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |

**Returns:** [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)

Implementation of: MiningPattern.nextChunk
