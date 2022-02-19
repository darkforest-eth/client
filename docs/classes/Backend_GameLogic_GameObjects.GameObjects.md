# Class: GameObjects

[Backend/GameLogic/GameObjects](../modules/Backend_GameLogic_GameObjects.md).GameObjects

Representation of the objects which exist in the world.

## Table of contents

### Constructors

- [constructor](Backend_GameLogic_GameObjects.GameObjects.md#constructor)

### Properties

- [address](Backend_GameLogic_GameObjects.GameObjects.md#address)
- [arrivals](Backend_GameLogic_GameObjects.GameObjects.md#arrivals)
- [artifactUpdated$](Backend_GameLogic_GameObjects.GameObjects.md#artifactupdated$)
- [artifacts](Backend_GameLogic_GameObjects.GameObjects.md#artifacts)
- [claimedLocations](Backend_GameLogic_GameObjects.GameObjects.md#claimedlocations)
- [contractConstants](Backend_GameLogic_GameObjects.GameObjects.md#contractconstants)
- [coordsToLocation](Backend_GameLogic_GameObjects.GameObjects.md#coordstolocation)
- [layeredMap](Backend_GameLogic_GameObjects.GameObjects.md#layeredmap)
- [myArtifacts](Backend_GameLogic_GameObjects.GameObjects.md#myartifacts)
- [myArtifactsUpdated$](Backend_GameLogic_GameObjects.GameObjects.md#myartifactsupdated$)
- [myPlanets](Backend_GameLogic_GameObjects.GameObjects.md#myplanets)
- [myPlanetsUpdated$](Backend_GameLogic_GameObjects.GameObjects.md#myplanetsupdated$)
- [planetArrivalIds](Backend_GameLogic_GameObjects.GameObjects.md#planetarrivalids)
- [planetLocationMap](Backend_GameLogic_GameObjects.GameObjects.md#planetlocationmap)
- [planetUpdated$](Backend_GameLogic_GameObjects.GameObjects.md#planetupdated$)
- [planets](Backend_GameLogic_GameObjects.GameObjects.md#planets)
- [revealedLocations](Backend_GameLogic_GameObjects.GameObjects.md#revealedlocations)
- [touchedPlanetIds](Backend_GameLogic_GameObjects.GameObjects.md#touchedplanetids)
- [transactions](Backend_GameLogic_GameObjects.GameObjects.md#transactions)
- [wormholes](Backend_GameLogic_GameObjects.GameObjects.md#wormholes)

### Methods

- [addPlanetLocation](Backend_GameLogic_GameObjects.GameObjects.md#addplanetlocation)
- [clearOldArrivals](Backend_GameLogic_GameObjects.GameObjects.md#clearoldarrivals)
- [clearUnconfirmedTxIntent](Backend_GameLogic_GameObjects.GameObjects.md#clearunconfirmedtxintent)
- [defaultPlanetFromLocation](Backend_GameLogic_GameObjects.GameObjects.md#defaultplanetfromlocation)
- [emitArrivalNotifications](Backend_GameLogic_GameObjects.GameObjects.md#emitarrivalnotifications)
- [forceTick](Backend_GameLogic_GameObjects.GameObjects.md#forcetick)
- [getAllOwnedPlanets](Backend_GameLogic_GameObjects.GameObjects.md#getallownedplanets)
- [getAllPlanets](Backend_GameLogic_GameObjects.GameObjects.md#getallplanets)
- [getAllPlanetsMap](Backend_GameLogic_GameObjects.GameObjects.md#getallplanetsmap)
- [getAllVoyages](Backend_GameLogic_GameObjects.GameObjects.md#getallvoyages)
- [getArrivalIdsForLocation](Backend_GameLogic_GameObjects.GameObjects.md#getarrivalidsforlocation)
- [getArtifactById](Backend_GameLogic_GameObjects.GameObjects.md#getartifactbyid)
- [getArtifactController](Backend_GameLogic_GameObjects.GameObjects.md#getartifactcontroller)
- [getArtifactMap](Backend_GameLogic_GameObjects.GameObjects.md#getartifactmap)
- [getArtifactsOnPlanetsOwnedBy](Backend_GameLogic_GameObjects.GameObjects.md#getartifactsonplanetsownedby)
- [getArtifactsOwnedBy](Backend_GameLogic_GameObjects.GameObjects.md#getartifactsownedby)
- [getBiome](Backend_GameLogic_GameObjects.GameObjects.md#getbiome)
- [getClaimedLocations](Backend_GameLogic_GameObjects.GameObjects.md#getclaimedlocations)
- [getEnergyCurveAtPercent](Backend_GameLogic_GameObjects.GameObjects.md#getenergycurveatpercent)
- [getLocationOfPlanet](Backend_GameLogic_GameObjects.GameObjects.md#getlocationofplanet)
- [getMyArtifactMap](Backend_GameLogic_GameObjects.GameObjects.md#getmyartifactmap)
- [getMyPlanetMap](Backend_GameLogic_GameObjects.GameObjects.md#getmyplanetmap)
- [getPlanetArtifacts](Backend_GameLogic_GameObjects.GameObjects.md#getplanetartifacts)
- [getPlanetDetailLevel](Backend_GameLogic_GameObjects.GameObjects.md#getplanetdetaillevel)
- [getPlanetLevel](Backend_GameLogic_GameObjects.GameObjects.md#getplanetlevel)
- [getPlanetMap](Backend_GameLogic_GameObjects.GameObjects.md#getplanetmap)
- [getPlanetWithCoords](Backend_GameLogic_GameObjects.GameObjects.md#getplanetwithcoords)
- [getPlanetWithId](Backend_GameLogic_GameObjects.GameObjects.md#getplanetwithid)
- [getPlanetWithLocation](Backend_GameLogic_GameObjects.GameObjects.md#getplanetwithlocation)
- [getPlanetsInWorldCircle](Backend_GameLogic_GameObjects.GameObjects.md#getplanetsinworldcircle)
- [getPlanetsInWorldRectangle](Backend_GameLogic_GameObjects.GameObjects.md#getplanetsinworldrectangle)
- [getPlanetsWithIds](Backend_GameLogic_GameObjects.GameObjects.md#getplanetswithids)
- [getRevealedLocations](Backend_GameLogic_GameObjects.GameObjects.md#getrevealedlocations)
- [getSilverCurveAtPercent](Backend_GameLogic_GameObjects.GameObjects.md#getsilvercurveatpercent)
- [getWormholes](Backend_GameLogic_GameObjects.GameObjects.md#getwormholes)
- [isGettingSpaceships](Backend_GameLogic_GameObjects.GameObjects.md#isgettingspaceships)
- [isPlanetInContract](Backend_GameLogic_GameObjects.GameObjects.md#isplanetincontract)
- [markLocationRevealed](Backend_GameLogic_GameObjects.GameObjects.md#marklocationrevealed)
- [onTxIntent](Backend_GameLogic_GameObjects.GameObjects.md#ontxintent)
- [planetLevelFromHexPerlin](Backend_GameLogic_GameObjects.GameObjects.md#planetlevelfromhexperlin)
- [planetTypeFromHexPerlin](Backend_GameLogic_GameObjects.GameObjects.md#planettypefromhexperlin)
- [processArrivalsForPlanet](Backend_GameLogic_GameObjects.GameObjects.md#processarrivalsforplanet)
- [removeArrival](Backend_GameLogic_GameObjects.GameObjects.md#removearrival)
- [replaceArtifactFromContractData](Backend_GameLogic_GameObjects.GameObjects.md#replaceartifactfromcontractdata)
- [replaceArtifactsFromContractData](Backend_GameLogic_GameObjects.GameObjects.md#replaceartifactsfromcontractdata)
- [replacePlanetFromContractData](Backend_GameLogic_GameObjects.GameObjects.md#replaceplanetfromcontractdata)
- [setArtifact](Backend_GameLogic_GameObjects.GameObjects.md#setartifact)
- [setClaimedLocation](Backend_GameLogic_GameObjects.GameObjects.md#setclaimedlocation)
- [setPlanet](Backend_GameLogic_GameObjects.GameObjects.md#setplanet)
- [spaceTypeFromPerlin](Backend_GameLogic_GameObjects.GameObjects.md#spacetypefromperlin)
- [updateArtifact](Backend_GameLogic_GameObjects.GameObjects.md#updateartifact)
- [updatePlanet](Backend_GameLogic_GameObjects.GameObjects.md#updateplanet)
- [updatePlanetIfStale](Backend_GameLogic_GameObjects.GameObjects.md#updateplanetifstale)
- [getSilverNeeded](Backend_GameLogic_GameObjects.GameObjects.md#getsilverneeded)
- [planetCanUpgrade](Backend_GameLogic_GameObjects.GameObjects.md#planetcanupgrade)

## Constructors

### constructor

• **new GameObjects**(`address`, `touchedPlanets`, `allTouchedPlanetIds`, `revealedLocations`, `claimedLocations`, `artifacts`, `allChunks`, `unprocessedArrivals`, `unprocessedPlanetArrivalIds`, `contractConstants`, `worldRadius`)

#### Parameters

| Name                          | Type                                                                                             |
| :---------------------------- | :----------------------------------------------------------------------------------------------- |
| `address`                     | `undefined` \| `EthAddress`                                                                      |
| `touchedPlanets`              | `Map`<`LocationId`, `Planet`\>                                                                   |
| `allTouchedPlanetIds`         | `Set`<`LocationId`\>                                                                             |
| `revealedLocations`           | `Map`<`LocationId`, `RevealedLocation`\>                                                         |
| `claimedLocations`            | `Map`<`LocationId`, `ClaimedLocation`\>                                                          |
| `artifacts`                   | `Map`<`ArtifactId`, `Artifact`\>                                                                 |
| `allChunks`                   | `Iterable`<`Chunk`\>                                                                             |
| `unprocessedArrivals`         | `Map`<`VoyageId`, `QueuedArrival`\>                                                              |
| `unprocessedPlanetArrivalIds` | `Map`<`LocationId`, `VoyageId`[]\>                                                               |
| `contractConstants`           | [`ContractConstants`](../interfaces/types_darkforest_api_ContractsAPITypes.ContractConstants.md) |
| `worldRadius`                 | `number`                                                                                         |

## Properties

### address

• `Private` `Readonly` **address**: `undefined` \| `EthAddress`

This address of the player that is currently logged in.

**`todo`** move this, along with all other objects relating to the currently logged-on player into a
new field: {@code player: PlayerInfo}

---

### arrivals

• `Private` `Readonly` **arrivals**: `Map`<`VoyageId`, `ArrivalWithTimer`\>

Map of arrivals to timers that fire when an arrival arrives, in case that handler needs to be
cancelled for whatever reason.

---

### artifactUpdated$

• `Readonly` **artifactUpdated$**: `Monomitter`<`ArtifactId`\>

Event emitter which publishes whenever an artifact has been updated.

---

### artifacts

• `Private` `Readonly` **artifacts**: `Map`<`ArtifactId`, `Artifact`\>

Cached index of all known artifact data.

**`see`** The same warning applys as the one on [GameObjects.planets](Backend_GameLogic_GameObjects.GameObjects.md#planets)

---

### claimedLocations

• `Private` `Readonly` **claimedLocations**: `Map`<`LocationId`, `ClaimedLocation`\>

Map from location ids to, if that location id has been claimed on-chain, the world coordinates
of that location id, as well as some extra information regarding the circumstances of the
revealing of this planet.

---

### contractConstants

• `Private` `Readonly` **contractConstants**: [`ContractConstants`](../interfaces/types_darkforest_api_ContractsAPITypes.ContractConstants.md)

Some of the game's parameters are downloaded from the blockchain. This allows the client to be
flexible, and connect to any compatible set of Dark Forest contracts, download the parameters,
and join the game, taking into account the unique configuration of those specific Dark Forest
contracts.

---

### coordsToLocation

• `Private` `Readonly` **coordsToLocation**: `Map`<`CoordsString`, `WorldLocation`\>

Map from a stringified representation of an x-y coordinate to an object that contains some more
information about the world at that location.

---

### layeredMap

• `Private` `Readonly` **layeredMap**: [`LayeredMap`](Backend_GameLogic_LayeredMap.LayeredMap.md)

This is a data structure that allows us to efficiently calculate which planets are visible on
the player's screen given the viewport's position and size.

---

### myArtifacts

• `Private` `Readonly` **myArtifacts**: `Map`<`ArtifactId`, `Artifact`\>

Cached index of artifacts owned by the player.

**`see`** The same warning applys as the one on [GameObjects.planets](Backend_GameLogic_GameObjects.GameObjects.md#planets)

---

### myArtifactsUpdated$

• `Readonly` **myArtifactsUpdated$**: `Monomitter`<`Map`<`ArtifactId`, `Artifact`\>\>

Whenever one of the player's artifacts are updated, this event emitter publishes. See
[GameObjects.myPlanetsUpdated$](Backend_GameLogic_GameObjects.GameObjects.md#myplanetsupdated$) for more info.

---

### myPlanets

• `Private` `Readonly` **myPlanets**: `Map`<`LocationId`, `Planet`\>

Cached index of planets owned by the player.

**`see`** The same warning applys as the one on [GameObjects.planets](Backend_GameLogic_GameObjects.GameObjects.md#planets)

---

### myPlanetsUpdated$

• `Readonly` **myPlanetsUpdated$**: `Monomitter`<`Map`<`LocationId`, `Planet`\>\>

Whenever a planet is updated, we publish to this event with a reference to a map from location
id to planet. We need to rethink this event emitter because it currently publishes every time
that any planet is updated, and if a lot of them are updated at once (which i think is the case
once every two minutes) then this event emitter will publish a shitton of events.
TODO: rethink this

---

### planetArrivalIds

• `Private` `Readonly` **planetArrivalIds**: `Map`<`LocationId`, `VoyageId`[]\>

Map from a location id (think of it as the unique id of each planet) to all the ids of the
voyages that are arriving on that planet. These include both the player's own voyages, and also
any potential invader's voyages.

---

### planetLocationMap

• `Private` `Readonly` **planetLocationMap**: `Map`<`LocationId`, `WorldLocation`\>

Map from location id (unique id of each planet) to some information about the location at which
this planet is located, if this client happens to know the coordinates of this planet.

---

### planetUpdated$

• `Readonly` **planetUpdated$**: `Monomitter`<`LocationId`\>

Event emitter which publishes whenever a planet is updated.

---

### planets

• `Private` `Readonly` **planets**: `Map`<`LocationId`, `Planet`\>

Cached index of all known planet data.

Warning!

This should NEVER be set to directly! Any time you want to update a planet, you must call the
{@link GameObjects#setPlanet()} function. Following this rule enables us to reliably notify
other parts of the client when a particular object has been updated. TODO: what is the best way
to do this?

**`todo`** extract the pattern we're using for the field tuples

- {planets, myPlanets, myPlanetsUpdated, planetUpdated$}
- {artifacts, myArtifacts, myArtifactsUpdated, artifactUpdated$}

into some sort of class.

---

### revealedLocations

• `Private` `Readonly` **revealedLocations**: `Map`<`LocationId`, `RevealedLocation`\>

Map from location ids to, if that location id has been revealed on-chain, the world coordinates
of that location id, as well as some extra information regarding the circumstances of the
revealing of this planet.

---

### touchedPlanetIds

• `Private` `Readonly` **touchedPlanetIds**: `Set`<`LocationId`\>

Set of all planet ids that we know have been interacted-with on-chain.

---

### transactions

• `Readonly` **transactions**: `TransactionCollection`

Transactions that are currently in flight.

---

### wormholes

• `Private` `Readonly` **wormholes**: `Map`<`ArtifactId`, `Wormhole`\>

Map from artifact ids to wormholes.

## Methods

### addPlanetLocation

▸ **addPlanetLocation**(`planetLocation`): `void`

Called when we load chunk data into memory (on startup), when we're loading all revealed locations (on startup),
when miner has mined a new chunk while exploring, and when a planet's location is revealed onchain during the course of play
Adds a WorldLocation to the planetLocationMap, making it known to the player locally
Sets an unsynced default planet in the PlanetMap this.planets
IMPORTANT: This is the only way a LocatablePlanet gets constructed
IMPORTANT: Idempotent

#### Parameters

| Name             | Type            |
| :--------------- | :-------------- |
| `planetLocation` | `WorldLocation` |

#### Returns

`void`

---

### clearOldArrivals

▸ `Private` **clearOldArrivals**(`planet`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`void`

---

### clearUnconfirmedTxIntent

▸ **clearUnconfirmedTxIntent**(`tx`): `void`

Whenever a transaction that the user initiated either succeeds or fails, we need to clear the
fact that it was in progress from the event's corresponding entities. For example, whenever a
transaction that sends a voyage from one planet to another either succeeds or fails, we need to
remove the dashed line that connected them.

Making sure that we never miss something here is very tedious.

**`todo`** Make this less tedious.

#### Parameters

| Name | Type                       |
| :--- | :------------------------- |
| `tx` | `Transaction`<`TxIntent`\> |

#### Returns

`void`

---

### defaultPlanetFromLocation

▸ `Private` **defaultPlanetFromLocation**(`location`): `LocatablePlanet`

returns the data for an unowned, untouched planet at location
most planets in the game are untouched and not stored in the contract,
so we need to generate their data optimistically in the client

#### Parameters

| Name       | Type            |
| :--------- | :-------------- |
| `location` | `WorldLocation` |

#### Returns

`LocatablePlanet`

---

### emitArrivalNotifications

▸ `Private` **emitArrivalNotifications**(`__namedParameters`): `void`

Emit notifications based on a planet's state change

#### Parameters

| Name                | Type                                                                       |
| :------------------ | :------------------------------------------------------------------------- |
| `__namedParameters` | [`PlanetDiff`](../interfaces/Backend_GameLogic_ArrivalUtils.PlanetDiff.md) |

#### Returns

`void`

---

### forceTick

▸ **forceTick**(`locationId`): `void`

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `locationId` | `LocationId` |

#### Returns

`void`

---

### getAllOwnedPlanets

▸ **getAllOwnedPlanets**(): `Planet`[]

Returns all the planets in the game which this client is aware of that have an owner, as a map
from their id to the planet

**`tutorial`** For plugin developers!

**`see`** Warning in {@link GameObjects.getAllPlanets()}

#### Returns

`Planet`[]

---

### getAllPlanets

▸ **getAllPlanets**(): `Iterable`<`Planet`\>

Returns all planets in the game.

Warning! Simply iterating over this is not performant, and is meant for scripting.

**`tutorial`** For plugin developers!

#### Returns

`Iterable`<`Planet`\>

---

### getAllPlanetsMap

▸ **getAllPlanetsMap**(): `Map`<`LocationId`, `Planet`\>

Returns all planets in the game, as a map from their location id to the planet.

**`tutorial`** For plugin developers!

**`see`** Warning in {@link GameObjects.getAllPlanets()}

#### Returns

`Map`<`LocationId`, `Planet`\>

---

### getAllVoyages

▸ **getAllVoyages**(): `QueuedArrival`[]

Returns all voyages that are scheduled to arrive at some point in the future.

**`tutorial`** For plugin developers!

**`see`** Warning in {@link GameObjects.getAllPlanets()}

#### Returns

`QueuedArrival`[]

---

### getArrivalIdsForLocation

▸ **getArrivalIdsForLocation**(`location`): `undefined` \| `VoyageId`[]

Get all of the incoming voyages for a given location.

#### Parameters

| Name       | Type                        |
| :--------- | :-------------------------- |
| `location` | `undefined` \| `LocationId` |

#### Returns

`undefined` \| `VoyageId`[]

---

### getArtifactById

▸ **getArtifactById**(`artifactId?`): `undefined` \| `Artifact`

#### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `artifactId?` | `ArtifactId` |

#### Returns

`undefined` \| `Artifact`

---

### getArtifactController

▸ **getArtifactController**(`artifactId`): `undefined` \| `EthAddress`

Returns the EthAddress of the player who can control the owner:
if the artifact is on a planet, this is the owner of the planet
if the artifact is on a voyage, this is the initiator of the voyage
if the artifact is not on either, then it is the owner of the artifact NFT

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `artifactId` | `ArtifactId` |

#### Returns

`undefined` \| `EthAddress`

---

### getArtifactMap

▸ **getArtifactMap**(): `Map`<`ArtifactId`, `Artifact`\>

#### Returns

`Map`<`ArtifactId`, `Artifact`\>

---

### getArtifactsOnPlanetsOwnedBy

▸ **getArtifactsOnPlanetsOwnedBy**(`addr`): `Artifact`[]

#### Parameters

| Name   | Type         |
| :----- | :----------- |
| `addr` | `EthAddress` |

#### Returns

`Artifact`[]

---

### getArtifactsOwnedBy

▸ **getArtifactsOwnedBy**(`addr`): `Artifact`[]

#### Parameters

| Name   | Type         |
| :----- | :----------- |
| `addr` | `EthAddress` |

#### Returns

`Artifact`[]

---

### getBiome

▸ `Private` **getBiome**(`loc`): `Biome`

#### Parameters

| Name  | Type            |
| :---- | :-------------- |
| `loc` | `WorldLocation` |

#### Returns

`Biome`

---

### getClaimedLocations

▸ **getClaimedLocations**(): `Map`<`LocationId`, `ClaimedLocation`\>

#### Returns

`Map`<`LocationId`, `ClaimedLocation`\>

---

### getEnergyCurveAtPercent

▸ **getEnergyCurveAtPercent**(`planet`, `percent`): `number`

returns timestamp (seconds) that planet will reach percent% of energycap
time may be in the past

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `planet`  | `Planet` |
| `percent` | `number` |

#### Returns

`number`

---

### getLocationOfPlanet

▸ **getLocationOfPlanet**(`planetId`): `undefined` \| `WorldLocation`

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`undefined` \| `WorldLocation`

---

### getMyArtifactMap

▸ **getMyArtifactMap**(): `Map`<`ArtifactId`, `Artifact`\>

#### Returns

`Map`<`ArtifactId`, `Artifact`\>

---

### getMyPlanetMap

▸ **getMyPlanetMap**(): `Map`<`LocationId`, `Planet`\>

#### Returns

`Map`<`LocationId`, `Planet`\>

---

### getPlanetArtifacts

▸ **getPlanetArtifacts**(`planetId`): `Artifact`[]

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`Artifact`[]

---

### getPlanetDetailLevel

▸ **getPlanetDetailLevel**(`planetId`): `undefined` \| `number`

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`undefined` \| `number`

---

### getPlanetLevel

▸ **getPlanetLevel**(`planetId`): `undefined` \| `PlanetLevel`

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`undefined` \| `PlanetLevel`

---

### getPlanetMap

▸ **getPlanetMap**(): `Map`<`LocationId`, `Planet`\>

#### Returns

`Map`<`LocationId`, `Planet`\>

---

### getPlanetWithCoords

▸ **getPlanetWithCoords**(`coords`): `undefined` \| `LocatablePlanet`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |

#### Returns

`undefined` \| `LocatablePlanet`

---

### getPlanetWithId

▸ **getPlanetWithId**(`planetId`, `updateIfStale?`): `undefined` \| `Planet`

#### Parameters

| Name            | Type         | Default value |
| :-------------- | :----------- | :------------ |
| `planetId`      | `LocationId` | `undefined`   |
| `updateIfStale` | `boolean`    | `true`        |

#### Returns

`undefined` \| `Planet`

---

### getPlanetWithLocation

▸ **getPlanetWithLocation**(`location`): `undefined` \| `Planet`

#### Parameters

| Name       | Type                           |
| :--------- | :----------------------------- |
| `location` | `undefined` \| `WorldLocation` |

#### Returns

`undefined` \| `Planet`

---

### getPlanetsInWorldCircle

▸ **getPlanetsInWorldCircle**(`coords`, `radius`): `LocatablePlanet`[]

Gets all the planets that are within {@code radius} world units from the given coordinate. Fast
because it uses [LayeredMap](Backend_GameLogic_LayeredMap.LayeredMap.md).

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |
| `radius` | `number`      |

#### Returns

`LocatablePlanet`[]

---

### getPlanetsInWorldRectangle

▸ **getPlanetsInWorldRectangle**(`worldX`, `worldY`, `worldWidth`, `worldHeight`, `levels`, `planetLevelToRadii`, `updateIfStale?`): `LocatablePlanet`[]

Gets the ids of all the planets that are both within the given bounding box (defined by its
bottom left coordinate, width, and height) in the world and of a level that was passed in via
the `planetLevels` parameter. Fast because it uses [LayeredMap](Backend_GameLogic_LayeredMap.LayeredMap.md).

#### Parameters

| Name                 | Type                      | Default value |
| :------------------- | :------------------------ | :------------ |
| `worldX`             | `number`                  | `undefined`   |
| `worldY`             | `number`                  | `undefined`   |
| `worldWidth`         | `number`                  | `undefined`   |
| `worldHeight`        | `number`                  | `undefined`   |
| `levels`             | `number`[]                | `undefined`   |
| `planetLevelToRadii` | `Map`<`number`, `Radii`\> | `undefined`   |
| `updateIfStale`      | `boolean`                 | `true`        |

#### Returns

`LocatablePlanet`[]

---

### getPlanetsWithIds

▸ **getPlanetsWithIds**(`locationIds`, `updateIfStale?`): `Planet`[]

Gets all the planets with the given ids, giltering out the ones that we don't have.

#### Parameters

| Name            | Type           | Default value |
| :-------------- | :------------- | :------------ |
| `locationIds`   | `LocationId`[] | `undefined`   |
| `updateIfStale` | `boolean`      | `true`        |

#### Returns

`Planet`[]

---

### getRevealedLocations

▸ **getRevealedLocations**(): `Map`<`LocationId`, `RevealedLocation`\>

#### Returns

`Map`<`LocationId`, `RevealedLocation`\>

---

### getSilverCurveAtPercent

▸ **getSilverCurveAtPercent**(`planet`, `percent`): `undefined` \| `number`

returns timestamp (seconds) that planet will reach percent% of silcap if
doesn't produce silver, returns undefined if already over percent% of silcap,
returns undefined

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `planet`  | `Planet` |
| `percent` | `number` |

#### Returns

`undefined` \| `number`

---

### getWormholes

▸ **getWormholes**(): `Iterable`<`Wormhole`\>

#### Returns

`Iterable`<`Wormhole`\>

---

### isGettingSpaceships

▸ **isGettingSpaceships**(): `boolean`

Whether or not we're already asking the game to give us spaceships.

#### Returns

`boolean`

---

### isPlanetInContract

▸ **isPlanetInContract**(`planetId`): `boolean`

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`boolean`

---

### markLocationRevealed

▸ **markLocationRevealed**(`revealedLocation`): `void`

#### Parameters

| Name               | Type               |
| :----------------- | :----------------- |
| `revealedLocation` | `RevealedLocation` |

#### Returns

`void`

---

### onTxIntent

▸ **onTxIntent**(`tx`): `void`

We call this function whenever the user requests that we send a transaction to the blockchain
with their localstorage wallet. You can think of it as one of the hubs which connects
`GameObjects` to the rest of the world.

Inside this function, we update the relevant internal game objects to reflect that the user has
requested a particular action. Additionally, we publish the appropriate events to the relevant
{@link Monomitter} instances that are stored in this class.

In the case of something like prospecting for an artifact, this allows us to display a spinner
text which says "Prospecting..."

In the case of the user sending energy from one planet to another planet, this allows us to
display a dashed line between the two planets in their new voyage.

Whenever we update an entity, we must do it via that entity's type's corresponding
`set<EntityType>` function, in order for us to publish these events.

**`todo:`** this entire function could be automated by implementing a new interface called
{@code TxFilter}.

#### Parameters

| Name | Type                       |
| :--- | :------------------------- |
| `tx` | `Transaction`<`TxIntent`\> |

#### Returns

`void`

---

### planetLevelFromHexPerlin

▸ **planetLevelFromHexPerlin**(`hex`, `perlin`): `PlanetLevel`

#### Parameters

| Name     | Type         |
| :------- | :----------- |
| `hex`    | `LocationId` |
| `perlin` | `number`     |

#### Returns

`PlanetLevel`

---

### planetTypeFromHexPerlin

▸ **planetTypeFromHexPerlin**(`hex`, `perlin`): `PlanetType`

#### Parameters

| Name     | Type         |
| :------- | :----------- |
| `hex`    | `LocationId` |
| `perlin` | `number`     |

#### Returns

`PlanetType`

---

### processArrivalsForPlanet

▸ `Private` **processArrivalsForPlanet**(`planetId`, `arrivals`): `ArrivalWithTimer`[]

#### Parameters

| Name       | Type              |
| :--------- | :---------------- |
| `planetId` | `LocationId`      |
| `arrivals` | `QueuedArrival`[] |

#### Returns

`ArrivalWithTimer`[]

---

### removeArrival

▸ `Private` **removeArrival**(`planetId`, `arrivalId`): `void`

#### Parameters

| Name        | Type         |
| :---------- | :----------- |
| `planetId`  | `LocationId` |
| `arrivalId` | `VoyageId`   |

#### Returns

`void`

---

### replaceArtifactFromContractData

▸ **replaceArtifactFromContractData**(`artifact`): `void`

received some artifact data from the contract. update our stores

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `artifact` | `Artifact` |

#### Returns

`void`

---

### replaceArtifactsFromContractData

▸ **replaceArtifactsFromContractData**(`artifacts`): `void`

#### Parameters

| Name        | Type                    |
| :---------- | :---------------------- |
| `artifacts` | `Iterable`<`Artifact`\> |

#### Returns

`void`

---

### replacePlanetFromContractData

▸ **replacePlanetFromContractData**(`planet`, `updatedArrivals?`, `updatedArtifactsOnPlanet?`, `revealedLocation?`, `claimerEthAddress?`): `void`

received some planet data from the contract. update our stores

#### Parameters

| Name                        | Type               |
| :-------------------------- | :----------------- |
| `planet`                    | `Planet`           |
| `updatedArrivals?`          | `QueuedArrival`[]  |
| `updatedArtifactsOnPlanet?` | `ArtifactId`[]     |
| `revealedLocation?`         | `RevealedLocation` |
| `claimerEthAddress?`        | `EthAddress`       |

#### Returns

`void`

---

### setArtifact

▸ `Private` **setArtifact**(`artifact`): `void`

Set an artifact into our cached store. Should ALWAYS call this when setting an artifact.
`this.artifacts` and `this.myArtifacts` should NEVER be accessed directly!
This function also handles managing artifact update messages and indexing the map of owned artifacts.

#### Parameters

| Name       | Type       | Description         |
| :--------- | :--------- | :------------------ |
| `artifact` | `Artifact` | the artifact to set |

#### Returns

`void`

---

### setClaimedLocation

▸ **setClaimedLocation**(`claimedLocation`): `void`

#### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `claimedLocation` | `ClaimedLocation` |

#### Returns

`void`

---

### setPlanet

▸ `Private` **setPlanet**(`planet`): `void`

Set a planet into our cached store. Should ALWAYS call this when setting a planet.
`this.planets` and `this.myPlanets` should NEVER be accessed directly!
This function also handles managing planet update messages and indexing the map of owned planets.

#### Parameters

| Name     | Type     | Description       |
| :------- | :------- | :---------------- |
| `planet` | `Planet` | the planet to set |

#### Returns

`void`

---

### spaceTypeFromPerlin

▸ **spaceTypeFromPerlin**(`perlin`): `SpaceType`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `perlin` | `number` |

#### Returns

`SpaceType`

---

### updateArtifact

▸ **updateArtifact**(`id`, `updateFn`): `void`

Given a planet id, update the state of the given planet by calling the given update function.
If the planet was updated, then also publish the appropriate event.

#### Parameters

| Name       | Type                        |
| :--------- | :-------------------------- |
| `id`       | `undefined` \| `ArtifactId` |
| `updateFn` | (`p`: `Artifact`) => `void` |

#### Returns

`void`

---

### updatePlanet

▸ **updatePlanet**(`id`, `updateFn`): `void`

Given a planet id, update the state of the given planet by calling the given update function.
If the planet was updated, then also publish the appropriate event.

#### Parameters

| Name       | Type                      |
| :--------- | :------------------------ |
| `id`       | `LocationId`              |
| `updateFn` | (`p`: `Planet`) => `void` |

#### Returns

`void`

---

### updatePlanetIfStale

▸ `Private` **updatePlanetIfStale**(`planet`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`void`

---

### getSilverNeeded

▸ `Static` **getSilverNeeded**(`planet`): `number`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`number`

---

### planetCanUpgrade

▸ `Static` **planetCanUpgrade**(`planet`): `boolean`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`boolean`
