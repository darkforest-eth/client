# Class: default

[Frontend/Renderers/GameRenderer/WebGL/AttribManager](../modules/frontend_renderers_gamerenderer_webgl_attribmanager.md).default

Responsible for queuing data about a webgl attribute and then writing to it.
Does this by maintaining a persistent AttribArray and WebGLBuffer reference,
and then calling bufferData on n vertices at a time. Allows us to upload
whole arrays of objects at once, providing speed boost.

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_webgl_attribmanager.default.md#constructor)

### Properties

- [attribArray](frontend_renderers_gamerenderer_webgl_attribmanager.default.md#attribarray)
- [buffer](frontend_renderers_gamerenderer_webgl_attribmanager.default.md#buffer)
- [gl](frontend_renderers_gamerenderer_webgl_attribmanager.default.md#gl)
- [loc](frontend_renderers_gamerenderer_webgl_attribmanager.default.md#loc)
- [props](frontend_renderers_gamerenderer_webgl_attribmanager.default.md#props)

### Methods

- [bufferData](frontend_renderers_gamerenderer_webgl_attribmanager.default.md#bufferdata)
- [setVertex](frontend_renderers_gamerenderer_webgl_attribmanager.default.md#setvertex)

## Constructors

### constructor

\+ **new default**(`gl`: WebGL2RenderingContext, `program`: WebGLProgram, `props`: [_AttribProps_](../modules/frontend_renderers_gamerenderer_enginetypes.md#attribprops), `enable?`: _boolean_): [_default_](frontend_renderers_gamerenderer_webgl_attribmanager.default.md)

For a given attribute on a program on a context, create an AttribManager.

#### Parameters

| Name      | Type                                                                                   | Default value | Description                                                       |
| :-------- | :------------------------------------------------------------------------------------- | :------------ | :---------------------------------------------------------------- |
| `gl`      | WebGL2RenderingContext                                                                 | -             | The WebGL context to generate this attrib on.                     |
| `program` | WebGLProgram                                                                           | -             | The program corresponding to this attrib.                         |
| `props`   | [_AttribProps_](../modules/frontend_renderers_gamerenderer_enginetypes.md#attribprops) | -             | An AttribProps object, containing the attrib name and other info. |
| `enable`  | _boolean_                                                                              | true          | Should we call gl.enableVertexAttribArray? (default true)         |

**Returns:** [_default_](frontend_renderers_gamerenderer_webgl_attribmanager.default.md)

## Properties

### attribArray

• `Private` **attribArray**: [_AttribArray_](frontend_renderers_gamerenderer_webgl_attribarray.attribarray.md)

An internally managed AttribArray, which is a typed mutable array.

---

### buffer

• `Private` **buffer**: WebGLBuffer

The WebGLBuffer associated with this attribute.

---

### gl

• `Private` **gl**: WebGL2RenderingContext

The WebGL rendering context.

---

### loc

• `Private` **loc**: _number_

Attrib loc, returned by gl.getAttribLocation().

---

### props

• `Private` **props**: [_AttribProps_](../modules/frontend_renderers_gamerenderer_enginetypes.md#attribprops)

AttribProps object for this attribute, containing name, dimension, and more.

## Methods

### bufferData

▸ **bufferData**(`n`: _number_): _void_

Send vertices [0, n - 1] through the buffer - bufferData(1) will send one vertex (only vertex #0)

#### Parameters

| Name | Type     | Description                                        |
| :--- | :------- | :------------------------------------------------- |
| `n`  | _number_ | The number of vertices to send through the buffer. |

**Returns:** _void_

---

### setVertex

▸ **setVertex**(`els`: _number_[], `idx`: _number_): _void_

Set vertices starting from vertex #idx - writing to vertex #0 will write to the first vertex.

Note that you can write multiple vertices at once - if you write a 6-long array into a 2D
attribute at vertex 0, you will write 3 vertices at once.

#### Parameters

| Name  | Type       | Description                          |
| :---- | :--------- | :----------------------------------- |
| `els` | _number_[] | The data to write into the vertices. |
| `idx` | _number_   | The starting vertex # to write to.   |

**Returns:** _void_
