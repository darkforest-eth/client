# Module: Frontend/Utils/Hats

## Table of contents

### Enumerations

- [HatType](../enums/frontend_utils_hats.hattype.md)

### Type aliases

- [Hat](frontend_utils_hats.md#hat)

### Variables

- [hats](frontend_utils_hats.md#hats)

### Functions

- [hatFromType](frontend_utils_hats.md#hatfromtype)
- [hatTypeFromHash](frontend_utils_hats.md#hattypefromhash)

## Type aliases

### Hat

Ƭ **Hat**: _object_

#### Type declaration

| Name          | Type       |
| :------------ | :--------- |
| `bottomLayer` | _string_[] |
| `topLayer`    | _string_[] |

## Variables

### hats

• `Const` **hats**: _Record_<[_HatType_](../enums/frontend_utils_hats.hattype.md), [_Hat_](frontend_utils_hats.md#hat)\>

## Functions

### hatFromType

▸ `Const` **hatFromType**(`type`: [_HatType_](../enums/frontend_utils_hats.hattype.md)): [_Hat_](frontend_utils_hats.md#hat)

#### Parameters

| Name   | Type                                                 |
| :----- | :--------------------------------------------------- |
| `type` | [_HatType_](../enums/frontend_utils_hats.hattype.md) |

**Returns:** [_Hat_](frontend_utils_hats.md#hat)

---

### hatTypeFromHash

▸ `Const` **hatTypeFromHash**(`hash`: LocationId): [_HatType_](../enums/frontend_utils_hats.hattype.md)

#### Parameters

| Name   | Type       |
| :----- | :--------- |
| `hash` | LocationId |

**Returns:** [_HatType_](../enums/frontend_utils_hats.hattype.md)
