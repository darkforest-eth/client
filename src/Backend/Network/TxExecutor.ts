import { EventEmitter } from 'events';
import { Contract, providers, BigNumber as EthersBN } from 'ethers';
import { EthTxType, TxTypeToEthFunctionName } from '@darkforest_eth/types';
import EthConnection from './EthConnection';
import { deferred, timeoutAfter } from '../Utils/Utils';
import { ThrottledConcurrentQueue } from './ThrottledConcurrentQueue';
import { EventLogger } from './EventLogger';
import NotificationManager from '../../Frontend/Game/NotificationManager';
import { openConfirmationWindowForTransaction } from '../../Frontend/Game/Popups';
import { DiagnosticUpdater } from '../Interfaces/DiagnosticUpdater';
import { getSetting, Setting } from '../../Frontend/Utils/SettingsHooks';

export interface QueuedTxRequest {
  onSubmissionError: (e: Error) => void;
  onReceiptError: (e: Error) => void;
  onTransactionResponse: (e: providers.TransactionResponse) => void;
  onTransactionReceipt: (e: providers.TransactionReceipt) => void;

  type: EthTxType;
  actionId: string;
  contract: Contract;
  args: unknown[];
  overrides: providers.TransactionRequest;
}

export interface PendingTransaction {
  submitted: Promise<providers.TransactionResponse>;
  confirmed: Promise<providers.TransactionReceipt>;
}

export class TxExecutor extends EventEmitter {
  /**
   * tx is considered to have errored if haven't successfully
   * submitted to mempool within 30s
   */
  private static readonly TX_SUBMIT_TIMEOUT = 30000;

  /**
   * we refresh the nonce if it hasn't been updated in this amount of time
   */
  private static readonly NONCE_STALE_AFTER_MS = 1000 * 45;

  /**
   * don't allow users to submit txs if balance falls below
   */
  private static readonly MIN_BALANCE_ETH = 0.002;

  private txQueue: ThrottledConcurrentQueue;
  private lastTransaction: number;
  private nonce: number;
  private eth: EthConnection;
  private diagnosticsUpdater?: DiagnosticUpdater;

  constructor(ethConnection: EthConnection, nonce: number) {
    super();

    this.txQueue = new ThrottledConcurrentQueue(3, 1000, 1);
    this.nonce = nonce;
    this.lastTransaction = Date.now();
    this.eth = ethConnection;
  }

  /**
   * Schedules this transaction to execute once all of the transactions
   * ahead of it have completed.
   */
  public makeRequest<T, U>(
    type: EthTxType,
    actionId: string,
    contract: Contract,
    args: unknown[],
    overrides: providers.TransactionRequest = {
      gasPrice: undefined,
      gasLimit: 2000000,
    }
  ): PendingTransaction {
    this.diagnosticsUpdater?.updateDiagnostics((d) => {
      d.transactionsInQueue++;
    });

    const [txResponse, rejectTxResponse, submittedPromise] =
      deferred<providers.TransactionResponse>();
    const [txReceipt, rejectTxReceipt, receiptPromise] = deferred<providers.TransactionReceipt>();

    if (overrides.gasPrice === undefined) {
      const gwei = EthersBN.from('1000000000');
      const userGasPriceGwei = getSetting(this.eth.getAddress(), Setting.GasFeeGwei);

      overrides.gasPrice = gwei.mul(userGasPriceGwei);
    }

    this.txQueue.add(() => {
      this.diagnosticsUpdater?.updateDiagnostics((d) => {
        d.transactionsInQueue--;
      });

      return this.execute({
        type,
        actionId,
        contract,
        args,
        overrides,
        onSubmissionError: rejectTxResponse,
        onReceiptError: rejectTxReceipt,
        onTransactionResponse: txResponse,
        onTransactionReceipt: txReceipt,
      });
    });

    return {
      submitted: submittedPromise,
      confirmed: receiptPromise,
    };
  }

  private async maybeUpdateNonce() {
    if (Date.now() - this.lastTransaction > TxExecutor.NONCE_STALE_AFTER_MS) {
      this.nonce = await this.eth.getNonce();
    }
  }

  private async checkBalance() {
    const balance = await this.eth.getBalance(this.eth.getAddress());

    if (balance < TxExecutor.MIN_BALANCE_ETH) {
      const notifsManager = NotificationManager.getInstance();
      notifsManager.balanceEmpty();
      throw new Error('xDAI balance too low!');
    }
  }

  private execute = async (txRequest: QueuedTxRequest) => {
    let time_called: number | undefined = undefined;
    let error: Error | undefined = undefined;
    let time_submitted: number | undefined = undefined;
    let time_confirmed: number | undefined = undefined;
    let time_errored: number | undefined = undefined;
    let tx_hash: string | undefined = undefined;

    const time_exec_called = Date.now();

    try {
      const gasFeeGwei = EthersBN.from(txRequest.overrides.gasPrice || '1000000000')
        .div('1000000000')
        .toNumber();

      await this.checkBalance();
      await this.maybeUpdateNonce();
      await openConfirmationWindowForTransaction(
        this.eth,
        txRequest,
        this.eth.getAddress(),
        gasFeeGwei
      );

      time_called = Date.now();
      const methodName = TxTypeToEthFunctionName[txRequest.type];
      const submitted = await timeoutAfter<providers.TransactionResponse>(
        txRequest.contract[methodName](...txRequest.args, {
          ...txRequest.overrides,
          nonce: this.nonce,
        }),
        TxExecutor.TX_SUBMIT_TIMEOUT,
        `tx request ${txRequest.actionId} failed to submit: timed out}`
      );
      time_submitted = Date.now();
      tx_hash = submitted.hash;
      this.nonce += 1;
      this.lastTransaction = time_submitted;
      txRequest.onTransactionResponse(submitted);

      const confirmed = await this.eth.waitForTransaction(submitted.hash);
      time_confirmed = Date.now();
      txRequest.onTransactionReceipt(confirmed);

      if (confirmed.status !== 1) {
        time_errored = time_confirmed;
        error = new Error('transaction reverted');
      }
    } catch (e) {
      console.error(e);
      time_errored = Date.now();
      error = e;
      if (!time_submitted) {
        txRequest.onSubmissionError(e);
      } else {
        txRequest.onReceiptError(e);
      }
    } finally {
      this.diagnosticsUpdater?.updateDiagnostics((d) => {
        d.totalTransactions++;
      });
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const logEvent: any = {
      tx_type: txRequest.type,
      time_exec_called,
      tx_hash,
    };

    if (time_called && time_submitted) {
      logEvent.wait_submit = time_submitted - time_called;
      if (time_confirmed) {
        logEvent.wait_confirm = time_confirmed - time_called;
      }
    }

    if (error && time_errored) {
      logEvent.error = error.message || JSON.stringify(error);
      logEvent.wait_error = time_errored - time_exec_called;

      try {
        if ((error as any).body) {
          logEvent.parsed_error = String.fromCharCode.apply(null, (error as any).body || []);
        }
      } catch (e) {}
    }

    logEvent.rpc_endpoint = this.eth.getRpcEndpoint();
    logEvent.user_address = this.eth.getAddress();

    if (localStorage.getItem(`optout-metrics-${logEvent.user_address}`) !== 'true') {
      EventLogger.getInstance().logEvent(logEvent);
    }
  };

  public setDiagnosticUpdater(diagnosticUpdater?: DiagnosticUpdater) {
    this.diagnosticsUpdater = diagnosticUpdater;
  }
}
