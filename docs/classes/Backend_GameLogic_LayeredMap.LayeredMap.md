# Class: LayeredMap

[Backend/GameLogic/LayeredMap](../modules/Backend_GameLogic_LayeredMap.md).LayeredMap

Data structure which allows us to efficiently query for "which planets between level X and X + n
(for positive n) are present in the given world rectangle", as well as, in the future, "which
chunks are visible in the vieport".

## Table of contents

### Constructors

- [constructor](Backend_GameLogic_LayeredMap.LayeredMap.md#constructor)

### Properties

- [insertedLocations](Backend_GameLogic_LayeredMap.LayeredMap.md#insertedlocations)
- [perLevelPlanetQuadtrees](Backend_GameLogic_LayeredMap.LayeredMap.md#perlevelplanetquadtrees)

### Methods

- [getPlanets](Backend_GameLogic_LayeredMap.LayeredMap.md#getplanets)
- [getPlanetsInCircle](Backend_GameLogic_LayeredMap.LayeredMap.md#getplanetsincircle)
- [getPointLocationId](Backend_GameLogic_LayeredMap.LayeredMap.md#getpointlocationid)
- [insertPlanet](Backend_GameLogic_LayeredMap.LayeredMap.md#insertplanet)

## Constructors

### constructor

• **new LayeredMap**(`worldRadius`)

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `worldRadius` | `number` |

## Properties

### insertedLocations

• `Private` **insertedLocations**: `Set`<`LocationId`\>

---

### perLevelPlanetQuadtrees

• `Private` **perLevelPlanetQuadtrees**: `Map`<`number`, `QuadTree`\>

## Methods

### getPlanets

▸ **getPlanets**(`worldX`, `worldY`, `worldWidth`, `worldHeight`, `planetLevels`, `planetLevelToRadii`): `LocationId`[]

Gets the ids of all the planets that are both within the given bounding box (defined by its bottom
left coordinate, width, and height) in the world and of a level that was passed in via the
`planetLevels` parameter.

#### Parameters

| Name                 | Type                      |
| :------------------- | :------------------------ |
| `worldX`             | `number`                  |
| `worldY`             | `number`                  |
| `worldWidth`         | `number`                  |
| `worldHeight`        | `number`                  |
| `planetLevels`       | `number`[]                |
| `planetLevelToRadii` | `Map`<`number`, `Radii`\> |

#### Returns

`LocationId`[]

---

### getPlanetsInCircle

▸ **getPlanetsInCircle**(`coords`, `worldRadius`): `LocationId`[]

Gets all the planets within the given world radius of a world location.

#### Parameters

| Name          | Type          |
| :------------ | :------------ |
| `coords`      | `WorldCoords` |
| `worldRadius` | `number`      |

#### Returns

`LocationId`[]

---

### getPointLocationId

▸ `Private` **getPointLocationId**(`point`): `LocationId`

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `point` | `Point` |

#### Returns

`LocationId`

---

### insertPlanet

▸ **insertPlanet**(`location`, `planetLevel`): `void`

Records the fact that there is a planet at the given world location.

#### Parameters

| Name          | Type            |
| :------------ | :-------------- |
| `location`    | `WorldLocation` |
| `planetLevel` | `number`        |

#### Returns

`void`
