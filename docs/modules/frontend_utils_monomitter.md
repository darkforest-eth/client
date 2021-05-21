# Module: Frontend/Utils/Monomitter

## Table of contents

### Type aliases

- [Callback](frontend_utils_monomitter.md#callback)
- [Monomitter](frontend_utils_monomitter.md#monomitter)
- [Subscription](frontend_utils_monomitter.md#subscription)

### Functions

- [monomitter](frontend_utils_monomitter.md#monomitter)

## Type aliases

### Callback

Ƭ **Callback**<T\>: (`o`: T) => _void_

Typed single pub / sub pattern, inspired by:
https://github.com/loilo/monomitter/blob/master/monomitter.mjs

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Type declaration

▸ (`o`: T): _void_

#### Parameters

| Name | Type |
| :--- | :--- |
| `o`  | T    |

**Returns:** _void_

---

### Monomitter

Ƭ **Monomitter**<T\>: _object_

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Type declaration

| Name        | Type                                                                                                                           |
| :---------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `clear`     | () => _void_                                                                                                                   |
| `publish`   | (`o`: T) => _void_                                                                                                             |
| `subscribe` | (`cb`: [_Callback_](frontend_utils_monomitter.md#callback)<T\>) => [_Subscription_](frontend_utils_monomitter.md#subscription) |

---

### Subscription

Ƭ **Subscription**: _object_

#### Type declaration

| Name          | Type         |
| :------------ | :----------- |
| `unsubscribe` | () => _void_ |

## Functions

### monomitter

▸ **monomitter**<T\>(`emitLatestOnSubscribe?`: _boolean_): [_Monomitter_](frontend_utils_monomitter.md#monomitter)<T\>

Constructs a new event emitter, whose purpose is to emit values of the given type.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name                    | Type      | Default value | Description                                                                                      |
| :---------------------- | :-------- | :------------ | :----------------------------------------------------------------------------------------------- |
| `emitLatestOnSubscribe` | _boolean_ | false         | if this is true, upon subscription immediately emit the most recently set value, if there is one |

**Returns:** [_Monomitter_](frontend_utils_monomitter.md#monomitter)<T\>
