# Class: ArtifactRenderer

[Frontend/Renderers/Artifacts/ArtifactRenderer](../modules/frontend_renderers_artifacts_artifactrenderer.md).ArtifactRenderer

## Hierarchy

- [_WebGLManager_](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

  ↳ **ArtifactRenderer**

## Table of contents

### Constructors

- [constructor](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#constructor)

### Properties

- [artifacts](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#artifacts)
- [canvas](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#canvas)
- [frameRequestId](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#framerequestid)
- [gl](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#gl)
- [isDex](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#isdex)
- [projectionMatrix](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#projectionmatrix)
- [scroll](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#scroll)
- [spriteRenderer](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#spriterenderer)
- [visible](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#visible)

### Methods

- [clear](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#clear)
- [containsArtifact](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#containsartifact)
- [destroy](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#destroy)
- [draw](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#draw)
- [drawDex](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#drawdex)
- [drawList](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#drawlist)
- [getTexIdx](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#gettexidx)
- [loop](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#loop)
- [queueArtifactColumn](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#queueartifactcolumn)
- [queueRarityColumn](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#queueraritycolumn)
- [setArtifacts](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#setartifacts)
- [setIsDex](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#setisdex)
- [setProjectionMatrix](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#setprojectionmatrix)
- [setScroll](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#setscroll)
- [setVisible](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md#setvisible)

## Constructors

### constructor

\+ **new ArtifactRenderer**(`canvas`: HTMLCanvasElement, `isDex?`: _boolean_): [_ArtifactRenderer_](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md)

#### Parameters

| Name     | Type              | Default value |
| :------- | :---------------- | :------------ |
| `canvas` | HTMLCanvasElement | -             |
| `isDex`  | _boolean_         | true          |

**Returns:** [_ArtifactRenderer_](frontend_renderers_artifacts_artifactrenderer.artifactrenderer.md)

Overrides: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

## Properties

### artifacts

• `Private` **artifacts**: Artifact[]

---

### canvas

• **canvas**: HTMLCanvasElement

Inherited from: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md).[canvas](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#canvas)

---

### frameRequestId

• `Private` **frameRequestId**: _number_

---

### gl

• **gl**: WebGL2RenderingContext

Inherited from: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md).[gl](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#gl)

---

### isDex

• `Private` **isDex**: _boolean_

---

### projectionMatrix

• **projectionMatrix**: mat4

Inherited from: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md).[projectionMatrix](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md#projectionmatrix)

---

### scroll

• `Private` **scroll**: _number_= 0

---

### spriteRenderer

• `Private` **spriteRenderer**: [_SpriteRenderer_](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md)

---

### visible

• `Private` **visible**: _boolean_= false

## Methods

### clear

▸ **clear**(`bits?`: _number_, `color?`: [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec)): _void_

#### Parameters

| Name     | Type                                                                           |
| :------- | :----------------------------------------------------------------------------- |
| `bits?`  | _number_                                                                       |
| `color?` | [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec) |

**Returns:** _void_

Inherited from: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

---

### containsArtifact

▸ `Private` **containsArtifact**(`biome`: Biome, `rarity`: ArtifactRarity, `type`: ArtifactType): _boolean_

#### Parameters

| Name     | Type           |
| :------- | :------------- |
| `biome`  | Biome          |
| `rarity` | ArtifactRarity |
| `type`   | ArtifactType   |

**Returns:** _boolean_

---

### destroy

▸ **destroy**(): _void_

**Returns:** _void_

---

### draw

▸ `Private` **draw**(): _void_

**Returns:** _void_

---

### drawDex

▸ `Private` **drawDex**(): _void_

**Returns:** _void_

---

### drawList

▸ `Private` **drawList**(): _void_

**Returns:** _void_

---

### getTexIdx

▸ **getTexIdx**(): _number_

**Returns:** _number_

Inherited from: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

---

### loop

▸ `Private` **loop**(): _void_

**Returns:** _void_

---

### queueArtifactColumn

▸ `Private` **queueArtifactColumn**(`type`: ArtifactType, `rarity`: ArtifactRarity, `startX`: _number_): _void_

#### Parameters

| Name     | Type           |
| :------- | :------------- |
| `type`   | ArtifactType   |
| `rarity` | ArtifactRarity |
| `startX` | _number_       |

**Returns:** _void_

---

### queueRarityColumn

▸ `Private` **queueRarityColumn**(`rarity`: ArtifactRarity, `startX`: _number_): _void_

#### Parameters

| Name     | Type           |
| :------- | :------------- |
| `rarity` | ArtifactRarity |
| `startX` | _number_       |

**Returns:** _void_

---

### setArtifacts

▸ **setArtifacts**(`artifacts`: Artifact[]): _void_

#### Parameters

| Name        | Type       |
| :---------- | :--------- |
| `artifacts` | Artifact[] |

**Returns:** _void_

---

### setIsDex

▸ **setIsDex**(`isDex`: _boolean_): _void_

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `isDex` | _boolean_ |

**Returns:** _void_

---

### setProjectionMatrix

▸ **setProjectionMatrix**(): _void_

**Returns:** _void_

Inherited from: [WebGLManager](frontend_renderers_gamerenderer_webgl_webglmanager.webglmanager.md)

---

### setScroll

▸ **setScroll**(`scroll`: _number_): _void_

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `scroll` | _number_ |

**Returns:** _void_

---

### setVisible

▸ **setVisible**(`visible`: _boolean_): _void_

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `visible` | _boolean_ |

**Returns:** _void_
