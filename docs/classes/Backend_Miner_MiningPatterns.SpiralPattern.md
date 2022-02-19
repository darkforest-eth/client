# Class: SpiralPattern

[Backend/Miner/MiningPatterns](../modules/Backend_Miner_MiningPatterns.md).SpiralPattern

## Implements

- [`MiningPattern`](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md)

## Table of contents

### Constructors

- [constructor](Backend_Miner_MiningPatterns.SpiralPattern.md#constructor)

### Properties

- [chunkSideLength](Backend_Miner_MiningPatterns.SpiralPattern.md#chunksidelength)
- [fromChunk](Backend_Miner_MiningPatterns.SpiralPattern.md#fromchunk)
- [type](Backend_Miner_MiningPatterns.SpiralPattern.md#type)

### Methods

- [nextChunk](Backend_Miner_MiningPatterns.SpiralPattern.md#nextchunk)

## Constructors

### constructor

• **new SpiralPattern**(`center`, `chunkSize`)

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

• **fromChunk**: `Rectangle`

#### Implementation of

[MiningPattern](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md).[fromChunk](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md#fromchunk)

---

### type

• **type**: [`MiningPatternType`](../enums/Backend_Miner_MiningPatterns.MiningPatternType.md) = `MiningPatternType.Spiral`

#### Implementation of

[MiningPattern](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md).[type](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md#type)

## Methods

### nextChunk

▸ **nextChunk**(`chunk`): `Rectangle`

#### Parameters

| Name    | Type        |
| :------ | :---------- |
| `chunk` | `Rectangle` |

#### Returns

`Rectangle`

#### Implementation of

[MiningPattern](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md).[nextChunk](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md#nextchunk)
