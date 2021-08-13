# Class: default

[Backend/GameLogic/GameManager](../modules/Backend_GameLogic_GameManager.md).default

## Hierarchy

- `EventEmitter`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](Backend_GameLogic_GameManager.default.md#constructor)

### Properties

- [account](Backend_GameLogic_GameManager.default.md#account)
- [contractConstants](Backend_GameLogic_GameManager.default.md#contractconstants)
- [contractsAPI](Backend_GameLogic_GameManager.default.md#contractsapi)
- [diagnostics](Backend_GameLogic_GameManager.default.md#diagnostics)
- [diagnosticsInterval](Backend_GameLogic_GameManager.default.md#diagnosticsinterval)
- [endTimeSeconds](Backend_GameLogic_GameManager.default.md#endtimeseconds)
- [entityStore](Backend_GameLogic_GameManager.default.md#entitystore)
- [ethConnection](Backend_GameLogic_GameManager.default.md#ethconnection)
- [gptCreditPriceEther](Backend_GameLogic_GameManager.default.md#gptcreditpriceether)
- [gptCreditPriceEtherEmitter$](Backend_GameLogic_GameManager.default.md#gptcreditpriceetheremitter$)
- [hashConfig](Backend_GameLogic_GameManager.default.md#hashconfig)
- [hashRate](Backend_GameLogic_GameManager.default.md#hashrate)
- [homeLocation](Backend_GameLogic_GameManager.default.md#homelocation)
- [minerManager](Backend_GameLogic_GameManager.default.md#minermanager)
- [myGPTCredits](Backend_GameLogic_GameManager.default.md#mygptcredits)
- [myGPTCredits$](Backend_GameLogic_GameManager.default.md#mygptcredits$)
- [persistentChunkStore](Backend_GameLogic_GameManager.default.md#persistentchunkstore)
- [planetHashMimc](Backend_GameLogic_GameManager.default.md#planethashmimc)
- [playerInterval](Backend_GameLogic_GameManager.default.md#playerinterval)
- [players](Backend_GameLogic_GameManager.default.md#players)
- [playersUpdated$](Backend_GameLogic_GameManager.default.md#playersupdated$)
- [scoreboardInterval](Backend_GameLogic_GameManager.default.md#scoreboardinterval)
- [settingsSubscription](Backend_GameLogic_GameManager.default.md#settingssubscription)
- [snarkHelper](Backend_GameLogic_GameManager.default.md#snarkhelper)
- [terminal](Backend_GameLogic_GameManager.default.md#terminal)
- [useMockHash](Backend_GameLogic_GameManager.default.md#usemockhash)
- [worldRadius](Backend_GameLogic_GameManager.default.md#worldradius)

### Accessors

- [planetRarity](Backend_GameLogic_GameManager.default.md#planetrarity)

### Methods

- [activateArtifact](Backend_GameLogic_GameManager.default.md#activateartifact)
- [addAccount](Backend_GameLogic_GameManager.default.md#addaccount)
- [addNewChunk](Backend_GameLogic_GameManager.default.md#addnewchunk)
- [biomebasePerlin](Backend_GameLogic_GameManager.default.md#biomebaseperlin)
- [bulkAddNewChunks](Backend_GameLogic_GameManager.default.md#bulkaddnewchunks)
- [bulkHardRefreshPlanets](Backend_GameLogic_GameManager.default.md#bulkhardrefreshplanets)
- [buyGPTCredits](Backend_GameLogic_GameManager.default.md#buygptcredits)
- [buyHat](Backend_GameLogic_GameManager.default.md#buyhat)
- [checkGameHasEnded](Backend_GameLogic_GameManager.default.md#checkgamehasended)
- [claimLocation](Backend_GameLogic_GameManager.default.md#claimlocation)
- [clearEmoji](Backend_GameLogic_GameManager.default.md#clearemoji)
- [deactivateArtifact](Backend_GameLogic_GameManager.default.md#deactivateartifact)
- [depositArtifact](Backend_GameLogic_GameManager.default.md#depositartifact)
- [destroy](Backend_GameLogic_GameManager.default.md#destroy)
- [findArtifact](Backend_GameLogic_GameManager.default.md#findartifact)
- [findRandomHomePlanet](Backend_GameLogic_GameManager.default.md#findrandomhomeplanet)
- [getAccount](Backend_GameLogic_GameManager.default.md#getaccount)
- [getActiveArtifact](Backend_GameLogic_GameManager.default.md#getactiveartifact)
- [getAllOwnedPlanets](Backend_GameLogic_GameManager.default.md#getallownedplanets)
- [getAllPlanets](Backend_GameLogic_GameManager.default.md#getallplanets)
- [getAllPlayers](Backend_GameLogic_GameManager.default.md#getallplayers)
- [getAllVoyages](Backend_GameLogic_GameManager.default.md#getallvoyages)
- [getArtifactMap](Backend_GameLogic_GameManager.default.md#getartifactmap)
- [getArtifactUpdated$](Backend_GameLogic_GameManager.default.md#getartifactupdated$)
- [getArtifactWithId](Backend_GameLogic_GameManager.default.md#getartifactwithid)
- [getArtifactsWithIds](Backend_GameLogic_GameManager.default.md#getartifactswithids)
- [getChunk](Backend_GameLogic_GameManager.default.md#getchunk)
- [getChunkStore](Backend_GameLogic_GameManager.default.md#getchunkstore)
- [getClaimedLocations](Backend_GameLogic_GameManager.default.md#getclaimedlocations)
- [getConstructors](Backend_GameLogic_GameManager.default.md#getconstructors)
- [getContractAddress](Backend_GameLogic_GameManager.default.md#getcontractaddress)
- [getContractConstants](Backend_GameLogic_GameManager.default.md#getcontractconstants)
- [getConversation](Backend_GameLogic_GameManager.default.md#getconversation)
- [getCurrentlyExploringChunk](Backend_GameLogic_GameManager.default.md#getcurrentlyexploringchunk)
- [getDiagnostics](Backend_GameLogic_GameManager.default.md#getdiagnostics)
- [getDist](Backend_GameLogic_GameManager.default.md#getdist)
- [getDistCoords](Backend_GameLogic_GameManager.default.md#getdistcoords)
- [getEndTimeSeconds](Backend_GameLogic_GameManager.default.md#getendtimeseconds)
- [getEnergyArrivingForMove](Backend_GameLogic_GameManager.default.md#getenergyarrivingformove)
- [getEnergyCurveAtPercent](Backend_GameLogic_GameManager.default.md#getenergycurveatpercent)
- [getEnergyNeededForMove](Backend_GameLogic_GameManager.default.md#getenergyneededformove)
- [getEnergyOfPlayer](Backend_GameLogic_GameManager.default.md#getenergyofplayer)
- [getEthConnection](Backend_GameLogic_GameManager.default.md#getethconnection)
- [getExploredChunks](Backend_GameLogic_GameManager.default.md#getexploredchunks)
- [getGameObjects](Backend_GameLogic_GameManager.default.md#getgameobjects)
- [getGptCreditBalanceEmitter](Backend_GameLogic_GameManager.default.md#getgptcreditbalanceemitter)
- [getGptCreditPriceEmitter](Backend_GameLogic_GameManager.default.md#getgptcreditpriceemitter)
- [getHashConfig](Backend_GameLogic_GameManager.default.md#gethashconfig)
- [getHashesPerSec](Backend_GameLogic_GameManager.default.md#gethashespersec)
- [getHomeCoords](Backend_GameLogic_GameManager.default.md#gethomecoords)
- [getHomeHash](Backend_GameLogic_GameManager.default.md#gethomehash)
- [getIsBuyingCreditsEmitter](Backend_GameLogic_GameManager.default.md#getisbuyingcreditsemitter)
- [getLocationOfPlanet](Backend_GameLogic_GameManager.default.md#getlocationofplanet)
- [getMaxMoveDist](Backend_GameLogic_GameManager.default.md#getmaxmovedist)
- [getMiningPattern](Backend_GameLogic_GameManager.default.md#getminingpattern)
- [getMyArtifactMap](Backend_GameLogic_GameManager.default.md#getmyartifactmap)
- [getMyArtifacts](Backend_GameLogic_GameManager.default.md#getmyartifacts)
- [getMyArtifactsUpdated$](Backend_GameLogic_GameManager.default.md#getmyartifactsupdated$)
- [getMyBalance$](Backend_GameLogic_GameManager.default.md#getmybalance$)
- [getMyBalanceEth](Backend_GameLogic_GameManager.default.md#getmybalanceeth)
- [getMyPlanetMap](Backend_GameLogic_GameManager.default.md#getmyplanetmap)
- [getMyPlanets](Backend_GameLogic_GameManager.default.md#getmyplanets)
- [getMyPlanetsUpdated$](Backend_GameLogic_GameManager.default.md#getmyplanetsupdated$)
- [getMyScore](Backend_GameLogic_GameManager.default.md#getmyscore)
- [getNextBroadcastAvailableTimestamp](Backend_GameLogic_GameManager.default.md#getnextbroadcastavailabletimestamp)
- [getNextClaimAvailableTimestamp](Backend_GameLogic_GameManager.default.md#getnextclaimavailabletimestamp)
- [getNextClaimCountdownInfo](Backend_GameLogic_GameManager.default.md#getnextclaimcountdowninfo)
- [getNextRevealCountdownInfo](Backend_GameLogic_GameManager.default.md#getnextrevealcountdowninfo)
- [getNotificationsManager](Backend_GameLogic_GameManager.default.md#getnotificationsmanager)
- [getPerlinThresholds](Backend_GameLogic_GameManager.default.md#getperlinthresholds)
- [getPlanetLevel](Backend_GameLogic_GameManager.default.md#getplanetlevel)
- [getPlanetMap](Backend_GameLogic_GameManager.default.md#getplanetmap)
- [getPlanetRarity](Backend_GameLogic_GameManager.default.md#getplanetrarity)
- [getPlanetUpdated$](Backend_GameLogic_GameManager.default.md#getplanetupdated$)
- [getPlanetWithCoords](Backend_GameLogic_GameManager.default.md#getplanetwithcoords)
- [getPlanetWithId](Backend_GameLogic_GameManager.default.md#getplanetwithid)
- [getPlanetsInRange](Backend_GameLogic_GameManager.default.md#getplanetsinrange)
- [getPlanetsInWorldRectangle](Backend_GameLogic_GameManager.default.md#getplanetsinworldrectangle)
- [getPlanetsWithIds](Backend_GameLogic_GameManager.default.md#getplanetswithids)
- [getPlayer](Backend_GameLogic_GameManager.default.md#getplayer)
- [getPlayerScore](Backend_GameLogic_GameManager.default.md#getplayerscore)
- [getPrivateKey](Backend_GameLogic_GameManager.default.md#getprivatekey)
- [getProcgenUtils](Backend_GameLogic_GameManager.default.md#getprocgenutils)
- [getRevealedLocations](Backend_GameLogic_GameManager.default.md#getrevealedlocations)
- [getSignedTwitter](Backend_GameLogic_GameManager.default.md#getsignedtwitter)
- [getSilverCurveAtPercent](Backend_GameLogic_GameManager.default.md#getsilvercurveatpercent)
- [getSilverOfPlayer](Backend_GameLogic_GameManager.default.md#getsilverofplayer)
- [getStalePlanetWithId](Backend_GameLogic_GameManager.default.md#getstaleplanetwithid)
- [getTemperature](Backend_GameLogic_GameManager.default.md#gettemperature)
- [getTimeForMove](Backend_GameLogic_GameManager.default.md#gettimeformove)
- [getTokenMintEndTimeSeconds](Backend_GameLogic_GameManager.default.md#gettokenmintendtimeseconds)
- [getTwitter](Backend_GameLogic_GameManager.default.md#gettwitter)
- [getUIEventEmitter](Backend_GameLogic_GameManager.default.md#getuieventemitter)
- [getUnconfirmedMoves](Backend_GameLogic_GameManager.default.md#getunconfirmedmoves)
- [getUnconfirmedUpgrades](Backend_GameLogic_GameManager.default.md#getunconfirmedupgrades)
- [getUnconfirmedWormholeActivations](Backend_GameLogic_GameManager.default.md#getunconfirmedwormholeactivations)
- [getUniverseTotalEnergy](Backend_GameLogic_GameManager.default.md#getuniversetotalenergy)
- [getUpgrade](Backend_GameLogic_GameManager.default.md#getupgrade)
- [getWorldRadius](Backend_GameLogic_GameManager.default.md#getworldradius)
- [getWorldSilver](Backend_GameLogic_GameManager.default.md#getworldsilver)
- [getWormholeFactors](Backend_GameLogic_GameManager.default.md#getwormholefactors)
- [getWormholes](Backend_GameLogic_GameManager.default.md#getwormholes)
- [handleTxIntent](Backend_GameLogic_GameManager.default.md#handletxintent)
- [hardRefreshArtifact](Backend_GameLogic_GameManager.default.md#hardrefreshartifact)
- [hardRefreshPlanet](Backend_GameLogic_GameManager.default.md#hardrefreshplanet)
- [hardRefreshPlayer](Backend_GameLogic_GameManager.default.md#hardrefreshplayer)
- [hasJoinedGame](Backend_GameLogic_GameManager.default.md#hasjoinedgame)
- [hasMinedChunk](Backend_GameLogic_GameManager.default.md#hasminedchunk)
- [initMiningManager](Backend_GameLogic_GameManager.default.md#initminingmanager)
- [isMining](Backend_GameLogic_GameManager.default.md#ismining)
- [isPlanetMineable](Backend_GameLogic_GameManager.default.md#isplanetmineable)
- [isRoundOver](Backend_GameLogic_GameManager.default.md#isroundover)
- [joinGame](Backend_GameLogic_GameManager.default.md#joingame)
- [loadContract](Backend_GameLogic_GameManager.default.md#loadcontract)
- [loadPlugins](Backend_GameLogic_GameManager.default.md#loadplugins)
- [locationFromCoords](Backend_GameLogic_GameManager.default.md#locationfromcoords)
- [move](Backend_GameLogic_GameManager.default.md#move)
- [onTxConfirmed](Backend_GameLogic_GameManager.default.md#ontxconfirmed)
- [onTxIntentFail](Backend_GameLogic_GameManager.default.md#ontxintentfail)
- [onTxReverted](Backend_GameLogic_GameManager.default.md#ontxreverted)
- [onTxSubmit](Backend_GameLogic_GameManager.default.md#ontxsubmit)
- [prospectPlanet](Backend_GameLogic_GameManager.default.md#prospectplanet)
- [refreshMyGPTCredits](Backend_GameLogic_GameManager.default.md#refreshmygptcredits)
- [refreshScoreboard](Backend_GameLogic_GameManager.default.md#refreshscoreboard)
- [refreshServerPlanetStates](Backend_GameLogic_GameManager.default.md#refreshserverplanetstates)
- [refreshTwitters](Backend_GameLogic_GameManager.default.md#refreshtwitters)
- [revealLocation](Backend_GameLogic_GameManager.default.md#reveallocation)
- [savePlugins](Backend_GameLogic_GameManager.default.md#saveplugins)
- [setMinerCores](Backend_GameLogic_GameManager.default.md#setminercores)
- [setMiningPattern](Backend_GameLogic_GameManager.default.md#setminingpattern)
- [setPlanetEmoji](Backend_GameLogic_GameManager.default.md#setplanetemoji)
- [setPlayerTwitters](Backend_GameLogic_GameManager.default.md#setplayertwitters)
- [setRadius](Backend_GameLogic_GameManager.default.md#setradius)
- [setSnarkCacheSize](Backend_GameLogic_GameManager.default.md#setsnarkcachesize)
- [signMessage](Backend_GameLogic_GameManager.default.md#signmessage)
- [softRefreshPlanet](Backend_GameLogic_GameManager.default.md#softrefreshplanet)
- [spaceTypeFromPerlin](Backend_GameLogic_GameManager.default.md#spacetypefromperlin)
- [spaceTypePerlin](Backend_GameLogic_GameManager.default.md#spacetypeperlin)
- [startConversation](Backend_GameLogic_GameManager.default.md#startconversation)
- [startExplore](Backend_GameLogic_GameManager.default.md#startexplore)
- [stepConversation](Backend_GameLogic_GameManager.default.md#stepconversation)
- [stopExplore](Backend_GameLogic_GameManager.default.md#stopexplore)
- [submitDisconnectTwitter](Backend_GameLogic_GameManager.default.md#submitdisconnecttwitter)
- [submitPlanetMessage](Backend_GameLogic_GameManager.default.md#submitplanetmessage)
- [submitVerifyTwitter](Backend_GameLogic_GameManager.default.md#submitverifytwitter)
- [transferOwnership](Backend_GameLogic_GameManager.default.md#transferownership)
- [updateDiagnostics](Backend_GameLogic_GameManager.default.md#updatediagnostics)
- [upgrade](Backend_GameLogic_GameManager.default.md#upgrade)
- [uploadDiagnostics](Backend_GameLogic_GameManager.default.md#uploaddiagnostics)
- [verifyMessage](Backend_GameLogic_GameManager.default.md#verifymessage)
- [waitForPlanet](Backend_GameLogic_GameManager.default.md#waitforplanet)
- [withdrawArtifact](Backend_GameLogic_GameManager.default.md#withdrawartifact)
- [withdrawSilver](Backend_GameLogic_GameManager.default.md#withdrawsilver)
- [create](Backend_GameLogic_GameManager.default.md#create)

## Constructors

### constructor

• `Private` **new default**(`terminal`, `account`, `players`, `touchedPlanets`, `allTouchedPlanetIds`, `revealedCoords`, `claimedCoords`, `worldRadius`, `unprocessedArrivals`, `unprocessedPlanetArrivalIds`, `contractsAPI`, `contractConstants`, `persistentChunkStore`, `snarkHelper`, `homeLocation`, `useMockHash`, `artifacts`, `ethConnection`, `gptCreditPriceEther`, `myGPTCredits`)

#### Parameters

| Name                          | Type                                                                                                            |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `terminal`                    | `MutableRefObject`<`undefined` \| [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md)\> |
| `account`                     | `undefined` \| `EthAddress`                                                                                     |
| `players`                     | `Map`<`string`, `Player`\>                                                                                      |
| `touchedPlanets`              | `Map`<`LocationId`, `Planet`\>                                                                                  |
| `allTouchedPlanetIds`         | `Set`<`LocationId`\>                                                                                            |
| `revealedCoords`              | `Map`<`LocationId`, `RevealedCoords`\>                                                                          |
| `claimedCoords`               | `Map`<`LocationId`, `ClaimedCoords`\>                                                                           |
| `worldRadius`                 | `number`                                                                                                        |
| `unprocessedArrivals`         | `Map`<`VoyageId`, `QueuedArrival`\>                                                                             |
| `unprocessedPlanetArrivalIds` | `Map`<`LocationId`, `VoyageId`[]\>                                                                              |
| `contractsAPI`                | [`ContractsAPI`](Backend_GameLogic_ContractsAPI.ContractsAPI.md)                                                |
| `contractConstants`           | [`ContractConstants`](../interfaces/_types_darkforest_api_ContractsAPITypes.ContractConstants.md)               |
| `persistentChunkStore`        | [`default`](Backend_Storage_PersistentChunkStore.default.md)                                                    |
| `snarkHelper`                 | [`default`](Backend_Utils_SnarkArgsHelper.default.md)                                                           |
| `homeLocation`                | `undefined` \| `WorldLocation`                                                                                  |
| `useMockHash`                 | `boolean`                                                                                                       |
| `artifacts`                   | `Map`<`ArtifactId`, `Artifact`\>                                                                                |
| `ethConnection`               | `EthConnection`                                                                                                 |
| `gptCreditPriceEther`         | `number`                                                                                                        |
| `myGPTCredits`                | `number`                                                                                                        |

#### Overrides

EventEmitter.constructor

## Properties

### account

• `Private` `Readonly` **account**: `undefined` \| `EthAddress`

The ethereum address of the player who is currently logged in. We support 'no account',
represented by `undefined` in the case when you want to simply load the game state from the
contract and view it without be able to make any moves.

---

### contractConstants

• `Private` `Readonly` **contractConstants**: [`ContractConstants`](../interfaces/_types_darkforest_api_ContractsAPITypes.ContractConstants.md)

Game parameters set by the contract. Stuff like perlin keys, which are important for mining the
correct universe, or the time multiplier, which allows us to tune how quickly voyages go.

**`todo`** move this into a separate `GameConfiguration` class.

---

### contractsAPI

• `Private` `Readonly` **contractsAPI**: [`ContractsAPI`](Backend_GameLogic_ContractsAPI.ContractsAPI.md)

Allows us to make contract calls, and execute transactions. Be careful about how you use this
guy. You don't want to cause your client to send an excessive amount of traffic to whatever
node you're connected to.

Interacting with the blockchain isn't free, and we need to be mindful about about the way our
application interacts with the blockchain. The current rate limiting strategy consists of three
points:

- data that needs to be fetched often should be fetched in bulk.
- rate limit smart contract calls (reads from the blockchain), implemented by
  {@link ContractCaller} and transactions (writes to the blockchain on behalf of the player),
  implemented by {@link TxExecutor} via two separately tuned {@link ThrottledConcurrentQueue}s.

---

### diagnostics

• `Private` **diagnostics**: `Diagnostics`

Diagnostic information about the game.

---

### diagnosticsInterval

• `Private` **diagnosticsInterval**: `Timeout`

Handle to an interval that periodically uploads diagnostic information from this client.

---

### endTimeSeconds

• `Private` `Readonly` **endTimeSeconds**: `number` = `1643587533`

**`todo`** change this to the correct timestamp each round.

---

### entityStore

• `Private` `Readonly` **entityStore**: [`GameObjects`](Backend_GameLogic_GameObjects.GameObjects.md)

This variable contains the internal state of objects that live in the game world.

---

### ethConnection

• `Private` `Readonly` **ethConnection**: `EthConnection`

An interface to the blockchain that is a little bit lower-level than [ContractsAPI](Backend_GameLogic_ContractsAPI.ContractsAPI.md). It
allows us to do basic operations such as wait for a transaction to complete, check the player's
address and balance, etc.

---

### gptCreditPriceEther

• `Private` **gptCreditPriceEther**: `number`

Price of a single gpt credit, which buys you a single interaction with the GPT-powered AI
Artifact Chat Bots.

**`todo`** move this into a new `GameConfiguration` class.

---

### gptCreditPriceEtherEmitter$

• `Private` **gptCreditPriceEtherEmitter$**: `Monomitter`<`number`\>

Whenever the price of single GPT credit changes, we emit that event here.

---

### hashConfig

• `Private` `Readonly` **hashConfig**: [`HashConfig`](../modules/_types_global_GlobalTypes.md#hashconfig)

Each round we change the hash configuration of the game. The hash configuration is download
from the blockchain, and essentially acts as a salt, permuting the universe into a unique
configuration for each new round.

**`todo`** deduplicate this and `useMockHash` somehow.

---

### hashRate

• `Private` **hashRate**: `number`

Continuously updated value representing the total hashes per second that the game is currently
mining the universe at.

**`todo`** keep this in {@link MinerManager}

---

### homeLocation

• `Private` **homeLocation**: `undefined` \| `WorldLocation`

The spawn location of the current player.

**`todo,`** make this smarter somehow. It's really annoying to have to import world coordinates, and
get them wrong or something. Maybe we need to mark a planet, once it's been initialized
contract-side, as the homeworld of the user who initialized on it. That way, when you import a
new account into the game, and you import map data that contains your home planet, the client
would be able to automatically detect which planet is the player's home planet.

**`todo`** move this into a new `PlayerState` class.

---

### minerManager

• `Private` `Optional` **minerManager**: [`default`](Backend_Miner_MinerManager.default.md)

Manages the process of mining new space territory.

---

### myGPTCredits

• `Private` **myGPTCredits**: `number`

The total amount of GPT credits that belong to the current player.

**`todo`** move this into a new `PlayerState` class.

---

### myGPTCredits$

• `Private` **myGPTCredits$**: `Monomitter`<`number`\>

Whenever the amount of the GPT credits that this player owns changes, we publish an event here.

**`todo`** move this into a new `PlayerState` class.

---

### persistentChunkStore

• `Private` `Readonly` **persistentChunkStore**: [`default`](Backend_Storage_PersistentChunkStore.default.md)

An object that syncs any newly added or deleted chunks to the player's IndexedDB.

**`todo`** it also persists other game data to IndexedDB. This class needs to be renamed `GameSaver`
or something like that.

---

### planetHashMimc

• `Private` `Readonly` **planetHashMimc**: (...`inputs`: `number`[]) => `BigInteger`

The aforementioned hash function. In debug mode where `DISABLE_ZK_CHECKS` is on, we use a
faster hash function. Othewise, in production mode, use MiMC hash (https://byt3bit.github.io/primesym/).

#### Type declaration

▸ (...`inputs`): `BigInteger`

The aforementioned hash function. In debug mode where `DISABLE_ZK_CHECKS` is on, we use a
faster hash function. Othewise, in production mode, use MiMC hash (https://byt3bit.github.io/primesym/).

##### Parameters

| Name        | Type       |
| :---------- | :--------- |
| `...inputs` | `number`[] |

##### Returns

`BigInteger`

---

### playerInterval

• `Private` **playerInterval**: `Timeout`

Handle to an interval that periodically refreshes some information about the player from the
blockchain.

**`todo`** move this into a new `PlayerState` class.

---

### players

• `Private` `Readonly` **players**: `Map`<`string`, `Player`\>

Map from ethereum addresses to player objects. This isn't stored in [GameObjects](Backend_GameLogic_GameObjects.GameObjects.md),
because it's not techincally an entity that exists in the world. A player just controls planets
and artifacts that do exist in the world.

**`todo`** move this into a new `Players` class.

---

### playersUpdated$

• `Readonly` **playersUpdated$**: `Monomitter`<`void`\>

Whenever we refresh the players twitter accounts or scores, we publish an event here.

---

### scoreboardInterval

• `Private` **scoreboardInterval**: `Timeout`

Handle to an interval that periodically refreshes the scoreboard from our webserver.

---

### settingsSubscription

• `Private` **settingsSubscription**: `undefined` \| `Subscription`

Subscription to act on setting changes

---

### snarkHelper

• `Private` `Readonly` **snarkHelper**: [`default`](Backend_Utils_SnarkArgsHelper.default.md)

Responsible for generating snark proofs.

---

### terminal

• `Private` `Readonly` **terminal**: `MutableRefObject`<`undefined` \| [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md)\>

Kind of hacky, but we store a reference to the terminal that the player sees when the initially
load into the game. This is the same exact terminal that appears inside the collapsable right
bar of the game.

---

### useMockHash

• `Private` `Readonly` **useMockHash**: `boolean`

In debug builds of the game, we can connect to a set of contracts deployed to a local
blockchain, which are tweaked to not verify planet hashes, meaning we can use a faster hash
function with similar properties to mimc. This allows us to mine the map faster in debug mode.

**`todo`** move this into a separate `GameConfiguration` class.

---

### worldRadius

• `Private` **worldRadius**: `number`

Sometimes the universe gets bigger... Sometimes it doesn't.

**`todo`** move this into a new `GameConfiguration` class.

## Accessors

### planetRarity

• `get` **planetRarity**(): `number`

#### Returns

`number`

## Methods

### activateArtifact

▸ **activateArtifact**(`locationId`, `artifactId`, `wormholeTo`, `bypassChecks?`): [`default`](Backend_GameLogic_GameManager.default.md)

#### Parameters

| Name           | Type                        | Default value |
| :------------- | :-------------------------- | :------------ |
| `locationId`   | `LocationId`                | `undefined`   |
| `artifactId`   | `ArtifactId`                | `undefined`   |
| `wormholeTo`   | `undefined` \| `LocationId` | `undefined`   |
| `bypassChecks` | `boolean`                   | `false`       |

#### Returns

[`default`](Backend_GameLogic_GameManager.default.md)

---

### addAccount

▸ **addAccount**(`coords`): `Promise`<`boolean`\>

Initializes a new player's game to start at the given home planet. Must have already
initialized the player on the contract.

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |

#### Returns

`Promise`<`boolean`\>

---

### addNewChunk

▸ **addNewChunk**(`chunk`): [`default`](Backend_GameLogic_GameManager.default.md)

Makes this game manager aware of a new chunk - which includes its location, size,
as well as all of the planets contained in that chunk. Causes the client to load
all of the information about those planets from the blockchain.

#### Parameters

| Name    | Type                                          |
| :------ | :-------------------------------------------- |
| `chunk` | [`Chunk`](_types_global_GlobalTypes.Chunk.md) |

#### Returns

[`default`](Backend_GameLogic_GameManager.default.md)

---

### biomebasePerlin

▸ **biomebasePerlin**(`coords`, `floor`): `number`

Gets the biome perlin valie at the given location in the world.

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |
| `floor`  | `boolean`     |

#### Returns

`number`

---

### bulkAddNewChunks

▸ **bulkAddNewChunks**(`chunks`): `Promise`<`void`\>

To add multiple chunks at once, use this function rather than `addNewChunk`, in order
to load all of the associated planet data in an efficient manner.

#### Parameters

| Name     | Type                                            |
| :------- | :---------------------------------------------- |
| `chunks` | [`Chunk`](_types_global_GlobalTypes.Chunk.md)[] |

#### Returns

`Promise`<`void`\>

---

### bulkHardRefreshPlanets

▸ `Private` **bulkHardRefreshPlanets**(`planetIds`): `Promise`<`void`\>

#### Parameters

| Name        | Type           |
| :---------- | :------------- |
| `planetIds` | `LocationId`[] |

#### Returns

`Promise`<`void`\>

---

### buyGPTCredits

▸ **buyGPTCredits**(`amount`): [`default`](Backend_GameLogic_GameManager.default.md)

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `amount` | `number` |

#### Returns

[`default`](Backend_GameLogic_GameManager.default.md)

---

### buyHat

▸ **buyHat**(`planetId`, `_bypassChecks?`): [`default`](Backend_GameLogic_GameManager.default.md)

Submits a transaction to the blockchain to buy a hat for the given planet. You
must own the planet. Warning costs real xdai. Hats are permanently locked to a
planet. They are purely cosmetic and a great way to BM your opponents or just
look your best. Just like in the real world, more money means more hat.

#### Parameters

| Name            | Type         | Default value |
| :-------------- | :----------- | :------------ |
| `planetId`      | `LocationId` | `undefined`   |
| `_bypassChecks` | `boolean`    | `false`       |

#### Returns

[`default`](Backend_GameLogic_GameManager.default.md)

---

### checkGameHasEnded

▸ `Private` **checkGameHasEnded**(): `boolean`

#### Returns

`boolean`

---

### claimLocation

▸ **claimLocation**(`planetId`): [`default`](Backend_GameLogic_GameManager.default.md)

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

[`default`](Backend_GameLogic_GameManager.default.md)

---

### clearEmoji

▸ **clearEmoji**(`locationId`): `Promise`<`void`\>

If you are the owner of this planet, you can delete the emoji that is hovering above the
planet.

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `locationId` | `LocationId` |

#### Returns

`Promise`<`void`\>

---

### deactivateArtifact

▸ **deactivateArtifact**(`locationId`, `artifactId`, `bypassChecks?`): `undefined` \| [`default`](Backend_GameLogic_GameManager.default.md)

#### Parameters

| Name           | Type         | Default value |
| :------------- | :----------- | :------------ |
| `locationId`   | `LocationId` | `undefined`   |
| `artifactId`   | `ArtifactId` | `undefined`   |
| `bypassChecks` | `boolean`    | `false`       |

#### Returns

`undefined` \| [`default`](Backend_GameLogic_GameManager.default.md)

---

### depositArtifact

▸ **depositArtifact**(`locationId`, `artifactId`, `bypassChecks?`): [`default`](Backend_GameLogic_GameManager.default.md)

Submits a transaction to the blockchain to deposit an artifact on a given planet.
You must own the planet and you must own the artifact directly (can't be locked in contract)

#### Parameters

| Name           | Type         | Default value |
| :------------- | :----------- | :------------ |
| `locationId`   | `LocationId` | `undefined`   |
| `artifactId`   | `ArtifactId` | `undefined`   |
| `bypassChecks` | `boolean`    | `true`        |

#### Returns

[`default`](Backend_GameLogic_GameManager.default.md)

---

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

---

### findArtifact

▸ **findArtifact**(`planetId`, `bypassChecks?`): [`default`](Backend_GameLogic_GameManager.default.md)

Calls the contract to find an artifact on the given planet.

#### Parameters

| Name           | Type         | Default value |
| :------------- | :----------- | :------------ |
| `planetId`     | `LocationId` | `undefined`   |
| `bypassChecks` | `boolean`    | `false`       |

#### Returns

[`default`](Backend_GameLogic_GameManager.default.md)

---

### findRandomHomePlanet

▸ `Private` **findRandomHomePlanet**(): `Promise`<`LocatablePlanet`\>

#### Returns

`Promise`<`LocatablePlanet`\>

---

### getAccount

▸ **getAccount**(): `undefined` \| `EthAddress`

Gets the address of the player logged into this game manager.

#### Returns

`undefined` \| `EthAddress`

---

### getActiveArtifact

▸ **getActiveArtifact**(`planet`): `undefined` \| `Artifact`

Gets the active artifact on this planet, if one exists.

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`undefined` \| `Artifact`

---

### getAllOwnedPlanets

▸ **getAllOwnedPlanets**(): `Planet`[]

Gets a list of planets that have an owner.

#### Returns

`Planet`[]

---

### getAllPlanets

▸ **getAllPlanets**(): `Iterable`<`Planet`\>

Gets all planets. This means all planets that are in the contract, and also all
planets that have been mined locally. Does not update planets if they are stale.
NOT PERFORMANT - for scripting only.

#### Returns

`Iterable`<`Planet`\>

---

### getAllPlayers

▸ **getAllPlayers**(): `Player`[]

Gets a list of all the players in the game (not just the ones you've
encounterd)

#### Returns

`Player`[]

---

### getAllVoyages

▸ **getAllVoyages**(): `QueuedArrival`[]

Gets all voyages that have not completed.

#### Returns

`QueuedArrival`[]

---

### getArtifactMap

▸ **getArtifactMap**(): `Map`<`ArtifactId`, `Artifact`\>

Return a reference to the artifact map

#### Returns

`Map`<`ArtifactId`, `Artifact`\>

---

### getArtifactUpdated$

▸ **getArtifactUpdated$**(): `Monomitter`<`ArtifactId`\>

#### Returns

`Monomitter`<`ArtifactId`\>

---

### getArtifactWithId

▸ **getArtifactWithId**(`artifactId`): `undefined` \| `Artifact`

Gets the artifact with the given id. Null if no artifact with id exists.

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `artifactId` | `ArtifactId` |

#### Returns

`undefined` \| `Artifact`

---

### getArtifactsWithIds

▸ **getArtifactsWithIds**(`artifactIds`): (`undefined` \| `Artifact`)[]

Gets the artifacts with the given ids, including ones we know exist but haven't been loaded,
represented by `undefined`.

#### Parameters

| Name          | Type           |
| :------------ | :------------- |
| `artifactIds` | `ArtifactId`[] |

#### Returns

(`undefined` \| `Artifact`)[]

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

### getChunkStore

▸ **getChunkStore**(): [`default`](Backend_Storage_PersistentChunkStore.default.md)

#### Returns

[`default`](Backend_Storage_PersistentChunkStore.default.md)

---

### getClaimedLocations

▸ **getClaimedLocations**(): `Map`<`LocationId`, `ClaimedLocation`\>

Gets a map of all location IDs which have been claimed.

#### Returns

`Map`<`LocationId`, `ClaimedLocation`\>

---

### getConstructors

▸ **getConstructors**(): `Object`

Returns constructors of classes that may be useful for developing plugins.

#### Returns

`Object`

| Name                   | Type                                                                                  |
| :--------------------- | :------------------------------------------------------------------------------------ |
| `MinerManager`         | typeof [`default`](Backend_Miner_MinerManager.default.md)                             |
| `SpiralPattern`        | typeof [`SpiralPattern`](Backend_Miner_MiningPatterns.SpiralPattern.md)               |
| `SwissCheesePattern`   | typeof [`SwissCheesePattern`](Backend_Miner_MiningPatterns.SwissCheesePattern.md)     |
| `TowardsCenterPattern` | typeof [`TowardsCenterPattern`](Backend_Miner_MiningPatterns.TowardsCenterPattern.md) |

---

### getContractAddress

▸ **getContractAddress**(): `EthAddress`

Gets the address of the `DarkForestCore` contract, which is essentially
the 'backend' of the game.

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

Gets the GPT conversation with an artifact; undefined if there is none so far

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `artifactId` | `ArtifactId` |

#### Returns

`Promise`<`undefined` \| `Conversation`\>

---

### getCurrentlyExploringChunk

▸ **getCurrentlyExploringChunk**(): `undefined` \| [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md)

Gets the rectangle bounding the chunk that the miner is currently in the process
of hashing.

#### Returns

`undefined` \| [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md)

---

### getDiagnostics

▸ **getDiagnostics**(): `Diagnostics`

Gets some diagnostic information about the game. Returns a copy, you can't modify it.

#### Returns

`Diagnostics`

---

### getDist

▸ **getDist**(`fromId`, `toId`): `number`

Gets the distance between two planets. Throws an exception if you don't
know the location of either planet. Takes into account wormholes.

#### Parameters

| Name     | Type         |
| :------- | :----------- |
| `fromId` | `LocationId` |
| `toId`   | `LocationId` |

#### Returns

`number`

---

### getDistCoords

▸ **getDistCoords**(`fromCoords`, `toCoords`): `number`

Gets the distance between two coordinates in space.

#### Parameters

| Name         | Type          |
| :----------- | :------------ |
| `fromCoords` | `WorldCoords` |
| `toCoords`   | `WorldCoords` |

#### Returns

`number`

---

### getEndTimeSeconds

▸ **getEndTimeSeconds**(): `number`

The game ends at a particular time in the future - get this time measured
in seconds from the epoch.

#### Returns

`number`

---

### getEnergyArrivingForMove

▸ **getEnergyArrivingForMove**(`fromId`, `toId`, `distance`, `sentEnergy`): `number`

Gets the amount of energy that would arrive if a voyage with the given parameters
was to occur. The toPlanet is optional, in case you want an estimate that doesn't include
wormhole speedups.

#### Parameters

| Name         | Type                        |
| :----------- | :-------------------------- |
| `fromId`     | `LocationId`                |
| `toId`       | `undefined` \| `LocationId` |
| `distance`   | `undefined` \| `number`     |
| `sentEnergy` | `number`                    |

#### Returns

`number`

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

### getEnergyNeededForMove

▸ **getEnergyNeededForMove**(`fromId`, `toId`, `arrivingEnergy`): `number`

Gets the amount of energy needed in order for a voyage from the given to the given
planet to arrive with your desired amount of energy.

#### Parameters

| Name             | Type         |
| :--------------- | :----------- |
| `fromId`         | `LocationId` |
| `toId`           | `LocationId` |
| `arrivingEnergy` | `number`     |

#### Returns

`number`

---

### getEnergyOfPlayer

▸ **getEnergyOfPlayer**(`player`): `number`

Gets the total amount of energy that lives on planets that the given player owns.

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

Gets all the map chunks that this client is aware of. Chunks may have come from
mining, or from importing map data.

#### Returns

`Iterable`<[`Chunk`](_types_global_GlobalTypes.Chunk.md)\>

---

### getGameObjects

▸ **getGameObjects**(): [`GameObjects`](Backend_GameLogic_GameObjects.GameObjects.md)

Gets a reference to the game's internal representation of the world state. This includes
voyages, planets, artifacts, and active wormholes,

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

Gets the HASH CONFIG

#### Returns

[`HashConfig`](../modules/_types_global_GlobalTypes.md#hashconfig)

---

### getHashesPerSec

▸ **getHashesPerSec**(): `number`

Gets the amount of hashes per second that the miner manager is calculating.

#### Returns

`number`

---

### getHomeCoords

▸ **getHomeCoords**(): `undefined` \| `WorldCoords`

Gets the location of your home planet.

#### Returns

`undefined` \| `WorldCoords`

---

### getHomeHash

▸ **getHomeHash**(): `undefined` \| `LocationId`

Gets the hash of the location of your home planet.

#### Returns

`undefined` \| `LocationId`

---

### getIsBuyingCreditsEmitter

▸ **getIsBuyingCreditsEmitter**(): `Monomitter`<`boolean`\>

#### Returns

`Monomitter`<`boolean`\>

---

### getLocationOfPlanet

▸ **getLocationOfPlanet**(`planetId`): `undefined` \| `WorldLocation`

Gets the location of the given planet. Returns undefined if the planet does not exist, or if
we do not know the location of this planet NOT update the planet if the planet is stale,
which means this function is fast.

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`undefined` \| `WorldLocation`

---

### getMaxMoveDist

▸ **getMaxMoveDist**(`planetId`, `sendingPercent`): `number`

Gets the maximuim distance that you can send your energy from the given planet,
using the given percentage of that planet's current silver.

#### Parameters

| Name             | Type         |
| :--------------- | :----------- |
| `planetId`       | `LocationId` |
| `sendingPercent` | `number`     |

#### Returns

`number`

---

### getMiningPattern

▸ **getMiningPattern**(): `undefined` \| [`MiningPattern`](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md)

Gets the mining pattern that the miner is currently using.

#### Returns

`undefined` \| [`MiningPattern`](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md)

---

### getMyArtifactMap

▸ **getMyArtifactMap**(): `Map`<`ArtifactId`, `Artifact`\>

Return a reference to the map of my artifacts

#### Returns

`Map`<`ArtifactId`, `Artifact`\>

---

### getMyArtifacts

▸ **getMyArtifacts**(): `Artifact`[]

gets both deposited artifacts that are on planets i own as well as artifacts i own

#### Returns

`Artifact`[]

---

### getMyArtifactsUpdated$

▸ **getMyArtifactsUpdated$**(): `Monomitter`<`Map`<`ArtifactId`, `Artifact`\>\>

#### Returns

`Monomitter`<`Map`<`ArtifactId`, `Artifact`\>\>

---

### getMyBalance$

▸ **getMyBalance$**(): `Monomitter`<`BigNumber`\>

Returns the monomitter which publishes events whenever the player's balance changes.

#### Returns

`Monomitter`<`BigNumber`\>

---

### getMyBalanceEth

▸ **getMyBalanceEth**(): `number`

Gets the balance of the account

#### Returns

`number`

---

### getMyPlanetMap

▸ **getMyPlanetMap**(): `Map`<`LocationId`, `Planet`\>

Return a reference to the map of my planets

#### Returns

`Map`<`LocationId`, `Planet`\>

---

### getMyPlanets

▸ **getMyPlanets**(): `Planet`[]

Gets a list of the planets that the player logged into this `GameManager` owns.

#### Returns

`Planet`[]

---

### getMyPlanetsUpdated$

▸ **getMyPlanetsUpdated$**(): `Monomitter`<`Map`<`LocationId`, `Planet`\>\>

#### Returns

`Monomitter`<`Map`<`LocationId`, `Planet`\>\>

---

### getMyScore

▸ **getMyScore**(): `undefined` \| `number`

Get the score of the currently logged-in account.

#### Returns

`undefined` \| `number`

---

### getNextBroadcastAvailableTimestamp

▸ **getNextBroadcastAvailableTimestamp**(): `number`

Gets the timestamp (ms) of the next time that we can broadcast the coordinates of a planet.

#### Returns

`number`

---

### getNextClaimAvailableTimestamp

▸ **getNextClaimAvailableTimestamp**(): `number`

Gets the timestamp (ms) of the next time that we can claim a planet.

#### Returns

`number`

---

### getNextClaimCountdownInfo

▸ **getNextClaimCountdownInfo**(): [`ClaimCountdownInfo`](../interfaces/_types_global_GlobalTypes.ClaimCountdownInfo.md)

Returns info about the next time you can claim a Planet

#### Returns

[`ClaimCountdownInfo`](../interfaces/_types_global_GlobalTypes.ClaimCountdownInfo.md)

---

### getNextRevealCountdownInfo

▸ **getNextRevealCountdownInfo**(): [`RevealCountdownInfo`](../interfaces/_types_global_GlobalTypes.RevealCountdownInfo.md)

Returns info about the next time you can broadcast coordinates

#### Returns

[`RevealCountdownInfo`](../interfaces/_types_global_GlobalTypes.RevealCountdownInfo.md)

---

### getNotificationsManager

▸ **getNotificationsManager**(): [`default`](Frontend_Game_NotificationManager.default.md)

#### Returns

[`default`](Frontend_Game_NotificationManager.default.md)

---

### getPerlinThresholds

▸ **getPerlinThresholds**(): [`number`, `number`, `number`]

The perlin value at each coordinate determines the space type. There are four space
types, which means there are four ranges on the number line that correspond to
each space type. This function returns the boundary values between each of these
four ranges: `PERLIN_THRESHOLD_1`, `PERLIN_THRESHOLD_2`, `PERLIN_THRESHOLD_3`.

#### Returns

[`number`, `number`, `number`]

---

### getPlanetLevel

▸ **getPlanetLevel**(`planetId`): `undefined` \| `PlanetLevel`

Gets the level of the given planet. Returns undefined if the planet does not exist. Does
NOT update the planet if the planet is stale, which means this function is fast.

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`undefined` \| `PlanetLevel`

---

### getPlanetMap

▸ **getPlanetMap**(): `Map`<`LocationId`, `Planet`\>

Return a reference to the planet map

#### Returns

`Map`<`LocationId`, `Planet`\>

---

### getPlanetRarity

▸ **getPlanetRarity**(): `number`

Gets the rarity of planets in the universe

#### Returns

`number`

---

### getPlanetUpdated$

▸ **getPlanetUpdated$**(): `Monomitter`<`LocationId`\>

#### Returns

`Monomitter`<`LocationId`\>

---

### getPlanetWithCoords

▸ **getPlanetWithCoords**(`coords`): `undefined` \| `LocatablePlanet`

Gets the planet that is located at the given coordinates. Returns undefined if not a valid
location or if no planet exists at location. If the planet needs to be updated (because
some time has passed since we last updated the planet), then updates that planet first.

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |

#### Returns

`undefined` \| `LocatablePlanet`

---

### getPlanetWithId

▸ **getPlanetWithId**(`planetId`): `undefined` \| `Planet`

Gets the planet with the given hash. Returns undefined if the planet is neither in the contract
nor has been discovered locally. If the planet needs to be updated (because some time has
passed since we last updated the planet), then updates that planet first.

#### Parameters

| Name       | Type                        |
| :--------- | :-------------------------- |
| `planetId` | `undefined` \| `LocationId` |

#### Returns

`undefined` \| `Planet`

---

### getPlanetsInRange

▸ **getPlanetsInRange**(`planetId`, `sendingPercent`): `Planet`[]

Gets all the planets that you can reach with at least 1 energy from
the given planet. Does not take into account wormholes.

#### Parameters

| Name             | Type         |
| :--------------- | :----------- |
| `planetId`       | `LocationId` |
| `sendingPercent` | `number`     |

#### Returns

`Planet`[]

---

### getPlanetsInWorldRectangle

▸ **getPlanetsInWorldRectangle**(`worldX`, `worldY`, `worldWidth`, `worldHeight`, `levels`, `planetLevelToRadii`, `updateIfStale?`): `LocatablePlanet`[]

Gets the ids of all the planets that are both within the given bounding box (defined by its bottom
left coordinate, width, and height) in the world and of a level that was passed in via the
`planetLevels` parameter.

#### Parameters

| Name                 | Type                                                                                   | Default value |
| :------------------- | :------------------------------------------------------------------------------------- | :------------ |
| `worldX`             | `number`                                                                               | `undefined`   |
| `worldY`             | `number`                                                                               | `undefined`   |
| `worldWidth`         | `number`                                                                               | `undefined`   |
| `worldHeight`        | `number`                                                                               | `undefined`   |
| `levels`             | `number`[]                                                                             | `undefined`   |
| `planetLevelToRadii` | `Map`<`number`, [`Radii`](../interfaces/Backend_GameLogic_ViewportEntities.Radii.md)\> | `undefined`   |
| `updateIfStale`      | `boolean`                                                                              | `true`        |

#### Returns

`LocatablePlanet`[]

---

### getPlanetsWithIds

▸ **getPlanetsWithIds**(`planetId`): `Planet`[]

Gets a list of planets in the client's memory with the given ids. If a planet with the given id
doesn't exist, no entry for that planet will be returned in the result.

#### Parameters

| Name       | Type           |
| :--------- | :------------- |
| `planetId` | `LocationId`[] |

#### Returns

`Planet`[]

---

### getPlayer

▸ **getPlayer**(`address?`): `undefined` \| `Player`

Gets either the given player, or if no address was provided, gets the player that is logged
this client.

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `address?` | `EthAddress` |

#### Returns

`undefined` \| `Player`

---

### getPlayerScore

▸ **getPlayerScore**(`addr`): `undefined` \| `number`

#### Parameters

| Name   | Type         |
| :----- | :----------- |
| `addr` | `EthAddress` |

#### Returns

`undefined` \| `number`

---

### getPrivateKey

▸ **getPrivateKey**(): `undefined` \| `string`

Gets the private key of the burner wallet used by this account.

#### Returns

`undefined` \| `string`

---

### getProcgenUtils

▸ **getProcgenUtils**(): typeof [`ProcgenUtils`](Backend_Procedural_ProcgenUtils.ProcgenUtils.md)

Helpful functions for getting the names, descriptions, and colors of in-game entities.

#### Returns

typeof [`ProcgenUtils`](Backend_Procedural_ProcgenUtils.ProcgenUtils.md)

---

### getRevealedLocations

▸ **getRevealedLocations**(): `Map`<`LocationId`, `RevealedLocation`\>

Gets a map of all location IDs whose coords have been publically revealed

#### Returns

`Map`<`LocationId`, `RevealedLocation`\>

---

### getSignedTwitter

▸ **getSignedTwitter**(`twitter`): `Promise`<`string`\>

Signs the given twitter handle with the private key of the current user. Used to
verify that the person who owns the Dark Forest account was the one that attempted
to link a twitter to their account.

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `twitter` | `string` |

#### Returns

`Promise`<`string`\>

---

### getSilverCurveAtPercent

▸ **getSilverCurveAtPercent**(`planet`, `percent`): `undefined` \| `number`

returns timestamp (seconds) that planet will reach percent% of silcap if
doesn't produce silver, returns undefined if already over percent% of silcap,

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

Gets the total amount of silver that lives on planets that the given player owns.

#### Parameters

| Name     | Type         |
| :------- | :----------- |
| `player` | `EthAddress` |

#### Returns

`number`

---

### getStalePlanetWithId

▸ **getStalePlanetWithId**(`planetId`): `undefined` \| `Planet`

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`undefined` \| `Planet`

---

### getTemperature

▸ **getTemperature**(`coords`): `number`

Gets the temperature of a given location.

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |

#### Returns

`number`

---

### getTimeForMove

▸ **getTimeForMove**(`fromId`, `toId`): `number`

Gets the amount of time, in seconds that a voyage between from the first to the
second planet would take.

#### Parameters

| Name     | Type         |
| :------- | :----------- |
| `fromId` | `LocationId` |
| `toId`   | `LocationId` |

#### Returns

`number`

---

### getTokenMintEndTimeSeconds

▸ **getTokenMintEndTimeSeconds**(): `number`

Dark Forest tokens can only be minted up to a certain time - get this time measured in seconds from epoch.

#### Returns

`number`

---

### getTwitter

▸ **getTwitter**(`address`): `undefined` \| `string`

Gets the twitter handle of the given ethereum account which is associated
with Dark Forest.

#### Parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `address` | `undefined` \| `EthAddress` |

#### Returns

`undefined` \| `string`

---

### getUIEventEmitter

▸ **getUIEventEmitter**(): [`default`](Frontend_Utils_UIEmitter.default.md)

Helpful for listening to user input events.

#### Returns

[`default`](Frontend_Utils_UIEmitter.default.md)

---

### getUnconfirmedMoves

▸ **getUnconfirmedMoves**(): `UnconfirmedMove`[]

Gets all moves that this client has queued to be uploaded to the contract, but
have not been successfully confirmed yet.

#### Returns

`UnconfirmedMove`[]

---

### getUnconfirmedUpgrades

▸ **getUnconfirmedUpgrades**(): `UnconfirmedUpgrade`[]

Gets all upgrades that this client has queued to be uploaded to the contract, but
have not been successfully confirmed yet.

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

Gets the total amount of energy that lives on a planet that somebody owns.

#### Returns

`number`

---

### getUpgrade

▸ **getUpgrade**(`branch`, `level`): `Upgrade`

Returns the upgrade that would be applied to a planet given a particular
upgrade branch (defense, range, speed) and level of upgrade.

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `branch` | `number` |
| `level`  | `number` |

#### Returns

`Upgrade`

---

### getWorldRadius

▸ **getWorldRadius**(): `number`

Gets the radius of the playable area of the universe.

#### Returns

`number`

---

### getWorldSilver

▸ **getWorldSilver**(): `number`

Gets the total amount of silver that lives on a planet that somebody owns.

#### Returns

`number`

---

### getWormholeFactors

▸ **getWormholeFactors**(`fromPlanet`, `toPlanet`): `undefined` \| { `distanceFactor`: `number` ; `speedFactor`: `number` }

If there's an active artifact on either of these planets which happens to be a wormhole which
is active and targetting the other planet, return the wormhole boost which is greater. Values
represent a multiplier.

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `fromPlanet` | `Planet` |
| `toPlanet`   | `Planet` |

#### Returns

`undefined` \| { `distanceFactor`: `number` ; `speedFactor`: `number` }

---

### getWormholes

▸ **getWormholes**(): `Iterable`<[`Wormhole`](../modules/_types_global_GlobalTypes.md#wormhole)\>

#### Returns

`Iterable`<[`Wormhole`](../modules/_types_global_GlobalTypes.md#wormhole)\>

---

### handleTxIntent

▸ `Private` **handleTxIntent**(`txIntent`): `void`

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `txIntent` | `TxIntent` |

#### Returns

`void`

---

### hardRefreshArtifact

▸ `Private` **hardRefreshArtifact**(`artifactId`): `Promise`<`void`\>

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `artifactId` | `ArtifactId` |

#### Returns

`Promise`<`void`\>

---

### hardRefreshPlanet

▸ `Private` **hardRefreshPlanet**(`planetId`): `Promise`<`void`\>

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`Promise`<`void`\>

---

### hardRefreshPlayer

▸ `Private` **hardRefreshPlayer**(`address`): `Promise`<`void`\>

#### Parameters

| Name      | Type         |
| :-------- | :----------- |
| `address` | `EthAddress` |

#### Returns

`Promise`<`void`\>

---

### hasJoinedGame

▸ **hasJoinedGame**(): `boolean`

Whether or not this client has successfully found and landed on a home planet.

#### Returns

`boolean`

---

### hasMinedChunk

▸ **hasMinedChunk**(`chunkLocation`): `boolean`

Whether or not the given rectangle has been mined.

#### Parameters

| Name            | Type                                                                |
| :-------------- | :------------------------------------------------------------------ |
| `chunkLocation` | [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md) |

#### Returns

`boolean`

---

### initMiningManager

▸ `Private` **initMiningManager**(`homeCoords`, `cores?`): `void`

#### Parameters

| Name         | Type          |
| :----------- | :------------ |
| `homeCoords` | `WorldCoords` |
| `cores?`     | `number`      |

#### Returns

`void`

---

### isMining

▸ **isMining**(): `boolean`

Whether or not the miner is currently exploring space.

#### Returns

`boolean`

---

### isPlanetMineable

▸ **isPlanetMineable**(`p`): `boolean`

Whether or not the given planet is capable of minting an artifact.

#### Parameters

| Name | Type     |
| :--- | :------- |
| `p`  | `Planet` |

#### Returns

`boolean`

---

### isRoundOver

▸ **isRoundOver**(): `boolean`

Returns whether or not the current round has ended.

#### Returns

`boolean`

---

### joinGame

▸ **joinGame**(`beforeRetry`): [`default`](Backend_GameLogic_GameManager.default.md)

Attempts to join the game. Should not be called once you've already joined.

#### Parameters

| Name          | Type                                    |
| :------------ | :-------------------------------------- |
| `beforeRetry` | (`e`: `Error`) => `Promise`<`boolean`\> |

#### Returns

[`default`](Backend_GameLogic_GameManager.default.md)

---

### loadContract

▸ **loadContract**<`T`\>(`contractAddress`, `contractABI`): `Promise`<`T`\>

Returns an instance of a `Contract` from the ethersjs library. This is the library we use to
connect to the blockchain. For documentation about how `Contract` works, see:
https://docs.ethers.io/v5/api/contract/contract/

Also, registers your contract in the system to make calls against it and to reload it when
necessary (such as the RPC endpoint changing).

#### Type parameters

| Name | Type                     |
| :--- | :----------------------- |
| `T`  | extends `Contract`<`T`\> |

#### Parameters

| Name              | Type                |
| :---------------- | :------------------ |
| `contractAddress` | `string`            |
| `contractABI`     | `ContractInterface` |

#### Returns

`Promise`<`T`\>

---

### loadPlugins

▸ **loadPlugins**(): `Promise`<[`SerializedPlugin`](../interfaces/Backend_Plugins_SerializedPlugin.SerializedPlugin.md)[]\>

Load the serialized versions of all the plugins that this player has.

#### Returns

`Promise`<[`SerializedPlugin`](../interfaces/Backend_Plugins_SerializedPlugin.SerializedPlugin.md)[]\>

---

### locationFromCoords

▸ `Private` **locationFromCoords**(`coords`): `WorldLocation`

computes the WorldLocation object corresponding to a set of coordinates
very slow since it actually calculates the hash; do not use in render loop

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |

#### Returns

`WorldLocation`

---

### move

▸ **move**(`from`, `to`, `forces`, `silver`, `artifactMoved?`, `bypassChecks?`): [`default`](Backend_GameLogic_GameManager.default.md)

Submits a transaction to the blockchain to move the given amount of resources from
the given planet to the given planet.

#### Parameters

| Name             | Type         | Default value |
| :--------------- | :----------- | :------------ |
| `from`           | `LocationId` | `undefined`   |
| `to`             | `LocationId` | `undefined`   |
| `forces`         | `number`     | `undefined`   |
| `silver`         | `number`     | `undefined`   |
| `artifactMoved?` | `ArtifactId` | `undefined`   |
| `bypassChecks`   | `boolean`    | `false`       |

#### Returns

[`default`](Backend_GameLogic_GameManager.default.md)

---

### onTxConfirmed

▸ `Private` **onTxConfirmed**(`unminedTx`): `void`

#### Parameters

| Name        | Type          |
| :---------- | :------------ |
| `unminedTx` | `SubmittedTx` |

#### Returns

`void`

---

### onTxIntentFail

▸ `Private` **onTxIntentFail**(`txIntent`, `e`): `void`

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `txIntent` | `TxIntent` |
| `e`        | `Error`    |

#### Returns

`void`

---

### onTxReverted

▸ `Private` **onTxReverted**(`unminedTx`): `void`

#### Parameters

| Name        | Type          |
| :---------- | :------------ |
| `unminedTx` | `SubmittedTx` |

#### Returns

`void`

---

### onTxSubmit

▸ `Private` **onTxSubmit**(`unminedTx`): `void`

#### Parameters

| Name        | Type          |
| :---------- | :------------ |
| `unminedTx` | `SubmittedTx` |

#### Returns

`void`

---

### prospectPlanet

▸ **prospectPlanet**(`planetId`, `bypassChecks?`): `Promise`<`undefined` \| [`default`](Backend_GameLogic_GameManager.default.md)\>

#### Parameters

| Name           | Type         | Default value |
| :------------- | :----------- | :------------ |
| `planetId`     | `LocationId` | `undefined`   |
| `bypassChecks` | `boolean`    | `false`       |

#### Returns

`Promise`<`undefined` \| [`default`](Backend_GameLogic_GameManager.default.md)\>

---

### refreshMyGPTCredits

▸ `Private` **refreshMyGPTCredits**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

---

### refreshScoreboard

▸ `Private` **refreshScoreboard**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

---

### refreshServerPlanetStates

▸ **refreshServerPlanetStates**(`planetIds`): `Promise`<`void`\>

We have two locations which planet state can live: on the server, and on the blockchain. We use
the blockchain for the 'physics' of the universe, and the webserver for optional 'add-on'
features, which are cryptographically secure, but live off-chain.

This function loads the planet states which live on the server. Plays nicely with our
notifications system and sets the appropriate loading state values on the planet.

#### Parameters

| Name        | Type           |
| :---------- | :------------- |
| `planetIds` | `LocationId`[] |

#### Returns

`Promise`<`void`\>

---

### refreshTwitters

▸ `Private` **refreshTwitters**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

---

### revealLocation

▸ **revealLocation**(`planetId`): [`default`](Backend_GameLogic_GameManager.default.md)

Reveals a planet's location on-chain.

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

[`default`](Backend_GameLogic_GameManager.default.md)

---

### savePlugins

▸ **savePlugins**(`savedPlugins`): `Promise`<`void`\>

Overwrites all the saved plugins to equal the given array of plugins.

#### Parameters

| Name           | Type                                                                                       |
| :------------- | :----------------------------------------------------------------------------------------- |
| `savedPlugins` | [`SerializedPlugin`](../interfaces/Backend_Plugins_SerializedPlugin.SerializedPlugin.md)[] |

#### Returns

`Promise`<`void`\>

---

### setMinerCores

▸ **setMinerCores**(`nCores`): `void`

Set the amount of cores to mine the universe with. More cores equals faster!

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `nCores` | `number` |

#### Returns

`void`

---

### setMiningPattern

▸ **setMiningPattern**(`pattern`): `void`

Sets the mining pattern of the miner. This kills the old miner and starts this one.

#### Parameters

| Name      | Type                                                                           |
| :-------- | :----------------------------------------------------------------------------- |
| `pattern` | [`MiningPattern`](../interfaces/Backend_Miner_MiningPatterns.MiningPattern.md) |

#### Returns

`void`

---

### setPlanetEmoji

▸ **setPlanetEmoji**(`locationId`, `emojiStr`): `Promise`<`void`\>

If you are the owner of this planet, you can set an 'emoji' to hover above the planet.
`emojiStr` must be a string that contains a single emoji, otherwise this function will throw an
error.

The emoji is stored off-chain in a postgres database. We verify planet ownership via a contract
call from the webserver, and by verifying that the request to add (or remove) an emoji from a
planet was signed by the owner.

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `locationId` | `LocationId` |
| `emojiStr`   | `string`     |

#### Returns

`Promise`<`void`\>

---

### setPlayerTwitters

▸ `Private` **setPlayerTwitters**(`twitters`): `void`

#### Parameters

| Name       | Type                                                                                               |
| :--------- | :------------------------------------------------------------------------------------------------- |
| `twitters` | [`AddressTwitterMap`](../modules/_types_darkforest_api_UtilityServerAPITypes.md#addresstwittermap) |

#### Returns

`void`

---

### setRadius

▸ `Private` **setRadius**(`worldRadius`): `void`

#### Parameters

| Name          | Type     |
| :------------ | :------- |
| `worldRadius` | `number` |

#### Returns

`void`

---

### setSnarkCacheSize

▸ **setSnarkCacheSize**(`size`): `void`

Changes the amount of move snark proofs that are cached.

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `size` | `number` |

#### Returns

`void`

---

### signMessage

▸ `Private` **signMessage**<`T`\>(`obj`): `Promise`<`SignedMessage`<`T`\>\>

Returns a signed version of this message.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name  | Type |
| :---- | :--- |
| `obj` | `T`  |

#### Returns

`Promise`<`SignedMessage`<`T`\>\>

---

### softRefreshPlanet

▸ `Private` **softRefreshPlanet**(`planetId`): `Promise`<`void`\>

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`Promise`<`void`\>

---

### spaceTypeFromPerlin

▸ **spaceTypeFromPerlin**(`perlin`): `SpaceType`

Each coordinate lives in a particular type of space, determined by a smooth random
function called 'perlin noise.

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `perlin` | `number` |

#### Returns

`SpaceType`

---

### spaceTypePerlin

▸ **spaceTypePerlin**(`coords`, `floor`): `number`

Gets the perlin value at the given location in the world. SpaceType is based
on this value.

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |
| `floor`  | `boolean`     |

#### Returns

`number`

---

### startConversation

▸ **startConversation**(`artifactId`): `Promise`<`Conversation`\>

Starts a GPT conversation with an artifact

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `artifactId` | `ArtifactId` |

#### Returns

`Promise`<`Conversation`\>

---

### startExplore

▸ **startExplore**(): `void`

Starts the miner.

#### Returns

`void`

---

### stepConversation

▸ **stepConversation**(`artifactId`, `message`): `Promise`<`Conversation`\>

Sends a message to an artifact you are having a GPT conversation with

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

Stops the miner.

#### Returns

`void`

---

### submitDisconnectTwitter

▸ **submitDisconnectTwitter**(`twitter`): `Promise`<`void`\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `twitter` | `string` |

#### Returns

`Promise`<`void`\>

---

### submitPlanetMessage

▸ `Private` **submitPlanetMessage**(`locationId`, `type`, `body`): `Promise`<`void`\>

The planet emoji feature is built on top of a more general 'Planet Message' system, which
allows players to upload pieces of data called 'Message's to planets that they own. Emojis are
just one type of message. Their implementation leaves the door open to more off-chain data.

#### Parameters

| Name         | Type                |
| :----------- | :------------------ |
| `locationId` | `LocationId`        |
| `type`       | `PlanetMessageType` |
| `body`       | `unknown`           |

#### Returns

`Promise`<`void`\>

---

### submitVerifyTwitter

▸ **submitVerifyTwitter**(`twitter`): `Promise`<`boolean`\>

Once you have posted the verification tweet - complete the twitter-account-linking
process by telling the Dark Forest webserver to look at that tweet.

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `twitter` | `string` |

#### Returns

`Promise`<`boolean`\>

---

### transferOwnership

▸ **transferOwnership**(`planetId`, `newOwner`, `bypassChecks?`): [`default`](Backend_GameLogic_GameManager.default.md)

#### Parameters

| Name           | Type         | Default value |
| :------------- | :----------- | :------------ |
| `planetId`     | `LocationId` | `undefined`   |
| `newOwner`     | `EthAddress` | `undefined`   |
| `bypassChecks` | `boolean`    | `false`       |

#### Returns

[`default`](Backend_GameLogic_GameManager.default.md)

---

### updateDiagnostics

▸ **updateDiagnostics**(`updateFn`): `void`

Updates the diagnostic info of the game using the supplied function. Ideally, each spot in the
codebase that would like to record a metric is able to update its specific metric in a
convenient manner.

#### Parameters

| Name       | Type                           |
| :--------- | :----------------------------- |
| `updateFn` | (`d`: `Diagnostics`) => `void` |

#### Returns

`void`

---

### upgrade

▸ **upgrade**(`planetId`, `branch`, `_bypassChecks?`): [`default`](Backend_GameLogic_GameManager.default.md)

Submits a transaction to the blockchain to upgrade the given planet with the given
upgrade branch. You must own the planet, and have enough silver on it to complete
the upgrade.

#### Parameters

| Name            | Type         | Default value |
| :-------------- | :----------- | :------------ |
| `planetId`      | `LocationId` | `undefined`   |
| `branch`        | `number`     | `undefined`   |
| `_bypassChecks` | `boolean`    | `false`       |

#### Returns

[`default`](Backend_GameLogic_GameManager.default.md)

---

### uploadDiagnostics

▸ `Private` **uploadDiagnostics**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

---

### verifyMessage

▸ `Private` **verifyMessage**(`message`): `Promise`<`boolean`\>

Checks that a message signed by {@link GameManager#signMessage} was signed by the address that
it claims it was signed by.

#### Parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `message` | `SignedMessage`<`unknown`\> |

#### Returns

`Promise`<`boolean`\>

---

### waitForPlanet

▸ **waitForPlanet**<`T`\>(`locationId`, `predicate`): `Promise`<`T`\>

Listen for changes to a planet take action,
eg.
waitForPlanet("yourAsteroidId", ({current}) => current.silverCap / current.silver > 90)
.then(() => {
// Send Silver to nearby planet
})

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                                                                                                | Description                                                                                                 |
| :----------- | :------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------- |
| `locationId` | `LocationId`                                                                                                        | A locationId to watch for updates                                                                           |
| `predicate`  | (`__namedParameters`: [`Diff`](../interfaces/Frontend_Utils_EmitterUtils.Diff.md)<`Planet`\>) => `undefined` \| `T` | a function that accepts a Diff and should return a truth-y value, value will be passed to promise.resolve() |

#### Returns

`Promise`<`T`\>

a promise that will resolve with results returned from the predicate function

---

### withdrawArtifact

▸ **withdrawArtifact**(`locationId`, `artifactId`, `bypassChecks?`): [`default`](Backend_GameLogic_GameManager.default.md)

Withdraws the artifact that is locked up on the given planet.

#### Parameters

| Name           | Type         | Default value |
| :------------- | :----------- | :------------ |
| `locationId`   | `LocationId` | `undefined`   |
| `artifactId`   | `ArtifactId` | `undefined`   |
| `bypassChecks` | `boolean`    | `true`        |

#### Returns

[`default`](Backend_GameLogic_GameManager.default.md)

---

### withdrawSilver

▸ **withdrawSilver**(`locationId`, `amount`, `bypassChecks?`): `undefined` \| [`default`](Backend_GameLogic_GameManager.default.md)

#### Parameters

| Name           | Type         | Default value |
| :------------- | :----------- | :------------ |
| `locationId`   | `LocationId` | `undefined`   |
| `amount`       | `number`     | `undefined`   |
| `bypassChecks` | `boolean`    | `false`       |

#### Returns

`undefined` \| [`default`](Backend_GameLogic_GameManager.default.md)

---

### create

▸ `Static` **create**(`ethConnection`, `terminal`): `Promise`<[`default`](Backend_GameLogic_GameManager.default.md)\>

#### Parameters

| Name            | Type                                                                                                            |
| :-------------- | :-------------------------------------------------------------------------------------------------------------- |
| `ethConnection` | `EthConnection`                                                                                                 |
| `terminal`      | `MutableRefObject`<`undefined` \| [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md)\> |

#### Returns

`Promise`<[`default`](Backend_GameLogic_GameManager.default.md)\>
