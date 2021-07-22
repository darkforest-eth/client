# Class: BlockWaiter

[Backend/Utils/BlockWaiter](../modules/Backend_Utils_BlockWaiter.md).BlockWaiter

You can schedule a function to be executed {@code waitThisLong} in the future. If you
schedule again, the previously scheduled function will not be executed.

## Table of contents

### Constructors

- [constructor](Backend_Utils_BlockWaiter.BlockWaiter.md#constructor)

### Properties

- [timeout](Backend_Utils_BlockWaiter.BlockWaiter.md#timeout)
- [waitThisLong](Backend_Utils_BlockWaiter.BlockWaiter.md#waitthislong)

### Methods

- [schedule](Backend_Utils_BlockWaiter.BlockWaiter.md#schedule)

## Constructors

### constructor

• **new BlockWaiter**(`waitThisLong`)

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `waitThisLong` | `number` |

## Properties

### timeout

• `Private` `Optional` **timeout**: `Timeout`

---

### waitThisLong

• `Private` **waitThisLong**: `number`

## Methods

### schedule

▸ **schedule**(`func`): `void`

#### Parameters

| Name   | Type         |
| :----- | :----------- |
| `func` | () => `void` |

#### Returns

`void`
