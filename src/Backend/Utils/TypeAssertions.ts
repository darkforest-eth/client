import {
  TxIntent,
  UnconfirmedInit,
  EthTxType,
  UnconfirmedMove,
  UnconfirmedUpgrade,
  UnconfirmedBuyHat,
  UnconfirmedPlanetTransfer,
  UnconfirmedFindArtifact,
  UnconfirmedDepositArtifact,
  UnconfirmedWithdrawArtifact,
  UnconfirmedProspectPlanet,
  UnconfirmedActivateArtifact,
  UnconfirmedDeactivateArtifact,
  UnconfirmedReveal,
  UnconfirmedBuyGPTCredits,
  UnconfirmedWithdrawSilver,
} from '@darkforest_eth/types';

export function isUnconfirmedReveal(txIntent: TxIntent): txIntent is UnconfirmedReveal {
  return txIntent.type === EthTxType.REVEAL_LOCATION;
}

export function isUnconfirmedInit(txIntent: TxIntent): txIntent is UnconfirmedInit {
  return txIntent.type === EthTxType.INIT;
}

export function isUnconfirmedMove(txIntent: TxIntent): txIntent is UnconfirmedMove {
  return txIntent.type === EthTxType.MOVE;
}

export function isUnconfirmedUpgrade(txIntent: TxIntent): txIntent is UnconfirmedUpgrade {
  return txIntent.type === EthTxType.UPGRADE;
}

export function isUnconfirmedBuyHat(txIntent: TxIntent): txIntent is UnconfirmedBuyHat {
  return txIntent.type === EthTxType.BUY_HAT;
}

export function isUnconfirmedTransfer(txIntent: TxIntent): txIntent is UnconfirmedPlanetTransfer {
  return txIntent.type === EthTxType.PLANET_TRANSFER;
}

export function isUnconfirmedFindArtifact(txIntent: TxIntent): txIntent is UnconfirmedFindArtifact {
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

export function isUnconfirmedProspectPlanet(
  txIntent: TxIntent
): txIntent is UnconfirmedProspectPlanet {
  return txIntent.type === EthTxType.PROSPECT_PLANET;
}

export function isUnconfirmedActivateArtifact(
  txIntent: TxIntent
): txIntent is UnconfirmedActivateArtifact {
  return txIntent.type === EthTxType.ACTIVATE_ARTIFACT;
}

export function isUnconfirmedDeactivateArtifact(
  txIntent: TxIntent
): txIntent is UnconfirmedDeactivateArtifact {
  return txIntent.type === EthTxType.DEACTIVATE_ARTIFACT;
}

export function isUnconfirmedWithdrawSilver(
  txIntent: TxIntent
): txIntent is UnconfirmedWithdrawSilver {
  return txIntent.type === EthTxType.WITHDRAW_SILVER;
}

export function isUnconfirmedBuyGPTCredits(
  txIntent: TxIntent
): txIntent is UnconfirmedBuyGPTCredits {
  return txIntent.type === EthTxType.BUY_GPT_CREDITS;
}
