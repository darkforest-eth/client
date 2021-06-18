# Class: ContractCaller

[Backend/GameLogic/ContractCaller](../modules/backend_gamelogic_contractcaller.md).ContractCaller

## Table of contents

### Constructors

- [constructor](backend_gamelogic_contractcaller.contractcaller.md#constructor)

### Properties

- [callQueue](backend_gamelogic_contractcaller.contractcaller.md#callqueue)
- [diagnosticsUpdater](backend_gamelogic_contractcaller.contractcaller.md#diagnosticsupdater)
- [MAX_RETRIES](backend_gamelogic_contractcaller.contractcaller.md#max_retries)

### Methods

- [makeCall](backend_gamelogic_contractcaller.contractcaller.md#makecall)
- [setDiagnosticUpdater](backend_gamelogic_contractcaller.contractcaller.md#setdiagnosticupdater)

## Constructors

### constructor

\+ **new ContractCaller**(): [_ContractCaller_](backend_gamelogic_contractcaller.contractcaller.md)

**Returns:** [_ContractCaller_](backend_gamelogic_contractcaller.contractcaller.md)

## Properties

### callQueue

• `Private` `Readonly` **callQueue**: [_ThrottledConcurrentQueue_](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md)

---

### diagnosticsUpdater

• `Private` `Optional` **diagnosticsUpdater**: [_DiagnosticUpdater_](../interfaces/backend_interfaces_diagnosticupdater.diagnosticupdater.md)

---

### MAX_RETRIES

▪ `Static` `Private` `Readonly` **MAX_RETRIES**: `12`= 12

## Methods

### makeCall

▸ **makeCall**<T\>(`contractViewFunction`: _ContractFunction_<T\>, `args?`: _unknown_[]): _Promise_<T\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name                   | Type                   | Default value |
| :--------------------- | :--------------------- | :------------ |
| `contractViewFunction` | _ContractFunction_<T\> | -             |
| `args`                 | _unknown_[]            | []            |

**Returns:** _Promise_<T\>

---

### setDiagnosticUpdater

▸ **setDiagnosticUpdater**(`diagnosticUpdater?`: [_DiagnosticUpdater_](../interfaces/backend_interfaces_diagnosticupdater.diagnosticupdater.md)): _void_

#### Parameters

| Name                 | Type                                                                                           |
| :------------------- | :--------------------------------------------------------------------------------------------- |
| `diagnosticUpdater?` | [_DiagnosticUpdater_](../interfaces/backend_interfaces_diagnosticupdater.diagnosticupdater.md) |

**Returns:** _void_
