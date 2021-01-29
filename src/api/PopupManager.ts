import {
  EthTxType,
  TxTypeToEthFunctionName,
} from '../_types/darkforest/api/ContractsAPITypes';
import { EthAddress } from '../_types/global/GlobalTypes';
import EthConnection from './EthConnection';
import { QueuedTxRequest } from './TxExecutor';

export class PopupManager {
  // tx is killed if user doesn't click popup within 20s
  private static readonly POPUP_TIMEOUT = 20000;

  public static async openConfirmationWindowForTransaction(
    ethConnection: EthConnection,
    txRequest: QueuedTxRequest,
    from: EthAddress
  ): Promise<void> {
    // popup a confirmation window

    // this guy should get a manager / API so we can actually understand it
    const enableUntilStr = localStorage.getItem(`wallet-enabled-${from}`);

    if (
      !enableUntilStr ||
      Number.isNaN(+enableUntilStr) ||
      Date.now() > +enableUntilStr ||
      txRequest.type === EthTxType.BUY_HAT
    ) {
      const account = ethConnection.getAddress();
      const balance = await ethConnection.getBalance(account);
      const method = TxTypeToEthFunctionName[txRequest.type];
      const popup = window.open(
        `/wallet/${from}/${txRequest.actionId}/${balance}/${method}`,
        'confirmationwindow',
        'width=600,height=440'
      );
      if (popup) {
        const opened = Date.now();
        await new Promise<void>((resolve, reject) => {
          const interval = setInterval(() => {
            if (popup.closed) {
              const approved =
                localStorage.getItem(
                  `tx-approved-${from}-${txRequest.actionId}`
                ) === 'true';
              if (approved) {
                resolve();
              } else {
                reject(new Error('User rejected transaction.'));
              }
              localStorage.removeItem(
                `tx-approved-${from}-${txRequest.actionId}`
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
                  `tx-approved-${from}-${txRequest.actionId}`
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
