import {
  EthAddress,
  Planet,
  LocationId,
  Location,
  Biome,
  SpaceType,
  LocatablePlanet,
  isLocatable,
} from '../_types/global/GlobalTypes';
import PersistentChunkStore from './PersistentChunkStore';
import ContractsAPI from './ContractsAPI';
import { getAllTwitters } from './UtilityServerAPI';
import { arrive, updatePlanetToTime } from '../utils/ArrivalUtils';
import { format as formatTime } from 'timeago.js';
import { EventEmitter } from 'events';
import { ContractConstants } from '../_types/darkforest/api/ContractsAPITypes';
import EthConnection from './EthConnection';
import { AddressTwitterMap } from '../_types/darkforest/api/UtilityServerAPITypes';

export enum SinglePlanetDataStoreEvent {
  REFRESHED_PLANET = 'REFRESHED_PLANET',
}

class SinglePlanetDataStore extends EventEmitter {
  private readonly planetId: LocationId;
  private readonly addressTwitterMap: AddressTwitterMap;
  private planet: Planet | null;
  private planetLocation: Location | null;
  private lastRefreshed: string;
  private readonly contractConstants: ContractConstants;
  private readonly contractsAPI: ContractsAPI;
  private persistentChunkStore: PersistentChunkStore | null;

  private refreshing: boolean;

  private constructor(
    planetId: LocationId,
    addressTwitterMap: AddressTwitterMap,
    contractConstants: ContractConstants,
    contractsAPI: ContractsAPI,
    persistentChunkStore: PersistentChunkStore | null
  ) {
    super();

    this.planetId = planetId;
    this.addressTwitterMap = addressTwitterMap;
    this.planet = null;
    this.planetLocation = null;
    this.lastRefreshed = 'never';

    this.contractConstants = contractConstants;
    this.contractsAPI = contractsAPI;
    this.persistentChunkStore = persistentChunkStore;

    this.refreshing = true;

    this.refreshPlanetFromContract();
  }

  public destroy(): void {
    // removes singletons of ContractsAPI, LocalStorageManager, MinerManager
    this.contractsAPI.destroy();
    this.persistentChunkStore?.destroy();
  }

  static async create(planetId: LocationId): Promise<SinglePlanetDataStore> {
    // initialize dependencies according to a DAG

    // first we initialize the ContractsAPI and get the user's eth account, and load contract constants + state
    const contractsAPI = await ContractsAPI.create();

    // then we initialize the local storage manager, if EthConnection has an account/signer
    let persistentChunkStore = null;
    try {
      const account = EthConnection.getInstance().getAddress();
      persistentChunkStore = await PersistentChunkStore.create(account);
    } catch (e) {
      console.log(`error loading chunkStore for PlanetDataStore: ${e}`);
    }
    // get twitter handles
    const addressTwitterMap = await getAllTwitters();

    const contractConstants = await contractsAPI.getConstants();

    const singlePlanetStore = new SinglePlanetDataStore(
      planetId,
      addressTwitterMap,
      contractConstants,
      contractsAPI,
      persistentChunkStore
    );

    return singlePlanetStore;
  }

  public isRefreshing(): boolean {
    return this.refreshing;
  }

  public getPlanet(): Planet | null {
    return this.planet;
  }

  public getLastRefreshed(): string {
    return this.lastRefreshed;
  }

  public getPlanetOwnerTwitter(): string | null {
    if (this.planet) {
      return this.addressTwitterMap[this.planet.owner] || null;
    }
    return null;
  }

  public async switchAccount(account: EthAddress): Promise<void> {
    if (this.persistentChunkStore) this.persistentChunkStore.destroy();
    this.persistentChunkStore = null;

    this.persistentChunkStore = await PersistentChunkStore.create(account);
    this.setPlanetLocationIfKnown();
    this.emit(SinglePlanetDataStoreEvent.REFRESHED_PLANET);
  }

  private setPlanetLocationIfKnown(): void {
    this.planetLocation = null;
    if (this.planet && isLocatable(this.planet)) {
      // clear the location of the LocatablePlanet, turning it back into a planet
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const { location, biome, ...nonLocatable } = this.planet;
      /* eslint-enable @typescript-eslint/no-unused-vars */
      this.planet = nonLocatable;
    }
    if (this.persistentChunkStore && !this.planetLocation) {
      for (const chunk of this.persistentChunkStore.allChunks()) {
        for (const loc of chunk.planetLocations) {
          if (loc.hash === this.planetId) {
            this.planetLocation = loc;
            break;
          }
        }
        if (this.planetLocation) break;
      }
    }
    if (this.planetLocation && this.planet) {
      (this.planet as LocatablePlanet).location = this.planetLocation;
      (this.planet as LocatablePlanet).biome = this.getBiome(
        this.planetLocation
      );
    }
  }

  private async refreshPlanetFromContract(): Promise<void> {
    this.refreshing = true;
    const planet = await this.contractsAPI.getPlanetById(this.planetId);
    if (!planet) {
      this.refreshing = false;
      this.emit(SinglePlanetDataStoreEvent.REFRESHED_PLANET);
      return;
    }
    const arrivals = await this.contractsAPI.getArrivalsForPlanet(
      this.planetId
    );

    arrivals.sort((a, b) => a.arrivalTime - b.arrivalTime);
    const nowInSeconds = Date.now() / 1000;
    for (const arrival of arrivals) {
      if (nowInSeconds < arrival.arrivalTime) break;
      arrive(planet, arrival);
    }
    updatePlanetToTime(planet, Date.now());

    this.planet = planet;
    this.refreshing = false;
    this.lastRefreshed = formatTime(Date.now());
    this.setPlanetLocationIfKnown();

    this.emit(SinglePlanetDataStoreEvent.REFRESHED_PLANET);
  }

  // copied from GameEntityMemoryStore. needed to determine biome if we know planet location
  private spaceTypeFromPerlin(perlin: number): SpaceType {
    if (perlin < this.contractConstants.PERLIN_THRESHOLD_1) {
      return SpaceType.NEBULA;
    } else if (perlin < this.contractConstants.PERLIN_THRESHOLD_2) {
      return SpaceType.SPACE;
    } else {
      return SpaceType.DEEP_SPACE;
    }
  }

  // copied from GameEntityMemoryStore. needed to determine biome if we know planet location
  private getBiome(loc: Location): Biome {
    const { perlin, biomebase } = loc;
    const spaceType = this.spaceTypeFromPerlin(perlin);

    let biome = 3 * spaceType;
    if (biomebase < this.contractConstants.BIOME_THRESHOLD_1) biome += 1;
    else if (biomebase < this.contractConstants.BIOME_THRESHOLD_2) biome += 2;
    else biome += 3;

    return biome;
  }
}

export default SinglePlanetDataStore;
