# Class: Lazy<T\>

[Backend/GameLogic/Lazy](../modules/Backend_GameLogic_Lazy.md).Lazy

## Type parameters

| Name |
| :--- |
| `T`  |

## Table of contents

### Constructors

- [constructor](Backend_GameLogic_Lazy.Lazy.md#constructor)

### Properties

- [getPromise](Backend_GameLogic_Lazy.Lazy.md#getpromise)
- [promise](Backend_GameLogic_Lazy.Lazy.md#promise)

### Methods

- [get](Backend_GameLogic_Lazy.Lazy.md#get)

## Constructors

### constructor

• **new Lazy**<`T`\>(`getPromise`)

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                  |
| :----------- | :-------------------- |
| `getPromise` | () => `Promise`<`T`\> |

## Properties

### getPromise

• `Private` **getPromise**: () => `Promise`<`T`\>

#### Type declaration

▸ (): `Promise`<`T`\>

##### Returns

`Promise`<`T`\>

---

### promise

• `Private` **promise**: `undefined` \| `Promise`<`T`\>

## Methods

### get

▸ **get**(): `Promise`<`T`\>

#### Returns

`Promise`<`T`\>
