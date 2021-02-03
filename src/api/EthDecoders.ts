import { CheckedTypeUtils } from '../utils/CheckedTypeUtils';
import { bonusFromHex } from '../utils/Utils';
import {
  RawArrivalData,
  RawArtifactWithMetadata,
  RawPlanetData,
  RawPlanetExtendedInfo,
  RawUpgrade,
  RawUpgradesInfo,
  UpgradesInfo,
} from '../_types/darkforest/api/ContractsAPITypes';
import {
  QueuedArrival,
  VoyageId,
  Artifact,
  PlanetLevel,
  Biome,
  ArtifactType,
  Planet,
  SpaceType,
  Upgrade,
} from '../_types/global/GlobalTypes';
import { CONTRACT_PRECISION } from './ContractsAPI';

/**
 * Responsible for deserializing objects received from the blockchain.
 */
export class EthDecoders {
  public static rawArrivalToObject(rawArrival: RawArrivalData): QueuedArrival {
    const rawId = rawArrival[0];
    const rawPlayer = rawArrival[1];
    const rawFromPlanet = rawArrival[2];
    const rawToPlanet = rawArrival[3];
    const rawPopArriving = rawArrival[4];
    const rawSilverMoved = rawArrival[5];
    const rawDepartureTime = rawArrival[6];
    const rawArrivalTime = rawArrival[7];

    const arrival: QueuedArrival = {
      eventId: rawId.toString() as VoyageId,
      player: CheckedTypeUtils.address(rawPlayer),
      fromPlanet: CheckedTypeUtils.locationIdFromDecStr(
        rawFromPlanet.toString()
      ),
      toPlanet: CheckedTypeUtils.locationIdFromDecStr(rawToPlanet.toString()),
      energyArriving: rawPopArriving.toNumber() / CONTRACT_PRECISION,
      silverMoved: rawSilverMoved.toNumber() / CONTRACT_PRECISION,
      departureTime: rawDepartureTime.toNumber(),
      arrivalTime: rawArrivalTime.toNumber(),
    };

    return arrival;
  }

  public static rawArtifactWithMetadataToArtifact(
    rawArtifactWithMetadata: RawArtifactWithMetadata
  ): Artifact {
    const rawArtifact = rawArtifactWithMetadata[0];
    const rawUpgrade = rawArtifactWithMetadata[1];
    const rawOwner = rawArtifactWithMetadata[2];
    const rawLocationId = rawArtifactWithMetadata[3];
    const planetLevel = rawArtifact[2].toNumber() as PlanetLevel;
    const planetBiome = rawArtifact[3] as Biome;
    const artifactType = rawArtifact[6] as ArtifactType;
    const ret: Artifact = {
      id: CheckedTypeUtils.artifactIdFromEthersBN(rawArtifact[0]),
      planetDiscoveredOn: CheckedTypeUtils.locationIdFromDecStr(
        rawArtifact[1].toString()
      ),
      planetLevel,
      planetBiome,
      mintedAtTimestamp: rawArtifact[4].toNumber(),
      discoverer: CheckedTypeUtils.address(rawArtifact[5]),
      currentOwner: CheckedTypeUtils.address(rawOwner),
      artifactType,
      upgrade: EthDecoders.rawUpgradeToUpgrade(rawUpgrade),
    };
    if (!rawLocationId.eq(0)) {
      ret.onPlanetId = CheckedTypeUtils.locationIdFromEthersBN(rawLocationId);
    }
    return ret;
  }

  public static rawPlanetToObject(
    rawLocationId: string,
    rawPlanet: RawPlanetData,
    rawPlanetExtendedInfo: RawPlanetExtendedInfo
  ): Planet {
    const rawOwner = rawPlanet[0];
    const rawRange = rawPlanet[1];
    const rawSpeed = rawPlanet[2];
    const rawDefense = rawPlanet[3];
    const rawPopulation = rawPlanet[4];
    const rawPopulationCap = rawPlanet[5];
    const rawPopulationGrowth = rawPlanet[6];
    const rawPlanetResource = rawPlanet[7];
    const rawSilverCap = rawPlanet[8];
    const rawSilverGrowth = rawPlanet[9];
    const rawSilver = rawPlanet[10];
    const rawPlanetLevel = rawPlanet[11];

    const rawLastUpdated = rawPlanetExtendedInfo[2];
    const rawPerlin = rawPlanetExtendedInfo[3];
    const rawSpaceType = rawPlanetExtendedInfo[4] as SpaceType;
    const rawUpgradeState = [
      rawPlanetExtendedInfo[5],
      rawPlanetExtendedInfo[6],
      rawPlanetExtendedInfo[7],
    ];
    const rawHatLevel = rawPlanetExtendedInfo[8];

    const locationId = CheckedTypeUtils.locationIdFromDecStr(
      rawLocationId.toString()
    );
    const planet: Planet = {
      locationId: locationId,
      perlin: rawPerlin.toNumber(),
      spaceType: rawSpaceType,
      owner: CheckedTypeUtils.address(rawOwner),
      hatLevel: rawHatLevel.toNumber(),

      planetLevel: rawPlanetLevel.toNumber(),
      planetResource: rawPlanetResource,

      energyCap: rawPopulationCap.toNumber() / CONTRACT_PRECISION,
      energyGrowth: rawPopulationGrowth.toNumber() / CONTRACT_PRECISION,

      silverCap: rawSilverCap.toNumber() / CONTRACT_PRECISION,
      silverGrowth: rawSilverGrowth.toNumber() / CONTRACT_PRECISION,

      energy: rawPopulation.toNumber() / CONTRACT_PRECISION,
      silver: rawSilver.toNumber() / CONTRACT_PRECISION,

      range: rawRange.toNumber(),
      speed: rawSpeed.toNumber(),
      defense: rawDefense.toNumber(),

      // metadata
      lastUpdated: rawLastUpdated.toNumber(),
      upgradeState: [
        rawUpgradeState[0].toNumber(),
        rawUpgradeState[1].toNumber(),
        rawUpgradeState[2].toNumber(),
      ],

      unconfirmedDepartures: [],
      unconfirmedUpgrades: [],
      unconfirmedBuyHats: [],
      unconfirmedPlanetTransfers: [],
      unconfirmedFindArtifact: undefined,
      silverSpent: 0, // this is stale and will be updated in entitystore

      isInContract: true,
      syncedWithContract: true,
      hasTriedFindingArtifact: rawPlanetExtendedInfo[9],
      bonus: bonusFromHex(locationId),
    };

    if (!rawPlanetExtendedInfo[10].eq(0)) {
      planet.heldArtifactId = CheckedTypeUtils.artifactIdFromEthersBN(
        rawPlanetExtendedInfo[10]
      );
      planet.artifactLockedTimestamp = rawPlanetExtendedInfo[11].toNumber();
    }
    return planet;
  }

  public static rawUpgradeToUpgrade(rawUpgrade: RawUpgrade): Upgrade {
    return {
      energyCapMultiplier: rawUpgrade[0].toNumber(),
      energyGroMultiplier: rawUpgrade[1].toNumber(),
      rangeMultiplier: rawUpgrade[2].toNumber(),
      speedMultiplier: rawUpgrade[3].toNumber(),
      defMultiplier: rawUpgrade[4].toNumber(),
    };
  }

  public static rawUpgradesInfoToUpgradesInfo(
    rawUpgradesInfo: RawUpgradesInfo
  ): UpgradesInfo {
    return rawUpgradesInfo.map((a) =>
      a.map((b) => EthDecoders.rawUpgradeToUpgrade(b))
    ) as UpgradesInfo;
  }
}
