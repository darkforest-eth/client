# Class: ContractCaller

[Backend/GameLogic/ContractCaller](../modules/Backend_GameLogic_ContractCaller.md).ContractCaller

## Table of contents

### Constructors

- [constructor](Backend_GameLogic_ContractCaller.ContractCaller.md#constructor)

### Properties

- [callQueue](Backend_GameLogic_ContractCaller.ContractCaller.md#callqueue)
- [diagnosticsUpdater](Backend_GameLogic_ContractCaller.ContractCaller.md#diagnosticsupdater)
- [MAX_RETRIES](Backend_GameLogic_ContractCaller.ContractCaller.md#max_retries)

### Methods

- [makeCall](Backend_GameLogic_ContractCaller.ContractCaller.md#makecall)
- [setDiagnosticUpdater](Backend_GameLogic_ContractCaller.ContractCaller.md#setdiagnosticupdater)

## Constructors

### constructor

• **new ContractCaller**()

## Properties

### callQueue

• `Private` `Readonly` **callQueue**: [`ThrottledConcurrentQueue`](Backend_Network_ThrottledConcurrentQueue.ThrottledConcurrentQueue.md)

---

### diagnosticsUpdater

• `Private` `Optional` **diagnosticsUpdater**: [`DiagnosticUpdater`](../interfaces/Backend_Interfaces_DiagnosticUpdater.DiagnosticUpdater.md)

---

### MAX_RETRIES

▪ `Static` `Private` `Readonly` **MAX_RETRIES**: `12`

## Methods

### makeCall

▸ **makeCall**<`T`\>(`contractViewFunction`, `args?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name                   | Type                     | Default value |
| :--------------------- | :----------------------- | :------------ |
| `contractViewFunction` | `ContractFunction`<`T`\> | `undefined`   |
| `args`                 | `unknown`[]              | `[]`          |

#### Returns

`Promise`<`T`\>

---

### setDiagnosticUpdater

▸ **setDiagnosticUpdater**(`diagnosticUpdater?`): `void`

#### Parameters

| Name                 | Type                                                                                           |
| :------------------- | :--------------------------------------------------------------------------------------------- |
| `diagnosticUpdater?` | [`DiagnosticUpdater`](../interfaces/Backend_Interfaces_DiagnosticUpdater.DiagnosticUpdater.md) |

#### Returns

`void`
