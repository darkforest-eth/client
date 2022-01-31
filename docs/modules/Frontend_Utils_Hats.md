# Module: Frontend/Utils/Hats

## Table of contents

### Enumerations

- [HatType](../enums/Frontend_Utils_Hats.HatType.md)

### Type aliases

- [Hat](Frontend_Utils_Hats.md#hat)

### Variables

- [hats](Frontend_Utils_Hats.md#hats)

### Functions

- [hatFromType](Frontend_Utils_Hats.md#hatfromtype)
- [hatTypeFromHash](Frontend_Utils_Hats.md#hattypefromhash)

## Type aliases

### Hat

Ƭ **Hat**: `Object`

#### Type declaration

| Name          | Type       |
| :------------ | :--------- |
| `bottomLayer` | `string`[] |
| `topLayer`    | `string`[] |

## Variables

### hats

• `Const` **hats**: `Record`<[`HatType`](../enums/Frontend_Utils_Hats.HatType.md), [`Hat`](Frontend_Utils_Hats.md#hat)\>

## Functions

### hatFromType

▸ `Const` **hatFromType**(`type`): [`Hat`](Frontend_Utils_Hats.md#hat)

#### Parameters

| Name   | Type                                                 |
| :----- | :--------------------------------------------------- |
| `type` | [`HatType`](../enums/Frontend_Utils_Hats.HatType.md) |

#### Returns

[`Hat`](Frontend_Utils_Hats.md#hat)

---

### hatTypeFromHash

▸ `Const` **hatTypeFromHash**(`hash`): [`HatType`](../enums/Frontend_Utils_Hats.HatType.md)

#### Parameters

| Name   | Type         |
| :----- | :----------- |
| `hash` | `LocationId` |

#### Returns

[`HatType`](../enums/Frontend_Utils_Hats.HatType.md)
