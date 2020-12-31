import { EventEmitter } from 'events';
import { Contract, providers } from 'ethers';
import {
  EthTxType,
  TxTypeToEthFunctionName,
} from '../_types/darkforest/api/ContractsAPITypes';
import EthConnection from './EthConnection';
import NotificationManager from '../utils/NotificationManager';
import { PopupManager } from './PopupManager';
import { promisify, timeoutAfter } from '../utils/Utils';
import { EventLogger } from '../instrumentation/EventLogger';

export interface QueuedTxRequest {
  onSubmissionError: (e: Error) => void;
  onReceiptError: (e: Error) => void;
  onTransactionResponse: (e: providers.TransactionResponse) => void;
  onTransactionReceipt: (e: providers.TransactionReceipt) => void;

  type: EthTxType;
  actionId: string;
  contract: Contract;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  args: any[];
  /* eslint-enable @typescript-eslint/no-explicit-any */
  overrides: providers.TransactionRequest;

  /* for debugging snark revert issue */
  snarkLocalVerified?: boolean;
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
   * we refresh the nonce if it hasn't been updated in last 20s
   */
  private static readonly NONCE_STALE_AFTER_MS = 20000;

  /**
   * don't allow users to submit txs if balance falls below
   */
  private static readonly MIN_BALANCE_ETH = 0.002;

  private txRequests: QueuedTxRequest[];
  private currentlyExecuting: boolean;
  private lastTransaction: number;
  private nonce: number;
  private eth: EthConnection;

  constructor(nonce: number) {
    super();

    this.txRequests = [];
    this.currentlyExecuting = false;
    this.nonce = nonce;
    this.lastTransaction = Date.now();
    this.eth = EthConnection.getInstance();
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
      gasPrice: 1000000000,
      gasLimit: 2000000,
    },
    snarkLocalVerified?: boolean
  ): PendingTransaction {
    const [txResponse, rejectTxResponse, submittedPromise] = promisify<
      providers.TransactionResponse
    >();
    const [txReceipt, rejectTxReceipt, receiptPromise] = promisify<
      providers.TransactionReceipt
    >();

    this.txRequests.push({
      type,
      actionId,
      contract,
      args,
      overrides,
      snarkLocalVerified,
      onSubmissionError: rejectTxResponse,
      onReceiptError: rejectTxReceipt,
      onTransactionResponse: txResponse,
      onTransactionReceipt: txReceipt,
    });

    this.queueNextExecution();

    return {
      submitted: submittedPromise,
      confirmed: receiptPromise,
    };
  }

  private queueNextExecution() {
    if (!this.currentlyExecuting) {
      const request = this.txRequests.shift();
      request && this.execute(request);
    }
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

  private async execute(txRequest: QueuedTxRequest) {
    this.currentlyExecuting = true;

    let time_called: number | undefined = undefined;
    let error: Error | undefined = undefined;
    let time_submitted: number | undefined = undefined;
    let time_confirmed: number | undefined = undefined;
    let time_errored: number | undefined = undefined;
    let tx_hash: string | undefined = undefined;

    const time_exec_called = Date.now();

    try {
      await this.checkBalance();
      await this.maybeUpdateNonce();
      await PopupManager.openConfirmationWindowForTransaction(txRequest);

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

      const confirmed = await EthConnection.getInstance().waitForTransaction(
        submitted.hash
      );
      time_confirmed = Date.now();
      txRequest.onTransactionReceipt(confirmed);

      if (confirmed.status !== 1) {
        time_errored = time_confirmed;
        error = new Error('transaction reverted');
      }
    } catch (e) {
      time_errored = Date.now();
      error = e;
      if (!time_submitted) {
        txRequest.onSubmissionError(e);
      } else {
        txRequest.onReceiptError(e);
      }
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const logEvent: any = {
      tx_type: txRequest.type,
      time_exec_called,
      tx_hash,
    };

    if (txRequest.snarkLocalVerified !== undefined) {
      logEvent.snark_local_verified = txRequest.snarkLocalVerified;
    }

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
          logEvent.parsed_error = String.fromCharCode.apply(
            null,
            (error as any).body || []
          );
        }
      } catch (e) {}
    }

    logEvent.rpc_endpoint = EthConnection.getInstance().getRpcEndpoint();
    logEvent.user_address = EthConnection.getInstance().getAddress();

    if (
      localStorage.getItem(`optout-metrics-${logEvent.user_address}`) !== 'true'
    ) {
      EventLogger.getInstance().logEvent(logEvent);
    }
    /* eslint-enable @typescript-eslint/no-explicit-any */

    this.currentlyExecuting = false;
    this.queueNextExecution();
  }
}
