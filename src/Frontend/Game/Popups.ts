import { EthConnection, isPurchase, weiToEth } from '@darkforest_eth/network';
import { EthAddress, Setting, TransactionId, TxIntent } from '@darkforest_eth/types';
import { BigNumber as EthersBN, providers } from 'ethers';
import { getBooleanSetting } from '../Utils/SettingsHooks';

// tx is killed if user doesn't click popup within 20s
const POPUP_TIMEOUT = 20000;

interface OpenConfirmationConfig {
  contractAddress: EthAddress;
  connection: EthConnection;
  id: TransactionId;
  intent: TxIntent;
  overrides?: providers.TransactionRequest;
  from: EthAddress;
  gasFeeGwei: EthersBN;
}

export async function openConfirmationWindowForTransaction({
  contractAddress,
  connection,
  id,
  intent,
  overrides,
  from,
  gasFeeGwei,
}: OpenConfirmationConfig): Promise<void> {
  const config = {
    contractAddress,
    account: connection.getAddress(),
  };
  const autoApprove = getBooleanSetting(config, Setting.AutoApproveNonPurchaseTransactions);

  if (!autoApprove || isPurchase(overrides)) {
    localStorage.setItem(`${from}-gasFeeGwei`, gasFeeGwei.toString());
    const account = connection.getAddress();
    if (!account) throw new Error('no account');
    const balanceEth = weiToEth(await connection.loadBalance(account));
    const method = intent.methodName;
    const popup = window.open(
      `/wallet/${contractAddress}/${from}/${id}/${balanceEth}/${method}`,
      'confirmationwindow',
      'width=600,height=500'
    );
    if (popup) {
      const opened = Date.now();
      await new Promise<void>((resolve, reject) => {
        const interval = setInterval(() => {
          if (popup.closed) {
            const approved = localStorage.getItem(`tx-approved-${from}-${id}`) === 'true';
            if (approved) {
              resolve();
            } else {
              reject(new Error('User rejected transaction.'));
            }
            localStorage.removeItem(`tx-approved-${from}-${id}`);
            clearInterval(interval);
          } else {
            if (Date.now() > opened + POPUP_TIMEOUT) {
              reject(new Error('Approval window popup timed out; check your popups!'));
              localStorage.removeItem(`tx-approved-${from}-${id}`);
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
