# Class: AttribArray

[Frontend/Renderers/GameRenderer/WebGL/AttribArray](../modules/frontend_renderers_gamerenderer_webgl_attribarray.md).AttribArray

Helper class - essentially an implementation of ArrayList from Java, but using
typed JS Arrays so that we can efficiently write our WebGL data without converting.

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_webgl_attribarray.attribarray.md#constructor)

### Properties

- [array](frontend_renderers_gamerenderer_webgl_attribarray.attribarray.md#array)
- [size](frontend_renderers_gamerenderer_webgl_attribarray.attribarray.md#size)
- [type](frontend_renderers_gamerenderer_webgl_attribarray.attribarray.md#type)

### Methods

- [createArray](frontend_renderers_gamerenderer_webgl_attribarray.attribarray.md#createarray)
- [doubleLen](frontend_renderers_gamerenderer_webgl_attribarray.attribarray.md#doublelen)
- [set](frontend_renderers_gamerenderer_webgl_attribarray.attribarray.md#set)

## Constructors

### constructor

\+ **new AttribArray**(`type`: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md), `startSize?`: _number_): [_AttribArray_](frontend_renderers_gamerenderer_webgl_attribarray.attribarray.md)

#### Parameters

| Name        | Type                                                                               | Default value |
| :---------- | :--------------------------------------------------------------------------------- | :------------ |
| `type`      | [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md) | -             |
| `startSize` | _number_                                                                           | 4             |

**Returns:** [_AttribArray_](frontend_renderers_gamerenderer_webgl_attribarray.attribarray.md)

## Properties

### array

• **array**: [_GLArray_](../modules/frontend_renderers_gamerenderer_webgl_attribarray.md#glarray)

A typed array, representing the data in this array.

---

### size

• `Private` **size**: _number_

The number of bytes per data entry in this array.

---

### type

• `Private` **type**: [_AttribType_](../enums/frontend_renderers_gamerenderer_enginetypes.attribtype.md)

The WebGL data type that this array represents.

## Methods

### createArray

▸ `Private` **createArray**(): _void_

Initialize a new blank array of size this.size.

**Returns:** _void_

---

### doubleLen

▸ `Private` **doubleLen**(): _void_

Initialize a new array of 2x the length, and copy in the old data.

**Returns:** _void_

---

### set

▸ **set**(`els`: _ArrayLike_<number\>, `idx`: _number_): _void_

Copy in an array of data starting at an index. Writing past the maximum
array length will trigger doubleLen().

#### Parameters

| Name  | Type                 | Description                  |
| :---- | :------------------- | :--------------------------- |
| `els` | _ArrayLike_<number\> | The array of data to copy.   |
| `idx` | _number_             | The array index to start at. |

**Returns:** _void_
