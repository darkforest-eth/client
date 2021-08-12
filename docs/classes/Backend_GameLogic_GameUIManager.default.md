# Class: default

[Backend/GameLogic/GameUIManager](../modules/Backend_GameLogic_GameUIManager.md).default

## Hierarchy

- `EventEmitter`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](Backend_GameLogic_GameUIManager.default.md#constructor)

### Properties

- [artifactSending](Backend_GameLogic_GameUIManager.default.md#artifactsending)
- [extraMinerLocations](Backend_GameLogic_GameUIManager.default.md#extraminerlocations)
- [forcesSending](Backend_GameLogic_GameUIManager.default.md#forcessending)
- [gameManager](Backend_GameLogic_GameUIManager.default.md#gamemanager)
- [hoverPlanet$](Backend_GameLogic_GameUIManager.default.md#hoverplanet$)
- [hoverPlanetId$](Backend_GameLogic_GameUIManager.default.md#hoverplanetid$)
- [isChoosingTargetPlanet](Backend_GameLogic_GameUIManager.default.md#ischoosingtargetplanet)
- [isSending](Backend_GameLogic_GameUIManager.default.md#issending)
- [minerLocation](Backend_GameLogic_GameUIManager.default.md#minerlocation)
- [mouseDownOverCoords](Backend_GameLogic_GameUIManager.default.md#mousedownovercoords)
- [mouseDownOverPlanet](Backend_GameLogic_GameUIManager.default.md#mousedownoverplanet)
- [mouseHoveringOverCoords](Backend_GameLogic_GameUIManager.default.md#mousehoveringovercoords)
- [mouseHoveringOverPlanet](Backend_GameLogic_GameUIManager.default.md#mousehoveringoverplanet)
- [myArtifacts$](Backend_GameLogic_GameUIManager.default.md#myartifacts$)
- [onChooseTargetPlanet](Backend_GameLogic_GameUIManager.default.md#onchoosetargetplanet)
- [plugins](Backend_GameLogic_GameUIManager.default.md#plugins)
- [previousSelectedPlanet](Backend_GameLogic_GameUIManager.default.md#previousselectedplanet)
- [radiusMap](Backend_GameLogic_GameUIManager.default.md#radiusmap)
- [selectedArtifact$](Backend_GameLogic_GameUIManager.default.md#selectedartifact$)
- [selectedArtifactId$](Backend_GameLogic_GameUIManager.default.md#selectedartifactid$)
- [selectedCoords](Backend_GameLogic_GameUIManager.default.md#selectedcoords)
- [selectedPlanet](Backend_GameLogic_GameUIManager.default.md#selectedplanet)
- [selectedPlanet$](Backend_GameLogic_GameUIManager.default.md#selectedplanet$)
- [selectedPlanetId$](Backend_GameLogic_GameUIManager.default.md#selectedplanetid$)
- [sendingCoords](Backend_GameLogic_GameUIManager.default.md#sendingcoords)
- [sendingPlanet](Backend_GameLogic_GameUIManager.default.md#sendingplanet)
- [silverSending](Backend_GameLogic_GameUIManager.default.md#silversending)
- [terminal](Backend_GameLogic_GameUIManager.default.md#terminal)
- [viewportEntities](Backend_GameLogic_GameUIManager.default.md#viewportentities)

### Methods

- [activateArtifact](Backend_GameLogic_GameUIManager.default.md#activateartifact)
- [addAccount](Backend_GameLogic_GameUIManager.default.md#addaccount)
- [addNewChunk](Backend_GameLogic_GameUIManager.default.md#addnewchunk)
- [bulkAddNewChunks](Backend_GameLogic_GameUIManager.default.md#bulkaddnewchunks)
- [buyGPTCredits](Backend_GameLogic_GameUIManager.default.md#buygptcredits)
- [buyHat](Backend_GameLogic_GameUIManager.default.md#buyhat)
- [centerCoords](Backend_GameLogic_GameUIManager.default.md#centercoords)
- [centerLocationId](Backend_GameLogic_GameUIManager.default.md#centerlocationid)
- [centerPlanet](Backend_GameLogic_GameUIManager.default.md#centerplanet)
- [claimLocation](Backend_GameLogic_GameUIManager.default.md#claimlocation)
- [deactivateArtifact](Backend_GameLogic_GameUIManager.default.md#deactivateartifact)
- [depositArtifact](Backend_GameLogic_GameUIManager.default.md#depositartifact)
- [destroy](Backend_GameLogic_GameUIManager.default.md#destroy)
- [disconnectTwitter](Backend_GameLogic_GameUIManager.default.md#disconnecttwitter)
- [discoverBiome](Backend_GameLogic_GameUIManager.default.md#discoverbiome)
- [findArtifact](Backend_GameLogic_GameUIManager.default.md#findartifact)
- [generateVerificationTweet](Backend_GameLogic_GameUIManager.default.md#generateverificationtweet)
- [getAccount](Backend_GameLogic_GameUIManager.default.md#getaccount)
- [getAllMinerLocations](Backend_GameLogic_GameUIManager.default.md#getallminerlocations)
- [getAllOwnedPlanets](Backend_GameLogic_GameUIManager.default.md#getallownedplanets)
- [getAllPlayers](Backend_GameLogic_GameUIManager.default.md#getallplayers)
- [getAllVoyages](Backend_GameLogic_GameUIManager.default.md#getallvoyages)
- [getArtifactMap](Backend_GameLogic_GameUIManager.default.md#getartifactmap)
- [getArtifactPlanet](Backend_GameLogic_GameUIManager.default.md#getartifactplanet)
- [getArtifactSending](Backend_GameLogic_GameUIManager.default.md#getartifactsending)
- [getArtifactWithId](Backend_GameLogic_GameUIManager.default.md#getartifactwithid)
- [getArtifactsWithIds](Backend_GameLogic_GameUIManager.default.md#getartifactswithids)
- [getBiomeKey](Backend_GameLogic_GameUIManager.default.md#getbiomekey)
- [getBiomePerlin](Backend_GameLogic_GameUIManager.default.md#getbiomeperlin)
- [getBooleanSetting](Backend_GameLogic_GameUIManager.default.md#getbooleansetting)
- [getChunk](Backend_GameLogic_GameUIManager.default.md#getchunk)
- [getContractAddress](Backend_GameLogic_GameUIManager.default.md#getcontractaddress)
- [getContractConstants](Backend_GameLogic_GameUIManager.default.md#getcontractconstants)
- [getConversation](Backend_GameLogic_GameUIManager.default.md#getconversation)
- [getDiagnostics](Backend_GameLogic_GameUIManager.default.md#getdiagnostics)
- [getDiscoverBiomeName](Backend_GameLogic_GameUIManager.default.md#getdiscoverbiomename)
- [getDistCoords](Backend_GameLogic_GameUIManager.default.md#getdistcoords)
- [getEndTimeSeconds](Backend_GameLogic_GameUIManager.default.md#getendtimeseconds)
- [getEnergyArrivingForMove](Backend_GameLogic_GameUIManager.default.md#getenergyarrivingformove)
- [getEnergyCurveAtPercent](Backend_GameLogic_GameUIManager.default.md#getenergycurveatpercent)
- [getEnergyOfPlayer](Backend_GameLogic_GameUIManager.default.md#getenergyofplayer)
- [getEthConnection](Backend_GameLogic_GameUIManager.default.md#getethconnection)
- [getExploredChunks](Backend_GameLogic_GameUIManager.default.md#getexploredchunks)
- [getForcesSending](Backend_GameLogic_GameUIManager.default.md#getforcessending)
- [getGameManager](Backend_GameLogic_GameUIManager.default.md#getgamemanager)
- [getGameObjects](Backend_GameLogic_GameUIManager.default.md#getgameobjects)
- [getGptCreditBalanceEmitter](Backend_GameLogic_GameUIManager.default.md#getgptcreditbalanceemitter)
- [getGptCreditPriceEmitter](Backend_GameLogic_GameUIManager.default.md#getgptcreditpriceemitter)
- [getHashConfig](Backend_GameLogic_GameUIManager.default.md#gethashconfig)
- [getHashesPerSec](Backend_GameLogic_GameUIManager.default.md#gethashespersec)
- [getHomeCoords](Backend_GameLogic_GameUIManager.default.md#gethomecoords)
- [getHomeHash](Backend_GameLogic_GameUIManager.default.md#gethomehash)
- [getHomePlanet](Backend_GameLogic_GameUIManager.default.md#gethomeplanet)
- [getHoveringOverCoords](Backend_GameLogic_GameUIManager.default.md#gethoveringovercoords)
- [getHoveringOverPlanet](Backend_GameLogic_GameUIManager.default.md#gethoveringoverplanet)
- [getIsBuyingCreditsEmitter](Backend_GameLogic_GameUIManager.default.md#getisbuyingcreditsemitter)
- [getIsChoosingTargetPlanet](Backend_GameLogic_GameUIManager.default.md#getischoosingtargetplanet)
- [getIsHighPerfMode](Backend_GameLogic_GameUIManager.default.md#getishighperfmode)
- [getLocationOfPlanet](Backend_GameLogic_GameUIManager.default.md#getlocationofplanet)
- [getLocationsAndChunks](Backend_GameLogic_GameUIManager.default.md#getlocationsandchunks)
- [getMinerLocation](Backend_GameLogic_GameUIManager.default.md#getminerlocation)
- [getMiningPattern](Backend_GameLogic_GameUIManager.default.md#getminingpattern)
- [getMouseDownCoords](Backend_GameLogic_GameUIManager.default.md#getmousedowncoords)
- [getMouseDownPlanet](Backend_GameLogic_GameUIManager.default.md#getmousedownplanet)
- [getMyArtifactMap](Backend_GameLogic_GameUIManager.default.md#getmyartifactmap)
- [getMyArtifacts](Backend_GameLogic_GameUIManager.default.md#getmyartifacts)
- [getMyArtifactsNotOnPlanet](Backend_GameLogic_GameUIManager.default.md#getmyartifactsnotonplanet)
- [getMyBalance](Backend_GameLogic_GameUIManager.default.md#getmybalance)
- [getMyBalance$](Backend_GameLogic_GameUIManager.default.md#getmybalance$)
- [getMyPlanetMap](Backend_GameLogic_GameUIManager.default.md#getmyplanetmap)
- [getMyScore](Backend_GameLogic_GameUIManager.default.md#getmyscore)
- [getNextBroadcastAvailableTimestamp](Backend_GameLogic_GameUIManager.default.md#getnextbroadcastavailabletimestamp)
- [getPerlinConfig](Backend_GameLogic_GameUIManager.default.md#getperlinconfig)
- [getPerlinThresholds](Backend_GameLogic_GameUIManager.default.md#getperlinthresholds)
- [getPlanetLevel](Backend_GameLogic_GameUIManager.default.md#getplanetlevel)
- [getPlanetMap](Backend_GameLogic_GameUIManager.default.md#getplanetmap)
- [getPlanetWithCoords](Backend_GameLogic_GameUIManager.default.md#getplanetwithcoords)
- [getPlanetWithId](Backend_GameLogic_GameUIManager.default.md#getplanetwithid)
- [getPlanetsInViewport](Backend_GameLogic_GameUIManager.default.md#getplanetsinviewport)
- [getPlayer](Backend_GameLogic_GameUIManager.default.md#getplayer)
- [getPlayerScore](Backend_GameLogic_GameUIManager.default.md#getplayerscore)
- [getPluginManager](Backend_GameLogic_GameUIManager.default.md#getpluginmanager)
- [getPreviousSelectedPlanet](Backend_GameLogic_GameUIManager.default.md#getpreviousselectedplanet)
- [getPrivateKey](Backend_GameLogic_GameUIManager.default.md#getprivatekey)
- [getRadiusOfPlanetLevel](Backend_GameLogic_GameUIManager.default.md#getradiusofplanetlevel)
- [getSelectedCoords](Backend_GameLogic_GameUIManager.default.md#getselectedcoords)
- [getSelectedPlanet](Backend_GameLogic_GameUIManager.default.md#getselectedplanet)
- [getSilverCurveAtPercent](Backend_GameLogic_GameUIManager.default.md#getsilvercurveatpercent)
- [getSilverOfPlayer](Backend_GameLogic_GameUIManager.default.md#getsilverofplayer)
- [getSilverSending](Backend_GameLogic_GameUIManager.default.md#getsilversending)
- [getSpaceTypePerlin](Backend_GameLogic_GameUIManager.default.md#getspacetypeperlin)
- [getStringSetting](Backend_GameLogic_GameUIManager.default.md#getstringsetting)
- [getTerminal](Backend_GameLogic_GameUIManager.default.md#getterminal)
- [getTwitter](Backend_GameLogic_GameUIManager.default.md#gettwitter)
- [getUnconfirmedMoves](Backend_GameLogic_GameUIManager.default.md#getunconfirmedmoves)
- [getUnconfirmedUpgrades](Backend_GameLogic_GameUIManager.default.md#getunconfirmedupgrades)
- [getUnconfirmedWormholeActivations](Backend_GameLogic_GameUIManager.default.md#getunconfirmedwormholeactivations)
- [getUniverseTotalEnergy](Backend_GameLogic_GameUIManager.default.md#getuniversetotalenergy)
- [getUpgrade](Backend_GameLogic_GameUIManager.default.md#getupgrade)
- [getViewport](Backend_GameLogic_GameUIManager.default.md#getviewport)
- [getWorldRadius](Backend_GameLogic_GameUIManager.default.md#getworldradius)
- [getWorldSilver](Backend_GameLogic_GameUIManager.default.md#getworldsilver)
- [getWormholes](Backend_GameLogic_GameUIManager.default.md#getwormholes)
- [hasMinedChunk](Backend_GameLogic_GameUIManager.default.md#hasminedchunk)
- [isCurrentlyClaiming](Backend_GameLogic_GameUIManager.default.md#iscurrentlyclaiming)
- [isCurrentlyRevealing](Backend_GameLogic_GameUIManager.default.md#iscurrentlyrevealing)
- [isMining](Backend_GameLogic_GameUIManager.default.md#ismining)
- [isOverOwnPlanet](Backend_GameLogic_GameUIManager.default.md#isoverownplanet)
- [isOwnedByMe](Backend_GameLogic_GameUIManager.default.md#isownedbyme)
- [isRoundOver](Backend_GameLogic_GameUIManager.default.md#isroundover)
- [joinGame](Backend_GameLogic_GameUIManager.default.md#joingame)
- [onDiscoveredChunk](Backend_GameLogic_GameUIManager.default.md#ondiscoveredchunk)
- [onEmitInitializedPlayer](Backend_GameLogic_GameUIManager.default.md#onemitinitializedplayer)
- [onEmitInitializedPlayerError](Backend_GameLogic_GameUIManager.default.md#onemitinitializedplayererror)
- [onMouseClick](Backend_GameLogic_GameUIManager.default.md#onmouseclick)
- [onMouseDown](Backend_GameLogic_GameUIManager.default.md#onmousedown)
- [onMouseMove](Backend_GameLogic_GameUIManager.default.md#onmousemove)
- [onMouseOut](Backend_GameLogic_GameUIManager.default.md#onmouseout)
- [onMouseUp](Backend_GameLogic_GameUIManager.default.md#onmouseup)
- [onSendCancel](Backend_GameLogic_GameUIManager.default.md#onsendcancel)
- [onSendInit](Backend_GameLogic_GameUIManager.default.md#onsendinit)
- [prospectPlanet](Backend_GameLogic_GameUIManager.default.md#prospectplanet)
- [removeExtraMinerLocation](Backend_GameLogic_GameUIManager.default.md#removeextraminerlocation)
- [revealLocation](Backend_GameLogic_GameUIManager.default.md#reveallocation)
- [setArtifactSending](Backend_GameLogic_GameUIManager.default.md#setartifactsending)
- [setExtraMinerLocation](Backend_GameLogic_GameUIManager.default.md#setextraminerlocation)
- [setForcesSending](Backend_GameLogic_GameUIManager.default.md#setforcessending)
- [setHoveringOverPlanet](Backend_GameLogic_GameUIManager.default.md#sethoveringoverplanet)
- [setMiningPattern](Backend_GameLogic_GameUIManager.default.md#setminingpattern)
- [setSelectedId](Backend_GameLogic_GameUIManager.default.md#setselectedid)
- [setSelectedPlanet](Backend_GameLogic_GameUIManager.default.md#setselectedplanet)
- [setSilverSending](Backend_GameLogic_GameUIManager.default.md#setsilversending)
- [spaceTypeFromPerlin](Backend_GameLogic_GameUIManager.default.md#spacetypefromperlin)
- [startConversation](Backend_GameLogic_GameUIManager.default.md#startconversation)
- [startExplore](Backend_GameLogic_GameUIManager.default.md#startexplore)
- [startWormholeFrom](Backend_GameLogic_GameUIManager.default.md#startwormholefrom)
- [stepConversation](Backend_GameLogic_GameUIManager.default.md#stepconversation)
- [stopExplore](Backend_GameLogic_GameUIManager.default.md#stopexplore)
- [toggleExplore](Backend_GameLogic_GameUIManager.default.md#toggleexplore)
- [toggleTargettingExplorer](Backend_GameLogic_GameUIManager.default.md#toggletargettingexplorer)
- [updateDiagnostics](Backend_GameLogic_GameUIManager.default.md#updatediagnostics)
- [updateMouseHoveringOverCoords](Backend_GameLogic_GameUIManager.default.md#updatemousehoveringovercoords)
- [updatePlanets](Backend_GameLogic_GameUIManager.default.md#updateplanets)
- [upgrade](Backend_GameLogic_GameUIManager.default.md#upgrade)
- [verifyTwitter](Backend_GameLogic_GameUIManager.default.md#verifytwitter)
- [withdrawArtifact](Backend_GameLogic_GameUIManager.default.md#withdrawartifact)
- [withdrawSilver](Backend_GameLogic_GameUIManager.default.md#withdrawsilver)
- [create](Backend_GameLogic_GameUIManager.default.md#create)

## Constructors

### constructor

• `Private` **new default**(`gameManager`, `terminalHandle`)

#### Parameters

| Name             | Type                                                                                                            |
| :--------------- | :-------------------------------------------------------------------------------------------------------------- |
| `gameManager`    | [`default`](Backend_GameLogic_GameManager.default.md)                                                           |
| `terminalHandle` | `MutableRefObject`<`undefined` \| [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md)\> |

#### Overrides

EventEmitter.constructor

## Properties

### artifactSending

• `Private` **artifactSending**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: `Artifact` \| `undefined`

---

### extraMinerLocations

• `Private` **extraMinerLocations**: `WorldCoords`[] = `[]`

---

### forcesSending

• `Private` **forcesSending**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: `number`

---

### gameManager

• `Private` `Readonly` **gameManager**: [`default`](Backend_GameLogic_GameManager.default.md)

---

### hoverPlanet$

• `Readonly` **hoverPlanet$**: `Monomitter`<`undefined` \| `Planet`\>

---

### hoverPlanetId$

• `Readonly` **hoverPlanetId$**: `Monomitter`<`undefined` \| `LocationId`\>

---

### isChoosingTargetPlanet

• `Private` **isChoosingTargetPlanet**: `boolean` = `false`

The Wormhole artifact requires you to choose a target planet. This value
indicates whether or not the player is currently selecting a target planet.

---

### isSending

• `Private` **isSending**: `boolean` = `false`

---

### minerLocation

• `Private` **minerLocation**: `undefined` \| `WorldCoords`

---

### mouseDownOverCoords

• `Private` **mouseDownOverCoords**: `undefined` \| `WorldCoords`

---

### mouseDownOverPlanet

• `Private` **mouseDownOverPlanet**: `undefined` \| `LocatablePlanet`

---

### mouseHoveringOverCoords

• `Private` **mouseHoveringOverCoords**: `undefined` \| `WorldCoords`

---

### mouseHoveringOverPlanet

• `Private` **mouseHoveringOverPlanet**: `undefined` \| `LocatablePlanet`

---

### myArtifacts$

• `Readonly` **myArtifacts$**: `Monomitter`<`Map`<`ArtifactId`, `Artifact`\>\>

---

### onChooseTargetPlanet

• `Private` `Optional` **onChooseTargetPlanet**: (`planet`: `undefined` \| `LocatablePlanet`) => `void`

#### Type declaration

▸ (`planet`): `void`

##### Parameters

| Name     | Type                             |
| :------- | :------------------------------- |
| `planet` | `undefined` \| `LocatablePlanet` |

##### Returns

`void`

---

### plugins

• `Private` **plugins**: [`PluginManager`](Backend_GameLogic_PluginManager.PluginManager.md)

---

### previousSelectedPlanet

• `Private` **previousSelectedPlanet**: `undefined` \| `Planet`

---

### radiusMap

• `Private` `Readonly` **radiusMap**: `Object`

#### Index signature

▪ [PlanetLevel: `number`]: `number`

---

### selectedArtifact$

• `Readonly` **selectedArtifact$**: `Monomitter`<`undefined` \| `Artifact`\>

---

### selectedArtifactId$

• `Readonly` **selectedArtifactId$**: `Monomitter`<`undefined` \| `ArtifactId`\>

---

### selectedCoords

• `Private` **selectedCoords**: `undefined` \| `WorldCoords`

---

### selectedPlanet

• `Private` **selectedPlanet**: `undefined` \| `LocatablePlanet`

---

### selectedPlanet$

• `Readonly` **selectedPlanet$**: `Monomitter`<`undefined` \| `Planet`\>

---

### selectedPlanetId$

• `Readonly` **selectedPlanetId$**: `Monomitter`<`undefined` \| `LocationId`\>

---

### sendingCoords

• `Private` **sendingCoords**: `undefined` \| `WorldCoords`

---

### sendingPlanet

• `Private` **sendingPlanet**: `undefined` \| `LocatablePlanet`

---

### silverSending

• `Private` **silverSending**: `Object` = `{}`

#### Index signature

▪ [key: `string`]: `number`

---

### terminal

• `Private` **terminal**: `MutableRefObject`<`undefined` \| [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md)\>

---

### viewportEntities

• `Private` **viewportEntities**: [`ViewportEntities`](Backend_GameLogic_ViewportEntities.ViewportEntities.md)

## Methods

### activateArtifact

▸ **activateArtifact**(`locationId`, `id`, `wormholeTo?`): `void`

#### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `locationId`  | `LocationId` |
| `id`          | `ArtifactId` |
| `wormholeTo?` | `LocationId` |

#### Returns

`void`

---

### addAccount

▸ **addAccount**(`coords`): `Promise`<`boolean`\>

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |

#### Returns

`Promise`<`boolean`\>

---

### addNewChunk

▸ **addNewChunk**(`chunk`): `void`

#### Parameters

| Name    | Type                                          |
| :------ | :-------------------------------------------- |
| `chunk` | [`Chunk`](_types_global_GlobalTypes.Chunk.md) |

#### Returns

`void`

---

### bulkAddNewChunks

▸ **bulkAddNewChunks**(`chunks`): `Promise`<`void`\>

#### Parameters

| Name     | Type                                            |
| :------- | :---------------------------------------------- |
| `chunks` | [`Chunk`](_types_global_GlobalTypes.Chunk.md)[] |

#### Returns

`Promise`<`void`\>

---

### buyGPTCredits

▸ **buyGPTCredits**(`amount`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `amount` | `number` |

#### Returns

`void`

---

### buyHat

▸ **buyHat**(`planet`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`void`

---

### centerCoords

▸ **centerCoords**(`coords`): `void`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |

#### Returns

`void`

---

### centerLocationId

▸ **centerLocationId**(`planetId`): `void`

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`void`

---

### centerPlanet

▸ **centerPlanet**(`planet`): `void`

#### Parameters

| Name     | Type                             |
| :------- | :------------------------------- |
| `planet` | `undefined` \| `LocatablePlanet` |

#### Returns

`void`

---

### claimLocation

▸ **claimLocation**(`locationId`): `void`

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `locationId` | `LocationId` |

#### Returns

`void`

---

### deactivateArtifact

▸ **deactivateArtifact**(`locationId`, `artifactId`): `void`

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `locationId` | `LocationId` |
| `artifactId` | `ArtifactId` |

#### Returns

`void`

---

### depositArtifact

▸ **depositArtifact**(`locationId`, `artifactId`): `void`

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `locationId` | `LocationId` |
| `artifactId` | `ArtifactId` |

#### Returns

`void`

---

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

---

### disconnectTwitter

▸ **disconnectTwitter**(`twitter`): `Promise`<`void`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `twitter` | `string` |

#### Returns

`Promise`<`void`\>

---

### discoverBiome

▸ **discoverBiome**(`planet`): `void`

#### Parameters

| Name     | Type              |
| :------- | :---------------- |
| `planet` | `LocatablePlanet` |

#### Returns

`void`

---

### findArtifact

▸ **findArtifact**(`planetId`): `void`

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`void`

---

### generateVerificationTweet

▸ **generateVerificationTweet**(`twitter`): `Promise`<`string`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `twitter` | `string` |

#### Returns

`Promise`<`string`\>

---

### getAccount

▸ **getAccount**(): `undefined` \| `EthAddress`

#### Returns

`undefined` \| `EthAddress`

---

### getAllMinerLocations

▸ **getAllMinerLocations**(): `WorldCoords`[]

#### Returns

`WorldCoords`[]

---

### getAllOwnedPlanets

▸ **getAllOwnedPlanets**(): `Planet`[]

#### Returns

`Planet`[]

---

### getAllPlayers

▸ **getAllPlayers**(): `Player`[]

#### Returns

`Player`[]

---

### getAllVoyages

▸ **getAllVoyages**(): `QueuedArrival`[]

#### Returns

`QueuedArrival`[]

---

### getArtifactMap

▸ **getArtifactMap**(): `Map`<`ArtifactId`, `Artifact`\>

#### Returns

`Map`<`ArtifactId`, `Artifact`\>

---

### getArtifactPlanet

▸ **getArtifactPlanet**(`artifact`): `undefined` \| `Planet`

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `artifact` | `Artifact` |

#### Returns

`undefined` \| `Planet`

---

### getArtifactSending

▸ **getArtifactSending**(`planetId`): `undefined` \| `Artifact`

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`undefined` \| `Artifact`

---

### getArtifactWithId

▸ **getArtifactWithId**(`artifactId`): `undefined` \| `Artifact`

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `artifactId` | `ArtifactId` |

#### Returns

`undefined` \| `Artifact`

---

### getArtifactsWithIds

▸ **getArtifactsWithIds**(`artifactIds`): (`undefined` \| `Artifact`)[]

#### Parameters

| Name          | Type           |
| :------------ | :------------- |
| `artifactIds` | `ArtifactId`[] |

#### Returns

(`undefined` \| `Artifact`)[]

---

### getBiomeKey

▸ `Private` **getBiomeKey**(`biome`): `string`

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `biome` | `Biome` |

#### Returns

`string`

---

### getBiomePerlin

▸ **getBiomePerlin**(`coords`, `floor`): `number`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |
| `floor`  | `boolean`     |

#### Returns

`number`

---

### getBooleanSetting

▸ **getBooleanSetting**(`setting`): `boolean`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `setting` | [`Setting`](../enums/Frontend_Utils_SettingsHooks.Setting.md) |

#### Returns

`boolean`

---

### getChunk

▸ **getChunk**(`chunkFootprint`): `undefined` \| [`Chunk`](_types_global_GlobalTypes.Chunk.md)

#### Parameters

| Name             | Type                                                                |
| :--------------- | :------------------------------------------------------------------ |
| `chunkFootprint` | [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md) |

#### Returns

`undefined` \| [`Chunk`](_types_global_GlobalTypes.Chunk.md)

---

### getContractAddress

▸ **getContractAddress**(): `EthAddress`

#### Returns

`EthAddress`

---

### getContractConstants

▸ **getContractConstants**(): [`ContractConstants`](../interfaces/_types_darkforest_api_ContractsAPITypes.ContractConstants.md)

#### Returns

[`ContractConstants`](../interfaces/_types_darkforest_api_ContractsAPITypes.ContractConstants.md)

---

### getConversation

▸ **getConversation**(`artifactId`): `Promise`<`undefined` \| `Conversation`\>

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `artifactId` | `ArtifactId` |

#### Returns

`Promise`<`undefined` \| `Conversation`\>

---

### getDiagnostics

▸ **getDiagnostics**(): `Diagnostics`

#### Returns

`Diagnostics`

---

### getDiscoverBiomeName

▸ **getDiscoverBiomeName**(`biome`): `string`

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `biome` | `Biome` |

#### Returns

`string`

---

### getDistCoords

▸ **getDistCoords**(`from`, `to`): `number`

#### Parameters

| Name   | Type          |
| :----- | :------------ |
| `from` | `WorldCoords` |
| `to`   | `WorldCoords` |

#### Returns

`number`

---

### getEndTimeSeconds

▸ **getEndTimeSeconds**(): `number`

#### Returns

`number`

---

### getEnergyArrivingForMove

▸ **getEnergyArrivingForMove**(`from`, `to`, `dist`, `energy`): `number`

#### Parameters

| Name     | Type                        |
| :------- | :-------------------------- |
| `from`   | `LocationId`                |
| `to`     | `undefined` \| `LocationId` |
| `dist`   | `undefined` \| `number`     |
| `energy` | `number`                    |

#### Returns

`number`

---

### getEnergyCurveAtPercent

▸ **getEnergyCurveAtPercent**(`planet`, `percent`): `number`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `planet`  | `Planet` |
| `percent` | `number` |

#### Returns

`number`

---

### getEnergyOfPlayer

▸ **getEnergyOfPlayer**(`player`): `number`

#### Parameters

| Name     | Type         |
| :------- | :----------- |
| `player` | `EthAddress` |

#### Returns

`number`

---

### getEthConnection

▸ **getEthConnection**(): `EthConnection`

#### Returns

`EthConnection`

---

### getExploredChunks

▸ **getExploredChunks**(): `Iterable`<[`Chunk`](_types_global_GlobalTypes.Chunk.md)\>

#### Returns

`Iterable`<[`Chunk`](_types_global_GlobalTypes.Chunk.md)\>

---

### getForcesSending

▸ **getForcesSending**(`planetId`): `number`

Percent from 0 to 100.

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`number`

---

### getGameManager

▸ **getGameManager**(): [`default`](Backend_GameLogic_GameManager.default.md)

#### Returns

[`default`](Backend_GameLogic_GameManager.default.md)

---

### getGameObjects

▸ **getGameObjects**(): [`GameObjects`](Backend_GameLogic_GameObjects.GameObjects.md)

Gets a reference to the game's internal representation of the world state. Beware! Use this for
reading only, otherwise you might mess up the state of the game. You can try modifying the game
state in some way

#### Returns

[`GameObjects`](Backend_GameLogic_GameObjects.GameObjects.md)

---

### getGptCreditBalanceEmitter

▸ **getGptCreditBalanceEmitter**(): `Monomitter`<`number`\>

#### Returns

`Monomitter`<`number`\>

---

### getGptCreditPriceEmitter

▸ **getGptCreditPriceEmitter**(): `Monomitter`<`number`\>

#### Returns

`Monomitter`<`number`\>

---

### getHashConfig

▸ **getHashConfig**(): [`HashConfig`](../modules/_types_global_GlobalTypes.md#hashconfig)

#### Returns

[`HashConfig`](../modules/_types_global_GlobalTypes.md#hashconfig)

---

### getHashesPerSec

▸ **getHashesPerSec**(): `number`

#### Returns

`number`

---

### getHomeCoords

▸ **getHomeCoords**(): `WorldCoords`

#### Returns

`WorldCoords`

---

### getHomeHash

▸ **getHomeHash**(): `undefined` \| `LocationId`

#### Returns

`undefined` \| `LocationId`

---

### getHomePlanet

▸ **getHomePlanet**(): `undefined` \| `Planet`

#### Returns

`undefined` \| `Planet`

---

### getHoveringOverCoords

▸ **getHoveringOverCoords**(): `undefined` \| `WorldCoords`

#### Returns

`undefined` \| `WorldCoords`

---

### getHoveringOverPlanet

▸ **getHoveringOverPlanet**(): `undefined` \| `Planet`

#### Returns

`undefined` \| `Planet`

---

### getIsBuyingCreditsEmitter

▸ **getIsBuyingCreditsEmitter**(): `Monomitter`<`boolean`\>

#### Returns

`Monomitter`<`boolean`\>

---

### getIsChoosingTargetPlanet

▸ **getIsChoosingTargetPlanet**(): `boolean`

#### Returns

`boolean`

---

### getIsHighPerfMode

▸ **getIsHighPerfMode**(): `boolean`

#### Returns

`boolean`

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

### getLocationsAndChunks

▸ **getLocationsAndChunks**(): `Object`

#### Returns

`Object`

| Name            | Type                                                                                                             |
| :-------------- | :--------------------------------------------------------------------------------------------------------------- |
| `cachedPlanets` | `Map`<`LocationId`, [`PlanetRenderInfo`](../interfaces/Backend_GameLogic_ViewportEntities.PlanetRenderInfo.md)\> |
| `chunks`        | `Set`<[`Chunk`](_types_global_GlobalTypes.Chunk.md)\>                                                            |

---

### getMinerLocation

▸ **getMinerLocation**(): `undefined` \| `WorldCoords`

#### Returns

`undefined` \| `WorldCoords`

---

### getMiningPattern

▸ **getMiningPattern**(): `undefined` \| [`MiningPattern`](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md)

#### Returns

`undefined` \| [`MiningPattern`](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md)

---

### getMouseDownCoords

▸ **getMouseDownCoords**(): `undefined` \| `WorldCoords`

#### Returns

`undefined` \| `WorldCoords`

---

### getMouseDownPlanet

▸ **getMouseDownPlanet**(): `undefined` \| `LocatablePlanet`

#### Returns

`undefined` \| `LocatablePlanet`

---

### getMyArtifactMap

▸ **getMyArtifactMap**(): `Map`<`ArtifactId`, `Artifact`\>

#### Returns

`Map`<`ArtifactId`, `Artifact`\>

---

### getMyArtifacts

▸ **getMyArtifacts**(): `Artifact`[]

#### Returns

`Artifact`[]

---

### getMyArtifactsNotOnPlanet

▸ **getMyArtifactsNotOnPlanet**(): `Artifact`[]

#### Returns

`Artifact`[]

---

### getMyBalance

▸ **getMyBalance**(): `number`

#### Returns

`number`

---

### getMyBalance$

▸ **getMyBalance$**(): `Monomitter`<`BigNumber`\>

#### Returns

`Monomitter`<`BigNumber`\>

---

### getMyPlanetMap

▸ **getMyPlanetMap**(): `Map`<`LocationId`, `Planet`\>

#### Returns

`Map`<`LocationId`, `Planet`\>

---

### getMyScore

▸ **getMyScore**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

---

### getNextBroadcastAvailableTimestamp

▸ **getNextBroadcastAvailableTimestamp**(): `number`

#### Returns

`number`

---

### getPerlinConfig

▸ **getPerlinConfig**(`isBiome?`): `PerlinConfig`

#### Parameters

| Name      | Type      | Default value |
| :-------- | :-------- | :------------ |
| `isBiome` | `boolean` | `false`       |

#### Returns

`PerlinConfig`

---

### getPerlinThresholds

▸ **getPerlinThresholds**(): [`number`, `number`, `number`]

#### Returns

[`number`, `number`, `number`]

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

▸ **getPlanetWithCoords**(`coords`): `undefined` \| `Planet`

#### Parameters

| Name     | Type                         |
| :------- | :--------------------------- |
| `coords` | `undefined` \| `WorldCoords` |

#### Returns

`undefined` \| `Planet`

---

### getPlanetWithId

▸ **getPlanetWithId**(`planetId`): `undefined` \| `Planet`

#### Parameters

| Name       | Type                        |
| :--------- | :-------------------------- |
| `planetId` | `undefined` \| `LocationId` |

#### Returns

`undefined` \| `Planet`

---

### getPlanetsInViewport

▸ **getPlanetsInViewport**(): `Planet`[]

#### Returns

`Planet`[]

---

### getPlayer

▸ **getPlayer**(`address?`): `undefined` \| `Player`

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `address?` | `EthAddress` |

#### Returns

`undefined` \| `Player`

---

### getPlayerScore

▸ **getPlayerScore**(`player`): `undefined` \| `number`

#### Parameters

| Name     | Type         |
| :------- | :----------- |
| `player` | `EthAddress` |

#### Returns

`undefined` \| `number`

---

### getPluginManager

▸ **getPluginManager**(): [`PluginManager`](Backend_GameLogic_PluginManager.PluginManager.md)

#### Returns

[`PluginManager`](Backend_GameLogic_PluginManager.PluginManager.md)

---

### getPreviousSelectedPlanet

▸ **getPreviousSelectedPlanet**(): `undefined` \| `Planet`

#### Returns

`undefined` \| `Planet`

---

### getPrivateKey

▸ **getPrivateKey**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

---

### getRadiusOfPlanetLevel

▸ **getRadiusOfPlanetLevel**(`planetRarity`): `number`

#### Parameters

| Name           | Type          |
| :------------- | :------------ |
| `planetRarity` | `PlanetLevel` |

#### Returns

`number`

---

### getSelectedCoords

▸ **getSelectedCoords**(): `undefined` \| `WorldCoords`

#### Returns

`undefined` \| `WorldCoords`

---

### getSelectedPlanet

▸ **getSelectedPlanet**(): `undefined` \| `LocatablePlanet`

#### Returns

`undefined` \| `LocatablePlanet`

---

### getSilverCurveAtPercent

▸ **getSilverCurveAtPercent**(`planet`, `percent`): `undefined` \| `number`

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `planet`  | `Planet` |
| `percent` | `number` |

#### Returns

`undefined` \| `number`

---

### getSilverOfPlayer

▸ **getSilverOfPlayer**(`player`): `number`

#### Parameters

| Name     | Type         |
| :------- | :----------- |
| `player` | `EthAddress` |

#### Returns

`number`

---

### getSilverSending

▸ **getSilverSending**(`planetId`): `number`

Percent from 0 to 100.

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`number`

---

### getSpaceTypePerlin

▸ **getSpaceTypePerlin**(`coords`, `floor`): `number`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |
| `floor`  | `boolean`     |

#### Returns

`number`

---

### getStringSetting

▸ **getStringSetting**(`setting`): `undefined` \| `string`

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `setting` | [`Setting`](../enums/Frontend_Utils_SettingsHooks.Setting.md) |

#### Returns

`undefined` \| `string`

---

### getTerminal

▸ **getTerminal**(): `undefined` \| [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md)

#### Returns

`undefined` \| [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md)

---

### getTwitter

▸ **getTwitter**(`address`): `undefined` \| `string`

#### Parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `address` | `undefined` \| `EthAddress` |

#### Returns

`undefined` \| `string`

---

### getUnconfirmedMoves

▸ **getUnconfirmedMoves**(): `UnconfirmedMove`[]

**`todo`** delete this. now that [GameObjects](Backend_GameLogic_GameObjects.GameObjects.md) is publically accessible, we shouldn't need to
drill fields like this anymore.

**`tutorial`** Plugin developers, please access fields like this with something like {@code df.getGameObjects().}

**`deprecated`**

#### Returns

`UnconfirmedMove`[]

---

### getUnconfirmedUpgrades

▸ **getUnconfirmedUpgrades**(): `UnconfirmedUpgrade`[]

#### Returns

`UnconfirmedUpgrade`[]

---

### getUnconfirmedWormholeActivations

▸ **getUnconfirmedWormholeActivations**(): `UnconfirmedActivateArtifact`[]

#### Returns

`UnconfirmedActivateArtifact`[]

---

### getUniverseTotalEnergy

▸ **getUniverseTotalEnergy**(): `number`

#### Returns

`number`

---

### getUpgrade

▸ **getUpgrade**(`branch`, `level`): `Upgrade`

#### Parameters

| Name     | Type                |
| :------- | :------------------ |
| `branch` | `UpgradeBranchName` |
| `level`  | `number`            |

#### Returns

`Upgrade`

---

### getViewport

▸ **getViewport**(): [`default`](Frontend_Game_Viewport.default.md)

#### Returns

[`default`](Frontend_Game_Viewport.default.md)

---

### getWorldRadius

▸ **getWorldRadius**(): `number`

#### Returns

`number`

---

### getWorldSilver

▸ **getWorldSilver**(): `number`

#### Returns

`number`

---

### getWormholes

▸ **getWormholes**(): `Iterable`<[`Wormhole`](../modules/_types_global_GlobalTypes.md#wormhole)\>

#### Returns

`Iterable`<[`Wormhole`](../modules/_types_global_GlobalTypes.md#wormhole)\>

---

### hasMinedChunk

▸ **hasMinedChunk**(`chunkLocation`): `boolean`

#### Parameters

| Name            | Type                                                                |
| :-------------- | :------------------------------------------------------------------ |
| `chunkLocation` | [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md) |

#### Returns

`boolean`

---

### isCurrentlyClaiming

▸ **isCurrentlyClaiming**(): `boolean`

#### Returns

`boolean`

---

### isCurrentlyRevealing

▸ **isCurrentlyRevealing**(): `boolean`

#### Returns

`boolean`

---

### isMining

▸ **isMining**(): `boolean`

#### Returns

`boolean`

---

### isOverOwnPlanet

▸ **isOverOwnPlanet**(`coords`): `undefined` \| `Planet`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |

#### Returns

`undefined` \| `Planet`

---

### isOwnedByMe

▸ **isOwnedByMe**(`planet`): `boolean`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`boolean`

---

### isRoundOver

▸ **isRoundOver**(): `boolean`

#### Returns

`boolean`

---

### joinGame

▸ **joinGame**(`beforeRetry`): [`default`](Backend_GameLogic_GameUIManager.default.md)

#### Parameters

| Name          | Type                                    |
| :------------ | :-------------------------------------- |
| `beforeRetry` | (`e`: `Error`) => `Promise`<`boolean`\> |

#### Returns

[`default`](Backend_GameLogic_GameUIManager.default.md)

---

### onDiscoveredChunk

▸ **onDiscoveredChunk**(`chunk`): `void`

#### Parameters

| Name    | Type                                          |
| :------ | :-------------------------------------------- |
| `chunk` | [`Chunk`](_types_global_GlobalTypes.Chunk.md) |

#### Returns

`void`

---

### onEmitInitializedPlayer

▸ `Private` **onEmitInitializedPlayer**(): `void`

#### Returns

`void`

---

### onEmitInitializedPlayerError

▸ `Private` **onEmitInitializedPlayerError**(`err`): `void`

#### Parameters

| Name  | Type        |
| :---- | :---------- |
| `err` | `ReactNode` |

#### Returns

`void`

---

### onMouseClick

▸ **onMouseClick**(`_coords`): `void`

#### Parameters

| Name      | Type          |
| :-------- | :------------ |
| `_coords` | `WorldCoords` |

#### Returns

`void`

---

### onMouseDown

▸ **onMouseDown**(`coords`): `void`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |

#### Returns

`void`

---

### onMouseMove

▸ **onMouseMove**(`coords`): `void`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |

#### Returns

`void`

---

### onMouseOut

▸ **onMouseOut**(): `void`

#### Returns

`void`

---

### onMouseUp

▸ **onMouseUp**(`coords`): `void`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |

#### Returns

`void`

---

### onSendCancel

▸ **onSendCancel**(): `void`

#### Returns

`void`

---

### onSendInit

▸ **onSendInit**(`planet`): `void`

#### Parameters

| Name     | Type                             |
| :------- | :------------------------------- |
| `planet` | `undefined` \| `LocatablePlanet` |

#### Returns

`void`

---

### prospectPlanet

▸ **prospectPlanet**(`planetId`): `void`

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`void`

---

### removeExtraMinerLocation

▸ **removeExtraMinerLocation**(`idx`): `void`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `idx` | `number` |

#### Returns

`void`

---

### revealLocation

▸ **revealLocation**(`locationId`): `void`

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `locationId` | `LocationId` |

#### Returns

`void`

---

### setArtifactSending

▸ **setArtifactSending**(`planetId`, `artifact?`): `void`

#### Parameters

| Name        | Type         |
| :---------- | :----------- |
| `planetId`  | `LocationId` |
| `artifact?` | `Artifact`   |

#### Returns

`void`

---

### setExtraMinerLocation

▸ **setExtraMinerLocation**(`idx`, `coords`): `void`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `idx`    | `number`      |
| `coords` | `WorldCoords` |

#### Returns

`void`

---

### setForcesSending

▸ **setForcesSending**(`planetId`, `percentage`): `void`

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `planetId`   | `LocationId` |
| `percentage` | `number`     |

#### Returns

`void`

---

### setHoveringOverPlanet

▸ `Private` **setHoveringOverPlanet**(`planet`): `void`

#### Parameters

| Name     | Type                             |
| :------- | :------------------------------- |
| `planet` | `undefined` \| `LocatablePlanet` |

#### Returns

`void`

---

### setMiningPattern

▸ **setMiningPattern**(`pattern`): `void`

#### Parameters

| Name      | Type                                                                           |
| :-------- | :----------------------------------------------------------------------------- |
| `pattern` | [`MiningPattern`](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md) |

#### Returns

`void`

---

### setSelectedId

▸ **setSelectedId**(`id`): `void`

#### Parameters

| Name | Type         |
| :--- | :----------- |
| `id` | `LocationId` |

#### Returns

`void`

---

### setSelectedPlanet

▸ **setSelectedPlanet**(`planet`): `void`

#### Parameters

| Name     | Type                             |
| :------- | :------------------------------- |
| `planet` | `undefined` \| `LocatablePlanet` |

#### Returns

`void`

---

### setSilverSending

▸ **setSilverSending**(`planetId`, `percentage`): `void`

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `planetId`   | `LocationId` |
| `percentage` | `number`     |

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

### startConversation

▸ **startConversation**(`artifactId`): `Promise`<`Conversation`\>

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `artifactId` | `ArtifactId` |

#### Returns

`Promise`<`Conversation`\>

---

### startExplore

▸ **startExplore**(): `void`

#### Returns

`void`

---

### startWormholeFrom

▸ **startWormholeFrom**(`planet`): `Promise`<`undefined` \| `LocatablePlanet`\>

#### Parameters

| Name     | Type              |
| :------- | :---------------- |
| `planet` | `LocatablePlanet` |

#### Returns

`Promise`<`undefined` \| `LocatablePlanet`\>

---

### stepConversation

▸ **stepConversation**(`artifactId`, `message`): `Promise`<`Conversation`\>

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `artifactId` | `ArtifactId` |
| `message`    | `string`     |

#### Returns

`Promise`<`Conversation`\>

---

### stopExplore

▸ **stopExplore**(): `void`

#### Returns

`void`

---

### toggleExplore

▸ **toggleExplore**(): `void`

#### Returns

`void`

---

### toggleTargettingExplorer

▸ **toggleTargettingExplorer**(): `void`

#### Returns

`void`

---

### updateDiagnostics

▸ **updateDiagnostics**(`updateFn`): `void`

#### Parameters

| Name       | Type                           |
| :--------- | :----------------------------- |
| `updateFn` | (`d`: `Diagnostics`) => `void` |

#### Returns

`void`

---

### updateMouseHoveringOverCoords

▸ `Private` **updateMouseHoveringOverCoords**(`coords`): `WorldCoords`

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |

#### Returns

`WorldCoords`

---

### updatePlanets

▸ `Private` **updatePlanets**(): `void`

#### Returns

`void`

---

### upgrade

▸ **upgrade**(`planet`, `branch`): `void`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |
| `branch` | `number` |

#### Returns

`void`

---

### verifyTwitter

▸ **verifyTwitter**(`twitter`): `Promise`<`boolean`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `twitter` | `string` |

#### Returns

`Promise`<`boolean`\>

---

### withdrawArtifact

▸ **withdrawArtifact**(`locationId`, `artifactId`): `void`

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `locationId` | `LocationId` |
| `artifactId` | `ArtifactId` |

#### Returns

`void`

---

### withdrawSilver

▸ **withdrawSilver**(`locationId`, `amount`): `void`

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `locationId` | `LocationId` |
| `amount`     | `number`     |

#### Returns

`void`

---

### create

▸ `Static` **create**(`gameManager`, `terminalHandle`): `Promise`<[`default`](Backend_GameLogic_GameUIManager.default.md)\>

#### Parameters

| Name             | Type                                                                                                            |
| :--------------- | :-------------------------------------------------------------------------------------------------------------- |
| `gameManager`    | [`default`](Backend_GameLogic_GameManager.default.md)                                                           |
| `terminalHandle` | `MutableRefObject`<`undefined` \| [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md)\> |

#### Returns

`Promise`<[`default`](Backend_GameLogic_GameUIManager.default.md)\>
