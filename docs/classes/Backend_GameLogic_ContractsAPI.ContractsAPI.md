# Class: ContractsAPI

[Backend/GameLogic/ContractsAPI](../modules/Backend_GameLogic_ContractsAPI.md).ContractsAPI

Roughly contains methods that map 1:1 with functions that live in the contract. Responsible for
reading and writing to and from the blockchain.

**`todo`** don't inherit from {@link EventEmitter}. instead use {@link Monomitter}

## Hierarchy

- `EventEmitter`

  ↳ **`ContractsAPI`**

## Table of contents

### Constructors

- [constructor](Backend_GameLogic_ContractsAPI.ContractsAPI.md#constructor)

### Properties

- [contractCaller](Backend_GameLogic_ContractsAPI.ContractsAPI.md#contractcaller)
- [ethConnection](Backend_GameLogic_ContractsAPI.ContractsAPI.md#ethconnection)
- [txExecutor](Backend_GameLogic_ContractsAPI.ContractsAPI.md#txexecutor)
- [MIN_BALANCE](Backend_GameLogic_ContractsAPI.ContractsAPI.md#min_balance)

### Accessors

- [coreContract](Backend_GameLogic_ContractsAPI.ContractsAPI.md#corecontract)
- [gettersContract](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getterscontract)
- [gptCreditContract](Backend_GameLogic_ContractsAPI.ContractsAPI.md#gptcreditcontract)
- [scoreContract](Backend_GameLogic_ContractsAPI.ContractsAPI.md#scorecontract)
- [whitelistContract](Backend_GameLogic_ContractsAPI.ContractsAPI.md#whitelistcontract)

### Methods

- [activateArtifact](Backend_GameLogic_ContractsAPI.ContractsAPI.md#activateartifact)
- [afterTransaction](Backend_GameLogic_ContractsAPI.ContractsAPI.md#aftertransaction)
- [beforeTransaction](Backend_GameLogic_ContractsAPI.ContractsAPI.md#beforetransaction)
- [bulkGetArtifacts](Backend_GameLogic_ContractsAPI.ContractsAPI.md#bulkgetartifacts)
- [bulkGetArtifactsOnPlanets](Backend_GameLogic_ContractsAPI.ContractsAPI.md#bulkgetartifactsonplanets)
- [bulkGetPlanets](Backend_GameLogic_ContractsAPI.ContractsAPI.md#bulkgetplanets)
- [buyGPTCredits](Backend_GameLogic_ContractsAPI.ContractsAPI.md#buygptcredits)
- [buyHat](Backend_GameLogic_ContractsAPI.ContractsAPI.md#buyhat)
- [claim](Backend_GameLogic_ContractsAPI.ContractsAPI.md#claim)
- [deactivateArtifact](Backend_GameLogic_ContractsAPI.ContractsAPI.md#deactivateartifact)
- [depositArtifact](Backend_GameLogic_ContractsAPI.ContractsAPI.md#depositartifact)
- [destroy](Backend_GameLogic_ContractsAPI.ContractsAPI.md#destroy)
- [findArtifact](Backend_GameLogic_ContractsAPI.ContractsAPI.md#findartifact)
- [getAccount](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getaccount)
- [getAllArrivals](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getallarrivals)
- [getArrival](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getarrival)
- [getArrivalsForPlanet](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getarrivalsforplanet)
- [getArtifactById](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getartifactbyid)
- [getBalance](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getbalance)
- [getClaimedCoordsByIdIfExists](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getclaimedcoordsbyidifexists)
- [getClaimedPlanetsCoords](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getclaimedplanetscoords)
- [getConstants](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getconstants)
- [getContractAddress](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getcontractaddress)
- [getContractBalance](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getcontractbalance)
- [getGPTCreditBalance](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getgptcreditbalance)
- [getGPTCreditPriceEther](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getgptcreditpriceether)
- [getPlanetById](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getplanetbyid)
- [getPlayerArtifacts](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getplayerartifacts)
- [getPlayerById](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getplayerbyid)
- [getPlayers](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getplayers)
- [getRevealedCoordsByIdIfExists](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getrevealedcoordsbyidifexists)
- [getRevealedPlanetsCoords](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getrevealedplanetscoords)
- [getTokenMintEndTimestamp](Backend_GameLogic_ContractsAPI.ContractsAPI.md#gettokenmintendtimestamp)
- [getTouchedPlanetIds](Backend_GameLogic_ContractsAPI.ContractsAPI.md#gettouchedplanetids)
- [getWorldRadius](Backend_GameLogic_ContractsAPI.ContractsAPI.md#getworldradius)
- [hasAccount](Backend_GameLogic_ContractsAPI.ContractsAPI.md#hasaccount)
- [initializePlayer](Backend_GameLogic_ContractsAPI.ContractsAPI.md#initializeplayer)
- [makeCall](Backend_GameLogic_ContractsAPI.ContractsAPI.md#makecall)
- [move](Backend_GameLogic_ContractsAPI.ContractsAPI.md#move)
- [prospectPlanet](Backend_GameLogic_ContractsAPI.ContractsAPI.md#prospectplanet)
- [removeEventListeners](Backend_GameLogic_ContractsAPI.ContractsAPI.md#removeeventlisteners)
- [reveal](Backend_GameLogic_ContractsAPI.ContractsAPI.md#reveal)
- [setDiagnosticUpdater](Backend_GameLogic_ContractsAPI.ContractsAPI.md#setdiagnosticupdater)
- [setupEventListeners](Backend_GameLogic_ContractsAPI.ContractsAPI.md#setupeventlisteners)
- [transferOwnership](Backend_GameLogic_ContractsAPI.ContractsAPI.md#transferownership)
- [upgradePlanet](Backend_GameLogic_ContractsAPI.ContractsAPI.md#upgradeplanet)
- [waitFor](Backend_GameLogic_ContractsAPI.ContractsAPI.md#waitfor)
- [withdrawArtifact](Backend_GameLogic_ContractsAPI.ContractsAPI.md#withdrawartifact)
- [withdrawSilver](Backend_GameLogic_ContractsAPI.ContractsAPI.md#withdrawsilver)

## Constructors

### constructor

• **new ContractsAPI**(`ethConnection`)

#### Parameters

| Name            | Type            |
| :-------------- | :-------------- |
| `ethConnection` | `EthConnection` |

#### Overrides

EventEmitter.constructor

## Properties

### contractCaller

• `Private` `Readonly` **contractCaller**: `ContractCaller`

Instrumented {@link ThrottledConcurrentQueue} for blockchain reads.

---

### ethConnection

• `Private` **ethConnection**: `EthConnection`

Our connection to the blockchain. In charge of low level networking, and also of the burner
wallet.

---

### txExecutor

• `Private` `Readonly` **txExecutor**: `undefined` \| `TxExecutor`

Instrumented {@link ThrottledConcurrentQueue} for blockchain writes.

---

### MIN_BALANCE

▪ `Static` `Private` `Readonly` **MIN_BALANCE**: `BigNumber`

Don't allow users to submit txs if balance falls below this amount/

## Accessors

### coreContract

• `get` **coreContract**(): `DarkForestCore`

#### Returns

`DarkForestCore`

---

### gettersContract

• `get` **gettersContract**(): `DarkForestGetters`

#### Returns

`DarkForestGetters`

---

### gptCreditContract

• `get` **gptCreditContract**(): `DarkForestGPTCredit`

#### Returns

`DarkForestGPTCredit`

---

### scoreContract

• `get` **scoreContract**(): `DarkForestScoringRound3`

#### Returns

`DarkForestScoringRound3`

---

### whitelistContract

• `get` **whitelistContract**(): `Whitelist`

#### Returns

`Whitelist`

## Methods

### activateArtifact

▸ **activateArtifact**(`action`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name     | Type                          |
| :------- | :---------------------------- |
| `action` | `UnconfirmedActivateArtifact` |

#### Returns

`Promise`<`TransactionReceipt`\>

---

### afterTransaction

▸ `Private` **afterTransaction**(`_txRequest`, `txDiagnosticInfo`): `Promise`<`void`\>

#### Parameters

| Name               | Type                |
| :----------------- | :------------------ |
| `_txRequest`       | `QueuedTransaction` |
| `txDiagnosticInfo` | `unknown`           |

#### Returns

`Promise`<`void`\>

---

### beforeTransaction

▸ `Private` **beforeTransaction**(`txRequest`): `Promise`<`void`\>

This function is called by {@link TxExecutor} before each transaction. It gives the client an
opportunity to prevent a transaction from going through based on business logic or user
interaction. To prevent the queued transaction from being submitted, throw an Error.

#### Parameters

| Name        | Type                |
| :---------- | :------------------ |
| `txRequest` | `QueuedTransaction` |

#### Returns

`Promise`<`void`\>

---

### bulkGetArtifacts

▸ **bulkGetArtifacts**(`artifactIds`, `onProgress?`): `Promise`<`Artifact`[]\>

#### Parameters

| Name          | Type                                      |
| :------------ | :---------------------------------------- |
| `artifactIds` | `ArtifactId`[]                            |
| `onProgress?` | (`fractionCompleted`: `number`) => `void` |

#### Returns

`Promise`<`Artifact`[]\>

---

### bulkGetArtifactsOnPlanets

▸ **bulkGetArtifactsOnPlanets**(`locationIds`, `onProgress?`): `Promise`<`Artifact`[][]\>

#### Parameters

| Name          | Type                                      |
| :------------ | :---------------------------------------- |
| `locationIds` | `LocationId`[]                            |
| `onProgress?` | (`fractionCompleted`: `number`) => `void` |

#### Returns

`Promise`<`Artifact`[][]\>

---

### bulkGetPlanets

▸ **bulkGetPlanets**(`toLoadPlanets`, `onProgressPlanet?`, `onProgressMetadata?`): `Promise`<`Map`<`LocationId`, `Planet`\>\>

#### Parameters

| Name                  | Type                                      |
| :-------------------- | :---------------------------------------- |
| `toLoadPlanets`       | `LocationId`[]                            |
| `onProgressPlanet?`   | (`fractionCompleted`: `number`) => `void` |
| `onProgressMetadata?` | (`fractionCompleted`: `number`) => `void` |

#### Returns

`Promise`<`Map`<`LocationId`, `Planet`\>\>

---

### buyGPTCredits

▸ **buyGPTCredits**(`amount`, `actionId`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `amount`   | `number` |
| `actionId` | `string` |

#### Returns

`Promise`<`TransactionReceipt`\>

---

### buyHat

▸ **buyHat**(`planetIdDecStr`, `currentHatLevel`, `actionId`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `planetIdDecStr`  | `string` |
| `currentHatLevel` | `number` |
| `actionId`        | `string` |

#### Returns

`Promise`<`TransactionReceipt`\>

---

### claim

▸ **claim**(`args`, `action`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name     | Type                                                                           |
| :------- | :----------------------------------------------------------------------------- |
| `args`   | [`ClaimArgs`](../modules/_types_darkforest_api_ContractsAPITypes.md#claimargs) |
| `action` | `UnconfirmedClaim`                                                             |

#### Returns

`Promise`<`TransactionReceipt`\>

---

### deactivateArtifact

▸ **deactivateArtifact**(`action`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name     | Type                            |
| :------- | :------------------------------ |
| `action` | `UnconfirmedDeactivateArtifact` |

#### Returns

`Promise`<`TransactionReceipt`\>

---

### depositArtifact

▸ **depositArtifact**(`action`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name     | Type                         |
| :------- | :--------------------------- |
| `action` | `UnconfirmedDepositArtifact` |

#### Returns

`Promise`<`TransactionReceipt`\>

---

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

---

### findArtifact

▸ **findArtifact**(`location`, `biomeSnarkArgs`, `actionId`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name             | Type                             |
| :--------------- | :------------------------------- |
| `location`       | `WorldLocation`                  |
| `biomeSnarkArgs` | `BiomebaseSnarkContractCallArgs` |
| `actionId`       | `string`                         |

#### Returns

`Promise`<`TransactionReceipt`\>

---

### getAccount

▸ **getAccount**(): `undefined` \| `EthAddress`

#### Returns

`undefined` \| `EthAddress`

---

### getAllArrivals

▸ **getAllArrivals**(`planetsToLoad`, `onProgress?`): `Promise`<`QueuedArrival`[]\>

#### Parameters

| Name            | Type                                      |
| :-------------- | :---------------------------------------- |
| `planetsToLoad` | `LocationId`[]                            |
| `onProgress?`   | (`fractionCompleted`: `number`) => `void` |

#### Returns

`Promise`<`QueuedArrival`[]\>

---

### getArrival

▸ **getArrival**(`arrivalId`): `Promise`<`undefined` \| `QueuedArrival`\>

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `arrivalId` | `number` |

#### Returns

`Promise`<`undefined` \| `QueuedArrival`\>

---

### getArrivalsForPlanet

▸ **getArrivalsForPlanet**(`planetId`): `Promise`<`QueuedArrival`[]\>

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`Promise`<`QueuedArrival`[]\>

---

### getArtifactById

▸ **getArtifactById**(`artifactId`): `Promise`<`undefined` \| `Artifact`\>

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `artifactId` | `ArtifactId` |

#### Returns

`Promise`<`undefined` \| `Artifact`\>

---

### getBalance

▸ **getBalance**(): `Promise`<`BigNumber`\>

#### Returns

`Promise`<`BigNumber`\>

---

### getClaimedCoordsByIdIfExists

▸ **getClaimedCoordsByIdIfExists**(`planetId`): `Promise`<`undefined` \| `ClaimedCoords`\>

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`Promise`<`undefined` \| `ClaimedCoords`\>

---

### getClaimedPlanetsCoords

▸ **getClaimedPlanetsCoords**(`startingAt`, `onProgressIds?`, `onProgressCoords?`): `Promise`<`ClaimedCoords`[]\>

#### Parameters

| Name                | Type                                      |
| :------------------ | :---------------------------------------- |
| `startingAt`        | `number`                                  |
| `onProgressIds?`    | (`fractionCompleted`: `number`) => `void` |
| `onProgressCoords?` | (`fractionCompleted`: `number`) => `void` |

#### Returns

`Promise`<`ClaimedCoords`[]\>

---

### getConstants

▸ **getConstants**(): `Promise`<[`ContractConstants`](../interfaces/_types_darkforest_api_ContractsAPITypes.ContractConstants.md)\>

#### Returns

`Promise`<[`ContractConstants`](../interfaces/_types_darkforest_api_ContractsAPITypes.ContractConstants.md)\>

---

### getContractAddress

▸ **getContractAddress**(): `EthAddress`

#### Returns

`EthAddress`

---

### getContractBalance

▸ **getContractBalance**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

---

### getGPTCreditBalance

▸ **getGPTCreditBalance**(`address`): `Promise`<`number`\>

#### Parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `address` | `undefined` \| `EthAddress` |

#### Returns

`Promise`<`number`\>

---

### getGPTCreditPriceEther

▸ **getGPTCreditPriceEther**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

---

### getPlanetById

▸ **getPlanetById**(`planetId`): `Promise`<`undefined` \| `Planet`\>

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`Promise`<`undefined` \| `Planet`\>

---

### getPlayerArtifacts

▸ **getPlayerArtifacts**(`playerId?`, `onProgress?`): `Promise`<`Artifact`[]\>

#### Parameters

| Name          | Type                            |
| :------------ | :------------------------------ |
| `playerId?`   | `EthAddress`                    |
| `onProgress?` | (`percent`: `number`) => `void` |

#### Returns

`Promise`<`Artifact`[]\>

---

### getPlayerById

▸ **getPlayerById**(`playerId`): `Promise`<`undefined` \| `Player`\>

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `playerId` | `EthAddress` |

#### Returns

`Promise`<`undefined` \| `Player`\>

---

### getPlayers

▸ **getPlayers**(`onProgress?`): `Promise`<`Map`<`string`, `Player`\>\>

#### Parameters

| Name          | Type                                      |
| :------------ | :---------------------------------------- |
| `onProgress?` | (`fractionCompleted`: `number`) => `void` |

#### Returns

`Promise`<`Map`<`string`, `Player`\>\>

---

### getRevealedCoordsByIdIfExists

▸ **getRevealedCoordsByIdIfExists**(`planetId`): `Promise`<`undefined` \| `RevealedCoords`\>

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |

#### Returns

`Promise`<`undefined` \| `RevealedCoords`\>

---

### getRevealedPlanetsCoords

▸ **getRevealedPlanetsCoords**(`startingAt`, `onProgressIds?`, `onProgressCoords?`): `Promise`<`RevealedCoords`[]\>

#### Parameters

| Name                | Type                                      |
| :------------------ | :---------------------------------------- |
| `startingAt`        | `number`                                  |
| `onProgressIds?`    | (`fractionCompleted`: `number`) => `void` |
| `onProgressCoords?` | (`fractionCompleted`: `number`) => `void` |

#### Returns

`Promise`<`RevealedCoords`[]\>

---

### getTokenMintEndTimestamp

▸ **getTokenMintEndTimestamp**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

---

### getTouchedPlanetIds

▸ **getTouchedPlanetIds**(`startingAt`, `onProgress?`): `Promise`<`LocationId`[]\>

#### Parameters

| Name          | Type                                      |
| :------------ | :---------------------------------------- |
| `startingAt`  | `number`                                  |
| `onProgress?` | (`fractionCompleted`: `number`) => `void` |

#### Returns

`Promise`<`LocationId`[]\>

---

### getWorldRadius

▸ **getWorldRadius**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

---

### hasAccount

▸ **hasAccount**(): `boolean`

#### Returns

`boolean`

---

### initializePlayer

▸ **initializePlayer**(`args`, `action`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name     | Type                        |
| :------- | :-------------------------- |
| `args`   | `InitSnarkContractCallArgs` |
| `action` | `UnconfirmedInit`           |

#### Returns

`Promise`<`TransactionReceipt`\>

---

### makeCall

▸ `Private` **makeCall**<`T`\>(`contractViewFunction`, `args?`): `Promise`<`T`\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name                   | Type                     | Default value |
| :--------------------- | :----------------------- | :------------ |
| `contractViewFunction` | `ContractFunction`<`T`\> | `undefined`   |
| `args`                 | `unknown`[]              | `[]`          |

#### Returns

`Promise`<`T`\>

---

### move

▸ **move**(`actionId`, `snarkArgs`, `shipsMoved`, `silverMoved`, `artifactMoved?`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name             | Type                        |
| :--------------- | :-------------------------- |
| `actionId`       | `string`                    |
| `snarkArgs`      | `MoveSnarkContractCallArgs` |
| `shipsMoved`     | `number`                    |
| `silverMoved`    | `number`                    |
| `artifactMoved?` | `ArtifactId`                |

#### Returns

`Promise`<`TransactionReceipt`\>

---

### prospectPlanet

▸ **prospectPlanet**(`planetId`, `actionId`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |
| `actionId` | `string`     |

#### Returns

`Promise`<`TransactionReceipt`\>

---

### removeEventListeners

▸ **removeEventListeners**(): `void`

#### Returns

`void`

---

### reveal

▸ **reveal**(`args`, `action`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name     | Type                          |
| :------- | :---------------------------- |
| `args`   | `RevealSnarkContractCallArgs` |
| `action` | `UnconfirmedReveal`           |

#### Returns

`Promise`<`TransactionReceipt`\>

---

### setDiagnosticUpdater

▸ **setDiagnosticUpdater**(`diagnosticUpdater?`): `void`

#### Parameters

| Name                 | Type                |
| :------------------- | :------------------ |
| `diagnosticUpdater?` | `DiagnosticUpdater` |

#### Returns

`void`

---

### setupEventListeners

▸ **setupEventListeners**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>

---

### transferOwnership

▸ **transferOwnership**(`planetId`, `newOwner`, `actionId`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name       | Type         |
| :--------- | :----------- |
| `planetId` | `LocationId` |
| `newOwner` | `EthAddress` |
| `actionId` | `string`     |

#### Returns

`Promise`<`TransactionReceipt`\>

---

### upgradePlanet

▸ **upgradePlanet**(`args`, `actionId`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name       | Type                                                                               |
| :--------- | :--------------------------------------------------------------------------------- |
| `args`     | [`UpgradeArgs`](../modules/_types_darkforest_api_ContractsAPITypes.md#upgradeargs) |
| `actionId` | `string`                                                                           |

#### Returns

`Promise`<`TransactionReceipt`\>

---

### waitFor

▸ **waitFor**(`submitted`, `receiptPromise`): `Promise`<`TransactionReceipt`\>

Given an unconfirmed (but submitted) transaction, emits the appropriate
[ContractsAPIEvent](../enums/_types_darkforest_api_ContractsAPITypes.ContractsAPIEvent.md).

#### Parameters

| Name             | Type                             |
| :--------------- | :------------------------------- |
| `submitted`      | `SubmittedTx`                    |
| `receiptPromise` | `Promise`<`TransactionReceipt`\> |

#### Returns

`Promise`<`TransactionReceipt`\>

---

### withdrawArtifact

▸ **withdrawArtifact**(`action`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name     | Type                          |
| :------- | :---------------------------- |
| `action` | `UnconfirmedWithdrawArtifact` |

#### Returns

`Promise`<`TransactionReceipt`\>

---

### withdrawSilver

▸ **withdrawSilver**(`action`): `Promise`<`TransactionReceipt`\>

#### Parameters

| Name     | Type                        |
| :------- | :-------------------------- |
| `action` | `UnconfirmedWithdrawSilver` |

#### Returns

`Promise`<`TransactionReceipt`\>
