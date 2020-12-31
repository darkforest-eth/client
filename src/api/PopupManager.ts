import { callWithRetry } from '../utils/Utils';
import {
  EthTxType,
  TxTypeToEthFunctionName,
} from '../_types/darkforest/api/ContractsAPITypes';
import EthConnection from './EthConnection';
import { QueuedTxRequest } from './TxExecutor';

export class PopupManager {
  // tx is killed if user doesn't click popup within 20s
  private static readonly POPUP_TIMEOUT = 20000;

  public static async openConfirmationWindowForTransaction(
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
      txRequest.type === EthTxType.BUY_HAT
    ) {
      const ethConnection = EthConnection.getInstance();
      const balance = await ethConnection.getBalance(
        ethConnection.getAddress()
      );
      const method = TxTypeToEthFunctionName[txRequest.type];
      const popup = window.open(
        `/wallet/${userAddr}/${txRequest.actionId}/${balance}/${method}`,
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
              if (Date.now() > opened + PopupManager.POPUP_TIMEOUT) {
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
}
