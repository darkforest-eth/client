# Class: CaptureZoneGenerator

[Backend/GameLogic/CaptureZoneGenerator](../modules/Backend_GameLogic_CaptureZoneGenerator.md).CaptureZoneGenerator

Given a game start block and a zone change block interval, decide when to generate new Capture Zones.

## Table of contents

### Constructors

- [constructor](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md#constructor)

### Properties

- [capturablePlanets](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md#capturableplanets)
- [changeInterval](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md#changeinterval)
- [gameManager](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md#gamemanager)
- [generated$](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md#generated$)
- [lastChangeBlock](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md#lastchangeblock)
- [nextChangeBlock](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md#nextchangeblock)
- [zones](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md#zones)

### Accessors

- [gameObjects](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md#gameobjects)

### Methods

- [\_generate](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md#_generate)
- [generate](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md#generate)
- [getNextChangeBlock](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md#getnextchangeblock)
- [getZones](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md#getzones)
- [isInZone](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md#isinzone)
- [onNewChunk](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md#onnewchunk)
- [setNextGenerationBlock](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md#setnextgenerationblock)
- [updateCapturablePlanets](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md#updatecapturableplanets)

## Constructors

### constructor

• **new CaptureZoneGenerator**(`gameManager`, `gameStartBlock`, `changeInterval`)

#### Parameters

| Name             | Type                                                  |
| :--------------- | :---------------------------------------------------- |
| `gameManager`    | [`default`](Backend_GameLogic_GameManager.default.md) |
| `gameStartBlock` | `number`                                              |
| `changeInterval` | `number`                                              |

## Properties

### capturablePlanets

• `Private` **capturablePlanets**: `Set`<`LocationId`\>

---

### changeInterval

• `Private` **changeInterval**: `number`

---

### gameManager

• `Private` **gameManager**: [`default`](Backend_GameLogic_GameManager.default.md)

---

### generated$

• `Readonly` **generated$**: `Monomitter`<[`CaptureZonesGeneratedEvent`](../modules/Backend_GameLogic_CaptureZoneGenerator.md#capturezonesgeneratedevent)\>

---

### lastChangeBlock

• `Private` **lastChangeBlock**: `number`

---

### nextChangeBlock

• `Private` **nextChangeBlock**: `number`

---

### zones

• `Private` **zones**: `Set`<`CaptureZone`\>

## Accessors

### gameObjects

• `Private` `get` **gameObjects**(): [`GameObjects`](Backend_GameLogic_GameObjects.GameObjects.md)

#### Returns

[`GameObjects`](Backend_GameLogic_GameObjects.GameObjects.md)

## Methods

### \_generate

▸ `Private` **\_generate**(`blockNumber`): `Promise`<`Set`<`CaptureZone`\>\>

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `blockNumber` | `number` |

#### Returns

`Promise`<`Set`<`CaptureZone`\>\>

---

### generate

▸ **generate**(`blockNumber`): `Promise`<`void`\>

Call when a new block is received to check if generation is needed.

#### Parameters

| Name          | Type     | Description           |
| :------------ | :------- | :-------------------- |
| `blockNumber` | `number` | Current block number. |

#### Returns

`Promise`<`void`\>

---

### getNextChangeBlock

▸ **getNextChangeBlock**(): `number`

The next block that will trigger a Capture Zone generation.

#### Returns

`number`

---

### getZones

▸ **getZones**(): `Set`<`CaptureZone`\>

#### Returns

`Set`<`CaptureZone`\>

---

### isInZone

▸ **isInZone**(`locationId`): `boolean`

Is the given planet inside of a Capture Zone.

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `locationId` | `LocationId` |

#### Returns

`boolean`

---

### onNewChunk

▸ `Private` **onNewChunk**(`chunk`): `void`

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `chunk` | `Chunk` |

#### Returns

`void`

---

### setNextGenerationBlock

▸ `Private` **setNextGenerationBlock**(`blockNumber`): `void`

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `blockNumber` | `number` |

#### Returns

`void`

---

### updateCapturablePlanets

▸ `Private` **updateCapturablePlanets**(): `void`

#### Returns

`void`
