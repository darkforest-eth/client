# Class: LayeredMap

[Backend/GameLogic/LayeredMap](../modules/backend_gamelogic_layeredmap.md).LayeredMap

Data structure which allows us to efficiently query for "which planets between level X and X + n
(for positive n) are present in the given world rectangle", as well as, in the future, "which
chunks are visible in the vieport".

## Table of contents

### Constructors

- [constructor](backend_gamelogic_layeredmap.layeredmap.md#constructor)

### Properties

- [insertedLocations](backend_gamelogic_layeredmap.layeredmap.md#insertedlocations)
- [perLevelPlanetQuadtrees](backend_gamelogic_layeredmap.layeredmap.md#perlevelplanetquadtrees)

### Methods

- [getPlanets](backend_gamelogic_layeredmap.layeredmap.md#getplanets)
- [insertPlanet](backend_gamelogic_layeredmap.layeredmap.md#insertplanet)

## Constructors

### constructor

\+ **new LayeredMap**(`worldRadius`: _number_): [_LayeredMap_](backend_gamelogic_layeredmap.layeredmap.md)

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `worldRadius` | _number_ |

**Returns:** [_LayeredMap_](backend_gamelogic_layeredmap.layeredmap.md)

## Properties

### insertedLocations

• `Private` **insertedLocations**: _Set_<LocationId\>

---

### perLevelPlanetQuadtrees

• `Private` **perLevelPlanetQuadtrees**: _Map_<number, QuadTree\>

## Methods

### getPlanets

▸ **getPlanets**(`worldX`: _number_, `worldY`: _number_, `worldWidth`: _number_, `worldHeight`: _number_, `planetLevels`: _number_[], `planetLevelToRadii`: _Map_<number, [_Radii_](../interfaces/backend_gamelogic_viewportentities.radii.md)\>): LocationId[]

Gets the ids of all the planets that are both within the given bounding box (defined by its bottom
left coordinate, width, and height) in the world and of a level that was passed in via the
`planetLevels` parameter.

#### Parameters

| Name                 | Type                                                                                 |
| :------------------- | :----------------------------------------------------------------------------------- |
| `worldX`             | _number_                                                                             |
| `worldY`             | _number_                                                                             |
| `worldWidth`         | _number_                                                                             |
| `worldHeight`        | _number_                                                                             |
| `planetLevels`       | _number_[]                                                                           |
| `planetLevelToRadii` | _Map_<number, [_Radii_](../interfaces/backend_gamelogic_viewportentities.radii.md)\> |

**Returns:** LocationId[]

---

### insertPlanet

▸ **insertPlanet**(`location`: WorldLocation, `planetLevel`: _number_): _void_

Records the fact that there is a planet at the given world location.

#### Parameters

| Name          | Type          |
| :------------ | :------------ |
| `location`    | WorldLocation |
| `planetLevel` | _number_      |

**Returns:** _void_
