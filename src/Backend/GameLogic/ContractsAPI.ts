import { CONTRACT_PRECISION, EMPTY_LOCATION_ID } from '@darkforest_eth/constants';
import {
  CORE_CONTRACT_ADDRESS,
  GETTERS_CONTRACT_ADDRESS,
  GPT_CREDIT_CONTRACT_ADDRESS,
  SCORING_CONTRACT_ADDRESS,
  WHITELIST_CONTRACT_ADDRESS,
} from '@darkforest_eth/contracts';
import type {
  DarkForestCore,
  DarkForestGetters,
  DarkForestGPTCredit,
  DarkForestScoringRound3,
  Whitelist,
} from '@darkforest_eth/contracts/typechain';
import {
  aggregateBulkGetter,
  ContractCaller,
  EthConnection,
  ethToWei,
  QueuedTransaction,
  TxExecutor,
} from '@darkforest_eth/network';
import {
  address,
  artifactIdFromEthersBN,
  artifactIdToDecStr,
  decodeArrival,
  decodeArtifact,
  decodeArtifactPointValues,
  decodeClaimedCoords,
  decodePlanet,
  decodePlanetDefaults,
  decodePlayer,
  decodeRevealedCoords,
  decodeUpgradeBranches,
  locationIdFromDecStr,
  locationIdFromEthersBN,
  locationIdToDecStr,
} from '@darkforest_eth/serde';
import type {
  BiomebaseSnarkContractCallArgs,
  InitSnarkContractCallArgs,
  MoveSnarkContractCallArgs,
  RevealSnarkContractCallArgs,
} from '@darkforest_eth/snarks';
import {
  Artifact,
  ArtifactId,
  AutoGasSetting,
  ClaimedCoords,
  ContractMethodName,
  DiagnosticUpdater,
  EthAddress,
  LocationId,
  Planet,
  Player,
  QueuedArrival,
  RevealedCoords,
  SubmittedActivateArtifact,
  SubmittedBuyGPTCredits,
  SubmittedBuyHat,
  SubmittedClaim,
  SubmittedDeactivateArtifact,
  SubmittedDepositArtifact,
  SubmittedFindArtifact,
  SubmittedInit,
  SubmittedMove,
  SubmittedPlanetTransfer,
  SubmittedProspectPlanet,
  SubmittedReveal,
  SubmittedTx,
  SubmittedUpgrade,
  SubmittedWithdrawArtifact,
  SubmittedWithdrawSilver,
  UnconfirmedActivateArtifact,
  UnconfirmedClaim,
  UnconfirmedDeactivateArtifact,
  UnconfirmedDepositArtifact,
  UnconfirmedInit,
  UnconfirmedReveal,
  UnconfirmedWithdrawArtifact,
  UnconfirmedWithdrawSilver,
  VoyageId,
  WorldLocation,
} from '@darkforest_eth/types';
import bigInt from 'big-integer';
import { BigNumber as EthersBN, ContractFunction, ethers, Event, providers, utils } from 'ethers';
import { EventEmitter } from 'events';
import _ from 'lodash';
import NotificationManager from '../../Frontend/Game/NotificationManager';
import { openConfirmationWindowForTransaction } from '../../Frontend/Game/Popups';
import { getSetting, Setting } from '../../Frontend/Utils/SettingsHooks';
import {
  ClaimArgs,
  ContractConstants,
  ContractEvent,
  ContractsAPIEvent,
  DepositArtifactArgs,
  MoveArgIdxs,
  MoveArgs,
  PlanetTypeWeightsBySpaceType,
  UpgradeArgIdxs,
  UpgradeArgs,
  WithdrawArtifactArgs,
  ZKArgIdx,
} from '../../_types/darkforest/api/ContractsAPITypes';
import {
  loadCoreContract,
  loadGettersContract,
  loadGptCreditContract,
  loadScoringContract,
  loadWhitelistContract,
} from '../Network/Blockchain';
import { eventLogger, EventType } from '../Network/EventLogger';

/**
 * Roughly contains methods that map 1:1 with functions that live in the contract. Responsible for
 * reading and writing to and from the blockchain.
 *
 * @todo don't inherit from {@link EventEmitter}. instead use {@link Monomitter}
 */
export class ContractsAPI extends EventEmitter {
  /**
   * Don't allow users to submit txs if balance falls below this amount/
   */
  private static readonly MIN_BALANCE = ethToWei(0.002);

  /**
   * Instrumented {@link ThrottledConcurrentQueue} for blockchain reads.
   */
  private readonly contractCaller: ContractCaller;

  /**
   * Instrumented {@link ThrottledConcurrentQueue} for blockchain writes.
   */
  private readonly txExecutor: TxExecutor | undefined;

  /**
   * Our connection to the blockchain. In charge of low level networking, and also of the burner
   * wallet.
   */
  private ethConnection: EthConnection;

  get coreContract() {
    return this.ethConnection.getContract<DarkForestCore>(CORE_CONTRACT_ADDRESS);
  }

  get scoreContract() {
    return this.ethConnection.getContract<DarkForestScoringRound3>(SCORING_CONTRACT_ADDRESS);
  }

  get gettersContract() {
    return this.ethConnection.getContract<DarkForestGetters>(GETTERS_CONTRACT_ADDRESS);
  }

  get whitelistContract() {
    return this.ethConnection.getContract<Whitelist>(WHITELIST_CONTRACT_ADDRESS);
  }

  get gptCreditContract() {
    return this.ethConnection.getContract<DarkForestGPTCredit>(GPT_CREDIT_CONTRACT_ADDRESS);
  }

  public constructor(ethConnection: EthConnection) {
    super();
    this.contractCaller = new ContractCaller();
    this.ethConnection = ethConnection;
    this.txExecutor = new TxExecutor(
      ethConnection,
      this.getGasFeeForTransaction.bind(this),
      this.beforeTransaction.bind(this),
      this.afterTransaction.bind(this)
    );

    this.setupEventListeners();
  }

  /**
   * We pass this function into {@link TxExecutor} to calculate what gas fee we should use for the
   * given transaction. The result is either a number, measured in gwei, represented as a string, or
   * a string representing that we want to use an auto gas setting.
   */
  private getGasFeeForTransaction(tx: QueuedTransaction): AutoGasSetting | string {
    if (
      tx.methodName === ContractMethodName.INIT &&
      tx.contract.address === this.coreContract.address
    ) {
      return '10';
    }

    return getSetting(this.ethConnection.getAddress(), Setting.GasFeeGwei);
  }

  /**
   * This function is called by {@link TxExecutor} before each transaction. It gives the client an
   * opportunity to prevent a transaction from going through based on business logic or user
   * interaction. To prevent the queued transaction from being submitted, throw an Error.
   */
  private async beforeTransaction(txRequest: QueuedTransaction): Promise<void> {
    const address = this.ethConnection.getAddress();
    if (!address) throw new Error("can't send a transaction, no signer");

    const balance = await this.ethConnection.loadBalance(address);

    if (balance.lt(ContractsAPI.MIN_BALANCE)) {
      const notifsManager = NotificationManager.getInstance();
      notifsManager.balanceEmpty();
      throw new Error('xDAI balance too low!');
    }

    const gasFeeGwei = EthersBN.from(txRequest.overrides.gasPrice || '1000000000');

    await openConfirmationWindowForTransaction(this.ethConnection, txRequest, address, gasFeeGwei);
  }

  private async afterTransaction(_txRequest: QueuedTransaction, txDiagnosticInfo: unknown) {
    eventLogger.logEvent(EventType.Transaction, txDiagnosticInfo);
  }

  public destroy(): void {
    this.removeEventListeners();
  }

  private makeCall<T>(contractViewFunction: ContractFunction<T>, args: unknown[] = []): Promise<T> {
    return this.contractCaller.makeCall(contractViewFunction, args);
  }

  public async setupEventListeners(): Promise<void> {
    const { coreContract, scoreContract } = this;

    const filter = {
      address: coreContract.address,
      topics: [
        [
          coreContract.filters.ArrivalQueued(null, null, null, null, null).topics,
          coreContract.filters.ArtifactActivated(null, null, null).topics,
          coreContract.filters.ArtifactDeactivated(null, null, null).topics,
          coreContract.filters.ArtifactDeposited(null, null, null).topics,
          coreContract.filters.ArtifactFound(null, null, null).topics,
          coreContract.filters.ArtifactWithdrawn(null, null, null).topics,
          coreContract.filters.LocationRevealed(null, null).topics,
          coreContract.filters.PlanetHatBought(null, null, null).topics,
          coreContract.filters.PlanetProspected(null, null).topics,
          coreContract.filters.PlanetSilverWithdrawn(null, null, null).topics,
          coreContract.filters.PlanetTransferred(null, null, null).topics,
          coreContract.filters.PlanetUpgraded(null, null, null, null).topics,
          coreContract.filters.PlayerInitialized(null, null).topics,
        ].map((topicsOrUndefined) => (topicsOrUndefined || [])[0]),
      ] as Array<string | Array<string>>,
    };

    const eventHandlers = {
      [ContractEvent.ArtifactFound]: (
        _playerAddr: string,
        rawArtifactId: EthersBN,
        loc: EthersBN
      ) => {
        const artifactId = artifactIdFromEthersBN(rawArtifactId);
        this.emit(ContractsAPIEvent.ArtifactUpdate, artifactId);
        this.emit(ContractsAPIEvent.PlanetUpdate, locationIdFromEthersBN(loc));
      },
      [ContractEvent.ArtifactDeposited]: (
        _playerAddr: string,
        rawArtifactId: EthersBN,
        loc: EthersBN
      ) => {
        const artifactId = artifactIdFromEthersBN(rawArtifactId);
        this.emit(ContractsAPIEvent.ArtifactUpdate, artifactId);
        this.emit(ContractsAPIEvent.PlanetUpdate, locationIdFromEthersBN(loc));
      },
      [ContractEvent.ArtifactWithdrawn]: (
        _playerAddr: string,
        rawArtifactId: EthersBN,
        loc: EthersBN
      ) => {
        const artifactId = artifactIdFromEthersBN(rawArtifactId);
        this.emit(ContractsAPIEvent.ArtifactUpdate, artifactId);
        this.emit(ContractsAPIEvent.PlanetUpdate, locationIdFromEthersBN(loc));
      },
      [ContractEvent.ArtifactActivated]: (
        _playerAddr: string,
        rawArtifactId: EthersBN,
        loc: EthersBN
      ) => {
        const artifactId = artifactIdFromEthersBN(rawArtifactId);
        this.emit(ContractsAPIEvent.ArtifactUpdate, artifactId);
        this.emit(ContractsAPIEvent.PlanetUpdate, locationIdFromEthersBN(loc));
      },
      [ContractEvent.ArtifactDeactivated]: (
        _playerAddr: string,
        rawArtifactId: EthersBN,
        loc: EthersBN
      ) => {
        const artifactId = artifactIdFromEthersBN(rawArtifactId);
        this.emit(ContractsAPIEvent.ArtifactUpdate, artifactId);
        this.emit(ContractsAPIEvent.PlanetUpdate, locationIdFromEthersBN(loc));
      },
      [ContractEvent.PlayerInitialized]: async (player: string, locRaw: EthersBN, _: Event) => {
        this.emit(ContractsAPIEvent.PlayerUpdate, address(player));
        this.emit(ContractsAPIEvent.PlanetUpdate, locationIdFromEthersBN(locRaw));
        this.emit(ContractsAPIEvent.RadiusUpdated);
      },
      [ContractEvent.PlanetTransferred]: async (
        _senderAddress: string,
        planetId: EthersBN,
        receiverAddress: string,
        _: Event
      ) => {
        this.emit(
          ContractsAPIEvent.PlanetTransferred,
          locationIdFromEthersBN(planetId),
          receiverAddress.toLowerCase() as EthAddress
        );
      },
      [ContractEvent.ArrivalQueued]: async (
        _playerAddr: string,
        arrivalId: EthersBN,
        fromLocRaw: EthersBN,
        toLocRaw: EthersBN,
        _artifactIdRaw: EthersBN,
        _: Event
      ) => {
        this.emit(
          ContractsAPIEvent.ArrivalQueued,
          arrivalId.toString() as VoyageId,
          locationIdFromEthersBN(fromLocRaw),
          locationIdFromEthersBN(toLocRaw)
        );
        this.emit(ContractsAPIEvent.RadiusUpdated);
      },
      [ContractEvent.PlanetUpgraded]: async (
        _playerAddr: string,
        location: EthersBN,
        _branch: EthersBN,
        _toBranchLevel: EthersBN,
        _: Event
      ) => {
        this.emit(ContractsAPIEvent.PlanetUpdate, locationIdFromEthersBN(location));
      },
      [ContractEvent.PlanetHatBought]: async (
        _playerAddress: string,
        location: EthersBN,
        _: Event
      ) => this.emit(ContractsAPIEvent.PlanetUpdate, locationIdFromEthersBN(location)),
      [ContractEvent.LocationRevealed]: async (
        revealerAddr: string,
        location: EthersBN,
        _: Event
      ) => {
        this.emit(ContractsAPIEvent.PlanetUpdate, locationIdFromEthersBN(location));
        this.emit(
          ContractsAPIEvent.LocationRevealed,
          locationIdFromEthersBN(location),
          address(revealerAddr.toLowerCase())
        );
        this.emit(ContractsAPIEvent.PlayerUpdate, address(revealerAddr));
      },
      [ContractEvent.PlanetSilverWithdrawn]: async (
        player: string,
        location: EthersBN,
        _amount: EthersBN,
        _: Event
      ) => {
        this.emit(ContractsAPIEvent.PlanetUpdate, locationIdFromEthersBN(location));
        this.emit(ContractsAPIEvent.PlayerUpdate, address(player));
      },
    };

    this.ethConnection.subscribeToContractEvents(coreContract, eventHandlers, filter);

    scoreContract.on(
      ContractEvent.LocationClaimed,
      async (revealerAddr: string, _previousClaimer: string, location: EthersBN, _: Event) => {
        this.emit(ContractsAPIEvent.PlanetUpdate, locationIdFromEthersBN(location));
        this.emit(
          ContractsAPIEvent.PlanetClaimed,
          locationIdFromEthersBN(location),
          address(revealerAddr.toLowerCase())
        );
        this.emit(ContractsAPIEvent.PlayerUpdate, address(revealerAddr));
      }
    );
  }

  public removeEventListeners(): void {
    const { coreContract, scoreContract } = this;

    coreContract.removeAllListeners(ContractEvent.PlayerInitialized);
    coreContract.removeAllListeners(ContractEvent.ArrivalQueued);
    coreContract.removeAllListeners(ContractEvent.PlanetUpgraded);
    coreContract.removeAllListeners(ContractEvent.PlanetHatBought);
    coreContract.removeAllListeners(ContractEvent.PlanetTransferred);
    coreContract.removeAllListeners(ContractEvent.ArtifactFound);
    coreContract.removeAllListeners(ContractEvent.ArtifactDeposited);
    coreContract.removeAllListeners(ContractEvent.ArtifactWithdrawn);
    coreContract.removeAllListeners(ContractEvent.ArtifactActivated);
    coreContract.removeAllListeners(ContractEvent.ArtifactDeactivated);
    coreContract.removeAllListeners(ContractEvent.LocationRevealed);
    coreContract.removeAllListeners(ContractEvent.PlanetSilverWithdrawn);
    scoreContract.removeAllListeners(ContractEvent.LocationClaimed);
  }

  public getContractAddress(): EthAddress {
    return address(this.coreContract.address);
  }

  /**
   * Given an unconfirmed (but submitted) transaction, emits the appropriate
   * [[ContractsAPIEvent]].
   */
  public waitFor(
    submitted: SubmittedTx,
    receiptPromise: Promise<providers.TransactionReceipt>
  ): Promise<void | providers.TransactionReceipt> {
    this.emit(ContractsAPIEvent.TxSubmitted, submitted);

    return receiptPromise
      .then((receipt) => {
        this.emit(ContractsAPIEvent.TxConfirmed, submitted);
        return receipt;
      })
      .catch((_err) => {
        this.emit(ContractsAPIEvent.TxReverted, submitted);
      });
  }

  async reveal(
    args: RevealSnarkContractCallArgs,
    action: UnconfirmedReveal
  ): Promise<void | providers.TransactionReceipt> {
    if (!this.txExecutor) {
      throw new Error('no signer, cannot execute tx');
    }

    const tx = this.txExecutor.queueTransaction(
      action.actionId,
      this.coreContract,
      ContractMethodName.REVEAL_LOCATION,
      args
    );
    const unminedRevealTx: SubmittedReveal = {
      ...action,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
    };

    return this.waitFor(unminedRevealTx, tx.confirmed);
  }

  async claim(
    args: ClaimArgs,
    action: UnconfirmedClaim
  ): Promise<void | providers.TransactionReceipt> {
    if (!this.txExecutor) {
      throw new Error('no signer, cannot execute tx');
    }

    const tx = this.txExecutor.queueTransaction(
      action.actionId,
      this.scoreContract,
      ContractMethodName.CLAIM_LOCATION,
      args
    );
    const unminedClaimTx: SubmittedClaim = {
      ...action,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
    };

    return this.waitFor(unminedClaimTx, tx.confirmed);
  }

  async initializePlayer(
    args: InitSnarkContractCallArgs,
    action: UnconfirmedInit
  ): Promise<void | providers.TransactionReceipt> {
    if (!this.txExecutor) {
      throw new Error('no signer, cannot execute tx');
    }
    const tx = this.txExecutor.queueTransaction(
      action.actionId,
      this.coreContract,
      ContractMethodName.INIT,
      args
    );

    const unminedInitTx: SubmittedInit = {
      ...action,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
    };

    return this.waitFor(unminedInitTx, tx.confirmed);
  }

  async transferOwnership(
    planetId: LocationId,
    newOwner: EthAddress,
    actionId: string
  ): Promise<void | providers.TransactionReceipt> {
    if (!this.txExecutor) {
      throw new Error('no signer, cannot execute tx');
    }
    const tx = this.txExecutor.queueTransaction(
      actionId,
      this.coreContract,
      ContractMethodName.PLANET_TRANSFER,
      [locationIdToDecStr(planetId), newOwner]
    );

    const unminedTransferTx: SubmittedPlanetTransfer = {
      actionId,
      methodName: ContractMethodName.PLANET_TRANSFER,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
      planetId,
      newOwner,
    };

    return this.waitFor(unminedTransferTx, tx.confirmed);
  }

  // throws if tx initialization fails
  // otherwise, returns a promise of a submtited (unmined) tx receipt
  async upgradePlanet(
    args: UpgradeArgs,
    actionId: string
  ): Promise<void | providers.TransactionReceipt> {
    if (!this.txExecutor) {
      throw new Error('no signer, cannot execute tx');
    }
    const tx = this.txExecutor.queueTransaction(
      actionId,
      this.coreContract,
      ContractMethodName.UPGRADE,
      args
    );

    const unminedUpgradeTx: SubmittedUpgrade = {
      actionId,
      methodName: ContractMethodName.UPGRADE,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
      locationId: locationIdFromDecStr(args[UpgradeArgIdxs.LOCATION_ID]),
      upgradeBranch: parseInt(args[UpgradeArgIdxs.UPGRADE_BRANCH]),
    };

    return this.waitFor(unminedUpgradeTx, tx.confirmed);
  }

  async prospectPlanet(planetId: LocationId, actionId: string) {
    if (!this.txExecutor) {
      throw new Error('no signer, cannot execute tx');
    }

    const args = [locationIdToDecStr(planetId)];

    const tx = this.txExecutor.queueTransaction(
      actionId,
      this.coreContract,
      ContractMethodName.PROSPECT_PLANET,
      args
    );

    const unminedFindArtifact: SubmittedProspectPlanet = {
      actionId,
      methodName: ContractMethodName.PROSPECT_PLANET,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
      planetId,
    };

    return this.waitFor(unminedFindArtifact, tx.confirmed);
  }

  // throws if tx initialization fails
  // otherwise, returns a promise of a submtited (unmined) tx receipt
  async findArtifact(
    location: WorldLocation,
    biomeSnarkArgs: BiomebaseSnarkContractCallArgs,
    actionId: string
  ): Promise<void | providers.TransactionReceipt> {
    if (!this.txExecutor) {
      throw new Error('no signer, cannot execute tx');
    }
    const tx = this.txExecutor.queueTransaction(
      actionId,
      this.coreContract,
      ContractMethodName.FIND_ARTIFACT,
      biomeSnarkArgs
    );

    const unminedFindArtifact: SubmittedFindArtifact = {
      actionId,
      methodName: ContractMethodName.FIND_ARTIFACT,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
      planetId: location.hash,
    };

    return this.waitFor(unminedFindArtifact, tx.confirmed);
  }

  async depositArtifact(
    action: UnconfirmedDepositArtifact
  ): Promise<void | providers.TransactionReceipt> {
    if (!this.txExecutor) {
      throw new Error('no signer, cannot execute tx');
    }
    const args: DepositArtifactArgs = [
      locationIdToDecStr(action.locationId),
      artifactIdToDecStr(action.artifactId),
    ];

    const tx = this.txExecutor.queueTransaction(
      action.actionId,
      this.coreContract,
      ContractMethodName.DEPOSIT_ARTIFACT,
      args
    );

    const submittedTx: SubmittedDepositArtifact = {
      ...action,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
    };

    return this.waitFor(submittedTx, tx.confirmed);
  }

  // throws if tx initialization fails
  // otherwise, returns a promise of a submtited (unmined) tx receipt
  async withdrawArtifact(
    action: UnconfirmedWithdrawArtifact
  ): Promise<void | providers.TransactionReceipt> {
    if (!this.txExecutor) {
      throw new Error('no signer, cannot execute tx');
    }
    const args: WithdrawArtifactArgs = [
      locationIdToDecStr(action.locationId),
      artifactIdToDecStr(action.artifactId),
    ];

    const tx = this.txExecutor.queueTransaction(
      action.actionId,
      this.coreContract,
      ContractMethodName.WITHDRAW_ARTIFACT,
      args
    );

    const submittedTx: SubmittedWithdrawArtifact = {
      ...action,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
    };

    return this.waitFor(submittedTx, tx.confirmed);
  }

  async activateArtifact(action: UnconfirmedActivateArtifact) {
    if (!this.txExecutor) {
      throw new Error('no signer, cannot execute tx');
    }

    const args = [
      locationIdToDecStr(action.locationId),
      artifactIdToDecStr(action.artifactId),
      action.wormholeTo ? locationIdToDecStr(action.wormholeTo) : '0',
    ];

    const tx = this.txExecutor.queueTransaction(
      action.actionId,
      this.coreContract,
      ContractMethodName.ACTIVATE_ARTIFACT,
      args
    );

    const submittedTx: SubmittedActivateArtifact = {
      ...action,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
    };

    return this.waitFor(submittedTx, tx.confirmed);
  }

  async deactivateArtifact(action: UnconfirmedDeactivateArtifact) {
    if (!this.txExecutor) {
      throw new Error('no signer, cannot execute tx');
    }

    const args = [locationIdToDecStr(action.locationId)];

    const tx = this.txExecutor.queueTransaction(
      action.actionId,
      this.coreContract,
      ContractMethodName.DEACTIVATE_ARTIFACT,
      args
    );

    const submittedTx: SubmittedDeactivateArtifact = {
      ...action,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
    };

    return this.waitFor(submittedTx, tx.confirmed);
  }

  // throws if tx initialization fails
  // otherwise, returns a promise of a submtited (unmined) tx receipt
  async move(
    actionId: string,
    snarkArgs: MoveSnarkContractCallArgs,
    shipsMoved: number,
    silverMoved: number,
    artifactMoved?: ArtifactId
  ): Promise<void | providers.TransactionReceipt> {
    if (!this.txExecutor) {
      throw new Error('no signer, cannot execute tx');
    }
    const args = [
      snarkArgs[ZKArgIdx.PROOF_A],
      snarkArgs[ZKArgIdx.PROOF_B],
      snarkArgs[ZKArgIdx.PROOF_C],
      [
        ...snarkArgs[ZKArgIdx.DATA],
        (shipsMoved * CONTRACT_PRECISION).toString(),
        (silverMoved * CONTRACT_PRECISION).toString(),
        '0',
      ],
    ] as MoveArgs;

    if (artifactMoved) {
      args[ZKArgIdx.DATA][MoveArgIdxs.ARTIFACT_SENT] = artifactIdToDecStr(artifactMoved);
    }

    const tx = this.txExecutor.queueTransaction(
      actionId,
      this.coreContract,
      ContractMethodName.MOVE,
      args
    );

    const forcesFloat = parseFloat(args[ZKArgIdx.DATA][MoveArgIdxs.SHIPS_SENT]);
    const silverFloat = parseFloat(args[ZKArgIdx.DATA][MoveArgIdxs.SILVER_SENT]);

    const unminedMoveTx: SubmittedMove = {
      actionId,
      methodName: ContractMethodName.MOVE,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
      from: locationIdFromDecStr(args[ZKArgIdx.DATA][MoveArgIdxs.FROM_ID]),
      to: locationIdFromDecStr(args[ZKArgIdx.DATA][MoveArgIdxs.TO_ID]),
      forces: forcesFloat / CONTRACT_PRECISION,
      silver: silverFloat / CONTRACT_PRECISION,
    };

    if (artifactMoved) unminedMoveTx.artifact = artifactMoved;

    return this.waitFor(unminedMoveTx, tx.confirmed);
  }

  async buyHat(planetIdDecStr: string, currentHatLevel: number, actionId: string) {
    if (!this.txExecutor) {
      throw new Error('no signer, cannot execute tx');
    }
    const overrides: providers.TransactionRequest = {
      gasLimit: 500000,
      value: bigInt(1000000000000000000)
        .multiply(2 ** currentHatLevel)
        .toString(),
    };

    const tx = this.txExecutor.queueTransaction(
      actionId,
      this.coreContract,
      ContractMethodName.BUY_HAT,
      [planetIdDecStr],
      overrides
    );

    const unminedBuyHatTx: SubmittedBuyHat = {
      actionId,
      methodName: ContractMethodName.BUY_HAT,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
      locationId: locationIdFromDecStr(planetIdDecStr),
    };

    return this.waitFor(unminedBuyHatTx, tx.confirmed);
  }

  async withdrawSilver(
    action: UnconfirmedWithdrawSilver
  ): Promise<void | providers.TransactionReceipt> {
    if (!this.txExecutor) {
      throw new Error('no signer, cannot execute tx');
    }

    const args = [locationIdToDecStr(action.locationId), action.amount * CONTRACT_PRECISION];
    const tx = this.txExecutor.queueTransaction(
      action.actionId,
      this.coreContract,
      ContractMethodName.WITHDRAW_SILVER,
      args
    );
    const unminedWithdrawSilverTx: SubmittedWithdrawSilver = {
      ...action,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
    };

    return this.waitFor(unminedWithdrawSilverTx, tx.confirmed);
  }

  async buyGPTCredits(amount: number, actionId: string) {
    if (!this.txExecutor) {
      throw new Error('no signer, cannot execute tx');
    }
    const costPerCreditStr = (
      await this.makeCall<EthersBN>(this.gptCreditContract.creditPrice)
    ).toString();
    const overrides: providers.TransactionRequest = {
      value: bigInt(costPerCreditStr).multiply(amount).toString(),
    };

    const tx = this.txExecutor.queueTransaction(
      actionId,
      this.gptCreditContract,
      ContractMethodName.BUY_GPT_CREDITS,
      [amount],
      overrides
    );

    const unminedBuyGPTCreditsTx: SubmittedBuyGPTCredits = {
      actionId,
      methodName: ContractMethodName.BUY_GPT_CREDITS,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
      amount,
    };

    return this.waitFor(unminedBuyGPTCreditsTx, tx.confirmed);
  }

  async getGPTCreditPriceEther(): Promise<number> {
    // price in ether
    const costPerCreditWeiStr = (
      await this.makeCall<EthersBN>(this.gptCreditContract.creditPrice)
    ).toString();
    const costPerCredit = ethers.utils.formatEther(costPerCreditWeiStr);
    return parseFloat(costPerCredit);
  }

  public async getGPTCreditBalance(address: EthAddress | undefined): Promise<number> {
    if (address === undefined) return 0;

    const gptCreditsBalance = await this.makeCall<EthersBN>(this.gptCreditContract.credits, [
      address,
    ]);
    return gptCreditsBalance.toNumber();
  }

  /**
   * If this player has a claimed planet, their score is the distance between the claimed planet and
   * the center. If this player does not have a claimed planet, then the score is undefined.
   */
  async getScoreV3(address: EthAddress | undefined): Promise<number | undefined> {
    if (address === undefined) return undefined;

    const score = await this.makeCall<EthersBN>(this.scoreContract.getScore, [address]);

    if (
      score.eq(EthersBN.from('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'))
    ) {
      return undefined;
    }

    return score.toNumber();
  }

  async getConstants(): Promise<ContractConstants> {
    const {
      DISABLE_ZK_CHECKS,
      PLANETHASH_KEY,
      SPACETYPE_KEY,
      BIOMEBASE_KEY,
      PERLIN_LENGTH_SCALE,
      PERLIN_MIRROR_X,
      PERLIN_MIRROR_Y,
    } = await this.makeCall(this.coreContract.snarkConstants);
    const {
      MAX_NATURAL_PLANET_LEVEL,
      TIME_FACTOR_HUNDREDTHS,
      PERLIN_THRESHOLD_1,
      PERLIN_THRESHOLD_2,
      PERLIN_THRESHOLD_3,
      INIT_PERLIN_MIN,
      INIT_PERLIN_MAX,
      SPAWN_RIM_AREA,
      BIOME_THRESHOLD_1,
      BIOME_THRESHOLD_2,
      PLANET_RARITY,
      PHOTOID_ACTIVATION_DELAY,
      LOCATION_REVEAL_COOLDOWN,
    } = await this.makeCall(this.coreContract.gameConstants);

    const CLAIM_PLANET_COOLDOWN = await (
      await this.makeCall(this.scoreContract.gameConstants)
    ).CLAIM_PLANET_COOLDOWN_SECONDS;

    const TOKEN_MINT_END_SECONDS = (
      await this.makeCall(this.coreContract.TOKEN_MINT_END_TIMESTAMP)
    ).toNumber();

    const upgrades = decodeUpgradeBranches(await this.makeCall(this.coreContract.getUpgrades));

    const PLANET_TYPE_WEIGHTS: PlanetTypeWeightsBySpaceType =
      await this.makeCall<PlanetTypeWeightsBySpaceType>(this.coreContract.getTypeWeights);

    const rawPointValues = await this.makeCall(this.coreContract.getArtifactPointValues);
    const ARTIFACT_POINT_VALUES = decodeArtifactPointValues(rawPointValues);

    const planetDefaults = decodePlanetDefaults(
      await this.makeCall(this.coreContract.getDefaultStats)
    );

    const planetLevelThresholds = (
      await this.makeCall<EthersBN[]>(this.coreContract.getPlanetLevelThresholds)
    ).map((x: EthersBN) => x.toNumber());

    const planetCumulativeRarities = (
      await this.makeCall<EthersBN[]>(this.coreContract.getCumulativeRarities)
    ).map((x: EthersBN) => x.toNumber());

    return {
      DISABLE_ZK_CHECKS,

      PLANETHASH_KEY: PLANETHASH_KEY.toNumber(),
      SPACETYPE_KEY: SPACETYPE_KEY.toNumber(),
      BIOMEBASE_KEY: BIOMEBASE_KEY.toNumber(),
      PERLIN_LENGTH_SCALE: PERLIN_LENGTH_SCALE.toNumber(),
      PERLIN_MIRROR_X,
      PERLIN_MIRROR_Y,

      TOKEN_MINT_END_SECONDS,
      MAX_NATURAL_PLANET_LEVEL: MAX_NATURAL_PLANET_LEVEL.toNumber(),
      TIME_FACTOR_HUNDREDTHS: TIME_FACTOR_HUNDREDTHS.toNumber(),
      PERLIN_THRESHOLD_1: PERLIN_THRESHOLD_1.toNumber(),
      PERLIN_THRESHOLD_2: PERLIN_THRESHOLD_2.toNumber(),
      PERLIN_THRESHOLD_3: PERLIN_THRESHOLD_3.toNumber(),
      INIT_PERLIN_MIN: INIT_PERLIN_MIN.toNumber(),
      INIT_PERLIN_MAX: INIT_PERLIN_MAX.toNumber(),
      BIOME_THRESHOLD_1: BIOME_THRESHOLD_1.toNumber(),
      BIOME_THRESHOLD_2: BIOME_THRESHOLD_2.toNumber(),
      PLANET_RARITY: PLANET_RARITY.toNumber(),
      PLANET_TYPE_WEIGHTS,
      ARTIFACT_POINT_VALUES,

      PHOTOID_ACTIVATION_DELAY: PHOTOID_ACTIVATION_DELAY.toNumber(),
      SPAWN_RIM_AREA: SPAWN_RIM_AREA.toNumber(),
      LOCATION_REVEAL_COOLDOWN: LOCATION_REVEAL_COOLDOWN.toNumber(),
      CLAIM_PLANET_COOLDOWN: CLAIM_PLANET_COOLDOWN.toNumber(),

      defaultPopulationCap: planetDefaults.populationCap,
      defaultPopulationGrowth: planetDefaults.populationGrowth,
      defaultRange: planetDefaults.range,
      defaultSpeed: planetDefaults.speed,
      defaultDefense: planetDefaults.defense,
      defaultSilverGrowth: planetDefaults.silverGrowth,
      defaultSilverCap: planetDefaults.silverCap,
      defaultBarbarianPercentage: planetDefaults.barbarianPercentage,
      planetLevelThresholds,
      planetCumulativeRarities,
      upgrades,
    };
  }

  public async getPlayers(
    onProgress?: (fractionCompleted: number) => void
  ): Promise<Map<string, Player>> {
    const nPlayers: number = (
      await this.makeCall<EthersBN>(this.coreContract.getNPlayers)
    ).toNumber();

    const players = await aggregateBulkGetter<Player>(
      nPlayers,
      200,
      async (start, end) =>
        (await this.makeCall(this.gettersContract.bulkGetPlayers, [start, end])).map(decodePlayer),
      onProgress
    );
    const lastClaimTimestamps = await aggregateBulkGetter(
      nPlayers,
      5,
      (start: number, end: number) =>
        this.contractCaller.makeCall(this.scoreContract.bulkGetLastClaimTimestamp, [start, end])
    );
    const playerLastClaimTimestampMap = lastClaimTimestamps.reduce((acc, pair): Map<
      string,
      EthersBN
    > => {
      acc.set(pair.player, pair.lastClaimTimestamp);
      return acc;
    }, new Map<string, EthersBN>());

    const playerMap: Map<EthAddress, Player> = new Map();
    for (const player of players) {
      player.lastClaimTimestamp = playerLastClaimTimestampMap.get(player.address)?.toNumber() || 0;
      playerMap.set(player.address, player);
    }
    return playerMap;
  }

  public async getPlayerById(playerId: EthAddress): Promise<Player | undefined> {
    const rawPlayer = await this.makeCall(this.coreContract.players, [playerId]);
    const lastClaimedTimestamp = await this.makeCall(this.scoreContract.getLastClaimTimestamp, [
      playerId,
    ]);
    const scoreFromBlockchain = await this.getScoreV3(playerId);
    if (!rawPlayer.isInitialized) return undefined;

    const player = decodePlayer(rawPlayer);
    player.lastClaimTimestamp = lastClaimedTimestamp.toNumber();
    player.score = scoreFromBlockchain;
    return player;
  }

  public async getWorldRadius(): Promise<number> {
    const radius = (await this.makeCall<EthersBN>(this.coreContract.worldRadius)).toNumber();
    return radius;
  }

  // timestamp since epoch (in seconds)
  public async getTokenMintEndTimestamp(): Promise<number> {
    const timestamp = (
      await this.makeCall<EthersBN>(this.coreContract.TOKEN_MINT_END_TIMESTAMP)
    ).toNumber();
    return timestamp;
  }

  public async getContractBalance(): Promise<number> {
    const rawBalance = await this.makeCall<EthersBN>(this.coreContract.getBalance);
    const myBalance = utils.formatEther(rawBalance);
    const numBalance = parseFloat(myBalance);
    return numBalance;
  }

  public async getArrival(arrivalId: number): Promise<QueuedArrival | undefined> {
    const rawArrival = await this.makeCall(this.coreContract.planetArrivals, [arrivalId]);
    return decodeArrival(rawArrival);
  }

  public async getArrivalsForPlanet(planetId: LocationId): Promise<QueuedArrival[]> {
    const events = (
      await this.makeCall(this.gettersContract.getPlanetArrivals, [locationIdToDecStr(planetId)])
    ).map(decodeArrival);

    return events;
  }

  public async getAllArrivals(
    planetsToLoad: LocationId[],
    onProgress?: (fractionCompleted: number) => void
  ): Promise<QueuedArrival[]> {
    const arrivalsUnflattened = await aggregateBulkGetter<QueuedArrival[]>(
      planetsToLoad.length,
      200,
      async (start, end) => {
        return (
          await this.makeCall(this.gettersContract.bulkGetPlanetArrivalsByIds, [
            planetsToLoad.slice(start, end).map(locationIdToDecStr),
          ])
        ).map((arrivals) => arrivals.map(decodeArrival));
      },
      onProgress
    );

    return _.flatten(arrivalsUnflattened);
  }

  public async getTouchedPlanetIds(
    startingAt: number,
    onProgress?: (fractionCompleted: number) => void
  ): Promise<LocationId[]> {
    const nPlanets: number = (
      await this.makeCall<EthersBN>(this.coreContract.getNPlanets)
    ).toNumber();

    const planetIds = await aggregateBulkGetter<EthersBN>(
      nPlanets - startingAt,
      1000,
      async (start, end) =>
        await this.makeCall(this.gettersContract.bulkGetPlanetIds, [
          start + startingAt,
          end + startingAt,
        ]),
      onProgress
    );
    return planetIds.map(locationIdFromEthersBN);
  }

  public async getRevealedCoordsByIdIfExists(
    planetId: LocationId
  ): Promise<RevealedCoords | undefined> {
    const decStrId = locationIdToDecStr(planetId);
    const rawRevealedCoords = await this.makeCall(this.coreContract.revealedCoords, [decStrId]);
    const ret = decodeRevealedCoords(rawRevealedCoords);
    if (ret.hash === EMPTY_LOCATION_ID) {
      return undefined;
    }
    return ret;
  }

  public async getRevealedPlanetsCoords(
    startingAt: number,
    onProgressIds?: (fractionCompleted: number) => void,
    onProgressCoords?: (fractionCompleted: number) => void
  ): Promise<RevealedCoords[]> {
    const nRevealedPlanets: number = (
      await this.makeCall<EthersBN>(this.coreContract.getNRevealedPlanets)
    ).toNumber();

    const rawRevealedPlanetIds = await aggregateBulkGetter<EthersBN>(
      nRevealedPlanets - startingAt,
      500,
      async (start, end) =>
        await this.makeCall(this.gettersContract.bulkGetRevealedPlanetIds, [
          start + startingAt,
          end + startingAt,
        ]),
      onProgressIds
    );

    const rawRevealedCoords = await aggregateBulkGetter(
      rawRevealedPlanetIds.length,
      500,
      async (start, end) =>
        await this.makeCall(this.gettersContract.bulkGetRevealedCoordsByIds, [
          rawRevealedPlanetIds.slice(start, end),
        ]),
      onProgressCoords
    );

    return rawRevealedCoords.map(decodeRevealedCoords);
  }

  public async getClaimedCoordsByIdIfExists(
    planetId: LocationId
  ): Promise<ClaimedCoords | undefined> {
    const decStrId = locationIdToDecStr(planetId);
    const rawClaimedCoords = await this.makeCall(this.scoreContract.getClaimedCoords, [decStrId]);
    const ret = decodeClaimedCoords(rawClaimedCoords);
    if (ret.hash === EMPTY_LOCATION_ID) {
      return undefined;
    }
    return ret;
  }

  public async getClaimedPlanetsCoords(
    startingAt: number,
    onProgressIds?: (fractionCompleted: number) => void,
    onProgressCoords?: (fractionCompleted: number) => void
  ): Promise<ClaimedCoords[]> {
    const nRevealedPlanets: number = (
      await this.makeCall<EthersBN>(this.scoreContract.getNClaimedPlanets)
    ).toNumber();

    const rawRevealedPlanetIds = await aggregateBulkGetter<EthersBN>(
      nRevealedPlanets - startingAt,
      500,
      async (start, end) =>
        await this.makeCall(this.scoreContract.bulkGetClaimedPlanetIds, [
          start + startingAt,
          end + startingAt,
        ]),
      onProgressIds
    );

    const rawClaimedCoords = await aggregateBulkGetter(
      rawRevealedPlanetIds.length,
      500,
      async (start, end) =>
        await this.makeCall(this.scoreContract.bulkGetClaimedCoordsByIds, [
          rawRevealedPlanetIds.slice(start, end),
        ]),
      onProgressCoords
    );

    return rawClaimedCoords.map(decodeClaimedCoords);
  }

  public async bulkGetPlanets(
    toLoadPlanets: LocationId[],
    onProgressPlanet?: (fractionCompleted: number) => void,
    onProgressMetadata?: (fractionCompleted: number) => void
  ): Promise<Map<LocationId, Planet>> {
    const rawPlanets = await aggregateBulkGetter(
      toLoadPlanets.length,
      200,
      async (start, end) =>
        await this.makeCall(this.gettersContract.bulkGetPlanetsByIds, [
          toLoadPlanets.slice(start, end).map(locationIdToDecStr),
        ]),
      onProgressPlanet
    );

    const rawPlanetsExtendedInfo = await aggregateBulkGetter(
      toLoadPlanets.length,
      200,
      async (start, end) =>
        await this.makeCall(this.gettersContract.bulkGetPlanetsExtendedInfoByIds, [
          toLoadPlanets.slice(start, end).map(locationIdToDecStr),
        ]),
      onProgressMetadata
    );

    const planets: Map<LocationId, Planet> = new Map();

    for (let i = 0; i < toLoadPlanets.length; i += 1) {
      if (!!rawPlanets[i] && !!rawPlanetsExtendedInfo[i]) {
        const planet = decodePlanet(
          locationIdToDecStr(toLoadPlanets[i]),
          rawPlanets[i],
          rawPlanetsExtendedInfo[i]
        );
        planets.set(planet.locationId, planet);
      }
    }
    return planets;
  }

  public async getPlanetById(planetId: LocationId): Promise<Planet | undefined> {
    const decStrId = locationIdToDecStr(planetId);
    const rawExtendedInfo = await this.makeCall(this.coreContract.planetsExtendedInfo, [decStrId]);
    if (!rawExtendedInfo[0]) return undefined; // planetExtendedInfo.isInitialized is false
    const rawPlanet = await this.makeCall(this.coreContract.planets, [decStrId]);
    return decodePlanet(decStrId, rawPlanet, rawExtendedInfo);
  }

  public async getArtifactById(artifactId: ArtifactId): Promise<Artifact | undefined> {
    const exists = await this.makeCall<boolean>(this.gettersContract.doesArtifactExist, [
      artifactIdToDecStr(artifactId),
    ]);
    if (!exists) return undefined;
    const rawArtifact = await this.makeCall(this.gettersContract.getArtifactById, [
      artifactIdToDecStr(artifactId),
    ]);

    return decodeArtifact(rawArtifact);
  }

  public async bulkGetArtifactsOnPlanets(
    locationIds: LocationId[],
    onProgress?: (fractionCompleted: number) => void
  ): Promise<Artifact[][]> {
    const rawArtifacts = await aggregateBulkGetter(
      locationIds.length,
      200,
      async (start, end) =>
        await this.makeCall(this.gettersContract.bulkGetPlanetArtifacts, [
          locationIds.slice(start, end).map(locationIdToDecStr),
        ]),
      onProgress
    );

    return rawArtifacts.map((rawArtifactArray) => {
      return rawArtifactArray.map(decodeArtifact);
    });
  }

  public async bulkGetArtifacts(
    artifactIds: ArtifactId[],
    onProgress?: (fractionCompleted: number) => void
  ): Promise<Artifact[]> {
    const rawArtifacts = await aggregateBulkGetter(
      artifactIds.length,
      200,
      async (start, end) =>
        await this.makeCall(this.gettersContract.bulkGetArtifactsByIds, [
          artifactIds.slice(start, end).map(artifactIdToDecStr),
        ]),
      onProgress
    );

    const ret: Artifact[] = rawArtifacts.map(decodeArtifact);

    return ret;
  }

  public async getPlayerArtifacts(
    playerId?: EthAddress,
    onProgress?: (percent: number) => void
  ): Promise<Artifact[]> {
    if (playerId === undefined) return [];

    const myArtifactIds = (
      await this.makeCall(this.gettersContract.getPlayerArtifactIds, [playerId])
    ).map(artifactIdFromEthersBN);
    return this.bulkGetArtifacts(myArtifactIds, onProgress);
  }

  public hasAccount(): boolean {
    return this.ethConnection.hasSigner();
  }

  public getAccount(): EthAddress | undefined {
    return this.ethConnection.getAddress();
  }

  public async getBalance(): Promise<EthersBN> {
    const address = this.getAccount();

    if (!address) {
      return EthersBN.from(0);
    }

    return this.ethConnection.loadBalance(address);
  }

  public setDiagnosticUpdater(diagnosticUpdater?: DiagnosticUpdater) {
    this.contractCaller.setDiagnosticUpdater(diagnosticUpdater);
    this.txExecutor?.setDiagnosticUpdater(diagnosticUpdater);
    this.ethConnection.setDiagnosticUpdater(diagnosticUpdater);
  }
}

export async function makeContractsAPI(ethConnection: EthConnection): Promise<ContractsAPI> {
  // Could turn this into an array and iterate, but I like the explicitness
  await ethConnection.loadContract(CORE_CONTRACT_ADDRESS, loadCoreContract);
  await ethConnection.loadContract(SCORING_CONTRACT_ADDRESS, loadScoringContract);
  await ethConnection.loadContract(GETTERS_CONTRACT_ADDRESS, loadGettersContract);
  await ethConnection.loadContract(WHITELIST_CONTRACT_ADDRESS, loadWhitelistContract);
  await ethConnection.loadContract(GPT_CREDIT_CONTRACT_ADDRESS, loadGptCreditContract);

  return new ContractsAPI(ethConnection);
}
