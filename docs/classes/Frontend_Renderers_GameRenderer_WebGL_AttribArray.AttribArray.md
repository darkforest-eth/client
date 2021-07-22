# Class: AttribArray

[Frontend/Renderers/GameRenderer/WebGL/AttribArray](../modules/Frontend_Renderers_GameRenderer_WebGL_AttribArray.md).AttribArray

Helper class - essentially an implementation of ArrayList from Java, but using
typed JS Arrays so that we can efficiently write our WebGL data without converting.

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_WebGL_AttribArray.AttribArray.md#constructor)

### Properties

- [array](Frontend_Renderers_GameRenderer_WebGL_AttribArray.AttribArray.md#array)
- [size](Frontend_Renderers_GameRenderer_WebGL_AttribArray.AttribArray.md#size)
- [type](Frontend_Renderers_GameRenderer_WebGL_AttribArray.AttribArray.md#type)

### Methods

- [createArray](Frontend_Renderers_GameRenderer_WebGL_AttribArray.AttribArray.md#createarray)
- [doubleLen](Frontend_Renderers_GameRenderer_WebGL_AttribArray.AttribArray.md#doublelen)
- [set](Frontend_Renderers_GameRenderer_WebGL_AttribArray.AttribArray.md#set)

## Constructors

### constructor

• **new AttribArray**(`type`, `startSize?`)

#### Parameters

| Name        | Type                                                                               | Default value |
| :---------- | :--------------------------------------------------------------------------------- | :------------ |
| `type`      | [`AttribType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.AttribType.md) | `undefined`   |
| `startSize` | `number`                                                                           | `4`           |

## Properties

### array

• **array**: [`GLArray`](../modules/Frontend_Renderers_GameRenderer_WebGL_AttribArray.md#glarray)

A typed array, representing the data in this array.

---

### size

• `Private` **size**: `number`

The number of bytes per data entry in this array.

---

### type

• `Private` **type**: [`AttribType`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.AttribType.md)

The WebGL data type that this array represents.

## Methods

### createArray

▸ `Private` **createArray**(): `void`

Initialize a new blank array of size this.size.

#### Returns

`void`

---

### doubleLen

▸ `Private` **doubleLen**(): `void`

Initialize a new array of 2x the length, and copy in the old data.

#### Returns

`void`

---

### set

▸ **set**(`els`, `idx`): `void`

Copy in an array of data starting at an index. Writing past the maximum
array length will trigger doubleLen().

#### Parameters

| Name  | Type                   | Description                  |
| :---- | :--------------------- | :--------------------------- |
| `els` | `ArrayLike`<`number`\> | The array of data to copy.   |
| `idx` | `number`               | The array index to start at. |

#### Returns

`void`
