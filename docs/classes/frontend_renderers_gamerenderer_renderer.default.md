# Class: default

[Frontend/Renderers/GameRenderer/Renderer](../modules/frontend_renderers_gamerenderer_renderer.md).default

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_renderer.default.md#constructor)

### Properties

- [asteroidRenderer](frontend_renderers_gamerenderer_renderer.default.md#asteroidrenderer)
- [beltRenderer](frontend_renderers_gamerenderer_renderer.default.md#beltrenderer)
- [bgRenderer](frontend_renderers_gamerenderer_renderer.default.md#bgrenderer)
- [blackDomainRenderer](frontend_renderers_gamerenderer_renderer.default.md#blackdomainrenderer)
- [bufferCanvas](frontend_renderers_gamerenderer_renderer.default.md#buffercanvas)
- [canvas](frontend_renderers_gamerenderer_renderer.default.md#canvas)
- [circleRenderer](frontend_renderers_gamerenderer_renderer.default.md#circlerenderer)
- [frameCount](frontend_renderers_gamerenderer_renderer.default.md#framecount)
- [frameRequestId](frontend_renderers_gamerenderer_renderer.default.md#framerequestid)
- [gameUIManager](frontend_renderers_gamerenderer_renderer.default.md#gameuimanager)
- [glCanvas](frontend_renderers_gamerenderer_renderer.default.md#glcanvas)
- [glManager](frontend_renderers_gamerenderer_renderer.default.md#glmanager)
- [lineRenderer](frontend_renderers_gamerenderer_renderer.default.md#linerenderer)
- [mineRenderer](frontend_renderers_gamerenderer_renderer.default.md#minerenderer)
- [now](frontend_renderers_gamerenderer_renderer.default.md#now)
- [overlay2dRenderer](frontend_renderers_gamerenderer_renderer.default.md#overlay2drenderer)
- [planetRenderManager](frontend_renderers_gamerenderer_renderer.default.md#planetrendermanager)
- [planetRenderer](frontend_renderers_gamerenderer_renderer.default.md#planetrenderer)
- [previousRenderTimestamp](frontend_renderers_gamerenderer_renderer.default.md#previousrendertimestamp)
- [quasarRenderer](frontend_renderers_gamerenderer_renderer.default.md#quasarrenderer)
- [rectRenderer](frontend_renderers_gamerenderer_renderer.default.md#rectrenderer)
- [ringRenderer](frontend_renderers_gamerenderer_renderer.default.md#ringrenderer)
- [ruinsRenderer](frontend_renderers_gamerenderer_renderer.default.md#ruinsrenderer)
- [spacetimeRipRenderer](frontend_renderers_gamerenderer_renderer.default.md#spacetimeriprenderer)
- [spriteRenderer](frontend_renderers_gamerenderer_renderer.default.md#spriterenderer)
- [textRenderer](frontend_renderers_gamerenderer_renderer.default.md#textrenderer)
- [uiRenderManager](frontend_renderers_gamerenderer_renderer.default.md#uirendermanager)
- [voyageRenderManager](frontend_renderers_gamerenderer_renderer.default.md#voyagerendermanager)
- [wormholeRenderManager](frontend_renderers_gamerenderer_renderer.default.md#wormholerendermanager)
- [instance](frontend_renderers_gamerenderer_renderer.default.md#instance)

### Methods

- [draw](frontend_renderers_gamerenderer_renderer.default.md#draw)
- [loop](frontend_renderers_gamerenderer_renderer.default.md#loop)
- [recordRender](frontend_renderers_gamerenderer_renderer.default.md#recordrender)
- [setup](frontend_renderers_gamerenderer_renderer.default.md#setup)
- [destroy](frontend_renderers_gamerenderer_renderer.default.md#destroy)
- [initialize](frontend_renderers_gamerenderer_renderer.default.md#initialize)

## Constructors

### constructor

\+ `Private` **new default**(`canvas`: HTMLCanvasElement, `glCanvas`: HTMLCanvasElement, `bufferCanvas`: HTMLCanvasElement, `gameUIManager`: [_default_](backend_gamelogic_gameuimanager.default.md)): [_default_](frontend_renderers_gamerenderer_renderer.default.md)

#### Parameters

| Name            | Type                                                    |
| :-------------- | :------------------------------------------------------ |
| `canvas`        | HTMLCanvasElement                                       |
| `glCanvas`      | HTMLCanvasElement                                       |
| `bufferCanvas`  | HTMLCanvasElement                                       |
| `gameUIManager` | [_default_](backend_gamelogic_gameuimanager.default.md) |

**Returns:** [_default_](frontend_renderers_gamerenderer_renderer.default.md)

## Properties

### asteroidRenderer

• **asteroidRenderer**: [_default_](frontend_renderers_gamerenderer_entities_asteroidrenderer.default.md)

---

### beltRenderer

• **beltRenderer**: [_default_](frontend_renderers_gamerenderer_entities_beltrenderer.default.md)

---

### bgRenderer

• **bgRenderer**: [_default_](frontend_renderers_gamerenderer_entities_backgroundrenderer.default.md)

---

### blackDomainRenderer

• **blackDomainRenderer**: [_default_](frontend_renderers_gamerenderer_entities_blackdomainrenderer.default.md)

---

### bufferCanvas

• **bufferCanvas**: HTMLCanvasElement

---

### canvas

• **canvas**: HTMLCanvasElement

---

### circleRenderer

• **circleRenderer**: [_default_](frontend_renderers_gamerenderer_entities_circlerenderer.default.md)

---

### frameCount

• **frameCount**: _number_

---

### frameRequestId

• **frameRequestId**: _number_

---

### gameUIManager

• **gameUIManager**: [_default_](backend_gamelogic_gameuimanager.default.md)

---

### glCanvas

• **glCanvas**: HTMLCanvasElement

---

### glManager

• **glManager**: [_GameGLManager_](frontend_renderers_gamerenderer_webgl_gameglmanager.gameglmanager.md)

---

### lineRenderer

• **lineRenderer**: [_default_](frontend_renderers_gamerenderer_entities_linerenderer.default.md)

---

### mineRenderer

• **mineRenderer**: [_MineRenderer_](frontend_renderers_gamerenderer_entities_minerenderer.minerenderer.md)

---

### now

• **now**: _number_

---

### overlay2dRenderer

• **overlay2dRenderer**: [_default_](frontend_renderers_gamerenderer_overlay2drenderer.default.md)

---

### planetRenderManager

• **planetRenderManager**: [_default_](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md)

---

### planetRenderer

• **planetRenderer**: [_default_](frontend_renderers_gamerenderer_entities_planetrenderer.default.md)

---

### previousRenderTimestamp

• `Private` **previousRenderTimestamp**: _number_

---

### quasarRenderer

• **quasarRenderer**: [_QuasarRenderer_](frontend_renderers_gamerenderer_entities_quasarrenderer.quasarrenderer.md)

---

### rectRenderer

• **rectRenderer**: [_default_](frontend_renderers_gamerenderer_entities_rectrenderer.default.md)

---

### ringRenderer

• **ringRenderer**: [_default_](frontend_renderers_gamerenderer_entities_ringrenderer.default.md)

---

### ruinsRenderer

• **ruinsRenderer**: [_RuinsRenderer_](frontend_renderers_gamerenderer_entities_ruinsrenderer.ruinsrenderer.md)

---

### spacetimeRipRenderer

• **spacetimeRipRenderer**: [_SpacetimeRipRenderer_](frontend_renderers_gamerenderer_entities_spacetimeriprenderer.spacetimeriprenderer.md)

---

### spriteRenderer

• **spriteRenderer**: [_SpriteRenderer_](frontend_renderers_gamerenderer_entities_spriterenderer.spriterenderer.md)

---

### textRenderer

• **textRenderer**: [_default_](frontend_renderers_gamerenderer_entities_textrenderer.default.md)

---

### uiRenderManager

• **uiRenderManager**: [_UIRenderer_](frontend_renderers_gamerenderer_uirenderer.uirenderer.md)

---

### voyageRenderManager

• **voyageRenderManager**: [_default_](frontend_renderers_gamerenderer_entities_voyagerenderer.default.md)

---

### wormholeRenderManager

• **wormholeRenderManager**: [_WormholeRenderer_](frontend_renderers_gamerenderer_entities_wormholerenderer.wormholerenderer.md)

---

### instance

▪ `Static` **instance**: `null` \| [_default_](frontend_renderers_gamerenderer_renderer.default.md)

## Methods

### draw

▸ `Private` **draw**(): _void_

**Returns:** _void_

---

### loop

▸ `Private` **loop**(): _void_

**Returns:** _void_

---

### recordRender

▸ `Private` **recordRender**(`now`: _number_): _void_

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `now` | _number_ |

**Returns:** _void_

---

### setup

▸ `Private` **setup**(): _void_

**Returns:** _void_

---

### destroy

▸ `Static` **destroy**(): _void_

**Returns:** _void_

---

### initialize

▸ `Static` **initialize**(`canvas`: HTMLCanvasElement, `glCanvas`: HTMLCanvasElement, `bufferCanvas`: HTMLCanvasElement, `gameUIManager`: [_default_](backend_gamelogic_gameuimanager.default.md)): [_default_](frontend_renderers_gamerenderer_renderer.default.md)

#### Parameters

| Name            | Type                                                    |
| :-------------- | :------------------------------------------------------ |
| `canvas`        | HTMLCanvasElement                                       |
| `glCanvas`      | HTMLCanvasElement                                       |
| `bufferCanvas`  | HTMLCanvasElement                                       |
| `gameUIManager` | [_default_](backend_gamelogic_gameuimanager.default.md) |

**Returns:** [_default_](frontend_renderers_gamerenderer_renderer.default.md)
