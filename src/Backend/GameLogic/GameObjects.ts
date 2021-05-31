import {
  EthAddress,
  LocationId,
  ArtifactId,
  VoyageId,
  Planet,
  LocatablePlanet,
  Artifact,
  WorldCoords,
  WorldLocation,
  PlanetLevel,
  ArtifactType,
  SpaceType,
  Biome,
  PlanetType,
  QueuedArrival,
  ArrivalWithTimer,
  UnconfirmedMove,
  UnconfirmedUpgrade,
  UnconfirmedBuyHat,
  UnconfirmedPlanetTransfer,
  UnconfirmedActivateArtifact,
  TxIntent,
  UnconfirmedReveal,
  UnconfirmedBuyGPTCredits,
} from '@darkforest_eth/types';
import autoBind from 'auto-bind';
import bigInt from 'big-integer';
import NotificationManager from '../../Frontend/Game/NotificationManager';
import {
  setObjectSyncState,
  getPlanetId,
  getPlanetOwner,
  getArtifactId,
  getArtifactOwner,
} from '../../Frontend/Utils/EmitterUtils';
import { Monomitter, monomitter } from '../../Frontend/Utils/Monomitter';
import { ContractConstants } from '../../_types/darkforest/api/ContractsAPITypes';
import { Wormhole, isLocatable, ExploredChunkData } from '../../_types/global/GlobalTypes';
import {
  isUnconfirmedMove,
  isUnconfirmedUpgrade,
  isUnconfirmedBuyHat,
  isUnconfirmedTransfer,
  isUnconfirmedProspectPlanet,
  isUnconfirmedFindArtifact,
  isUnconfirmedDepositArtifact,
  isUnconfirmedWithdrawArtifact,
  isUnconfirmedActivateArtifact,
  isUnconfirmedDeactivateArtifact,
  isUnconfirmedReveal,
  isUnconfirmedBuyGPTCredits,
  isUnconfirmedWithdrawSilver,
} from '../Utils/TypeAssertions';
import { hasOwner } from '../Utils/Utils';
import { updatePlanetToTime, arrive } from './ArrivalUtils';
import { isActivated } from './ArtifactUtils';
import { EMPTY_ADDRESS } from '@darkforest_eth/constants';
import { bonusFromHex, getBytesFromHex } from '@darkforest_eth/hexgen';

const getCoordsString = (coords: WorldCoords): string => {
  return `${coords.x},${coords.y}`;
};

export class GameObjects {
  private static GRID_BUCKET_SIZE = 128;

  private readonly address: EthAddress | undefined;
  /**
   * Cached index of all known planet data. This should NEVER be set to directly!
   * All set calls should occur via `GameObjects.setPlanet()`
   */
  private readonly planets: Map<LocationId, Planet>;
  /**
   * Cached index of planets owned by the player. This should NEVER be set to directly!
   * All set calls should occur via `GameObjects.setPlanet()`
   */
  private readonly myPlanets: Map<LocationId, Planet>;
  /**
   * Cached index of all known artifact data. This should NEVER be set to directly!
   * All set calls should occur via `GameObjects.setArtifact()`
   */
  private readonly artifacts: Map<ArtifactId, Artifact>;
  /**
   * Cached index of artifacts owned by the player. This should NEVER be set to directly!
   * All set calls should occur via `GameObjects.setArtifact()`
   */
  private readonly myArtifacts: Map<ArtifactId, Artifact>;
  private readonly planetGridBuckets: Record<string, WorldLocation[]>;
  private readonly touchedPlanetIds: Set<LocationId>;
  private readonly arrivals: Map<VoyageId, ArrivalWithTimer>;
  private readonly planetArrivalIds: Map<LocationId, VoyageId[]>;
  private readonly planetLocationMap: Map<LocationId, WorldLocation>;
  private readonly revealedLocations: Map<LocationId, WorldLocation>;
  private readonly contractConstants: ContractConstants;
  private readonly coordsToLocation: Map<string, WorldLocation>;
  private unconfirmedReveal?: UnconfirmedReveal; // at most one at a time
  private unconfirmedBuyGPTCredits?: UnconfirmedBuyGPTCredits; // at most one at a time
  private readonly unconfirmedMoves: Record<string, UnconfirmedMove>;
  private readonly unconfirmedUpgrades: Record<string, UnconfirmedUpgrade>;
  private readonly unconfirmedBuyHats: Record<string, UnconfirmedBuyHat>;
  private readonly unconfirmedPlanetTransfers: Record<string, UnconfirmedPlanetTransfer>;
  private readonly unconfirmedWormholeActivations: UnconfirmedActivateArtifact[];
  private readonly wormholes: Map<ArtifactId, Wormhole>;

  public readonly planetUpdated$: Monomitter<LocationId>;
  public readonly artifactUpdated$: Monomitter<ArtifactId>;
  public readonly myArtifactsUpdated$: Monomitter<Map<ArtifactId, Artifact>>;
  public readonly myPlanetsUpdated$: Monomitter<Map<LocationId, Planet>>;
  public readonly isBuyingCredits$: Monomitter<boolean>;

  constructor(
    address: EthAddress | undefined,
    touchedPlanets: Map<LocationId, Planet>,
    allTouchedPlanetIds: Set<LocationId>,
    revealedLocations: Map<LocationId, WorldLocation>,
    artifacts: Map<ArtifactId, Artifact>,
    allChunks: Iterable<ExploredChunkData>,
    unprocessedArrivals: Map<VoyageId, QueuedArrival>,
    unprocessedPlanetArrivalIds: Map<LocationId, VoyageId[]>,
    contractConstants: ContractConstants
  ) {
    autoBind(this);

    this.address = address;
    this.planets = touchedPlanets;
    this.myPlanets = new Map();
    this.planetGridBuckets = {};
    this.touchedPlanetIds = allTouchedPlanetIds;
    this.revealedLocations = new Map();
    this.artifacts = artifacts;
    this.myArtifacts = new Map();
    this.contractConstants = contractConstants;
    this.coordsToLocation = new Map();
    this.planetLocationMap = new Map();
    const planetArrivalIds = new Map();
    const arrivals = new Map();
    this.unconfirmedWormholeActivations = [];
    this.wormholes = new Map();

    this.planetUpdated$ = monomitter();
    this.artifactUpdated$ = monomitter();
    this.myArtifactsUpdated$ = monomitter();
    this.myPlanetsUpdated$ = monomitter();
    this.isBuyingCredits$ = monomitter(true);

    for (const chunk of allChunks) {
      for (const planetLocation of chunk.planetLocations) {
        this.addPlanetLocation(planetLocation);
      }
    }
    for (const location of revealedLocations.values()) {
      this.markLocationRevealed(location);
      this.addPlanetLocation(location);
    }

    this.replaceArtifactsFromContractData(artifacts.values());

    touchedPlanets.forEach((planet, planetId) => {
      const arrivalIds = unprocessedPlanetArrivalIds.get(planetId);

      if (planet && arrivalIds) {
        const arrivalsForPlanetNull: (QueuedArrival | undefined)[] = arrivalIds.map((arrivalId) =>
          unprocessedArrivals.get(arrivalId)
        );
        const arrivalsForPlanet: QueuedArrival[] = arrivalsForPlanetNull.filter(
          (x) => !!x
        ) as QueuedArrival[];

        if (revealedLocations.get(planetId)) planet.coordsRevealed = true;

        this.setPlanet(planet);
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
    this.unconfirmedBuyGPTCredits = undefined;
    this.isBuyingCredits$.publish(false);
    this.unconfirmedReveal = undefined;
    this.unconfirmedMoves = {};
    this.unconfirmedUpgrades = {};
    this.unconfirmedBuyHats = {};
    this.unconfirmedPlanetTransfers = {};

    // set interval to update all planets every 120s
    setInterval(() => {
      this.planets.forEach((planet) => {
        if (planet && hasOwner(planet)) {
          updatePlanetToTime(
            planet,
            this.getPlanetArtifacts(planet.locationId),
            Date.now(),
            this.contractConstants
          );
        }
      });
    }, 120000);
  }

  public getIsBuyingCreditsEmitter() {
    return this.isBuyingCredits$;
  }

  public getArtifactById(artifactId: ArtifactId): Artifact | undefined {
    return this.artifacts.get(artifactId);
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

  public getPlanetArtifacts(planetId: LocationId): Artifact[] {
    return (this.planets.get(planetId)?.heldArtifactIds || [])
      .map((id) => this.artifacts.get(id))
      .filter((a) => !!a) as Artifact[];
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
  public getPlanetWithId(planetId: LocationId, updateIfStale = true): Planet | undefined {
    const planet = this.planets.get(planetId);
    if (planet) {
      if (updateIfStale) {
        this.updatePlanetIfStale(planet);
      }
      return planet;
    }
    const loc = this.getLocationOfPlanet(planetId);
    if (!loc) return undefined;
    return this.getPlanetWithLocation(loc);
  }

  // this is shitty and should really be handled by comparing against UI objects
  public getPlanetHitboxForCoords(
    from: WorldCoords,
    radiusMap: Record<PlanetLevel, number>
  ): LocatablePlanet | undefined {
    const GRID_BUCKET_SIZE = GameObjects.GRID_BUCKET_SIZE;
    const candidates: LocatablePlanet[] = [];
    const gridRange = Math.ceil(radiusMap[PlanetLevel.MAX] / GRID_BUCKET_SIZE);

    const gridBucketX = Math.floor(from.x / GRID_BUCKET_SIZE);
    const gridBucketY = Math.floor(from.y / GRID_BUCKET_SIZE);

    for (let dx = -1 * gridRange; dx <= gridRange; dx++) {
      for (let dy = -1 * gridRange; dy <= gridRange; dy++) {
        const key = `(${gridBucketX + dx},${gridBucketY + dy},${GRID_BUCKET_SIZE})`;
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

    let bestPlanet: LocatablePlanet | undefined = undefined;
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

  // returns undefined if this planet is neither in contract nor in known chunks
  // fast query that doesn't update planet if stale
  public getPlanetLevel(planetId: LocationId): PlanetLevel | undefined {
    const planet = this.planets.get(planetId);
    if (planet) {
      return planet.planetLevel;
    }
    return undefined;
  }

  // returns undefined if this planet is neither in contract nor in known chunks
  // fast query that doesn't update planet if stale
  public getPlanetDetailLevel(planetId: LocationId): number | undefined {
    const planet = this.planets.get(planetId);
    if (planet) {
      let detailLevel = planet.planetLevel;
      if (hasOwner(planet)) {
        detailLevel += 1;
      }
      return detailLevel;
    } else {
      return undefined;
    }
  }

  /**
   * received some artifact data from the contract. update our stores
   */
  public replaceArtifactFromContractData(artifact: Artifact): void {
    const localArtifact = this.artifacts.get(artifact.id);
    // does not modify unconfirmed txs
    // that is handled by onTxConfirm
    if (localArtifact) {
      const {
        unconfirmedDepositArtifact,
        unconfirmedWithdrawArtifact,
        unconfirmedActivateArtifact,
        unconfirmedDeactivateArtifact,
        unconfirmedMove,
      } = localArtifact;
      artifact.unconfirmedDepositArtifact = unconfirmedDepositArtifact;
      artifact.unconfirmedWithdrawArtifact = unconfirmedWithdrawArtifact;
      artifact.unconfirmedActivateArtifact = unconfirmedActivateArtifact;
      artifact.unconfirmedDeactivateArtifact = unconfirmedDeactivateArtifact;
      artifact.unconfirmedMove = unconfirmedMove;
    }
    this.setArtifact(artifact);
  }

  public replaceArtifactsFromContractData(artifacts: Iterable<Artifact>) {
    for (const artifact of artifacts) {
      this.replaceArtifactFromContractData(artifact);
    }
  }

  /**
   * received some planet data from the contract. update our stores
   */
  public replacePlanetFromContractData(
    planet: Planet,
    updatedArrivals: QueuedArrival[],
    updatedArtifactsOnPlanet: ArtifactId[],
    revealedLocation?: WorldLocation
  ): void {
    this.touchedPlanetIds.add(planet.locationId);
    // does not modify unconfirmed txs
    // that is handled by onTxConfirm
    const localPlanet = this.planets.get(planet.locationId);
    if (localPlanet) {
      const {
        unconfirmedReveal,
        unconfirmedDepartures,
        unconfirmedUpgrades,
        unconfirmedBuyHats,
        unconfirmedPlanetTransfers,
        unconfirmedFindArtifact,
        unconfirmedDepositArtifact,
        unconfirmedWithdrawArtifact,
        unconfirmedActivateArtifact,
        unconfirmedDeactivateArtifact,
        unconfirmedWithdrawSilver,
        unconfirmedProspectPlanet,
      } = localPlanet;
      planet.unconfirmedReveal = unconfirmedReveal;
      planet.unconfirmedDepartures = unconfirmedDepartures;
      planet.unconfirmedUpgrades = unconfirmedUpgrades;
      planet.unconfirmedBuyHats = unconfirmedBuyHats;
      planet.unconfirmedPlanetTransfers = unconfirmedPlanetTransfers;
      planet.unconfirmedFindArtifact = unconfirmedFindArtifact;
      planet.unconfirmedDepositArtifact = unconfirmedDepositArtifact;
      planet.unconfirmedWithdrawArtifact = unconfirmedWithdrawArtifact;
      planet.unconfirmedActivateArtifact = unconfirmedActivateArtifact;
      planet.unconfirmedDeactivateArtifact = unconfirmedDeactivateArtifact;
      planet.unconfirmedWithdrawSilver = unconfirmedWithdrawSilver;
      planet.unconfirmedProspectPlanet = unconfirmedProspectPlanet;
    }
    planet.heldArtifactIds = updatedArtifactsOnPlanet;
    // make planet Locatable if we know its location
    const loc = this.planetLocationMap.get(planet.locationId) || revealedLocation;
    if (loc) {
      (planet as LocatablePlanet).location = loc;
      (planet as LocatablePlanet).biome = this.getBiome(loc);
    }
    if (revealedLocation) {
      this.markLocationRevealed(revealedLocation);
      this.addPlanetLocation(revealedLocation);
      planet.coordsRevealed = true;
    }

    this.setPlanet(planet);

    // apply arrivals
    this.clearOldArrivals(planet);
    const updatedAwts = this.processArrivalsForPlanet(planet.locationId, updatedArrivals);
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
  // returns undefined if this isn't a planet, according to hash and coords
  public getPlanetWithCoords(coords: WorldCoords): Planet | undefined {
    const str = getCoordsString(coords);

    const location = this.coordsToLocation.get(str);
    if (!location) {
      return undefined;
    }

    return this.getPlanetWithLocation(location);
  }

  // returns an empty planet if planet is not in contract
  // returns undefined if this isn't a planet, according to hash and coords
  public getPlanetWithLocation(location: WorldLocation): Planet | undefined {
    const planet = this.planets.get(location.hash);
    if (planet) {
      this.updatePlanetIfStale(planet);
      return planet;
    }

    // return a default unowned planet
    const defaultPlanet = this.defaultPlanetFromLocation(location);
    this.setPlanet(defaultPlanet);

    return defaultPlanet;
  }

  public isPlanetInContract(planetId: LocationId): boolean {
    return this.touchedPlanetIds.has(planetId);
  }

  /**
   * Called when we load chunk data into memory (on startup), when we're loading all revealed locations (on startup),
   * when miner has mined a new chunk while exploring, and when a planet's location is revealed onchain during the course of play
   * Adds a WorldLocation to the planetLocationMap, making it known to the player locally
   * Sets an unsynced default planet in the PlanetMap this.planets
   * IMPORTANT: This is the only way a LocatablePlanet gets constructed
   * IMPORTANT: Idempotent
   */
  public addPlanetLocation(planetLocation: WorldLocation): void {
    const key = GameObjects.getGridBucketKey(planetLocation.coords);
    if (this.planetGridBuckets[key]) {
      let contains = false;
      for (const loc of this.planetGridBuckets[key]) {
        if (loc.hash === planetLocation.hash) {
          contains = true;
          break;
        }
      }
      if (!contains) {
        this.planetGridBuckets[key].push(planetLocation);
      }
    } else {
      this.planetGridBuckets[key] = [planetLocation];
    }

    this.planetLocationMap.set(planetLocation.hash, planetLocation);
    const str = getCoordsString(planetLocation.coords);

    if (!this.coordsToLocation.has(str)) {
      this.coordsToLocation.set(str, planetLocation);
    }

    if (!this.planets.get(planetLocation.hash)) {
      this.setPlanet(this.defaultPlanetFromLocation(planetLocation));
    }

    const planet = this.planets.get(planetLocation.hash);

    if (planet) {
      (planet as LocatablePlanet).location = planetLocation;
      (planet as LocatablePlanet).biome = this.getBiome(planetLocation);
    }
  }

  // marks that a location is revealed on-chain
  public markLocationRevealed(planetLocation: WorldLocation): void {
    this.revealedLocations.set(planetLocation.hash, planetLocation);
  }

  public getLocationOfPlanet(planetId: LocationId): WorldLocation | undefined {
    return this.planetLocationMap.get(planetId) || undefined;
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

    if (isUnconfirmedReveal(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.locationId);
      if (planet) {
        planet.unconfirmedReveal = txIntent;
        this.setPlanet(planet);
      }
      this.unconfirmedReveal = txIntent;
    } else if (isUnconfirmedMove(txIntent)) {
      this.unconfirmedMoves[txIntent.actionId] = txIntent;
      const planet = this.getPlanetWithId(txIntent.from);
      if (planet) {
        planet.unconfirmedDepartures.push(txIntent);
        this.setPlanet(planet);
      }
      if (txIntent.artifact) {
        const artifact = this.getArtifactById(txIntent.artifact);
        if (artifact) {
          artifact.unconfirmedMove = txIntent;
          this.setArtifact(artifact);
        }
      }
    } else if (isUnconfirmedUpgrade(txIntent)) {
      this.unconfirmedUpgrades[txIntent.actionId] = txIntent;
      const planet = this.getPlanetWithId(txIntent.locationId);
      if (planet) {
        planet.unconfirmedUpgrades.push(txIntent);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedBuyHat(txIntent)) {
      this.unconfirmedBuyHats[txIntent.actionId] = txIntent;
      const planet = this.getPlanetWithId(txIntent.locationId);
      if (planet) {
        planet.unconfirmedBuyHats.push(txIntent);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedTransfer(txIntent)) {
      this.unconfirmedPlanetTransfers[txIntent.actionId] = txIntent;
      const planet = this.getPlanetWithId(txIntent.planetId);
      if (planet) {
        planet.unconfirmedPlanetTransfers.push(txIntent);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedProspectPlanet(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.planetId);
      if (planet) {
        planet.unconfirmedProspectPlanet = txIntent;
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedFindArtifact(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.planetId);
      if (planet) {
        planet.unconfirmedFindArtifact = txIntent;
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedDepositArtifact(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.locationId);
      const artifact = this.getArtifactById(txIntent.artifactId);
      if (planet) {
        planet.unconfirmedDepositArtifact = txIntent;
        this.setPlanet(planet);
      }
      if (artifact) {
        artifact.unconfirmedDepositArtifact = txIntent;
        this.setArtifact(artifact);
      }
    } else if (isUnconfirmedWithdrawArtifact(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.locationId);
      const artifact = this.getArtifactById(txIntent.artifactId);
      if (planet) {
        planet.unconfirmedWithdrawArtifact = txIntent;
        this.setPlanet(planet);
      }
      if (artifact) {
        artifact.unconfirmedWithdrawArtifact = txIntent;
        this.setArtifact(artifact);
      }
    } else if (isUnconfirmedActivateArtifact(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.locationId);
      const artifact = this.getArtifactById(txIntent.artifactId);
      if (planet) {
        planet.unconfirmedActivateArtifact = txIntent;
        this.setPlanet(planet);
      }
      if (artifact) {
        artifact.unconfirmedActivateArtifact = txIntent;
        this.setArtifact(artifact);
      }
      if (txIntent.wormholeTo) {
        this.unconfirmedWormholeActivations.push(txIntent);
      }
    } else if (isUnconfirmedDeactivateArtifact(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.locationId);
      const artifact = this.getArtifactById(txIntent.artifactId);
      if (planet) {
        planet.unconfirmedDeactivateArtifact = txIntent;
        this.setPlanet(planet);
      }
      if (artifact) {
        artifact.unconfirmedDeactivateArtifact = txIntent;
        this.setArtifact(artifact);
      }
    } else if (isUnconfirmedWithdrawSilver(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.locationId);
      if (planet) {
        planet.unconfirmedWithdrawSilver = txIntent;
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedBuyGPTCredits(txIntent)) {
      this.isBuyingCredits$.publish(true);
      this.unconfirmedBuyGPTCredits = txIntent;
    }
  }

  public clearUnconfirmedTxIntent(txIntent: TxIntent) {
    if (isUnconfirmedReveal(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.locationId);

      if (planet) {
        planet.unconfirmedReveal = undefined;
        this.setPlanet(planet);
      }

      if (txIntent.actionId === this.unconfirmedReveal?.actionId) {
        this.unconfirmedReveal = undefined;
      } else {
        console.error(
          "unexpected error occurred: tried to clear an unconfirmed reveal that doesn't exist"
        );
      }
    } else if (isUnconfirmedMove(txIntent)) {
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
        this.setPlanet(planet);
      }
      if (txIntent.artifact) {
        const artifact = this.getArtifactById(txIntent.artifact);
        if (artifact) {
          delete artifact.unconfirmedMove;
          this.setArtifact(artifact);
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
        this.setPlanet(planet);
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
        this.setPlanet(planet);
      }
      delete this.unconfirmedBuyHats[txIntent.actionId];
    } else if (isUnconfirmedFindArtifact(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.planetId);

      if (planet) {
        planet.unconfirmedFindArtifact = undefined;
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedDepositArtifact(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.locationId);
      const artifact = this.getArtifactById(txIntent.artifactId);

      if (planet) {
        planet.unconfirmedDepositArtifact = undefined;
        this.setPlanet(planet);
      }
      if (artifact) {
        artifact.unconfirmedDepositArtifact = undefined;
        this.setArtifact(artifact);
      }
    } else if (isUnconfirmedWithdrawArtifact(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.locationId);
      const artifact = this.getArtifactById(txIntent.artifactId);

      if (planet) {
        planet.unconfirmedWithdrawArtifact = undefined;
        this.setPlanet(planet);
      }
      if (artifact) {
        artifact.unconfirmedWithdrawArtifact = undefined;
        this.setArtifact(artifact);
      }
    } else if (isUnconfirmedTransfer(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.planetId);
      if (planet) {
        let removeIdx = -1;
        for (let i = 0; i < planet.unconfirmedPlanetTransfers.length; i += 1) {
          if (planet.unconfirmedPlanetTransfers[i].actionId === txIntent.actionId) {
            removeIdx = i;
            break;
          }
        }
        if (removeIdx > -1) {
          planet.unconfirmedPlanetTransfers.splice(removeIdx, 1);
        }
        this.setPlanet(planet);
      }
      delete this.unconfirmedPlanetTransfers[txIntent.actionId];
    } else if (isUnconfirmedProspectPlanet(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.planetId);
      if (planet) {
        delete planet.unconfirmedProspectPlanet;
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedActivateArtifact(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.locationId);
      const artifact = this.getArtifactById(txIntent.artifactId);
      if (planet) {
        delete planet.unconfirmedActivateArtifact;
        this.setPlanet(planet);
      }
      if (artifact) {
        delete artifact.unconfirmedActivateArtifact;
        this.setArtifact(artifact);
      }

      let removeIdx = -1;
      for (let i = 0; i < this.unconfirmedWormholeActivations.length; i += 1) {
        if (this.unconfirmedWormholeActivations[i].actionId === txIntent.actionId) {
          removeIdx = i;
          break;
        }
      }
      if (removeIdx > -1) {
        this.unconfirmedWormholeActivations.splice(removeIdx, 1);
      }
    } else if (isUnconfirmedDeactivateArtifact(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.locationId);
      const artifact = this.getArtifactById(txIntent.artifactId);
      if (planet) {
        delete planet.unconfirmedDeactivateArtifact;
        this.setPlanet(planet);
      }
      if (artifact) {
        delete artifact.unconfirmedDeactivateArtifact;
        this.setArtifact(artifact);
      }
    } else if (isUnconfirmedWithdrawSilver(txIntent)) {
      const planet = this.getPlanetWithId(txIntent.locationId);
      if (planet) {
        delete planet.unconfirmedWithdrawSilver;
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedBuyGPTCredits(txIntent)) {
      if (txIntent.actionId === this.unconfirmedBuyGPTCredits?.actionId) {
        this.isBuyingCredits$.publish(false);
        this.unconfirmedBuyGPTCredits = undefined;
      } else {
        console.error(
          "unexpected error occurred: tried to clear an unconfirmed GPT credit purchase that doesn't exist"
        );
      }
    }
  }

  public getUnconfirmedMoves(): UnconfirmedMove[] {
    return Object.values(this.unconfirmedMoves);
  }

  public getUnconfirmedWormholeActivations(): UnconfirmedActivateArtifact[] {
    return this.unconfirmedWormholeActivations;
  }

  public getWormholes(): Iterable<Wormhole> {
    return this.wormholes.values();
  }

  public getUnconfirmedUpgrades(): UnconfirmedUpgrade[] {
    return Object.values(this.unconfirmedUpgrades);
  }

  public getUnconfirmedReveal(): UnconfirmedReveal | undefined {
    return this.unconfirmedReveal;
  }

  public getUnconfirmedBuyGPTCredits(): UnconfirmedBuyGPTCredits | undefined {
    return this.unconfirmedBuyGPTCredits;
  }

  public getPlanetMap(): Map<LocationId, Planet> {
    return this.planets;
  }

  public getArtifactMap(): Map<ArtifactId, Artifact> {
    return this.artifacts;
  }

  public getMyPlanetMap(): Map<LocationId, Planet> {
    return this.myPlanets;
  }

  public getMyArtifactMap(): Map<ArtifactId, Artifact> {
    return this.myArtifacts;
  }

  public getRevealedLocations(): Map<LocationId, WorldLocation> {
    return this.revealedLocations;
  }

  /**
   * Set a planet into our cached store. Should ALWAYS call this when setting a planet.
   * `this.planets` and `this.myPlanets` should NEVER be accessed directly!
   * This function also handles managing planet update messages and indexing the map of owned planets.
   * @param planet the planet to set
   */
  private setPlanet(planet: Planet) {
    setObjectSyncState<Planet, LocationId>(
      this.planets,
      this.myPlanets,
      this.address,
      this.planetUpdated$,
      this.myPlanetsUpdated$,
      getPlanetId,
      getPlanetOwner,
      planet
    );
  }

  /**
   * Set an artifact into our cached store. Should ALWAYS call this when setting an artifact.
   * `this.artifacts` and `this.myArtifacts` should NEVER be accessed directly!
   * This function also handles managing artifact update messages and indexing the map of owned artifacts.
   * @param artifact the artifact to set
   */
  private setArtifact(artifact: Artifact) {
    if (artifact.artifactType === ArtifactType.Wormhole && artifact.onPlanetId) {
      if (artifact.wormholeTo && isActivated(artifact)) {
        this.wormholes.set(artifact.id, {
          from: artifact.onPlanetId,
          to: artifact.wormholeTo,
        });
      } else {
        this.wormholes.delete(artifact.id);
      }
    }

    setObjectSyncState<Artifact, ArtifactId>(
      this.artifacts,
      this.myArtifacts,
      this.address,
      this.artifactUpdated$,
      this.myArtifactsUpdated$,
      getArtifactId,
      getArtifactOwner,
      artifact
    );
  }

  private processArrivalsForPlanet(
    planetId: LocationId,
    arrivals: QueuedArrival[]
  ): ArrivalWithTimer[] {
    const planet = this.planets.get(planetId);
    if (!planet) {
      console.error(`attempted to process arrivals for planet not in memory: ${planetId}`);
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
          arrive(
            planet,
            this.getPlanetArtifacts(planet.locationId),
            arrival,
            this.contractConstants
          );
        } else {
          // otherwise, set a timer to do this arrival in the future
          // and append it to arrivalsWithTimers
          const applyFutureArrival = setTimeout(() => {
            arrive(
              planet,
              this.getPlanetArtifacts(planet.locationId),
              arrival,
              this.contractConstants
            );

            const notifManager = NotificationManager.getInstance();
            if (GameObjects.planetCanUpgrade(planet) && planet.owner === this.address) {
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
        console.error(`error occurred processing arrival for updated planet ${planetId}: ${e}`);
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

  public planetLevelFromHexPerlin(hex: LocationId, perlin: number): PlanetLevel {
    const spaceType = this.spaceTypeFromPerlin(perlin);

    const levelBigInt = getBytesFromHex(hex, 4, 7);

    let ret = PlanetLevel.MIN;

    for (let type = PlanetLevel.MAX; type >= PlanetLevel.MIN; type--) {
      if (levelBigInt < bigInt(this.contractConstants.planetLevelThresholds[type])) {
        ret = type;
        break;
      }
    }

    if (spaceType === SpaceType.NEBULA && ret > PlanetLevel.FOUR) {
      ret = PlanetLevel.FOUR;
    }
    if (spaceType === SpaceType.SPACE && ret > PlanetLevel.FIVE) {
      ret = PlanetLevel.FIVE;
    }
    if (ret > this.contractConstants.MAX_NATURAL_PLANET_LEVEL) {
      ret = this.contractConstants.MAX_NATURAL_PLANET_LEVEL;
    }

    return ret;
  }

  spaceTypeFromPerlin(perlin: number): SpaceType {
    if (perlin < this.contractConstants.PERLIN_THRESHOLD_1) {
      return SpaceType.NEBULA;
    } else if (perlin < this.contractConstants.PERLIN_THRESHOLD_2) {
      return SpaceType.SPACE;
    } else if (perlin < this.contractConstants.PERLIN_THRESHOLD_3) {
      return SpaceType.DEEP_SPACE;
    } else {
      return SpaceType.DEAD_SPACE;
    }
  }

  public static getSilverNeeded(planet: Planet): number {
    const totalLevel = planet.upgradeState.reduce((a, b) => a + b);
    return (totalLevel + 1) * 0.2 * planet.silverCap;
  }

  public static planetCanUpgrade(planet: Planet): boolean {
    const totalRank = planet.upgradeState.reduce((a, b) => a + b);
    if (planet.spaceType === SpaceType.NEBULA && totalRank >= 3) return false;
    if (planet.spaceType === SpaceType.SPACE && totalRank >= 4) return false;
    if (planet.spaceType === SpaceType.DEEP_SPACE && totalRank >= 5) return false;
    if (planet.spaceType === SpaceType.DEAD_SPACE && totalRank >= 5) return false;
    return (
      planet.planetLevel !== 0 &&
      planet.planetType === PlanetType.PLANET &&
      planet.silver >= this.getSilverNeeded(planet)
    );
  }

  public planetTypeFromHexPerlin(hex: LocationId, perlin: number): PlanetType {
    // level must be sufficient - too low level planets have 0 silver growth
    const planetLevel = this.planetLevelFromHexPerlin(hex, perlin);

    const spaceType = this.spaceTypeFromPerlin(perlin);
    const weights = this.contractConstants.PLANET_TYPE_WEIGHTS[spaceType][planetLevel];
    const weightSum = weights.reduce((x, y) => x + y);
    let thresholds = [weightSum - weights[0]];
    for (let i = 1; i < weights.length; i++) {
      thresholds.push(thresholds[i - 1] - weights[i]);
    }
    thresholds = thresholds.map((x) => Math.floor((x * 256) / weightSum));
    const typeByte = Number(getBytesFromHex(hex, 8, 9));
    for (let i = 0; i < thresholds.length; i++) {
      if (typeByte >= thresholds[i]) {
        return i;
      }
    }
    // this should never happen
    return PlanetType.PLANET;
  }

  private getBiome(loc: WorldLocation): Biome {
    const { perlin, biomebase } = loc;
    const spaceType = this.spaceTypeFromPerlin(perlin);

    if (spaceType === SpaceType.DEAD_SPACE) return Biome.CORRUPTED;

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
  private defaultPlanetFromLocation(location: WorldLocation): LocatablePlanet {
    const { perlin } = location;
    const hex = location.hash;
    const planetLevel = this.planetLevelFromHexPerlin(hex, perlin);
    const planetType = this.planetTypeFromHexPerlin(hex, perlin);
    const spaceType = this.spaceTypeFromPerlin(perlin);

    const [energyCapBonus, energyGroBonus, rangeBonus, speedBonus, defBonus] = bonusFromHex(hex);

    let energyCap = this.contractConstants.defaultPopulationCap[planetLevel];
    let energyGro = this.contractConstants.defaultPopulationGrowth[planetLevel];
    let range = this.contractConstants.defaultRange[planetLevel];
    let speed = this.contractConstants.defaultSpeed[planetLevel];
    let defense = this.contractConstants.defaultDefense[planetLevel];
    let silCap = this.contractConstants.defaultSilverCap[planetLevel];

    let silGro = 0;
    if (planetType === PlanetType.SILVER_MINE) {
      silGro = this.contractConstants.defaultSilverGrowth[planetLevel];
    }

    energyCap *= energyCapBonus ? 2 : 1;
    energyGro *= energyGroBonus ? 2 : 1;
    range *= rangeBonus ? 2 : 1;
    speed *= speedBonus ? 2 : 1;
    defense *= defBonus ? 2 : 1;

    if (spaceType === SpaceType.DEAD_SPACE) {
      range *= 2;
      speed *= 2;
      energyCap *= 2;
      energyGro *= 2;
      silCap *= 2;
      silGro *= 2;

      defense = Math.floor((defense * 3) / 20);
    } else if (spaceType === SpaceType.DEEP_SPACE) {
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

    // apply stat modifiers for special planet types
    if (planetType === PlanetType.SILVER_MINE) {
      silCap *= 2;
      defense *= 0.5;
    } else if (planetType === PlanetType.SILVER_BANK) {
      speed /= 2;
      silCap *= 10;
      energyGro = 0;
      energyCap *= 5;
    } else if (planetType === PlanetType.TRADING_POST) {
      defense *= 0.5;
      silCap *= 2;
    }

    let barbarians =
      (energyCap * this.contractConstants.defaultBarbarianPercentage[planetLevel]) / 100;
    // increase barbarians
    if (spaceType === SpaceType.DEAD_SPACE) barbarians *= 20;
    else if (spaceType === SpaceType.DEEP_SPACE) barbarians *= 10;
    else if (spaceType === SpaceType.SPACE) barbarians *= 4;

    const silver = planetType === PlanetType.SILVER_MINE ? silCap / 2 : 0;

    speed *= this.contractConstants.TIME_FACTOR_HUNDREDTHS / 100;
    energyGro *= this.contractConstants.TIME_FACTOR_HUNDREDTHS / 100;
    silGro *= this.contractConstants.TIME_FACTOR_HUNDREDTHS / 100;

    const biome = this.getBiome(location);

    return {
      locationId: hex,
      perlin,
      spaceType,
      owner: EMPTY_ADDRESS,
      hatLevel: 0,
      bonus: bonusFromHex(hex),

      planetLevel,
      planetType,
      isHomePlanet: false,

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

      prospectedBlockNumber: undefined,
      heldArtifactIds: [],
      destroyed: false,
      isInContract: this.touchedPlanetIds.has(hex),
      syncedWithContract: false,
      coordsRevealed: false,
      location,
      biome,
      hasTriedFindingArtifact: false,
    };
  }

  private updatePlanetIfStale(planet: Planet): void {
    const now = Date.now();
    if (now / 1000 - planet.lastUpdated > 1) {
      updatePlanetToTime(
        planet,
        this.getPlanetArtifacts(planet.locationId),
        now,
        this.contractConstants,
        this.setPlanet
      );
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
   * doesn't produce silver, returns undefined if already over percent% of silcap,
   * returns undefined
   */
  public getSilverCurveAtPercent(planet: Planet, percent: number): number | undefined {
    if (planet.silverGrowth <= 0) {
      return undefined;
    }
    const silverTarget = (percent / 100) * planet.silverCap;
    const silverDiff = silverTarget - planet.silver;
    if (silverDiff <= 0) {
      return undefined;
    }
    let timeToTarget = 0;
    timeToTarget += silverDiff / planet.silverGrowth;
    return planet.lastUpdated + timeToTarget;
  }

  /**
   * Returns the EthAddress of the player who can control the owner:
   * if the artifact is on a planet, this is the owner of the planet
   * if the artifact is on a voyage, this is the initiator of the voyage
   * if the artifact is not on either, then it is the owner of the artifact NFT
   */
  public getArtifactController(artifactId: ArtifactId): EthAddress | undefined {
    const artifact = this.getArtifactById(artifactId);
    if (!artifact) {
      return undefined;
    }

    if (artifact.onPlanetId) {
      const planet = this.getPlanetWithId(artifact.onPlanetId);
      if (!planet) {
        return undefined;
      }
      return planet.owner === EMPTY_ADDRESS ? undefined : planet.owner;
    } else if (artifact.onVoyageId) {
      const arrival = this.arrivals.get(artifact.onVoyageId);
      return arrival?.arrivalData.player || undefined;
    } else {
      return artifact.currentOwner === EMPTY_ADDRESS ? undefined : artifact.currentOwner;
    }
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
