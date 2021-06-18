# Class: TxExecutor

[Backend/Network/TxExecutor](../modules/backend_network_txexecutor.md).TxExecutor

## Hierarchy

- _EventEmitter_

  ↳ **TxExecutor**

## Table of contents

### Constructors

- [constructor](backend_network_txexecutor.txexecutor.md#constructor)

### Properties

- [diagnosticsUpdater](backend_network_txexecutor.txexecutor.md#diagnosticsupdater)
- [eth](backend_network_txexecutor.txexecutor.md#eth)
- [lastTransaction](backend_network_txexecutor.txexecutor.md#lasttransaction)
- [nonce](backend_network_txexecutor.txexecutor.md#nonce)
- [txQueue](backend_network_txexecutor.txexecutor.md#txqueue)
- [MIN_BALANCE_ETH](backend_network_txexecutor.txexecutor.md#min_balance_eth)
- [NONCE_STALE_AFTER_MS](backend_network_txexecutor.txexecutor.md#nonce_stale_after_ms)
- [TX_SUBMIT_TIMEOUT](backend_network_txexecutor.txexecutor.md#tx_submit_timeout)

### Methods

- [checkBalance](backend_network_txexecutor.txexecutor.md#checkbalance)
- [execute](backend_network_txexecutor.txexecutor.md#execute)
- [makeRequest](backend_network_txexecutor.txexecutor.md#makerequest)
- [maybeUpdateNonce](backend_network_txexecutor.txexecutor.md#maybeupdatenonce)
- [setDiagnosticUpdater](backend_network_txexecutor.txexecutor.md#setdiagnosticupdater)

## Constructors

### constructor

\+ **new TxExecutor**(`ethConnection`: [_default_](backend_network_ethconnection.default.md), `nonce`: _number_): [_TxExecutor_](backend_network_txexecutor.txexecutor.md)

#### Parameters

| Name            | Type                                                  |
| :-------------- | :---------------------------------------------------- |
| `ethConnection` | [_default_](backend_network_ethconnection.default.md) |
| `nonce`         | _number_                                              |

**Returns:** [_TxExecutor_](backend_network_txexecutor.txexecutor.md)

Overrides: EventEmitter.constructor

## Properties

### diagnosticsUpdater

• `Private` `Optional` **diagnosticsUpdater**: [_DiagnosticUpdater_](../interfaces/backend_interfaces_diagnosticupdater.diagnosticupdater.md)

---

### eth

• `Private` **eth**: [_default_](backend_network_ethconnection.default.md)

---

### lastTransaction

• `Private` **lastTransaction**: _number_

---

### nonce

• `Private` **nonce**: _number_

---

### txQueue

• `Private` **txQueue**: [_ThrottledConcurrentQueue_](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md)

---

### MIN_BALANCE_ETH

▪ `Static` `Private` `Readonly` **MIN_BALANCE_ETH**: `0.002`= 0.002

don't allow users to submit txs if balance falls below

---

### NONCE_STALE_AFTER_MS

▪ `Static` `Private` `Readonly` **NONCE_STALE_AFTER_MS**: _number_

we refresh the nonce if it hasn't been updated in this amount of time

---

### TX_SUBMIT_TIMEOUT

▪ `Static` `Private` `Readonly` **TX_SUBMIT_TIMEOUT**: `30000`= 30000

tx is considered to have errored if haven't successfully
submitted to mempool within 30s

## Methods

### checkBalance

▸ `Private` **checkBalance**(): _Promise_<void\>

**Returns:** _Promise_<void\>

---

### execute

▸ `Private` **execute**(`txRequest`: [_QueuedTxRequest_](../interfaces/backend_network_txexecutor.queuedtxrequest.md)): _Promise_<void\>

#### Parameters

| Name        | Type                                                                             |
| :---------- | :------------------------------------------------------------------------------- |
| `txRequest` | [_QueuedTxRequest_](../interfaces/backend_network_txexecutor.queuedtxrequest.md) |

**Returns:** _Promise_<void\>

---

### makeRequest

▸ **makeRequest**<T, U\>(`type`: EthTxType, `actionId`: _string_, `contract`: _Contract_, `args`: _unknown_[], `overrides?`: TransactionRequest): [_PendingTransaction_](../interfaces/backend_network_txexecutor.pendingtransaction.md)

Schedules this transaction to execute once all of the transactions
ahead of it have completed.

#### Type parameters

| Name |
| :--- |
| `T`  |
| `U`  |

#### Parameters

| Name        | Type               |
| :---------- | :----------------- |
| `type`      | EthTxType          |
| `actionId`  | _string_           |
| `contract`  | _Contract_         |
| `args`      | _unknown_[]        |
| `overrides` | TransactionRequest |

**Returns:** [_PendingTransaction_](../interfaces/backend_network_txexecutor.pendingtransaction.md)

---

### maybeUpdateNonce

▸ `Private` **maybeUpdateNonce**(): _Promise_<void\>

**Returns:** _Promise_<void\>

---

### setDiagnosticUpdater

▸ **setDiagnosticUpdater**(`diagnosticUpdater?`: [_DiagnosticUpdater_](../interfaces/backend_interfaces_diagnosticupdater.diagnosticupdater.md)): _void_

#### Parameters

| Name                 | Type                                                                                           |
| :------------------- | :--------------------------------------------------------------------------------------------- |
| `diagnosticUpdater?` | [_DiagnosticUpdater_](../interfaces/backend_interfaces_diagnosticupdater.diagnosticupdater.md) |

**Returns:** _void_
