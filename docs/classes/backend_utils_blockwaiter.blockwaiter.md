# Class: BlockWaiter

[Backend/Utils/BlockWaiter](../modules/backend_utils_blockwaiter.md).BlockWaiter

You can schedule a function to be executed {@code waitThisLong} in the future. If you
schedule again, the previously scheduled function will not be executed.

## Table of contents

### Constructors

- [constructor](backend_utils_blockwaiter.blockwaiter.md#constructor)

### Properties

- [timeout](backend_utils_blockwaiter.blockwaiter.md#timeout)
- [waitThisLong](backend_utils_blockwaiter.blockwaiter.md#waitthislong)

### Methods

- [schedule](backend_utils_blockwaiter.blockwaiter.md#schedule)

## Constructors

### constructor

\+ **new BlockWaiter**(`waitThisLong`: _number_): [_BlockWaiter_](backend_utils_blockwaiter.blockwaiter.md)

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `waitThisLong` | _number_ |

**Returns:** [_BlockWaiter_](backend_utils_blockwaiter.blockwaiter.md)

## Properties

### timeout

• `Private` `Optional` **timeout**: _Timeout_

---

### waitThisLong

• `Private` **waitThisLong**: _number_

## Methods

### schedule

▸ **schedule**(`func`: () => _void_): _void_

#### Parameters

| Name   | Type         |
| :----- | :----------- |
| `func` | () => _void_ |

**Returns:** _void_
