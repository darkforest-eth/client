import { EthConnection, isPurchase, QueuedTransaction, weiToEth } from '@darkforest_eth/network';
import { EthAddress } from '@darkforest_eth/types';
import { BigNumber as EthersBN } from 'ethers';
import { getBooleanSetting, Setting } from '../Utils/SettingsHooks';

// tx is killed if user doesn't click popup within 20s
const POPUP_TIMEOUT = 20000;

export async function openConfirmationWindowForTransaction(
  ethConnection: EthConnection,
  txRequest: QueuedTransaction,
  from: EthAddress,
  gasFeeGwei: EthersBN
): Promise<void> {
  const autoApprove = getBooleanSetting(
    ethConnection.getAddress(),
    Setting.AutoApproveNonPurchaseTransactions
  );

  if (!autoApprove || isPurchase(txRequest.overrides)) {
    localStorage.setItem(`${from}-gasFeeGwei`, gasFeeGwei.toString());
    const account = ethConnection.getAddress();
    if (!account) throw new Error('no account');
    const balanceEth = weiToEth(await ethConnection.loadBalance(account));
    const method = txRequest.methodName;
    const popup = window.open(
      `/wallet/${from}/${txRequest.actionId}/${balanceEth}/${method}`,
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
      throw new Error(
        "Please enable popups to confirm this transaction. After you've done so, try again."
      );
    }
  }
}
