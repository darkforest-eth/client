# Module: Frontend/Game/Popups

## Table of contents

### Functions

- [openConfirmationWindowForTransaction](Frontend_Game_Popups.md#openconfirmationwindowfortransaction)

## Functions

### openConfirmationWindowForTransaction

▸ **openConfirmationWindowForTransaction**(`ethConnection`, `txRequest`, `from`, `gasFeeGwei`): `Promise`<`void`\>

#### Parameters

| Name            | Type                                                                             |
| :-------------- | :------------------------------------------------------------------------------- |
| `ethConnection` | [`default`](../classes/Backend_Network_EthConnection.default.md)                 |
| `txRequest`     | [`QueuedTxRequest`](../interfaces/Backend_Network_TxExecutor.QueuedTxRequest.md) |
| `from`          | `EthAddress`                                                                     |
| `gasFeeGwei`    | `number`                                                                         |

#### Returns

`Promise`<`void`\>
