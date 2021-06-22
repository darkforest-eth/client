# Class: default

[Backend/Network/EthConnection](../modules/backend_network_ethconnection.md).default

Responsible for

1. loading the contract
2. the in-memory wallet
3. connecting to the correct network

## Hierarchy

- _EventEmitter_

  ↳ **default**

## Table of contents

### Constructors

- [constructor](backend_network_ethconnection.default.md#constructor)

### Properties

- [blockNumber](backend_network_ethconnection.default.md#blocknumber)
- [blockNumber$](backend_network_ethconnection.default.md#blocknumber$)
- [knownAddresses](backend_network_ethconnection.default.md#knownaddresses)
- [provider](backend_network_ethconnection.default.md#provider)
- [rpcURL](backend_network_ethconnection.default.md#rpcurl)
- [signer](backend_network_ethconnection.default.md#signer)
- [XDAI_DEFAULT_URL](backend_network_ethconnection.default.md#xdai_default_url)

### Methods

- [addAccount](backend_network_ethconnection.default.md#addaccount)
- [adjustPollRateBasedOnVisibility](backend_network_ethconnection.default.md#adjustpollratebasedonvisibility)
- [getAddress](backend_network_ethconnection.default.md#getaddress)
- [getBalance](backend_network_ethconnection.default.md#getbalance)
- [getKnownAccounts](backend_network_ethconnection.default.md#getknownaccounts)
- [getNonce](backend_network_ethconnection.default.md#getnonce)
- [getPrivateKey](backend_network_ethconnection.default.md#getprivatekey)
- [getRpcEndpoint](backend_network_ethconnection.default.md#getrpcendpoint)
- [hasSigner](backend_network_ethconnection.default.md#hassigner)
- [isWhitelisted](backend_network_ethconnection.default.md#iswhitelisted)
- [loadContract](backend_network_ethconnection.default.md#loadcontract)
- [loadCoreContract](backend_network_ethconnection.default.md#loadcorecontract)
- [loadGPTCreditContract](backend_network_ethconnection.default.md#loadgptcreditcontract)
- [loadGettersContract](backend_network_ethconnection.default.md#loadgetterscontract)
- [loadWhitelistContract](backend_network_ethconnection.default.md#loadwhitelistcontract)
- [processEvents](backend_network_ethconnection.default.md#processevents)
- [setAccount](backend_network_ethconnection.default.md#setaccount)
- [setRpcEndpoint](backend_network_ethconnection.default.md#setrpcendpoint)
- [signMessage](backend_network_ethconnection.default.md#signmessage)
- [subscribeToEvents](backend_network_ethconnection.default.md#subscribetoevents)
- [verifySignature](backend_network_ethconnection.default.md#verifysignature)
- [waitForTransaction](backend_network_ethconnection.default.md#waitfortransaction)

## Constructors

### constructor

\+ **new default**(): [_default_](backend_network_ethconnection.default.md)

**Returns:** [_default_](backend_network_ethconnection.default.md)

Overrides: EventEmitter.constructor

## Properties

### blockNumber

• `Private` **blockNumber**: _number_

---

### blockNumber$

• `Readonly` **blockNumber$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<number\>

---

### knownAddresses

• `Private` `Readonly` **knownAddresses**: EthAddress[]

---

### provider

• `Private` **provider**: _JsonRpcProvider_

---

### rpcURL

• `Private` **rpcURL**: _string_

---

### signer

• `Private` **signer**: _undefined_ \| _Wallet_

---

### XDAI_DEFAULT_URL

▪ `Static` `Private` `Readonly` **XDAI_DEFAULT_URL**: _string_

## Methods

### addAccount

▸ **addAccount**(`skey`: _string_): _void_

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `skey` | _string_ |

**Returns:** _void_

---

### adjustPollRateBasedOnVisibility

▸ `Private` **adjustPollRateBasedOnVisibility**(): _void_

**Returns:** _void_

---

### getAddress

▸ **getAddress**(): EthAddress

**Returns:** EthAddress

---

### getBalance

▸ **getBalance**(`address`: EthAddress): _Promise_<number\>

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `address` | EthAddress |

**Returns:** _Promise_<number\>

---

### getKnownAccounts

▸ **getKnownAccounts**(): EthAddress[]

**Returns:** EthAddress[]

---

### getNonce

▸ **getNonce**(): _Promise_<number\>

**Returns:** _Promise_<number\>

---

### getPrivateKey

▸ **getPrivateKey**(): _string_

**Returns:** _string_

---

### getRpcEndpoint

▸ **getRpcEndpoint**(): _string_

**Returns:** _string_

---

### hasSigner

▸ **hasSigner**(): _boolean_

**Returns:** _boolean_

---

### isWhitelisted

▸ **isWhitelisted**(`address`: EthAddress): _Promise_<boolean\>

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `address` | EthAddress |

**Returns:** _Promise_<boolean\>

---

### loadContract

▸ **loadContract**<C\>(`contractAddress`: _string_, `contractABI`: ContractInterface): _Promise_<C\>

#### Type parameters

| Name | Type           |
| :--- | :------------- |
| `C`  | _Contract_<C\> |

#### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `contractAddress` | _string_          |
| `contractABI`     | ContractInterface |

**Returns:** _Promise_<C\>

---

### loadCoreContract

▸ **loadCoreContract**(): _Promise_<DarkForestCore\>

**Returns:** _Promise_<DarkForestCore\>

---

### loadGPTCreditContract

▸ **loadGPTCreditContract**(): _Promise_<DarkForestGPTCredit\>

**Returns:** _Promise_<DarkForestGPTCredit\>

---

### loadGettersContract

▸ **loadGettersContract**(): _Promise_<DarkForestGetters\>

**Returns:** _Promise_<DarkForestGetters\>

---

### loadWhitelistContract

▸ **loadWhitelistContract**(): _Promise_<Whitelist\>

**Returns:** _Promise_<Whitelist\>

---

### processEvents

▸ `Private` **processEvents**(`startBlock`: _number_, `endBlock`: _number_, `eventFilter`: EventFilter, `contract`: _DarkForestCore_, `handlers`: _Partial_<Record<[_ContractEvent_](../enums/_types_darkforest_api_contractsapitypes.contractevent.md), any\>\>): _Promise_<void\>

#### Parameters

| Name          | Type                                                                                                           |
| :------------ | :------------------------------------------------------------------------------------------------------------- |
| `startBlock`  | _number_                                                                                                       |
| `endBlock`    | _number_                                                                                                       |
| `eventFilter` | EventFilter                                                                                                    |
| `contract`    | _DarkForestCore_                                                                                               |
| `handlers`    | _Partial_<Record<[_ContractEvent_](../enums/_types_darkforest_api_contractsapitypes.contractevent.md), any\>\> |

**Returns:** _Promise_<void\>

---

### setAccount

▸ **setAccount**(`address`: EthAddress): _void_

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `address` | EthAddress |

**Returns:** _void_

---

### setRpcEndpoint

▸ **setRpcEndpoint**(`url`: _string_): _Promise_<void\>

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `url` | _string_ |

**Returns:** _Promise_<void\>

---

### signMessage

▸ **signMessage**(`message`: _string_): _Promise_<string\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `message` | _string_ |

**Returns:** _Promise_<string\>

---

### subscribeToEvents

▸ **subscribeToEvents**(`contract`: _DarkForestCore_, `handlers`: _Partial_<Record<[_ContractEvent_](../enums/_types_darkforest_api_contractsapitypes.contractevent.md), any\>\>): _void_

#### Parameters

| Name       | Type                                                                                                           |
| :--------- | :------------------------------------------------------------------------------------------------------------- |
| `contract` | _DarkForestCore_                                                                                               |
| `handlers` | _Partial_<Record<[_ContractEvent_](../enums/_types_darkforest_api_contractsapitypes.contractevent.md), any\>\> |

**Returns:** _void_

---

### verifySignature

▸ **verifySignature**(`message`: _string_, `signature`: _string_, `address`: EthAddress): _boolean_

#### Parameters

| Name        | Type       |
| :---------- | :--------- |
| `message`   | _string_   |
| `signature` | _string_   |
| `address`   | EthAddress |

**Returns:** _boolean_

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`: _string_): _Promise_<TransactionReceipt\>

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `txHash` | _string_ |

**Returns:** _Promise_<TransactionReceipt\>
