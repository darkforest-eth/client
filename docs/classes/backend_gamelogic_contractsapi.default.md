# Class: default

[Backend/GameLogic/ContractsAPI](../modules/backend_gamelogic_contractsapi.md).default

Roughly contains methods that map 1:1 with functions that live
in the contract.

## Hierarchy

- _EventEmitter_

  ↳ **default**

## Table of contents

### Constructors

- [constructor](backend_gamelogic_contractsapi.default.md#constructor)

### Properties

- [contractCaller](backend_gamelogic_contractsapi.default.md#contractcaller)
- [coreContract](backend_gamelogic_contractsapi.default.md#corecontract)
- [diagnosticsUpdater](backend_gamelogic_contractsapi.default.md#diagnosticsupdater)
- [ethConnection](backend_gamelogic_contractsapi.default.md#ethconnection)
- [gettersContract](backend_gamelogic_contractsapi.default.md#getterscontract)
- [gptCreditContract](backend_gamelogic_contractsapi.default.md#gptcreditcontract)
- [txRequestExecutor](backend_gamelogic_contractsapi.default.md#txrequestexecutor)

### Methods

- [activateArtifact](backend_gamelogic_contractsapi.default.md#activateartifact)
- [bulkGetArtifacts](backend_gamelogic_contractsapi.default.md#bulkgetartifacts)
- [bulkGetArtifactsOnPlanets](backend_gamelogic_contractsapi.default.md#bulkgetartifactsonplanets)
- [bulkGetPlanets](backend_gamelogic_contractsapi.default.md#bulkgetplanets)
- [buyGPTCredits](backend_gamelogic_contractsapi.default.md#buygptcredits)
- [buyHat](backend_gamelogic_contractsapi.default.md#buyhat)
- [deactivateArtifact](backend_gamelogic_contractsapi.default.md#deactivateartifact)
- [depositArtifact](backend_gamelogic_contractsapi.default.md#depositartifact)
- [destroy](backend_gamelogic_contractsapi.default.md#destroy)
- [findArtifact](backend_gamelogic_contractsapi.default.md#findartifact)
- [getAccount](backend_gamelogic_contractsapi.default.md#getaccount)
- [getAllArrivals](backend_gamelogic_contractsapi.default.md#getallarrivals)
- [getArrival](backend_gamelogic_contractsapi.default.md#getarrival)
- [getArrivalsForPlanet](backend_gamelogic_contractsapi.default.md#getarrivalsforplanet)
- [getArtifactById](backend_gamelogic_contractsapi.default.md#getartifactbyid)
- [getBalance](backend_gamelogic_contractsapi.default.md#getbalance)
- [getConstants](backend_gamelogic_contractsapi.default.md#getconstants)
- [getContractAddress](backend_gamelogic_contractsapi.default.md#getcontractaddress)
- [getContractBalance](backend_gamelogic_contractsapi.default.md#getcontractbalance)
- [getGPTCreditBalance](backend_gamelogic_contractsapi.default.md#getgptcreditbalance)
- [getGPTCreditPriceEther](backend_gamelogic_contractsapi.default.md#getgptcreditpriceether)
- [getPlanetById](backend_gamelogic_contractsapi.default.md#getplanetbyid)
- [getPlayerArtifacts](backend_gamelogic_contractsapi.default.md#getplayerartifacts)
- [getPlayerById](backend_gamelogic_contractsapi.default.md#getplayerbyid)
- [getPlayers](backend_gamelogic_contractsapi.default.md#getplayers)
- [getRevealedCoordsByIdIfExists](backend_gamelogic_contractsapi.default.md#getrevealedcoordsbyidifexists)
- [getRevealedPlanetsCoords](backend_gamelogic_contractsapi.default.md#getrevealedplanetscoords)
- [getTokenMintEndTimestamp](backend_gamelogic_contractsapi.default.md#gettokenmintendtimestamp)
- [getTouchedPlanetIds](backend_gamelogic_contractsapi.default.md#gettouchedplanetids)
- [getWorldRadius](backend_gamelogic_contractsapi.default.md#getworldradius)
- [initializePlayer](backend_gamelogic_contractsapi.default.md#initializeplayer)
- [makeCall](backend_gamelogic_contractsapi.default.md#makecall)
- [move](backend_gamelogic_contractsapi.default.md#move)
- [prospectPlanet](backend_gamelogic_contractsapi.default.md#prospectplanet)
- [removeEventListeners](backend_gamelogic_contractsapi.default.md#removeeventlisteners)
- [reveal](backend_gamelogic_contractsapi.default.md#reveal)
- [setDiagnosticUpdater](backend_gamelogic_contractsapi.default.md#setdiagnosticupdater)
- [setupEventListeners](backend_gamelogic_contractsapi.default.md#setupeventlisteners)
- [transferOwnership](backend_gamelogic_contractsapi.default.md#transferownership)
- [upgradePlanet](backend_gamelogic_contractsapi.default.md#upgradeplanet)
- [waitFor](backend_gamelogic_contractsapi.default.md#waitfor)
- [withdrawArtifact](backend_gamelogic_contractsapi.default.md#withdrawartifact)
- [withdrawSilver](backend_gamelogic_contractsapi.default.md#withdrawsilver)
- [create](backend_gamelogic_contractsapi.default.md#create)

## Constructors

### constructor

\+ `Private` **new default**(`ethConnection`: [_default_](backend_network_ethconnection.default.md), `coreContract`: _DarkForestCore_, `gettersContract`: _DarkForestGetters_, `gptCreditContract`: _DarkForestGPTCredit_, `nonce`: _number_): [_default_](backend_gamelogic_contractsapi.default.md)

#### Parameters

| Name                | Type                                                  |
| :------------------ | :---------------------------------------------------- |
| `ethConnection`     | [_default_](backend_network_ethconnection.default.md) |
| `coreContract`      | _DarkForestCore_                                      |
| `gettersContract`   | _DarkForestGetters_                                   |
| `gptCreditContract` | _DarkForestGPTCredit_                                 |
| `nonce`             | _number_                                              |

**Returns:** [_default_](backend_gamelogic_contractsapi.default.md)

Overrides: EventEmitter.constructor

## Properties

### contractCaller

• `Private` `Readonly` **contractCaller**: [_ContractCaller_](backend_gamelogic_contractcaller.contractcaller.md)

---

### coreContract

• `Private` **coreContract**: _DarkForestCore_

---

### diagnosticsUpdater

• `Private` `Optional` **diagnosticsUpdater**: [_DiagnosticUpdater_](../interfaces/backend_interfaces_diagnosticupdater.diagnosticupdater.md)

---

### ethConnection

• `Private` **ethConnection**: [_default_](backend_network_ethconnection.default.md)

---

### gettersContract

• `Private` **gettersContract**: _DarkForestGetters_

---

### gptCreditContract

• `Private` **gptCreditContract**: _DarkForestGPTCredit_

---

### txRequestExecutor

• `Private` `Readonly` **txRequestExecutor**: _undefined_ \| [_TxExecutor_](backend_network_txexecutor.txexecutor.md)

## Methods

### activateArtifact

▸ **activateArtifact**(`action`: UnconfirmedActivateArtifact): _Promise_<TransactionReceipt\>

#### Parameters

| Name     | Type                        |
| :------- | :-------------------------- |
| `action` | UnconfirmedActivateArtifact |

**Returns:** _Promise_<TransactionReceipt\>

---

### bulkGetArtifacts

▸ **bulkGetArtifacts**(`artifactIds`: ArtifactId[], `onProgress?`: (`fractionCompleted`: _number_) => _void_): _Promise_<Artifact[]\>

#### Parameters

| Name          | Type                                      |
| :------------ | :---------------------------------------- |
| `artifactIds` | ArtifactId[]                              |
| `onProgress?` | (`fractionCompleted`: _number_) => _void_ |

**Returns:** _Promise_<Artifact[]\>

---

### bulkGetArtifactsOnPlanets

▸ **bulkGetArtifactsOnPlanets**(`locationIds`: LocationId[], `onProgress?`: (`fractionCompleted`: _number_) => _void_): _Promise_<Artifact[][]\>

#### Parameters

| Name          | Type                                      |
| :------------ | :---------------------------------------- |
| `locationIds` | LocationId[]                              |
| `onProgress?` | (`fractionCompleted`: _number_) => _void_ |

**Returns:** _Promise_<Artifact[][]\>

---

### bulkGetPlanets

▸ **bulkGetPlanets**(`toLoadPlanets`: LocationId[], `onProgressPlanet?`: (`fractionCompleted`: _number_) => _void_, `onProgressMetadata?`: (`fractionCompleted`: _number_) => _void_): _Promise_<Map<LocationId, Planet\>\>

#### Parameters

| Name                  | Type                                      |
| :-------------------- | :---------------------------------------- |
| `toLoadPlanets`       | LocationId[]                              |
| `onProgressPlanet?`   | (`fractionCompleted`: _number_) => _void_ |
| `onProgressMetadata?` | (`fractionCompleted`: _number_) => _void_ |

**Returns:** _Promise_<Map<LocationId, Planet\>\>

---

### buyGPTCredits

▸ **buyGPTCredits**(`amount`: _number_, `actionId`: _string_): _Promise_<TransactionReceipt\>

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `amount`   | _number_ |
| `actionId` | _string_ |

**Returns:** _Promise_<TransactionReceipt\>

---

### buyHat

▸ **buyHat**(`planetIdDecStr`: _string_, `currentHatLevel`: _number_, `actionId`: _string_): _Promise_<TransactionReceipt\>

#### Parameters

| Name              | Type     |
| :---------------- | :------- |
| `planetIdDecStr`  | _string_ |
| `currentHatLevel` | _number_ |
| `actionId`        | _string_ |

**Returns:** _Promise_<TransactionReceipt\>

---

### deactivateArtifact

▸ **deactivateArtifact**(`action`: UnconfirmedDeactivateArtifact): _Promise_<TransactionReceipt\>

#### Parameters

| Name     | Type                          |
| :------- | :---------------------------- |
| `action` | UnconfirmedDeactivateArtifact |

**Returns:** _Promise_<TransactionReceipt\>

---

### depositArtifact

▸ **depositArtifact**(`action`: UnconfirmedDepositArtifact): _Promise_<TransactionReceipt\>

#### Parameters

| Name     | Type                       |
| :------- | :------------------------- |
| `action` | UnconfirmedDepositArtifact |

**Returns:** _Promise_<TransactionReceipt\>

---

### destroy

▸ **destroy**(): _void_

**Returns:** _void_

---

### findArtifact

▸ **findArtifact**(`location`: WorldLocation, `biomeSnarkArgs`: BiomebaseSnarkContractCallArgs, `actionId`: _string_): _Promise_<TransactionReceipt\>

#### Parameters

| Name             | Type                           |
| :--------------- | :----------------------------- |
| `location`       | WorldLocation                  |
| `biomeSnarkArgs` | BiomebaseSnarkContractCallArgs |
| `actionId`       | _string_                       |

**Returns:** _Promise_<TransactionReceipt\>

---

### getAccount

▸ **getAccount**(): EthAddress

**Returns:** EthAddress

---

### getAllArrivals

▸ **getAllArrivals**(`planetsToLoad`: LocationId[], `onProgress?`: (`fractionCompleted`: _number_) => _void_): _Promise_<QueuedArrival[]\>

#### Parameters

| Name            | Type                                      |
| :-------------- | :---------------------------------------- |
| `planetsToLoad` | LocationId[]                              |
| `onProgress?`   | (`fractionCompleted`: _number_) => _void_ |

**Returns:** _Promise_<QueuedArrival[]\>

---

### getArrival

▸ **getArrival**(`arrivalId`: _number_): _Promise_<undefined \| QueuedArrival\>

#### Parameters

| Name        | Type     |
| :---------- | :------- |
| `arrivalId` | _number_ |

**Returns:** _Promise_<undefined \| QueuedArrival\>

---

### getArrivalsForPlanet

▸ **getArrivalsForPlanet**(`planetId`: LocationId): _Promise_<QueuedArrival[]\>

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _Promise_<QueuedArrival[]\>

---

### getArtifactById

▸ **getArtifactById**(`artifactId`: ArtifactId): _Promise_<undefined \| Artifact\>

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `artifactId` | ArtifactId |

**Returns:** _Promise_<undefined \| Artifact\>

---

### getBalance

▸ **getBalance**(): _Promise_<number\>

**Returns:** _Promise_<number\>

---

### getConstants

▸ **getConstants**(): _Promise_<[_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md)\>

**Returns:** _Promise_<[_ContractConstants_](../interfaces/_types_darkforest_api_contractsapitypes.contractconstants.md)\>

---

### getContractAddress

▸ **getContractAddress**(): EthAddress

**Returns:** EthAddress

---

### getContractBalance

▸ **getContractBalance**(): _Promise_<number\>

**Returns:** _Promise_<number\>

---

### getGPTCreditBalance

▸ **getGPTCreditBalance**(`address`: EthAddress): _Promise_<number\>

#### Parameters

| Name      | Type       |
| :-------- | :--------- |
| `address` | EthAddress |

**Returns:** _Promise_<number\>

---

### getGPTCreditPriceEther

▸ **getGPTCreditPriceEther**(): _Promise_<number\>

**Returns:** _Promise_<number\>

---

### getPlanetById

▸ **getPlanetById**(`planetId`: LocationId): _Promise_<undefined \| Planet\>

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _Promise_<undefined \| Planet\>

---

### getPlayerArtifacts

▸ **getPlayerArtifacts**(`playerId`: EthAddress, `onProgress?`: (`percent`: _number_) => _void_): _Promise_<Artifact[]\>

#### Parameters

| Name          | Type                            |
| :------------ | :------------------------------ |
| `playerId`    | EthAddress                      |
| `onProgress?` | (`percent`: _number_) => _void_ |

**Returns:** _Promise_<Artifact[]\>

---

### getPlayerById

▸ **getPlayerById**(`playerId`: EthAddress): _Promise_<undefined \| Player\>

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `playerId` | EthAddress |

**Returns:** _Promise_<undefined \| Player\>

---

### getPlayers

▸ **getPlayers**(`onProgress?`: (`fractionCompleted`: _number_) => _void_): _Promise_<Map<string, Player\>\>

#### Parameters

| Name          | Type                                      |
| :------------ | :---------------------------------------- |
| `onProgress?` | (`fractionCompleted`: _number_) => _void_ |

**Returns:** _Promise_<Map<string, Player\>\>

---

### getRevealedCoordsByIdIfExists

▸ **getRevealedCoordsByIdIfExists**(`planetId`: LocationId): _Promise_<undefined \| RevealedCoords\>

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |

**Returns:** _Promise_<undefined \| RevealedCoords\>

---

### getRevealedPlanetsCoords

▸ **getRevealedPlanetsCoords**(`startingAt`: _number_, `onProgressIds?`: (`fractionCompleted`: _number_) => _void_, `onProgressCoords?`: (`fractionCompleted`: _number_) => _void_): _Promise_<RevealedCoords[]\>

#### Parameters

| Name                | Type                                      |
| :------------------ | :---------------------------------------- |
| `startingAt`        | _number_                                  |
| `onProgressIds?`    | (`fractionCompleted`: _number_) => _void_ |
| `onProgressCoords?` | (`fractionCompleted`: _number_) => _void_ |

**Returns:** _Promise_<RevealedCoords[]\>

---

### getTokenMintEndTimestamp

▸ **getTokenMintEndTimestamp**(): _Promise_<number\>

**Returns:** _Promise_<number\>

---

### getTouchedPlanetIds

▸ **getTouchedPlanetIds**(`startingAt`: _number_, `onProgress?`: (`fractionCompleted`: _number_) => _void_): _Promise_<LocationId[]\>

#### Parameters

| Name          | Type                                      |
| :------------ | :---------------------------------------- |
| `startingAt`  | _number_                                  |
| `onProgress?` | (`fractionCompleted`: _number_) => _void_ |

**Returns:** _Promise_<LocationId[]\>

---

### getWorldRadius

▸ **getWorldRadius**(): _Promise_<number\>

**Returns:** _Promise_<number\>

---

### initializePlayer

▸ **initializePlayer**(`args`: InitSnarkContractCallArgs, `action`: UnconfirmedInit): _Promise_<TransactionReceipt\>

#### Parameters

| Name     | Type                      |
| :------- | :------------------------ |
| `args`   | InitSnarkContractCallArgs |
| `action` | UnconfirmedInit           |

**Returns:** _Promise_<TransactionReceipt\>

---

### makeCall

▸ `Private` **makeCall**<T\>(`contractViewFunction`: _ContractFunction_<T\>, `args?`: _unknown_[]): _Promise_<T\>

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name                   | Type                   | Default value |
| :--------------------- | :--------------------- | :------------ |
| `contractViewFunction` | _ContractFunction_<T\> | -             |
| `args`                 | _unknown_[]            | []            |

**Returns:** _Promise_<T\>

---

### move

▸ **move**(`actionId`: _string_, `snarkArgs`: MoveSnarkContractCallArgs, `shipsMoved`: _number_, `silverMoved`: _number_, `artifactMoved?`: ArtifactId): _Promise_<TransactionReceipt\>

#### Parameters

| Name             | Type                      |
| :--------------- | :------------------------ |
| `actionId`       | _string_                  |
| `snarkArgs`      | MoveSnarkContractCallArgs |
| `shipsMoved`     | _number_                  |
| `silverMoved`    | _number_                  |
| `artifactMoved?` | ArtifactId                |

**Returns:** _Promise_<TransactionReceipt\>

---

### prospectPlanet

▸ **prospectPlanet**(`planetId`: LocationId, `actionId`: _string_): _Promise_<TransactionReceipt\>

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |
| `actionId` | _string_   |

**Returns:** _Promise_<TransactionReceipt\>

---

### removeEventListeners

▸ **removeEventListeners**(): _void_

**Returns:** _void_

---

### reveal

▸ **reveal**(`args`: RevealSnarkContractCallArgs, `action`: UnconfirmedReveal): _Promise_<TransactionReceipt\>

#### Parameters

| Name     | Type                        |
| :------- | :-------------------------- |
| `args`   | RevealSnarkContractCallArgs |
| `action` | UnconfirmedReveal           |

**Returns:** _Promise_<TransactionReceipt\>

---

### setDiagnosticUpdater

▸ **setDiagnosticUpdater**(`diagnosticUpdater?`: [_DiagnosticUpdater_](../interfaces/backend_interfaces_diagnosticupdater.diagnosticupdater.md)): _void_

#### Parameters

| Name                 | Type                                                                                           |
| :------------------- | :--------------------------------------------------------------------------------------------- |
| `diagnosticUpdater?` | [_DiagnosticUpdater_](../interfaces/backend_interfaces_diagnosticupdater.diagnosticupdater.md) |

**Returns:** _void_

---

### setupEventListeners

▸ **setupEventListeners**(): _void_

**Returns:** _void_

---

### transferOwnership

▸ **transferOwnership**(`planetId`: LocationId, `newOwner`: EthAddress, `actionId`: _string_): _Promise_<TransactionReceipt\>

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `planetId` | LocationId |
| `newOwner` | EthAddress |
| `actionId` | _string_   |

**Returns:** _Promise_<TransactionReceipt\>

---

### upgradePlanet

▸ **upgradePlanet**(`args`: [_UpgradeArgs_](../modules/_types_darkforest_api_contractsapitypes.md#upgradeargs), `actionId`: _string_): _Promise_<TransactionReceipt\>

#### Parameters

| Name       | Type                                                                               |
| :--------- | :--------------------------------------------------------------------------------- |
| `args`     | [_UpgradeArgs_](../modules/_types_darkforest_api_contractsapitypes.md#upgradeargs) |
| `actionId` | _string_                                                                           |

**Returns:** _Promise_<TransactionReceipt\>

---

### waitFor

▸ **waitFor**(`submitted`: SubmittedTx, `receiptPromise`: _Promise_<TransactionReceipt\>): _Promise_<TransactionReceipt\>

Given an unconfirmed (but submitted) transaction, emits the appropriate
[ContractsAPIEvent](../enums/_types_darkforest_api_contractsapitypes.contractsapievent.md).

#### Parameters

| Name             | Type                           |
| :--------------- | :----------------------------- |
| `submitted`      | SubmittedTx                    |
| `receiptPromise` | _Promise_<TransactionReceipt\> |

**Returns:** _Promise_<TransactionReceipt\>

---

### withdrawArtifact

▸ **withdrawArtifact**(`action`: UnconfirmedWithdrawArtifact): _Promise_<TransactionReceipt\>

#### Parameters

| Name     | Type                        |
| :------- | :-------------------------- |
| `action` | UnconfirmedWithdrawArtifact |

**Returns:** _Promise_<TransactionReceipt\>

---

### withdrawSilver

▸ **withdrawSilver**(`action`: UnconfirmedWithdrawSilver): _Promise_<TransactionReceipt\>

#### Parameters

| Name     | Type                      |
| :------- | :------------------------ |
| `action` | UnconfirmedWithdrawSilver |

**Returns:** _Promise_<TransactionReceipt\>

---

### create

▸ `Static` **create**(`ethConnection`: [_default_](backend_network_ethconnection.default.md)): _Promise_<[_default_](backend_gamelogic_contractsapi.default.md)\>

#### Parameters

| Name            | Type                                                  |
| :-------------- | :---------------------------------------------------- |
| `ethConnection` | [_default_](backend_network_ethconnection.default.md) |

**Returns:** _Promise_<[_default_](backend_gamelogic_contractsapi.default.md)\>
