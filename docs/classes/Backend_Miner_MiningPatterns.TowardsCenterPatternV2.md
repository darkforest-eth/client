# Class: TowardsCenterPatternV2

[Backend/Miner/MiningPatterns](../modules/Backend_Miner_MiningPatterns.md).TowardsCenterPatternV2

## Implements

- [`MiningPattern`](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md)

## Table of contents

### Constructors

- [constructor](Backend_Miner_MiningPatterns.TowardsCenterPatternV2.md#constructor)

### Properties

- [chunkSideLength](Backend_Miner_MiningPatterns.TowardsCenterPatternV2.md#chunksidelength)
- [fromChunk](Backend_Miner_MiningPatterns.TowardsCenterPatternV2.md#fromchunk)
- [rowRadius](Backend_Miner_MiningPatterns.TowardsCenterPatternV2.md#rowradius)
- [slopeToCenter](Backend_Miner_MiningPatterns.TowardsCenterPatternV2.md#slopetocenter)
- [type](Backend_Miner_MiningPatterns.TowardsCenterPatternV2.md#type)
- [yDominant](Backend_Miner_MiningPatterns.TowardsCenterPatternV2.md#ydominant)

### Methods

- [nextChunk](Backend_Miner_MiningPatterns.TowardsCenterPatternV2.md#nextchunk)
- [toChunk](Backend_Miner_MiningPatterns.TowardsCenterPatternV2.md#tochunk)

## Constructors

### constructor

• **new TowardsCenterPatternV2**(`center`, `chunkSize`)

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

### rowRadius

• `Private` **rowRadius**: `number`

---

### slopeToCenter

• `Private` **slopeToCenter**: `number`

---

### type

• **type**: [`MiningPatternType`](../enums/Backend_Miner_MiningPatterns.MiningPatternType.md) = `MiningPatternType.TowardsCenterV2`

#### Implementation of

[MiningPattern](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md).[type](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md#type)

---

### yDominant

• `Private` **yDominant**: `boolean`

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

---

### toChunk

▸ **toChunk**(`coord`): `number`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `coord` | `number` |

#### Returns

`number`
