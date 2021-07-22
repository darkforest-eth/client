# Class: default

[Frontend/Renderers/GameRenderer/WebGL/ProgramUtils](../modules/Frontend_Renderers_GameRenderer_WebGL_ProgramUtils.md).default

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_WebGL_ProgramUtils.default.md#constructor)

### Methods

- [createProgram](Frontend_Renderers_GameRenderer_WebGL_ProgramUtils.default.md#createprogram)
- [createShader](Frontend_Renderers_GameRenderer_WebGL_ProgramUtils.default.md#createshader)
- [programFromSources](Frontend_Renderers_GameRenderer_WebGL_ProgramUtils.default.md#programfromsources)

## Constructors

### constructor

• **new default**()

## Methods

### createProgram

▸ `Static` **createProgram**(`gl`, `vertexShader`, `fragShader`): `null` \| `WebGLProgram`

#### Parameters

| Name           | Type                     |
| :------------- | :----------------------- |
| `gl`           | `WebGL2RenderingContext` |
| `vertexShader` | `WebGLShader`            |
| `fragShader`   | `WebGLShader`            |

#### Returns

`null` \| `WebGLProgram`

---

### createShader

▸ `Static` **createShader**(`gl`, `type`, `source`): `null` \| `WebGLShader`

#### Parameters

| Name     | Type                     |
| :------- | :----------------------- |
| `gl`     | `WebGL2RenderingContext` |
| `type`   | `number`                 |
| `source` | `string`                 |

#### Returns

`null` \| `WebGLShader`

---

### programFromSources

▸ `Static` **programFromSources**(`gl`, `vertexShaderSource`, `fragShaderSource`): `null` \| `WebGLProgram`

#### Parameters

| Name                 | Type                     |
| :------------------- | :----------------------- |
| `gl`                 | `WebGL2RenderingContext` |
| `vertexShaderSource` | `string`                 |
| `fragShaderSource`   | `string`                 |

#### Returns

`null` \| `WebGLProgram`
