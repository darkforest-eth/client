# Module: Backend/Network/UtilityServerAPI

## Table of contents

### Enumerations

- [EmailResponse](../enums/Backend_Network_UtilityServerAPI.EmailResponse.md)

### Variables

- [WEBSERVER_URL](Backend_Network_UtilityServerAPI.md#webserver_url)

### Functions

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

▸ `Const` **submitPlayerEmail**(`email`, `ethAddress`): `Promise`<[`EmailResponse`](../enums/Backend_Network_UtilityServerAPI.EmailResponse.md)\>

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `email`      | `string`     |
| `ethAddress` | `EthAddress` |

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

▸ `Const` **submitWhitelistKey**(`key`, `address`): `Promise`<`null` \| `string`\>

#### Parameters

| Name      | Type         |
| :-------- | :----------- |
| `key`     | `string`     |
| `address` | `EthAddress` |

#### Returns

`Promise`<`null` \| `string`\>

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
