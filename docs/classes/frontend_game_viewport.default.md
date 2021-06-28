# Class: default

[Frontend/Game/Viewport](../modules/frontend_game_viewport.md).default

## Table of contents

### Constructors

- [constructor](frontend_game_viewport.default.md#constructor)

### Properties

- [animationManager](frontend_game_viewport.default.md#animationmanager)
- [canvas](frontend_game_viewport.default.md#canvas)
- [centerWorldCoords](frontend_game_viewport.default.md#centerworldcoords)
- [frameRequestId](frontend_game_viewport.default.md#framerequestid)
- [gameUIManager](frontend_game_viewport.default.md#gameuimanager)
- [heightInWorldUnits](frontend_game_viewport.default.md#heightinworldunits)
- [intervalId](frontend_game_viewport.default.md#intervalid)
- [isFirefox](frontend_game_viewport.default.md#isfirefox)
- [isPanning](frontend_game_viewport.default.md#ispanning)
- [isSending](frontend_game_viewport.default.md#issending)
- [momentum](frontend_game_viewport.default.md#momentum)
- [mouseLastCoords](frontend_game_viewport.default.md#mouselastcoords)
- [mouseSensitivity](frontend_game_viewport.default.md#mousesensitivity)
- [mousedownCoords](frontend_game_viewport.default.md#mousedowncoords)
- [scale](frontend_game_viewport.default.md#scale)
- [velocity](frontend_game_viewport.default.md#velocity)
- [viewportHeight](frontend_game_viewport.default.md#viewportheight)
- [viewportWidth](frontend_game_viewport.default.md#viewportwidth)
- [widthInWorldUnits](frontend_game_viewport.default.md#widthinworldunits)
- [instance](frontend_game_viewport.default.md#instance)

### Accessors

- [maxWorldWidth](frontend_game_viewport.default.md#maxworldwidth)
- [minWorldWidth](frontend_game_viewport.default.md#minworldwidth)

### Methods

- [canvasToWorldCoords](frontend_game_viewport.default.md#canvastoworldcoords)
- [canvasToWorldDist](frontend_game_viewport.default.md#canvastoworlddist)
- [canvasToWorldX](frontend_game_viewport.default.md#canvastoworldx)
- [canvasToWorldY](frontend_game_viewport.default.md#canvastoworldy)
- [centerChunk](frontend_game_viewport.default.md#centerchunk)
- [centerCoords](frontend_game_viewport.default.md#centercoords)
- [centerPlanet](frontend_game_viewport.default.md#centerplanet)
- [centerPlanetAnimated](frontend_game_viewport.default.md#centerplanetanimated)
- [getBottomBound](frontend_game_viewport.default.md#getbottombound)
- [getDetailLevel](frontend_game_viewport.default.md#getdetaillevel)
- [getLeftBound](frontend_game_viewport.default.md#getleftbound)
- [getRightBound](frontend_game_viewport.default.md#getrightbound)
- [getStorage](frontend_game_viewport.default.md#getstorage)
- [getStorageKey](frontend_game_viewport.default.md#getstoragekey)
- [getTopBound](frontend_game_viewport.default.md#gettopbound)
- [getViewportPosition](frontend_game_viewport.default.md#getviewportposition)
- [getViewportWorldHeight](frontend_game_viewport.default.md#getviewportworldheight)
- [getViewportWorldWidth](frontend_game_viewport.default.md#getviewportworldwidth)
- [intersectsViewport](frontend_game_viewport.default.md#intersectsviewport)
- [isInOrAroundViewport](frontend_game_viewport.default.md#isinoraroundviewport)
- [isInViewport](frontend_game_viewport.default.md#isinviewport)
- [isValidWorldWidth](frontend_game_viewport.default.md#isvalidworldwidth)
- [onMouseDown](frontend_game_viewport.default.md#onmousedown)
- [onMouseMove](frontend_game_viewport.default.md#onmousemove)
- [onMouseOut](frontend_game_viewport.default.md#onmouseout)
- [onMouseUp](frontend_game_viewport.default.md#onmouseup)
- [onResize](frontend_game_viewport.default.md#onresize)
- [onScroll](frontend_game_viewport.default.md#onscroll)
- [onSendComplete](frontend_game_viewport.default.md#onsendcomplete)
- [onSendInit](frontend_game_viewport.default.md#onsendinit)
- [onWindowResize](frontend_game_viewport.default.md#onwindowresize)
- [setData](frontend_game_viewport.default.md#setdata)
- [setMouseSensitivty](frontend_game_viewport.default.md#setmousesensitivty)
- [setStorage](frontend_game_viewport.default.md#setstorage)
- [setWorldHeight](frontend_game_viewport.default.md#setworldheight)
- [setWorldWidth](frontend_game_viewport.default.md#setworldwidth)
- [worldToCanvasCoords](frontend_game_viewport.default.md#worldtocanvascoords)
- [worldToCanvasDist](frontend_game_viewport.default.md#worldtocanvasdist)
- [worldToCanvasX](frontend_game_viewport.default.md#worldtocanvasx)
- [worldToCanvasY](frontend_game_viewport.default.md#worldtocanvasy)
- [zoomIn](frontend_game_viewport.default.md#zoomin)
- [zoomOut](frontend_game_viewport.default.md#zoomout)
- [zoomPlanet](frontend_game_viewport.default.md#zoomplanet)
- [destroyInstance](frontend_game_viewport.default.md#destroyinstance)
- [getInstance](frontend_game_viewport.default.md#getinstance)
- [initialize](frontend_game_viewport.default.md#initialize)

## Constructors

### constructor

\+ `Private` **new default**(`gameUIManager`: [_default_](backend_gamelogic_gameuimanager.default.md), `centerWorldCoords`: WorldCoords, `widthInWorldUnits`: _number_, `viewportWidth`: _number_, `viewportHeight`: _number_, `canvas`: HTMLCanvasElement): [_default_](frontend_game_viewport.default.md)

#### Parameters

| Name                | Type                                                    |
| :------------------ | :------------------------------------------------------ |
| `gameUIManager`     | [_default_](backend_gamelogic_gameuimanager.default.md) |
| `centerWorldCoords` | WorldCoords                                             |
| `widthInWorldUnits` | _number_                                                |
| `viewportWidth`     | _number_                                                |
| `viewportHeight`    | _number_                                                |
| `canvas`            | HTMLCanvasElement                                       |

**Returns:** [_default_](frontend_game_viewport.default.md)

## Properties

### animationManager

• `Private` **animationManager**: [_AnimationManager_](frontend_game_viewportanimation.animationmanager.md)

---

### canvas

• **canvas**: HTMLCanvasElement

---

### centerWorldCoords

• **centerWorldCoords**: WorldCoords

---

### frameRequestId

• **frameRequestId**: _number_

---

### gameUIManager

• **gameUIManager**: [_default_](backend_gamelogic_gameuimanager.default.md)

---

### heightInWorldUnits

• **heightInWorldUnits**: _number_

---

### intervalId

• **intervalId**: _Timeout_

---

### isFirefox

• **isFirefox**: _boolean_

---

### isPanning

• **isPanning**: _boolean_= false

---

### isSending

• `Private` **isSending**: _boolean_= false

---

### momentum

• **momentum**: _boolean_= false

---

### mouseLastCoords

• **mouseLastCoords**: _undefined_ \| [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)

---

### mouseSensitivity

• **mouseSensitivity**: _number_

---

### mousedownCoords

• **mousedownCoords**: _undefined_ \| [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)

---

### scale

• **scale**: _number_

---

### velocity

• **velocity**: _undefined_ \| WorldCoords

---

### viewportHeight

• **viewportHeight**: _number_

---

### viewportWidth

• **viewportWidth**: _number_

---

### widthInWorldUnits

• **widthInWorldUnits**: _number_

---

### instance

▪ `Static` **instance**: _undefined_ \| [_default_](frontend_game_viewport.default.md)

## Accessors

### maxWorldWidth

• get **maxWorldWidth**(): _number_

**Returns:** _number_

---

### minWorldWidth

• get **minWorldWidth**(): _number_

**Returns:** _number_

## Methods

### canvasToWorldCoords

▸ **canvasToWorldCoords**(`canvasCoords`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)): WorldCoords

#### Parameters

| Name           | Type                                                                      |
| :------------- | :------------------------------------------------------------------------ |
| `canvasCoords` | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md) |

**Returns:** WorldCoords

---

### canvasToWorldDist

▸ **canvasToWorldDist**(`d`: _number_): _number_

#### Parameters

| Name | Type     |
| :--- | :------- |
| `d`  | _number_ |

**Returns:** _number_

---

### canvasToWorldX

▸ `Private` **canvasToWorldX**(`x`: _number_): _number_

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | _number_ |

**Returns:** _number_

---

### canvasToWorldY

▸ `Private` **canvasToWorldY**(`y`: _number_): _number_

#### Parameters

| Name | Type     |
| :--- | :------- |
| `y`  | _number_ |

**Returns:** _number_

---

### centerChunk

▸ **centerChunk**(`chunk`: [_Chunk_](_types_global_globaltypes.chunk.md)): _void_

#### Parameters

| Name    | Type                                          |
| :------ | :-------------------------------------------- |
| `chunk` | [_Chunk_](_types_global_globaltypes.chunk.md) |

**Returns:** _void_

---

### centerCoords

▸ **centerCoords**(`coords`: WorldCoords): _void_

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |

**Returns:** _void_

---

### centerPlanet

▸ **centerPlanet**(`planet`: _undefined_ \| Planet): _void_

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `planet` | _undefined_ \| Planet |

**Returns:** _void_

---

### centerPlanetAnimated

▸ **centerPlanetAnimated**(`planet`: _undefined_ \| Planet): _void_

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `planet` | _undefined_ \| Planet |

**Returns:** _void_

---

### getBottomBound

▸ **getBottomBound**(): _number_

**Returns:** _number_

---

### getDetailLevel

▸ `Private` **getDetailLevel**(): _number_

**Returns:** _number_

---

### getLeftBound

▸ **getLeftBound**(): _number_

**Returns:** _number_

---

### getRightBound

▸ **getRightBound**(): _number_

**Returns:** _number_

---

### getStorage

▸ **getStorage**(): _undefined_ \| ViewportData

**Returns:** _undefined_ \| ViewportData

---

### getStorageKey

▸ `Private` **getStorageKey**(): _string_

**Returns:** _string_

---

### getTopBound

▸ **getTopBound**(): _number_

**Returns:** _number_

---

### getViewportPosition

▸ **getViewportPosition**(): _object_

**Returns:** _object_

| Name | Type     |
| :--- | :------- |
| `x`  | _number_ |
| `y`  | _number_ |

---

### getViewportWorldHeight

▸ **getViewportWorldHeight**(): _number_

**Returns:** _number_

---

### getViewportWorldWidth

▸ **getViewportWorldWidth**(): _number_

**Returns:** _number_

---

### intersectsViewport

▸ **intersectsViewport**(`chunk`: [_Chunk_](_types_global_globaltypes.chunk.md)): _boolean_

#### Parameters

| Name    | Type                                          |
| :------ | :-------------------------------------------- |
| `chunk` | [_Chunk_](_types_global_globaltypes.chunk.md) |

**Returns:** _boolean_

---

### isInOrAroundViewport

▸ **isInOrAroundViewport**(`coords`: WorldCoords): _boolean_

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |

**Returns:** _boolean_

---

### isInViewport

▸ **isInViewport**(`coords`: WorldCoords): _boolean_

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |

**Returns:** _boolean_

---

### isValidWorldWidth

▸ `Private` **isValidWorldWidth**(`width`: _number_): _boolean_

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `width` | _number_ |

**Returns:** _boolean_

---

### onMouseDown

▸ **onMouseDown**(`canvasCoords`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)): _void_

#### Parameters

| Name           | Type                                                                      |
| :------------- | :------------------------------------------------------------------------ |
| `canvasCoords` | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md) |

**Returns:** _void_

---

### onMouseMove

▸ **onMouseMove**(`canvasCoords`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)): _void_

#### Parameters

| Name           | Type                                                                      |
| :------------- | :------------------------------------------------------------------------ |
| `canvasCoords` | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md) |

**Returns:** _void_

---

### onMouseOut

▸ **onMouseOut**(): _void_

**Returns:** _void_

---

### onMouseUp

▸ **onMouseUp**(`canvasCoords`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)): _void_

#### Parameters

| Name           | Type                                                                      |
| :------------- | :------------------------------------------------------------------------ |
| `canvasCoords` | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md) |

**Returns:** _void_

---

### onResize

▸ **onResize**(): _void_

**Returns:** _void_

---

### onScroll

▸ **onScroll**(`deltaY`: _number_, `forceZoom?`: _boolean_): _void_

#### Parameters

| Name        | Type      | Default value |
| :---------- | :-------- | :------------ |
| `deltaY`    | _number_  | -             |
| `forceZoom` | _boolean_ | false         |

**Returns:** _void_

---

### onSendComplete

▸ **onSendComplete**(): _void_

**Returns:** _void_

---

### onSendInit

▸ **onSendInit**(): _void_

**Returns:** _void_

---

### onWindowResize

▸ **onWindowResize**(): _void_

**Returns:** _void_

---

### setData

▸ **setData**(`data`: ViewportData): _void_

#### Parameters

| Name   | Type         |
| :----- | :----------- |
| `data` | ViewportData |

**Returns:** _void_

---

### setMouseSensitivty

▸ **setMouseSensitivty**(`mouseSensitivity`: _number_): _void_

#### Parameters

| Name               | Type     |
| :----------------- | :------- |
| `mouseSensitivity` | _number_ |

**Returns:** _void_

---

### setStorage

▸ **setStorage**(): _void_

**Returns:** _void_

---

### setWorldHeight

▸ **setWorldHeight**(`height`: _number_): _void_

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `height` | _number_ |

**Returns:** _void_

---

### setWorldWidth

▸ `Private` **setWorldWidth**(`width`: _number_): _void_

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `width` | _number_ |

**Returns:** _void_

---

### worldToCanvasCoords

▸ **worldToCanvasCoords**(`worldCoords`: WorldCoords): [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)

#### Parameters

| Name          | Type        |
| :------------ | :---------- |
| `worldCoords` | WorldCoords |

**Returns:** [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md)

---

### worldToCanvasDist

▸ **worldToCanvasDist**(`d`: _number_): _number_

#### Parameters

| Name | Type     |
| :--- | :------- |
| `d`  | _number_ |

**Returns:** _number_

---

### worldToCanvasX

▸ `Private` **worldToCanvasX**(`x`: _number_): _number_

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | _number_ |

**Returns:** _number_

---

### worldToCanvasY

▸ `Private` **worldToCanvasY**(`y`: _number_): _number_

#### Parameters

| Name | Type     |
| :--- | :------- |
| `y`  | _number_ |

**Returns:** _number_

---

### zoomIn

▸ **zoomIn**(): _void_

**Returns:** _void_

---

### zoomOut

▸ **zoomOut**(): _void_

**Returns:** _void_

---

### zoomPlanet

▸ **zoomPlanet**(`planet`: _undefined_ \| Planet): _void_

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `planet` | _undefined_ \| Planet |

**Returns:** _void_

---

### destroyInstance

▸ `Static` **destroyInstance**(): _void_

**Returns:** _void_

---

### getInstance

▸ `Static` **getInstance**(): [_default_](frontend_game_viewport.default.md)

**Returns:** [_default_](frontend_game_viewport.default.md)

---

### initialize

▸ `Static` **initialize**(`gameUIManager`: [_default_](backend_gamelogic_gameuimanager.default.md), `widthInWorldUnits`: _number_, `canvas`: HTMLCanvasElement): [_default_](frontend_game_viewport.default.md)

#### Parameters

| Name                | Type                                                    |
| :------------------ | :------------------------------------------------------ |
| `gameUIManager`     | [_default_](backend_gamelogic_gameuimanager.default.md) |
| `widthInWorldUnits` | _number_                                                |
| `canvas`            | HTMLCanvasElement                                       |

**Returns:** [_default_](frontend_game_viewport.default.md)
