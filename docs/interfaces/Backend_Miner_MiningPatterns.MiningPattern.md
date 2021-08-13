# Interface: MiningPattern

[Backend/Miner/MiningPatterns](../modules/Backend_Miner_MiningPatterns.md).MiningPattern

## Implemented by

- [`SpiralPattern`](../classes/Backend_Miner_MiningPatterns.SpiralPattern.md)
- [`SwissCheesePattern`](../classes/Backend_Miner_MiningPatterns.SwissCheesePattern.md)
- [`TowardsCenterPattern`](../classes/Backend_Miner_MiningPatterns.TowardsCenterPattern.md)

## Table of contents

### Properties

- [fromChunk](Backend_Miner_MiningPatterns.MiningPattern.md#fromchunk)
- [type](Backend_Miner_MiningPatterns.MiningPattern.md#type)

### Methods

- [nextChunk](Backend_Miner_MiningPatterns.MiningPattern.md#nextchunk)

## Properties

### fromChunk

• **fromChunk**: [`Rectangle`](_types_global_GlobalTypes.Rectangle.md)

---

### type

• **type**: [`MiningPatternType`](../enums/Backend_Miner_MiningPatterns.MiningPatternType.md)

## Methods

### nextChunk

▸ **nextChunk**(`prevLoc`): [`Rectangle`](_types_global_GlobalTypes.Rectangle.md)

#### Parameters

| Name      | Type                                                  |
| :-------- | :---------------------------------------------------- |
| `prevLoc` | [`Rectangle`](_types_global_GlobalTypes.Rectangle.md) |

#### Returns

[`Rectangle`](_types_global_GlobalTypes.Rectangle.md)
