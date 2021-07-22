# Class: TxExecutor

[Backend/Network/TxExecutor](../modules/Backend_Network_TxExecutor.md).TxExecutor

## Hierarchy

- `EventEmitter`

  ↳ **`TxExecutor`**

## Table of contents

### Constructors

- [constructor](Backend_Network_TxExecutor.TxExecutor.md#constructor)

### Properties

- [diagnosticsUpdater](Backend_Network_TxExecutor.TxExecutor.md#diagnosticsupdater)
- [eth](Backend_Network_TxExecutor.TxExecutor.md#eth)
- [lastTransaction](Backend_Network_TxExecutor.TxExecutor.md#lasttransaction)
- [nonce](Backend_Network_TxExecutor.TxExecutor.md#nonce)
- [txQueue](Backend_Network_TxExecutor.TxExecutor.md#txqueue)
- [MIN_BALANCE_ETH](Backend_Network_TxExecutor.TxExecutor.md#min_balance_eth)
- [NONCE_STALE_AFTER_MS](Backend_Network_TxExecutor.TxExecutor.md#nonce_stale_after_ms)
- [TX_SUBMIT_TIMEOUT](Backend_Network_TxExecutor.TxExecutor.md#tx_submit_timeout)

### Methods

- [checkBalance](Backend_Network_TxExecutor.TxExecutor.md#checkbalance)
- [execute](Backend_Network_TxExecutor.TxExecutor.md#execute)
- [makeRequest](Backend_Network_TxExecutor.TxExecutor.md#makerequest)
- [maybeUpdateNonce](Backend_Network_TxExecutor.TxExecutor.md#maybeupdatenonce)
- [setDiagnosticUpdater](Backend_Network_TxExecutor.TxExecutor.md#setdiagnosticupdater)

## Constructors

### constructor

• **new TxExecutor**(`ethConnection`, `nonce`)

#### Parameters

| Name            | Type                                                  |
| :-------------- | :---------------------------------------------------- |
| `ethConnection` | [`default`](Backend_Network_EthConnection.default.md) |
| `nonce`         | `number`                                              |

#### Overrides

EventEmitter.constructor

## Properties

### diagnosticsUpdater

• `Private` `Optional` **diagnosticsUpdater**: [`DiagnosticUpdater`](../interfaces/Backend_Interfaces_DiagnosticUpdater.DiagnosticUpdater.md)

---

### eth

• `Private` **eth**: [`default`](Backend_Network_EthConnection.default.md)

---

### lastTransaction

• `Private` **lastTransaction**: `number`

---

### nonce

• `Private` **nonce**: `number`

---

### txQueue

• `Private` **txQueue**: [`ThrottledConcurrentQueue`](Backend_Network_ThrottledConcurrentQueue.ThrottledConcurrentQueue.md)

---

### MIN_BALANCE_ETH

▪ `Static` `Private` `Readonly` **MIN_BALANCE_ETH**: `0.002`

don't allow users to submit txs if balance falls below

---

### NONCE_STALE_AFTER_MS

▪ `Static` `Private` `Readonly` **NONCE_STALE_AFTER_MS**: `number`

we refresh the nonce if it hasn't been updated in this amount of time

---

### TX_SUBMIT_TIMEOUT

▪ `Static` `Private` `Readonly` **TX_SUBMIT_TIMEOUT**: `30000`

tx is considered to have errored if haven't successfully
submitted to mempool within 30s

## Methods

### checkBalance

▸ `Private` **checkBalance**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

---

### execute

▸ `Private` **execute**(`txRequest`): `Promise`<`void`\>

#### Parameters

| Name        | Type                                                                             |
| :---------- | :------------------------------------------------------------------------------- |
| `txRequest` | [`QueuedTxRequest`](../interfaces/Backend_Network_TxExecutor.QueuedTxRequest.md) |

#### Returns

`Promise`<`void`\>

---

### makeRequest

▸ **makeRequest**(`type`, `actionId`, `contract`, `args`, `overrides?`): [`PendingTransaction`](../interfaces/Backend_Network_TxExecutor.PendingTransaction.md)

Schedules this transaction to execute once all of the transactions
ahead of it have completed.

#### Parameters

| Name        | Type                 |
| :---------- | :------------------- |
| `type`      | `EthTxType`          |
| `actionId`  | `string`             |
| `contract`  | `Contract`           |
| `args`      | `unknown`[]          |
| `overrides` | `TransactionRequest` |

#### Returns

[`PendingTransaction`](../interfaces/Backend_Network_TxExecutor.PendingTransaction.md)

---

### maybeUpdateNonce

▸ `Private` **maybeUpdateNonce**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

---

### setDiagnosticUpdater

▸ **setDiagnosticUpdater**(`diagnosticUpdater?`): `void`

#### Parameters

| Name                 | Type                                                                                           |
| :------------------- | :--------------------------------------------------------------------------------------------- |
| `diagnosticUpdater?` | [`DiagnosticUpdater`](../interfaces/Backend_Interfaces_DiagnosticUpdater.DiagnosticUpdater.md) |

#### Returns

`void`
