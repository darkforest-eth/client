# Class: GameObjects

[Backend/GameLogic/GameObjects](../modules/backend_gamelogic_gameobjects.md).GameObjects

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
- [myArtifacts](backend_gamelogic_gameobjects.gameobjects.md#myartifacts)
- [myArtifactsUpdated$](backend_gamelogic_gameobjects.gameobjects.md#myartifactsupdated$)
- [myPlanets](backend_gamelogic_gameobjects.gameobjects.md#myplanets)
- [myPlanetsUpdated$](backend_gamelogic_gameobjects.gameobjects.md#myplanetsupdated$)
- [planetArrivalIds](backend_gamelogic_gameobjects.gameobjects.md#planetarrivalids)
- [planetGridBuckets](backend_gamelogic_gameobjects.gameobjects.md#planetgridbuckets)
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
- [GRID_BUCKET_SIZE](backend_gamelogic_gameobjects.gameobjects.md#grid_bucket_size)

### Methods

- [addPlanetLocation](backend_gamelogic_gameobjects.gameobjects.md#addplanetlocation)
- [calculateSilverSpent](backend_gamelogic_gameobjects.gameobjects.md#calculatesilverspent)
- [clearOldArrivals](backend_gamelogic_gameobjects.gameobjects.md#clearoldarrivals)
- [clearUnconfirmedTxIntent](backend_gamelogic_gameobjects.gameobjects.md#clearunconfirmedtxintent)
- [defaultPlanetFromLocation](backend_gamelogic_gameobjects.gameobjects.md#defaultplanetfromlocation)
- [getAllOwnedPlanets](backend_gamelogic_gameobjects.gameobjects.md#getallownedplanets)
- [getAllPlanets](backend_gamelogic_gameobjects.gameobjects.md#getallplanets)
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
- [getPlanetHitboxForCoords](backend_gamelogic_gameobjects.gameobjects.md#getplanethitboxforcoords)
- [getPlanetLevel](backend_gamelogic_gameobjects.gameobjects.md#getplanetlevel)
- [getPlanetMap](backend_gamelogic_gameobjects.gameobjects.md#getplanetmap)
- [getPlanetWithCoords](backend_gamelogic_gameobjects.gameobjects.md#getplanetwithcoords)
- [getPlanetWithId](backend_gamelogic_gameobjects.gameobjects.md#getplanetwithid)
- [getPlanetWithLocation](backend_gamelogic_gameobjects.gameobjects.md#getplanetwithlocation)
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
- [updatePlanetIfStale](backend_gamelogic_gameobjects.gameobjects.md#updateplanetifstale)
- [updateScore](backend_gamelogic_gameobjects.gameobjects.md#updatescore)
- [getGridBucketKey](backend_gamelogic_gameobjects.gameobjects.md#getgridbucketkey)
- [getSilverNeeded](backend_gamelogic_gameobjects.gameobjects.md#getsilverneeded)
- [planetCanUpgrade](backend_gamelogic_gameobjects.gameobjects.md#planetcanupgrade)

## Constructors

### constructor

\+ **new GameObjects**(`address`: _undefined_ \| EthAddress, `touchedPlanets`: _Map_<LocationId, Planet\>, `allTouchedPlanetIds`: _Set_<LocationId\>, `revealedLocations`: _Map_<LocationId, WorldLocation\>, `artifacts`: _Map_<ArtifactId, Artifact\>, `allChunks`: _Iterable_<[_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)\>, `unprocessedArrivals`: _Map_<VoyageId, QueuedArrival\>, `unprocessedPlanetArrivalIds`: _Map_<LocationId, VoyageId[]\>, `contractConstants`: [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md)): [_GameObjects_](backend_gamelogic_gameobjects.gameobjects.md)

#### Parameters

| Name                          | Type                                                                                              |
| :---------------------------- | :------------------------------------------------------------------------------------------------ |
| `address`                     | _undefined_ \| EthAddress                                                                         |
| `touchedPlanets`              | _Map_<LocationId, Planet\>                                                                        |
| `allTouchedPlanetIds`         | _Set_<LocationId\>                                                                                |
| `revealedLocations`           | _Map_<LocationId, WorldLocation\>                                                                 |
| `artifacts`                   | _Map_<ArtifactId, Artifact\>                                                                      |
| `allChunks`                   | _Iterable_<[_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)\>                |
| `unprocessedArrivals`         | _Map_<VoyageId, QueuedArrival\>                                                                   |
| `unprocessedPlanetArrivalIds` | _Map_<LocationId, VoyageId[]\>                                                                    |
| `contractConstants`           | [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md) |

**Returns:** [_GameObjects_](backend_gamelogic_gameobjects.gameobjects.md)

## Properties

### address

• `Private` `Readonly` **address**: _undefined_ \| EthAddress

---

### arrivals

• `Private` `Readonly` **arrivals**: _Map_<VoyageId, ArrivalWithTimer\>

---

### artifactUpdated$

• `Readonly` **artifactUpdated$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<ArtifactId\>

---

### artifacts

• `Private` `Readonly` **artifacts**: _Map_<ArtifactId, Artifact\>

Cached index of all known artifact data. This should NEVER be set to directly!
All set calls should occur via `GameObjects.setArtifact()`

---

### contractConstants

• `Private` `Readonly` **contractConstants**: [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md)

---

### coordsToLocation

• `Private` `Readonly` **coordsToLocation**: _Map_<string, WorldLocation\>

---

### isBuyingCredits$

• `Readonly` **isBuyingCredits$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<boolean\>

---

### myArtifacts

• `Private` `Readonly` **myArtifacts**: _Map_<ArtifactId, Artifact\>

Cached index of artifacts owned by the player. This should NEVER be set to directly!
All set calls should occur via `GameObjects.setArtifact()`

---

### myArtifactsUpdated$

• `Readonly` **myArtifactsUpdated$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<Map<ArtifactId, Artifact\>\>

---

### myPlanets

• `Private` `Readonly` **myPlanets**: _Map_<LocationId, Planet\>

Cached index of planets owned by the player. This should NEVER be set to directly!
All set calls should occur via `GameObjects.setPlanet()`

---

### myPlanetsUpdated$

• `Readonly` **myPlanetsUpdated$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<Map<LocationId, Planet\>\>

---

### planetArrivalIds

• `Private` `Readonly` **planetArrivalIds**: _Map_<LocationId, VoyageId[]\>

---

### planetGridBuckets

• `Private` `Readonly` **planetGridBuckets**: _Record_<string, WorldLocation[]\>

---

### planetLocationMap

• `Private` `Readonly` **planetLocationMap**: _Map_<LocationId, WorldLocation\>

---

### planetUpdated$

• `Readonly` **planetUpdated$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<LocationId\>

---

### planets

• `Private` `Readonly` **planets**: _Map_<LocationId, Planet\>

Cached index of all known planet data. This should NEVER be set to directly!
All set calls should occur via `GameObjects.setPlanet()`

---

### revealedLocations

• `Private` `Readonly` **revealedLocations**: _Map_<LocationId, WorldLocation\>

---

### touchedPlanetIds

• `Private` `Readonly` **touchedPlanetIds**: _Set_<LocationId\>

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

---

### unconfirmedUpgrades

• `Private` `Readonly` **unconfirmedUpgrades**: _Record_<string, UnconfirmedUpgrade\>

---

### unconfirmedWormholeActivations

• `Private` `Readonly` **unconfirmedWormholeActivations**: UnconfirmedActivateArtifact[]

---

### wormholes

• `Private` `Readonly` **wormholes**: _Map_<ArtifactId, [_Wormhole_](../modules/_types_global_globaltypes.md#wormhole)\>

---

### GRID_BUCKET_SIZE

▪ `Static` `Private` **GRID_BUCKET_SIZE**: _number_= 128

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

**Returns:** Planet[]

---

### getAllPlanets

▸ **getAllPlanets**(): _Iterable_<Planet\>

**Returns:** _Iterable_<Planet\>

---

### getAllVoyages

▸ **getAllVoyages**(): QueuedArrival[]

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

### getPlanetHitboxForCoords

▸ **getPlanetHitboxForCoords**(`from`: WorldCoords, `radiusMap`: _Record_<PlanetLevel, number\>): _undefined_ \| LocatablePlanet

#### Parameters

| Name        | Type                           |
| :---------- | :----------------------------- |
| `from`      | WorldCoords                    |
| `radiusMap` | _Record_<PlanetLevel, number\> |

**Returns:** _undefined_ \| LocatablePlanet

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

### getRevealedLocations

▸ **getRevealedLocations**(): _Map_<LocationId, WorldLocation\>

**Returns:** _Map_<LocationId, WorldLocation\>

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

▸ **markLocationRevealed**(`planetLocation`: WorldLocation): _void_

#### Parameters

| Name             | Type          |
| :--------------- | :------------ |
| `planetLocation` | WorldLocation |

**Returns:** _void_

---

### onTxIntent

▸ **onTxIntent**(`txIntent`: TxIntent): _void_

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

▸ **replacePlanetFromContractData**(`planet`: Planet, `updatedArrivals`: QueuedArrival[], `updatedArtifactsOnPlanet`: ArtifactId[], `revealedLocation?`: WorldLocation): _void_

received some planet data from the contract. update our stores

#### Parameters

| Name                       | Type            |
| :------------------------- | :-------------- |
| `planet`                   | Planet          |
| `updatedArrivals`          | QueuedArrival[] |
| `updatedArtifactsOnPlanet` | ArtifactId[]    |
| `revealedLocation?`        | WorldLocation   |

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

### getGridBucketKey

▸ `Static` `Private` **getGridBucketKey**(`coords`: WorldCoords): _string_

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |

**Returns:** _string_

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
