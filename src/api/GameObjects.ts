import {
  LocationId,
  Location,
  Planet,
  QueuedArrival,
  ArrivalWithTimer,
  PlanetLevel,
  PlanetResource,
  SpaceType,
  EthAddress,
  LocatablePlanet,
  Biome,
  Artifact,
  ArtifactId,
  VoyageId,
  isLocatable,
  ExploredChunkData,
} from '../_types/global/GlobalTypes';
import {
  ContractConstants,
  UnconfirmedBuyHat,
  UnconfirmedMove,
  TxIntent,
  UnconfirmedUpgrade,
  UnconfirmedPlanetTransfer,
} from '../_types/darkforest/api/ContractsAPITypes';
import bigInt from 'big-integer';
import _ from 'lodash';
import { WorldCoords } from '../utils/Coordinates';
import { CheckedTypeUtils } from '../utils/CheckedTypeUtils';
import { hasOwner, getBytesFromHex, bonusFromHex } from '../utils/Utils';
import NotificationManager from '../utils/NotificationManager';
import { arrive, updatePlanetToTime } from '../utils/ArrivalUtils';
import {
  isUnconfirmedMove,
  isUnconfirmedUpgrade,
  isUnconfirmedBuyHat,
  isUnconfirmedTransfer,
  isUnconfirmedFindArtifact,
  isUnconfirmedDepositArtifact,
  isUnconfirmedWithdrawArtifact,
} from '../utils/TypeAssertions';

const getCoordsString = (coords: WorldCoords): string => {
  return `${coords.x},${coords.y}`;
};

export class GameObjects {
  private static GRID_BUCKET_SIZE = 128;

  private readonly address: EthAddress | null;
  private readonly planets: Map<LocationId, Planet>;
  private readonly planetGridBuckets: Record<string, Location[]>;
  private readonly artifacts: Map<ArtifactId, Artifact>;
  private readonly touchedPlanetIds: Set<LocationId>;
  private readonly arrivals: Map<VoyageId, ArrivalWithTimer>;
  private readonly planetArrivalIds: Map<LocationId, VoyageId[]>;
  private readonly planetLocationMap: Map<LocationId, Location>;
  private readonly contractConstants: ContractConstants;
  private readonly coordsToLocation: Map<string, Location>;
  private readonly unconfirmedMoves: Record<string, UnconfirmedMove>;
  private readonly unconfirmedUpgrades: Record<string, UnconfirmedUpgrade>;
  private readonly unconfirmedBuyHats: Record<string, UnconfirmedBuyHat>;
  private readonly unconfirmedPlanetTransfers: Record<
    string,
    UnconfirmedPlanetTransfer
  >;

  constructor(
    address: EthAddress | null,
    touchedPlanets: Map<LocationId, Planet>,
    allTouchedPlanetIds: Set<LocationId>,
    artifacts: Map<ArtifactId, Artifact>,
    allChunks: Iterable<ExploredChunkData>,
    unprocessedArrivals: Map<VoyageId, QueuedArrival>,
    unprocessedPlanetArrivalIds: Map<LocationId, VoyageId[]>,
    contractConstants: ContractConstants
  ) {
    this.address = address;
    this.planets = touchedPlanets;
    this.planetGridBuckets = {};
    this.touchedPlanetIds = allTouchedPlanetIds;
    this.artifacts = artifacts;
    this.contractConstants = contractConstants;
    this.coordsToLocation = new Map();
    this.planetLocationMap = new Map();
    const planetArrivalIds = new Map();
    const arrivals = new Map();

    for (const chunk of allChunks) {
      for (const planetLocation of chunk.planetLocations) {
        this.addPlanetLocation(planetLocation);
      }
    }

    touchedPlanets.forEach((planet, planetId) => {
      const arrivalIds = unprocessedPlanetArrivalIds.get(planetId);

      if (planet && arrivalIds) {
        const arrivalsForPlanetNull: (QueuedArrival | null)[] = arrivalIds.map(
          (arrivalId) => unprocessedArrivals.get(arrivalId) || null
        );
        const arrivalsForPlanet: QueuedArrival[] = arrivalsForPlanetNull.filter(
          (x) => !!x
        ) as QueuedArrival[];

        this.planets.set(planetId, planet);
        const arrivalsWithTimers = this.processArrivalsForPlanet(
          planet.locationId,
          arrivalsForPlanet
        );
        planetArrivalIds.set(
          planetId,
          arrivalsWithTimers.map((arrival) => arrival.arrivalData.eventId)
        );
        for (const arrivalWithTimer of arrivalsWithTimers) {
          const arrivalId = arrivalWithTimer.arrivalData.eventId;
          arrivals.set(arrivalId, arrivalWithTimer);
        }
        const planetLocation = this.planetLocationMap.get(planetId);
        if (planet && planetLocation) {
          (planet as LocatablePlanet).location = planetLocation;
          (planet as LocatablePlanet).biome = this.getBiome(planetLocation);
        }

        this.updateScore(planetId as LocationId);
      }
    });

    this.arrivals = arrivals;
    this.planetArrivalIds = planetArrivalIds;
    this.unconfirmedMoves = {};
    this.unconfirmedUpgrades = {};
    this.unconfirmedBuyHats = {};
    this.unconfirmedPlanetTransfers = {};

    // set interval to update all planets every 120s
    setInterval(() => {
      this.planets.forEach((planet) => {
        if (planet && hasOwner(planet)) {
          updatePlanetToTime(planet, Date.now());
        }
      });
    }, 120000);
  }

  public getArtifactById(artifactId: ArtifactId): Artifact | null {
    const artifact = this.artifacts.get(artifactId);
    return artifact || null;
  }

  public getArtifactsOwnedBy(addr: EthAddress): Artifact[] {
    const ret: Artifact[] = [];
    this.artifacts.forEach((artifact) => {
      if (artifact.currentOwner === addr) {
        ret.push(artifact);
      }
    });
    return ret;
  }

  public getArtifactsOnPlanetsOwnedBy(addr: EthAddress): Artifact[] {
    const ret: Artifact[] = [];
    this.artifacts.forEach((artifact) => {
      if (artifact.onPlanetId) {
        const planet = this.getPlanetWithId(artifact.onPlanetId, false);
        if (planet && planet.owner === addr) {
          ret.push(artifact);
        }
      }
    });
    return ret;
  }

  // get planet by ID - must be in contract or known chunks
  public getPlanetWithId(
    planetId: LocationId,
    updateIfStale = true
  ): Planet | null {
    const planet = this.planets.get(planetId);
    if (planet) {
      if (updateIfStale) {
        this.updatePlanetIfStale(planet);
      }
      return planet;
    }
    const loc = this.getLocationOfPlanet(planetId);
    if (!loc) return null;
    return this.getPlanetWithLocation(loc);
  }

  // this is shitty and should really be handled by comparing against UI objects
  public getPlanetHitboxForCoords(
    from: WorldCoords,
    radiusMap: Record<PlanetLevel, number>
  ): LocatablePlanet | null {
    const GRID_BUCKET_SIZE = GameObjects.GRID_BUCKET_SIZE;
    const candidates: LocatablePlanet[] = [];
    const gridRange = Math.ceil(radiusMap[PlanetLevel.MAX] / GRID_BUCKET_SIZE);

    const gridBucketX = Math.floor(from.x / GRID_BUCKET_SIZE);
    const gridBucketY = Math.floor(from.y / GRID_BUCKET_SIZE);

    for (let dx = -1 * gridRange; dx <= gridRange; dx++) {
      for (let dy = -1 * gridRange; dy <= gridRange; dy++) {
        const key = `(${gridBucketX + dx},${
          gridBucketY + dy
        },${GRID_BUCKET_SIZE})`;
        if (this.planetGridBuckets[key]) {
          for (const planetLoc of this.planetGridBuckets[key]) {
            const planet = this.getPlanetWithId(planetLoc.hash, false);
            if (planet && isLocatable(planet)) {
              candidates.push(planet);
            }
          }
        }
      }
    }

    let bestPlanet: LocatablePlanet | null = null;
    for (const planet of candidates) {
      const distThreshold = radiusMap[planet.planetLevel];
      if (
        Math.abs(from.x - planet.location.coords.x) <= distThreshold &&
        Math.abs(from.y - planet.location.coords.y) <= distThreshold
      ) {
        if (!bestPlanet || bestPlanet.planetLevel > planet.planetLevel) {
          bestPlanet = planet;
        }
      }
    }

    return bestPlanet;
  }

  // returns null if this planet is neither in contract nor in known chunks
  // fast query that doesn't update planet if stale
  public getPlanetLevel(planetId: LocationId): PlanetLevel | null {
    const planet = this.planets.get(planetId);
    if (planet) {
      return planet.planetLevel;
    }
    return null;
  }

  // returns null if this planet is neither in contract nor in known chunks
  // fast query that doesn't update planet if stale
  public getPlanetDetailLevel(planetId: LocationId): number | null {
    const planet = this.planets.get(planetId);
    if (planet) {
      let detailLevel = planet.planetLevel;
      if (hasOwner(planet)) {
        detailLevel += 1;
      }
      return detailLevel;
    } else {
      return null;
    }
  }

  /**
   * received some artifact data from the contract. update our stores
   */
  public replaceArtifactFromContractData(artifact: Artifact): void {
    const localArtifact = this.artifacts.get(artifact.id);
    if (localArtifact) {
      const {
        unconfirmedDepositArtifact,
        unconfirmedWithdrawArtifact,
      } = localArtifact;
      artifact.unconfirmedDepositArtifact = unconfirmedDepositArtifact;
      artifact.unconfirmedWithdrawArtifact = unconfirmedWithdrawArtifact;
    }
    this.artifacts.set(artifact.id, artifact);
  }

  /**
   * received some planet data from the contract. update our stores
   */
  public replacePlanetFromContractData(
    planet: Planet,
    arrivals: QueuedArrival[]
  ): void {
    this.touchedPlanetIds.add(planet.locationId);
    // does not modify unconfirmed departures or upgrades
    // that is handled by onTxConfirm
    const localPlanet = this.planets.get(planet.locationId);
    if (localPlanet) {
      const {
        unconfirmedDepartures,
        unconfirmedUpgrades,
        unconfirmedBuyHats,
        unconfirmedPlanetTransfers,
        unconfirmedFindArtifact: uncomfirmedFindArtifact,
        unconfirmedDepositArtifact,
        unconfirmedWithdrawArtifact,
      } = localPlanet;
      planet.unconfirmedDepartures = unconfirmedDepartures;
      planet.unconfirmedUpgrades = unconfirmedUpgrades;
      planet.unconfirmedBuyHats = unconfirmedBuyHats;
      planet.unconfirmedPlanetTransfers = unconfirmedPlanetTransfers;
      planet.unconfirmedFindArtifact = uncomfirmedFindArtifact;
      planet.unconfirmedDepositArtifact = unconfirmedDepositArtifact;
      planet.unconfirmedWithdrawArtifact = unconfirmedWithdrawArtifact;
    }
    // make planet Locatable if we know its location
    const loc = this.planetLocationMap.get(planet.locationId);
    if (loc) {
      (planet as LocatablePlanet).location = loc;
      (planet as LocatablePlanet).biome = this.getBiome(loc);
    }

    this.planets.set(planet.locationId, planet);

    // apply arrivals
    this.clearOldArrivals(planet);
    const updatedAwts = this.processArrivalsForPlanet(
      planet.locationId,
      arrivals
    );
    for (const awt of updatedAwts) {
      const arrivalId = awt.arrivalData.eventId;
      this.arrivals.set(arrivalId, awt);
      const arrivalIds = this.planetArrivalIds.get(planet.locationId);
      if (arrivalIds) {
        arrivalIds.push(arrivalId);
        this.planetArrivalIds.set(planet.locationId, arrivalIds);
      }
    }
    this.updateScore(planet.locationId);
  }

  // returns an empty planet if planet is not in contract
  // returns null if this isn't a planet, according to hash and coords
  public getPlanetWithCoords(coords: WorldCoords): Planet | null {
    const str = getCoordsString(coords);

    const location = this.coordsToLocation.get(str);
    if (!location) {
      return null;
    }

    return this.getPlanetWithLocation(location);
  }

  // returns an empty planet if planet is not in contract
  // returns null if this isn't a planet, according to hash and coords
  public getPlanetWithLocation(location: Location): Planet | null {
    const planet = this.planets.get(location.hash);
    if (planet) {
      this.updatePlanetIfStale(planet);
      return planet;
    }

    // return a default unowned planet
    const defaultPlanet = this.defaultPlanetFromLocation(location);
    this.planets.set(location.hash, defaultPlanet);

    return defaultPlanet;
  }

  public static isPlanetMineable(locatablePlanet: LocatablePlanet): boolean {
    const fourtheenthByte = Number(
      getBytesFromHex(locatablePlanet.locationId, 14, 15)
    );

    // TODO this (16) should be a constant
    return (
      fourtheenthByte < 16 &&
      locatablePlanet.planetLevel >= 1 &&
      locatablePlanet.planetResource !== PlanetResource.SILVER
    );
  }

  public isPlanetInContract(planetId: LocationId): boolean {
    return this.touchedPlanetIds.has(planetId);
  }

  /**
   * Called when we load chunk data into memory (on startup) and when miner has mined a new chunk
   * Adds a Location to the planetLocationMap
   * Sets an unsynced default planet in the PlanetMap this.planets
   * This is the only way a LocatablePlanet gets constructed
   */
  public addPlanetLocation(planetLocation: Location): void {
    const key = GameObjects.getGridBucketKey(planetLocation.coords);
    if (this.planetGridBuckets[key]) {
      this.planetGridBuckets[key].push(planetLocation);
    } else {
      this.planetGridBuckets[key] = [planetLocation];
    }

    this.planetLocationMap.set(planetLocation.hash, planetLocation);
    const str = getCoordsString(planetLocation.coords);

    if (!this.coordsToLocation.has(str)) {
      this.coordsToLocation.set(str, planetLocation);
    }

    if (!this.planets.get(planetLocation.hash)) {
      this.planets.set(
        planetLocation.hash,
        this.defaultPlanetFromLocation(planetLocation)
      );
    }

    const planet = this.planets.get(planetLocation.hash);

    if (planet) {
      (planet as LocatablePlanet).location = planetLocation;
      (planet as LocatablePlanet).biome = this.getBiome(planetLocation);
    }
  }

  public getLocationOfPlanet(planetId: LocationId): Location | null {
    return this.planetLocationMap.get(planetId) || null;
  }

  // NOT PERFORMANT - for scripting only
  public getAllPlanets(): Iterable<Planet> {
    return this.planets.values();
  }

  public getAllOwnedPlanets(): Planet[] {
    return Array.from(this.planets.values()).filter(hasOwner);
  }

  public getAllVoyages(): QueuedArrival[] {
    return Array.from(this.arrivals.values()).map((awt) => awt.arrivalData);
  }

  public onTxIntent(txIntent: TxIntent) {
    const notifManager = NotificationManager.getInstance();
    notifManager.txInit(txIntent);

    if (isUnconfirmedMove(txIntent)) {
      this.unconfirmedMoves[txIntent.actionId] = txIntent;
      const planet = this.getPlanetWithId(txIntent.from);
      if (planet) {
        planet.unconfirmedDepartures.push(txIntent);
      }
    } else if (isUnconfirmedUpgrade(txIntent)) {
      this.unconfirmedUpgrades[txIntent.actionId] = txIntent;
      const planet = this.getPlanetWithId(txIntent.locationId);
      if (planet) {
        planet.unconfirmedUpgrades.push(txIntent);
      }
    } else if (isUnconfirmedBuyHat(txIntent)) {
      this.unconfirmedBuyHats[txIntent.actionId] = txIntent;
      const planet = this.getPlanetWithId(txIntent.locationId);
      if (planet) {
        planet.unconfirmedBuyHats.push(txIntent);
      }
    } else if (isUnconfirmedTransfer(txIntent)) {
      this.unconfirmedPlanetTransfers[txIntent.actionId] = txIntent;
      const planet = this.getPlanetWithId(txIntent.planetId);
      if (planet) {
        planet.unconfirmedPlanetTransfers.push(txIntent);
      }
    } else if (isUnconfirmedFindArtifact(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.planetId);
      if (planet) {
        planet.unconfirmedFindArtifact = txIntent;
      }
    } else if (isUnconfirmedDepositArtifact(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.locationId);
      const artifact = this.getArtifactById(txIntent.artifactId);
      if (planet) {
        planet.unconfirmedDepositArtifact = txIntent;
      }
      if (artifact) {
        artifact.unconfirmedDepositArtifact = txIntent;
      }
    } else if (isUnconfirmedWithdrawArtifact(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.locationId);
      const artifact = this.getArtifactById(txIntent.artifactId);
      if (planet) {
        planet.unconfirmedWithdrawArtifact = txIntent;
      }
      if (artifact) {
        artifact.unconfirmedWithdrawArtifact = txIntent;
      }
    }
  }

  public clearUnconfirmedTxIntent(txIntent: TxIntent) {
    if (isUnconfirmedMove(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.from);
      if (planet) {
        let removeIdx = -1;
        for (let i = 0; i < planet.unconfirmedDepartures.length; i += 1) {
          if (planet.unconfirmedDepartures[i].actionId === txIntent.actionId) {
            removeIdx = i;
            break;
          }
        }
        if (removeIdx > -1) {
          planet.unconfirmedDepartures.splice(removeIdx, 1);
        }
      }
      delete this.unconfirmedMoves[txIntent.actionId];
    } else if (isUnconfirmedUpgrade(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.locationId);
      if (planet) {
        let removeIdx = -1;
        for (let i = 0; i < planet.unconfirmedUpgrades.length; i += 1) {
          if (planet.unconfirmedUpgrades[i].actionId === txIntent.actionId) {
            removeIdx = i;
            break;
          }
        }
        if (removeIdx > -1) {
          planet.unconfirmedUpgrades.splice(removeIdx, 1);
        }
      }
      delete this.unconfirmedUpgrades[txIntent.actionId];
    } else if (isUnconfirmedBuyHat(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.locationId);
      if (planet) {
        let removeIdx = -1;
        for (let i = 0; i < planet.unconfirmedBuyHats.length; i += 1) {
          if (planet.unconfirmedBuyHats[i].actionId === txIntent.actionId) {
            removeIdx = i;
            break;
          }
        }
        if (removeIdx > -1) {
          planet.unconfirmedBuyHats.splice(removeIdx, 1);
        }
      }
      delete this.unconfirmedBuyHats[txIntent.actionId];
    } else if (isUnconfirmedFindArtifact(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.planetId);

      if (planet) {
        planet.unconfirmedFindArtifact = undefined;
      }
    } else if (isUnconfirmedDepositArtifact(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.locationId);
      const artifact = this.getArtifactById(txIntent.artifactId);

      if (planet) {
        planet.unconfirmedDepositArtifact = undefined;
      }
      if (artifact) {
        artifact.unconfirmedDepositArtifact = undefined;
      }
    } else if (isUnconfirmedWithdrawArtifact(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.locationId);
      const artifact = this.getArtifactById(txIntent.artifactId);

      if (planet) {
        planet.unconfirmedWithdrawArtifact = undefined;
      }
      if (artifact) {
        artifact.unconfirmedWithdrawArtifact = undefined;
      }
    } else if (isUnconfirmedTransfer(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.planetId);
      if (planet) {
        let removeIdx = -1;
        for (let i = 0; i < planet.unconfirmedPlanetTransfers.length; i += 1) {
          if (
            planet.unconfirmedPlanetTransfers[i].actionId === txIntent.actionId
          ) {
            removeIdx = i;
            break;
          }
        }
        if (removeIdx > -1) {
          planet.unconfirmedPlanetTransfers.splice(removeIdx, 1);
        }
      }
      delete this.unconfirmedPlanetTransfers[txIntent.actionId];
    }
  }

  public getUnconfirmedMoves(): UnconfirmedMove[] {
    return Object.values(this.unconfirmedMoves);
  }

  public getUnconfirmedUpgrades(): UnconfirmedUpgrade[] {
    return Object.values(this.unconfirmedUpgrades);
  }

  private processArrivalsForPlanet(
    planetId: LocationId,
    arrivals: QueuedArrival[]
  ): ArrivalWithTimer[] {
    const planet = this.planets.get(planetId);
    if (!planet) {
      console.error(
        `attempted to process arrivals for planet not in memory: ${planetId}`
      );
      return [];
    }
    // process the QueuedArrival[] for a single planet
    const arrivalsWithTimers: ArrivalWithTimer[] = [];

    // sort arrivals by timestamp
    arrivals.sort((a, b) => a.arrivalTime - b.arrivalTime);
    const nowInSeconds = Date.now() / 1000;
    for (const arrival of arrivals) {
      try {
        if (nowInSeconds - arrival.arrivalTime > 0) {
          // if arrival happened in the past, run this arrival
          arrive(planet, arrival);
        } else {
          // otherwise, set a timer to do this arrival in the future
          // and append it to arrivalsWithTimers
          const applyFutureArrival = setTimeout(() => {
            arrive(planet, arrival);

            const notifManager = NotificationManager.getInstance();
            if (
              this.planetCanUpgrade(planet) &&
              planet.owner === this.address
            ) {
              notifManager.planetCanUpgrade(planet);
            }
          }, arrival.arrivalTime * 1000 - Date.now());

          const arrivalWithTimer = {
            arrivalData: arrival,
            timer: applyFutureArrival,
          };
          arrivalsWithTimers.push(arrivalWithTimer);
        }
      } catch (e) {
        console.error(
          `error occurred processing arrival for updated planet ${planetId}: ${e}`
        );
      }
    }
    this.updateScore(planetId);
    return arrivalsWithTimers;
  }

  private clearOldArrivals(planet: Planet): void {
    const planetId = planet.locationId;
    // clear old timeouts
    const arrivalIds = this.planetArrivalIds.get(planetId);
    if (arrivalIds) {
      // clear if the planet already had stored arrivals
      for (const arrivalId of arrivalIds) {
        const arrivalWithTimer = this.arrivals.get(arrivalId);
        if (arrivalWithTimer) {
          clearTimeout(arrivalWithTimer.timer);
        } else {
          console.error(`arrival with id ${arrivalId} wasn't found`);
        }
        this.arrivals.delete(arrivalId);
      }
    }
    this.planetArrivalIds.set(planetId, []);
  }

  public planetLevelFromHexPerlin(
    hex: LocationId,
    perlin: number
  ): PlanetLevel {
    const { planetLevelThresholds: planetLevelFreq } = this.contractConstants;

    const spaceType = this.spaceTypeFromPerlin(perlin);

    const levelBigInt = getBytesFromHex(hex, 4, 7);

    let ret = PlanetLevel.MIN;

    for (let type = PlanetLevel.MAX; type >= PlanetLevel.MIN; type--) {
      if (levelBigInt < bigInt(planetLevelFreq[type])) {
        ret = type;
        break;
      }
    }

    if (spaceType === SpaceType.NEBULA && ret > PlanetLevel.WhiteDwarf) {
      ret = PlanetLevel.WhiteDwarf;
    }
    if (spaceType === SpaceType.SPACE && ret > PlanetLevel.YellowStar) {
      ret = PlanetLevel.YellowStar;
    }

    return ret;
  }

  spaceTypeFromPerlin(perlin: number): SpaceType {
    if (perlin < this.contractConstants.PERLIN_THRESHOLD_1) {
      return SpaceType.NEBULA;
    } else if (perlin < this.contractConstants.PERLIN_THRESHOLD_2) {
      return SpaceType.SPACE;
    } else {
      return SpaceType.DEEP_SPACE;
    }
  }

  private getSilverNeeded(planet: Planet): number {
    const totalLevel = planet.upgradeState.reduce((a, b) => a + b);
    return (totalLevel + 1) * 0.2 * planet.silverCap;
  }

  private planetCanUpgrade(planet: Planet): boolean {
    const totalRank = planet.upgradeState.reduce((a, b) => a + b);
    if (planet.spaceType === SpaceType.NEBULA && totalRank >= 3) return false;
    if (planet.spaceType === SpaceType.SPACE && totalRank >= 4) return false;
    if (planet.spaceType === SpaceType.DEEP_SPACE && totalRank >= 5)
      return false;
    return (
      planet.planetLevel !== 0 &&
      planet.planetResource !== PlanetResource.SILVER &&
      planet.silver >= this.getSilverNeeded(planet)
    );
  }

  private planetResourceFromHexPerlin(
    hex: LocationId,
    perlin: number
  ): PlanetResource {
    // level must be sufficient - too low level planets have 0 silver growth
    const planetLevel = this.planetLevelFromHexPerlin(hex, perlin);
    const silverGrowth = this.contractConstants.defaultSilverGrowth[
      planetLevel
    ];

    // silverbyte must be under 256/rarity
    const silverRarity1 = this.contractConstants.SILVER_RARITY_1;
    const silverRarity2 = this.contractConstants.SILVER_RARITY_2;
    const silverRarity3 = this.contractConstants.SILVER_RARITY_3;
    const silverByte = Number(getBytesFromHex(hex, 8, 9));

    if (silverGrowth > 0) {
      const spaceType = this.spaceTypeFromPerlin(perlin);
      if (spaceType === SpaceType.NEBULA && silverByte * silverRarity1 < 256) {
        return PlanetResource.SILVER;
      }
      if (spaceType === SpaceType.SPACE && silverByte * silverRarity2 < 256) {
        return PlanetResource.SILVER;
      }
      if (
        spaceType === SpaceType.DEEP_SPACE &&
        silverByte * silverRarity3 < 256
      ) {
        return PlanetResource.SILVER;
      }
    }
    return PlanetResource.NONE;
  }

  private getBiome(loc: Location): Biome {
    const { perlin, biomebase } = loc;
    const spaceType = this.spaceTypeFromPerlin(perlin);

    let biome = 3 * spaceType;
    if (biomebase < this.contractConstants.BIOME_THRESHOLD_1) biome += 1;
    else if (biomebase < this.contractConstants.BIOME_THRESHOLD_2) biome += 2;
    else biome += 3;

    return biome;
  }

  /**
   * returns the data for an unowned, untouched planet at location
   * most planets in the game are untouched and not stored in the contract,
   * so we need to generate their data optimistically in the client
   */
  private defaultPlanetFromLocation(location: Location): LocatablePlanet {
    const { perlin } = location;
    const hex = location.hash;
    const planetLevel = this.planetLevelFromHexPerlin(hex, perlin);
    const planetResource = this.planetResourceFromHexPerlin(hex, perlin);
    const spaceType = this.spaceTypeFromPerlin(perlin);
    const isSilverMine = planetResource === PlanetResource.SILVER;

    const [
      energyCapBonus,
      energyGroBonus,
      rangeBonus,
      speedBonus,
      defBonus,
    ] = bonusFromHex(hex);

    let energyCap = this.contractConstants.defaultPopulationCap[planetLevel];
    let energyGro = this.contractConstants.defaultPopulationGrowth[planetLevel];
    let range = this.contractConstants.defaultRange[planetLevel];
    let speed = this.contractConstants.defaultSpeed[planetLevel];
    let defense = this.contractConstants.defaultDefense[planetLevel];
    let silCap = this.contractConstants.defaultSilverCap[planetLevel];
    energyCap *= energyCapBonus ? 2 : 1;
    energyGro *= energyGroBonus ? 2 : 1;
    range *= rangeBonus ? 2 : 1;
    speed *= speedBonus ? 2 : 1;
    defense *= defBonus ? 2 : 1;

    let silGro = 0;

    if (isSilverMine) {
      silGro = this.contractConstants.defaultSilverGrowth[planetLevel];
      silCap *= 2;

      energyCap /= 2;
      energyGro /= 2;
      defense /= 2;
    }

    if (spaceType === SpaceType.DEEP_SPACE) {
      range *= 1.5;
      speed *= 1.5;
      energyCap *= 1.5;
      energyGro *= 1.5;
      silCap *= 1.5;
      silGro *= 1.5;

      defense *= 0.25;
    } else if (spaceType === SpaceType.SPACE) {
      range *= 1.25;
      speed *= 1.25;
      energyCap *= 1.25;
      energyGro *= 1.25;
      silCap *= 1.25;
      silGro *= 1.25;

      defense *= 0.5;
    }

    let barbarians =
      (energyCap *
        this.contractConstants.defaultBarbarianPercentage[planetLevel]) /
      100;
    // increase barbarians
    if (spaceType === SpaceType.DEEP_SPACE) barbarians *= 6;
    else if (spaceType === SpaceType.SPACE) barbarians *= 2.5;

    const silver = isSilverMine ? silCap / 2 : 0;

    speed *= this.contractConstants.TIME_FACTOR_HUNDREDTHS / 100;
    energyGro *= this.contractConstants.TIME_FACTOR_HUNDREDTHS / 100;
    silGro *= this.contractConstants.TIME_FACTOR_HUNDREDTHS / 100;

    const biome = this.getBiome(location);

    return {
      locationId: hex,
      perlin,
      spaceType,
      owner: CheckedTypeUtils.EMPTY_ADDRESS,
      hatLevel: 0,
      bonus: bonusFromHex(hex),

      planetLevel,
      planetResource, // None or Silver

      energyCap: energyCap,
      energyGrowth: energyGro,

      silverCap: silCap,
      silverGrowth: silGro,

      range,
      speed,
      defense,

      energy: barbarians,
      silver,

      lastUpdated: Math.floor(Date.now() / 1000),

      upgradeState: [0, 0, 0],

      unconfirmedDepartures: [],
      unconfirmedUpgrades: [],
      unconfirmedBuyHats: [],
      unconfirmedPlanetTransfers: [],
      silverSpent: 0,

      isInContract: this.touchedPlanetIds.has(hex),
      syncedWithContract: false,
      location,
      biome,
      hasTriedFindingArtifact: false,
    };
  }

  private updatePlanetIfStale(planet: Planet): void {
    const now = Date.now();
    if (now / 1000 - planet.lastUpdated > 1) {
      updatePlanetToTime(planet, now);
    }
  }

  /**
   * returns timestamp (seconds) that planet will reach percent% of energycap
   * time may be in the past
   */
  public getEnergyCurveAtPercent(planet: Planet, percent: number): number {
    const p1 = (percent / 100) * planet.energyCap;
    const c = planet.energyCap;
    const p0 = planet.energy;
    const g = planet.energyGrowth;
    const t0 = planet.lastUpdated;

    const t1 = (c / (4 * g)) * Math.log((p1 * (c - p0)) / (p0 * (c - p1))) + t0;

    return t1;
  }

  /**
   * returns timestamp (seconds) that planet will reach percent% of silcap if
   * doesn't produce silver, returns nullif already over percent% of silcap,
   * returns null
   */
  public getSilverCurveAtPercent(
    planet: Planet,
    percent: number
  ): number | null {
    if (
      planet.silverGrowth === 0 ||
      planet.planetResource === PlanetResource.NONE
    ) {
      return null;
    }
    const silverTarget = (percent / 100) * planet.silverCap;
    const silverDiff = silverTarget - planet.silver;
    if (silverDiff <= 0) {
      return null;
    }
    let timeToTarget = 0;
    timeToTarget += silverDiff / planet.silverGrowth;
    return planet.lastUpdated + timeToTarget;
  }

  private calculateSilverSpent(planet: Planet): number {
    const upgradeCosts = [20, 40, 60, 80, 100];
    let totalUpgrades = 0;
    for (let i = 0; i < planet.upgradeState.length; i++) {
      totalUpgrades += planet.upgradeState[i];
    }
    let totalUpgradeCostPercent = 0;
    for (let i = 0; i < totalUpgrades; i++) {
      totalUpgradeCostPercent += upgradeCosts[i];
    }
    return (totalUpgradeCostPercent / 100) * planet.silverCap;
  }

  private updateScore(planetId: LocationId) {
    const planet = this.planets.get(planetId);
    if (!planet) {
      return;
    }
    planet.silverSpent = this.calculateSilverSpent(planet);
  }

  private static getGridBucketKey(coords: WorldCoords): string {
    const GRID_BUCKET_SIZE = GameObjects.GRID_BUCKET_SIZE;
    const gridBucketX = Math.floor(coords.x / GRID_BUCKET_SIZE);
    const gridBucketY = Math.floor(coords.y / GRID_BUCKET_SIZE);
    return `(${gridBucketX},${gridBucketY},${GRID_BUCKET_SIZE})`;
  }
}
