# Module: Backend/Network/Blockchain

## Table of contents

### Functions

- [getEthConnection](Backend_Network_Blockchain.md#getethconnection)
- [loadDiamondContract](Backend_Network_Blockchain.md#loaddiamondcontract)

## Functions

### getEthConnection

▸ **getEthConnection**(): `Promise`<`EthConnection`\>

#### Returns

`Promise`<`EthConnection`\>

---

### loadDiamondContract

▸ **loadDiamondContract**<`T`\>(`address`, `provider`, `signer?`): `Promise`<`T`\>

Loads the game contract, which is responsible for updating the state of the game.

#### Type parameters

| Name | Type                     |
| :--- | :----------------------- |
| `T`  | extends `Contract`<`T`\> |

#### Parameters

| Name       | Type              |
| :--------- | :---------------- |
| `address`  | `string`          |
| `provider` | `JsonRpcProvider` |
| `signer?`  | `Wallet`          |

#### Returns

`Promise`<`T`\>
