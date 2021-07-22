# Class: default

[Backend/GameLogic/ContractsAPI](../modules/Backend_GameLogic_ContractsAPI.md).default

Roughly contains methods that map 1:1 with functions that live
in the contract.

## Hierarchy

- `EventEmitter`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](Backend_GameLogic_ContractsAPI.default.md#constructor)

### Properties

- [contractCaller](Backend_GameLogic_ContractsAPI.default.md#contractcaller)
- [coreContract](Backend_GameLogic_ContractsAPI.default.md#corecontract)
- [diagnosticsUpdater](Backend_GameLogic_ContractsAPI.default.md#diagnosticsupdater)
- [ethConnection](Backend_GameLogic_ContractsAPI.default.md#ethconnection)
- [gettersContract](Backend_GameLogic_ContractsAPI.default.md#getterscontract)
- [gptCreditContract](Backend_GameLogic_ContractsAPI.default.md#gptcreditcontract)
- [txRequestExecutor](Backend_GameLogic_ContractsAPI.default.md#txrequestexecutor)

### Methods

- [activateArtifact](Backend_GameLogic_ContractsAPI.default.md#activateartifact)
- [bulkGetArtifacts](Backend_GameLogic_ContractsAPI.default.md#bulkgetartifacts)
- [bulkGetArtifactsOnPlanets](Backend_GameLogic_ContractsAPI.default.md#bulkgetartifactsonplanets)
- [bulkGetPlanets](Backend_GameLogic_ContractsAPI.default.md#bulkgetplanets)
- [buyGPTCredits](Backend_GameLogic_ContractsAPI.default.md#buygptcredits)
- [buyHat](Backend_GameLogic_ContractsAPI.default.md#buyhat)
- [deactivateArtifact](Backend_GameLogic_ContractsAPI.default.md#deactivateartifact)
- [depositArtifact](Backend_GameLogic_ContractsAPI.default.md#depositartifact)
- [destroy](Backend_GameLogic_ContractsAPI.default.md#destroy)
- [findArtifact](Backend_GameLogic_ContractsAPI.default.md#findartifact)
- [getAccount](Backend_GameLogic_ContractsAPI.default.md#getaccount)
- [getAllArrivals](Backend_GameLogic_ContractsAPI.default.md#getallarrivals)
- [getArrival](Backend_GameLogic_ContractsAPI.default.md#getarrival)
- [getArrivalsForPlanet](Backend_GameLogic_ContractsAPI.default.md#getarrivalsforplanet)
- [getArtifactById](Backend_GameLogic_ContractsAPI.default.md#getartifactbyid)
- [getBalance](Backend_GameLogic_ContractsAPI.default.md#getbalance)
- [getConstants](Backend_GameLogic_ContractsAPI.default.md#getconstants)
- [getContractAddress](Backend_GameLogic_ContractsAPI.default.md#getcontractaddress)
- [getContractBalance](Backend_GameLogic_ContractsAPI.default.md#getcontractbalance)
- [getGPTCreditBalance](Backend_GameLogic_ContractsAPI.default.md#getgptcreditbalance)
- [getGPTCreditPriceEther](Backend_GameLogic_ContractsAPI.default.md#getgptcreditpriceether)
- [getPlanetById](Backend_GameLogic_ContractsAPI.default.md#getplanetbyid)
- [getPlayerArtifacts](Backend_GameLogic_ContractsAPI.default.md#getplayerartifacts)
- [getPlayerById](Backend_GameLogic_ContractsAPI.default.md#getplayerbyid)
- [getPlayers](Backend_GameLogic_ContractsAPI.default.md#getplayers)
- [getRevealedCoordsByIdIfExists](Backend_GameLogic_ContractsAPI.default.md#getrevealedcoordsbyidifexists)
- [getRevealedPlanetsCoords](Backend_GameLogic_ContractsAPI.default.md#getrevealedplanetscoords)
- [getTokenMintEndTimestamp](Backend_GameLogic_ContractsAPI.default.md#gettokenmintendtimestamp)
- [getTouchedPlanetIds](Backend_GameLogic_ContractsAPI.default.md#gettouchedplanetids)
- [getWorldRadius](Backend_GameLogic_ContractsAPI.default.md#getworldradius)
- [initializePlayer](Backend_GameLogic_ContractsAPI.default.md#initializeplayer)
- [makeCall](Backend_GameLogic_ContractsAPI.default.md#makecall)
- [move](Backend_GameLogic_ContractsAPI.default.md#move)
- [prospectPlanet](Backend_GameLogic_ContractsAPI.default.md#prospectplanet)
- [removeEventListeners](Backend_GameLogic_ContractsAPI.default.md#removeeventlisteners)
- [reveal](Backend_GameLogic_ContractsAPI.default.md#reveal)
- [setDiagnosticUpdater](Backend_GameLogic_ContractsAPI.default.md#setdiagnosticupdater)
- [setupEventListeners](Backend_GameLogic_ContractsAPI.default.md#setupeventlisteners)
- [transferOwnership](Backend_GameLogic_ContractsAPI.default.md#transferownership)
- [upgradePlanet](Backend_GameLogic_ContractsAPI.default.md#upgradeplanet)
- [waitFor](Backend_GameLogic_ContractsAPI.default.md#waitfor)
- [withdrawArtifact](Backend_GameLogic_ContractsAPI.default.md#withdrawartifact)
- [withdrawSilver](Backend_GameLogic_ContractsAPI.default.md#withdrawsilver)
- [create](Backend_GameLogic_ContractsAPI.default.md#create)

## Constructors

### constructor

• `Private` **new default**(`ethConnection`, `coreContract`, `gettersContract`, `gptCreditContract`, `nonce`)

#### Parameters

| Name                | Type                                                  |
| :------------------ | :---------------------------------------------------- |
| `ethConnection`     | [`default`](Backend_Network_EthConnection.default.md) |
| `coreContract`      | `DarkForestCore`                                      |
| `gettersContract`   | `DarkForestGetters`                                   |
| `gptCreditContract` | `DarkForestGPTCredit`                                 |
| `nonce`             | `number`                                              |

#### Overrides

EventEmitter.constructor

## Properties

### contractCaller

• `Private` `Readonly` **contractCaller**: [`ContractCaller`](Backend_GameLogic_ContractCaller.ContractCaller.md)

---

### coreContract

• `Private` **coreContract**: `DarkForestCore`

---

### diagnosticsUpdater

• `Private` `Optional` **diagnosticsUpdater**: [`DiagnosticUpdater`](../interfaces/Backend_Interfaces_DiagnosticUpdater.DiagnosticUpdater.md)

---

### ethConnection

• `Private` **ethConnection**: [`default`](Backend_Network_EthConnection.default.md)

---

### gettersContract

• `Private` **gettersContract**: `DarkForestGetters`

---

### gptCreditContract

• `Private` **gptCreditContract**: `DarkForestGPTCredit`

---

### txRequestExecutor

• `Private` `Readonly` **txRequestExecutor**: `undefined` \| [`TxExecutor`](Backend_Network_TxExecutor.TxExecutor.md)

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

▸ **getAccount**(): `EthAddress`

#### Returns

`EthAddress`

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

▸ **getBalance**(): `Promise`<`number`\>

#### Returns

`Promise`<`number`\>

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

| Name      | Type         |
| :-------- | :----------- |
| `address` | `EthAddress` |

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

▸ **getPlayerArtifacts**(`playerId`, `onProgress?`): `Promise`<`Artifact`[]\>

#### Parameters

| Name          | Type                            |
| :------------ | :------------------------------ |
| `playerId`    | `EthAddress`                    |
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

| Name                 | Type                                                                                           |
| :------------------- | :--------------------------------------------------------------------------------------------- |
| `diagnosticUpdater?` | [`DiagnosticUpdater`](../interfaces/Backend_Interfaces_DiagnosticUpdater.DiagnosticUpdater.md) |

#### Returns

`void`

---

### setupEventListeners

▸ **setupEventListeners**(): `void`

#### Returns

`void`

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

---

### create

▸ `Static` **create**(`ethConnection`): `Promise`<[`default`](Backend_GameLogic_ContractsAPI.default.md)\>

#### Parameters

| Name            | Type                                                  |
| :-------------- | :---------------------------------------------------- |
| `ethConnection` | [`default`](Backend_Network_EthConnection.default.md) |

#### Returns

`Promise`<[`default`](Backend_GameLogic_ContractsAPI.default.md)\>
