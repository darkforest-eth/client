# Module: \_types/global/GlobalTypes

## Table of contents

### Enumerations

- [StatIdx](../enums/_types_global_globaltypes.statidx.md)

### Classes

- [Chunk](../classes/_types_global_globaltypes.chunk.md)

### Interfaces

- [MinerWorkerMessage](../interfaces/_types_global_globaltypes.minerworkermessage.md)
- [Rectangle](../interfaces/_types_global_globaltypes.rectangle.md)
- [RevealCountdownInfo](../interfaces/_types_global_globaltypes.revealcountdowninfo.md)

### Type aliases

- [HashConfig](_types_global_globaltypes.md#hashconfig)
- [Hook](_types_global_globaltypes.md#hook)
- [Wormhole](_types_global_globaltypes.md#wormhole)

### Functions

- [isEmojiFlagMessage](_types_global_globaltypes.md#isemojiflagmessage)
- [isLocatable](_types_global_globaltypes.md#islocatable)

## Type aliases

### HashConfig

Ƭ **HashConfig**: _object_

#### Type declaration

| Name                | Type      |
| :------------------ | :-------- |
| `biomebaseKey`      | _number_  |
| `perlinLengthScale` | _number_  |
| `perlinMirrorX`     | _boolean_ |
| `perlinMirrorY`     | _boolean_ |
| `planetHashKey`     | _number_  |
| `spaceTypeKey`      | _number_  |

---

### Hook

Ƭ **Hook**<T\>: [T, *Dispatch*<SetStateAction<T\>\>]

#### Type parameters

| Name |
| :--- |
| `T`  |

---

### Wormhole

Ƭ **Wormhole**: _object_

#### Type declaration

| Name   | Type       |
| :----- | :--------- |
| `from` | LocationId |
| `to`   | LocationId |

## Functions

### isEmojiFlagMessage

▸ **isEmojiFlagMessage**(`planetMessage`: _PlanetMessage_<unknown\>): planetMessage is PlanetMessage<EmojiFlagBody\>

#### Parameters

| Name            | Type                      |
| :-------------- | :------------------------ |
| `planetMessage` | _PlanetMessage_<unknown\> |

**Returns:** planetMessage is PlanetMessage<EmojiFlagBody\>

---

### isLocatable

▸ **isLocatable**(`planet`: Planet): planet is LocatablePlanet

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** planet is LocatablePlanet
