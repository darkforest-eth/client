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
} from '../_types/darkforest/api/ContractsAPITypes';

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
