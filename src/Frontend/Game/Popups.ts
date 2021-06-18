import { EthAddress, EthTxType, TxTypeToEthFunctionName } from '@darkforest_eth/types';
import { QueuedTxRequest } from '../../Backend/Network/TxExecutor';
import EthConnection from '../../Backend/Network/EthConnection';
import { getBooleanSetting, Setting } from '../Utils/SettingsHooks';

// tx is killed if user doesn't click popup within 20s
const POPUP_TIMEOUT = 20000;

export async function openConfirmationWindowForTransaction(
  ethConnection: EthConnection,
  txRequest: QueuedTxRequest,
  from: EthAddress,
  gasFeeGwei: number
): Promise<void> {
  const autoApprove = getBooleanSetting(
    ethConnection.getAddress(),
    Setting.AutoApproveNonPurchaseTransactions
  );

  const isPurchase =
    txRequest.type === EthTxType.BUY_HAT || txRequest.type === EthTxType.BUY_GPT_CREDITS;

  if (!autoApprove || isPurchase) {
    localStorage.setItem(`${from}-gasFeeGwei`, gasFeeGwei + '');
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
              localStorage.getItem(`tx-approved-${from}-${txRequest.actionId}`) === 'true';
            if (approved) {
              resolve();
            } else {
              reject(new Error('User rejected transaction.'));
            }
            localStorage.removeItem(`tx-approved-${from}-${txRequest.actionId}`);
            clearInterval(interval);
          } else {
            if (Date.now() > opened + POPUP_TIMEOUT) {
              reject(new Error('Approval window popup timed out; check your popups!'));
              localStorage.removeItem(`tx-approved-${from}-${txRequest.actionId}`);
              clearInterval(interval);
              popup.close();
            }
          }
        }, 100);
      });
    } else {
      throw new Error('You need to enable popups to confirm this transaction.');
    }
  }
}
