# Interface: QueuedTxRequest

[Backend/Network/TxExecutor](../modules/backend_network_txexecutor.md).QueuedTxRequest

## Table of contents

### Properties

- [actionId](backend_network_txexecutor.queuedtxrequest.md#actionid)
- [args](backend_network_txexecutor.queuedtxrequest.md#args)
- [contract](backend_network_txexecutor.queuedtxrequest.md#contract)
- [onReceiptError](backend_network_txexecutor.queuedtxrequest.md#onreceipterror)
- [onSubmissionError](backend_network_txexecutor.queuedtxrequest.md#onsubmissionerror)
- [onTransactionReceipt](backend_network_txexecutor.queuedtxrequest.md#ontransactionreceipt)
- [onTransactionResponse](backend_network_txexecutor.queuedtxrequest.md#ontransactionresponse)
- [overrides](backend_network_txexecutor.queuedtxrequest.md#overrides)
- [type](backend_network_txexecutor.queuedtxrequest.md#type)

## Properties

### actionId

• **actionId**: _string_

---

### args

• **args**: _unknown_[]

---

### contract

• **contract**: _Contract_

---

### onReceiptError

• **onReceiptError**: (`e`: Error) => _void_

#### Type declaration

▸ (`e`: Error): _void_

#### Parameters

| Name | Type  |
| :--- | :---- |
| `e`  | Error |

**Returns:** _void_

---

### onSubmissionError

• **onSubmissionError**: (`e`: Error) => _void_

#### Type declaration

▸ (`e`: Error): _void_

#### Parameters

| Name | Type  |
| :--- | :---- |
| `e`  | Error |

**Returns:** _void_

---

### onTransactionReceipt

• **onTransactionReceipt**: (`e`: TransactionReceipt) => _void_

#### Type declaration

▸ (`e`: TransactionReceipt): _void_

#### Parameters

| Name | Type               |
| :--- | :----------------- |
| `e`  | TransactionReceipt |

**Returns:** _void_

---

### onTransactionResponse

• **onTransactionResponse**: (`e`: TransactionResponse) => _void_

#### Type declaration

▸ (`e`: TransactionResponse): _void_

#### Parameters

| Name | Type                |
| :--- | :------------------ |
| `e`  | TransactionResponse |

**Returns:** _void_

---

### overrides

• **overrides**: TransactionRequest

---

### type

• **type**: EthTxType
