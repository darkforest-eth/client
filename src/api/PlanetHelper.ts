import {
  PlanetMap,
  VoyageMap,
  PlanetVoyageIdMap,
  PlanetLocationMap,
  LocationId,
  Location,
  Planet,
  QueuedArrival,
  ArrivalWithTimer,
  VoyageContractData,
  PlanetLevel,
  PlanetResource,
  SpaceType,
  EthAddress,
} from '../_types/global/GlobalTypes';
import {
  ContractConstants,
  UnconfirmedBuyHat,
  UnconfirmedMove,
  UnconfirmedTx,
  UnconfirmedUpgrade,
} from '../_types/darkforest/api/ContractsAPITypes';
import bigInt from 'big-integer';
import _ from 'lodash';
import { WorldCoords } from '../utils/Coordinates';
import { emptyAddress } from '../utils/CheckedTypeUtils';
import { hasOwner, getBytesFromHex, bonusFromHex } from '../utils/Utils';
import LocalStorageManager from './LocalStorageManager';
import {
  contractPrecision,
  isUnconfirmedBuyHat,
  isUnconfirmedMove,
  isUnconfirmedUpgrade,
} from './ContractsAPI';
import NotificationManager from '../utils/NotificationManager';

type CoordsString = string;
type MemoizedCoordHashes = Map<CoordsString, Location>;

const getCoordsString = (coords: WorldCoords): CoordsString => {
  return `${coords.x},${coords.y}`;
};

export class PlanetHelper {
  private readonly planets: PlanetMap;
  private readonly arrivals: VoyageMap;
  private readonly planetArrivalIds: PlanetVoyageIdMap;
  private readonly planetLocationMap: PlanetLocationMap;
  private readonly contractConstants: ContractConstants;
  private readonly coordsToLocation: MemoizedCoordHashes;
  private readonly unconfirmedMoves: Record<string, UnconfirmedMove>;
  private readonly unconfirmedUpgrades: Record<string, UnconfirmedUpgrade>;
  private readonly unconfirmedBuyHats: Record<string, UnconfirmedBuyHat>;

  private readonly endTimeSeconds: number;

  private address: EthAddress | null;

  constructor(
    planets: PlanetMap,
    chunkStore: LocalStorageManager,
    unprocessedArrivals: VoyageContractData,
    unprocessedPlanetArrivalIds: PlanetVoyageIdMap,
    contractConstants: ContractConstants,
    endTimeSeconds: number,
    address: EthAddress | null
  ) {
    this.address = address;
    this.planets = planets;
    this.contractConstants = contractConstants;
    this.coordsToLocation = new Map();
    this.planetLocationMap = {};
    const planetArrivalIds: PlanetVoyageIdMap = {};
    const arrivals: VoyageMap = {};
    this.endTimeSeconds = endTimeSeconds;
    for (const planetId in planets) {
      if (planets.hasOwnProperty(planetId)) {
        const planet = planets[planetId];
        const arrivalsForPlanet = unprocessedPlanetArrivalIds[planetId]
          .map((arrivalId) => unprocessedArrivals[arrivalId] || null)
          .filter((x) => !!x);
        const arrivalsWithTimers = this.processArrivalsForPlanet(
          planet.locationId,
          arrivalsForPlanet
        );
        planetArrivalIds[planetId] = arrivalsWithTimers.map(
          (arrival) => arrival.arrivalData.eventId
        );
        for (const arrivalWithTimer of arrivalsWithTimers) {
          const arrivalId = arrivalWithTimer.arrivalData.eventId;
          arrivals[arrivalId] = arrivalWithTimer;
        }
        this.updateScore(planetId as LocationId);
      }
    }

    const allChunks = chunkStore.allChunks();
    for (const chunk of allChunks) {
      for (const planetLocation of chunk.planetLocations) {
        this.addPlanetLocation(planetLocation);
      }
    }

    this.arrivals = arrivals;
    this.planetArrivalIds = planetArrivalIds;
    this.unconfirmedMoves = {};
    this.unconfirmedUpgrades = {};
    this.unconfirmedBuyHats = {};

    // set interval to update all planets every 120s
    setInterval(() => {
      for (const planetId of Object.keys(this.planets)) {
        // setTimeout(() => {
        const planet = this.planets[planetId];
        if (planet && hasOwner(planet)) {
          this.updatePlanetToTime(planet, Date.now());
        }
        // }, Math.floor(120000 * Math.random())); // evenly distribute updates
      }
    }, 120000);
  }

  // get planet by ID - must be in contract or known chunks
  public getPlanetWithId(planetId: LocationId): Planet | null {
    const planet = this.planets[planetId];
    if (planet) {
      this.updatePlanetIfStale(planet);
      return planet;
    }
    const loc = this.getLocationOfPlanet(planetId);
    if (!loc) return null;
    return this.getPlanetWithLocation(loc);
  }

  // returns null if this planet is neither in contract nor in known chunks
  // fast query that doesn't update planet if stale
  public getPlanetLevel(planetId: LocationId): PlanetLevel | null {
    const planet = this.planets[planetId];
    if (planet) {
      return planet.planetLevel;
    }
    return null;
  }

  // returns null if this planet is neither in contract nor in known chunks
  // fast query that doesn't update planet if stale
  public getPlanetDetailLevel(planetId: LocationId): number | null {
    const planet = this.planets[planetId];
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

  public refreshPlanetAndArrivals(
    planet: Planet,
    arrivals: QueuedArrival[]
  ): void {
    // does not modify unconfirmed departures or upgrades
    // that is handled by onTxConfirm
    if (this.planets[planet.locationId]) {
      const {
        unconfirmedDepartures,
        unconfirmedUpgrades,
        unconfirmedBuyHats,
      } = this.planets[planet.locationId];
      planet.unconfirmedDepartures = unconfirmedDepartures;
      planet.unconfirmedUpgrades = unconfirmedUpgrades;
      planet.unconfirmedBuyHats = unconfirmedBuyHats;
    }
    this.planets[planet.locationId] = planet;
    this.clearOldArrivals(planet);
    const updatedAwts = this.processArrivalsForPlanet(
      planet.locationId,
      arrivals
    );
    for (const awt of updatedAwts) {
      const arrivalId = awt.arrivalData.eventId;
      this.arrivals[arrivalId] = awt;
      this.planetArrivalIds[planet.locationId].push(arrivalId);
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
    if (!!this.planets[location.hash]) {
      const planet = this.planets[location.hash];
      this.updatePlanetIfStale(planet);
      return this.planets[location.hash];
    }
    // return a default unowned planet
    const myPlanet = this.defaultPlanetFromLocation(location);

    this.planets[location.hash] = myPlanet;

    return myPlanet;
  }

  public addPlanetLocation(planetLocation: Location): void {
    this.planetLocationMap[planetLocation.hash] = planetLocation;
    const str = getCoordsString(planetLocation.coords);
    if (!this.coordsToLocation.has(str)) {
      this.coordsToLocation.set(str, planetLocation);
    }

    if (!this.planets[planetLocation.hash]) {
      this.planets[planetLocation.hash] = this.defaultPlanetFromLocation(
        planetLocation
      );
    }
  }

  public getLocationOfPlanet(planetId: LocationId): Location | null {
    return this.planetLocationMap[planetId] || null;
  }

  public getAllOwnedPlanets(): Planet[] {
    return Object.values(this.planets).filter(hasOwner);
  }

  public getAllVoyages(): QueuedArrival[] {
    // there are not many voyages
    return Object.values(this.arrivals).map((awt) => awt.arrivalData);
  }

  public onTxInit(initializedTx: UnconfirmedTx) {
    if (isUnconfirmedMove(initializedTx)) {
      this.unconfirmedMoves[initializedTx.actionId] = initializedTx;
      const planet = this.getPlanetWithId(initializedTx.from);
      if (planet) {
        planet.unconfirmedDepartures.push(initializedTx);
      }
    } else if (isUnconfirmedUpgrade(initializedTx)) {
      this.unconfirmedUpgrades[initializedTx.actionId] = initializedTx;
      const planet = this.getPlanetWithId(initializedTx.locationId);
      if (planet) {
        planet.unconfirmedUpgrades.push(initializedTx);
      }
    } else if (isUnconfirmedBuyHat(initializedTx)) {
      this.unconfirmedBuyHats[initializedTx.actionId] = initializedTx;
      const planet = this.getPlanetWithId(initializedTx.locationId);
      if (planet) {
        planet.unconfirmedBuyHats.push(initializedTx);
      }
    }
  }

  public clearUnconfirmedTx(unconfirmedTx: UnconfirmedTx) {
    if (isUnconfirmedMove(unconfirmedTx)) {
      const planet = this.getPlanetWithId(unconfirmedTx.from);
      if (planet) {
        let removeIdx = -1;
        for (let i = 0; i < planet.unconfirmedDepartures.length; i += 1) {
          if (
            planet.unconfirmedDepartures[i].actionId === unconfirmedTx.actionId
          ) {
            removeIdx = i;
            break;
          }
        }
        if (removeIdx > -1) {
          planet.unconfirmedDepartures.splice(removeIdx, 1);
        }
      }
      delete this.unconfirmedMoves[unconfirmedTx.actionId];
    } else if (isUnconfirmedUpgrade(unconfirmedTx)) {
      const planet = this.getPlanetWithId(unconfirmedTx.locationId);
      if (planet) {
        let removeIdx = -1;
        for (let i = 0; i < planet.unconfirmedUpgrades.length; i += 1) {
          if (
            planet.unconfirmedUpgrades[i].actionId === unconfirmedTx.actionId
          ) {
            removeIdx = i;
            break;
          }
        }
        if (removeIdx > -1) {
          planet.unconfirmedUpgrades.splice(removeIdx, 1);
        }
      }
      delete this.unconfirmedUpgrades[unconfirmedTx.actionId];
    } else if (isUnconfirmedBuyHat(unconfirmedTx)) {
      const planet = this.getPlanetWithId(unconfirmedTx.locationId);
      if (planet) {
        let removeIdx = -1;
        for (let i = 0; i < planet.unconfirmedBuyHats.length; i += 1) {
          if (
            planet.unconfirmedBuyHats[i].actionId === unconfirmedTx.actionId
          ) {
            removeIdx = i;
            break;
          }
        }
        if (removeIdx > -1) {
          planet.unconfirmedBuyHats.splice(removeIdx, 1);
        }
      }
      delete this.unconfirmedBuyHats[unconfirmedTx.actionId];
    }
  }

  public getUnconfirmedMoves(): UnconfirmedMove[] {
    return Object.values(this.unconfirmedMoves);
  }

  public getUnconfirmedUpgrades(): UnconfirmedUpgrade[] {
    return Object.values(this.unconfirmedUpgrades);
  }

  private arrive(
    fromPlanet: Planet,
    toPlanet: Planet,
    arrival: QueuedArrival
  ): void {
    // this function optimistically simulates an arrival

    // update toPlanet energy and silver right before arrival
    this.updatePlanetToTime(toPlanet, arrival.arrivalTime * 1000);

    // apply energy

    const { energyArriving: shipsMoved } = arrival;

    if (arrival.player !== toPlanet.owner) {
      // attacking enemy - includes emptyAddress

      if (
        toPlanet.energy >
        Math.floor((shipsMoved * contractPrecision * 100) / toPlanet.defense) /
          contractPrecision
      ) {
        // attack reduces target planet's garrison but doesn't conquer it
        toPlanet.energy -=
          Math.floor(
            (shipsMoved * contractPrecision * 100) / toPlanet.defense
          ) / contractPrecision;
      } else {
        // conquers planet
        toPlanet.owner = arrival.player;
        toPlanet.energy =
          shipsMoved -
          Math.floor(
            (toPlanet.energy * contractPrecision * toPlanet.defense) / 100
          ) /
            contractPrecision;
        this.updateScore(toPlanet.locationId);
      }
    } else {
      // moving between my own planets
      toPlanet.energy += shipsMoved;
    }

    // apply silver
    if (toPlanet.silver + arrival.silverMoved > toPlanet.silverCap) {
      toPlanet.silver = toPlanet.silverCap;
    } else {
      toPlanet.silver += arrival.silverMoved;
    }
  }

  private processArrivalsForPlanet(
    planetId: LocationId,
    arrivals: QueuedArrival[]
  ): ArrivalWithTimer[] {
    // process the QueuedArrival[] for a single planet
    const arrivalsWithTimers: ArrivalWithTimer[] = [];

    // sort arrivals by timestamp
    arrivals.sort((a, b) => a.arrivalTime - b.arrivalTime);
    const nowInSeconds = Date.now() / 1000;
    for (const arrival of arrivals) {
      try {
        if (
          nowInSeconds - arrival.arrivalTime > 0 &&
          this.planets[arrival.fromPlanet] &&
          this.planets[arrival.toPlanet]
        ) {
          // if arrival happened in the past, run this arrival
          this.arrive(
            this.planets[arrival.fromPlanet],
            this.planets[arrival.toPlanet],
            arrival
          );
        } else {
          // otherwise, set a timer to do this arrival in the future
          // and append it to arrivalsWithTimers
          const applyFutureArrival = setTimeout(() => {
            this.arrive(
              this.planets[arrival.fromPlanet],
              this.planets[arrival.toPlanet],
              arrival
            );

            const notifManager = NotificationManager.getInstance();
            const toPlanet = this.planets[arrival.toPlanet];
            if (
              this.planetCanUpgrade(toPlanet) &&
              toPlanet.owner === this.address
            ) {
              notifManager.planetCanUpgrade(toPlanet);
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
    return arrivalsWithTimers;
  }

  private clearOldArrivals(planet: Planet): void {
    const planetId = planet.locationId;
    // clear old timeouts
    if (this.planetArrivalIds[planetId]) {
      // clear if the planet already had stored arrivals
      for (const arrivalId of this.planetArrivalIds[planetId]) {
        const arrivalWithTimer = this.arrivals[arrivalId];
        if (arrivalWithTimer) {
          clearTimeout(arrivalWithTimer.timer);
        } else {
          console.error(`arrival with id ${arrivalId} wasn't found`);
        }
        delete this.arrivals[arrivalId];
      }
    }
    this.planetArrivalIds[planetId] = [];
  }

  private updatePlanetToTime(planet: Planet, atTimeMillis: number): void {
    const safeEndMillis = Math.min(atTimeMillis, this.endTimeSeconds * 1000);
    if (safeEndMillis < planet.lastUpdated * 1000) {
      // console.error('tried to update planet to a past time');
      return;
    }
    planet.silver = this.getSilverOverTime(
      planet,
      planet.lastUpdated * 1000,
      safeEndMillis
    );
    planet.energy = this.getEnergyAtTime(planet, safeEndMillis);
    planet.lastUpdated = safeEndMillis / 1000;
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

  // imitates contract newPlanet
  private defaultPlanetFromLocation(location: Location): Planet {
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
    if (spaceType === SpaceType.DEEP_SPACE) barbarians *= 4;
    else if (spaceType === SpaceType.SPACE) barbarians *= 2;

    const silver = isSilverMine ? silCap / 2 : 0;

    speed *= this.contractConstants.TIME_FACTOR_HUNDREDTHS / 100;
    energyGro *= this.contractConstants.TIME_FACTOR_HUNDREDTHS / 100;
    silGro *= this.contractConstants.TIME_FACTOR_HUNDREDTHS / 100;

    return {
      locationId: hex,
      perlin,
      spaceType,
      owner: emptyAddress,
      hatLevel: 0,

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
      silverSpent: 0,

      pulledFromContract: false,
    };
  }

  private updatePlanetIfStale(planet: Planet): void {
    const now = Date.now();
    if (now / 1000 - planet.lastUpdated > 1) {
      this.updatePlanetToTime(planet, now);
    }
  }

  private getEnergyAtTime(planet: Planet, atTimeMillis: number): number {
    if (planet.energy === 0) {
      return 0;
    }
    if (!hasOwner(planet)) {
      return planet.energy;
    }
    const timeElapsed = atTimeMillis / 1000 - planet.lastUpdated;
    const denominator =
      Math.exp((-4 * planet.energyGrowth * timeElapsed) / planet.energyCap) *
        (planet.energyCap / planet.energy - 1) +
      1;
    return planet.energyCap / denominator;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getEnergyCurveAtPercent(planet: Planet, percent: number): number {
    // returns timestamp (seconds) that planet will reach percent% of energycap
    // time may be in the past
    const p1 = (percent / 100) * planet.energyCap;
    const c = planet.energyCap;
    const p0 = planet.energy;
    const g = planet.energyGrowth;
    const t0 = planet.lastUpdated;

    const t1 = (c / (4 * g)) * Math.log((p1 * (c - p0)) / (p0 * (c - p1))) + t0;

    return t1;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getSilverCurveAtPercent(
    planet: Planet,
    percent: number
  ): number | null {
    // returns timestamp (seconds) that planet will reach percent% of silcap
    // if doesn't produce silver, returns null
    // if already over percent% of silcap, returns null
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

  private getSilverOverTime(
    planet: Planet,
    startTimeMillis: number,
    endTimeMillis: number
  ): number {
    if (!hasOwner(planet)) {
      return planet.silver;
    }

    if (planet.silver > planet.silverCap) {
      return planet.silverCap;
    }
    const timeElapsed = endTimeMillis / 1000 - startTimeMillis / 1000;

    return Math.min(
      timeElapsed * planet.silverGrowth + planet.silver,
      planet.silverCap
    );
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
    const planet = this.planets[planetId];
    if (!planet) {
      return;
    }
    planet.silverSpent = this.calculateSilverSpent(planet);
  }
}
