import { biomeName, isLocatable } from '@darkforest_eth/gamelogic';
import {
  Artifact,
  Biome,
  Chunk,
  ContractMethodName,
  EthTxStatus,
  LocatablePlanet,
  Planet,
  TxIntent,
} from '@darkforest_eth/types';
import EventEmitter from 'events';
import { startCase } from 'lodash';
import React from 'react';
import { getRandomActionId } from '../../Backend/Utils/Utils';
import {
  ArtifactFound,
  ArtifactProspected,
  FoundCorrupted,
  FoundDeadSpace,
  FoundDeepSpace,
  FoundDesert,
  FoundForest,
  FoundGrassland,
  FoundIce,
  FoundLava,
  FoundOcean,
  FoundPirates,
  FoundRuins,
  FoundSilver,
  FoundSpace,
  FoundSwamp,
  FoundTradingPost,
  FoundTundra,
  FoundWasteland,
  Generic,
  PlanetAttacked,
  PlanetConquered,
  PlanetLost,
  Quasar,
  TxDeclined,
} from '../Components/Icons';
import {
  ArtifactBiomeText,
  ArtifactRarityLabelAnim,
  ArtifactTypeText,
} from '../Components/Labels/ArtifactLabels';
import { ArtifactNameLink, CenterChunkLink, FAQ04Link, PlanetNameLink } from '../Components/Text';

export const enum NotificationType {
  Tx,
  CanUpgrade,
  BalanceEmpty,
  WelcomePlayer,
  FoundSpace,
  FoundDeepSpace,
  FoundDeadSpace,
  FoundPirates,
  FoundSilver,
  FoundSilverBank,
  FoundTradingPost,
  FoundComet,
  FoundFoundry,
  FoundBiome,
  FoundBiomeOcean,
  FoundBiomeForest,
  FoundBiomeGrassland,
  FoundBiomeTundra,
  FoundBiomeSwamp,
  FoundBiomeDesert,
  FoundBiomeIce,
  FoundBiomeWasteland,
  FoundBiomeLava,
  FoundBiomeCorrupted,
  PlanetLost,
  PlanetWon,
  PlanetAttacked,
  ArtifactProspected,
  ArtifactFound,
  ReceivedPlanet,
  Generic,
  TxInitError,
}

const BiomeNotificationMap = {
  [Biome.OCEAN]: NotificationType.FoundBiomeOcean,
  [Biome.FOREST]: NotificationType.FoundBiomeForest,
  [Biome.GRASSLAND]: NotificationType.FoundBiomeGrassland,
  [Biome.TUNDRA]: NotificationType.FoundBiomeTundra,
  [Biome.SWAMP]: NotificationType.FoundBiomeSwamp,
  [Biome.DESERT]: NotificationType.FoundBiomeDesert,
  [Biome.ICE]: NotificationType.FoundBiomeIce,
  [Biome.WASTELAND]: NotificationType.FoundBiomeWasteland,
  [Biome.LAVA]: NotificationType.FoundBiomeLava,
  [Biome.CORRUPTED]: NotificationType.FoundBiomeCorrupted,
};
function getNotificationTypeFromPlanetBiome(biome: Biome): NotificationType {
  if (!biome) throw new Error('Biome is a required to get a NotificationType');
  return BiomeNotificationMap[biome];
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

export const enum NotificationManagerEvent {
  Notify = 'Notify',
  ClearNotification = 'ClearNotification',
}

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
    switch (type) {
      case NotificationType.TxInitError:
        return <TxDeclined height={'48px'} width={'48px'} />;
      case NotificationType.FoundSilverBank:
        return <Quasar height={'48px'} width={'48px'} />;
        break;
      case NotificationType.FoundSpace:
        return <FoundSpace height={'64px'} width={'64px'} />;
        break;
      case NotificationType.FoundDeepSpace:
        return <FoundDeepSpace height={'64px'} width={'64px'} />;
        break;
      case NotificationType.FoundDeadSpace:
        return <FoundDeadSpace height={'64px'} width={'64px'} />;
        break;
      case NotificationType.FoundPirates:
        return <FoundPirates height={'48px'} width={'48px'} />;
        break;
      case NotificationType.FoundSilver:
        return <FoundSilver height={'48px'} width={'48px'} />;
        break;
      case NotificationType.FoundTradingPost:
        return <FoundTradingPost height={'48px'} width={'48px'} />;
        break;

      case NotificationType.FoundFoundry:
        return <FoundRuins height={'64px'} width={'64px'} />;
        break;
      case NotificationType.FoundBiomeOcean:
        return <FoundOcean height={'64px'} width={'64px'} />;
        break;
      case NotificationType.FoundBiomeForest:
        return <FoundForest height={'64px'} width={'64px'} />;
        break;
      case NotificationType.FoundBiomeGrassland:
        return <FoundGrassland height={'64px'} width={'64px'} />;
        break;
      case NotificationType.FoundBiomeTundra:
        return <FoundTundra height={'64px'} width={'64px'} />;
        break;
      case NotificationType.FoundBiomeSwamp:
        return <FoundSwamp height={'64px'} width={'64px'} />;
        break;
      case NotificationType.FoundBiomeDesert:
        return <FoundDesert height={'64px'} width={'64px'} />;
        break;
      case NotificationType.FoundBiomeIce:
        return <FoundIce height={'64px'} width={'64px'} />;
        break;
      case NotificationType.FoundBiomeWasteland:
        return <FoundWasteland height={'64px'} width={'64px'} />;
        break;
      case NotificationType.FoundBiomeLava:
        return <FoundLava height={'64px'} width={'64px'} />;
        break;
      case NotificationType.FoundBiomeCorrupted:
        return <FoundCorrupted height={'64px'} width={'64px'} />;
        break;
      case NotificationType.PlanetAttacked:
        return <PlanetAttacked height={'48px'} width={'48px'} />;
        break;
      case NotificationType.PlanetLost:
        return <PlanetLost height={'48px'} width={'48px'} />;
        break;
      case NotificationType.PlanetWon:
        return <PlanetConquered height={'48px'} width={'48px'} />;
        break;
      case NotificationType.ArtifactProspected:
        return <ArtifactProspected height={'48px'} width={'48px'} />;
        break;
      case NotificationType.ArtifactFound:
        return <ArtifactFound height={'48px'} width={'48px'} />;
      default:
        return <Generic height={'48px'} width={'48px'} />;
        break;
    }
  }

  reallyLongNotification() {
    let message = '';

    for (let i = 0; i < 100; i++) {
      message += 'lol ';
    }

    this.emit(NotificationManagerEvent.Notify, {
      type: NotificationType.Generic,
      message,
      id: getRandomActionId(),
      icon: this.getIcon(NotificationType.Generic),
    });
  }

  clearNotification(id: string) {
    this.emit(NotificationManagerEvent.ClearNotification, id);
  }

  notify(type: NotificationType, message: React.ReactNode): void {
    this.emit(NotificationManagerEvent.Notify, {
      type,
      message,
      id: getRandomActionId(),
      icon: this.getIcon(type),
    });
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

  foundSpace(chunk: Chunk): void {
    this.notify(
      NotificationType.FoundSpace,
      <span>
        Congrats! You found space! Space has more valuable resources than <br />
        the nebula where your home planet is located.{' '}
        <CenterChunkLink chunk={chunk}>Click to view</CenterChunkLink>.
      </span>
    );
  }

  foundDeepSpace(chunk: Chunk): void {
    this.notify(
      NotificationType.FoundDeepSpace,
      <span>
        Congrats! You found deep space! Deep space has more rare <br />
        planets, but all planets in deep space have lowered defense!{' '}
        <CenterChunkLink chunk={chunk}>Click to view</CenterChunkLink>.
      </span>
    );
  }

  foundDeadSpace(chunk: Chunk): void {
    this.notify(
      NotificationType.FoundDeadSpace,
      <span>
        Congrats! You found dead space! Dead space is the most valuable <br />
        and most dangerous part of the universe, where corrupted planets lie...{' '}
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

  foundSilverBank(planet: Planet): void {
    this.notify(
      NotificationType.FoundSilverBank,
      <span>
        You found a quasar! Quasars are weak, but can hold a lot of silver. <br />
        Click to view <PlanetNameLink planet={planet} />.
      </span>
    );
  }

  foundTradingPost(planet: Planet): void {
    this.notify(
      NotificationType.FoundTradingPost,
      <span>
        You found a spacetime rip! Now you can move artifacts in and out of the universe. Click to
        view <PlanetNameLink planet={planet} />.
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
      getNotificationTypeFromPlanetBiome(planet.biome),
      <span>
        You have discovered the {biomeName(planet.biome)} biome! <br />
        Click to view <PlanetNameLink planet={planet} />
      </span>
    );
  }

  foundFoundry(planet: LocatablePlanet): void {
    this.notify(
      NotificationType.FoundFoundry,
      <span>
        You have found a planet that can produce an artifact! Artifacts can be used to power up your
        planets and moves! <br />
        Click to view <PlanetNameLink planet={planet} />
      </span>
    );
  }
  artifactProspected(planet: LocatablePlanet): void {
    this.notify(
      NotificationType.ArtifactProspected,
      <span>
        You prospected a Foundry! <br />
        What artifacts are waiting to be found on it? Click to view{' '}
        <PlanetNameLink planet={planet} />
      </span>
    );
  }

  artifactFound(planet: LocatablePlanet, artifact: Artifact): void {
    this.notify(
      NotificationType.ArtifactFound,
      <span>
        You have found <ArtifactNameLink id={artifact.id} />, a{' '}
        <ArtifactRarityLabelAnim rarity={artifact.rarity} />{' '}
        <ArtifactBiomeText artifact={artifact} /> <ArtifactTypeText artifact={artifact} />
        {'!'.repeat(artifact.rarity)} <br />
        Click to view <PlanetNameLink planet={planet} />
      </span>
    );
  }
  planetConquered(planet: LocatablePlanet): void {
    this.notify(
      NotificationType.PlanetWon,
      <span>
        You conquered <PlanetNameLink planet={planet}></PlanetNameLink>, you're unstoppable!
      </span>
    );
  }
  planetLost(planet: LocatablePlanet): void {
    this.notify(
      NotificationType.PlanetLost,
      <span>
        You lost <PlanetNameLink planet={planet}></PlanetNameLink>, oh no!
      </span>
    );
  }
  planetAttacked(planet: LocatablePlanet): void {
    this.notify(
      NotificationType.PlanetAttacked,
      <span>
        Your Planet <PlanetNameLink planet={planet}></PlanetNameLink> has been attacked!
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
        Your ALT account is out of balance!
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
        {!isLocatable(planet) && "You'll need to ask the person who sent it for its location."}
      </span>
    );
  }

  txInitError(methodName: ContractMethodName, failureReason: string) {
    this.notify(
      NotificationType.TxInitError,
      <span>
        {startCase(methodName)} failed. Reason: {failureReason}
      </span>
    );
  }
}

export default NotificationManager;
