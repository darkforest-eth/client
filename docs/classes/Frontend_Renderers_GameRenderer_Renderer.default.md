# Class: default

[Frontend/Renderers/GameRenderer/Renderer](../modules/Frontend_Renderers_GameRenderer_Renderer.md).default

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_Renderer.default.md#constructor)

### Properties

- [asteroidRenderer](Frontend_Renderers_GameRenderer_Renderer.default.md#asteroidrenderer)
- [beltRenderer](Frontend_Renderers_GameRenderer_Renderer.default.md#beltrenderer)
- [bgRenderer](Frontend_Renderers_GameRenderer_Renderer.default.md#bgrenderer)
- [blackDomainRenderer](Frontend_Renderers_GameRenderer_Renderer.default.md#blackdomainrenderer)
- [bufferCanvas](Frontend_Renderers_GameRenderer_Renderer.default.md#buffercanvas)
- [canvas](Frontend_Renderers_GameRenderer_Renderer.default.md#canvas)
- [circleRenderer](Frontend_Renderers_GameRenderer_Renderer.default.md#circlerenderer)
- [frameCount](Frontend_Renderers_GameRenderer_Renderer.default.md#framecount)
- [frameRequestId](Frontend_Renderers_GameRenderer_Renderer.default.md#framerequestid)
- [gameUIManager](Frontend_Renderers_GameRenderer_Renderer.default.md#gameuimanager)
- [glCanvas](Frontend_Renderers_GameRenderer_Renderer.default.md#glcanvas)
- [glManager](Frontend_Renderers_GameRenderer_Renderer.default.md#glmanager)
- [lineRenderer](Frontend_Renderers_GameRenderer_Renderer.default.md#linerenderer)
- [mineRenderer](Frontend_Renderers_GameRenderer_Renderer.default.md#minerenderer)
- [now](Frontend_Renderers_GameRenderer_Renderer.default.md#now)
- [overlay2dRenderer](Frontend_Renderers_GameRenderer_Renderer.default.md#overlay2drenderer)
- [planetRenderManager](Frontend_Renderers_GameRenderer_Renderer.default.md#planetrendermanager)
- [planetRenderer](Frontend_Renderers_GameRenderer_Renderer.default.md#planetrenderer)
- [previousRenderTimestamp](Frontend_Renderers_GameRenderer_Renderer.default.md#previousrendertimestamp)
- [quasarRenderer](Frontend_Renderers_GameRenderer_Renderer.default.md#quasarrenderer)
- [rectRenderer](Frontend_Renderers_GameRenderer_Renderer.default.md#rectrenderer)
- [ringRenderer](Frontend_Renderers_GameRenderer_Renderer.default.md#ringrenderer)
- [ruinsRenderer](Frontend_Renderers_GameRenderer_Renderer.default.md#ruinsrenderer)
- [spacetimeRipRenderer](Frontend_Renderers_GameRenderer_Renderer.default.md#spacetimeriprenderer)
- [spriteRenderer](Frontend_Renderers_GameRenderer_Renderer.default.md#spriterenderer)
- [textRenderer](Frontend_Renderers_GameRenderer_Renderer.default.md#textrenderer)
- [uiRenderManager](Frontend_Renderers_GameRenderer_Renderer.default.md#uirendermanager)
- [voyageRenderManager](Frontend_Renderers_GameRenderer_Renderer.default.md#voyagerendermanager)
- [wormholeRenderManager](Frontend_Renderers_GameRenderer_Renderer.default.md#wormholerendermanager)
- [instance](Frontend_Renderers_GameRenderer_Renderer.default.md#instance)

### Methods

- [draw](Frontend_Renderers_GameRenderer_Renderer.default.md#draw)
- [loop](Frontend_Renderers_GameRenderer_Renderer.default.md#loop)
- [recordRender](Frontend_Renderers_GameRenderer_Renderer.default.md#recordrender)
- [setup](Frontend_Renderers_GameRenderer_Renderer.default.md#setup)
- [destroy](Frontend_Renderers_GameRenderer_Renderer.default.md#destroy)
- [initialize](Frontend_Renderers_GameRenderer_Renderer.default.md#initialize)

## Constructors

### constructor

• `Private` **new default**(`canvas`, `glCanvas`, `bufferCanvas`, `gameUIManager`)

#### Parameters

| Name            | Type                                                    |
| :-------------- | :------------------------------------------------------ |
| `canvas`        | `HTMLCanvasElement`                                     |
| `glCanvas`      | `HTMLCanvasElement`                                     |
| `bufferCanvas`  | `HTMLCanvasElement`                                     |
| `gameUIManager` | [`default`](Backend_GameLogic_GameUIManager.default.md) |

## Properties

### asteroidRenderer

• **asteroidRenderer**: [`default`](Frontend_Renderers_GameRenderer_Entities_AsteroidRenderer.default.md)

---

### beltRenderer

• **beltRenderer**: [`default`](Frontend_Renderers_GameRenderer_Entities_BeltRenderer.default.md)

---

### bgRenderer

• **bgRenderer**: [`default`](Frontend_Renderers_GameRenderer_Entities_BackgroundRenderer.default.md)

---

### blackDomainRenderer

• **blackDomainRenderer**: [`default`](Frontend_Renderers_GameRenderer_Entities_BlackDomainRenderer.default.md)

---

### bufferCanvas

• **bufferCanvas**: `HTMLCanvasElement`

---

### canvas

• **canvas**: `HTMLCanvasElement`

---

### circleRenderer

• **circleRenderer**: [`default`](Frontend_Renderers_GameRenderer_Entities_CircleRenderer.default.md)

---

### frameCount

• **frameCount**: `number`

---

### frameRequestId

• **frameRequestId**: `number`

---

### gameUIManager

• **gameUIManager**: [`default`](Backend_GameLogic_GameUIManager.default.md)

---

### glCanvas

• **glCanvas**: `HTMLCanvasElement`

---

### glManager

• **glManager**: [`GameGLManager`](Frontend_Renderers_GameRenderer_WebGL_GameGLManager.GameGLManager.md)

---

### lineRenderer

• **lineRenderer**: [`default`](Frontend_Renderers_GameRenderer_Entities_LineRenderer.default.md)

---

### mineRenderer

• **mineRenderer**: [`MineRenderer`](Frontend_Renderers_GameRenderer_Entities_MineRenderer.MineRenderer.md)

---

### now

• **now**: `number`

---

### overlay2dRenderer

• **overlay2dRenderer**: [`default`](Frontend_Renderers_GameRenderer_Overlay2DRenderer.default.md)

---

### planetRenderManager

• **planetRenderManager**: [`default`](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md)

---

### planetRenderer

• **planetRenderer**: [`default`](Frontend_Renderers_GameRenderer_Entities_PlanetRenderer.default.md)

---

### previousRenderTimestamp

• `Private` **previousRenderTimestamp**: `number`

---

### quasarRenderer

• **quasarRenderer**: [`QuasarRenderer`](Frontend_Renderers_GameRenderer_Entities_QuasarRenderer.QuasarRenderer.md)

---

### rectRenderer

• **rectRenderer**: [`default`](Frontend_Renderers_GameRenderer_Entities_RectRenderer.default.md)

---

### ringRenderer

• **ringRenderer**: [`default`](Frontend_Renderers_GameRenderer_Entities_RingRenderer.default.md)

---

### ruinsRenderer

• **ruinsRenderer**: [`RuinsRenderer`](Frontend_Renderers_GameRenderer_Entities_RuinsRenderer.RuinsRenderer.md)

---

### spacetimeRipRenderer

• **spacetimeRipRenderer**: [`SpacetimeRipRenderer`](Frontend_Renderers_GameRenderer_Entities_SpacetimeRipRenderer.SpacetimeRipRenderer.md)

---

### spriteRenderer

• **spriteRenderer**: [`SpriteRenderer`](Frontend_Renderers_GameRenderer_Entities_SpriteRenderer.SpriteRenderer.md)

---

### textRenderer

• **textRenderer**: [`default`](Frontend_Renderers_GameRenderer_Entities_TextRenderer.default.md)

---

### uiRenderManager

• **uiRenderManager**: [`UIRenderer`](Frontend_Renderers_GameRenderer_UIRenderer.UIRenderer.md)

---

### voyageRenderManager

• **voyageRenderManager**: [`default`](Frontend_Renderers_GameRenderer_Entities_VoyageRenderer.default.md)

---

### wormholeRenderManager

• **wormholeRenderManager**: [`WormholeRenderer`](Frontend_Renderers_GameRenderer_Entities_WormholeRenderer.WormholeRenderer.md)

---

### instance

▪ `Static` **instance**: `null` \| [`default`](Frontend_Renderers_GameRenderer_Renderer.default.md)

## Methods

### draw

▸ `Private` **draw**(): `void`

#### Returns

`void`

---

### loop

▸ `Private` **loop**(): `void`

#### Returns

`void`

---

### recordRender

▸ `Private` **recordRender**(`now`): `void`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `now` | `number` |

#### Returns

`void`

---

### setup

▸ `Private` **setup**(): `void`

#### Returns

`void`

---

### destroy

▸ `Static` **destroy**(): `void`

#### Returns

`void`

---

### initialize

▸ `Static` **initialize**(`canvas`, `glCanvas`, `bufferCanvas`, `gameUIManager`): [`default`](Frontend_Renderers_GameRenderer_Renderer.default.md)

#### Parameters

| Name            | Type                                                    |
| :-------------- | :------------------------------------------------------ |
| `canvas`        | `HTMLCanvasElement`                                     |
| `glCanvas`      | `HTMLCanvasElement`                                     |
| `bufferCanvas`  | `HTMLCanvasElement`                                     |
| `gameUIManager` | [`default`](Backend_GameLogic_GameUIManager.default.md) |

#### Returns

[`default`](Frontend_Renderers_GameRenderer_Renderer.default.md)
