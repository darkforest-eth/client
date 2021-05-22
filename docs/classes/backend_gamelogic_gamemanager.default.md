# Class: default

[Backend/GameLogic/GameManager](../modules/backend_gamelogic_gamemanager.md).default

## Hierarchy

- _EventEmitter_

  ↳ **default**

## Table of contents

### Constructors

- [constructor](backend_gamelogic_gamemanager.default.md#constructor)

### Properties

- [account](backend_gamelogic_gamemanager.default.md#account)
- [balance](backend_gamelogic_gamemanager.default.md#balance)
- [balanceInterval](backend_gamelogic_gamemanager.default.md#balanceinterval)
- [contractConstants](backend_gamelogic_gamemanager.default.md#contractconstants)
- [contractsAPI](backend_gamelogic_gamemanager.default.md#contractsapi)
- [endTimeSeconds](backend_gamelogic_gamemanager.default.md#endtimeseconds)
- [entityStore](backend_gamelogic_gamemanager.default.md#entitystore)
- [ethConnection](backend_gamelogic_gamemanager.default.md#ethconnection)
- [gptCreditPriceEther](backend_gamelogic_gamemanager.default.md#gptcreditpriceether)
- [gptCreditPriceEtherEmitter$](backend_gamelogic_gamemanager.default.md#gptcreditpriceetheremitter$)
- [hashConfig](backend_gamelogic_gamemanager.default.md#hashconfig)
- [hashRate](backend_gamelogic_gamemanager.default.md#hashrate)
- [homeLocation](backend_gamelogic_gamemanager.default.md#homelocation)
- [minerManager](backend_gamelogic_gamemanager.default.md#minermanager)
- [myBalance$](backend_gamelogic_gamemanager.default.md#mybalance$)
- [myGPTCredits](backend_gamelogic_gamemanager.default.md#mygptcredits)
- [myGPTCredits$](backend_gamelogic_gamemanager.default.md#mygptcredits$)
- [persistentChunkStore](backend_gamelogic_gamemanager.default.md#persistentchunkstore)
- [planetHashMimc](backend_gamelogic_gamemanager.default.md#planethashmimc)
- [players](backend_gamelogic_gamemanager.default.md#players)
- [snarkHelper](backend_gamelogic_gamemanager.default.md#snarkhelper)
- [terminal](backend_gamelogic_gamemanager.default.md#terminal)
- [uiStateStorageManager](backend_gamelogic_gamemanager.default.md#uistatestoragemanager)
- [useMockHash](backend_gamelogic_gamemanager.default.md#usemockhash)
- [worldRadius](backend_gamelogic_gamemanager.default.md#worldradius)

### Accessors

- [planetRarity](backend_gamelogic_gamemanager.default.md#planetrarity)

### Methods

- [activateArtifact](backend_gamelogic_gamemanager.default.md#activateartifact)
- [addAccount](backend_gamelogic_gamemanager.default.md#addaccount)
- [addNewChunk](backend_gamelogic_gamemanager.default.md#addnewchunk)
- [biomebasePerlin](backend_gamelogic_gamemanager.default.md#biomebaseperlin)
- [bulkAddNewChunks](backend_gamelogic_gamemanager.default.md#bulkaddnewchunks)
- [bulkHardRefreshPlanets](backend_gamelogic_gamemanager.default.md#bulkhardrefreshplanets)
- [buyGPTCredits](backend_gamelogic_gamemanager.default.md#buygptcredits)
- [buyHat](backend_gamelogic_gamemanager.default.md#buyhat)
- [checkGameHasEnded](backend_gamelogic_gamemanager.default.md#checkgamehasended)
- [deactivateArtifact](backend_gamelogic_gamemanager.default.md#deactivateartifact)
- [depositArtifact](backend_gamelogic_gamemanager.default.md#depositartifact)
- [destroy](backend_gamelogic_gamemanager.default.md#destroy)
- [findArtifact](backend_gamelogic_gamemanager.default.md#findartifact)
- [getAccount](backend_gamelogic_gamemanager.default.md#getaccount)
- [getAllOwnedPlanets](backend_gamelogic_gamemanager.default.md#getallownedplanets)
- [getAllPlanets](backend_gamelogic_gamemanager.default.md#getallplanets)
- [getAllPlayers](backend_gamelogic_gamemanager.default.md#getallplayers)
- [getAllVoyages](backend_gamelogic_gamemanager.default.md#getallvoyages)
- [getArtifactMap](backend_gamelogic_gamemanager.default.md#getartifactmap)
- [getArtifactUpdated$](backend_gamelogic_gamemanager.default.md#getartifactupdated$)
- [getArtifactWithId](backend_gamelogic_gamemanager.default.md#getartifactwithid)
- [getChunk](backend_gamelogic_gamemanager.default.md#getchunk)
- [getChunkStore](backend_gamelogic_gamemanager.default.md#getchunkstore)
- [getConstructors](backend_gamelogic_gamemanager.default.md#getconstructors)
- [getContractAddress](backend_gamelogic_gamemanager.default.md#getcontractaddress)
- [getContractConstants](backend_gamelogic_gamemanager.default.md#getcontractconstants)
- [getConversation](backend_gamelogic_gamemanager.default.md#getconversation)
- [getCurrentlyExploringChunk](backend_gamelogic_gamemanager.default.md#getcurrentlyexploringchunk)
- [getDist](backend_gamelogic_gamemanager.default.md#getdist)
- [getEndTimeSeconds](backend_gamelogic_gamemanager.default.md#getendtimeseconds)
- [getEnergyArrivingForMove](backend_gamelogic_gamemanager.default.md#getenergyarrivingformove)
- [getEnergyCurveAtPercent](backend_gamelogic_gamemanager.default.md#getenergycurveatpercent)
- [getEnergyNeededForMove](backend_gamelogic_gamemanager.default.md#getenergyneededformove)
- [getEnergyOfPlayer](backend_gamelogic_gamemanager.default.md#getenergyofplayer)
- [getEthConnection](backend_gamelogic_gamemanager.default.md#getethconnection)
- [getExploredChunks](backend_gamelogic_gamemanager.default.md#getexploredchunks)
- [getGptCreditBalanceEmitter](backend_gamelogic_gamemanager.default.md#getgptcreditbalanceemitter)
- [getGptCreditPriceEmitter](backend_gamelogic_gamemanager.default.md#getgptcreditpriceemitter)
- [getHashConfig](backend_gamelogic_gamemanager.default.md#gethashconfig)
- [getHashesPerSec](backend_gamelogic_gamemanager.default.md#gethashespersec)
- [getHomeCoords](backend_gamelogic_gamemanager.default.md#gethomecoords)
- [getHomeHash](backend_gamelogic_gamemanager.default.md#gethomehash)
- [getIsBuyingCreditsEmitter](backend_gamelogic_gamemanager.default.md#getisbuyingcreditsemitter)
- [getLocationOfPlanet](backend_gamelogic_gamemanager.default.md#getlocationofplanet)
- [getMaxMoveDist](backend_gamelogic_gamemanager.default.md#getmaxmovedist)
- [getMiningPattern](backend_gamelogic_gamemanager.default.md#getminingpattern)
- [getMyArtifactMap](backend_gamelogic_gamemanager.default.md#getmyartifactmap)
- [getMyArtifacts](backend_gamelogic_gamemanager.default.md#getmyartifacts)
- [getMyArtifactsUpdated$](backend_gamelogic_gamemanager.default.md#getmyartifactsupdated$)
- [getMyBalance](backend_gamelogic_gamemanager.default.md#getmybalance)
- [getMyBalanceEmitter](backend_gamelogic_gamemanager.default.md#getmybalanceemitter)
- [getMyPlanetMap](backend_gamelogic_gamemanager.default.md#getmyplanetmap)
- [getMyPlanets](backend_gamelogic_gamemanager.default.md#getmyplanets)
- [getMyPlanetsUpdated$](backend_gamelogic_gamemanager.default.md#getmyplanetsupdated$)
- [getNextBroadcastAvailableTimestamp](backend_gamelogic_gamemanager.default.md#getnextbroadcastavailabletimestamp)
- [getNextRevealCountdownInfo](backend_gamelogic_gamemanager.default.md#getnextrevealcountdowninfo)
- [getNotificationsManager](backend_gamelogic_gamemanager.default.md#getnotificationsmanager)
- [getPerlinThresholds](backend_gamelogic_gamemanager.default.md#getperlinthresholds)
- [getPlanetDetailLevel](backend_gamelogic_gamemanager.default.md#getplanetdetaillevel)
- [getPlanetHitboxForCoords](backend_gamelogic_gamemanager.default.md#getplanethitboxforcoords)
- [getPlanetLevel](backend_gamelogic_gamemanager.default.md#getplanetlevel)
- [getPlanetMap](backend_gamelogic_gamemanager.default.md#getplanetmap)
- [getPlanetRarity](backend_gamelogic_gamemanager.default.md#getplanetrarity)
- [getPlanetUpdated$](backend_gamelogic_gamemanager.default.md#getplanetupdated$)
- [getPlanetWithCoords](backend_gamelogic_gamemanager.default.md#getplanetwithcoords)
- [getPlanetWithId](backend_gamelogic_gamemanager.default.md#getplanetwithid)
- [getPlanetsInRange](backend_gamelogic_gamemanager.default.md#getplanetsinrange)
- [getPrivateKey](backend_gamelogic_gamemanager.default.md#getprivatekey)
- [getProcgenUtils](backend_gamelogic_gamemanager.default.md#getprocgenutils)
- [getRandomHomePlanetCoords](backend_gamelogic_gamemanager.default.md#getrandomhomeplanetcoords)
- [getRevealedLocations](backend_gamelogic_gamemanager.default.md#getrevealedlocations)
- [getSignedTwitter](backend_gamelogic_gamemanager.default.md#getsignedtwitter)
- [getSilverCurveAtPercent](backend_gamelogic_gamemanager.default.md#getsilvercurveatpercent)
- [getSilverOfPlayer](backend_gamelogic_gamemanager.default.md#getsilverofplayer)
- [getTemperature](backend_gamelogic_gamemanager.default.md#gettemperature)
- [getTimeForMove](backend_gamelogic_gamemanager.default.md#gettimeformove)
- [getTwitter](backend_gamelogic_gamemanager.default.md#gettwitter)
- [getUIDataItem](backend_gamelogic_gamemanager.default.md#getuidataitem)
- [getUIEventEmitter](backend_gamelogic_gamemanager.default.md#getuieventemitter)
- [getUnconfirmedMoves](backend_gamelogic_gamemanager.default.md#getunconfirmedmoves)
- [getUnconfirmedUpgrades](backend_gamelogic_gamemanager.default.md#getunconfirmedupgrades)
- [getUnconfirmedWormholeActivations](backend_gamelogic_gamemanager.default.md#getunconfirmedwormholeactivations)
- [getUniverseTotalEnergy](backend_gamelogic_gamemanager.default.md#getuniversetotalenergy)
- [getUpgrade](backend_gamelogic_gamemanager.default.md#getupgrade)
- [getWithdrawnSilverOfPlayer](backend_gamelogic_gamemanager.default.md#getwithdrawnsilverofplayer)
- [getWorldRadius](backend_gamelogic_gamemanager.default.md#getworldradius)
- [getWorldSilver](backend_gamelogic_gamemanager.default.md#getworldsilver)
- [getWormholes](backend_gamelogic_gamemanager.default.md#getwormholes)
- [handleTxIntent](backend_gamelogic_gamemanager.default.md#handletxintent)
- [hardRefreshArtifact](backend_gamelogic_gamemanager.default.md#hardrefreshartifact)
- [hardRefreshPlanet](backend_gamelogic_gamemanager.default.md#hardrefreshplanet)
- [hardRefreshPlayer](backend_gamelogic_gamemanager.default.md#hardrefreshplayer)
- [hasJoinedGame](backend_gamelogic_gamemanager.default.md#hasjoinedgame)
- [hasMinedChunk](backend_gamelogic_gamemanager.default.md#hasminedchunk)
- [initMiningManager](backend_gamelogic_gamemanager.default.md#initminingmanager)
- [isMining](backend_gamelogic_gamemanager.default.md#ismining)
- [isPlanetMineable](backend_gamelogic_gamemanager.default.md#isplanetmineable)
- [joinGame](backend_gamelogic_gamemanager.default.md#joingame)
- [loadContract](backend_gamelogic_gamemanager.default.md#loadcontract)
- [loadPlugins](backend_gamelogic_gamemanager.default.md#loadplugins)
- [locationFromCoords](backend_gamelogic_gamemanager.default.md#locationfromcoords)
- [move](backend_gamelogic_gamemanager.default.md#move)
- [onTxIntentFail](backend_gamelogic_gamemanager.default.md#ontxintentfail)
- [prospectPlanet](backend_gamelogic_gamemanager.default.md#prospectplanet)
- [refreshMyGPTCredits](backend_gamelogic_gamemanager.default.md#refreshmygptcredits)
- [refreshTwitters](backend_gamelogic_gamemanager.default.md#refreshtwitters)
- [revealLocation](backend_gamelogic_gamemanager.default.md#reveallocation)
- [savePlugins](backend_gamelogic_gamemanager.default.md#saveplugins)
- [setMinerCores](backend_gamelogic_gamemanager.default.md#setminercores)
- [setMiningPattern](backend_gamelogic_gamemanager.default.md#setminingpattern)
- [setRadius](backend_gamelogic_gamemanager.default.md#setradius)
- [setSnarkCacheSize](backend_gamelogic_gamemanager.default.md#setsnarkcachesize)
- [setUIDataItem](backend_gamelogic_gamemanager.default.md#setuidataitem)
- [spaceTypeFromPerlin](backend_gamelogic_gamemanager.default.md#spacetypefromperlin)
- [spaceTypePerlin](backend_gamelogic_gamemanager.default.md#spacetypeperlin)
- [startConversation](backend_gamelogic_gamemanager.default.md#startconversation)
- [startExplore](backend_gamelogic_gamemanager.default.md#startexplore)
- [stepConversation](backend_gamelogic_gamemanager.default.md#stepconversation)
- [stopExplore](backend_gamelogic_gamemanager.default.md#stopexplore)
- [transferOwnership](backend_gamelogic_gamemanager.default.md#transferownership)
- [upgrade](backend_gamelogic_gamemanager.default.md#upgrade)
- [verifyTwitter](backend_gamelogic_gamemanager.default.md#verifytwitter)
- [withdrawArtifact](backend_gamelogic_gamemanager.default.md#withdrawartifact)
- [withdrawSilver](backend_gamelogic_gamemanager.default.md#withdrawsilver)
- [create](backend_gamelogic_gamemanager.default.md#create)

## Constructors

### constructor

\+ `Private` **new default**(`terminal`: _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\>, `account`: _undefined_ \| EthAddress, `balance`: _number_, `players`: _Map_<string, Player\>, `touchedPlanets`: _Map_<LocationId, Planet\>, `allTouchedPlanetIds`: _Set_<LocationId\>, `revealedCoords`: _Map_<LocationId, WorldCoords\>, `worldRadius`: _number_, `unprocessedArrivals`: _Map_<VoyageId, QueuedArrival\>, `unprocessedPlanetArrivalIds`: _Map_<LocationId, VoyageId[]\>, `contractsAPI`: [_default_](backend_gamelogic_contractsapi.default.md), `contractConstants`: [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md), `persistentChunkStore`: [_default_](backend_storage_persistentchunkstore.default.md), `snarkHelper`: [_default_](backend_utils_snarkargshelper.default.md), `homeLocation`: _undefined_ \| WorldLocation, `useMockHash`: _boolean_, `artifacts`: _Map_<ArtifactId, Artifact\>, `ethConnection`: [_default_](backend_network_ethconnection.default.md), `gptCreditPriceEther`: _number_, `myGPTCredits`: _number_, `uiStateStorageManager`: [_default_](backend_storage_uistatestoragemanager.default.md)): [_default_](backend_gamelogic_gamemanager.default.md)

#### Parameters

| Name                          | Type                                                                                                          |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------ |
| `terminal`                    | _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\> |
| `account`                     | _undefined_ \| EthAddress                                                                                     |
| `balance`                     | _number_                                                                                                      |
| `players`                     | _Map_<string, Player\>                                                                                        |
| `touchedPlanets`              | _Map_<LocationId, Planet\>                                                                                    |
| `allTouchedPlanetIds`         | _Set_<LocationId\>                                                                                            |
| `revealedCoords`              | _Map_<LocationId, WorldCoords\>                                                                               |
| `worldRadius`                 | _number_                                                                                                      |
| `unprocessedArrivals`         | _Map_<VoyageId, QueuedArrival\>                                                                               |
| `unprocessedPlanetArrivalIds` | _Map_<LocationId, VoyageId[]\>                                                                                |
| `contractsAPI`                | [_default_](backend_gamelogic_contractsapi.default.md)                                                        |
| `contractConstants`           | [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md)             |
| `persistentChunkStore`        | [_default_](backend_storage_persistentchunkstore.default.md)                                                  |
| `snarkHelper`                 | [_default_](backend_utils_snarkargshelper.default.md)                                                         |
| `homeLocation`                | _undefined_ \| WorldLocation                                                                                  |
| `useMockHash`                 | _boolean_                                                                                                     |
| `artifacts`                   | _Map_<ArtifactId, Artifact\>                                                                                  |
| `ethConnection`               | [_default_](backend_network_ethconnection.default.md)                                                         |
| `gptCreditPriceEther`         | _number_                                                                                                      |
| `myGPTCredits`                | _number_                                                                                                      |
| `uiStateStorageManager`       | [_default_](backend_storage_uistatestoragemanager.default.md)                                                 |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

Overrides: EventEmitter.constructor

## Properties

### account

• `Private` `Readonly` **account**: _undefined_ \| EthAddress

---

### balance

• `Private` **balance**: _number_

---

### balanceInterval

• `Private` **balanceInterval**: _Timeout_

---

### contractConstants

• `Private` `Readonly` **contractConstants**: [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md)

---

### contractsAPI

• `Private` `Readonly` **contractsAPI**: [_default_](backend_gamelogic_contractsapi.default.md)

---

### endTimeSeconds

• `Private` `Readonly` **endTimeSeconds**: _number_= 1643587533

---

### entityStore

• `Private` `Readonly` **entityStore**: [_GameObjects_](backend_gamelogic_gameobjects.gameobjects.md)

---

### ethConnection

• `Private` `Readonly` **ethConnection**: [_default_](backend_network_ethconnection.default.md)

---

### gptCreditPriceEther

• `Private` **gptCreditPriceEther**: _number_

---

### gptCreditPriceEtherEmitter$

• `Private` **gptCreditPriceEtherEmitter$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<number\>

---

### hashConfig

• `Private` `Readonly` **hashConfig**: [_HashConfig_](../modules/_types_global_globaltypes.md#hashconfig)

---

### hashRate

• `Private` **hashRate**: _number_

---

### homeLocation

• `Private` **homeLocation**: _undefined_ \| WorldLocation

---

### minerManager

• `Private` `Optional` **minerManager**: [_default_](backend_miner_minermanager.default.md)

---

### myBalance$

• `Private` **myBalance$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<number\>

---

### myGPTCredits

• `Private` **myGPTCredits**: _number_

---

### myGPTCredits$

• `Private` **myGPTCredits$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<number\>

---

### persistentChunkStore

• `Private` `Readonly` **persistentChunkStore**: [_default_](backend_storage_persistentchunkstore.default.md)

---

### planetHashMimc

• `Private` `Readonly` **planetHashMimc**: (...`inputs`: _number_[]) => BigInteger

#### Type declaration

▸ (...`inputs`: _number_[]): BigInteger

#### Parameters

| Name        | Type       |
| :---------- | :--------- |
| `...inputs` | _number_[] |

**Returns:** BigInteger

---

### players

• `Private` `Readonly` **players**: _Map_<string, Player\>

---

### snarkHelper

• `Private` `Readonly` **snarkHelper**: [_default_](backend_utils_snarkargshelper.default.md)

---

### terminal

• `Private` `Readonly` **terminal**: _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\>

---

### uiStateStorageManager

• `Private` `Readonly` **uiStateStorageManager**: [_default_](backend_storage_uistatestoragemanager.default.md)

---

### useMockHash

• `Private` `Readonly` **useMockHash**: _boolean_

---

### worldRadius

• `Private` **worldRadius**: _number_

## Accessors

### planetRarity

• get **planetRarity**(): _number_

**Returns:** _number_

## Methods

### activateArtifact

▸ **activateArtifact**(`locationId`: LocationId, `artifactId`: ArtifactId, `wormholeTo`: _undefined_ \| LocationId): [_default_](backend_gamelogic_gamemanager.default.md)

#### Parameters

| Name         | Type                      |
| :----------- | :------------------------ |
| `locationId` | LocationId                |
| `artifactId` | ArtifactId                |
| `wormholeTo` | _undefined_ \| LocationId |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### addAccount

▸ **addAccount**(`coords`: WorldCoords): _Promise_<boolean\>

Initializes a new player's game to start at the given home planet. Must have already
initialized the player on the contract.

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |

**Returns:** _Promise_<boolean\>

---

### addNewChunk

▸ **addNewChunk**(`chunk`: [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)): [_default_](backend_gamelogic_gamemanager.default.md)

Makes this game manager aware of a new chunk - which includes its location, size,
as well as all of the planets contained in that chunk. Causes the client to load
all of the information about those planets from the blockchain.

#### Parameters

| Name    | Type                                                                  |
| :------ | :-------------------------------------------------------------------- |
| `chunk` | [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md) |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### biomebasePerlin

▸ **biomebasePerlin**(`coords`: WorldCoords, `floor`: _boolean_): _number_

Gets the biome perlin valie at the given location in the world.

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |
| `floor`  | _boolean_   |

**Returns:** _number_

---

### bulkAddNewChunks

▸ **bulkAddNewChunks**(`chunks`: [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)[]): _Promise_<void\>

To add multiple chunks at once, use this function rather than `addNewChunk`, in order
to load all of the associated planet data in an efficient manner.

#### Parameters

| Name     | Type                                                                    |
| :------- | :---------------------------------------------------------------------- |
| `chunks` | [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)[] |

**Returns:** _Promise_<void\>

---

### bulkHardRefreshPlanets

▸ `Private` **bulkHardRefreshPlanets**(`planetIds`: LocationId[]): _Promise_<void\>

#### Parameters

| Name        | Type         |
| :---------- | :----------- |
| `planetIds` | LocationId[] |

**Returns:** _Promise_<void\>

---

### buyGPTCredits

▸ **buyGPTCredits**(`amount`: _number_): [_default_](backend_gamelogic_gamemanager.default.md)

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `amount` | _number_ |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### buyHat

▸ **buyHat**(`planetId`: LocationId): [_default_](backend_gamelogic_gamemanager.default.md)

Submits a transaction to the blockchain to buy a hat for the given planet. You
must own the planet. Warning costs real xdai. Hats are permanently locked to a
planet. They are purely cosmetic and a great way to BM your opponents or just
look your best. Just like in the real world, more money means more hat.

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### checkGameHasEnded

▸ `Private` **checkGameHasEnded**(): _boolean_

**Returns:** _boolean_

---

### deactivateArtifact

▸ **deactivateArtifact**(`locationId`: LocationId, `artifactId`: ArtifactId): _undefined_ \| [_default_](backend_gamelogic_gamemanager.default.md)

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `locationId` | LocationId |
| `artifactId` | ArtifactId |

**Returns:** _undefined_ \| [_default_](backend_gamelogic_gamemanager.default.md)

---

### depositArtifact

▸ **depositArtifact**(`locationId`: LocationId, `artifactId`: ArtifactId): [_default_](backend_gamelogic_gamemanager.default.md)

Submits a transaction to the blockchain to deposit an artifact on a given planet.
You must own the planet and you must own the artifact directly (can't be locked in contract)

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `locationId` | LocationId |
| `artifactId` | ArtifactId |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### destroy

▸ **destroy**(): _void_

**Returns:** _void_

---

### findArtifact

▸ **findArtifact**(`planetId`: LocationId): [_default_](backend_gamelogic_gamemanager.default.md)

Calls the contract to find an artifact on the given planet.

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### getAccount

▸ **getAccount**(): _undefined_ \| EthAddress

Gets the address of the player logged into this game manager.

**Returns:** _undefined_ \| EthAddress

---

### getAllOwnedPlanets

▸ **getAllOwnedPlanets**(): Planet[]

Gets a list of planets that have an owner.

**Returns:** Planet[]

---

### getAllPlanets

▸ **getAllPlanets**(): _Iterable_<Planet\>

Gets all planets. This means all planets that are in the contract, and also all
planets that have been mined locally. Does not update planets if they are stale.
NOT PERFORMANT - for scripting only.

**Returns:** _Iterable_<Planet\>

---

### getAllPlayers

▸ **getAllPlayers**(): Player[]

Gets a list of all the players in the game (not just the ones you've
encounterd)

**Returns:** Player[]

---

### getAllVoyages

▸ **getAllVoyages**(): QueuedArrival[]

Gets all voyages that have not completed.

**Returns:** QueuedArrival[]

---

### getArtifactMap

▸ **getArtifactMap**(): _Map_<ArtifactId, Artifact\>

Return a reference to the artifact map

**Returns:** _Map_<ArtifactId, Artifact\>

---

### getArtifactUpdated$

▸ **getArtifactUpdated$**(): [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<ArtifactId\>

**Returns:** [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<ArtifactId\>

---

### getArtifactWithId

▸ **getArtifactWithId**(`artifactId`: ArtifactId): _undefined_ \| Artifact

Gets the artifact with the given id. Null if no artifact with id exists.

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `artifactId` | ArtifactId |

**Returns:** _undefined_ \| Artifact

---

### getChunk

▸ **getChunk**(`chunkFootprint`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)): _undefined_ \| [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)

#### Parameters

| Name             | Type                                                                |
| :--------------- | :------------------------------------------------------------------ |
| `chunkFootprint` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |

**Returns:** _undefined_ \| [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)

---

### getChunkStore

▸ **getChunkStore**(): [_default_](backend_storage_persistentchunkstore.default.md)

**Returns:** [_default_](backend_storage_persistentchunkstore.default.md)

---

### getConstructors

▸ **getConstructors**(): _object_

Returns constructors of classes that may be useful for developing plugins.

**Returns:** _object_

| Name                 | Type                                                                                |
| :------------------- | :---------------------------------------------------------------------------------- |
| `MinerManager`       | _typeof_ [_default_](backend_miner_minermanager.default.md)                         |
| `SpiralPattern`      | _typeof_ [_SpiralPattern_](backend_miner_miningpatterns.spiralpattern.md)           |
| `SwissCheesePattern` | _typeof_ [_SwissCheesePattern_](backend_miner_miningpatterns.swisscheesepattern.md) |

---

### getContractAddress

▸ **getContractAddress**(): EthAddress

Gets the address of the `DarkForestCore` contract, which is essentially
the 'backend' of the game.

**Returns:** EthAddress

---

### getContractConstants

▸ **getContractConstants**(): [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md)

**Returns:** [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md)

---

### getConversation

▸ **getConversation**(`artifactId`: ArtifactId): _Promise_<undefined \| Conversation\>

Gets the GPT conversation with an artifact; undefined if there is none so far

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `artifactId` | ArtifactId |

**Returns:** _Promise_<undefined \| Conversation\>

---

### getCurrentlyExploringChunk

▸ **getCurrentlyExploringChunk**(): _undefined_ \| [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)

Gets the rectangle bounding the chunk that the miner is currently in the process
of hashing.

**Returns:** _undefined_ \| [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)

---

### getDist

▸ **getDist**(`fromId`: LocationId, `toId`: LocationId): _number_

Gets the distance between two planets. Throws an exception if you don't
know the location of either planet.

#### Parameters

| Name     | Type       |
| :------- | :--------- |
| `fromId` | LocationId |
| `toId`   | LocationId |

**Returns:** _number_

---

### getEndTimeSeconds

▸ **getEndTimeSeconds**(): _number_

The game ends at a particular time in the future - get this time measured
in seconds from the epoch.

**Returns:** _number_

---

### getEnergyArrivingForMove

▸ **getEnergyArrivingForMove**(`fromId`: LocationId, `toId`: LocationId, `sentEnergy`: _number_): _number_

Gets the amount of energy that would arrive if a voyage with the given parameters
was to occur.

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `fromId`     | LocationId |
| `toId`       | LocationId |
| `sentEnergy` | _number_   |

**Returns:** _number_

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

### getEnergyNeededForMove

▸ **getEnergyNeededForMove**(`fromId`: LocationId, `toId`: LocationId, `arrivingEnergy`: _number_): _number_

Gets the amount of energy needed in order for a voyage from the given to the given
planet to arrive with your desired amount of energy.

#### Parameters

| Name             | Type       |
| :--------------- | :--------- |
| `fromId`         | LocationId |
| `toId`           | LocationId |
| `arrivingEnergy` | _number_   |

**Returns:** _number_

---

### getEnergyOfPlayer

▸ **getEnergyOfPlayer**(`player`: EthAddress): _number_

Gets the total amount of energy that lives on planets that the given player owns.

#### Parameters

| Name     | Type       |
| :------- | :--------- |
| `player` | EthAddress |

**Returns:** _number_

---

### getEthConnection

▸ **getEthConnection**(): [_default_](backend_network_ethconnection.default.md)

**Returns:** [_default_](backend_network_ethconnection.default.md)

---

### getExploredChunks

▸ **getExploredChunks**(): _Iterable_<[_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)\>

Gets all the map chunks that this client is aware of. Chunks may have come from
mining, or from importing map data.

**Returns:** _Iterable_<[_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)\>

---

### getGptCreditBalanceEmitter

▸ **getGptCreditBalanceEmitter**(): [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<number\>

**Returns:** [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<number\>

---

### getGptCreditPriceEmitter

▸ **getGptCreditPriceEmitter**(): [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<number\>

**Returns:** [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<number\>

---

### getHashConfig

▸ **getHashConfig**(): [_HashConfig_](../modules/_types_global_globaltypes.md#hashconfig)

Gets the HASH CONFIG

**Returns:** [_HashConfig_](../modules/_types_global_globaltypes.md#hashconfig)

---

### getHashesPerSec

▸ **getHashesPerSec**(): _number_

Gets the amount of hashes per second that the miner manager is calculating.

**Returns:** _number_

---

### getHomeCoords

▸ **getHomeCoords**(): _undefined_ \| WorldCoords

Gets the location of your home planet.

**Returns:** _undefined_ \| WorldCoords

---

### getHomeHash

▸ **getHomeHash**(): _undefined_ \| LocationId

Gets the hash of the location of your home planet.

**Returns:** _undefined_ \| LocationId

---

### getIsBuyingCreditsEmitter

▸ **getIsBuyingCreditsEmitter**(): [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<boolean\>

**Returns:** [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<boolean\>

---

### getLocationOfPlanet

▸ **getLocationOfPlanet**(`planetId`: LocationId): _undefined_ \| WorldLocation

Gets the location of the given planet. Returns undefined if the planet does not exist, or if
we do not know the location of this planet NOT update the planet if the planet is stale,
which means this function is fast.

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _undefined_ \| WorldLocation

---

### getMaxMoveDist

▸ **getMaxMoveDist**(`planetId`: LocationId, `sendingPercent`: _number_): _number_

Gets the maximuim distance that you can send your energy from the given planet,
using the given percentage of that planet's current silver.

#### Parameters

| Name             | Type       |
| :--------------- | :--------- |
| `planetId`       | LocationId |
| `sendingPercent` | _number_   |

**Returns:** _number_

---

### getMiningPattern

▸ **getMiningPattern**(): _undefined_ \| [_MiningPattern_](../interfaces/backend_miner_miningpatterns.miningpattern.md)

Gets the mining pattern that the miner is currently using.

**Returns:** _undefined_ \| [_MiningPattern_](../interfaces/backend_miner_miningpatterns.miningpattern.md)

---

### getMyArtifactMap

▸ **getMyArtifactMap**(): _Map_<ArtifactId, Artifact\>

Return a reference to the map of my artifacts

**Returns:** _Map_<ArtifactId, Artifact\>

---

### getMyArtifacts

▸ **getMyArtifacts**(): Artifact[]

gets both deposited artifacts that are on planets i own as well as artifacts i own

**Returns:** Artifact[]

---

### getMyArtifactsUpdated$

▸ **getMyArtifactsUpdated$**(): [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<Map<ArtifactId, Artifact\>\>

**Returns:** [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<Map<ArtifactId, Artifact\>\>

---

### getMyBalance

▸ **getMyBalance**(): _number_

Gets the balance of the account

**Returns:** _number_

---

### getMyBalanceEmitter

▸ **getMyBalanceEmitter**(): [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<number\>

**Returns:** [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<number\>

---

### getMyPlanetMap

▸ **getMyPlanetMap**(): _Map_<LocationId, Planet\>

Return a reference to the map of my planets

**Returns:** _Map_<LocationId, Planet\>

---

### getMyPlanets

▸ **getMyPlanets**(): Planet[]

Gets a list of the planets that the player logged into this `GameManager` owns.

**Returns:** Planet[]

---

### getMyPlanetsUpdated$

▸ **getMyPlanetsUpdated$**(): [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<Map<LocationId, Planet\>\>

**Returns:** [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<Map<LocationId, Planet\>\>

---

### getNextBroadcastAvailableTimestamp

▸ **getNextBroadcastAvailableTimestamp**(): _number_

Gets the timestamp (ms) of the next time that we can broadcast the coordinates of a planet.

**Returns:** _number_

---

### getNextRevealCountdownInfo

▸ **getNextRevealCountdownInfo**(): [_RevealCountdownInfo_](../interfaces/_types_global_globaltypes.revealcountdowninfo.md)

Returns info about the next time you can broadcast coordinates

**Returns:** [_RevealCountdownInfo_](../interfaces/_types_global_globaltypes.revealcountdowninfo.md)

---

### getNotificationsManager

▸ **getNotificationsManager**(): [_default_](frontend_game_notificationmanager.default.md)

**Returns:** [_default_](frontend_game_notificationmanager.default.md)

---

### getPerlinThresholds

▸ **getPerlinThresholds**(): [*number*, *number*, *number*]

The perlin value at each coordinate determines the space type. There are four space
types, which means there are four ranges on the number line that correspond to
each space type. This function returns the boundary values between each of these
four ranges: `PERLIN_THRESHOLD_1`, `PERLIN_THRESHOLD_2`, `PERLIN_THRESHOLD_3`.

**Returns:** [*number*, *number*, *number*]

---

### getPlanetDetailLevel

▸ **getPlanetDetailLevel**(`planetId`: LocationId): _undefined_ \| _number_

Gets the detail level of the given planet. Returns undefined if the planet does not exist. Does
NOT update the planet if the planet is stale, which means this function is fast.

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _undefined_ \| _number_

---

### getPlanetHitboxForCoords

▸ **getPlanetHitboxForCoords**(`coords`: WorldCoords, `radiusMap`: _Record_<PlanetLevel, number\>): _undefined_ \| LocatablePlanet

Gets the planet that is closest to the given coordinates. Filters out irrelevant planets
using the `radiusMap` parameter, which specifies how close a planet must be in order to
be returned from this function, given that planet's level. Smaller planets have a smaller
radius, and larger planets have a larger radius.

If a smaller and a larger planet are both within respective radii of coords, the smaller
planet is returned.

#### Parameters

| Name        | Type                           |
| :---------- | :----------------------------- |
| `coords`    | WorldCoords                    |
| `radiusMap` | _Record_<PlanetLevel, number\> |

**Returns:** _undefined_ \| LocatablePlanet

---

### getPlanetLevel

▸ **getPlanetLevel**(`planetId`: LocationId): _undefined_ \| ZERO \| ONE \| TWO \| THREE \| FOUR \| FIVE \| SIX \| SEVEN \| EIGHT \| NINE

Gets the level of the given planet. Returns undefined if the planet does not exist. Does
NOT update the planet if the planet is stale, which means this function is fast.

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _undefined_ \| ZERO \| ONE \| TWO \| THREE \| FOUR \| FIVE \| SIX \| SEVEN \| EIGHT \| NINE

---

### getPlanetMap

▸ **getPlanetMap**(): _Map_<LocationId, Planet\>

Return a reference to the planet map

**Returns:** _Map_<LocationId, Planet\>

---

### getPlanetRarity

▸ **getPlanetRarity**(): _number_

Gets the rarity of planets in the universe

**Returns:** _number_

---

### getPlanetUpdated$

▸ **getPlanetUpdated$**(): [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<LocationId\>

**Returns:** [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<LocationId\>

---

### getPlanetWithCoords

▸ **getPlanetWithCoords**(`coords`: WorldCoords): _undefined_ \| Planet

Gets the planet that is located at the given coordinates. Returns undefined if not a valid
location or if no planet exists at location. If the planet needs to be updated (because
some time has passed since we last updated the planet), then updates that planet first.

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |

**Returns:** _undefined_ \| Planet

---

### getPlanetWithId

▸ **getPlanetWithId**(`planetId`: LocationId): _undefined_ \| Planet

Gets the planet with the given hash. Returns undefined if the planet is neither in the contract
nor has been discovered locally. If the planet needs to be updated (because some time has
passed since we last updated the planet), then updates that planet first.

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _undefined_ \| Planet

---

### getPlanetsInRange

▸ **getPlanetsInRange**(`planetId`: LocationId, `sendingPercent`: _number_): Planet[]

Gets all the planets that you can reach with at least 1 energy from
the given planet.

#### Parameters

| Name             | Type       |
| :--------------- | :--------- |
| `planetId`       | LocationId |
| `sendingPercent` | _number_   |

**Returns:** Planet[]

---

### getPrivateKey

▸ **getPrivateKey**(): _string_

Gets the private key of the burner wallet used by this account.

**Returns:** _string_

---

### getProcgenUtils

▸ **getProcgenUtils**(): _typeof_ [_ProcgenUtils_](backend_procedural_procgenutils.procgenutils.md)

Helpful functions for getting the names, descriptions, and colors of in-game entities.

**Returns:** _typeof_ [_ProcgenUtils_](backend_procedural_procgenutils.procgenutils.md)

---

### getRandomHomePlanetCoords

▸ `Private` **getRandomHomePlanetCoords**(): _Promise_<WorldLocation\>

**Returns:** _Promise_<WorldLocation\>

---

### getRevealedLocations

▸ **getRevealedLocations**(): _Map_<LocationId, WorldLocation\>

Gets a map of all location IDs whose coords have been publicly revealed

**Returns:** _Map_<LocationId, WorldLocation\>

---

### getSignedTwitter

▸ **getSignedTwitter**(`twitter`: _string_): _Promise_<string\>

Signs the given twitter handle with the private key of the current user. Used to
verify that the person who owns the Dark Forest account was the one that attempted
to link a twitter to their account.

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `twitter` | _string_ |

**Returns:** _Promise_<string\>

---

### getSilverCurveAtPercent

▸ **getSilverCurveAtPercent**(`planet`: Planet, `percent`: _number_): _undefined_ \| _number_

returns timestamp (seconds) that planet will reach percent% of silcap if
doesn't produce silver, returns undefined if already over percent% of silcap,

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `planet`  | Planet   |
| `percent` | _number_ |

**Returns:** _undefined_ \| _number_

---

### getSilverOfPlayer

▸ **getSilverOfPlayer**(`player`: EthAddress): _number_

Gets the total amount of silver that lives on planets that the given player owns.

#### Parameters

| Name     | Type       |
| :------- | :--------- |
| `player` | EthAddress |

**Returns:** _number_

---

### getTemperature

▸ **getTemperature**(`coords`: WorldCoords): _number_

Gets the temperature of a given location.

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |

**Returns:** _number_

---

### getTimeForMove

▸ **getTimeForMove**(`fromId`: LocationId, `toId`: LocationId): _number_

Gets the amount of time, in seconds that a voyage between from the first to the
second planet would take.

#### Parameters

| Name     | Type       |
| :------- | :--------- |
| `fromId` | LocationId |
| `toId`   | LocationId |

**Returns:** _number_

---

### getTwitter

▸ **getTwitter**(`address`: _undefined_ \| EthAddress): _undefined_ \| _string_

Gets the twitter handle of the given ethereum account which is associated
with Dark Forest.

#### Parameters

| Name      | Type                      |
| :-------- | :------------------------ |
| `address` | _undefined_ \| EthAddress |

**Returns:** _undefined_ \| _string_

---

### getUIDataItem

▸ **getUIDataItem**(`key`: [_UIDataKey_](../enums/backend_storage_uistatestoragemanager.uidatakey.md)): _number_ \| _boolean_

#### Parameters

| Name  | Type                                                                       |
| :---- | :------------------------------------------------------------------------- |
| `key` | [_UIDataKey_](../enums/backend_storage_uistatestoragemanager.uidatakey.md) |

**Returns:** _number_ \| _boolean_

---

### getUIEventEmitter

▸ **getUIEventEmitter**(): [_default_](frontend_utils_uiemitter.default.md)

Helpful for listening to user input events.

**Returns:** [_default_](frontend_utils_uiemitter.default.md)

---

### getUnconfirmedMoves

▸ **getUnconfirmedMoves**(): UnconfirmedMove[]

Gets all moves that this client has queued to be uploaded to the contract, but
have not been successfully confirmed yet.

**Returns:** UnconfirmedMove[]

---

### getUnconfirmedUpgrades

▸ **getUnconfirmedUpgrades**(): UnconfirmedUpgrade[]

Gets all upgrades that this client has queued to be uploaded to the contract, but
have not been successfully confirmed yet.

**Returns:** UnconfirmedUpgrade[]

---

### getUnconfirmedWormholeActivations

▸ **getUnconfirmedWormholeActivations**(): UnconfirmedActivateArtifact[]

**Returns:** UnconfirmedActivateArtifact[]

---

### getUniverseTotalEnergy

▸ **getUniverseTotalEnergy**(): _number_

Gets the total amount of energy that lives on a planet that somebody owns.

**Returns:** _number_

---

### getUpgrade

▸ **getUpgrade**(`branch`: _number_, `level`: _number_): Upgrade

Returns the upgrade that would be applied to a planet given a particular
upgrade branch (defense, range, speed) and level of upgrade.

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `branch` | _number_ |
| `level`  | _number_ |

**Returns:** Upgrade

---

### getWithdrawnSilverOfPlayer

▸ **getWithdrawnSilverOfPlayer**(`addr`: EthAddress): _number_

#### Parameters

| Name   | Type       |
| :----- | :--------- |
| `addr` | EthAddress |

**Returns:** _number_

---

### getWorldRadius

▸ **getWorldRadius**(): _number_

Gets the radius of the playable area of the universe.

**Returns:** _number_

---

### getWorldSilver

▸ **getWorldSilver**(): _number_

Gets the total amount of silver that lives on a planet that somebody owns.

**Returns:** _number_

---

### getWormholes

▸ **getWormholes**(): _Iterable_<[_Wormhole_](../modules/_types_global_globaltypes.md#wormhole)\>

**Returns:** _Iterable_<[_Wormhole_](../modules/_types_global_globaltypes.md#wormhole)\>

---

### handleTxIntent

▸ `Private` **handleTxIntent**(`txIntent`: TxIntent): _void_

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `txIntent` | TxIntent |

**Returns:** _void_

---

### hardRefreshArtifact

▸ `Private` **hardRefreshArtifact**(`artifactId`: ArtifactId): _Promise_<void\>

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `artifactId` | ArtifactId |

**Returns:** _Promise_<void\>

---

### hardRefreshPlanet

▸ `Private` **hardRefreshPlanet**(`planetId`: LocationId): _Promise_<void\>

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _Promise_<void\>

---

### hardRefreshPlayer

▸ `Private` **hardRefreshPlayer**(`address`: EthAddress): _Promise_<void\>

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `address` | EthAddress |

**Returns:** _Promise_<void\>

---

### hasJoinedGame

▸ **hasJoinedGame**(): _boolean_

Whether or not this client has successfully found and landed on a home planet.

**Returns:** _boolean_

---

### hasMinedChunk

▸ **hasMinedChunk**(`chunkLocation`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)): _boolean_

Whether or not the given rectangle has been mined.

#### Parameters

| Name            | Type                                                                |
| :-------------- | :------------------------------------------------------------------ |
| `chunkLocation` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |

**Returns:** _boolean_

---

### initMiningManager

▸ `Private` **initMiningManager**(`homeCoords`: WorldCoords): _void_

#### Parameters

| Name         | Type        |
| :----------- | :---------- |
| `homeCoords` | WorldCoords |

**Returns:** _void_

---

### isMining

▸ **isMining**(): _boolean_

Whether or not the miner is currently exploring space.

**Returns:** _boolean_

---

### isPlanetMineable

▸ **isPlanetMineable**(`p`: Planet): _boolean_

Whether or not the given planet is capable of minting an artifact.

#### Parameters

| Name | Type   |
| :--- | :----- |
| `p`  | Planet |

**Returns:** _boolean_

---

### joinGame

▸ **joinGame**(`beforeRetry`: (`e`: Error) => _Promise_<boolean\>): [_default_](backend_gamelogic_gamemanager.default.md)

Attempts to join the game. Should not be called once you've already joined.

#### Parameters

| Name          | Type                                |
| :------------ | :---------------------------------- |
| `beforeRetry` | (`e`: Error) => _Promise_<boolean\> |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### loadContract

▸ **loadContract**(`contractAddress`: _string_, `contractABI`: ContractInterface): _Promise_<Contract\>

#### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `contractAddress` | _string_          |
| `contractABI`     | ContractInterface |

**Returns:** _Promise_<Contract\>

---

### loadPlugins

▸ **loadPlugins**(): _Promise_<[_SerializedPlugin_](../interfaces/backend_plugins_serializedplugin.serializedplugin.md)[]\>

Load the serialized versions of all the plugins that this player has.

**Returns:** _Promise_<[_SerializedPlugin_](../interfaces/backend_plugins_serializedplugin.serializedplugin.md)[]\>

---

### locationFromCoords

▸ `Private` **locationFromCoords**(`coords`: WorldCoords): WorldLocation

computes the WorldLocation object corresponding to a set of coordinates
very slow since it actually calculates the hash; do not use in render loop

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |

**Returns:** WorldLocation

---

### move

▸ **move**(`from`: LocationId, `to`: LocationId, `forces`: _number_, `silver`: _number_, `artifactMoved?`: ArtifactId): [_default_](backend_gamelogic_gamemanager.default.md)

Submits a transaction to the blockchain to move the given amount of resources from
the given planet to the given planet.

#### Parameters

| Name             | Type       |
| :--------------- | :--------- |
| `from`           | LocationId |
| `to`             | LocationId |
| `forces`         | _number_   |
| `silver`         | _number_   |
| `artifactMoved?` | ArtifactId |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### onTxIntentFail

▸ `Private` **onTxIntentFail**(`txIntent`: TxIntent, `e`: Error): _void_

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `txIntent` | TxIntent |
| `e`        | Error    |

**Returns:** _void_

---

### prospectPlanet

▸ **prospectPlanet**(`planetId`: LocationId): _Promise_<undefined \| [_default_](backend_gamelogic_gamemanager.default.md)\>

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _Promise_<undefined \| [_default_](backend_gamelogic_gamemanager.default.md)\>

---

### refreshMyGPTCredits

▸ `Private` **refreshMyGPTCredits**(): _Promise_<void\>

**Returns:** _Promise_<void\>

---

### refreshTwitters

▸ `Private` **refreshTwitters**(): _Promise_<void\>

**Returns:** _Promise_<void\>

---

### revealLocation

▸ **revealLocation**(`planetId`: LocationId): [_default_](backend_gamelogic_gamemanager.default.md)

Reveals a planet's location on-chain.

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### savePlugins

▸ **savePlugins**(`savedPlugins`: [_SerializedPlugin_](../interfaces/backend_plugins_serializedplugin.serializedplugin.md)[]): _Promise_<void\>

Overwrites all the saved plugins to equal the given array of plugins.

#### Parameters

| Name           | Type                                                                                       |
| :------------- | :----------------------------------------------------------------------------------------- |
| `savedPlugins` | [_SerializedPlugin_](../interfaces/backend_plugins_serializedplugin.serializedplugin.md)[] |

**Returns:** _Promise_<void\>

---

### setMinerCores

▸ **setMinerCores**(`nCores`: _number_): _void_

Set the amount of cores to mine the universe with. More cores equals faster!

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `nCores` | _number_ |

**Returns:** _void_

---

### setMiningPattern

▸ **setMiningPattern**(`pattern`: [_MiningPattern_](../interfaces/backend_miner_miningpatterns.miningpattern.md)): _void_

Sets the mining pattern of the miner. This kills the old miner and starts this one.

#### Parameters

| Name      | Type                                                                           |
| :-------- | :----------------------------------------------------------------------------- |
| `pattern` | [_MiningPattern_](../interfaces/backend_miner_miningpatterns.miningpattern.md) |

**Returns:** _void_

---

### setRadius

▸ `Private` **setRadius**(`worldRadius`: _number_): _void_

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `worldRadius` | _number_ |

**Returns:** _void_

---

### setSnarkCacheSize

▸ **setSnarkCacheSize**(`size`: _number_): _void_

Changes the amount of move snark proofs that are cached.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `size` | _number_ |

**Returns:** _void_

---

### setUIDataItem

▸ **setUIDataItem**(`key`: [_UIDataKey_](../enums/backend_storage_uistatestoragemanager.uidatakey.md), `value`: _number_ \| _boolean_): _void_

#### Parameters

| Name    | Type                                                                       |
| :------ | :------------------------------------------------------------------------- |
| `key`   | [_UIDataKey_](../enums/backend_storage_uistatestoragemanager.uidatakey.md) |
| `value` | _number_ \| _boolean_                                                      |

**Returns:** _void_

---

### spaceTypeFromPerlin

▸ **spaceTypeFromPerlin**(`perlin`: _number_): SpaceType

Each coordinate lives in a particular type of space, determined by a smooth random
function called 'perlin noise.

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `perlin` | _number_ |

**Returns:** SpaceType

---

### spaceTypePerlin

▸ **spaceTypePerlin**(`coords`: WorldCoords, `floor`: _boolean_): _number_

Gets the perlin value at the given location in the world. SpaceType is based
on this value.

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |
| `floor`  | _boolean_   |

**Returns:** _number_

---

### startConversation

▸ **startConversation**(`artifactId`: ArtifactId): _Promise_<Conversation\>

Starts a GPT conversation with an artifact

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `artifactId` | ArtifactId |

**Returns:** _Promise_<Conversation\>

---

### startExplore

▸ **startExplore**(): _void_

Starts the miner.

**Returns:** _void_

---

### stepConversation

▸ **stepConversation**(`artifactId`: ArtifactId, `message`: _string_): _Promise_<Conversation\>

Sends a message to an artifact you are having a GPT conversation with

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `artifactId` | ArtifactId |
| `message`    | _string_   |

**Returns:** _Promise_<Conversation\>

---

### stopExplore

▸ **stopExplore**(): _void_

Stops the miner.

**Returns:** _void_

---

### transferOwnership

▸ **transferOwnership**(`planetId`: LocationId, `newOwner`: EthAddress): [_default_](backend_gamelogic_gamemanager.default.md)

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |
| `newOwner` | EthAddress |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### upgrade

▸ **upgrade**(`planetId`: LocationId, `branch`: _number_): [_default_](backend_gamelogic_gamemanager.default.md)

Submits a transaction to the blockchain to upgrade the given planet with the given
upgrade branch. You must own the planet, and have enough silver on it to complete
the upgrade.

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |
| `branch`   | _number_   |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### verifyTwitter

▸ **verifyTwitter**(`twitter`: _string_): _Promise_<boolean\>

Once you have posted the verificatoin tweet - complete the twitter-account-linking
process by telling the Dark Forest webserver to look at that tweet.

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `twitter` | _string_ |

**Returns:** _Promise_<boolean\>

---

### withdrawArtifact

▸ **withdrawArtifact**(`locationId`: LocationId, `artifactId`: ArtifactId): [_default_](backend_gamelogic_gamemanager.default.md)

Withdraws the artifact that is locked up on the given planet.

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `locationId` | LocationId |
| `artifactId` | ArtifactId |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### withdrawSilver

▸ **withdrawSilver**(`locationId`: LocationId, `amount`: _number_): _undefined_ \| [_default_](backend_gamelogic_gamemanager.default.md)

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `locationId` | LocationId |
| `amount`     | _number_   |

**Returns:** _undefined_ \| [_default_](backend_gamelogic_gamemanager.default.md)

---

### create

▸ `Static` **create**(`ethConnection`: [_default_](backend_network_ethconnection.default.md), `terminal`: _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\>): _Promise_<[_default_](backend_gamelogic_gamemanager.default.md)\>

#### Parameters

| Name            | Type                                                                                                          |
| :-------------- | :------------------------------------------------------------------------------------------------------------ |
| `ethConnection` | [_default_](backend_network_ethconnection.default.md)                                                         |
| `terminal`      | _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\> |

**Returns:** _Promise_<[_default_](backend_gamelogic_gamemanager.default.md)\>
