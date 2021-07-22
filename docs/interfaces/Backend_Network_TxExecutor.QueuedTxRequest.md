# Interface: QueuedTxRequest

[Backend/Network/TxExecutor](../modules/Backend_Network_TxExecutor.md).QueuedTxRequest

## Table of contents

### Properties

- [actionId](Backend_Network_TxExecutor.QueuedTxRequest.md#actionid)
- [args](Backend_Network_TxExecutor.QueuedTxRequest.md#args)
- [contract](Backend_Network_TxExecutor.QueuedTxRequest.md#contract)
- [overrides](Backend_Network_TxExecutor.QueuedTxRequest.md#overrides)
- [type](Backend_Network_TxExecutor.QueuedTxRequest.md#type)

### Methods

- [onReceiptError](Backend_Network_TxExecutor.QueuedTxRequest.md#onreceipterror)
- [onSubmissionError](Backend_Network_TxExecutor.QueuedTxRequest.md#onsubmissionerror)
- [onTransactionReceipt](Backend_Network_TxExecutor.QueuedTxRequest.md#ontransactionreceipt)
- [onTransactionResponse](Backend_Network_TxExecutor.QueuedTxRequest.md#ontransactionresponse)

## Properties

### actionId

• **actionId**: `string`

---

### args

• **args**: `unknown`[]

---

### contract

• **contract**: `Contract`

---

### overrides

• **overrides**: `TransactionRequest`

---

### type

• **type**: `EthTxType`

## Methods

### onReceiptError

▸ **onReceiptError**(`e`): `void`

#### Parameters

| Name | Type    |
| :--- | :------ |
| `e`  | `Error` |

#### Returns

`void`

---

### onSubmissionError

▸ **onSubmissionError**(`e`): `void`

#### Parameters

| Name | Type    |
| :--- | :------ |
| `e`  | `Error` |

#### Returns

`void`

---

### onTransactionReceipt

▸ **onTransactionReceipt**(`e`): `void`

#### Parameters

| Name | Type                 |
| :--- | :------------------- |
| `e`  | `TransactionReceipt` |

#### Returns

`void`

---

### onTransactionResponse

▸ **onTransactionResponse**(`e`): `void`

#### Parameters

| Name | Type                  |
| :--- | :-------------------- |
| `e`  | `TransactionResponse` |

#### Returns

`void`
