# Module: Backend/Network/UtilityServerAPI

## Table of contents

### Enumerations

- [EmailResponse](../enums/backend_network_utilityserverapi.emailresponse.md)

### Variables

- [WEBSERVER_URL](backend_network_utilityserverapi.md#webserver_url)

### Functions

- [getAllTwitters](backend_network_utilityserverapi.md#getalltwitters)
- [requestDevFaucet](backend_network_utilityserverapi.md#requestdevfaucet)
- [submitInterestedEmail](backend_network_utilityserverapi.md#submitinterestedemail)
- [submitPlayerEmail](backend_network_utilityserverapi.md#submitplayeremail)
- [submitUnsubscribeEmail](backend_network_utilityserverapi.md#submitunsubscribeemail)
- [submitWhitelistKey](backend_network_utilityserverapi.md#submitwhitelistkey)
- [verifyTwitterHandle](backend_network_utilityserverapi.md#verifytwitterhandle)

## Variables

### WEBSERVER_URL

• `Const` **WEBSERVER_URL**: _string_

## Functions

### getAllTwitters

▸ `Const` **getAllTwitters**(): _Promise_<[_AddressTwitterMap_](_types_darkforest_api_utilityserverapitypes.md#addresstwittermap)\>

**Returns:** _Promise_<[_AddressTwitterMap_](_types_darkforest_api_utilityserverapitypes.md#addresstwittermap)\>

---

### requestDevFaucet

▸ `Const` **requestDevFaucet**(`address`: EthAddress): _Promise_<boolean\>

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `address` | EthAddress |

**Returns:** _Promise_<boolean\>

---

### submitInterestedEmail

▸ `Const` **submitInterestedEmail**(`email`: _string_): _Promise_<[_EmailResponse_](../enums/backend_network_utilityserverapi.emailresponse.md)\>

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `email` | _string_ |

**Returns:** _Promise_<[_EmailResponse_](../enums/backend_network_utilityserverapi.emailresponse.md)\>

---

### submitPlayerEmail

▸ `Const` **submitPlayerEmail**(`email`: _string_, `ethAddress`: EthAddress): _Promise_<[_EmailResponse_](../enums/backend_network_utilityserverapi.emailresponse.md)\>

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `email`      | _string_   |
| `ethAddress` | EthAddress |

**Returns:** _Promise_<[_EmailResponse_](../enums/backend_network_utilityserverapi.emailresponse.md)\>

---

### submitUnsubscribeEmail

▸ `Const` **submitUnsubscribeEmail**(`email`: _string_): _Promise_<[_EmailResponse_](../enums/backend_network_utilityserverapi.emailresponse.md)\>

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `email` | _string_ |

**Returns:** _Promise_<[_EmailResponse_](../enums/backend_network_utilityserverapi.emailresponse.md)\>

---

### submitWhitelistKey

▸ `Const` **submitWhitelistKey**(`key`: _string_, `address`: EthAddress): _Promise_<`null` \| string\>

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `key`     | _string_   |
| `address` | EthAddress |

**Returns:** _Promise_<`null` \| string\>

---

### verifyTwitterHandle

▸ `Const` **verifyTwitterHandle**(`twitter`: _string_, `address`: EthAddress): _Promise_<boolean\>

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `twitter` | _string_   |
| `address` | EthAddress |

**Returns:** _Promise_<boolean\>
