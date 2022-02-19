# Module: Backend/Network/UtilityServerAPI

## Table of contents

### Enumerations

- [EmailResponse](../enums/Backend_Network_UtilityServerAPI.EmailResponse.md)

### Type aliases

- [RegisterConfirmationResponse](Backend_Network_UtilityServerAPI.md#registerconfirmationresponse)

### Functions

- [callRegisterAndWaitForConfirmation](Backend_Network_UtilityServerAPI.md#callregisterandwaitforconfirmation)
- [disconnectTwitter](Backend_Network_UtilityServerAPI.md#disconnecttwitter)
- [getAllTwitters](Backend_Network_UtilityServerAPI.md#getalltwitters)
- [requestDevFaucet](Backend_Network_UtilityServerAPI.md#requestdevfaucet)
- [submitInterestedEmail](Backend_Network_UtilityServerAPI.md#submitinterestedemail)
- [submitPlayerEmail](Backend_Network_UtilityServerAPI.md#submitplayeremail)
- [submitUnsubscribeEmail](Backend_Network_UtilityServerAPI.md#submitunsubscribeemail)
- [submitWhitelistKey](Backend_Network_UtilityServerAPI.md#submitwhitelistkey)
- [tryGetAllTwitters](Backend_Network_UtilityServerAPI.md#trygetalltwitters)
- [verifyTwitterHandle](Backend_Network_UtilityServerAPI.md#verifytwitterhandle)
- [whitelistStatus](Backend_Network_UtilityServerAPI.md#whiteliststatus)

## Type aliases

### RegisterConfirmationResponse

Ƭ **RegisterConfirmationResponse**: `Object`

#### Type declaration

| Name            | Type      | Description                                                                                              |
| :-------------- | :-------- | :------------------------------------------------------------------------------------------------------- |
| `canRetry?`     | `boolean` | If the whitelist registration is unsuccessful, this is true if the client is able to retry registration. |
| `errorMessage?` | `string`  | If the whitelist registration is unsuccessful, this is populated with the error message explaining why.  |
| `txHash?`       | `string`  | If the whitelist registration is successful, this is populated with the hash of the transaction.         |

## Functions

### callRegisterAndWaitForConfirmation

▸ **callRegisterAndWaitForConfirmation**(`key`, `address`, `terminal`): `Promise`<[`RegisterConfirmationResponse`](Backend_Network_UtilityServerAPI.md#registerconfirmationresponse)\>

Starts the registration process for the user then
polls for success.

#### Parameters

| Name       | Type                                                                                                            |
| :--------- | :-------------------------------------------------------------------------------------------------------------- |
| `key`      | `string`                                                                                                        |
| `address`  | `EthAddress`                                                                                                    |
| `terminal` | `MutableRefObject`<`undefined` \| [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md)\> |

#### Returns

`Promise`<[`RegisterConfirmationResponse`](Backend_Network_UtilityServerAPI.md#registerconfirmationresponse)\>

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

▸ `Const` **getAllTwitters**(): `Promise`<[`AddressTwitterMap`](types_darkforest_api_UtilityServerAPITypes.md#addresstwittermap)\>

#### Returns

`Promise`<[`AddressTwitterMap`](types_darkforest_api_UtilityServerAPITypes.md#addresstwittermap)\>

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

Submits a whitelist key to register the given player to the game. Returns null if there was an
error.

#### Parameters

| Name      | Type         |
| :-------- | :----------- |
| `key`     | `string`     |
| `address` | `EthAddress` |

#### Returns

`Promise`<`null` \| `RegisterResponse`\>

---

### tryGetAllTwitters

▸ `Const` **tryGetAllTwitters**(): `Promise`<[`AddressTwitterMap`](types_darkforest_api_UtilityServerAPITypes.md#addresstwittermap)\>

Swallows all errors. Either loads the address to twitter map from the webserver in 5 seconds, or
returan empty map.

#### Returns

`Promise`<[`AddressTwitterMap`](types_darkforest_api_UtilityServerAPITypes.md#addresstwittermap)\>

---

### verifyTwitterHandle

▸ `Const` **verifyTwitterHandle**(`verifyMessage`): `Promise`<`boolean`\>

#### Parameters

| Name            | Type                       |
| :-------------- | :------------------------- |
| `verifyMessage` | `SignedMessage`<`Object`\> |

#### Returns

`Promise`<`boolean`\>

---

### whitelistStatus

▸ `Const` **whitelistStatus**(`address`): `Promise`<`null` \| `WhitelistStatusResponse`\>

#### Parameters

| Name      | Type         |
| :-------- | :----------- |
| `address` | `EthAddress` |

#### Returns

`Promise`<`null` \| `WhitelistStatusResponse`\>
