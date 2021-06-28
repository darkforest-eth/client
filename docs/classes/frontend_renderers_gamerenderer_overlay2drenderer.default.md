# Class: default

[Frontend/Renderers/GameRenderer/Overlay2DRenderer](../modules/frontend_renderers_gamerenderer_overlay2drenderer.md).default

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_overlay2drenderer.default.md#constructor)

### Properties

- [canvas](frontend_renderers_gamerenderer_overlay2drenderer.default.md#canvas)
- [ctx](frontend_renderers_gamerenderer_overlay2drenderer.default.md#ctx)
- [renderer](frontend_renderers_gamerenderer_overlay2drenderer.default.md#renderer)

### Methods

- [clear](frontend_renderers_gamerenderer_overlay2drenderer.default.md#clear)
- [drawArcWorld](frontend_renderers_gamerenderer_overlay2drenderer.default.md#drawarcworld)
- [drawArtifactAroundPlanet](frontend_renderers_gamerenderer_overlay2drenderer.default.md#drawartifactaroundplanet)
- [drawArtifactIcon](frontend_renderers_gamerenderer_overlay2drenderer.default.md#drawartifacticon)
- [drawChunk](frontend_renderers_gamerenderer_overlay2drenderer.default.md#drawchunk)
- [drawEmojiMessage](frontend_renderers_gamerenderer_overlay2drenderer.default.md#drawemojimessage)
- [drawHat](frontend_renderers_gamerenderer_overlay2drenderer.default.md#drawhat)
- [drawLine](frontend_renderers_gamerenderer_overlay2drenderer.default.md#drawline)
- [drawLoopWorld](frontend_renderers_gamerenderer_overlay2drenderer.default.md#drawloopworld)
- [drawMiner](frontend_renderers_gamerenderer_overlay2drenderer.default.md#drawminer)
- [drawPlanetMessages](frontend_renderers_gamerenderer_overlay2drenderer.default.md#drawplanetmessages)
- [drawRectStrokeAtCenterWorld](frontend_renderers_gamerenderer_overlay2drenderer.default.md#drawrectstrokeatcenterworld)
- [drawText](frontend_renderers_gamerenderer_overlay2drenderer.default.md#drawtext)

## Constructors

### constructor

\+ **new default**(`engine`: [_default_](frontend_renderers_gamerenderer_renderer.default.md), `canvas`: HTMLCanvasElement): [_default_](frontend_renderers_gamerenderer_overlay2drenderer.default.md)

#### Parameters

| Name     | Type                                                             |
| :------- | :--------------------------------------------------------------- |
| `engine` | [_default_](frontend_renderers_gamerenderer_renderer.default.md) |
| `canvas` | HTMLCanvasElement                                                |

**Returns:** [_default_](frontend_renderers_gamerenderer_overlay2drenderer.default.md)

## Properties

### canvas

• **canvas**: HTMLCanvasElement

---

### ctx

• **ctx**: CanvasRenderingContext2D

---

### renderer

• **renderer**: [_default_](frontend_renderers_gamerenderer_renderer.default.md)

## Methods

### clear

▸ **clear**(): _void_

**Returns:** _void_

---

### drawArcWorld

▸ **drawArcWorld**(`center`: WorldCoords, `radius`: _number_, `width`: _number_, `percent`: _number_, `color?`: _string_, `dotted?`: _boolean_): _void_

#### Parameters

| Name      | Type        | Default value |
| :-------- | :---------- | :------------ |
| `center`  | WorldCoords | -             |
| `radius`  | _number_    | -             |
| `width`   | _number_    | -             |
| `percent` | _number_    | -             |
| `color`   | _string_    | 'white'       |
| `dotted`  | _boolean_   | false         |

**Returns:** _void_

---

### drawArtifactAroundPlanet

▸ **drawArtifactAroundPlanet**(`artifact`: Artifact, `coords`: [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md), `size`: _number_): _void_

#### Parameters

| Name       | Type                                                                      |
| :--------- | :------------------------------------------------------------------------ |
| `artifact` | Artifact                                                                  |
| `coords`   | [_CanvasCoords_](../interfaces/backend_utils_coordinates.canvascoords.md) |
| `size`     | _number_                                                                  |

**Returns:** _void_

---

### drawArtifactIcon

▸ **drawArtifactIcon**(`glassLoc`: WorldCoords, `scale`: _number_, `color?`: _string_): _void_

#### Parameters

| Name       | Type        | Default value |
| :--------- | :---------- | :------------ |
| `glassLoc` | WorldCoords | -             |
| `scale`    | _number_    | -             |
| `color`    | _string_    | 'white'       |

**Returns:** _void_

---

### drawChunk

▸ **drawChunk**(`chunk`: [_Chunk_](_types_global_globaltypes.chunk.md)): _void_

#### Parameters

| Name    | Type                                          |
| :------ | :-------------------------------------------- |
| `chunk` | [_Chunk_](_types_global_globaltypes.chunk.md) |

**Returns:** _void_

---

### drawEmojiMessage

▸ **drawEmojiMessage**(`centerWorld`: WorldCoords, `radiusWorld`: _number_, `renderInfo`: [_PlanetRenderInfo_](../interfaces/backend_gamelogic_viewportentities.planetrenderinfo.md), `message`: _PlanetMessage_<EmojiFlagBody\>, `textAlpha`: _number_): _void_

#### Parameters

| Name          | Type                                                                                       |
| :------------ | :----------------------------------------------------------------------------------------- |
| `centerWorld` | WorldCoords                                                                                |
| `radiusWorld` | _number_                                                                                   |
| `renderInfo`  | [_PlanetRenderInfo_](../interfaces/backend_gamelogic_viewportentities.planetrenderinfo.md) |
| `message`     | _PlanetMessage_<EmojiFlagBody\>                                                            |
| `textAlpha`   | _number_                                                                                   |

**Returns:** _void_

---

### drawHat

▸ **drawHat**(`hatType`: [_HatType_](../enums/frontend_utils_hats.hattype.md), `pathHeight`: _number_, `pathWidth`: _number_, `center`: WorldCoords, `width`: _number_, `height`: _number_, `radius`: _number_, `rotation`: _number_, `fill1?`: _string_ \| CanvasPattern, `fill2?`: _string_ \| CanvasPattern, `hoverCoords?`: `null` \| WorldCoords): _void_

#### Parameters

| Name          | Type                                                 | Default value |
| :------------ | :--------------------------------------------------- | :------------ |
| `hatType`     | [_HatType_](../enums/frontend_utils_hats.hattype.md) | -             |
| `pathHeight`  | _number_                                             | -             |
| `pathWidth`   | _number_                                             | -             |
| `center`      | WorldCoords                                          | -             |
| `width`       | _number_                                             | -             |
| `height`      | _number_                                             | -             |
| `radius`      | _number_                                             | -             |
| `rotation`    | _number_                                             | -             |
| `fill1`       | _string_ \| CanvasPattern                            | 'white'       |
| `fill2`       | _string_ \| CanvasPattern                            | 'red'         |
| `hoverCoords` | `null` \| WorldCoords                                | null          |

**Returns:** _void_

---

### drawLine

▸ **drawLine**(`startCoords`: WorldCoords, `endCoords`: WorldCoords, `lineWidth`: _number_, `color?`: _string_, `dotted?`: _boolean_): _void_

#### Parameters

| Name          | Type        | Default value |
| :------------ | :---------- | :------------ |
| `startCoords` | WorldCoords | -             |
| `endCoords`   | WorldCoords | -             |
| `lineWidth`   | _number_    | -             |
| `color`       | _string_    | 'white'       |
| `dotted`      | _boolean_   | false         |

**Returns:** _void_

---

### drawLoopWorld

▸ **drawLoopWorld**(`center`: WorldCoords, `radius`: _number_, `width`: _number_, `color?`: _string_, `dotted?`: _boolean_): _void_

#### Parameters

| Name     | Type        | Default value |
| :------- | :---------- | :------------ |
| `center` | WorldCoords | -             |
| `radius` | _number_    | -             |
| `width`  | _number_    | -             |
| `color`  | _string_    | 'white'       |
| `dotted` | _boolean_   | false         |

**Returns:** _void_

---

### drawMiner

▸ **drawMiner**(): _void_

**Returns:** _void_

---

### drawPlanetMessages

▸ **drawPlanetMessages**(`centerWorld`: WorldCoords, `radiusWorld`: _number_, `renderInfo`: [_PlanetRenderInfo_](../interfaces/backend_gamelogic_viewportentities.planetrenderinfo.md), `textAlpha`: _number_): _void_

#### Parameters

| Name          | Type                                                                                       |
| :------------ | :----------------------------------------------------------------------------------------- |
| `centerWorld` | WorldCoords                                                                                |
| `radiusWorld` | _number_                                                                                   |
| `renderInfo`  | [_PlanetRenderInfo_](../interfaces/backend_gamelogic_viewportentities.planetrenderinfo.md) |
| `textAlpha`   | _number_                                                                                   |

**Returns:** _void_

---

### drawRectStrokeAtCenterWorld

▸ **drawRectStrokeAtCenterWorld**(`center`: WorldCoords, `width`: _number_, `height`: _number_, `strokeWidth`: _number_, `color?`: _string_): _void_

#### Parameters

| Name          | Type        | Default value |
| :------------ | :---------- | :------------ |
| `center`      | WorldCoords | -             |
| `width`       | _number_    | -             |
| `height`      | _number_    | -             |
| `strokeWidth` | _number_    | -             |
| `color`       | _string_    | 'white'       |

**Returns:** _void_

---

### drawText

▸ **drawText**(`text`: _string_, `x`: _number_, `y`: _number_, `color?`: _string_, `align?`: [_TextAlign_](../enums/frontend_renderers_gamerenderer_enginetypes.textalign.md)): _void_

#### Parameters

| Name    | Type                                                                             | Default value |
| :------ | :------------------------------------------------------------------------------- | :------------ |
| `text`  | _string_                                                                         | -             |
| `x`     | _number_                                                                         | -             |
| `y`     | _number_                                                                         | -             |
| `color` | _string_                                                                         | 'white'       |
| `align` | [_TextAlign_](../enums/frontend_renderers_gamerenderer_enginetypes.textalign.md) | -             |

**Returns:** _void_
