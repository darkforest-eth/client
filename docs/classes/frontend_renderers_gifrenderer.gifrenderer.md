# Class: GifRenderer

[Frontend/Renderers/GifRenderer](../modules/frontend_renderers_gifrenderer.md).GifRenderer

## Hierarchy

- [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

  ↳ **GifRenderer**

## Table of contents

### Constructors

- [constructor](frontend_renderers_gifrenderer.gifrenderer.md#constructor)

### Properties

- [artifactDim](frontend_renderers_gifrenderer.gifrenderer.md#artifactdim)
- [canvas](frontend_renderers_gifrenderer.gifrenderer.md#canvas)
- [canvasDim](frontend_renderers_gifrenderer.gifrenderer.md#canvasdim)
- [gl](frontend_renderers_gifrenderer.gifrenderer.md#gl)
- [margin](frontend_renderers_gifrenderer.gifrenderer.md#margin)
- [projectionMatrix](frontend_renderers_gifrenderer.gifrenderer.md#projectionmatrix)
- [resolution](frontend_renderers_gifrenderer.gifrenderer.md#resolution)
- [spriteRenderer](frontend_renderers_gifrenderer.gifrenderer.md#spriterenderer)
- [thumb](frontend_renderers_gifrenderer.gifrenderer.md#thumb)

### Methods

- [addAncient](frontend_renderers_gifrenderer.gifrenderer.md#addancient)
- [addBiomes](frontend_renderers_gifrenderer.gifrenderer.md#addbiomes)
- [addSprite](frontend_renderers_gifrenderer.gifrenderer.md#addsprite)
- [addVideo](frontend_renderers_gifrenderer.gifrenderer.md#addvideo)
- [clear](frontend_renderers_gifrenderer.gifrenderer.md#clear)
- [drawSprite](frontend_renderers_gifrenderer.gifrenderer.md#drawsprite)
- [getAll](frontend_renderers_gifrenderer.gifrenderer.md#getall)
- [getAllSprites](frontend_renderers_gifrenderer.gifrenderer.md#getallsprites)
- [getAllVideos](frontend_renderers_gifrenderer.gifrenderer.md#getallvideos)
- [getBase64](frontend_renderers_gifrenderer.gifrenderer.md#getbase64)
- [getFileName](frontend_renderers_gifrenderer.gifrenderer.md#getfilename)
- [getTexIdx](frontend_renderers_gifrenderer.gifrenderer.md#gettexidx)
- [setDim](frontend_renderers_gifrenderer.gifrenderer.md#setdim)
- [setProjectionMatrix](frontend_renderers_gifrenderer.gifrenderer.md#setprojectionmatrix)

## Constructors

### constructor

\+ **new GifRenderer**(`canvas`: HTMLCanvasElement, `dim`: _number_, `isThumb`: _boolean_): [_GifRenderer_](frontend_renderers_gifrenderer.gifrenderer.md)

#### Parameters

| Name      | Type              |
| :-------- | :---------------- |
| `canvas`  | HTMLCanvasElement |
| `dim`     | _number_          |
| `isThumb` | _boolean_         |

**Returns:** [_GifRenderer_](frontend_renderers_gifrenderer.gifrenderer.md)

Overrides: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

## Properties

### artifactDim

• `Private` **artifactDim**: _number_

---

### canvas

• **canvas**: HTMLCanvasElement

Inherited from: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md).[canvas](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#canvas)

---

### canvasDim

• `Private` **canvasDim**: _number_

---

### gl

• **gl**: WebGL2RenderingContext

Inherited from: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md).[gl](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#gl)

---

### margin

• `Private` **margin**: _number_

---

### projectionMatrix

• **projectionMatrix**: mat4

Overrides: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md).[projectionMatrix](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#projectionmatrix)

---

### resolution

• `Private` **resolution**: _number_

---

### spriteRenderer

• `Private` **spriteRenderer**: [_SpriteRenderer_](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md)

---

### thumb

• `Private` **thumb**: _boolean_

## Methods

### addAncient

▸ `Private` **addAncient**(`videoMode`: _boolean_, `dir`: _JSZip_): _Promise_<void\>

#### Parameters

| Name        | Type      |
| :---------- | :-------- |
| `videoMode` | _boolean_ |
| `dir`       | _JSZip_   |

**Returns:** _Promise_<void\>

---

### addBiomes

▸ `Private` **addBiomes**(`videoMode`: _boolean_, `dir`: _JSZip_): _Promise_<void\>

#### Parameters

| Name        | Type      |
| :---------- | :-------- |
| `videoMode` | _boolean_ |
| `dir`       | _JSZip_   |

**Returns:** _Promise_<void\>

---

### addSprite

▸ `Private` **addSprite**(`dir`: _JSZip_, `type`: ArtifactType, `biome`: Biome, `rarity`: ArtifactRarity, `ancient?`: _boolean_): _void_

#### Parameters

| Name      | Type           | Default value |
| :-------- | :------------- | :------------ |
| `dir`     | _JSZip_        | -             |
| `type`    | ArtifactType   | -             |
| `biome`   | Biome          | -             |
| `rarity`  | ArtifactRarity | -             |
| `ancient` | _boolean_      | false         |

**Returns:** _void_

---

### addVideo

▸ `Private` **addVideo**(`dir`: _JSZip_, `type`: ArtifactType, `biome`: Biome, `rarity`: ArtifactRarity, `ancient?`: _boolean_): _Promise_<void\>

#### Parameters

| Name      | Type           | Default value |
| :-------- | :------------- | :------------ |
| `dir`     | _JSZip_        | -             |
| `type`    | ArtifactType   | -             |
| `biome`   | Biome          | -             |
| `rarity`  | ArtifactRarity | -             |
| `ancient` | _boolean_      | false         |

**Returns:** _Promise_<void\>

---

### clear

▸ **clear**(): _void_

**Returns:** _void_

Overrides: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

---

### drawSprite

▸ `Private` **drawSprite**(`artifact`: Artifact, `atFrame?`: _undefined_ \| _number_): _void_

#### Parameters

| Name       | Type                    |
| :--------- | :---------------------- |
| `artifact` | Artifact                |
| `atFrame`  | _undefined_ \| _number_ |

**Returns:** _void_

---

### getAll

▸ `Private` **getAll**(`videoMode?`: _boolean_): _Promise_<void\>

#### Parameters

| Name        | Type      | Default value |
| :---------- | :-------- | :------------ |
| `videoMode` | _boolean_ | false         |

**Returns:** _Promise_<void\>

---

### getAllSprites

▸ **getAllSprites**(): _void_

**Returns:** _void_

---

### getAllVideos

▸ **getAllVideos**(): _void_

**Returns:** _void_

---

### getBase64

▸ `Private` **getBase64**(): _string_

**Returns:** _string_

---

### getFileName

▸ `Private` **getFileName**(`video`: _boolean_, `type`: ArtifactType, `biome`: Biome, `rarity`: ArtifactRarity, `ancient`: _boolean_): _string_

#### Parameters

| Name      | Type           |
| :-------- | :------------- |
| `video`   | _boolean_      |
| `type`    | ArtifactType   |
| `biome`   | Biome          |
| `rarity`  | ArtifactRarity |
| `ancient` | _boolean_      |

**Returns:** _string_

---

### getTexIdx

▸ **getTexIdx**(): _number_

**Returns:** _number_

Inherited from: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

---

### setDim

▸ `Private` **setDim**(`dim`: _number_): _void_

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `dim` | _number_ |

**Returns:** _void_

---

### setProjectionMatrix

▸ **setProjectionMatrix**(): _void_

**Returns:** _void_

Inherited from: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)
