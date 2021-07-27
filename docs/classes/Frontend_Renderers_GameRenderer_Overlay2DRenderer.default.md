# Class: default

[Frontend/Renderers/GameRenderer/Overlay2DRenderer](../modules/Frontend_Renderers_GameRenderer_Overlay2DRenderer.md).default

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_Overlay2DRenderer.default.md#constructor)

### Properties

- [canvas](Frontend_Renderers_GameRenderer_Overlay2DRenderer.default.md#canvas)
- [ctx](Frontend_Renderers_GameRenderer_Overlay2DRenderer.default.md#ctx)
- [renderer](Frontend_Renderers_GameRenderer_Overlay2DRenderer.default.md#renderer)

### Methods

- [clear](Frontend_Renderers_GameRenderer_Overlay2DRenderer.default.md#clear)
- [drawArcWorld](Frontend_Renderers_GameRenderer_Overlay2DRenderer.default.md#drawarcworld)
- [drawArtifactAroundPlanet](Frontend_Renderers_GameRenderer_Overlay2DRenderer.default.md#drawartifactaroundplanet)
- [drawArtifactIcon](Frontend_Renderers_GameRenderer_Overlay2DRenderer.default.md#drawartifacticon)
- [drawChunk](Frontend_Renderers_GameRenderer_Overlay2DRenderer.default.md#drawchunk)
- [drawEmojiMessage](Frontend_Renderers_GameRenderer_Overlay2DRenderer.default.md#drawemojimessage)
- [drawHat](Frontend_Renderers_GameRenderer_Overlay2DRenderer.default.md#drawhat)
- [drawLine](Frontend_Renderers_GameRenderer_Overlay2DRenderer.default.md#drawline)
- [drawLoopWorld](Frontend_Renderers_GameRenderer_Overlay2DRenderer.default.md#drawloopworld)
- [drawMiner](Frontend_Renderers_GameRenderer_Overlay2DRenderer.default.md#drawminer)
- [drawPlanetMessages](Frontend_Renderers_GameRenderer_Overlay2DRenderer.default.md#drawplanetmessages)
- [drawRectStrokeAtCenterWorld](Frontend_Renderers_GameRenderer_Overlay2DRenderer.default.md#drawrectstrokeatcenterworld)
- [drawText](Frontend_Renderers_GameRenderer_Overlay2DRenderer.default.md#drawtext)

## Constructors

### constructor

• **new default**(`engine`, `canvas`)

#### Parameters

| Name     | Type                                                             |
| :------- | :--------------------------------------------------------------- |
| `engine` | [`default`](Frontend_Renderers_GameRenderer_Renderer.default.md) |
| `canvas` | `HTMLCanvasElement`                                              |

## Properties

### canvas

• **canvas**: `HTMLCanvasElement`

---

### ctx

• **ctx**: `CanvasRenderingContext2D`

---

### renderer

• **renderer**: [`default`](Frontend_Renderers_GameRenderer_Renderer.default.md)

## Methods

### clear

▸ **clear**(): `void`

#### Returns

`void`

---

### drawArcWorld

▸ **drawArcWorld**(`center`, `radius`, `width`, `percent`, `color?`, `dotted?`): `void`

#### Parameters

| Name      | Type          | Default value |
| :-------- | :------------ | :------------ |
| `center`  | `WorldCoords` | `undefined`   |
| `radius`  | `number`      | `undefined`   |
| `width`   | `number`      | `undefined`   |
| `percent` | `number`      | `undefined`   |
| `color`   | `string`      | `'white'`     |
| `dotted`  | `boolean`     | `false`       |

#### Returns

`void`

---

### drawArtifactAroundPlanet

▸ **drawArtifactAroundPlanet**(`artifact`, `coords`, `size`): `void`

#### Parameters

| Name       | Type                                                                      |
| :--------- | :------------------------------------------------------------------------ |
| `artifact` | `Artifact`                                                                |
| `coords`   | [`CanvasCoords`](../interfaces/Backend_Utils_Coordinates.CanvasCoords.md) |
| `size`     | `number`                                                                  |

#### Returns

`void`

---

### drawArtifactIcon

▸ **drawArtifactIcon**(`glassLoc`, `scale`, `color?`): `void`

#### Parameters

| Name       | Type          | Default value |
| :--------- | :------------ | :------------ |
| `glassLoc` | `WorldCoords` | `undefined`   |
| `scale`    | `number`      | `undefined`   |
| `color`    | `string`      | `'white'`     |

#### Returns

`void`

---

### drawChunk

▸ **drawChunk**(`chunk`): `void`

#### Parameters

| Name    | Type                                          |
| :------ | :-------------------------------------------- |
| `chunk` | [`Chunk`](_types_global_GlobalTypes.Chunk.md) |

#### Returns

`void`

---

### drawEmojiMessage

▸ **drawEmojiMessage**(`centerWorld`, `radiusWorld`, `renderInfo`, `message`, `textAlpha`): `void`

#### Parameters

| Name          | Type                                                                                       |
| :------------ | :----------------------------------------------------------------------------------------- |
| `centerWorld` | `WorldCoords`                                                                              |
| `radiusWorld` | `number`                                                                                   |
| `renderInfo`  | [`PlanetRenderInfo`](../interfaces/Backend_GameLogic_ViewportEntities.PlanetRenderInfo.md) |
| `message`     | `PlanetMessage`<`EmojiFlagBody`\>                                                          |
| `textAlpha`   | `number`                                                                                   |

#### Returns

`void`

---

### drawHat

▸ **drawHat**(`hatType`, `pathHeight`, `pathWidth`, `center`, `width`, `height`, `radius`, `rotation`, `hoveringPlanet`, `fill1?`, `fill2?`, `hoverCoords?`): `void`

#### Parameters

| Name             | Type                                                 | Default value |
| :--------------- | :--------------------------------------------------- | :------------ |
| `hatType`        | [`HatType`](../enums/Frontend_Utils_Hats.HatType.md) | `undefined`   |
| `pathHeight`     | `number`                                             | `undefined`   |
| `pathWidth`      | `number`                                             | `undefined`   |
| `center`         | `WorldCoords`                                        | `undefined`   |
| `width`          | `number`                                             | `undefined`   |
| `height`         | `number`                                             | `undefined`   |
| `radius`         | `number`                                             | `undefined`   |
| `rotation`       | `number`                                             | `undefined`   |
| `hoveringPlanet` | `boolean`                                            | `undefined`   |
| `fill1`          | `string` \| `CanvasPattern`                          | `'white'`     |
| `fill2`          | `string` \| `CanvasPattern`                          | `'red'`       |
| `hoverCoords`    | `null` \| `WorldCoords`                              | `null`        |

#### Returns

`void`

---

### drawLine

▸ **drawLine**(`startCoords`, `endCoords`, `lineWidth`, `color?`, `dotted?`): `void`

#### Parameters

| Name          | Type          | Default value |
| :------------ | :------------ | :------------ |
| `startCoords` | `WorldCoords` | `undefined`   |
| `endCoords`   | `WorldCoords` | `undefined`   |
| `lineWidth`   | `number`      | `undefined`   |
| `color`       | `string`      | `'white'`     |
| `dotted`      | `boolean`     | `false`       |

#### Returns

`void`

---

### drawLoopWorld

▸ **drawLoopWorld**(`center`, `radius`, `width`, `color?`, `dotted?`): `void`

#### Parameters

| Name     | Type          | Default value |
| :------- | :------------ | :------------ |
| `center` | `WorldCoords` | `undefined`   |
| `radius` | `number`      | `undefined`   |
| `width`  | `number`      | `undefined`   |
| `color`  | `string`      | `'white'`     |
| `dotted` | `boolean`     | `false`       |

#### Returns

`void`

---

### drawMiner

▸ **drawMiner**(): `void`

#### Returns

`void`

---

### drawPlanetMessages

▸ **drawPlanetMessages**(`centerWorld`, `radiusWorld`, `renderInfo`, `textAlpha`): `void`

#### Parameters

| Name          | Type                                                                                       |
| :------------ | :----------------------------------------------------------------------------------------- |
| `centerWorld` | `WorldCoords`                                                                              |
| `radiusWorld` | `number`                                                                                   |
| `renderInfo`  | [`PlanetRenderInfo`](../interfaces/Backend_GameLogic_ViewportEntities.PlanetRenderInfo.md) |
| `textAlpha`   | `number`                                                                                   |

#### Returns

`void`

---

### drawRectStrokeAtCenterWorld

▸ **drawRectStrokeAtCenterWorld**(`center`, `width`, `height`, `strokeWidth`, `color?`): `void`

#### Parameters

| Name          | Type          | Default value |
| :------------ | :------------ | :------------ |
| `center`      | `WorldCoords` | `undefined`   |
| `width`       | `number`      | `undefined`   |
| `height`      | `number`      | `undefined`   |
| `strokeWidth` | `number`      | `undefined`   |
| `color`       | `string`      | `'white'`     |

#### Returns

`void`

---

### drawText

▸ **drawText**(`text`, `x`, `y`, `color?`, `align?`): `void`

#### Parameters

| Name    | Type                                                                             | Default value |
| :------ | :------------------------------------------------------------------------------- | :------------ |
| `text`  | `string`                                                                         | `undefined`   |
| `x`     | `number`                                                                         | `undefined`   |
| `y`     | `number`                                                                         | `undefined`   |
| `color` | `string`                                                                         | `'white'`     |
| `align` | [`TextAlign`](../enums/Frontend_Renderers_GameRenderer_EngineTypes.TextAlign.md) | `undefined`   |

#### Returns

`void`
