# Class: TowardsCenterPattern

[Backend/Miner/MiningPatterns](../modules/Backend_Miner_MiningPatterns.md).TowardsCenterPattern

## Implements

- [`MiningPattern`](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md)

## Table of contents

### Constructors

- [constructor](Backend_Miner_MiningPatterns.TowardsCenterPattern.md#constructor)

### Properties

- [chunkSideLength](Backend_Miner_MiningPatterns.TowardsCenterPattern.md#chunksidelength)
- [fromChunk](Backend_Miner_MiningPatterns.TowardsCenterPattern.md#fromchunk)
- [maxWidth](Backend_Miner_MiningPatterns.TowardsCenterPattern.md#maxwidth)
- [tipX](Backend_Miner_MiningPatterns.TowardsCenterPattern.md#tipx)
- [tipY](Backend_Miner_MiningPatterns.TowardsCenterPattern.md#tipy)
- [type](Backend_Miner_MiningPatterns.TowardsCenterPattern.md#type)

### Methods

- [nextChunk](Backend_Miner_MiningPatterns.TowardsCenterPattern.md#nextchunk)

## Constructors

### constructor

• **new TowardsCenterPattern**(`center`, `chunkSize`)

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

### maxWidth

• `Private` **maxWidth**: `number` = `1600`

---

### tipX

• `Private` **tipX**: `number`

---

### tipY

• `Private` **tipY**: `number`

---

### type

• **type**: [`MiningPatternType`](../enums/Backend_Miner_MiningPatterns.MiningPatternType.md) = `MiningPatternType.TowardsCenter`

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
