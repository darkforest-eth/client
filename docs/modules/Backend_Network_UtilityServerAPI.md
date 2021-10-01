# Module: Backend/Network/UtilityServerAPI

## Table of contents

### Enumerations

- [EmailResponse](../enums/Backend_Network_UtilityServerAPI.EmailResponse.md)

### Variables

- [WEBSERVER_URL](Backend_Network_UtilityServerAPI.md#webserver_url)

### Functions

- [callRegisterUntilWhitelisted](Backend_Network_UtilityServerAPI.md#callregisteruntilwhitelisted)
- [disconnectTwitter](Backend_Network_UtilityServerAPI.md#disconnecttwitter)
- [getAllTwitters](Backend_Network_UtilityServerAPI.md#getalltwitters)
- [requestDevFaucet](Backend_Network_UtilityServerAPI.md#requestdevfaucet)
- [submitInterestedEmail](Backend_Network_UtilityServerAPI.md#submitinterestedemail)
- [submitPlayerEmail](Backend_Network_UtilityServerAPI.md#submitplayeremail)
- [submitUnsubscribeEmail](Backend_Network_UtilityServerAPI.md#submitunsubscribeemail)
- [submitWhitelistKey](Backend_Network_UtilityServerAPI.md#submitwhitelistkey)
- [tryGetAllTwitters](Backend_Network_UtilityServerAPI.md#trygetalltwitters)
- [verifyTwitterHandle](Backend_Network_UtilityServerAPI.md#verifytwitterhandle)

## Variables

### WEBSERVER_URL

• `Const` **WEBSERVER_URL**: `string`

## Functions

### callRegisterUntilWhitelisted

▸ **callRegisterUntilWhitelisted**(`key`, `address`, `terminal`): `Promise`<`string` \| `undefined`\>

Attempts to register the given player into the game.

- if the key is invalid, returns `undefined`
- if there is an error submitting the whitelist key, indicated by a null response, or if the
  response is not successful, tries again, until it succeeds.

#### Parameters

| Name       | Type                                                                                                                  |
| :--------- | :-------------------------------------------------------------------------------------------------------------------- |
| `key`      | `string`                                                                                                              |
| `address`  | `EthAddress`                                                                                                          |
| `terminal` | `React.MutableRefObject`<[`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md) \| `undefined`\> |

#### Returns

`Promise`<`string` \| `undefined`\>

---

### disconnectTwitter

▸ `Const` **disconnectTwitter**(`disconnectMessage`): `Promise`<`boolean`\>

#### Parameters

| Name                | Type                       |
| :------------------ | :------------------------- |
| `disconnectMessage` | `SignedMessage`<`Object`\> |

#### Returns

`Promise`<`boolean`\>

---

### getAllTwitters

▸ `Const` **getAllTwitters**(): `Promise`<[`AddressTwitterMap`](_types_darkforest_api_UtilityServerAPITypes.md#addresstwittermap)\>

#### Returns

`Promise`<[`AddressTwitterMap`](_types_darkforest_api_UtilityServerAPITypes.md#addresstwittermap)\>

---

### requestDevFaucet

▸ `Const` **requestDevFaucet**(`address`): `Promise`<`boolean`\>

#### Parameters

| Name      | Type         |
| :-------- | :----------- |
| `address` | `EthAddress` |

#### Returns

`Promise`<`boolean`\>

---

### submitInterestedEmail

▸ `Const` **submitInterestedEmail**(`email`): `Promise`<[`EmailResponse`](../enums/Backend_Network_UtilityServerAPI.EmailResponse.md)\>

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `email` | `string` |

#### Returns

`Promise`<[`EmailResponse`](../enums/Backend_Network_UtilityServerAPI.EmailResponse.md)\>

---

### submitPlayerEmail

▸ `Const` **submitPlayerEmail**(`request?`): `Promise`<[`EmailResponse`](../enums/Backend_Network_UtilityServerAPI.EmailResponse.md)\>

#### Parameters

| Name       | Type                       |
| :--------- | :------------------------- |
| `request?` | `SignedMessage`<`Object`\> |

#### Returns

`Promise`<[`EmailResponse`](../enums/Backend_Network_UtilityServerAPI.EmailResponse.md)\>

---

### submitUnsubscribeEmail

▸ `Const` **submitUnsubscribeEmail**(`email`): `Promise`<[`EmailResponse`](../enums/Backend_Network_UtilityServerAPI.EmailResponse.md)\>

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `email` | `string` |

#### Returns

`Promise`<[`EmailResponse`](../enums/Backend_Network_UtilityServerAPI.EmailResponse.md)\>

---

### submitWhitelistKey

▸ `Const` **submitWhitelistKey**(`key`, `address`): `Promise`<`null` \| `RegisterResponse`\>

Submits a whitelist key to register the given player to the game.

#### Parameters

| Name      | Type         |
| :-------- | :----------- |
| `key`     | `string`     |
| `address` | `EthAddress` |

#### Returns

`Promise`<`null` \| `RegisterResponse`\>

---

### tryGetAllTwitters

▸ `Const` **tryGetAllTwitters**(): `Promise`<[`AddressTwitterMap`](_types_darkforest_api_UtilityServerAPITypes.md#addresstwittermap)\>

Swallows all errors. Either loads the address to twitter map from the webserver in 5 seconds, or
returan empty map.

#### Returns

`Promise`<[`AddressTwitterMap`](_types_darkforest_api_UtilityServerAPITypes.md#addresstwittermap)\>

---

### verifyTwitterHandle

▸ `Const` **verifyTwitterHandle**(`verifyMessage`): `Promise`<`boolean`\>

#### Parameters

| Name            | Type                       |
| :-------------- | :------------------------- |
| `verifyMessage` | `SignedMessage`<`Object`\> |

#### Returns

`Promise`<`boolean`\>
