import { EventEmitter } from 'events';
import {
  EthAddress,
  Player,
  QueuedArrival,
  Planet,
  Upgrade,
  SpaceType,
  LocationId,
  Artifact,
  ArtifactId,
  Location,
  Biome,
  ArtifactType,
  PlanetLevel,
  VoyageId,
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
  RawUpgrade,
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
import {
  aggregateBulkGetter,
  hexifyBigIntNestedArray,
  callWithRetry,
} from '../utils/Utils';
import TerminalEmitter, { TerminalTextStyle } from '../utils/TerminalEmitter';
import EthereumAccountManager from './EthereumAccountManager';
import NotificationManager from '../utils/NotificationManager';
import { BLOCK_EXPLORER_URL } from '../utils/constants';
import bigInt from 'big-integer';

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

type QueuedTxRequest = {
  actionId: string;
  contract: Contract;
  method: string; // make this an enum

  /* eslint-disable @typescript-eslint/no-explicit-any */
  args: any[];
  overrides: providers.TransactionRequest;
  onSuccess: (res: providers.TransactionResponse) => void;
  onError: (e: Error) => void;
};

class TxExecutor extends EventEmitter {
  // tx is killed if user doesn't click popup within 20s
  private readonly POPUP_TIMEOUT = 20000;
  // tx is considered to have errored if haven't successfully submitted to mempool within 30s
  private readonly TX_SUBMIT_TIMEOUT = 30000;
  // refresh nonce if it hasn't been updated in last 20s
  private readonly NONCE_STALE_AFTER_MS = 20000;
  // don't allow users to submit txs if balance falls below
  private readonly MIN_BALANCE_ETH = 0.002;

  private txRequests: QueuedTxRequest[];
  private currentlyExecuting: boolean;
  private nonce: number;
  private nonceLastUpdated: number;

  constructor(nonce: number) {
    super();

    this.txRequests = [];
    this.currentlyExecuting = false;
    this.nonce = nonce;
    this.nonceLastUpdated = Date.now();
  }

  /**
   * Schedules this transaction to execute once all of the transactions
   * ahead of it have completed.
   */
  public makeRequest(
    actionId: string,
    contract: Contract,
    method: string,
    args: any[],
    overrides: providers.TransactionRequest
  ): Promise<providers.TransactionResponse> {
    return new Promise<providers.TransactionResponse>((resolve, reject) => {
      const txRequest = {
        actionId,
        contract,
        method,
        args,
        overrides,
        onSuccess: resolve,
        onError: reject,
      };
      this.txRequests.push(txRequest);
      if (!this.currentlyExecuting) {
        const toExec = this.txRequests.shift();
        if (toExec) this.execute(toExec);
      }
    });
  }

  private async popupConfirmationWindow(
    txRequest: QueuedTxRequest
  ): Promise<void> {
    // popup a confirmation window
    const userAddr = (
      await callWithRetry<string>(
        txRequest.contract.signer.getAddress.bind(txRequest.contract)
      )
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
        const opened = Date.now();
        await new Promise<void>((resolve, reject) => {
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
            } else {
              if (Date.now() > opened + this.POPUP_TIMEOUT) {
                reject(
                  new Error(
                    'Approval window popup timed out; check your popups!'
                  )
                );
                localStorage.removeItem(
                  `tx-approved-${userAddr}-${txRequest.actionId}`
                );
                clearInterval(interval);
                popup.close();
              }
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

  private async execute(txRequest: QueuedTxRequest) {
    this.currentlyExecuting = true;
    try {
      const res = await new Promise<providers.TransactionResponse>(
        async (resolve, reject) => {
          try {
            let succeeded = false;

            // check if balance too low
            const ethConnection = EthereumAccountManager.getInstance();
            const balance = await ethConnection.getBalance(
              ethConnection.getAddress()
            );
            if (balance < this.MIN_BALANCE_ETH) {
              const notifsManager = NotificationManager.getInstance();
              notifsManager.balanceEmpty();
              throw new Error('xDAI balance too low!');
            }

            if (
              Date.now() - this.nonceLastUpdated >
              this.NONCE_STALE_AFTER_MS
            ) {
              this.nonce = await EthereumAccountManager.getInstance().getNonce();
            }

            await this.popupConfirmationWindow(txRequest);

            // set a failure timeout
            // if we haven't gotten a response within TX_SUBMIT_TIMEOUT ms, the tx was probably not submitted; give UI feedback
            const failureTimeout = setTimeout(() => {
              if (!succeeded) {
                reject(
                  new Error(
                    `tx request ${txRequest.actionId} failed to submit: timed out}`
                  )
                );
              }
            }, this.TX_SUBMIT_TIMEOUT);

            const res = await txRequest.contract[txRequest.method](
              ...txRequest.args,
              {
                ...txRequest.overrides,
                nonce: this.nonce,
              }
            );

            this.nonce += 1;
            this.nonceLastUpdated = Date.now();
            succeeded = true;
            clearTimeout(failureTimeout);
            resolve(res);
          } catch (e) {
            reject(e);
          }
        }
      );
      txRequest.onSuccess(res);
    } catch (e) {
      const str = String.fromCharCode.apply(null, e.body || []);
      console.error(str);
      txRequest.onError(e);
    }
    this.currentlyExecuting = false;
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

    const ethConnection = EthereumAccountManager.getInstance();

    ethConnection.on('ChangedRPCEndpoint', async () => {
      this.coreContract = await ethConnection.loadCoreContract();
    });
  }

  removeEventListeners(): void {
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
      this.emit(ContractsAPIEvent.TxConfirmed, unminedTx);
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
      this.emit(ContractsAPIEvent.TxReverted, unminedTx);
    }
  }

  // throws if tx initialization fails
  // otherwise, returns a promise of a submtited (unmined) tx receipt
  async initializePlayer(
    args: InitializePlayerArgs,
    action: UnconfirmedInit
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
      action.actionId,
      this.coreContract,
      'initializePlayer',
      args,
      overrides
    );
    if (tx.hash) {
      const unminedInitTx: SubmittedInit = {
        ...action,
        txHash: tx.hash,
        sentAtTimestamp: Math.floor(Date.now() / 1000),
      };
      this.onTxSubmit(unminedInitTx);
    }
    return tx.wait();
  }

  async transferOwnership(
    planetId: LocationId,
    newOwner: EthAddress,
    actionId: string
  ): Promise<providers.TransactionReceipt> {
    const overrides: providers.TransactionRequest = {
      gasPrice: 1000000000,
      gasLimit: 2000000,
    };

    const tx = await this.txRequestExecutor.makeRequest(
      actionId,
      this.coreContract,
      'transferOwnership',
      [locationIdToDecStr(planetId), newOwner],
      overrides
    );

    const unminedTransferTx: SubmittedPlanetTransfer = {
      actionId,
      type: EthTxType.PLANET_TRANSFER,
      txHash: tx.hash,
      sentAtTimestamp: Math.floor(Date.now() / 1000),
      planetId,
      newOwner,
    };

    this.onTxSubmit(unminedTransferTx);

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
      actionId,
      this.coreContract,
      'upgradePlanet',
      args,
      overrides
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
    } else {
      throw new Error(`tx ${actionId} failed to submit`);
    }
    return tx.wait();
  }

  // throws if tx initialization fails
  // otherwise, returns a promise of a submtited (unmined) tx receipt
  async findArtifact(
    location: Location,
    biomeSnarkArgs: BiomeArgs,
    actionId: string
  ): Promise<providers.TransactionReceipt> {
    const terminalEmitter = TerminalEmitter.getInstance();

    const overrides: providers.TransactionRequest = {
      gasPrice: 1000000000,
      gasLimit: 2000000,
    };

    terminalEmitter.println(
      'ARTIFACT: calculated SNARK with args:',
      TerminalTextStyle.Sub
    );
    terminalEmitter.println(
      JSON.stringify(hexifyBigIntNestedArray(biomeSnarkArgs.slice(0, 3))),
      TerminalTextStyle.Sub,
      true
    );
    terminalEmitter.newline();

    const tx: providers.TransactionResponse = await this.txRequestExecutor.makeRequest(
      actionId,
      this.coreContract,
      'findArtifact',
      biomeSnarkArgs,
      overrides
    );

    if (tx.hash) {
      const unminedFindArtifact: SubmittedFindArtifact = {
        actionId,
        type: EthTxType.FIND_ARTIFACT,
        txHash: tx.hash,
        sentAtTimestamp: Math.floor(Date.now() / 1000),
        planetId: location.hash,
      };
      this.onTxSubmit(unminedFindArtifact);
    } else {
      throw new Error(`tx ${actionId} failed to submit`);
    }
    return tx.wait();
  }

  // throws if tx initialization fails
  // otherwise, returns a promise of a submtited (unmined) tx receipt
  async depositArtifact(
    action: UnconfirmedDepositArtifact
  ): Promise<providers.TransactionReceipt> {
    const terminalEmitter = TerminalEmitter.getInstance();
    terminalEmitter.println(
      'DEPOSIT_ARTIFACT: sending deposit to blockchain',
      TerminalTextStyle.Sub
    );
    terminalEmitter.newline();

    const args: DepositArtifactArgs = [
      locationIdToDecStr(action.locationId),
      artifactIdToDecStr(action.artifactId),
    ];

    const overrides: providers.TransactionRequest = {
      gasPrice: 1000000000,
      gasLimit: 2000000,
    };
    const tx: providers.TransactionResponse = await this.txRequestExecutor.makeRequest(
      action.actionId,
      this.coreContract,
      'depositArtifact',
      args,
      overrides
    );
    if (tx.hash) {
      const submittedTx: SubmittedDepositArtifact = {
        ...action,
        txHash: tx.hash,
        sentAtTimestamp: Math.floor(Date.now() / 1000),
      };
      this.onTxSubmit(submittedTx);
    } else {
      throw new Error(`tx ${action.actionId} failed to submit`);
    }
    return tx.wait();
  }

  // throws if tx initialization fails
  // otherwise, returns a promise of a submtited (unmined) tx receipt
  async withdrawArtifact(
    action: UnconfirmedWithdrawArtifact
  ): Promise<providers.TransactionReceipt> {
    const terminalEmitter = TerminalEmitter.getInstance();
    terminalEmitter.println(
      'WITHDRAW_ARTIFACT: sending withdrawal to blockchain',
      TerminalTextStyle.Sub
    );
    terminalEmitter.newline();

    const args: WithdrawArtifactArgs = [locationIdToDecStr(action.locationId)];

    const overrides: providers.TransactionRequest = {
      gasPrice: 1000000000,
      gasLimit: 2000000,
    };
    const tx: providers.TransactionResponse = await this.txRequestExecutor.makeRequest(
      action.actionId,
      this.coreContract,
      'withdrawArtifact',
      args,
      overrides
    );
    if (tx.hash) {
      const submittedTx: SubmittedWithdrawArtifact = {
        ...action,
        txHash: tx.hash,
        sentAtTimestamp: Math.floor(Date.now() / 1000),
      };
      this.onTxSubmit(submittedTx);
    } else {
      throw new Error(`tx ${action.actionId} failed to submit`);
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
      actionId,
      this.coreContract,
      'move',
      args,
      overrides
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
    } else {
      throw new Error(`tx ${actionId} failed to submit`);
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
      actionId,
      this.coreContract,
      'buyHat',
      [planetIdDecStr],
      overrides
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
      '(1/7) Getting game constants...',
      TerminalTextStyle.Sub
    );

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
    const upgrades: UpgradesInfo = this.rawUpgradesInfoToUpgradesInfo(
      rawUpgrades
    );

    terminalEmitter.println(
      '(2/7) Getting default planet stats...',
      TerminalTextStyle.Sub
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

  async zkChecksDisabled(): Promise<boolean> {
    return callWithRetry<boolean>(this.coreContract.DISABLE_ZK_CHECK);
  }

  async getPlayerArtifacts(playerId: EthAddress): Promise<Artifact[]> {
    const myArtifactIds = (
      await callWithRetry<EthersBN[]>(this.coreContract.getPlayerArtifactIds, [
        playerId,
      ])
    ).map(artifactIdFromEthersBN);
    return this.bulkGetArtifacts(myArtifactIds);
  }

  async getPlayers(): Promise<Map<string, Player>> {
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

  async getWorldRadius(): Promise<number> {
    const radius = (
      await callWithRetry<EthersBN>(this.coreContract.worldRadius)
    ).toNumber();
    return radius;
  }

  async getContractBalance(): Promise<number> {
    const rawBalance = await callWithRetry<EthersBN>(
      this.coreContract.getBalance
    );
    const myBalance = utils.formatEther(rawBalance);
    const numBalance = parseFloat(myBalance);
    return numBalance;
  }

  async getArrival(arrivalId: number): Promise<QueuedArrival | null> {
    const contract = this.coreContract;
    const rawArrival: RawArrivalData = await callWithRetry<RawArrivalData>(
      contract.planetArrivals,
      [arrivalId]
    );
    return this.rawArrivalToObject(rawArrival);
  }

  async getArrivalsForPlanet(planetId: LocationId): Promise<QueuedArrival[]> {
    const contract = this.coreContract;

    const events = (
      await callWithRetry<RawArrivalData[]>(contract.getPlanetArrivals, [
        locationIdToDecStr(planetId),
      ])
    ).map(this.rawArrivalToObject);

    return events;
  }

  /**
   * Loads arrivals for only the given planets
   */
  async getAllArrivals(planetsToLoad: LocationId[]): Promise<QueuedArrival[]> {
    console.log('getting arrivals');
    const contract = this.coreContract;
    const terminalEmitter = TerminalEmitter.getInstance();
    terminalEmitter.println('(4/7) Getting pending moves...');

    const arrivalsUnflattened = await aggregateBulkGetter<QueuedArrival[]>(
      planetsToLoad.length,
      1000,
      async (start, end) => {
        return (
          await contract.bulkGetPlanetArrivalsByIds(
            planetsToLoad.slice(start, end).map((id) => locationIdToDecStr(id))
          )
        ).map((arrivals: RawArrivalData[]) =>
          arrivals.map(this.rawArrivalToObject)
        );
      },
      true
    );

    return _.flatten(arrivalsUnflattened);
  }

  async getTouchedPlanetIds(startingAt: number): Promise<LocationId[]> {
    const terminalEmitter = TerminalEmitter.getInstance();
    terminalEmitter.println('(3/7) Getting planet IDs...');
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
  /**
   * bulk syncs all the planet data from the contract, for planets that have been mined on this device.
   */
  async getTouchedPlanets(
    toLoadPlanets: LocationId[]
  ): Promise<Map<LocationId, Planet>> {
    console.log('getting planets');
    const contract = this.coreContract;
    const terminalEmitter = TerminalEmitter.getInstance();

    terminalEmitter.println('(5/7) Getting planet metadata...');
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

    terminalEmitter.println('(6/7) Getting planet data...');
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
        const planet = this.rawPlanetToObject(
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
    return this.rawPlanetToObject(decStrId, rawPlanet, rawExtendedInfo);
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

    return this.rawArtifactWithMetadataToArtifact(rawArtifact);
  }

  /**
   * Bulk get artifacts.
   */
  public async bulkGetArtifacts(
    artifactIds: ArtifactId[],
    printProgress = false
  ): Promise<Artifact[]> {
    if (printProgress) {
      const terminalEmitter = TerminalEmitter.getInstance();
      terminalEmitter.println('(7/7) Getting artifacts...');
    }

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
      this.rawArtifactWithMetadataToArtifact.bind(this)
    );

    return ret;
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
      eventId: rawId.toString() as VoyageId,
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

  private rawArtifactWithMetadataToArtifact(
    rawArtifactWithMetadata: RawArtifactWithMetadata
  ): Artifact {
    const rawArtifact = rawArtifactWithMetadata[0];
    const rawUpgrade = rawArtifactWithMetadata[1];
    const rawOwner = rawArtifactWithMetadata[2];
    const rawLocationId = rawArtifactWithMetadata[3];
    const planetLevel = rawArtifact[2].toNumber() as PlanetLevel;
    const planetBiome = rawArtifact[3] as Biome;
    const artifactType = rawArtifact[6] as ArtifactType;
    const ret: Artifact = {
      id: artifactIdFromEthersBN(rawArtifact[0]),
      planetDiscoveredOn: locationIdFromDecStr(rawArtifact[1].toString()),
      planetLevel,
      planetBiome,
      mintedAtTimestamp: rawArtifact[4].toNumber(),
      discoverer: address(rawArtifact[5]),
      currentOwner: address(rawOwner),
      artifactType,
      upgrade: this.rawUpgradeToUpgrade(rawUpgrade),
    };
    if (!rawLocationId.eq(0)) {
      ret.onPlanetId = locationIdFromEthersBN(rawLocationId);
    }
    return ret;
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
      lastUpdated: rawLastUpdated.toNumber(),
      upgradeState: [
        rawUpgradeState[0].toNumber(),
        rawUpgradeState[1].toNumber(),
        rawUpgradeState[2].toNumber(),
      ],

      unconfirmedDepartures: [],
      unconfirmedUpgrades: [],
      unconfirmedBuyHats: [],
      unconfirmedPlanetTransfers: [],
      unconfirmedFindArtifact: undefined,
      silverSpent: 0, // this is stale and will be updated in entitystore

      isInContract: true,
      syncedWithContract: true,
      hasTriedFindingArtifact: rawPlanetExtendedInfo[9],
    };

    if (!rawPlanetExtendedInfo[10].eq(0)) {
      planet.heldArtifactId = artifactIdFromEthersBN(rawPlanetExtendedInfo[10]);
      planet.artifactLockedTimestamp = rawPlanetExtendedInfo[11].toNumber();
    }
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
