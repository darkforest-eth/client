# Interface: MiningPattern

[Backend/Miner/MiningPatterns](../modules/backend_miner_miningpatterns.md).MiningPattern

## Implemented by

- [_SpiralPattern_](../classes/backend_miner_miningpatterns.spiralpattern.md)
- [_SwissCheesePattern_](../classes/backend_miner_miningpatterns.swisscheesepattern.md)

## Table of contents

### Properties

- [fromChunk](backend_miner_miningpatterns.miningpattern.md#fromchunk)
- [nextChunk](backend_miner_miningpatterns.miningpattern.md#nextchunk)
- [type](backend_miner_miningpatterns.miningpattern.md#type)

## Properties

### fromChunk

• **fromChunk**: [_Rectangle_](_types_global_globaltypes.rectangle.md)

---

### nextChunk

• **nextChunk**: (`prevLoc`: [_Rectangle_](_types_global_globaltypes.rectangle.md)) => [_Rectangle_](_types_global_globaltypes.rectangle.md)

#### Type declaration

▸ (`prevLoc`: [_Rectangle_](_types_global_globaltypes.rectangle.md)): [_Rectangle_](_types_global_globaltypes.rectangle.md)

#### Parameters

| Name      | Type                                                  |
| :-------- | :---------------------------------------------------- |
| `prevLoc` | [_Rectangle_](_types_global_globaltypes.rectangle.md) |

**Returns:** [_Rectangle_](_types_global_globaltypes.rectangle.md)

---

### type

• **type**: [_MiningPatternType_](../enums/backend_miner_miningpatterns.miningpatterntype.md)
