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
// NOTE: DO NOT IMPORT FROM ETHERS SUBPATHS. see https://github.com/ethers-io/ethers.js/issues/349 (these imports trip up webpack)
// in particular, the below is bad!
// import {TransactionReceipt, Provider, TransactionResponse, Web3Provider} from "ethers/providers";
import {
  Contract,
  providers,
  utils,
  Event,
  BigNumber as EthersBN,
} from 'ethers';
import _ from 'lodash';

import {
  address,
  locationIdFromDecStr,
  locationIdToDecStr,
  locationIdFromEthersBN,
  artifactIdFromEthersBN,
  artifactIdToDecStr,
} from '../utils/CheckedTypeUtils';
import {
  ContractConstants,
  InitializePlayerArgs,
  MoveArgs,
  RawPlanetData,
  RawPlanetExtendedInfo,
  TxIntent,
  UnconfirmedInit,
  EthTxType,
  UnconfirmedMove,
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
  UnconfirmedUpgrade,
  UpgradeArgIdxs,
  SubmittedTx,
  SubmittedInit,
  SubmittedUpgrade,
  SubmittedMove,
  SubmittedBuyHat,
  UnconfirmedBuyHat,
  SubmittedPlanetTransfer,
  UnconfirmedPlanetTransfer,
  BiomeArgs,
  SubmittedFindArtifact,
  UnconfirmedFindArtifact,
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

export function isUnconfirmedInit(
  txIntent: TxIntent
): txIntent is UnconfirmedInit {
  return txIntent.type === EthTxType.INIT;
}

export function isUnconfirmedMove(
  txIntent: TxIntent
): txIntent is UnconfirmedMove {
  return txIntent.type === EthTxType.MOVE;
}

export function isUnconfirmedUpgrade(
  txIntent: TxIntent
): txIntent is UnconfirmedUpgrade {
  return txIntent.type === EthTxType.UPGRADE;
}

export function isUnconfirmedBuyHat(
  txIntent: TxIntent
): txIntent is UnconfirmedBuyHat {
  return txIntent.type === EthTxType.BUY_HAT;
}

export function isUnconfirmedTransfer(
  txIntent: TxIntent
): txIntent is UnconfirmedPlanetTransfer {
  return txIntent.type === EthTxType.PLANET_TRANSFER;
}

export function isUnconfirmedFindArtifact(
  txIntent: TxIntent
): txIntent is UnconfirmedFindArtifact {
  return txIntent.type === EthTxType.FIND_ARTIFACT;
}

export function isUnconfirmedDepositArtifact(
  txIntent: TxIntent
): txIntent is UnconfirmedDepositArtifact {
  return txIntent.type === EthTxType.DEPOSIT_ARTIFACT;
}

export function isUnconfirmedWithdrawArtifact(
  txIntent: TxIntent
): txIntent is UnconfirmedWithdrawArtifact {
  return txIntent.type === EthTxType.WITHDRAW_ARTIFACT;
}

export const contractPrecision = 1000;

/**
 * Roughly contains methods that map 1:1 with functions that live
 * in the contract.
 */
class ContractsAPI extends EventEmitter {
  private readonly txRequestExecutor: TxExecutor;
  private readonly terminalEmitter: TerminalEmitter;
  public readonly account: EthAddress;
  private coreContract: Contract;

  private constructor(
    coreContract: Contract,
    nonce: number,
    account: EthAddress
  ) {
    super();
    this.coreContract = coreContract;
    this.txRequestExecutor = new TxExecutor(nonce);
    this.account = account;
    this.terminalEmitter = TerminalEmitter.getInstance();
  }

  static async create(): Promise<ContractsAPI> {
    const ethConnection = EthConnection.getInstance();

    const contractsAPI: ContractsAPI = new ContractsAPI(
      await ethConnection.loadCoreContract(),
      await ethConnection.getNonce(),
      ethConnection.getAddress()
    );

    contractsAPI.setupEventListeners();

    return contractsAPI;
  }

  public destroy(): void {
    this.removeEventListeners();
  }

  private setupEventListeners(): void {
    // TODO replace these with block polling
    this.coreContract
      .on(ContractEvent.FoundArtifact, async (loc, _owner, rawArtifactId) => {
        const artifactId = artifactIdFromEthersBN(rawArtifactId);
        this.emit(ContractsAPIEvent.ArtifactUpdate, artifactId);
        this.emit(ContractsAPIEvent.PlanetUpdate, locationIdFromEthersBN(loc));
      })
      .on(ContractEvent.DepositedArtifact, (loc, _owner, rawArtifactId) => {
        const artifactId = artifactIdFromEthersBN(rawArtifactId);
        this.emit(ContractsAPIEvent.ArtifactUpdate, artifactId);
        this.emit(ContractsAPIEvent.PlanetUpdate, locationIdFromEthersBN(loc));
      })
      .on(ContractEvent.WithdrewArtifact, (loc, _owner, rawArtifactId) => {
        const artifactId = artifactIdFromEthersBN(rawArtifactId);
        this.emit(ContractsAPIEvent.ArtifactUpdate, artifactId);
        this.emit(ContractsAPIEvent.PlanetUpdate, locationIdFromEthersBN(loc));
      })
      .on(ContractEvent.PlayerInitialized, async (player, locRaw, _: Event) => {
        const newPlayer: Player = { address: address(player) };
        this.emit(ContractsAPIEvent.PlayerInit, newPlayer);
        this.emit(
          ContractsAPIEvent.PlanetUpdate,
          locationIdFromEthersBN(locRaw)
        );
        this.emit(ContractsAPIEvent.RadiusUpdated);
      })
      .on(
        ContractEvent.PlanetTransferred,
        async (planetId, _playerAddress, _: Event) => {
          this.emit(
            ContractsAPIEvent.PlanetUpdate,
            locationIdFromEthersBN(planetId)
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
          locationIdFromEthersBN(location)
        );
      })
      .on(ContractEvent.BoughtHat, async (location, _: Event) => {
        this.emit(
          ContractsAPIEvent.PlanetUpdate,
          locationIdFromEthersBN(location)
        );
      });

    const ethConnection = EthConnection.getInstance();

    ethConnection.on('ChangedRPCEndpoint', async () => {
      this.coreContract = await ethConnection.loadCoreContract();
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
    return address(this.coreContract.address);
  }

  public onTxSubmit(unminedTx: SubmittedTx): void {
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
   * Given my new `Tx` type, and an `unconfirmed (but submitted) transaction`, emits
   * the appropriate `ContractsAPIEvent`.
   */
  private waitFor(
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
  async upgradePlanet(
    args: UpgradeArgs,
    actionId: string
  ): Promise<providers.TransactionReceipt> {
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

  // throws if tx initialization fails
  // otherwise, returns a promise of a submtited (unmined) tx receipt
  async findArtifact(
    location: Location,
    biomeSnarkArgs: BiomeArgs,
    actionId: string
  ): Promise<providers.TransactionReceipt> {
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
    const args: WithdrawArtifactArgs = [locationIdToDecStr(action.locationId)];

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
    snarkLocalVerified: boolean,
    shipsMoved: number,
    silverMoved: number,
    actionId: string
  ): Promise<providers.TransactionReceipt> {
    const args = [
      snarkArgs[ZKArgIdx.PROOF_A],
      snarkArgs[ZKArgIdx.PROOF_B],
      snarkArgs[ZKArgIdx.PROOF_C],
      [
        ...snarkArgs[ZKArgIdx.DATA],
        (shipsMoved * contractPrecision).toString(),
        (silverMoved * contractPrecision).toString(),
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
      },
      snarkLocalVerified
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
      from: locationIdFromDecStr(args[ZKArgIdx.DATA][MoveArgIdxs.FROM_ID]),
      to: locationIdFromDecStr(args[ZKArgIdx.DATA][MoveArgIdxs.TO_ID]),
      forces: forcesFloat / contractPrecision,
      silver: silverFloat / contractPrecision,
    };

    return this.waitFor(unminedMoveTx, tx.confirmed);
  }

  async buyHat(
    planetIdDecStr: string,
    currentHatLevel: number,
    actionId: string
  ) {
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

  async getConstants(): Promise<ContractConstants> {
    const contract = this.coreContract;
    // break constant calls up into two Promise.all()s
    // xDAI endpoint less likely to freak out
    const res1 = await Promise.all([
      callWithRetry<EthersBN>(contract.TIME_FACTOR_HUNDREDTHS),
      callWithRetry<EthersBN>(contract.PERLIN_THRESHOLD_1),
      callWithRetry<EthersBN>(contract.PERLIN_THRESHOLD_2),
      callWithRetry<EthersBN>(contract.BIOME_THRESHOLD_1),
      callWithRetry<EthersBN>(contract.BIOME_THRESHOLD_2),
      callWithRetry<EthersBN>(contract.ARTIFACT_LOCKUP_DURATION_SECONDS),
    ]);
    const res2 = await Promise.all([
      callWithRetry<EthersBN>(contract.PLANET_RARITY),
      callWithRetry<EthersBN>(contract.SILVER_RARITY_1),
      callWithRetry<EthersBN>(contract.SILVER_RARITY_2),
      callWithRetry<EthersBN>(contract.SILVER_RARITY_3),
      callWithRetry<RawUpgradesInfo>(contract.getUpgrades),
    ]);
    const TIME_FACTOR_HUNDREDTHS = res1[0].toNumber();
    const PERLIN_THRESHOLD_1 = res1[1].toNumber();
    const PERLIN_THRESHOLD_2 = res1[2].toNumber();
    const BIOME_THRESHOLD_1 = res1[3].toNumber();
    const BIOME_THRESHOLD_2 = res1[4].toNumber();
    const ARTIFACT_LOCKUP_DURATION_SECONDS = res1[5].toNumber();

    const PLANET_RARITY = res2[0].toNumber();
    const SILVER_RARITY_1 = res2[1].toNumber();
    const SILVER_RARITY_2 = res2[2].toNumber();
    const SILVER_RARITY_3 = res2[3].toNumber();
    const rawUpgrades = res2[4];
    const upgrades: UpgradesInfo = EthDecoders.rawUpgradesInfoToUpgradesInfo(
      rawUpgrades
    );

    const rawDefaults: RawDefaults = await callWithRetry<RawDefaults>(
      contract.getDefaultStats
    );

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
        (x) => x[1].toNumber() / contractPrecision
      ),
      defaultPopulationGrowth: rawDefaults.map(
        (x) => x[2].toNumber() / contractPrecision
      ),
      defaultRange: rawDefaults.map((x) => x[3].toNumber()),
      defaultSpeed: rawDefaults.map((x) => x[4].toNumber()),
      defaultDefense: rawDefaults.map((x) => x[5].toNumber()),
      defaultSilverGrowth: rawDefaults.map(
        (x) => x[6].toNumber() / contractPrecision
      ),
      defaultSilverCap: rawDefaults.map(
        (x) => x[7].toNumber() / contractPrecision
      ),
      defaultBarbarianPercentage: rawDefaults.map((x) => x[8].toNumber()),

      planetLevelThresholds: (
        await callWithRetry<EthersBN[]>(contract.getPlanetLevelThresholds)
      ).map((x: EthersBN) => x.toNumber()),
      planetCumulativeRarities: (
        await callWithRetry<EthersBN[]>(contract.getPlanetCumulativeRarities)
      ).map((x: EthersBN) => x.toNumber()),

      upgrades,
    };
  }

  public async zkChecksDisabled(): Promise<boolean> {
    return callWithRetry<boolean>(this.coreContract.DISABLE_ZK_CHECK);
  }

  public async getPlayerArtifacts(playerId: EthAddress): Promise<Artifact[]> {
    const myArtifactIds = (
      await callWithRetry<EthersBN[]>(this.coreContract.getPlayerArtifactIds, [
        playerId,
      ])
    ).map(artifactIdFromEthersBN);
    return this.bulkGetArtifacts(myArtifactIds);
  }

  public async getPlayers(): Promise<Map<string, Player>> {
    console.log('getting players');
    const contract = this.coreContract;
    const nPlayers: number = (
      await callWithRetry<EthersBN>(contract.getNPlayers)
    ).toNumber();

    const playerIds = await aggregateBulkGetter<EthAddress>(
      nPlayers,
      200,
      async (start, end) =>
        (await contract.bulkGetPlayers(start, end)).map(address)
    );

    const playerMap: Map<string, Player> = new Map();
    for (const playerId of playerIds) {
      playerMap.set(address(playerId), { address: address(playerId) });
    }
    return playerMap;
  }

  public async getWorldRadius(): Promise<number> {
    const radius = (
      await callWithRetry<EthersBN>(this.coreContract.worldRadius)
    ).toNumber();
    return radius;
  }

  public async getContractBalance(): Promise<number> {
    const rawBalance = await callWithRetry<EthersBN>(
      this.coreContract.getBalance
    );
    const myBalance = utils.formatEther(rawBalance);
    const numBalance = parseFloat(myBalance);
    return numBalance;
  }

  public async getArrival(arrivalId: number): Promise<QueuedArrival | null> {
    const contract = this.coreContract;
    const rawArrival: RawArrivalData = await callWithRetry<RawArrivalData>(
      contract.planetArrivals,
      [arrivalId]
    );
    return EthDecoders.rawArrivalToObject(rawArrival);
  }

  public async getArrivalsForPlanet(
    planetId: LocationId
  ): Promise<QueuedArrival[]> {
    const contract = this.coreContract;

    const events = (
      await callWithRetry<RawArrivalData[]>(contract.getPlanetArrivals, [
        locationIdToDecStr(planetId),
      ])
    ).map(EthDecoders.rawArrivalToObject);

    return events;
  }

  public async getAllArrivals(
    planetsToLoad: LocationId[]
  ): Promise<QueuedArrival[]> {
    const contract = this.coreContract;
    const arrivalsUnflattened = await aggregateBulkGetter<QueuedArrival[]>(
      planetsToLoad.length,
      1000,
      async (start, end) => {
        return (
          await contract.bulkGetPlanetArrivalsByIds(
            planetsToLoad.slice(start, end).map((id) => locationIdToDecStr(id))
          )
        ).map((arrivals: RawArrivalData[]) =>
          arrivals.map(EthDecoders.rawArrivalToObject)
        );
      },
      true
    );

    return _.flatten(arrivalsUnflattened);
  }

  public async getTouchedPlanetIds(startingAt: number): Promise<LocationId[]> {
    const contract = this.coreContract;
    const nPlanets: number = (
      await callWithRetry<EthersBN>(contract.getNPlanets)
    ).toNumber();

    const planetIds = await aggregateBulkGetter<EthersBN>(
      nPlanets - startingAt,
      2000,
      async (start, end) =>
        await contract.bulkGetPlanetIds(start + startingAt, end + startingAt),
      true
    );

    return planetIds.map((id) => locationIdFromEthersBN(id));
  }
  public async bulkGetPlanets(
    toLoadPlanets: LocationId[]
  ): Promise<Map<LocationId, Planet>> {
    const contract = this.coreContract;

    const rawPlanetsExtendedInfo = await aggregateBulkGetter<
      RawPlanetExtendedInfo
    >(
      toLoadPlanets.length,
      1000,
      async (start, end) =>
        await contract.bulkGetPlanetsExtendedInfoByIds(
          toLoadPlanets.slice(start, end).map((id) => locationIdToDecStr(id))
        ),
      true
    );

    const rawPlanets = await aggregateBulkGetter<RawPlanetData>(
      toLoadPlanets.length,
      1000,
      async (start, end) =>
        await contract.bulkGetPlanetsByIds(
          toLoadPlanets.slice(start, end).map((id) => locationIdToDecStr(id))
        ),
      true
    );

    const planets: Map<LocationId, Planet> = new Map();

    for (let i = 0; i < toLoadPlanets.length; i += 1) {
      if (!!rawPlanets[i] && !!rawPlanetsExtendedInfo[i]) {
        const planet = EthDecoders.rawPlanetToObject(
          locationIdToDecStr(toLoadPlanets[i]),
          rawPlanets[i],
          rawPlanetsExtendedInfo[i]
        );
        planets.set(planet.locationId, planet);
      }
    }
    return planets;
  }

  public async getPlanetById(planetId: LocationId): Promise<Planet | null> {
    const decStrId = locationIdToDecStr(planetId);
    const rawExtendedInfo = await callWithRetry<RawPlanetExtendedInfo>(
      this.coreContract.planetsExtendedInfo,
      [decStrId]
    );
    if (!rawExtendedInfo[0]) return null; // planetExtendedInfo.isInitialized is false
    const rawPlanet: RawPlanetData = await callWithRetry<RawPlanetData>(
      this.coreContract.planets,
      [decStrId]
    );
    return EthDecoders.rawPlanetToObject(decStrId, rawPlanet, rawExtendedInfo);
  }

  public async getArtifactById(
    artifactId: ArtifactId
  ): Promise<Artifact | null> {
    const contract = this.coreContract;
    const exists = await callWithRetry<boolean>(contract.doesArtifactExist, [
      artifactIdToDecStr(artifactId),
    ]);
    if (!exists) return null;
    const rawArtifact = await callWithRetry<RawArtifactWithMetadata>(
      contract.getArtifactById,
      [artifactIdToDecStr(artifactId)]
    );

    return EthDecoders.rawArtifactWithMetadataToArtifact(rawArtifact);
  }

  public async bulkGetArtifacts(
    artifactIds: ArtifactId[],
    printProgress = false
  ): Promise<Artifact[]> {
    const contract = this.coreContract;
    const rawArtifacts: RawArtifactWithMetadata[] = await aggregateBulkGetter<
      RawArtifactWithMetadata
    >(
      artifactIds.length,
      500,
      async (start, end) =>
        await contract.bulkGetArtifactsByIds(
          artifactIds.slice(start, end).map(artifactIdToDecStr)
        ),
      printProgress
    );

    const ret: Artifact[] = rawArtifacts.map(
      EthDecoders.rawArtifactWithMetadataToArtifact
    );

    return ret;
  }
}

export default ContractsAPI;
