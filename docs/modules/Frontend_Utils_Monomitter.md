# Module: Frontend/Utils/Monomitter

## Table of contents

### Type aliases

- [Callback](Frontend_Utils_Monomitter.md#callback)
- [Monomitter](Frontend_Utils_Monomitter.md#monomitter)
- [Subscription](Frontend_Utils_Monomitter.md#subscription)

### Functions

- [monomitter](Frontend_Utils_Monomitter.md#monomitter)

## Type aliases

### Callback

Ƭ **Callback**<`T`\>: (`o`: `T`) => `void`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Type declaration

▸ (`o`): `void`

Typed single pub / sub pattern, inspired by:
https://github.com/loilo/monomitter/blob/master/monomitter.mjs

##### Parameters

| Name | Type |
| :--- | :--- |
| `o`  | `T`  |

##### Returns

`void`

---

### Monomitter

Ƭ **Monomitter**<`T`\>: `Object`

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Type declaration

| Name        | Type                                                                                                                             |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `clear`     | () => `void`                                                                                                                     |
| `publish`   | (`o`: `T`) => `void`                                                                                                             |
| `subscribe` | (`cb`: [`Callback`](Frontend_Utils_Monomitter.md#callback)<`T`\>) => [`Subscription`](Frontend_Utils_Monomitter.md#subscription) |

---

### Subscription

Ƭ **Subscription**: `Object`

#### Type declaration

| Name          | Type         |
| :------------ | :----------- |
| `unsubscribe` | () => `void` |

## Functions

### monomitter

▸ **monomitter**<`T`\>(`emitLatestOnSubscribe?`): [`Monomitter`](Frontend_Utils_Monomitter.md#monomitter)<`T`\>

Constructs a new event emitter, whose purpose is to emit values of the given type.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name                    | Type      | Default value | Description                                                                                      |
| :---------------------- | :-------- | :------------ | :----------------------------------------------------------------------------------------------- |
| `emitLatestOnSubscribe` | `boolean` | `false`       | if this is true, upon subscription immediately emit the most recently set value, if there is one |

#### Returns

[`Monomitter`](Frontend_Utils_Monomitter.md#monomitter)<`T`\>
