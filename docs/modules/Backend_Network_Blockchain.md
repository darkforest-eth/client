# Module: Backend/Network/Blockchain

## Table of contents

### Functions

- [getEthConnection](Backend_Network_Blockchain.md#getethconnection)
- [loadCoreContract](Backend_Network_Blockchain.md#loadcorecontract)
- [loadGettersContract](Backend_Network_Blockchain.md#loadgetterscontract)
- [loadTokensContract](Backend_Network_Blockchain.md#loadtokenscontract)
- [loadWhitelistContract](Backend_Network_Blockchain.md#loadwhitelistcontract)

## Functions

### getEthConnection

▸ **getEthConnection**(): `Promise`<`EthConnection`\>

#### Returns

`Promise`<`EthConnection`\>

---

### loadCoreContract

▸ **loadCoreContract**(`address`, `provider`, `signer?`): `Promise`<`DarkForestCore`\>

Loads the Core game contract, which is responsible for updating the state of the game.

**`see`** https://github.com/darkforest-eth/eth/blob/master/contracts/DarkForestCore.sol

#### Parameters

| Name       | Type              |
| :--------- | :---------------- |
| `address`  | `string`          |
| `provider` | `JsonRpcProvider` |
| `signer?`  | `Wallet`          |

#### Returns

`Promise`<`DarkForestCore`\>

---

### loadGettersContract

▸ **loadGettersContract**(`address`, `provider`, `signer?`): `Promise`<`DarkForestGetters`\>

Loads the Getters contract, which contains utility view functions which get game objects
from the blockchain in bulk.

**`see`** https://github.com/darkforest-eth/eth/blob/master/contracts/DarkForestGetters.sol

#### Parameters

| Name       | Type              |
| :--------- | :---------------- |
| `address`  | `string`          |
| `provider` | `JsonRpcProvider` |
| `signer?`  | `Wallet`          |

#### Returns

`Promise`<`DarkForestGetters`\>

---

### loadTokensContract

▸ **loadTokensContract**(`address`, `provider`, `signer?`): `Promise`<`DarkForestTokens`\>

Loads the Tokens contract, which contains utility view functions which handles artifacts.

**`see`** https://github.com/darkforest-eth/eth/blob/master/contracts/DarkForestTokens.sol

#### Parameters

| Name       | Type              |
| :--------- | :---------------- |
| `address`  | `string`          |
| `provider` | `JsonRpcProvider` |
| `signer?`  | `Wallet`          |

#### Returns

`Promise`<`DarkForestTokens`\>

---

### loadWhitelistContract

▸ **loadWhitelistContract**(`address`, `provider`, `signer?`): `Promise`<`Whitelist`\>

Loads the Whitelist contract, which keeps track of which players are allowed to play the game.

**`see`** https://github.com/darkforest-eth/eth/blob/master/contracts/Whitelist.sol

#### Parameters

| Name       | Type              |
| :--------- | :---------------- |
| `address`  | `string`          |
| `provider` | `JsonRpcProvider` |
| `signer?`  | `Wallet`          |

#### Returns

`Promise`<`Whitelist`\>
