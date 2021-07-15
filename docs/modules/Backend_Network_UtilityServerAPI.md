# Module: Backend/Network/UtilityServerAPI

## Table of contents

### Enumerations

- [EmailResponse](../enums/Backend_Network_UtilityServerAPI.EmailResponse.md)

### Variables

- [WEBSERVER_URL](Backend_Network_UtilityServerAPI.md#webserver_url)

### Functions

- [getAllTwitters](Backend_Network_UtilityServerAPI.md#getalltwitters)
- [requestDevFaucet](Backend_Network_UtilityServerAPI.md#requestdevfaucet)
- [submitInterestedEmail](Backend_Network_UtilityServerAPI.md#submitinterestedemail)
- [submitPlayerEmail](Backend_Network_UtilityServerAPI.md#submitplayeremail)
- [submitUnsubscribeEmail](Backend_Network_UtilityServerAPI.md#submitunsubscribeemail)
- [submitWhitelistKey](Backend_Network_UtilityServerAPI.md#submitwhitelistkey)
- [verifyTwitterHandle](Backend_Network_UtilityServerAPI.md#verifytwitterhandle)

## Variables

### WEBSERVER_URL

• `Const` **WEBSERVER_URL**: `string`

## Functions

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

### verifyTwitterHandle

▸ `Const` **verifyTwitterHandle**(`twitter`, `address`): `Promise`<`boolean`\>

#### Parameters

| Name      | Type         |
| :-------- | :----------- |
| `twitter` | `string`     |
| `address` | `EthAddress` |

#### Returns

`Promise`<`boolean`\>
