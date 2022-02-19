# Module: \_types/global/GlobalTypes

## Table of contents

### Enumerations

- [StatIdx](../enums/types_global_GlobalTypes.StatIdx.md)

### Interfaces

- [ClaimCountdownInfo](../interfaces/types_global_GlobalTypes.ClaimCountdownInfo.md)
- [MinerWorkerMessage](../interfaces/types_global_GlobalTypes.MinerWorkerMessage.md)
- [RevealCountdownInfo](../interfaces/types_global_GlobalTypes.RevealCountdownInfo.md)

### Type aliases

- [HashConfig](types_global_GlobalTypes.md#hashconfig)
- [Hook](types_global_GlobalTypes.md#hook)

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
| `planetRarity`      | `number`  |
| `spaceTypeKey`      | `number`  |

---

### Hook

Ƭ **Hook**<`T`\>: [`T`, `Dispatch`<`SetStateAction`<`T`\>\>]

#### Type parameters

| Name |
| :--- |
| `T`  |
