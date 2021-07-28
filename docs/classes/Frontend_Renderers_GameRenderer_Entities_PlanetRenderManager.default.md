# Class: default

[Frontend/Renderers/GameRenderer/Entities/PlanetRenderManager](../modules/Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.md).default

this guy is always going to call things in worldcoords, we'll convert them
to CanvasCoords. responsible for rendering planets by calling primitive renderers

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#constructor)

### Properties

- [renderer](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#renderer)

### Methods

- [drawPlanetMessages](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#drawplanetmessages)
- [drawRangeAtPercent](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#drawrangeatpercent)
- [flush](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#flush)
- [getLockedEnergy](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#getlockedenergy)
- [getMouseAtk](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#getmouseatk)
- [queueArtifactIcon](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#queueartifacticon)
- [queueArtifactsAroundPlanet](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#queueartifactsaroundplanet)
- [queueAsteroids](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#queueasteroids)
- [queueBlackDomain](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#queueblackdomain)
- [queueHat](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#queuehat)
- [queueLocation](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#queuelocation)
- [queuePlanetBody](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#queueplanetbody)
- [queuePlanetEnergyText](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#queueplanetenergytext)
- [queuePlanetSilverText](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#queueplanetsilvertext)
- [queuePlanets](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#queueplanets)
- [queueRangeRings](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#queuerangerings)
- [queueRings](Frontend_Renderers_GameRenderer_Entities_PlanetRenderManager.default.md#queuerings)

## Constructors

### constructor

• **new default**(`renderer`)

#### Parameters

| Name       | Type                                                             |
| :--------- | :--------------------------------------------------------------- |
| `renderer` | [`default`](Frontend_Renderers_GameRenderer_Renderer.default.md) |

## Properties

### renderer

• **renderer**: [`default`](Frontend_Renderers_GameRenderer_Renderer.default.md)

## Methods

### drawPlanetMessages

▸ `Private` **drawPlanetMessages**(`renderInfo`, `coords`, `radiusW`, `textAlpha`): `void`

#### Parameters

| Name         | Type                                                                                       |
| :----------- | :----------------------------------------------------------------------------------------- |
| `renderInfo` | [`PlanetRenderInfo`](../interfaces/Backend_GameLogic_ViewportEntities.PlanetRenderInfo.md) |
| `coords`     | `WorldCoords`                                                                              |
| `radiusW`    | `number`                                                                                   |
| `textAlpha`  | `number`                                                                                   |

#### Returns

`void`

---

### drawRangeAtPercent

▸ **drawRangeAtPercent**(`planet`, `pct`): `void`

Renders rings around planet that show how far sending the given percentage of this planet's
energy would be able to travel.

#### Parameters

| Name     | Type              |
| :------- | :---------------- |
| `planet` | `LocatablePlanet` |
| `pct`    | `number`          |

#### Returns

`void`

---

### flush

▸ **flush**(): `void`

#### Returns

`void`

---

### getLockedEnergy

▸ `Private` **getLockedEnergy**(`planet`): `number`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`number`

---

### getMouseAtk

▸ `Private` **getMouseAtk**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

---

### queueArtifactIcon

▸ `Private` **queueArtifactIcon**(`planet`, `__namedParameters`, `radius`): `void`

#### Parameters

| Name                | Type          |
| :------------------ | :------------ |
| `planet`            | `Planet`      |
| `__namedParameters` | `WorldCoords` |
| `radius`            | `number`      |

#### Returns

`void`

---

### queueArtifactsAroundPlanet

▸ `Private` **queueArtifactsAroundPlanet**(`planet`, `artifacts`, `centerW`, `radiusW`, `now`, `alpha`): `void`

#### Parameters

| Name        | Type          |
| :---------- | :------------ |
| `planet`    | `Planet`      |
| `artifacts` | `Artifact`[]  |
| `centerW`   | `WorldCoords` |
| `radiusW`   | `number`      |
| `now`       | `number`      |
| `alpha`     | `number`      |

#### Returns

`void`

---

### queueAsteroids

▸ `Private` **queueAsteroids**(`planet`, `center`, `radius`): `void`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `planet` | `Planet`      |
| `center` | `WorldCoords` |
| `radius` | `number`      |

#### Returns

`void`

---

### queueBlackDomain

▸ `Private` **queueBlackDomain**(`planet`, `center`, `radius`): `void`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `planet` | `Planet`      |
| `center` | `WorldCoords` |
| `radius` | `number`      |

#### Returns

`void`

---

### queueHat

▸ `Private` **queueHat**(`planet`, `center`, `radius`): `void`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `planet` | `Planet`      |
| `center` | `WorldCoords` |
| `radius` | `number`      |

#### Returns

`void`

---

### queueLocation

▸ **queueLocation**(`renderInfo`, `now`, `highPerfMode`): `void`

#### Parameters

| Name           | Type                                                                                       |
| :------------- | :----------------------------------------------------------------------------------------- |
| `renderInfo`   | [`PlanetRenderInfo`](../interfaces/Backend_GameLogic_ViewportEntities.PlanetRenderInfo.md) |
| `now`          | `number`                                                                                   |
| `highPerfMode` | `boolean`                                                                                  |

#### Returns

`void`

---

### queuePlanetBody

▸ `Private` **queuePlanetBody**(`planet`, `centerW`, `radiusW`): `void`

#### Parameters

| Name      | Type          |
| :-------- | :------------ |
| `planet`  | `Planet`      |
| `centerW` | `WorldCoords` |
| `radiusW` | `number`      |

#### Returns

`void`

---

### queuePlanetEnergyText

▸ `Private` **queuePlanetEnergyText**(`planet`, `center`, `radius`, `alpha`): `void`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `planet` | `Planet`      |
| `center` | `WorldCoords` |
| `radius` | `number`      |
| `alpha`  | `number`      |

#### Returns

`void`

---

### queuePlanetSilverText

▸ `Private` **queuePlanetSilverText**(`planet`, `center`, `radius`, `alpha`): `void`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `planet` | `Planet`      |
| `center` | `WorldCoords` |
| `radius` | `number`      |
| `alpha`  | `number`      |

#### Returns

`void`

---

### queuePlanets

▸ **queuePlanets**(`cachedPlanets`, `now`, `highPerfMode`): `void`

#### Parameters

| Name            | Type                                                                                                             |
| :-------------- | :--------------------------------------------------------------------------------------------------------------- |
| `cachedPlanets` | `Map`<`LocationId`, [`PlanetRenderInfo`](../interfaces/Backend_GameLogic_ViewportEntities.PlanetRenderInfo.md)\> |
| `now`           | `number`                                                                                                         |
| `highPerfMode`  | `boolean`                                                                                                        |

#### Returns

`void`

---

### queueRangeRings

▸ **queueRangeRings**(`planet`): `void`

Renders three rings around the planet that show the player how far this planet can attack.

#### Parameters

| Name     | Type              |
| :------- | :---------------- |
| `planet` | `LocatablePlanet` |

#### Returns

`void`

---

### queueRings

▸ `Private` **queueRings**(`planet`, `center`, `radius`): `void`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `planet` | `Planet`      |
| `center` | `WorldCoords` |
| `radius` | `number`      |

#### Returns

`void`
