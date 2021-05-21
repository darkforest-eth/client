# Class: default

[Backend/GameLogic/GameUIManager](../modules/backend_gamelogic_gameuimanager.md).default

## Hierarchy

- _EventEmitter_

  ↳ **default**

## Table of contents

### Constructors

- [constructor](backend_gamelogic_gameuimanager.default.md#constructor)

### Properties

- [artifactSending](backend_gamelogic_gameuimanager.default.md#artifactsending)
- [detailLevel](backend_gamelogic_gameuimanager.default.md#detaillevel)
- [extraMinerLocations](backend_gamelogic_gameuimanager.default.md#extraminerlocations)
- [forcesSending](backend_gamelogic_gameuimanager.default.md#forcessending)
- [gameManager](backend_gamelogic_gameuimanager.default.md#gamemanager)
- [isChoosingTargetPlanet](backend_gamelogic_gameuimanager.default.md#ischoosingtargetplanet)
- [isSending](backend_gamelogic_gameuimanager.default.md#issending)
- [minerLocation](backend_gamelogic_gameuimanager.default.md#minerlocation)
- [mouseDownOverCoords](backend_gamelogic_gameuimanager.default.md#mousedownovercoords)
- [mouseDownOverPlanet](backend_gamelogic_gameuimanager.default.md#mousedownoverplanet)
- [mouseHoveringOverCoords](backend_gamelogic_gameuimanager.default.md#mousehoveringovercoords)
- [mouseHoveringOverPlanet](backend_gamelogic_gameuimanager.default.md#mousehoveringoverplanet)
- [myArtifacts$](backend_gamelogic_gameuimanager.default.md#myartifacts$)
- [onChooseTargetPlanet](backend_gamelogic_gameuimanager.default.md#onchoosetargetplanet)
- [plugins](backend_gamelogic_gameuimanager.default.md#plugins)
- [previousSelectedPlanet](backend_gamelogic_gameuimanager.default.md#previousselectedplanet)
- [radiusMap](backend_gamelogic_gameuimanager.default.md#radiusmap)
- [selectedArtifact$](backend_gamelogic_gameuimanager.default.md#selectedartifact$)
- [selectedArtifactId$](backend_gamelogic_gameuimanager.default.md#selectedartifactid$)
- [selectedCoords](backend_gamelogic_gameuimanager.default.md#selectedcoords)
- [selectedPlanet](backend_gamelogic_gameuimanager.default.md#selectedplanet)
- [selectedPlanet$](backend_gamelogic_gameuimanager.default.md#selectedplanet$)
- [selectedPlanetId$](backend_gamelogic_gameuimanager.default.md#selectedplanetid$)
- [sendingCoords](backend_gamelogic_gameuimanager.default.md#sendingcoords)
- [sendingPlanet](backend_gamelogic_gameuimanager.default.md#sendingplanet)
- [silverSending](backend_gamelogic_gameuimanager.default.md#silversending)
- [terminal](backend_gamelogic_gameuimanager.default.md#terminal)
- [uiStateStorageManager](backend_gamelogic_gameuimanager.default.md#uistatestoragemanager)

### Methods

- [activateArtifact](backend_gamelogic_gameuimanager.default.md#activateartifact)
- [addAccount](backend_gamelogic_gameuimanager.default.md#addaccount)
- [addNewChunk](backend_gamelogic_gameuimanager.default.md#addnewchunk)
- [bulkAddNewChunks](backend_gamelogic_gameuimanager.default.md#bulkaddnewchunks)
- [buyGPTCredits](backend_gamelogic_gameuimanager.default.md#buygptcredits)
- [buyHat](backend_gamelogic_gameuimanager.default.md#buyhat)
- [centerCoords](backend_gamelogic_gameuimanager.default.md#centercoords)
- [centerLocationId](backend_gamelogic_gameuimanager.default.md#centerlocationid)
- [centerPlanet](backend_gamelogic_gameuimanager.default.md#centerplanet)
- [deactivateArtifact](backend_gamelogic_gameuimanager.default.md#deactivateartifact)
- [depositArtifact](backend_gamelogic_gameuimanager.default.md#depositartifact)
- [destroy](backend_gamelogic_gameuimanager.default.md#destroy)
- [discoverBiome](backend_gamelogic_gameuimanager.default.md#discoverbiome)
- [findArtifact](backend_gamelogic_gameuimanager.default.md#findartifact)
- [generateVerificationTweet](backend_gamelogic_gameuimanager.default.md#generateverificationtweet)
- [getAccount](backend_gamelogic_gameuimanager.default.md#getaccount)
- [getAllMinerLocations](backend_gamelogic_gameuimanager.default.md#getallminerlocations)
- [getAllOwnedPlanets](backend_gamelogic_gameuimanager.default.md#getallownedplanets)
- [getAllPlayers](backend_gamelogic_gameuimanager.default.md#getallplayers)
- [getAllVoyages](backend_gamelogic_gameuimanager.default.md#getallvoyages)
- [getArtifactMap](backend_gamelogic_gameuimanager.default.md#getartifactmap)
- [getArtifactPlanet](backend_gamelogic_gameuimanager.default.md#getartifactplanet)
- [getArtifactSending](backend_gamelogic_gameuimanager.default.md#getartifactsending)
- [getArtifactWithId](backend_gamelogic_gameuimanager.default.md#getartifactwithid)
- [getArtifactsWithIds](backend_gamelogic_gameuimanager.default.md#getartifactswithids)
- [getArtifactsWithIdsIncludeUndefined](backend_gamelogic_gameuimanager.default.md#getartifactswithidsincludeundefined)
- [getBiomeKey](backend_gamelogic_gameuimanager.default.md#getbiomekey)
- [getBiomePerlin](backend_gamelogic_gameuimanager.default.md#getbiomeperlin)
- [getChunk](backend_gamelogic_gameuimanager.default.md#getchunk)
- [getContractAddress](backend_gamelogic_gameuimanager.default.md#getcontractaddress)
- [getContractConstants](backend_gamelogic_gameuimanager.default.md#getcontractconstants)
- [getConversation](backend_gamelogic_gameuimanager.default.md#getconversation)
- [getDetailLevel](backend_gamelogic_gameuimanager.default.md#getdetaillevel)
- [getDiscoverBiomeName](backend_gamelogic_gameuimanager.default.md#getdiscoverbiomename)
- [getEndTimeSeconds](backend_gamelogic_gameuimanager.default.md#getendtimeseconds)
- [getEnergyCurveAtPercent](backend_gamelogic_gameuimanager.default.md#getenergycurveatpercent)
- [getEnergyOfPlayer](backend_gamelogic_gameuimanager.default.md#getenergyofplayer)
- [getEthConnection](backend_gamelogic_gameuimanager.default.md#getethconnection)
- [getExploredChunks](backend_gamelogic_gameuimanager.default.md#getexploredchunks)
- [getForcesSending](backend_gamelogic_gameuimanager.default.md#getforcessending)
- [getGptCreditBalanceEmitter](backend_gamelogic_gameuimanager.default.md#getgptcreditbalanceemitter)
- [getGptCreditPriceEmitter](backend_gamelogic_gameuimanager.default.md#getgptcreditpriceemitter)
- [getHashConfig](backend_gamelogic_gameuimanager.default.md#gethashconfig)
- [getHashesPerSec](backend_gamelogic_gameuimanager.default.md#gethashespersec)
- [getHomeCoords](backend_gamelogic_gameuimanager.default.md#gethomecoords)
- [getHomeHash](backend_gamelogic_gameuimanager.default.md#gethomehash)
- [getHomePlanet](backend_gamelogic_gameuimanager.default.md#gethomeplanet)
- [getHoveringOverCoords](backend_gamelogic_gameuimanager.default.md#gethoveringovercoords)
- [getHoveringOverPlanet](backend_gamelogic_gameuimanager.default.md#gethoveringoverplanet)
- [getIsBuyingCreditsEmitter](backend_gamelogic_gameuimanager.default.md#getisbuyingcreditsemitter)
- [getIsChoosingTargetPlanet](backend_gamelogic_gameuimanager.default.md#getischoosingtargetplanet)
- [getLocationOfPlanet](backend_gamelogic_gameuimanager.default.md#getlocationofplanet)
- [getLocationsAndChunks](backend_gamelogic_gameuimanager.default.md#getlocationsandchunks)
- [getMinerLocation](backend_gamelogic_gameuimanager.default.md#getminerlocation)
- [getMiningPattern](backend_gamelogic_gameuimanager.default.md#getminingpattern)
- [getMouseDownCoords](backend_gamelogic_gameuimanager.default.md#getmousedowncoords)
- [getMouseDownPlanet](backend_gamelogic_gameuimanager.default.md#getmousedownplanet)
- [getMyArtifactMap](backend_gamelogic_gameuimanager.default.md#getmyartifactmap)
- [getMyArtifacts](backend_gamelogic_gameuimanager.default.md#getmyartifacts)
- [getMyArtifactsNotOnPlanet](backend_gamelogic_gameuimanager.default.md#getmyartifactsnotonplanet)
- [getMyBalance](backend_gamelogic_gameuimanager.default.md#getmybalance)
- [getMyBalanceEmitter](backend_gamelogic_gameuimanager.default.md#getmybalanceemitter)
- [getMyPlanetMap](backend_gamelogic_gameuimanager.default.md#getmyplanetmap)
- [getNextBroadcastAvailableTimestamp](backend_gamelogic_gameuimanager.default.md#getnextbroadcastavailabletimestamp)
- [getPerlinThresholds](backend_gamelogic_gameuimanager.default.md#getperlinthresholds)
- [getPlanetDetailLevel](backend_gamelogic_gameuimanager.default.md#getplanetdetaillevel)
- [getPlanetLevel](backend_gamelogic_gameuimanager.default.md#getplanetlevel)
- [getPlanetMap](backend_gamelogic_gameuimanager.default.md#getplanetmap)
- [getPlanetWithId](backend_gamelogic_gameuimanager.default.md#getplanetwithid)
- [getPlanetsInViewport](backend_gamelogic_gameuimanager.default.md#getplanetsinviewport)
- [getPluginManager](backend_gamelogic_gameuimanager.default.md#getpluginmanager)
- [getPreviousSelectedPlanet](backend_gamelogic_gameuimanager.default.md#getpreviousselectedplanet)
- [getPrivateKey](backend_gamelogic_gameuimanager.default.md#getprivatekey)
- [getRadiusOfPlanetLevel](backend_gamelogic_gameuimanager.default.md#getradiusofplanetlevel)
- [getSelectedCoords](backend_gamelogic_gameuimanager.default.md#getselectedcoords)
- [getSelectedPlanet](backend_gamelogic_gameuimanager.default.md#getselectedplanet)
- [getSilverCurveAtPercent](backend_gamelogic_gameuimanager.default.md#getsilvercurveatpercent)
- [getSilverOfPlayer](backend_gamelogic_gameuimanager.default.md#getsilverofplayer)
- [getSilverSending](backend_gamelogic_gameuimanager.default.md#getsilversending)
- [getSpaceTypePerlin](backend_gamelogic_gameuimanager.default.md#getspacetypeperlin)
- [getTerminal](backend_gamelogic_gameuimanager.default.md#getterminal)
- [getTwitter](backend_gamelogic_gameuimanager.default.md#gettwitter)
- [getUIDataItem](backend_gamelogic_gameuimanager.default.md#getuidataitem)
- [getUnconfirmedMoves](backend_gamelogic_gameuimanager.default.md#getunconfirmedmoves)
- [getUnconfirmedUpgrades](backend_gamelogic_gameuimanager.default.md#getunconfirmedupgrades)
- [getUnconfirmedWormholeActivations](backend_gamelogic_gameuimanager.default.md#getunconfirmedwormholeactivations)
- [getUniverseTotalEnergy](backend_gamelogic_gameuimanager.default.md#getuniversetotalenergy)
- [getUpgrade](backend_gamelogic_gameuimanager.default.md#getupgrade)
- [getViewport](backend_gamelogic_gameuimanager.default.md#getviewport)
- [getWithdrawnSilverOfPlayer](backend_gamelogic_gameuimanager.default.md#getwithdrawnsilverofplayer)
- [getWorldRadius](backend_gamelogic_gameuimanager.default.md#getworldradius)
- [getWorldSilver](backend_gamelogic_gameuimanager.default.md#getworldsilver)
- [getWormholes](backend_gamelogic_gameuimanager.default.md#getwormholes)
- [hasMinedChunk](backend_gamelogic_gameuimanager.default.md#hasminedchunk)
- [isCurrentlyRevealing](backend_gamelogic_gameuimanager.default.md#iscurrentlyrevealing)
- [isMining](backend_gamelogic_gameuimanager.default.md#ismining)
- [isOverOwnPlanet](backend_gamelogic_gameuimanager.default.md#isoverownplanet)
- [isOwnedByMe](backend_gamelogic_gameuimanager.default.md#isownedbyme)
- [joinGame](backend_gamelogic_gameuimanager.default.md#joingame)
- [onDiscoveredChunk](backend_gamelogic_gameuimanager.default.md#ondiscoveredchunk)
- [onEmitInitializedPlayer](backend_gamelogic_gameuimanager.default.md#onemitinitializedplayer)
- [onEmitInitializedPlayerError](backend_gamelogic_gameuimanager.default.md#onemitinitializedplayererror)
- [onMouseClick](backend_gamelogic_gameuimanager.default.md#onmouseclick)
- [onMouseDown](backend_gamelogic_gameuimanager.default.md#onmousedown)
- [onMouseMove](backend_gamelogic_gameuimanager.default.md#onmousemove)
- [onMouseOut](backend_gamelogic_gameuimanager.default.md#onmouseout)
- [onMouseUp](backend_gamelogic_gameuimanager.default.md#onmouseup)
- [onSendCancel](backend_gamelogic_gameuimanager.default.md#onsendcancel)
- [onSendInit](backend_gamelogic_gameuimanager.default.md#onsendinit)
- [planetHitboxForCoords](backend_gamelogic_gameuimanager.default.md#planethitboxforcoords)
- [prospectPlanet](backend_gamelogic_gameuimanager.default.md#prospectplanet)
- [removeExtraMinerLocation](backend_gamelogic_gameuimanager.default.md#removeextraminerlocation)
- [revealLocation](backend_gamelogic_gameuimanager.default.md#reveallocation)
- [setArtifactSending](backend_gamelogic_gameuimanager.default.md#setartifactsending)
- [setDetailLevel](backend_gamelogic_gameuimanager.default.md#setdetaillevel)
- [setExtraMinerLocation](backend_gamelogic_gameuimanager.default.md#setextraminerlocation)
- [setForcesSending](backend_gamelogic_gameuimanager.default.md#setforcessending)
- [setMiningPattern](backend_gamelogic_gameuimanager.default.md#setminingpattern)
- [setSelectedId](backend_gamelogic_gameuimanager.default.md#setselectedid)
- [setSelectedPlanet](backend_gamelogic_gameuimanager.default.md#setselectedplanet)
- [setSilverSending](backend_gamelogic_gameuimanager.default.md#setsilversending)
- [setUIDataItem](backend_gamelogic_gameuimanager.default.md#setuidataitem)
- [spaceTypeFromPerlin](backend_gamelogic_gameuimanager.default.md#spacetypefromperlin)
- [startConversation](backend_gamelogic_gameuimanager.default.md#startconversation)
- [startExplore](backend_gamelogic_gameuimanager.default.md#startexplore)
- [startWormholeFrom](backend_gamelogic_gameuimanager.default.md#startwormholefrom)
- [stepConversation](backend_gamelogic_gameuimanager.default.md#stepconversation)
- [stopExplore](backend_gamelogic_gameuimanager.default.md#stopexplore)
- [updateMouseHoveringOverCoords](backend_gamelogic_gameuimanager.default.md#updatemousehoveringovercoords)
- [updatePlanets](backend_gamelogic_gameuimanager.default.md#updateplanets)
- [upgrade](backend_gamelogic_gameuimanager.default.md#upgrade)
- [verifyTwitter](backend_gamelogic_gameuimanager.default.md#verifytwitter)
- [withdrawArtifact](backend_gamelogic_gameuimanager.default.md#withdrawartifact)
- [withdrawSilver](backend_gamelogic_gameuimanager.default.md#withdrawsilver)
- [create](backend_gamelogic_gameuimanager.default.md#create)

## Constructors

### constructor

\+ `Private` **new default**(`gameManager`: [_default_](backend_gamelogic_gamemanager.default.md), `terminalHandle`: _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\>): [_default_](backend_gamelogic_gameuimanager.default.md)

#### Parameters

| Name             | Type                                                                                                          |
| :--------------- | :------------------------------------------------------------------------------------------------------------ |
| `gameManager`    | [_default_](backend_gamelogic_gamemanager.default.md)                                                         |
| `terminalHandle` | _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\> |

**Returns:** [_default_](backend_gamelogic_gameuimanager.default.md)

Overrides: EventEmitter.constructor

## Properties

### artifactSending

• `Private` **artifactSending**: _object_= {}

#### Type declaration

---

### detailLevel

• `Private` **detailLevel**: _number_

---

### extraMinerLocations

• `Private` **extraMinerLocations**: WorldCoords[]= []

---

### forcesSending

• `Private` **forcesSending**: _object_= {}

#### Type declaration

---

### gameManager

• `Private` **gameManager**: [_default_](backend_gamelogic_gamemanager.default.md)

---

### isChoosingTargetPlanet

• `Private` **isChoosingTargetPlanet**: _boolean_= false

The Wormhole artifact requires you to choose a target planet. This value
indicates whether or not the player is currently selecting a target planet.

---

### isSending

• `Private` **isSending**: _boolean_= false

---

### minerLocation

• `Private` **minerLocation**: _undefined_ \| WorldCoords

---

### mouseDownOverCoords

• `Private` **mouseDownOverCoords**: _undefined_ \| WorldCoords

---

### mouseDownOverPlanet

• `Private` **mouseDownOverPlanet**: _undefined_ \| Planet

---

### mouseHoveringOverCoords

• `Private` **mouseHoveringOverCoords**: _undefined_ \| WorldCoords

---

### mouseHoveringOverPlanet

• `Private` **mouseHoveringOverPlanet**: _undefined_ \| Planet

---

### myArtifacts$

• `Readonly` **myArtifacts$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<Map<ArtifactId, Artifact\>\>

---

### onChooseTargetPlanet

• `Private` `Optional` **onChooseTargetPlanet**: (`planet`: _undefined_ \| LocatablePlanet) => _void_

#### Type declaration

▸ (`planet`: _undefined_ \| LocatablePlanet): _void_

#### Parameters

| Name     | Type                           |
| :------- | :----------------------------- |
| `planet` | _undefined_ \| LocatablePlanet |

**Returns:** _void_

---

### plugins

• `Private` **plugins**: [_PluginManager_](backend_gamelogic_pluginmanager.pluginmanager.md)

---

### previousSelectedPlanet

• `Private` **previousSelectedPlanet**: _undefined_ \| Planet

---

### radiusMap

• `Private` `Readonly` **radiusMap**: _Record_<PlanetLevel, number\>

---

### selectedArtifact$

• `Readonly` **selectedArtifact$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<undefined \| Artifact\>

---

### selectedArtifactId$

• `Readonly` **selectedArtifactId$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<undefined \| ArtifactId\>

---

### selectedCoords

• `Private` **selectedCoords**: _undefined_ \| WorldCoords

---

### selectedPlanet

• `Private` **selectedPlanet**: _undefined_ \| Planet

---

### selectedPlanet$

• `Readonly` **selectedPlanet$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<undefined \| Planet\>

---

### selectedPlanetId$

• `Readonly` **selectedPlanetId$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<undefined \| LocationId\>

---

### sendingCoords

• `Private` **sendingCoords**: _undefined_ \| WorldCoords

---

### sendingPlanet

• `Private` **sendingPlanet**: _undefined_ \| Planet

---

### silverSending

• `Private` **silverSending**: _object_= {}

#### Type declaration

---

### terminal

• `Private` **terminal**: _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\>

---

### uiStateStorageManager

• `Private` **uiStateStorageManager**: [_default_](backend_storage_uistatestoragemanager.default.md)

## Methods

### activateArtifact

▸ **activateArtifact**(`locationId`: LocationId, `id`: ArtifactId, `wormholeTo?`: LocationId): _void_

#### Parameters

| Name          | Type       |
| :------------ | :--------- |
| `locationId`  | LocationId |
| `id`          | ArtifactId |
| `wormholeTo?` | LocationId |

**Returns:** _void_

---

### addAccount

▸ **addAccount**(`coords`: WorldCoords): _Promise_<boolean\>

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |

**Returns:** _Promise_<boolean\>

---

### addNewChunk

▸ **addNewChunk**(`chunk`: [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)): _void_

#### Parameters

| Name    | Type                                                                  |
| :------ | :-------------------------------------------------------------------- |
| `chunk` | [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md) |

**Returns:** _void_

---

### bulkAddNewChunks

▸ **bulkAddNewChunks**(`chunks`: [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)[]): _Promise_<void\>

#### Parameters

| Name     | Type                                                                    |
| :------- | :---------------------------------------------------------------------- |
| `chunks` | [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)[] |

**Returns:** _Promise_<void\>

---

### buyGPTCredits

▸ **buyGPTCredits**(`amount`: _number_): _void_

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `amount` | _number_ |

**Returns:** _void_

---

### buyHat

▸ **buyHat**(`planet`: Planet): _void_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _void_

---

### centerCoords

▸ **centerCoords**(`coords`: WorldCoords): _void_

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |

**Returns:** _void_

---

### centerLocationId

▸ **centerLocationId**(`planetId`: LocationId): _void_

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _void_

---

### centerPlanet

▸ **centerPlanet**(`planet`: _undefined_ \| Planet): _void_

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `planet` | _undefined_ \| Planet |

**Returns:** _void_

---

### deactivateArtifact

▸ **deactivateArtifact**(`locationId`: LocationId, `artifactId`: ArtifactId): _void_

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `locationId` | LocationId |
| `artifactId` | ArtifactId |

**Returns:** _void_

---

### depositArtifact

▸ **depositArtifact**(`locationId`: LocationId, `artifactId`: ArtifactId): _void_

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `locationId` | LocationId |
| `artifactId` | ArtifactId |

**Returns:** _void_

---

### destroy

▸ **destroy**(): _void_

**Returns:** _void_

---

### discoverBiome

▸ **discoverBiome**(`planet`: LocatablePlanet): _void_

#### Parameters

| Name     | Type            |
| :------- | :-------------- |
| `planet` | LocatablePlanet |

**Returns:** _void_

---

### findArtifact

▸ **findArtifact**(`planetId`: LocationId): _void_

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _void_

---

### generateVerificationTweet

▸ **generateVerificationTweet**(`twitter`: _string_): _Promise_<string\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `twitter` | _string_ |

**Returns:** _Promise_<string\>

---

### getAccount

▸ **getAccount**(): _undefined_ \| EthAddress

**Returns:** _undefined_ \| EthAddress

---

### getAllMinerLocations

▸ **getAllMinerLocations**(): WorldCoords[]

**Returns:** WorldCoords[]

---

### getAllOwnedPlanets

▸ **getAllOwnedPlanets**(): Planet[]

**Returns:** Planet[]

---

### getAllPlayers

▸ **getAllPlayers**(): Player[]

**Returns:** Player[]

---

### getAllVoyages

▸ **getAllVoyages**(): QueuedArrival[]

**Returns:** QueuedArrival[]

---

### getArtifactMap

▸ **getArtifactMap**(): _Map_<ArtifactId, Artifact\>

**Returns:** _Map_<ArtifactId, Artifact\>

---

### getArtifactPlanet

▸ **getArtifactPlanet**(`artifact`: Artifact): _undefined_ \| Planet

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `artifact` | Artifact |

**Returns:** _undefined_ \| Planet

---

### getArtifactSending

▸ **getArtifactSending**(`planetId`: LocationId): _undefined_ \| Artifact

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _undefined_ \| Artifact

---

### getArtifactWithId

▸ **getArtifactWithId**(`artifactId`: ArtifactId): _undefined_ \| Artifact

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `artifactId` | ArtifactId |

**Returns:** _undefined_ \| Artifact

---

### getArtifactsWithIds

▸ **getArtifactsWithIds**(`artifactIds`: ArtifactId[]): Artifact[]

#### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `artifactIds` | ArtifactId[] |

**Returns:** Artifact[]

---

### getArtifactsWithIdsIncludeUndefined

▸ **getArtifactsWithIdsIncludeUndefined**(`artifactIds`: ArtifactId[]): (_undefined_ \| Artifact)[]

#### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `artifactIds` | ArtifactId[] |

**Returns:** (_undefined_ \| Artifact)[]

---

### getBiomeKey

▸ `Private` **getBiomeKey**(`biome`: Biome): _string_

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `biome` | Biome |

**Returns:** _string_

---

### getBiomePerlin

▸ **getBiomePerlin**(`coords`: WorldCoords, `floor`: _boolean_): _number_

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |
| `floor`  | _boolean_   |

**Returns:** _number_

---

### getChunk

▸ **getChunk**(`chunkFootprint`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)): _undefined_ \| [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)

#### Parameters

| Name             | Type                                                                |
| :--------------- | :------------------------------------------------------------------ |
| `chunkFootprint` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |

**Returns:** _undefined_ \| [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)

---

### getContractAddress

▸ **getContractAddress**(): EthAddress

**Returns:** EthAddress

---

### getContractConstants

▸ **getContractConstants**(): [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md)

**Returns:** [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md)

---

### getConversation

▸ **getConversation**(`artifactId`: ArtifactId): _Promise_<undefined \| Conversation\>

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `artifactId` | ArtifactId |

**Returns:** _Promise_<undefined \| Conversation\>

---

### getDetailLevel

▸ **getDetailLevel**(): _number_

**Returns:** _number_

---

### getDiscoverBiomeName

▸ **getDiscoverBiomeName**(`biome`: Biome): _string_

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `biome` | Biome |

**Returns:** _string_

---

### getEndTimeSeconds

▸ **getEndTimeSeconds**(): _number_

**Returns:** _number_

---

### getEnergyCurveAtPercent

▸ **getEnergyCurveAtPercent**(`planet`: Planet, `percent`: _number_): _number_

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `planet`  | Planet   |
| `percent` | _number_ |

**Returns:** _number_

---

### getEnergyOfPlayer

▸ **getEnergyOfPlayer**(`player`: EthAddress): _number_

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

**Returns:** _Iterable_<[_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)\>

---

### getForcesSending

▸ **getForcesSending**(`planetId`: LocationId): _number_

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _number_

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

**Returns:** [_HashConfig_](../modules/_types_global_globaltypes.md#hashconfig)

---

### getHashesPerSec

▸ **getHashesPerSec**(): _number_

**Returns:** _number_

---

### getHomeCoords

▸ **getHomeCoords**(): WorldCoords

**Returns:** WorldCoords

---

### getHomeHash

▸ **getHomeHash**(): _undefined_ \| LocationId

**Returns:** _undefined_ \| LocationId

---

### getHomePlanet

▸ **getHomePlanet**(): _undefined_ \| Planet

**Returns:** _undefined_ \| Planet

---

### getHoveringOverCoords

▸ **getHoveringOverCoords**(): _undefined_ \| WorldCoords

**Returns:** _undefined_ \| WorldCoords

---

### getHoveringOverPlanet

▸ **getHoveringOverPlanet**(): _undefined_ \| Planet

**Returns:** _undefined_ \| Planet

---

### getIsBuyingCreditsEmitter

▸ **getIsBuyingCreditsEmitter**(): [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<boolean\>

**Returns:** [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<boolean\>

---

### getIsChoosingTargetPlanet

▸ **getIsChoosingTargetPlanet**(): _boolean_

**Returns:** _boolean_

---

### getLocationOfPlanet

▸ **getLocationOfPlanet**(`planetId`: LocationId): _undefined_ \| WorldLocation

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _undefined_ \| WorldLocation

---

### getLocationsAndChunks

▸ **getLocationsAndChunks**(): _object_

**Returns:** _object_

| Name        | Type                                                                               |
| :---------- | :--------------------------------------------------------------------------------- |
| `chunks`    | _Iterable_<[_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)\> |
| `locations` | _Iterable_<WorldLocation\>                                                         |

---

### getMinerLocation

▸ **getMinerLocation**(): _undefined_ \| WorldCoords

**Returns:** _undefined_ \| WorldCoords

---

### getMiningPattern

▸ **getMiningPattern**(): _undefined_ \| [_MiningPattern_](../interfaces/backend_miner_miningpatterns.miningpattern.md)

**Returns:** _undefined_ \| [_MiningPattern_](../interfaces/backend_miner_miningpatterns.miningpattern.md)

---

### getMouseDownCoords

▸ **getMouseDownCoords**(): _undefined_ \| WorldCoords

**Returns:** _undefined_ \| WorldCoords

---

### getMouseDownPlanet

▸ **getMouseDownPlanet**(): _undefined_ \| Planet

**Returns:** _undefined_ \| Planet

---

### getMyArtifactMap

▸ **getMyArtifactMap**(): _Map_<ArtifactId, Artifact\>

**Returns:** _Map_<ArtifactId, Artifact\>

---

### getMyArtifacts

▸ **getMyArtifacts**(): Artifact[]

**Returns:** Artifact[]

---

### getMyArtifactsNotOnPlanet

▸ **getMyArtifactsNotOnPlanet**(): Artifact[]

**Returns:** Artifact[]

---

### getMyBalance

▸ **getMyBalance**(): _number_

**Returns:** _number_

---

### getMyBalanceEmitter

▸ **getMyBalanceEmitter**(): [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<number\>

**Returns:** [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<number\>

---

### getMyPlanetMap

▸ **getMyPlanetMap**(): _Map_<LocationId, Planet\>

**Returns:** _Map_<LocationId, Planet\>

---

### getNextBroadcastAvailableTimestamp

▸ **getNextBroadcastAvailableTimestamp**(): _number_

**Returns:** _number_

---

### getPerlinThresholds

▸ **getPerlinThresholds**(): [*number*, *number*, *number*]

**Returns:** [*number*, *number*, *number*]

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

### getPlanetWithId

▸ **getPlanetWithId**(`planetId`: LocationId): _undefined_ \| Planet

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _undefined_ \| Planet

---

### getPlanetsInViewport

▸ **getPlanetsInViewport**(): Planet[]

**Returns:** Planet[]

---

### getPluginManager

▸ **getPluginManager**(): [_PluginManager_](backend_gamelogic_pluginmanager.pluginmanager.md)

**Returns:** [_PluginManager_](backend_gamelogic_pluginmanager.pluginmanager.md)

---

### getPreviousSelectedPlanet

▸ **getPreviousSelectedPlanet**(): _undefined_ \| Planet

**Returns:** _undefined_ \| Planet

---

### getPrivateKey

▸ **getPrivateKey**(): _string_

**Returns:** _string_

---

### getRadiusOfPlanetLevel

▸ **getRadiusOfPlanetLevel**(`planetRarity`: PlanetLevel): _number_

#### Parameters

| Name           | Type        |
| :------------- | :---------- |
| `planetRarity` | PlanetLevel |

**Returns:** _number_

---

### getSelectedCoords

▸ **getSelectedCoords**(): _undefined_ \| WorldCoords

**Returns:** _undefined_ \| WorldCoords

---

### getSelectedPlanet

▸ **getSelectedPlanet**(): _undefined_ \| Planet

**Returns:** _undefined_ \| Planet

---

### getSilverCurveAtPercent

▸ **getSilverCurveAtPercent**(`planet`: Planet, `percent`: _number_): _undefined_ \| _number_

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `planet`  | Planet   |
| `percent` | _number_ |

**Returns:** _undefined_ \| _number_

---

### getSilverOfPlayer

▸ **getSilverOfPlayer**(`player`: EthAddress): _number_

#### Parameters

| Name     | Type       |
| :------- | :--------- |
| `player` | EthAddress |

**Returns:** _number_

---

### getSilverSending

▸ **getSilverSending**(`planetId`: LocationId): _number_

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _number_

---

### getSpaceTypePerlin

▸ **getSpaceTypePerlin**(`coords`: WorldCoords, `floor`: _boolean_): _number_

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |
| `floor`  | _boolean_   |

**Returns:** _number_

---

### getTerminal

▸ **getTerminal**(): _undefined_ \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)

**Returns:** _undefined_ \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)

---

### getTwitter

▸ **getTwitter**(`address`: _undefined_ \| EthAddress): _undefined_ \| _string_

#### Parameters

| Name      | Type                      |
| :-------- | :------------------------ |
| `address` | _undefined_ \| EthAddress |

**Returns:** _undefined_ \| _string_

---

### getUIDataItem

▸ **getUIDataItem**(`key`: [_UIDataKey_](../enums/backend_storage_uistatestoragemanager.uidatakey.md)): _boolean_

#### Parameters

| Name  | Type                                                                       |
| :---- | :------------------------------------------------------------------------- |
| `key` | [_UIDataKey_](../enums/backend_storage_uistatestoragemanager.uidatakey.md) |

**Returns:** _boolean_

---

### getUnconfirmedMoves

▸ **getUnconfirmedMoves**(): UnconfirmedMove[]

**Returns:** UnconfirmedMove[]

---

### getUnconfirmedUpgrades

▸ **getUnconfirmedUpgrades**(): UnconfirmedUpgrade[]

**Returns:** UnconfirmedUpgrade[]

---

### getUnconfirmedWormholeActivations

▸ **getUnconfirmedWormholeActivations**(): UnconfirmedActivateArtifact[]

**Returns:** UnconfirmedActivateArtifact[]

---

### getUniverseTotalEnergy

▸ **getUniverseTotalEnergy**(): _number_

**Returns:** _number_

---

### getUpgrade

▸ **getUpgrade**(`branch`: UpgradeBranchName, `level`: _number_): Upgrade

#### Parameters

| Name     | Type              |
| :------- | :---------------- |
| `branch` | UpgradeBranchName |
| `level`  | _number_          |

**Returns:** Upgrade

---

### getViewport

▸ **getViewport**(): [_default_](frontend_game_viewport.default.md)

**Returns:** [_default_](frontend_game_viewport.default.md)

---

### getWithdrawnSilverOfPlayer

▸ **getWithdrawnSilverOfPlayer**(`player`: EthAddress): _number_

#### Parameters

| Name     | Type       |
| :------- | :--------- |
| `player` | EthAddress |

**Returns:** _number_

---

### getWorldRadius

▸ **getWorldRadius**(): _number_

**Returns:** _number_

---

### getWorldSilver

▸ **getWorldSilver**(): _number_

**Returns:** _number_

---

### getWormholes

▸ **getWormholes**(): _Iterable_<[_Wormhole_](../modules/_types_global_globaltypes.md#wormhole)\>

**Returns:** _Iterable_<[_Wormhole_](../modules/_types_global_globaltypes.md#wormhole)\>

---

### hasMinedChunk

▸ **hasMinedChunk**(`chunkLocation`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)): _boolean_

#### Parameters

| Name            | Type                                                                |
| :-------------- | :------------------------------------------------------------------ |
| `chunkLocation` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |

**Returns:** _boolean_

---

### isCurrentlyRevealing

▸ **isCurrentlyRevealing**(): _boolean_

**Returns:** _boolean_

---

### isMining

▸ **isMining**(): _boolean_

**Returns:** _boolean_

---

### isOverOwnPlanet

▸ **isOverOwnPlanet**(`coords`: WorldCoords): _undefined_ \| Planet

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |

**Returns:** _undefined_ \| Planet

---

### isOwnedByMe

▸ **isOwnedByMe**(`planet`: Planet): _boolean_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _boolean_

---

### joinGame

▸ **joinGame**(`beforeRetry`: (`e`: Error) => _Promise_<boolean\>): [_default_](backend_gamelogic_gameuimanager.default.md)

#### Parameters

| Name          | Type                                |
| :------------ | :---------------------------------- |
| `beforeRetry` | (`e`: Error) => _Promise_<boolean\> |

**Returns:** [_default_](backend_gamelogic_gameuimanager.default.md)

---

### onDiscoveredChunk

▸ **onDiscoveredChunk**(`chunk`: [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md)): _void_

#### Parameters

| Name    | Type                                                                  |
| :------ | :-------------------------------------------------------------------- |
| `chunk` | [_ExploredChunkData_](_types_global_globaltypes.exploredchunkdata.md) |

**Returns:** _void_

---

### onEmitInitializedPlayer

▸ `Private` **onEmitInitializedPlayer**(): _void_

**Returns:** _void_

---

### onEmitInitializedPlayerError

▸ `Private` **onEmitInitializedPlayerError**(`err`: ReactNode): _void_

#### Parameters

| Name  | Type      |
| :---- | :-------- |
| `err` | ReactNode |

**Returns:** _void_

---

### onMouseClick

▸ **onMouseClick**(`_coords`: WorldCoords): _void_

#### Parameters

| Name      | Type        |
| :-------- | :---------- |
| `_coords` | WorldCoords |

**Returns:** _void_

---

### onMouseDown

▸ **onMouseDown**(`coords`: WorldCoords): _void_

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |

**Returns:** _void_

---

### onMouseMove

▸ **onMouseMove**(`coords`: WorldCoords): _void_

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |

**Returns:** _void_

---

### onMouseOut

▸ **onMouseOut**(): _void_

**Returns:** _void_

---

### onMouseUp

▸ **onMouseUp**(`coords`: WorldCoords): _void_

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |

**Returns:** _void_

---

### onSendCancel

▸ **onSendCancel**(): _void_

**Returns:** _void_

---

### onSendInit

▸ **onSendInit**(`planet`: _undefined_ \| Planet): _void_

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `planet` | _undefined_ \| Planet |

**Returns:** _void_

---

### planetHitboxForCoords

▸ `Private` **planetHitboxForCoords**(`coords`: WorldCoords): _undefined_ \| LocatablePlanet

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |

**Returns:** _undefined_ \| LocatablePlanet

---

### prospectPlanet

▸ **prospectPlanet**(`planetId`: LocationId): _void_

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _void_

---

### removeExtraMinerLocation

▸ **removeExtraMinerLocation**(`idx`: _number_): _void_

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `idx` | _number_ |

**Returns:** _void_

---

### revealLocation

▸ **revealLocation**(`locationId`: LocationId): _void_

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `locationId` | LocationId |

**Returns:** _void_

---

### setArtifactSending

▸ **setArtifactSending**(`planetId`: LocationId, `artifact?`: Artifact): _void_

#### Parameters

| Name        | Type       |
| :---------- | :--------- |
| `planetId`  | LocationId |
| `artifact?` | Artifact   |

**Returns:** _void_

---

### setDetailLevel

▸ **setDetailLevel**(`level`: _number_): _void_

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `level` | _number_ |

**Returns:** _void_

---

### setExtraMinerLocation

▸ **setExtraMinerLocation**(`idx`: _number_, `coords`: WorldCoords): _void_

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `idx`    | _number_    |
| `coords` | WorldCoords |

**Returns:** _void_

---

### setForcesSending

▸ **setForcesSending**(`planetId`: LocationId, `percentage`: _number_): _void_

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `planetId`   | LocationId |
| `percentage` | _number_   |

**Returns:** _void_

---

### setMiningPattern

▸ **setMiningPattern**(`pattern`: [_MiningPattern_](../interfaces/backend_miner_miningpatterns.miningpattern.md)): _void_

#### Parameters

| Name      | Type                                                                           |
| :-------- | :----------------------------------------------------------------------------- |
| `pattern` | [_MiningPattern_](../interfaces/backend_miner_miningpatterns.miningpattern.md) |

**Returns:** _void_

---

### setSelectedId

▸ **setSelectedId**(`id`: LocationId): _void_

#### Parameters

| Name | Type       |
| :--- | :--------- |
| `id` | LocationId |

**Returns:** _void_

---

### setSelectedPlanet

▸ **setSelectedPlanet**(`planet`: _undefined_ \| Planet): _void_

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `planet` | _undefined_ \| Planet |

**Returns:** _void_

---

### setSilverSending

▸ **setSilverSending**(`planetId`: LocationId, `percentage`: _number_): _void_

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `planetId`   | LocationId |
| `percentage` | _number_   |

**Returns:** _void_

---

### setUIDataItem

▸ **setUIDataItem**(`key`: [_UIDataKey_](../enums/backend_storage_uistatestoragemanager.uidatakey.md), `value`: _boolean_): _void_

#### Parameters

| Name    | Type                                                                       |
| :------ | :------------------------------------------------------------------------- |
| `key`   | [_UIDataKey_](../enums/backend_storage_uistatestoragemanager.uidatakey.md) |
| `value` | _boolean_                                                                  |

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

### startConversation

▸ **startConversation**(`artifactId`: ArtifactId): _Promise_<Conversation\>

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `artifactId` | ArtifactId |

**Returns:** _Promise_<Conversation\>

---

### startExplore

▸ **startExplore**(): _void_

**Returns:** _void_

---

### startWormholeFrom

▸ **startWormholeFrom**(`planet`: LocatablePlanet): _Promise_<undefined \| LocatablePlanet\>

#### Parameters

| Name     | Type            |
| :------- | :-------------- |
| `planet` | LocatablePlanet |

**Returns:** _Promise_<undefined \| LocatablePlanet\>

---

### stepConversation

▸ **stepConversation**(`artifactId`: ArtifactId, `message`: _string_): _Promise_<Conversation\>

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `artifactId` | ArtifactId |
| `message`    | _string_   |

**Returns:** _Promise_<Conversation\>

---

### stopExplore

▸ **stopExplore**(): _void_

**Returns:** _void_

---

### updateMouseHoveringOverCoords

▸ `Private` **updateMouseHoveringOverCoords**(`coords`: WorldCoords): WorldCoords

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |

**Returns:** WorldCoords

---

### updatePlanets

▸ `Private` **updatePlanets**(): _void_

**Returns:** _void_

---

### upgrade

▸ **upgrade**(`planet`: Planet, `branch`: _number_): _void_

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | Planet   |
| `branch` | _number_ |

**Returns:** _void_

---

### verifyTwitter

▸ **verifyTwitter**(`twitter`: _string_): _Promise_<boolean\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `twitter` | _string_ |

**Returns:** _Promise_<boolean\>

---

### withdrawArtifact

▸ **withdrawArtifact**(`locationId`: LocationId, `artifactId`: ArtifactId): _void_

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `locationId` | LocationId |
| `artifactId` | ArtifactId |

**Returns:** _void_

---

### withdrawSilver

▸ **withdrawSilver**(`locationId`: LocationId, `amount`: _number_): _void_

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `locationId` | LocationId |
| `amount`     | _number_   |

**Returns:** _void_

---

### create

▸ `Static` **create**(`gameManager`: [_default_](backend_gamelogic_gamemanager.default.md), `terminalHandle`: _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\>): _Promise_<[_default_](backend_gamelogic_gameuimanager.default.md)\>

#### Parameters

| Name             | Type                                                                                                          |
| :--------------- | :------------------------------------------------------------------------------------------------------------ |
| `gameManager`    | [_default_](backend_gamelogic_gamemanager.default.md)                                                         |
| `terminalHandle` | _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\> |

**Returns:** _Promise_<[_default_](backend_gamelogic_gameuimanager.default.md)\>
