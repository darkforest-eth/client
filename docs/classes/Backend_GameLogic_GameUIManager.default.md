# Class: default

[Backend/GameLogic/GameUIManager](../modules/Backend_GameLogic_GameUIManager.md).default

## Hierarchy

- `EventEmitter`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](Backend_GameLogic_GameUIManager.default.md#constructor)

### Properties

- [abandoning](Backend_GameLogic_GameUIManager.default.md#abandoning)
- [artifactSending](Backend_GameLogic_GameUIManager.default.md#artifactsending)
- [extraMinerLocations](Backend_GameLogic_GameUIManager.default.md#extraminerlocations)
- [forcesSending](Backend_GameLogic_GameUIManager.default.md#forcessending)
- [gameManager](Backend_GameLogic_GameUIManager.default.md#gamemanager)
- [hoverArtifact$](Backend_GameLogic_GameUIManager.default.md#hoverartifact$)
- [hoverArtifactId$](Backend_GameLogic_GameUIManager.default.md#hoverartifactid$)
- [hoverPlanet$](Backend_GameLogic_GameUIManager.default.md#hoverplanet$)
- [hoverPlanetId$](Backend_GameLogic_GameUIManager.default.md#hoverplanetid$)
- [isAbandoning$](Backend_GameLogic_GameUIManager.default.md#isabandoning$)
- [isChoosingTargetPlanet](Backend_GameLogic_GameUIManager.default.md#ischoosingtargetplanet)
- [isSending](Backend_GameLogic_GameUIManager.default.md#issending)
- [isSending$](Backend_GameLogic_GameUIManager.default.md#issending$)
- [minerLocation](Backend_GameLogic_GameUIManager.default.md#minerlocation)
- [modalManager](Backend_GameLogic_GameUIManager.default.md#modalmanager)
- [mouseDownOverCoords](Backend_GameLogic_GameUIManager.default.md#mousedownovercoords)
- [mouseDownOverPlanet](Backend_GameLogic_GameUIManager.default.md#mousedownoverplanet)
- [mouseHoveringOverCoords](Backend_GameLogic_GameUIManager.default.md#mousehoveringovercoords)
- [mouseHoveringOverPlanet](Backend_GameLogic_GameUIManager.default.md#mousehoveringoverplanet)
- [myArtifacts$](Backend_GameLogic_GameUIManager.default.md#myartifacts$)
- [onChooseTargetPlanet](Backend_GameLogic_GameUIManager.default.md#onchoosetargetplanet)
- [overlayContainer](Backend_GameLogic_GameUIManager.default.md#overlaycontainer)
- [planetHoveringInRenderer](Backend_GameLogic_GameUIManager.default.md#planethoveringinrenderer)
- [plugins](Backend_GameLogic_GameUIManager.default.md#plugins)
- [previousSelectedPlanetId](Backend_GameLogic_GameUIManager.default.md#previousselectedplanetid)
- [radiusMap](Backend_GameLogic_GameUIManager.default.md#radiusmap)
- [selectedCoords](Backend_GameLogic_GameUIManager.default.md#selectedcoords)
- [selectedPlanetId](Backend_GameLogic_GameUIManager.default.md#selectedplanetid)
- [selectedPlanetId$](Backend_GameLogic_GameUIManager.default.md#selectedplanetid$)
- [sendingCoords](Backend_GameLogic_GameUIManager.default.md#sendingcoords)
- [sendingPlanet](Backend_GameLogic_GameUIManager.default.md#sendingplanet)
- [silverSending](Backend_GameLogic_GameUIManager.default.md#silversending)
- [terminal](Backend_GameLogic_GameUIManager.default.md#terminal)
- [viewportEntities](Backend_GameLogic_GameUIManager.default.md#viewportentities)

### Accessors

- [captureZonesEnabled](Backend_GameLogic_GameUIManager.default.md#capturezonesenabled)
- [contractConstants](Backend_GameLogic_GameUIManager.default.md#contractconstants)

### Methods

- [activateArtifact](Backend_GameLogic_GameUIManager.default.md#activateartifact)
- [addAccount](Backend_GameLogic_GameUIManager.default.md#addaccount)
- [addNewChunk](Backend_GameLogic_GameUIManager.default.md#addnewchunk)
- [bulkAddNewChunks](Backend_GameLogic_GameUIManager.default.md#bulkaddnewchunks)
- [buyHat](Backend_GameLogic_GameUIManager.default.md#buyhat)
- [centerCoords](Backend_GameLogic_GameUIManager.default.md#centercoords)
- [centerLocationId](Backend_GameLogic_GameUIManager.default.md#centerlocationid)
- [centerPlanet](Backend_GameLogic_GameUIManager.default.md#centerplanet)
- [deactivateArtifact](Backend_GameLogic_GameUIManager.default.md#deactivateartifact)
- [depositArtifact](Backend_GameLogic_GameUIManager.default.md#depositartifact)
- [destroy](Backend_GameLogic_GameUIManager.default.md#destroy)
- [disableCustomRenderer](Backend_GameLogic_GameUIManager.default.md#disablecustomrenderer)
- [disconnectTwitter](Backend_GameLogic_GameUIManager.default.md#disconnecttwitter)
- [discoverBiome](Backend_GameLogic_GameUIManager.default.md#discoverbiome)
- [drawAllRunningPlugins](Backend_GameLogic_GameUIManager.default.md#drawallrunningplugins)
- [findArtifact](Backend_GameLogic_GameUIManager.default.md#findartifact)
- [generateVerificationTweet](Backend_GameLogic_GameUIManager.default.md#generateverificationtweet)
- [get2dRenderer](Backend_GameLogic_GameUIManager.default.md#get2drenderer)
- [getAbandonRangeChangePercent](Backend_GameLogic_GameUIManager.default.md#getabandonrangechangepercent)
- [getAbandonSpeedChangePercent](Backend_GameLogic_GameUIManager.default.md#getabandonspeedchangepercent)
- [getAccount](Backend_GameLogic_GameUIManager.default.md#getaccount)
- [getAllMinerLocations](Backend_GameLogic_GameUIManager.default.md#getallminerlocations)
- [getAllOwnedPlanets](Backend_GameLogic_GameUIManager.default.md#getallownedplanets)
- [getAllPlayers](Backend_GameLogic_GameUIManager.default.md#getallplayers)
- [getAllVoyages](Backend_GameLogic_GameUIManager.default.md#getallvoyages)
- [getArtifactMap](Backend_GameLogic_GameUIManager.default.md#getartifactmap)
- [getArtifactPlanet](Backend_GameLogic_GameUIManager.default.md#getartifactplanet)
- [getArtifactPointValues](Backend_GameLogic_GameUIManager.default.md#getartifactpointvalues)
- [getArtifactSending](Backend_GameLogic_GameUIManager.default.md#getartifactsending)
- [getArtifactUpdated$](Backend_GameLogic_GameUIManager.default.md#getartifactupdated$)
- [getArtifactWithId](Backend_GameLogic_GameUIManager.default.md#getartifactwithid)
- [getArtifactsWithIds](Backend_GameLogic_GameUIManager.default.md#getartifactswithids)
- [getBiomeKey](Backend_GameLogic_GameUIManager.default.md#getbiomekey)
- [getBiomePerlin](Backend_GameLogic_GameUIManager.default.md#getbiomeperlin)
- [getBooleanSetting](Backend_GameLogic_GameUIManager.default.md#getbooleansetting)
- [getCaptureZoneGenerator](Backend_GameLogic_GameUIManager.default.md#getcapturezonegenerator)
- [getCaptureZonePointValues](Backend_GameLogic_GameUIManager.default.md#getcapturezonepointvalues)
- [getCaptureZones](Backend_GameLogic_GameUIManager.default.md#getcapturezones)
- [getChunk](Backend_GameLogic_GameUIManager.default.md#getchunk)
- [getContractAddress](Backend_GameLogic_GameUIManager.default.md#getcontractaddress)
- [getDefaultSpaceJunkForPlanetLevel](Backend_GameLogic_GameUIManager.default.md#getdefaultspacejunkforplanetlevel)
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
- [getGlManager](Backend_GameLogic_GameUIManager.default.md#getglmanager)
- [getHashConfig](Backend_GameLogic_GameUIManager.default.md#gethashconfig)
- [getHashesPerSec](Backend_GameLogic_GameUIManager.default.md#gethashespersec)
- [getHomeCoords](Backend_GameLogic_GameUIManager.default.md#gethomecoords)
- [getHomeHash](Backend_GameLogic_GameUIManager.default.md#gethomehash)
- [getHomePlanet](Backend_GameLogic_GameUIManager.default.md#gethomeplanet)
- [getHoveringOverCoords](Backend_GameLogic_GameUIManager.default.md#gethoveringovercoords)
- [getHoveringOverPlanet](Backend_GameLogic_GameUIManager.default.md#gethoveringoverplanet)
- [getIsChoosingTargetPlanet](Backend_GameLogic_GameUIManager.default.md#getischoosingtargetplanet)
- [getIsHighPerfMode](Backend_GameLogic_GameUIManager.default.md#getishighperfmode)
- [getLocationOfPlanet](Backend_GameLogic_GameUIManager.default.md#getlocationofplanet)
- [getLocationsAndChunks](Backend_GameLogic_GameUIManager.default.md#getlocationsandchunks)
- [getMinerLocation](Backend_GameLogic_GameUIManager.default.md#getminerlocation)
- [getMiningPattern](Backend_GameLogic_GameUIManager.default.md#getminingpattern)
- [getModalManager](Backend_GameLogic_GameUIManager.default.md#getmodalmanager)
- [getMouseDownCoords](Backend_GameLogic_GameUIManager.default.md#getmousedowncoords)
- [getMouseDownPlanet](Backend_GameLogic_GameUIManager.default.md#getmousedownplanet)
- [getMyArtifactMap](Backend_GameLogic_GameUIManager.default.md#getmyartifactmap)
- [getMyArtifacts](Backend_GameLogic_GameUIManager.default.md#getmyartifacts)
- [getMyArtifactsNotOnPlanet](Backend_GameLogic_GameUIManager.default.md#getmyartifactsnotonplanet)
- [getMyBalance](Backend_GameLogic_GameUIManager.default.md#getmybalance)
- [getMyBalance$](Backend_GameLogic_GameUIManager.default.md#getmybalance$)
- [getMyBalanceBn](Backend_GameLogic_GameUIManager.default.md#getmybalancebn)
- [getMyPlanetMap](Backend_GameLogic_GameUIManager.default.md#getmyplanetmap)
- [getMyScore](Backend_GameLogic_GameUIManager.default.md#getmyscore)
- [getNextBroadcastAvailableTimestamp](Backend_GameLogic_GameUIManager.default.md#getnextbroadcastavailabletimestamp)
- [getOverlayContainer](Backend_GameLogic_GameUIManager.default.md#getoverlaycontainer)
- [getPaused](Backend_GameLogic_GameUIManager.default.md#getpaused)
- [getPaused$](Backend_GameLogic_GameUIManager.default.md#getpaused$)
- [getPerlinConfig](Backend_GameLogic_GameUIManager.default.md#getperlinconfig)
- [getPerlinThresholds](Backend_GameLogic_GameUIManager.default.md#getperlinthresholds)
- [getPlanetHoveringInRenderer](Backend_GameLogic_GameUIManager.default.md#getplanethoveringinrenderer)
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
- [getRangeBuff](Backend_GameLogic_GameUIManager.default.md#getrangebuff)
- [getRenderer](Backend_GameLogic_GameUIManager.default.md#getrenderer)
- [getSelectedCoords](Backend_GameLogic_GameUIManager.default.md#getselectedcoords)
- [getSelectedPlanet](Backend_GameLogic_GameUIManager.default.md#getselectedplanet)
- [getSilverCurveAtPercent](Backend_GameLogic_GameUIManager.default.md#getsilvercurveatpercent)
- [getSilverOfPlayer](Backend_GameLogic_GameUIManager.default.md#getsilverofplayer)
- [getSilverScoreValue](Backend_GameLogic_GameUIManager.default.md#getsilverscorevalue)
- [getSilverSending](Backend_GameLogic_GameUIManager.default.md#getsilversending)
- [getSpaceJunkEnabled](Backend_GameLogic_GameUIManager.default.md#getspacejunkenabled)
- [getSpaceTypePerlin](Backend_GameLogic_GameUIManager.default.md#getspacetypeperlin)
- [getSpeedBuff](Backend_GameLogic_GameUIManager.default.md#getspeedbuff)
- [getStringSetting](Backend_GameLogic_GameUIManager.default.md#getstringsetting)
- [getTerminal](Backend_GameLogic_GameUIManager.default.md#getterminal)
- [getTwitter](Backend_GameLogic_GameUIManager.default.md#gettwitter)
- [getUIEmitter](Backend_GameLogic_GameUIManager.default.md#getuiemitter)
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
- [isAbandoning](Backend_GameLogic_GameUIManager.default.md#isabandoning)
- [isAdmin](Backend_GameLogic_GameUIManager.default.md#isadmin)
- [isCurrentlyRevealing](Backend_GameLogic_GameUIManager.default.md#iscurrentlyrevealing)
- [isMining](Backend_GameLogic_GameUIManager.default.md#ismining)
- [isOverOwnPlanet](Backend_GameLogic_GameUIManager.default.md#isoverownplanet)
- [isOwnedByMe](Backend_GameLogic_GameUIManager.default.md#isownedbyme)
- [isRoundOver](Backend_GameLogic_GameUIManager.default.md#isroundover)
- [isSendingForces](Backend_GameLogic_GameUIManager.default.md#issendingforces)
- [isSendingShip](Backend_GameLogic_GameUIManager.default.md#issendingship)
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
- [onSendComplete](Backend_GameLogic_GameUIManager.default.md#onsendcomplete)
- [onSendInit](Backend_GameLogic_GameUIManager.default.md#onsendinit)
- [potentialCaptureScore](Backend_GameLogic_GameUIManager.default.md#potentialcapturescore)
- [prospectPlanet](Backend_GameLogic_GameUIManager.default.md#prospectplanet)
- [removeExtraMinerLocation](Backend_GameLogic_GameUIManager.default.md#removeextraminerlocation)
- [revealLocation](Backend_GameLogic_GameUIManager.default.md#reveallocation)
- [setAbandoning](Backend_GameLogic_GameUIManager.default.md#setabandoning)
- [setArtifactSending](Backend_GameLogic_GameUIManager.default.md#setartifactsending)
- [setCustomRenderer](Backend_GameLogic_GameUIManager.default.md#setcustomrenderer)
- [setExtraMinerLocation](Backend_GameLogic_GameUIManager.default.md#setextraminerlocation)
- [setForcesSending](Backend_GameLogic_GameUIManager.default.md#setforcessending)
- [setHoveringOverArtifact](Backend_GameLogic_GameUIManager.default.md#sethoveringoverartifact)
- [setHoveringOverPlanet](Backend_GameLogic_GameUIManager.default.md#sethoveringoverplanet)
- [setMiningPattern](Backend_GameLogic_GameUIManager.default.md#setminingpattern)
- [setModalManager](Backend_GameLogic_GameUIManager.default.md#setmodalmanager)
- [setOverlayContainer](Backend_GameLogic_GameUIManager.default.md#setoverlaycontainer)
- [setSelectedId](Backend_GameLogic_GameUIManager.default.md#setselectedid)
- [setSelectedPlanet](Backend_GameLogic_GameUIManager.default.md#setselectedplanet)
- [setSending](Backend_GameLogic_GameUIManager.default.md#setsending)
- [setSilverSending](Backend_GameLogic_GameUIManager.default.md#setsilversending)
- [spaceTypeFromPerlin](Backend_GameLogic_GameUIManager.default.md#spacetypefromperlin)
- [startExplore](Backend_GameLogic_GameUIManager.default.md#startexplore)
- [startWormholeFrom](Backend_GameLogic_GameUIManager.default.md#startwormholefrom)
- [stopExplore](Backend_GameLogic_GameUIManager.default.md#stopexplore)
- [timeUntilNextBroadcastAvailable](Backend_GameLogic_GameUIManager.default.md#timeuntilnextbroadcastavailable)
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

### abandoning

• `Private` **abandoning**: `boolean` = `false`

---

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

### hoverArtifact$

• `Readonly` **hoverArtifact$**: `Monomitter`<`undefined` \| `Artifact`\>

---

### hoverArtifactId$

• `Readonly` **hoverArtifactId$**: `Monomitter`<`undefined` \| `ArtifactId`\>

---

### hoverPlanet$

• `Readonly` **hoverPlanet$**: `Monomitter`<`undefined` \| `Planet`\>

---

### hoverPlanetId$

• `Readonly` **hoverPlanetId$**: `Monomitter`<`undefined` \| `LocationId`\>

---

### isAbandoning$

• `Readonly` **isAbandoning$**: `Monomitter`<`boolean`\>

---

### isChoosingTargetPlanet

• `Private` **isChoosingTargetPlanet**: `boolean` = `false`

The Wormhole artifact requires you to choose a target planet. This value
indicates whether or not the player is currently selecting a target planet.

---

### isSending

• `Private` **isSending**: `boolean` = `false`

---

### isSending$

• `Readonly` **isSending$**: `Monomitter`<`boolean`\>

---

### minerLocation

• `Private` **minerLocation**: `undefined` \| `WorldCoords`

---

### modalManager

• `Private` **modalManager**: [`default`](Frontend_Game_ModalManager.default.md)

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

### overlayContainer

• `Private` `Optional` **overlayContainer**: `HTMLDivElement`

In order to render React on top of the game, we need to insert React nodes into an overlay
container. We keep a reference to this container, so that our React components can optionally
choose to render themselves into this overlay container using React Portals.

---

### planetHoveringInRenderer

• `Private` **planetHoveringInRenderer**: `boolean` = `false`

---

### plugins

• `Private` **plugins**: [`PluginManager`](Backend_GameLogic_PluginManager.PluginManager.md)

---

### previousSelectedPlanetId

• `Private` **previousSelectedPlanetId**: `undefined` \| `LocationId`

---

### radiusMap

• `Private` `Readonly` **radiusMap**: `Object`

#### Index signature

▪ [PlanetLevel: `number`]: `number`

---

### selectedCoords

• `Private` **selectedCoords**: `undefined` \| `WorldCoords`

---

### selectedPlanetId

• `Private` **selectedPlanetId**: `undefined` \| `LocationId`

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

## Accessors

### captureZonesEnabled

• `get` **captureZonesEnabled**(): `boolean`

#### Returns

`boolean`

---

### contractConstants

• `get` **contractConstants**(): [`ContractConstants`](../interfaces/types_darkforest_api_ContractsAPITypes.ContractConstants.md)

#### Returns

[`ContractConstants`](../interfaces/types_darkforest_api_ContractsAPITypes.ContractConstants.md)

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

| Name    | Type    |
| :------ | :------ |
| `chunk` | `Chunk` |

#### Returns

`void`

---

### bulkAddNewChunks

▸ **bulkAddNewChunks**(`chunks`): `Promise`<`void`\>

#### Parameters

| Name     | Type      |
| :------- | :-------- |
| `chunks` | `Chunk`[] |

#### Returns

`Promise`<`void`\>

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

### disableCustomRenderer

▸ **disableCustomRenderer**(`customRenderer`): `void`

This function will remove the passed in renderer from the renderering stack. If the
renderer is on top of the renderering stack the next renderer will be the one bellow it.

#### Parameters

| Name             | Type           | Description                                              |
| :--------------- | :------------- | :------------------------------------------------------- |
| `customRenderer` | `BaseRenderer` | a Renderer that follows one of the 23 renderer tempaltes |

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

### drawAllRunningPlugins

▸ **drawAllRunningPlugins**(`ctx`): `void`

#### Parameters

| Name  | Type                       |
| :---- | :------------------------- |
| `ctx` | `CanvasRenderingContext2D` |

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

### get2dRenderer

▸ **get2dRenderer**(): `null` \| `CanvasRenderingContext2D`

#### Returns

`null` \| `CanvasRenderingContext2D`

the CanvasRenderingContext2D for the game canvas.

---

### getAbandonRangeChangePercent

▸ **getAbandonRangeChangePercent**(): `number`

#### Returns

`number`

---

### getAbandonSpeedChangePercent

▸ **getAbandonSpeedChangePercent**(): `number`

#### Returns

`number`

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

### getArtifactPointValues

▸ **getArtifactPointValues**(): `ArtifactPointValues`

#### Returns

`ArtifactPointValues`

---

### getArtifactSending

▸ **getArtifactSending**(`planetId?`): `undefined` \| `Artifact`

#### Parameters

| Name        | Type         |
| :---------- | :----------- |
| `planetId?` | `LocationId` |

#### Returns

`undefined` \| `Artifact`

---

### getArtifactUpdated$

▸ **getArtifactUpdated$**(): `Monomitter`<`ArtifactId`\>

#### Returns

`Monomitter`<`ArtifactId`\>

---

### getArtifactWithId

▸ **getArtifactWithId**(`artifactId`): `undefined` \| `Artifact`

#### Parameters

| Name         | Type                        |
| :----------- | :-------------------------- |
| `artifactId` | `undefined` \| `ArtifactId` |

#### Returns

`undefined` \| `Artifact`

---

### getArtifactsWithIds

▸ **getArtifactsWithIds**(`artifactIds?`): (`undefined` \| `Artifact`)[]

#### Parameters

| Name           | Type           |
| :------------- | :------------- |
| `artifactIds?` | `ArtifactId`[] |

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

| Name      | Type      |
| :-------- | :-------- |
| `setting` | `Setting` |

#### Returns

`boolean`

---

### getCaptureZoneGenerator

▸ **getCaptureZoneGenerator**(): `undefined` \| [`CaptureZoneGenerator`](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md)

#### Returns

`undefined` \| [`CaptureZoneGenerator`](Backend_GameLogic_CaptureZoneGenerator.CaptureZoneGenerator.md)

---

### getCaptureZonePointValues

▸ **getCaptureZonePointValues**(): [`number`, `number`, `number`, `number`, `number`, `number`, `number`, `number`, `number`, `number`]

#### Returns

[`number`, `number`, `number`, `number`, `number`, `number`, `number`, `number`, `number`, `number`]

---

### getCaptureZones

▸ **getCaptureZones**(): `Set`<`CaptureZone`\>

#### Returns

`Set`<`CaptureZone`\>

---

### getChunk

▸ **getChunk**(`chunkFootprint`): `undefined` \| `Chunk`

#### Parameters

| Name             | Type        |
| :--------------- | :---------- |
| `chunkFootprint` | `Rectangle` |

#### Returns

`undefined` \| `Chunk`

---

### getContractAddress

▸ **getContractAddress**(): `EthAddress`

#### Returns

`EthAddress`

---

### getDefaultSpaceJunkForPlanetLevel

▸ **getDefaultSpaceJunkForPlanetLevel**(`level`): `number`

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `level` | `number` |

#### Returns

`number`

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

▸ **getExploredChunks**(): `Iterable`<`Chunk`\>

#### Returns

`Iterable`<`Chunk`\>

---

### getForcesSending

▸ **getForcesSending**(`planetId?`): `number`

Percent from 0 to 100.

#### Parameters

| Name        | Type         |
| :---------- | :----------- |
| `planetId?` | `LocationId` |

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

### getGlManager

▸ **getGlManager**(): `null` \| `GameGLManager`

#### Returns

`null` \| `GameGLManager`

- A wrapper class for the WebGL2RenderingContext.

---

### getHashConfig

▸ **getHashConfig**(): [`HashConfig`](../modules/types_global_GlobalTypes.md#hashconfig)

#### Returns

[`HashConfig`](../modules/types_global_GlobalTypes.md#hashconfig)

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

| Name            | Type                                     |
| :-------------- | :--------------------------------------- |
| `cachedPlanets` | `Map`<`LocationId`, `PlanetRenderInfo`\> |
| `chunks`        | `Set`<`Chunk`\>                          |

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

### getModalManager

▸ **getModalManager**(): [`default`](Frontend_Game_ModalManager.default.md)

#### Returns

[`default`](Frontend_Game_ModalManager.default.md)

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

### getMyBalanceBn

▸ **getMyBalanceBn**(): `BigNumber`

#### Returns

`BigNumber`

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

### getOverlayContainer

▸ **getOverlayContainer**(): `undefined` \| `HTMLDivElement`

Gets the overlay container. See {@link GameUIManger.overlayContainer} for more information
about what the overlay container is.

#### Returns

`undefined` \| `HTMLDivElement`

---

### getPaused

▸ **getPaused**(): `boolean`

#### Returns

`boolean`

---

### getPaused$

▸ **getPaused$**(): `Monomitter`<`boolean`\>

#### Returns

`Monomitter`<`boolean`\>

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

### getPlanetHoveringInRenderer

▸ **getPlanetHoveringInRenderer**(): `boolean`

If there is a planet being hovered over, returns whether or not it's being hovered
over in the renderer.

#### Returns

`boolean`

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

### getRangeBuff

▸ **getRangeBuff**(): `number`

#### Returns

`number`

---

### getRenderer

▸ **getRenderer**(): `null` \| `Renderer`

#### Returns

`null` \| `Renderer`

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

### getSilverScoreValue

▸ **getSilverScoreValue**(): `number`

#### Returns

`number`

---

### getSilverSending

▸ **getSilverSending**(`planetId?`): `number`

Percent from 0 to 100.

#### Parameters

| Name        | Type         |
| :---------- | :----------- |
| `planetId?` | `LocationId` |

#### Returns

`number`

---

### getSpaceJunkEnabled

▸ **getSpaceJunkEnabled**(): `boolean`

#### Returns

`boolean`

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

### getSpeedBuff

▸ **getSpeedBuff**(): `number`

#### Returns

`number`

---

### getStringSetting

▸ **getStringSetting**(`setting`): `undefined` \| `string`

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `setting` | `Setting` |

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

### getUIEmitter

▸ **getUIEmitter**(): [`default`](Frontend_Utils_UIEmitter.default.md)

#### Returns

[`default`](Frontend_Utils_UIEmitter.default.md)

---

### getUnconfirmedMoves

▸ **getUnconfirmedMoves**(): `Transaction`<`UnconfirmedMove`\>[]

**`todo`** delete this. now that [GameObjects](Backend_GameLogic_GameObjects.GameObjects.md) is publically accessible, we shouldn't need to
drill fields like this anymore.

**`tutorial`** Plugin developers, please access fields like this with something like {@code df.getGameObjects().}

**`deprecated`**

#### Returns

`Transaction`<`UnconfirmedMove`\>[]

---

### getUnconfirmedUpgrades

▸ **getUnconfirmedUpgrades**(): `Transaction`<`UnconfirmedUpgrade`\>[]

#### Returns

`Transaction`<`UnconfirmedUpgrade`\>[]

---

### getUnconfirmedWormholeActivations

▸ **getUnconfirmedWormholeActivations**(): `Transaction`<`UnconfirmedActivateArtifact`\>[]

#### Returns

`Transaction`<`UnconfirmedActivateArtifact`\>[]

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

▸ **getWormholes**(): `Iterable`<`Wormhole`\>

#### Returns

`Iterable`<`Wormhole`\>

---

### hasMinedChunk

▸ **hasMinedChunk**(`chunkLocation`): `boolean`

#### Parameters

| Name            | Type        |
| :-------------- | :---------- |
| `chunkLocation` | `Rectangle` |

#### Returns

`boolean`

---

### isAbandoning

▸ **isAbandoning**(): `boolean`

#### Returns

`boolean`

---

### isAdmin

▸ **isAdmin**(): `boolean`

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

### isSendingForces

▸ **isSendingForces**(): `boolean`

#### Returns

`boolean`

---

### isSendingShip

▸ **isSendingShip**(`planetId?`): `boolean`

#### Parameters

| Name        | Type         |
| :---------- | :----------- |
| `planetId?` | `LocationId` |

#### Returns

`boolean`

---

### joinGame

▸ **joinGame**(`beforeRetry`): `Promise`<`void`\>

#### Parameters

| Name          | Type                                    |
| :------------ | :-------------------------------------- |
| `beforeRetry` | (`e`: `Error`) => `Promise`<`boolean`\> |

#### Returns

`Promise`<`void`\>

---

### onDiscoveredChunk

▸ **onDiscoveredChunk**(`chunk`): `void`

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `chunk` | `Chunk` |

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

### onSendComplete

▸ **onSendComplete**(`locationId`): `void`

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `locationId` | `LocationId` |

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

### potentialCaptureScore

▸ **potentialCaptureScore**(`planetLevel`): `number`

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `planetLevel` | `number` |

#### Returns

`number`

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

### setAbandoning

▸ **setAbandoning**(`abandoning`): `void`

#### Parameters

| Name         | Type      |
| :----------- | :-------- |
| `abandoning` | `boolean` |

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

### setCustomRenderer

▸ **setCustomRenderer**(`customRenderer`): `void`

Replaces the current renderer with the passed in custom renderer and adds the renderer
to the rendering stack. The function will automatically determine which renderer it is
by the rendererType and the methods in the renderer.

#### Parameters

| Name             | Type           | Description                                              |
| :--------------- | :------------- | :------------------------------------------------------- |
| `customRenderer` | `BaseRenderer` | a Renderer that follows one of the 23 renderer tempaltes |

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

### setHoveringOverArtifact

▸ **setHoveringOverArtifact**(`artifactId?`): `void`

#### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `artifactId?` | `ArtifactId` |

#### Returns

`void`

---

### setHoveringOverPlanet

▸ **setHoveringOverPlanet**(`planet`, `inRenderer`): `void`

#### Parameters

| Name         | Type                             |
| :----------- | :------------------------------- |
| `planet`     | `undefined` \| `LocatablePlanet` |
| `inRenderer` | `boolean`                        |

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

### setModalManager

▸ `Private` **setModalManager**(`modalManager`): `void`

#### Parameters

| Name           | Type                                               |
| :------------- | :------------------------------------------------- |
| `modalManager` | [`default`](Frontend_Game_ModalManager.default.md) |

#### Returns

`void`

---

### setOverlayContainer

▸ **setOverlayContainer**(`randomContainer?`): `void`

Sets the overlay container. See {@link GameUIManger.overlayContainer} for more information
about what the overlay container is.

#### Parameters

| Name               | Type             |
| :----------------- | :--------------- |
| `randomContainer?` | `HTMLDivElement` |

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

### setSending

▸ **setSending**(`sending`): `void`

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `sending` | `boolean` |

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

### stopExplore

▸ **stopExplore**(): `void`

#### Returns

`void`

---

### timeUntilNextBroadcastAvailable

▸ **timeUntilNextBroadcastAvailable**(): `number`

#### Returns

`number`

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
