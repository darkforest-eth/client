import { isLocatable } from '@darkforest_eth/gamelogic';
import { EthConnection } from '@darkforest_eth/network';
import {
  ArtifactId,
  Biome,
  EthAddress,
  LocatablePlanet,
  LocationId,
  Planet,
  SpaceType,
  WorldLocation,
} from '@darkforest_eth/types';
import { ContractConstants } from '../../_types/darkforest/api/ContractsAPITypes';
import { AddressTwitterMap } from '../../_types/darkforest/api/UtilityServerAPITypes';
import { arrive, updatePlanetToTime } from '../GameLogic/ArrivalUtils';
import { ContractsAPI, makeContractsAPI } from '../GameLogic/ContractsAPI';
import { getAllTwitters } from '../Network/UtilityServerAPI';
import PersistentChunkStore from './PersistentChunkStore';

export const enum SinglePlanetDataStoreEvent {
  REFRESHED_PLANET = 'REFRESHED_PLANET',
  REFRESHED_ARTIFACT = 'REFRESHED_ARTIFACT',
}

interface ReaderDataStoreConfig {
  contractAddress: EthAddress;
  viewer: EthAddress | undefined;
  addressTwitterMap: AddressTwitterMap;
  contractConstants: ContractConstants;
  contractsAPI: ContractsAPI;
  persistentChunkStore: PersistentChunkStore | undefined;
}

/**
 * A data store that allows you to retrieve data from the contract,
 * and combine it with data that is stored in this browser about a
 * particular user.
 */
class ReaderDataStore {
  private readonly viewer: EthAddress | undefined;
  private readonly addressTwitterMap: AddressTwitterMap;
  private readonly contractConstants: ContractConstants;
  private readonly contractsAPI: ContractsAPI;
  private readonly persistentChunkStore: PersistentChunkStore | undefined;

  private constructor({
    viewer,
    addressTwitterMap,
    contractConstants,
    contractsAPI,
    persistentChunkStore,
  }: ReaderDataStoreConfig) {
    this.viewer = viewer;
    this.addressTwitterMap = addressTwitterMap;
    this.contractConstants = contractConstants;
    this.contractsAPI = contractsAPI;
    this.persistentChunkStore = persistentChunkStore;
  }

  public destroy(): void {
    this.contractsAPI.destroy();
    this.persistentChunkStore?.destroy();
  }

  public static async create({
    connection,
    viewer,
    contractAddress,
  }: {
    connection: EthConnection;
    viewer: EthAddress | undefined;
    contractAddress: EthAddress;
  }): Promise<ReaderDataStore> {
    const contractsAPI = await makeContractsAPI({ connection, contractAddress });
    const addressTwitterMap = await getAllTwitters();
    const contractConstants = await contractsAPI.getConstants();
    const persistentChunkStore =
      viewer && (await PersistentChunkStore.create({ account: viewer, contractAddress }));

    const singlePlanetStore = new ReaderDataStore({
      contractAddress,
      viewer,
      addressTwitterMap,
      contractConstants,
      contractsAPI,
      persistentChunkStore,
    });

    return singlePlanetStore;
  }

  public getViewer(): EthAddress | undefined {
    return this.viewer;
  }

  public getTwitter(owner: EthAddress | undefined): string | undefined {
    if (owner) {
      return this.addressTwitterMap[owner];
    }
  }

  private setPlanetLocationIfKnown(planet: Planet): void {
    let planetLocation = undefined;

    if (planet && isLocatable(planet)) {
      // clear the location of the LocatablePlanet, turning it back into a planet
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const { location, biome, ...nonLocatable } = planet;
      /* eslint-enable @typescript-eslint/no-unused-vars */
      planet = nonLocatable;
    }

    if (this.persistentChunkStore) {
      for (const chunk of this.persistentChunkStore.allChunks()) {
        for (const loc of chunk.planetLocations) {
          if (loc.hash === planet.locationId) {
            planetLocation = loc;
            break;
          }
        }
        if (planetLocation) break;
      }
    }

    if (planetLocation && planet) {
      (planet as LocatablePlanet).location = planetLocation;
      (planet as LocatablePlanet).biome = this.getBiome(planetLocation);
    }
  }

  public async loadPlanetFromContract(planetId: LocationId): Promise<Planet | LocatablePlanet> {
    const planet = await this.contractsAPI.getPlanetById(planetId);
    const contractConstants = await this.contractsAPI.getConstants();

    if (!planet) {
      throw new Error(`unable to load planet with id ${planetId}`);
    }

    const arrivals = await this.contractsAPI.getArrivalsForPlanet(planetId);

    arrivals.sort((a, b) => a.arrivalTime - b.arrivalTime);
    const nowInSeconds = Date.now() / 1000;

    for (const arrival of arrivals) {
      if (nowInSeconds < arrival.arrivalTime) break;
      arrive(planet, [], arrival, undefined, contractConstants);
    }

    updatePlanetToTime(planet, [], Date.now(), contractConstants);
    this.setPlanetLocationIfKnown(planet);

    return planet;
  }

  public async loadArtifactFromContract(artifactId: ArtifactId) {
    const artifact = await this.contractsAPI.getArtifactById(artifactId);

    if (!artifact) {
      throw new Error(`unable to load artifact with id ${artifactId}`);
    }

    return artifact;
  }

  // copied from GameEntityMemoryStore. needed to determine biome if we know planet location
  private spaceTypeFromPerlin(perlin: number): SpaceType {
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

  // copied from GameEntityMemoryStore. needed to determine biome if we know planet location
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
}

export default ReaderDataStore;
