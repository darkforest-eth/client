import React from 'react';
import { EventEmitter } from 'events';
import { getRandomActionId } from './Utils';
import {
  EthTxStatus,
  SubmittedTx,
  TxIntent,
} from '../_types/darkforest/api/ContractsAPITypes';
import { EthIcon } from '../app/Icons';
import {
  CenterChunkLink,
  FAQ04Link,
  PlanetNameLink,
  TxLink,
} from '../components/Text';
import {
  ExploredChunkData,
  isLocatable,
  LocatablePlanet,
  Planet,
} from '../_types/global/GlobalTypes';
import dfstyles from '../styles/dfstyles';
import { biomeName } from './ArtifactUtils';

export enum NotificationType {
  Tx,
  CanUpgrade,
  BalanceEmpty,

  // should only ever happen once
  WelcomePlayer,
  FoundSpace,
  FoundDeepSpace,
  FoundPirates,
  FoundSilver,
  FoundComet,
  FoundArtifact,
  FoundBiome,
  ReceivedPlanet,
}

export type NotificationInfo = {
  type: NotificationType;
  message: React.ReactNode;
  icon: React.ReactNode;
  id: string;
  color?: string;
  txData?: TxIntent;
  txStatus?: EthTxStatus;
};

export enum NotificationManagerEvent {
  Notify = 'Notify',
}

const getNotifColor = (
  type: NotificationType,
  txStatus?: EthTxStatus
): string | undefined => {
  if (type === NotificationType.Tx) {
    if (txStatus === EthTxStatus.Init) return dfstyles.colors.dfblue;
    else if (txStatus === EthTxStatus.Submit) return dfstyles.colors.dfgreen;
    else if (txStatus === EthTxStatus.Confirm) return undefined;
    else if (txStatus === EthTxStatus.Fail) return dfstyles.colors.dfred;
  }
  return undefined;
};

class NotificationManager extends EventEmitter {
  static instance: NotificationManager;

  private constructor() {
    super();
  }

  static getInstance(): NotificationManager {
    if (!NotificationManager.instance) {
      NotificationManager.instance = new NotificationManager();
    }

    return NotificationManager.instance;
  }

  private getIcon(type: NotificationType) {
    if (type === NotificationType.Tx) return <EthIcon />;
    else return <span>!</span>;
  }

  notify(type: NotificationType, message: React.ReactNode): void {
    this.emit(NotificationManagerEvent.Notify, {
      type,
      message,
      id: getRandomActionId(),
      icon: this.getIcon(type),
      color: getNotifColor(type),
    });
  }

  notifyTx(
    txData: TxIntent,
    message: React.ReactNode,
    txStatus: EthTxStatus
  ): void {
    this.emit(NotificationManagerEvent.Notify, {
      type: NotificationType.Tx,
      message,
      id: txData.actionId,
      icon: this.getIcon(NotificationType.Tx),
      color: getNotifColor(NotificationType.Tx, txStatus),
      txData,
      txStatus,
    });
  }

  txInit(txIntent: TxIntent): void {
    this.notifyTx(
      txIntent,
      <span>Transaction {txIntent.actionId} initialized.</span>,
      EthTxStatus.Init
    );
  }

  txSubmit(tx: SubmittedTx): void {
    this.notifyTx(
      tx,
      <span>
        Transaction {tx.actionId} accepted by Ethereum.
        <br />
        <TxLink tx={tx} />
      </span>,
      EthTxStatus.Submit
    );
  }

  txConfirm(tx: SubmittedTx): void {
    this.notifyTx(
      tx,
      <span>
        Transaction {tx.actionId} confirmed.
        <br />
        Hash: <TxLink tx={tx} />
      </span>,
      EthTxStatus.Confirm
    );
  }

  unsubmittedTxFail(txIntent: TxIntent, _e: Error): void {
    this.notifyTx(
      txIntent,
      <span>
        Transaction {txIntent.actionId} failed.
        <br />
        Check the console for more info.
      </span>,
      EthTxStatus.Fail
    );
  }

  txRevert(tx: SubmittedTx): void {
    this.notifyTx(
      tx,
      <span>
        Transaction {tx.txHash.slice(0, 8)} reverted.
        <br />
        <TxLink tx={tx} />
      </span>,
      EthTxStatus.Fail
    );
  }

  welcomePlayer(): void {
    this.notify(
      NotificationType.WelcomePlayer,
      <span>
        Welcome to the world to Dark Forest! These are your notifications.
        <br />
        Click a notification to dismiss it.
      </span>
    );
  }

  foundSpace(chunk: ExploredChunkData): void {
    this.notify(
      NotificationType.FoundSpace,
      <span>
        Congrats! You found space! Space has more valuable resources than <br />
        the nebula where your home planet is located.{' '}
        <CenterChunkLink chunk={chunk}>Click to view</CenterChunkLink>.
      </span>
    );
  }

  foundDeepSpace(chunk: ExploredChunkData): void {
    this.notify(
      NotificationType.FoundDeepSpace,
      <span>
        Congrats! You found deep space! Deep space has the rarest <br />
        planets, but planets all have lowered defense!{' '}
        <CenterChunkLink chunk={chunk}>Click to view</CenterChunkLink>.
      </span>
    );
  }

  foundSilver(planet: Planet): void {
    this.notify(
      NotificationType.FoundSilver,
      <span>
        You found a silver mine! Silver can be used to upgrade planets. <br />
        Click to view <PlanetNameLink planet={planet} />.
      </span>
    );
  }

  foundPirates(planet: Planet): void {
    this.notify(
      NotificationType.FoundPirates,
      <span>
        You found space pirates! Unconquered planets must be defeated first.
        <br />
        Click to view <PlanetNameLink planet={planet} />.
      </span>
    );
  }

  foundComet(planet: Planet): void {
    this.notify(
      NotificationType.FoundComet,
      <span>
        You found a comet! Planets with comets have a stat doubled! <br />
        Click to view <PlanetNameLink planet={planet} />
      </span>
    );
  }

  foundBiome(planet: LocatablePlanet): void {
    this.notify(
      NotificationType.FoundBiome,
      <span>
        You have discovered the {biomeName(planet.biome)} biome! <br />
        Click to view <PlanetNameLink planet={planet} />
      </span>
    );
  }

  foundArtifact(planet: LocatablePlanet): void {
    this.notify(
      NotificationType.FoundArtifact,
      <span>
        You have found a planet that can produce an artifact! <br />
        Click to view <PlanetNameLink planet={planet} />
      </span>
    );
  }

  planetCanUpgrade(planet: Planet): void {
    this.notify(
      NotificationType.CanUpgrade,
      <span>
        Your planet <PlanetNameLink planet={planet} /> can upgrade! <br />
      </span>
    );
  }

  balanceEmpty(): void {
    this.notify(
      NotificationType.BalanceEmpty,
      <span>
        Your xDAI account is out of balance!
        <br />
        Click <FAQ04Link>here</FAQ04Link> to learn how to get more.
      </span>
    );
  }

  receivedPlanet(planet: Planet) {
    this.notify(
      NotificationType.ReceivedPlanet,
      <span>
        Someone just sent you their planet: <PlanetNameLink planet={planet} />.{' '}
        {!isLocatable(planet) &&
          "You'll need to ask the person who sent it for its location."}
      </span>
    );
  }
}

export default NotificationManager;
