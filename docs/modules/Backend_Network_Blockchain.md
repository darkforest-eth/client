# Module: Backend/Network/Blockchain

## Table of contents

### Functions

- [getEthConnection](Backend_Network_Blockchain.md#getethconnection)
- [loadCoreContract](Backend_Network_Blockchain.md#loadcorecontract)
- [loadGettersContract](Backend_Network_Blockchain.md#loadgetterscontract)
- [loadGptCreditContract](Backend_Network_Blockchain.md#loadgptcreditcontract)
- [loadScoringContract](Backend_Network_Blockchain.md#loadscoringcontract)
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

| Name       | Type                        |
| :--------- | :-------------------------- |
| `address`  | `string`                    |
| `provider` | `providers.JsonRpcProvider` |
| `signer?`  | `Wallet`                    |

#### Returns

`Promise`<`DarkForestCore`\>

---

### loadGettersContract

▸ **loadGettersContract**(`address`, `provider`, `signer?`): `Promise`<`DarkForestGetters`\>

Loads the Getters contract, which contains utility view functions which get game objects
from the blockchain in bulk.

**`see`** https://github.com/darkforest-eth/eth/blob/master/contracts/DarkForestGetters.sol

#### Parameters

| Name       | Type                        |
| :--------- | :-------------------------- |
| `address`  | `string`                    |
| `provider` | `providers.JsonRpcProvider` |
| `signer?`  | `Wallet`                    |

#### Returns

`Promise`<`DarkForestGetters`\>

---

### loadGptCreditContract

▸ **loadGptCreditContract**(`address`, `provider`, `signer?`): `Promise`<`DarkForestGPTCredit`\>

Loads ths GPT Credit contract, which players can pay to talk to artifacts.

**`see`** https://github.com/darkforest-eth/eth/blob/master/contracts/DarkForestGPTCredit.sol

#### Parameters

| Name       | Type                        |
| :--------- | :-------------------------- |
| `address`  | `string`                    |
| `provider` | `providers.JsonRpcProvider` |
| `signer?`  | `Wallet`                    |

#### Returns

`Promise`<`DarkForestGPTCredit`\>

---

### loadScoringContract

▸ **loadScoringContract**(`address`, `provider`, `signer?`): `Promise`<`DarkForestScoringRound3`\>

Loads the Round 3 Scoring contract which tracks claimed planets and player claim cooldowns.

**`see`** https://github.com/darkforest-eth/eth/blob/master/contracts/DarkForestRound3Scoring.sol

#### Parameters

| Name       | Type                        |
| :--------- | :-------------------------- |
| `address`  | `string`                    |
| `provider` | `providers.JsonRpcProvider` |
| `signer?`  | `Wallet`                    |

#### Returns

`Promise`<`DarkForestScoringRound3`\>

---

### loadWhitelistContract

▸ **loadWhitelistContract**(`address`, `provider`, `signer?`): `Promise`<`Whitelist`\>

Loads the Whitelist contract, which keeps track of which players are allowed to play the game.

**`see`** https://github.com/darkforest-eth/eth/blob/master/contracts/Whitelist.sol

#### Parameters

| Name       | Type                        |
| :--------- | :-------------------------- |
| `address`  | `string`                    |
| `provider` | `providers.JsonRpcProvider` |
| `signer?`  | `Wallet`                    |

#### Returns

`Promise`<`Whitelist`\>
