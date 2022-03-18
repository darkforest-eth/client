import { EMPTY_ADDRESS, MAX_PLANET_LEVEL, MIN_PLANET_LEVEL } from '@darkforest_eth/constants';
import { Monomitter, monomitter } from '@darkforest_eth/events';
import { hasOwner, isActivated, isLocatable } from '@darkforest_eth/gamelogic';
import { bonusFromHex, getBytesFromHex } from '@darkforest_eth/hexgen';
import { TxCollection } from '@darkforest_eth/network';
import {
  isUnconfirmedActivateArtifact,
  isUnconfirmedActivateArtifactTx,
  isUnconfirmedBuyHat,
  isUnconfirmedBuyHatTx,
  isUnconfirmedCapturePlanetTx,
  isUnconfirmedDeactivateArtifact,
  isUnconfirmedDeactivateArtifactTx,
  isUnconfirmedDepositArtifact,
  isUnconfirmedDepositArtifactTx,
  isUnconfirmedFindArtifact,
  isUnconfirmedFindArtifactTx,
  isUnconfirmedGetShipsTx,
  isUnconfirmedInvadePlanetTx,
  isUnconfirmedMove,
  isUnconfirmedMoveTx,
  isUnconfirmedProspectPlanet,
  isUnconfirmedProspectPlanetTx,
  isUnconfirmedReveal,
  isUnconfirmedRevealTx,
  isUnconfirmedTransfer,
  isUnconfirmedTransferTx,
  isUnconfirmedUpgrade,
  isUnconfirmedUpgradeTx,
  isUnconfirmedWithdrawArtifact,
  isUnconfirmedWithdrawArtifactTx,
  isUnconfirmedWithdrawSilver,
  isUnconfirmedWithdrawSilverTx,
} from '@darkforest_eth/serde';
import {
  Abstract,
  ArrivalWithTimer,
  Artifact,
  ArtifactId,
  ArtifactType,
  Biome,
  Chunk,
  ClaimedLocation,
  EthAddress,
  LocatablePlanet,
  LocationId,
  Planet,
  PlanetLevel,
  PlanetType,
  QueuedArrival,
  Radii,
  RevealedLocation,
  SpaceType,
  Transaction,
  TransactionCollection,
  VoyageId,
  WorldCoords,
  WorldLocation,
  Wormhole,
} from '@darkforest_eth/types';
import autoBind from 'auto-bind';
import bigInt from 'big-integer';
import { ethers } from 'ethers';
import _ from 'lodash';
import NotificationManager from '../../Frontend/Game/NotificationManager';
import {
  getArtifactId,
  getArtifactOwner,
  getPlanetId,
  getPlanetOwner,
  setObjectSyncState,
} from '../../Frontend/Utils/EmitterUtils';
import { ContractConstants } from '../../_types/darkforest/api/ContractsAPITypes';
import { arrive, PlanetDiff, updatePlanetToTime } from './ArrivalUtils';
import { LayeredMap } from './LayeredMap';

type CoordsString = Abstract<string, 'CoordString'>;

const getCoordsString = (coords: WorldCoords): CoordsString => {
  return `${coords.x},${coords.y}` as CoordsString;
};

/**
 * Representation of the objects which exist in the world.
 */
export class GameObjects {
  /**
   * This is a data structure that allows us to efficiently calculate which planets are visible on
   * the player's screen given the viewport's position and size.
   */
  private readonly layeredMap: LayeredMap;

  /**
   * This address of the player that is currently logged in.
   *
   * @todo move this, along with all other objects relating to the currently logged-on player into a
   * new field: {@code player: PlayerInfo}
   */
  private readonly address: EthAddress | undefined;

  /**
   * Cached index of all known planet data.
   *
   * Warning!
   *
   * This should NEVER be set to directly! Any time you want to update a planet, you must call the
   * {@link GameObjects#setPlanet()} function. Following this rule enables us to reliably notify
   * other parts of the client when a particular object has been updated. TODO: what is the best way
   * to do this?
   *
   * @todo extract the pattern we're using for the field tuples
   *   - {planets, myPlanets, myPlanetsUpdated, planetUpdated$}
   *   - {artifacts, myArtifacts, myArtifactsUpdated, artifactUpdated$}
   *
   *   into some sort of class.
   */
  private readonly planets: Map<LocationId, Planet>;

  /**
   * Cached index of planets owned by the player.
   *
   * @see The same warning applys as the one on {@link GameObjects.planets}
   */
  private readonly myPlanets: Map<LocationId, Planet>;

  /**
   * Cached index of all known artifact data.
   *
   * @see The same warning applys as the one on {@link GameObjects.planets}
   */
  private readonly artifacts: Map<ArtifactId, Artifact>;

  /**
   * Cached index of artifacts owned by the player.
   *
   * @see The same warning applys as the one on {@link GameObjects.planets}
   */
  private readonly myArtifacts: Map<ArtifactId, Artifact>;

  /**
   * Map from artifact ids to wormholes.
   */
  private readonly wormholes: Map<ArtifactId, Wormhole>;

  /**
   * Set of all planet ids that we know have been interacted-with on-chain.
   */
  private readonly touchedPlanetIds: Set<LocationId>;

  /**
   * Map of arrivals to timers that fire when an arrival arrives, in case that handler needs to be
   * cancelled for whatever reason.
   */
  private readonly arrivals: Map<VoyageId, ArrivalWithTimer>;

  /**
   * Map from a location id (think of it as the unique id of each planet) to all the ids of the
   * voyages that are arriving on that planet. These include both the player's own voyages, and also
   * any potential invader's voyages.
   */
  private readonly planetArrivalIds: Map<LocationId, VoyageId[]>;

  /**
   * Map from location id (unique id of each planet) to some information about the location at which
   * this planet is located, if this client happens to know the coordinates of this planet.
   */
  private readonly planetLocationMap: Map<LocationId, WorldLocation>;

  /**
   * Map from location ids to, if that location id has been revealed on-chain, the world coordinates
   * of that location id, as well as some extra information regarding the circumstances of the
   * revealing of this planet.
   */
  private readonly revealedLocations: Map<LocationId, RevealedLocation>;

  /**
   * Map from location ids to, if that location id has been claimed on-chain, the world coordinates
   * of that location id, as well as some extra information regarding the circumstances of the
   * revealing of this planet.
   */
  private readonly claimedLocations: Map<LocationId, ClaimedLocation>;

  /**
   * Some of the game's parameters are downloaded from the blockchain. This allows the client to be
   * flexible, and connect to any compatible set of Dark Forest contracts, download the parameters,
   * and join the game, taking into account the unique configuration of those specific Dark Forest
   * contracts.
   */
  private readonly contractConstants: ContractConstants;

  /**
   * Map from a stringified representation of an x-y coordinate to an object that contains some more
   * information about the world at that location.
   */
  private readonly coordsToLocation: Map<CoordsString, WorldLocation>;

  /**
   * Transactions that are currently in flight.
   */
  public readonly transactions: TransactionCollection;

  /**
   * Event emitter which publishes whenever a planet is updated.
   */
  public readonly planetUpdated$: Monomitter<LocationId>;

  /**
   * Event emitter which publishes whenever an artifact has been updated.
   */
  public readonly artifactUpdated$: Monomitter<ArtifactId>;

  /**
   * Whenever a planet is updated, we publish to this event with a reference to a map from location
   * id to planet. We need to rethink this event emitter because it currently publishes every time
   * that any planet is updated, and if a lot of them are updated at once (which i think is the case
   * once every two minutes) then this event emitter will publish a shitton of events.
   * TODO: rethink this
   */
  public readonly myPlanetsUpdated$: Monomitter<Map<LocationId, Planet>>;

  /**
   * Whenever one of the player's artifacts are updated, this event emitter publishes. See
   * {@link GameObjects.myPlanetsUpdated$} for more info.
   */
  public readonly myArtifactsUpdated$: Monomitter<Map<ArtifactId, Artifact>>;

  constructor(
    address: EthAddress | undefined,
    touchedPlanets: Map<LocationId, Planet>,
    allTouchedPlanetIds: Set<LocationId>,
    revealedLocations: Map<LocationId, RevealedLocation>,
    claimedLocations: Map<LocationId, ClaimedLocation>,
    artifacts: Map<ArtifactId, Artifact>,
    allChunks: Iterable<Chunk>,
    unprocessedArrivals: Map<VoyageId, QueuedArrival>,
    unprocessedPlanetArrivalIds: Map<LocationId, VoyageId[]>,
    contractConstants: ContractConstants,
    worldRadius: number
  ) {
    autoBind(this);

    this.address = address;
    this.planets = touchedPlanets;
    this.myPlanets = new Map();
    this.touchedPlanetIds = allTouchedPlanetIds;
    this.revealedLocations = revealedLocations;
    this.claimedLocations = claimedLocations;
    this.artifacts = artifacts;
    this.myArtifacts = new Map();
    this.contractConstants = contractConstants;
    this.coordsToLocation = new Map();
    this.planetLocationMap = new Map();
    const planetArrivalIds = new Map();
    const arrivals = new Map();
    this.transactions = new TxCollection();
    this.wormholes = new Map();
    this.layeredMap = new LayeredMap(worldRadius);

    this.planetUpdated$ = monomitter();
    this.artifactUpdated$ = monomitter();
    this.myArtifactsUpdated$ = monomitter();
    this.myPlanetsUpdated$ = monomitter();

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

        const revealedLocation = revealedLocations.get(planetId);
        if (revealedLocation) {
          planet.coordsRevealed = true;
          planet.revealer = revealedLocation.revealer;
        }
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

        this.setPlanet(planet);
      }
    });

    this.arrivals = arrivals;
    this.planetArrivalIds = planetArrivalIds;

    for (const [_locId, claimedLoc] of claimedLocations) {
      this.updatePlanet(claimedLoc.hash, (p) => {
        p.claimer = claimedLoc.revealer;
      });
    }

    // TODO: do this better...
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
    }, 120 * 1000);
  }

  public getWormholes(): Iterable<Wormhole> {
    return this.wormholes.values();
  }

  public getArtifactById(artifactId?: ArtifactId): Artifact | undefined {
    return artifactId ? this.artifacts.get(artifactId) : undefined;
  }

  public getArtifactsOwnedBy(addr: EthAddress): Artifact[] {
    const ret: Artifact[] = [];
    this.artifacts.forEach((artifact) => {
      if (artifact.currentOwner === addr || artifact.controller === addr) {
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
      let detailLevel = planet.planetLevel as number;
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
    if (localArtifact) {
      artifact.transactions = localArtifact.transactions;
      artifact.onPlanetId = localArtifact.onPlanetId;
    }

    this.setArtifact(artifact);
  }

  public replaceArtifactsFromContractData(artifacts: Iterable<Artifact>) {
    for (const artifact of artifacts) {
      this.replaceArtifactFromContractData(artifact);
    }
  }

  /**
   * Given a planet id, update the state of the given planet by calling the given update function.
   * If the planet was updated, then also publish the appropriate event.
   */
  public updatePlanet(id: LocationId, updateFn: (p: Planet) => void) {
    const planet = this.getPlanetWithId(id);

    if (planet !== undefined) {
      updateFn(planet);
      this.setPlanet(planet);
    }
  }

  /**
   * Given a planet id, update the state of the given planet by calling the given update function.
   * If the planet was updated, then also publish the appropriate event.
   */
  public updateArtifact(id: ArtifactId | undefined, updateFn: (p: Artifact) => void) {
    const artifact = this.getArtifactById(id);

    if (artifact !== undefined) {
      updateFn(artifact);
      this.setArtifact(artifact);
    }
  }

  /**
   * received some planet data from the contract. update our stores
   */
  public replacePlanetFromContractData(
    planet: Planet,
    updatedArrivals?: QueuedArrival[],
    updatedArtifactsOnPlanet?: ArtifactId[],
    revealedLocation?: RevealedLocation,
    claimerEthAddress?: EthAddress // TODO: Remove this
  ): void {
    this.touchedPlanetIds.add(planet.locationId);
    // does not modify unconfirmed txs
    // that is handled by onTxConfirm
    const localPlanet = this.planets.get(planet.locationId);
    if (localPlanet) {
      const {
        transactions,
        loadingServerState,
        needsServerRefresh,
        lastLoadedServerState,
        emojiBobAnimation,
        emojiZoopAnimation,
        emojiZoopOutAnimation,
        messages,
      } = localPlanet;
      planet.transactions = transactions;
      planet.loadingServerState = loadingServerState;
      planet.needsServerRefresh = needsServerRefresh;
      planet.lastLoadedServerState = lastLoadedServerState;
      planet.emojiBobAnimation = emojiBobAnimation;
      planet.emojiZoopAnimation = emojiZoopAnimation;
      planet.emojiZoopOutAnimation = emojiZoopOutAnimation;
      planet.messages = messages;

      // Possibly non updated props
      planet.heldArtifactIds = localPlanet.heldArtifactIds;
    } else {
      this.planets.set(planet.locationId, planet);
    }

    if (updatedArtifactsOnPlanet) {
      planet.heldArtifactIds = updatedArtifactsOnPlanet;
    }
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
      planet.revealer = revealedLocation.revealer;
    }

    if (claimerEthAddress) {
      planet.claimer = claimerEthAddress;
    }

    this.setPlanet(planet);

    if (updatedArrivals) {
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
    }
  }

  // returns an empty planet if planet is not in contract
  // returns undefined if this isn't a planet, according to hash and coords
  public getPlanetWithCoords(coords: WorldCoords): LocatablePlanet | undefined {
    const str = getCoordsString(coords);

    const location = this.coordsToLocation.get(str);
    if (!location) {
      return undefined;
    }

    return this.getPlanetWithLocation(location) as LocatablePlanet;
  }

  // - returns an empty planet if planet is not in contract
  // - returns undefined if this isn't a planet, according to hash and coords
  // - if this planet hasn't been initialized in the client yet, initializes it
  public getPlanetWithLocation(location: WorldLocation | undefined): Planet | undefined {
    if (!location) return undefined;

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
    this.layeredMap.insertPlanet(
      planetLocation,
      this.getPlanetWithId(planetLocation.hash, false)?.planetLevel ??
        this.planetLevelFromHexPerlin(planetLocation.hash, planetLocation.perlin)
    );

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
  public markLocationRevealed(revealedLocation: RevealedLocation): void {
    this.revealedLocations.set(revealedLocation.hash, revealedLocation);
  }

  public getLocationOfPlanet(planetId: LocationId): WorldLocation | undefined {
    return this.planetLocationMap.get(planetId) || undefined;
  }

  /**
   * Returns all planets in the game.
   *
   * Warning! Simply iterating over this is not performant, and is meant for scripting.
   *
   * @tutorial For plugin developers!
   */
  public getAllPlanets(): Iterable<Planet> {
    return this.planets.values();
  }

  /**
   * Returns all planets in the game, as a map from their location id to the planet.
   *
   * @tutorial For plugin developers!
   * @see Warning in {@link GameObjects.getAllPlanets()}
   */
  public getAllPlanetsMap(): Map<LocationId, Planet> {
    return this.planets;
  }

  /**
   * Returns all the planets in the game which this client is aware of that have an owner, as a map
   * from their id to the planet
   *
   * @tutorial For plugin developers!
   * @see Warning in {@link GameObjects.getAllPlanets()}
   */
  public getAllOwnedPlanets(): Planet[] {
    return Array.from(this.planets.values()).filter(hasOwner);
  }

  /**
   * Returns all voyages that are scheduled to arrive at some point in the future.
   *
   * @tutorial For plugin developers!
   * @see Warning in {@link GameObjects.getAllPlanets()}
   */
  public getAllVoyages(): QueuedArrival[] {
    return Array.from(this.arrivals.values()).map((awt) => awt.arrivalData);
  }

  /**
   * We call this function whenever the user requests that we send a transaction to the blockchain
   * with their localstorage wallet. You can think of it as one of the hubs which connects
   * `GameObjects` to the rest of the world.
   *
   * Inside this function, we update the relevant internal game objects to reflect that the user has
   * requested a particular action. Additionally, we publish the appropriate events to the relevant
   * {@link Monomitter} instances that are stored in this class.
   *
   * In the case of something like prospecting for an artifact, this allows us to display a spinner
   * text which says "Prospecting..."
   *
   * In the case of the user sending energy from one planet to another planet, this allows us to
   * display a dashed line between the two planets in their new voyage.
   *
   * Whenever we update an entity, we must do it via that entity's type's corresponding
   * `set<EntityType>` function, in order for us to publish these events.
   *
   * @todo: this entire function could be automated by implementing a new interface called
   * {@code TxFilter}.
   */
  public onTxIntent(tx: Transaction) {
    this.transactions.addTransaction(tx);

    if (isUnconfirmedRevealTx(tx)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      if (planet) {
        planet.transactions?.addTransaction(tx);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedMoveTx(tx)) {
      const planet = this.getPlanetWithId(tx.intent.from);
      if (planet) {
        planet.transactions?.addTransaction(tx);
        this.setPlanet(planet);
      }
      if (tx.intent.artifact) {
        const artifact = this.getArtifactById(tx.intent.artifact);
        if (artifact) {
          artifact.transactions?.addTransaction(tx);
          this.setArtifact(artifact);
        }
      }
    } else if (isUnconfirmedUpgradeTx(tx)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      if (planet) {
        planet.transactions?.addTransaction(tx);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedBuyHatTx(tx)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      if (planet) {
        planet.transactions?.addTransaction(tx);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedTransferTx(tx)) {
      const planet = this.getPlanetWithId(tx.intent.planetId);
      if (planet) {
        planet.transactions?.addTransaction(tx);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedProspectPlanetTx(tx)) {
      const planet = this.getPlanetWithId(tx.intent.planetId);
      if (planet) {
        planet.transactions?.addTransaction(tx);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedFindArtifactTx(tx)) {
      const planet = this.getPlanetWithId(tx.intent.planetId);
      if (planet) {
        planet.transactions?.addTransaction(tx);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedDepositArtifactTx(tx)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      const artifact = this.getArtifactById(tx.intent.artifactId);
      if (planet) {
        planet.transactions?.addTransaction(tx);
        this.setPlanet(planet);
      }
      if (artifact) {
        artifact.transactions?.addTransaction(tx);
        this.setArtifact(artifact);
      }
    } else if (isUnconfirmedWithdrawArtifactTx(tx)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      const artifact = this.getArtifactById(tx.intent.artifactId);
      if (planet) {
        planet.transactions?.addTransaction(tx);
        this.setPlanet(planet);
      }
      if (artifact) {
        artifact.transactions?.addTransaction(tx);
        this.setArtifact(artifact);
      }
    } else if (isUnconfirmedActivateArtifactTx(tx)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      const artifact = this.getArtifactById(tx.intent.artifactId);
      if (planet) {
        planet.transactions?.addTransaction(tx);
        this.setPlanet(planet);
      }
      if (artifact) {
        artifact.transactions?.addTransaction(tx);
        this.setArtifact(artifact);
      }
    } else if (isUnconfirmedDeactivateArtifactTx(tx)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      const artifact = this.getArtifactById(tx.intent.artifactId);
      if (planet) {
        planet.transactions?.addTransaction(tx);
        this.setPlanet(planet);
      }
      if (artifact) {
        artifact.transactions?.addTransaction(tx);
        this.setArtifact(artifact);
      }
    } else if (isUnconfirmedWithdrawSilverTx(tx)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      if (planet) {
        planet.transactions?.addTransaction(tx);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedCapturePlanetTx(tx)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      if (planet) {
        planet.transactions?.addTransaction(tx);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedInvadePlanetTx(tx)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      if (planet) {
        planet.transactions?.addTransaction(tx);
        this.setPlanet(planet);
      }
    }
  }

  /**
   * Whenever a transaction that the user initiated either succeeds or fails, we need to clear the
   * fact that it was in progress from the event's corresponding entities. For example, whenever a
   * transaction that sends a voyage from one planet to another either succeeds or fails, we need to
   * remove the dashed line that connected them.
   *
   * Making sure that we never miss something here is very tedious.
   *
   * @todo Make this less tedious.
   */
  public clearUnconfirmedTxIntent(tx: Transaction) {
    this.transactions.removeTransaction(tx);

    if (isUnconfirmedReveal(tx.intent)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);

      if (planet) {
        planet.transactions?.removeTransaction(tx);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedMove(tx.intent)) {
      const planet = this.getPlanetWithId(tx.intent.from);
      if (planet) {
        planet.transactions?.removeTransaction(tx);
        this.setPlanet(planet);
      }
      if (tx.intent.artifact) {
        const artifact = this.getArtifactById(tx.intent.artifact);
        if (artifact) {
          artifact.transactions?.removeTransaction(tx);
          this.setArtifact(artifact);
        }
      }
    } else if (isUnconfirmedUpgrade(tx.intent)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      if (planet) {
        planet.transactions?.removeTransaction(tx);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedBuyHat(tx.intent)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      if (planet) {
        planet.transactions?.removeTransaction(tx);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedFindArtifact(tx.intent)) {
      const planet = this.getPlanetWithId(tx.intent.planetId);

      if (planet) {
        planet.transactions?.removeTransaction(tx);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedDepositArtifact(tx.intent)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      const artifact = this.getArtifactById(tx.intent.artifactId);

      if (planet) {
        planet.transactions?.removeTransaction(tx);
        this.setPlanet(planet);
      }
      if (artifact) {
        artifact.transactions?.removeTransaction(tx);
        this.setArtifact(artifact);
      }
    } else if (isUnconfirmedWithdrawArtifact(tx.intent)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      const artifact = this.getArtifactById(tx.intent.artifactId);

      if (planet) {
        planet.transactions?.removeTransaction(tx);
        this.setPlanet(planet);
      }
      if (artifact) {
        artifact.transactions?.removeTransaction(tx);
        this.setArtifact(artifact);
      }
    } else if (isUnconfirmedTransfer(tx.intent)) {
      const planet = this.getPlanetWithId(tx.intent.planetId);
      if (planet) {
        planet.transactions?.removeTransaction(tx);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedProspectPlanet(tx.intent)) {
      const planet = this.getPlanetWithId(tx.intent.planetId);
      if (planet) {
        planet.transactions?.removeTransaction(tx);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedActivateArtifact(tx.intent)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      const artifact = this.getArtifactById(tx.intent.artifactId);
      if (planet) {
        planet.transactions?.removeTransaction(tx);
        this.setPlanet(planet);
      }
      if (artifact) {
        artifact.transactions?.removeTransaction(tx);
        this.setArtifact(artifact);
      }
    } else if (isUnconfirmedDeactivateArtifact(tx.intent)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      const artifact = this.getArtifactById(tx.intent.artifactId);
      if (planet) {
        planet.transactions?.removeTransaction(tx);
        this.setPlanet(planet);
      }
      if (artifact) {
        artifact.transactions?.removeTransaction(tx);
        this.setArtifact(artifact);
      }
    } else if (isUnconfirmedWithdrawSilver(tx.intent)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      if (planet) {
        planet.transactions?.removeTransaction(tx);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedCapturePlanetTx(tx)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      if (planet) {
        planet.transactions?.removeTransaction(tx);
        this.setPlanet(planet);
      }
    } else if (isUnconfirmedInvadePlanetTx(tx)) {
      const planet = this.getPlanetWithId(tx.intent.locationId);
      if (planet) {
        planet.transactions?.removeTransaction(tx);
        this.setPlanet(planet);
      }
    }
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

  public getRevealedLocations(): Map<LocationId, RevealedLocation> {
    return this.revealedLocations;
  }

  public getClaimedLocations(): Map<LocationId, ClaimedLocation> {
    return this.claimedLocations;
  }

  public setClaimedLocation(claimedLocation: ClaimedLocation) {
    this.claimedLocations.set(claimedLocation.hash, claimedLocation);
  }

  /**
   * Gets all the planets with the given ids, giltering out the ones that we don't have.
   */
  public getPlanetsWithIds(locationIds: LocationId[], updateIfStale = true): Planet[] {
    return locationIds
      .map((id) => this.getPlanetWithId(id, updateIfStale))
      .filter((p) => p !== undefined) as Planet[];
  }

  /**
   * Gets all the planets that are within {@code radius} world units from the given coordinate. Fast
   * because it uses {@link LayeredMap}.
   */
  public getPlanetsInWorldCircle(coords: WorldCoords, radius: number): LocatablePlanet[] {
    const locationIds = this.layeredMap.getPlanetsInCircle(coords, radius);
    return this.getPlanetsWithIds(locationIds) as LocatablePlanet[];
  }

  /**
   * Gets the ids of all the planets that are both within the given bounding box (defined by its
   * bottom left coordinate, width, and height) in the world and of a level that was passed in via
   * the `planetLevels` parameter. Fast because it uses {@link LayeredMap}.
   */
  public getPlanetsInWorldRectangle(
    worldX: number,
    worldY: number,
    worldWidth: number,
    worldHeight: number,
    levels: number[],
    planetLevelToRadii: Map<number, Radii>,
    updateIfStale = true
  ): LocatablePlanet[] {
    const locationIds = this.layeredMap.getPlanets(
      worldX,
      worldY,
      worldWidth,
      worldHeight,
      levels,
      planetLevelToRadii
    );
    return this.getPlanetsWithIds(locationIds, updateIfStale) as LocatablePlanet[];
  }

  public forceTick(locationId: LocationId) {
    const planet = this.getPlanetWithId(locationId);
    if (planet) {
      this.setPlanet(planet);
    }
  }

  /**
   * Set a planet into our cached store. Should ALWAYS call this when setting a planet.
   * `this.planets` and `this.myPlanets` should NEVER be accessed directly!
   * This function also handles managing planet update messages and indexing the map of owned planets.
   * @param planet the planet to set
   */
  private setPlanet(planet: Planet) {
    if (isLocatable(planet)) {
      this.layeredMap.insertPlanet(planet.location, planet.planetLevel);
    }

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
  /**
   * Emit notifications based on a planet's state change
   */
  private emitArrivalNotifications({ previous, current, arrival }: PlanetDiff) {
    const notifManager = NotificationManager.getInstance();
    if (
      !GameObjects.planetCanUpgrade(previous) &&
      GameObjects.planetCanUpgrade(current) &&
      current.owner === this.address
    ) {
      notifManager.planetCanUpgrade(current);
    }
    if (
      previous.owner !== this.address &&
      previous.owner !== ethers.constants.AddressZero &&
      current.owner === this.address
    ) {
      notifManager.planetConquered(current as LocatablePlanet);
    }
    if (previous.owner === this.address && current.owner !== this.address) {
      notifManager.planetLost(current as LocatablePlanet);
    }
    if (
      arrival.player !== this.address &&
      current.owner === this.address &&
      arrival.energyArriving !== 0
    ) {
      notifManager.planetAttacked(current as LocatablePlanet);
    }
  }

  private removeArrival(planetId: LocationId, arrivalId: VoyageId) {
    this.arrivals?.delete(arrivalId);
    const planetArrivalIds = this.planetArrivalIds?.get(planetId) ?? [];
    _.remove(planetArrivalIds, (id) => id === arrivalId);
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
          const update = arrive(
            planet,
            this.getPlanetArtifacts(planet.locationId),
            arrival,
            this.getArtifactById(arrival.artifactId),
            this.contractConstants
          );

          this.removeArrival(planetId, update.arrival.eventId);
          this.emitArrivalNotifications(update);
        } else {
          // otherwise, set a timer to do this arrival in the future
          // and append it to arrivalsWithTimers
          const applyFutureArrival = setTimeout(() => {
            const update = arrive(
              planet,
              this.getPlanetArtifacts(planet.locationId),
              arrival,
              this.getArtifactById(arrival.artifactId),
              this.contractConstants
            );
            this.emitArrivalNotifications(update);
            this.removeArrival(planetId, update.arrival.eventId);
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

    let ret = MIN_PLANET_LEVEL;

    for (let type = MAX_PLANET_LEVEL; type >= MIN_PLANET_LEVEL; type--) {
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
      ret = this.contractConstants.MAX_NATURAL_PLANET_LEVEL as PlanetLevel;
    }

    return ret;
  }

  public spaceTypeFromPerlin(perlin: number): SpaceType {
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
        return i as PlanetType;
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

    return biome as Biome;
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

    const [energyCapBonus, energyGroBonus, rangeBonus, speedBonus, defBonus, spaceJunkBonus] =
      bonusFromHex(hex);

    let energyCap = this.contractConstants.defaultPopulationCap[planetLevel];
    let energyGro = this.contractConstants.defaultPopulationGrowth[planetLevel];
    let range = this.contractConstants.defaultRange[planetLevel];
    let speed = this.contractConstants.defaultSpeed[planetLevel];
    let defense = this.contractConstants.defaultDefense[planetLevel];
    let silCap = this.contractConstants.defaultSilverCap[planetLevel];
    let spaceJunk = this.contractConstants.PLANET_LEVEL_JUNK[planetLevel];

    let silGro = 0;
    if (planetType === PlanetType.SILVER_MINE) {
      silGro = this.contractConstants.defaultSilverGrowth[planetLevel];
    }

    energyCap *= energyCapBonus ? 2 : 1;
    energyGro *= energyGroBonus ? 2 : 1;
    range *= rangeBonus ? 2 : 1;
    speed *= speedBonus ? 2 : 1;
    defense *= defBonus ? 2 : 1;
    spaceJunk = Math.floor(spaceJunk / (spaceJunkBonus ? 2 : 1));

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

    let pirates =
      (energyCap * this.contractConstants.defaultBarbarianPercentage[planetLevel]) / 100;
    // increase pirates
    if (spaceType === SpaceType.DEAD_SPACE) pirates *= 20;
    else if (spaceType === SpaceType.DEEP_SPACE) pirates *= 10;
    else if (spaceType === SpaceType.SPACE) pirates *= 4;

    if (planetType === PlanetType.SILVER_BANK) pirates /= 2;

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

      energy: pirates,
      silver,

      spaceJunk,

      lastUpdated: Math.floor(Date.now() / 1000),

      upgradeState: [0, 0, 0],

      transactions: new TxCollection(),
      unconfirmedClearEmoji: false,
      unconfirmedAddEmoji: false,
      loadingServerState: false,
      silverSpent: 0,

      prospectedBlockNumber: undefined,
      heldArtifactIds: [],
      destroyed: false,
      isInContract: this.touchedPlanetIds.has(hex),
      syncedWithContract: false,
      needsServerRefresh: false,
      coordsRevealed: false,
      location,
      biome,
      hasTriedFindingArtifact: false,
      messages: undefined,
      pausers: 0,

      invader: EMPTY_ADDRESS,
      capturer: EMPTY_ADDRESS,
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

  /**
   * Get all of the incoming voyages for a given location.
   */
  public getArrivalIdsForLocation(location: LocationId | undefined): VoyageId[] | undefined {
    if (!location) return [];

    return this.planetArrivalIds.get(location);
  }

  /**
   * Whether or not we're already asking the game to give us spaceships.
   */
  public isGettingSpaceships(): boolean {
    return this.transactions.hasTransaction(isUnconfirmedGetShipsTx);
  }
}
