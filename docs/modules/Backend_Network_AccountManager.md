# Module: Backend/Network/AccountManager

## Table of contents

### Interfaces

- [Account](../interfaces/Backend_Network_AccountManager.Account.md)

### Functions

- [addAccount](Backend_Network_AccountManager.md#addaccount)
- [getAccounts](Backend_Network_AccountManager.md#getaccounts)

## Functions

### addAccount

▸ **addAccount**(`privateKey`): `void`

Adds the given account, and saves it to localstorage.

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `privateKey` | `string` |

#### Returns

`void`

---

### getAccounts

▸ **getAccounts**(): [`Account`](../interfaces/Backend_Network_AccountManager.Account.md)[]

Returns the list of accounts that are logged into the game.

#### Returns

[`Account`](../interfaces/Backend_Network_AccountManager.Account.md)[]
