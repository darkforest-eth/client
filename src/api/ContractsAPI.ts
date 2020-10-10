//import * as EventEmitter from 'events';
import { EventEmitter } from 'events';
import {
  EthAddress,
  PlanetMap,
  Player,
  PlayerMap,
  QueuedArrival,
  Planet,
  Upgrade,
  SpaceType,
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
  locationIdToBigNumber,
} from '../utils/CheckedTypeUtils';
import {
  ContractConstants,
  InitializePlayerArgs,
  MoveArgs,
  RawPlanetData,
  RawPlanetExtendedInfo,
  UnconfirmedTx,
  UnconfirmedInit,
  EthTxType,
  UnconfirmedMove,
  ZKArgIdx,
  InitArgIdxs,
  MoveArgIdxs,
  ContractEvent,
  ContractsAPIEvent,
  MoveSnarkArgs,
  RawDefaults,
  RawArrivalData,
  UpgradeArgs,
  RawUpgradesInfo,
  UpgradesInfo,
  RawUpgrade,
  UnconfirmedUpgrade,
  UpgradeArgIdxs,
  SubmittedTx,
  SubmittedInit,
  SubmittedUpgrade,
  SubmittedMove,
  SubmittedBuyHat,
  UnconfirmedBuyHat,
} from '../_types/darkforest/api/ContractsAPITypes';
import { aggregateBulkGetter, hexifyBigIntNestedArray } from '../utils/Utils';
import TerminalEmitter, { TerminalTextStyle } from '../utils/TerminalEmitter';
import EthereumAccountManager from './EthereumAccountManager';
import NotificationManager from '../utils/NotificationManager';
import { BLOCK_EXPLORER_URL } from '../utils/constants';
import bigInt from 'big-integer';

export function isUnconfirmedInit(tx: UnconfirmedTx): tx is UnconfirmedInit {
  return tx.type === EthTxType.INIT;
}

export function isUnconfirmedMove(tx: UnconfirmedTx): tx is UnconfirmedMove {
  return tx.type === EthTxType.MOVE;
}

export function isUnconfirmedUpgrade(
  tx: UnconfirmedTx
): tx is UnconfirmedUpgrade {
  return tx.type === EthTxType.UPGRADE;
}

export function isUnconfirmedBuyHat(
  tx: UnconfirmedTx
): tx is UnconfirmedBuyHat {
  return tx.type === EthTxType.BUY_HAT;
}

export const contractPrecision = 1000;

type QueuedTxRequest = {
  actionId: string;
  contract: Contract;
  method: string; // make this an enum

  /* eslint-disable @typescript-eslint/no-explicit-any */
  args: any[];
  overrides: providers.TransactionRequest;
};

class TxExecutor extends EventEmitter {
  private txRequests: QueuedTxRequest[];
  private pendingExec: boolean;
  private nonce: number;
  private nonceLastUpdated: number;

  constructor(nonce: number) {
    super();

    this.txRequests = [];
    this.pendingExec = false;
    this.nonce = nonce;
    this.nonceLastUpdated = Date.now();
  }

  makeRequest(
    txRequest: QueuedTxRequest
  ): Promise<providers.TransactionResponse> {
    this.txRequests.push(txRequest);
    if (!this.pendingExec) {
      const toExec = this.txRequests.shift();
      if (toExec) this.execute(toExec);
    }
    return new Promise<providers.TransactionResponse>((resolve, reject) => {
      this.once(
        txRequest.actionId,
        (res: providers.TransactionResponse, e: Error) => {
          if (res) {
            resolve(res);
          } else {
            reject(e);
          }
        }
      );
    });
  }

  async popupConfirmationWindow(txRequest: QueuedTxRequest): Promise<void> {
    // popup a confirmation window
    const userAddr = await (
      await txRequest.contract.signer.getAddress()
    ).toLowerCase();

    // this guy should get a manager / API so we can actually understand it
    const enableUntilStr = localStorage.getItem(`wallet-enabled-${userAddr}`);

    if (
      !enableUntilStr ||
      Number.isNaN(+enableUntilStr) ||
      Date.now() > +enableUntilStr ||
      txRequest.method === 'buyHat'
    ) {
      const ethConnection = EthereumAccountManager.getInstance();
      const balance = await ethConnection.getBalance(
        ethConnection.getAddress()
      );
      const popup = window.open(
        `/wallet/${userAddr}/${txRequest.actionId}/${balance}/${txRequest.method}`,
        'confirmationwindow',
        'width=600,height=420'
      );
      if (popup) {
        await new Promise((resolve, reject) => {
          const interval = setInterval(() => {
            if (popup.closed) {
              const approved =
                localStorage.getItem(
                  `tx-approved-${userAddr}-${txRequest.actionId}`
                ) === 'true';
              if (approved) {
                resolve();
              } else {
                reject(new Error('User rejected transaction.'));
              }
              localStorage.removeItem(
                `tx-approved-${userAddr}-${txRequest.actionId}`
              );
              clearInterval(interval);
            }
          }, 100);
        });
      } else {
        throw new Error(
          'You need to enable popups to confirm this transaction.'
        );
      }
    }
  }

  async execute(txRequest: QueuedTxRequest) {
    this.pendingExec = true;
    try {
      console.log('executing tx');
      // check if balance too low
      const ethConnection = EthereumAccountManager.getInstance();
      const balance = await ethConnection.getBalance(
        ethConnection.getAddress()
      );
      if (balance < 0.002) {
        const notifsManager = NotificationManager.getInstance();
        notifsManager.balanceEmpty();
        throw new Error('xDAI balance too low!');
      }

      if (Date.now() - this.nonceLastUpdated > 30000) {
        this.nonce = await EthereumAccountManager.getInstance().getNonce();
      }
      await this.popupConfirmationWindow(txRequest);
      try {
        const res = await txRequest.contract[txRequest.method](
          ...txRequest.args,
          {
            ...txRequest.overrides,
            nonce: this.nonce,
          }
        );
        this.nonce += 1;
        this.nonceLastUpdated = Date.now();
        this.emit(txRequest.actionId, res);
      } catch (e) {
        console.error('error while submitting tx:');
        console.error(e);
        throw new Error('Unknown error occurred.');
      }
    } catch (e) {
      this.emit(txRequest.actionId, undefined, e);
    }
    this.pendingExec = false;
    const next = this.txRequests.shift();
    if (next) {
      this.execute(next);
    }
  }
}

class ContractsAPI extends EventEmitter {
  readonly account: EthAddress;
  private coreContract: Contract;
  private readonly txRequestExecutor: TxExecutor;

  private constructor(
    account: EthAddress,
    coreContract: Contract,
    nonce: number
  ) {
    super();
    this.account = account;
    this.coreContract = coreContract;
    this.txRequestExecutor = new TxExecutor(nonce);
  }

  static async create(): Promise<ContractsAPI> {
    const ethConnection = EthereumAccountManager.getInstance();
    const contract: Contract = await ethConnection.loadCoreContract();

    const account: EthAddress = ethConnection.getAddress();
    const nonce: number = await ethConnection.getNonce();

    const contractsAPI: ContractsAPI = new ContractsAPI(
      account,
      contract,
      nonce
    );
    contractsAPI.setupEventListeners();

    return contractsAPI;
  }

  destroy(): void {
    this.removeEventListeners();
  }

  private setupEventListeners(): void {
    // TODO replace these with block polling
    this.coreContract
      .on(ContractEvent.PlayerInitialized, async (player, locRaw, _: Event) => {
        const newPlayer: Player = { address: address(player) };
        this.emit(ContractsAPIEvent.PlayerInit, newPlayer);

        const newPlanet: Planet = await this.getPlanet(locRaw);
        this.emit(ContractsAPIEvent.PlanetUpdate, newPlanet);
        this.emit(ContractsAPIEvent.RadiusUpdated);
      })
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
          const fromPlanet: Planet = await this.getPlanet(
            locationIdToBigNumber(arrival.fromPlanet)
          );
          const toPlanet: Planet = await this.getPlanet(
            locationIdToBigNumber(arrival.toPlanet)
          );
          this.emit(ContractsAPIEvent.PlanetUpdate, toPlanet);
          this.emit(ContractsAPIEvent.PlanetUpdate, fromPlanet);
          this.emit(ContractsAPIEvent.RadiusUpdated);
        }
      )
      .on(ContractEvent.PlanetUpgraded, async (location, _: Event) => {
        const planet = await this.getPlanet(location);
        this.emit(ContractsAPIEvent.PlanetUpdate, planet);
      })
      .on(ContractEvent.BoughtHat, async (location, _: Event) => {
        const planet = await this.getPlanet(location);
        this.emit(ContractsAPIEvent.PlanetUpdate, planet);
      });

    const ethConnection = EthereumAccountManager.getInstance();

    ethConnection.on('ChangedRPCEndpoint', async () => {
      this.coreContract = await ethConnection.loadCoreContract();
    });
  }

  removeEventListeners(): void {
    this.coreContract.removeAllListeners(ContractEvent.PlayerInitialized);
    this.coreContract.removeAllListeners(ContractEvent.ArrivalQueued);
    this.coreContract.removeAllListeners(ContractEvent.PlanetUpgraded);
  }

  public getContractAddress(): EthAddress {
    return address(this.coreContract.address);
  }

  public onTxInit(unminedTx: UnconfirmedTx): void {
    const notifManager = NotificationManager.getInstance();
    notifManager.txInit(unminedTx);

    this.emit(ContractsAPIEvent.TxInitialized, unminedTx);
  }

  public onTxSubmit(unminedTx: SubmittedTx): void {
    // TODO encapsulate this into terminalemitter
    const terminalEmitter = TerminalEmitter.getInstance();
    terminalEmitter.print(
      `[TX SUBMIT] ${unminedTx.type} transaction (`,
      TerminalTextStyle.Blue
    );
    terminalEmitter.printLink(
      `${unminedTx.txHash.slice(0, 6)}`,
      () => {
        window.open(`${BLOCK_EXPLORER_URL}/tx/${unminedTx.txHash}`);
      },
      TerminalTextStyle.White
    );
    terminalEmitter.println(
      `) submitted to blockchain.`,
      TerminalTextStyle.Blue
    );

    const notifManager = NotificationManager.getInstance();
    notifManager.txSubmit(unminedTx);

    this.emit(ContractsAPIEvent.TxSubmitted, unminedTx);
    EthereumAccountManager.getInstance()
      .waitForTransaction(unminedTx.txHash)
      .then((receipt) => {
        this.onTxConfirmation(unminedTx, receipt.status === 1);
      });
  }

  private onTxConfirmation(unminedTx: SubmittedTx, success: boolean) {
    const terminalEmitter = TerminalEmitter.getInstance();
    if (success) {
      terminalEmitter.print(
        `[TX CONFIRM] ${unminedTx.type} transaction (`,
        TerminalTextStyle.Green
      );
      terminalEmitter.printLink(
        `${unminedTx.txHash.slice(0, 6)}`,
        () => {
          window.open(`${BLOCK_EXPLORER_URL}/tx/${unminedTx.txHash}`);
        },
        TerminalTextStyle.White
      );
      terminalEmitter.println(`) confirmed.`, TerminalTextStyle.Green);

      const notifManager = NotificationManager.getInstance();
      notifManager.txConfirm(unminedTx);
    } else {
      terminalEmitter.print(
        `[TX ERROR] ${unminedTx.type} transaction (`,
        TerminalTextStyle.Red
      );
      terminalEmitter.printLink(
        `${unminedTx.txHash.slice(0, 6)}`,
        () => {
          window.open(`${BLOCK_EXPLORER_URL}/tx/${unminedTx.txHash}`);
        },
        TerminalTextStyle.White
      );
      terminalEmitter.println(
        `) reverted. Please try again.`,
        TerminalTextStyle.Red
      );

      const notifManager = NotificationManager.getInstance();
      notifManager.txRevert(unminedTx);
    }
    this.emit(ContractsAPIEvent.TxConfirmed, unminedTx);
  }

  // throws if tx initialization fails
  // otherwise, returns a promise of a submtited (unmined) tx receipt
  async initializePlayer(
    args: InitializePlayerArgs,
    actionId: string
  ): Promise<providers.TransactionReceipt> {
    const terminalEmitter = TerminalEmitter.getInstance();
    terminalEmitter.println(
      'INIT: calculated SNARK with args:',
      TerminalTextStyle.Sub
    );
    terminalEmitter.println(
      JSON.stringify(hexifyBigIntNestedArray(args.slice(0, 3))),
      TerminalTextStyle.Sub,
      true
    );
    terminalEmitter.newline();

    const overrides: providers.TransactionRequest = {
      gasPrice: 1000000000,
      gasLimit: 2000000,
    };
    const tx: providers.TransactionResponse = await this.txRequestExecutor.makeRequest(
      {
        actionId,
        contract: this.coreContract,
        method: 'initializePlayer',
        args,
        overrides,
      }
    );
    if (tx.hash) {
      const unminedInitTx: SubmittedInit = {
        actionId,
        type: EthTxType.INIT,
        txHash: tx.hash,
        sentAtTimestamp: Math.floor(Date.now() / 1000),
        locationId: locationIdFromDecStr(
          args[ZKArgIdx.DATA][InitArgIdxs.LOCATION_ID]
        ),
      };
      this.onTxSubmit(unminedInitTx);
    }
    return tx.wait();
  }

  // throws if tx initialization fails
  // otherwise, returns a promise of a submtited (unmined) tx receipt
  async upgradePlanet(
    args: UpgradeArgs,
    actionId: string
  ): Promise<providers.TransactionReceipt> {
    const terminalEmitter = TerminalEmitter.getInstance();
    terminalEmitter.println(
      'UPGRADE: sending upgrade to blockchain',
      TerminalTextStyle.Sub
    );
    terminalEmitter.newline();

    const overrides: providers.TransactionRequest = {
      gasPrice: 1000000000,
      gasLimit: 2000000,
    };
    const tx: providers.TransactionResponse = await this.txRequestExecutor.makeRequest(
      {
        actionId,
        contract: this.coreContract,
        method: 'upgradePlanet',
        args,
        overrides,
      }
    );
    if (tx.hash) {
      const unminedUpgradeTx: SubmittedUpgrade = {
        actionId,
        type: EthTxType.UPGRADE,
        txHash: tx.hash,
        sentAtTimestamp: Math.floor(Date.now() / 1000),
        locationId: locationIdFromDecStr(args[UpgradeArgIdxs.LOCATION_ID]),
        upgradeBranch: parseInt(args[UpgradeArgIdxs.UPGRADE_BRANCH]),
      };
      this.onTxSubmit(unminedUpgradeTx);
    }
    return tx.wait();
  }

  // throws if tx initialization fails
  // otherwise, returns a promise of a submtited (unmined) tx receipt
  async move(
    snarkArgs: MoveSnarkArgs,
    shipsMoved: number,
    silverMoved: number,
    actionId: string
  ): Promise<providers.TransactionReceipt> {
    const terminalEmitter = TerminalEmitter.getInstance();

    const overrides: providers.TransactionRequest = {
      gasPrice: 1000000000,
      gasLimit: 2000000,
    };
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
    terminalEmitter.println(
      'MOVE: calculated SNARK with args:',
      TerminalTextStyle.Sub
    );
    terminalEmitter.println(
      JSON.stringify(hexifyBigIntNestedArray(args.slice(0, 3))),
      TerminalTextStyle.Sub,
      true
    );
    terminalEmitter.newline();

    const tx: providers.TransactionResponse = await this.txRequestExecutor.makeRequest(
      {
        actionId,
        contract: this.coreContract,
        method: 'move',
        args,
        overrides,
      }
    );

    if (tx.hash) {
      const forcesFloat = parseFloat(
        args[ZKArgIdx.DATA][MoveArgIdxs.SHIPS_SENT]
      );
      const silverFloat = parseFloat(
        args[ZKArgIdx.DATA][MoveArgIdxs.SILVER_SENT]
      );

      const unminedMoveTx: SubmittedMove = {
        actionId,
        type: EthTxType.MOVE,
        txHash: tx.hash,
        sentAtTimestamp: Math.floor(Date.now() / 1000),
        from: locationIdFromDecStr(args[ZKArgIdx.DATA][MoveArgIdxs.FROM_ID]),
        to: locationIdFromDecStr(args[ZKArgIdx.DATA][MoveArgIdxs.TO_ID]),
        forces: forcesFloat / contractPrecision,
        silver: silverFloat / contractPrecision,
      };
      this.onTxSubmit(unminedMoveTx);
    }
    return tx.wait();
  }

  // throws if tx initialization fails
  // otherwise, returns a promise of a submtited (unmined) tx receipt
  async buyHat(
    planetIdDecStr: string,
    currentHatLevel: number,
    actionId: string
  ) {
    const terminalEmitter = TerminalEmitter.getInstance();
    terminalEmitter.println(
      'BUY HAT: sending request to blockchain',
      TerminalTextStyle.Sub
    );
    terminalEmitter.newline();

    const overrides: providers.TransactionRequest = {
      gasPrice: 1000000000,
      gasLimit: 500000,
      value: bigInt(1000000000000000000)
        .multiply(2 ** currentHatLevel)
        .toString(),
    };
    const tx: providers.TransactionResponse = await this.txRequestExecutor.makeRequest(
      {
        actionId,
        contract: this.coreContract,
        method: 'buyHat', // TODO make this an enum
        args: [planetIdDecStr],
        overrides,
      }
    );
    if (tx.hash) {
      const unminedBuyHatTx: SubmittedBuyHat = {
        actionId,
        type: EthTxType.BUY_HAT,
        txHash: tx.hash,
        sentAtTimestamp: Math.floor(Date.now() / 1000),
        locationId: locationIdFromDecStr(planetIdDecStr),
      };
      this.onTxSubmit(unminedBuyHatTx);
    }
    return tx.wait();
  }

  async getConstants(): Promise<ContractConstants> {
    console.log('getting constants');
    const terminalEmitter = TerminalEmitter.getInstance();
    terminalEmitter.println(
      '(1/6) Getting game constants...',
      TerminalTextStyle.Sub
    );

    const contract = this.coreContract;
    const res = await Promise.all([
      contract.TIME_FACTOR_HUNDREDTHS(),
      contract.PERLIN_THRESHOLD_1(),
      contract.PERLIN_THRESHOLD_2(),
      contract.PLANET_RARITY(),
      contract.SILVER_RARITY_1(),
      contract.SILVER_RARITY_2(),
      contract.SILVER_RARITY_3(),
      contract.getUpgrades(),
    ]);
    const TIME_FACTOR_HUNDREDTHS = res[0].toNumber();
    const PERLIN_THRESHOLD_1 = res[1].toNumber();
    const PERLIN_THRESHOLD_2 = res[2].toNumber();
    const PLANET_RARITY = res[3].toNumber();
    const SILVER_RARITY_1 = res[4].toNumber();
    const SILVER_RARITY_2 = res[5].toNumber();
    const SILVER_RARITY_3 = res[6].toNumber();

    const rawUpgrades = res[7];
    const upgrades: UpgradesInfo = this.rawUpgradesInfoToUpgradesInfo(
      rawUpgrades
    );

    terminalEmitter.println(
      '(2/6) Getting default planet stats...',
      TerminalTextStyle.Sub
    );
    const rawDefaults: RawDefaults = await contract.getDefaultStats();

    return {
      TIME_FACTOR_HUNDREDTHS,
      PERLIN_THRESHOLD_1,
      PERLIN_THRESHOLD_2,
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
        await contract.getPlanetLevelThresholds()
      ).map((x: EthersBN) => x.toNumber()),
      planetCumulativeRarities: (
        await contract.getPlanetCumulativeRarities()
      ).map((x: EthersBN) => x.toNumber()),

      upgrades,
    };
  }

  async zkChecksDisabled(): Promise<boolean> {
    return this.coreContract.DISABLE_ZK_CHECK();
  }

  async getPlayers(): Promise<PlayerMap> {
    console.log('getting players');
    const contract = this.coreContract;
    const nPlayers: number = await contract.getNPlayers();

    const playerIds = await aggregateBulkGetter<EthAddress>(
      nPlayers,
      200,
      async (start, end) =>
        (await contract.bulkGetPlayers(start, end)).map(address)
    );

    const playerMap: PlayerMap = {};
    for (const playerId of playerIds) {
      playerMap[address(playerId)] = { address: address(playerId) };
    }
    return playerMap;
  }

  async getWorldRadius(): Promise<number> {
    const radius = (await this.coreContract.worldRadius()).toNumber();
    return radius;
  }

  async getContractBalance(): Promise<number> {
    const rawBalance = await this.coreContract.getBalance();
    const myBalance = utils.formatEther(rawBalance);
    const numBalance = parseFloat(myBalance);
    return numBalance;
  }

  async getArrival(arrivalId: number): Promise<QueuedArrival | null> {
    const contract = this.coreContract;
    const rawArrival: RawArrivalData = await contract.planetArrivals(arrivalId);
    return this.rawArrivalToObject(rawArrival);
  }

  async getArrivalsForPlanet(planet: Planet): Promise<QueuedArrival[]> {
    const contract = this.coreContract;

    const events = (
      await contract.getPlanetArrivals(locationIdToDecStr(planet.locationId))
    ).map(this.rawArrivalToObject);

    return events;
  }

  async getAllArrivals(): Promise<QueuedArrival[]> {
    console.log('getting arrivals');
    const contract = this.coreContract;
    const terminalEmitter = TerminalEmitter.getInstance();
    terminalEmitter.println('(3/6) Getting pending moves...');
    const nPlanets: number = await contract.getNPlanets();

    const arrivalsUnflattened = await aggregateBulkGetter<QueuedArrival[]>(
      nPlanets,
      1000,
      async (start, end) => {
        return (
          await contract.bulkGetPlanetArrivals(start, end)
        ).map((arrivals: RawArrivalData[]) =>
          arrivals.map(this.rawArrivalToObject)
        );
      },
      true
    );

    return _.flatten(arrivalsUnflattened);
  }

  async getPlanets(): Promise<PlanetMap> {
    console.log('getting planets');
    const contract = this.coreContract;
    const terminalEmitter = TerminalEmitter.getInstance();
    const nPlanets: number = await contract.getNPlanets();

    terminalEmitter.println('(4/6) Getting planet IDs...');
    const planetIds = await aggregateBulkGetter<BigInteger>(
      nPlanets,
      2000,
      async (start, end) => await contract.bulkGetPlanetIds(start, end),
      true
    );
    terminalEmitter.println('(5/6) Getting planet metadata...');
    const rawPlanetsExtendedInfo = await aggregateBulkGetter<
      RawPlanetExtendedInfo
    >(
      nPlanets,
      1000,
      async (start, end) =>
        await contract.bulkGetPlanetsExtendedInfo(start, end),
      true
    );
    terminalEmitter.println('(6/6) Getting planet data...');
    const rawPlanets = await aggregateBulkGetter<RawPlanetData>(
      nPlanets,
      1000,
      async (start, end) => await contract.bulkGetPlanets(start, end),
      true
    );

    const planets: PlanetMap = new Map();
    for (let i = 0; i < nPlanets; i += 1) {
      if (!!rawPlanets[i] && !!rawPlanetsExtendedInfo[i]) {
        const planet = this.rawPlanetToObject(
          planetIds[i].toString(),
          rawPlanets[i],
          rawPlanetsExtendedInfo[i]
        );
        planets.set(planet.locationId, planet);
      }
    }
    return planets;
  }

  private async getPlanet(rawLoc: EthersBN): Promise<Planet> {
    const rawPlanet = await this.coreContract.planets(rawLoc);
    const rawPlanetExtendedInfo = await this.coreContract.planetsExtendedInfo(
      rawLoc
    );
    return this.rawPlanetToObject(
      rawLoc.toString(),
      rawPlanet,
      rawPlanetExtendedInfo
    );
  }

  // not strictly necessary but it's cleaner
  private rawArrivalToObject(rawArrival: RawArrivalData): QueuedArrival {
    const rawId = rawArrival[0];
    const rawPlayer = rawArrival[1];
    const rawFromPlanet = rawArrival[2];
    const rawToPlanet = rawArrival[3];
    const rawPopArriving = rawArrival[4];
    const rawSilverMoved = rawArrival[5];
    const rawDepartureTime = rawArrival[6];
    const rawArrivalTime = rawArrival[7];

    const arrival: QueuedArrival = {
      eventId: rawId.toString(),
      player: address(rawPlayer),
      fromPlanet: locationIdFromDecStr(rawFromPlanet.toString()),
      toPlanet: locationIdFromDecStr(rawToPlanet.toString()),
      energyArriving: rawPopArriving.toNumber() / contractPrecision,
      silverMoved: rawSilverMoved.toNumber() / contractPrecision,
      departureTime: rawDepartureTime.toNumber(),
      arrivalTime: rawArrivalTime.toNumber(),
    };

    return arrival;
  }

  private rawPlanetToObject(
    rawLocationId: string,
    rawPlanet: RawPlanetData,
    rawPlanetExtendedInfo: RawPlanetExtendedInfo
  ): Planet {
    const rawOwner = rawPlanet[0];
    const rawRange = rawPlanet[1];
    const rawSpeed = rawPlanet[2];
    const rawDefense = rawPlanet[3];
    const rawPopulation = rawPlanet[4];
    const rawPopulationCap = rawPlanet[5];
    const rawPopulationGrowth = rawPlanet[6];
    const rawPlanetResource = rawPlanet[7];
    const rawSilverCap = rawPlanet[8];
    const rawSilverGrowth = rawPlanet[9];
    const rawSilver = rawPlanet[10];
    const rawPlanetLevel = rawPlanet[11];

    const rawIsInitialized = rawPlanetExtendedInfo[0];
    const rawCreatedAt = rawPlanetExtendedInfo[1];
    const rawLastUpdated = rawPlanetExtendedInfo[2];
    const rawPerlin = rawPlanetExtendedInfo[3];
    const rawSpaceType = rawPlanetExtendedInfo[4] as SpaceType;
    const rawUpgradeState = [
      rawPlanetExtendedInfo[5],
      rawPlanetExtendedInfo[6],
      rawPlanetExtendedInfo[7],
    ];
    const rawHatLevel = rawPlanetExtendedInfo[8];

    const planet: Planet = {
      locationId: locationIdFromDecStr(rawLocationId.toString()),
      perlin: rawPerlin.toNumber(),
      spaceType: rawSpaceType,
      owner: address(rawOwner),
      hatLevel: rawHatLevel.toNumber(),

      planetLevel: rawPlanetLevel.toNumber(),
      planetResource: rawPlanetResource,

      energyCap: rawPopulationCap.toNumber() / contractPrecision,
      energyGrowth: rawPopulationGrowth.toNumber() / contractPrecision,

      silverCap: rawSilverCap.toNumber() / contractPrecision,
      silverGrowth: rawSilverGrowth.toNumber() / contractPrecision,

      energy: rawPopulation.toNumber() / contractPrecision,
      silver: rawSilver.toNumber() / contractPrecision,

      range: rawRange.toNumber(),
      speed: rawSpeed.toNumber(),
      defense: rawDefense.toNumber(),

      // metadata
      isInitialized: rawIsInitialized,
      createdAt: rawCreatedAt.toNumber(),
      lastUpdated: rawLastUpdated.toNumber(),
      upgradeState: [
        rawUpgradeState[0].toNumber(),
        rawUpgradeState[1].toNumber(),
        rawUpgradeState[2].toNumber(),
      ],

      unconfirmedDepartures: [],
      unconfirmedUpgrades: [],
      unconfirmedBuyHats: [],
      silverSpent: 0, // this is stale and will be updated in planethelper

      pulledFromContract: true,
    };
    return planet;
  }

  private rawUpgradeToUpgrade(rawUpgrade: RawUpgrade): Upgrade {
    return {
      energyCapMultiplier: rawUpgrade[0].toNumber(),
      energyGroMultiplier: rawUpgrade[1].toNumber(),
      rangeMultiplier: rawUpgrade[2].toNumber(),
      speedMultiplier: rawUpgrade[3].toNumber(),
      defMultiplier: rawUpgrade[4].toNumber(),
    };
  }

  private rawUpgradesInfoToUpgradesInfo(
    rawUpgradesInfo: RawUpgradesInfo
  ): UpgradesInfo {
    return rawUpgradesInfo.map((a) =>
      a.map((b) => this.rawUpgradeToUpgrade(b))
    ) as UpgradesInfo;
  }
}

export default ContractsAPI;
