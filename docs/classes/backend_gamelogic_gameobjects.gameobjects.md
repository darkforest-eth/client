# Class: GameObjects

[Backend/GameLogic/GameObjects](../modules/backend_gamelogic_gameobjects.md).GameObjects

Representation of the objects which exist in the world.

## Table of contents

### Constructors

- [constructor](backend_gamelogic_gameobjects.gameobjects.md#constructor)

### Properties

- [address](backend_gamelogic_gameobjects.gameobjects.md#address)
- [arrivals](backend_gamelogic_gameobjects.gameobjects.md#arrivals)
- [artifactUpdated$](backend_gamelogic_gameobjects.gameobjects.md#artifactupdated$)
- [artifacts](backend_gamelogic_gameobjects.gameobjects.md#artifacts)
- [contractConstants](backend_gamelogic_gameobjects.gameobjects.md#contractconstants)
- [coordsToLocation](backend_gamelogic_gameobjects.gameobjects.md#coordstolocation)
- [isBuyingCredits$](backend_gamelogic_gameobjects.gameobjects.md#isbuyingcredits$)
- [layeredMap](backend_gamelogic_gameobjects.gameobjects.md#layeredmap)
- [myArtifacts](backend_gamelogic_gameobjects.gameobjects.md#myartifacts)
- [myArtifactsUpdated$](backend_gamelogic_gameobjects.gameobjects.md#myartifactsupdated$)
- [myPlanets](backend_gamelogic_gameobjects.gameobjects.md#myplanets)
- [myPlanetsUpdated$](backend_gamelogic_gameobjects.gameobjects.md#myplanetsupdated$)
- [planetArrivalIds](backend_gamelogic_gameobjects.gameobjects.md#planetarrivalids)
- [planetLocationMap](backend_gamelogic_gameobjects.gameobjects.md#planetlocationmap)
- [planetUpdated$](backend_gamelogic_gameobjects.gameobjects.md#planetupdated$)
- [planets](backend_gamelogic_gameobjects.gameobjects.md#planets)
- [revealedLocations](backend_gamelogic_gameobjects.gameobjects.md#revealedlocations)
- [touchedPlanetIds](backend_gamelogic_gameobjects.gameobjects.md#touchedplanetids)
- [unconfirmedBuyGPTCredits](backend_gamelogic_gameobjects.gameobjects.md#unconfirmedbuygptcredits)
- [unconfirmedBuyHats](backend_gamelogic_gameobjects.gameobjects.md#unconfirmedbuyhats)
- [unconfirmedMoves](backend_gamelogic_gameobjects.gameobjects.md#unconfirmedmoves)
- [unconfirmedPlanetTransfers](backend_gamelogic_gameobjects.gameobjects.md#unconfirmedplanettransfers)
- [unconfirmedReveal](backend_gamelogic_gameobjects.gameobjects.md#unconfirmedreveal)
- [unconfirmedUpgrades](backend_gamelogic_gameobjects.gameobjects.md#unconfirmedupgrades)
- [unconfirmedWormholeActivations](backend_gamelogic_gameobjects.gameobjects.md#unconfirmedwormholeactivations)
- [wormholes](backend_gamelogic_gameobjects.gameobjects.md#wormholes)

### Methods

- [addPlanetLocation](backend_gamelogic_gameobjects.gameobjects.md#addplanetlocation)
- [calculateSilverSpent](backend_gamelogic_gameobjects.gameobjects.md#calculatesilverspent)
- [clearOldArrivals](backend_gamelogic_gameobjects.gameobjects.md#clearoldarrivals)
- [clearUnconfirmedTxIntent](backend_gamelogic_gameobjects.gameobjects.md#clearunconfirmedtxintent)
- [defaultPlanetFromLocation](backend_gamelogic_gameobjects.gameobjects.md#defaultplanetfromlocation)
- [getAllOwnedPlanets](backend_gamelogic_gameobjects.gameobjects.md#getallownedplanets)
- [getAllPlanets](backend_gamelogic_gameobjects.gameobjects.md#getallplanets)
- [getAllPlanetsMap](backend_gamelogic_gameobjects.gameobjects.md#getallplanetsmap)
- [getAllVoyages](backend_gamelogic_gameobjects.gameobjects.md#getallvoyages)
- [getArtifactById](backend_gamelogic_gameobjects.gameobjects.md#getartifactbyid)
- [getArtifactController](backend_gamelogic_gameobjects.gameobjects.md#getartifactcontroller)
- [getArtifactMap](backend_gamelogic_gameobjects.gameobjects.md#getartifactmap)
- [getArtifactsOnPlanetsOwnedBy](backend_gamelogic_gameobjects.gameobjects.md#getartifactsonplanetsownedby)
- [getArtifactsOwnedBy](backend_gamelogic_gameobjects.gameobjects.md#getartifactsownedby)
- [getBiome](backend_gamelogic_gameobjects.gameobjects.md#getbiome)
- [getEnergyCurveAtPercent](backend_gamelogic_gameobjects.gameobjects.md#getenergycurveatpercent)
- [getIsBuyingCreditsEmitter](backend_gamelogic_gameobjects.gameobjects.md#getisbuyingcreditsemitter)
- [getLocationOfPlanet](backend_gamelogic_gameobjects.gameobjects.md#getlocationofplanet)
- [getMyArtifactMap](backend_gamelogic_gameobjects.gameobjects.md#getmyartifactmap)
- [getMyPlanetMap](backend_gamelogic_gameobjects.gameobjects.md#getmyplanetmap)
- [getPlanetArtifacts](backend_gamelogic_gameobjects.gameobjects.md#getplanetartifacts)
- [getPlanetDetailLevel](backend_gamelogic_gameobjects.gameobjects.md#getplanetdetaillevel)
- [getPlanetLevel](backend_gamelogic_gameobjects.gameobjects.md#getplanetlevel)
- [getPlanetMap](backend_gamelogic_gameobjects.gameobjects.md#getplanetmap)
- [getPlanetWithCoords](backend_gamelogic_gameobjects.gameobjects.md#getplanetwithcoords)
- [getPlanetWithId](backend_gamelogic_gameobjects.gameobjects.md#getplanetwithid)
- [getPlanetWithLocation](backend_gamelogic_gameobjects.gameobjects.md#getplanetwithlocation)
- [getPlanetsInWorldRectangle](backend_gamelogic_gameobjects.gameobjects.md#getplanetsinworldrectangle)
- [getRevealedLocations](backend_gamelogic_gameobjects.gameobjects.md#getrevealedlocations)
- [getSilverCurveAtPercent](backend_gamelogic_gameobjects.gameobjects.md#getsilvercurveatpercent)
- [getUnconfirmedBuyGPTCredits](backend_gamelogic_gameobjects.gameobjects.md#getunconfirmedbuygptcredits)
- [getUnconfirmedMoves](backend_gamelogic_gameobjects.gameobjects.md#getunconfirmedmoves)
- [getUnconfirmedReveal](backend_gamelogic_gameobjects.gameobjects.md#getunconfirmedreveal)
- [getUnconfirmedUpgrades](backend_gamelogic_gameobjects.gameobjects.md#getunconfirmedupgrades)
- [getUnconfirmedWormholeActivations](backend_gamelogic_gameobjects.gameobjects.md#getunconfirmedwormholeactivations)
- [getWormholes](backend_gamelogic_gameobjects.gameobjects.md#getwormholes)
- [isPlanetInContract](backend_gamelogic_gameobjects.gameobjects.md#isplanetincontract)
- [markLocationRevealed](backend_gamelogic_gameobjects.gameobjects.md#marklocationrevealed)
- [onTxIntent](backend_gamelogic_gameobjects.gameobjects.md#ontxintent)
- [planetLevelFromHexPerlin](backend_gamelogic_gameobjects.gameobjects.md#planetlevelfromhexperlin)
- [planetTypeFromHexPerlin](backend_gamelogic_gameobjects.gameobjects.md#planettypefromhexperlin)
- [processArrivalsForPlanet](backend_gamelogic_gameobjects.gameobjects.md#processarrivalsforplanet)
- [replaceArtifactFromContractData](backend_gamelogic_gameobjects.gameobjects.md#replaceartifactfromcontractdata)
- [replaceArtifactsFromContractData](backend_gamelogic_gameobjects.gameobjects.md#replaceartifactsfromcontractdata)
- [replacePlanetFromContractData](backend_gamelogic_gameobjects.gameobjects.md#replaceplanetfromcontractdata)
- [setArtifact](backend_gamelogic_gameobjects.gameobjects.md#setartifact)
- [setPlanet](backend_gamelogic_gameobjects.gameobjects.md#setplanet)
- [spaceTypeFromPerlin](backend_gamelogic_gameobjects.gameobjects.md#spacetypefromperlin)
- [updatePlanet](backend_gamelogic_gameobjects.gameobjects.md#updateplanet)
- [updatePlanetIfStale](backend_gamelogic_gameobjects.gameobjects.md#updateplanetifstale)
- [updateScore](backend_gamelogic_gameobjects.gameobjects.md#updatescore)
- [getSilverNeeded](backend_gamelogic_gameobjects.gameobjects.md#getsilverneeded)
- [planetCanUpgrade](backend_gamelogic_gameobjects.gameobjects.md#planetcanupgrade)

## Constructors

### constructor

\+ **new GameObjects**(`address`: _undefined_ \| EthAddress, `touchedPlanets`: _Map_<LocationId, Planet\>, `allTouchedPlanetIds`: _Set_<LocationId\>, `revealedLocations`: _Map_<LocationId, RevealedLocation\>, `artifacts`: _Map_<ArtifactId, Artifact\>, `allChunks`: _Iterable_<[_Chunk_](_types_global_globaltypes.chunk.md)\>, `unprocessedArrivals`: _Map_<VoyageId, QueuedArrival\>, `unprocessedPlanetArrivalIds`: _Map_<LocationId, VoyageId[]\>, `contractConstants`: [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md), `worldRadius`: _number_): [_GameObjects_](backend_gamelogic_gameobjects.gameobjects.md)

#### Parameters

| Name                          | Type                                                                                              |
| :---------------------------- | :------------------------------------------------------------------------------------------------ |
| `address`                     | _undefined_ \| EthAddress                                                                         |
| `touchedPlanets`              | _Map_<LocationId, Planet\>                                                                        |
| `allTouchedPlanetIds`         | _Set_<LocationId\>                                                                                |
| `revealedLocations`           | _Map_<LocationId, RevealedLocation\>                                                              |
| `artifacts`                   | _Map_<ArtifactId, Artifact\>                                                                      |
| `allChunks`                   | _Iterable_<[_Chunk_](_types_global_globaltypes.chunk.md)\>                                        |
| `unprocessedArrivals`         | _Map_<VoyageId, QueuedArrival\>                                                                   |
| `unprocessedPlanetArrivalIds` | _Map_<LocationId, VoyageId[]\>                                                                    |
| `contractConstants`           | [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md) |
| `worldRadius`                 | _number_                                                                                          |

**Returns:** [_GameObjects_](backend_gamelogic_gameobjects.gameobjects.md)

## Properties

### address

• `Private` `Readonly` **address**: _undefined_ \| EthAddress

This address of the player that is currently logged in.

**`todo`** move this, along with all other objects relating to the currently logged-on player into a
new field: {@code player: PlayerInfo}

---

### arrivals

• `Private` `Readonly` **arrivals**: _Map_<VoyageId, ArrivalWithTimer\>

Map of arrivals to timers that fire when an arrival arrives, in case that handler needs to be
cancelled for whatever reason.

---

### artifactUpdated$

• `Readonly` **artifactUpdated$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<ArtifactId\>

Event emitter which publishes whenever an artifact has been updated.

---

### artifacts

• `Private` `Readonly` **artifacts**: _Map_<ArtifactId, Artifact\>

Cached index of all known artifact data.

**`see`** The same warning applys as the one on [GameObjects.planets](backend_gamelogic_gameobjects.gameobjects.md#planets)

---

### contractConstants

• `Private` `Readonly` **contractConstants**: [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md)

Some of the game's parameters are downloaded from the blockchain. This allows the client to be
flexible, and connect to any compatible set of Dark Forest contracts, download the parameters,
and join the game, taking into account the unique configuration of those specific Dark Forest
contracts.

---

### coordsToLocation

• `Private` `Readonly` **coordsToLocation**: _Map_<CoordsString, WorldLocation\>

Map from a stringified representation of an x-y coordinate to an object that contains some more
information about the world at that location.

---

### isBuyingCredits$

• `Readonly` **isBuyingCredits$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<boolean\>

Event emitter which publishes whenever the player begins and finishes (whether with a success
or an error) buying gpt credits.

**`todo`** move into `PlayerInfo`

---

### layeredMap

• `Private` `Readonly` **layeredMap**: [_LayeredMap_](backend_gamelogic_layeredmap.layeredmap.md)

This is a data structure that allows us to efficiently calculate which planets are visible on
the player's screen given the viewport's position and size.

---

### myArtifacts

• `Private` `Readonly` **myArtifacts**: _Map_<ArtifactId, Artifact\>

Cached index of artifacts owned by the player.

**`see`** The same warning applys as the one on [GameObjects.planets](backend_gamelogic_gameobjects.gameobjects.md#planets)

---

### myArtifactsUpdated$

• `Readonly` **myArtifactsUpdated$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<Map<ArtifactId, Artifact\>\>

Whenever one of the player's artifacts are updated, this event emitter publishes. See
[GameObjects.myPlanetsUpdated$](backend_gamelogic_gameobjects.gameobjects.md#myplanetsupdated$) for more info.

---

### myPlanets

• `Private` `Readonly` **myPlanets**: _Map_<LocationId, Planet\>

Cached index of planets owned by the player.

**`see`** The same warning applys as the one on [GameObjects.planets](backend_gamelogic_gameobjects.gameobjects.md#planets)

---

### myPlanetsUpdated$

• `Readonly` **myPlanetsUpdated$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<Map<LocationId, Planet\>\>

Whenever a planet is updated, we publish to this event with a reference to a map from location
id to planet. We need to rethink this event emitter because it currently publishes every time
that any planet is updated, and if a lot of them are updated at once (which i think is the case
once every two minutes) then this event emitter will publish a shitton of events.
TODO: rethink this

---

### planetArrivalIds

• `Private` `Readonly` **planetArrivalIds**: _Map_<LocationId, VoyageId[]\>

Map from a location id (think of it as the unique id of each planet) to all the ids of the
voyages that are arriving on that planet. These include both the player's own voyages, and also
any potential invader's voyages.

---

### planetLocationMap

• `Private` `Readonly` **planetLocationMap**: _Map_<LocationId, WorldLocation\>

Map from location id (unique id of each planet) to some information about the location at which
this planet is located, if this client happens to know the coordinates of this planet.

---

### planetUpdated$

• `Readonly` **planetUpdated$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<LocationId\>

Event emitter which publishes whenever a planet is updated.

---

### planets

• `Private` `Readonly` **planets**: _Map_<LocationId, Planet\>

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

• `Private` `Readonly` **revealedLocations**: _Map_<LocationId, RevealedLocation\>

Map from location ids to, if that location id has been revealed on-chain, the world coordinates
of that location id, as well as some extra information regarding the circumstances of the
revealing of this planet.

---

### touchedPlanetIds

• `Private` `Readonly` **touchedPlanetIds**: _Set_<LocationId\>

Set of all planet ids that we know have been interacted-with on-chain.

---

### unconfirmedBuyGPTCredits

• `Private` `Optional` **unconfirmedBuyGPTCredits**: UnconfirmedBuyGPTCredits

---

### unconfirmedBuyHats

• `Private` `Readonly` **unconfirmedBuyHats**: _Record_<string, UnconfirmedBuyHat\>

---

### unconfirmedMoves

• `Private` `Readonly` **unconfirmedMoves**: _Record_<string, UnconfirmedMove\>

---

### unconfirmedPlanetTransfers

• `Private` `Readonly` **unconfirmedPlanetTransfers**: _Record_<string, UnconfirmedPlanetTransfer\>

---

### unconfirmedReveal

• `Private` `Optional` **unconfirmedReveal**: UnconfirmedReveal

The following set of fields represent actions which the user has initiated on the blockchain,
and have not yet completed. The nature of the blockchain is that transactions could take up to
several minutes to confirm (depending on network congestion). This means that we need to make
it clear to players that the action that they have initiated is indeed in progress, and that
something is actually happening. See `Prospect.tsx` for example.

The storage and retrieval of unconfirmed transactions could, and
probablu should be abstracted into some sort of class which keeps in sync both _these_ fields
and each of these fields counterparts in their corresponding entity objects (Planet, Artifact,
etc.)

**`todo`** these are good candidates for being in the `PlayerInfo` class.

---

### unconfirmedUpgrades

• `Private` `Readonly` **unconfirmedUpgrades**: _Record_<string, UnconfirmedUpgrade\>

---

### unconfirmedWormholeActivations

• `Private` `Readonly` **unconfirmedWormholeActivations**: UnconfirmedActivateArtifact[]

---

### wormholes

• `Private` `Readonly` **wormholes**: _Map_<ArtifactId, [_Wormhole_](../modules/_types_global_globaltypes.md#wormhole)\>

Map from artifact ids to wormholes.

## Methods

### addPlanetLocation

▸ **addPlanetLocation**(`planetLocation`: WorldLocation): _void_

Called when we load chunk data into memory (on startup), when we're loading all revealed locations (on startup),
when miner has mined a new chunk while exploring, and when a planet's location is revealed onchain during the course of play
Adds a WorldLocation to the planetLocationMap, making it known to the player locally
Sets an unsynced default planet in the PlanetMap this.planets
IMPORTANT: This is the only way a LocatablePlanet gets constructed
IMPORTANT: Idempotent

#### Parameters

| Name             | Type          |
| :--------------- | :------------ |
| `planetLocation` | WorldLocation |

**Returns:** _void_

---

### calculateSilverSpent

▸ `Private` **calculateSilverSpent**(`planet`: Planet): _number_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _number_

---

### clearOldArrivals

▸ `Private` **clearOldArrivals**(`planet`: Planet): _void_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _void_

---

### clearUnconfirmedTxIntent

▸ **clearUnconfirmedTxIntent**(`txIntent`: TxIntent): _void_

Whenever a transaction that the user initiated either succeeds or fails, we need to clear the
fact that it was in progress from the event's corresponding entities. For example, whenever a
transaction that sends a voyage from one planet to another either succeeds or fails, we need to
remove the dashed line that connected them.

Making sure that we never miss something here is very tedious.

**`todo`** Make this less tedious.

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `txIntent` | TxIntent |

**Returns:** _void_

---

### defaultPlanetFromLocation

▸ `Private` **defaultPlanetFromLocation**(`location`: WorldLocation): LocatablePlanet

returns the data for an unowned, untouched planet at location
most planets in the game are untouched and not stored in the contract,
so we need to generate their data optimistically in the client

#### Parameters

| Name       | Type          |
| :--------- | :------------ |
| `location` | WorldLocation |

**Returns:** LocatablePlanet

---

### getAllOwnedPlanets

▸ **getAllOwnedPlanets**(): Planet[]

Returns all the planets in the game which this client is aware of that have an owner, as a map
from their id to the planet

**`tutorial`** For plugin developers!

**`see`** Warning in {@link GameObjects.getAllPlanets()}

**Returns:** Planet[]

---

### getAllPlanets

▸ **getAllPlanets**(): _Iterable_<Planet\>

Returns all planets in the game.

Warning! Simply iterating over this is not performant, and is meant for scripting.

**`tutorial`** For plugin developers!

**Returns:** _Iterable_<Planet\>

---

### getAllPlanetsMap

▸ **getAllPlanetsMap**(): _Map_<LocationId, Planet\>

Returns all planets in the game, as a map from their location id to the planet.

**`tutorial`** For plugin developers!

**`see`** Warning in {@link GameObjects.getAllPlanets()}

**Returns:** _Map_<LocationId, Planet\>

---

### getAllVoyages

▸ **getAllVoyages**(): QueuedArrival[]

Returns all voyages that are scheduled to arrive at some point in the future.

**`tutorial`** For plugin developers!

**`see`** Warning in {@link GameObjects.getAllPlanets()}

**Returns:** QueuedArrival[]

---

### getArtifactById

▸ **getArtifactById**(`artifactId`: ArtifactId): _undefined_ \| Artifact

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `artifactId` | ArtifactId |

**Returns:** _undefined_ \| Artifact

---

### getArtifactController

▸ **getArtifactController**(`artifactId`: ArtifactId): _undefined_ \| EthAddress

Returns the EthAddress of the player who can control the owner:
if the artifact is on a planet, this is the owner of the planet
if the artifact is on a voyage, this is the initiator of the voyage
if the artifact is not on either, then it is the owner of the artifact NFT

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `artifactId` | ArtifactId |

**Returns:** _undefined_ \| EthAddress

---

### getArtifactMap

▸ **getArtifactMap**(): _Map_<ArtifactId, Artifact\>

**Returns:** _Map_<ArtifactId, Artifact\>

---

### getArtifactsOnPlanetsOwnedBy

▸ **getArtifactsOnPlanetsOwnedBy**(`addr`: EthAddress): Artifact[]

#### Parameters

| Name   | Type       |
| :----- | :--------- |
| `addr` | EthAddress |

**Returns:** Artifact[]

---

### getArtifactsOwnedBy

▸ **getArtifactsOwnedBy**(`addr`: EthAddress): Artifact[]

#### Parameters

| Name   | Type       |
| :----- | :--------- |
| `addr` | EthAddress |

**Returns:** Artifact[]

---

### getBiome

▸ `Private` **getBiome**(`loc`: WorldLocation): Biome

#### Parameters

| Name  | Type          |
| :---- | :------------ |
| `loc` | WorldLocation |

**Returns:** Biome

---

### getEnergyCurveAtPercent

▸ **getEnergyCurveAtPercent**(`planet`: Planet, `percent`: _number_): _number_

returns timestamp (seconds) that planet will reach percent% of energycap
time may be in the past

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `planet`  | Planet   |
| `percent` | _number_ |

**Returns:** _number_

---

### getIsBuyingCreditsEmitter

▸ **getIsBuyingCreditsEmitter**(): [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<boolean\>

**Returns:** [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<boolean\>

---

### getLocationOfPlanet

▸ **getLocationOfPlanet**(`planetId`: LocationId): _undefined_ \| WorldLocation

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _undefined_ \| WorldLocation

---

### getMyArtifactMap

▸ **getMyArtifactMap**(): _Map_<ArtifactId, Artifact\>

**Returns:** _Map_<ArtifactId, Artifact\>

---

### getMyPlanetMap

▸ **getMyPlanetMap**(): _Map_<LocationId, Planet\>

**Returns:** _Map_<LocationId, Planet\>

---

### getPlanetArtifacts

▸ **getPlanetArtifacts**(`planetId`: LocationId): Artifact[]

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** Artifact[]

---

### getPlanetDetailLevel

▸ **getPlanetDetailLevel**(`planetId`: LocationId): _undefined_ \| _number_

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _undefined_ \| _number_

---

### getPlanetLevel

▸ **getPlanetLevel**(`planetId`: LocationId): _undefined_ \| ZERO \| ONE \| TWO \| THREE \| FOUR \| FIVE \| SIX \| SEVEN \| EIGHT \| NINE

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _undefined_ \| ZERO \| ONE \| TWO \| THREE \| FOUR \| FIVE \| SIX \| SEVEN \| EIGHT \| NINE

---

### getPlanetMap

▸ **getPlanetMap**(): _Map_<LocationId, Planet\>

**Returns:** _Map_<LocationId, Planet\>

---

### getPlanetWithCoords

▸ **getPlanetWithCoords**(`coords`: WorldCoords): _undefined_ \| Planet

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |

**Returns:** _undefined_ \| Planet

---

### getPlanetWithId

▸ **getPlanetWithId**(`planetId`: LocationId, `updateIfStale?`: _boolean_): _undefined_ \| Planet

#### Parameters

| Name            | Type       | Default value |
| :-------------- | :--------- | :------------ |
| `planetId`      | LocationId | -             |
| `updateIfStale` | _boolean_  | true          |

**Returns:** _undefined_ \| Planet

---

### getPlanetWithLocation

▸ **getPlanetWithLocation**(`location`: WorldLocation): _undefined_ \| Planet

#### Parameters

| Name       | Type          |
| :--------- | :------------ |
| `location` | WorldLocation |

**Returns:** _undefined_ \| Planet

---

### getPlanetsInWorldRectangle

▸ **getPlanetsInWorldRectangle**(`worldX`: _number_, `worldY`: _number_, `worldWidth`: _number_, `worldHeight`: _number_, `levels`: _number_[], `planetLevelToRadii`: _Map_<number, [_Radii_](../interfaces/backend_gamelogic_viewportentities.radii.md)\>, `updateIfStale?`: _boolean_): LocatablePlanet[]

Gets the ids of all the planets that are both within the given bounding box (defined by its bottom
left coordinate, width, and height) in the world and of a level that was passed in via the
`planetLevels` parameter.

#### Parameters

| Name                 | Type                                                                                 | Default value |
| :------------------- | :----------------------------------------------------------------------------------- | :------------ |
| `worldX`             | _number_                                                                             | -             |
| `worldY`             | _number_                                                                             | -             |
| `worldWidth`         | _number_                                                                             | -             |
| `worldHeight`        | _number_                                                                             | -             |
| `levels`             | _number_[]                                                                           | -             |
| `planetLevelToRadii` | _Map_<number, [_Radii_](../interfaces/backend_gamelogic_viewportentities.radii.md)\> | -             |
| `updateIfStale`      | _boolean_                                                                            | true          |

**Returns:** LocatablePlanet[]

---

### getRevealedLocations

▸ **getRevealedLocations**(): _Map_<LocationId, RevealedLocation\>

**Returns:** _Map_<LocationId, RevealedLocation\>

---

### getSilverCurveAtPercent

▸ **getSilverCurveAtPercent**(`planet`: Planet, `percent`: _number_): _undefined_ \| _number_

returns timestamp (seconds) that planet will reach percent% of silcap if
doesn't produce silver, returns undefined if already over percent% of silcap,
returns undefined

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `planet`  | Planet   |
| `percent` | _number_ |

**Returns:** _undefined_ \| _number_

---

### getUnconfirmedBuyGPTCredits

▸ **getUnconfirmedBuyGPTCredits**(): _undefined_ \| UnconfirmedBuyGPTCredits

**Returns:** _undefined_ \| UnconfirmedBuyGPTCredits

---

### getUnconfirmedMoves

▸ **getUnconfirmedMoves**(): UnconfirmedMove[]

**Returns:** UnconfirmedMove[]

---

### getUnconfirmedReveal

▸ **getUnconfirmedReveal**(): _undefined_ \| UnconfirmedReveal

**Returns:** _undefined_ \| UnconfirmedReveal

---

### getUnconfirmedUpgrades

▸ **getUnconfirmedUpgrades**(): UnconfirmedUpgrade[]

**Returns:** UnconfirmedUpgrade[]

---

### getUnconfirmedWormholeActivations

▸ **getUnconfirmedWormholeActivations**(): UnconfirmedActivateArtifact[]

**Returns:** UnconfirmedActivateArtifact[]

---

### getWormholes

▸ **getWormholes**(): _Iterable_<[_Wormhole_](../modules/_types_global_globaltypes.md#wormhole)\>

**Returns:** _Iterable_<[_Wormhole_](../modules/_types_global_globaltypes.md#wormhole)\>

---

### isPlanetInContract

▸ **isPlanetInContract**(`planetId`: LocationId): _boolean_

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _boolean_

---

### markLocationRevealed

▸ **markLocationRevealed**(`revealedLocation`: RevealedLocation): _void_

#### Parameters

| Name               | Type             |
| :----------------- | :--------------- |
| `revealedLocation` | RevealedLocation |

**Returns:** _void_

---

### onTxIntent

▸ **onTxIntent**(`txIntent`: TxIntent): _void_

We call this function whenever the user requests that we send a transaction to the blockchain
with their localstorage wallet. You can think of it as one of the hubs which connects
`GameObjects` to the rest of the world.

Inside this function, we update the relevant internal game objects to reflect that the user has
requested a particular action. Additionally, we publish the appropriate events to the relevant
[Monomitter](../modules/frontend_utils_monomitter.md#monomitter) instances that are stored in this class.

In the case of something like prospecting for an artifact, this allows us to display a spinner
text which says "Prospecting..."

In the case of the user sending energy from one planet to another planet, this allows us to
display a dashed line between the two planets in their new voyage.

Whenever we update an entity, we must do it via that entity's type's corresponding
`set<EntityType>` function, in order for us to publish these events.

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `txIntent` | TxIntent |

**Returns:** _void_

---

### planetLevelFromHexPerlin

▸ **planetLevelFromHexPerlin**(`hex`: LocationId, `perlin`: _number_): PlanetLevel

#### Parameters

| Name     | Type       |
| :------- | :--------- |
| `hex`    | LocationId |
| `perlin` | _number_   |

**Returns:** PlanetLevel

---

### planetTypeFromHexPerlin

▸ **planetTypeFromHexPerlin**(`hex`: LocationId, `perlin`: _number_): PlanetType

#### Parameters

| Name     | Type       |
| :------- | :--------- |
| `hex`    | LocationId |
| `perlin` | _number_   |

**Returns:** PlanetType

---

### processArrivalsForPlanet

▸ `Private` **processArrivalsForPlanet**(`planetId`: LocationId, `arrivals`: QueuedArrival[]): ArrivalWithTimer[]

#### Parameters

| Name       | Type            |
| :--------- | :-------------- |
| `planetId` | LocationId      |
| `arrivals` | QueuedArrival[] |

**Returns:** ArrivalWithTimer[]

---

### replaceArtifactFromContractData

▸ **replaceArtifactFromContractData**(`artifact`: Artifact): _void_

received some artifact data from the contract. update our stores

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `artifact` | Artifact |

**Returns:** _void_

---

### replaceArtifactsFromContractData

▸ **replaceArtifactsFromContractData**(`artifacts`: _Iterable_<Artifact\>): _void_

#### Parameters

| Name        | Type                  |
| :---------- | :-------------------- |
| `artifacts` | _Iterable_<Artifact\> |

**Returns:** _void_

---

### replacePlanetFromContractData

▸ **replacePlanetFromContractData**(`planet`: Planet, `updatedArrivals?`: QueuedArrival[], `updatedArtifactsOnPlanet?`: ArtifactId[], `revealedLocation?`: RevealedLocation): _void_

received some planet data from the contract. update our stores

#### Parameters

| Name                        | Type             |
| :-------------------------- | :--------------- |
| `planet`                    | Planet           |
| `updatedArrivals?`          | QueuedArrival[]  |
| `updatedArtifactsOnPlanet?` | ArtifactId[]     |
| `revealedLocation?`         | RevealedLocation |

**Returns:** _void_

---

### setArtifact

▸ `Private` **setArtifact**(`artifact`: Artifact): _void_

Set an artifact into our cached store. Should ALWAYS call this when setting an artifact.
`this.artifacts` and `this.myArtifacts` should NEVER be accessed directly!
This function also handles managing artifact update messages and indexing the map of owned artifacts.

#### Parameters

| Name       | Type     | Description         |
| :--------- | :------- | :------------------ |
| `artifact` | Artifact | the artifact to set |

**Returns:** _void_

---

### setPlanet

▸ `Private` **setPlanet**(`planet`: Planet): _void_

Set a planet into our cached store. Should ALWAYS call this when setting a planet.
`this.planets` and `this.myPlanets` should NEVER be accessed directly!
This function also handles managing planet update messages and indexing the map of owned planets.

#### Parameters

| Name     | Type   | Description       |
| :------- | :----- | :---------------- |
| `planet` | Planet | the planet to set |

**Returns:** _void_

---

### spaceTypeFromPerlin

▸ **spaceTypeFromPerlin**(`perlin`: _number_): SpaceType

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `perlin` | _number_ |

**Returns:** SpaceType

---

### updatePlanet

▸ **updatePlanet**(`id`: LocationId, `updateFn`: (`p`: Planet) => _void_): _void_

Given a planet id, update the state of the given planet by calling the given update function.
If the planet was updated, then also publish the appropriate event.

#### Parameters

| Name       | Type                    |
| :--------- | :---------------------- |
| `id`       | LocationId              |
| `updateFn` | (`p`: Planet) => _void_ |

**Returns:** _void_

---

### updatePlanetIfStale

▸ `Private` **updatePlanetIfStale**(`planet`: Planet): _void_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _void_

---

### updateScore

▸ `Private` **updateScore**(`planetId`: LocationId): _void_

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _void_

---

### getSilverNeeded

▸ `Static` **getSilverNeeded**(`planet`: Planet): _number_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _number_

---

### planetCanUpgrade

▸ `Static` **planetCanUpgrade**(`planet`: Planet): _boolean_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _boolean_
