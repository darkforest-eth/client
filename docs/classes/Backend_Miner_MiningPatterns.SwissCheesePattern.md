# Class: SwissCheesePattern

[Backend/Miner/MiningPatterns](../modules/Backend_Miner_MiningPatterns.md).SwissCheesePattern

## Implements

- [`MiningPattern`](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md)

## Table of contents

### Constructors

- [constructor](Backend_Miner_MiningPatterns.SwissCheesePattern.md#constructor)

### Properties

- [chunkSideLength](Backend_Miner_MiningPatterns.SwissCheesePattern.md#chunksidelength)
- [fromChunk](Backend_Miner_MiningPatterns.SwissCheesePattern.md#fromchunk)
- [type](Backend_Miner_MiningPatterns.SwissCheesePattern.md#type)

### Methods

- [nextChunk](Backend_Miner_MiningPatterns.SwissCheesePattern.md#nextchunk)

## Constructors

### constructor

• **new SwissCheesePattern**(`center`, `chunkSize`)

#### Parameters

| Name        | Type          |
| :---------- | :------------ |
| `center`    | `WorldCoords` |
| `chunkSize` | `number`      |

## Properties

### chunkSideLength

• **chunkSideLength**: `number`

---

### fromChunk

• **fromChunk**: [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md)

#### Implementation of

[MiningPattern](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md).[fromChunk](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md#fromchunk)

---

### type

• **type**: [`MiningPatternType`](../enums/Backend_Miner_MiningPatterns.MiningPatternType.md)

#### Implementation of

[MiningPattern](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md).[type](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md#type)

## Methods

### nextChunk

▸ **nextChunk**(`chunk`): [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md)

#### Parameters

| Name    | Type                                                                |
| :------ | :------------------------------------------------------------------ |
| `chunk` | [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md) |

#### Returns

[`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md)

#### Implementation of

[MiningPattern](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md).[nextChunk](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md#nextchunk)
