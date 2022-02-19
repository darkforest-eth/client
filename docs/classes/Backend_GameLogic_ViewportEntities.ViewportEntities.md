# Class: ViewportEntities

[Backend/GameLogic/ViewportEntities](../modules/Backend_GameLogic_ViewportEntities.md).ViewportEntities

Efficiently calculates which planets are in the viewport, and allows you to find the nearest
visible planet to the mouse.

## Table of contents

### Constructors

- [constructor](Backend_GameLogic_ViewportEntities.ViewportEntities.md#constructor)

### Properties

- [cachedExploredChunks](Backend_GameLogic_ViewportEntities.ViewportEntities.md#cachedexploredchunks)
- [cachedPlanets](Backend_GameLogic_ViewportEntities.ViewportEntities.md#cachedplanets)
- [gameManager](Backend_GameLogic_ViewportEntities.ViewportEntities.md#gamemanager)
- [uiManager](Backend_GameLogic_ViewportEntities.ViewportEntities.md#uimanager)

### Methods

- [getNearestVisiblePlanet](Backend_GameLogic_ViewportEntities.ViewportEntities.md#getnearestvisibleplanet)
- [getPlanetRadii](Backend_GameLogic_ViewportEntities.ViewportEntities.md#getplanetradii)
- [getPlanetsAndChunks](Backend_GameLogic_ViewportEntities.ViewportEntities.md#getplanetsandchunks)
- [getVisiblePlanetLevels](Backend_GameLogic_ViewportEntities.ViewportEntities.md#getvisibleplanetlevels)
- [loadPlanetMessages](Backend_GameLogic_ViewportEntities.ViewportEntities.md#loadplanetmessages)
- [recalculateViewportChunks](Backend_GameLogic_ViewportEntities.ViewportEntities.md#recalculateviewportchunks)
- [recalculateViewportPlanets](Backend_GameLogic_ViewportEntities.ViewportEntities.md#recalculateviewportplanets)
- [replacePlanets](Backend_GameLogic_ViewportEntities.ViewportEntities.md#replaceplanets)
- [startRefreshing](Backend_GameLogic_ViewportEntities.ViewportEntities.md#startrefreshing)
- [updateLocationsAndChunks](Backend_GameLogic_ViewportEntities.ViewportEntities.md#updatelocationsandchunks)

## Constructors

### constructor

• **new ViewportEntities**(`gameManager`, `gameUIManager`)

#### Parameters

| Name            | Type                                                    |
| :-------------- | :------------------------------------------------------ |
| `gameManager`   | [`default`](Backend_GameLogic_GameManager.default.md)   |
| `gameUIManager` | [`default`](Backend_GameLogic_GameUIManager.default.md) |

## Properties

### cachedExploredChunks

• `Private` **cachedExploredChunks**: `Set`<`Chunk`\>

---

### cachedPlanets

• `Private` **cachedPlanets**: `Map`<`LocationId`, `PlanetRenderInfo`\>

---

### gameManager

• `Private` `Readonly` **gameManager**: [`default`](Backend_GameLogic_GameManager.default.md)

---

### uiManager

• `Private` `Readonly` **uiManager**: [`default`](Backend_GameLogic_GameUIManager.default.md)

## Methods

### getNearestVisiblePlanet

▸ **getNearestVisiblePlanet**(`coords`): `undefined` \| `LocatablePlanet`

Gets the planet that is closest to the given coordinates. Filters out irrelevant planets
using the `radiusMap` parameter, which specifies how close a planet must be in order to
be returned from this function, given that planet's level. Smaller planets have a smaller
radius, and larger planets have a larger radius.

If a smaller and a larger planet are both within respective radii of coords, the smaller
planet is returned.

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |

#### Returns

`undefined` \| `LocatablePlanet`

---

### getPlanetRadii

▸ `Private` **getPlanetRadii**(`viewport`): `Map`<`PlanetLevel`, `Radii`\>

One entry per planet level - radius in screen pixels of that planet level given the current
viewport configuration, as well as the world radius.

#### Parameters

| Name       | Type                                           |
| :--------- | :--------------------------------------------- |
| `viewport` | [`default`](Frontend_Game_Viewport.default.md) |

#### Returns

`Map`<`PlanetLevel`, `Radii`\>

---

### getPlanetsAndChunks

▸ **getPlanetsAndChunks**(): `Object`

#### Returns

`Object`

| Name            | Type                                     |
| :-------------- | :--------------------------------------- |
| `cachedPlanets` | `Map`<`LocationId`, `PlanetRenderInfo`\> |
| `chunks`        | `Set`<`Chunk`\>                          |

---

### getVisiblePlanetLevels

▸ `Private` **getVisiblePlanetLevels**(`viewport`): `number`[]

Returns a list of planet levels which, when rendered, would result in a planet that has a size
larger than one pixel.

#### Parameters

| Name       | Type                                           |
| :--------- | :--------------------------------------------- |
| `viewport` | [`default`](Frontend_Game_Viewport.default.md) |

#### Returns

`number`[]

---

### loadPlanetMessages

▸ `Private` **loadPlanetMessages**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

---

### recalculateViewportChunks

▸ `Private` **recalculateViewportChunks**(`viewport`): `void`

#### Parameters

| Name       | Type                                           |
| :--------- | :--------------------------------------------- |
| `viewport` | [`default`](Frontend_Game_Viewport.default.md) |

#### Returns

`void`

---

### recalculateViewportPlanets

▸ `Private` **recalculateViewportPlanets**(`viewport`): `void`

#### Parameters

| Name       | Type                                           |
| :--------- | :--------------------------------------------- |
| `viewport` | [`default`](Frontend_Game_Viewport.default.md) |

#### Returns

`void`

---

### replacePlanets

▸ `Private` **replacePlanets**(`newPlanetsInViewport`): `void`

#### Parameters

| Name                   | Type                |
| :--------------------- | :------------------ |
| `newPlanetsInViewport` | `LocatablePlanet`[] |

#### Returns

`void`

---

### startRefreshing

▸ **startRefreshing**(): `void`

#### Returns

`void`

---

### updateLocationsAndChunks

▸ `Private` **updateLocationsAndChunks**(): `void`

#### Returns

`void`
