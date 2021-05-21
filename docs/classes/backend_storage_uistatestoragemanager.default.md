# Class: default

[Backend/Storage/UIStateStorageManager](../modules/backend_storage_uistatestoragemanager.md).default

## Table of contents

### Constructors

- [constructor](backend_storage_uistatestoragemanager.default.md#constructor)

### Properties

- [account](backend_storage_uistatestoragemanager.default.md#account)
- [contractAddress](backend_storage_uistatestoragemanager.default.md#contractaddress)
- [instance](backend_storage_uistatestoragemanager.default.md#instance)

### Methods

- [getKey](backend_storage_uistatestoragemanager.default.md#getkey)
- [getUIDataItem](backend_storage_uistatestoragemanager.default.md#getuidataitem)
- [load](backend_storage_uistatestoragemanager.default.md#load)
- [save](backend_storage_uistatestoragemanager.default.md#save)
- [setUIDataItem](backend_storage_uistatestoragemanager.default.md#setuidataitem)
- [create](backend_storage_uistatestoragemanager.default.md#create)

## Constructors

### constructor

\+ `Private` **new default**(`account`: _undefined_ \| EthAddress, `contractAddress`: _string_): [_default_](backend_storage_uistatestoragemanager.default.md)

#### Parameters

| Name              | Type                      |
| :---------------- | :------------------------ |
| `account`         | _undefined_ \| EthAddress |
| `contractAddress` | _string_                  |

**Returns:** [_default_](backend_storage_uistatestoragemanager.default.md)

## Properties

### account

• **account**: _undefined_ \| EthAddress

---

### contractAddress

• **contractAddress**: _string_

---

### instance

▪ `Static` `Private` **instance**: [_default_](backend_storage_uistatestoragemanager.default.md)

## Methods

### getKey

▸ `Private` **getKey**(): _string_

**Returns:** _string_

---

### getUIDataItem

▸ **getUIDataItem**(`key`: [_UIDataKey_](../enums/backend_storage_uistatestoragemanager.uidatakey.md)): _boolean_

#### Parameters

| Name  | Type                                                                       |
| :---- | :------------------------------------------------------------------------- |
| `key` | [_UIDataKey_](../enums/backend_storage_uistatestoragemanager.uidatakey.md) |

**Returns:** _boolean_

---

### load

▸ `Private` **load**(): [_UIData_](../modules/backend_storage_uistatestoragemanager.md#uidata)

**Returns:** [_UIData_](../modules/backend_storage_uistatestoragemanager.md#uidata)

---

### save

▸ `Private` **save**(`data`: [_UIData_](../modules/backend_storage_uistatestoragemanager.md#uidata)): _void_

#### Parameters

| Name   | Type                                                                   |
| :----- | :--------------------------------------------------------------------- |
| `data` | [_UIData_](../modules/backend_storage_uistatestoragemanager.md#uidata) |

**Returns:** _void_

---

### setUIDataItem

▸ **setUIDataItem**(`key`: [_UIDataKey_](../enums/backend_storage_uistatestoragemanager.uidatakey.md), `value`: _boolean_): _void_

#### Parameters

| Name    | Type                                                                       |
| :------ | :------------------------------------------------------------------------- |
| `key`   | [_UIDataKey_](../enums/backend_storage_uistatestoragemanager.uidatakey.md) |
| `value` | _boolean_                                                                  |

**Returns:** _void_

---

### create

▸ `Static` **create**(`account`: _undefined_ \| EthAddress, `contractAddress`: _string_): [_default_](backend_storage_uistatestoragemanager.default.md)

#### Parameters

| Name              | Type                      |
| :---------------- | :------------------------ |
| `account`         | _undefined_ \| EthAddress |
| `contractAddress` | _string_                  |

**Returns:** [_default_](backend_storage_uistatestoragemanager.default.md)
