# Class: ViewportEntities

[Backend/GameLogic/ViewportEntities](../modules/backend_gamelogic_viewportentities.md).ViewportEntities

Efficiently calculates which planets are in the viewport, and allows you to find the nearest
visible planet to the mouse.

## Table of contents

### Constructors

- [constructor](backend_gamelogic_viewportentities.viewportentities.md#constructor)

### Properties

- [cachedExploredChunks](backend_gamelogic_viewportentities.viewportentities.md#cachedexploredchunks)
- [cachedPlanets](backend_gamelogic_viewportentities.viewportentities.md#cachedplanets)
- [cachedPlanetsAsList](backend_gamelogic_viewportentities.viewportentities.md#cachedplanetsaslist)
- [gameManager](backend_gamelogic_viewportentities.viewportentities.md#gamemanager)
- [uiManager](backend_gamelogic_viewportentities.viewportentities.md#uimanager)

### Methods

- [getNearestVisiblePlanet](backend_gamelogic_viewportentities.viewportentities.md#getnearestvisibleplanet)
- [getPlanetRadii](backend_gamelogic_viewportentities.viewportentities.md#getplanetradii)
- [getPlanetsAndChunks](backend_gamelogic_viewportentities.viewportentities.md#getplanetsandchunks)
- [getVisiblePlanetLevels](backend_gamelogic_viewportentities.viewportentities.md#getvisibleplanetlevels)
- [loadPlanetMessages](backend_gamelogic_viewportentities.viewportentities.md#loadplanetmessages)
- [recalculateViewportChunks](backend_gamelogic_viewportentities.viewportentities.md#recalculateviewportchunks)
- [recalculateViewportPlanets](backend_gamelogic_viewportentities.viewportentities.md#recalculateviewportplanets)
- [replacePlanets](backend_gamelogic_viewportentities.viewportentities.md#replaceplanets)
- [startRefreshing](backend_gamelogic_viewportentities.viewportentities.md#startrefreshing)
- [updateLocationsAndChunks](backend_gamelogic_viewportentities.viewportentities.md#updatelocationsandchunks)

## Constructors

### constructor

\+ **new ViewportEntities**(`gameManager`: [_default_](backend_gamelogic_gamemanager.default.md), `gameUIManager`: [_default_](backend_gamelogic_gameuimanager.default.md)): [_ViewportEntities_](backend_gamelogic_viewportentities.viewportentities.md)

#### Parameters

| Name            | Type                                                    |
| :-------------- | :------------------------------------------------------ |
| `gameManager`   | [_default_](backend_gamelogic_gamemanager.default.md)   |
| `gameUIManager` | [_default_](backend_gamelogic_gameuimanager.default.md) |

**Returns:** [_ViewportEntities_](backend_gamelogic_viewportentities.viewportentities.md)

## Properties

### cachedExploredChunks

• `Private` **cachedExploredChunks**: _Set_<[_Chunk_](_types_global_globaltypes.chunk.md)\>

---

### cachedPlanets

• `Private` **cachedPlanets**: _Map_<LocationId, [_PlanetRenderInfo_](../interfaces/backend_gamelogic_viewportentities.planetrenderinfo.md)\>

---

### cachedPlanetsAsList

• `Private` **cachedPlanetsAsList**: [_PlanetRenderInfo_](../interfaces/backend_gamelogic_viewportentities.planetrenderinfo.md)[]= []

---

### gameManager

• `Private` `Readonly` **gameManager**: [_default_](backend_gamelogic_gamemanager.default.md)

---

### uiManager

• `Private` `Readonly` **uiManager**: [_default_](backend_gamelogic_gameuimanager.default.md)

## Methods

### getNearestVisiblePlanet

▸ **getNearestVisiblePlanet**(`coords`: WorldCoords): _undefined_ \| LocatablePlanet

Gets the planet that is closest to the given coordinates. Filters out irrelevant planets
using the `radiusMap` parameter, which specifies how close a planet must be in order to
be returned from this function, given that planet's level. Smaller planets have a smaller
radius, and larger planets have a larger radius.

If a smaller and a larger planet are both within respective radii of coords, the smaller
planet is returned.

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |

**Returns:** _undefined_ \| LocatablePlanet

---

### getPlanetRadii

▸ `Private` **getPlanetRadii**(`viewport`: [_default_](frontend_game_viewport.default.md)): _Map_<PlanetLevel, [_Radii_](../interfaces/backend_gamelogic_viewportentities.radii.md)\>

One entry per planet level - radius in screen pixels of that planet level given the current
viewport configuration, as well as the world radius.

#### Parameters

| Name       | Type                                           |
| :--------- | :--------------------------------------------- |
| `viewport` | [_default_](frontend_game_viewport.default.md) |

**Returns:** _Map_<PlanetLevel, [_Radii_](../interfaces/backend_gamelogic_viewportentities.radii.md)\>

---

### getPlanetsAndChunks

▸ **getPlanetsAndChunks**(): _object_

**Returns:** _object_

| Name            | Type                                                                                                           |
| :-------------- | :------------------------------------------------------------------------------------------------------------- |
| `cachedPlanets` | _Map_<LocationId, [_PlanetRenderInfo_](../interfaces/backend_gamelogic_viewportentities.planetrenderinfo.md)\> |
| `chunks`        | _Set_<[_Chunk_](_types_global_globaltypes.chunk.md)\>                                                          |

---

### getVisiblePlanetLevels

▸ `Private` **getVisiblePlanetLevels**(`viewport`: [_default_](frontend_game_viewport.default.md)): _number_[]

Returns a list of planet levels which, when rendered, would result in a planet that has a size
larger than one pixel.

#### Parameters

| Name       | Type                                           |
| :--------- | :--------------------------------------------- |
| `viewport` | [_default_](frontend_game_viewport.default.md) |

**Returns:** _number_[]

---

### loadPlanetMessages

▸ `Private` **loadPlanetMessages**(): _Promise_<void\>

**Returns:** _Promise_<void\>

---

### recalculateViewportChunks

▸ `Private` **recalculateViewportChunks**(`viewport`: [_default_](frontend_game_viewport.default.md)): _void_

#### Parameters

| Name       | Type                                           |
| :--------- | :--------------------------------------------- |
| `viewport` | [_default_](frontend_game_viewport.default.md) |

**Returns:** _void_

---

### recalculateViewportPlanets

▸ `Private` **recalculateViewportPlanets**(`viewport`: [_default_](frontend_game_viewport.default.md)): _void_

#### Parameters

| Name       | Type                                           |
| :--------- | :--------------------------------------------- |
| `viewport` | [_default_](frontend_game_viewport.default.md) |

**Returns:** _void_

---

### replacePlanets

▸ `Private` **replacePlanets**(`newPlanetsInViewport`: LocatablePlanet[]): _void_

#### Parameters

| Name                   | Type              |
| :--------------------- | :---------------- |
| `newPlanetsInViewport` | LocatablePlanet[] |

**Returns:** _void_

---

### startRefreshing

▸ **startRefreshing**(): _void_

**Returns:** _void_

---

### updateLocationsAndChunks

▸ `Private` **updateLocationsAndChunks**(): _void_

**Returns:** _void_
