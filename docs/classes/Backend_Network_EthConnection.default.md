# Class: default

[Backend/Network/EthConnection](../modules/Backend_Network_EthConnection.md).default

Responsible for

1. loading the contract
2. the in-memory wallet
3. connecting to the correct network

## Hierarchy

- `EventEmitter`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](Backend_Network_EthConnection.default.md#constructor)

### Properties

- [blockNumber](Backend_Network_EthConnection.default.md#blocknumber)
- [blockNumber$](Backend_Network_EthConnection.default.md#blocknumber$)
- [diagnosticsUpdater](Backend_Network_EthConnection.default.md#diagnosticsupdater)
- [gasPrices](Backend_Network_EthConnection.default.md#gasprices)
- [gasPrices$](Backend_Network_EthConnection.default.md#gasprices$)
- [knownAddresses](Backend_Network_EthConnection.default.md#knownaddresses)
- [provider](Backend_Network_EthConnection.default.md#provider)
- [rpcURL](Backend_Network_EthConnection.default.md#rpcurl)
- [signer](Backend_Network_EthConnection.default.md#signer)
- [XDAI_DEFAULT_URL](Backend_Network_EthConnection.default.md#xdai_default_url)

### Methods

- [addAccount](Backend_Network_EthConnection.default.md#addaccount)
- [adjustPollRateBasedOnVisibility](Backend_Network_EthConnection.default.md#adjustpollratebasedonvisibility)
- [getAddress](Backend_Network_EthConnection.default.md#getaddress)
- [getBalance](Backend_Network_EthConnection.default.md#getbalance)
- [getGasPriceGwei](Backend_Network_EthConnection.default.md#getgaspricegwei)
- [getGasPrices](Backend_Network_EthConnection.default.md#getgasprices)
- [getKnownAccounts](Backend_Network_EthConnection.default.md#getknownaccounts)
- [getNonce](Backend_Network_EthConnection.default.md#getnonce)
- [getPrivateKey](Backend_Network_EthConnection.default.md#getprivatekey)
- [getRpcEndpoint](Backend_Network_EthConnection.default.md#getrpcendpoint)
- [hasSigner](Backend_Network_EthConnection.default.md#hassigner)
- [isWhitelisted](Backend_Network_EthConnection.default.md#iswhitelisted)
- [loadContract](Backend_Network_EthConnection.default.md#loadcontract)
- [loadCoreContract](Backend_Network_EthConnection.default.md#loadcorecontract)
- [loadGPTCreditContract](Backend_Network_EthConnection.default.md#loadgptcreditcontract)
- [loadGettersContract](Backend_Network_EthConnection.default.md#loadgetterscontract)
- [loadWhitelistContract](Backend_Network_EthConnection.default.md#loadwhitelistcontract)
- [processEvents](Backend_Network_EthConnection.default.md#processevents)
- [refreshGasPrices](Backend_Network_EthConnection.default.md#refreshgasprices)
- [setAccount](Backend_Network_EthConnection.default.md#setaccount)
- [setDiagnosticUpdater](Backend_Network_EthConnection.default.md#setdiagnosticupdater)
- [setRpcEndpoint](Backend_Network_EthConnection.default.md#setrpcendpoint)
- [signMessage](Backend_Network_EthConnection.default.md#signmessage)
- [startPollingGasPrices](Backend_Network_EthConnection.default.md#startpollinggasprices)
- [subscribeToEvents](Backend_Network_EthConnection.default.md#subscribetoevents)
- [verifySignature](Backend_Network_EthConnection.default.md#verifysignature)
- [waitForTransaction](Backend_Network_EthConnection.default.md#waitfortransaction)

## Constructors

### constructor

• **new default**()

#### Overrides

EventEmitter.constructor

## Properties

### blockNumber

• `Private` **blockNumber**: `number`

---

### blockNumber$

• `Readonly` **blockNumber$**: [`Monomitter`](../modules/Frontend_Utils_Monomitter.md#monomitter)<`number`\>

---

### diagnosticsUpdater

• `Private` **diagnosticsUpdater**: `undefined` \| [`DiagnosticUpdater`](../interfaces/Backend_Interfaces_DiagnosticUpdater.DiagnosticUpdater.md)

---

### gasPrices

• `Private` **gasPrices**: `GasPrices`

---

### gasPrices$

• `Readonly` **gasPrices$**: [`Monomitter`](../modules/Frontend_Utils_Monomitter.md#monomitter)<`GasPrices`\>

---

### knownAddresses

• `Private` **knownAddresses**: `EthAddress`[]

---

### provider

• `Private` **provider**: `JsonRpcProvider`

---

### rpcURL

• `Private` **rpcURL**: `string`

---

### signer

• `Private` **signer**: `undefined` \| `Wallet`

---

### XDAI_DEFAULT_URL

▪ `Static` `Private` `Readonly` **XDAI_DEFAULT_URL**: `string`

## Methods

### addAccount

▸ **addAccount**(`skey`): `void`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `skey` | `string` |

#### Returns

`void`

---

### adjustPollRateBasedOnVisibility

▸ `Private` **adjustPollRateBasedOnVisibility**(): `void`

#### Returns

`void`

---

### getAddress

▸ **getAddress**(): `EthAddress`

#### Returns

`EthAddress`

---

### getBalance

▸ **getBalance**(`address`): `Promise`<`number`\>

#### Parameters

| Name      | Type         |
| :-------- | :----------- |
| `address` | `EthAddress` |

#### Returns

`Promise`<`number`\>

---

### getGasPriceGwei

▸ **getGasPriceGwei**(`txType`, `gasPrices`): `number`

Get the gas price, measured in gwei, that we should send for a given transaction type, given
the current prices for transaction speeds, and given the user's gas price setting.

#### Parameters

| Name        | Type        |
| :---------- | :---------- |
| `txType`    | `EthTxType` |
| `gasPrices` | `GasPrices` |

#### Returns

`number`

---

### getGasPrices

▸ **getGasPrices**(): `GasPrices`

#### Returns

`GasPrices`

---

### getKnownAccounts

▸ **getKnownAccounts**(): `EthAddress`[]

#### Returns

`EthAddress`[]

---

### getNonce

▸ **getNonce**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

---

### getPrivateKey

▸ **getPrivateKey**(): `string`

#### Returns

`string`

---

### getRpcEndpoint

▸ **getRpcEndpoint**(): `string`

#### Returns

`string`

---

### hasSigner

▸ **hasSigner**(): `boolean`

#### Returns

`boolean`

---

### isWhitelisted

▸ **isWhitelisted**(`address`): `Promise`<`boolean`\>

#### Parameters

| Name      | Type         |
| :-------- | :----------- |
| `address` | `EthAddress` |

#### Returns

`Promise`<`boolean`\>

---

### loadContract

▸ **loadContract**<`C`\>(`contractAddress`, `contractABI`): `Promise`<`C`\>

#### Type parameters

| Name | Type                     |
| :--- | :----------------------- |
| `C`  | extends `Contract`<`C`\> |

#### Parameters

| Name              | Type                |
| :---------------- | :------------------ |
| `contractAddress` | `string`            |
| `contractABI`     | `ContractInterface` |

#### Returns

`Promise`<`C`\>

---

### loadCoreContract

▸ **loadCoreContract**(): `Promise`<`DarkForestCore`\>

#### Returns

`Promise`<`DarkForestCore`\>

---

### loadGPTCreditContract

▸ **loadGPTCreditContract**(): `Promise`<`DarkForestGPTCredit`\>

#### Returns

`Promise`<`DarkForestGPTCredit`\>

---

### loadGettersContract

▸ **loadGettersContract**(): `Promise`<`DarkForestGetters`\>

#### Returns

`Promise`<`DarkForestGetters`\>

---

### loadWhitelistContract

▸ **loadWhitelistContract**(): `Promise`<`Whitelist`\>

#### Returns

`Promise`<`Whitelist`\>

---

### processEvents

▸ `Private` **processEvents**(`startBlock`, `endBlock`, `eventFilter`, `contract`, `handlers`): `Promise`<`void`\>

#### Parameters

| Name          | Type                                                                                                               |
| :------------ | :----------------------------------------------------------------------------------------------------------------- |
| `startBlock`  | `number`                                                                                                           |
| `endBlock`    | `number`                                                                                                           |
| `eventFilter` | `EventFilter`                                                                                                      |
| `contract`    | `DarkForestCore`                                                                                                   |
| `handlers`    | `Partial`<`Record`<[`ContractEvent`](../enums/_types_darkforest_api_ContractsAPITypes.ContractEvent.md), `any`\>\> |

#### Returns

`Promise`<`void`\>

---

### refreshGasPrices

▸ `Private` **refreshGasPrices**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

---

### setAccount

▸ **setAccount**(`address`): `void`

#### Parameters

| Name      | Type         |
| :-------- | :----------- |
| `address` | `EthAddress` |

#### Returns

`void`

---

### setDiagnosticUpdater

▸ **setDiagnosticUpdater**(`diagnosticUpdater?`): `void`

#### Parameters

| Name                 | Type                                                                                           |
| :------------------- | :--------------------------------------------------------------------------------------------- |
| `diagnosticUpdater?` | [`DiagnosticUpdater`](../interfaces/Backend_Interfaces_DiagnosticUpdater.DiagnosticUpdater.md) |

#### Returns

`void`

---

### setRpcEndpoint

▸ **setRpcEndpoint**(`url`): `Promise`<`void`\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `url` | `string` |

#### Returns

`Promise`<`void`\>

---

### signMessage

▸ **signMessage**(`message`): `Promise`<`string`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | `string` |

#### Returns

`Promise`<`string`\>

---

### startPollingGasPrices

▸ `Private` **startPollingGasPrices**(): `void`

#### Returns

`void`

---

### subscribeToEvents

▸ **subscribeToEvents**(`contract`, `handlers`): `void`

#### Parameters

| Name       | Type                                                                                                               |
| :--------- | :----------------------------------------------------------------------------------------------------------------- |
| `contract` | `DarkForestCore`                                                                                                   |
| `handlers` | `Partial`<`Record`<[`ContractEvent`](../enums/_types_darkforest_api_ContractsAPITypes.ContractEvent.md), `any`\>\> |

#### Returns

`void`

---

### verifySignature

▸ **verifySignature**(`message`, `signature`, `address`): `boolean`

#### Parameters

| Name        | Type         |
| :---------- | :----------- |
| `message`   | `string`     |
| `signature` | `string`     |
| `address`   | `EthAddress` |

#### Returns

`boolean`

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `txHash` | `string` |

#### Returns

`Promise`<`TransactionReceipt`\>
