import {
  ContractMethodName,
  TxIntent,
  UnconfirmedActivateArtifact,
  UnconfirmedBuyGPTCredits,
  UnconfirmedBuyHat,
  UnconfirmedClaim,
  UnconfirmedDeactivateArtifact,
  UnconfirmedDepositArtifact,
  UnconfirmedFindArtifact,
  UnconfirmedInit,
  UnconfirmedMove,
  UnconfirmedPlanetTransfer,
  UnconfirmedProspectPlanet,
  UnconfirmedReveal,
  UnconfirmedUpgrade,
  UnconfirmedWithdrawArtifact,
  UnconfirmedWithdrawSilver,
} from '@darkforest_eth/types';

export function isUnconfirmedReveal(txIntent: TxIntent): txIntent is UnconfirmedReveal {
  return txIntent.methodName === ContractMethodName.REVEAL_LOCATION;
}

export function isUnconfirmedInit(txIntent: TxIntent): txIntent is UnconfirmedInit {
  return txIntent.methodName === ContractMethodName.INIT;
}

export function isUnconfirmedMove(txIntent: TxIntent): txIntent is UnconfirmedMove {
  return txIntent.methodName === ContractMethodName.MOVE;
}

export function isUnconfirmedUpgrade(txIntent: TxIntent): txIntent is UnconfirmedUpgrade {
  return txIntent.methodName === ContractMethodName.UPGRADE;
}

export function isUnconfirmedBuyHat(txIntent: TxIntent): txIntent is UnconfirmedBuyHat {
  return txIntent.methodName === ContractMethodName.BUY_HAT;
}

export function isUnconfirmedTransfer(txIntent: TxIntent): txIntent is UnconfirmedPlanetTransfer {
  return txIntent.methodName === ContractMethodName.PLANET_TRANSFER;
}

export function isUnconfirmedFindArtifact(txIntent: TxIntent): txIntent is UnconfirmedFindArtifact {
  return txIntent.methodName === ContractMethodName.FIND_ARTIFACT;
}

export function isUnconfirmedDepositArtifact(
  txIntent: TxIntent
): txIntent is UnconfirmedDepositArtifact {
  return txIntent.methodName === ContractMethodName.DEPOSIT_ARTIFACT;
}

export function isUnconfirmedWithdrawArtifact(
  txIntent: TxIntent
): txIntent is UnconfirmedWithdrawArtifact {
  return txIntent.methodName === ContractMethodName.WITHDRAW_ARTIFACT;
}

export function isUnconfirmedProspectPlanet(
  txIntent: TxIntent
): txIntent is UnconfirmedProspectPlanet {
  return txIntent.methodName === ContractMethodName.PROSPECT_PLANET;
}

export function isUnconfirmedActivateArtifact(
  txIntent: TxIntent
): txIntent is UnconfirmedActivateArtifact {
  return txIntent.methodName === ContractMethodName.ACTIVATE_ARTIFACT;
}

export function isUnconfirmedDeactivateArtifact(
  txIntent: TxIntent
): txIntent is UnconfirmedDeactivateArtifact {
  return txIntent.methodName === ContractMethodName.DEACTIVATE_ARTIFACT;
}

export function isUnconfirmedWithdrawSilver(
  txIntent: TxIntent
): txIntent is UnconfirmedWithdrawSilver {
  return txIntent.methodName === ContractMethodName.WITHDRAW_SILVER;
}

export function isUnconfirmedBuyGPTCredits(
  txIntent: TxIntent
): txIntent is UnconfirmedBuyGPTCredits {
  return txIntent.methodName === ContractMethodName.BUY_GPT_CREDITS;
}

export function isUnconfirmedClaim(txIntent: TxIntent): txIntent is UnconfirmedClaim {
  return txIntent.methodName === ContractMethodName.CLAIM_LOCATION;
}
