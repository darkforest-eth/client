import { EventEmitter } from 'events';
import {
  EthAddress,
  Player,
  QueuedArrival,
  Planet,
  LocationId,
  Artifact,
  ArtifactId,
  Location,
} from '../_types/global/GlobalTypes';
import {
  Contract,
  providers,
  utils,
  Event,
  BigNumber as EthersBN,
  ContractFunction,
} from 'ethers';
import _ from 'lodash';

import { CheckedTypeUtils } from '../utils/CheckedTypeUtils';
import {
  ContractConstants,
  InitializePlayerArgs,
  MoveArgs,
  RawPlanetData,
  RawPlanetExtendedInfo,
  UnconfirmedInit,
  EthTxType,
  ZKArgIdx,
  MoveArgIdxs,
  ContractEvent,
  ContractsAPIEvent,
  MoveSnarkArgs,
  RawDefaults,
  RawArrivalData,
  UpgradeArgs,
  RawUpgradesInfo,
  UpgradesInfo,
  UpgradeArgIdxs,
  SubmittedTx,
  SubmittedInit,
  SubmittedUpgrade,
  SubmittedMove,
  SubmittedBuyHat,
  SubmittedPlanetTransfer,
  BiomeArgs,
  SubmittedFindArtifact,
  DepositArtifactArgs,
  WithdrawArtifactArgs,
  SubmittedDepositArtifact,
  SubmittedWithdrawArtifact,
  UnconfirmedDepositArtifact,
  UnconfirmedWithdrawArtifact,
  RawArtifactWithMetadata,
} from '../_types/darkforest/api/ContractsAPITypes';
import { aggregateBulkGetter, callWithRetry } from '../utils/Utils';
import TerminalEmitter, { TerminalTextStyle } from '../utils/TerminalEmitter';
import EthConnection from './EthConnection';
import NotificationManager from '../utils/NotificationManager';
import { BLOCK_EXPLORER_URL } from '../utils/constants';
import bigInt from 'big-integer';
import { EthDecoders } from './EthDecoders';
import { TxExecutor } from './TxExecutor';
import { ThrottledConcurrentQueue } from '../utils/ThrottledConcurrentQueue';

export const CONTRACT_PRECISION = 1000;

/**
 * Roughly contains methods that map 1:1 with functions that live
 * in the contract.
 */
class ContractsAPI extends EventEmitter {
  private readonly callQueue = new ThrottledConcurrentQueue(20, 1000);
  private readonly txRequestExecutor: TxExecutor | null;
  private readonly terminalEmitter: TerminalEmitter;
  private ethConnection: EthConnection;
  private coreContract: Contract;

  private constructor(
    ethConnection: EthConnection,
    coreContract: Contract,
    nonce: number
  ) {
    super();
    this.coreContract = coreContract;
    this.txRequestExecutor = new TxExecutor(ethConnection, nonce);
    this.terminalEmitter = TerminalEmitter.getInstance();
    this.ethConnection = ethConnection;
  }

  static async create(ethConnection: EthConnection): Promise<ContractsAPI> {
    let nonce = 0;
    try {
      nonce = await ethConnection.getNonce();
    } catch (e) {
      console.log('WARNING: creating TxExecutor with no account/signer');
    }

    const contractsAPI: ContractsAPI = new ContractsAPI(
      ethConnection,
      await ethConnection.loadCoreContract(),
      nonce
    );

    contractsAPI.setupEventListeners();

    return contractsAPI;
  }

  public destroy(): void {
    this.removeEventListeners();
  }

  private makeCall<T>(
    contractViewFunction: ContractFunction<T>,
    args: unknown[] = []
  ): Promise<T> {
    return this.callQueue.add(() =>
      callWithRetry<T>(contractViewFunction, args)
    );
  }

  private setupEventListeners(): void {
    // TODO replace these with block polling
    this.coreContract
      .on(ContractEvent.FoundArtifact, async (loc, _owner, rawArtifactId) => {
        const artifactId = CheckedTypeUtils.artifactIdFromEthersBN(
          rawArtifactId
        );
        this.emit(ContractsAPIEvent.ArtifactUpdate, artifactId);
        this.emit(
          ContractsAPIEvent.PlanetUpdate,
          CheckedTypeUtils.locationIdFromEthersBN(loc)
        );
      })
      .on(ContractEvent.DepositedArtifact, (loc, _owner, rawArtifactId) => {
        const artifactId = CheckedTypeUtils.artifactIdFromEthersBN(
          rawArtifactId
        );
        this.emit(ContractsAPIEvent.ArtifactUpdate, artifactId);
        this.emit(
          ContractsAPIEvent.PlanetUpdate,
          CheckedTypeUtils.locationIdFromEthersBN(loc)
        );
      })
      .on(ContractEvent.WithdrewArtifact, (loc, _owner, rawArtifactId) => {
        const artifactId = CheckedTypeUtils.artifactIdFromEthersBN(
          rawArtifactId
        );
        this.emit(ContractsAPIEvent.ArtifactUpdate, artifactId);
        this.emit(
          ContractsAPIEvent.PlanetUpdate,
          CheckedTypeUtils.locationIdFromEthersBN(loc)
        );
      })
      .on(ContractEvent.PlayerInitialized, async (player, locRaw, _: Event) => {
        const newPlayer: Player = { address: CheckedTypeUtils.address(player) };
        this.emit(ContractsAPIEvent.PlayerInit, newPlayer);
        this.emit(
          ContractsAPIEvent.PlanetUpdate,
          CheckedTypeUtils.locationIdFromEthersBN(locRaw)
        );
        this.emit(ContractsAPIEvent.RadiusUpdated);
      })
      .on(
        ContractEvent.PlanetTransferred,
        async (planetId, playerAddress: string, _: Event) => {
          this.emit(
            ContractsAPIEvent.PlanetTransferred,
            CheckedTypeUtils.locationIdFromEthersBN(planetId),
            playerAddress.toLowerCase() as EthAddress
          );
        }
      )
      .on(
        ContractEvent.ArrivalQueued,
        async (arrivalId: EthersBN, _: Event) => {
          const arrival: QueuedArrival | null = await this.getArrival(
            arrivalId.toNumber()
          );
          if (!arrival) {
            console.error('arrival is null');
            return;
          }
          this.emit(ContractsAPIEvent.PlanetUpdate, arrival.toPlanet);
          this.emit(ContractsAPIEvent.PlanetUpdate, arrival.fromPlanet);
          this.emit(ContractsAPIEvent.RadiusUpdated);
        }
      )
      .on(ContractEvent.PlanetUpgraded, async (location, _: Event) => {
        this.emit(
          ContractsAPIEvent.PlanetUpdate,
          CheckedTypeUtils.locationIdFromEthersBN(location)
        );
      })
      .on(ContractEvent.BoughtHat, async (location, _: Event) => {
        this.emit(
          ContractsAPIEvent.PlanetUpdate,
          CheckedTypeUtils.locationIdFromEthersBN(location)
        );
      });

    this.ethConnection.on('ChangedRPCEndpoint', async () => {
      this.coreContract = await this.ethConnection.loadCoreContract();
    });
  }

  public removeEventListeners(): void {
    this.coreContract.removeAllListeners(ContractEvent.PlayerInitialized);
    this.coreContract.removeAllListeners(ContractEvent.ArrivalQueued);
    this.coreContract.removeAllListeners(ContractEvent.PlanetUpgraded);
    this.coreContract.removeAllListeners(ContractEvent.BoughtHat);
    this.coreContract.removeAllListeners(ContractEvent.DepositedArtifact);
    this.coreContract.removeAllListeners(ContractEvent.FoundArtifact);
    this.coreContract.removeAllListeners(ContractEvent.PlanetTransferred);
    this.coreContract.removeAllListeners(ContractEvent.WithdrewArtifact);
  }

  public getContractAddress(): EthAddress {
    return CheckedTypeUtils.address(this.coreContract.address);
  }

  private onTxSubmit(unminedTx: SubmittedTx): void {
    // TODO encapsulate this into terminalemitter
    this.terminalEmitter.print(
      `[TX SUBMIT] ${unminedTx.type} transaction (`,
      TerminalTextStyle.Blue
    );
    this.terminalEmitter.printLink(
      `${unminedTx.txHash.slice(0, 6)}`,
      () => {
        window.open(`${BLOCK_EXPLORER_URL}/tx/${unminedTx.txHash}`);
      },
      TerminalTextStyle.White
    );
    this.terminalEmitter.println(
      `) submitted to blockchain.`,
      TerminalTextStyle.Blue
    );

    const notifManager = NotificationManager.getInstance();
    notifManager.txSubmit(unminedTx);

    this.emit(ContractsAPIEvent.TxSubmitted, unminedTx);
  }

  /**
   * Given an unconfirmed (but submitted) transaction, emits the appropriate
   * [[ContractsAPIEvent]].
   */
  public waitFor(
    submitted: SubmittedTx,
    receiptPromise: Promise<providers.TransactionReceipt>
  ) {
    this.onTxSubmit(submitted);

    return receiptPromise
      .then((receipt) => {
        this.onTxConfirmed(submitted, receipt.status === 1);
        return receipt;
      })
      .catch((e) => {
        this.onTxConfirmed(submitted, false);
        throw e;
      });
  }

  private onTxConfirmed(unminedTx: SubmittedTx, success: boolean) {
    if (success) {
      this.terminalEmitter.print(
        `[TX CONFIRM] ${unminedTx.type} transaction (`,
        TerminalTextStyle.Green
      );
      this.terminalEmitter.printLink(
        `${unminedTx.txHash.slice(0, 6)}`,
        () => {
          window.open(`${BLOCK_EXPLORER_URL}/tx/${unminedTx.txHash}`);
        },
        TerminalTextStyle.White
      );
      this.terminalEmitter.println(`) confirmed.`, TerminalTextStyle.Green);

      const notifManager = NotificationManager.getInstance();
      notifManager.txConfirm(unminedTx);
      this.emit(ContractsAPIEvent.TxConfirmed, unminedTx);
    } else {
      this.terminalEmitter.print(
        `[TX ERROR] ${unminedTx.type} transaction (`,
        TerminalTextStyle.Red
      );
      this.terminalEmitter.printLink(
        `${unminedTx.txHash.slice(0, 6)}`,
        () => {
          window.open(`${BLOCK_EXPLORER_URL}/tx/${unminedTx.txHash}`);
        },
        TerminalTextStyle.White
      );
      this.terminalEmitter.println(
        `) reverted. Please try again.`,
        TerminalTextStyle.Red
      );

      const notifManager = NotificationManager.getInstance();
      notifManager.txRevert(unminedTx);
      this.emit(ContractsAPIEvent.TxReverted, unminedTx);
    }
  }

  async initializePlayer(
    args: InitializePlayerArgs,
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
      [CheckedTypeUtils.locationIdToDecStr(planetId), newOwner]
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
  async upgradePlanet(
    args: UpgradeArgs,
    actionId: string
  ): Promise<providers.TransactionReceipt> {
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
      locationId: CheckedTypeUtils.locationIdFromDecStr(
        args[UpgradeArgIdxs.LOCATION_ID]
      ),
      upgradeBranch: parseInt(args[UpgradeArgIdxs.UPGRADE_BRANCH]),
    };

    return this.waitFor(unminedUpgradeTx, tx.confirmed);
  }

  // throws if tx initialization fails
  // otherwise, returns a promise of a submtited (unmined) tx receipt
  async findArtifact(
    location: Location,
    biomeSnarkArgs: BiomeArgs,
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

  async depositArtifact(
    action: UnconfirmedDepositArtifact
  ): Promise<providers.TransactionReceipt> {
    if (!this.txRequestExecutor) {
      throw new Error('no signer, cannot execute tx');
    }
    const args: DepositArtifactArgs = [
      CheckedTypeUtils.locationIdToDecStr(action.locationId),
      CheckedTypeUtils.artifactIdToDecStr(action.artifactId),
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
      CheckedTypeUtils.locationIdToDecStr(action.locationId),
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

  // throws if tx initialization fails
  // otherwise, returns a promise of a submtited (unmined) tx receipt
  async move(
    snarkArgs: MoveSnarkArgs,
    shipsMoved: number,
    silverMoved: number,
    actionId: string
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
      ],
    ] as MoveArgs;

    const tx = this.txRequestExecutor.makeRequest(
      EthTxType.MOVE,
      actionId,
      this.coreContract,
      args,
      {
        gasPrice: 1000000000,
        gasLimit: 2000000,
      }
    );

    const forcesFloat = parseFloat(args[ZKArgIdx.DATA][MoveArgIdxs.SHIPS_SENT]);
    const silverFloat = parseFloat(
      args[ZKArgIdx.DATA][MoveArgIdxs.SILVER_SENT]
    );

    const unminedMoveTx: SubmittedMove = {
      actionId,
      type: EthTxType.MOVE,
      txHash: (await tx.submitted).hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
      from: CheckedTypeUtils.locationIdFromDecStr(
        args[ZKArgIdx.DATA][MoveArgIdxs.FROM_ID]
      ),
      to: CheckedTypeUtils.locationIdFromDecStr(
        args[ZKArgIdx.DATA][MoveArgIdxs.TO_ID]
      ),
      forces: forcesFloat / CONTRACT_PRECISION,
      silver: silverFloat / CONTRACT_PRECISION,
    };

    return this.waitFor(unminedMoveTx, tx.confirmed);
  }

  async buyHat(
    planetIdDecStr: string,
    currentHatLevel: number,
    actionId: string
  ) {
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
      locationId: CheckedTypeUtils.locationIdFromDecStr(planetIdDecStr),
    };

    return this.waitFor(unminedBuyHatTx, tx.confirmed);
  }

  async getConstants(): Promise<ContractConstants> {
    const res1: Array<EthersBN> = await Promise.all([
      this.makeCall<EthersBN>(this.coreContract.TIME_FACTOR_HUNDREDTHS),
      this.makeCall<EthersBN>(this.coreContract.PERLIN_THRESHOLD_1),
      this.makeCall<EthersBN>(this.coreContract.PERLIN_THRESHOLD_2),
      this.makeCall<EthersBN>(this.coreContract.BIOME_THRESHOLD_1),
      this.makeCall<EthersBN>(this.coreContract.BIOME_THRESHOLD_2),
      this.makeCall<EthersBN>(
        this.coreContract.ARTIFACT_LOCKUP_DURATION_SECONDS
      ),
      this.makeCall<EthersBN>(this.coreContract.PLANET_RARITY),
      this.makeCall<EthersBN>(this.coreContract.SILVER_RARITY_1),
      this.makeCall<EthersBN>(this.coreContract.SILVER_RARITY_2),
      this.makeCall<EthersBN>(this.coreContract.SILVER_RARITY_3),
    ]);

    const rawUpgrades = await this.makeCall<RawUpgradesInfo>(
      this.coreContract.getUpgrades
    );

    const TIME_FACTOR_HUNDREDTHS = res1[0].toNumber();
    const PERLIN_THRESHOLD_1 = res1[1].toNumber();
    const PERLIN_THRESHOLD_2 = res1[2].toNumber();
    const BIOME_THRESHOLD_1 = res1[3].toNumber();
    const BIOME_THRESHOLD_2 = res1[4].toNumber();
    const ARTIFACT_LOCKUP_DURATION_SECONDS = res1[5].toNumber();

    const PLANET_RARITY = res1[5].toNumber();
    const SILVER_RARITY_1 = res1[6].toNumber();
    const SILVER_RARITY_2 = res1[7].toNumber();
    const SILVER_RARITY_3 = res1[8].toNumber();

    const upgrades: UpgradesInfo = EthDecoders.rawUpgradesInfoToUpgradesInfo(
      rawUpgrades
    );

    const rawDefaults: RawDefaults = await this.makeCall<RawDefaults>(
      this.coreContract.getDefaultStats
    );

    const planetLevelThresholds = (
      await this.makeCall<EthersBN[]>(
        this.coreContract.getPlanetLevelThresholds
      )
    ).map((x: EthersBN) => x.toNumber());

    const planetCumulativeRarities = (
      await this.makeCall<EthersBN[]>(
        this.coreContract.getPlanetCumulativeRarities
      )
    ).map((x: EthersBN) => x.toNumber());

    return {
      TIME_FACTOR_HUNDREDTHS,
      PERLIN_THRESHOLD_1,
      PERLIN_THRESHOLD_2,
      BIOME_THRESHOLD_1,
      BIOME_THRESHOLD_2,
      ARTIFACT_LOCKUP_DURATION_SECONDS,
      PLANET_RARITY,

      SILVER_RARITY_1,
      SILVER_RARITY_2,
      SILVER_RARITY_3,

      defaultPopulationCap: rawDefaults.map(
        (x) => x[1].toNumber() / CONTRACT_PRECISION
      ),
      defaultPopulationGrowth: rawDefaults.map(
        (x) => x[2].toNumber() / CONTRACT_PRECISION
      ),
      defaultRange: rawDefaults.map((x) => x[3].toNumber()),
      defaultSpeed: rawDefaults.map((x) => x[4].toNumber()),
      defaultDefense: rawDefaults.map((x) => x[5].toNumber()),
      defaultSilverGrowth: rawDefaults.map(
        (x) => x[6].toNumber() / CONTRACT_PRECISION
      ),
      defaultSilverCap: rawDefaults.map(
        (x) => x[7].toNumber() / CONTRACT_PRECISION
      ),
      defaultBarbarianPercentage: rawDefaults.map((x) => x[8].toNumber()),
      planetLevelThresholds,
      planetCumulativeRarities,
      upgrades,
    };
  }

  public async zkChecksDisabled(): Promise<boolean> {
    return this.makeCall<boolean>(this.coreContract.DISABLE_ZK_CHECK);
  }

  public async getPlayerArtifacts(playerId: EthAddress): Promise<Artifact[]> {
    const myArtifactIds = (
      await this.makeCall<EthersBN[]>(this.coreContract.getPlayerArtifactIds, [
        playerId,
      ])
    ).map(CheckedTypeUtils.artifactIdFromEthersBN);
    return this.bulkGetArtifacts(myArtifactIds);
  }

  public async getPlayers(): Promise<Map<string, Player>> {
    console.log('getting players');
    const nPlayers: number = (
      await this.makeCall<EthersBN>(this.coreContract.getNPlayers)
    ).toNumber();

    const playerIds = await aggregateBulkGetter<EthAddress>(
      nPlayers,
      200,
      async (start, end) =>
        (
          await this.makeCall<EthAddress[]>(this.coreContract.bulkGetPlayers, [
            start,
            end,
          ])
        ).map(CheckedTypeUtils.address)
    );

    const playerMap: Map<string, Player> = new Map();
    for (const playerId of playerIds) {
      playerMap.set(CheckedTypeUtils.address(playerId), {
        address: CheckedTypeUtils.address(playerId),
      });
    }
    return playerMap;
  }

  public async getWorldRadius(): Promise<number> {
    const radius = (
      await this.makeCall<EthersBN>(this.coreContract.worldRadius)
    ).toNumber();
    return radius;
  }

  public async getContractBalance(): Promise<number> {
    const rawBalance = await this.makeCall<EthersBN>(
      this.coreContract.getBalance
    );
    const myBalance = utils.formatEther(rawBalance);
    const numBalance = parseFloat(myBalance);
    return numBalance;
  }

  public async getArrival(arrivalId: number): Promise<QueuedArrival | null> {
    const rawArrival: RawArrivalData = await this.makeCall<RawArrivalData>(
      this.coreContract.planetArrivals,
      [arrivalId]
    );
    return EthDecoders.rawArrivalToObject(rawArrival);
  }

  public async getArrivalsForPlanet(
    planetId: LocationId
  ): Promise<QueuedArrival[]> {
    const events = (
      await this.makeCall<RawArrivalData[]>(
        this.coreContract.getPlanetArrivals,
        [CheckedTypeUtils.locationIdToDecStr(planetId)]
      )
    ).map(EthDecoders.rawArrivalToObject);

    return events;
  }

  public async getAllArrivals(
    planetsToLoad: LocationId[]
  ): Promise<QueuedArrival[]> {
    const arrivalsUnflattened = await aggregateBulkGetter<QueuedArrival[]>(
      planetsToLoad.length,
      1000,
      async (start, end) => {
        return (
          await this.makeCall<RawArrivalData[][]>(
            this.coreContract.bulkGetPlanetArrivalsByIds,
            [
              planetsToLoad
                .slice(start, end)
                .map((id) => CheckedTypeUtils.locationIdToDecStr(id)),
            ]
          )
        ).map((arrivals: RawArrivalData[]) =>
          arrivals.map(EthDecoders.rawArrivalToObject)
        );
      },
      true,
      100
    );

    return _.flatten(arrivalsUnflattened);
  }

  public async getTouchedPlanetIds(startingAt: number): Promise<LocationId[]> {
    const nPlanets: number = (
      await this.makeCall<EthersBN>(this.coreContract.getNPlanets)
    ).toNumber();

    const planetIds = await aggregateBulkGetter<EthersBN>(
      nPlanets - startingAt,
      2000,
      async (start, end) =>
        await this.makeCall(this.coreContract.bulkGetPlanetIds, [
          start + startingAt,
          end + startingAt,
        ]),
      true,
      100
    );

    return planetIds.map((id) => CheckedTypeUtils.locationIdFromEthersBN(id));
  }
  public async bulkGetPlanets(
    toLoadPlanets: LocationId[]
  ): Promise<Map<LocationId, Planet>> {
    const rawPlanetsExtendedInfo = await aggregateBulkGetter<
      RawPlanetExtendedInfo
    >(
      toLoadPlanets.length,
      1000,
      async (start, end) =>
        await this.makeCall(this.coreContract.bulkGetPlanetsExtendedInfoByIds, [
          toLoadPlanets
            .slice(start, end)
            .map((id) => CheckedTypeUtils.locationIdToDecStr(id)),
        ]),
      true,
      100
    );

    const rawPlanets = await aggregateBulkGetter<RawPlanetData>(
      toLoadPlanets.length,
      1000,
      async (start, end) =>
        await this.makeCall(this.coreContract.bulkGetPlanetsByIds, [
          toLoadPlanets
            .slice(start, end)
            .map((id) => CheckedTypeUtils.locationIdToDecStr(id)),
        ]),
      true,
      100
    );

    const planets: Map<LocationId, Planet> = new Map();

    for (let i = 0; i < toLoadPlanets.length; i += 1) {
      if (!!rawPlanets[i] && !!rawPlanetsExtendedInfo[i]) {
        const planet = EthDecoders.rawPlanetToObject(
          CheckedTypeUtils.locationIdToDecStr(toLoadPlanets[i]),
          rawPlanets[i],
          rawPlanetsExtendedInfo[i]
        );
        planets.set(planet.locationId, planet);
      }
    }
    return planets;
  }

  public async getPlanetById(planetId: LocationId): Promise<Planet | null> {
    const decStrId = CheckedTypeUtils.locationIdToDecStr(planetId);
    const rawExtendedInfo = await this.makeCall<RawPlanetExtendedInfo>(
      this.coreContract.planetsExtendedInfo,
      [decStrId]
    );
    if (!rawExtendedInfo[0]) return null; // planetExtendedInfo.isInitialized is false
    const rawPlanet: RawPlanetData = await this.makeCall<RawPlanetData>(
      this.coreContract.planets,
      [decStrId]
    );
    return EthDecoders.rawPlanetToObject(decStrId, rawPlanet, rawExtendedInfo);
  }

  public async getArtifactById(
    artifactId: ArtifactId
  ): Promise<Artifact | null> {
    const exists = await this.makeCall<boolean>(
      this.coreContract.doesArtifactExist,
      [CheckedTypeUtils.artifactIdToDecStr(artifactId)]
    );
    if (!exists) return null;
    const rawArtifact = await this.makeCall<RawArtifactWithMetadata>(
      this.coreContract.getArtifactById,
      [CheckedTypeUtils.artifactIdToDecStr(artifactId)]
    );

    return EthDecoders.rawArtifactWithMetadataToArtifact(rawArtifact);
  }

  public async bulkGetArtifacts(
    artifactIds: ArtifactId[],
    printProgress = false
  ): Promise<Artifact[]> {
    const rawArtifacts: RawArtifactWithMetadata[] = await aggregateBulkGetter<
      RawArtifactWithMetadata
    >(
      artifactIds.length,
      500,
      async (start, end) =>
        await this.makeCall(this.coreContract.bulkGetArtifactsByIds, [
          artifactIds
            .slice(start, end)
            .map(CheckedTypeUtils.artifactIdToDecStr),
        ]),
      printProgress,
      100
    );

    const ret: Artifact[] = rawArtifacts.map(
      EthDecoders.rawArtifactWithMetadataToArtifact
    );

    return ret;
  }
}

export default ContractsAPI;
