# Class: default

[Frontend/Renderers/GameRenderer/WebGL/ProgramUtils](../modules/frontend_renderers_gamerenderer_webgl_programutils.md).default

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_webgl_programutils.default.md#constructor)

### Methods

- [createProgram](frontend_renderers_gamerenderer_webgl_programutils.default.md#createprogram)
- [createShader](frontend_renderers_gamerenderer_webgl_programutils.default.md#createshader)
- [programFromSources](frontend_renderers_gamerenderer_webgl_programutils.default.md#programfromsources)

## Constructors

### constructor

\+ **new default**(): [_default_](frontend_renderers_gamerenderer_webgl_programutils.default.md)

**Returns:** [_default_](frontend_renderers_gamerenderer_webgl_programutils.default.md)

## Methods

### createProgram

▸ `Static` **createProgram**(`gl`: WebGL2RenderingContext, `vertexShader`: WebGLShader, `fragShader`: WebGLShader): `null` \| WebGLProgram

#### Parameters

| Name           | Type                   |
| :------------- | :--------------------- |
| `gl`           | WebGL2RenderingContext |
| `vertexShader` | WebGLShader            |
| `fragShader`   | WebGLShader            |

**Returns:** `null` \| WebGLProgram

---

### createShader

▸ `Static` **createShader**(`gl`: WebGL2RenderingContext, `type`: _number_, `source`: _string_): `null` \| WebGLShader

#### Parameters

| Name     | Type                   |
| :------- | :--------------------- |
| `gl`     | WebGL2RenderingContext |
| `type`   | _number_               |
| `source` | _string_               |

**Returns:** `null` \| WebGLShader

---

### programFromSources

▸ `Static` **programFromSources**(`gl`: WebGL2RenderingContext, `vertexShaderSource`: _string_, `fragShaderSource`: _string_): `null` \| WebGLProgram

#### Parameters

| Name                 | Type                   |
| :------------------- | :--------------------- |
| `gl`                 | WebGL2RenderingContext |
| `vertexShaderSource` | _string_               |
| `fragShaderSource`   | _string_               |

**Returns:** `null` \| WebGLProgram
