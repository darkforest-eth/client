# Class: default

[Frontend/Game/Viewport](../modules/Frontend_Game_Viewport.md).default

## Table of contents

### Constructors

- [constructor](Frontend_Game_Viewport.default.md#constructor)

### Properties

- [canvas](Frontend_Game_Viewport.default.md#canvas)
- [centerWorldCoords](Frontend_Game_Viewport.default.md#centerworldcoords)
- [diagnosticUpdater](Frontend_Game_Viewport.default.md#diagnosticupdater)
- [frameRequestId](Frontend_Game_Viewport.default.md#framerequestid)
- [gameUIManager](Frontend_Game_Viewport.default.md#gameuimanager)
- [heightInWorldUnits](Frontend_Game_Viewport.default.md#heightinworldunits)
- [intervalId](Frontend_Game_Viewport.default.md#intervalid)
- [isFirefox](Frontend_Game_Viewport.default.md#isfirefox)
- [isPanning](Frontend_Game_Viewport.default.md#ispanning)
- [isSending](Frontend_Game_Viewport.default.md#issending)
- [momentum](Frontend_Game_Viewport.default.md#momentum)
- [mouseLastCoords](Frontend_Game_Viewport.default.md#mouselastcoords)
- [mouseSensitivity](Frontend_Game_Viewport.default.md#mousesensitivity)
- [mousedownCoords](Frontend_Game_Viewport.default.md#mousedowncoords)
- [scale](Frontend_Game_Viewport.default.md#scale)
- [velocity](Frontend_Game_Viewport.default.md#velocity)
- [viewportHeight](Frontend_Game_Viewport.default.md#viewportheight)
- [viewportWidth](Frontend_Game_Viewport.default.md#viewportwidth)
- [widthInWorldUnits](Frontend_Game_Viewport.default.md#widthinworldunits)
- [instance](Frontend_Game_Viewport.default.md#instance)

### Accessors

- [maxWorldWidth](Frontend_Game_Viewport.default.md#maxworldwidth)
- [minWorldWidth](Frontend_Game_Viewport.default.md#minworldwidth)

### Methods

- [canvasToWorldCoords](Frontend_Game_Viewport.default.md#canvastoworldcoords)
- [canvasToWorldDist](Frontend_Game_Viewport.default.md#canvastoworlddist)
- [canvasToWorldX](Frontend_Game_Viewport.default.md#canvastoworldx)
- [canvasToWorldY](Frontend_Game_Viewport.default.md#canvastoworldy)
- [centerChunk](Frontend_Game_Viewport.default.md#centerchunk)
- [centerCoords](Frontend_Game_Viewport.default.md#centercoords)
- [centerPlanet](Frontend_Game_Viewport.default.md#centerplanet)
- [getBottomBound](Frontend_Game_Viewport.default.md#getbottombound)
- [getLeftBound](Frontend_Game_Viewport.default.md#getleftbound)
- [getRightBound](Frontend_Game_Viewport.default.md#getrightbound)
- [getStorage](Frontend_Game_Viewport.default.md#getstorage)
- [getStorageKey](Frontend_Game_Viewport.default.md#getstoragekey)
- [getTopBound](Frontend_Game_Viewport.default.md#gettopbound)
- [getViewportPosition](Frontend_Game_Viewport.default.md#getviewportposition)
- [getViewportWorldHeight](Frontend_Game_Viewport.default.md#getviewportworldheight)
- [getViewportWorldWidth](Frontend_Game_Viewport.default.md#getviewportworldwidth)
- [intersectsViewport](Frontend_Game_Viewport.default.md#intersectsviewport)
- [isInOrAroundViewport](Frontend_Game_Viewport.default.md#isinoraroundviewport)
- [isInViewport](Frontend_Game_Viewport.default.md#isinviewport)
- [isValidWorldWidth](Frontend_Game_Viewport.default.md#isvalidworldwidth)
- [onMouseDown](Frontend_Game_Viewport.default.md#onmousedown)
- [onMouseMove](Frontend_Game_Viewport.default.md#onmousemove)
- [onMouseOut](Frontend_Game_Viewport.default.md#onmouseout)
- [onMouseUp](Frontend_Game_Viewport.default.md#onmouseup)
- [onResize](Frontend_Game_Viewport.default.md#onresize)
- [onScroll](Frontend_Game_Viewport.default.md#onscroll)
- [onSendComplete](Frontend_Game_Viewport.default.md#onsendcomplete)
- [onSendInit](Frontend_Game_Viewport.default.md#onsendinit)
- [onWindowResize](Frontend_Game_Viewport.default.md#onwindowresize)
- [setData](Frontend_Game_Viewport.default.md#setdata)
- [setDiagnosticUpdater](Frontend_Game_Viewport.default.md#setdiagnosticupdater)
- [setMouseSensitivty](Frontend_Game_Viewport.default.md#setmousesensitivty)
- [setStorage](Frontend_Game_Viewport.default.md#setstorage)
- [setWorldHeight](Frontend_Game_Viewport.default.md#setworldheight)
- [setWorldWidth](Frontend_Game_Viewport.default.md#setworldwidth)
- [updateDiagnostics](Frontend_Game_Viewport.default.md#updatediagnostics)
- [worldToCanvasCoords](Frontend_Game_Viewport.default.md#worldtocanvascoords)
- [worldToCanvasDist](Frontend_Game_Viewport.default.md#worldtocanvasdist)
- [worldToCanvasX](Frontend_Game_Viewport.default.md#worldtocanvasx)
- [worldToCanvasY](Frontend_Game_Viewport.default.md#worldtocanvasy)
- [zoomIn](Frontend_Game_Viewport.default.md#zoomin)
- [zoomOut](Frontend_Game_Viewport.default.md#zoomout)
- [zoomPlanet](Frontend_Game_Viewport.default.md#zoomplanet)
- [destroyInstance](Frontend_Game_Viewport.default.md#destroyinstance)
- [getInstance](Frontend_Game_Viewport.default.md#getinstance)
- [initialize](Frontend_Game_Viewport.default.md#initialize)

## Constructors

### constructor

• `Private` **new default**(`gameUIManager`, `centerWorldCoords`, `widthInWorldUnits`, `viewportWidth`, `viewportHeight`, `canvas`)

#### Parameters

| Name                | Type                                                    |
| :------------------ | :------------------------------------------------------ |
| `gameUIManager`     | [`default`](Backend_GameLogic_GameUIManager.default.md) |
| `centerWorldCoords` | `WorldCoords`                                           |
| `widthInWorldUnits` | `number`                                                |
| `viewportWidth`     | `number`                                                |
| `viewportHeight`    | `number`                                                |
| `canvas`            | `HTMLCanvasElement`                                     |

## Properties

### canvas

• **canvas**: `HTMLCanvasElement`

---

### centerWorldCoords

• **centerWorldCoords**: `WorldCoords`

---

### diagnosticUpdater

• `Optional` **diagnosticUpdater**: `DiagnosticUpdater`

---

### frameRequestId

• **frameRequestId**: `number`

---

### gameUIManager

• **gameUIManager**: [`default`](Backend_GameLogic_GameUIManager.default.md)

---

### heightInWorldUnits

• **heightInWorldUnits**: `number`

---

### intervalId

• **intervalId**: `Timeout`

---

### isFirefox

• **isFirefox**: `boolean`

---

### isPanning

• **isPanning**: `boolean` = `false`

---

### isSending

• `Private` **isSending**: `boolean` = `false`

---

### momentum

• **momentum**: `boolean` = `false`

---

### mouseLastCoords

• **mouseLastCoords**: `undefined` \| `CanvasCoords`

---

### mouseSensitivity

• **mouseSensitivity**: `number`

---

### mousedownCoords

• **mousedownCoords**: `undefined` \| `CanvasCoords` = `undefined`

---

### scale

• **scale**: `number`

---

### velocity

• **velocity**: `undefined` \| `WorldCoords` = `undefined`

---

### viewportHeight

• **viewportHeight**: `number`

---

### viewportWidth

• **viewportWidth**: `number`

---

### widthInWorldUnits

• **widthInWorldUnits**: `number`

---

### instance

▪ `Static` **instance**: `undefined` \| [`default`](Frontend_Game_Viewport.default.md)

## Accessors

### maxWorldWidth

• `get` **maxWorldWidth**(): `number`

#### Returns

`number`

---

### minWorldWidth

• `get` **minWorldWidth**(): `number`

#### Returns

`number`

## Methods

### canvasToWorldCoords

▸ **canvasToWorldCoords**(`canvasCoords`): `WorldCoords`

#### Parameters

| Name           | Type           |
| :------------- | :------------- |
| `canvasCoords` | `CanvasCoords` |

#### Returns

`WorldCoords`

---

### canvasToWorldDist

▸ **canvasToWorldDist**(`d`): `number`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `d`  | `number` |

#### Returns

`number`

---

### canvasToWorldX

▸ `Private` **canvasToWorldX**(`x`): `number`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | `number` |

#### Returns

`number`

---

### canvasToWorldY

▸ `Private` **canvasToWorldY**(`y`): `number`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `y`  | `number` |

#### Returns

`number`

---

### centerChunk

▸ **centerChunk**(`chunk`): `void`

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `chunk` | `Chunk` |

#### Returns

`void`

---

### centerCoords

▸ **centerCoords**(`coords`): `void`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |

#### Returns

`void`

---

### centerPlanet

▸ **centerPlanet**(`planet`): `void`

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |

#### Returns

`void`

---

### getBottomBound

▸ **getBottomBound**(): `number`

#### Returns

`number`

---

### getLeftBound

▸ **getLeftBound**(): `number`

#### Returns

`number`

---

### getRightBound

▸ **getRightBound**(): `number`

#### Returns

`number`

---

### getStorage

▸ **getStorage**(): `undefined` \| `ViewportData`

#### Returns

`undefined` \| `ViewportData`

---

### getStorageKey

▸ `Private` **getStorageKey**(): `string`

#### Returns

`string`

---

### getTopBound

▸ **getTopBound**(): `number`

#### Returns

`number`

---

### getViewportPosition

▸ **getViewportPosition**(): `Object`

#### Returns

`Object`

| Name | Type     |
| :--- | :------- |
| `x`  | `number` |
| `y`  | `number` |

---

### getViewportWorldHeight

▸ **getViewportWorldHeight**(): `number`

#### Returns

`number`

---

### getViewportWorldWidth

▸ **getViewportWorldWidth**(): `number`

#### Returns

`number`

---

### intersectsViewport

▸ **intersectsViewport**(`chunk`): `boolean`

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `chunk` | `Chunk` |

#### Returns

`boolean`

---

### isInOrAroundViewport

▸ **isInOrAroundViewport**(`coords`): `boolean`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |

#### Returns

`boolean`

---

### isInViewport

▸ **isInViewport**(`coords`): `boolean`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |

#### Returns

`boolean`

---

### isValidWorldWidth

▸ `Private` **isValidWorldWidth**(`width`): `boolean`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `width` | `number` |

#### Returns

`boolean`

---

### onMouseDown

▸ **onMouseDown**(`canvasCoords`): `void`

#### Parameters

| Name           | Type           |
| :------------- | :------------- |
| `canvasCoords` | `CanvasCoords` |

#### Returns

`void`

---

### onMouseMove

▸ **onMouseMove**(`canvasCoords`): `void`

#### Parameters

| Name           | Type           |
| :------------- | :------------- |
| `canvasCoords` | `CanvasCoords` |

#### Returns

`void`

---

### onMouseOut

▸ **onMouseOut**(): `void`

#### Returns

`void`

---

### onMouseUp

▸ **onMouseUp**(`canvasCoords`): `void`

#### Parameters

| Name           | Type           |
| :------------- | :------------- |
| `canvasCoords` | `CanvasCoords` |

#### Returns

`void`

---

### onResize

▸ **onResize**(): `void`

#### Returns

`void`

---

### onScroll

▸ **onScroll**(`deltaY`, `forceZoom?`): `void`

#### Parameters

| Name        | Type      | Default value |
| :---------- | :-------- | :------------ |
| `deltaY`    | `number`  | `undefined`   |
| `forceZoom` | `boolean` | `false`       |

#### Returns

`void`

---

### onSendComplete

▸ **onSendComplete**(): `void`

#### Returns

`void`

---

### onSendInit

▸ **onSendInit**(): `void`

#### Returns

`void`

---

### onWindowResize

▸ **onWindowResize**(): `void`

#### Returns

`void`

---

### setData

▸ **setData**(`data`): `void`

#### Parameters

| Name   | Type           |
| :----- | :------------- |
| `data` | `ViewportData` |

#### Returns

`void`

---

### setDiagnosticUpdater

▸ **setDiagnosticUpdater**(`diagnosticUpdater`): `void`

#### Parameters

| Name                | Type                |
| :------------------ | :------------------ |
| `diagnosticUpdater` | `DiagnosticUpdater` |

#### Returns

`void`

---

### setMouseSensitivty

▸ **setMouseSensitivty**(`mouseSensitivity`): `void`

#### Parameters

| Name               | Type     |
| :----------------- | :------- |
| `mouseSensitivity` | `number` |

#### Returns

`void`

---

### setStorage

▸ **setStorage**(): `void`

#### Returns

`void`

---

### setWorldHeight

▸ **setWorldHeight**(`height`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `height` | `number` |

#### Returns

`void`

---

### setWorldWidth

▸ `Private` **setWorldWidth**(`width`): `void`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `width` | `number` |

#### Returns

`void`

---

### updateDiagnostics

▸ `Private` **updateDiagnostics**(): `void`

#### Returns

`void`

---

### worldToCanvasCoords

▸ **worldToCanvasCoords**(`worldCoords`): `CanvasCoords`

#### Parameters

| Name          | Type          |
| :------------ | :------------ |
| `worldCoords` | `WorldCoords` |

#### Returns

`CanvasCoords`

---

### worldToCanvasDist

▸ **worldToCanvasDist**(`d`): `number`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `d`  | `number` |

#### Returns

`number`

---

### worldToCanvasX

▸ `Private` **worldToCanvasX**(`x`): `number`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `x`  | `number` |

#### Returns

`number`

---

### worldToCanvasY

▸ `Private` **worldToCanvasY**(`y`): `number`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `y`  | `number` |

#### Returns

`number`

---

### zoomIn

▸ **zoomIn**(): `void`

#### Returns

`void`

---

### zoomOut

▸ **zoomOut**(): `void`

#### Returns

`void`

---

### zoomPlanet

▸ **zoomPlanet**(`planet?`, `radii?`): `void`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `planet?` | `Planet` |
| `radii?`  | `number` |

#### Returns

`void`

---

### destroyInstance

▸ `Static` **destroyInstance**(): `void`

#### Returns

`void`

---

### getInstance

▸ `Static` **getInstance**(): [`default`](Frontend_Game_Viewport.default.md)

#### Returns

[`default`](Frontend_Game_Viewport.default.md)

---

### initialize

▸ `Static` **initialize**(`gameUIManager`, `widthInWorldUnits`, `canvas`): [`default`](Frontend_Game_Viewport.default.md)

#### Parameters

| Name                | Type                                                    |
| :------------------ | :------------------------------------------------------ |
| `gameUIManager`     | [`default`](Backend_GameLogic_GameUIManager.default.md) |
| `widthInWorldUnits` | `number`                                                |
| `canvas`            | `HTMLCanvasElement`                                     |

#### Returns

[`default`](Frontend_Game_Viewport.default.md)
