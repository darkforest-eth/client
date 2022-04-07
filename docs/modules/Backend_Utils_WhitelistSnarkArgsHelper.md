# Module: Backend/Utils/WhitelistSnarkArgsHelper

## Table of contents

### Functions

- [getWhitelistArgs](Backend_Utils_WhitelistSnarkArgsHelper.md#getwhitelistargs)

## Functions

### getWhitelistArgs

▸ **getWhitelistArgs**(`key`, `recipient`, `terminal?`): `Promise`<`WhitelistSnarkContractCallArgs`\>

Helper method for generating whitelist SNARKS.
This is separate from the existing {@link SnarkArgsHelper}
because whitelist txs require far less setup compared
to SNARKS that are sent in context of the game.

#### Parameters

| Name        | Type                                                                                                            |
| :---------- | :-------------------------------------------------------------------------------------------------------------- |
| `key`       | `BigInteger`                                                                                                    |
| `recipient` | `EthAddress`                                                                                                    |
| `terminal?` | `MutableRefObject`<`undefined` \| [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md)\> |

#### Returns

`Promise`<`WhitelistSnarkContractCallArgs`\>
