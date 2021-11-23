# Module: \_types/global/GlobalTypes

## Table of contents

### Enumerations

- [StatIdx](../enums/types_global_GlobalTypes.StatIdx.md)

### Classes

- [Chunk](../classes/types_global_GlobalTypes.Chunk.md)

### Interfaces

- [ClaimCountdownInfo](../interfaces/types_global_GlobalTypes.ClaimCountdownInfo.md)
- [MinerWorkerMessage](../interfaces/types_global_GlobalTypes.MinerWorkerMessage.md)
- [Rectangle](../interfaces/types_global_GlobalTypes.Rectangle.md)
- [RevealCountdownInfo](../interfaces/types_global_GlobalTypes.RevealCountdownInfo.md)

### Type aliases

- [HashConfig](types_global_GlobalTypes.md#hashconfig)
- [Hook](types_global_GlobalTypes.md#hook)
- [Wormhole](types_global_GlobalTypes.md#wormhole)

### Functions

- [isEmojiFlagMessage](types_global_GlobalTypes.md#isemojiflagmessage)
- [isLocatable](types_global_GlobalTypes.md#islocatable)

## Type aliases

### HashConfig

Ƭ **HashConfig**: `Object`

#### Type declaration

| Name                | Type      |
| :------------------ | :-------- |
| `biomebaseKey`      | `number`  |
| `perlinLengthScale` | `number`  |
| `perlinMirrorX`     | `boolean` |
| `perlinMirrorY`     | `boolean` |
| `planetHashKey`     | `number`  |
| `spaceTypeKey`      | `number`  |

---

### Hook

Ƭ **Hook**<`T`\>: [`T`, `Dispatch`<`SetStateAction`<`T`\>\>]

#### Type parameters

| Name |
| :--- |
| `T`  |

---

### Wormhole

Ƭ **Wormhole**: `Object`

#### Type declaration

| Name   | Type         |
| :----- | :----------- |
| `from` | `LocationId` |
| `to`   | `LocationId` |

## Functions

### isEmojiFlagMessage

▸ **isEmojiFlagMessage**(`planetMessage`): planetMessage is PlanetMessage<EmojiFlagBody\>

#### Parameters

| Name            | Type                        |
| :-------------- | :-------------------------- |
| `planetMessage` | `PlanetMessage`<`unknown`\> |

#### Returns

planetMessage is PlanetMessage<EmojiFlagBody\>

---

### isLocatable

▸ **isLocatable**(`planet`): planet is LocatablePlanet

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

planet is LocatablePlanet
