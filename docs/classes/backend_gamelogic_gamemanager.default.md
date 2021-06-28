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
- [diagnostics](backend_gamelogic_gamemanager.default.md#diagnostics)
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
- [playerInterval](backend_gamelogic_gamemanager.default.md#playerinterval)
- [players](backend_gamelogic_gamemanager.default.md#players)
- [settingsSubscription](backend_gamelogic_gamemanager.default.md#settingssubscription)
- [snarkHelper](backend_gamelogic_gamemanager.default.md#snarkhelper)
- [terminal](backend_gamelogic_gamemanager.default.md#terminal)
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
- [clearEmoji](backend_gamelogic_gamemanager.default.md#clearemoji)
- [deactivateArtifact](backend_gamelogic_gamemanager.default.md#deactivateartifact)
- [depositArtifact](backend_gamelogic_gamemanager.default.md#depositartifact)
- [destroy](backend_gamelogic_gamemanager.default.md#destroy)
- [findArtifact](backend_gamelogic_gamemanager.default.md#findartifact)
- [getAccount](backend_gamelogic_gamemanager.default.md#getaccount)
- [getActiveArtifact](backend_gamelogic_gamemanager.default.md#getactiveartifact)
- [getAllOwnedPlanets](backend_gamelogic_gamemanager.default.md#getallownedplanets)
- [getAllPlanets](backend_gamelogic_gamemanager.default.md#getallplanets)
- [getAllPlayers](backend_gamelogic_gamemanager.default.md#getallplayers)
- [getAllVoyages](backend_gamelogic_gamemanager.default.md#getallvoyages)
- [getArtifactMap](backend_gamelogic_gamemanager.default.md#getartifactmap)
- [getArtifactUpdated$](backend_gamelogic_gamemanager.default.md#getartifactupdated$)
- [getArtifactWithId](backend_gamelogic_gamemanager.default.md#getartifactwithid)
- [getArtifactsWithIds](backend_gamelogic_gamemanager.default.md#getartifactswithids)
- [getChunk](backend_gamelogic_gamemanager.default.md#getchunk)
- [getChunkStore](backend_gamelogic_gamemanager.default.md#getchunkstore)
- [getConstructors](backend_gamelogic_gamemanager.default.md#getconstructors)
- [getContractAddress](backend_gamelogic_gamemanager.default.md#getcontractaddress)
- [getContractConstants](backend_gamelogic_gamemanager.default.md#getcontractconstants)
- [getConversation](backend_gamelogic_gamemanager.default.md#getconversation)
- [getCurrentlyExploringChunk](backend_gamelogic_gamemanager.default.md#getcurrentlyexploringchunk)
- [getDiagnostics](backend_gamelogic_gamemanager.default.md#getdiagnostics)
- [getDist](backend_gamelogic_gamemanager.default.md#getdist)
- [getDistCoords](backend_gamelogic_gamemanager.default.md#getdistcoords)
- [getEndTimeSeconds](backend_gamelogic_gamemanager.default.md#getendtimeseconds)
- [getEnergyArrivingForMove](backend_gamelogic_gamemanager.default.md#getenergyarrivingformove)
- [getEnergyCurveAtPercent](backend_gamelogic_gamemanager.default.md#getenergycurveatpercent)
- [getEnergyNeededForMove](backend_gamelogic_gamemanager.default.md#getenergyneededformove)
- [getEnergyOfPlayer](backend_gamelogic_gamemanager.default.md#getenergyofplayer)
- [getEthConnection](backend_gamelogic_gamemanager.default.md#getethconnection)
- [getExploredChunks](backend_gamelogic_gamemanager.default.md#getexploredchunks)
- [getGameObjects](backend_gamelogic_gamemanager.default.md#getgameobjects)
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
- [getMyScore](backend_gamelogic_gamemanager.default.md#getmyscore)
- [getNextBroadcastAvailableTimestamp](backend_gamelogic_gamemanager.default.md#getnextbroadcastavailabletimestamp)
- [getNextRevealCountdownInfo](backend_gamelogic_gamemanager.default.md#getnextrevealcountdowninfo)
- [getNotificationsManager](backend_gamelogic_gamemanager.default.md#getnotificationsmanager)
- [getPerlinThresholds](backend_gamelogic_gamemanager.default.md#getperlinthresholds)
- [getPlanetLevel](backend_gamelogic_gamemanager.default.md#getplanetlevel)
- [getPlanetMap](backend_gamelogic_gamemanager.default.md#getplanetmap)
- [getPlanetRarity](backend_gamelogic_gamemanager.default.md#getplanetrarity)
- [getPlanetUpdated$](backend_gamelogic_gamemanager.default.md#getplanetupdated$)
- [getPlanetWithCoords](backend_gamelogic_gamemanager.default.md#getplanetwithcoords)
- [getPlanetWithId](backend_gamelogic_gamemanager.default.md#getplanetwithid)
- [getPlanetsInRange](backend_gamelogic_gamemanager.default.md#getplanetsinrange)
- [getPlanetsInWorldRectangle](backend_gamelogic_gamemanager.default.md#getplanetsinworldrectangle)
- [getPlanetsWithIds](backend_gamelogic_gamemanager.default.md#getplanetswithids)
- [getPrivateKey](backend_gamelogic_gamemanager.default.md#getprivatekey)
- [getProcgenUtils](backend_gamelogic_gamemanager.default.md#getprocgenutils)
- [getRandomHomePlanetCoords](backend_gamelogic_gamemanager.default.md#getrandomhomeplanetcoords)
- [getRevealedLocations](backend_gamelogic_gamemanager.default.md#getrevealedlocations)
- [getSignedTwitter](backend_gamelogic_gamemanager.default.md#getsignedtwitter)
- [getSilverCurveAtPercent](backend_gamelogic_gamemanager.default.md#getsilvercurveatpercent)
- [getSilverOfPlayer](backend_gamelogic_gamemanager.default.md#getsilverofplayer)
- [getStalePlanetWithId](backend_gamelogic_gamemanager.default.md#getstaleplanetwithid)
- [getTemperature](backend_gamelogic_gamemanager.default.md#gettemperature)
- [getTimeForMove](backend_gamelogic_gamemanager.default.md#gettimeformove)
- [getTokenMintEndTimeSeconds](backend_gamelogic_gamemanager.default.md#gettokenmintendtimeseconds)
- [getTwitter](backend_gamelogic_gamemanager.default.md#gettwitter)
- [getUIEventEmitter](backend_gamelogic_gamemanager.default.md#getuieventemitter)
- [getUnconfirmedMoves](backend_gamelogic_gamemanager.default.md#getunconfirmedmoves)
- [getUnconfirmedUpgrades](backend_gamelogic_gamemanager.default.md#getunconfirmedupgrades)
- [getUnconfirmedWormholeActivations](backend_gamelogic_gamemanager.default.md#getunconfirmedwormholeactivations)
- [getUniverseTotalEnergy](backend_gamelogic_gamemanager.default.md#getuniversetotalenergy)
- [getUpgrade](backend_gamelogic_gamemanager.default.md#getupgrade)
- [getWithdrawnSilverOfPlayer](backend_gamelogic_gamemanager.default.md#getwithdrawnsilverofplayer)
- [getWorldRadius](backend_gamelogic_gamemanager.default.md#getworldradius)
- [getWorldSilver](backend_gamelogic_gamemanager.default.md#getworldsilver)
- [getWormholeFactors](backend_gamelogic_gamemanager.default.md#getwormholefactors)
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
- [isRoundOver](backend_gamelogic_gamemanager.default.md#isroundover)
- [joinGame](backend_gamelogic_gamemanager.default.md#joingame)
- [loadContract](backend_gamelogic_gamemanager.default.md#loadcontract)
- [loadPlugins](backend_gamelogic_gamemanager.default.md#loadplugins)
- [locationFromCoords](backend_gamelogic_gamemanager.default.md#locationfromcoords)
- [move](backend_gamelogic_gamemanager.default.md#move)
- [onTxConfirmed](backend_gamelogic_gamemanager.default.md#ontxconfirmed)
- [onTxIntentFail](backend_gamelogic_gamemanager.default.md#ontxintentfail)
- [onTxReverted](backend_gamelogic_gamemanager.default.md#ontxreverted)
- [onTxSubmit](backend_gamelogic_gamemanager.default.md#ontxsubmit)
- [prospectPlanet](backend_gamelogic_gamemanager.default.md#prospectplanet)
- [refreshMyGPTCredits](backend_gamelogic_gamemanager.default.md#refreshmygptcredits)
- [refreshServerPlanetStates](backend_gamelogic_gamemanager.default.md#refreshserverplanetstates)
- [refreshTwitters](backend_gamelogic_gamemanager.default.md#refreshtwitters)
- [revealLocation](backend_gamelogic_gamemanager.default.md#reveallocation)
- [savePlugins](backend_gamelogic_gamemanager.default.md#saveplugins)
- [setMinerCores](backend_gamelogic_gamemanager.default.md#setminercores)
- [setMiningPattern](backend_gamelogic_gamemanager.default.md#setminingpattern)
- [setPlanetEmoji](backend_gamelogic_gamemanager.default.md#setplanetemoji)
- [setRadius](backend_gamelogic_gamemanager.default.md#setradius)
- [setSnarkCacheSize](backend_gamelogic_gamemanager.default.md#setsnarkcachesize)
- [signMessage](backend_gamelogic_gamemanager.default.md#signmessage)
- [softRefreshPlanet](backend_gamelogic_gamemanager.default.md#softrefreshplanet)
- [spaceTypeFromPerlin](backend_gamelogic_gamemanager.default.md#spacetypefromperlin)
- [spaceTypePerlin](backend_gamelogic_gamemanager.default.md#spacetypeperlin)
- [startConversation](backend_gamelogic_gamemanager.default.md#startconversation)
- [startExplore](backend_gamelogic_gamemanager.default.md#startexplore)
- [stepConversation](backend_gamelogic_gamemanager.default.md#stepconversation)
- [stopExplore](backend_gamelogic_gamemanager.default.md#stopexplore)
- [submitPlanetMessage](backend_gamelogic_gamemanager.default.md#submitplanetmessage)
- [transferOwnership](backend_gamelogic_gamemanager.default.md#transferownership)
- [updateDiagnostics](backend_gamelogic_gamemanager.default.md#updatediagnostics)
- [upgrade](backend_gamelogic_gamemanager.default.md#upgrade)
- [verifyMessage](backend_gamelogic_gamemanager.default.md#verifymessage)
- [verifyTwitter](backend_gamelogic_gamemanager.default.md#verifytwitter)
- [withdrawArtifact](backend_gamelogic_gamemanager.default.md#withdrawartifact)
- [withdrawSilver](backend_gamelogic_gamemanager.default.md#withdrawsilver)
- [create](backend_gamelogic_gamemanager.default.md#create)

## Constructors

### constructor

\+ `Private` **new default**(`terminal`: _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\>, `account`: _undefined_ \| EthAddress, `balance`: _number_, `players`: _Map_<string, Player\>, `touchedPlanets`: _Map_<LocationId, Planet\>, `allTouchedPlanetIds`: _Set_<LocationId\>, `revealedCoords`: _Map_<LocationId, RevealedCoords\>, `worldRadius`: _number_, `unprocessedArrivals`: _Map_<VoyageId, QueuedArrival\>, `unprocessedPlanetArrivalIds`: _Map_<LocationId, VoyageId[]\>, `contractsAPI`: [_default_](backend_gamelogic_contractsapi.default.md), `contractConstants`: [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md), `persistentChunkStore`: [_default_](backend_storage_persistentchunkstore.default.md), `snarkHelper`: [_default_](backend_utils_snarkargshelper.default.md), `homeLocation`: _undefined_ \| WorldLocation, `useMockHash`: _boolean_, `artifacts`: _Map_<ArtifactId, Artifact\>, `ethConnection`: [_default_](backend_network_ethconnection.default.md), `gptCreditPriceEther`: _number_, `myGPTCredits`: _number_): [_default_](backend_gamelogic_gamemanager.default.md)

#### Parameters

| Name                          | Type                                                                                                          |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------ |
| `terminal`                    | _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\> |
| `account`                     | _undefined_ \| EthAddress                                                                                     |
| `balance`                     | _number_                                                                                                      |
| `players`                     | _Map_<string, Player\>                                                                                        |
| `touchedPlanets`              | _Map_<LocationId, Planet\>                                                                                    |
| `allTouchedPlanetIds`         | _Set_<LocationId\>                                                                                            |
| `revealedCoords`              | _Map_<LocationId, RevealedCoords\>                                                                            |
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

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

Overrides: EventEmitter.constructor

## Properties

### account

• `Private` `Readonly` **account**: _undefined_ \| EthAddress

The ethereum address of the player who is currently logged in. We support 'no account',
represented by `undefined` in the case when you want to simply load the game state from the
contract and view it without be able to make any moves.

---

### balance

• `Private` **balance**: _number_

This is kept relatively up-to-date with the balance of the player's wallet on the latest block
of whatever blockchain we're connected to.

**`todo`** move this into a new `PlayerState` class.

---

### balanceInterval

• `Private` **balanceInterval**: _Timeout_

Handle to an interval that periodically refreshes the player's balance.

**`todo`** move this into a new `PlayerState` class.

---

### contractConstants

• `Private` `Readonly` **contractConstants**: [_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md)

Game parameters set by the contract. Stuff like perlin keys, which are important for mining the
correct universe, or the time multiplier, which allows us to tune how quickly voyages go.

**`todo`** move this into a separate `GameConfiguration` class.

---

### contractsAPI

• `Private` `Readonly` **contractsAPI**: [_default_](backend_gamelogic_contractsapi.default.md)

Allows us to make contract calls, and execute transactions. Be careful about how you use this
guy. You don't want to cause your client to send an excessive amount of traffic to whatever
node you're connected to.

Interacting with the blockchain isn't free, and we need to be mindful about about the way our
application interacts with the blockchain. The current rate limiting strategy consists of three
points:

- data that needs to be fetched often should be fetched in bulk.
- rate limit smart contract calls (reads from the blockchain), implemented by
  [ContractCaller](backend_gamelogic_contractcaller.contractcaller.md) and transactions (writes to the blockchain on behalf of the player),
  implemented by [TxExecutor](backend_network_txexecutor.txexecutor.md) via two separately tuned [ThrottledConcurrentQueue](backend_network_throttledconcurrentqueue.throttledconcurrentqueue.md)s.

---

### diagnostics

• `Private` **diagnostics**: [_Diagnostics_](../interfaces/frontend_panes_diagnosticspane.diagnostics.md)

Diagnostic information about the game.

---

### endTimeSeconds

• `Private` `Readonly` **endTimeSeconds**: _number_= 1643587533

**`todo`** change this to the correct timestamp each round.

---

### entityStore

• `Private` `Readonly` **entityStore**: [_GameObjects_](backend_gamelogic_gameobjects.gameobjects.md)

This variable contains the internal state of objects that live in the game world.

---

### ethConnection

• `Private` `Readonly` **ethConnection**: [_default_](backend_network_ethconnection.default.md)

An interface to the blockchain that is a little bit lower-level than {@link ContractsAPI}. It
allows us to do basic operations such as wait for a transaction to complete, check the player's
address and balance, etc.

---

### gptCreditPriceEther

• `Private` **gptCreditPriceEther**: _number_

Price of a single gpt credit, which buys you a single interaction with the GPT-powered AI
Artifact Chat Bots.

**`todo`** move this into a new `GameConfiguration` class.

---

### gptCreditPriceEtherEmitter$

• `Private` **gptCreditPriceEtherEmitter$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<number\>

Whenever the price of single GPT credit changes, we emit that event here.

---

### hashConfig

• `Private` `Readonly` **hashConfig**: [_HashConfig_](../modules/_types_global_globaltypes.md#hashconfig)

Each round we change the hash configuration of the game. The hash configuration is download
from the blockchain, and essentially acts as a salt, permuting the universe into a unique
configuration for each new round.

**`todo`** deduplicate this and `useMockHash` somehow.

---

### hashRate

• `Private` **hashRate**: _number_

Continuously updated value representing the total hashes per second that the game is currently
mining the universe at.

**`todo`** keep this in {@link MinerManager}

---

### homeLocation

• `Private` **homeLocation**: _undefined_ \| WorldLocation

The spawn location of the current player.

**`todo,`** make this smarter somehow. It's really annoying to have to import world coordinates, and
get them wrong or something. Maybe we need to mark a planet, once it's been initialized
contract-side, as the homeworld of the user who initialized on it. That way, when you import a
new account into the game, and you import map data that contains your home planet, the client
would be able to automatically detect which planet is the player's home planet.

**`todo`** move this into a new `PlayerState` class.

---

### minerManager

• `Private` `Optional` **minerManager**: [_default_](backend_miner_minermanager.default.md)

Manages the process of mining new space territory.

---

### myBalance$

• `Private` **myBalance$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<number\>

Any time the balance of the player's address changes, we publish an event here.

**`todo`** move this into a new `PlayerState` class.

---

### myGPTCredits

• `Private` **myGPTCredits**: _number_

The total amount of GPT credits that belong to the current player.

**`todo`** move this into a new `PlayerState` class.

---

### myGPTCredits$

• `Private` **myGPTCredits$**: [_Monomitter_](../modules/frontend_utils_monomitter.md#monomitter)<number\>

Whenever the amount of the GPT credits that this player owns changes, we publish an event here.

**`todo`** move this into a new `PlayerState` class.

---

### persistentChunkStore

• `Private` `Readonly` **persistentChunkStore**: [_default_](backend_storage_persistentchunkstore.default.md)

An object that syncs any newly added or deleted chunks to the player's IndexedDB.

**`todo`** it also persists other game data to IndexedDB. This class needs to be renamed `GameSaver`
or something like that.

---

### planetHashMimc

• `Private` `Readonly` **planetHashMimc**: (...`inputs`: _number_[]) => BigInteger

The aforementioned hash function. In debug mode where `DISABLE_ZK_CHECKS` is on, we use a
faster hash function. Othewise, in production mode, use MiMC hash (https://byt3bit.github.io/primesym/).

#### Type declaration

▸ (...`inputs`: _number_[]): BigInteger

#### Parameters

| Name        | Type       |
| :---------- | :--------- |
| `...inputs` | _number_[] |

**Returns:** BigInteger

---

### playerInterval

• `Private` **playerInterval**: _Timeout_

Handle to an interval that periodically refreshes some information about the player from the
blockchain.

**`todo`** move this into a new `PlayerState` class.

---

### players

• `Private` `Readonly` **players**: _Map_<string, Player\>

Map from ethereum addresses to player objects. This isn't stored in [GameObjects](backend_gamelogic_gameobjects.gameobjects.md),
because it's not techincally an entity that exists in the world. A player just controls planets
and artifacts that do exist in the world.

**`todo`** move this into a new `Players` class.

---

### settingsSubscription

• `Private` **settingsSubscription**: _undefined_ \| [_Subscription_](../modules/frontend_utils_monomitter.md#subscription)

Subscription to act on setting changes

---

### snarkHelper

• `Private` `Readonly` **snarkHelper**: [_default_](backend_utils_snarkargshelper.default.md)

Responsible for generating snark proofs.

---

### terminal

• `Private` `Readonly` **terminal**: _MutableRefObject_<undefined \| [_TerminalHandle_](../interfaces/frontend_views_terminal.terminalhandle.md)\>

Kind of hacky, but we store a reference to the terminal that the player sees when the initially
load into the game. This is the same exact terminal that appears inside the collapsable right
bar of the game.

---

### useMockHash

• `Private` `Readonly` **useMockHash**: _boolean_

In debug builds of the game, we can connect to a set of contracts deployed to a local
blockchain, which are tweaked to not verify planet hashes, meaning we can use a faster hash
function with similar properties to mimc. This allows us to mine the map faster in debug mode.

**`todo`** move this into a separate `GameConfiguration` class.

---

### worldRadius

• `Private` **worldRadius**: _number_

Sometimes the universe gets bigger... Sometimes it doesn't.

**`todo`** move this into a new `GameConfiguration` class.

## Accessors

### planetRarity

• get **planetRarity**(): _number_

**Returns:** _number_

## Methods

### activateArtifact

▸ **activateArtifact**(`locationId`: LocationId, `artifactId`: ArtifactId, `wormholeTo`: _undefined_ \| LocationId, `bypassChecks?`: _boolean_): [_default_](backend_gamelogic_gamemanager.default.md)

#### Parameters

| Name           | Type                      | Default value |
| :------------- | :------------------------ | :------------ |
| `locationId`   | LocationId                | -             |
| `artifactId`   | ArtifactId                | -             |
| `wormholeTo`   | _undefined_ \| LocationId | -             |
| `bypassChecks` | _boolean_                 | false         |

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

▸ **addNewChunk**(`chunk`: [_Chunk_](_types_global_globaltypes.chunk.md)): [_default_](backend_gamelogic_gamemanager.default.md)

Makes this game manager aware of a new chunk - which includes its location, size,
as well as all of the planets contained in that chunk. Causes the client to load
all of the information about those planets from the blockchain.

#### Parameters

| Name    | Type                                          |
| :------ | :-------------------------------------------- |
| `chunk` | [_Chunk_](_types_global_globaltypes.chunk.md) |

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

▸ **bulkAddNewChunks**(`chunks`: [_Chunk_](_types_global_globaltypes.chunk.md)[]): _Promise_<void\>

To add multiple chunks at once, use this function rather than `addNewChunk`, in order
to load all of the associated planet data in an efficient manner.

#### Parameters

| Name     | Type                                            |
| :------- | :---------------------------------------------- |
| `chunks` | [_Chunk_](_types_global_globaltypes.chunk.md)[] |

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

▸ **buyHat**(`planetId`: LocationId, `_bypassChecks?`: _boolean_): [_default_](backend_gamelogic_gamemanager.default.md)

Submits a transaction to the blockchain to buy a hat for the given planet. You
must own the planet. Warning costs real xdai. Hats are permanently locked to a
planet. They are purely cosmetic and a great way to BM your opponents or just
look your best. Just like in the real world, more money means more hat.

#### Parameters

| Name            | Type       | Default value |
| :-------------- | :--------- | :------------ |
| `planetId`      | LocationId | -             |
| `_bypassChecks` | _boolean_  | false         |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### checkGameHasEnded

▸ `Private` **checkGameHasEnded**(): _boolean_

**Returns:** _boolean_

---

### clearEmoji

▸ **clearEmoji**(`locationId`: LocationId): _Promise_<void\>

If you are the owner of this planet, you can delete the emoji that is hovering above the
planet.

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `locationId` | LocationId |

**Returns:** _Promise_<void\>

---

### deactivateArtifact

▸ **deactivateArtifact**(`locationId`: LocationId, `artifactId`: ArtifactId, `bypassChecks?`: _boolean_): _undefined_ \| [_default_](backend_gamelogic_gamemanager.default.md)

#### Parameters

| Name           | Type       | Default value |
| :------------- | :--------- | :------------ |
| `locationId`   | LocationId | -             |
| `artifactId`   | ArtifactId | -             |
| `bypassChecks` | _boolean_  | false         |

**Returns:** _undefined_ \| [_default_](backend_gamelogic_gamemanager.default.md)

---

### depositArtifact

▸ **depositArtifact**(`locationId`: LocationId, `artifactId`: ArtifactId, `bypassChecks?`: _boolean_): [_default_](backend_gamelogic_gamemanager.default.md)

Submits a transaction to the blockchain to deposit an artifact on a given planet.
You must own the planet and you must own the artifact directly (can't be locked in contract)

#### Parameters

| Name           | Type       | Default value |
| :------------- | :--------- | :------------ |
| `locationId`   | LocationId | -             |
| `artifactId`   | ArtifactId | -             |
| `bypassChecks` | _boolean_  | true          |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### destroy

▸ **destroy**(): _void_

**Returns:** _void_

---

### findArtifact

▸ **findArtifact**(`planetId`: LocationId, `bypassChecks?`: _boolean_): [_default_](backend_gamelogic_gamemanager.default.md)

Calls the contract to find an artifact on the given planet.

#### Parameters

| Name           | Type       | Default value |
| :------------- | :--------- | :------------ |
| `planetId`     | LocationId | -             |
| `bypassChecks` | _boolean_  | false         |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### getAccount

▸ **getAccount**(): _undefined_ \| EthAddress

Gets the address of the player logged into this game manager.

**Returns:** _undefined_ \| EthAddress

---

### getActiveArtifact

▸ **getActiveArtifact**(`planet`: Planet): _undefined_ \| Artifact

Gets the active artifact on this planet, if one exists.

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _undefined_ \| Artifact

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

### getArtifactsWithIds

▸ **getArtifactsWithIds**(`artifactIds`: ArtifactId[]): (_undefined_ \| Artifact)[]

Gets the artifacts with the given ids, including ones we know exist but haven't been loaded,
represented by `undefined`.

#### Parameters

| Name          | Type         |
| :------------ | :----------- |
| `artifactIds` | ArtifactId[] |

**Returns:** (_undefined_ \| Artifact)[]

---

### getChunk

▸ **getChunk**(`chunkFootprint`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)): _undefined_ \| [_Chunk_](_types_global_globaltypes.chunk.md)

#### Parameters

| Name             | Type                                                                |
| :--------------- | :------------------------------------------------------------------ |
| `chunkFootprint` | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |

**Returns:** _undefined_ \| [_Chunk_](_types_global_globaltypes.chunk.md)

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

### getDiagnostics

▸ **getDiagnostics**(): [_Diagnostics_](../interfaces/frontend_panes_diagnosticspane.diagnostics.md)

Gets some diagnostic information about the game. Returns a copy, you can't modify it.

**Returns:** [_Diagnostics_](../interfaces/frontend_panes_diagnosticspane.diagnostics.md)

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

### getDistCoords

▸ **getDistCoords**(`fromCoords`: WorldCoords, `toCoords`: WorldCoords): _number_

Gets the distance between two coordinates in space.

#### Parameters

| Name         | Type        |
| :----------- | :---------- |
| `fromCoords` | WorldCoords |
| `toCoords`   | WorldCoords |

**Returns:** _number_

---

### getEndTimeSeconds

▸ **getEndTimeSeconds**(): _number_

The game ends at a particular time in the future - get this time measured
in seconds from the epoch.

**Returns:** _number_

---

### getEnergyArrivingForMove

▸ **getEnergyArrivingForMove**(`fromId`: LocationId, `toId`: _undefined_ \| LocationId, `distance`: _undefined_ \| _number_, `sentEnergy`: _number_): _number_

Gets the amount of energy that would arrive if a voyage with the given parameters
was to occur. The toPlanet is optional, in case you want an estimate that doesn't include
wormhole speedups.

#### Parameters

| Name         | Type                      |
| :----------- | :------------------------ |
| `fromId`     | LocationId                |
| `toId`       | _undefined_ \| LocationId |
| `distance`   | _undefined_ \| _number_   |
| `sentEnergy` | _number_                  |

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

▸ **getExploredChunks**(): _Iterable_<[_Chunk_](_types_global_globaltypes.chunk.md)\>

Gets all the map chunks that this client is aware of. Chunks may have come from
mining, or from importing map data.

**Returns:** _Iterable_<[_Chunk_](_types_global_globaltypes.chunk.md)\>

---

### getGameObjects

▸ **getGameObjects**(): [_GameObjects_](backend_gamelogic_gameobjects.gameobjects.md)

Gets a reference to the game's internal representation of the world state. This includes
voyages, planets, artifacts, and active wormholes,

**Returns:** [_GameObjects_](backend_gamelogic_gameobjects.gameobjects.md)

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

### getMyScore

▸ **getMyScore**(): _number_

Get the score of the currently logged-in account.

**Returns:** _number_

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

▸ **getPlanetWithId**(`planetId`: _undefined_ \| LocationId): _undefined_ \| Planet

Gets the planet with the given hash. Returns undefined if the planet is neither in the contract
nor has been discovered locally. If the planet needs to be updated (because some time has
passed since we last updated the planet), then updates that planet first.

#### Parameters

| Name       | Type                      |
| :--------- | :------------------------ |
| `planetId` | _undefined_ \| LocationId |

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

### getPlanetsWithIds

▸ **getPlanetsWithIds**(`planetId`: LocationId[]): Planet[]

Gets a list of planets in the client's memory with the given ids. If a planet with the given id
doesn't exist, no entry for that planet will be returned in the result.

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | LocationId[] |

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

▸ **getRevealedLocations**(): _Map_<LocationId, RevealedLocation\>

Gets a map of all location IDs whose coords have been publicly revealed

**Returns:** _Map_<LocationId, RevealedLocation\>

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

### getStalePlanetWithId

▸ **getStalePlanetWithId**(`planetId`: LocationId): _undefined_ \| Planet

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _undefined_ \| Planet

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

### getTokenMintEndTimeSeconds

▸ **getTokenMintEndTimeSeconds**(): _number_

Dark Forest tokens can only be minted up to a certain time - get this time measured in seconds from epoch.

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

### getWormholeFactors

▸ **getWormholeFactors**(`fromPlanet`: Planet, `toPlanet`: Planet): _undefined_ \| { `distanceFactor`: _number_ ; `speedFactor`: _number_ }

If there's an active artifact on either of these planets which happens to be a wormhole which
is active and targetting the other planet, return the wormhole boost which is greater. Values
represent a multiplier.

#### Parameters

| Name         | Type   |
| :----------- | :----- |
| `fromPlanet` | Planet |
| `toPlanet`   | Planet |

**Returns:** _undefined_ \| { `distanceFactor`: _number_ ; `speedFactor`: _number_ }

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

### isRoundOver

▸ **isRoundOver**(): _boolean_

Returns whether or not the current round has ended.

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

Returns an instance of a `Contract` from the ethersjs library. This is the library we use to
connect to the blockchain. For documentation about how `Contract` works, see:
https://docs.ethers.io/v5/api/contract/contract/

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

▸ **move**(`from`: LocationId, `to`: LocationId, `forces`: _number_, `silver`: _number_, `artifactMoved?`: ArtifactId, `bypassChecks?`: _boolean_): [_default_](backend_gamelogic_gamemanager.default.md)

Submits a transaction to the blockchain to move the given amount of resources from
the given planet to the given planet.

#### Parameters

| Name             | Type       | Default value |
| :--------------- | :--------- | :------------ |
| `from`           | LocationId | -             |
| `to`             | LocationId | -             |
| `forces`         | _number_   | -             |
| `silver`         | _number_   | -             |
| `artifactMoved?` | ArtifactId | -             |
| `bypassChecks`   | _boolean_  | false         |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### onTxConfirmed

▸ `Private` **onTxConfirmed**(`unminedTx`: SubmittedTx): _void_

#### Parameters

| Name        | Type        |
| :---------- | :---------- |
| `unminedTx` | SubmittedTx |

**Returns:** _void_

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

### onTxReverted

▸ `Private` **onTxReverted**(`unminedTx`: SubmittedTx): _void_

#### Parameters

| Name        | Type        |
| :---------- | :---------- |
| `unminedTx` | SubmittedTx |

**Returns:** _void_

---

### onTxSubmit

▸ `Private` **onTxSubmit**(`unminedTx`: SubmittedTx): _void_

#### Parameters

| Name        | Type        |
| :---------- | :---------- |
| `unminedTx` | SubmittedTx |

**Returns:** _void_

---

### prospectPlanet

▸ **prospectPlanet**(`planetId`: LocationId, `bypassChecks?`: _boolean_): _Promise_<undefined \| [_default_](backend_gamelogic_gamemanager.default.md)\>

#### Parameters

| Name           | Type       | Default value |
| :------------- | :--------- | :------------ |
| `planetId`     | LocationId | -             |
| `bypassChecks` | _boolean_  | false         |

**Returns:** _Promise_<undefined \| [_default_](backend_gamelogic_gamemanager.default.md)\>

---

### refreshMyGPTCredits

▸ `Private` **refreshMyGPTCredits**(): _Promise_<void\>

**Returns:** _Promise_<void\>

---

### refreshServerPlanetStates

▸ **refreshServerPlanetStates**(`planetIds`: LocationId[]): _Promise_<void\>

We have two locations which planet state can live: on the server, and on the blockchain. We use
the blockchain for the 'physics' of the universe, and the webserver for optional 'add-on'
features, which are cryptographically secure, but live off-chain.

This function loads the planet states which live on the server. Plays nicely with our
notifications system and sets the appropriate loading state values on the planet.

#### Parameters

| Name        | Type         |
| :---------- | :----------- |
| `planetIds` | LocationId[] |

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

### setPlanetEmoji

▸ **setPlanetEmoji**(`locationId`: LocationId, `emojiStr`: _string_): _Promise_<void\>

If you are the owner of this planet, you can set an 'emoji' to hover above the planet.
`emojiStr` must be a string that contains a single emoji, otherwise this function will throw an
error.

The emoji is stored off-chain in a postgres database. We verify planet ownership via a contract
call from the webserver, and by verifying that the request to add (or remove) an emoji from a
planet was signed by the owner.

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `locationId` | LocationId |
| `emojiStr`   | _string_   |

**Returns:** _Promise_<void\>

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

### signMessage

▸ `Private` **signMessage**<T\>(`obj`: T): _Promise_<SignedMessage<T\>\>

Returns a signed version of this message.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type |
| :---- | :--- |
| `obj` | T    |

**Returns:** _Promise_<SignedMessage<T\>\>

---

### softRefreshPlanet

▸ `Private` **softRefreshPlanet**(`planetId`: LocationId): _Promise_<void\>

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _Promise_<void\>

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

### submitPlanetMessage

▸ `Private` **submitPlanetMessage**(`locationId`: LocationId, `type`: EmojiFlag, `body`: _unknown_): _Promise_<void\>

The planet emoji feature is built on top of a more general 'Planet Message' system, which
allows players to upload pieces of data called 'Message's to planets that they own. Emojis are
just one type of message. Their implementation leaves the door open to more off-chain data.

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `locationId` | LocationId |
| `type`       | EmojiFlag  |
| `body`       | _unknown_  |

**Returns:** _Promise_<void\>

---

### transferOwnership

▸ **transferOwnership**(`planetId`: LocationId, `newOwner`: EthAddress, `bypassChecks?`: _boolean_): [_default_](backend_gamelogic_gamemanager.default.md)

#### Parameters

| Name           | Type       | Default value |
| :------------- | :--------- | :------------ |
| `planetId`     | LocationId | -             |
| `newOwner`     | EthAddress | -             |
| `bypassChecks` | _boolean_  | false         |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### updateDiagnostics

▸ **updateDiagnostics**(`updateFn`: (`d`: [_Diagnostics_](../interfaces/frontend_panes_diagnosticspane.diagnostics.md)) => _void_): _void_

Updates the diagnostic info of the game using the supplied function. Ideally, each spot in the
codebase that would like to record a metric is able to update its specific metric in a
convenient manner.

#### Parameters

| Name       | Type                                                                                          |
| :--------- | :-------------------------------------------------------------------------------------------- |
| `updateFn` | (`d`: [_Diagnostics_](../interfaces/frontend_panes_diagnosticspane.diagnostics.md)) => _void_ |

**Returns:** _void_

---

### upgrade

▸ **upgrade**(`planetId`: LocationId, `branch`: _number_, `_bypassChecks?`: _boolean_): [_default_](backend_gamelogic_gamemanager.default.md)

Submits a transaction to the blockchain to upgrade the given planet with the given
upgrade branch. You must own the planet, and have enough silver on it to complete
the upgrade.

#### Parameters

| Name            | Type       | Default value |
| :-------------- | :--------- | :------------ |
| `planetId`      | LocationId | -             |
| `branch`        | _number_   | -             |
| `_bypassChecks` | _boolean_  | false         |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### verifyMessage

▸ `Private` **verifyMessage**(`message`: _SignedMessage_<unknown\>): _Promise_<boolean\>

Checks that a message signed by {@link GameManager#signMessage} was signed by the address that
it claims it was signed by.

#### Parameters

| Name      | Type                      |
| :-------- | :------------------------ |
| `message` | _SignedMessage_<unknown\> |

**Returns:** _Promise_<boolean\>

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

▸ **withdrawArtifact**(`locationId`: LocationId, `artifactId`: ArtifactId, `bypassChecks?`: _boolean_): [_default_](backend_gamelogic_gamemanager.default.md)

Withdraws the artifact that is locked up on the given planet.

#### Parameters

| Name           | Type       | Default value |
| :------------- | :--------- | :------------ |
| `locationId`   | LocationId | -             |
| `artifactId`   | ArtifactId | -             |
| `bypassChecks` | _boolean_  | true          |

**Returns:** [_default_](backend_gamelogic_gamemanager.default.md)

---

### withdrawSilver

▸ **withdrawSilver**(`locationId`: LocationId, `amount`: _number_, `bypassChecks?`: _boolean_): _undefined_ \| [_default_](backend_gamelogic_gamemanager.default.md)

#### Parameters

| Name           | Type       | Default value |
| :------------- | :--------- | :------------ |
| `locationId`   | LocationId | -             |
| `amount`       | _number_   | -             |
| `bypassChecks` | _boolean_  | false         |

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
