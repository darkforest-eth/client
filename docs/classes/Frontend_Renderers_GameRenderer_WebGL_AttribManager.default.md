# Class: default

[Frontend/Renderers/GameRenderer/WebGL/AttribManager](../modules/Frontend_Renderers_GameRenderer_WebGL_AttribManager.md).default

Responsible for queuing data about a webgl attribute and then writing to it.
Does this by maintaining a persistent AttribArray and WebGLBuffer reference,
and then calling bufferData on n vertices at a time. Allows us to upload
whole arrays of objects at once, providing speed boost.

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_WebGL_AttribManager.default.md#constructor)

### Properties

- [attribArray](Frontend_Renderers_GameRenderer_WebGL_AttribManager.default.md#attribarray)
- [buffer](Frontend_Renderers_GameRenderer_WebGL_AttribManager.default.md#buffer)
- [gl](Frontend_Renderers_GameRenderer_WebGL_AttribManager.default.md#gl)
- [loc](Frontend_Renderers_GameRenderer_WebGL_AttribManager.default.md#loc)
- [props](Frontend_Renderers_GameRenderer_WebGL_AttribManager.default.md#props)

### Methods

- [bufferData](Frontend_Renderers_GameRenderer_WebGL_AttribManager.default.md#bufferdata)
- [setVertex](Frontend_Renderers_GameRenderer_WebGL_AttribManager.default.md#setvertex)

## Constructors

### constructor

• **new default**(`gl`, `program`, `props`, `enable?`)

For a given attribute on a program on a context, create an AttribManager.

#### Parameters

| Name      | Type                                                                                   | Default value | Description                                                       |
| :-------- | :------------------------------------------------------------------------------------- | :------------ | :---------------------------------------------------------------- |
| `gl`      | `WebGL2RenderingContext`                                                               | `undefined`   | The WebGL context to generate this attrib on.                     |
| `program` | `WebGLProgram`                                                                         | `undefined`   | The program corresponding to this attrib.                         |
| `props`   | [`AttribProps`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#attribprops) | `undefined`   | An AttribProps object, containing the attrib name and other info. |
| `enable`  | `boolean`                                                                              | `true`        | Should we call gl.enableVertexAttribArray? (default true)         |

## Properties

### attribArray

• `Private` **attribArray**: [`AttribArray`](Frontend_Renderers_GameRenderer_WebGL_AttribArray.AttribArray.md)

An internally managed AttribArray, which is a typed mutable array.

---

### buffer

• `Private` **buffer**: `WebGLBuffer`

The WebGLBuffer associated with this attribute.

---

### gl

• `Private` **gl**: `WebGL2RenderingContext`

The WebGL rendering context.

---

### loc

• `Private` **loc**: `number`

Attrib loc, returned by gl.getAttribLocation().

---

### props

• `Private` **props**: [`AttribProps`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#attribprops)

AttribProps object for this attribute, containing name, dimension, and more.

## Methods

### bufferData

▸ **bufferData**(`n`): `void`

Send vertices [0, n - 1] through the buffer - bufferData(1) will send one vertex (only vertex #0)

#### Parameters

| Name | Type     | Description                                        |
| :--- | :------- | :------------------------------------------------- |
| `n`  | `number` | The number of vertices to send through the buffer. |

#### Returns

`void`

---

### setVertex

▸ **setVertex**(`els`, `idx`): `void`

Set vertices starting from vertex #idx - writing to vertex #0 will write to the first vertex.

Note that you can write multiple vertices at once - if you write a 6-long array into a 2D
attribute at vertex 0, you will write 3 vertices at once.

#### Parameters

| Name  | Type       | Description                          |
| :---- | :--------- | :----------------------------------- |
| `els` | `number`[] | The data to write into the vertices. |
| `idx` | `number`   | The starting vertex # to write to.   |

#### Returns

`void`
