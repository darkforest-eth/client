import { EventEmitter } from 'events';
import { providers, utils, Event, BigNumber as EthersBN, ContractFunction, ethers } from 'ethers';
import _ from 'lodash';
import {
  ContractConstants,
  MoveArgs,
  ZKArgIdx,
  MoveArgIdxs,
  ContractEvent,
  ContractsAPIEvent,
  UpgradeArgs,
  UpgradeArgIdxs,
  DepositArtifactArgs,
  WithdrawArtifactArgs,
  PlanetTypeWeightsBySpaceType,
} from '../../_types/darkforest/api/ContractsAPITypes';
import {
  Player,
  EthAddress,
  LocationId,
  ArtifactId,
  RevealedCoords,
  WorldLocation,
  Artifact,
  Planet,
  QueuedArrival,
  UnconfirmedInit,
  EthTxType,
  SubmittedTx,
  SubmittedInit,
  SubmittedUpgrade,
  SubmittedMove,
  SubmittedBuyHat,
  SubmittedPlanetTransfer,
  SubmittedFindArtifact,
  SubmittedDepositArtifact,
  SubmittedWithdrawArtifact,
  UnconfirmedDepositArtifact,
  UnconfirmedWithdrawArtifact,
  SubmittedProspectPlanet,
  UnconfirmedActivateArtifact,
  SubmittedActivateArtifact,
  SubmittedDeactivateArtifact,
  UnconfirmedDeactivateArtifact,
  SubmittedReveal,
  UnconfirmedReveal,
  SubmittedBuyGPTCredits,
  SubmittedWithdrawSilver,
  UnconfirmedWithdrawSilver,
  VoyageId,
} from '@darkforest_eth/types';
import { aggregateBulkGetter } from '../Utils/Utils';
import bigInt from 'big-integer';
import { TxExecutor } from '../Network/TxExecutor';
import EthConnection from '../Network/EthConnection';
import {
  DarkForestCore,
  DarkForestGetters,
  DarkForestGPTCredit,
} from '@darkforest_eth/contracts/typechain';
import {
  address,
  artifactIdFromEthersBN,
  artifactIdToDecStr,
  locationIdFromEthersBN,
  locationIdToDecStr,
  locationIdFromDecStr,
  decodeArrival,
  decodeArtifact,
  decodeUpgradeBranches,
  decodePlanet,
  decodePlanetDefaults,
  decodeRevealedCoords,
  decodePlayer,
  decodeArtifactPointValues,
} from '@darkforest_eth/serde';
import { EMPTY_LOCATION_ID, CONTRACT_PRECISION } from '@darkforest_eth/constants';
import type {
  RevealSnarkContractCallArgs,
  InitSnarkContractCallArgs,
  MoveSnarkContractCallArgs,
  BiomebaseSnarkContractCallArgs,
} from '@darkforest_eth/snarks';
import { ContractCaller } from './ContractCaller';
import { DiagnosticUpdater } from '../Interfaces/DiagnosticUpdater';

/**
 * Roughly contains methods that map 1:1 with functions that live
 * in the contract.
 */
class ContractsAPI extends EventEmitter {
  private readonly contractCaller: ContractCaller;
  private readonly txRequestExecutor: TxExecutor | undefined;

  private diagnosticsUpdater?: DiagnosticUpdater;
  private ethConnection: EthConnection;
  private coreContract: DarkForestCore;
  private gettersContract: DarkForestGetters;
  private gptCreditContract: DarkForestGPTCredit;

  private constructor(
    ethConnection: EthConnection,
    coreContract: DarkForestCore,
    gettersContract: DarkForestGetters,
    gptCreditContract: DarkForestGPTCredit,
    nonce: number
  ) {
    super();
    this.contractCaller = new ContractCaller();
    this.coreContract = coreContract;
    this.gettersContract = gettersContract;
    this.gptCreditContract = gptCreditContract;
    this.txRequestExecutor = new TxExecutor(ethConnection, nonce);
    this.ethConnection = ethConnection;
  }

  static async create(ethConnection: EthConnection): Promise<ContractsAPI> {
    let nonce = 0;
    try {
      nonce = await ethConnection.getNonce();
    } catch (e) {
      console.error('WARNING: creating TxExecutor with no account/signer');
    }

    const contractsAPI: ContractsAPI = new ContractsAPI(
      ethConnection,
      await ethConnection.loadCoreContract(),
      await ethConnection.loadGettersContract(),
      await ethConnection.loadGPTCreditContract(),
      nonce
    );

    return contractsAPI;
  }

  public destroy(): void {
    this.removeEventListeners();
  }

  private makeCall<T>(contractViewFunction: ContractFunction<T>, args: unknown[] = []): Promise<T> {
    return this.contractCaller.makeCall(contractViewFunction, args);
  }

  public setupEventListeners(): void {
    this.ethConnection.subscribeToEvents(this.coreContract, {
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
    });

    this.gptCreditContract.on(
      ContractEvent.ChangedGPTCreditPrice,
      async (newPrice: EthersBN, _: Event) => {
        this.emit(
          ContractsAPIEvent.ChangedGPTCreditPrice,
          parseFloat(ethers.utils.formatEther(newPrice.toString()))
        );
      }
    );

    this.ethConnection.on('ChangedRPCEndpoint', async () => {
      this.coreContract = await this.ethConnection.loadCoreContract();
    });
  }

  public removeEventListeners(): void {
    this.coreContract.removeAllListeners(ContractEvent.PlayerInitialized);
    this.coreContract.removeAllListeners(ContractEvent.ArrivalQueued);
    this.coreContract.removeAllListeners(ContractEvent.PlanetUpgraded);
    this.coreContract.removeAllListeners(ContractEvent.PlanetHatBought);
    this.coreContract.removeAllListeners(ContractEvent.PlanetTransferred);
    this.coreContract.removeAllListeners(ContractEvent.ArtifactFound);
    this.coreContract.removeAllListeners(ContractEvent.ArtifactDeposited);
    this.coreContract.removeAllListeners(ContractEvent.ArtifactWithdrawn);
    this.coreContract.removeAllListeners(ContractEvent.ArtifactActivated);
    this.coreContract.removeAllListeners(ContractEvent.ArtifactDeactivated);
    this.coreContract.removeAllListeners(ContractEvent.LocationRevealed);
    this.coreContract.removeAllListeners(ContractEvent.PlanetSilverWithdrawn);
    this.gptCreditContract.removeAllListeners(ContractEvent.ChangedGPTCreditPrice);
  }

  public getContractAddress(): EthAddress {
    return address(this.coreContract.address);
  }

  /**
   * Given an unconfirmed (but submitted) transaction, emits the appropriate
   * [[ContractsAPIEvent]].
   */
  public waitFor(submitted: SubmittedTx, receiptPromise: Promise<providers.TransactionReceipt>) {
    this.emit(ContractsAPIEvent.TxSubmitted, submitted);

    return receiptPromise
      .then((receipt) => {
        this.emit(ContractsAPIEvent.TxConfirmed, submitted);
        return receipt;
      })
      .catch((e) => {
        this.emit(ContractsAPIEvent.TxReverted, submitted);
        throw e;
      });
  }

  async reveal(
    args: RevealSnarkContractCallArgs,
    action: UnconfirmedReveal
  ): Promise<providers.TransactionReceipt> {
    if (!this.txRequestExecutor) {
      throw new Error('no signer, cannot execute tx');
    }

    const tx = this.txRequestExecutor.makeRequest(
      EthTxType.REVEAL_LOCATION,
      action.actionId,
      this.coreContract,
      args
    );
    const unminedRevealTx: SubmittedReveal = {
      ...action,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
    };

    return this.waitFor(unminedRevealTx, tx.confirmed);
  }

  async initializePlayer(
    args: InitSnarkContractCallArgs,
    action: UnconfirmedInit
  ): Promise<providers.TransactionReceipt> {
    if (!this.txRequestExecutor) {
      throw new Error('no signer, cannot execute tx');
    }
    const tx = this.txRequestExecutor.makeRequest(
      EthTxType.INIT,
      action.actionId,
      this.coreContract,
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
  ): Promise<providers.TransactionReceipt> {
    if (!this.txRequestExecutor) {
      throw new Error('no signer, cannot execute tx');
    }
    const tx = this.txRequestExecutor.makeRequest(
      EthTxType.PLANET_TRANSFER,
      actionId,
      this.coreContract,
      [locationIdToDecStr(planetId), newOwner]
    );

    const unminedTransferTx: SubmittedPlanetTransfer = {
      actionId,
      type: EthTxType.PLANET_TRANSFER,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
      planetId,
      newOwner,
    };

    return this.waitFor(unminedTransferTx, tx.confirmed);
  }

  // throws if tx initialization fails
  // otherwise, returns a promise of a submtited (unmined) tx receipt
  async upgradePlanet(args: UpgradeArgs, actionId: string): Promise<providers.TransactionReceipt> {
    if (!this.txRequestExecutor) {
      throw new Error('no signer, cannot execute tx');
    }
    const tx = this.txRequestExecutor.makeRequest(
      EthTxType.UPGRADE,
      actionId,
      this.coreContract,
      args
    );

    const unminedUpgradeTx: SubmittedUpgrade = {
      actionId,
      type: EthTxType.UPGRADE,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
      locationId: locationIdFromDecStr(args[UpgradeArgIdxs.LOCATION_ID]),
      upgradeBranch: parseInt(args[UpgradeArgIdxs.UPGRADE_BRANCH]),
    };

    return this.waitFor(unminedUpgradeTx, tx.confirmed);
  }

  async prospectPlanet(planetId: LocationId, actionId: string) {
    if (!this.txRequestExecutor) {
      throw new Error('no signer, cannot execute tx');
    }

    const args = [locationIdToDecStr(planetId)];

    const tx = this.txRequestExecutor.makeRequest(
      EthTxType.PROSPECT_PLANET,
      actionId,
      this.coreContract,
      args
    );

    const unminedFindArtifact: SubmittedProspectPlanet = {
      actionId,
      type: EthTxType.PROSPECT_PLANET,
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
  ): Promise<providers.TransactionReceipt> {
    if (!this.txRequestExecutor) {
      throw new Error('no signer, cannot execute tx');
    }
    const tx = this.txRequestExecutor.makeRequest(
      EthTxType.FIND_ARTIFACT,
      actionId,
      this.coreContract,
      biomeSnarkArgs
    );

    const unminedFindArtifact: SubmittedFindArtifact = {
      actionId,
      type: EthTxType.FIND_ARTIFACT,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
      planetId: location.hash,
    };

    return this.waitFor(unminedFindArtifact, tx.confirmed);
  }

  async depositArtifact(action: UnconfirmedDepositArtifact): Promise<providers.TransactionReceipt> {
    if (!this.txRequestExecutor) {
      throw new Error('no signer, cannot execute tx');
    }
    const args: DepositArtifactArgs = [
      locationIdToDecStr(action.locationId),
      artifactIdToDecStr(action.artifactId),
    ];

    const tx = this.txRequestExecutor.makeRequest(
      EthTxType.DEPOSIT_ARTIFACT,
      action.actionId,
      this.coreContract,
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
  ): Promise<providers.TransactionReceipt> {
    if (!this.txRequestExecutor) {
      throw new Error('no signer, cannot execute tx');
    }
    const args: WithdrawArtifactArgs = [
      locationIdToDecStr(action.locationId),
      artifactIdToDecStr(action.artifactId),
    ];

    const tx = this.txRequestExecutor.makeRequest(
      EthTxType.WITHDRAW_ARTIFACT,
      action.actionId,
      this.coreContract,
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
    if (!this.txRequestExecutor) {
      throw new Error('no signer, cannot execute tx');
    }

    const args = [
      locationIdToDecStr(action.locationId),
      artifactIdToDecStr(action.artifactId),
      action.wormholeTo ? locationIdToDecStr(action.wormholeTo) : '0',
    ];

    const tx = this.txRequestExecutor.makeRequest(
      EthTxType.ACTIVATE_ARTIFACT,
      action.actionId,
      this.coreContract,
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
    if (!this.txRequestExecutor) {
      throw new Error('no signer, cannot execute tx');
    }

    const args = [locationIdToDecStr(action.locationId)];

    const tx = this.txRequestExecutor.makeRequest(
      EthTxType.DEACTIVATE_ARTIFACT,
      action.actionId,
      this.coreContract,
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
  ): Promise<providers.TransactionReceipt> {
    if (!this.txRequestExecutor) {
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

    const tx = this.txRequestExecutor.makeRequest(
      EthTxType.MOVE,
      actionId,
      this.coreContract,
      args
    );

    const forcesFloat = parseFloat(args[ZKArgIdx.DATA][MoveArgIdxs.SHIPS_SENT]);
    const silverFloat = parseFloat(args[ZKArgIdx.DATA][MoveArgIdxs.SILVER_SENT]);

    const unminedMoveTx: SubmittedMove = {
      actionId,
      type: EthTxType.MOVE,
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
    if (!this.txRequestExecutor) {
      throw new Error('no signer, cannot execute tx');
    }
    const overrides: providers.TransactionRequest = {
      gasLimit: 500000,
      value: bigInt(1000000000000000000)
        .multiply(2 ** currentHatLevel)
        .toString(),
    };

    const tx = this.txRequestExecutor.makeRequest(
      EthTxType.BUY_HAT,
      actionId,
      this.coreContract,
      [planetIdDecStr],
      overrides
    );

    const unminedBuyHatTx: SubmittedBuyHat = {
      actionId,
      type: EthTxType.BUY_HAT,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
      locationId: locationIdFromDecStr(planetIdDecStr),
    };

    return this.waitFor(unminedBuyHatTx, tx.confirmed);
  }

  async withdrawSilver(action: UnconfirmedWithdrawSilver): Promise<providers.TransactionReceipt> {
    if (!this.txRequestExecutor) {
      throw new Error('no signer, cannot execute tx');
    }

    const args = [locationIdToDecStr(action.locationId), action.amount * CONTRACT_PRECISION];
    const tx = this.txRequestExecutor.makeRequest(
      EthTxType.WITHDRAW_SILVER,
      action.actionId,
      this.coreContract,
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
    if (!this.txRequestExecutor) {
      throw new Error('no signer, cannot execute tx');
    }
    const costPerCreditStr = (
      await this.makeCall<EthersBN>(this.gptCreditContract.creditPrice)
    ).toString();
    const overrides: providers.TransactionRequest = {
      gasLimit: 500000,
      value: bigInt(costPerCreditStr).multiply(amount).toString(),
    };

    const tx = this.txRequestExecutor.makeRequest(
      EthTxType.BUY_GPT_CREDITS,
      actionId,
      this.gptCreditContract,
      [amount],
      overrides
    );

    const unminedBuyGPTCreditsTx: SubmittedBuyGPTCredits = {
      actionId,
      type: EthTxType.BUY_GPT_CREDITS,
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

  public async getGPTCreditBalance(address: EthAddress): Promise<number> {
    const gptCreditsBalance = await this.makeCall<EthersBN>(this.gptCreditContract.credits, [
      address,
    ]);
    return gptCreditsBalance.toNumber();
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
      BIOME_THRESHOLD_1,
      BIOME_THRESHOLD_2,
      PLANET_RARITY,
      PHOTOID_ACTIVATION_DELAY,
      LOCATION_REVEAL_COOLDOWN,
    } = await this.makeCall(this.coreContract.gameConstants);

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
      LOCATION_REVEAL_COOLDOWN: LOCATION_REVEAL_COOLDOWN.toNumber(),

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
      'players',
      nPlayers,
      200,
      async (start, end) =>
        (await this.makeCall(this.gettersContract.bulkGetPlayers, [start, end])).map(decodePlayer),
      onProgress
    );

    const playerMap: Map<EthAddress, Player> = new Map();
    for (const player of players) {
      playerMap.set(player.address, player);
    }
    return playerMap;
  }

  public async getPlayerById(playerId: EthAddress): Promise<Player | undefined> {
    const rawPlayer = await this.makeCall(this.coreContract.players, [playerId]);
    if (!rawPlayer.isInitialized) return undefined;
    return decodePlayer(rawPlayer);
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
      'arrivals',
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
      'planetids',
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
      'revealed-planetids',
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
      'revealed-coords',
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

  public async bulkGetPlanets(
    toLoadPlanets: LocationId[],
    onProgressPlanet?: (fractionCompleted: number) => void,
    onProgressMetadata?: (fractionCompleted: number) => void
  ): Promise<Map<LocationId, Planet>> {
    const rawPlanets = await aggregateBulkGetter(
      'planets',
      toLoadPlanets.length,
      200,
      async (start, end) =>
        await this.makeCall(this.gettersContract.bulkGetPlanetsByIds, [
          toLoadPlanets.slice(start, end).map(locationIdToDecStr),
        ]),
      onProgressPlanet
    );

    const rawPlanetsExtendedInfo = await aggregateBulkGetter(
      'planets-extended-info',
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
      'planet-artifacts',
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
      'artifacts',
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
    playerId: EthAddress,
    onProgress?: (percent: number) => void
  ): Promise<Artifact[]> {
    const myArtifactIds = (
      await this.makeCall(this.gettersContract.getPlayerArtifactIds, [playerId])
    ).map(artifactIdFromEthersBN);
    return this.bulkGetArtifacts(myArtifactIds, onProgress);
  }

  public getAccount() {
    return this.ethConnection.getAddress();
  }

  public getBalance() {
    return this.ethConnection.getBalance(this.getAccount());
  }

  public setDiagnosticUpdater(diagnosticUpdater?: DiagnosticUpdater) {
    this.diagnosticsUpdater = diagnosticUpdater;
    this.contractCaller.setDiagnosticUpdater(diagnosticUpdater);
    this.txRequestExecutor?.setDiagnosticUpdater(diagnosticUpdater);
  }
}

export default ContractsAPI;
