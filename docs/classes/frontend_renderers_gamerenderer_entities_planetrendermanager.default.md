# Class: default

[Frontend/Renderers/GameRenderer/Entities/PlanetRenderManager](../modules/frontend_renderers_gamerenderer_entities_planetrendermanager.md).default

this guy is always going to call things in worldcoords, we'll convert them
to CanvasCoords. responsible for rendering planets by calling primitive renderers

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md#constructor)

### Properties

- [renderer](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md#renderer)

### Methods

- [drawPlanetMessages](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md#drawplanetmessages)
- [flush](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md#flush)
- [getLockedEnergy](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md#getlockedenergy)
- [getMouseAtk](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md#getmouseatk)
- [queueArtifactIcon](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md#queueartifacticon)
- [queueArtifactsAroundPlanet](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md#queueartifactsaroundplanet)
- [queueAsteroids](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md#queueasteroids)
- [queueBlackDomain](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md#queueblackdomain)
- [queueHat](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md#queuehat)
- [queueLocation](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md#queuelocation)
- [queuePlanetBody](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md#queueplanetbody)
- [queuePlanetEnergyText](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md#queueplanetenergytext)
- [queuePlanetSilverText](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md#queueplanetsilvertext)
- [queuePlanets](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md#queueplanets)
- [queueRings](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md#queuerings)

## Constructors

### constructor

\+ **new default**(`renderer`: [_default_](frontend_renderers_gamerenderer_renderer.default.md)): [_default_](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md)

#### Parameters

| Name       | Type                                                             |
| :--------- | :--------------------------------------------------------------- |
| `renderer` | [_default_](frontend_renderers_gamerenderer_renderer.default.md) |

**Returns:** [_default_](frontend_renderers_gamerenderer_entities_planetrendermanager.default.md)

## Properties

### renderer

• **renderer**: [_default_](frontend_renderers_gamerenderer_renderer.default.md)

## Methods

### drawPlanetMessages

▸ `Private` **drawPlanetMessages**(`renderInfo`: [_PlanetRenderInfo_](../interfaces/backend_gamelogic_viewportentities.planetrenderinfo.md), `coords`: WorldCoords, `radiusW`: _number_, `textAlpha`: _number_): _void_

#### Parameters

| Name         | Type                                                                                       |
| :----------- | :----------------------------------------------------------------------------------------- |
| `renderInfo` | [_PlanetRenderInfo_](../interfaces/backend_gamelogic_viewportentities.planetrenderinfo.md) |
| `coords`     | WorldCoords                                                                                |
| `radiusW`    | _number_                                                                                   |
| `textAlpha`  | _number_                                                                                   |

**Returns:** _void_

---

### flush

▸ **flush**(): _void_

**Returns:** _void_

---

### getLockedEnergy

▸ `Private` **getLockedEnergy**(`planet`: Planet): _number_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _number_

---

### getMouseAtk

▸ `Private` **getMouseAtk**(): _undefined_ \| _number_

**Returns:** _undefined_ \| _number_

---

### queueArtifactIcon

▸ `Private` **queueArtifactIcon**(`planet`: Planet, `__namedParameters`: WorldCoords, `radius`: _number_): _void_

#### Parameters

| Name                | Type        |
| :------------------ | :---------- |
| `planet`            | Planet      |
| `__namedParameters` | WorldCoords |
| `radius`            | _number_    |

**Returns:** _void_

---

### queueArtifactsAroundPlanet

▸ `Private` **queueArtifactsAroundPlanet**(`planet`: Planet, `artifacts`: Artifact[], `centerW`: WorldCoords, `radiusW`: _number_, `now`: _number_, `alpha`: _number_): _void_

#### Parameters

| Name        | Type        |
| :---------- | :---------- |
| `planet`    | Planet      |
| `artifacts` | Artifact[]  |
| `centerW`   | WorldCoords |
| `radiusW`   | _number_    |
| `now`       | _number_    |
| `alpha`     | _number_    |

**Returns:** _void_

---

### queueAsteroids

▸ `Private` **queueAsteroids**(`planet`: Planet, `center`: WorldCoords, `radius`: _number_): _void_

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `planet` | Planet      |
| `center` | WorldCoords |
| `radius` | _number_    |

**Returns:** _void_

---

### queueBlackDomain

▸ `Private` **queueBlackDomain**(`planet`: Planet, `center`: WorldCoords, `radius`: _number_): _void_

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `planet` | Planet      |
| `center` | WorldCoords |
| `radius` | _number_    |

**Returns:** _void_

---

### queueHat

▸ `Private` **queueHat**(`planet`: Planet, `center`: WorldCoords, `radius`: _number_): _void_

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `planet` | Planet      |
| `center` | WorldCoords |
| `radius` | _number_    |

**Returns:** _void_

---

### queueLocation

▸ **queueLocation**(`renderInfo`: [_PlanetRenderInfo_](../interfaces/backend_gamelogic_viewportentities.planetrenderinfo.md), `now`: _number_, `highPerfMode`: _boolean_): _void_

#### Parameters

| Name           | Type                                                                                       |
| :------------- | :----------------------------------------------------------------------------------------- |
| `renderInfo`   | [_PlanetRenderInfo_](../interfaces/backend_gamelogic_viewportentities.planetrenderinfo.md) |
| `now`          | _number_                                                                                   |
| `highPerfMode` | _boolean_                                                                                  |

**Returns:** _void_

---

### queuePlanetBody

▸ `Private` **queuePlanetBody**(`planet`: Planet, `centerW`: WorldCoords, `radiusW`: _number_): _void_

#### Parameters

| Name      | Type        |
| :-------- | :---------- |
| `planet`  | Planet      |
| `centerW` | WorldCoords |
| `radiusW` | _number_    |

**Returns:** _void_

---

### queuePlanetEnergyText

▸ `Private` **queuePlanetEnergyText**(`planet`: Planet, `center`: WorldCoords, `radius`: _number_, `alpha`: _number_): _void_

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `planet` | Planet      |
| `center` | WorldCoords |
| `radius` | _number_    |
| `alpha`  | _number_    |

**Returns:** _void_

---

### queuePlanetSilverText

▸ `Private` **queuePlanetSilverText**(`planet`: Planet, `center`: WorldCoords, `radius`: _number_, `alpha`: _number_): _void_

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `planet` | Planet      |
| `center` | WorldCoords |
| `radius` | _number_    |
| `alpha`  | _number_    |

**Returns:** _void_

---

### queuePlanets

▸ **queuePlanets**(`cachedPlanets`: _Map_<LocationId, [_PlanetRenderInfo_](../interfaces/backend_gamelogic_viewportentities.planetrenderinfo.md)\>, `now`: _number_, `highPerfMode`: _boolean_): _void_

#### Parameters

| Name            | Type                                                                                                           |
| :-------------- | :------------------------------------------------------------------------------------------------------------- |
| `cachedPlanets` | _Map_<LocationId, [_PlanetRenderInfo_](../interfaces/backend_gamelogic_viewportentities.planetrenderinfo.md)\> |
| `now`           | _number_                                                                                                       |
| `highPerfMode`  | _boolean_                                                                                                      |

**Returns:** _void_

---

### queueRings

▸ `Private` **queueRings**(`planet`: Planet, `center`: WorldCoords, `radius`: _number_): _void_

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `planet` | Planet      |
| `center` | WorldCoords |
| `radius` | _number_    |

**Returns:** _void_
